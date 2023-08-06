import { BoardType } from '@/types/Pedal';
import {
  TimePedal,
  DistortionPedal,
  ModulationPedal,
  DynamicPedal,
  FrequencyPedal,
} from '../Pedal';

export { delay as delayBoard } from './delayBoard';
export { distortion as distortionBoard } from './distortionBoard';

export const defaultBoard: BoardType = {
  // id: 'BoardTestingBoardId',
  name: 'Testing Board',
  pedals: [
    // DynamicPedal.volume.volume,
    // DynamicPedal.compressor.compressor,
    // ModulationPedal.tremolo.sine,
    // ModulationPedal.tremolo.triangle,
    // ModulationPedal.tremolo.square,
    // ModulationPedal.tremolo.sawtooth,
    // ModulationPedal.tremolo.harmonic,
    // ModulationPedal.phaser.phaser,
    // ModulationPedal.phaser.deepPhaser,
    // ModulationPedal.flanger.flanger,
    // ModulationPedal.chorus.chorus,
    // TimePedal.delay.pingpong,
    // TimePedal.delay.slapback,
    // TimePedal.reverb.hall,
    // TimePedal.reverb.factoryHall,
    // TimePedal.reverb.churchHall,
    // TimePedal.reverb.carRadio,
    // TimePedal.reverb.walkman,
    // TimePedal.reverb.telephoneT65,
    // TimePedal.reverb.telephone90s,
    // TimePedal.reverb.emt2240p8sLinear,
    // TimePedal.reverb.emt2241p0sHigh,
    // TimePedal.reverb.emt2242p2sLinear,
    // TimePedal.reverb.emt2244p5sHigh,
    // DistortionPedal.boost.boost,
    // DistortionPedal.overdrive.overdrive,
    // DistortionPedal.distortion.distort,
    // DistortionPedal.fuzz.fuzz,
    // FrequencyPedal.wahwah.autoWah,
  ],
};
