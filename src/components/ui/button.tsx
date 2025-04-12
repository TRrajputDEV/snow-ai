'use client'

import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils" // Make sure you have this utility function

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, variant = 'default', size = 'md', isLoading = false, disabled, ...props }, ref) => {
        // Button variant styles
        const variantStyles = {
            default: 'bg-gray-800 hover:bg-gray-700 text-white',
            primary: 'bg-blue-600 hover:bg-blue-700 text-white',
            secondary: 'bg-gray-600 hover:bg-gray-500 text-white',
            outline: 'bg-transparent border border-gray-600 hover:bg-gray-800 text-gray-300',
            ghost: 'bg-transparent hover:bg-gray-800 text-gray-300',
            destructive: 'bg-red-600 hover:bg-red-700 text-white',
        }

        // Button size styles
        const sizeStyles = {
            sm: 'py-1 px-3 text-sm',
            md: 'py-2 px-4',
            lg: 'py-3 px-6 text-lg',
            icon: 'p-2'
        }

        return (
            <button
                ref={ref}
                className={cn(
                    'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                    variantStyles[variant],
                    sizeStyles[size],
                    isLoading && 'opacity-70 cursor-not-allowed',
                    disabled && 'opacity-50 cursor-not-allowed',
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{children}</span>
                    </div>
                ) : (
                    children
                )}
            </button>
        )
    }
)

Button.displayName = "Button"

export { Button }