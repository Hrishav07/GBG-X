CREATE DATABASE IF NOT EXISTS gbgx_enterprise_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gbgx_enterprise_db;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS partners;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    slug VARCHAR(60) NOT NULL UNIQUE
);

INSERT INTO categories (name, slug) VALUES 
('High-Speed EV', 'high-speed-ev'),
('Low-Speed EV', 'low-speed-ev'),
('Accessories', 'accessories'),
('Lithium Batteries', 'batteries'),
('Spare & Auto Parts', 'spare-parts');

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    brand VARCHAR(80) NOT NULL,
    name VARCHAR(140) NOT NULL,
    sub_category VARCHAR(40) DEFAULT NULL, -- 'scooter', 'Helmet', 'Jacket', 'Gloves', 'Phone Holder', 'battery', 'part'
    badge VARCHAR(30) DEFAULT NULL,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2) DEFAULT NULL,
    rating DECIMAL(2,1) DEFAULT 4.8,
    reviews_count INT DEFAULT 120,
    speed VARCHAR(30) DEFAULT NULL,
    vehicle_range VARCHAR(30) DEFAULT NULL,
    battery_spec VARCHAR(60) DEFAULT NULL,
    specs VARCHAR(160) NOT NULL,
    image_url VARCHAR(350) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO products (category_id, brand, name, sub_category, badge, price, old_price, rating, reviews_count, speed, vehicle_range, battery_spec, specs, image_url, description) VALUES
(1, 'Ather Energy', 'Ather 450X Gen 3', 'scooter', 'BESTSELLER', 142999.00, NULL, 4.9, 310, '90 km/h', '150 km IDC', '3.7 kWh', '150 km IDC • 90 km/h • 3.7 kWh Pack', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80', 'Flagship high-speed electric scooter with 7-inch dashboard, Google Maps navigation, warp mode, and fast-charging capabilities across 1,400+ Grid points.'),
(1, 'Ola Electric', 'Ola S1 Pro Gen 2', 'scooter', 'HOT', 134999.00, NULL, 4.8, 480, '120 km/h', '195 km IDC', '4.0 kWh', '195 km IDC • 120 km/h • 4.0 kWh Pack', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80', 'Ultimate sport performance EV scooter featuring MoveOS 4, cruise control, proximity unlock, party mode sound effects, and dual-tone telescopic suspension.'),
(1, 'TVS Motor', 'TVS iQube ST', 'scooter', 'FAMILY PICK', 129000.00, NULL, 4.8, 220, '82 km/h', '145 km IDC', '3.4 kWh', '145 km IDC • 82 km/h • 3.4 kWh Pack', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&q=80', 'Smart family electric scooter engineered by TVS with massive under-seat storage, smart connect telemetry, and touch-assist parking brakes.'),
(2, 'Hero Electric', 'Hero Eddy City Commuter', 'scooter', 'NON-RTO', 72000.00, NULL, 4.7, 195, '25 km/h', '85 km IDC', '1.5 kWh Removable', '85 km IDC • 25 km/h • Non-RTO / No License', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80', 'Non-RTO low-speed city commuter for daily errands, students, and seniors. Features a lightweight portable Lithium battery pack.'),
(3, 'Steelbird', 'Steelbird SBA-7 7Wings DOT Helmet', 'Helmet', NULL, 3499.00, NULL, 4.8, 520, NULL, NULL, NULL, 'ISI & DOT Certified • Dual Visor • Quick Release', 'https://images.unsplash.com/photo-1558981854-325d762e5ca5?auto=format&fit=crop&w=500&q=80', 'Aerodynamic full-face helmet with dual visor, micro-metric buckle, and breathable neck padding for EV highway cruising.'),
(3, 'Rynox', 'Rynox Air GT4 All-Weather Jacket', 'Jacket', NULL, 6250.00, NULL, 4.9, 110, NULL, NULL, NULL, 'CE Level 2 Armor • Invista Cordura • Neon Accents', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80', 'Heavy duty all-season armored riding jacket with heavy mesh ventilation for Indian climate and superior impact protection.'),
(3, 'Rynox', 'Rynox Tornado Pro 3 Gloves', 'Gloves', NULL, 3450.00, NULL, 4.8, 230, NULL, NULL, NULL, 'Knuckle Carbon Shield • Touchscreen Tips', 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=500&q=80', 'Full gauntlet protection gloves featuring carbon fiber knuckle protectors and conductive index fingertips for phone use.'),
(3, 'BOBO', 'BOBO Claw Grip with Fast Charger', 'Phone Holder', NULL, 1899.00, NULL, 4.9, 650, NULL, NULL, NULL, 'QC 3.0 Quick USB • 360° Aluminium Ball', 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=500&q=80', 'Robust handlebar phone mount with built-in Quick Charge 3.0 USB port to keep your navigation powered on long EV rides.'),
(4, 'GBGX Power Pro', '72V 40Ah Smart NMC Lithium Pack', 'battery', 'FAST CHARGE', 48500.00, 54000.00, 4.9, 85, NULL, '110 km Range', '72V 40Ah (2.88 kWh)', 'Smart CAN BMS • 2000+ Deep Cycles • AIS-156', 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=500&q=80', 'High-density Lithium-ion pack with thermal runaway sensors, Bluetooth BMS monitoring, and fire-retardant casing.'),
(5, 'Universal OEM', '3kW High-Torque BLDC Hub Motor & FOC Controller', 'part', 'IP67', 18999.00, 21500.00, 4.8, 92, NULL, NULL, NULL, 'Vector Sine Wave • IP67 Monsoon Waterproof', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80', 'OEM replacement powertrain unit compatible with major Indian high-speed and retrofitted electric scooters.');

CREATE TABLE partners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partner_type VARCHAR(60) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(80) NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);