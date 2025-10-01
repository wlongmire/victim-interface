// Outlined, inverted color sound icon SVG
export default function SoundIcon({ opacity = 1 }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={{display:'block', opacity}} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer unfilled circle */}
      <circle cx="16" cy="16" r="14" stroke="#fff" strokeWidth="1.2" opacity="0.45" fill="none" />
      {/* Sound icon */}
      <g transform="translate(4 4)">
        <path d="M5 9V15H9L14 20V4L9 9H5Z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" opacity="0.55"/>
        <path d="M17.5 8.5C18.8807 9.88071 18.8807 12.1193 17.5 13.5M19.5 6.5C22.5376 9.53757 22.5376 14.4624 19.5 17.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
      </g>
    </svg>
  );
}
