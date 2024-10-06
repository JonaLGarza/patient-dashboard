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
      } else if (preferences.filtering === 'ageAbove60') {
        tempData = tempData.filter((item) => item.age > 60);
      } else if (preferences.filtering === 'recentAdmissions') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        tempData = tempData.filter(
          (item) => new Date(item.admissionDate) >= oneWeekAgo
        );
      } else if (preferences.filtering === 'hasAllergies') {
        tempData = tempData.filter((item) => item.allergies.length > 0);
      } else if (preferences.filtering === 'byDiagnosis' && preferences.diagnosisFilter) {
        tempData = tempData.filter(
          (item) => item.diagnosis === preferences.diagnosisFilter
        );
      } else if (
        preferences.filtering === 'byAdmissionDate' &&
        preferences.admissionDateRange
      ) {
        const selectedDate = new Date(preferences.admissionDateRange);
        tempData = tempData.filter(
          (item) =>
            new Date(item.admissionDate).toDateString() ===
            selectedDate.toDateString()
        );
      }
    }

    // Sorting
    if (preferences.sorting !== 'default') {
      tempData.sort((a, b) => {
        if (preferences.sorting === 'name') {
          return a.name.localeCompare(b.name);
        } else if (preferences.sorting === 'bloodPressure') {
          return b.bloodPressure - a.bloodPressure; // Descending order
        } else if (preferences.sorting === 'age') {
          return b.age - a.age;
        }
        // Add more sorting options as needed
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
        <div className="w-1/12 px-4 py-2 border">ID</div>
        <div className="w-2/12 px-4 py-2 border">Name</div>
        <div className="w-1/12 px-4 py-2 border">Age</div>
        <div className="w-1/12 px-4 py-2 border">Gender</div>
        <div className="w-1/12 px-4 py-2 border">BP</div>
        <div className="w-1/12 px-4 py-2 border">HR</div>
        <div className="w-1/12 px-4 py-2 border">O₂ Sat</div>
        <div className="w-1/12 px-4 py-2 border">Temp</div>
        <div className="w-2/12 px-4 py-2 border">Diagnosis</div>  
        <div className="w-2/12 px-4 py-2 border">Medications</div>
        <div className="w-2/12 px-4 py-2 border">Allergies</div>
      </div>
      {/* Virtualized List */}
      <List
        height={500} // Adjust based on desired height
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
