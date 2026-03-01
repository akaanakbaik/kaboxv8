import UploadBox from "@/components/UploadBox";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full pt-10">
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Kabox Uploader
        </h1>
        <p className="text-white/50 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Platform unggah media sekilat cahaya. Ringkas, aman, dan tanpa jejak.
        </p>
      </div>
      <UploadBox />
    </div>
  );
}
