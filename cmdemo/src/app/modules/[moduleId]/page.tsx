export default async function Module({ params }: Readonly<{ params: Promise<{ moduleId: string }> }>) {
  const { moduleId } = await params;
  return (
    <div className="">
      <main className="">
        <h1>{moduleId}</h1>
      </main>
      <footer>
      </footer>
    </div >
  );
}