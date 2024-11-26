import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Crypto Sensor",
  description: "Crypto Sensor is a sophisticated market analysis tool that aggregates and monitors multiple cryptocurrency market indicators to provide a comprehensive view of market conditions. The platform combines technical indicators, social metrics, and market sentiment data to help users make more informed decisions about market cycles.",
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
