import { PedalType } from '@/types/Pedal';

export const telephone90s: PedalType = {
  // id: "PedalTelephone90sReverbId",
  isTemplate: false,
  name: 'Telephone 90 s Reverb',
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
