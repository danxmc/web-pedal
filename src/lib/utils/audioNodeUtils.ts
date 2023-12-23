import {
  BoostNode,
  BoostOptions,
} from '@/data/PedalNode/Distortion/Boost/Boost';
import {
  DistortionNode,
  DistortionOptions,
} from '@/data/PedalNode/Distortion/Distortion/Distortion';
import { FuzzNode, FuzzOptions } from '@/data/PedalNode/Distortion/Fuzz/Fuzz';
import {
  OverdriveNode,
  OverdriveOptions,
} from '@/data/PedalNode/Distortion/Overdrive/Overdrive';
import {
  CompressorNode,
  CompressorOptions,
} from '@/data/PedalNode/Dynamic/Compressor/Compressor';
import {
  VolumeNode,
  VolumeOptions,
} from '@/data/PedalNode/Dynamic/Volume/Volume';
import {
  AutoWahNode,
  AutoWahOptions,
} from '@/data/PedalNode/Frequency/WahWah/AutoWah';
import {
  ChorusNode,
  ChorusOptions,
} from '@/data/PedalNode/Modulation/Chorus/Chorus';
import {
  FlangerNode,
  FlangerOptions,
} from '@/data/PedalNode/Modulation/Flanger/Flanger';
import {
  DeepPhaserNode,
  DeepPhaserOptions,
} from '@/data/PedalNode/Modulation/Phaser/DeepPhaser';
import {
  PhaserNode,
  PhaserOptions,
} from '@/data/PedalNode/Modulation/Phaser/Phaser';
import {
  HarmonicTremoloNode,
  HarmonicTremoloOptions,
} from '@/data/PedalNode/Modulation/Tremolo/HarmonicTremolo';
import {
  SawtoothTremolo,
  SawtoothTremoloOptions,
} from '@/data/PedalNode/Modulation/Tremolo/SawtoothTremolo';
import {
  SineTremolo,
  SineTremoloOptions,
} from '@/data/PedalNode/Modulation/Tremolo/SineTremolo';
import {
  SquareTremolo,
  SquareTremoloOptions,
} from '@/data/PedalNode/Modulation/Tremolo/SquareTremolo';
import {
  TriangleTremolo,
  TriangleTremoloOptions,
} from '@/data/PedalNode/Modulation/Tremolo/TriangleTremolo';
import {
  PingPongDelayNode,
  PingPongDelayOptions,
} from '@/data/PedalNode/Time/Delay/PingPongDelay';
import {
  SlapbackDelayNode,
  SlapbackDelayOptions,
} from '@/data/PedalNode/Time/Delay/SlapbackDelay';
import {
  CarRadioReverbNode,
  CarRadioReverbOptions,
} from '@/data/PedalNode/Time/Reverb/CarRadioReverb';
import {
  ChurchHallReverbNode,
  ChurchHallReverbOptions,
} from '@/data/PedalNode/Time/Reverb/ChurchHallReverb';
import {
  EMT2240p8sLinearReverbNode,
  EMT2240p8sLinearReverbOptions,
} from '@/data/PedalNode/Time/Reverb/EMT2240p8sLinearReverb';
import {
  EMT2241p0sHighReverbNode,
  EMT2241p0sHighReverbOptions,
} from '@/data/PedalNode/Time/Reverb/EMT2241p0sHighReverb';
import {
  EMT2242p2sLinearReverbNode,
  EMT2242p2sLinearReverbOptions,
} from '@/data/PedalNode/Time/Reverb/EMT2242p2sLinearReverb';
import {
  EMT2244p5sHighReverbNode,
  EMT2244p5sHighReverbOptions,
} from '@/data/PedalNode/Time/Reverb/EMT2244p5sHighReverb';
import {
  FactoryHallReverbNode,
  FactoryHallReverbOptions,
} from '@/data/PedalNode/Time/Reverb/FactoryHallReverb';
import {
  HallReverbNode,
  HallReverbOptions,
} from '@/data/PedalNode/Time/Reverb/HallReverb';
import {
  Telephone90sReverbNode,
  Telephone90sReverbOptions,
} from '@/data/PedalNode/Time/Reverb/Telephone90sReverb';
import {
  TelephoneT65ReverbNode,
  TelephoneT65ReverbOptions,
} from '@/data/PedalNode/Time/Reverb/TelephoneT65Reverb';
import {
  WalkmanReverbNode,
  WalkmanReverbOptions,
} from '@/data/PedalNode/Time/Reverb/WalkmanReverb';
import { PedalType, PotAudioNode, PotType, PotUIType } from '@/types/Pedal';
import camelCase from 'lodash/camelCase';
import lowerCase from 'lodash/lowerCase';

