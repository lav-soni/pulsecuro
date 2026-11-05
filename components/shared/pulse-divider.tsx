export function PulseDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <svg className="pulse-line" width="280" height="32" viewBox="0 0 280 32" fill="none">
        <path d="M0 16 L90 16 L110 6 L130 26 L150 10 L170 22 L190 16 L280 16" stroke="#0F5E5C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.55" />
      </svg>
    </div>
  );
}
