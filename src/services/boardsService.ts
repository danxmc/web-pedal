import { ROUTES } from '@/constants';
import { BoardType } from '@/types/Pedal';
import { GetBoardsData, PostBoardData } from '@/types/api/boards';
import axios from 'axios';

export const getBoardsByUserId = async (_url: string, userId: string) => {
  try {
    const params = new URLSearchParams();
    if (userId) {
      params.set('userId', userId);
    }

    const response = await axios.get(ROUTES.API.boards, { params });
    return response.data as GetBoardsData;
  } catch (error) {
    throw new Error('Could not GET boards');
  }
};

export const postBoardForUser = async (
  _url: string,
  { arg }: { arg: BoardType }
) => {
  try {
    const response = await axios.post(ROUTES.API.boards, arg);
    return response.data as PostBoardData;
  } catch (error) {
    throw new Error('Could not POST board');
  }
};
