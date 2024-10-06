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

    return tempData;
  }, [data, preferences]);

  const totalPatients = filteredData.length;
  const malePatients = filteredData.filter((item) => item.gender === 'Male').length;
  const femalePatients = filteredData.filter((item) => item.gender === 'Female').length;
  const patientsWithHighBP = filteredData.filter(
    (item) => item.bloodPressure > 80
  ).length;
  const patientsAbove60 = filteredData.filter((item) => item.age > 60).length;
  const recentAdmissions = filteredData.filter((item) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(item.admissionDate) >= oneWeekAgo;
  }).length;
  const patientsWithAllergies = filteredData.filter(
    (item) => item.allergies.length > 0
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <SummaryCard title="Total Patients" value={totalPatients} />
      <SummaryCard title="Male Patients" value={malePatients} />
      <SummaryCard title="Female Patients" value={femalePatients} />
      <SummaryCard title="Patients with High BP" value={patientsWithHighBP} />
      <SummaryCard title="Patients Above Age 60" value={patientsAbove60} />
      <SummaryCard title="Recent Admissions" value={recentAdmissions} />
      <SummaryCard title="Patients with Allergies" value={patientsWithAllergies} />
    </div>
  );
};

export default Summary;
