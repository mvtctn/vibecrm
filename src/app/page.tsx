"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    TrendingUp,
    Bell,
    MessageSquare,
    ArrowUpRight,
    Zap,
    Mic,
    MicOff,
    CheckCircle2,
} from "lucide-react";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    Legend
} from "recharts";
import { mockDashboardStats, mockAIActivityFeed, mockFollowUps, mockPipelineFunnelData, mockLeadSourcesData } from "@/lib/mock-data";
import { formatCurrency, formatTimeAgo, getChannelIcon, cn } from "@/lib/utils";
import { AIActivityFeed } from "@/components/ai/AIActivityFeed";
import { FollowUpMini } from "@/components/follow-ups/FollowUpMini";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useTenant } from "@/lib/tenant-context";
import { FollowUp } from "@/types";

const kpiCards = [
    {
        label: "Tổng Contacts",
        value: "47",
        change: "+3 tuần này",
        icon: Users,
        color: "from-blue-500/20 to-blue-500/5",
        iconColor: "text-blue-400",
        borderColor: "border-blue-500/20",
    },
    {
        label: "Deals Active",
        value: "5",
        change: "430M pipeline",
        icon: TrendingUp,
        color: "from-emerald-500/20 to-emerald-500/5",
        iconColor: "text-emerald-400",
        borderColor: "border-emerald-500/20",
    },
    {
        label: "Follow-ups Hôm nay",
        value: "3",
        change: "1 quá hạn!",
        icon: Bell,
        color: "from-orange-500/20 to-orange-500/5",
        iconColor: "text-orange-400",
        borderColor: "border-orange-500/20",
    },
    {
        label: "AI Tin nhắn Đã xử lý",
        value: "128",
        change: "+24 hôm nay",
        icon: MessageSquare,
        color: "from-purple-500/20 to-purple-500/5",
        iconColor: "text-purple-400",
        borderColor: "border-purple-500/20",
    },
];

const FUNNEL_COLORS = ["#3b82f6", "#a855f7", "#eab308", "#f97316", "#10b981"];

