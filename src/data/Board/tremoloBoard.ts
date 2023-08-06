import { BoardType } from '@/types/Pedal';
import { ModulationPedal } from '../Pedal';

export const delay: BoardType = {
  name: 'Tremolo Board',
  pedals: [
    ModulationPedal.tremolo.sine,
    ModulationPedal.tremolo.triangle,
    ModulationPedal.tremolo.square,
    ModulationPedal.tremolo.sawtooth,
  ],
};
