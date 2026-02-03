"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost" | "secondary";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    loading?: boolean;
}

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    className,
    ...props
}: ButtonProps) => {
    const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

    const variants = {
        // Primary: Deep gradient with a subtle top highlight and glow
        primary: "bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-900/20 hover:shadow-violet-600/30 border border-white/10 hover:border-white/20",

        // Secondary: Darker distinct action
        secondary: "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700",

        // White: High contrast for dark backgrounds
        white: "bg-white text-neutral-950 hover:bg-neutral-200 border border-transparent shadow-lg shadow-white/10",

        // Outline: Clean border, subtle hover bg
        outline: "bg-transparent border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 hover:bg-white/5",

        // Ghost: Text only
        ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className || ""}`}
            disabled={loading || props.disabled}
            {...(props as HTMLMotionProps<"button">)}
        >
            {/* Shine effect on primary */}
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 pointer-events-none" />
            )}

            {loading && <Loader2 className="animate-spin mr-2" size={16} />}
            <span className="relative z-10 flex items-center">{children}</span>
        </motion.button>
    );
};
