"use client";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] w-full pt-20 px-4 md:px-6 relative">
      <div className="text-center mb-8 md:mb-10 w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-black mb-3 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Kebijakan Privasi</h1>
        <p className="text-white/40 text-[10px] md:text-xs leading-relaxed max-w-md mx-auto">Prinsip keamanan data tanpa kompromi. Kami tidak merekam, tidak melacak, dan secara otomatis memusnahkan.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl text-[10px] md:text-xs text-white/50 leading-loose space-y-6 md:space-y-8 mb-10">
        <section>
          <h2 className="text-xs md:text-sm font-black text-white/90 mb-2 tracking-wide uppercase">1. Metodologi Nol Pengetahuan</h2>
          <p>Sistem ini beroperasi mutlak tanpa basis data pengguna. Tidak ada alamat surel, identitas, atau kata sandi yang dikumpulkan. Perekaman log lalu lintas yang tertangkap oleh matriks pertahanan (*Threat Matrix*) hanya berupa identifikasi IP temporer murni untuk memblokir anomali siber.</p>
        </section>

        <section>
          <h2 className="text-xs md:text-sm font-black text-white/90 mb-2 tracking-wide uppercase">2. Kematian Data Otomatis</h2>
          <p>Seluruh muatan fisik (*payload*) yang ditransmisikan terikat oleh sistem otonom (*Cron Cleanup*). Ketika parameter waktu yang pengguna tetapkan telah mencapai limitasi, algoritma akan memutus tautan publik dan menghancurkan berkas dari blok penyimpanan VPS secara permanen, tanpa sisa *cache* maupun cadangan sekunder.</p>
        </section>

        <section>
          <h2 className="text-xs md:text-sm font-black text-white/90 mb-2 tracking-wide uppercase">3. Intervensi Terowongan Aman</h2>
          <p>Trafik lalu lintas dilindungi rute enkripsi *Cloudflare Tunnel* yang meniadakan akses langsung penyerang ke nomor port internal. Kendati transportasi data terenkripsi (TLS), media yang menetap (*Data at Rest*) disajikan secara mentah. Dokumen berklasifikasi rahasia sangat direkomendasikan untuk dienkripsi manual secara luring sebelum diunggah.</p>
        </section>

        <section>
          <h2 className="text-xs md:text-sm font-black text-white/90 mb-2 tracking-wide uppercase">4. Komitmen Isolasi</h2>
          <p>Kami tidak berafiliasi dengan entitas agensi data, korporasi pengiklan, atau pihak ketiga penganalisa pelacak (seperti Google Analytics). Log metrik siber kami digunakan eksklusif untuk menjaga ketahanan pangkalan data NAT lokal agar tidak melebihi rasio kapasitas harian.</p>
        </section>
      </motion.div>
    </div>
  );
}
