"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { defaultTenant } from "@/lib/tenant-context";
import { formatCurrency, cn } from "@/lib/utils";
import {
    Shield, Users, TrendingUp, Zap, MoreVertical,
    CheckCircle2, AlertTriangle, XCircle, Bot,
} from "lucide-react";

const planColors: Record<string, string> = {
    free: "text-gray-400  bg-gray-500/10  border-gray-500/20",
    pro: "text-cyan-400  bg-cyan-500/10  border-cyan-500/20",
    enterprise: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};
const statusIcons: Record<string, { icon: typeof CheckCircle2; color: string }> = {
    active: { icon: CheckCircle2, color: "text-emerald-400" },
    trial: { icon: AlertTriangle, color: "text-yellow-400" },
    suspended: { icon: XCircle, color: "text-red-400" },
};
const aiProviderLabels: Record<string, string> = {
    groq: "⚡ Groq",
    gemini: "✨ Gemini",
    openai: "🧠 OpenAI",
};

const globalStats = [
    { label: "Tổng Workspaces", value: "4", sub: "+1 tuần này", icon: Users, color: "from-blue-500/20  to-blue-500/5", border: "border-blue-500/20", iconColor: "text-blue-400" },
    { label: "Đang Active", value: "3", sub: "1 trial", icon: CheckCircle2, color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/20", iconColor: "text-emerald-400" },
    { label: "MRR", value: "$57", sub: "2 Pro · 1 Ent", icon: TrendingUp, color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/20", iconColor: "text-purple-400" },
    { label: "Tin nhắn AI/ngày", value: "342", sub: "↑ 18% vs tuần trước", icon: Bot, color: "from-cyan-500/20  to-cyan-500/5", border: "border-cyan-500/20", iconColor: "text-cyan-400" },
];

export default function AdminPage() {
    const [tenants] = useState([defaultTenant]);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white">Super Admin</h1>
                    <p className="text-sm text-muted-foreground">Quản lý toàn bộ tenants và hệ thống VibeCRM</p>
                </div>
                <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400">
                    <Zap className="w-3.5 h-3.5" />
                    Super Admin Mode
                </div>
            </div>

            {/* Global Stats */}
            <div className="grid grid-cols-4 gap-4">
                {globalStats.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className={`glass rounded-2xl p-4 border ${s.border} bg-gradient-to-br ${s.color}`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">{s.label}</p>
                                <p className="text-2xl font-heading font-bold text-white mt-1">{s.value}</p>
                                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
                            </div>
                            <div className={`p-2 rounded-xl bg-white/5 ${s.iconColor}`}>
                                <s.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Tenant Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl border border-border overflow-hidden"
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <h2 className="font-heading font-semibold text-white">Workspaces</h2>
                    <span className="text-xs text-muted-foreground">{tenants.length} tenants</span>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border text-xs text-muted-foreground">
                            {["Workspace", "Owner", "Plan", "Status", "Zalo Account", "AI Engine", "Contacts", ""].map((h) => (
                                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map((tenant: any, i: number) => {
                            const StatusIcon = statusIcons[tenant.status].icon;
                            return (
                                <motion.tr
                                    key={tenant.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.06 }}
                                    className="border-b border-border/50 hover:bg-white/[0.02] transition-colors"
                                >
                                    {/* Workspace */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{tenant.logo}</span>
                                            <div>
                                                <p className="text-sm font-medium text-white">{tenant.name}</p>
                                                <p className="text-[10px] text-muted-foreground">/{tenant.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Owner */}
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{tenant.owner}</td>
                                    {/* Plan */}
                                    <td className="px-4 py-3">
                                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold border uppercase", planColors[tenant.plan])}>
                                            {tenant.plan}
                                        </span>
                                    </td>
                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <StatusIcon className={cn("w-3.5 h-3.5", statusIcons[tenant.status].color)} />
                                            <span className={cn("text-xs", statusIcons[tenant.status].color)}>
                                                {tenant.status}
                                            </span>
                                        </div>
                                    </td>
                                    {/* Zalo Account */}
                                    <td className="px-4 py-3">
                                        <span className="text-xs flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            <span className="text-muted-foreground font-mono text-[11px]">
                                                zalo:/{tenant.slug}
                                            </span>
                                        </span>
                                    </td>
                                    {/* AI Engine */}
                                    <td className="px-4 py-3">
                                        <span className="text-xs text-muted-foreground">{aiProviderLabels[tenant.aiProvider]}</span>
                                    </td>
                                    {/* Contacts */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <span className="text-sm font-medium text-white">{tenant.contactsCount}</span>
                                            <span className="text-xs text-muted-foreground">
                                                /{tenant.contactsLimit === -1 ? "∞" : tenant.contactsLimit}
                                            </span>
                                            {tenant.contactsLimit !== -1 && (
                                                <div className="w-16 h-1 rounded-full bg-white/10 mt-1">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                                                        style={{ width: `${(tenant.contactsCount / tenant.contactsLimit) * 100}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-all">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </motion.div>

            {/* Architecture Note */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="glass rounded-2xl p-5 border border-border"
            >
                <h3 className="font-heading font-semibold text-white mb-3 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-cyan-400" />
                    Multi-Tenant Architecture
                </h3>
                <div className="grid grid-cols-3 gap-4 text-xs">
                    {[
                        { title: "Data Isolation", desc: "Mỗi tenant có contacts, interactions, ai_suggestions riêng. Không có dữ liệu chéo giữa các tenant.", icon: "🔒" },
                        { title: "Zalo Per Tenant", desc: "Mỗi tenant kết nối Zalo account riêng của mình. Webhook được route đến đúng tenant qua tenant_id.", icon: "💬" },
                        { title: "AI Per Tenant", desc: "Mỗi tenant tự chọn AI engine (Groq/Gemini/OpenAI) và nhập API key riêng. Key được mã hóa per-tenant.", icon: "🤖" },
                    ].map((item) => (
                        <div key={item.title} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{item.icon}</span>
                                <p className="font-medium text-white text-sm">{item.title}</p>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
