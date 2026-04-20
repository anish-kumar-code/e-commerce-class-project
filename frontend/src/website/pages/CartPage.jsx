import { useState } from "react";
import CartItem from "../components/CartItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CartPage = () => {

  // Dummy cart data (later context se aayega)
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "Stylish Sneakers",
      price: 1999,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      description: "Premium sneakers with modern design and comfort.",
      quantity: 1,
    },
    {
      id: 2,
      title: "Wireless Headphones",
      price: 2499,
      image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
      description: "High-quality sound with long battery life.",
      quantity: 2,
    },
  ]);

  // Increase Qty
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Qty
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove Item
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Total Price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        <h1 className="text-2xl font-bold mb-6">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          // Empty State
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
            <p className="text-gray-500 mt-2">
              Looks like you haven't added anything yet.
            </p>
            <a
              href="/shop"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left - Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={increaseQty}
                  onDecrease={decreaseQty}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Right - Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">

              <h2 className="text-lg font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-sm mb-2">
                <span>Items ({cart.length})</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="border-t my-4"></div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}

      </div>

      <Footer />
    </>
  );
};

export default CartPage;