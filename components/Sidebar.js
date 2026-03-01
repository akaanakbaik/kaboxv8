"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function Sidebar({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] cursor-pointer touch-none"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-[100dvh] w-[75%] md:w-[350px] bg-[#161616] border-l border-white/10 z-[9999] p-8 shadow-2xl overflow-y-auto flex flex-col"
          >
            <div className="flex justify-end mb-10">
              <button 
                onClick={onClose} 
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {menu.map((item, i) => (
                <Link 
                  key={i} 
                  href={item.path} 
                  onClick={onClose} 
                  className="text-lg md:text-xl font-medium text-white/70 hover:text-white transition-colors"
                >
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
