export interface SineTremoloOptions extends AudioNodeOptions {
  speed: number;
  volume: number;
}

export class SineTremolo extends GainNode {
  // Parameters
  volume: AudioParam;
  speed: AudioParam;

  // AudioNodes used by effect
  private _oscillatorNode: OscillatorNode;

  constructor(audioContext: BaseAudioContext, options: SineTremoloOptions) {
    super(audioContext, { gain: options.volume });
    // Internal Nodes
    this._oscillatorNode = new OscillatorNode(audioContext, {
      type: 'sine',
      frequency: options.speed || 10,
    });

    // Export parameters
    this.speed = this._oscillatorNode.frequency;
    this.volume = this.gain;

    // Options setup
    for (let key in options) {
      switch (key) {
        case 'speed':
          this.speed.value = options[key];
          break;
        case 'volume':
          this.gain.value = options[key];
      }
    }

    // DSP
    this._oscillatorNode.connect(this.gain);
    this._oscillatorNode.start(0);
  }

  public setSpeed(targetValue: number | string) {
    this.speed.value = parseFloat(<string>targetValue);

    this._oscillatorNode.frequency.value = this.speed.value;
  }

  public setVolume(targetValue: number | string) {
    this.volume.value = parseFloat(<string>targetValue);

    this.gain.value = this.volume.value;
  }
}
