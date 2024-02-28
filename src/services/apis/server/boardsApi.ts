import { ROUTES } from '@/constants';
import { BoardType } from '@/types/Pedal';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getBoards = async () => {
  try {
    const response = await axiosInstance.get<BoardType[]>(ROUTES.API.boards);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBoard = async (id: number | string) => {
  // const params = new URLSearchParams();
  // if (userId) {
  //   params.set('userId', userId);
  // }
  try {
    const response = await axiosInstance.get<BoardType>(
      `${ROUTES.API.boards}/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createBoard = async (data: BoardType) => {
  try {
    const response = await axiosInstance.post(ROUTES.API.boards, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateBoard = async (data: BoardType) => {
  try {
    const response = await axiosInstance.put(
      `${ROUTES.API.boards}/${data.id}`,
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBoard = async (id: number | string) => {
  try {
    const response = await axiosInstance.delete(`${ROUTES.API.boards}/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
