"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SniperForm = () => {
    const [formData, setFormData] = useState({
        rawTx: "",
        targetGwei: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

            const response = await fetch("/api/sniper", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rawTx: formData.rawTx,
                    targetGwei: Number(formData.targetGwei),
                    chainId: 1, // Default to Mainnet for now
                    userId: "user_demo", // Mock user ID
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create request");
            }

            setStatus("success");
            setFormData({ rawTx: "", targetGwei: "" });

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
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Signed Transaction Hex
                    </label>
                    <textarea
                        value={formData.rawTx}
                        onChange={(e) => setFormData({ ...formData, rawTx: e.target.value })}
                        placeholder="0x..."
                        className="w-full h-32 bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-sm text-white font-mono placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none"
                        required
                    />
                </div>

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
                            className="w-full bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                            required
                            min="1"
                            step="0.1"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-medium">
                            Gwei
                        </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                        Current theoretical network average: ~15 Gwei
                    </p>
                </div>

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
                    disabled={status === "success"}
                >
                    {status === "success" ? "Scheduled" : "Queue Transaction"}
                    {!status && <ArrowUpRight className="ml-2" size={18} />}
                </Button>
            </form>
        </Card>
    );
};
