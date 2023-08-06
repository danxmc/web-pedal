import { ROUTES } from '@/constants';
import { postBoardForUser } from '@/services/boardsService';
import { BoardType } from '@/types/Pedal';
import React, { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { Button } from '../ui/Button';
import { toast } from '../ui/toast';
import { useSession } from 'next-auth/react';

interface SaveBoardButtonProps {
  board: BoardType;
}

const SaveBoardButton = ({ board }: SaveBoardButtonProps) => {
  const { data: session } = useSession();
  const { trigger } = useSWRMutation(ROUTES.API.boards, postBoardForUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSaveBoard = async (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setIsLoading(true);
      if (session) {
        await trigger({ ...board, userId: session.user.id });
      }
    } catch (error) {
      toast({
        title: 'Error saving board',
        message: 'Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button isLoading={isLoading} onClick={(e) => handleSaveBoard(e)}>
      Save Pedal Board
    </Button>
  );
};

export default SaveBoardButton;
