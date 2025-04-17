"use client";

import React from 'react';
import { useModules } from "@/app/context/modulesContext";
import ModuleCard from "@/app/components/moduleCard";

export default function ModuleList() {
    const { modules } = useModules();
    return (
        <main className="grow p-6 md:p-10 lg:p-12">
            <h1 className="text-primary font-serif text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3 md:mb-5">
                Your enrolled modules
            </h1>            <ul>
                {modules?.map((module) => (
                    <li key={module.id}>
                        <ModuleCard
                            title={module.title}
                            description={module.description}
                            href={`/modules/${module.id}`}
                        />
                    </li>
                ))}
            </ul>
        </main>
    );
}
