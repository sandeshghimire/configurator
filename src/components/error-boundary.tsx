"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            errorInfo: null
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo
        });

        // Call optional error handler
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // Log to external service in production
        if (process.env.NODE_ENV === 'production') {
            this.logErrorToService(error, errorInfo);
        }
    }

    private logErrorToService(error: Error, errorInfo: ErrorInfo) {
        // Here you would typically send to an error tracking service
        // like Sentry, LogRocket, etc.
        console.error('Production error logged:', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString()
        });
    }

    private handleRetry = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    private handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                    <Card className="max-w-lg w-full">
                        <CardHeader className="text-center">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <CardTitle className="text-red-900">Something went wrong</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                    An unexpected error occurred while loading this page. Our team has been notified.
                                </AlertDescription>
                            </Alert>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <div className="bg-red-50 border border-red-200 rounded p-3">
                                    <h4 className="font-medium text-red-800 mb-2">Error Details (Development)</h4>
                                    <p className="text-sm text-red-700 font-mono">
                                        {this.state.error.message}
                                    </p>
                                    {this.state.errorInfo && (
                                        <details className="mt-2">
                                            <summary className="text-sm text-red-700 cursor-pointer">
                                                Component Stack
                                            </summary>
                                            <pre className="text-xs text-red-600 mt-1 overflow-auto">
                                                {this.state.errorInfo.componentStack}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <Button
                                    onClick={this.handleRetry}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Try Again
                                </Button>
                                <Button
                                    onClick={this.handleGoHome}
                                    className="flex-1"
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Go Home
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

// Hook for error handling in functional components
export function useErrorHandler() {
    const handleError = (error: Error, context?: string) => {
        console.error(`Error in ${context || 'component'}:`, error);

        // In production, you would send this to an error tracking service
        if (process.env.NODE_ENV === 'production') {
            // logToErrorService(error, context);
        }
    };

    return { handleError };
}