export function setValueToAudioNode(
  node: PotAudioNode,
  targetName: string,
  targetValue: number
) {
  if (node instanceof BoostNode) {
    switch (targetName) {
      case 'drive':
        node.setAmplify(targetValue);
        break;
      default:
        break;
    }
  } else if (node instanceof OverdriveNode) {
    switch (targetName) {
      case 'drive':
        node.setDrive(targetValue);
        break;
      case 'level':
        node.setLevel(targetValue);
        break;
      default:
        break;
    }
  } else if (node instanceof FuzzNode) {
    switch (targetName) {
      case 'fuzz':
        node.setFuzz(targetValue);
        break;
      case 'level':
        node.setLevel(targetValue);
      default:
        break;
    }
  } else if (
    node instanceof PingPongDelayNode ||
    node instanceof SlapbackDelayNode
  ) {
    switch (targetName) {
      case 'delayTime':
        node.setDelayTime(targetValue);
        break;
      case 'feedback':
        node.setFeedback(targetValue);
        break;
      case 'mix':
        node.setMix(targetValue);
      default:
        break;
    }
  } else if (
    node instanceof HallReverbNode ||
    node instanceof FactoryHallReverbNode ||
    node instanceof ChurchHallReverbNode ||
    node instanceof CarRadioReverbNode ||
    node instanceof WalkmanReverbNode ||
    node instanceof TelephoneT65ReverbNode ||
    node instanceof Telephone90sReverbNode ||
    node instanceof EMT2240p8sLinearReverbNode ||
    node instanceof EMT2241p0sHighReverbNode ||
    node instanceof EMT2242p2sLinearReverbNode ||
    node instanceof EMT2244p5sHighReverbNode
  ) {
    switch (targetName) {
      case 'wet':
        node.setWet(targetValue);
        break;
      case 'level':
        node.setLevel(targetValue);
        break;
      default:
        break;
    }
  } else if (node instanceof DistortionNode) {
    switch (targetName) {
      case 'intensity':
        node.setIntensity(targetValue);
        break;
      case 'gain':
        node.setGain(targetValue);
        break;
      case 'lowpassFilter':
        node.setLowpassFilter(targetValue);
        break;
      default:
        break;
    }
  } else if (node instanceof PhaserNode) {
    switch (targetName) {
      case 'depth':
        node.setDepth(targetValue);
        break;
      case 'rate':
        node.setRate(targetValue);
        break;
      default:
        break;
    }
  } else if (node instanceof DeepPhaserNode) {
    switch (targetName) {
      case 'depth':
        node.setDepth(targetValue);
        break;
      case 'rate':
        node.setRate(targetValue);
        break;
      case 'resonance':
        node.setResonance(targetValue);
        break;
      default:
        break;
    }
  } else if (node instanceof FlangerNode) {
    switch (targetName) {
      case 'delay':
        node.setDelay(targetValue);
        break;
      case 'depth':
        node.setDepth(targetValue);
        break;
      case 'feedback':
        node.setFeedback(targetValue);
        break;
      case 'speed':
        node.setSpeed(targetValue);
        break;
      default:
        break;
    }
  } else if (
    node instanceof SineTremolo ||
    node instanceof TriangleTremolo ||
    node instanceof SquareTremolo ||
    node instanceof SawtoothTremolo
  ) {
    switch (targetName) {
      case 'speed':
        node.setSpeed(targetValue);
        break;
      case 'volume':
        node.setVolume(targetValue);
        break;
      default:
        break;
    }
  } else if (node instanceof HarmonicTremoloNode) {
    switch (targetName) {
      case 'speed':
        node.setSpeed(targetValue);
        break;
      case 'depth':
        node.setDepth(targetValue);
        break;
      default:
        break;
    }
  } else if (node instanceof VolumeNode) {
    switch (targetName) {
      case 'level':
        node.setLevel(targetValue);
        break;
      default:
        break;
    }
  } else if (node instanceof CompressorNode) {
    switch (targetName) {
      case 'mix':
        node.setMix(targetValue);
        break;
      case 'treshold':
        node.setTreshold(targetValue);
        break;
      case 'attack':
        node.setAttack(targetValue);
        break;
      case 'release':
        node.setRelease(targetValue);
        break;
      default:
        break;
    }
  } else if (node instanceof AutoWahNode) {
    switch (targetName) {
      case 'frequency':
        node.setFrequency(targetValue);
        break;
      case 'q':
        node.setQ(targetValue);
        break;
      case 'sense':
        node.setSense(targetValue);
        break;
      default:
        break;
    }
  }
}

