import { Link } from "react-router";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";

const WishlistItem = ({ item, onRemove, onAddToCart }) => {
    return (
        <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">

            {/* Image */}
            <div className="w-24 h-24 rounded-lg overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">

                <div>
                    <h3 className="font-semibold text-sm md:text-base">
                        {item.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {item.description}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-3">

                    {/* Price */}
                    <span className="font-bold text-lg">
                        ₹{item.price}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-3">

                        {/* Add to Cart */}
                        <button
                            onClick={() => onAddToCart(item)}
                            className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                        >
                            <FiShoppingCart size={14} />
                            Add
                        </button>

                        {/* Remove */}
                        <button
                            onClick={() => onRemove(item.id)}
                            className="text-red-500 hover:text-red-600"
                        >
                            <FiTrash2 size={18} />
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default WishlistItem;