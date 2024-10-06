import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setAdmissionDateRange, setDiagnosisFilter, setFiltering, setSorting } from '../../../store/slices/preferencesSlice';
import Select from '../../atoms/Select/Select';
import { diagnoses } from '../../../constants/diagnoses';

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.preferences);

  const sortingOptions = [
    { value: 'default', label: 'Default' },
    { value: 'name', label: 'Name' },
    { value: 'bloodPressure', label: 'Blood Pressure' },
    { value: 'age', label: 'Age' },
  ];

  const filteringOptions = [
    { value: 'all', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'highBP', label: 'High Blood Pressure' },
    { value: 'ageAbove60', label: 'Age Above 60' },
    { value: 'recentAdmissions', label: 'Admitted in Last 7 Days' },
    { value: 'hasAllergies', label: 'Has Allergies' },
    { value: 'byDiagnosis', label: 'By Diagnosis' },
    { value: 'byAdmissionDate', label: 'By Admission Date' },
    // Add more filtering options as needed
  ];

  const diagnosesOptions = [
    { value: '', label: 'Select Diagnosis' },
    ...diagnoses.map((diag) => ({ value: diag, label: diag })),
  ];

  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setSorting(value));
    localStorage.setItem('sorting', value);
  };

  const handleDiagnosisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setDiagnosisFilter(value));
  };

  const handleAdmissionDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setAdmissionDateRange(value));
  };

  const handleFilteringChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setFiltering(value));
    localStorage.setItem('filtering', value);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
    <Select
      options={sortingOptions}
      value={preferences.sorting}
      onChange={handleSortingChange}
      label="Sort By"
    />
    <Select
      options={filteringOptions}
      value={preferences.filtering}
      onChange={handleFilteringChange}
      label="Filter By"
    />
    {preferences.filtering === 'byDiagnosis' && (
      <Select
        options={diagnosesOptions}
        value={preferences.diagnosisFilter}
        onChange={handleDiagnosisChange}
        label="Diagnosis"
      />
    )}
    {preferences.filtering === 'byAdmissionDate' && (
      <input
        type="date"
        value={preferences.admissionDateRange}
        onChange={handleAdmissionDateChange}
        className="px-3 py-2 border rounded"
      />
    )}
  </div>
  );
};

export default Filters;