function getPedalNodeOptionsFromPot(pots: Array<PotType>) {
  let pedalOptions: SlapbackDelayOptions &
    PingPongDelayOptions &
    HallReverbOptions &
    FactoryHallReverbOptions &
    ChurchHallReverbOptions &
    CarRadioReverbOptions &
    WalkmanReverbOptions &
    TelephoneT65ReverbOptions &
    Telephone90sReverbOptions &
    EMT2240p8sLinearReverbOptions &
    EMT2241p0sHighReverbOptions &
    EMT2242p2sLinearReverbOptions &
    EMT2244p5sHighReverbOptions &
    BoostOptions &
    DistortionOptions &
    OverdriveOptions &
    FuzzOptions &
    ChorusOptions &
    PhaserOptions &
    DeepPhaserOptions &
    FlangerOptions &
    SineTremoloOptions &
    TriangleTremoloOptions &
    SquareTremoloOptions &
    SawtoothTremoloOptions &
    HarmonicTremoloOptions &
    CompressorOptions &
    VolumeOptions &
    AutoWahOptions = {
    delayTime: 0,
    feedback: 0,
    mix: 0,
    intensity: 0,
    gain: 0,
    lowpassFilter: 0,
    speed: 0,
    volume: 0,
    level: 0,
    wet: 0,
    drive: 0,
    depth: 0,
    rate: 0,
    resonance: 0,
    delay: 0,
    fuzz: 0,
    amplify: 0,
    treshold: 0,
    attack: 0,
    release: 0,
    frequency: 0,
    q: 0,
    sense: 0,
  };
  if (pots.length) {
    pedalOptions = pots.reduce(
      (options, pot) =>
        Object.assign(options, {
          [`${camelCase(pot.name)}`]: pot.value ?? pot.defaultValue,
        }),
      pedalOptions
    );
  }
  return pedalOptions;
}

