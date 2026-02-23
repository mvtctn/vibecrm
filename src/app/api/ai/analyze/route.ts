import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { SYSTEM_PROMPT_ANALYZE_MESSAGE, AIAnalysisResult } from "@/lib/ai-prompt";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, tenantId } = body;

        if (!message) {
            return NextResponse.json({ error: "Vui lòng cung cấp nội dung tin nhắn (message)" }, { status: 400 });
        }

        // 1. Khởi tạo API Key mặc định của Admin
        let apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || "";

        // 2. Kiểm tra nếu có tenantId thì lấy API Key của User (nếu họ đã cài)
        if (tenantId) {
            const { data: tenant } = await supabase.from('tenants').select('api_keys').eq('id', tenantId).single();
            if (tenant?.api_keys?.groq) {
                apiKey = tenant.api_keys.groq;
                console.log("Using custom Groq API Key for tenant:", tenantId);
            }
        }

        if (!apiKey) {
            return NextResponse.json({ error: "Lỗi cấu hình: Không tìm thấy API Key cho Groq" }, { status: 500 });
        }

        // 3. Khởi tạo instance Groq mới với API Key động
        const customGroq = new Groq({ apiKey });

        // Gọi API Groq
        const chatCompletion = await customGroq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT_ANALYZE_MESSAGE,
                },
                {
                    role: "user",
                    content: `Tin nhắn khách hàng:\n"""\n${message}\n"""`,
                }
            ],
            model: "llama-3.3-70b-versatile", // Có thể thay bằng "llama3-8b-8192" nếu cần tốc độ nhanh hơn
            temperature: 0.1, // Nhiệt độ thấp để xuất JSON ổn định
            response_format: { type: "json_object" },
        });

        const content = chatCompletion.choices[0]?.message?.content;
        if (!content) {
            throw new Error("Groq API trả về dữ liệu rỗng.");
        }

        // Parse kết quả trả về
        const analysis: AIAnalysisResult = JSON.parse(content);

        return NextResponse.json({ success: true, data: analysis });

    } catch (error: any) {
        console.error("Groq Analysis Error:", error);
        return NextResponse.json(
            { error: "Lỗi trong quá trình AI phân tích", details: error.message },
            { status: 500 }
        );
    }
}
