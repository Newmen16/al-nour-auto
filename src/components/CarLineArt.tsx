import type { BodyType } from "../types";

interface Art {
  outline: string;
  glass: string[];
  extras?: string[];
  wheels: { x: number; y: number }[];
  wheelR: number;
}

const artByBody: Record<BodyType, Art> = {
  sedan: {
    outline:
      "M16 98 L24 74 L80 70 L112 42 L204 42 L244 68 L302 74 L308 98 L306 106 L274 106 A24 24 0 0 0 226 106 L94 106 A24 24 0 0 0 46 106 L16 106 Z",
    glass: ["M118 48 L200 48 L238 66 L116 66 Z", "M170 48 L166 66"],
    wheels: [
      { x: 70, y: 106 },
      { x: 250, y: 106 },
    ],
    wheelR: 19,
  },
  suv: {
    outline:
      "M14 94 L18 64 L64 60 L92 30 L232 30 L266 62 L306 70 L312 94 L310 106 L274 106 A24 24 0 0 0 226 106 L96 106 A24 24 0 0 0 48 106 L14 106 Z",
    glass: ["M100 36 L226 36 L258 60 L98 60 Z", "M172 36 L168 60"],
    wheels: [
      { x: 72, y: 106 },
      { x: 250, y: 106 },
    ],
    wheelR: 19,
  },
  "coupe-suv": {
    outline:
      "M14 96 L20 66 L74 62 L104 34 L210 34 L246 52 L304 72 L310 96 L308 106 L274 106 A24 24 0 0 0 226 106 L96 106 A24 24 0 0 0 48 106 L14 106 Z",
    glass: ["M112 40 L204 40 L242 54 L110 64 Z", "M170 40 L166 60"],
    wheels: [
      { x: 72, y: 106 },
      { x: 250, y: 106 },
    ],
    wheelR: 19,
  },
  offroad: {
    outline:
      "M10 92 L14 58 L70 54 L98 28 L246 28 L276 58 L308 66 L314 92 L312 104 L276 104 A26 26 0 0 0 224 104 L100 104 A26 26 0 0 0 48 104 L10 104 Z",
    glass: ["M106 34 L240 34 L268 56 L104 56 Z", "M176 34 L172 56"],
    extras: [
      "M2 82 A14 14 0 1 0 30 82 A14 14 0 1 0 2 82",
      "M16 74 L16 90",
    ],
    wheels: [
      { x: 74, y: 104 },
      { x: 250, y: 104 },
    ],
    wheelR: 21,
  },
  utility: {
    outline:
      "M14 96 L18 60 L62 56 L90 30 L176 30 L188 60 L196 60 L196 68 L306 68 L312 96 L310 106 L274 106 A24 24 0 0 0 226 106 L96 106 A24 24 0 0 0 48 106 L14 106 Z",
    glass: ["M98 36 L170 36 L180 56 L96 56 Z"],
    extras: ["M200 74 L302 74"],
    wheels: [
      { x: 72, y: 106 },
      { x: 250, y: 106 },
    ],
    wheelR: 19,
  },
};

export function CarLineArt({ body, className = "" }: { body: BodyType; className?: string }) {
  const art = artByBody[body];

  return (
    <svg
      viewBox="0 0 320 140"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 127 H320" stroke="currentColor" strokeWidth="1.5" opacity="0.28" />
      <path
        d={art.outline}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {art.glass.map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth="1.8" opacity="0.7" />
      ))}
      {art.extras?.map((d) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.55"
          strokeLinecap="round"
        />
      ))}
      {art.wheels.map((wheel) => (
        <g key={`${wheel.x}-${wheel.y}`}>
          <circle
            cx={wheel.x}
            cy={wheel.y}
            r={art.wheelR}
            stroke="currentColor"
            strokeWidth="2.4"
          />
          <circle
            cx={wheel.x}
            cy={wheel.y}
            r={art.wheelR * 0.42}
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.7"
          />
        </g>
      ))}
    </svg>
  );
}
