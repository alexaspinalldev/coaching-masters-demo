export default async function ModuleList() {

    const courseModules = await fetch("../../data/courseModules.json")

    return (
        <div className="">
            <main className="">
                <h1>Module List</h1>
                {/* // TODO: map over the modules here and use the index as the key and moduleId */}
            </main>
        </div >
    );
}
