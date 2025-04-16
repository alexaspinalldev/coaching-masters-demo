"use client";

import mockData from "@/app/data/mockData.json";
import React, { useState } from "react";

interface Lesson {
    lessonId: number;
    title: string;
    videoSrc: string;
}
interface Module {
    moduleId: number;
    title: string;
    lessons: Lesson[];
}
// We'll infer these from supabase schema later

const courseModules: Module[] = mockData;

export default function ModuleView({ moduleId }: { moduleId: number }) {

    const module = courseModules.find(
        (module) => module.moduleId === Number(moduleId)
    );

    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(module?.lessons[0] || null);

    // Sanitise the youtube URL to allow the use of normal browser URL in the database
    let videoId = selectedLesson?.videoSrc.split("v=")[1];
    if (videoId?.includes("&")) {
        videoId = videoId.split("&")[0];
    }
    const embedUrl = `https://www.youtube.com/embed/${videoId}`

    return (
        <div>
            <h1>{module!.title}</h1>
            {
                selectedLesson?.videoSrc && (
                    <iframe className="w-full" src={embedUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                )
            }
            <ol>
                {
                    module?.lessons.map((lesson) => (
                        <li key={lesson.lessonId} onClick={() => setSelectedLesson(lesson)} >
                            <div>{lesson.title} </div>
                            < input type="checkbox" />
                        </li>
                    ))}
            </ol>
        </div>
    );
}