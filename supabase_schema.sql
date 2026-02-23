-- ==============================================================================
-- VIBECRM SUPABASE SCHEMA DEFINITION
-- ==============================================================================
-- * Hướng dẫn: Copy toàn bộ nội dung file này và chạy trong SQL Editor của Supabase
-- * Bảng bao gồm: tenants, contacts, interactions, follow_ups
-- * Đã bao gồm các Policy (Row Level Security) cơ bản

-- Bật extension cho UUID()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Bảng Tenants
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    logo TEXT,
    plan TEXT DEFAULT 'free',
    status TEXT DEFAULT 'active',
    owner TEXT,
    ai_provider TEXT DEFAULT 'groq',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Bảng Contacts
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    company TEXT,
    tags TEXT[] DEFAULT '{}',
    channel_source TEXT,
    stage TEXT DEFAULT 'lead',
    sentiment TEXT DEFAULT 'neutral',
    ai_summary TEXT,
    deal_value NUMERIC DEFAULT 0,
    deal_probability INTEGER DEFAULT 0,
    avatar TEXT,
    last_contact_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Bảng Interactions (Tin nhắn / Tương tác)
CREATE TABLE IF NOT EXISTS public.interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    channel TEXT NOT NULL,
    direction TEXT NOT NULL, -- 'inbound' | 'outbound'
    content TEXT NOT NULL,
    ai_extracted_intent TEXT,
    ai_extracted_amount NUMERIC,
    ai_extracted_date TIMESTAMPTZ,
    ai_extracted_product TEXT,
    sentiment_score NUMERIC DEFAULT 0, -- -1.0 to 1.0
    sentiment TEXT DEFAULT 'neutral',
    ai_action TEXT,
    stage_changed_to TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Bảng Follow-ups (Công việc cần làm)
CREATE TABLE IF NOT EXISTS public.follow_ups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    type TEXT NOT NULL, -- 'follow_up' | 'quote' | 'call' | 'close' | 'check_in'
    description TEXT,
    due_date TIMESTAMPTZ,
    note TEXT,
    draft_message TEXT,
    status TEXT DEFAULT 'pending', -- 'pending' | 'done' | 'snoozed'
    ai_created BOOLEAN DEFAULT FALSE,
    channel TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- THIẾT LẬP ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Bật RLS cho các bảng
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;

-- Tạo Policy tạm thời để thao tác trong quá trình Dev/Test 
-- (Lưu ý: TRÊN PRODUCTION, CẦN ÁP DỤNG AUTH POLICY DỰA VÀO auth.uid())

CREATE POLICY "Enable all operations for authenticated users only" ON public.tenants FOR ALL USING (true);
CREATE POLICY "Enable all operations for authenticated users only" ON public.contacts FOR ALL USING (true);
CREATE POLICY "Enable all operations for authenticated users only" ON public.interactions FOR ALL USING (true);
CREATE POLICY "Enable all operations for authenticated users only" ON public.follow_ups FOR ALL USING (true);

-- ==============================================================================
-- TẠO DỮ LIỆU MẪU (SEED DATA) ĐỂ DEMO (tuỳ chọn)
-- ==============================================================================
INSERT INTO public.tenants (id, slug, name, logo, plan, status, owner)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'vibecrm', 'VibeCRM Solopreneur', '⚡', 'pro', 'active', 'You')
ON CONFLICT (id) DO NOTHING;
