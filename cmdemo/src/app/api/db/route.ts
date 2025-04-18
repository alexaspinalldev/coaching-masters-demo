import { eq } from 'drizzle-orm';
import { db } from '@/db/index';
import { modules, lessons } from '@/db/schema/schema'; // Import the modules table schema

export interface Lesson {
    id: number;
    title: string | null;
    videoSrc: string | null;
    viewed: boolean | null;
    moduleId: number | null;
    description: string | null;
    transcript: string | null;
}

export interface Module {
    id: number;
    title: string | null;
    description: string | null;
};

// Get function for modules or specific lessons
export async function getModules(): Promise<Module[]> {
    try {
        const allModules: Module[] = await db.select().from(modules);
        return allModules;
    } catch (error) {
        console.error('Error fetching modules:', error);
        return [];
    }
}

// Function to fetch lessons by moduleId
export async function getLessonsByModuleId(moduleId: number): Promise<Lesson[]> {
    try {
        const lessonsByModule: Lesson[] = await db
            .select()
            .from(lessons)
            .where(eq(lessons.moduleId, moduleId));
        return lessonsByModule;
    } catch (error) {
        console.error('Error fetching lessons:', error);
        return [];
    }
}