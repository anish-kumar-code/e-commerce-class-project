import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Menu, X, ShoppingCart, Heart, User } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinkClass =
        "text-gray-700 hover:text-black transition font-medium";

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

                {/* Logo */}
                <Link to="/" className="text-xl font-bold">
                    ShopKart
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6">
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>
                    <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
                    <NavLink to="/wishlist" className={navLinkClass}>Wishlist</NavLink>
                </nav>

                {/* Icons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/cart"><ShoppingCart size={20} /></Link>
                    <Link to="/wishlist"><Heart size={20} /></Link>
                    <Link to="/login"><User size={20} /></Link>
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow">
                    <NavLink to="/" className="block">Home</NavLink>
                    <NavLink to="/shop" className="block">Shop</NavLink>
                    <NavLink to="/wishlist" className="block">Wishlist</NavLink>
                    <NavLink to="/cart" className="block">Cart</NavLink>
                    <NavLink to="/login" className="block">Login</NavLink>
                </div>
            )}
        </header>
    );
};

export default Navbar;