import { useEffect, useState } from 'react';
import { church } from '../data/site';
import { formatDay, worshipStatus, type WorshipStatus } from '../lib/schedule';

function useWorshipStatus(): WorshipStatus {
  const [status, setStatus] = useState(() => worshipStatus());
  useEffect(() => {
    const t = window.setInterval(() => setStatus(worshipStatus()), 30_000);
    return () => window.clearInterval(t);
  }, []);
  return status;
}

/** One line that always answers "when's the next service, and can I join it now?" */
export function SundayStatus({ tone = 'dark', compact = false }: { tone?: 'dark' | 'light'; compact?: boolean }) {
  const s = useWorshipStatus();
  const toneClass = tone === 'light' ? ' is-light' : '';

  if (s.state === 'live' || s.state === 'soon') {
    return (
      <a
        href={church.zoomUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`sunday-status ss-live${toneClass}`}
      >
        <span className="live-dot" />
        <span className="link-underline">
          {s.state === 'live' ? 'Worship is live now. Join on Zoom' : `Worship starts in ${s.minutes} min. Join on Zoom`}
        </span>
      </a>
    );
  }

  const day = s.isToday ? 'Today' : formatDay(s.date, { weekday: 'long', month: 'short', day: 'numeric' });
  return (
    <span className={`sunday-status${toneClass}`}>
      <span className="ss-day">{s.isToday ? 'Today' : 'This Sunday'}</span>
      {!compact && !s.isToday && <span className="ss-meta">· {day.replace('Sunday, ', '')}</span>}
      <span className="ss-meta">10 a.m.{compact ? '' : ' · In person & on Zoom'}</span>
      {s.isCommunion && !compact && <span className="ss-communion">· Communion Sunday</span>}
    </span>
  );
}
