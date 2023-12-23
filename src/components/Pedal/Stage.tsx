'use client';

import { defaultBoard } from '@/data/Board';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setBoard } from '@/store/slices/boardSlice';
import { useEffect } from 'react';
import Board from './Board';

interface StageProps {}

const Stage = (stageProps: StageProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.boardReducer);

  useEffect(() => {
    const data = defaultBoard;
    dispatch(setBoard(data));
  }, [dispatch]);

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
