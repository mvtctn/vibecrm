"use client";

import { motion } from "framer-motion";
import { getChannelIcon, getUrgencyLabel, cn } from "@/lib/utils";
import { FollowUp } from "@/types";
import { Clock, AlertCircle } from "lucide-react";

interface Props {
    followUp: FollowUp;
}

const urgencyConfig = {
    overdue: { label: "Quá hạn", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: AlertCircle },
    today: { label: "Hôm nay", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: Clock },
    tomorrow: { label: "Ngày mai", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", icon: Clock },
    upcoming: { label: "Sắp tới", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", icon: Clock },
};

export function FollowUpMini({ followUp }: Props) {
    const urgency = getUrgencyLabel(followUp.due_date);
    const config = urgencyConfig[urgency];

    return (
        <div className={cn("rounded-xl p-3 border", config.bg, "hover:brightness-110 transition-all cursor-pointer")}>
            <div className="flex items-start gap-2">
                <span className="text-base">{getChannelIcon(followUp.channel)}</span>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{followUp.contact_name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{followUp.note}</p>
                    <div className="flex items-center gap-1 mt-1">
                        <config.icon className={cn("w-2.5 h-2.5", config.color)} />
                        <span className={cn("text-[10px] font-medium", config.color)}>{config.label}</span>
                        {followUp.ai_created && (
                            <span className="ml-1 text-[9px] px-1 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                🤖 AI
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
