// Maybe change name to calculateStepSize or computeIntervalSize
export function getStepInRange(
  start: number,
  stop: number,
  count: number = 25
): number {
  const step = (stop - start) / count;

  return step;
}
