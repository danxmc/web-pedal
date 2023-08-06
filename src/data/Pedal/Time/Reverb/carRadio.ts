import { PedalType } from '@/types/Pedal';

export const carRadio: PedalType = {
  // id: "PedalCarRadioReverbId",
  isTemplate: false,
  name: 'Car Radio Reverb',
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
