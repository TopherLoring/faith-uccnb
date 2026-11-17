import { gatherings, worship, type Gathering, type RecurrenceRule } from '../data/site';

const TZ = 'America/Chicago';

/** Current wall-clock time in New Braunfels, as plain numbers. */
export function nowInChurchTime(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
    weekday: 'short',
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    year: Number(get('year')),
    month: Number(get('month')) - 1,
    day: Number(get('day')),
    hour: Number(get('hour')),
    minute: Number(get('minute')),
    weekday: weekdays.indexOf(get('weekday')),
  };
}

/** A calendar date (no time) as a UTC-midnight Date, so arithmetic never crosses DST. */
const cal = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d));

function matches(rule: RecurrenceRule, date: Date): boolean {
  const wd = date.getUTCDay();
  if (wd !== rule.weekday) return false;
  if (rule.kind === 'weekly') return true;
  const d = date.getUTCDate();
  if (rule.kind === 'nth') return Math.ceil(d / 7) === rule.n;
  const nextWeek = new Date(date.getTime() + 7 * 86400000);
  return nextWeek.getUTCMonth() !== date.getUTCMonth();
}

/** Next date (today included) that satisfies the rule. */
export function nextOccurrence(rule: RecurrenceRule, from = nowInChurchTime()): Date {
  const start = cal(from.year, from.month, from.day);
  for (let i = 0; i < 62; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    if (matches(rule, d)) return d;
  }
  return start;
}

export function formatDay(d: Date, opts: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' }) {
  return new Intl.DateTimeFormat('en-US', { ...opts, timeZone: 'UTC' }).format(d);
}

export type WorshipStatus =
  | { state: 'live' }
  | { state: 'soon'; minutes: number }
  | { state: 'upcoming'; date: Date; isToday: boolean; isCommunion: boolean };

export function worshipStatus(now = nowInChurchTime()): WorshipStatus {
  const mins = now.hour * 60 + now.minute;
  const start = worship.startHour * 60 + worship.startMinute;
  const end = worship.endHour * 60 + worship.endMinute;
  if (now.weekday === 0) {
    if (mins >= start && mins < end) return { state: 'live' };
    if (mins >= start - 45 && mins < start) return { state: 'soon', minutes: start - mins };
  }
  // After today's service ends, look from tomorrow.
  const from = now.weekday === 0 && mins >= end ? { ...now, day: now.day + 1 } : now;
  const normalized = cal(from.year, from.month, from.day);
  const date = nextOccurrence(
    { kind: 'weekly', weekday: 0 },
    { ...from, year: normalized.getUTCFullYear(), month: normalized.getUTCMonth(), day: normalized.getUTCDate() },
  );
  const today = cal(now.year, now.month, now.day);
  return {
    state: 'upcoming',
    date,
    isToday: date.getTime() === today.getTime(),
    isCommunion: matches({ kind: 'nth', weekday: 0, n: 1 }, date),
  };
}

export interface UpcomingItem {
  gathering: Gathering;
  date: Date;
}

/** The monthly rhythms (communion, ToT, game night, etc.) in date order. */
export function upcomingMonthly(now = nowInChurchTime()): UpcomingItem[] {
  return gatherings
    .filter((g) => g.rule.kind !== 'weekly')
    .map((g) => ({ gathering: g, date: nextOccurrence(g.rule, now) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}
