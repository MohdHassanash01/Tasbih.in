import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const CLIENT = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;
const SLOT = import.meta.env.VITE_ADSENSE_SLOT as string | undefined;

function loadScript(client: string) {
  if (document.querySelector("script[data-adsense]")) return;
  const s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.dataset.adsense = "1";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  document.head.appendChild(s);
}

/** Bottom banner. Shows a placeholder until AdSense env vars are set. */
export default function AdBanner() {
  const pushed = useRef(false);
  const enabled = Boolean(CLIENT && SLOT && !CLIENT.includes("XXXX"));

  useEffect(() => {
    if (!enabled || pushed.current) return;
    pushed.current = true;
    loadScript(CLIENT!);
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blocked */
    }
  }, [enabled]);

  return (
    <div className="ad" aria-label="Advertisement">
      {enabled ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: 50 }}
          data-ad-client={CLIENT}
          data-ad-slot={SLOT}
          data-ad-format="horizontal"
          data-full-width-responsive="false"
        />
      ) : (
        <span className="ad-placeholder">Ad space · 320 × 50</span>
      )}
    </div>
  );
}
