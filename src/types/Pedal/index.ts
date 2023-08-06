import { string, z } from 'zod';

export type BoardType = z.infer<typeof boardSchema>;
export type PedalType = z.infer<typeof pedalSchema>;
export type PotType = z.infer<typeof potSchema>;
export type PotUIType = PotType & { node?: PotAudioNode };

const potSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  max: z.number(),
  min: z.number(),
  defaultValue: z.number(),
  value: z.union([z.number(), z.null()]),
  pedalId: z.string().optional(),
});

const pedalSchema = z.object({
  id: string().optional(),
  name: z.string(),
  isTemplate: z.boolean(),
  isActive: z.boolean(),
  boardId: z.union([z.string(), z.null()]).optional(),
  pots: potSchema.array().optional(),
});

const boardSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  userId: z.string().optional(),
  pedals: pedalSchema.array().optional(),
});

export type PotAudioNode =
  | AnalyserNode
  | BiquadFilterNode
  | AudioBufferSourceNode
  | ChannelMergerNode
  | ChannelSplitterNode
  | ConstantSourceNode
  | ConvolverNode
  | DelayNode
  | DynamicsCompressorNode
  | GainNode
  | IIRFilterNode
  | OscillatorNode
  | PannerNode
  | StereoPannerNode
  | WaveShaperNode;
