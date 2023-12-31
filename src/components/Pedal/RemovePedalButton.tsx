'use client';
import React from 'react';
import CloseIcon from '../Icons/CloseIcon';
import { Button } from '../ui/Button';

interface RemovePedalProps {
  position: number;
  handleRemovePedalFromChain: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    position: number
  ) => void;
}

const RemovePedalButton = ({
  position,
  handleRemovePedalFromChain,
}: RemovePedalProps) => {
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={(e) => handleRemovePedalFromChain(e, position)}
    >
      <CloseIcon />
    </Button>
  );
};

export default RemovePedalButton;
