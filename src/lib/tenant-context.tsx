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

const mockTenants: Tenant[] = [
    {
        id: "00000000-0000-0000-0000-000000000001",
        slug: "nguyen-filter",
        name: "Nguyễn Filter Co.",
        logo: "💧",
        plan: "pro",
        contactsCount: 47,
        contactsLimit: -1, // unlimited
        owner: "Nguyễn Văn Bạn",
        status: "active",
        createdAt: "2026-01-15T00:00:00Z",
        aiProvider: "groq",
    },
    {
        id: "t2",
        slug: "pham-consulting",
        name: "Phạm Consulting",
        logo: "🏢",
        plan: "free",
        contactsCount: 8,
        contactsLimit: 10,
        owner: "Phạm Đức Anh",
        status: "active",
        createdAt: "2026-02-01T00:00:00Z",
        aiProvider: "gemini",
    },
    {
        id: "t3",
        slug: "le-design-studio",
        name: "Lê Design Studio",
        logo: "🎨",
        plan: "pro",
        contactsCount: 23,
        contactsLimit: -1,
        owner: "Lê Minh Châu",
        status: "trial",
        createdAt: "2026-02-10T00:00:00Z",
        aiProvider: "openai",
    },
    {
        id: "t4",
        slug: "tran-construction",
        name: "Trần Construction",
        logo: "🏗️",
        plan: "enterprise",
        contactsCount: 156,
        contactsLimit: -1,
        owner: "Trần Văn Khải",
        status: "active",
        createdAt: "2025-12-01T00:00:00Z",
        aiProvider: "openai",
    },
];

const TenantContext = createContext<TenantContextType>({
    currentTenant: mockTenants[0],
    tenants: mockTenants,
    switchTenant: () => { },
    isAdmin: true,
    currentRole: "owner",
    setRole: () => { },
});

export function TenantProvider({ children }: { children: React.ReactNode }) {
    const [currentTenantId, setCurrentTenantId] = useState(mockTenants[0].id);
    const [currentRole, setCurrentRole] = useState<UserRole>("owner");
    const currentTenant = mockTenants.find((t) => t.id === currentTenantId) ?? mockTenants[0];

    return (
        <TenantContext.Provider
            value={{
                currentTenant,
                tenants: mockTenants,
                switchTenant: setCurrentTenantId,
                isAdmin: true, // Super-admin can see all tenants
                currentRole,
                setRole: setCurrentRole,
            }}
        >
            {children}
        </TenantContext.Provider>
    );
}

export const useTenant = () => useContext(TenantContext);
export { mockTenants };
