"use client";

import React, { useState } from "react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Lesson, Module } from "@/app/api/db/route"; // Import types
import { useModules } from "@/app/context/modulesContext"; // Import the context

export default function ModuleView({ moduleId, lessons }: { moduleId: number, lessons: Lesson[] }) {
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(lessons[0] || null);

    const { modules } = useModules();
    const module = modules?.find((module: Module) => module.id === Number(moduleId));

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
                        <li key={lesson.id} onClick={() => setSelectedLesson(lesson)} >
                            <div>{lesson.title} </div>
                            <Checkbox
                                checked={selectedLesson?.viewed === true}
                                onCheckedChange={() => setSelectedLesson(lesson)} />
                        </li>
                    ))}
            </ol>
        </div>
    );
}