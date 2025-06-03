"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { spinnerVariants, modalVariants, scaleInVariants } from '@/lib/animations';

interface LoadingState {
    [key: string]: boolean;
}

interface LoadingContextType {
    isLoading: (key: string) => boolean;
    setLoading: (key: string, loading: boolean) => void;
    isAnyLoading: () => boolean;
    clearAllLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [loadingStates, setLoadingStates] = useState<LoadingState>({});

    const isLoading = (key: string): boolean => {
        return loadingStates[key] || false;
    };

    const setLoading = (key: string, loading: boolean) => {
        setLoadingStates(prev => ({
            ...prev,
            [key]: loading
        }));
    };

    const isAnyLoading = (): boolean => {
        return Object.values(loadingStates).some(Boolean);
    };

    const clearAllLoading = () => {
        setLoadingStates({});
    };

    return (
        <LoadingContext.Provider value={{
            isLoading,
            setLoading,
            isAnyLoading,
            clearAllLoading
        }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}

// Loading Spinner Component
interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    text?: string;
}

export function LoadingSpinner({
    size = 'md',
    className = '',
    text
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <motion.div
                variants={spinnerVariants}
                animate="end"
                className={sizeClasses[size]}
            >
                <Loader2 className="w-full h-full" />
            </motion.div>
            {text && (
                <motion.span
                    className="text-sm text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {text}
                </motion.span>
            )}
        </div>
    );
}

// Page Loading Overlay
interface PageLoadingProps {
    isLoading: boolean;
    text?: string;
}

export function PageLoading({ isLoading, text = 'Loading...' }: PageLoadingProps) {
    if (!isLoading) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-3"
                variants={scaleInVariants}
                initial="hidden"
                animate="visible"
            >
                <LoadingSpinner size="md" />
                <span className="text-gray-700">{text}</span>
            </motion.div>
        </motion.div>
    );
}

// Loading Button Component
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
    children: ReactNode;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export function LoadingButton({
    isLoading = false,
    loadingText,
    children,
    disabled,
    className = '',
    variant = 'default',
    size = 'md',
    ...props
}: LoadingButtonProps) {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantClasses = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground'
    };

    const sizeClasses = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8'
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? (loadingText || 'Loading...') : children}
        </button>
    );
}

// Hook for async operations with loading state
export function useAsyncOperation() {
    const { setLoading } = useLoading();

    const executeAsync = async <T,>(
        operation: () => Promise<T>,
        loadingKey: string,
        options?: {
            onSuccess?: (result: T) => void;
            onError?: (error: Error) => void;
            onFinally?: () => void;
        }
    ): Promise<T | null> => {
        try {
            setLoading(loadingKey, true);
            const result = await operation();
            options?.onSuccess?.(result);
            return result;
        } catch (error) {
            console.error(`Error in ${loadingKey}:`, error);
            options?.onError?.(error as Error);
            return null;
        } finally {
            setLoading(loadingKey, false);
            options?.onFinally?.();
        }
    };

    return { executeAsync };
}
