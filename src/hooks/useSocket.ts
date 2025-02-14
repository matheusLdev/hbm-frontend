import { useEffect, useState } from "react";
import { socket } from "@/services/socket";
import { Irregularity } from "@/types/socket";

export function useSocket() {
  const [heartBeat, setHeartBeat] = useState<number | null>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const [history, setHistory] = useState<Irregularity[]>([])

  useEffect(() => {
    socket.on("receiveHeartbeat", (data: number) => {
      setHeartBeat(data);
    });

    socket.on("receiveAlert", (alert: string) => {
      setAlert(`${alert}`);
      setTimeout(() => setAlert(null), 8000);
    });

    socket.on("receiveHistory", (data: Irregularity[]) => {
      setHistory(data.reverse());
    });

    socket.emit("requestHistory");

    return () => {
      socket.off("receiveHeartbeat");
      socket.off("receiveAlert");
      socket.off("receiveHistory");
    };
  }, []);

  return { heartBeat, alert, history };
}