export function getAudioNodeFromPedal(
  pedal: PedalType,
  audioContext: AudioContext
): AudioNode {
  let pedalNode;
  const pedalOptions = getPedalNodeOptionsFromPot(pedal.pots || []);

  switch (lowerCase(pedal.name)) {
    case 'overdrive':
      pedalNode = new OverdriveNode(audioContext, {
        drive: pedalOptions.drive,
        level: pedalOptions.level,
      });
      break;
    case 'fuzz':
      pedalNode = new FuzzNode(audioContext, {
        fuzz: pedalOptions.fuzz,
        level: pedalOptions.level,
      });
      break;
    case 'boost':
      pedalNode = new BoostNode(audioContext, {
        amplify: pedalOptions.amplify,
      });
      break;
    case 'slapback delay':
      pedalNode = new SlapbackDelayNode(audioContext, {
        mix: pedalOptions.mix,
        delayTime: pedalOptions.delayTime,
        feedback: pedalOptions.feedback,
      });
      break;
    case 'ping pong delay':
      pedalNode = new PingPongDelayNode(audioContext, {
        mix: pedalOptions.mix,
        delayTime: pedalOptions.delayTime,
        feedback: pedalOptions.feedback,
      });
      break;
    case 'hall reverb':
      pedalNode = new HallReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'factory hall reverb':
      pedalNode = new FactoryHallReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'church hall reverb':
      pedalNode = new ChurchHallReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'car radio reverb':
      pedalNode = new CarRadioReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'walkman reverb':
      pedalNode = new WalkmanReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'telephone t 65 reverb':
      pedalNode = new TelephoneT65ReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'telephone 90 s reverb':
      pedalNode = new Telephone90sReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'emt 224 0 8 s linear reverb':
      pedalNode = new EMT2240p8sLinearReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'emt 224 1 0 s high reverb':
      pedalNode = new EMT2241p0sHighReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'emt 224 2 2 s linear reverb':
      pedalNode = new EMT2242p2sLinearReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'emt 224 4 5 s high reverb':
      pedalNode = new EMT2244p5sHighReverbNode(audioContext, {
        level: pedalOptions.level,
        wet: pedalOptions.wet,
      });
      break;
    case 'distort':
      pedalNode = new DistortionNode(audioContext, {
        intensity: pedalOptions.intensity,
        gain: pedalOptions.gain,
        lowpassFilter: pedalOptions.lowpassFilter,
      });
      break;
    case 'chorus':
      pedalNode = new ChorusNode(audioContext, {
        depth: pedalOptions.depth,
        rate: pedalOptions.rate,
      });
      break;
    case 'phaser':
      pedalNode = new PhaserNode(audioContext, {
        depth: pedalOptions.depth,
        rate: pedalOptions.rate,
      });
      break;
    case 'deep phaser':
      pedalNode = new DeepPhaserNode(audioContext, {
        depth: pedalOptions.depth,
        rate: pedalOptions.rate,
        resonance: pedalOptions.resonance,
      });
      break;
    case 'flanger':
      pedalNode = new FlangerNode(audioContext, {
        delay: pedalOptions.delay,
        depth: pedalOptions.depth,
        feedback: pedalOptions.feedback,
        speed: pedalOptions.speed,
      });
      break;
    case 'sine tremolo':
      pedalNode = new SineTremolo(audioContext, {
        speed: pedalOptions.speed,
        volume: pedalOptions.volume,
      });
      break;
    case 'triangle tremolo':
      pedalNode = new TriangleTremolo(audioContext, {
        speed: pedalOptions.speed,
        volume: pedalOptions.volume,
      });
      break;
    case 'square tremolo':
      pedalNode = new SquareTremolo(audioContext, {
        speed: pedalOptions.speed,
        volume: pedalOptions.volume,
      });
      break;
    case 'sawtooth tremolo':
      pedalNode = new SawtoothTremolo(audioContext, {
        speed: pedalOptions.speed,
        volume: pedalOptions.volume,
      });
      break;
    case 'harmonic tremolo':
      pedalNode = new HarmonicTremoloNode(audioContext, {
        speed: pedalOptions.speed,
        depth: pedalOptions.depth,
      });
      break;
    case 'volume':
      pedalNode = new VolumeNode(audioContext, {
        level: pedalOptions.level,
      });
      break;
    case 'compressor':
      pedalNode = new CompressorNode(audioContext, {
        mix: pedalOptions.mix,
        treshold: pedalOptions.treshold,
        attack: pedalOptions.attack,
        release: pedalOptions.release,
      });
      break;
    case 'auto wah':
      pedalNode = new AutoWahNode(audioContext, {
        frequency: pedalOptions.frequency,
        q: pedalOptions.q,
        sense: pedalOptions.sense,
      });
      break;
    default:
      pedalNode = audioContext.createGain();
      break;
  }
  if (!pedalNode) {
    pedalNode = audioContext.createGain();
  }
  return pedalNode;
}

