import { calculateDistortionCurve } from '@/lib/utils/effectCalcUtils';

export interface DistortionOptions extends AudioNodeOptions {
  intensity: number;
  gain: number;
  lowpassFilter: number;
}

export class DistortionNode extends WaveShaperNode {
  // Parameters
  intensity: AudioParam;
  gain: AudioParam;
  lowpassFilter: AudioParam;

  // AudioNodes used by effect
  private _gainNode: GainNode;
  private _gainNode2: GainNode;
  private _outputBiquadFilterNode: BiquadFilterNode;

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
      return this._outputBiquadFilterNode.connect(destination, output, input);
    } else {
      return this._outputBiquadFilterNode.connect(destination, output);
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
        return this._outputBiquadFilterNode.disconnect(destination, output);
      } else {
        return this._outputBiquadFilterNode.disconnect(destination);
      }
    } else if (destination instanceof AudioParam) {
      if (output) {
        return this._outputBiquadFilterNode.disconnect(destination, output);
      } else {
        return this._outputBiquadFilterNode.disconnect(destination);
      }
    } else {
      return this._outputBiquadFilterNode.disconnect();
    }
  }

  constructor(audioContext: BaseAudioContext, options: DistortionOptions) {
    super(audioContext, {
      oversample: '4x',
      curve: calculateDistortionCurve(options.intensity),
    });
    // Internal Nodes
    this._gainNode = new GainNode(audioContext, { gain: options.gain });
    this._gainNode2 = new GainNode(audioContext, {
      gain: isFinite(1 / options.gain) ? 1 / options.gain : 50,
    });
    this._outputBiquadFilterNode = new BiquadFilterNode(audioContext, {
      frequency: options.lowpassFilter,
      type: 'lowpass',
    });

    // Export parameters
    this.intensity = { value: options.intensity } as AudioParam;
    this.gain = this._gainNode.gain;
    this.lowpassFilter = this._outputBiquadFilterNode.frequency;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'intensity':
          this.intensity.value = options[key];
          break;
        case 'gain':
          this.gain.value = options[key];
          break;
        case 'lowpassFilter':
          this.lowpassFilter.value = options[key];
          break;
      }
    }

    this._inputConnect = this.connect; // input side, connect of super class
    this.connect = this._outputConnect; // connect() method of output
    this.disconnect = this._outputDisconnect; // disconnect() metyhod of output

    // DSP
    this._inputConnect(this._gainNode);
    this._gainNode.connect(this._gainNode2);
    this._gainNode2.connect(this._outputBiquadFilterNode);
  }

  public setGain(targetValue: number | string) {
    this.gain.value = parseFloat(<string>targetValue);

    this._gainNode.gain.value = this.gain.value;
    this._gainNode2.gain.value = 1 / this.gain.value;
  }

  public setIntensity(targetValue: number | string) {
    this.intensity.value = parseInt(<string>targetValue);

    this.curve = calculateDistortionCurve(this.intensity.value);
  }

  public setLowpassFilter(targetValue: number | string) {
    this.lowpassFilter.value = parseFloat(<string>targetValue);

    this._outputBiquadFilterNode.frequency.value = this.lowpassFilter.value;
  }
}
