import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import SummaryCard from '../../molecules/SummaryCard/SummaryCard';

const Summary: React.FC = () => {
  const data = useSelector((state: RootState) => state.data.items);
  const preferences = useSelector((state: RootState) => state.preferences);

  const filteredData = useMemo(() => {
    let tempData = [...data];

    if (preferences.filtering !== 'all') {
      if (preferences.filtering === 'male') {
        tempData = tempData.filter((item) => item.gender === 'Male');
      } else if (preferences.filtering === 'female') {
        tempData = tempData.filter((item) => item.gender === 'Female');
      } else if (preferences.filtering === 'highBP') {
        tempData = tempData.filter((item) => item.bloodPressure > 80);
      }
    }

    return tempData;
  }, [data, preferences]);

  const totalPatients = new Set(filteredData.map((item) => item.userId)).size;
  const malePatients = filteredData.filter((item) => item.gender === 'Male').length;
  const femalePatients = filteredData.filter((item) => item.gender === 'Female').length;
  const patientsWithHighBP = new Set(
    filteredData.filter((item) => item.bloodPressure > 80).map((item) => item.userId)
  ).size;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <SummaryCard title="Total Patients" value={totalPatients} />
      <SummaryCard title="Male Patients" value={malePatients} />
      <SummaryCard title="Female Patients" value={femalePatients} />
      <SummaryCard title="Patients with High Blood Pressure" value={patientsWithHighBP} />
    </div>
  );
};

export default Summary;
