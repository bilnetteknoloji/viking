-- Insert test agencies
INSERT INTO agencies (name, contact_person, phone_number, email, tax_number, address) VALUES
('Blue Voyage Tours', 'John Doe', '+905551234567', 'info@bluevoyage.com', '1234567890', 'Marina Street No:1, Fethiye'),
('Sunshine Tours', 'Jane Smith', '+905559876543', 'contact@sunshinetours.com', '9876543210', 'Beach Road No:5, Marmaris');

-- Insert test tours
INSERT INTO tours (name, description, route, price, duration, max_capacity, start_time, end_time, agency_id) VALUES
('12 Islands Tour', 'Discover the beautiful 12 islands of Fethiye', 'Fethiye Marina - 12 Islands - Fethiye Marina', 100.00, 8, 50, '09:00', '17:00', (SELECT id FROM agencies WHERE name = 'Blue Voyage Tours')),
('Butterfly Valley Tour', 'Visit the famous Butterfly Valley and swim in crystal clear waters', 'Ölüdeniz - Butterfly Valley - Blue Cave - Ölüdeniz', 80.00, 6, 30, '10:00', '16:00', (SELECT id FROM agencies WHERE name = 'Sunshine Tours'));

-- Insert test guests (with encrypted/hashed data in real scenario)
INSERT INTO guests (full_name, nationality, identity_number, phone_number, number_of_guests, accommodation_address) VALUES
('Michael Brown', 'British', 'AB123456', '+447700900123', 2, 'Hotel Paradise, Room 101, Fethiye'),
('Maria Garcia', 'Spanish', 'XY789012', '+34123456789', 4, 'Sunset Resort, Room 205, Marmaris');

-- Insert test bookings
INSERT INTO bookings (tour_id, guest_id, agency_id, total_amount, advance_payment, remaining_amount, status, booking_date) VALUES
((SELECT id FROM tours WHERE name = '12 Islands Tour'),
 (SELECT id FROM guests WHERE full_name = 'Michael Brown'),
 (SELECT id FROM agencies WHERE name = 'Blue Voyage Tours'),
 200.00, 100.00, 100.00, 'confirmed', CURRENT_TIMESTAMP),
((SELECT id FROM tours WHERE name = 'Butterfly Valley Tour'),
 (SELECT id FROM guests WHERE full_name = 'Maria Garcia'),
 (SELECT id FROM agencies WHERE name = 'Sunshine Tours'),
 320.00, 160.00, 160.00, 'pending', CURRENT_TIMESTAMP);
