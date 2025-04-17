"use client";

import { createContext, useContext } from "react";

// Define the type for a module
import { Module } from "@/app/api/db/route";

type ModuleContextType = {
    modules: Module[] | undefined;
};

// Create the context with a default value
const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const useModules = () => {
    const context = useContext(ModuleContext);
    if (!context) throw new Error("useModules must be used inside ModuleProvider");
    return context;
};

export const ModuleProvider = ({
    modules,
    children,
}: {
    modules: Module[];
    children: React.ReactNode;
}) => {
    return (
        <ModuleContext.Provider value={{ modules }}>
            {children}
        </ModuleContext.Provider>
    );
};