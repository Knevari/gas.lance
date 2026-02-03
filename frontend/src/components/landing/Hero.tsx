"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

export const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 relative overflow-hidden bg-neutral-950">
            {/* Background Gradients */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
                <motion.div
                    className="flex flex-col items-center max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Pill / Badge - Increased Padding */}
                    <div className="inline-flex items-center gap-3 px-8 py-3 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm font-bold mb-14 shadow-xl shadow-violet-900/10 backdrop-blur-sm">
                        <Sparkles size={16} className="text-violet-400" />
                        <span>Post-Beta Live on Mainnet</span>
                    </div>

                    {/* Hero Title - Looser Leading, More Spacing */}
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-14 leading-snug text-white drop-shadow-2xl">
                        Never Overpay for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-300">Gas Again</span>
                    </h1>

                    {/* Subtitle - More Spacing */}
                    <p className="text-xl md:text-2xl text-neutral-400 mb-16 leading-relaxed max-w-3xl text-center font-light">
                        Automate your Ethereum transactions. Set your target price,
                        sign the payload, and let GasLance snipe the block for you.
                        Non-custodial, precise, and 24/7.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                        <Link href="/app">
                            <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-[240px] text-lg font-bold shadow-violet-500/25">
                                Start Sniping <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[240px] text-lg font-bold bg-neutral-900 border-neutral-800">How it Works</Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
