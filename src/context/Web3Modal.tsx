'use client';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';

import { WagmiConfig } from 'wagmi';
import { arbitrum, mainnet } from 'viem/chains';
import { ReactNode, useEffect, useState } from 'react';

interface Web3ModalProps {
  children: ReactNode;
}

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'd43d3cc918b1e43c827827b7eca6567b';

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Modal({ children }: Web3ModalProps) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  return <>{render && <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>}</>;
}
