import mockData from "@/app/data/mockData.json";
const courseModules = mockData;

export default async function Module({ params }: Readonly<{ params: Promise<{ moduleId: string }> }>) {
  const { moduleId } = await params;
  const module = courseModules.find((module: { moduleId: number }) => module.moduleId === Number(moduleId));
  return (
    <div>
      <main>

        <h1>{module?.title}</h1>
        <ol>
          {module?.lessons.map((lesson: { lessonId: number, title: string }) => (
            <li key={lesson.lessonId}>
              <div>{lesson.title}</div>
              <input type="checkbox" />
            </li>
          ))}
        </ol>
      </main>
    </div >
  );
}