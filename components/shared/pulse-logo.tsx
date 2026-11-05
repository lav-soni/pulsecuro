export function PulseLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-label="PulseCuro logo">
      <rect x="1" y="1" width="30" height="30" rx="15" fill="#D81616" />
      <path d="M5 17H9.5L12.3 9.5L16.2 22.5L19.6 13.2H27" stroke="#F5F2EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
