export interface VolumeOptions extends AudioNodeOptions {
  level: number;
}

export class VolumeNode extends GainNode {
  // Parameters
  level: AudioParam;

  // AudioNodes used by effect
  private _volumeLevelNode: GainNode;

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
      return this._volumeLevelNode.connect(destination, output, input);
    } else {
      return this._volumeLevelNode.connect(destination, output);
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
        return this._volumeLevelNode.disconnect(destination, output);
      } else {
        return this._volumeLevelNode.disconnect(destination);
      }
    } else if (destination instanceof AudioParam) {
      if (output) {
        return this._volumeLevelNode.disconnect(destination, output);
      } else {
        return this._volumeLevelNode.disconnect(destination);
      }
    } else {
      return this._volumeLevelNode.disconnect();
    }
  }

  constructor(audioContext: BaseAudioContext, options: VolumeOptions) {
    super(audioContext);

    // Internal Nodes
    this._volumeLevelNode = new GainNode(audioContext, {
      gain: options.level || 1,
    });

    // Export parameters
    this.level = this._volumeLevelNode.gain;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'level':
          this.level.value = options[key];
          break;
      }
    }

    this._inputConnect = this.connect; // input side, connect of super class
    this.connect = this._outputConnect; // connect() method of output
    this.disconnect = this._outputDisconnect; // disconnect() metyhod of output

    // DSP
    this._inputConnect(this._volumeLevelNode);
  }

  public setLevel(targetValue: number | string) {
    this.level.value = parseFloat(<string>targetValue);

    this.gain.value = this.level.value;
  }
}
