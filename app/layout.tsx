import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Library",
  description: "Uma biblioteca pessoal para livros, leitores e empréstimos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
