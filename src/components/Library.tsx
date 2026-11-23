import { DHIKR } from "../lib";
import { AppState } from "../store";

export default function Library({ state, onStart }: { state: AppState; onStart: (id: string) => void }) {
  return (
    <section className="page">
      <h1 className="page-title">Library</h1>
      <div className="list">
        {DHIKR.map((d) => (
          <button key={d.id} className="card list-item" onClick={() => onStart(d.id)}>
            <span className="tile-icon" aria-hidden>{d.icon}</span>
            <span className="grow">
              <span className="arabic" lang="ar" dir="rtl">{d.arabic}</span>
              <span className="roman">{d.roman}</span>
              <span className="meaning small">{d.meaning}</span>
            </span>
            <b>{(state.totals[d.id] ?? 0).toLocaleString()}</b>
          </button>
        ))}
      </div>
    </section>
  );
}
