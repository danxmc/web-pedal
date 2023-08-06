'use client';

import { ROUTES } from '@/constants';
import { defaultBoard, delayBoard, distortionBoard } from '@/data/Board';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getBoardsByUserId } from '@/services/boardsService';
import { setBoard } from '@/store/slices/boardSlice';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import useSWR from 'swr';
import Board from './Board';
import SaveBoardButton from './SaveBoardButton';

interface StageProps {}

const Stage = (stageProps: StageProps) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { data: boardsData } = useSWR(
    session?.user.id ? [ROUTES.API.boards, session.user.id] : null,
    getBoardsByUserId
  );
  const board = useAppSelector((state) => state.boardReducer);

  useEffect(() => {
    if (boardsData?.boards?.length) {
      dispatch(setBoard(boardsData.boards[0]));
    } else {
      // const data = distortionBoard;
      // const data = delayBoard;
      const data = defaultBoard;
      dispatch(setBoard(data));
    }
  }, [boardsData]);

  return (
    <>
      {board?.pedals && (
        <div className='flex w-full flex-row flex-wrap items-stretch justify-start gap-6'>
          <Board pedals={board.pedals} />
        </div>
      )}
    </>
  );
};

export default Stage;
