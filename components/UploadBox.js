"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const expiryOptions = [
  { label: "10 Menit", value: "10m" },
  { label: "1 Jam", value: "1h" },
  { label: "1 Hari", value: "1d" },
  { label: "1 Minggu", value: "1w" },
  { label: "Selamanya", value: "never" }
];

export default function UploadBox() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [expiry, setExpiry] = useState("1d");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [targetProgress, setTargetProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (displayProgress < targetProgress) {
      const timer = setTimeout(() => setDisplayProgress(prev => prev + 1), 5);
      return () => clearTimeout(timer);
    }
  }, [displayProgress, targetProgress]);

  const addNotif = (msg, type = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [{ id, msg, type }, ...prev]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (files.length + dropped.length > 5) return addNotif("Maksimal 5 media saja", "error");
    setFiles(prev => [...prev, ...dropped].slice(0, 5));
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 5) return addNotif("Maksimal 5 media saja", "error");
    setFiles(prev => [...prev, ...selectedFiles].slice(0, 5));
  };

  const removeFile = (index) => setFiles(files.filter((_, i) => i !== index));

  const startUpload = async () => {
    if (files.length === 0) return;
    setIsUploading(true);
    setTargetProgress(0);
    setDisplayProgress(0);
    setResults([]);

    const newResults = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("POST", "https://api.kabox.my.id/api/upload", true);
        xhr.setRequestHeader("x-expire", expiry);
        
        const uploadPromise = new Promise((resolve, reject) => {
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const p = ((i * 100) + (e.loaded / e.total * 100)) / files.length;
              setTargetProgress(Math.round(p));
            }
          };
          xhr.onload = () => {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText).url);
            } else {
              reject(`Peladen menolak (Status: ${xhr.status})`);
            }
          };
          xhr.onerror = () => reject("Koneksi terputus. Pastikan berkas tidak terlalu besar.");
          xhr.send(formData);
        });

        const url = await uploadPromise;
        newResults.push({ name: file.name, url });
      } catch (err) {
        addNotif(`Gagal: ${file.name} - ${err}`, "error");
      }
    }

    setTargetProgress(100);
    setTimeout(() => {
      setResults(newResults);
      setIsUploading(false);
      setFiles([]);
      if (newResults.length > 0) addNotif("Media berhasil mengudara!");
    }, 600);
  };

  const copy = (t) => {
    navigator.clipboard.writeText(t);
    addNotif("Tautan disalin!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 relative">
      <div className="fixed top-24 right-6 z-[10000] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className={`pointer-events-auto px-5 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 min-w-[200px] ${
                n.type === "error" ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-white/5 border-white/10 text-white"
              }`}
            >
              <div className={`w-2 h-2 rounded-full animate-pulse ${n.type === "error" ? "bg-red-500" : "bg-green-500"}`} />
              <span className="text-xs font-bold tracking-tight">{n.msg}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative group overflow-hidden border-2 border-dashed rounded-[2.5rem] p-10 md:p-14 flex flex-col items-center transition-all duration-500 ${
          isDragging ? "border-white bg-white/5 scale-[1.01]" : "border-white/10 bg-[#121212]/50"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current.click()}
          className="relative z-10 bg-white text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-white/20 transition-all"
          disabled={isUploading}
        >
          Pilih Media
        </motion.button>
        <p className="mt-6 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Maksimal 5 Berkas • NAT Storage</p>
        <input type="file" multiple ref={fileInputRef} onChange={handleFileSelect} className="hidden" disabled={isUploading} />
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && !isUploading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3 mt-6">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-[#161616] p-4 rounded-2xl border border-white/10 shadow-sm">
                <span className="text-xs md:text-sm truncate w-3/4 font-medium text-white/80">{f.name}</span>
                <button onClick={() => removeFile(i)} className="text-red-400 p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <button
            onClick={() => !isUploading && setIsSelectOpen(!isSelectOpen)}
            className="w-full bg-[#161616] border border-white/10 rounded-2xl p-4 text-xs font-bold uppercase tracking-widest flex justify-between items-center hover:bg-white/5 transition-all"
            disabled={isUploading}
          >
            <span>Exp: {expiryOptions.find(o => o.value === expiry).label}</span>
            <svg className={`w-4 h-4 transition-transform ${isSelectOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <AnimatePresence>
            {isSelectOpen && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full left-0 w-full mb-3 bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
                {expiryOptions.map(opt => (
                  <button key={opt.value} onClick={() => { setExpiry(opt.value); setIsSelectOpen(false); }} className="w-full text-left p-4 text-xs font-bold hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">{opt.label}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={startUpload}
          disabled={files.length === 0 || isUploading}
          className={`flex-[1.5] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
            files.length === 0 || isUploading ? "bg-white/5 text-white/20 cursor-not-allowed" : "bg-white text-black hover:scale-[1.02]"
          }`}
        >
          {isUploading ? `Memproses ${displayProgress}%` : "Mulai Unggah"}
        </motion.button>
      </div>

      <AnimatePresence>
        {isUploading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div className="h-full bg-white shadow-[0_0_15px_white]" initial={{ width: 0 }} animate={{ width: `${displayProgress}%` }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 space-y-4">
        {results.map((res, i) => (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} key={i} className="bg-[#121212] border border-white/10 p-5 rounded-[1.5rem] flex flex-col md:flex-row items-center gap-4 group">
            <span className="text-[10px] font-bold text-white/40 truncate flex-1 uppercase tracking-wider">{res.name}</span>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="flex-1 md:w-48 bg-black/40 border border-white/5 rounded-xl px-4 py-2 text-[10px] font-mono text-white/60 overflow-x-auto no-scrollbar whitespace-nowrap leading-relaxed">{res.url}</div>
              <button onClick={() => copy(res.url)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg></button>
              <a href={res.url} target="_blank" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg></a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
