"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";
import { Button } from "../ui/Button";
import { ConnectWallet } from "../wallet/ConnectWallet";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isAppPage = pathname?.startsWith("/app");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 h-20 px-8 z-50 transition-all duration-300 ${scrolled ? "bg-neutral-950/90 backdrop-blur-xl border-b border-white/10" : "border-b border-transparent"
                }`}
        >
            <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white tracking-tight font-[family-name:var(--font-outfit)]">
                    <Zap className="text-violet-500 w-7 h-7" fill="currentColor" />
                    Gas<span className="text-violet-500">Lance</span>
                </Link>

                {/* Action Button - Dynamic based on route */}
                <div className="flex items-center">
                    {isAppPage ? (
                        <ConnectWallet />
                    ) : (
                        <Link href="/app">
                            <Button variant="white" size="md" className="font-semibold px-6">
                                Launch Dapp
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
