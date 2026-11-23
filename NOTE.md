# Tasbih.in — Project Note

## Idea
A clean, fast, mobile-first **Islamic tasbih (dhikr counter) web app**. No install, no login — open the link and start counting. Most options people find today are heavy native apps or old, cluttered sites; a polished web-first tasbih with a calm design is the gap this app aims at.
(Before launch: spend 30 minutes searching "online tasbih counter" and note what competitors do well/badly.)

## Who it's for
Muslims who want a simple counter on their phone for daily dhikr — after salah, morning/evening adhkar, Ramadan.

## What v1 does
- Home: today's progress, popular dhikr, quick "Start Reciting", stats
- Counter: big tap ring, Undo, Reset, target 33 / 99 / 100, sound + vibration
- Library of dhikr, 7-day progress chart, streaks, settings
- Everything saved on-device (localStorage) — no account, no server cost

## Money plan
1. Launch free with one bottom banner ad (Google AdSense).
2. Traffic is the real lever: SEO pages ("Online tasbih counter", "SubhanAllah 33 counter", "Digital tasbih"), PWA install, share links.
3. Later: Remove-ads option, Ramadan special pages, more dhikr packs.

## Ad rules (important)
- Keep the ad **away from the tap area**. Accidental clicks on a counting app = AdSense policy violation and possible ban.
- One banner at the bottom only. No pop-ups/interstitials while counting.
- AdSense needs: own domain, privacy policy page, about/contact page, some real content. Add `ads.txt` (already in `/public`).
- Cookie consent banner is needed for EU/UK visitors (use Google's CMP).

## Next steps
1. Deploy (Vercel/Netlify/AWS) on tasbih.in or a subdomain
2. Add privacy policy + about pages, apply for AdSense
3. Add PWA manifest + service worker (offline use)
4. Landing/SEO pages, then Hindi/Urdu/Arabic UI
5. Optional: cloud sync with login
