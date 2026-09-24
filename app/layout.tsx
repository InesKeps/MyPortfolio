import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Thread from "@/components/Thread";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Glow from "@/components/Glow";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ines-keps.vercel.app"), // on ajustera l'URL après le déploiement
  title: "Ines Keps — Développeuse web fullstack",
  description:
    "Portfolio d'Ines Keps, développeuse web fullstack. Je conçois et je construis des applications web de bout en bout.",
  openGraph: {
    title: "Ines Keps — Développeuse web fullstack",
    description: "Je conçois et je construis des applications web de bout en bout.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ines Keps — Développeuse web fullstack",
    description: "Je conçois et je construis des applications web de bout en bout.",
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <Glow />
      <Thread />
      <Cursor />
      <Nav />
      <body className="flex min-h-full flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}