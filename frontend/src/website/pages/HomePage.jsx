import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import products from "../data/product"

const HomePage = () => {

  return (
    <>

      <Navbar />

      <div className="bg-gray-50">

        {/* Hero Section */}
        <section className="bg-black text-white py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Discover Your Style
          </h1>
          <p className="mt-4 text-gray-300">
            Trendy collections at unbeatable prices
          </p>
          <a
            href="/shop"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium"
          >
            Shop Now
          </a>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">
            Featured Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;