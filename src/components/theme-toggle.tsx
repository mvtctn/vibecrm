"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center gap-2 p-1 rounded-xl bg-black/20 border border-white/10 w-fit">
            {[
                { value: "light", icon: Sun },
                { value: "dark", icon: Moon },
                { value: "system", icon: Monitor },
            ].map((t) => (
                <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={`relative p-2 rounded-lg text-sm font-medium transition-colors ${theme === t.value ? "text-white" : "text-muted-foreground hover:text-white"
                        }`}
                >
                    {theme === t.value && (
                        <motion.div
                            layoutId="theme-toggle-active"
                            className="absolute inset-0 bg-white/10 rounded-lg"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <t.icon className="w-4 h-4 relative z-10" />
                </button>
            ))}
        </div>
    );
}
