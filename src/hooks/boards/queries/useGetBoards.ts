import { QUERY_KEYS } from '@/constants';
import { boardsAPI } from '@/services/apis/server';
import { useQuery } from '@tanstack/react-query';

export const useGetBoards = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOARDS_QUERY_KEY],
    queryFn: () => boardsAPI.getBoards(),
  });
};
