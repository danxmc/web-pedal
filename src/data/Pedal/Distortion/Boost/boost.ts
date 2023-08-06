import { PedalType } from '@/types/Pedal';

export const boost: PedalType = {
  // id: 'PedalBoostId',
  isTemplate: false,
  name: 'Boost',
  isActive: true,
  pots: [
    {
      // id: 'PotAmplifyId',
      name: 'Amplify',
      min: 1,
      max: 3,
      value: null,
      defaultValue: 1.5,
    },
  ],
};
