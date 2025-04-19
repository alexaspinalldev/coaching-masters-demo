import { eq } from 'drizzle-orm';
import { db, modules, lessons } from '@/db/index';

type Module = typeof modules.$inferInsert;
type Lesson = typeof lessons.$inferInsert;

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