import { AppState } from "../store";
import { POPULAR_IDS, bestStreak, getDhikr, sumLastDays, todayKey } from "../lib";

interface Props {
  state: AppState;
  onStart: (id: string) => void;
  onLibrary: () => void;
  onProgress: () => void;
  lastDhikrId: string;
}

export default function Home({ state, onStart, onLibrary, onProgress, lastDhikrId }: Props) {
  const today = state.history[todayKey()] ?? 0;
  const pct = Math.min(100, (today / state.dailyGoal) * 100);
  const total = Object.values(state.totals).reduce((a, b) => a + b, 0);

  return (
    <>
      <header className="hero">
        <div className="brand">
          <span className="brand-mark" aria-hidden>🕌</span>
          <h1>Tasbih.in</h1>
        </div>
        <p className="greet">Assalamu Alaikum!</p>
        <p className="greet-sub">May Allah accept your good deeds ✨</p>
      </header>

      <section className="card progress-card" aria-label="Today's progress">
        <div className="sprout" aria-hidden>🌱</div>
        <div className="grow">
          <div className="row between">
            <h2>Today's Progress</h2>
            <em className="muted">{today >= state.dailyGoal ? "MashaAllah!" : "Keep going!"} ♡</em>
          </div>
          <p className="big">
            {today} / {state.dailyGoal}
          </p>
          <div className="bar"><span style={{ width: `${pct}%` }} /></div>
        </div>
      </section>

      <section className="section">
        <div className="row between">
          <h2>★ Popular Dhikr</h2>
          <button className="link" onClick={onLibrary}>See All →</button>
        </div>
        <div className="grid">
          {POPULAR_IDS.map((id) => {
            const d = getDhikr(id);
            return (
              <button key={id} className="card dhikr-tile" onClick={() => onStart(id)}>
                <span className="tile-icon" aria-hidden>{d.icon}</span>
                <span className="tile-text">
                  <span className="arabic" lang="ar" dir="rtl">{d.arabic}</span>
                  <span className="roman">{d.roman}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <button className="cta" onClick={() => onStart(lastDhikrId)}>
        <span aria-hidden>▶</span> Start Reciting
      </button>

      <section className="card stats" aria-label="My statistics">
        <div className="row between">
          <h2>My Statistics</h2>
          <button className="link green" onClick={onProgress}>See Details →</button>
        </div>
        <div className="stat-row">
          <div><span aria-hidden>📿</span><small>Total Count</small><b>{total.toLocaleString()}</b></div>
          <div><span aria-hidden>🗓️</span><small>This Week</small><b>{sumLastDays(state.history, 7).toLocaleString()}</b></div>
          <div><span aria-hidden>🏆</span><small>Best Streak</small><b>{bestStreak(state.history)} days</b></div>
        </div>
      </section>
    </>
  );
}
