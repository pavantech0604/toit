-- 1. Types & Enums
CREATE TYPE reservation_status AS ENUM ('confirmed', 'seated', 'cancelled', 'completed', 'no-show');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');

-- 2. Menu Management
CREATE TABLE menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    icon TEXT, -- Lucide icon name
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    in_stock BOOLEAN DEFAULT true,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Reservations
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guests_count INT NOT NULL DEFAULT 2,
    table_number TEXT,
    status reservation_status DEFAULT 'confirmed',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Initial Seed Data (Categories)
INSERT INTO menu_categories (name, icon, display_order) VALUES
('Brews', 'Beer', 1),
('Starters', 'Flame', 2),
('Pizzas', 'Pizza', 3),
('Main Course', 'Utensils', 4);

-- 5. Enable RLS
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Public view for menu
CREATE POLICY "Public Read Menu Categories" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Menu Items" ON menu_items FOR SELECT USING (true);

-- Manager permissions for menu (assuming service role or specific admin check)
CREATE POLICY "Manager Access Menu" ON menu_items 
FOR ALL USING (auth.role() = 'authenticated');

-- Reservation policies
CREATE POLICY "Public Insert Reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff Manage Reservations" ON reservations FOR ALL USING (auth.role() = 'authenticated');
