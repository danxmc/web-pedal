'use client';
import Paragraph from '@/components/ui/Paragraph';
import { getStepInRange } from '@/lib/utils/stepUtils';
import camelCase from 'lodash/camelCase';
import React, { useMemo } from 'react';

interface PotProps {
  id: string;
  position: number;
  name: string;
  max: number;
  min: number;
  value: number;
  handlePotChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    triggeredPotIndex: number
  ) => void;
}

const Pot = ({
  id,
  position,
  name,
  min,
  max,
  value,
  handlePotChange,
}: PotProps) => {
  const step = useMemo(() => getStepInRange(min, max), [min, max]);

  return (
    <>
      <input
        id={id}
        name={`${camelCase(name)}`}
        type='range'
        className='range range-xs'
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => handlePotChange(e, position)}
      />
      <Paragraph className='flex-grow-0' size='xs'>
        {name}
      </Paragraph>
    </>
  );
};

export default React.memo(Pot);
