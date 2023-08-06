import { PedalType } from '@/types/Pedal';

export const compressor: PedalType = {
  // id: 'PedalCompressorId',
  isTemplate: false,
  name: 'Compressor',
  isActive: true,
  pots: [
    {
      // id: 'PotMixId',
      name: 'Mix',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 0.85,
    },
    {
      // id: 'PotTresholdId',
      name: 'Treshold',
      min: -100,
      max: 0,
      value: null,
      defaultValue: -30,
    },
    {
      // id: 'PotAttackId',
      name: 'Attack',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 0.1,
    },
    {
      // id: 'PotReleaseId',
      name: 'Release',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 0.5,
    },
  ],
};
