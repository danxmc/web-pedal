import { calculateOverdriveWaveShaperCurves } from '@/lib/utils/effectCalcUtils';

export interface OverdriveOptions extends AudioNodeOptions {
  drive: number;
  level: number;
}

export class OverdriveNode extends GainNode {
  // Parameters
  drive: AudioParam;
  level: AudioParam;

  // AudioNodes used by effect
  private _inGainNode: GainNode;
  private _outGainNode: GainNode;
  private _shaperNode: WaveShaperNode;
  private _inGainShaperNode: WaveShaperNode;
  private _outGainShaperNode: WaveShaperNode;
  private _levelNode: GainNode;
  private _outputNode: GainNode;
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

  constructor(audioContext: BaseAudioContext, options: OverdriveOptions) {
    super(audioContext);

    const { curve, inGainCurve, outGainCurve } =
      calculateOverdriveWaveShaperCurves();

    // Internal Nodes
    this._inGainNode = new GainNode(audioContext, { gain: 0 });
    this._outGainNode = new GainNode(audioContext, { gain: 0 });
    this._shaperNode = new WaveShaperNode(audioContext, { curve: curve });
    this._inGainShaperNode = new WaveShaperNode(audioContext, {
      curve: inGainCurve,
    });
    this._outGainShaperNode = new WaveShaperNode(audioContext, {
      curve: outGainCurve,
    });
    this._levelNode = new GainNode(audioContext, { gain: options.level || 1 });
    this._outputNode = new GainNode(audioContext);
    this._driveInputNode = new ConstantSourceNode(audioContext, {
      offset: options.drive || 0,
    });

    // Export parameters
    this.drive = this._driveInputNode.offset;
    this.level = this._levelNode.gain;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'drive':
          this.drive.value = options[key];
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
    this._inputConnect(this._inGainNode)
      .connect(this._shaperNode)
      .connect(this._outGainNode)
      .connect(this._levelNode)
      .connect(this._outputNode);
    this._driveInputNode
      .connect(this._inGainShaperNode)
      .connect(this._inGainNode.gain);
    this._driveInputNode
      .connect(this._outGainShaperNode)
      .connect(this._outGainNode.gain);
    this._driveInputNode.start(0);
  }

  public setLevel(targetValue: number | string) {
    this.level.value = parseFloat(<string>targetValue);

    this._levelNode.gain.value = this.level.value;
  }

  public setDrive(targetValue: number | string) {
    this.drive.value = parseFloat(<string>targetValue);

    this._driveInputNode.offset.value = this.drive.value;
  }
}
