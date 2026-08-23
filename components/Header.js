"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 z-[50] flex items-center justify-between px-5 md:px-12">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-lg">
            <Image src="https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png" alt="Kabox" fill className="object-contain transition-transform duration-500 group-hover:scale-110" unoptimized />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">kabox</span>
        </Link>
        <button onClick={() => setSidebarOpen(true)} className="p-2 md:p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all active:scale-95 border border-white/5 text-white/80 hover:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="md:w-6 md:h-6"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
