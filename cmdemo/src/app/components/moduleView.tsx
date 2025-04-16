"use client";

import mockData from "@/app/data/mockData.json";
import React, { useState } from "react";

export default function ModuleView({ moduleId }: { moduleId: number }) {
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

    const courseModules: Module[] = mockData;

    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const module = courseModules.find(
        (module) => module.moduleId === Number(moduleId)
    );

    return (
        <div>
            <h1>{module?.title || "Module not found"} </h1>
            {
                selectedLesson?.videoSrc && (
                    <iframe
                        src={selectedLesson.videoSrc}
                        width="640"
                        height="360"
                        allowFullScreen
                        title={selectedLesson.title}
                    > </iframe>
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