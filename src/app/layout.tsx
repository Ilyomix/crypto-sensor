import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Crypto Sensor",
  description: "A dashboard for monitoring cryptocurrency trends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
