"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { mockContacts, mockInteractions, mockAISuggestions } from "@/lib/mock-data";
import { formatDate, formatTimeAgo, formatCurrency, getChannelIcon, getStageColor, getStageLabel, getSentimentColor, cn } from "@/lib/utils";
import { ArrowLeft, Brain, Zap, TrendingUp, Phone, Mail, Building2, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface Props {
    params: Promise<{ id: string }>;
}

export default function ContactDetailPage({ params }: Props) {
    const { id } = use(params);
    const contact = mockContacts.find((c) => c.id === id);
    const interactions = mockInteractions.filter((i) => i.contact_id === id);
    const suggestions = mockAISuggestions.filter((s) => s.contact_id === id);

    if (!contact) {
        return (
            <div className="p-6 text-center text-muted-foreground">
                Contact không tồn tại.{" "}
                <Link href="/contacts" className="text-cyan-400 hover:underline">
                    Quay lại
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-5">
            {/* Back + Header */}
            <div className="flex items-start gap-4">
                <Link href="/contacts">
                    <button className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-white transition-all mt-1">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-white text-2xl font-bold font-heading">
                            {contact.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-heading font-bold text-white">{contact.name}</h1>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Building2 className="w-3.5 h-3.5" /> {contact.company}
                                </span>
                                <span className="text-muted-foreground">·</span>
                                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Phone className="w-3.5 h-3.5" /> {contact.phone}
                                </span>
                                <span className="text-muted-foreground">·</span>
                                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Mail className="w-3.5 h-3.5" /> {contact.email}
                                </span>
                            </div>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <span className={cn("px-3 py-1.5 rounded-full text-sm font-medium border", getStageColor(contact.stage))}>
                                {getStageLabel(contact.stage)}
                            </span>
                            <span className={cn("text-sm font-medium", getSentimentColor(contact.sentiment))}>
                                {contact.sentiment === "positive" ? "😊 Tích cực" : contact.sentiment === "urgent" ? "🚨 Khẩn cấp" : contact.sentiment === "cold" ? "❄️ Lạnh" : "😐 Trung lập"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {/* Left: AI Summary + Deal Info */}
                <div className="space-y-4">
                    {/* AI Smart Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass rounded-2xl p-4 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-emerald-500/3"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Brain className="w-4 h-4 text-cyan-400" />
                            <h3 className="font-heading font-semibold text-sm text-white">AI Smart Summary</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{contact.ai_summary}</p>
                    </motion.div>

                    {/* Deal Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass rounded-2xl p-4 border border-border"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <h3 className="font-heading font-semibold text-sm text-white">Deal Info</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">Giá trị</span>
                                <span className="text-sm font-semibold text-emerald-400">{formatCurrency(contact.deal_value)}đ</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">Xác suất</span>
                                <span className="text-sm font-semibold text-white">{contact.deal_probability}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-white/10">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                                    style={{ width: `${contact.deal_probability}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">Nguồn</span>
                                <span className="text-sm">{getChannelIcon(contact.channel_source)} {contact.channel_source}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">Liên hệ cuối</span>
                                <span className="text-xs text-muted-foreground">{formatTimeAgo(contact.last_contact_at)}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {contact.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-muted-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* AI Suggestions */}
                    {suggestions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass rounded-2xl p-4 border border-border"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                <h3 className="font-heading font-semibold text-sm text-white">AI Gợi ý</h3>
                            </div>
                            <div className="space-y-2">
                                {suggestions.map((s) => (
                                    <div key={s.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                        <p className="text-xs font-medium text-white">{s.title}</p>
                                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{s.draft_message}</p>
                                        <div className="flex gap-2 mt-2">
                                            <button className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all">
                                                Gửi ngay
                                            </button>
                                            <button className="px-2.5 py-1 rounded-lg text-[11px] text-muted-foreground hover:text-white hover:bg-white/5 transition-all">
                                                Bỏ qua
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right: Interaction Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="col-span-2 glass rounded-2xl p-5 border border-border"
                >
                    <h3 className="font-heading font-semibold text-white mb-4">Lịch sử Tương tác</h3>
                    {interactions.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">Chưa có tương tác nào.</p>
                    ) : (
                        <div className="space-y-4">
                            {interactions.map((interaction, i) => (
                                <motion.div
                                    key={interaction.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex gap-3"
                                >
                                    {/* Timeline line */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-base shrink-0">
                                            {getChannelIcon(interaction.channel)}
                                        </div>
                                        {i < interactions.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                                    </div>
                                    {/* Content */}
                                    <div className="flex-1 pb-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-medium text-white capitalize">{interaction.channel}</span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground">
                                                {interaction.direction === "inbound" ? "← Đến" : "→ Gửi"}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground ml-auto flex items-center gap-1">
                                                <Clock className="w-2.5 h-2.5" />
                                                {formatDate(interaction.created_at)}
                                            </span>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                            <p className="text-sm text-white/90">{interaction.content}</p>
                                        </div>
                                        {/* AI Analysis */}
                                        {(interaction.ai_extracted_intent || interaction.ai_action) && (
                                            <div className="mt-2 p-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
                                                {interaction.ai_extracted_intent && (
                                                    <p className="text-[11px] text-cyan-300/80">
                                                        <span className="text-cyan-400 font-medium">🧠 AI phát hiện:</span> {interaction.ai_extracted_intent}
                                                    </p>
                                                )}
                                                {interaction.ai_extracted_amount && (
                                                    <p className="text-[11px] text-emerald-400 mt-0.5">
                                                        💰 Giá trị: {formatCurrency(interaction.ai_extracted_amount)}đ
                                                    </p>
                                                )}
                                                {interaction.ai_extracted_product && (
                                                    <p className="text-[11px] text-purple-400 mt-0.5">
                                                        📦 Sản phẩm: {interaction.ai_extracted_product}
                                                    </p>
                                                )}
                                                {interaction.ai_action && (
                                                    <p className="text-[11px] text-yellow-400/80 mt-0.5">
                                                        ⚡ {interaction.ai_action}
                                                    </p>
                                                )}
                                                {interaction.stage_changed_to && (
                                                    <p className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> Chuyển sang: <strong>{getStageLabel(interaction.stage_changed_to)}</strong>
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
