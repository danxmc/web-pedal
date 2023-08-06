export interface FlangerOptions extends AudioNodeOptions {
  delay: number;
  depth: number;
  feedback: number;
  speed: number;
}

export class FlangerNode extends GainNode {
  // Parameters
  delay: AudioParam;
  depth: AudioParam;
  feedback: AudioParam;
  speed: AudioParam;

  // AudioNodes used by effect
  private _wetGainNode: GainNode;
  private _delayNode: DelayNode;
  private _depthNode: GainNode;
  private _feedbackGainNode: GainNode;
  private _oscillatorNode: OscillatorNode;

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
      return this._wetGainNode.connect(destination, output, input);
    } else {
      return this._wetGainNode.connect(destination, output);
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
        return this._wetGainNode.disconnect(destination, output);
      } else {
        return this._wetGainNode.disconnect(destination);
      }
    } else if (destination instanceof AudioParam) {
      if (output) {
        return this._wetGainNode.disconnect(destination, output);
      } else {
        return this._wetGainNode.disconnect(destination);
      }
    } else {
      return this._wetGainNode.disconnect();
    }
  }

  constructor(audioContext: BaseAudioContext, options: FlangerOptions) {
    super(audioContext);

    // Internal Nodes
    this._wetGainNode = new GainNode(audioContext);
    this._delayNode = new DelayNode(audioContext, {
      delayTime: options.delay || 0.005,
    });
    this._depthNode = new GainNode(audioContext, {
      gain: options.depth || 0.002,
    });
    this._feedbackGainNode = new GainNode(audioContext, {
      gain: options.feedback || 0.5,
    });
    this._oscillatorNode = new OscillatorNode(audioContext, {
      type: 'sine',
      frequency: options.speed || 0.25,
    });

    // Export parameters
    this.delay = this._delayNode.delayTime;
    this.depth = this._depthNode.gain;
    this.feedback = this._feedbackGainNode.gain;
    this.speed = this._oscillatorNode.frequency;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'delay':
          this.delay.value = options[key];
          break;
        case 'depth':
          this.depth.value = options[key];
          break;
        case 'feedback':
          this.feedback.value = options[key];
          break;
        case 'speed':
          this.speed.value = options[key];
          break;
      }
    }

    this._inputConnect = this.connect; // input side, connect of super class
    this.connect = this._outputConnect; // connect() method of output
    this.disconnect = this._outputDisconnect; // disconnect() metyhod of output

    // DSP
    this._oscillatorNode
      .connect(this._depthNode)
      .connect(this._delayNode.delayTime);
    this._inputConnect(this._wetGainNode);
    this._inputConnect(this._delayNode);
    this._delayNode.connect(this._wetGainNode);
    this._delayNode.connect(this._feedbackGainNode);
    this._feedbackGainNode.connect(this);
    this._oscillatorNode.start(0);
  }

  public setDelay(targetValue: number | string) {
    this.delay.value = parseFloat(<string>targetValue);

    this._delayNode.delayTime.value = this.delay.value;
  }

  public setDepth(targetValue: number | string) {
    this.depth.value = parseFloat(<string>targetValue);

    this._depthNode.gain.value = this.depth.value;
  }

  public setFeedback(targetValue: number | string) {
    this.feedback.value = parseFloat(<string>targetValue);

    this._feedbackGainNode.gain.value = this.feedback.value;
  }

  public setSpeed(targetValue: number | string) {
    this.speed.value = parseFloat(<string>targetValue);

    this._oscillatorNode.frequency.value = this.speed.value;
  }
}
