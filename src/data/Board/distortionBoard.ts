import { BoardType } from '@/types/Pedal';
import { DistortionPedal } from '../Pedal';

export const distortion: BoardType = {
  name: 'Distortion Board',
  pedals: [DistortionPedal.distortion.distort],
};
