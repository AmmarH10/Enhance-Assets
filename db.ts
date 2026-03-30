import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('assets.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_name TEXT NOT NULL,
    asset_code TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    division TEXT NOT NULL,
    location TEXT NOT NULL,
    assigned_to TEXT,
    purchase_date TEXT,
    status TEXT DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed initial data if empty
const count = db.prepare('SELECT COUNT(*) as count FROM assets').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO assets (asset_name, asset_code, category, division, location, assigned_to, purchase_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialAssets = [
    ['MacBook Pro 16"', 'ASSET-001', 'Electronics', 'HO', 'Office 402', 'John Doe', '2023-10-15', 'Active'],
    ['Dell Monitor 27"', 'ASSET-002', 'Electronics', 'Warehouse', 'Storage A', 'Unassigned', '2023-11-20', 'Active'],
    ['Office Chair', 'ASSET-003', 'Furniture', 'Noor Shopping', 'Retail Floor', 'Jane Smith', '2024-01-05', 'Maintenance'],
    ['Forklift', 'ASSET-004', 'Machinery', 'Warehouse', 'Loading Bay', 'Mike Ross', '2022-05-12', 'Active'],
    ['Cisco Router', 'ASSET-005', 'Networking', 'Ooredoo Stores', 'Server Room', 'Tech Team', '2023-08-30', 'Retired'],
  ];

  for (const asset of initialAssets) {
    insert.run(...asset);
  }
}

export default db;
