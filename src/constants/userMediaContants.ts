export const CAPTURE_AUDIO_OPTIONS: MediaStreamConstraints = {
  video: false,
  audio: {
    echoCancellation: false,
    autoGainControl: false,
    noiseSuppression: false,
    // latency: 0,
  },
} as const;
