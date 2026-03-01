"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Sidebar({ isOpen, onClose }) {
  const menu = [
    { name: "Beranda", path: "/" },
    { name: "API Docs", path: "/docs" },
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[70%] md:w-[300px] bg-soft border-l border-white/10 z-[100] p-8 shadow-2xl"
          >
            <div className="flex justify-end mb-10">
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {menu.map((item, i) => (
                <Link key={i} href={item.path} onClick={onClose} className="text-xl font-medium hover:text-white/60 transition-colors">
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
