import { PedalType } from '@/types/Pedal';

export const emt2244p5sHigh: PedalType = {
  // id: "PedalEmt2244p5sHighReverbId",
  isTemplate: false,
  name: 'EMT 224 4,5 s High Reverb',
  isActive: true,
  pots: [
    {
      // id: 'PotLevelId',
      name: 'Level',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 1,
    },
    {
      // id: 'PotWetId',
      name: 'Wet',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 0.5,
    },
  ],
};
