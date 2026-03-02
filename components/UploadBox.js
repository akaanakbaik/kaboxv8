"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const expiryOptions = [
  { label: "10 Menit", value: "10m" },
  { label: "1 Jam", value: "1h" },
  { label: "1 Hari", value: "1d" },
  { label: "1 Minggu", value: "1w" },
  { label: "Selamanya", value: "never" }
];

export default function UploadBox() {
  const [activeTab, setActiveTab] = useState("local");
  const [files, setFiles] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [expiry, setExpiry] = useState("1d");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const fileInputRef = useRef(null);

  const addNotif = (msg, type = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(p => [{ id, msg, type }, ...p]);
    setTimeout(() => setNotifications(p => p.filter(n => n.id !== id)), 4000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (activeTab !== "local") setActiveTab("local");
    const dropped = Array.from(e.dataTransfer.files);
    if (files.length + dropped.length > 5) return addNotif("Maksimal 5 media", "error");
    setFiles(p => [...p, ...dropped].slice(0, 5));
  };

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files);
    if (files.length + selected.length > 5) return addNotif("Maksimal 5 media", "error");
    setFiles(p => [...p, ...selected].slice(0, 5));
  };

  const removeFile = (idx) => setFiles(files.filter((_, i) => i !== idx));

  const startUpload = async () => {
    if (activeTab === "local" && files.length === 0) return addNotif("Pilih media dahulu", "error");
    if (activeTab === "url" && !urlInput) return addNotif("Masukkan tautan valid", "error");
    
    setIsUploading(true);
    setProgress(0);
    const newResults = [];

    if (activeTab === "local") {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        try {
          const url = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open("POST", "https://api.kabox.my.id/api/upload", true);
            xhr.setRequestHeader("x-expire", expiry);
            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                const fileProg = e.loaded / e.total;
                setProgress(Math.round(((i + fileProg) / files.length) * 100));
              }
            };
            xhr.onload = () => {
              if (xhr.status === 200) resolve(JSON.parse(xhr.responseText).url);
              else reject(`Status ${xhr.status}`);
            };
            xhr.onerror = () => reject("Koneksi terputus");
            xhr.send(formData);
          });
          newResults.push({ name: file.name, url });
          addNotif(`Berhasil: ${file.name}`);
        } catch (err) {
          addNotif(`Gagal: ${file.name} - ${err}`, "error");
        }
      }
    } else {
      setProgress(40);
      try {
        const res = await fetch("https://api.kabox.my.id/api/upload/url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: urlInput, expire: expiry })
        });
        setProgress(80);
        const data = await res.json();
        if (res.ok && data.success) {
          newResults.push({ name: data.metadata?.original_name || "remote_media", url: data.url });
          addNotif("Tautan berhasil ditarik");
        } else {
          throw new Error(data.message || "Peladen menolak tautan");
        }
      } catch (err) {
        addNotif(err.message, "error");
      }
      setProgress(100);
    }

    setResults(p => [...newResults, ...p]);
    setIsUploading(false);
    if (activeTab === "local") setFiles([]);
    else setUrlInput("");
    setTimeout(() => setProgress(0), 1000);
  };

  const copy = (t) => {
    navigator.clipboard.writeText(t);
    addNotif("Tautan disalin!");
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 relative flex flex-col items-center">
      <div className="fixed top-20 right-4 md:right-8 z-[10000] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div key={n.id} initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`pointer-events-auto px-4 py-2.5 rounded-xl backdrop-blur-xl shadow-2xl flex items-center gap-2.5 text-[10px] md:text-xs font-bold tracking-wide border ${n.type === "error" ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-[#1a1a1a]/80 border-white/10 text-white"}`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${n.type === "error" ? "bg-red-500" : "bg-green-500"}`} />
              {n.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="w-full bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-4 md:p-6 shadow-2xl overflow-hidden">
        <div className="flex bg-[#121212] rounded-2xl p-1 mb-5 border border-white/5">
          <button onClick={() => !isUploading && setActiveTab("local")} className={`flex-1 py-2.5 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-xl transition-all ${activeTab === "local" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/70"}`} disabled={isUploading}>Lokal</button>
          <button onClick={() => !isUploading && setActiveTab("url")} className={`flex-1 py-2.5 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-xl transition-all ${activeTab === "url" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/70"}`} disabled={isUploading}>Tautan URL</button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "local" ? (
            <motion.div key="local" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} className={`relative group border border-dashed rounded-[1.5rem] p-8 md:p-10 flex flex-col items-center justify-center transition-all ${isDragging ? "border-white/50 bg-white/5" : "border-white/10 bg-[#121212]/50 hover:border-white/20 hover:bg-white/[0.02]"}`}>
                <button onClick={() => fileInputRef.current.click()} disabled={isUploading} className="relative z-10 bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100">Telusuri Media</button>
                <p className="mt-4 text-[9px] md:text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] text-center">Maksimal 5 Berkas • Seret & Lepas</p>
                <input type="file" multiple ref={fileInputRef} onChange={handleFileSelect} className="hidden" disabled={isUploading} />
              </div>
              
              {files.length > 0 && !isUploading && (
                <div className="flex flex-col gap-2 mt-4 max-h-40 overflow-y-auto no-scrollbar pr-1">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#161616] px-4 py-3 rounded-xl border border-white/5">
                      <span className="text-[10px] md:text-xs truncate w-4/5 font-medium text-white/70">{f.name}</span>
                      <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-300 transition-colors p-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="url" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3">
              <div className="relative">
                <input type="url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} disabled={isUploading} placeholder="https://contoh.com/media.mp4" className="w-full bg-[#121212] border border-white/10 rounded-[1.5rem] px-5 py-4 text-[10px] md:text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all" />
              </div>
              <p className="text-[9px] font-medium text-white/30 uppercase tracking-widest text-center mt-2">Peladen akan menarik media secara langsung</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex gap-3">
          <div className="relative w-1/3">
            <button onClick={() => !isUploading && setIsSelectOpen(!isSelectOpen)} disabled={isUploading} className="w-full bg-[#161616] border border-white/10 rounded-xl py-3 px-4 text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex justify-between items-center hover:bg-white/5 transition-all">
              <span className="truncate">{expiryOptions.find(o => o.value === expiry).label}</span>
              <svg className={`w-3 h-3 ml-2 shrink-0 transition-transform ${isSelectOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <AnimatePresence>
              {isSelectOpen && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute bottom-full left-0 w-full mb-2 bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                  {expiryOptions.map(opt => (
                    <button key={opt.value} onClick={() => { setExpiry(opt.value); setIsSelectOpen(false); }} className="w-full text-left px-4 py-3 text-[9px] md:text-[10px] font-bold text-white/70 hover:bg-white/10 hover:text-white transition-colors border-b border-white/5 last:border-0">{opt.label}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={startUpload} disabled={(activeTab === "local" && files.length === 0) || (activeTab === "url" && !urlInput) || isUploading} className={`w-2/3 py-3 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all overflow-hidden relative ${((activeTab === "local" && files.length === 0) || (activeTab === "url" && !urlInput) || isUploading) ? "bg-[#161616] text-white/20" : "bg-white text-black hover:opacity-90 active:scale-[0.98]"}`}>
            {isUploading ? (
              <span className="relative z-10 text-white mix-blend-difference">{progress}% Memproses</span>
            ) : "Mulai Unggah"}
            {isUploading && <motion.div className="absolute top-0 left-0 h-full bg-white/20" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "linear", duration: 0.2 }} />}
          </button>
        </div>
      </div>

      <div className="w-full mt-6 space-y-3">
        <AnimatePresence>
          {results.map((res, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className="w-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col gap-3 group">
              <span className="text-[10px] font-bold text-white/50 truncate uppercase tracking-widest w-full">{res.name}</span>
              <div className="flex items-center gap-2 w-full">
                <div className="flex-1 bg-[#121212] border border-white/5 rounded-lg px-3 py-2.5 text-[10px] font-mono text-white/70 truncate select-all">{res.url}</div>
                <button onClick={() => copy(res.url)} className="p-2.5 bg-[#161616] hover:bg-white/10 rounded-lg transition-colors border border-white/5 shrink-0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg></button>
                <a href={res.url} target="_blank" className="p-2.5 bg-[#161616] hover:bg-white/10 rounded-lg transition-colors border border-white/5 shrink-0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg></a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
