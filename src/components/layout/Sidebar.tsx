"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Users, Kanban, Inbox, Bell,
    Settings, ChevronLeft, ChevronRight, Zap, Bot,
    ChevronDown, Check, Shield, PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTenant } from "@/lib/tenant-context";

const navItems = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/contacts", icon: Users, label: "Contacts" },
    { href: "/pipeline", icon: Kanban, label: "Pipeline" },
    { href: "/inbox", icon: Inbox, label: "AI Inbox" },
    { href: "/follow-ups", icon: Bell, label: "Follow-ups" },
    { href: "/settings", icon: Settings, label: "Cài đặt" },
];

const planColors: Record<string, string> = {
    free: "text-gray-400 bg-gray-500/10 border-gray-500/20",
    pro: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    enterprise: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [orgMenuOpen, setOrgMenuOpen] = useState(false);
    const pathname = usePathname();
    const { currentTenant, tenants, switchTenant, isAdmin, currentRole, setRole } = useTenant();

    return (
        <motion.aside
            animate={{ width: collapsed ? 72 : 240 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative flex flex-col h-screen bg-card border-r border-border z-50 shrink-0"
        >
            {/* Org Switcher */}
            <div className="border-b border-border">
                <button
                    onClick={() => !collapsed && setOrgMenuOpen((v) => !v)}
                    className={cn(
                        "flex items-center gap-2.5 w-full px-3 py-3 hover:bg-white/5 transition-all",
                        collapsed && "justify-center"
                    )}
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 border border-white/10 flex items-center justify-center text-base shrink-0">
                        {currentTenant.logo}
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex-1 min-w-0 text-left"
                            >
                                <p className="text-xs font-semibold text-white truncate">{currentTenant.name}</p>
                                <span className={cn("text-[9px] px-1.5 py-0.5 rounded border font-medium uppercase", planColors[currentTenant.plan])}>
                                    {currentTenant.plan}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {!collapsed && <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform", orgMenuOpen && "rotate-180")} />}
                </button>

                {/* Dropdown menu */}
                <AnimatePresence>
                    {orgMenuOpen && !collapsed && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-border/50"
                        >
                            <div className="py-1">
                                {tenants.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => { switchTenant(t.id); setOrgMenuOpen(false); }}
                                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-white/5 transition-all text-left"
                                    >
                                        <span className="text-sm">{t.logo}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-white truncate">{t.name}</p>
                                            <p className={cn("text-[9px]", t.status === "active" ? "text-emerald-400" : t.status === "trial" ? "text-yellow-400" : "text-red-400")}>
                                                {t.status === "active" ? "● Active" : t.status === "trial" ? "◐ Trial" : "✕ Suspended"}
                                            </p>
                                        </div>
                                        {currentTenant.id === t.id && <Check className="w-3 h-3 text-cyan-400 shrink-0" />}
                                    </button>
                                ))}
                                <div className="border-t border-border/50 mt-1 pt-1">
                                    <Link href="/onboarding" onClick={() => setOrgMenuOpen(false)}>
                                        <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-white/5 transition-all text-left text-xs text-muted-foreground">
                                            <PlusCircle className="w-3.5 h-3.5" /> Tạo workspace mới
                                        </button>
                                    </Link>
                                    {isAdmin && (
                                        <Link href="/admin" onClick={() => setOrgMenuOpen(false)}>
                                            <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-white/5 transition-all text-left text-xs text-purple-400">
                                                <Shield className="w-3.5 h-3.5" /> Super Admin Panel
                                            </button>
                                        </Link>
                                    )}
                                </div>
                                <div className="border-t border-border/50 mt-1 pt-1 mb-1">
                                    <p className="px-3 py-1.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Chuyển Vai Trò (Demo)</p>
                                    {(["owner", "manager", "viewer"] as const).map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => { setRole(role); setOrgMenuOpen(false); }}
                                            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-white/5 transition-all"
                                        >
                                            <span className={cn("text-xs flex-1 text-left capitalize", currentRole === role ? "text-cyan-400 font-medium" : "text-muted-foreground hover:text-white")}>
                                                {role}
                                            </span>
                                            {currentRole === role && <Check className="w-3 h-3 text-cyan-400" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* AI Status Badge */}
            <div className={cn("mx-3 mt-3 mb-1 rounded-xl overflow-hidden", collapsed ? "px-1 py-2" : "px-3 py-2.5")}>
                <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
                    <div className="relative shrink-0">
                        <Zap className="w-4 h-4 text-cyan-400" fill="currentColor" />
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ai-pulse" />
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <p className="text-xs font-medium text-cyan-400 whitespace-nowrap">AI đang hoạt động</p>
                                <p className="text-[10px] text-muted-foreground whitespace-nowrap">
                                    Zalo: {currentTenant.slug} · {currentTenant.aiProvider}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer group",
                                    isActive
                                        ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 text-white border border-cyan-500/20"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5",
                                    collapsed && "justify-center px-2"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-cyan-400" : "text-muted-foreground group-hover:text-white")} />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-medium whitespace-nowrap">
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="border-t border-border p-3">
                <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        B
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-card" />
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-white truncate">{currentTenant.owner}</p>
                                <p className="text-[10px] text-muted-foreground truncate capitalize">{currentRole} · {currentTenant.name}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:border-cyan-500/50 transition-all z-50"
            >
                {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>
        </motion.aside>
    );
}
