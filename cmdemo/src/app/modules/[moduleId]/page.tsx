export default async function Module({ params }: Readonly<{ params: Promise<{ moduleId: string }> }>) {
  const { moduleId } = await params;
  return (
    <div>
      <main>
        <h1>{moduleId}</h1>
      </main>
    </div >
  );
}