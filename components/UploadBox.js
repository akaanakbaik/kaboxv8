"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadBox() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [expiry, setExpiry] = useState("1d");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const fileInputRef = useRef(null);

  const expiryOptions = [
    { label: "10 Menit", value: "10m" },
    { label: "1 Jam", value: "1h" },
    { label: "1 Hari", value: "1d" },
    { label: "1 Minggu", value: "1w" },
    { label: "Selamanya", value: "never" }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (files.length + droppedFiles.length > 5) return alert("Maksimal 5 media.");
    setFiles((prev) => [...prev, ...droppedFiles].slice(0, 5));
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 5) return alert("Maksimal 5 media.");
    setFiles((prev) => [...prev, ...selectedFiles].slice(0, 5));
  };

  const removeFile = (index) => setFiles(files.filter((_, i) => i !== index));

  const startUpload = async () => {
    if (files.length === 0) return;
    setIsUploading(true);
    setProgress(0);
    setResults([]);

    const newResults = [];
    const totalFiles = files.length;

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://kabox.my.id/api/upload", true);
        xhr.setRequestHeader("x-expire", expiry);

        const uploadPromise = new Promise((resolve, reject) => {
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const fileProgress = (event.loaded / event.total) * 100;
              const overallProgress = ((i * 100) + fileProgress) / totalFiles;
              setProgress(Math.round(overallProgress));
            }
          };
          xhr.onload = () => {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              response.success ? resolve(response.url) : reject(response.error);
            } else reject("Upload gagal");
          };
          xhr.onerror = () => reject("Network error");
          xhr.send(formData);
        });

        const url = await uploadPromise;
        newResults.push({ name: file.name, url });
      } catch (error) {
        alert(`Gagal upload ${file.name}: ${error}`);
      }
    }

    setResults(newResults);
    setIsUploading(false);
    setFiles([]);
    setProgress(0);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Tautan Disalin!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full border-2 border-dashed rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center transition-colors ${
          isDragging ? "border-white bg-white/5" : "border-white/20 bg-soft"
        }`}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white text-dark px-6 py-3 rounded-full font-bold text-sm hover:bg-white/90 transition-colors shadow-lg"
            disabled={isUploading}
          >
            Pilih Media
          </button>
        </motion.div>
        <p className="mt-4 text-xs md:text-sm text-white/50">Atau seret & lepas di sini (Max 5)</p>
        <input type="file" multiple ref={fileInputRef} onChange={handleFileSelect} className="hidden" disabled={isUploading} />
      </div>

      <AnimatePresence>
        {files.length > 0 && !isUploading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-xs md:text-sm truncate w-3/4">{f.name}</span>
                <button onClick={() => removeFile(i)} className="text-danger p-1 hover:bg-white/5 rounded-md transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-56">
          <button
            onClick={() => !isUploading && setIsSelectOpen(!isSelectOpen)}
            className="w-full bg-soft border border-white/20 rounded-xl p-3 text-sm flex justify-between items-center hover:bg-white/5 transition-colors"
            disabled={isUploading}
          >
            {expiryOptions.find((o) => o.value === expiry)?.label}
            <svg className={`w-4 h-4 transition-transform ${isSelectOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <AnimatePresence>
            {isSelectOpen && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute top-full left-0 w-full mt-2 bg-soft border border-white/20 rounded-xl overflow-hidden z-40 shadow-xl">
                {expiryOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setExpiry(opt.value); setIsSelectOpen(false); }}
                    className="w-full text-left p-3 text-sm hover:bg-white/10 transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startUpload}
          disabled={files.length === 0 || isUploading}
          className={`w-full md:w-auto px-10 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
            files.length === 0 ? "bg-white/10 text-white/30 cursor-not-allowed" : "bg-white text-dark hover:bg-white/90"
          }`}
        >
          Mulai
        </motion.button>
      </div>

      <AnimatePresence>
        {isUploading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full bg-soft border border-white/20 rounded-full h-4 overflow-hidden relative shadow-inner">
            <motion.div className="absolute top-0 left-0 h-full bg-white" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "linear" }} />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black mix-blend-difference text-white tracking-widest">{progress}%</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 mt-6">
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest">Hasil Render</h3>
            {results.map((res, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm">
                <div className="truncate w-full md:w-1/2 text-xs md:text-sm font-medium">{res.name}</div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <input type="text" readOnly value={res.url} className="bg-dark border border-white/10 rounded-lg px-3 py-2 text-xs w-full md:w-48 outline-none text-white/70" />
                  <button onClick={() => copyToClipboard(res.url)} className="p-2.5 bg-soft hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </button>
                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-soft hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
