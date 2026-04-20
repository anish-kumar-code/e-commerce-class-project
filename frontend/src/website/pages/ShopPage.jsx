import { useState } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../data/product";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ShopPage = () => {

  const [products] = useState(productsData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");
  const [priceFilter, setPriceFilter] = useState("");


  // 🔍 Search + Filter + Sort Logic
  const filteredProducts = products
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (category && item.category !== category) return false;
      return true;
    })
    .filter((item) => {
      if (priceFilter === "low") return item.price < 1000;
      if (priceFilter === "mid") return item.price >= 1000 && item.price <= 3000;
      if (priceFilter === "high") return item.price > 3000;
      return true;
    })
    .filter((item) => {
      if (rating) return item.rating >= rating;
      return true;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <>

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* <h1 className="text-2xl font-bold mb-6">
          Shop Products
        </h1> */}

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-200 p-5 rounded-2xl sticky top-20 space-y-6">

              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Filters</h2>
                <button
                  onClick={() => {
                    setSearch("");
                    setPriceFilter("");
                    setCategory("");
                    setRating("");
                  }}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Clear
                </button>
              </div>

              {/* Search */}
              <div>
                <label className="text-sm font-medium">Search</label>
                <div className="flex items-center border rounded-lg mt-2 px-3 focus-within:ring-2 focus-within:ring-black">
                  <FiSearch className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 outline-none text-sm bg-transparent"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium">Category</label>
                <div className="mt-2 space-y-2 text-sm">

                  {["All", "Shoes", "Clothing", "Electronics", "Accessories"].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={category === cat || (cat === "All" && category === "")}
                        onChange={(e) =>
                          setCategory(e.target.value === "All" ? "" : e.target.value)
                        }
                      />
                      {cat}
                    </label>
                  ))}

                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium">Price Range</label>
                <div className="mt-2 space-y-2 text-sm">

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      value=""
                      checked={priceFilter === ""}
                      onChange={(e) => setPriceFilter(e.target.value)}
                    />
                    All
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="low"
                      checked={priceFilter === "low"}
                      onChange={(e) => setPriceFilter(e.target.value)}
                    />
                    Below ₹1000
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="mid"
                      checked={priceFilter === "mid"}
                      onChange={(e) => setPriceFilter(e.target.value)}
                    />
                    ₹1000 - ₹3000
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="high"
                      checked={priceFilter === "high"}
                      onChange={(e) => setPriceFilter(e.target.value)}
                    />
                    Above ₹3000
                  </label>

                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="text-sm font-medium">Rating</label>
                <div className="mt-2 space-y-2 text-sm">

                  {[4, 3, 2].map((rate) => (
                    <label key={rate} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={rate}
                        checked={rating === rate}
                        onChange={() => setRating(rate)}
                      />
                      <span className="flex items-center gap-1">
                        {rate}+ ⭐
                      </span>
                    </label>
                  ))}

                </div>
              </div>

            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">

            {/* Top Bar */}
            <div className="flex justify-between items-center mb-5">

              <p className="text-sm text-gray-500">
                Showing {filteredProducts.length} products
              </p>

              {/* Sort */}
              <select
                className="border p-2 rounded-lg text-sm"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>

            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold">No products found 😔</h2>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
};

export default ShopPage;