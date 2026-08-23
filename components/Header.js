"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { playMicroSound } from "@/lib/microSound";
import { triggerHaptic } from "@/lib/haptics";

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M12 2.8 13.9 10l7.3 2-7.3 2-1.9 7.2L10.1 14l-7.3-2 7.3-2L12 2.8Z" fill="currentColor" />
      <path d="m19.2 3.5.6 2.1 2.1.6-2.1.6-.6 2.1-.6-2.1-2.1-.6 2.1-.6.6-2.1Z" fill="currentColor" opacity=".65" />
    </svg>
  );
}

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 md:px-10">
        <div className="glass-panel mx-auto flex h-[62px] max-w-7xl items-center justify-between rounded-[22px] px-4 sm:px-5">
          <Link href="/" className="haptic-press focus-ring group flex items-center gap-3 rounded-xl" aria-label="Kabox beranda">
            <motion.div whileHover={{ rotate: 8, scale: 1.06 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[13px] bg-gradient-to-br from-white via-cyan-100 to-violet-300 p-[1px] shadow-[0_0_24px_rgba(124,231,255,0.22)]">
              <div className="flex h-full w-full items-center justify-center rounded-[12px] bg-[#14182b]">
                <Image src="https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png" alt="Kabox" fill className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110" unoptimized />
              </div>
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="text-[17px] font-semibold tracking-[-0.045em] text-white">kabox</span>
              <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">media cloud</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-[10px] font-medium text-white/55 sm:flex">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" /></span>
              Sistem online
            </div>
            <button onPointerDown={() => triggerHaptic("tap")} onClick={() => { playMicroSound("tap"); setSidebarOpen(true); }} className="haptic-press focus-ring group flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.06] text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.11] hover:text-white active:scale-95" aria-label="Buka menu">
              <SparkleIcon />
            </button>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
