import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { Header } from "../../components/shared/header";
import "../globals.css";
import { Footer } from "@/components/shared/footter";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CUM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <main className="min-h-screen flex flex-col">
          <Header />
          <div className=" flex-grow">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
