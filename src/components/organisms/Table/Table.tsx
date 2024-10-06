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
    let tempData = [...data];

    // Filtering
    if (preferences.filtering !== 'all') {
      if (preferences.filtering === 'male') {
        tempData = tempData.filter((item) => item.gender === 'Male');
      } else if (preferences.filtering === 'female') {
        tempData = tempData.filter((item) => item.gender === 'Female');
      } else if (preferences.filtering === 'highBP') {
        tempData = tempData.filter((item) => item.bloodPressure > 80);
      }
    }

    // Sorting
    if (preferences.sorting !== 'default') {
      tempData.sort((a, b) => {
        if (preferences.sorting === 'name') {
          return a.name.localeCompare(b.name);
        } else if (preferences.sorting === 'bloodPressure') {
          return b.bloodPressure - a.bloodPressure; // Descending order
        }
        return 0;
      });
    }

    return tempData;
  }, [data, preferences]);

  const Row = ({ index, style }: ListChildComponentProps) => {
    const item = filteredData[index];
    return (
      <div style={style} className="flex">
        <TableRow item={item} />
      </div>
    );
  };

  return (
    <div className="table-container">
      {/* Table Header */}
      <div className="flex font-bold bg-gray-200">
        <div className="w-1/5 px-4 py-2 border">ID</div>
        <div className="w-2/5 px-4 py-2 border">Name</div>
        <div className="w-1/5 px-4 py-2 border">Gender</div>
        <div className="w-1/5 px-4 py-2 border">Blood Pressure</div>
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
