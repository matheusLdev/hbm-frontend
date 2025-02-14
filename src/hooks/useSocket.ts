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
      setHistory((prevHistory) => {
        const updatedHistory = [...data, ...prevHistory];
        const sortedHistory = updatedHistory.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
        return sortedHistory.slice(0, 60);
      });
    });

    return () => {
      socket.off("receiveHeartbeat");
      socket.off("receiveAlert");
      socket.off("receiveHistory");
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("requestHistory");
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  return { heartBeat, alert, history };
}
