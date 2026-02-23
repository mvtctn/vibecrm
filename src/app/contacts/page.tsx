"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
} from "@tanstack/react-table";
import { mockContacts } from "@/lib/mock-data";
import {
    formatTimeAgo,
    formatCurrency,
    getChannelIcon,
    getStageColor,
    getStageLabel,
    getSentimentColor,
    cn,
} from "@/lib/utils";
import { Contact } from "@/types";
import { Search, ArrowUpDown, ExternalLink, Bot, ChevronLeft, ChevronRight, Download, Loader2, Plus, Trash2, Edit2, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useTenant } from "@/lib/tenant-context";

const sentimentLabels: Record<string, string> = {
    positive: "Tích cực",
    neutral: "Trung lập",
    cold: "Lạnh",
    urgent: "Khẩn cấp",
};

export default function ContactsPage() {
    const { currentTenant } = useTenant();
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [stageFilter, setStageFilter] = useState("all");
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    // CRUD State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "", phone: "", email: "", company: "",
        channel_source: "manual", stage: "lead", deal_value: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchContacts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .eq('tenant_id', currentTenant.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching contacts:", error);
        } else {
            setContacts(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (currentTenant.id) {
            fetchContacts();
        }
    }, [currentTenant.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (modalMode === "add") {
                const { error } = await supabase.from('contacts').insert([{
                    tenant_id: currentTenant.id,
                    ...formData,
                }]);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('contacts').update(formData).eq('id', editingId);
                if (error) throw error;
            }
            setIsModalOpen(false);
            fetchContacts();
        } catch (error) {
            console.error("Error saving contact:", error);
            alert("Có lỗi xảy ra khi lưu! " + (error as any).message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc chắn muốn xoá khách hàng này?")) return;
        try {
            const { error } = await supabase.from('contacts').delete().eq('id', id);
            if (error) throw error;
            fetchContacts();
        } catch (error) {
            console.error("Error deleting contact:", error);
            alert("Có lỗi xảy ra khi xoá!");
        }
    };

    const openAddModal = () => {
        setModalMode("add");
        setFormData({ name: "", phone: "", email: "", company: "", channel_source: "manual", stage: "lead", deal_value: 0 });
        setIsModalOpen(true);
    };

    const openEditModal = (contact: Contact) => {
        setModalMode("edit");
        setEditingId(contact.id);
        setFormData({
            name: contact.name,
            phone: contact.phone || "",
            email: contact.email || "",
            company: contact.company || "",
            channel_source: contact.channel_source || "manual",
            stage: contact.stage,
            deal_value: contact.deal_value || 0,
        });
        setIsModalOpen(true);
    };

    const filteredData = useMemo(() => {
        if (stageFilter === "all") return contacts;
        return contacts.filter((c) => c.stage === stageFilter);
    }, [stageFilter, contacts]);

    const columns: ColumnDef<Contact>[] = [
        {
            accessorKey: "name",
            header: "Khách hàng",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center text-white text-xs font-bold border border-white/10 shrink-0">
                        {row.original.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">{row.original.name}</p>
                        <p className="text-xs text-muted-foreground">{row.original.company}</p>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "stage",
            header: "Stage",
            cell: ({ row }) => (
                <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", getStageColor(row.original.stage))}>
                    {getStageLabel(row.original.stage)}
                </span>
            ),
        },
        {
            accessorKey: "deal_value",
            header: ({ column }) => (
                <button
                    onClick={() => column.toggleSorting()}
                    className="flex items-center gap-1 text-muted-foreground hover:text-white transition-colors"
                >
                    Giá trị <ArrowUpDown className="w-3 h-3" />
                </button>
            ),
            cell: ({ row }) => (
                <span className="text-sm text-emerald-400 font-medium">
                    {formatCurrency(row.original.deal_value)}đ
                </span>
            ),
        },
        {
            accessorKey: "channel_source",
            header: "Kênh",
            cell: ({ row }) => (
                <span className="text-base" title={row.original.channel_source}>
                    {getChannelIcon(row.original.channel_source)}
                </span>
            ),
        },
        {
            accessorKey: "sentiment",
            header: "Sentiment",
            cell: ({ row }) => (
                <span className={cn("text-xs font-medium", getSentimentColor(row.original.sentiment))}>
                    {sentimentLabels[row.original.sentiment] || row.original.sentiment}
                </span>
            ),
        },
        {
            accessorKey: "last_contact_at",
            header: "Liên hệ cuối",
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground">{formatTimeAgo(row.original.last_contact_at)}</span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEditModal(row.original)} className="p-1.5 rounded-lg hover:bg-cyan-500/10 text-muted-foreground hover:text-cyan-400 transition-all" title="Sửa">
                        <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(row.original.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all" title="Xoá">
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <Link href={`/contacts/${row.original.id}`}>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-all" title="Xem chi tiết">
                            <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                    </Link>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { globalFilter, sorting },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });

    const stages = [
        { value: "all", label: "Tất cả" },
        { value: "lead", label: "Lead" },
        { value: "qualified", label: "Qualified" },
        { value: "proposal", label: "Báo giá" },
        { value: "negotiation", label: "Đàm phán" },
        { value: "won", label: "Won" },
    ];

    const handleExportCSV = () => {
        const headers = ["Khách hàng", "Công ty", "Số điện thoại", "Giai đoạn", "Giá trị", "Nguồn", "Cảm xúc", "Liên hệ cuối"];
        const rows = filteredData.map(c => [
            `"${c.name}"`,
            `"${c.company}"`,
            `"${c.phone}"`,
            `"${getStageLabel(c.stage)}"`,
            `"${c.deal_value}"`,
            `"${c.channel_source}"`,
            `"${sentimentLabels[c.sentiment] || c.sentiment}"`,
            `"${new Date(c.last_contact_at).toLocaleString()}"`
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\n");

        const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `contacts_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white">Contacts</h1>
                    <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-cyan-400" />
                        <span>AI tự động tạo và cập nhật — không cần nhập tay</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-xs font-semibold text-white hover:opacity-90 transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Thêm Contact
                    </button>
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-medium text-white hover:bg-white/5 transition-all"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Export CSV
                    </button>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 ai-pulse" />
                        {contacts.length} contacts · AI managed
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Tìm kiếm..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                </div>
                <div className="flex gap-1.5">
                    {stages.map((s) => (
                        <button
                            key={s.value}
                            onClick={() => setStageFilter(s.value)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                                stageFilter === s.value
                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl border border-border overflow-hidden"
            >
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            {table.getHeaderGroups().map((hg) =>
                                hg.headers.map((header) => (
                                    <th key={header.id} className="px-4 py-3 text-left text-xs text-muted-foreground font-medium">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, i) => (
                            <motion.tr
                                key={row.original.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.04 }}
                                className="border-b border-border/50 hover:bg-white/[0.03] transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                {loading && (
                    <div className="flex justify-center items-center py-12 text-muted-foreground">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                )}
                {!loading && table.getRowModel().rows.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground text-sm">
                        Không tìm thấy contact nào
                    </div>
                )}
            </motion.div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Modal CRUD */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">
                                {modalMode === "add" ? "Thêm mới Khách hàng" : "Chỉnh sửa Khách hàng"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 text-muted-foreground hover:text-white rounded-lg hover:bg-white/10">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Tên khách hàng *</label>
                                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" placeholder="Nguyễn Văn A" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">Số điện thoại</label>
                                    <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" placeholder="090..." />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">Công ty</label>
                                    <input value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" placeholder="Tên công ty" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Email</label>
                                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" placeholder="email@example.com" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">Giai đoạn</label>
                                    <select value={formData.stage} onChange={e => setFormData({ ...formData, stage: e.target.value })} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                                        <option value="lead">Lead</option>
                                        <option value="qualified">Qualified</option>
                                        <option value="proposal">Báo giá</option>
                                        <option value="negotiation">Đàm phán</option>
                                        <option value="won">Thành công</option>
                                        <option value="lost">Thất bại</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">Giá trị Deal (VNĐ)</label>
                                    <input type="number" value={formData.deal_value} onChange={e => setFormData({ ...formData, deal_value: Number(e.target.value) })} className="w-full px-3 py-2 bg-black/40 border border-border rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors">Huỷ</button>
                                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 disabled:opacity-50 flex items-center gap-2">
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Lưu lại
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
