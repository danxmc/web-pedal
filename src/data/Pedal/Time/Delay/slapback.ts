import { PedalType } from '@/types/Pedal';

export const slapback: PedalType = {
  // id: "PedalSlapbackDelayId",
  isTemplate: false,
  name: 'Slapback Delay',
  isActive: true,
  pots: [
    {
      // id: 'PotDelayTimeId',
      name: 'Delay Time',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 0.5,
    },
    {
      // id: 'PotFeedbackId',
      name: 'Feedback',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 0.5,
    },
    {
      // id: 'PotMixId',
      name: 'Mix',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 0.5,
    },
  ],
};
