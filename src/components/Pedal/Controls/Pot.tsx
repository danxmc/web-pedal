'use client';
import Paragraph from '@/components/ui/Paragraph';
import { Slider } from '@/ui/slider';
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
    val: number[],
    triggeredPotName: string,
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
      <Slider
        id={id}
        name={camelCase(name)}
        min={min}
        max={max}
        value={[value]}
        step={step}
        onValueChange={(value) =>
          handlePotChange(value, camelCase(name), position)
        }
      />
      <Paragraph className='flex-grow-0' size='xs'>
        {name}
      </Paragraph>
    </>
  );
};

export default React.memo(Pot);
