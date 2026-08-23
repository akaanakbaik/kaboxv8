import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Kabox — Media, disimpan dengan ringan",
  description: "Platform unggah media cepat dengan pengalaman yang ringan dan aman",
  icons: {
    icon: "https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="relative flex min-h-screen flex-col bg-[#070911] text-white">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -left-24 top-28 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-pink-300/[0.05] blur-3xl" />
        </div>
        <Header />
        <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 px-4 pb-14 pt-28 sm:px-6 md:px-10 md:pt-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
