// src/components/organisms/Table.tsx
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { RootState } from '../../../store/store';
import TableRow from '../../molecules/TableRow/TableRow';

const Table: React.FC = () => {
  const data = useSelector((state: RootState) => state.data.items);
  const preferences = useSelector((state: RootState) => state.preferences);

  // Apply sorting and filtering based on preferences
  const filteredData = useMemo(() => {
    // Apply your sorting and filtering logic here
    return data;
  }, [data, preferences]);

  const Row = ({ index, style }: ListChildComponentProps) => {
    const item = filteredData[index];
    return (
      <div style={style} className='flex'>
        <TableRow item={item} />
      </div>
    );
  };

  return (
    <div className="table-container">
      {/* Table Header */}
      <div className="flex font-bold bg-gray-200">
        <div className="w-1/4 px-4 py-2 border">ID</div>
        <div className="w-1/4 px-4 py-2 border">Title</div>
        <div className="w-1/2 px-4 py-2 border">Body</div>
        {/* Add more headers as needed */}
      </div>
      {/* Virtualized List */}
      <List
        height={400} // Adjust based on desired height
        itemCount={filteredData.length}
        itemSize={50} // Adjust based on row height
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default Table;
