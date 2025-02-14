import { useHeartRate } from "@/hooks/useHeartReat";
import { useSocket } from "@/hooks/useSocket";

export function Monitor() {
  useHeartRate();
  const { heartBeat, alert, history } = useSocket();

  return (
    <div className="monitor">
      <h2>Monitor de Batimentos Cardíacos</h2>
      <p>Batimentos: {heartBeat !== null ? `${heartBeat} BPM` : "Aguardando..."}</p>
      {alert && <p className="alert">{alert}</p>}
      <h3>Histórico de Irregularidades</h3>
      <ul>
        {history && history.map((event, index) => (
          <li key={index}>
            <p>🕒 Início: {new Date(event.startTime).toLocaleTimeString()}</p>
            {event.endTime && <p>✅ Normalizado: {new Date(event.endTime).toLocaleTimeString()}</p>}
            <p>Medições: {event.measurements.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
