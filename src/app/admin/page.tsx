"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Eye,
    Download,
    RefreshCw,
    BarChart3,
    Users,
    TrendingUp,
    Calendar,
    Filter,
    Search,
    Mail,
    Phone,
    Building
} from "lucide-react";
import { format } from 'date-fns';
import { LoadingSpinner, LoadingButton } from "@/components/loading-system";

interface Configuration {
    id: string;
    industryFocus?: string;
    contactInfo: string;
    createdAt: string;
    status: 'draft' | 'submitted' | 'reviewed' | 'completed';
}

interface AnalyticsData {
    category: string;
    popularChoices: Array<{ option: string, count: number }>;
}

interface DashboardStats {
    totalSubmissions: number;
    todaySubmissions: number;
    weekSubmissions: number;
    completionRate: number;
    popularIndustries: Array<{ industry: string, count: number }>;
    statusDistribution: Array<{ status: string, count: number }>;
}

export default function AdminDashboard() {
    const [configurations, setConfigurations] = useState<Configuration[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedConfig, setSelectedConfig] = useState<Configuration | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchConfigurations(),
                fetchAnalytics(),
                fetchStats()
            ]);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchConfigurations = async () => {
        try {
            const response = await fetch('/api/configurations');
            if (response.ok) {
                const data = await response.json();
                setConfigurations(data);
            }
        } catch (error) {
            console.error('Failed to fetch configurations:', error);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const categories = ['industry', 'platform', 'os'];
            const analyticsPromises = categories.map(category =>
                fetch(`/api/analytics?category=${category}&limit=10`)
                    .then(res => res.json())
            );

            const analyticsResults = await Promise.all(analyticsPromises);
            setAnalytics(analyticsResults);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        }
    };

    const fetchStats = async () => {
        try {
            // Calculate stats from configurations data
            const today = new Date();
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

            const todaySubmissions = configurations.filter(config =>
                new Date(config.createdAt).toDateString() === today.toDateString()
            ).length;

            const weekSubmissions = configurations.filter(config =>
                new Date(config.createdAt) >= weekAgo
            ).length;

            const completedConfigs = configurations.filter(config =>
                config.status === 'completed'
            ).length;

            const completionRate = configurations.length > 0
                ? Math.round((completedConfigs / configurations.length) * 100)
                : 0;

            // Industry distribution
            const industryCount: Record<string, number> = {};
            configurations.forEach(config => {
                if (config.industryFocus) {
                    industryCount[config.industryFocus] = (industryCount[config.industryFocus] || 0) + 1;
                }
            });

            const popularIndustries = Object.entries(industryCount)
                .map(([industry, count]) => ({ industry, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

            // Status distribution
            const statusCount: Record<string, number> = {};
            configurations.forEach(config => {
                statusCount[config.status] = (statusCount[config.status] || 0) + 1;
            });

            const statusDistribution = Object.entries(statusCount)
                .map(([status, count]) => ({ status, count }));

            setStats({
                totalSubmissions: configurations.length,
                todaySubmissions,
                weekSubmissions,
                completionRate,
                popularIndustries,
                statusDistribution
            });
        } catch (error) {
            console.error('Failed to calculate stats:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'submitted': return 'bg-blue-100 text-blue-800';
            case 'reviewed': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const downloadConfigurationData = () => {
        const dataStr = JSON.stringify(configurations, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `configurations_${format(new Date(), 'yyyy-MM-dd')}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex space-x-2">
                    <Button onClick={fetchConfigurations} variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                    <Button onClick={downloadConfigurationData}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{configurations.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {configurations.filter(c => c.status === 'submitted').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {configurations.filter(c => c.status === 'completed').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {configurations.filter(c =>
                                new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                            ).length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analytics.map((analytic, index) => (
                    <Card key={index}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Popular {analytic.category.charAt(0).toUpperCase() + analytic.category.slice(1)} Choices
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {analytic.popularChoices.slice(0, 5).map((choice, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <span className="text-sm truncate">{choice.option}</span>
                                        <Badge variant="secondary">{choice.count}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Configurations List */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {configurations.slice(0, 10).map((config) => {
                            let contactInfo;
                            try {
                                contactInfo = JSON.parse(config.contactInfo);
                            } catch {
                                contactInfo = {};
                            }

                            return (
                                <div key={config.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-medium">
                                                {contactInfo.companyName || contactInfo.fullName || 'Unknown'}
                                            </h3>
                                            <Badge className={getStatusColor(config.status)}>
                                                {config.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Industry: {config.industryFocus || 'Not specified'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Submitted: {format(new Date(config.createdAt), 'PPP')}
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedConfig(config)}
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Configuration Detail Modal would go here */}
            {selectedConfig && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Configuration Details</CardTitle>
                                <Button variant="ghost" onClick={() => setSelectedConfig(null)}>×</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <pre className="text-sm bg-gray-100 p-4 rounded overflow-x-auto">
                                {JSON.stringify(selectedConfig, null, 2)}
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
