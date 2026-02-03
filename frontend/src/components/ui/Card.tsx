import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div className={`bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:border-white/20 transition-colors ${className || ""}`}>
            {children}
        </div>
    );
};
