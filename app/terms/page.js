"use client";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full pt-10">
      <div className="text-center mb-10 px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4 tracking-tight">
          Syarat & Ketentuan
        </h1>
        <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Harap baca dengan saksama sebelum menggunakan layanan peladen Kabox.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-soft border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg text-sm md:text-base text-white/70 leading-relaxed space-y-8"
      >
        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">1. Pendahuluan</h2>
          <p>
            Selamat datang di Kabox. Dengan mengakses dan menggunakan layanan pengunggahan media ini, Anda secara otomatis menyetujui seluruh syarat dan ketentuan yang berlaku. Layanan ini disediakan secara gratis dengan tujuan mempermudah berbagi berkas sementara dengan desain modern.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">2. Penggunaan Layanan & Batasan</h2>
          <p className="mb-2">
            Peladen ini beroperasi pada infrastruktur NAT dengan kapasitas penyimpanan maksimal sebesar 6GB. Anda diizinkan untuk mengunggah media apa pun dengan ketentuan wajib:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Dilarang keras mengunggah berkas yang mengandung skrip berbahaya, malware, atau alat eksploitasi.</li>
            <li>Dilarang melakukan serangan siber seperti pembanjiran koneksi (DDoS), injeksi data, atau eksploitasi matriks.</li>
            <li>Batas maksimum pengunggahan secara bersamaan dibatasi secara ketat hingga 5 media.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">3. Keamanan & Perisai Otomatis</h2>
          <p>
            Infrastruktur Kabox dikawal oleh sistem keamanan perisai pintar. Setiap percobaan peretasan atau pola muatan tinggi akan memicu penolakan seketika, dan alamat IP pelaku akan diblokir serta direkam ke pangkalan data terisolasi. Administrator berhak mencabut berkas sewaktu-waktu guna menghindari limitasi 6GB.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">4. Siklus Hidup & Penghapusan Media</h2>
          <p>
            Pengguna diwajibkan untuk menentukan tenggat waktu kedaluwarsa berkas pada modul kontrol. Sistem perampingan pangkalan data otomatis (Cron Cleanup) akan secara independen memusnahkan seluruh berkas fisik beserta rujukan URL ketika tenggat waktu habis tanpa dapat dipulihkan kembali.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">5. Penolakan Tanggung Jawab Secara Hukum</h2>
          <p>
            Keseluruhan sistem ini beroperasi murni dengan asas utilitas gratis. Pembuat kode (Aka) beserta layanan infrastruktur tidak menjamin perlindungan absolut atas berkas yang diunggah. Kami terlepas dari segala tuntutan hukum yang timbul atas hilangnya media berharga maupun penyalahgunaan platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">6. Pemulihan Akses (Banding)</h2>
          <p>
            Apabila Anda menerima indikator bahaya dari sistem pemblokir kami karena ketidaksengajaan pola interaksi, silakan buka menu permohonan dengan menghubungi staf Administrator melalui modul antarmuka Telegram di area pijakan (Footer) situs.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
