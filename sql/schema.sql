-- SQL Schema for Asset Management Web Application

CREATE DATABASE IF NOT EXISTS asset_db;
USE asset_db;

CREATE TABLE IF NOT EXISTS assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asset_name VARCHAR(255) NOT NULL,
    asset_code VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    division VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    assigned_to VARCHAR(255),
    purchase_date DATE,
    status ENUM('Active', 'Maintenance', 'Retired') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO assets (asset_name, asset_code, category, division, location, assigned_to, purchase_date, status)
VALUES 
('MacBook Pro 16"', 'ASSET-001', 'Electronics', 'HO', 'Office 402', 'John Doe', '2023-10-15', 'Active'),
('Dell Monitor 27"', 'ASSET-002', 'Electronics', 'Warehouse', 'Storage A', 'Unassigned', '2023-11-20', 'Active'),
('Office Chair', 'ASSET-003', 'Furniture', 'Noor Shopping', 'Retail Floor', 'Jane Smith', '2024-01-05', 'Maintenance'),
('Forklift', 'ASSET-004', 'Machinery', 'Warehouse', 'Loading Bay', 'Mike Ross', '2022-05-12', 'Active'),
('Cisco Router', 'ASSET-005', 'Networking', 'Ooredoo Stores', 'Server Room', 'Tech Team', '2023-08-30', 'Retired');
