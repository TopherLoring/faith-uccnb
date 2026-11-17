const COLORS = ['#D9483B', '#E8873A', '#E7BC3F', '#4C9459', '#3C6DB0', '#7A4E9F'];

interface RibbonsProps {
  className?: string;
  /** Depth of the swag. 0 = nearly straight, 1 = deep. */
  sag?: number;
  strokeWidth?: number;
  sway?: boolean;
}

/**
 * The ribbons strung across Faith's sanctuary rafters, drawn as six swagged lines.
 * Lines draw in on mount, then drift slightly.
 */
export function Ribbons({ className = '', sag = 0.6, strokeWidth = 3, sway = true }: RibbonsProps) {
  const w = 1200;
  return (
    <svg className={className} viewBox={`0 0 ${w} 220`} preserveAspectRatio="none" aria-hidden="true">
      {COLORS.map((c, i) => {
        const y0 = 18 + i * 14;
        const y1 = 40 + i * 9;
        const dip = 60 + sag * 110 - i * 6;
        const d = `M -20 ${y0} C ${w * 0.28} ${y0 + dip}, ${w * 0.62} ${y1 + dip * 0.9}, ${w + 20} ${y1}`;
        return (
          <g key={c} className={sway ? 'ribbon-sway' : undefined} style={{ ['--i' as string]: i }}>
            <path
              className="ribbon-path"
              d={d}
              pathLength={1}
              stroke={c}
              strokeWidth={strokeWidth}
              vectorEffect="non-scaling-stroke"
              style={{ ['--i' as string]: i }}
            />
          </g>
        );
      })}
    </svg>
  );
}

/** Small comma mark used in the wordmark. */
export function CommaMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 56" className={className} aria-hidden="true">
      <circle cx="20" cy="17" r="14" fill="currentColor" />
      <path d="M33.6 20.5C33 34 25 46 10 54c8-8 11.6-16 11.6-25z" fill="currentColor" />
    </svg>
  );
}
