"use client";

import React from 'react';
import { motion } from "motion/react"
import { useModules } from "@/app/context/modulesContext";
import ModuleCard from "@/app/components/moduleCard";

export default function ModuleList() {
    const { modules } = useModules();

    const containerVariants = {
        hidden: { opacity: .5 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { x: -100, opacity: 0 },
        show: { x: 0, opacity: 1 },
    };

    return (
        <div className="p-6 md:p-10 lg:p-12">
            <h1 className="text-primary font-serif text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3 md:mb-5">
                Your enrolled modules
            </h1>
            <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {modules?.map((module) => (
                    <motion.li key={module.id} variants={itemVariants}>
                        <ModuleCard
                            title={module.title}
                            description={module.description}
                            href={`/modules/${module.id}`}
                        />
                    </motion.li>
                ))}
            </motion.ul>
        </div>

    );
}
