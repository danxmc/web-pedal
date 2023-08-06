import { PedalType } from '@/types/Pedal';

export const sine: PedalType = {
  // id: 'PedalSineTremoloId',
  isTemplate: false,
  name: 'Sine Tremolo',
  isActive: true,
  pots: [
    {
      // id: 'PotSpeedId',
      name: 'Speed',
      min: 0,
      max: 20,
      value: null,
      defaultValue: 10,
    },
    {
      // id: 'PotVoumeId2',
      name: 'Volume',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 1,
    },
  ],
};
