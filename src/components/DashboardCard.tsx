interface DashboardCardProps {
  title: string;
  value: string;
}

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
