import { useState } from "react";
import { buzz, getDhikr, tick } from "./lib";
import { useAppState } from "./store";
import AdBanner from "./components/AdBanner";
import Home from "./components/Home";
import Counter from "./components/Counter";
import Library from "./components/Library";
import Progress from "./components/Progress";
import Settings from "./components/Settings";

type Screen = "home" | "counter" | "library" | "progress" | "settings";
interface Session { dhikrId: string; count: number; target: number }

const NAV: { id: Exclude<Screen, "counter">; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "library", label: "Library", icon: "📖" },
  { id: "progress", label: "Progress", icon: "📊" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function App() {
  const { state, add, update, clearAll } = useAppState();
  const [screen, setScreen] = useState<Screen>("home");
  const [session, setSession] = useState<Session>({ dhikrId: "subhanallah", count: 0, target: 33 });

  const start = (id: string) => {
    setSession((s) => ({ dhikrId: id, count: 0, target: s.target }));
    setScreen("counter");
  };

  const tap = () => {
    const next = session.count + 1;
    setSession({ ...session, count: next });
    add(session.dhikrId, 1);
    if (state.sound) tick();
    if (state.vibrate) buzz(next === session.target ? [60, 40, 120] : 15);
  };

  const undo = () => {
    if (session.count === 0) return;
    setSession({ ...session, count: session.count - 1 });
    add(session.dhikrId, -1); // fixes a mistaken tap
  };

  // Reset only clears the round; counts already recited stay in your totals.
  const reset = () => setSession({ ...session, count: 0 });

  return (
    <div className="app">
      <main className={`screen ${screen === "counter" ? "no-nav" : ""}`}>
        {screen === "home" && (
          <Home
            state={state}
            lastDhikrId={session.dhikrId}
            onStart={start}
            onLibrary={() => setScreen("library")}
            onProgress={() => setScreen("progress")}
          />
        )}
        {screen === "counter" && (
          <Counter
            dhikr={getDhikr(session.dhikrId)}
            count={session.count}
            target={session.target}
            onTap={tap}
            onUndo={undo}
            onReset={reset}
            onBack={() => setScreen("home")}
            onTarget={(t) => setSession({ ...session, target: t })}
            sound={state.sound}
            onToggleSound={() => update({ sound: !state.sound })}
          />
        )}
        {screen === "library" && <Library state={state} onStart={start} />}
        {screen === "progress" && <Progress state={state} />}
        {screen === "settings" && <Settings state={state} onChange={update} onClear={clearAll} />}
      </main>

      <footer className="dock">
        {screen !== "counter" && (
          <nav aria-label="Main">
            {NAV.map((n) => (
              <button key={n.id} className={screen === n.id ? "active" : ""} onClick={() => setScreen(n.id)}>
                <span aria-hidden>{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
        )}
        <AdBanner />
      </footer>
    </div>
  );
}
