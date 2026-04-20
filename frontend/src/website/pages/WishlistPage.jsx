import { useState } from "react";
import WishlistItem from "../components/WishlistItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WishlistPage = () => {

    const [wishlist, setWishlist] = useState([
        {
            id: 1,
            title: "Stylish Sneakers",
            price: 1999,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            description: "Premium sneakers with modern design and comfort.",
        },
        {
            id: 2,
            title: "Smart Watch",
            price: 2999,
            image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
            description: "Track fitness and notifications easily.",
        },
    ]);

    // Remove from wishlist
    const removeItem = (id) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
    };

    // Add to cart (dummy for now)
    const addToCart = (item) => {
        alert(`${item.title} added to cart`);
    };

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-10">

                <h1 className="text-2xl font-bold mb-6">
                    Your Wishlist ❤️
                </h1>

                {wishlist.length === 0 ? (
                    // Empty State
                    <div className="text-center py-20">
                        <h2 className="text-xl font-semibold">
                            Your wishlist is empty 💔
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Save items you love for later.
                        </p>
                        <a
                            href="/shop"
                            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
                        >
                            Explore Products
                        </a>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {wishlist.map((item) => (
                            <WishlistItem
                                key={item.id}
                                item={item}
                                onRemove={removeItem}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>
                )}

            </div>

            <Footer />
        </>
    );
};

export default WishlistPage;