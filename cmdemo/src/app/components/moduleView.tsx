"use client";

import React, { useState } from "react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Lesson, Module } from "@/app/api/db/route"; // Import types
import { useModules } from "@/app/context/modulesContext"; // Import the context

export default function ModuleView({ moduleId, lessons }: { moduleId: number, lessons: Lesson[] }) {

    // Get the modules from the context and use the param to find the title
    const { modules } = useModules();
    const module = modules?.find((module: Module) => module.id === Number(moduleId));

    // Set the lessons within the module, based on what the database returns
    const [lessonsViewed, setLessonsViewed] = useState(lessons);

    const handleCheckboxChange = async (lessonId: number) => {
        const updatedLessons: Lesson[] = lessons.map((lesson) =>
            lesson.id === Number(lessonId) ? { ...lesson, viewed: true } : lesson
        );
        setLessonsViewed(updatedLessons);

        try {
            await fetch(`/api/db/viewed`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                // Convert to an array of lesson ID objects that need updating
                body: JSON.stringify(updatedLessons
                    .filter(lesson => lesson.viewed === true)
                    .map(lesson => ({ id: lesson.id }))
                ),
            });
        } catch (error) {
            console.error('Failed to update lessons', error);
            // Revert on error to keep the db and state in sync
            setLessonsViewed(lessons);
        }
    }

    // Statefully track the current lesson
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(lessons[0] || null);


    // Sanitise the youtube URL to allow the use of normal browser URL in the database
    let videoId = selectedLesson?.videoSrc?.split("v=")[1];
    if (videoId?.includes("&")) {
        videoId = videoId.split("&")[0];
    }
    const embedUrl = `https://www.youtube.com/embed/${videoId}`

    return (
        <div>
            <h1 className="text-primary text-2xl font-serif font-bold">{module?.title}</h1>
            <div className="flex justify-center p-4">
                {
                    selectedLesson?.videoSrc && (
                        <iframe className="w-full max-w-[1000px] aspect-16/9" src={embedUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    )
                }</div>
            <ol>
                {
                    lessons.map((lesson) => (
                        // Tabs
                        // Table
                        <li key={lesson.id}>
                            <div onClick={() => setSelectedLesson(lesson)}>{lesson.title}</div>
                            <Checkbox
                                {...lesson.viewed ? { checked: true } : null}
                                onCheckedChange={(checked) => {
                                    if (checked === true) {
                                        handleCheckboxChange(lesson.id);
                                    }
                                }}
                            />
                        </li>
                    ))}
            </ol>
        </div>
    );
}