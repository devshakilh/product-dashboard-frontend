import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCountries = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/Country?limit=100&page=1`
  );
  if (res.status !== 200) {
    throw new Error('Failed to fetch countries');
  }
  return res.data;
};

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });
};
