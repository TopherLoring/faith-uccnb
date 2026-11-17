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
  const text = tone === 'dark' ? 'text-ink' : 'text-paper';
  const mute = tone === 'dark' ? 'text-ink-mute' : 'text-paper/70';

  if (s.state === 'live' || s.state === 'soon') {
    return (
      <a
        href={church.zoomUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2.5 text-sm font-semibold ${text} group`}
      >
        <span className="live-dot inline-block h-2 w-2 rounded-full bg-ribbon-red text-ribbon-red" />
        <span className="link-underline">
          {s.state === 'live' ? 'Worship is live now. Join on Zoom' : `Worship starts in ${s.minutes} min. Join on Zoom`}
        </span>
      </a>
    );
  }

  const day = s.isToday ? 'Today' : formatDay(s.date, { weekday: 'long', month: 'short', day: 'numeric' });
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 text-sm ${text}`}>
      <span className="font-semibold">
        {s.isToday ? 'Today' : 'This Sunday'}
        {!compact && !s.isToday && <span className={`font-normal ${mute}`}> · {day.replace('Sunday, ', '')}</span>}
      </span>
      <span className={mute}>10 a.m.{compact ? '' : ' · In person & on Zoom'}</span>
      {s.isCommunion && !compact && <span className="text-clay font-semibold">· Communion Sunday</span>}
    </span>
  );
}
