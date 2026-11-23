import { AppState } from "../store";

interface Props {
  state: AppState;
  onChange: (p: Partial<AppState>) => void;
  onClear: () => void;
}

export default function Settings({ state, onChange, onClear }: Props) {
  return (
    <section className="page">
      <h1 className="page-title">Settings</h1>
      <div className="card settings">
        <label className="row between">
          <span>Daily goal</span>
          <select value={state.dailyGoal} onChange={(e) => onChange({ dailyGoal: Number(e.target.value) })}>
            {[33, 100, 300, 500, 1000].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <label className="row between">
          <span>Tap sound</span>
          <input type="checkbox" checked={state.sound} onChange={(e) => onChange({ sound: e.target.checked })} />
        </label>
        <label className="row between">
          <span>Vibration</span>
          <input type="checkbox" checked={state.vibrate} onChange={(e) => onChange({ vibrate: e.target.checked })} />
        </label>
        <button
          className="pill danger"
          onClick={() => window.confirm("Delete all counts and streaks from this device?") && onClear()}
        >
          Delete all my data
        </button>
      </div>
      <p className="muted small">Your counts are saved only on this device.</p>
    </section>
  );
}
