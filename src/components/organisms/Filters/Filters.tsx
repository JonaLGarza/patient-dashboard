// src/components/organisms/Filters.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setFiltering, setSorting } from '../../../store/slices/preferencesSlice';
import Select from '../../atoms/Select/Select';

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.preferences);

  const sortingOptions = [
    { value: 'default', label: 'Default' },
    { value: 'title', label: 'Title' },
  ];

  const filteringOptions = [
    { value: 'all', label: 'All' },
    { value: 'user1', label: 'User 1' },
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
      />
      <Select
        options={filteringOptions}
        value={preferences.filtering}
        onChange={handleFilteringChange}
      />
    </div>
  );
};

export default Filters;
