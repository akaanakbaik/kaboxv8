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
      path: "/api/upload/file",
      desc: "Mengunggah hingga 5 berkas media melalui multipart/form-data. Maksimal 30MB per berkas. ID media berupa token unik 7 karakter. Masa simpan default exp=1day.",
      curl: "curl -X POST https://kabox.akadev.me/api/upload/file \\\n  -H 'Expect:' \\\n  -F 'files=@gambar.jpg' \\\n  -F 'exp=1day'",
      output: '{\n  "success": true,\n  "files": [{\n    "originalName": "gambar.jpg",\n    "url": "https://kabox.akadev.me/files/a1b2c3_.jpg",\n    "mime": "image/jpeg",\n    "size": 284392,\n    "expiresAt": "2026-08-24T00:00:00.000Z"\n  }]\n}'
    },
    {
      title: "Unggah via Tautan (URL)",
      method: "POST",
      path: "/api/upload/url",
      desc: "Menarik hingga 5 media dari URL CDN publik dengan ekstensi media yang jelas. Masa simpan default exp=1day.",
      curl: "curl -X POST https://kabox.akadev.me/api/upload/url \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"urls\": [\"https://contoh.com/video.mp4\"], \"exp\": \"1day\"}'",
      output: '{\n  "success": true,\n  "files": [{\n    "originalName": "video.mp4",\n    "url": "https://kabox.akadev.me/files/m4n5o6-.mp4",\n    "mime": "video/mp4",\n    "size": 5242880,\n    "expiresAt": "2026-08-24T00:00:00.000Z"\n  }]\n}'
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

      <section className="w-full max-w-2xl rounded-2xl border border-white/5 bg-[#0a0a0a]/60 p-5 md:p-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">Masa simpan</p>
            <h2 className="mt-2 text-sm md:text-base font-bold text-white/90">Parameter <code>exp</code></h2>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/45">Default web dan API: exp=1day</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
          {[["10minute", "10 menit"], ["1hour", "1 jam"], ["1day", "1 hari · default"], ["1week", "1 minggu"], ["1month", "30 hari"], ["never", "tanpa expiry operasional"]].map(([token, label]) => (
            <div key={token} className="rounded-xl border border-white/5 bg-white/[0.025] px-3 py-3">
              <code className="text-[10px] text-white/80">{token}</code>
              <p className="mt-1 text-[9px] text-white/35">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] leading-relaxed text-white/35">Gunakan <code>exp</code> pada kedua endpoint. <code>retentionDays</code> masih diterima untuk kompatibilitas client lama dan akan dihapus pada versi mayor berikutnya.</p>
      </section>
    </div>
  );
}
