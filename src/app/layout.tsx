import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import clsx from "clsx";

const urbanist = Urbanist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900">
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        <Header />
        {children}
        <Footer />
        <div className="absolute  inset-0 -z-50 max-h-screen background-gradient " />
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
