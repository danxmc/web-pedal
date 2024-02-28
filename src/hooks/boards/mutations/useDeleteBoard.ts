import { QUERY_KEYS } from '@/constants';
import { boardsAPI } from '@/services/apis/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => boardsAPI.deleteBoard(id),

    onSuccess: () => {
      console.log('deleted successfully');
    },

    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.BOARDS_QUERY_KEY],
        });
      }
    },
  });
};
