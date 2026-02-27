import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ruayluckky",
  description: "Landing page พรีเมียมโทนดำ-ทอง-มรกต สไตล์สากล"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
