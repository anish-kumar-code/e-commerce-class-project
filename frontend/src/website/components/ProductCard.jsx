import { Link } from "react-router";
import { Heart, Star } from "lucide-react";

const ProductCard = ({ product }) => {

    // Short Description (30-40 chars)
    const shortDesc =
        product.description?.length > 80
            ? product.description.slice(0, 80) + "..."
            : product.description;

    return (
        <div className="bg-white rounded-2xl border transition overflow-hidden group cursor-pointer">

            {/* Image Wrapper */}
            <div className="relative w-full h-56 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                />

                {/* Wishlist Icon */}
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                    <Heart size={16} />
                </button>

                {/* Discount Badge */}
                {product.discount && (
                    <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                        {product.discount}% OFF
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">

                {/* Title */}
                <h3 className="font-semibold text-sm line-clamp-2">
                    {product.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-xs mt-1">
                    {shortDesc}
                </p>

                <div className="flex justify-between">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-600">
                            {product.rating || 4.5}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-lg">₹{product.price}</span>
                        {product.oldPrice && (
                            <span className="text-gray-400 line-through text-sm">
                                ₹{product.oldPrice}
                            </span>
                        )}
                    </div>
                </div>

                {/* Button */}
                <Link
                    to={`/product/${product.id}`}
                    className="block mt-3 text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    View Product
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;