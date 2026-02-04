"use client";

import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// Wagmi config for wallet connection
export const config = createConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
});

// Export chains for use elsewhere
export { mainnet, sepolia };
