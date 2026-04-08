interface DashboardCardProps {
  title: string;
  value: string | number;
}

export function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      </div>
    </div>
  );
}