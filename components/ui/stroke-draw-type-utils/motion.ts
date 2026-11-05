export function cubicBezier(
  mX1: number,
  mY1: number,
  mX2: number,
  mY2: number,
) {
  const cx = 3 * mX1;
  const bx = 3 * (mX2 - mX1) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * mY1;
  const by = 3 * (mY2 - mY1) - cy;
  const ay = 1 - cy - by;

  const sampleCurveX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleCurveY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleCurveDerivativeX = (t: number) =>
    (3 * ax * t + 2 * bx) * t + cx;

  const solveCurveX = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const x2 = sampleCurveX(t) - x;
      if (Math.abs(x2) < 1e-6) return t;
      const d = sampleCurveDerivativeX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= x2 / d;
    }
    return t;
  };

  return (t: number) => sampleCurveY(solveCurveX(t));
}
