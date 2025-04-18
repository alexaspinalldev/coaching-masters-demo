import ModuleView from "@/app/components/moduleView";
import Link from "next/link";
import { getLessonsByModuleId } from "@/app/api/db/route";
import { ChevronLeft } from "lucide-react";


export default async function Module({ params }: Readonly<{ params: Promise<{ moduleId: number }> }>) {
  const { moduleId } = await params;
  const lessons = (await getLessonsByModuleId(moduleId));

  return (
    <div>
      <Link className="flex items-center pl-3 text-sm md:text-base hover:text-primary" href="/modules"><ChevronLeft className="size-[16px] md:size-[20px]" />Back to your modules</Link>
      <ModuleView moduleId={moduleId} lessons={lessons} />
    </div >
  );
}