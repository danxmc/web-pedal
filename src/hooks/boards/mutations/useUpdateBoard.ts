import { QUERY_KEYS } from '@/constants';
import { boardsAPI } from '@/services/apis/server';
import { BoardType } from '@/types/Pedal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BoardType) => boardsAPI.updateBoard(data),

    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.BOARDS_QUERY_KEY],
        });
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.BOARDS_QUERY_KEY, variables.id],
        });
      }
    },
  });
};
