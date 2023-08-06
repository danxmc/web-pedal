export interface BoostOptions extends AudioNodeOptions {
  amplify: number;
}

export class BoostNode extends GainNode {
  // Parameters
  amplify: AudioParam;

  // AudioNodes used by effect
  private _volumeAmplifyNode: GainNode;

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
      return this._volumeAmplifyNode.connect(destination, output, input);
    } else {
      return this._volumeAmplifyNode.connect(destination, output);
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
        return this._volumeAmplifyNode.disconnect(destination, output);
      } else {
        return this._volumeAmplifyNode.disconnect(destination);
      }
    } else if (destination instanceof AudioParam) {
      if (output) {
        return this._volumeAmplifyNode.disconnect(destination, output);
      } else {
        return this._volumeAmplifyNode.disconnect(destination);
      }
    } else {
      return this._volumeAmplifyNode.disconnect();
    }
  }

  constructor(audioContext: BaseAudioContext, options: BoostOptions) {
    super(audioContext);

    // Internal Nodes
    this._volumeAmplifyNode = new GainNode(audioContext, {
      gain: options.amplify || 1,
    });

    // Export parameters
    this.amplify = this._volumeAmplifyNode.gain;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'amplify':
          this.amplify.value = options[key];
          break;
      }
    }

    this._inputConnect = this.connect; // input side, connect of super class
    this.connect = this._outputConnect; // connect() method of output
    this.disconnect = this._outputDisconnect; // disconnect() metyhod of output

    // DSP
    this._inputConnect(this._volumeAmplifyNode);
  }

  public setAmplify(targetValue: number | string) {
    this.amplify.value = parseFloat(<string>targetValue);

    this._volumeAmplifyNode.gain.value = this.amplify.value;
  }
}
