import { useState } from "react";
import { useNavigate } from "react-router";

const UserOrderPage = () => {

    const navigate = useNavigate()

    const [orders] = useState([
        {
            id: "ORD12345",
            date: "12 April 2026",
            status: "Delivered",
            total: 2999,
            items: [
                {
                    id: 1,
                    title: "Stylish Sneakers",
                    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                    price: 1999,
                },
                {
                    id: 2,
                    title: "Casual Shirt",
                    image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53",
                    price: 999,
                },
            ],
        },
        {
            id: "ORD67890",
            date: "15 April 2026",
            status: "Shipped",
            total: 1499,
            items: [
                {
                    id: 3,
                    title: "Wireless Headphones",
                    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
                    price: 1499,
                },
            ],
        },
    ]);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-600";
            case "Shipped":
                return "bg-blue-100 text-blue-600";
            case "Processing":
                return "bg-yellow-100 text-yellow-600";
            case "Cancelled":
                return "bg-red-100 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div>

            <h2 className="text-xl font-semibold mb-6">My Orders</h2>

            {orders.length === 0 ? (
                <div className="text-center py-20">
                    <h3 className="text-lg font-semibold">No orders found 😔</h3>
                    <p className="text-gray-500 mt-2">
                        Start shopping to see your orders here.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">

                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white p-5 rounded-2xl shadow-sm border"
                        >

                            {/* Top Row */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Order ID: <span className="font-medium">{order.id}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Date: {order.date}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${getStatusStyle(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </span>

                            </div>

                            {/* Items */}
                            <div className="mt-4 space-y-3">

                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">

                                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-medium">
                                                {item.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                ₹{item.price}
                                            </p>
                                        </div>

                                    </div>
                                ))}

                            </div>

                            {/* Bottom Row */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-3">

                                <p className="font-semibold">
                                    Total: ₹{order.total}
                                </p>

                                <button
                                    onClick={() => navigate(`/track-order/${order.id}`)}
                                    className="bg-black text-white px-5 py-2 rounded-lg text-sm"
                                >
                                    Track Order
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default UserOrderPage;