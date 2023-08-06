import { PedalType } from '@/types/Pedal';

export const telephoneT65: PedalType = {
  // id: "PedalTelephoneT65ReverbId",
  isTemplate: false,
  name: 'Telephone T 65 Reverb',
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
