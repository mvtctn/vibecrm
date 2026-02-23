"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockInteractions } from "@/lib/mock-data";
import { mockContacts } from "@/lib/mock-data";
import { formatDate, getChannelIcon, cn } from "@/lib/utils";
import { Interaction } from "@/types";
import { Bot, Sparkles, CheckCircle2, Tag, DollarSign, Calendar, Package, ArrowRight } from "lucide-react";

const channelFilters = [
    { value: "all", label: "Tất cả" },
    { value: "email", label: "📧 Email" },
    { value: "zalo", label: "💬 Zalo" },
    { value: "telegram", label: "✈️ Telegram" },
];

function AIAnalysisPanel({ msg }: { msg: Interaction | null }) {
    if (!msg) {
        return (
            <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                    <Bot className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">Chọn một tin nhắn để xem phân tích AI</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Original Message */}
            <div className="glass rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{getChannelIcon(msg.channel)}</span>
                    <span className="text-xs font-medium text-white capitalize">{msg.channel}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{formatDate(msg.created_at)}</span>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">{msg.content}</p>
            </div>

            {/* Contact Auto-linked */}
            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-xs text-muted-foreground mb-1">👤 Tự động gắn với</p>
                <p className="text-sm font-medium text-emerald-400">{msg.contact_name}</p>
            </div>

            {/* Extracted Entities */}
            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">AI Trích xuất</p>

                {msg.ai_extracted_intent && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-[10px] text-cyan-400/70 uppercase tracking-wider">Ý định</p>
                            <p className="text-xs text-white mt-0.5">{msg.ai_extracted_intent}</p>
                        </div>
                    </div>
                )}

                {msg.ai_extracted_amount && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-[10px] text-emerald-400/70 uppercase tracking-wider">Giá trị</p>
                            <p className="text-xs text-white mt-0.5">{msg.ai_extracted_amount.toLocaleString("vi-VN")}đ</p>
                        </div>
                    </div>
                )}

                {msg.ai_extracted_product && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/15">
                        <Package className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-[10px] text-purple-400/70 uppercase tracking-wider">Sản phẩm</p>
                            <p className="text-xs text-white mt-0.5">{msg.ai_extracted_product}</p>
                        </div>
                    </div>
                )}

                {msg.ai_extracted_date && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/15">
                        <Calendar className="w-3.5 h-3.5 text-yellow-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-[10px] text-yellow-400/70 uppercase tracking-wider">Ngày</p>
                            <p className="text-xs text-white mt-0.5">{formatDate(msg.ai_extracted_date)}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* AI Suggested Action */}
            {msg.ai_action && (
                <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-emerald-500/5 border border-cyan-500/20">
                    <p className="text-xs font-medium text-cyan-400 mb-1">⚡ Hành động đề xuất</p>
                    <p className="text-xs text-white">{msg.ai_action}</p>
                </div>
            )}

            {/* Stage Change */}
            {msg.stage_changed_to && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <p className="text-xs text-emerald-400 font-medium">
                        AI đã chuyển sang giai đoạn: <strong className="text-white">{msg.stage_changed_to}</strong>
                    </p>
                </div>
            )}

            {/* Sentiment */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-xs text-muted-foreground">Sentiment score</p>
                <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                            className={cn(
                                "h-full rounded-full",
                                msg.sentiment_score > 0.3 ? "bg-emerald-500" : msg.sentiment_score < -0.2 ? "bg-red-500" : "bg-yellow-500"
                            )}
                            style={{ width: `${Math.abs(msg.sentiment_score) * 100}%`, marginLeft: msg.sentiment_score < 0 ? "auto" : 0 }}
                        />
                    </div>
                    <span className="text-xs text-white font-medium">{(msg.sentiment_score * 100).toFixed(0)}%</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2 rounded-xl text-sm font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all">
                    ✅ Đã review
                </button>
                <button className="flex-1 py-2 rounded-xl text-sm font-medium bg-white/5 text-muted-foreground border border-border hover:text-white transition-all">
                    ✏️ Chỉnh sửa AI
                </button>
            </div>
        </div>
    );
}

export default function InboxPage() {
    const [selected, setSelected] = useState<Interaction | null>(mockInteractions[0] || null);
    const [channelFilter, setChannelFilter] = useState("all");

    const filtered = channelFilter === "all"
        ? mockInteractions
        : mockInteractions.filter((m) => m.channel === channelFilter);

    return (
        <div className="h-full flex flex-col p-6 pb-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
                        <Bot className="w-6 h-6 text-cyan-400" />
                        AI Inbox
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        AI tự động phân tích mọi tin nhắn từ Email, Zalo, Telegram
                    </p>
                </div>
                {/* AI Processing indicator */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <div className="flex gap-0.5">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                animate={{ scaleY: [1, 2, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                                className="inline-block w-0.5 h-3 bg-cyan-400 rounded-full"
                            />
                        ))}
                    </div>
                    <span className="text-xs text-cyan-400">AI đang xử lý...</span>
                </div>
            </div>

            {/* Channel Filters */}
            <div className="flex gap-1.5 mb-4">
                {channelFilters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setChannelFilter(f.value)}
                        className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                            channelFilter === f.value
                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                        )}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Split Pane */}
            <div className="flex-1 flex gap-4 min-h-0 overflow-hidden pb-6">
                {/* Message List */}
                <div className="w-80 shrink-0 flex flex-col gap-2 overflow-y-auto pr-1">
                    <AnimatePresence>
                        {filtered.map((msg, i) => (
                            <motion.button
                                key={msg.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelected(msg)}
                                className={cn(
                                    "w-full text-left p-3 rounded-xl border transition-all",
                                    selected?.id === msg.id
                                        ? "bg-cyan-500/10 border-cyan-500/30"
                                        : "glass border-border hover:border-white/20"
                                )}
                            >
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-base">{getChannelIcon(msg.channel)}</span>
                                    <span className="text-xs font-medium text-white flex-1 truncate">{msg.contact_name}</span>
                                    <span className="text-[10px] text-muted-foreground">{formatDate(msg.created_at).split(" ")[0]}</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">{msg.content}</p>
                                {msg.ai_extracted_intent && (
                                    <div className="mt-1.5 flex items-center gap-1">
                                        <Bot className="w-2.5 h-2.5 text-cyan-400" />
                                        <span className="text-[10px] text-cyan-400 truncate">{msg.ai_extracted_intent}</span>
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>

                {/* AI Analysis Panel */}
                <div className="flex-1 glass rounded-2xl border border-border flex flex-col overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <h3 className="font-heading font-semibold text-sm text-white">AI Analysis</h3>
                    </div>
                    <AIAnalysisPanel msg={selected} />
                </div>
            </div>
        </div>
    );
}
