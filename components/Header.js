"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-dark/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6">
      <Link href="/" className="flex items-center gap-3">
        <Image 
          src="https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png" 
          alt="Kabox Logo" 
          width={32} 
          height={32} 
          className="w-8 h-8 object-contain" 
          unoptimized 
        />
        <span className="text-xl font-bold tracking-wide">kabox</span>
      </Link>
      <button 
        onClick={() => setSidebarOpen(true)} 
        className="p-2 hover:bg-white/10 rounded-md transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
