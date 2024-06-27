import type { Metadata } from "next";
import "./globals.css";
import Titulo from "./components/Titulo";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Admin: Cineclube Avenida",
  description: "Cineclube para locação e avaliação de filmes",
  keywords: ["Cineclube", "Filmes", "Aluguel de Filmes"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Toaster richColors position="top-right" />
        <Titulo />
        {children}
      </body>
    </html>
  );
}
