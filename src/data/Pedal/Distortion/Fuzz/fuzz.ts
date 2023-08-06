import { PedalType } from '@/types/Pedal';

export const fuzz: PedalType = {
  // id: 'PedalFuzzId',
  isTemplate: false,
  name: 'Fuzz',
  isActive: true,
  pots: [
    {
      // id: 'PotFuzzId',
      name: 'Fuzz',
      min: 0,
      max: 2,
      value: null,
      defaultValue: 0.5,
    },
    {
      // id: 'PotLevelId',
      name: 'Level',
      min: 0,
      max: 2,
      value: null,
      defaultValue: 1,
    },
  ],
};
