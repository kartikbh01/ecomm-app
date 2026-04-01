export default async function HomePage({ searchParams }) {
  return (
    <main className="flex-1 p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          Discover our wide range of products with advanced filtering options.
        </p>
      </div>
    </main>
  );
}
