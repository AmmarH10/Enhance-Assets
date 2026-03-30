export interface Asset {
  id: number;
  asset_name: string;
  asset_code: string;
  category: string;
  division: string;
  location: string;
  assigned_to: string;
  purchase_date: string;
  status: 'Active' | 'Maintenance' | 'Retired';
  created_at: string;
}

export type Division = 'Noor Shopping' | 'Noor Express' | 'Ooredoo Stores' | 'HO' | 'Warehouse';

export const DIVISIONS: Division[] = [
  'Noor Shopping',
  'Noor Express',
  'Ooredoo Stores',
  'HO',
  'Warehouse'
];
