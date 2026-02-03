"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "../ui/Button";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 h-24 px-8 z-50 transition-all duration-300 ${scrolled ? "bg-neutral-950/90 backdrop-blur-xl border-b border-white/10 h-[80px]" : "border-b border-transparent"
                }`}
        >
            <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-between relative">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white tracking-tight z-20 shrink-0">
                    <Zap className="text-violet-500 w-8 h-8" fill="currentColor" />
                    Gas<span className="text-violet-500">Lance</span>
                </Link>

                {/* Center: Nav Links - Absolute Centering */}
                <div className="hidden md:flex items-center gap-12 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    {["Features", "Pricing", "About"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-base font-semibold text-neutral-400 hover:text-white transition-colors tracking-wide"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Right: Action Button */}
                <div className="hidden md:block z-20 shrink-0">
                    <Link href="/app">
                        <Button variant="white" size="md" className="font-bold px-8 shadow-lg shadow-white/5">Launch App</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