export default function DashboardPage() {
    const { currentTenant } = useTenant();
    const [pendingFollowUps, setPendingFollowUps] = useState<FollowUp[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [stats, setStats] = useState(mockDashboardStats);

    useEffect(() => {
        async function fetchData() {
            // Fetch Follow-ups
            const { data: fData } = await supabase
                .from('follow_ups')
                .select('*')
                .eq('tenant_id', currentTenant.id)
                .eq('status', 'pending')
                .order('due_date', { ascending: true })
                .limit(3);

            if (fData) {
                setPendingFollowUps(fData as FollowUp[]);
            }

            // Fetch brief stats (Total Contacts & Overall Value)
            const { count: contactCount } = await supabase
                .from('contacts')
                .select('*', { count: 'exact', head: true })
                .eq('tenant_id', currentTenant.id);

            const { data: deals } = await supabase
                .from('contacts')
                .select('deal_value')
                .eq('tenant_id', currentTenant.id)
                .neq('stage', 'lost');

            if (contactCount !== null && deals) {
                const totalValue = (deals as any[]).reduce((acc: number, d: any) => acc + (d.deal_value || 0), 0);
                const activeDeals = (deals as any[]).filter((d: any) => d.deal_value > 0).length;
                setStats(prev => ({
                    ...prev,
                    totalContacts: contactCount,
                    activeDeals: activeDeals,
                    monthlyRevenue: totalValue
                }));
            }
        }

        if (currentTenant.id) fetchData();
    }, [currentTenant.id]);

    const toggleRecording = useCallback(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Trình duyệt của bạn không hỗ trợ Web Speech API. Vui lòng thử Chrome.");
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'vi-VN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        if (isRecording) {
            recognition.stop();
            setIsRecording(false);
        } else {
            recognition.start();
            setIsRecording(true);

            recognition.onresult = (event: any) => {
                const speechResult = event.results[0][0].transcript;
                setTranscript(speechResult);

                // Add new task from voice mapping schema structure
                const newTask = {
                    tenant_id: currentTenant.id,
                    type: "follow_up",
                    due_date: new Date().toISOString(),
                    status: "pending",
                    note: speechResult,
                    ai_created: true,
                    channel: "voice",
                };

                // Save to Supabase
                supabase
                    .from('follow_ups')
                    .insert([newTask])
                    .select()
                    .then(({ data, error }: { data: any, error: any }) => {
                        if (data && !error) {
                            setPendingFollowUps(prev => [data[0] as FollowUp, ...prev].slice(0, 3));
                        }
                    });
                setIsRecording(false);

                setTimeout(() => setTranscript(""), 3000);
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsRecording(false);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };
        }
    }, [isRecording]);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white">
                        Chào buổi sáng! ☀️
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        AI đã xử lý <span className="text-cyan-400 font-medium">7 tin nhắn mới</span> trong khi bạn ngủ
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {/* AI Channels Status */}
                    <div className="glass rounded-xl px-3 py-2 flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 ai-pulse" />
                            <span className="text-muted-foreground">Email</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 ai-pulse" />
                            <span className="text-muted-foreground">Zalo</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-yellow-400" />
                            <span className="text-muted-foreground">Telegram</span>
                        </span>
                    </div>
                    {/* Voice to Task Button */}
                    <div className="flex items-center gap-2">
                        <AnimatePresence>
                            {transcript && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white max-w-[200px] truncate"
                                >
                                    {transcript}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleRecording}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all",
                                isRecording
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                                    : "bg-gradient-to-r from-cyan-500 to-emerald-500 glow-cyan"
                            )}
                        >
                            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                            {isRecording ? "Đang nghe..." : "Voice to Task"}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
                {kpiCards.map((card, i) => {
                    let displayValue = card.value;
                    let displayChange = card.change;
                    if (card.label === "Tổng Contacts") {
                        displayValue = stats.totalContacts.toString();
                    } else if (card.label === "Deals Active") {
                        displayValue = stats.activeDeals.toString();
                        displayChange = `${formatCurrency(stats.monthlyRevenue)}đ pipeline`;
                    }

                    return (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className={`glass rounded-2xl p-4 border ${card.borderColor} bg-gradient-to-br ${card.color}`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground">{card.label}</p>
                                    <p className="text-2xl font-heading font-bold text-white mt-1">{displayValue}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{displayChange}</p>
                                </div>
                                <div className={`p-2 rounded-xl bg-white/5 ${card.iconColor}`}>
                                    <card.icon className="w-5 h-5" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-5">
                {/* Pipeline Funnel Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="col-span-2 glass rounded-2xl p-5 border border-border"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="font-heading font-semibold text-white">Pipeline Overview</h2>
                            <p className="text-xs text-muted-foreground">Số deals theo giai đoạn</p>
                        </div>
                        <Link href="/pipeline" className="text-xs text-cyan-400 flex items-center gap-1 hover:text-cyan-300 transition-colors">
                            Xem Kanban <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={mockPipelineFunnelData} barSize={40}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="stage" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }}
                                labelStyle={{ color: "#e2e8f0" }}
                                itemStyle={{ color: "#94a3b8" }}
                                formatter={(value: number, name: string) => [
                                    name === "value" ? formatCurrency(value) : value,
                                    name === "value" ? "Giá trị" : "Số deal"
                                ]}
                            />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                {mockPipelineFunnelData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={FUNNEL_COLORS[index]} fillOpacity={0.85} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Lead Sources Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="glass rounded-2xl p-5 border border-border flex flex-col"
                >
                    <div className="mb-4">
                        <h2 className="font-heading font-semibold text-white">Lead Sources</h2>
                        <p className="text-xs text-muted-foreground">Tỉ lệ phân bổ khách hàng</p>
                    </div>
                    <div className="flex-1 w-full h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={mockLeadSourcesData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {mockLeadSourcesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px", color: "#e2e8f0" }}
                                    itemStyle={{ color: "#94a3b8" }}
                                    formatter={(value: number) => [`${value}%`, "Tỉ lệ"]}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Second Row Content Grid */}
            <div className="grid grid-cols-3 gap-5">
                {/* Follow-ups Today */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="glass rounded-2xl p-5 border border-border"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="font-heading font-semibold text-white">Follow-ups</h2>
                            <p className="text-xs text-muted-foreground">Cần làm hôm nay</p>
                        </div>
                        <Link href="/follow-ups" className="text-xs text-cyan-400 flex items-center gap-1 hover:text-cyan-300 transition-colors">
                            Xem tất cả <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {pendingFollowUps.length === 0 ? (
                            <div className="text-xs text-muted-foreground text-center py-4">Không có công việc nào</div>
                        ) : (
                            pendingFollowUps.map((f) => (
                                <FollowUpMini key={f.id} followUp={f} />
                            ))
                        )}
                    </div>
                </motion.div>

                {/* AI Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="col-span-2 glass rounded-2xl p-5 border border-border"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-cyan-400" fill="currentColor" />
                            <h2 className="font-heading font-semibold text-white">AI Activity Feed</h2>
                            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/20">Live</span>
                        </div>
                        <Link href="/inbox" className="text-xs text-cyan-400 flex items-center gap-1 hover:text-cyan-300 transition-colors">
                            AI Inbox <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <AIActivityFeed events={mockAIActivityFeed} />
                </motion.div>
            </div>
        </div>
    );
}
