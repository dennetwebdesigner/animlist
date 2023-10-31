"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreContext } from "@/store/StoreContext";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <StoreContext>{children}</StoreContext>
      </body>
    </html>
  );
}

export default RootLayout;
// export default wrapper.withRedux(RootLayout);
