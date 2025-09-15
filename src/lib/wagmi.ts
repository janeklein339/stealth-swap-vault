import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, polygon, arbitrum, optimism } from 'wagmi/chains';
import { http } from 'viem';

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475';

export const config = getDefaultConfig({
  appName: 'Stealth Swap Vault',
  projectId,
  chains: [
    sepolia,
    polygon,
    arbitrum,
    optimism,
  ],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990'),
    [polygon.id]: http('https://polygon-rpc.com'),
    [arbitrum.id]: http('https://arb1.arbitrum.io/rpc'),
    [optimism.id]: http('https://mainnet.optimism.io'),
  },
  ssr: false,
});
