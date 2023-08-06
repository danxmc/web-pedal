import { PedalType } from '@/types/Pedal';

export const volume: PedalType = {
  // id: 'PedalVolumeId',
  isTemplate: false,
  name: 'Volume',
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
  ],
};
