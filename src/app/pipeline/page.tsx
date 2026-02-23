"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { mockPipelineColumns } from "@/lib/mock-data";
import { formatCurrency, getChannelIcon, cn } from "@/lib/utils";
import { PipelineDeal, PipelineColumn, ContactStage, Contact } from "@/types";
import { Bot, GripVertical, Loader2, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useTenant } from "@/lib/tenant-context";

const PIPELINE_STAGES: { id: ContactStage; label: string; color: string }[] = [
    { id: "lead", label: "Lead", color: "#3b82f6" },
    { id: "qualified", label: "Đủ điều kiện", color: "#a855f7" },
    { id: "proposal", label: "Báo giá", color: "#eab308" },
    { id: "negotiation", label: "Đàm phán", color: "#f97316" },
    { id: "won", label: "Thành công", color: "#10b981" },
    { id: "lost", label: "Thất bại", color: "#ef4444" },
];

function DealCard({ deal, overlay = false, onDelete }: { deal: PipelineDeal; overlay?: boolean; onDelete?: (id: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: deal.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    const content = (
        <div
            className={cn(
                "p-3 rounded-xl bg-card border border-border hover:border-white/20 transition-all cursor-grab active:cursor-grabbing group",
                overlay && "shadow-2xl shadow-black/40 border-cyan-500/30"
            )}
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                    <Link href={`/contacts/${deal.contact_id}`}>
                        <p className="text-sm font-medium text-white hover:text-cyan-400 transition-colors truncate">
                            {deal.contact_name}
                        </p>
                    </Link>
                    <p className="text-xs text-muted-foreground truncate">{deal.company}</p>
                </div>
                <GripVertical className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-400">{formatCurrency(deal.value)}đ</span>
                <div className="flex items-center gap-2">
                    <span className="text-base">{getChannelIcon(deal.channel)}</span>
                    {!overlay && onDelete && (
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(deal.id); }}
                            className="p-1 rounded text-muted-foreground hover:bg-red-500/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                <div className="flex items-center gap-1">
                    <div
                        className="h-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                        style={{ width: `${deal.ai_confidence * 0.5}px`, minWidth: "8px", maxWidth: "50px" }}
                    />
                    <span className="text-[10px] text-muted-foreground">{deal.ai_confidence}%</span>
                </div>
                {deal.ai_moved && (
                    <span className="text-[9px] px-1 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        🤖 AI
                    </span>
                )}
                {deal.days_in_stage > 0 && (
                    <span className="text-[10px] text-muted-foreground">{deal.days_in_stage}d</span>
                )}
            </div>
        </div>
    );

    if (overlay) return content;

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {content}
        </div>
    );
}

function Column({ column, onAdd, onDelete }: { column: PipelineColumn; onAdd: (stageId: ContactStage) => void; onDelete: (id: string) => void }) {
    const totalValue = column.deals.reduce((sum, d) => sum + d.value, 0);
    return (
        <div className="flex flex-col w-64 shrink-0">
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: column.color }} />
                    <span className="text-sm font-medium text-white">{column.label}</span>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/5 text-muted-foreground">
                        {column.deals.length}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {totalValue > 0 && (
                        <span className="text-xs text-muted-foreground">{formatCurrency(totalValue)}đ</span>
                    )}
                    <button onClick={() => onAdd(column.id as ContactStage)} className="p-1 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors" title="Thêm Deal">
                        <Plus className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
            <div
                className="flex-1 rounded-xl p-2 min-h-[400px] border border-dashed border-border/50 space-y-2"
                style={{ background: `${column.color}08` }}
            >
                <SortableContext items={column.deals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
                    {column.deals.map((deal) => (
                        <DealCard key={deal.id} deal={deal} onDelete={onDelete} />
                    ))}
                </SortableContext>
                {column.deals.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-xs text-muted-foreground/50">
                        Kéo deal vào đây
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PipelinePage() {
    const { currentTenant } = useTenant();
    const [allContacts, setAllContacts] = useState<any[]>([]);
    const [columns, setColumns] = useState<PipelineColumn[]>([]);
    const [activeDeal, setActiveDeal] = useState<PipelineDeal | null>(null);
    const [loading, setLoading] = useState(true);

    // Add Deal Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedStage, setSelectedStage] = useState<ContactStage>("lead");
    const [selectedContactId, setSelectedContactId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchPipeline = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .eq('tenant_id', currentTenant.id);

        if (error) {
            console.error("Error fetching pipeline:", error);
            setLoading(false);
            return;
        }

        setAllContacts(data || []);

        const mockCols = PIPELINE_STAGES.map(stage => {
            const stageDeals = (data || []).filter(c => c.stage === stage.id).map(c => ({
                id: c.id,
                contact_id: c.id,
                contact_name: c.name,
                company: c.company || "Cá nhân",
                value: c.deal_value || 0,
                days_in_stage: 0, // calculate from updated_at if available
                last_activity: c.last_contact_at,
                ai_confidence: c.deal_probability || 0,
                ai_moved: false,
                stage: c.stage as ContactStage,
                channel: c.channel_source || "manual",
            } as PipelineDeal));

            return { ...stage, deals: stageDeals };
        });

        setColumns(mockCols);
        setLoading(false);
    };

    useEffect(() => {
        if (currentTenant.id) {
            fetchPipeline();
        }
    }, [currentTenant.id]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    const totalPipelineValue = columns.flatMap((c) => c.deals).reduce((sum, d) => sum + d.value, 0);
    const totalDeals = columns.flatMap((c) => c.deals).length;

    const handleDragStart = useCallback((event: DragStartEvent) => {
        const deal = columns.flatMap((c) => c.deals).find((d) => d.id === event.active.id);
        setActiveDeal(deal || null);
    }, [columns]);

    const handleAddClick = (stageId: ContactStage) => {
        setSelectedStage(stageId);
        setSelectedContactId("");
        setIsAddModalOpen(true);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedContactId) return alert("Vui lòng chọn Contact");
        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('contacts')
                .update({ stage: selectedStage })
                .eq('id', selectedContactId);

            if (error) throw error;
            setIsAddModalOpen(false);
            fetchPipeline();
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteDeal = async (id: string) => {
        if (!confirm("Bạn có chắc chắn muốn chuyển Deal này sang 'Thất bại' (Lost) không?")) return;
        try {
            const { error } = await supabase.from('contacts').update({ stage: 'lost' }).eq('id', id);
            if (error) throw error;
            fetchPipeline();
        } catch (error) {
            console.error(error);
            alert("Lỗi khi chuyển Deal!");
        }
    };

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        setActiveDeal(null);
        if (!over || active.id === over.id) return;

        const activeColIndex = columns.findIndex((c) => c.deals.some((d) => d.id === active.id));
        const overColIndex = columns.findIndex(
            (c) => c.id === over.id || c.deals.some((d) => d.id === over.id)
        );

        if (activeColIndex === -1 || overColIndex === -1 || activeColIndex === overColIndex) return;

        const newStage = columns[overColIndex].id;

        setColumns((prev) => {
            const next = prev.map((c) => ({ ...c, deals: [...c.deals] }));
            const deal = next[activeColIndex].deals.find((d) => d.id === active.id)!;
            next[activeColIndex].deals = next[activeColIndex].deals.filter((d) => d.id !== active.id);
            next[overColIndex].deals.push({ ...deal, stage: newStage as ContactStage });
            return next;
        });

        // Background update to Supabase
        supabase
            .from('contacts')
            .update({ stage: newStage })
            .eq('id', active.id)
            .then(({ error }) => {
                if (error) console.error("Error updating stage:", error);
            });

    }, [columns]);

    return (
        <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white">Pipeline</h1>
                    <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-cyan-400" />
                        AI tự động phân loại và di chuyển deal
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="glass rounded-xl px-4 py-2 border border-border text-sm">
                        <span className="text-muted-foreground">Total: </span>
                        <span className="text-emerald-400 font-semibold">{formatCurrency(totalPipelineValue)}đ</span>
                        <span className="text-muted-foreground mx-2">·</span>
                        <span className="text-muted-foreground">{totalDeals} deals</span>
                    </div>
                </div>
            </div>

            {/* Kanban */}
            <div className="flex-1 overflow-x-auto pb-4">
                {loading ? (
                    <div className="flex justify-center items-center h-full text-muted-foreground w-full">
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                        <div className="flex gap-4 h-full min-w-max">
                            {columns.map((col) => (
                                <Column key={col.id} column={col} onAdd={handleAddClick} onDelete={handleDeleteDeal} />
                            ))}
                        </div>
                        <DragOverlay>
                            {activeDeal && <DealCard deal={activeDeal} overlay />}
                        </DragOverlay>
                    </DndContext>
                )}
            </div>

            {/* Modal Add Deal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Thêm Deal vào Pipeline</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-muted-foreground hover:text-white rounded-lg hover:bg-white/10">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Giai đoạn</label>
                                <input disabled value={PIPELINE_STAGES.find(s => s.id === selectedStage)?.label || selectedStage} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white opacity-70 cursor-not-allowed" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Chọn Khách hàng (Contact) *</label>
                                <select required value={selectedContactId} onChange={(e) => setSelectedContactId(e.target.value)} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 hover:border-cyan-500/50 transition-colors">
                                    <option value="" disabled>-- Hãy chọn Contact --</option>
                                    {allContacts.filter(c => c.stage !== selectedStage && c.stage !== 'lost').map(c => (
                                        <option key={c.id} value={c.id} className="bg-slate-900 text-white leading-9 py-2">{c.name} - {c.company || 'Cá nhân'} ({formatCurrency(c.deal_value || 0)}đ)</option>
                                    ))}
                                </select>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors">Huỷ</button>
                                <button type="submit" disabled={isSubmitting || !selectedContactId} className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 disabled:opacity-50 flex items-center gap-2">
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Thêm Deal
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
