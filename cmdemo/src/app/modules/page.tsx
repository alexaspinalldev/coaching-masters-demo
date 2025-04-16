import mockData from "@/app/data/mockData.json";

export default async function ModuleList() {

    const courseModules = mockData;
    // TODO: Fetch the data from the server using react-query

    return (
        <div className="">
            <main className="">
                <h1>Module List</h1>
                <ul>
                    {courseModules.map((module: { moduleId: number, title: string }) => (
                        <li key={module.moduleId}>
                            <a href={`/modules/${module.moduleId}`}>{module.title}</a>
                        </li>
                    ))}
                </ul>
            </main>
        </div >
    );
}
