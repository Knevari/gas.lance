"use client";

import React, { useState } from "react";
import { useAccount } from 'wagmi';
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ArrowUpRight, CheckCircle2, AlertCircle, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SniperForm = () => {
    const { address, isConnected } = useAccount();
    const [formData, setFormData] = useState({
        rawTx: "",
        targetGwei: "",
        nonce: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isConnected || !address) {
            setStatus("error");
            setErrorMessage("Please connect your wallet first");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            // Basic validation
            if (!formData.rawTx.startsWith("0x")) {
                throw new Error("Transaction Hex must start with 0x");
            }
            if (Number(formData.targetGwei) <= 0) {
                throw new Error("Target Gas must be greater than 0");
            }
            if (formData.nonce === "" || Number(formData.nonce) < 0) {
                throw new Error("Nonce must be a non-negative integer");
            }

            const response = await fetch("http://localhost:3001/sniper", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rawTx: formData.rawTx,
                    targetGwei: Number(formData.targetGwei),
                    chainId: 1, // Default to Mainnet for now
                    userId: address,
                    nonce: Number(formData.nonce),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create request");
            }

            setStatus("success");
            setFormData({ rawTx: "", targetGwei: "", nonce: "" });

            // Reset success message after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);

        } catch (err: any) {
            console.error(err);
            setStatus("error");
            setErrorMessage(err.message || "Something went wrong");
        }
    };

    return (
        <Card className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
                {!isConnected && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-center gap-2 text-amber-400 text-sm">
                        <Wallet size={16} />
                        <span>Connect your wallet to queue transactions</span>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Signed Transaction Hex
                    </label>
                    <textarea
                        value={formData.rawTx}
                        onChange={(e) => setFormData({ ...formData, rawTx: e.target.value })}
                        placeholder="0x..."
                        className="w-full h-32 bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-sm text-white font-mono placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none disabled:opacity-50"
                        required
                        disabled={!isConnected}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Target Gas Price (Gwei)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={formData.targetGwei}
                                onChange={(e) => setFormData({ ...formData, targetGwei: e.target.value })}
                                placeholder="20"
                                className="w-full bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all disabled:opacity-50"
                                required
                                min="0.1"
                                step="0.1"
                                disabled={!isConnected}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-medium">
                                Gwei
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Nonce
                        </label>
                        <input
                            type="number"
                            value={formData.nonce}
                            onChange={(e) => setFormData({ ...formData, nonce: e.target.value })}
                            placeholder="0"
                            className="w-full bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all disabled:opacity-50"
                            required
                            min="0"
                            step="1"
                            disabled={!isConnected}
                        />
                    </div>
                </div>
                <p className="text-xs text-neutral-500 -mt-4">
                    Enter the nonce used in your signed transaction.
                </p>

                <AnimatePresence mode="wait">
                    {status === "error" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2 text-red-400 text-sm"
                        >
                            <AlertCircle size={16} className="mt-0.5" />
                            <span>{errorMessage}</span>
                        </motion.div>
                    )}

                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-start gap-2 text-emerald-400 text-sm"
                        >
                            <CheckCircle2 size={16} className="mt-0.5" />
                            <span>Sniper request scheduled successfully!</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    loading={status === "loading"}
                    disabled={status === "success" || !isConnected}
                >
                    {status === "success" ? "Scheduled" : "Queue Transaction"}
                    {status === "idle" && <ArrowUpRight className="ml-2" size={18} />}
                </Button>
            </form>
        </Card>
    );
};
