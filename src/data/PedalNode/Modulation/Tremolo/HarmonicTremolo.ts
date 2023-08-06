export interface HarmonicTremoloOptions extends AudioNodeOptions {
  speed: number;
  depth: number;
}

export class HarmonicTremoloNode extends GainNode {
  // Parameters
  speed: AudioParam;
  depth: AudioParam;

  // AudioNodes used by effect
  private _passthroughNode: GainNode;
  private _sumGainNode: GainNode;
  private _outputNode: GainNode;
  private _highPassFilterNode: BiquadFilterNode;
  private _highPassOutGainNode: GainNode;
  private _highPassOscillatorNode: OscillatorNode;
  private _lowPassFilterNode: BiquadFilterNode;
  private _lowPassOutGainNode: GainNode;
  private _lowPassPhaseGainNode: GainNode;
  private _lowPassOscillatorNode: OscillatorNode;

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

  constructor(audioContext: BaseAudioContext, options: HarmonicTremoloOptions) {
    super(audioContext);

    // Internal Nodes
    this._passthroughNode = new GainNode(audioContext, {
      gain: 1 - (options.depth || 0.5),
    });
    this._sumGainNode = new GainNode(audioContext, {
      gain: options.depth || 0.5,
    });
    this._outputNode = new GainNode(audioContext);
    this._highPassFilterNode = new BiquadFilterNode(audioContext, {
      type: 'highpass',
      frequency: 4000,
    });
    this._highPassOutGainNode = new GainNode(audioContext);
    this._highPassOscillatorNode = new OscillatorNode(audioContext, {
      frequency: options.speed || 3.2,
    });
    this._lowPassFilterNode = new BiquadFilterNode(audioContext, {
      type: 'lowpass',
      frequency: 800,
    });
    this._lowPassOutGainNode = new GainNode(audioContext);
    this._lowPassPhaseGainNode = new GainNode(audioContext, {
      gain: -1,
    });
    this._lowPassOscillatorNode = new OscillatorNode(audioContext, {
      detune: -180,
      frequency: options.speed || 3.2,
    });

    // Export parameters
    this.speed = this._highPassOscillatorNode.frequency;
    this.depth = this._sumGainNode.gain;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'speed':
          this.speed.value = options[key];
          break;
        case 'depth':
          this.depth.value = options[key];
      }
    }

    this._inputConnect = this.connect; // input side, connect of super class
    this.connect = this._outputConnect; // connect() method of output
    this.disconnect = this._outputDisconnect; // disconnect() metyhod of output

    // DSP
    this._lowPassOscillatorNode.connect(this._lowPassOutGainNode.gain);
    this._lowPassOscillatorNode.start(0);
    this._highPassOscillatorNode.connect(this._highPassOutGainNode.gain);
    this._highPassOscillatorNode.start(0);

    this._inputConnect(this._passthroughNode).connect(this._outputNode);

    this._inputConnect(this._highPassFilterNode)
      .connect(this._highPassOutGainNode)
      .connect(this._sumGainNode);

    this._inputConnect(this._lowPassFilterNode)
      .connect(this._lowPassPhaseGainNode)
      .connect(this._lowPassOutGainNode)
      .connect(this._sumGainNode);

    this._sumGainNode.connect(this._outputNode);
  }

  public setSpeed(targetValue: number | string) {
    this.speed.value = parseFloat(<string>targetValue);

    this._lowPassOscillatorNode.frequency.value = this.speed.value;
    this._highPassOscillatorNode.frequency.value = this.speed.value;
  }

  public setDepth(targetValue: number | string) {
    this.depth.value = parseFloat(<string>targetValue);

    this._sumGainNode.gain.value = this.depth.value;
    this._passthroughNode.gain.value = 1 - this.depth.value;
  }
}
