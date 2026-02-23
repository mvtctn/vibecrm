
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTenant() {
    const { data, error } = await supabase.from('tenants').select('id, name').limit(1);
    if (error) {
        console.error('Error fetching tenant:', error);
        return;
    }
    console.log('Available Tenant:', data);
}

checkTenant();
