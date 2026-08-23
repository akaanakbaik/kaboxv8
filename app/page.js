import UploadBox from "@/components/UploadBox";

const highlights = [
  { value: "30 MB", label: "batas per berkas" },
  { value: "5 item", label: "sekali kirim" },
  { value: "0 jejak", label: "tanpa akun" }
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
      <section className="relative flex w-full flex-col items-center pb-12 pt-5 text-center sm:pt-10">
        <div className="absolute left-1/2 top-0 h-36 w-72 -translate-x-1/2 rounded-full bg-cyan-200/[0.06] blur-3xl" />
        <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100/70 shadow-[0_0_30px_rgba(124,231,255,0.06)]">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(124,231,255,0.9)]" />
          Media sharing, refined
        </div>
        <h1 className="relative mt-7 max-w-3xl text-[clamp(2.9rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-white">
          Media, disimpan <span className="text-gradient">dengan ringan.</span>
        </h1>
        <p className="relative mt-6 max-w-xl text-sm leading-7 text-white/48 sm:text-base">
          Kirim file atau tarik media dari URL. Kabox mengubahnya menjadi tautan yang siap dibagikan, tanpa langkah yang berlebihan.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-2.5">
          {highlights.map((item) => (
            <div key={item.label} className="glass-soft rounded-2xl px-4 py-3 text-left">
              <p className="text-sm font-semibold tracking-tight text-white/85">{item.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="uploader" className="w-full scroll-mt-28">
        <UploadBox />
      </section>
      <section id="status" className="mt-8 grid w-full gap-3 sm:grid-cols-3">
        <div className="glass-soft rounded-2xl p-4 sm:col-span-2"><div className="flex items-center gap-2 text-xs font-medium text-white/70"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" /> Infrastruktur siap digunakan</div><p className="mt-2 text-xs leading-relaxed text-white/35">Upload diproses langsung oleh layanan Kabox dan tautan akan muncul setelah selesai.</p></div>
        <div className="glass-soft rounded-2xl p-4"><p className="text-[10px] uppercase tracking-[0.16em] text-white/35">Privasi</p><p className="mt-2 text-xs leading-relaxed text-white/55">Pilih durasi penyimpanan sesuai kebutuhanmu.</p></div>
      </section>
    </div>
  );
}
