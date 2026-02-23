"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, LayoutDashboard, Users, Kanban, Inbox, Bell, Settings, FileText } from "lucide-react";
import { mockContacts } from "@/lib/mock-data";

export function CommandMenu() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback(
        (command: () => unknown) => {
            setOpen(false);
            command();
        },
        [setOpen]
    );

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-0" onClick={() => setOpen(false)} />
            <div className="relative z-10 w-full max-w-xl rounded-xl border border-white/10 bg-card shadow-2xl overflow-hidden glass">
                <Command
                    className="flex flex-col w-full h-full text-white"
                    onKeyDown={(e) => {
                        if (e.key === "Escape") setOpen(false);
                    }}
                >
                    <div className="flex items-center px-4 py-3 border-b border-white/10">
                        <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
                        <Command.Input
                            autoFocus
                            placeholder="Type a command or search for a contact..."
                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-white"
                        />
                        <div className="flex items-center gap-1 shrink-0 ml-3">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-muted-foreground border border-white/5">ESC</span>
                        </div>
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin">
                        <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                            No results found.
                        </Command.Empty>

                        <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/"))}
                                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                            >
                                <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/contacts"))}
                                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                            >
                                <Users className="w-4 h-4" /> Go to Contacts
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/pipeline"))}
                                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                            >
                                <Kanban className="w-4 h-4" /> Go to Pipeline
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/inbox"))}
                                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                            >
                                <Inbox className="w-4 h-4" /> Go to AI Inbox
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/follow-ups"))}
                                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                            >
                                <Bell className="w-4 h-4" /> Go to Follow-ups
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/settings"))}
                                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                            >
                                <Settings className="w-4 h-4" /> Go to Settings
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Contacts" className="mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
                            {mockContacts.map((contact) => (
                                <Command.Item
                                    key={contact.id}
                                    onSelect={() => runCommand(() => router.push(`/contacts/${contact.id}`))}
                                    className="flex flex-col px-3 py-2 rounded-lg cursor-pointer aria-selected:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-center gap-2 w-full">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 flex items-center justify-center shrink-0">
                                            {contact.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                                            <p className="text-[10px] text-muted-foreground truncate">{contact.company} · {contact.phone}</p>
                                        </div>
                                    </div>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </div>
    );
}
