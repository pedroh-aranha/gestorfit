import { Suspense } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Suspense >
        {children}
        </Suspense>
      </body>
    </html>
  );
}
