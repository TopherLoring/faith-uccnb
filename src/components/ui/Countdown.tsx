import React, { useState, useEffect } from 'react';
import { Clock, PlayCircle } from 'lucide-react';

interface CountdownProps {
  onJoinWorship?: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({ onJoinWorship }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isHappeningNow: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isHappeningNow: false });

  useEffect(() => {
    function calculateNextSunday() {
      const now = new Date();
      // Target: Next Sunday at 10:00 AM
      const currentDay = now.getDay(); // 0 is Sunday
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Check if worship is currently happening (Sunday 10:00 AM to 11:30 AM)
      if (currentDay === 0 && (currentHour === 10 || (currentHour === 11 && currentMinute <= 30))) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isHappeningNow: true };
      }

      // Calculate days until next Sunday
      let daysUntilSunday = (7 - currentDay) % 7;
      if (daysUntilSunday === 0 && (currentHour > 11 || (currentHour === 11 && currentMinute > 30))) {
        daysUntilSunday = 7;
      }

      const nextSunday = new Date(now);
      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(10, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();
      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isHappeningNow: true };
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds, isHappeningNow: false };
    }

    setTimeLeft(calculateNextSunday());
    const timer = setInterval(() => {
      setTimeLeft(calculateNextSunday());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isHappeningNow) {
    return (
      <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-terracotta-500 to-amber-500 text-white font-medium shadow-lg animate-pulse">
        <PlayCircle className="w-5 h-5 text-white" />
        <span>Sunday Worship is Happening Right Now!</span>
        {onJoinWorship && (
          <button 
            onClick={onJoinWorship}
            className="ml-2 px-3 py-1 bg-white text-terracotta-700 text-sm font-bold rounded-lg hover:bg-cream-100 transition-colors"
          >
            Join Live Zoom
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm text-sm">
      <div className="flex items-center gap-2 text-terracotta-600 dark:text-terracotta-400 font-semibold">
        <Clock className="w-4 h-4" />
        <span>Next Sunday Worship:</span>
      </div>
      <div className="flex items-center gap-2 font-mono text-gray-800 dark:text-slate-200">
        <span className="px-2 py-1 bg-cream-200 dark:bg-slate-700 rounded font-bold">
          {timeLeft.days}d
        </span>
        <span>:</span>
        <span className="px-2 py-1 bg-cream-200 dark:bg-slate-700 rounded font-bold">
          {String(timeLeft.hours).padStart(2, '0')}h
        </span>
        <span>:</span>
        <span className="px-2 py-1 bg-cream-200 dark:bg-slate-700 rounded font-bold">
          {String(timeLeft.minutes).padStart(2, '0')}m
        </span>
        <span>:</span>
        <span className="px-2 py-1 bg-cream-200 dark:bg-slate-700 rounded font-bold text-terracotta-600 dark:text-terracotta-400">
          {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
    </div>
  );
};
