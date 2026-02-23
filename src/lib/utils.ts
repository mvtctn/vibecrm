import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isToday, isTomorrow, isPast } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(0)} triệu`;
    }
    if (value >= 1_000) {
        return `${(value / 1_000).toFixed(0)}K`;
    }
    return value.toLocaleString("vi-VN");
}

export function formatTimeAgo(dateStr: string): string {
    try {
        return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
    } catch {
        return dateStr;
    }
}

export function formatDate(dateStr: string): string {
    try {
        return format(new Date(dateStr), "dd/MM/yyyy HH:mm");
    } catch {
        return dateStr;
    }
}

export function getUrgencyLabel(dateStr: string): "overdue" | "today" | "tomorrow" | "upcoming" {
    const date = new Date(dateStr);
    if (isPast(date) && !isToday(date)) return "overdue";
    if (isToday(date)) return "today";
    if (isTomorrow(date)) return "tomorrow";
    return "upcoming";
}

export function getSentimentColor(sentiment: string): string {
    switch (sentiment) {
        case "positive": return "text-emerald-400";
        case "neutral": return "text-yellow-400";
        case "cold": return "text-blue-400";
        case "urgent": return "text-red-400";
        default: return "text-gray-400";
    }
}

export function getChannelIcon(channel: string): string {
    switch (channel) {
        case "email": return "📧";
        case "zalo": return "💬";
        case "telegram": return "✈️";
        case "phone": return "📞";
        case "voice": return "🎤";
        case "manual": return "✏️";
        default: return "💬";
    }
}

export function getStageLabel(stage: string): string {
    const labels: Record<string, string> = {
        lead: "Lead",
        qualified: "Đủ điều kiện",
        proposal: "Báo giá",
        negotiation: "Đàm phán",
        won: "Thành công",
        lost: "Thất bại",
    };
    return labels[stage] || stage;
}

export function getStageColor(stage: string): string {
    const colors: Record<string, string> = {
        lead: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        qualified: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        proposal: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        negotiation: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        won: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        lost: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[stage] || "bg-gray-500/20 text-gray-400";
}
