/** biome-ignore-all lint/correctness/useUniqueElementIds: // biome-ignore lint: false positive */
/** biome-ignore-all lint/a11y/noSvgWithoutTitle: // biome-ignore lint: false positive */

export default function BrainMap() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="h-[260px] w-full md:h-[320px]"
      aria-hidden
    >
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="text-primary/60">
        <circle cx="90" cy="80" r="36" fill="url(#g1)" />
        <circle cx="520" cy="100" r="30" fill="url(#g1)" />
        <circle cx="420" cy="250" r="40" fill="url(#g1)" />
        <circle cx="180" cy="230" r="28" fill="url(#g1)" />
      </g>
      <g
        className="stroke-cyan-500/30"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M90 80 C 160 120, 240 40, 300 120 S 460 160, 520 100" />
        <path d="M180 230 C 230 180, 310 220, 420 250" />
        <path d="M300 120 Q 340 200 420 250" />
      </g>
      <g className="text-muted-foreground/70">
        {[
          { x: 300, y: 120, l: "Note" },
          { x: 520, y: 100, l: "Task" },
          { x: 420, y: 250, l: "Tag" },
          { x: 90, y: 80, l: "Stack" },
          { x: 180, y: 230, l: "Thread" },
        ].map((n) => (
          <g key={n.l}>
            <circle cx={n.x} cy={n.y} r="6" className="fill-cyan-500" />
            <text
              x={n.x + 10}
              y={n.y + 4}
              fontSize="12"
              className="fill-current"
            >
              {n.l}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
