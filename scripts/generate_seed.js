
const tenantId = "00000000-0000-0000-0000-000000000000";
const stages = ["lead", "proposal", "negotiation", "closed_won", "closed_lost"];
const sources = ["zalo", "telegram", "email", "referral"];
const names = ["Nguyễn Văn", "Lê Thị", "Trần Minh", "Phạm Hoàng", "Vũ Kim", "Đặng Quang", "Bùi Anh", "Đỗ Minh", "Hồ Xuân", "Ngô Đức"];
const lastNames = ["Anh", "Bình", "Châu", "Dũng", "Em", "Hạnh", "Khôi", "Linh", "Minh", "Nam", "Oanh", "Phú", "Quỳnh", "Sơn", "Tú", "Vinh"];

const contacts = [];
for (let i = 1; i <= 100; i++) {
    const firstName = names[Math.floor(Math.random() * names.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName} ${i}`;
    const email = `user${i}@example.com`;
    const phone = `090${Math.floor(1000000 + Math.random() * 9000000)}`;
    const company = `Công ty ${lastName} Group ${i}`;
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const deal_value = Math.floor(Math.random() * 100) * 1000000; // 0 to 99M

    contacts.push({
        tenant_id: tenantId,
        name,
        email,
        phone,
        company,
        stage,
        source,
        deal_value,
        channel_source: source,
        tags: [source, `batch_${i % 10}`]
    });
}

const fs = require('fs');
fs.writeFileSync('scripts/contacts_seed.json', JSON.stringify(contacts, null, 2));
console.log('Generated 100 contacts in scripts/contacts_seed.json');
