"use client";

import React, { createContext, useContext, useState } from "react";

export type UserRole = "owner" | "manager" | "viewer";

export interface Tenant {
    id: string;
    slug: string;
    name: string;
    logo: string;
    plan: "free" | "pro" | "enterprise";
    contactsCount: number;
    contactsLimit: number;
    owner: string;
    status: "active" | "trial" | "suspended";
    createdAt: string;
    aiProvider: "groq" | "gemini" | "openai";
}

interface TenantContextType {
    currentTenant: Tenant;
    tenants: Tenant[];
    switchTenant: (id: string) => void;
    isAdmin: boolean;
    currentRole: UserRole;
    setRole: (role: UserRole) => void;
}

// Dữ liệu fallback tối thiểu khi chưa load xong DB
const defaultTenant: Tenant = {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "vibecrm",
    name: "Loading...",
    logo: "⚡",
    plan: "pro",
    contactsCount: 0,
    contactsLimit: -1,
    owner: "Admin",
    status: "active",
    createdAt: new Date().toISOString(),
    aiProvider: "groq",
};

const TenantContext = createContext<TenantContextType>({
    currentTenant: defaultTenant,
    tenants: [defaultTenant],
    switchTenant: () => { },
    isAdmin: true,
    currentRole: "owner",
    setRole: () => { },
});

export function TenantProvider({ children }: { children: React.ReactNode }) {
    const [currentTenant, setCurrentTenant] = useState<Tenant>(defaultTenant);
    const [tenants, setTenants] = useState<Tenant[]>([defaultTenant]);
    const [currentRole, setCurrentRole] = useState<UserRole>("owner");

    // TODO: Trong tương lai sẽ fetch useEffect từ Supabase dựa vào Auth
    // Hiện tại để build page không lỗi, ta giữ Tenant ID 1 làm mặc định 
    // sau khi người dùng chạy SQL Seed.

    return (
        <TenantContext.Provider
            value={{
                currentTenant,
                tenants,
                switchTenant: () => { }, // Đơn giản hoá cho Phase 8
                isAdmin: true,
                currentRole,
                setRole: setCurrentRole,
            }}
        >
            {children}
        </TenantContext.Provider>
    );
}

export const useTenant = () => useContext(TenantContext);
export { defaultTenant };
