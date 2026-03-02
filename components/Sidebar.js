"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function Sidebar({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const menu = [
    { name: "Beranda", path: "/" },
    { name: "API Docs", path: "/docs" },
    { name: "Kebijakan Privasi", path: "/privacy" },
    { name: "Syarat & Ketentuan", path: "/terms" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998] cursor-pointer touch-none" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-[100dvh] w-4/5 md:w-[320px] bg-[#0a0a0a]/95 backdrop-blur-3xl border-l border-white/10 z-[9999] p-6 shadow-2xl overflow-y-auto flex flex-col">
            <div className="flex justify-end mb-8">
              <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 text-white/70 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              {menu.map((item, i) => (
                <Link key={i} href={item.path} onClick={onClose} className="text-sm md:text-base font-semibold text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all">
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
