export interface Dhikr {
  id: string;
  arabic: string;
  roman: string;
  meaning: string;
  icon: string;
}

export const DHIKR: Dhikr[] = [
  { id: "astaghfirullah", arabic: "أَسْتَغْفِرُ ٱللّٰهَ", roman: "Astaghfirullah", meaning: "I seek forgiveness from Allah.", icon: "🌿" },
  { id: "alhamdulillah", arabic: "ٱلْحَمْدُ لِلّٰهِ", roman: "Alhamdulillah", meaning: "All praise is due to Allah.", icon: "🤲" },
  { id: "subhanallah", arabic: "سُبْحَانَ ٱللّٰهِ", roman: "SubhanAllah", meaning: "Glory be to Allah.", icon: "📿" },
  { id: "allahuakbar", arabic: "ٱللّٰهُ أَكْبَرُ", roman: "Allahu Akbar", meaning: "Allah is the Greatest.", icon: "🕋" },
  { id: "lailaha", arabic: "لَا إِلٰهَ إِلَّا ٱللّٰهُ", roman: "La ilaha illallah", meaning: "There is no god but Allah.", icon: "☪️" },
  { id: "bihamdihi", arabic: "سُبْحَانَ ٱللّٰهِ وَبِحَمْدِهِ", roman: "SubhanAllahi wa bihamdihi", meaning: "Glory and praise be to Allah.", icon: "✨" },
];

export const POPULAR_IDS = ["astaghfirullah", "alhamdulillah", "subhanallah", "allahuakbar"];

export const getDhikr = (id: string): Dhikr => DHIKR.find((d) => d.id === id) ?? DHIKR[2];

/* ---------- dates ---------- */
export const fmt = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const todayKey = (): string => fmt(new Date());

export function lastNDays(n: number): { key: string; label: string }[] {
  const out: { key: string; label: string }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({ key: fmt(d), label: d.toLocaleDateString("en", { weekday: "short" }) });
  }
  return out;
}

export function sumLastDays(history: Record<string, number>, n: number): number {
  return lastNDays(n).reduce((sum, d) => sum + (history[d.key] ?? 0), 0);
}

const dayDiff = (a: string, b: string): number =>
  Math.round((new Date(b + "T12:00:00").getTime() - new Date(a + "T12:00:00").getTime()) / 86400000);

export function bestStreak(history: Record<string, number>): number {
  const days = Object.keys(history).filter((k) => history[k] > 0).sort();
  let best = 0;
  let run = 0;
  days.forEach((k, i) => {
    run = i > 0 && dayDiff(days[i - 1], k) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  });
  return best;
}

export function currentStreak(history: Record<string, number>): number {
  let streak = 0;
  const d = new Date();
  // today may not be done yet — don't break the streak for that
  if (!(history[fmt(d)] > 0)) d.setDate(d.getDate() - 1);
  while (history[fmt(d)] > 0) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

/* ---------- feedback ---------- */
let audio: AudioContext | null = null;
export function tick(): void {
  try {
    audio ??= new AudioContext();
    const o = audio.createOscillator();
    const g = audio.createGain();
    o.frequency.value = 660;
    g.gain.setValueAtTime(0.08, audio.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.08);
    o.connect(g).connect(audio.destination);
    o.start();
    o.stop(audio.currentTime + 0.09);
  } catch {
    /* audio not available */
  }
}

export const buzz = (ms: number | number[]): void => {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* not supported */
  }
};
