import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setFiltering, setSorting } from '../../../store/slices/preferencesSlice';
import Select from '../../atoms/Select/Select';

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.preferences);

  const sortingOptions = [
    { value: 'default', label: 'Default' },
    { value: 'name', label: 'Name' },
    { value: 'bloodPressure', label: 'Blood Pressure' },
  ];

  const filteringOptions = [
    { value: 'all', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'highBP', label: 'High Blood Pressure' },
  ];

  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setSorting(value));
    localStorage.setItem('sorting', value);
  };

  const handleFilteringChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setFiltering(value));
    localStorage.setItem('filtering', value);
  };

  return (
    <div className="flex space-x-4">
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
    </div>
  );
};

export default Filters;
