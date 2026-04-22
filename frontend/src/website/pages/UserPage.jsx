import { NavLink, Outlet, useNavigate } from "react-router";
import {
    FiUser,
    FiMapPin,
    FiBox,
    FiHeart,
    FiShoppingCart,
    FiLogOut,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserPage = () => {
    const navigate = useNavigate();

    const menuClass =
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-gray-100";

    return (
        <>

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-6">

                {/* LEFT SIDEBAR */}
                <div className="bg-white p-4 rounded-2xl shadow-sm h-fit">

                    <h2 className="font-semibold mb-4">My Account</h2>

                    <div className="flex flex-col gap-2">

                        <NavLink to="/user/profile" className={menuClass}>
                            <FiUser /> Profile
                        </NavLink>

                        <NavLink to="/user/address" className={menuClass}>
                            <FiMapPin /> Address
                        </NavLink>

                        <NavLink to="/user/orders" className={menuClass}>
                            <FiBox /> Orders
                        </NavLink>

                        {/* Redirect Pages */}
                        <button
                            onClick={() => navigate("/wishlist")}
                            className={menuClass}
                        >
                            <FiHeart /> Wishlist
                        </button>

                        <button
                            onClick={() => navigate("/cart")}
                            className={menuClass}
                        >
                            <FiShoppingCart /> Cart
                        </button>

                        {/* Logout */}
                        <button
                            onClick={() => {
                                // logout logic later
                                navigate("/login");
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50"
                        >
                            <FiLogOut /> Logout
                        </button>

                    </div>

                </div>

                {/* RIGHT CONTENT */}
                <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm min-h-[400px]">
                    <Outlet />
                </div>

            </div>

            <Footer />
        </>
    );
};

export default UserPage;