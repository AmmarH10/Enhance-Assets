import React from 'react';
import { useParams } from 'react-router-dom';
import { Package, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import AssetTable from '../components/AssetTable';
import AddAssetForm from '../components/AddAssetForm';
import { Asset, Division } from '../types';
import axios from 'axios';

export default function DivisionAssets() {
  const { name } = useParams<{ name: string }>();
  const divisionName = decodeURIComponent(name || '');
  const [assets, setAssets] = React.useState<Asset[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/assets?division=${encodeURIComponent(divisionName)}`);
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/assets/${id}`);
      fetchAssets();
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  React.useEffect(() => {
    fetchAssets();
  }, [divisionName]);

  const stats = {
    total: assets.length,
    active: assets.filter(a => a.status === 'Active').length,
    maintenance: assets.filter(a => a.status === 'Maintenance').length,
    retired: assets.filter(a => a.status === 'Retired').length,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{divisionName} Assets</h1>
          <p className="text-gray-500 mt-1">Management of assets specifically for the {divisionName} division.</p>
        </div>
        <AddAssetForm onSuccess={fetchAssets} initialDivision={divisionName as Division} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Assets" value={stats.total} icon={Package} color="indigo" subtitle={divisionName} />
        <StatCard title="Active" value={stats.active} icon={CheckCircle} color="green" subtitle={divisionName} />
        <StatCard title="Maintenance" value={stats.maintenance} icon={AlertTriangle} color="yellow" subtitle={divisionName} />
        <StatCard title="Retired" value={stats.retired} icon={XCircle} color="red" subtitle={divisionName} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Asset List</h2>
        </div>
        <AssetTable assets={assets} onDelete={handleDelete} isLoading={isLoading} />
      </div>
    </div>
  );
}
