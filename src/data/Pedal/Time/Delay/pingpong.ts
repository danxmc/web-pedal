import { PedalType } from '@/types/Pedal';

export const pingpong: PedalType = {
  // id: "PedalPingPongDelayId",
  isTemplate: false,
  name: 'Ping Pong Delay',
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
