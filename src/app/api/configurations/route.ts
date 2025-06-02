import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.json();
        const db = getDatabase();

        // Generate unique ID for this configuration
        const configId = randomUUID();

        // Serialize complex data structures
        const configurationData = {
            id: configId,
            industryFocus: formData.industryFocus,
            otherIndustry: formData.otherIndustry,
            corePlatforms: JSON.stringify(formData.corePlatforms || []),
            operatingSystem: formData.operatingSystem,
            keyFeatures: JSON.stringify(formData.keyFeatures || []),
            hardwareRequirements: JSON.stringify(formData.hardwareRequirements || []),
            middlewareFrameworks: JSON.stringify(formData.middlewareFrameworks || []),
            driverNeeds: JSON.stringify(formData.driverNeeds || []),
            cloudPlatforms: JSON.stringify(formData.cloudPlatforms || []),
            iotIntegration: formData.iotIntegration,
            dataProcessing: JSON.stringify(formData.dataProcessing || []),
            cloudStrategy: formData.cloudStrategy,
            contactInfo: JSON.stringify(formData.contactInfo || {}),
            status: 'submitted' as const,
            createdAt: new Date().toISOString()
        };

        // Save to database
        await db.saveConfiguration(configurationData);

        // Track analytics for popular choices
        if (formData.industryFocus) {
            await db.trackSelection('industry', formData.industryFocus);
        }

        if (formData.corePlatforms) {
            for (const platform of formData.corePlatforms) {
                await db.trackSelection('platform', platform);
            }
        }

        if (formData.operatingSystem) {
            await db.trackSelection('os', formData.operatingSystem);
        }

        // TODO: Send email notification to engineering team
        // await sendNotificationEmail(configurationData);

        return NextResponse.json({
            success: true,
            configurationId: configId,
            message: 'Configuration submitted successfully'
        });

    } catch (error) {
        console.error('Error submitting configuration:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit configuration' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const configId = searchParams.get('id');

        const db = getDatabase();

        if (configId) {
            // Get specific configuration
            const config = await db.getConfiguration(configId);
            if (!config) {
                return NextResponse.json(
                    { error: 'Configuration not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json(config);
        } else {
            // Get all configurations (admin functionality)
            const configs = await db.getAllConfigurations();
            return NextResponse.json(configs);
        }

    } catch (error) {
        console.error('Error fetching configurations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch configurations' },
            { status: 500 }
        );
    }
}
