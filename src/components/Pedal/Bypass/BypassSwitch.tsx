'use client';
import { Toggle } from '@/ui/toggle';
import { CirclePower } from 'lucide-react';
import React from 'react';

interface BypassSwitchProps {
  isActive: boolean;
  handleToggle: (pressed: boolean) => void;
}

const BypassSwitch = ({ isActive, handleToggle }: BypassSwitchProps) => {
  return (
    <Toggle
      defaultChecked={isActive}
      pressed={isActive}
      onPressedChange={(pressed) => handleToggle(pressed)}
    >
      <CirclePower color={isActive ? 'red' : 'currentColor'} />
    </Toggle>
  );
};

export default BypassSwitch;
