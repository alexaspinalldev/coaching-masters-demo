import ModuleView from "@/app/components/moduleView";
import Link from "next/link";
import { getLessonsByModuleId } from "@/app/api/db/route";

export default async function Module({ params }: Readonly<{ params: Promise<{ moduleId: number }> }>) {
  const { moduleId } = await params;
  const lessons = (await getLessonsByModuleId(moduleId));

  return (
    <div>
      <main>
        <Link href="/modules">Back to module list</Link>
        <ModuleView moduleId={moduleId} lessons={lessons} />
      </main>
    </div >
  );
}