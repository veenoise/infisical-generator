import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infisical Generator",
  description: "Generate Infisical Agent templates and runtime environment variables.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
