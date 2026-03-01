import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Kabox - Modern CDN Uploader",
  description: "Platform uploader media modern oleh aka",
  icons: {
    icon: "https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-dark text-accent font-sans selection:bg-accent selection:text-dark overflow-x-hidden">
        <Header />
        <main className="min-h-screen pt-20 pb-10 px-4 max-w-6xl mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
