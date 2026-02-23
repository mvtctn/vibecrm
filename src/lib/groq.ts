import Groq from "groq-sdk";

// Khởi tạo client tĩnh (nên được dùng chủ yếu ở Server Actions hoặc API Routes)
export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || "",
    // dangerouslyAllowBrowser: true, // Bỏ comment cấu hình này nếu gọi trực tiếp trên front-end (chỉ dùng cho mục đích cá nhân/test)
});
