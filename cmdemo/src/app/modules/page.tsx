"use client";

import React from 'react';
import { useModules } from "@/app/context/modulesContext";
import Link from "next/link";
export default function ModuleList() {

    const { modules } = useModules();

    return (
        <main className="grow">
            <h1 className="text-primary text-2xl font-serif font-bold">Module List</h1>
            <ul>
                {modules?.map((module) => (
                    <li key={module.id}>
                        <Link href={`/modules/${module.id}`}>{module.title}</Link>
                        <p>{module.description}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
