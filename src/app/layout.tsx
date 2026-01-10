import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "PREATOR",
  description:
    "ERP SaaS para autónomos y pymes: ventas, compras, inventario, facturación y analítica.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="dark">
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function () {
            try {
              var t = localStorage.getItem("preator_theme");
              if (!t) t = "dark";
              document.documentElement.setAttribute("data-theme", t);
            } catch (e) {}
          })();
        `}</Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
