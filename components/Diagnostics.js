"use client";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL, API_REQUEST_BASE } from "@/lib/api";

// Panel kecil untuk memastikan jalur browser -> backend benar-benar hidup.
// Sengaja menampilkan domain, status HTTP, latensi, dan status database supaya
// laporan "koneksi terputus" bisa langsung dibedakan: jaringan klien, host API,
// atau backend/database.
export default function Diagnostics() {
  const [results, setResults] = useState(null);
  const [running, setRunning] = useState(false);
  const [checkedAt, setCheckedAt] = useState(null);

  const probe = async (base, label) => {
    const started = performance.now();
    try {
      const res = await fetch(`${base}/api/ping`, { cache: "no-store" });
      const body = await res.json().catch(() => ({}));
      return {
        label,
        host: base || (typeof window !== "undefined" ? window.location.origin : "same-origin"),
        ok: res.ok && body.success === true,
        status: res.status,
        ms: Math.round(performance.now() - started),
        database: body.database || null,
        requestId: body.requestId || res.headers.get("x-request-id"),
        error: body.error || null,
      };
    } catch (err) {
      return {
        label,
        host: base || (typeof window !== "undefined" ? window.location.origin : "same-origin"),
        ok: false,
        status: 0,
        ms: Math.round(performance.now() - started),
        database: null,
        requestId: null,
        error: err instanceof Error ? err.message : "tidak dapat terhubung",
      };
    }
  };

  const run = useCallback(async () => {
    setRunning(true);
    const probes = [["Peladen lewat domain web", API_REQUEST_BASE]];
    if (API_BASE_URL !== API_REQUEST_BASE) {
      probes.push(["Langsung ke host API", API_BASE_URL]);
    }
    const next = [];
    for (const [label, base] of probes) {
      next.push(await probe(base, label));
    }
    setResults(next);
    setCheckedAt(new Date());
    setRunning(false);
  }, []);

  useEffect(() => {
    run();
  }, [run]);

  const online = typeof navigator === "undefined" ? true : navigator.onLine;
  const allOk = results?.every((r) => r.ok);
  const detail = (r) => (r.ok ? `HTTP ${r.status} · ${r.ms} ms · database ${r.database}` : r.status === 0 ? `tidak terjangkau (${r.error})` : `HTTP ${r.status}${r.error ? ` · ${r.error}` : ""}`);

  return (
    <div className="w-full max-w-xl mx-auto mt-6 px-4">
      <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${results ? (allOk ? "bg-green-500" : "bg-red-500") : "bg-white/30"}`} />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
              Diagnostik koneksi
            </span>
          </div>
          <button
            onClick={run}
            disabled={running}
            className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors disabled:opacity-40"
          >
            {running ? "Memeriksa…" : "Periksa ulang"}
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {results === null ? (
            <p className="text-[10px] text-white/30">Memeriksa jalur ke peladen…</p>
          ) : (
            results.map((r) => (
              <div key={r.label} className="flex items-start justify-between gap-3 text-[10px] leading-relaxed">
                <div className="min-w-0">
                  <p className="text-white/70 font-semibold truncate">{r.label}</p>
                  <p className="text-white/30 truncate">{r.host}</p>
                </div>
                <p className={`shrink-0 font-mono ${r.ok ? "text-green-400/80" : "text-red-400/80"}`}>{detail(r)}</p>
              </div>
            ))
          )}
        </div>

        <p className="mt-3 text-[8px] md:text-[9px] uppercase tracking-[0.14em] text-white/25">
          Browser {online ? "online" : "offline"}
          {checkedAt ? ` · diperiksa ${checkedAt.toLocaleTimeString("id-ID")}` : ""}
        </p>
      </div>
    </div>
  );
}
