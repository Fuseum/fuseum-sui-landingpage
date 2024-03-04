"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ConnectWalletPage from "@/components/ConnectWallet/ConnectWalletPage";

export default function Home() {
  const route = useRouter();
  return (
    <main>
      <ConnectWalletPage />
    </main>
  );
}
