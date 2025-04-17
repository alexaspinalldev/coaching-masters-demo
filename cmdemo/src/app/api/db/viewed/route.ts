import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { lessons } from '@/db/schema/schema';
import { inArray } from 'drizzle-orm';

export async function PATCH(req: NextRequest) {
    // Converts back to an array of lesson IDs
    const viewedLessons = await req.json();
    console.log('viewedLessons', viewedLessons);
    const lessonIds = viewedLessons.map((lesson: { id: number }) => lesson.id);

    await db.update(lessons)
        .set({ viewed: true })
        .where(inArray(lessons.id, lessonIds));

    return NextResponse.json({ success: true });
}
