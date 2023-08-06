// const createdPedal = await db.pedal.create({
//       data: {
//         name: 'Volume',
//         isActive: true,
//         isTemplate: true,
//         pots: {
//           createMany: {
//             data: [{ name: 'Volume', min: 0, max: 1.5, defaulValue: 1 }],
//           },
//         },
//       },
//       include: {
//         pots: true,
//       },
//     });

import { BoardType } from "../../../types/Pedal";

// const createdPedal = await db.pedal.create({
//   data: {
//     name: 'Distort',
//     isActive: true,
//     isTemplate: true,
//     pots: {
//       createMany: {
//         data: [
//           { name: 'Volume', min: 0, max: 1, defaultValue: 0.5 },
//           { name: 'Filter', min: 1000, max: 2000, defaultValue: 2000 },
//           { name: 'Distort', min: 100, max: 500, defaultValue: 250 },
//         ],
//       },
//     },
//   },
//   include: {
//     pots: true,
//   },
// });

interface BoxType {
  name: string;
  controls: Array<string>;
}

const FxBoxTypes: Array<BoxType> = [
  {
    name: 'Chorus',
    controls: ['Volume', 'Rate', 'Depth'],
  },
  {
    name: 'Compressor',
    controls: ['Volume', 'Attack', 'Sustain'],
  },
  {
    name: 'Delay',
    controls: ['Mix', 'Time', 'Repeats'],
  },
  {
    name: 'Distortion',
    controls: ['Volume', 'Filter', 'Distort'],
  },
  {
    name: 'Flanger',
    controls: ['Blend', 'Rate', 'Intensity'],
  },
  {
    name: 'Fuzz',
    controls: ['Volume', 'Bias', 'Fuzz'],
  },
  {
    name: 'Hall Reverb',
    controls: ['Verb', 'Dampen', 'Decay'],
  },
  {
    name: 'Harmonic Trem',
    controls: ['Volume', 'Rate', 'Depth'],
  },
  {
    name: 'Octave Reverb',
    controls: ['Verb', 'Octave', 'Reverb'],
  },
  {
    name: 'Overdrive',
    controls: ['Volume', 'Body', 'Drive'],
  },
  {
    name: 'Phaser',
    controls: ['Blend', 'Rate', 'Width'],
  },
  {
    name: 'Reverb',
    controls: ['Verb', 'Eq', 'Decay'],
  },
  {
    name: 'Screamer',
    controls: ['Volume', 'Tone', 'Drive'],
  },
];
