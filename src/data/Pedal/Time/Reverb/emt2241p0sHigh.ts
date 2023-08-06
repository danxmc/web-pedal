import { PedalType } from '@/types/Pedal';

export const emt2241p0sHigh: PedalType = {
  // id: "PedalEmt2241p0sHighReverbId",
  isTemplate: false,
  name: 'EMT 224 1,0 s High Reverb',
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
