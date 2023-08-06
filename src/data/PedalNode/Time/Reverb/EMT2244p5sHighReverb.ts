import { IMPULSE_RESPONSE } from '@/constants';
import { getReverbBuffer } from '@/lib/utils/effectCalcUtils';

export interface EMT2244p5sHighReverbOptions extends AudioNodeOptions {
  wet: number;
  level: number;
}

export class EMT2244p5sHighReverbNode extends GainNode {
  // Parameters
  wet: AudioParam;
  level: AudioParam;

  // AudioNodes used by effect
  private _convolverNode: ConvolverNode;
  private _wetGainNode: GainNode;
  private _levelGainNode: GainNode;
  private _outputGainNode: GainNode;

  private _inputConnect: {
    (destinationNode: AudioNode, output?: number, input?: number): AudioNode;
    (destinationParam: AudioParam, output?: number): void;
  };

  private _outputConnect(
    destinationNode: AudioNode,
    output?: number,
    input?: number
  ): AudioNode;
  private _outputConnect(destinationParam: AudioParam, output?: number): void;
  private _outputConnect(
    destination: AudioNode | AudioParam,
    output?: number,
    input?: number
  ): AudioNode | void {
    if (destination instanceof AudioNode) {
      return this._outputGainNode.connect(destination, output, input);
    } else {
      return this._outputGainNode.connect(destination, output);
    }
  }

  private _outputDisconnect(): void;
  private _outputDisconnect(destinationNode: AudioNode, output?: number): void;
  private _outputDisconnect(
    destinationParam: AudioParam,
    output?: number
  ): void;
  private _outputDisconnect(
    destination?: AudioNode | AudioParam,
    output?: number
  ): void {
    if (destination instanceof AudioNode) {
      if (output) {
        return this._outputGainNode.disconnect(destination, output);
      } else {
        return this._outputGainNode.disconnect(destination);
      }
    } else if (destination instanceof AudioParam) {
      if (output) {
        return this._outputGainNode.disconnect(destination, output);
      } else {
        return this._outputGainNode.disconnect(destination);
      }
    } else {
      return this._outputGainNode.disconnect();
    }
  }

  constructor(
    audioContext: BaseAudioContext,
    options: EMT2244p5sHighReverbOptions
  ) {
    super(audioContext, {
      gain: 1,
    });

    // Internal Nodes
    this._convolverNode = new ConvolverNode(audioContext);
    this._wetGainNode = new GainNode(audioContext, {
      gain: options.wet || 0.5,
    });
    this._levelGainNode = new GainNode(audioContext, {
      gain: options.level || 1,
    });
    this._outputGainNode = new GainNode(audioContext, {
      gain: 1,
    });

    getReverbBuffer(
      IMPULSE_RESPONSE.REVERB_FILES.emt2244p5sHigh,
      audioContext
    ).then((decodedData) => (this._convolverNode.buffer = decodedData));

    // Export parameters
    this.wet = this._wetGainNode.gain;
    this.level = this._levelGainNode.gain;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'wet':
          this.wet.value = options[key];
          break;
        case 'level':
          this.level.value = options[key];
          break;
      }
    }

    this._inputConnect = this.connect; // input side, connect of super class
    this.connect = this._outputConnect; // connect() method of output
    this.disconnect = this._outputDisconnect; // disconnect() metyhod of output

    // DSP
    this._inputConnect(this._convolverNode)
      .connect(this._levelGainNode)
      .connect(this._outputGainNode);
    this._inputConnect(this._wetGainNode).connect(this._outputGainNode);
  }

  public setWet(targetValue: number | string) {
    this.wet.value = parseFloat(<string>targetValue);

    this._wetGainNode.gain.value = this.wet.value;
  }

  public setLevel(targetValue: number | string) {
    this.level.value = parseFloat(<string>targetValue);

    this._levelGainNode.gain.value = this.level.value;
  }
}
