"use client";

import { motion } from "framer-motion";
import { formatTimeAgo, getChannelIcon } from "@/lib/utils";
import { AIActivityEvent } from "@/types";

interface Props {
    events: AIActivityEvent[];
}

export function AIActivityFeed({ events }: Props) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {events.map((event, i) => (
                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-cyan-500/20 transition-all"
                >
                    <div className="text-xl shrink-0 mt-0.5">{event.icon}</div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white leading-snug">
                            <span className="text-cyan-400">{event.contact_name}</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                            {event.description}
                        </p>
                        <p className="text-[10px] text-muted-foreground/60 mt-1">
                            {event.channel && (
                                <span className="mr-1">{getChannelIcon(event.channel)}</span>
                            )}
                            {formatTimeAgo(event.timestamp)}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
