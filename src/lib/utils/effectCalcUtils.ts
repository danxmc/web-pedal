export function calculateDistortionCurve3(
  intens: number | string
): Float32Array {
  const intensity: number = parseInt(<string>intens) || 1;
  const nSamples: number = 44100;
  // const deg: number = Math.PI / 180;
  const curve: Float32Array = new Float32Array(nSamples);
  let x: number;

  for (let i = 0; i < nSamples; i++) {
    x = (i * 2) / nSamples - 1;
    curve[i] =
      ((3 + intensity) * Math.atan(Math.sinh(x * 0.25) * 5)) /
      (Math.PI + intensity * Math.abs(x));
  }
  return curve;
}

export function calculateDistortionCurve(
  intens: number | string
): Float32Array {
  const intensity: number = parseInt(<string>intens) || 100;
  const nSamples: number = 44100;
  const deg: number = Math.PI / 180;
  const curve: Float32Array = new Float32Array(nSamples);
  let x: number;

  for (let i = 0; i < nSamples; i++) {
    x = (i * 2) / nSamples - 1;
    curve[i] =
      ((3 + intensity) * x * 20 * deg) / (Math.PI + intensity * Math.abs(x));
  }

  return curve;
}

export function calculateDistortionCurve2(
  intens: number | string
): Float32Array {
  const intensity: number = parseInt(<string>intens) || 100;
  const nSamples: number = 256;
  const curve: Float32Array = new Float32Array(nSamples);
  let x: number;

  for (let i = 0; i < nSamples; i++) {
    x = (i * 2) / nSamples - 1;
    curve[i] =
      ((Math.PI + intensity) * x) / (Math.PI + intensity * Math.abs(x));
  }

  return curve;
}

export function calculateFuzzCurve() {
  const curve = new Float32Array(1024);
  const midCurvePos = curve.length / 2;
  curve[511] = 0;

  for (let i = 0; i < midCurvePos; i++) {
    const r = Math.tanh((4 * i) / midCurvePos) * 0.5;
    const v = 1 - i / midCurvePos;
    curve[midCurvePos + i] = r;
    curve[midCurvePos - 1 - i] = r * Math.pow(v, 4);
  }

  return curve;
}

type OverdriveWaveShaperCurves = {
  curve: Float32Array;
  inGainCurve: Float32Array;
  outGainCurve: Float32Array;
};
export function calculateOverdriveWaveShaperCurves(): OverdriveWaveShaperCurves {
  const curve = new Float32Array(1024);
  const midCurvePos = curve.length / 2;
  curve[511] = 0;

  for (let i = 0; i < midCurvePos; i++) {
    const r = Math.tanh((4 * i) / midCurvePos) * 0.5;
    curve[midCurvePos + i] = r;
    curve[midCurvePos - 1 - i] = -r;
  }

  const inGainCurve = new Float32Array(101);
  // const outGainCurve = new Float32Array(3);

  for (let i = 0; i < inGainCurve.length; i++) {
    inGainCurve[i] = 0.25;
  }

  for (let i = 52, d1 = 0.25; i < inGainCurve.length; i++, d1 *= 1.1) {
    inGainCurve[i] = d1;
  }

  const outGainCurve = new Float32Array([2, 2, 2, 2, 2, 0.9, 0.5, 0.35, 0.3]);

  return { curve, inGainCurve, outGainCurve };
}

export async function getReverbBuffer(
  path: string,
  audioContext: BaseAudioContext
) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`HTTP error, status = ${res.status}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
}
