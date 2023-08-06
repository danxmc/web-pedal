import { PedalType } from '@/types/Pedal';

export const churchHall: PedalType = {
  // id: "PedalChurchHallReverbId",
  isTemplate: false,
  name: 'Church Hall Reverb',
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
