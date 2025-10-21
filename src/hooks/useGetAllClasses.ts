import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/api-client';

const fetchClasses = async (schoolId: string) => {
  const res = await apiClient.get(`/classes`, { params: { schoolId } });

  return res;
};

export const useClasses = (schoolId: string) => {
  return useQuery({
    queryKey: ['classes', schoolId],
    queryFn: () => fetchClasses(schoolId),
    enabled: !!schoolId,
  });
};
