import "./globals.css";
import { Inter, Poppins, Bebas_Neue } from 'next/font/google'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 bg-fixed"
      >
        {children}
      </body>
    </html>
  );
}
