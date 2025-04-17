
import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const modules = pgTable('modules', {
    id: serial('id').primaryKey(),
    title: text('title'),
    description: text('description'),
});

export const lessons = pgTable('lessons', {
    id: serial('id').primaryKey(),
    title: text('title'),
    description: text('description'),
    moduleId: serial('module_id').references(() => modules.id),
    transcript: text('transcript'),
    videoSrc: text('video_src'),
    viewed: boolean('viewed').default(false)
});

export const modulesRelations = relations(modules, ({ many }) => ({
    lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one }) => ({
    module: one(modules, {
        fields: [lessons.moduleId],
        references: [modules.id],
    }),
}));
