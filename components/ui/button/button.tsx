import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    className?: string;
}

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    onClick,
    className = ""
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
    
    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100"
    };
    
    const sizeStyles = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg"
    };
    
    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
