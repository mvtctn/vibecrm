import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Khởi tạo Supabase client tĩnh dùng từ JS/TS (ví dụ file này không hỗ trợ SSR Session tự động)
export const supabase = createClient(supabaseUrl, supabaseKey);
