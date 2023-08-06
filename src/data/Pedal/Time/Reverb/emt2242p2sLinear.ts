import { PedalType } from '@/types/Pedal';

export const emt2242p2sLinear: PedalType = {
  // id: "PedalEmt2242p2sLinearReverbId",
  isTemplate: false,
  name: 'EMT 224 2,2 s Linear Reverb',
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
