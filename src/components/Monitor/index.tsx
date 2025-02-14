import { useHeartRate } from "@/hooks/useHeartReat";
import { useSocket } from "@/hooks/useSocket";
import "./styles.css"

export function Monitor() {
  useHeartRate();
  const { heartBeat, alert, history } = useSocket();
  console.log(history)

  return (
    <div className="monitor">
      <div className="header">
        <h2>Monitor de Batimentos Cardíacos</h2>
        <p className="heart-rate">
          Batimentos: {heartBeat !== null ? `${heartBeat} BPM` : "Aguardando..."}
        </p>
        {alert && <p className="alert">{alert}</p>}
      </div>

      <div className="history">
        <h3>Histórico de Irregularidades</h3>
        <ul>
          {history && history.map((event, index) => (
            <li key={index} className="history-item">
              <div className="event-time">
                <p>🕒 Início: {new Date(event.startTime).toLocaleTimeString()}</p>
                {event.endTime && (
                  <p className="end-time">✅ Normalizado: {new Date(event.endTime).toLocaleTimeString()}</p>
                )}
              </div>
              <p>Medições: {event.measurements.length}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
