import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { SYSTEM_PROMPT_ANALYZE_MESSAGE, AIAnalysisResult } from "@/lib/ai-prompt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json({ error: "Vui lòng cung cấp nội dung tin nhắn (message)" }, { status: 400 });
        }

        // Gọi API Groq
        const chatCompletion = await groq.chat.completions.create({
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
