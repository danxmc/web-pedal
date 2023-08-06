export interface SlapbackDelayOptions extends AudioNodeOptions {
  delayTime: number;
  feedback: number;
  mix: number;
}

export class SlapbackDelayNode extends GainNode {
  // Parameters
  delayTime: AudioParam;
  feedback: AudioParam;
  mix: AudioParam;

  // AudioNodes used by effect
  private _delayNode: DelayNode;
  private _mixNode: GainNode;
  private _feedbackNode: GainNode;
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

  constructor(audioContext: BaseAudioContext, options: SlapbackDelayOptions) {
    super(audioContext);
    // Internal Nodes
    this._delayNode = new DelayNode(audioContext, {
      delayTime: options.delayTime || 0.5,
    });
    this._mixNode = new GainNode(audioContext, { gain: options.mix || 0.5 });
    this._feedbackNode = new GainNode(audioContext, {
      gain: options.feedback || 0.5,
    });
    this._outputNode = new GainNode(audioContext, { gain: 1.0 });

    // Export parameters
    this.delayTime = this._delayNode.delayTime;
    this.feedback = this._feedbackNode.gain;
    this.mix = this._mixNode.gain;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'delayTime':
          this.delayTime.value = options[key];
          break;
        case 'feedback':
          this.feedback.value = options[key];
          break;
        case 'mix':
          this.mix.value = options[key];
          break;
      }
    }

    this._inputConnect = this.connect; // input side, connect of super class
    this.connect = this._outputConnect; // connect() method of output
    this.disconnect = this._outputDisconnect; // disconnect() method of output

    // DSP
    this._inputConnect(this._delayNode)
      .connect(this._mixNode)
      .connect(this._outputNode);
    this._inputConnect(this._outputNode);
    this._delayNode.connect(this._feedbackNode).connect(this._delayNode);
  }

  public setDelayTime(targetValue: number | string) {
    this.delayTime.value = parseFloat(<string>targetValue);

    this._delayNode.delayTime.value = this.delayTime.value;
  }

  public setFeedback(targetValue: number | string) {
    this.feedback.value = parseFloat(<string>targetValue);

    this._feedbackNode.gain.value = this.feedback.value;
  }

  public setMix(targetValue: number | string) {
    this.mix.value = parseFloat(<string>targetValue);

    this._mixNode.gain.value = this.mix.value;
  }
}
