"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Upload,
    Download,
    FileText,
    CheckCircle,
    AlertCircle,
    Trash2,
    Loader2
} from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";
import { LoadingButton } from "@/components/loading-system";

const ImportExportPage = () => {
    const {
        formData,
        exportConfiguration,
        importConfiguration,
        resetForm,
        completedSteps
    } = useConfigurator();

    const [isExporting, setIsExporting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [importResult, setImportResult] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = async () => {
        setIsExporting(true);

        try {
            const configData = exportConfiguration();
            const blob = new Blob([configData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `soc-configuration-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);

            setImportResult({
                success: true,
                message: 'Configuration exported successfully!'
            });
        } catch (error) {
            console.error('Export error:', error);
            setImportResult({
                success: false,
                message: 'Failed to export configuration. Please try again.'
            });
        } finally {
            setIsExporting(false);
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        setImportResult(null);

        try {
            const text = await file.text();
            const success = importConfiguration(text);

            if (success) {
                setImportResult({
                    success: true,
                    message: 'Configuration imported successfully! You can now continue with your setup.'
                });
            } else {
                setImportResult({
                    success: false,
                    message: 'Invalid configuration file. Please check the file format and try again.'
                });
            }
        } catch (error) {
            console.error('Import error:', error);
            setImportResult({
                success: false,
                message: 'Failed to read the configuration file. Please ensure it\'s a valid JSON file.'
            });
        } finally {
            setIsImporting(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all configuration data? This action cannot be undone.')) {
            resetForm();
            setImportResult({
                success: true,
                message: 'Configuration has been reset successfully.'
            });
        }
    };

    const hasData = Object.keys(formData).length > 0;
    const completionPercentage = completedSteps.length > 0 ? Math.round((completedSteps.length / 10) * 100) : 0;

    return (
        <PageLayout
            title="Configuration Management"
            description="Import, export, or reset your SOC configuration data"
            stepId="import-export"
        >
            <div className="w-full space-y-6">

                {/* Current Configuration Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            Current Configuration Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-medium text-blue-900">Completion</h4>
                                <p className="text-2xl font-bold text-blue-600">{completionPercentage}%</p>
                                <p className="text-sm text-blue-700">{completedSteps.length} of 10 steps</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-medium text-green-900">Data Status</h4>
                                <p className="text-lg font-semibold text-green-600">
                                    {hasData ? 'Has Data' : 'No Data'}
                                </p>
                                <p className="text-sm text-green-700">
                                    {hasData ? 'Configuration in progress' : 'Start configuring'}
                                </p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h4 className="font-medium text-purple-900">Last Modified</h4>
                                <p className="text-sm font-medium text-purple-600">
                                    {hasData ? 'Recently updated' : 'Never'}
                                </p>
                                <p className="text-xs text-purple-700">Auto-saved locally</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Import/Export Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Export Configuration */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm">
                                    <Download className="w-6 h-6 text-white" />
                                </div>
                                Export Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Download your current configuration as a JSON file. This includes all your selections and progress.
                            </p>

                            <div className="bg-gray-50 p-3 rounded-lg">
                                <h5 className="font-medium mb-2">Export includes:</h5>
                                <ul className="text-sm space-y-1 text-gray-600">
                                    <li>• All form data and selections</li>
                                    <li>• Completed steps tracking</li>
                                    <li>• Export timestamp</li>
                                    <li>• Configuration version</li>
                                </ul>
                            </div>

                            <LoadingButton
                                onClick={handleExport}
                                disabled={!hasData}
                                isLoading={isExporting}
                                loadingText="Exporting..."
                                className="w-full"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export Configuration
                            </LoadingButton>

                            {!hasData && (
                                <p className="text-xs text-gray-500">
                                    Complete at least one configuration step to enable export.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Import Configuration */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                                    <Upload className="w-6 h-6 text-white" />
                                </div>
                                Import Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Upload a previously exported configuration file to restore your settings.
                            </p>

                            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    ⚠️ Importing will replace your current configuration data.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="config-file">Configuration File (.json)</Label>
                                <Input
                                    id="config-file"
                                    type="file"
                                    accept=".json"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <LoadingButton
                                    onClick={handleImportClick}
                                    isLoading={isImporting}
                                    loadingText="Importing..."
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose File to Import
                                </LoadingButton>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Reset Configuration */}
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg text-red-700">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-sm">
                                <Trash2 className="w-6 h-6 text-white" />
                            </div>
                            Reset Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                This will permanently delete all your configuration data and progress. This action cannot be undone.
                            </AlertDescription>
                        </Alert>

                        <Button
                            onClick={handleReset}
                            disabled={!hasData}
                            variant="destructive"
                            className="w-full"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Reset All Configuration Data
                        </Button>

                        {!hasData && (
                            <p className="text-xs text-gray-500 text-center">
                                No configuration data to reset.
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Result Messages */}
                {importResult && (
                    <Alert variant={importResult.success ? "default" : "destructive"}>
                        {importResult.success ? (
                            <CheckCircle className="h-4 w-4" />
                        ) : (
                            <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>
                            {importResult.message}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Usage Tips */}
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-blue-900 flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-sm">
                                <span className="text-2xl">💡</span>
                            </div>
                            Tips for Configuration Management
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-blue-800 space-y-2">
                        <p>• <strong>Regular Backups:</strong> Export your configuration regularly to avoid losing progress.</p>
                        <p>• <strong>Version Control:</strong> Use descriptive filenames with dates for multiple versions.</p>
                        <p>• <strong>Sharing:</strong> Share configuration files with team members for collaborative setup.</p>
                        <p>• <strong>Templates:</strong> Create template configurations for different project types.</p>
                    </CardContent>
                </Card>
            </div>
        </PageLayout>
    );
};

export default ImportExportPage;
