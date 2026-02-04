"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { Button } from "../ui/Button";
import { X, Coins, Zap, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreditPackage {
    id: string;
    credits: number;
    price: number;
    name: string;
}

interface BuyCreditsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BuyCreditsModal = ({ isOpen, onClose }: BuyCreditsModalProps) => {
    const { address, isConnected } = useAccount();
    const [packages, setPackages] = useState<CreditPackage[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchPackages();
        }
    }, [isOpen]);

    const fetchPackages = async () => {
        try {
            const res = await fetch("http://localhost:3001/payment/packages");
            if (res.ok) {
                const data = await res.json();
                setPackages(data);
                if (data.length > 0) {
                    setSelectedPackage(data[0].id);
                }
            }
        } catch (err) {
            console.error("Failed to fetch packages:", err);
        }
    };

    const handlePurchase = async () => {
        if (!isConnected || !address || !selectedPackage) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/payment/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: address,
                    packageId: selectedPackage,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                // Redirect to Stripe Checkout
                if (data.url) {
                    window.location.href = data.url;
                }
            } else {
                const error = await res.json();
                alert(error.message || "Failed to create checkout session");
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Failed to initiate checkout");
        } finally {
            setLoading(false);
        }
    };

    const getPackageIcon = (credits: number) => {
        if (credits >= 50) return Star;
        if (credits >= 15) return Zap;
        return Coins;
    };

    const getDiscount = (pkg: CreditPackage) => {
        const basePrice = 1; // $1 per credit
        const actualPricePerCredit = pkg.price / pkg.credits;
        if (actualPricePerCredit < basePrice) {
            return Math.round((1 - actualPricePerCredit / basePrice) * 100);
        }
        return 0;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                    >
                        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Buy Credits</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <X size={20} className="text-neutral-400" />
                                </button>
                            </div>

                            {/* Packages */}
                            <div className="space-y-3 mb-6">
                                {packages.map((pkg) => {
                                    const Icon = getPackageIcon(pkg.credits);
                                    const discount = getDiscount(pkg);
                                    const isSelected = selectedPackage === pkg.id;

                                    return (
                                        <button
                                            key={pkg.id}
                                            onClick={() => setSelectedPackage(pkg.id)}
                                            className={`w-full p-4 rounded-xl border transition-all text-left ${isSelected
                                                    ? "border-violet-500 bg-violet-500/10"
                                                    : "border-white/10 hover:border-white/20 bg-neutral-800/50"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? "bg-violet-500/20" : "bg-neutral-700"
                                                        }`}>
                                                        <Icon size={20} className={isSelected ? "text-violet-400" : "text-neutral-400"} />
                                                    </div>
                                                    <div>
                                                        <p className={`font-semibold ${isSelected ? "text-white" : "text-neutral-200"}`}>
                                                            {pkg.credits} Credits
                                                        </p>
                                                        <p className="text-sm text-neutral-500">
                                                            {pkg.credits} deployment{pkg.credits > 1 ? "s" : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`font-bold text-lg ${isSelected ? "text-white" : "text-neutral-200"}`}>
                                                        ${pkg.price}
                                                    </p>
                                                    {discount > 0 && (
                                                        <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">
                                                            Save {discount}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Purchase Button */}
                            <Button
                                fullWidth
                                size="lg"
                                onClick={handlePurchase}
                                loading={loading}
                                disabled={!isConnected || !selectedPackage}
                            >
                                Purchase with Card
                            </Button>

                            <p className="text-xs text-neutral-500 text-center mt-4">
                                Secure payment powered by Stripe
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
