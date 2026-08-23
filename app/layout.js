import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Kabox - Modern CDN Uploader",
  description: "Platform uploader media modern sekilat cahaya",
  icons: {
    icon: "https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[#0a0a0a] text-white font-sans selection:bg-white selection:text-black min-h-screen flex flex-col relative">
        <Header />
        <main className="flex-1 relative z-10 pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
