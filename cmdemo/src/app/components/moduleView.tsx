"use client";

import React, { useState } from "react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table"

import { modules, lessons } from '@/db/index';
import { useModules } from "@/app/context/modulesContext"; // Import the context

type Module = typeof modules.$inferInsert;
type Lesson = typeof lessons.$inferInsert;

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
        <div className="w-full h-full pt-2 md:pt-4 p-4 items-center">
            <h1 className="text-primary text-2xl md:text-4xl font-serif font-bold mb-3 md:mb-5">{module?.title}</h1>
            <div className="flex justify-center mb-5">
                {
                    selectedLesson?.videoSrc && (
                        <iframe title={selectedLesson.title ? selectedLesson.title : "Lesson video"} className="w-full max-w-[1000px] aspect-16/9" src={embedUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    )
                }</div>
            <div className="flex justify-center">
                <Tabs defaultValue="lessonList" className="w-full md:w-4/5 lg:w-4/5">
                    <TabsList className="flex justify-evenly w-full mb-3">
                        <TabsTrigger value="lessonList">Lessons in this module</TabsTrigger>
                        <TabsTrigger value="transcript">Video transcript</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lessonList">
                        {/* // TODO: revisit why this label refused to line up properly when inside the table element */}
                        <div className="w-full flex justify-end">
                            <div className="text-sm text-foreground">Mark as watched</div>
                        </div>
                        <Table className="w-full">
                            {/* <TableHeader className="w-full flex justify-end">
                                <TableHead className="w-fit h-auto">Mark as watched</TableHead>
                            </TableHeader> */}
                            <TableBody>
                                {
                                    lessons.map((lesson) => (
                                        <TableRow key={lesson.id}>
                                            <TableCell className="text-lg sm:text-xl cursor-pointer" onClick={() => setSelectedLesson(lesson)}>{lesson.title}</TableCell>
                                            <TableCell><Checkbox aria-label="lesson viewed"
                                                {...lesson.viewed ? { checked: true } : null}
                                                onCheckedChange={(checked) => {
                                                    if (checked === true) {
                                                        handleCheckboxChange(Number(lesson.id));
                                                    }
                                                }}
                                            /></TableCell>
                                        </TableRow>
                                    ))}

                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent className="p-2 md:px-5 lg:px-8" value="transcript">{selectedLesson?.transcript}</TabsContent>
                </Tabs>
            </div>

        </div>
    );
}