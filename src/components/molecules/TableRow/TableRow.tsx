interface TableRowProps {
  item: {
    id: number;
    name: string;
    gender: string;
    bloodPressure: number;
    // Add other fields as needed
  };
}

const TableRow: React.FC<TableRowProps> = ({ item }) => {
  return (
    <>
      <div className="w-1/5 px-4 py-2 border">{item.id}</div>
      <div className="w-2/5 px-4 py-2 border">{item.name}</div>
      <div className="w-1/5 px-4 py-2 border">{item.gender}</div>
      <div className="w-1/5 px-4 py-2 border">{item.bloodPressure}</div>
    </>
  );
};

export default TableRow;
