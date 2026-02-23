import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TenantProvider } from "@/lib/tenant-context";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandMenu } from "@/components/command-menu";

export const metadata: Metadata = {
    title: "VibeCRM — CRM dành cho người lười",
    description: "Agentic CRM tự động đọc Email, Zalo, Telegram để cập nhật khách hàng. Không cần nhập liệu thủ công.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen bg-background overflow-hidden">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TenantProvider>
                        <div className="flex h-screen">
                            <Sidebar />
                            <main className="flex-1 overflow-y-auto">
                                {children}
                            </main>
                        </div>
                        <CommandMenu />
                    </TenantProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
