import { PedalType } from '@/types/Pedal';

export const chorus: PedalType = {
  // id: 'PedalChorusId',
  isTemplate: false,
  name: 'Chorus',
  isActive: true,
  pots: [
    {
      // id: 'PotDepthId',
      name: 'Depth',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 0.5,
    },
    {
      // id: 'PotRateId',
      name: 'Rate',
      min: 0,
      max: 10,
      value: null,
      defaultValue: 3,
    },
  ],
};
