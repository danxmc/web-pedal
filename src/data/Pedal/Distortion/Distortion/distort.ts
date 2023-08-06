import { PedalType } from '@/types/Pedal';

export const distort: PedalType = {
  // id: 'PedalDistortId',
  isTemplate: false,
  name: 'Distort',
  isActive: true,
  pots: [
    {
      // id: 'PotDistortId',
      name: 'Intensity',
      min: 1,
      // min: 100,
      max: 100,
      // max:500,
      value: null,
      defaultValue: 100,
    },
    {
      // id: 'PotVolumeId2',
      name: 'Gain',
      min: 1,
      max: 150,
      value: null,
      defaultValue: 50,
    },
    {
      // id: 'PotFilterId',
      name: 'Lowpass Filter',
      min: 1000,
      max: 2000,
      value: null,
      defaultValue: 2000,
    },
  ],
};
