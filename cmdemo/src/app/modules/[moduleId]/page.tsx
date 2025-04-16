import ModuleView from "@/app/components/moduleView";

export default async function Module({ params }: Readonly<{ params: Promise<{ moduleId: number }> }>) {
  const { moduleId } = await params;

  return (
    <div>
      <main>
        <a href="/modules">Back to module list</a>
        <ModuleView moduleId={moduleId} />
      </main>
    </div >
  );
}