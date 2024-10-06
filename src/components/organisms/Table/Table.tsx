import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { RootState } from '../../../store/store';
import TableRow from '../../molecules/TableRow/TableRow';
import { PatientData } from '../../../store/slices/dataSlice';
import PatientModal from '../PatientModal/PatientModal';
import { Virtuoso } from 'react-virtuoso';

const Table: React.FC = () => {
  const data = useSelector((state: RootState) => state.data.items);
  const preferences = useSelector((state: RootState) => state.preferences);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);

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
          return b.bloodPressure - a.bloodPressure;
        } else if (preferences.sorting === 'age') {
          return b.age - a.age;
        }
        // Add more sorting options as needed
        return 0;
      });
    }
    return tempData;
  }, [data, preferences]);

  const handleRowClick = (patient: PatientData) => {
    setSelectedPatient(patient);
  };

  const Row = ({ index, style }: ListChildComponentProps) => {
    const item = filteredData[index];
    return (
      <div style={style}>
        <TableRow item={item} onClick={handleRowClick} />
      </div>
    );
  };

  return (
    <>
    {selectedPatient && (
      <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
    )}
    <div className="table-container overflow-x-auto">
      {/* Table Header */}
      <div className="hidden md:flex font-bold bg-blue-500 text-white sticky top-0 z-10">
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
      <Virtuoso
          style={{ height: '500px' }}
          totalCount={filteredData.length}
          itemContent={(index) => (
            <TableRow
              key={filteredData[index].userId}
              item={filteredData[index]}
              onClick={handleRowClick}
            />
          )}
        />
    </div>
    </>
  );
};

export default Table;
