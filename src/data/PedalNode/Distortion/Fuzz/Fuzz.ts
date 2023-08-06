import { calculateFuzzCurve } from '@/lib/utils/effectCalcUtils';

export interface FuzzOptions extends AudioNodeOptions {
  fuzz: number;
  level: number;
}

export class FuzzNode extends GainNode {
  // Parameters
  fuzz: AudioParam;
  level: AudioParam;

  // AudioNodes used by effect
  private _inGain1Node: GainNode;
  private _inGain2Node: GainNode;
  private _shaper1Node: WaveShaperNode;
  private _shaper2Node: WaveShaperNode;
  private _outGain1Node: GainNode;
  private _outGain2Node: GainNode;
  private _levelNode: GainNode;
  private _outputNode: GainNode;
  private _outFilterNode: BiquadFilterNode;
  private _driveInputNode: ConstantSourceNode;

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

  constructor(audioContext: BaseAudioContext, options: FuzzOptions) {
    super(audioContext);
    const curve = calculateFuzzCurve();

    // Internal Nodes
    this._inGain1Node = new GainNode(audioContext, { gain: 1 });
    this._inGain2Node = new GainNode(audioContext, { gain: -1 });
    this._shaper1Node = new WaveShaperNode(audioContext, { curve: curve });
    this._shaper2Node = new WaveShaperNode(audioContext, { curve: curve });
    this._outGain1Node = new GainNode(audioContext, { gain: 1 });
    this._outGain2Node = new GainNode(audioContext, { gain: -1 });
    this._levelNode = new GainNode(audioContext, { gain: options.level || 1 });
    this._outputNode = new GainNode(audioContext);
    this._outFilterNode = new BiquadFilterNode(audioContext, {
      type: 'highpass',
      frequency: 80,
    });
    this._driveInputNode = new ConstantSourceNode(audioContext, {
      offset: options.fuzz || 0,
    });

    // Export parameters
    this.fuzz = this._driveInputNode.offset;
    this.level = this._levelNode.gain;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'fuzz':
          this.fuzz.value = options[key];
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
    this._inputConnect(this._inGain1Node)
      .connect(this._shaper1Node)
      .connect(this._outGain1Node)
      .connect(this._outFilterNode)
      .connect(this._levelNode)
      .connect(this._outputNode);
    this._inputConnect(this._inGain2Node)
      .connect(this._shaper2Node)
      .connect(this._outGain2Node)
      .connect(this._outFilterNode);
    this._driveInputNode.connect(this._outGain2Node.gain);
    this._driveInputNode.start(0);
  }

  public setFuzz(targetValue: number | string) {
    this.fuzz.value = parseFloat(<string>targetValue);

    this._driveInputNode.offset.value = this.fuzz.value;
  }

  public setLevel(targetValue: number | string) {
    this.level.value = parseFloat(<string>targetValue);

    this._levelNode.gain.value = this.level.value;
  }
}
