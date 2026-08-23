"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playMicroSound } from "@/lib/microSound";
import { triggerHaptic } from "@/lib/haptics";

const menuItems = [
  { label: "Unggah media", detail: "Kirim file atau tautan", href: "/", icon: "arrow" },
  { label: "Dokumentasi", detail: "Pelajari cara kerja Kabox", href: "https://github.com/akaanakbaik/kaboxv8", icon: "book" },
  { label: "Status layanan", detail: "Semua sistem beroperasi", href: "#status", icon: "pulse" },
  { label: "GitHub", detail: "Lihat proyek open-source", href: "https://github.com/akaanakbaik/kaboxv8", icon: "code" }
];

function MenuIcon({ type }) {
  if (type === "book") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" stroke="currentColor" strokeWidth="1.7" /><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20M8 7h8M8 10.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
  if (type === "pulse") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4"><path d="M3 12h4l2-6 4 12 2-6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (type === "code") return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4"><path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Sidebar({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[60] cursor-default bg-[#02030a]/65 backdrop-blur-sm" aria-label="Tutup menu" />
          <motion.aside initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 28 }} transition={{ type: "spring", stiffness: 320, damping: 30 }} className="glass-panel fixed right-3 top-3 z-[70] flex h-[calc(100vh-24px)] w-[min(390px,calc(100vw-24px))] flex-col rounded-[28px] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200/70">Kabox space</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Jelajahi ruangmu.</h2>
              </div>
              <button onPointerDown={() => triggerHaptic("tap")} onClick={() => { playMicroSound("tap"); onClose(); }} className="haptic-press focus-ring flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.06] text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="Tutup menu"><svg viewBox="0 0 24 24" fill="none" className="h-4 w-4"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></button>
            </div>
            <nav className="mt-5 flex flex-col gap-2" aria-label="Navigasi utama">
              {menuItems.map((item, index) => {
                const external = item.href.startsWith("http");
                return (
                  <motion.a key={`${item.label}-${index}`} href={item.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onPointerDown={() => triggerHaptic("tap")} onClick={() => { playMicroSound("tap"); onClose(); }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="haptic-press focus-ring group flex items-center gap-3 rounded-2xl border border-transparent px-3 py-3.5 transition hover:border-white/10 hover:bg-white/[0.065]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.06] text-cyan-100/80 transition group-hover:border-cyan-200/20 group-hover:bg-cyan-200/10 group-hover:text-cyan-100"><MenuIcon type={item.icon} /></span>
                    <span className="min-w-0 flex-1"><span className="block text-sm font-medium text-white/90">{item.label}</span><span className="mt-1 block truncate text-xs text-white/38">{item.detail}</span></span>
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-white/65"><path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.a>
                );
              })}
            </nav>
            <div className="mt-auto rounded-[22px] border border-cyan-200/10 bg-gradient-to-br from-cyan-200/[0.1] via-violet-300/[0.08] to-transparent p-4">
              <div className="flex items-center gap-2 text-cyan-100/80"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" /><span className="text-[10px] font-semibold uppercase tracking-[0.18em]">Semua sistem normal</span></div>
              <p className="mt-3 text-xs leading-relaxed text-white/45">Kabox dibuat untuk berbagi media tanpa friksi. Cepat, sederhana, dan siap saat kamu butuhkan.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
