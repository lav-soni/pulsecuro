import Link from "next/link";

export function FloatingSOS() {
  return (
    <Link href="/sos" aria-label="Emergency SOS" className="fixed bottom-6 right-6 z-50 sos-pulse btn-primary inline-flex items-center gap-2 font-semibold text-[15px] px-6 py-4 rounded-full shadow-lg">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8 L5 8 L7 4 L9 12 L11 7 L14 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      SOS
    </Link>
  );
}