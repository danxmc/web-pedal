import { PedalType } from '@/types/Pedal';

export const flanger: PedalType = {
  // id: 'PedalFlangerId',
  isTemplate: false,
  name: 'Flanger',
  isActive: true,
  pots: [
    {
      // id: 'PotDelayId',
      name: 'Delay',
      min: 0.001,
      max: 0.02,
      value: null,
      defaultValue: 0.005,
    },
    {
      // id: 'PotDepthId',
      name: 'Depth',
      min: 0,
      max: 0.02,
      value: null,
      defaultValue: 0.002,
    },
    {
      // id: 'PotFeedbackId2',
      name: 'Feedback',
      min: 0,
      max: 1,
      value: null,
      defaultValue: 0.5,
    },
    {
      // id: 'PotSpeedId',
      name: 'Speed',
      min: 0.05,
      max: 1,
      value: null,
      defaultValue: 0.25,
    },
  ],
};
