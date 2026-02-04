"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import { Card } from "../ui/Card";
import { BuyCreditsModal } from "../payment/BuyCreditsModal";
import { Clock, CheckCircle2, XCircle, AlertTriangle, Radio, ExternalLink, Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Order {
    id: string;
    status: "PENDING" | "BROADCASTED" | "EXECUTED" | "FAILED" | "CANCELLED";
    targetGwei: number;
    chainId: number;
    txHash: string | null;
    error: string | null;
    createdAt: string;
}

const statusConfig = {
    PENDING: {
        icon: Clock,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        label: "Waiting for gas"
    },
    BROADCASTED: {
        icon: Radio,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        label: "Broadcasting"
    },
    EXECUTED: {
        icon: CheckCircle2,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        label: "Executed"
    },
    FAILED: {
        icon: XCircle,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        label: "Failed"
    },
    CANCELLED: {
        icon: AlertTriangle,
        color: "text-neutral-400",
        bg: "bg-neutral-500/10",
        border: "border-neutral-500/20",
        label: "Cancelled"
    },
};

const chainNames: Record<number, string> = {
    1: "Mainnet",
    11155111: "Sepolia",
    5: "Goerli",
};

const explorerUrls: Record<number, string> = {
    1: "https://etherscan.io/tx/",
    11155111: "https://sepolia.etherscan.io/tx/",
    5: "https://goerli.etherscan.io/tx/",
};

export const OrdersList = () => {
    const { address, isConnected } = useAccount();
    const [orders, setOrders] = useState<Order[]>([]);
    const [credits, setCredits] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [showBuyModal, setShowBuyModal] = useState(false);

    useEffect(() => {
        if (!isConnected || !address) {
            setOrders([]);
            setCredits(null);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch orders and credits in parallel
                const [ordersRes, creditsRes] = await Promise.all([
                    fetch(`http://localhost:3001/sniper/user/${address}`),
                    fetch(`http://localhost:3001/sniper/credits/${address}`),
                ]);

                if (ordersRes.ok) {
                    const ordersData = await ordersRes.json();
                    setOrders(ordersData);
                }

                if (creditsRes.ok) {
                    const creditsData = await creditsRes.json();
                    setCredits(creditsData.credits);
                }
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Poll for updates every 10 seconds
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, [isConnected, address]);

    if (!isConnected) {
        return null;
    }

    return (
        <div className="mt-8 space-y-4">
            {/* Credits Banner */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-900/20 to-indigo-900/20 border border-violet-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                        <Coins size={20} className="text-violet-400" />
                    </div>
                    <div>
                        <p className="text-sm text-neutral-400">Available Credits</p>
                        <p className="text-2xl font-bold text-white">
                            {credits !== null ? credits : "..."}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setShowBuyModal(true)}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    Buy Credits
                </button>
            </div>

            {/* Orders List */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-3">Your Orders</h3>

                {loading && orders.length === 0 ? (
                    <Card className="p-8 text-center">
                        <div className="animate-pulse text-neutral-500">Loading orders...</div>
                    </Card>
                ) : orders.length === 0 ? (
                    <Card className="p-8 text-center">
                        <p className="text-neutral-500">No orders yet. Create your first deployment above!</p>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {orders.map((order, index) => {
                                const config = statusConfig[order.status];
                                const StatusIcon = config.icon;
                                const explorerUrl = explorerUrls[order.chainId];

                                return (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Card className={`p-4 ${config.border} border`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center`}>
                                                        <StatusIcon size={16} className={config.color} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-sm font-medium ${config.color}`}>
                                                                {config.label}
                                                            </span>
                                                            <span className="text-xs text-neutral-500">
                                                                {chainNames[order.chainId] || `Chain ${order.chainId}`}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-neutral-500">
                                                            Target: {order.targetGwei} Gwei • {new Date(order.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {order.txHash && explorerUrl && (
                                                        <a
                                                            href={`${explorerUrl}${order.txHash}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                                            title="View on Explorer"
                                                        >
                                                            <ExternalLink size={16} className="text-neutral-400 hover:text-white" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {order.error && (
                                                <div className="mt-2 text-xs text-red-400 bg-red-500/10 rounded p-2 font-mono">
                                                    {order.error}
                                                </div>
                                            )}
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Buy Credits Modal */}
            <BuyCreditsModal
                isOpen={showBuyModal}
                onClose={() => setShowBuyModal(false)}
            />
        </div>
    );
};
