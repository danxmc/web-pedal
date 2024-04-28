'use client';
import { getStepInRange } from '@/lib/utils/stepUtils';
import { Label } from '@/ui/label';
import { Slider } from '@/ui/slider';
import camelCase from 'lodash/camelCase';
import React, { useMemo } from 'react';

interface PotProps {
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
  position,
  name,
  min,
  max,
  value,
  handlePotChange,
}: PotProps) => {
  const step = useMemo(() => getStepInRange(min, max), [min, max]);

  return (
    <div>
      <Slider
        id={`${name}-${position}`}
        name={camelCase(name)}
        min={min}
        max={max}
        value={[value]}
        step={step}
        onValueChange={(value) =>
          handlePotChange(value, camelCase(name), position)
        }
      />
      <Label htmlFor={`${name}-${position}`}>{name}</Label>
    </div>
  );
};

export default React.memo(Pot);
