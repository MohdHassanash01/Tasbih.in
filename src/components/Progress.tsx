import { AppState } from "../store";
import { bestStreak, currentStreak, lastNDays, sumLastDays } from "../lib";

export default function Progress({ state }: { state: AppState }) {
  const days = lastNDays(7);
  const max = Math.max(state.dailyGoal, ...days.map((d) => state.history[d.key] ?? 0));
  return (
    <section className="page">
      <h1 className="page-title">Progress</h1>
      <div className="card chart" role="img" aria-label="Counts for the last 7 days">
        {days.map((d) => {
          const v = state.history[d.key] ?? 0;
          return (
            <div key={d.key} className="col-bar">
              <small>{v}</small>
              <span style={{ height: `${(v / max) * 100}%` }} />
              <small>{d.label}</small>
            </div>
          );
        })}
      </div>
      <div className="card stat-row solo">
        <div><small>Current streak</small><b>{currentStreak(state.history)} days</b></div>
        <div><small>Best streak</small><b>{bestStreak(state.history)} days</b></div>
        <div><small>Last 7 days</small><b>{sumLastDays(state.history, 7)}</b></div>
      </div>
    </section>
  );
}
