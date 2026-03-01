"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ApiDocs() {
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Kode disalin ke papan klip!");
  };

  const endpoints = [
    {
      title: "Unggah Media Lokal",
      method: "POST",
      path: "/api/upload",
      desc: "Mengunggah berkas fisik dari perangkat Anda ke sistem Kabox.",
      curl: 'curl -X POST https://kabox.my.id/api/upload \\\n  -H "x-expire: 1d" \\\n  -F "file=@gambar.jpg"',
      output: '{\n  "author": "aka",\n  "email": "akaanakbaik17@proton.me",\n  "success": true,\n  "message": "Media successfully processed and secured",\n  "metadata": {\n    "id": "abc123xyz",\n    "original_name": "gambar.jpg",\n    "mime_type": "image/jpeg",\n    "size_bytes": 102400,\n    "size_formatted": "0.10 MB",\n    "uploaded_at": "...",\n    "expires_at": "..."\n  },\n  "url": "https://kabox.my.id/file/abc123xyz.jpg"\n}'
    },
    {
      title: "Unggah via Tautan",
      method: "POST",
      path: "/api/upload/url",
      desc: "Menyalin media dari peladen eksternal langsung ke penyimpanan Kabox.",
      curl: 'curl -X POST https://kabox.my.id/api/upload/url \\\n  -H "Content-Type: application/json" \\\n  -d \'{"url": "https://contoh.com/video.mp4", "expire": "1h"}\'',
      output: '{\n  "author": "aka",\n  "email": "akaanakbaik17@proton.me",\n  "success": true,\n  "message": "Remote media successfully fetched and secured",\n  "metadata": {\n    "id": "def456uvw",\n    "source_url": "https://contoh.com/video.mp4",\n    "mime_type": "video/mp4",\n    "size_bytes": 5242880,\n    "size_formatted": "5.00 MB",\n    "uploaded_at": "...",\n    "expires_at": "..."\n  },\n  "url": "https://kabox.my.id/file/def456uvw.mp4"\n}'
    },
    {
      title: "Telemetri Sistem",
      method: "GET",
      path: "/api/health",
      desc: "Memeriksa status kesehatan peladen, penggunaan memori, dan log keamanan.",
      curl: 'curl -s https://kabox.my.id/api/health',
      output: '{\n  "author": "aka",\n  "email": "akaanakbaik17@proton.me",\n  "status": "operational",\n  "timestamp": "...",\n  "response_time_ms": "12.34",\n  "infrastructure": { ... },\n  "storage": { ... },\n  "memory_diagnostics": { ... },\n  "security_firewall": { ... }\n}'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full pt-10 relative">
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-bold tracking-wide border bg-white/10 text-white border-white/20 backdrop-blur-md"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-10 px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4 tracking-tight">
          Dokumentasi API
        </h1>
        <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Integrasikan sistem Anda dengan peladen Kabox menggunakan antarmuka pemrograman aplikasi kami yang cepat dan aman.
        </p>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-8">
        {endpoints.map((api, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#161616] border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold mb-1">{api.title}</h2>
                <p className="text-xs md:text-sm text-white/50">{api.desc}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-3 py-1 text-xs font-black tracking-widest rounded-md ${api.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                  {api.method}
                </span>
                <code className="text-xs md:text-sm bg-dark px-3 py-1 rounded-md border border-white/5 text-white/80">
                  {api.path}
                </code>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Contoh Permintaan (cURL)</span>
                  <button onClick={() => copyToClipboard(api.curl)} className="text-xs font-bold text-white/50 hover:text-white transition-colors flex items-center gap-1.5 opacity-0 group-hover:opacity-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Salin
                  </button>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 overflow-x-auto">
                  <pre className="text-xs text-white/70 font-mono whitespace-pre">{api.curl}</pre>
                </div>
              </div>
              
              <div className="relative group mt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Respon JSON</span>
                  <button onClick={() => copyToClipboard(api.output)} className="text-xs font-bold text-white/50 hover:text-white transition-colors flex items-center gap-1.5 opacity-0 group-hover:opacity-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Salin
                  </button>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 overflow-x-auto">
                  <pre className="text-xs text-white/70 font-mono whitespace-pre">{api.output}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
