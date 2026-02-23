"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate, getChannelIcon, getUrgencyLabel, cn } from "@/lib/utils";
import { FollowUp } from "@/types";
import { Bell, Bot, CheckCircle2, Clock, AlertCircle, Send, Timer, CalendarClock, Trash2, Plus, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTenant } from "@/lib/tenant-context";

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

function FollowUpCard({ followUp, onDone, onDelete }: { followUp: FollowUp; onDone: (id: string) => void; onDelete: (id: string) => void }) {
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
                        <button onClick={() => onDelete(followUp.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />
                            Xoá
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function FollowUpsPage() {
    const { currentTenant } = useTenant();
    const [followUps, setFollowUps] = useState<FollowUp[]>([]);
    const [loading, setLoading] = useState(true);
    const [allContacts, setAllContacts] = useState<any[]>([]);

    // Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        contact_id: "",
        note: "",
        due_date: new Date().toISOString().slice(0, 16),
        channel: "manual",
    });

    const fetchFollowUps = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('follow_ups')
            .select('*')
            .eq('tenant_id', currentTenant.id)
            .order('due_date', { ascending: true });

        if (error) console.error("Error fetching follow-ups:", error);
        else setFollowUps(data || []);

        // Fetch contacts for the select dropdown
        const { data: cData } = await supabase.from('contacts').select('id, name').eq('tenant_id', currentTenant.id);
        if (cData) setAllContacts(cData);

        setLoading(false);
    };

    useEffect(() => {
        if (currentTenant.id) fetchFollowUps();
    }, [currentTenant.id]);

    const handleDone = async (id: string) => {
        const { error } = await supabase.from('follow_ups').update({ status: 'done' }).eq('id', id);
        if (!error) {
            setFollowUps((prev) => prev.map((f) => f.id === id ? { ...f, status: "done" as const } : f));
        } else {
            console.error(error);
            alert("Lỗi khi cập nhật trạng thái!");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Xoá lịch nhắc nhở này?")) return;
        const { error } = await supabase.from('follow_ups').delete().eq('id', id);
        if (!error) {
            setFollowUps((prev) => prev.filter((f) => f.id !== id));
        } else {
            console.error(error);
            alert("Lỗi khi xoá!");
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const selectedContact = allContacts.find(c => c.id === formData.contact_id);
            const { error } = await supabase.from('follow_ups').insert([{
                tenant_id: currentTenant.id,
                contact_id: formData.contact_id || null,
                contact_name: selectedContact?.name || "Thủ công",
                type: 'follow_up',
                status: 'pending',
                note: formData.note,
                due_date: new Date(formData.due_date).toISOString(),
                channel: formData.channel,
                ai_created: false
            }]);

            if (error) throw error;
            setIsAddModalOpen(false);
            setFormData({ contact_id: "", note: "", due_date: new Date().toISOString().slice(0, 16), channel: "manual" });
            fetchFollowUps();
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra khi lưu lịch nhắc!");
        } finally {
            setIsSubmitting(false);
        }
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
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-xs font-semibold text-white hover:opacity-90 transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Thêm Lịch nhắc
                    </button>
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
                            {overdue.map((f) => <FollowUpCard key={f.id} followUp={f} onDone={handleDone} onDelete={handleDelete} />)}
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
                            {today.map((f) => <FollowUpCard key={f.id} followUp={f} onDone={handleDone} onDelete={handleDelete} />)}
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
                            {upcoming.map((f) => <FollowUpCard key={f.id} followUp={f} onDone={handleDone} onDelete={handleDelete} />)}
                        </AnimatePresence>
                    </div>
                </section>
            )}

            {loading && (
                <div className="flex justify-center items-center py-12 text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            )}

            {/* Modal Add Follow Up */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Thêm lịch Reminder / Follow-up</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-muted-foreground hover:text-white rounded-lg hover:bg-white/10">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Khách hàng liên quan (Không bắt buộc)</label>
                                <select value={formData.contact_id} onChange={e => setFormData({ ...formData, contact_id: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                                    <option value="">-- Để trống --</option>
                                    {allContacts.map(c => (
                                        <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Nội dung nhắc việc *</label>
                                <input required value={formData.note} onChange={e => setFormData({ ...formData, note: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" placeholder="Gửi báo giá..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">Thời hạn (Due Date) *</label>
                                    <input type="datetime-local" required value={formData.due_date} onChange={e => setFormData({ ...formData, due_date: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">Nguồn kênh (Channel)</label>
                                    <select value={formData.channel} onChange={e => setFormData({ ...formData, channel: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                                        <option value="manual">Thủ công</option>
                                        <option value="zalo">Zalo</option>
                                        <option value="telegram">Telegram</option>
                                        <option value="email">Email</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors">Huỷ</button>
                                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 disabled:opacity-50 flex items-center gap-2">
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Tạo nhắc việc
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
