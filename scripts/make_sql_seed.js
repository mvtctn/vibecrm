
const tenantId = "00000000-0000-0000-0000-000000000001";
const stages = ["lead", "proposal", "negotiation", "closed_won", "closed_lost"];
const sources = ["zalo", "telegram", "email", "referral"];
const names = ["Nguyễn Văn", "Lê Thị", "Trần Minh", "Phạm Hoàng", "Vũ Kim", "Đặng Quang", "Bùi Anh", "Đỗ Minh", "Hồ Xuân", "Ngô Đức"];
const lastNames = ["Anh", "Bình", "Châu", "Dũng", "Em", "Hạnh", "Khôi", "Linh", "Minh", "Nam", "Oanh", "Phú", "Quỳnh", "Sơn", "Tú", "Vinh"];

let sql = `-- SQL SEED DATA FOR VIBECRM\n-- Chạy lệnh này trong SQL Editor của Supabase\n\n`;

// Clear existing to avoid duplicate name errors if any, but better use INSERT
// sql += `DELETE FROM public.contacts WHERE tenant_id = '${tenantId}';\n\n`;

for (let i = 1; i <= 100; i++) {
    const firstName = names[Math.floor(Math.random() * names.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName} ${i}`;
    const email = `user${i}@example.com`;
    const phone = `090${Math.floor(1000000 + Math.random() * 9000000)}`;
    const company = `Công ty ${lastName} Group ${i}`;
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const deal_value = Math.floor(Math.random() * 100) * 1000000;

    sql += `INSERT INTO public.contacts (tenant_id, name, email, phone, company, stage, channel_source, deal_value, tags) 
VALUES ('${tenantId}', '${name}', '${email}', '${phone}', '${company}', '${stage}', '${source}', ${deal_value}, ARRAY['${source}', 'seed']);\n`;
}

// Add some follow-ups
sql += `\n-- FOLLOW-UPS\n`;
for (let i = 1; i <= 20; i++) {
    const type = ["follow_up", "call", "quote"][Math.floor(Math.random() * 3)];
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 7));
    const isoDate = date.toISOString();

    sql += `INSERT INTO public.follow_ups (tenant_id, type, description, due_date, status, note)
VALUES ('${tenantId}', '${type}', 'Liên hệ khách hàng đợt ${i}', '${isoDate}', 'pending', 'Dữ liệu mẫu tự động');\n`;
}

const fs = require('fs');
fs.writeFileSync('seed_data_100.sql', sql);
console.log('Seed SQL generated in seed_data_100.sql');
