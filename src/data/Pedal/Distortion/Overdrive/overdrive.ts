import { PedalType } from '@/types/Pedal';

export const overdrive: PedalType = {
  // id: 'PedalOverdriveId1',
  name: 'Overdrive',
  isTemplate: false,
  isActive: true,
  pots: [
    {
      // id: 'PotDrive1',
      name: 'Drive',
      max: 1,
      min: 0,
      value: null,
      defaultValue: 0.5,
    },
    {
      // id: 'PotLevel1',
      name: 'Level',
      max: 2,
      min: 0,
      value: null,
      defaultValue: 1,
    },
  ],
};
