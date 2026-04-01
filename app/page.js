import { ProductCard } from "./components/product-card";

export default async function HomePage({ searchParams }) {
  const {
    q = "",
    categories = "",
    min = 0,
    max = 15999,
  } = await searchParams || {};

  console.log(categories)

  // categories array
  const categoryList = categories ? categories.split(",") : [];

  const products = await fetch(
    `https://dummyjson.com/products/search?${q ? `q=${q}` : ""}&sortBy=title&limit=1600&select=title,price,thumbnail,category,brand`,
  )
    .then(res => res.json())
    .then(data => {
      return data.products.filter(product=>{
        const category = product.category.toLowerCase();  
        return categoryList.length === 0 || categoryList.map(c => c.toLowerCase()).includes(category);
      })  
      .filter(product=>{
        const price = product.price;
        return price >= min && price <= max;
      })
    });


  return (
    <main className="flex-1 p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-muted-foreground">
          Discover our wide range of products with advanced filtering options.
        </p>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-80">
          <p className="text-muted-foreground text-lg">No products found.</p>
        </div>
      )}
    </main>
  );
}
