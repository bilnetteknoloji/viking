-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (handled by Supabase Auth)
-- We'll use the built-in auth.users table

-- Create agencies table
CREATE TABLE agencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tax_number VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tours table
CREATE TABLE tours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    route TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration INTEGER NOT NULL, -- in hours
    max_capacity INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    agency_id UUID REFERENCES agencies(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create guests table
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    identity_number VARCHAR(255) NOT NULL, -- Encrypted
    phone_number VARCHAR(20) NOT NULL,
    number_of_guests INTEGER NOT NULL,
    accommodation_address TEXT NOT NULL,
    ip_address VARCHAR(255), -- Hashed
    mac_address VARCHAR(255), -- Hashed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tour_id UUID REFERENCES tours(id) NOT NULL,
    guest_id UUID REFERENCES guests(id) NOT NULL,
    agency_id UUID REFERENCES agencies(id),
    total_amount DECIMAL(10,2) NOT NULL,
    advance_payment DECIMAL(10,2) NOT NULL,
    remaining_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    payment_intent_id VARCHAR(255),
    booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_agencies_updated_at
    BEFORE UPDATE ON agencies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tours_updated_at
    BEFORE UPDATE ON tours
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_tours_agency_id ON tours(agency_id);
CREATE INDEX idx_bookings_tour_id ON bookings(tour_id);
CREATE INDEX idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX idx_bookings_agency_id ON bookings(agency_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_booking_date ON bookings(booking_date);

-- Enable Row Level Security (RLS)
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Agencies are viewable by authenticated users"
    ON agencies FOR SELECT
    USING (auth.role() IN ('admin', 'agency'));

CREATE POLICY "Agencies are insertable by admins only"
    ON agencies FOR INSERT
    WITH CHECK (auth.role() = 'admin');

CREATE POLICY "Agencies are updatable by admins only"
    ON agencies FOR UPDATE
    USING (auth.role() = 'admin');

CREATE POLICY "Tours are viewable by all users"
    ON tours FOR SELECT
    USING (true);

CREATE POLICY "Tours are insertable by agency owners and admins"
    ON tours FOR INSERT
    WITH CHECK (auth.role() IN ('admin', 'agency'));

CREATE POLICY "Tours are updatable by agency owners and admins"
    ON tours FOR UPDATE
    USING (auth.role() IN ('admin', 'agency'));

CREATE POLICY "Guests are viewable by authenticated users"
    ON guests FOR SELECT
    USING (auth.role() IN ('admin', 'agency'));

CREATE POLICY "Guests are insertable by all users"
    ON guests FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Bookings are viewable by authenticated users"
    ON bookings FOR SELECT
    USING (auth.role() IN ('admin', 'agency'));

CREATE POLICY "Bookings are insertable by all users"
    ON bookings FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Bookings are updatable by agency owners and admins"
    ON bookings FOR UPDATE
    USING (auth.role() IN ('admin', 'agency'));
