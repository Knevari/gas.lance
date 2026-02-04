"use client";

import React, { useState } from "react";
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { parseGwei, encodeFunctionData, encodeDeployData, serializeTransaction, keccak256, Hex } from 'viem';
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ArrowUpRight, CheckCircle2, AlertCircle, Wallet, Upload, FileCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContractArtifact {
    abi: any[];
    bytecode: string;
}

export const DeployContractForm = () => {
    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();
    const publicClient = usePublicClient();

    const [artifact, setArtifact] = useState<ContractArtifact | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [constructorArgs, setConstructorArgs] = useState<string>("");
    const [targetGwei, setTargetGwei] = useState<string>("");
    const [status, setStatus] = useState<"idle" | "loading" | "signing" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);

                // Support both Hardhat/Foundry artifact formats
                const abi = json.abi;
                let bytecode = json.bytecode || json.bin;

                // Normalize bytecode format
                if (bytecode && !bytecode.startsWith('0x')) {
                    bytecode = '0x' + bytecode;
                }

                if (!abi || !bytecode) {
                    throw new Error("Invalid artifact: must contain 'abi' and 'bytecode'");
                }

                setArtifact({ abi, bytecode });
                setFileName(file.name);
                setErrorMessage("");
            } catch (err: any) {
                setErrorMessage(err.message || "Failed to parse JSON file");
                setArtifact(null);
                setFileName("");
            }
        };
        reader.readAsText(file);
    };

    const parseConstructorArgs = (): any[] => {
        if (!constructorArgs.trim()) return [];
        try {
            const parsed = JSON.parse(constructorArgs);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            // Try comma-separated values
            return constructorArgs.split(',').map(arg => arg.trim());
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isConnected || !address || !walletClient || !publicClient) {
            setStatus("error");
            setErrorMessage("Please connect your wallet first");
            return;
        }

        if (!artifact) {
            setStatus("error");
            setErrorMessage("Please upload a contract artifact first");
            return;
        }

        const targetGweiNum = Number(targetGwei);
        if (targetGweiNum <= 0) {
            setStatus("error");
            setErrorMessage("Target gas price must be greater than 0");
            return;
        }

        setStatus("signing");
        setErrorMessage("");

        try {
            // Get current nonce for the user
            const nonce = await publicClient.getTransactionCount({ address });

            // Parse constructor arguments
            const args = parseConstructorArgs();

            // Build deployment data
            const deployData = encodeDeployData({
                abi: artifact.abi,
                bytecode: artifact.bytecode as Hex,
                args: args,
            });

            // Estimate gas for deployment
            const gasEstimate = await publicClient.estimateGas({
                account: address,
                data: deployData,
            });

            // Add 20% buffer to gas estimate
            const gasLimit = (gasEstimate * BigInt(120)) / BigInt(100);

            // Build the transaction request
            const txRequest = {
                to: undefined, // Contract deployment = no 'to' address
                data: deployData,
                gas: gasLimit,
                maxFeePerGas: parseGwei(targetGwei),
                maxPriorityFeePerGas: parseGwei('0.1'), // Small priority fee
                nonce,
                chainId: await publicClient.getChainId(),
                type: 'eip1559' as const,
            };

            // Request signature from wallet
            const signedTx = await walletClient.signTransaction(txRequest);

            setStatus("loading");

            // Submit to backend
            const response = await fetch("http://localhost:3001/sniper", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rawTx: signedTx,
                    targetGwei: targetGweiNum,
                    chainId: txRequest.chainId,
                    userId: address,
                    nonce: nonce,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to queue deployment");
            }

            setStatus("success");
            setArtifact(null);
            setFileName("");
            setConstructorArgs("");
            setTargetGwei("");

            setTimeout(() => setStatus("idle"), 4000);

        } catch (err: any) {
            console.error(err);
            setStatus("error");
            // Handle user rejection
            if (err.message?.includes('rejected') || err.message?.includes('denied')) {
                setErrorMessage("Transaction signing was cancelled");
            } else {
                setErrorMessage(err.message || "Something went wrong");
            }
        }
    };

    return (
        <Card className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
                {!isConnected && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-center gap-2 text-amber-400 text-sm">
                        <Wallet size={16} />
                        <span>Connect your wallet to deploy contracts</span>
                    </div>
                )}

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Contract Artifact (JSON)
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            disabled={!isConnected}
                        />
                        <div className={`flex items-center gap-3 bg-neutral-900/50 border border-white/10 rounded-xl p-4 transition-all ${!isConnected ? 'opacity-50' : 'hover:border-violet-500/50'}`}>
                            {artifact ? (
                                <>
                                    <FileCode size={20} className="text-emerald-400" />
                                    <span className="text-white text-sm font-medium">{fileName}</span>
                                    <span className="text-neutral-500 text-xs ml-auto">
                                        {artifact.abi.length} functions
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Upload size={20} className="text-neutral-500" />
                                    <span className="text-neutral-500 text-sm">
                                        Drop Hardhat/Foundry artifact or click to upload
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                        Supports Hardhat artifacts (artifacts/*.json) or Foundry output (out/*.json)
                    </p>
                </div>

                {/* Constructor Arguments */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Constructor Arguments (optional)
                    </label>
                    <input
                        type="text"
                        value={constructorArgs}
                        onChange={(e) => setConstructorArgs(e.target.value)}
                        placeholder='["arg1", 123] or arg1, arg2'
                        className="w-full bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all disabled:opacity-50"
                        disabled={!isConnected}
                    />
                    <p className="text-xs text-neutral-500 mt-2">
                        JSON array or comma-separated values
                    </p>
                </div>

                {/* Target Gas Price */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Maximum Gas Price (Gwei)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={targetGwei}
                            onChange={(e) => setTargetGwei(e.target.value)}
                            placeholder="15"
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
                    <p className="text-xs text-neutral-500 mt-2">
                        Your deployment will only execute when network gas is at or below this price
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
                            <span>Deployment queued! We'll broadcast when gas drops to your target.</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    loading={status === "loading" || status === "signing"}
                    disabled={status === "success" || !isConnected || !artifact}
                >
                    {status === "signing" ? "Confirm in Wallet..." :
                        status === "success" ? "Queued!" :
                            "Sign & Queue Deployment"}
                    {status === "idle" && <ArrowUpRight className="ml-2" size={18} />}
                </Button>
            </form>
        </Card>
    );
};
