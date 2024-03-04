import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Modal } from "@/context/Web3Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paylana!",
  description: "Empowering Crypto Commerce on Solana",
  abstract:
    "Paylana is an innovative open-source browser extension developed by Esol Labs powered by Solana Pay.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  );
}
