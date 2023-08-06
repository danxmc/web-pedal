import { BoardType } from '@/types/Pedal';
import { TimePedal } from '../Pedal';

export const delay: BoardType = {
  name: 'Reverb Board',
  pedals: [
    TimePedal.reverb.hall,
    TimePedal.reverb.factoryHall,
    TimePedal.reverb.churchHall,
    TimePedal.reverb.carRadio,
    TimePedal.reverb.walkman,
    TimePedal.reverb.telephoneT65,
    TimePedal.reverb.telephone90s,
    TimePedal.reverb.emt2240p8sLinear,
    TimePedal.reverb.emt2241p0sHigh,
    TimePedal.reverb.emt2242p2sLinear,
    TimePedal.reverb.emt2244p5sHigh,
  ],
};
