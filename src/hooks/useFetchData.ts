// src/hooks/useFetchData.ts
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setData } from '../store/slices/dataSlice';
import { useEffect } from 'react';
import { fetchPosts } from '../api/posts/postsService';

export const useFetchData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData () {
        const data: any = await fetchPosts();
        dispatch(setData(data));
    }
    fetchData();
  }, [])
};
