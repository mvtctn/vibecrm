import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import Groq from "groq-sdk";
import { SYSTEM_PROMPT_ANALYZE_MESSAGE, AIAnalysisResult } from "@/lib/ai-prompt";

// POST /api/webhooks/zalo/[tenantId]
export async function POST(req: Request, { params }: { params: Promise<{ tenantId: string }> }) {
    try {
        const { tenantId } = await params;
        const body = await req.json();

        // 1. Kiểm tra sự kiện: User gửi tin nhắn text tới OA
        if (body.event_name !== 'user_send_text') {
            return NextResponse.json({ success: true, message: "Ignored event" });
        }

        const zaloId = body.sender?.id;
        const messageText = body.message?.text;

        if (!zaloId || !messageText) {
            return NextResponse.json({ error: "Missing sender or message" }, { status: 400 });
        }

        // 2. Tìm contact bằng supabase query
        // Giải pháp dùng contains trong mảng texts
        const { data: contacts, error: searchError } = await supabase
            .from('contacts')
            .select('id, tags')
            .eq('tenant_id', tenantId);

        let contactId: string | null = null;

        if (contacts) {
            const existing = contacts.find(c => c.tags?.includes(`zalo_${zaloId}`));
            if (existing) {
                contactId = existing.id;
            }
        }

        if (!contactId) {
            // Tạo mới contact
            const { data: newContact, error: createError } = await supabase
                .from('contacts')
                .insert([{
                    tenant_id: tenantId,
                    name: `Khách Zalo - ${zaloId}`,
                    channel_source: 'zalo',
                    tags: [`zalo_${zaloId}`]
                }])
                .select()
                .single();

            if (createError) throw createError;
            contactId = newContact!.id;
        }

        // 3. Khởi tạo Groq AI với API key (ưu tiên user key > admin key)
        let apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || "";
        const { data: tenant } = await supabase.from('tenants').select('api_keys').eq('id', tenantId).single();
        if (tenant?.api_keys?.groq) {
            apiKey = tenant.api_keys.groq;
        }

        if (!apiKey) {
            throw new Error("Missing Groq API Key");
        }

        const customGroq = new Groq({ apiKey });

        // 4. Gọi AI phân tích
        const chatCompletion = await customGroq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT_ANALYZE_MESSAGE },
                { role: "user", content: `Tin nhắn khách hàng:\n"""\n${messageText}\n"""` }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.1,
            response_format: { type: "json_object" },
        });

        const content = chatCompletion.choices[0]?.message?.content;
        if (!content) throw new Error("Empty AI response");

        const analysis: AIAnalysisResult = JSON.parse(content);

        // 5. Lưu tương tác vào bảng interactions
        await supabase.from('interactions').insert([{
            tenant_id: tenantId,
            contact_id: contactId,
            channel: 'zalo',
            direction: 'inbound',
            content: messageText,
            ai_extracted_intent: analysis.intent,
            sentiment: analysis.priority >= 4 ? 'negative' : 'neutral',
            ai_action: analysis.next_step
        }]);

        // 6. Cập nhật thông tin khách hàng (contact_update)
        let contactUpdated = false;
        if (analysis.contact_update && Object.keys(analysis.contact_update).length > 0) {
            const updates: any = {};
            if (analysis.contact_update.name) updates.name = analysis.contact_update.name;
            if (analysis.contact_update.phone) updates.phone = analysis.contact_update.phone;
            if (analysis.contact_update.email) updates.email = analysis.contact_update.email;
            if (analysis.contact_update.company) updates.company = analysis.contact_update.company;

            if (Object.keys(updates).length > 0) {
                await supabase.from('contacts').update(updates).eq('id', contactId);
                contactUpdated = true;
            }
        }

        // 7. Cập nhật Cơ hội - Deal (deal_update)
        let dealUpdated = false;
        if (analysis.deal_update && analysis.deal_update.deal_value) {
            await supabase.from('contacts').update({
                stage: analysis.intent === "Báo giá" ? "proposal" : "lead",
                deal_value: analysis.deal_update.deal_value
            }).eq('id', contactId);

            // Có thể append thêm tag product_name nếu cần thiết, tạm bỏ qua để đơn giản
            dealUpdated = true;
        }

        // 8. NẾU AI NHẬN DIỆN YÊU CẦU TẠO LỊCH/TASK -> TẠO FOLLOW_UPS
        let createdTask = null;
        if (analysis.is_task_request && analysis.task_title) {
            const { data: insertedFollowUp } = await supabase.from('follow_ups').insert([{
                tenant_id: tenantId,
                contact_id: contactId,
                type: analysis.task_type || 'follow_up',
                description: analysis.task_title,
                due_date: analysis.task_date || new Date().toISOString(),
                note: `[Zalo] Tự động tạo từ tin nhắn: "${messageText}".\nAI Phân tích: ${analysis.summary}`,
                status: 'pending',
                ai_created: true,
                channel: 'zalo',
                draft_message: analysis.suggested_reply
            }]).select().single();
            createdTask = insertedFollowUp;
        }

        return NextResponse.json({ success: true, ai_processed: true, analysis, createdTask, contactUpdated, dealUpdated });

    } catch (error: any) {
        console.error("Zalo Webhook Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
