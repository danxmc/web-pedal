import { BoardType } from '@/types/Pedal';
import { TimePedal } from '../Pedal';

export const delay: BoardType = {
  name: 'Delay Board',
  pedals: [TimePedal.delay.pingpong, TimePedal.delay.slapback],
};
