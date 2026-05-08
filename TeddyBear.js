export default function TeddyBear({ size = 80, color = "pink" }) {
  const main = color === "pink" ? "#FFB3CC" : "#B3CCFF";
  const dark = color === "pink" ? "#FF6B9D" : "#6B9DFF";
  const face = "#FFF0F5";
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" fill="none">
      {/* Ears */}
      <circle cx="22" cy="28" r="14" fill={main} />
      <circle cx="22" cy="28" r="8"  fill={dark} opacity="0.5" />
      <circle cx="78" cy="28" r="14" fill={main} />
      <circle cx="78" cy="28" r="8"  fill={dark} opacity="0.5" />
      {/* Head */}
      <circle cx="50" cy="45" r="34" fill={main} />
      <circle cx="50" cy="45" r="34" fill="url(#faceGrad)" />
      {/* Face patch */}
      <ellipse cx="50" cy="55" rx="16" ry="12" fill={face} opacity="0.7" />
      {/* Eyes */}
      <circle cx="38" cy="41" r="5" fill={dark} />
      <circle cx="62" cy="41" r="5" fill={dark} />
      <circle cx="39.5" cy="39.5" r="2" fill="white" />
      <circle cx="63.5" cy="39.5" r="2" fill="white" />
      {/* Nose */}
      <ellipse cx="50" cy="51" rx="4" ry="2.5" fill={dark} />
      {/* Smile */}
      <path d="M44 56 Q50 62 56 56" stroke={dark} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Blush */}
      <circle cx="33" cy="48" r="5" fill={dark} opacity="0.2" />
      <circle cx="67" cy="48" r="5" fill={dark} opacity="0.2" />
      {/* Body */}
      <ellipse cx="50" cy="90" rx="26" ry="22" fill={main} />
      {/* Belly */}
      <ellipse cx="50" cy="91" rx="14" ry="12" fill={face} opacity="0.6" />
      {/* Arms */}
      <ellipse cx="20" cy="85" rx="10" ry="6" fill={main} transform="rotate(-30 20 85)" />
      <ellipse cx="80" cy="85" rx="10" ry="6" fill={main} transform="rotate(30 80 85)" />
      {/* Heart on belly */}
      <text x="50" y="96" textAnchor="middle" fontSize="12" fill={dark}>♥</text>
      <defs>
        <radialGradient id="faceGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  );
}