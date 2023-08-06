import { Board } from '@prisma/client';
import { ZodIssue } from 'zod';

export interface GetBoardsData {
  error: string | ZodIssue[] | null;
  boards: Array<Board> | null;
}

export interface PostBoardData {
  error: string | ZodIssue[] | null;
  success: boolean;
}
