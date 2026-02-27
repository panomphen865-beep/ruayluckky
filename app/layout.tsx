import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ruay Luckky",
  description: "iMessage green bubble energy, but for everyone.",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
