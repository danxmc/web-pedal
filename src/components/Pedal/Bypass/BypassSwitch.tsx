'use client';
import Paragraph from '@/components/ui/Paragraph';
import React from 'react';

interface BypassSwitchProps {
  isActive: boolean;
  handleToggle: (e: React.MouseEvent<HTMLInputElement, MouseEvent>, isActive: boolean) => void;
}

const BypassSwitch = ({ isActive, handleToggle }: BypassSwitchProps) => {
  return (
    <label className='swap'>
      <input
        type='checkbox'
        defaultChecked={isActive ? true : false}
        onClick={(e) => handleToggle(e, !isActive)}
      />
      <Paragraph className='swap-off'>OFF</Paragraph>
      <Paragraph className='swap-on'>ON</Paragraph>
    </label>
  );
};

export default BypassSwitch;
