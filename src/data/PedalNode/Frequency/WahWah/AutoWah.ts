export interface AutoWahOptions extends AudioNodeOptions {
  frequency: number;
  q: number;
  sense: number;
}

export class AutoWahNode extends GainNode {
  // Parameters
  frequency: AudioParam;
  q: AudioParam;
  sense: AudioParam;

  // AudioNodes used by effect
  private _waveShaperNode: WaveShaperNode;
  private _envFilterNode: BiquadFilterNode;
  private _envGainNode: GainNode;
  private _envRangeNode: GainNode;
  private _filterNode: BiquadFilterNode;
  private _outputNode: GainNode;

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
      return this._outputNode.connect(destination, output, input);
    } else {
      return this._outputNode.connect(destination, output);
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
        return this._outputNode.disconnect(destination, output);
      } else {
        return this._outputNode.disconnect(destination);
      }
    } else if (destination instanceof AudioParam) {
      if (output) {
        return this._outputNode.disconnect(destination, output);
      } else {
        return this._outputNode.disconnect(destination);
      }
    } else {
      return this._outputNode.disconnect();
    }
  }

  constructor(audioContext: BaseAudioContext, options: AutoWahOptions) {
    super(audioContext);

    // Internal Nodes
    this._waveShaperNode = new WaveShaperNode(audioContext, {
      curve: new Float32Array([1, 1, 1, 0, 1, 1, 1]),
    });
    this._envFilterNode = new BiquadFilterNode(audioContext, {
      type: 'lowpass',
      frequency: 10,
      Q: 0.7,
    });
    this._envGainNode = new GainNode(audioContext, {
      gain: options.sense || 2,
    });
    this._envRangeNode = new GainNode(audioContext, { gain: 1200 });
    this._filterNode = new BiquadFilterNode(audioContext, {
      type: 'bandpass',
      frequency: options.frequency || 100,
      Q: options.q || 0.5,
    });
    this._outputNode = new GainNode(audioContext);

    // Export parameters
    this.frequency = this._filterNode.frequency;
    this.q = this._filterNode.Q;
    this.sense = this._envGainNode.gain;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'frequency':
          this.frequency.value = options[key];
          break;
        case 'q':
          this.q.value = options[key];
          break;
        case 'sense':
          this.sense.value = options[key];
          break;
      }
    }

    this._inputConnect = this.connect; // input side, connect of super class
    this.connect = this._outputConnect; // connect() method of output
    this.disconnect = this._outputDisconnect; // disconnect() metyhod of output

    // DSP
    this._inputConnect(this._filterNode).connect(this._outputNode);
    this._inputConnect(this._waveShaperNode)
      .connect(this._envFilterNode)
      .connect(this._envGainNode)
      .connect(this._envRangeNode)
      .connect(this._filterNode.detune);
  }

  public setFrequency(targetValue: number | string) {
    this.frequency.value = parseFloat(<string>targetValue);

    this._filterNode.frequency.value = this.frequency.value;
  }

  public setQ(targetValue: number | string) {
    this.q.value = parseFloat(<string>targetValue);

    this._filterNode.Q.value = this.q.value;
  }

  public setSense(targetValue: number | string) {
    this.sense.value = parseFloat(<string>targetValue);

    this._envGainNode.gain.value = this.sense.value;
  }
}
