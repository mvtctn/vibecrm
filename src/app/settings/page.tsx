"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Zap, Shield, CreditCard, ToggleLeft, ToggleRight, CheckCircle2, Bot, Eye, EyeOff, ChevronDown, Palette, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { supabase } from "@/lib/supabase";
import { useTenant } from "@/lib/tenant-context";

const channels = [
    { id: "gmail", name: "Gmail", icon: "📧", description: "Đọc và phân tích email tự động", connected: true, account: "yourname@gmail.com" },
    { id: "zalo", name: "Zalo", icon: "💬", description: "Kết nối qua Zalo Official Account API", connected: true, account: "VibeCRM Bot" },
    { id: "telegram", name: "Telegram", icon: "✈️", description: "Bot Telegram nhận tin nhắn", connected: false, account: null },
];

const aiSettings = [
    { id: "auto_stage", label: "Tự động thay đổi stage", description: "AI chuyển deal khi phát hiện tín hiệu", enabled: true },
    { id: "auto_lead", label: "Tự động tạo Lead mới", description: "AI tạo contact khi gặp người lạ", enabled: true },
    { id: "auto_followup", label: "Tự động tạo Follow-up", description: "AI lên lịch nhắc khi phát hiện deadline", enabled: true },
    { id: "auto_send", label: "Tự động gửi tin nhắn", description: "AI gửi theo khung giờ vàng (8-9h, 19-20h)", enabled: false },
    { id: "sentiment", label: "Phân tích Sentiment", description: "Đánh giá cảm xúc từng tin nhắn", enabled: true },
];

const aiProviders = [
    {
        id: "groq",
        name: "Groq",
        logo: "⚡",
        description: "Siêu nhanh — Llama 3.3 70B, Mixtral",
        badge: "Fastest",
        badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
        models: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"],
        placeholder: "gsk_...",
    },
    {
        id: "gemini",
        name: "Google Gemini",
        logo: "✨",
        description: "Đa phương thức — Gemini 2.0 Flash, Pro",
        badge: "Multimodal",
        badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        models: ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
        placeholder: "AIza...",
    },
    {
        id: "openai",
        name: "OpenAI",
        logo: "🧠",
        description: "GPT-4o, o3-mini — Phân tích sâu nhất",
        badge: "Most Accurate",
        badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        models: ["gpt-4o", "gpt-4o-mini", "o3-mini"],
        placeholder: "sk-...",
    },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className="shrink-0">
            {enabled ? <ToggleRight className="w-8 h-8 text-cyan-400" /> : <ToggleLeft className="w-8 h-8 text-muted-foreground" />}
        </button>
    );
}

