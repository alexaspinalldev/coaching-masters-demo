import { eq } from 'drizzle-orm';
import { db } from '@/db/index';
import { modules, lessons } from '@/db/schema/schema'; // Import the modules table schema

// Get function for modules or specific lessons
export async function GET(moduleId?: number) {
    try {
        if (moduleId) {
            // Fetch lessons by moduleId
            const lessonsByModule = await db.select().from(lessons).where(eq(lessons.moduleId, (Number(moduleId))));
            return lessonsByModule;
        } else {
            // Fetch all modules
            const allModules = await db.select().from(modules);
            return allModules;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Post function for lessons viewed