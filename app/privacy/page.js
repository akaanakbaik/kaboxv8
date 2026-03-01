"use client";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full pt-10">
      <div className="text-center mb-10 px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4 tracking-tight">
          Kebijakan Privasi
        </h1>
        <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Bagaimana Kabox melindungi, mengelola, dan memusnahkan jejak digital Anda.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-soft border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg text-sm md:text-base text-white/70 leading-relaxed space-y-8"
      >
        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">1. Metodologi Pengumpulan Data</h2>
          <p>
            Platform Kabox dibangun di atas pondasi privasi mutlak. Kami tidak memberlakukan proses pendaftaran, pencatatan alamat surel, atau ekstraksi data identitas diri. Sistem matriks pertahanan kami hanya merekam serangkaian log Alamat IP publik secara temporer yang diperuntukkan murni sebagai mitigasi serangan siber (DDoS) dan filter keamanan lapisan aplikasi.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">2. Retensi Berkas Media & Pemusnahan Otomatis</h2>
          <p>
            Media yang Anda transmisikan dikelola secara eksklusif berdasarkan prinsip pemusnahan temporal. Berkas Anda akan bersemayam di pangkalan data peladen NAT kami sesuai dengan preferensi batas waktu yang Anda tetapkan (Mulai dari 10 menit hingga batas waktu tak terhingga). Apabila siklus waktu telah tuntas, sistem algoritma jadwal (Cron) akan secara brutal memusnahkan berkas tersebut dari sektor penyimpanan tanpa menyisakan cadangan atau jejak log.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">3. Enkripsi Transmisi Jaringan</h2>
          <p>
            Lalu lintas pertukaran paket data antara peramban web pengguna dan peladen pusat kami telah dilindungi menggunakan terowongan kriptografi standar industri yang disediakan oleh Cloudflare Tunnel. Kendati demikian, kami tidak menerapkan enkripsi fisik pada berkas yang telah menetap (Data at Rest) di kandar lokal. Kami sangat menyarankan pengguna untuk mengenkripsi sendiri dokumen yang sifatnya sangat konfidensial sebelum diunggah.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">4. Pihak Ketiga & Entitas Eksternal</h2>
          <p>
            Kami menolak keras praktik komersialisasi data. Alamat IP, metrik telemetri, dan statistik pangkalan data internal (kuota 6GB) sepenuhnya diisolasi di dalam jaringan lokal. Kami tidak pernah dan tidak akan mensindikasi, menjual, atau memperdagangkan catatan log tersebut kepada korporasi pengiklan, pemantau analitik pihak ketiga, atau agensi pelacak mana pun.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">5. Protokol Penghapusan Paksa</h2>
          <p>
            Mengingat sistem ini beroperasi secara otonom tanpa sistem akun pengguna, berkas yang telah mengudara tidak dapat diturunkan secara mandiri melalui antarmuka web sebelum mencapai tenggat kedaluwarsa. Apabila terdapat kebocoran informasi krusial yang menuntut eksekusi penghapusan mendesak, pengguna dipersilakan untuk menghubungi Administrator melalu matriks komunikasi Telegram yang tertera di kaki situs web dengan melampirkan referensi URL berkas terkait.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
