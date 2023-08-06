import { PedalType } from '@/types/Pedal';

export const emt2240p8sLinear: PedalType = {
  // id: "PedalEmt2240p8sLinearReverbId",
  isTemplate: false,
  name: 'EMT 224 0,8 s Linear Reverb',
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
