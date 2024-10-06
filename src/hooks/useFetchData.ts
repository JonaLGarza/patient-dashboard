// src/hooks/useFetchData.ts
import { useDispatch } from 'react-redux';
import { setData } from '../store/slices/dataSlice';
import { useEffect } from 'react';
import { fetchPosts } from '../api/posts/postsService';
import { names } from '../constants/names';

export const useFetchData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData () {
        const data: any = await fetchPosts();
        const augmentedData = data.map((item: any) => {
            const userId = item.userId;
            const name = names[userId - 1] || `Patient ${userId}`;
            const gender = userId % 2 === 0 ? 'Female' : 'Male'; // Even userId: Female, Odd userId: Male
            const bloodPressure = item.id; // Assuming 'id' is the blood pressure reading
            return {    
              ...item,
              name,
              gender,
              bloodPressure,
            };
          });
        dispatch(setData(augmentedData));
    }
    fetchData();
  }, [])
};
