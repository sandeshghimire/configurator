import { NextRequest, NextResponse } from 'next/server';
import { emailService, type NotificationData } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const data: NotificationData = await request.json();

        // Validate required fields
        if (!data.id || !data.contactInfo || !data.submittedAt) {
            return NextResponse.json(
                { error: 'Missing required notification data' },
                { status: 400 }
            );
        }

        const results = {
            adminNotification: false,
            userConfirmation: false,
        };

        // Send admin notification
        try {
            results.adminNotification = await emailService.sendAdminNotification(data);
        } catch (error) {
            console.error('Admin notification failed:', error);
        }

        // Send user confirmation if email is provided
        if (data.contactInfo.email) {
            try {
                results.userConfirmation = await emailService.sendUserConfirmation(data);
            } catch (error) {
                console.error('User confirmation failed:', error);
            }
        }

        return NextResponse.json({
            success: results.adminNotification || results.userConfirmation,
            results,
            message: 'Notification processing completed'
        });

    } catch (error) {
        console.error('Email notification error:', error);
        return NextResponse.json(
            { error: 'Failed to process email notifications' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const connectionTest = await emailService.testConnection();

        return NextResponse.json({
            status: connectionTest ? 'healthy' : 'disconnected',
            message: connectionTest
                ? 'Email service is operational'
                : 'Email service connection failed',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: 'error',
                message: 'Email service health check failed',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