export default function SettingsPage() {
    const { currentTenant } = useTenant();
    const [channelStates, setChannelStates] = useState(Object.fromEntries(channels.map((c) => [c.id, c.connected])));
    const [aiStates, setAIStates] = useState(Object.fromEntries(aiSettings.map((s) => [s.id, s.enabled])));
    const [selectedProvider, setSelectedProvider] = useState("groq");
    const [selectedModel, setSelectedModel] = useState<Record<string, string>>({
        groq: "llama-3.3-70b-versatile",
        gemini: "gemini-2.0-flash",
        openai: "gpt-4o",
    });
    const [apiKeys, setApiKeys] = useState<Record<string, string>>({ groq: "", gemini: "", openai: "" });
    const [showKey, setShowKey] = useState<Record<string, boolean>>({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            if (!currentTenant.id) return;
            const { data, error } = await supabase.from('tenants').select('api_keys, ai_provider').eq('id', currentTenant.id).single();
            if (data && !error) {
                if (data.api_keys) setApiKeys(data.api_keys);
                if (data.ai_provider) setSelectedProvider(data.ai_provider);
            }
        };
        fetchSettings();
    }, [currentTenant.id]);

    const handleSaveAPIKeys = async () => {
        if (!currentTenant.id) return;
        setIsSaving(true);
        try {
            const { error } = await supabase.from('tenants').update({
                api_keys: apiKeys,
                ai_provider: selectedProvider
            }).eq('id', currentTenant.id);
            if (error) throw error;
            alert("Lưu cấu hình AI thành công!");
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra khi lưu!");
        } finally {
            setIsSaving(false);
        }
    };

    const currentProvider = aiProviders.find((p) => p.id === selectedProvider)!;

    return (
        <div className="p-6 space-y-6 max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
                    <Settings className="w-6 h-6 text-muted-foreground" />
                    Cài đặt
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">Quản lý kết nối kênh và hành vi AI</p>
            </div>

            {/* ── AI Engine Section ── */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                    <Bot className="w-4 h-4 text-cyan-400" />
                    <h2 className="font-heading font-semibold text-white">AI Engine</h2>
                    <span className="ml-auto text-xs text-muted-foreground">Chọn nhà cung cấp AI cho VibeCRM</span>
                </div>

                {/* Provider Cards */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                    {aiProviders.map((provider) => (
                        <button
                            key={provider.id}
                            onClick={() => setSelectedProvider(provider.id)}
                            className={cn(
                                "p-3 rounded-xl border text-left transition-all",
                                selectedProvider === provider.id
                                    ? "bg-cyan-500/10 border-cyan-500/30 glow-cyan"
                                    : "bg-white/[0.02] border-border hover:border-white/20"
                            )}
                        >
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xl">{provider.logo}</span>
                                {selectedProvider === provider.id && (
                                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                )}
                            </div>
                            <p className="text-sm font-semibold text-white">{provider.name}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{provider.description}</p>
                            <span className={cn("inline-block mt-2 px-1.5 py-0.5 rounded text-[10px] border", provider.badgeColor)}>
                                {provider.badge}
                            </span>
                        </button>
                    ))}
                </div>

                {/* API Key + Model for selected provider */}
                <div className="space-y-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <p className="text-xs font-medium text-white">
                        {currentProvider.logo} {currentProvider.name} Configuration
                    </p>

                    {/* API Key */}
                    <div>
                        <label className="block text-xs text-muted-foreground mb-1.5">API Key</label>
                        <div className="relative">
                            <input
                                type={showKey[selectedProvider] ? "text" : "password"}
                                value={apiKeys[selectedProvider] || ""}
                                onChange={(e) => setApiKeys((prev) => ({ ...prev, [selectedProvider]: e.target.value }))}
                                placeholder={currentProvider.placeholder}
                                className="w-full pr-10 pl-3 py-2 text-sm bg-card border border-border rounded-xl text-white placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
                            />
                            <button
                                onClick={() => setShowKey((prev) => ({ ...prev, [selectedProvider]: !prev[selectedProvider] }))}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                            >
                                {showKey[selectedProvider] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                            Key được mã hoá an toàn trên database. Nếu để trống, hệ thống sẽ sử dụng key mặc định của Admin.
                        </p>
                    </div>

                    {/* Model Selection */}
                    <div>
                        <label className="block text-xs text-muted-foreground mb-1.5">Model</label>
                        <div className="relative">
                            <select
                                value={selectedModel[selectedProvider]}
                                onChange={(e) => setSelectedModel((prev) => ({ ...prev, [selectedProvider]: e.target.value }))}
                                className="w-full appearance-none pl-3 pr-8 py-2 text-sm bg-card border border-border rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                            >
                                {currentProvider.models.map((m) => (
                                    <option key={m} value={m} className="bg-card">{m}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                        </div>
                    </div>

                    {/* Save Config */}
                    <div className="flex gap-2">
                        <button onClick={handleSaveAPIKeys} disabled={isSaving} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium bg-cyan-500 text-white hover:bg-cyan-600 transition-all disabled:opacity-50">
                            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                            Lưu cấu hình AI
                        </button>
                        <button className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-muted-foreground hover:text-white transition-all">
                            Test API
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* Connected Channels */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-cyan-400" fill="currentColor" />
                    <h2 className="font-heading font-semibold text-white">Kênh kết nối</h2>
                </div>
                <div className="space-y-3">
                    {channels.map((channel) => (
                        <div key={channel.id} className={cn(
                            "flex flex-col gap-4 p-4 rounded-xl border transition-all",
                            channelStates[channel.id] ? "bg-emerald-500/5 border-emerald-500/20" : "bg-white/[0.02] border-border"
                        )}>
                            <div className="flex items-center gap-4">
                                <div className="text-2xl">{channel.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-white">{channel.name}</p>
                                        {channelStates[channel.id] && (
                                            <div className="flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ai-pulse" />
                                                <span className="text-[10px] text-emerald-400">Kết nối</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">{channel.description}</p>
                                    {channel.account && channelStates[channel.id] && (
                                        <p className="text-[11px] text-cyan-400 mt-0.5">{channel.account}</p>
                                    )}
                                </div>
                                <Toggle enabled={channelStates[channel.id]} onChange={() => setChannelStates((prev) => ({ ...prev, [channel.id]: !prev[channel.id] }))} />
                            </div>

                            {/* Webhook Settings for specific channels */}
                            {channelStates[channel.id] && (channel.id === "zalo" || channel.id === "telegram") && (
                                <div className="mt-2 p-3 rounded-lg bg-black/20 border border-white/5 space-y-3">
                                    <div>
                                        <label className="block text-xs text-muted-foreground mb-1">Webhook URL</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                defaultValue={`https://vibecrm.app/api/webhooks/${channel.id}/${currentTenant.id || 'YOUR_TENANT_ID'}`}
                                                readOnly
                                                className="flex-1 px-3 py-1.5 text-xs bg-card border border-border rounded-lg text-white/70 font-mono outline-none"
                                            />
                                            <button className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-white rounded-lg border border-border transition-colors">
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-muted-foreground mb-1">{channel.name} Token / Secret</label>
                                        <input
                                            type="password"
                                            placeholder={`Nhập ${channel.name} App ID / Token`}
                                            className="w-full px-3 py-1.5 text-xs bg-card border border-border rounded-lg text-white placeholder:text-muted-foreground/50 focus:border-cyan-500/50 outline-none transition-colors"
                                        />
                                    </div>
                                    <button className="w-full py-1.5 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all">
                                        Lưu cấu hình {channel.name}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* AI Behavior */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-2xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <h2 className="font-heading font-semibold text-white">Hành vi AI</h2>
                </div>
                <div className="space-y-1">
                    {aiSettings.map((setting) => (
                        <div key={setting.id} className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white">{setting.label}</p>
                                <p className="text-xs text-muted-foreground">{setting.description}</p>
                            </div>
                            <Toggle enabled={aiStates[setting.id]} onChange={() => setAIStates((prev) => ({ ...prev, [setting.id]: !prev[setting.id] }))} />
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Subscription */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-4 h-4 text-yellow-400" />
                    <h2 className="font-heading font-semibold text-white">Gói dịch vụ</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-border">
                        <p className="font-heading font-semibold text-white">Free</p>
                        <p className="text-2xl font-bold text-white mt-1">$0<span className="text-sm text-muted-foreground">/tháng</span></p>
                        <div className="mt-3 space-y-1.5">
                            {["10 contacts đầu", "3 kênh kết nối", "AI phân tích cơ bản"].map((f) => (
                                <p key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 text-muted-foreground" /> {f}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/15 to-emerald-500/10 border border-cyan-500/30 glow-cyan relative overflow-hidden">
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] border border-cyan-500/30">CURRENT</div>
                        <p className="font-heading font-semibold text-white">Pro</p>
                        <p className="text-2xl font-bold gradient-text-cyan mt-1">$19<span className="text-sm text-white/60">/tháng</span></p>
                        <div className="mt-3 space-y-1.5">
                            {["Unlimited contacts", "AI auto follow-up", "Voice to Task", "Bring your own AI key"].map((f) => (
                                <p key={f} className="text-xs text-white/80 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 text-cyan-400" /> {f}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Appearance Section */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass rounded-2xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-4 h-4 text-pink-400" />
                    <h2 className="font-heading font-semibold text-white">Giao diện</h2>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="text-sm font-medium text-white">Chế độ hiển thị</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Tùy chỉnh giao diện Sáng tối của ứng dụng</p>
                    </div>
                    <ThemeToggle />
                </div>
            </motion.section>
        </div>
    );
}
