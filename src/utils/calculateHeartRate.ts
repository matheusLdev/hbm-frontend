let lastPeakTime = Date.now();

export function calculateHeartRate(): number {
  const time = Date.now() % 50; 
  const voltage = calculateBaseline(time);


  if (voltage > 0.1) {
    const now = Date.now();
    const period = now - lastPeakTime;
    lastPeakTime = now;

    if (period > 300 && period < 2000) {
      return Math.round(60000 / period);
    }
  }

  return 0;
}

function calculateBaseline(x: number): number {
  return (
    -0.06366 +
    0.12613 * Math.cos(Math.PI * (x / 500)) +
    0.12258 * Math.cos(Math.PI * (x / 250)) +
    0.01593 * Math.sin(Math.PI * (x / 500)) +
    0.03147 * Math.sin(Math.PI * (x / 250))
  );
}
