"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Building2, User, Phone, Mail, ChevronRight, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Thông tin cơ bản", "Kết nối Zalo", "Chọn AI Engine", "Hoàn thành"] as const;

const aiOptions = [
    { id: "groq", name: "Groq", icon: "⚡", sub: "Llama 3.3 70B — Nhanh nhất, miễn phí cao", badge: "Khuyến nghị", badgeColor: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" },
    { id: "gemini", name: "Google Gemini", icon: "✨", sub: "Gemini 2.0 Flash — Đa năng & hiệu quả", badge: "Free tier", badgeColor: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
    { id: "openai", name: "OpenAI GPT-4o", icon: "🧠", sub: "GPT-4o — Chính xác nhất cho CRM phức tạp", badge: "Best quality", badgeColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
];

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({ name: "", slug: "", ownerName: "", phone: "", zaloPhone: "", zaioWebhook: "", aiProvider: "groq", apiKey: "" });

    const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const back = () => setStep((s) => Math.max(s - 1, 0));

    const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-lg">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 glow-cyan mb-4">
                        <Bot className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-white">Tạo Workspace mới</h1>
                    <p className="text-sm text-muted-foreground mt-1">Thiết lập VibeCRM cho bạn chỉ trong 2 phút</p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {steps.map((label, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all",
                                i < step ? "bg-emerald-500 border-emerald-500 text-white" :
                                    i === step ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" :
                                        "bg-white/5 border-border text-muted-foreground"
                            )}>
                                {i < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                            </div>
                            {i < steps.length - 1 && <div className={cn("w-8 h-px", i < step ? "bg-emerald-500" : "bg-border")} />}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass rounded-2xl p-6 border border-border"
                >
                    <h2 className="font-heading font-semibold text-white mb-5">{steps[step]}</h2>

                    {/* Step 0: Basic Info */}
                    {step === 0 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Tên workspace *</label>
                                <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="VD: Nguyễn Filter Co." className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5">Workspace URL (slug) *</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">vibecrm.app/</span>
                                    <input value={form.slug} onChange={(e) => update("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="nguyen-filter" className="flex-1 px-3 py-2.5 text-sm bg-card border border-border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors font-mono" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Họ tên của bạn *</label>
                                <input value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} placeholder="Nguyễn Văn A" className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Số điện thoại</label>
                                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0912345678" className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors" />
                            </div>
                        </div>
                    )}

                    {/* Step 1: Zalo Connection */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-sm">
                                <p className="font-medium text-white flex items-center gap-2 mb-1.5">
                                    💬 Kết nối Zalo cá nhân của bạn
                                </p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    VibeCRM sẽ đọc tin nhắn Zalo <strong className="text-white">của riêng bạn</strong> để tự động tạo lead,
                                    cập nhật CRM và nhắc follow-up. Dữ liệu chỉ thuộc workspace này.
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5">Số điện thoại Zalo *</label>
                                <input value={form.zaloPhone} onChange={(e) => update("zaloPhone", e.target.value)} placeholder="0912345678 (SĐT đăng ký Zalo)" className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5">Zalo OA Webhook URL (tự động tạo)</label>
                                <div className="px-3 py-2.5 text-sm bg-card border border-border rounded-xl text-cyan-400 font-mono text-xs select-all">
                                    {form.slug ? `https://api.vibecrm.app/webhook/zalo/${form.slug || "your-workspace"}` : "Điền workspace slug ở bước 1 trước"}
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1">Copy URL này vào Zalo Official Account → Webhook Settings</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                <p className="text-xs font-medium text-white mb-2">Cách kết nối Zalo:</p>
                                {["Truy cập developers.zalo.me", "Tạo App → Lấy App ID & Secret", "Thêm Webhook URL ở trên vào Zalo App", "Bật permissions: message.receive, user.info"].map((s, i) => (
                                    <p key={i} className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                                        <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                                        {s}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: AI Engine */}
                    {step === 2 && (
                        <div className="space-y-3">
                            <p className="text-xs text-muted-foreground mb-3">Chọn AI engine phân tích tin nhắn cho workspace của bạn:</p>
                            {aiOptions.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => update("aiProvider", opt.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all",
                                        form.aiProvider === opt.id
                                            ? "bg-cyan-500/10 border-cyan-500/30"
                                            : "bg-white/[0.02] border-border hover:border-white/20"
                                    )}
                                >
                                    <span className="text-2xl">{opt.icon}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-white">{opt.name}</p>
                                            <span className={cn("text-[10px] px-1.5 py-0.5 rounded border", opt.badgeColor)}>{opt.badge}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
                                    </div>
                                    {form.aiProvider === opt.id && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                                </button>
                            ))}
                            <div className="mt-3">
                                <label className="block text-xs text-muted-foreground mb-1.5">API Key (có thể thêm sau)</label>
                                <input type="password" value={form.apiKey} onChange={(e) => update("apiKey", e.target.value)} placeholder="Nhập API key..." className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors font-mono" />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Done */}
                    {step === 3 && (
                        <div className="text-center py-4">
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                                className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center mx-auto mb-5 glow-cyan"
                            >
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            </motion.div>
                            <h3 className="text-xl font-heading font-bold text-white mb-2">Workspace đã sẵn sàng! 🎉</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                <strong className="text-cyan-400">{form.name || "Workspace của bạn"}</strong> đã được tạo.<br />
                                AI ({aiOptions.find((a) => a.id === form.aiProvider)?.name}) đang sẵn sàng xử lý tin nhắn Zalo.
                            </p>
                            <div className="space-y-2 text-left mb-6">
                                {[
                                    `Workspace: ${form.slug || "your-workspace"}`,
                                    `Zalo: ${form.zaloPhone || "(chưa kết nối)"}`,
                                    `AI: ${aiOptions.find((a) => a.id === form.aiProvider)?.name}`,
                                ].map((s) => (
                                    <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {s}
                                    </div>
                                ))}
                            </div>
                            <a href="/">
                                <button className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 text-white glow-cyan hover:opacity-90 transition-opacity">
                                    Vào Dashboard →
                                </button>
                            </a>
                        </div>
                    )}
                </motion.div>

                {/* Nav Buttons */}
                {step < steps.length - 1 && (
                    <div className="flex gap-3 mt-4">
                        {step > 0 && (
                            <button onClick={back} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-white/5 text-muted-foreground border border-border hover:text-white transition-all">
                                ← Quay lại
                            </button>
                        )}
                        <button
                            onClick={next}
                            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            {step === steps.length - 2 ? "Hoàn thành" : "Tiếp theo"} <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
