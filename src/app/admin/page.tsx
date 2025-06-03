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
    Building,
    User,
    Clock,
    MapPin,
    Globe,
    CheckCircle,
    AlertCircle,
    Send
} from "lucide-react";
import { format } from 'date-fns';
import { LoadingSpinner, LoadingButton } from "@/components/loading-system";
import { Input } from "@/components/ui/input";

interface Configuration {
    id: string;
    title?: string;
    description?: string;
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

    const updateConfigurationStatus = async (configId: string, newStatus: Configuration['status']) => {
        try {
            const response = await fetch(`/api/configurations/${configId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setConfigurations(prev =>
                    prev.map(config =>
                        config.id === configId
                            ? { ...config, status: newStatus }
                            : config
                    )
                );
                if (selectedConfig?.id === configId) {
                    setSelectedConfig(prev => prev ? { ...prev, status: newStatus } : null);
                }
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const sendFollowUpEmail = async (contactInfo: any) => {
        // This would integrate with your email service
        const emailBody = `Dear ${contactInfo.fullName || 'Customer'},\n\nThank you for your configuration submission. We are reviewing your requirements and will get back to you soon.\n\nBest regards,\nThe Configuration Team`;

        if (contactInfo.email) {
            window.open(`mailto:${contactInfo.email}?subject=Configuration Follow-up&body=${encodeURIComponent(emailBody)}`);
        }
    };

    const exportSingleConfiguration = (config: Configuration) => {
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `configuration_${config.id}_${format(new Date(), 'yyyy-MM-dd')}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Filter configurations based on search term
    const filteredConfigurations = configurations.filter(config => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        let contactInfo;
        try {
            contactInfo = JSON.parse(config.contactInfo);
        } catch {
            contactInfo = {};
        }

        return (
            (config.title?.toLowerCase().includes(searchLower)) ||
            (config.description?.toLowerCase().includes(searchLower)) ||
            (config.industryFocus?.toLowerCase().includes(searchLower)) ||
            (contactInfo.companyName?.toLowerCase().includes(searchLower)) ||
            (contactInfo.fullName?.toLowerCase().includes(searchLower)) ||
            (contactInfo.email?.toLowerCase().includes(searchLower))
        );
    });

    if (loading) {
        return (
            <div className="p-4">
                <div className="animate-pulse space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-20 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Admin Dashboard</h1>
                <div className="flex space-x-2">
                    <Button onClick={fetchConfigurations} variant="outline" size="sm">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Refresh
                    </Button>
                    <Button onClick={downloadConfigurationData} size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-3">
                    <div className="text-xs text-gray-600">Total</div>
                    <div className="text-xl font-bold">{filteredConfigurations.length}</div>
                </Card>
                <Card className="p-3">
                    <div className="text-xs text-gray-600">Pending</div>
                    <div className="text-xl font-bold text-blue-600">
                        {filteredConfigurations.filter(c => c.status === 'submitted').length}
                    </div>
                </Card>
                <Card className="p-3">
                    <div className="text-xs text-gray-600">Completed</div>
                    <div className="text-xl font-bold text-green-600">
                        {filteredConfigurations.filter(c => c.status === 'completed').length}
                    </div>
                </Card>
                <Card className="p-3">
                    <div className="text-xs text-gray-600">This Week</div>
                    <div className="text-xl font-bold text-purple-600">
                        {filteredConfigurations.filter(c =>
                            new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                        ).length}
                    </div>
                </Card>
            </div>

            {/* Configurations List */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-sm">Submissions ({filteredConfigurations.length})</CardTitle>
                        <div className="relative w-48">
                            <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-7 h-8 text-xs"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    {filteredConfigurations.length === 0 ? (
                        <div className="text-center py-6 text-gray-500 text-sm">
                            {searchTerm ? 'No matches found.' : 'No submissions yet.'}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredConfigurations.slice(0, 15).map((config) => {
                                let contactInfo;
                                try {
                                    contactInfo = JSON.parse(config.contactInfo);
                                } catch {
                                    contactInfo = {};
                                }

                                return (
                                    <div key={config.id} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 transition-colors">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium text-xs truncate">
                                                    {config.title || contactInfo.companyName || contactInfo.fullName || 'Unknown'}
                                                </h3>
                                                <Badge className={`${getStatusColor(config.status)} text-xs px-1 py-0`}>
                                                    {config.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-3 mt-1">
                                                <span className="text-xs text-gray-500">
                                                    {config.industryFocus || 'No industry'}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {format(new Date(config.createdAt), 'MMM dd')}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedConfig(config)}
                                            className="h-6 px-2"
                                        >
                                            <Eye className="w-3 h-3" />
                                        </Button>
                                    </div>
                                );
                            })}
                            {filteredConfigurations.length > 15 && (
                                <div className="text-center pt-2">
                                    <p className="text-xs text-gray-500">
                                        Showing 15 of {filteredConfigurations.length}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Configuration Detail Modal */}
            {selectedConfig && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <CardHeader className="pb-4 border-b">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Building className="w-5 h-5" />
                                        Configuration Details
                                    </CardTitle>
                                    <p className="text-sm text-gray-500 mt-1">ID: {selectedConfig.id}</p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedConfig(null)}>
                                    ×
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            {(() => {
                                let contactInfo;
                                try {
                                    contactInfo = JSON.parse(selectedConfig.contactInfo);
                                } catch {
                                    contactInfo = {};
                                }

                                return (
                                    <div className="space-y-8">
                                        {/* Status and Quick Actions */}
                                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Badge className={`${getStatusColor(selectedConfig.status)} px-3 py-1`}>
                                                    {selectedConfig.status.toUpperCase()}
                                                </Badge>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {format(new Date(selectedConfig.createdAt), 'PPP p')}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {selectedConfig.status === 'submitted' && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => updateConfigurationStatus(selectedConfig.id, 'reviewed')}
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                        Mark Reviewed
                                                    </Button>
                                                )}
                                                {selectedConfig.status === 'reviewed' && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => updateConfigurationStatus(selectedConfig.id, 'completed')}
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                        Mark Completed
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Main Information Grid */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            {/* Contact Information */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                    <User className="w-5 h-5 mr-2" />
                                                    Contact Information
                                                </h3>
                                                <div className="space-y-4">
                                                    {contactInfo.fullName && (
                                                        <div className="flex items-center gap-3">
                                                            <User className="w-4 h-4 text-gray-400" />
                                                            <div>
                                                                <label className="text-xs font-medium text-gray-600 block">Full Name</label>
                                                                <p className="text-sm font-medium">{contactInfo.fullName}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {contactInfo.email && (
                                                        <div className="flex items-center gap-3">
                                                            <Mail className="w-4 h-4 text-gray-400" />
                                                            <div>
                                                                <label className="text-xs font-medium text-gray-600 block">Email</label>
                                                                <a href={`mailto:${contactInfo.email}`} className="text-sm text-blue-600 hover:underline">
                                                                    {contactInfo.email}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {contactInfo.phone && (
                                                        <div className="flex items-center gap-3">
                                                            <Phone className="w-4 h-4 text-gray-400" />
                                                            <div>
                                                                <label className="text-xs font-medium text-gray-600 block">Phone</label>
                                                                <a href={`tel:${contactInfo.phone}`} className="text-sm text-blue-600 hover:underline">
                                                                    {contactInfo.phone}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {contactInfo.companyName && (
                                                        <div className="flex items-center gap-3">
                                                            <Building className="w-4 h-4 text-gray-400" />
                                                            <div>
                                                                <label className="text-xs font-medium text-gray-600 block">Company</label>
                                                                <p className="text-sm font-medium">{contactInfo.companyName}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {contactInfo.jobTitle && (
                                                        <div className="flex items-center gap-3">
                                                            <User className="w-4 h-4 text-gray-400" />
                                                            <div>
                                                                <label className="text-xs font-medium text-gray-600 block">Job Title</label>
                                                                <p className="text-sm">{contactInfo.jobTitle}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {(contactInfo.city || contactInfo.country) && (
                                                        <div className="flex items-center gap-3">
                                                            <MapPin className="w-4 h-4 text-gray-400" />
                                                            <div>
                                                                <label className="text-xs font-medium text-gray-600 block">Location</label>
                                                                <p className="text-sm">
                                                                    {[contactInfo.city, contactInfo.country].filter(Boolean).join(', ')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Project Information */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                                    <Globe className="w-5 h-5 mr-2" />
                                                    Project Details
                                                </h3>
                                                <div className="space-y-4">
                                                    {selectedConfig.title && (
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-600 block mb-1">Project Title</label>
                                                            <p className="text-sm font-medium">{selectedConfig.title}</p>
                                                        </div>
                                                    )}
                                                    {selectedConfig.industryFocus && (
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-600 block mb-1">Industry Focus</label>
                                                            <Badge variant="secondary" className="text-xs">
                                                                {selectedConfig.industryFocus}
                                                            </Badge>
                                                        </div>
                                                    )}
                                                    {selectedConfig.description && (
                                                        <div>
                                                            <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
                                                            <p className="text-sm leading-relaxed bg-gray-50 p-3 rounded">
                                                                {selectedConfig.description}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Configuration Data */}
                                        <div>
                                            <details className="group">
                                                <summary className="cursor-pointer text-lg font-semibold text-gray-900 mb-4 hover:text-gray-700 flex items-center">
                                                    <BarChart3 className="w-5 h-5 mr-2" />
                                                    Technical Configuration Data
                                                    <span className="ml-auto text-xs text-gray-500">(Click to expand)</span>
                                                </summary>
                                                <div className="mt-4">
                                                    <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto max-h-80 border">
                                                        {JSON.stringify(selectedConfig, null, 2)}
                                                    </pre>
                                                </div>
                                            </details>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-3 pt-6 border-t">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => sendFollowUpEmail(contactInfo)}
                                                disabled={!contactInfo.email}
                                            >
                                                <Mail className="w-4 h-4 mr-2" />
                                                Send Follow-up Email
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => contactInfo.phone && window.open(`tel:${contactInfo.phone}`)}
                                                disabled={!contactInfo.phone}
                                            >
                                                <Phone className="w-4 h-4 mr-2" />
                                                Call Contact
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => exportSingleConfiguration(selectedConfig)}
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Export Configuration
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    const message = `Configuration ${selectedConfig.id} requires attention. Industry: ${selectedConfig.industryFocus || 'Not specified'}`;
                                                    window.open(`https://slack.com/app_redirect?channel=C1234567890&message=${encodeURIComponent(message)}`);
                                                }}
                                            >
                                                <Send className="w-4 h-4 mr-2" />
                                                Notify Team
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => copyConfigurationLink(selectedConfig.id)}
                                            >
                                                <Globe className="w-4 h-4 mr-2" />
                                                Copy Link
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })()}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
