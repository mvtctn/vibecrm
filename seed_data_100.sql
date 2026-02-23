-- SQL SEED DATA FOR VIBECRM
-- Chạy lệnh này trong SQL Editor của Supabase

INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Khôi 1', 'user1@example.com', '0906070936', 'Công ty Khôi Group 1', 'closed_won', 'referral', 3000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Châu 2', 'user2@example.com', '0905832458', 'Công ty Châu Group 2', 'proposal', 'zalo', 31000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Lê Thị Linh 3', 'user3@example.com', '0902600654', 'Công ty Linh Group 3', 'negotiation', 'referral', 71000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Trần Minh Em 4', 'user4@example.com', '0906129323', 'Công ty Em Group 4', 'proposal', 'telegram', 17000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Ngô Đức Dũng 5', 'user5@example.com', '0904938804', 'Công ty Dũng Group 5', 'negotiation', 'email', 16000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đặng Quang Phú 6', 'user6@example.com', '0904463267', 'Công ty Phú Group 6', 'closed_won', 'referral', 42000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Phú 7', 'user7@example.com', '0909368276', 'Công ty Phú Group 7', 'closed_lost', 'email', 51000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Em 8', 'user8@example.com', '0906207855', 'Công ty Em Group 8', 'closed_lost', 'zalo', 92000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đỗ Minh Phú 9', 'user9@example.com', '0904052861', 'Công ty Phú Group 9', 'negotiation', 'referral', 19000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Dũng 10', 'user10@example.com', '0903384512', 'Công ty Dũng Group 10', 'proposal', 'referral', 81000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Bùi Anh Nam 11', 'user11@example.com', '0901665937', 'Công ty Nam Group 11', 'negotiation', 'referral', 13000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Bùi Anh Vinh 12', 'user12@example.com', '0902988194', 'Công ty Vinh Group 12', 'lead', 'email', 35000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Trần Minh Bình 13', 'user13@example.com', '0907491049', 'Công ty Bình Group 13', 'closed_lost', 'zalo', 30000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Nguyễn Văn Khôi 14', 'user14@example.com', '0909315259', 'Công ty Khôi Group 14', 'lead', 'referral', 69000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Sơn 15', 'user15@example.com', '0901191558', 'Công ty Sơn Group 15', 'closed_won', 'zalo', 85000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Châu 16', 'user16@example.com', '0903470860', 'Công ty Châu Group 16', 'negotiation', 'referral', 17000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đỗ Minh Linh 17', 'user17@example.com', '0904093040', 'Công ty Linh Group 17', 'proposal', 'referral', 40000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Lê Thị Châu 18', 'user18@example.com', '0902726390', 'Công ty Châu Group 18', 'closed_won', 'telegram', 22000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Nguyễn Văn Tú 19', 'user19@example.com', '0907823281', 'Công ty Tú Group 19', 'closed_lost', 'email', 11000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Ngô Đức Quỳnh 20', 'user20@example.com', '0909672382', 'Công ty Quỳnh Group 20', 'proposal', 'zalo', 69000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Lê Thị Dũng 21', 'user21@example.com', '0901161469', 'Công ty Dũng Group 21', 'closed_lost', 'telegram', 9000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Khôi 22', 'user22@example.com', '0908862727', 'Công ty Khôi Group 22', 'proposal', 'referral', 30000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Trần Minh Tú 23', 'user23@example.com', '0906830470', 'Công ty Tú Group 23', 'closed_won', 'email', 24000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Bình 24', 'user24@example.com', '0909964255', 'Công ty Bình Group 24', 'closed_won', 'referral', 70000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Ngô Đức Khôi 25', 'user25@example.com', '0905667326', 'Công ty Khôi Group 25', 'negotiation', 'email', 0, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Ngô Đức Tú 26', 'user26@example.com', '0907394831', 'Công ty Tú Group 26', 'proposal', 'zalo', 2000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Lê Thị Nam 27', 'user27@example.com', '0909563555', 'Công ty Nam Group 27', 'proposal', 'telegram', 72000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Lê Thị Em 28', 'user28@example.com', '0908222165', 'Công ty Em Group 28', 'closed_lost', 'telegram', 55000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Anh 29', 'user29@example.com', '0905617319', 'Công ty Anh Group 29', 'lead', 'telegram', 71000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đặng Quang Dũng 30', 'user30@example.com', '0903417102', 'Công ty Dũng Group 30', 'negotiation', 'telegram', 89000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Trần Minh Em 31', 'user31@example.com', '0902417414', 'Công ty Em Group 31', 'proposal', 'telegram', 65000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Linh 32', 'user32@example.com', '0903351430', 'Công ty Linh Group 32', 'negotiation', 'email', 23000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Dũng 33', 'user33@example.com', '0906479798', 'Công ty Dũng Group 33', 'closed_won', 'telegram', 5000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Trần Minh Châu 34', 'user34@example.com', '0905644099', 'Công ty Châu Group 34', 'closed_lost', 'telegram', 51000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Linh 35', 'user35@example.com', '0906729485', 'Công ty Linh Group 35', 'negotiation', 'referral', 59000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Trần Minh Nam 36', 'user36@example.com', '0902395488', 'Công ty Nam Group 36', 'closed_won', 'email', 30000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Bình 37', 'user37@example.com', '0907064212', 'Công ty Bình Group 37', 'negotiation', 'referral', 41000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Dũng 38', 'user38@example.com', '0905759001', 'Công ty Dũng Group 38', 'proposal', 'telegram', 74000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Sơn 39', 'user39@example.com', '0909979335', 'Công ty Sơn Group 39', 'negotiation', 'email', 9000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đỗ Minh Hạnh 40', 'user40@example.com', '0901556656', 'Công ty Hạnh Group 40', 'closed_won', 'zalo', 61000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Linh 41', 'user41@example.com', '0901140442', 'Công ty Linh Group 41', 'closed_lost', 'referral', 61000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đỗ Minh Oanh 42', 'user42@example.com', '0903697069', 'Công ty Oanh Group 42', 'lead', 'email', 61000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Châu 43', 'user43@example.com', '0905685780', 'Công ty Châu Group 43', 'closed_won', 'telegram', 46000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Trần Minh Tú 44', 'user44@example.com', '0905530662', 'Công ty Tú Group 44', 'closed_won', 'email', 74000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Tú 45', 'user45@example.com', '0908169264', 'Công ty Tú Group 45', 'closed_won', 'zalo', 15000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Bùi Anh Linh 46', 'user46@example.com', '0907637650', 'Công ty Linh Group 46', 'lead', 'email', 84000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Nguyễn Văn Bình 47', 'user47@example.com', '0904226756', 'Công ty Bình Group 47', 'lead', 'email', 75000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Nguyễn Văn Anh 48', 'user48@example.com', '0906145732', 'Công ty Anh Group 48', 'closed_won', 'referral', 50000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Nguyễn Văn Em 49', 'user49@example.com', '0905162215', 'Công ty Em Group 49', 'closed_lost', 'zalo', 81000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Nguyễn Văn Sơn 50', 'user50@example.com', '0903083587', 'Công ty Sơn Group 50', 'closed_won', 'referral', 29000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Em 51', 'user51@example.com', '0905874980', 'Công ty Em Group 51', 'lead', 'zalo', 6000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Tú 52', 'user52@example.com', '0909327595', 'Công ty Tú Group 52', 'negotiation', 'referral', 89000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đỗ Minh Phú 53', 'user53@example.com', '0905348182', 'Công ty Phú Group 53', 'lead', 'referral', 10000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Trần Minh Nam 54', 'user54@example.com', '0905273998', 'Công ty Nam Group 54', 'closed_won', 'telegram', 88000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Nguyễn Văn Sơn 55', 'user55@example.com', '0906386580', 'Công ty Sơn Group 55', 'closed_lost', 'telegram', 58000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Châu 56', 'user56@example.com', '0907482985', 'Công ty Châu Group 56', 'proposal', 'email', 47000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Dũng 57', 'user57@example.com', '0903257854', 'Công ty Dũng Group 57', 'proposal', 'zalo', 36000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Bùi Anh Tú 58', 'user58@example.com', '0904545251', 'Công ty Tú Group 58', 'negotiation', 'email', 51000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đặng Quang Minh 59', 'user59@example.com', '0908542903', 'Công ty Minh Group 59', 'negotiation', 'zalo', 93000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Minh 60', 'user60@example.com', '0908143691', 'Công ty Minh Group 60', 'closed_lost', 'referral', 65000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Bùi Anh Oanh 61', 'user61@example.com', '0909135820', 'Công ty Oanh Group 61', 'proposal', 'telegram', 75000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Ngô Đức Anh 62', 'user62@example.com', '0901731391', 'Công ty Anh Group 62', 'closed_lost', 'referral', 9000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Trần Minh Bình 63', 'user63@example.com', '0904310791', 'Công ty Bình Group 63', 'proposal', 'zalo', 97000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Dũng 64', 'user64@example.com', '0905308351', 'Công ty Dũng Group 64', 'closed_lost', 'referral', 92000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Lê Thị Quỳnh 65', 'user65@example.com', '0902251200', 'Công ty Quỳnh Group 65', 'negotiation', 'referral', 69000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đặng Quang Bình 66', 'user66@example.com', '0901080494', 'Công ty Bình Group 66', 'closed_lost', 'zalo', 64000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Bùi Anh Linh 67', 'user67@example.com', '0901483519', 'Công ty Linh Group 67', 'proposal', 'telegram', 69000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Bùi Anh Nam 68', 'user68@example.com', '0903958858', 'Công ty Nam Group 68', 'closed_won', 'telegram', 8000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đặng Quang Dũng 69', 'user69@example.com', '0908004848', 'Công ty Dũng Group 69', 'closed_won', 'telegram', 83000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đỗ Minh Bình 70', 'user70@example.com', '0904942770', 'Công ty Bình Group 70', 'proposal', 'email', 30000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đỗ Minh Sơn 71', 'user71@example.com', '0908348506', 'Công ty Sơn Group 71', 'proposal', 'referral', 77000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đặng Quang Minh 72', 'user72@example.com', '0902840992', 'Công ty Minh Group 72', 'negotiation', 'referral', 30000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Lê Thị Tú 73', 'user73@example.com', '0902698521', 'Công ty Tú Group 73', 'lead', 'telegram', 92000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Nguyễn Văn Linh 74', 'user74@example.com', '0907021361', 'Công ty Linh Group 74', 'closed_lost', 'email', 68000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Ngô Đức Minh 75', 'user75@example.com', '0903462480', 'Công ty Minh Group 75', 'proposal', 'email', 43000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đặng Quang Nam 76', 'user76@example.com', '0905476997', 'Công ty Nam Group 76', 'closed_lost', 'telegram', 46000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Anh 77', 'user77@example.com', '0905187991', 'Công ty Anh Group 77', 'closed_lost', 'zalo', 32000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Khôi 78', 'user78@example.com', '0901767352', 'Công ty Khôi Group 78', 'closed_won', 'telegram', 97000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Lê Thị Bình 79', 'user79@example.com', '0902722297', 'Công ty Bình Group 79', 'closed_lost', 'email', 55000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Khôi 80', 'user80@example.com', '0903930952', 'Công ty Khôi Group 80', 'lead', 'referral', 48000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đặng Quang Quỳnh 81', 'user81@example.com', '0902000277', 'Công ty Quỳnh Group 81', 'closed_lost', 'referral', 74000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Bùi Anh Minh 82', 'user82@example.com', '0902851492', 'Công ty Minh Group 82', 'closed_won', 'zalo', 38000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đặng Quang Linh 83', 'user83@example.com', '0904125651', 'Công ty Linh Group 83', 'negotiation', 'zalo', 23000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Nguyễn Văn Sơn 84', 'user84@example.com', '0901754197', 'Công ty Sơn Group 84', 'negotiation', 'telegram', 6000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Lê Thị Khôi 85', 'user85@example.com', '0904327353', 'Công ty Khôi Group 85', 'closed_won', 'telegram', 14000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Bùi Anh Hạnh 86', 'user86@example.com', '0906680121', 'Công ty Hạnh Group 86', 'closed_lost', 'referral', 39000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Lê Thị Quỳnh 87', 'user87@example.com', '0907561372', 'Công ty Quỳnh Group 87', 'negotiation', 'telegram', 10000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Hạnh 88', 'user88@example.com', '0903688148', 'Công ty Hạnh Group 88', 'closed_won', 'telegram', 15000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Bình 89', 'user89@example.com', '0905509367', 'Công ty Bình Group 89', 'closed_won', 'zalo', 88000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đặng Quang Hạnh 90', 'user90@example.com', '0906268299', 'Công ty Hạnh Group 90', 'proposal', 'telegram', 45000000, ARRAY['telegram', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đỗ Minh Dũng 91', 'user91@example.com', '0901942182', 'Công ty Dũng Group 91', 'negotiation', 'email', 8000000, ARRAY['email', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Nam 92', 'user92@example.com', '0901673042', 'Công ty Nam Group 92', 'proposal', 'zalo', 69000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Dũng 93', 'user93@example.com', '0908301978', 'Công ty Dũng Group 93', 'lead', 'referral', 98000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Phạm Hoàng Vinh 94', 'user94@example.com', '0907739526', 'Công ty Vinh Group 94', 'closed_won', 'referral', 11000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Khôi 95', 'user95@example.com', '0902482300', 'Công ty Khôi Group 95', 'proposal', 'referral', 19000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đỗ Minh Khôi 96', 'user96@example.com', '0909366852', 'Công ty Khôi Group 96', 'lead', 'referral', 7000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Minh 97', 'user97@example.com', '0909221095', 'Công ty Minh Group 97', 'proposal', 'zalo', 55000000, ARRAY['zalo', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Đỗ Minh Em 98', 'user98@example.com', '0905056664', 'Công ty Em Group 98', 'proposal', 'referral', 23000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Hồ Xuân Minh 99', 'user99@example.com', '0909337555', 'Công ty Minh Group 99', 'closed_lost', 'referral', 54000000, ARRAY['referral', 'seed']);
INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Vũ Kim Oanh 100', 'user100@example.com', '0905112507', 'Công ty Oanh Group 100', 'closed_lost', 'zalo', 68000000, ARRAY['zalo', 'seed']);

-- FOLLOW-UPS
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'call', 'Liên hệ khách hàng đợt 1', '2026-03-01T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'quote', 'Liên hệ khách hàng đợt 2', '2026-02-23T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'call', 'Liên hệ khách hàng đợt 3', '2026-03-01T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'follow_up', 'Liên hệ khách hàng đợt 4', '2026-02-27T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'call', 'Liên hệ khách hàng đợt 5', '2026-02-23T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'call', 'Liên hệ khách hàng đợt 6', '2026-02-25T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'quote', 'Liên hệ khách hàng đợt 7', '2026-02-28T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'quote', 'Liên hệ khách hàng đợt 8', '2026-02-26T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'call', 'Liên hệ khách hàng đợt 9', '2026-02-23T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'quote', 'Liên hệ khách hàng đợt 10', '2026-02-26T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'call', 'Liên hệ khách hàng đợt 11', '2026-02-28T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'call', 'Liên hệ khách hàng đợt 12', '2026-02-28T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'quote', 'Liên hệ khách hàng đợt 13', '2026-02-26T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'follow_up', 'Liên hệ khách hàng đợt 14', '2026-02-23T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'quote', 'Liên hệ khách hàng đợt 15', '2026-02-28T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'follow_up', 'Liên hệ khách hàng đợt 16', '2026-03-01T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'follow_up', 'Liên hệ khách hàng đợt 17', '2026-02-26T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'quote', 'Liên hệ khách hàng đợt 18', '2026-02-26T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'quote', 'Liên hệ khách hàng đợt 19', '2026-02-28T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('00000000-0000-0000-0000-000000000001', 'follow_up', 'Liên hệ khách hàng đợt 20', '2026-02-23T09:40:19.594Z', 'pending', 'Dữ liệu mẫu tự động');
