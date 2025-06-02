import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const limit = parseInt(searchParams.get('limit') || '5');

        if (!category) {
            return NextResponse.json(
                { error: 'Category parameter is required' },
                { status: 400 }
            );
        }

        const db = getDatabase();
        const popularChoices = await db.getPopularChoices(category, limit);

        return NextResponse.json({
            category,
            popularChoices
        });

    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics data' },
            { status: 500 }
        );
    }
}
