import { useEffect } from "react";
import { socket } from "@/services/socket";
import { calculateHeartRate } from "@/utils/calculateHeartRate";

export function useHeartRate() {
  useEffect(() => {
    const interval = setInterval(() => {
      const heartRate = calculateHeartRate();
      socket.emit("sendHeartbeat", heartRate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}
