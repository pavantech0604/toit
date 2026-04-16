-- 1. Staff Profiles
CREATE TYPE staff_role AS ENUM ('manager', 'server', 'chef');

CREATE TABLE staff_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role staff_role NOT NULL DEFAULT 'server',
    pin_code TEXT, -- Future POS quick login
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Mock Analytics View (Materialized view for dashboard performance in production, but we will use normal table for MVP)
CREATE TABLE daily_revenue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    gross_revenue DECIMAL(12,2) NOT NULL DEFAULT 0,
    footfall INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: In a real app we'd auto-calculate this from "orders", but for MVP we supply seed data.

-- Seed specific users IF you want to create them via SQL, though Supabase auth is tricky via SQL directly.
-- Instead, the Context/Auth layer will handle it by querying staff_profiles. 
-- Assuming we'll create the auth users via UI or standard Supabase dashboard, 
-- but here we provide RLS policies:

ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_revenue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read staff_profiles" ON staff_profiles FOR SELECT USING (true);
CREATE POLICY "Public read daily_revenue" ON daily_revenue FOR SELECT USING (true);
CREATE POLICY "Only Managers can write revenue" ON daily_revenue FOR ALL USING (
    EXISTS (
        SELECT 1 FROM staff_profiles 
        WHERE staff_profiles.id = auth.uid() 
        AND staff_profiles.role = 'manager'
    )
);

-- Seed revenue data for Recharts testing
INSERT INTO daily_revenue (date, gross_revenue, footfall) VALUES 
(CURRENT_DATE - INTERVAL '6 days', 185000, 240),
(CURRENT_DATE - INTERVAL '5 days', 190000, 260),
(CURRENT_DATE - INTERVAL '4 days', 215000, 310),
(CURRENT_DATE - INTERVAL '3 days', 345000, 480),
(CURRENT_DATE - INTERVAL '2 days', 412000, 520),
(CURRENT_DATE - INTERVAL '1 days', 450000, 560),
(CURRENT_DATE, 120000, 150); -- Ongoing today
