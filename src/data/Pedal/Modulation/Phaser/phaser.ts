import { PedalType } from '@/types/Pedal';

export const phaser: PedalType = {
  // id: 'PedalPhaserId',
  isTemplate: false,
  name: 'Phaser',
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
      // id: 'PotRateId2',
      name: 'Rate',
      min: 0,
      max: 10,
      value: null,
      defaultValue: 3,
    },
  ],
};