export function connectAudioNode(
  inputNode: AudioNode,
  node: AudioNode,
  outputNode?: AudioNode
) {
  inputNode.connect(node);
  if (outputNode) {
    node.connect(outputNode);
  }
}

export function disconnectAudioNode(node: AudioNode, outputNode: AudioNode) {
  node.disconnect(outputNode);
}

export function setupAudioNodeInChain(
  node: AudioNode,
  i: number,
  size: number,
  prevN: AudioNode | undefined,
  inputNode: AudioNode,
  audioContext: AudioContext
) {
  // If last node
  if (i === size - 1) {
    if (prevN) {
      connectAudioNode(prevN, node, audioContext.destination);
    } else {
      // If only node
      connectAudioNode(inputNode, node, audioContext.destination);
    }
  } else if (i === 0) {
    // If first node
    connectAudioNode(inputNode, node);
  } else {
    // If middle node
    if (prevN) {
      connectAudioNode(prevN, node);
    }
  }
}

export function buildNewChainReplacingNodeAtIndex(
  audioNode: AudioNode,
  index: number,
  audioChain: Array<AudioNode>
): Array<AudioNode> {
  return [
    ...audioChain.slice(0, index),
    audioNode,
    ...audioChain.slice(index + 1),
  ];
}

export function buildNewChainInsertingNodeAtIndex(
  audioNode: AudioNode,
  index: number,
  audioChain: Array<AudioNode>
): Array<AudioNode> {
  return [...audioChain.slice(0, index), audioNode, ...audioChain.slice(index)];
}

export function buildNewChainRemovingNodeAtIndex(
  index: number,
  audioChain: Array<AudioNode>
): Array<AudioNode> {
  return audioChain.filter((_audioNode, idx) => idx !== index);
}

export function buildNewChainAddingNodeAtLast(
  audioNode: AudioNode,
  audioChain: Array<AudioNode>
): Array<AudioNode> {
  return [...audioChain, audioNode];
}

export function connectAudioNodesChain(
  audioNodesChain: Array<AudioNode>,
  audioContext: AudioContext,
  inputNode: AudioNode
): void {
  const chainLength = audioNodesChain.length;

  for (let i = 0; i < chainLength; i++) {
    const audioNode = audioNodesChain[i];

    // If last node
    if (i === chainLength - 1) {
      // If only node
      if (chainLength === 1) {
        connectAudioNode(inputNode, audioNode, audioContext.destination);
      } else {
        connectAudioNode(
          audioNodesChain[i - 1],
          audioNode,
          audioContext.destination
        );
      }
    } else if (i === 0) {
      // If first node
      connectAudioNode(inputNode, audioNode);
    } else {
      // Node is in the middle of the chain
      connectAudioNode(
        audioNodesChain[i - 1],
        audioNode,
        audioNodesChain[i + 1]
      );
    }
  }
}

export function disconnectAudioNodesChain(
  audioNodesChain: Array<AudioNode>,
  audioContext: AudioContext,
  inputNode: AudioNode
): void {
  const chainLength = audioNodesChain.length;

  for (let i = 0; i < chainLength; i++) {
    const audioNode = audioNodesChain[i];
    // If last node
    if (i === chainLength - 1) {
      // If only node
      if (chainLength === 1) {
        disconnectAudioNode(inputNode, audioNode);
      }
      disconnectAudioNode(audioNode, audioContext.destination);
    } else if (i === 0) {
      // If first node
      disconnectAudioNode(inputNode, audioNode);
    } else {
      // Node is in the middle of the chain
      disconnectAudioNode(audioNodesChain[i - 1], audioNode);
    }
  }
}
