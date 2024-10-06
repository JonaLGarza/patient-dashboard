interface SummaryCardProps {
  title: string;
  value: number | string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => {
  return (
    <div className="p-4 bg-white border rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default SummaryCard;
