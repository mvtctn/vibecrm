"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockFollowUps } from "@/lib/mock-data";
import { formatDate, getChannelIcon, getUrgencyLabel, cn } from "@/lib/utils";
import { FollowUp } from "@/types";
import { Bell, Bot, CheckCircle2, Clock, AlertCircle, Send, Timer, CalendarClock } from "lucide-react";

const urgencyConfig = {
    overdue: {
        label: "Quá hạn",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        dot: "bg-red-400",
        icon: AlertCircle,
    },
    today: {
        label: "Hôm nay",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        dot: "bg-orange-400",
        icon: Clock,
    },
    tomorrow: {
        label: "Ngày mai",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        dot: "bg-yellow-400",
        icon: Clock,
    },
    upcoming: {
        label: "Sắp tới",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        dot: "bg-blue-400",
        icon: CalendarClock,
    },
};

function FollowUpCard({ followUp, onDone }: { followUp: FollowUp; onDone: (id: string) => void }) {
    const [expanded, setExpanded] = useState(false);
    const urgency = getUrgencyLabel(followUp.due_date);
    const config = urgencyConfig[urgency];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={cn("rounded-2xl border p-4 transition-all", config.bg, config.border)}
        >
            <div className="flex items-start gap-3">
                {/* Urgency indicator */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className={cn("w-2.5 h-2.5 rounded-full", config.dot)} />
                    <span className="text-base mt-0.5">{getChannelIcon(followUp.channel)}</span>
                </div>

                <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-white">{followUp.contact_name}</p>
                                <span className="text-xs text-muted-foreground">{followUp.company}</span>
                                {followUp.ai_created && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-0.5">
                                        <Bot className="w-2.5 h-2.5" /> AI
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{followUp.note}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            <config.icon className={cn("w-3.5 h-3.5", config.color)} />
                            <span className={cn("text-xs font-medium", config.color)}>{config.label}</span>
                        </div>
                    </div>

                    {/* Due date */}
                    <p className="text-[11px] text-muted-foreground/70 mt-1">
                        📅 {formatDate(followUp.due_date)}
                    </p>

                    {/* Draft message */}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        {expanded ? "▼ Ẩn bản nháp AI" : "▶ Xem bản nháp AI"}
                    </button>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-2 p-3 rounded-xl bg-black/20 border border-white/10">
                                    <p className="text-xs text-white/80 leading-relaxed">{followUp.draft_message}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => onDone(followUp.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
                        >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Đã xong
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all">
                            <Send className="w-3.5 h-3.5" />
                            Gửi ngay
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-white hover:bg-white/5 transition-all">
                            <Timer className="w-3.5 h-3.5" />
                            Hoãn
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function FollowUpsPage() {
    const [followUps, setFollowUps] = useState<FollowUp[]>(mockFollowUps);

    const handleDone = (id: string) => {
        setFollowUps((prev) => prev.map((f) => f.id === id ? { ...f, status: "done" as const } : f));
    };

    const pending = followUps.filter((f) => f.status === "pending");
    const done = followUps.filter((f) => f.status === "done");

    const overdue = pending.filter((f) => getUrgencyLabel(f.due_date) === "overdue");
    const today = pending.filter((f) => getUrgencyLabel(f.due_date) === "today");
    const upcoming = pending.filter((f) => ["tomorrow", "upcoming"].includes(getUrgencyLabel(f.due_date)));

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
                        <Bell className="w-6 h-6 text-orange-400" />
                        Follow-ups
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-cyan-400" />
                        AI tự động soạn tin nhắn và lên lịch nhắc
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="glass rounded-xl px-3 py-2 text-xs text-muted-foreground border border-border">
                        {pending.length} pending · {done.length} done
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3">
                {[
                    { label: "Quá hạn", count: overdue.length, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
                    { label: "Hôm nay", count: today.length, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
                    { label: "Sắp tới", count: upcoming.length, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                    { label: "Hoàn thành", count: done.length, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                ].map((stat) => (
                    <div key={stat.label} className={cn("rounded-xl p-3 border", stat.bg)}>
                        <p className={cn("text-2xl font-heading font-bold", stat.color)}>{stat.count}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Overdue */}
            {overdue.length > 0 && (
                <section>
                    <h2 className="text-sm font-semibold text-red-400 flex items-center gap-1.5 mb-3">
                        <AlertCircle className="w-4 h-4" /> Quá hạn ({overdue.length})
                    </h2>
                    <div className="space-y-3">
                        <AnimatePresence>
                            {overdue.map((f) => <FollowUpCard key={f.id} followUp={f} onDone={handleDone} />)}
                        </AnimatePresence>
                    </div>
                </section>
            )}

            {/* Today */}
            {today.length > 0 && (
                <section>
                    <h2 className="text-sm font-semibold text-orange-400 flex items-center gap-1.5 mb-3">
                        <Clock className="w-4 h-4" /> Hôm nay ({today.length})
                    </h2>
                    <div className="space-y-3">
                        <AnimatePresence>
                            {today.map((f) => <FollowUpCard key={f.id} followUp={f} onDone={handleDone} />)}
                        </AnimatePresence>
                    </div>
                </section>
            )}

            {/* Upcoming */}
            {upcoming.length > 0 && (
                <section>
                    <h2 className="text-sm font-semibold text-blue-400 flex items-center gap-1.5 mb-3">
                        <CalendarClock className="w-4 h-4" /> Sắp tới ({upcoming.length})
                    </h2>
                    <div className="space-y-3">
                        <AnimatePresence>
                            {upcoming.map((f) => <FollowUpCard key={f.id} followUp={f} onDone={handleDone} />)}
                        </AnimatePresence>
                    </div>
                </section>
            )}
        </div>
    );
}
