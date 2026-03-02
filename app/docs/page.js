"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ApiDocs() {
  const [toast, setToast] = useState({ show: false, msg: "" });

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Disalin ke papan klip");
  };

  const endpoints = [
    {
      title: "Unggah Media Lokal",
      method: "POST",
      path: "/api/upload",
      desc: "Mengunggah berkas fisik secara multi-part form data.",
      curl: "curl -X POST https://api.kabox.my.id/api/upload \\\n  -H 'x-expire: 1d' \\\n  -F 'file=@gambar.jpg'",
      output: '{\n  "success": true,\n  "metadata": {\n    "original_name": "gambar.jpg",\n    "size_formatted": "0.10 MB"\n  },\n  "url": "https://api.kabox.my.id/file/xyz.jpg"\n}'
    },
    {
      title: "Unggah via Tautan (URL)",
      method: "POST",
      path: "/api/upload/url",
      desc: "Menarik media dari tautan eksternal ke peladen lokal.",
      curl: "curl -X POST https://api.kabox.my.id/api/upload/url \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"url\": \"https://contoh.com/video.mp4\", \"expire\": \"1h\"}'",
      output: '{\n  "success": true,\n  "metadata": {\n    "source_url": "https://contoh.com/video.mp4",\n    "size_formatted": "5.00 MB"\n  },\n  "url": "https://api.kabox.my.id/file/uvw.mp4"\n}'
    },
    {
      title: "Telemetri Sistem",
      method: "GET",
      path: "/api/health",
      desc: "Melihat status peladen, RAM, dan laporan keamanan langsung.",
      curl: "curl -s https://api.kabox.my.id/api/health",
      output: '{\n  "status": "operational",\n  "storage": {\n    "total_size_db": "1.24 GB"\n  },\n  "memory_diagnostics": {\n    "used_percentage": "14.20%"\n  }\n}'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] w-full pt-20 px-4 md:px-6 relative">
      <AnimatePresence>
        {toast.show && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-24 right-4 md:right-8 z-[9999] px-4 py-2.5 rounded-xl bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 text-white text-[10px] md:text-xs font-bold tracking-wide shadow-2xl flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-8 md:mb-12 w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-black mb-3 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">API Terbuka</h1>
        <p className="text-white/40 text-[10px] md:text-xs leading-relaxed max-w-md mx-auto">Integrasi canggih, minim penundaan. Otomatisasi pangkalan data aplikasi Anda dengan Kabox REST API.</p>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-6 pb-10">
        {endpoints.map((api, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl w-full overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-sm md:text-base font-bold text-white/90">{api.title}</h2>
                <p className="text-[10px] text-white/40">{api.desc}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2.5 py-1 text-[9px] font-black tracking-widest rounded-lg ${api.method === 'GET' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{api.method}</span>
                <span className="text-[10px] font-mono bg-[#121212] px-2.5 py-1 rounded-lg border border-white/5 text-white/60">{api.path}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative group rounded-xl bg-[#121212] border border-white/5 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Permintaan</span>
                  <button onClick={() => copy(api.curl)} className="text-[9px] text-white/30 hover:text-white transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Salin</button>
                </div>
                <pre className="text-[10px] text-white/60 font-mono overflow-x-auto no-scrollbar whitespace-pre">{api.curl}</pre>
              </div>
              <div className="relative group rounded-xl bg-[#121212] border border-white/5 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Respon JSON</span>
                  <button onClick={() => copy(api.output)} className="text-[9px] text-white/30 hover:text-white transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Salin</button>
                </div>
                <pre className="text-[10px] text-white/60 font-mono overflow-x-auto no-scrollbar whitespace-pre">{api.output}</pre>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
