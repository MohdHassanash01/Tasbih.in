import { Dhikr } from "../lib";

interface Props {
  dhikr: Dhikr;
  count: number;
  target: number;
  onTap: () => void;
  onUndo: () => void;
  onReset: () => void;
  onBack: () => void;
  onTarget: (t: number) => void;
  sound: boolean;
  onToggleSound: () => void;
}

const TARGETS = [33, 99, 100];
const R = 88;
const C = 2 * Math.PI * R;

export default function Counter({ dhikr, count, target, onTap, onUndo, onReset, onBack, onTarget, sound, onToggleSound }: Props) {
  const ratio = Math.min(count / target, 1);
  const done = count >= target;

  return (
    <div className="counter-screen">
      <div className="counter-top">
        <button className="round-btn" onClick={onBack} aria-label="Back">←</button>
        <div className="row gap">
          <button className="round-btn" onClick={onToggleSound} aria-label={sound ? "Mute sound" : "Unmute sound"}>
            {sound ? "🔊" : "🔇"}
          </button>
          <button className="round-btn" onClick={onReset} aria-label="Reset round">↻</button>
        </div>
      </div>

      <div className="counter-body">
        <p className="arabic xl" lang="ar" dir="rtl">{dhikr.arabic}</p>
        <h1 className="dhikr-name">{dhikr.roman}</h1>
        <p className="meaning">“{dhikr.meaning}”</p>

        <button className="ring" onClick={onTap} aria-label={`Count ${dhikr.roman}. Current count ${count} of ${target}`}>
          <svg viewBox="0 0 200 200" aria-hidden>
            <circle cx="100" cy="100" r={R} className="ring-track" />
            <circle
              cx="100" cy="100" r={R}
              className="ring-fill"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - ratio)}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <span className="ring-inner">
            <span className="ring-count">{count}</span>
            <span className="ring-target">/ {target}</span>
            <span className="ring-hint">{done ? "Target reached ✓" : "Tap to count"}</span>
          </span>
        </button>

        <div className="actions">
          <button className="pill" onClick={onUndo} disabled={count === 0}>↺ Undo</button>
          <button className="pill" onClick={onReset} disabled={count === 0}>🗑 Reset</button>
        </div>

        <div className="targets" role="group" aria-label="Target">
          {TARGETS.map((t) => (
            <button key={t} className={`chip ${t === target ? "on" : ""}`} onClick={() => onTarget(t)}>{t}</button>
          ))}
        </div>

        <div className="card target-card">
          <span>◎ Target: {target}</span>
          <span className="sep" />
          <span>Progress: {Math.round(ratio * 100)}%</span>
          <div className="bar wide"><span style={{ width: `${ratio * 100}%` }} /></div>
        </div>
      </div>
    </div>
  );
}
