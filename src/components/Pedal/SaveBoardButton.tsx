import { BoardType } from '@/types/Pedal';
import { Button } from '@/ui/button';
import { toast } from '@/ui/toast';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

interface SaveBoardButtonProps {
  board: BoardType;
}

const SaveBoardButton = ({ board }: SaveBoardButtonProps) => {
  const { data: session } = useSession();
  // const { trigger } = useSWRMutation(ROUTES.API.boards, postBoardForUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSaveBoard = async (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setIsLoading(true);
      if (session) {
        // await trigger({ ...board, userId: session.user.id });
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
    <Button onClick={(e) => handleSaveBoard(e)}>
      Save Pedal Board
    </Button>
  );
};

export default SaveBoardButton;
