import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism, bsc } from 'wagmi/chains';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors';

// Get projectId from environment variable or use a placeholder
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism, bsc],
  connectors: [
    walletConnect({ 
      projectId,
      metadata: {
        name: 'Gas Optimizer',
        description: 'Save on transaction fees',
        url: 'https://gas-optimizer.app',
        icons: ['https://gas-optimizer.app/icon.png']
      },
      showQrModal: true,
    }),
    injected(),
    coinbaseWallet({
      appName: 'Gas Optimizer',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [bsc.id]: http(),
  },
});
