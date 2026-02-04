"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Button } from '@/components/ui/Button';
import { Wallet, LogOut } from 'lucide-react';

export function ConnectWallet() {
    const { address, isConnected } = useAccount();
    const { connect, isPending } = useConnect();
    const { disconnect } = useDisconnect();

    if (isConnected && address) {
        return (
            <div className="flex items-center gap-3">
                <span className="text-sm text-neutral-400 font-mono">
                    {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => disconnect()}
                >
                    <LogOut size={16} />
                </Button>
            </div>
        );
    }

    return (
        <Button
            onClick={() => connect({ connector: injected() })}
            loading={isPending}
            size="sm"
        >
            <Wallet size={16} className="mr-2" />
            Connect Wallet
        </Button>
    );
}
