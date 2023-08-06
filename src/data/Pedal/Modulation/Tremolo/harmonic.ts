import { PedalType } from '@/types/Pedal';

export const harmonic: PedalType = {
  // id: 'PedalSineTremoloId',
  isTemplate: false,
  name: 'Harmonic Tremolo',
  isActive: true,
  pots: [
    {
      // id: 'PotSpeedId',
      name: 'Speed',
      min: 0,
      max: 8,
      value: null,
      defaultValue: 3.2,
    },
    {
      // id: 'PotDepthId2',
      name: 'Depth',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 1,
    },
  ],
};
