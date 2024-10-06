// src/components/molecules/TableRow.tsx
import React from 'react';

interface TableRowProps {
  item: any; // Define a proper interface based on your data structure
}

const TableRow: React.FC<TableRowProps> = ({ item }) => {
  return (
    <>
      <div className="w-1/4 px-4 py-2 border">{item.id}</div>
      <div className="w-1/4 px-4 py-2 border">{item.title}</div>
      <div className="w-1/2 px-4 py-2 border">{item.body}</div>
      {/* Add more cells as needed */}
    </>
  );
};

export default TableRow;
