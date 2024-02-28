import { QUERY_KEYS } from '@/constants';
import { boardsAPI } from '@/services/apis/server';
import { useQueries } from '@tanstack/react-query';

export const useGetBoardsByIds = (ids: Array<number | string>) => {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: [QUERY_KEYS.BOARDS_QUERY_KEY, id],
        queryFn: () => boardsAPI.getBoard(id),
      };
    }),
  });
};
