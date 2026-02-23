-- DỊCH VỤ DỌN DẸP DỮ LIỆU & KHỞI TẠO USER CHÍNH THỨC
-- Chạy script này trong SQL Editor của Supabase

-- 1. Xoá dữ liệu cũ trong các bảng Public
TRUNCATE public.follow_ups, public.interactions, public.contacts, public.tenants CASCADE;

-- 2. Tạo User Auth mới (mvtctn@gmail.com / abc@123456)
-- Lưu ý: Sử dụng pgcrypto để hash mật khẩu đúng chuẩn Supabase Auth
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4(),
    'authenticated',
    'authenticated',
    'mvtctn@gmail.com',
    extensions.crypt('abc@123456', extensions.gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"MVTCTN Admin"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
) RETURNING id;

-- 3. Tạo Tenant mặc định cho User này
-- Chú ý: Cần lấy ID từ bước trên để điền vào trường owner nếu cần, 
-- hoặc đơn giản là tạo tenant với ID cố định và map sau.

INSERT INTO public.tenants (id, slug, name, logo, plan, status, owner)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'mvtctn-crm', 'MVTCTN Enterprise', '🚀', 'pro', 'active', 'mvtctn@gmail.com');

-- 4. Thông báo:
-- Bạn đã có thể đăng nhập bằng email: mvtctn@gmail.com và pass: abc@123456
