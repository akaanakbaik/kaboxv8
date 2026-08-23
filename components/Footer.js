import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 border-t border-white/[0.08] px-6 py-7 text-white/40 sm:flex-row sm:items-center sm:justify-between md:px-10">
      <div className="flex items-center gap-2 text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-200/80" />
        <span>Kabox</span>
        <span className="text-white/20">•</span>
        <span>Media cloud yang tenang.</span>
      </div>
      <div className="flex items-center gap-4 text-[11px] font-medium">
        <Link href="https://github.com/akaanakbaik/kaboxv8" target="_blank" rel="noreferrer" className="transition hover:text-white">Open source</Link>
        <Link href="https://github.com/akaanakbaik" target="_blank" rel="noreferrer" className="transition hover:text-white">Dibuat oleh akaanakbaik</Link>
      </div>
    </footer>
  );
}
