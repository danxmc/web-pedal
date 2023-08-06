import { PedalType } from '@/types/Pedal';

export const autoWah: PedalType = {
  // id: 'PedalAutoWahId',
  isTemplate: false,
  name: 'Auto Wah',
  isActive: true,
  pots: [
    {
      // id: 'PotFrequencyhId',
      name: 'Frequency',
      min: 50,
      max: 2000,
      value: null,
      defaultValue: 300,
    },
    {
      // id: 'PotQId',
      name: 'Q',
      min: 0.5,
      max: 5,
      value: null,
      defaultValue: 1.5,
    },
		{
      // id: 'PotSenseId',
      name: 'Sense',
      min: -6,
      max: 6,
      value: null,
      defaultValue: 4,
    },
  ],
};
