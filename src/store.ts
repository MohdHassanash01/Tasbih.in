import { useCallback, useEffect, useState } from "react";
import { todayKey } from "./lib";

export interface AppState {
  history: Record<string, number>; // date -> total count that day
  totals: Record<string, number>; // dhikr id -> lifetime count
  dailyGoal: number;
  sound: boolean;
  vibrate: boolean;
}

const KEY = "tasbih-in:v1";
const initial: AppState = { history: {}, totals: {}, dailyGoal: 100, sound: true, vibrate: true };

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...initial, ...JSON.parse(raw) } : initial;
  } catch {
    return initial;
  }
}

export function useAppState() {
  const [state, setState] = useState<AppState>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full or blocked */
    }
  }, [state]);

  const add = useCallback((id: string, delta: number) => {
    setState((s) => {
      const k = todayKey();
      return {
        ...s,
        history: { ...s.history, [k]: Math.max(0, (s.history[k] ?? 0) + delta) },
        totals: { ...s.totals, [id]: Math.max(0, (s.totals[id] ?? 0) + delta) },
      };
    });
  }, []);

  const update = useCallback((patch: Partial<AppState>) => setState((s) => ({ ...s, ...patch })), []);
  const clearAll = useCallback(() => setState(initial), []);

  return { state, add, update, clearAll };
}
