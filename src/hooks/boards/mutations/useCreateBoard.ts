import { QUERY_KEYS } from '@/constants';
import { boardsAPI } from '@/services/apis/server';
import { BoardType } from '@/types/Pedal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BoardType) => boardsAPI.createBoard(data),
    onMutate: () => {
      console.log('mutate');
    },

    onError: () => {
      console.error('error');
    },

    onSuccess: () => {
      console.log('success');
    },

    onSettled: async (_data, error) => {
      console.log('settled');
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
