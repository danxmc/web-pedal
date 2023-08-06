export interface CompressorOptions extends AudioNodeOptions {
  mix: number;
  treshold: number;
  attack: number;
  release: number;
}

export class CompressorNode extends GainNode {
  // Parameters
  mix: AudioParam;
  treshold: AudioParam;
  attack: AudioParam;
  release: AudioParam;

  // AudioNodes used by effect
  private _inGainNode: GainNode;
  private _outGainNode: GainNode;
  private _compressorNode: DynamicsCompressorNode;
  private _sumGainNode: GainNode;

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
      return this._sumGainNode.connect(destination, output, input);
    } else {
      return this._sumGainNode.connect(destination, output);
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
        return this._sumGainNode.disconnect(destination, output);
      } else {
        return this._sumGainNode.disconnect(destination);
      }
    } else if (destination instanceof AudioParam) {
      if (output) {
        return this._sumGainNode.disconnect(destination, output);
      } else {
        return this._sumGainNode.disconnect(destination);
      }
    } else {
      return this._sumGainNode.disconnect();
    }
  }

  constructor(audioContext: BaseAudioContext, options: CompressorOptions) {
    super(audioContext);

    // Internal Nodes
    this._inGainNode = new GainNode(audioContext, {
      gain: 1 - (options.mix || 0.85),
    });
    this._compressorNode = new DynamicsCompressorNode(audioContext, {
      threshold: options.treshold || -30,
      attack: options.attack || 0.1,
      release: options.release || 0.5,
    });
    this._outGainNode = new GainNode(audioContext, {
      gain: options.mix || 0.85,
    });
    this._sumGainNode = new GainNode(audioContext);

    // Export parameters
    this.mix = this._outGainNode.gain;
    this.treshold = this._compressorNode.threshold;
    this.attack = this._compressorNode.attack;
    this.release = this._compressorNode.release;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'mix':
          this.mix.value = options[key];
          break;
        case 'treshold':
          this.treshold.value = options[key];
          break;
        case 'attack':
          this.attack.value = options[key];
          break;
        case 'release':
          this.release.value = options[key];
          break;
      }
    }

    this._inputConnect = this.connect; // input side, connect of super class
    this.connect = this._outputConnect; // connect() method of output
    this.disconnect = this._outputDisconnect; // disconnect() metyhod of output

    // DSP
    this._inputConnect(this._compressorNode)
      .connect(this._outGainNode)
      .connect(this._sumGainNode);
    this._inputConnect(this._inGainNode).connect(this._sumGainNode);
  }

  public setMix(targetValue: number | string) {
    this.mix.value = parseFloat(<string>targetValue);

    this._inGainNode.gain.value = 1 - this.mix.value;
    this._outGainNode.gain.value = this.mix.value;
  }

  public setTreshold(targetValue: number | string) {
    this.treshold.value = parseFloat(<string>targetValue);

    this._compressorNode.threshold.value = this.treshold.value;
  }

  public setAttack(targetValue: number | string) {
    this.attack.value = parseFloat(<string>targetValue);

    this._compressorNode.attack.value = this.attack.value;
  }

  public setRelease(targetValue: number | string) {
    this.release.value = parseFloat(<string>targetValue);

    this._compressorNode.release.value = this.release.value;
  }
}
