"use client";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] w-full pt-20 px-4 md:px-6 relative">
      <div className="text-center mb-8 md:mb-10 w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-black mb-3 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Syarat & Ketentuan</h1>
        <p className="text-white/40 text-[10px] md:text-xs leading-relaxed max-w-md mx-auto">Regulasi penggunaan ekosistem Kabox. Membaca dan memahami poin berikut adalah sebuah keharusan operasional.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl text-[10px] md:text-xs text-white/50 leading-loose space-y-6 md:space-y-8 mb-10">
        <section>
          <h2 className="text-xs md:text-sm font-black text-white/90 mb-2 tracking-wide uppercase">1. Perjanjian Akses</h2>
          <p>Dengan menginisiasi transmisi data ke peladen Kabox, Anda secara implisit menyetujui seluruh pakta integritas ini. Platform ini didedikasikan sebagai utilitas publik tak berbayar untuk memfasilitasi pertukaran media temporer dengan latensi ultra-rendah.</p>
        </section>

        <section>
          <h2 className="text-xs md:text-sm font-black text-white/90 mb-2 tracking-wide uppercase">2. Limitasi & Restriksi Muatan</h2>
          <p className="mb-2">Infrastruktur kami berdiri di atas komputasi NAT dengan limitasi *disk* 15GB. Operasional Anda dibatasi oleh parameter ketat berikut:</p>
          <ul className="list-disc pl-4 space-y-1 marker:text-white/20">
            <li>Dilarang mutlak menanamkan skrip injeksi, *malware*, *botnet*, atau piranti peretasan.</li>
            <li>Dilarang mengeksekusi *flooding* lalu lintas (DDoS) ke gerbang API.</li>
            <li>Alokasi unggahan simultan (Multi-part) dibatasi maksimal 5 media per sesi.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs md:text-sm font-black text-white/90 mb-2 tracking-wide uppercase">3. Mekanisme Karantina</h2>
          <p>Peladen dikawal oleh algoritma *Threat Matrix*. Segala bentuk anomali *request*, manipulasi *header*, atau percobaan *bypass* akan memicu pemutusan soket TCP seketika (Status 403). Alamat IP penyerang akan dideportasi ke dalam daftar hitam tanpa peringatan.</p>
        </section>

        <section>
          <h2 className="text-xs md:text-sm font-black text-white/90 mb-2 tracking-wide uppercase">4. Pelepasan Tanggung Jawab (Disclaimer)</h2>
          <p>Arsitektur ini beroperasi di bawah prinsip *as-is* (sebagaimana adanya). Pengembang (Aka) melepaskan segala bentuk beban moral maupun legalitas hukum atas hilangnya aset media, korupsi data, maupun insiden penyalahgunaan *link* publik oleh pihak tak bertanggung jawab.</p>
        </section>

        <section>
          <h2 className="text-xs md:text-sm font-black text-white/90 mb-2 tracking-wide uppercase">5. Hak Pemusnahan Sepihak</h2>
          <p>Mengingat ruang penyimpanan (*storage*) peladen yang terbatas, Administrator memiliki otoritas absolut untuk mengeksekusi penghapusan paksa (*Force Wipe*) terhadap media apa pun yang memicu anomali beban RAM atau mengancam stabilitas sistem lokal, bahkan sebelum waktu *expired* tercapai.</p>
        </section>
      </motion.div>
    </div>
  );
}
