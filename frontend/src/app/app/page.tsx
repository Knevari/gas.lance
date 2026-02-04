"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DeployContractForm } from "@/components/forms/DeployContractForm";
import { SniperForm } from "@/components/forms/SniperForm";
import { motion } from "framer-motion";
import { Rocket, Code } from "lucide-react";

type FormMode = "deploy" | "advanced";

export default function Dashboard() {
    const [mode, setMode] = useState<FormMode>("deploy");

    return (
        <main className="min-h-screen bg-neutral-950 pb-20">
            <Navbar />

            <div className="pt-28 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">
                            Sniper Dashboard
                        </h1>
                        <p className="text-neutral-400">
                            Deploy contracts or queue transactions when gas prices drop.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto">
                        {/* Mode Tabs */}
                        <div className="flex gap-2 mb-6">
                            <button
                                onClick={() => setMode("deploy")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === "deploy"
                                        ? "bg-violet-600 text-white"
                                        : "bg-neutral-800 text-neutral-400 hover:text-white"
                                    }`}
                            >
                                <Rocket size={16} />
                                Deploy Contract
                            </button>
                            <button
                                onClick={() => setMode("advanced")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === "advanced"
                                        ? "bg-violet-600 text-white"
                                        : "bg-neutral-800 text-neutral-400 hover:text-white"
                                    }`}
                            >
                                <Code size={16} />
                                Advanced (Raw Tx)
                            </button>
                        </div>

                        {/* Form */}
                        {mode === "deploy" ? <DeployContractForm /> : <SniperForm />}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
