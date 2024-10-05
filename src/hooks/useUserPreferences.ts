import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFiltering, setSorting } from '../store/slices/preferencesSlice';

export const useUserPreferences = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const sorting = localStorage.getItem('sorting');
    const filtering = localStorage.getItem('filtering');

    if (sorting) dispatch(setSorting(sorting));
    if (filtering) dispatch(setFiltering(filtering));
  }, [dispatch]);
};
