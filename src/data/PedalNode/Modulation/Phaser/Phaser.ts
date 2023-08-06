export interface PhaserOptions extends AudioNodeOptions {
  depth: number;
  rate: number;
}

export class PhaserNode extends GainNode {
  // Parameters
  depth: AudioParam;
  rate: AudioParam;

  // AudioNodes used by effect
  private _filter1Node: BiquadFilterNode;
  private _filter2Node: BiquadFilterNode;
  private _depthRangeNode: GainNode;
  private _depthNode: GainNode;
  private _outputNode: GainNode;
  private _lfoNode: OscillatorNode;

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

  constructor(audioContext: BaseAudioContext, options: PhaserOptions) {
    super(audioContext);

    // Internal Nodes
    this._filter1Node = new BiquadFilterNode(audioContext, {
      type: 'allpass',
      frequency: 1100,
    });
    this._filter2Node = new BiquadFilterNode(audioContext, {
      type: 'allpass',
      frequency: 1100,
    });
    this._depthRangeNode = new GainNode(audioContext, { gain: 1000 });
    this._depthNode = new GainNode(audioContext, {
      gain: options.depth || 0.5,
    });
    this._outputNode = new GainNode(audioContext);
    this._lfoNode = new OscillatorNode(audioContext, {
      frequency: options.rate || 4,
    });

    // Export parameters
    this.depth = this._depthNode.gain;
    this.rate = this._lfoNode.frequency;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'depth':
          this.depth.value = options[key];
          break;
        case 'rate':
          this.rate.value = options[key];
          break;
      }
    }

    this._inputConnect = this.connect; // input side, connect of super class
    this.connect = this._outputConnect; // connect() method of output
    this.disconnect = this._outputDisconnect; // disconnect() metyhod of output

    // DSP
    this._inputConnect(this._filter1Node)
      .connect(this._filter2Node)
      .connect(this._outputNode);
    this._inputConnect(this._outputNode);
    this._lfoNode
      .connect(this._depthNode)
      .connect(this._depthRangeNode)
      .connect(this._filter1Node.frequency);
    this._depthRangeNode.connect(this._filter2Node.frequency);
    this._lfoNode.start(0);
  }

  public setDepth(targetValue: number | string) {
    this.depth.value = parseFloat(<string>targetValue);

    this._depthNode.gain.value = this.depth.value;
  }

  public setRate(targetValue: number | string) {
    this.rate.value = parseFloat(<string>targetValue);

    this._lfoNode.frequency.value = this.rate.value;
  }
}
