"use client";
import { motion } from "framer-motion";

export default function ApiDocs() {
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
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full pt-10">
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
            className="bg-soft border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg overflow-hidden"
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
              <div>
                <span className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2 block">Contoh Permintaan (cURL)</span>
                <div className="bg-dark border border-white/10 rounded-xl p-4 overflow-x-auto">
                  <pre className="text-xs text-white/70 font-mono whitespace-pre">{api.curl}</pre>
                </div>
              </div>
              
              <div>
                <span className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2 block">Respon JSON</span>
                <div className="bg-dark border border-white/10 rounded-xl p-4 overflow-x-auto">
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
