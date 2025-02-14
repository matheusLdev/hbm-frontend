export type HeartbeatMeasurement = {
  voltage: number;
  timestamp: number;
}

export type Irregularity = {
  startTime: number;
  endTime?: number;
  measurements: HeartbeatMeasurement[];
}