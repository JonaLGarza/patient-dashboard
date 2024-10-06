import { useDispatch } from 'react-redux';
import { setData } from '../store/slices/dataSlice';
import { fetchPosts } from '../api/posts/postsService';
import { names } from '../constants/names';
import { useQuery } from 'react-query';
import { diagnoses } from '../constants/diagnoses';
import { medicationsList } from '../constants/medications';
import { allergiesList } from '../constants/alergies';

export const useFetchData = () => {
  const dispatch = useDispatch();

  return useQuery('fetchData', async () => {
    const data: any = await fetchPosts();
    const augmentedData = data.map((item: any, index: number) => {
      const userId = index + 1;
      const name = names[index] || `Patient ${userId}`;
      const gender = userId % 2 === 0 ? 'Female' : 'Male';
      const age = Math.floor(Math.random() * 60) + 20; // Age between 20 and 80
      const weight = Math.floor(Math.random() * 60) + 50; // Weight between 50kg and 110kg
      const bloodPressure = Math.floor(Math.random() * 80) + 60;
      const heartRate = Math.floor(Math.random() * 60) + 60;
      const oxygenLevel = Math.floor(Math.random() * 10) + 90;
      const temperature = Math.floor(Math.random() * 5) + 35;
      const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
      const medications = [
        medicationsList[Math.floor(Math.random() * medicationsList.length)],
      ];
      const allergies = [
        allergiesList[Math.floor(Math.random() * allergiesList.length)],
      ];
      const admissionDate = new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString();

      return {
        userId,
        id: userId,
        name,
        gender,
        age,
        weight,
        diagnosis,
        medications,
        bloodPressure,
        heartRate,
        oxygenLevel,
        temperature,
        allergies,
        admissionDate,
      };
    });
    dispatch(setData(augmentedData));
    return augmentedData;
  });
};
