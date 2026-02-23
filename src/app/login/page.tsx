"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Đã có lỗi xảy ra khi đăng nhập.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#07090d] flex items-center justify-center p-4 relative overflow-hidden text-slate-200">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 mb-4 shadow-lg shadow-cyan-500/20">
                        <div className="w-full h-full bg-[#0f172a] rounded-[14px] flex items-center justify-center">
                            <Zap className="w-8 h-8 text-cyan-400 fill-cyan-400/20" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        VibeCRM
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Đăng nhập để quản lý công việc của bạn
                    </p>
                </div>

                <div className="glass rounded-3xl p-8 border border-white/10 relative shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">
                                Email
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    Mật khẩu
                                </label>
                                <button type="button" className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors">
                                    Quên mật khẩu?
                                </button>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-bold text-sm shadow-xl shadow-cyan-600/20 hover:shadow-cyan-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2",
                                loading && "opacity-70 cursor-not-allowed scale-100 shadow-none"
                            )}
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <LogIn className="w-4 h-4" />
                            )}
                            {loading ? "Đang xử lý..." : "Đăng nhập ngay"}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-slate-500 text-xs">
                            Chưa có tài khoản?{" "}
                            <button className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                                Liên hệ Admin
                            </button>
                        </p>
                    </div>
                </div>

                <p className="text-center mt-8 text-[10px] text-slate-600 uppercase tracking-[0.2em]">
                    &copy; 2026 VibeCRM Engine &bull; AI Powered
                </p>
            </motion.div>
        </div>
    );
}
