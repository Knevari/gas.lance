"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SniperForm } from "@/components/forms/SniperForm";
import { motion } from "framer-motion";

export default function Dashboard() {
    return (
        <main className="min-h-screen bg-neutral-950 pb-20">
            <Navbar />

            <div className="pt-32 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">Sniper Dashboard</h1>
                        <p className="text-neutral-400">Queue your transactions and let GasLance handle the rest.</p>
                    </div>

                    <div className="max-w-xl mx-auto">
                        <SniperForm />
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
