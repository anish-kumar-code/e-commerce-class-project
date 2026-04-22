import { useParams } from "react-router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TrackOrderPage = () => {
    const { id } = useParams();

    // Dummy order (later API se aayega)
    const [order] = useState({
        id: id,
        date: "15 April 2026",
        status: "Shipped", // change to test
        total: 1499,
        address: "H-12, Gomti Nagar, Lucknow - 226010",
        items: [
            {
                id: 1,
                title: "Wireless Headphones",
                image:
                    "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
                price: 1499,
            },
        ],
    });

    const steps = [
        "Order Placed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
    ];

    const currentStepIndex = steps.findIndex(
        (step) => step === order.status || step.includes(order.status)
    );

    return (
        <>

            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-10">

                <h1 className="text-2xl font-bold mb-6">
                    Track Order
                </h1>

                {/* ORDER INFO */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border mb-6">

                    <p className="text-sm text-gray-500">
                        Order ID: <span className="font-medium">{order.id}</span>
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        Date: {order.date}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        Total: ₹{order.total}
                    </p>

                </div>

                {/* TIMELINE */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6">

                    <h2 className="font-semibold mb-6">Order Status</h2>

                    <div className="flex items-center justify-between relative">

                        {/* Line */}
                        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200"></div>

                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="relative z-10 flex flex-col items-center text-center w-full"
                            >
                                {/* Circle */}
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${index <= currentStepIndex
                                        ? "bg-black"
                                        : "bg-gray-300"
                                        }`}
                                >
                                    {index + 1}
                                </div>

                                {/* Label */}
                                <p
                                    className={`text-xs mt-2 ${index <= currentStepIndex
                                        ? "text-black font-medium"
                                        : "text-gray-400"
                                        }`}
                                >
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

                {/* PRODUCTS */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border mb-6">

                    <h2 className="font-semibold mb-4">Items</h2>

                    <div className="space-y-3">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4">

                                <div className="w-16 h-16 rounded-lg overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-500">₹{item.price}</p>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

                {/* ADDRESS */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border">

                    <h2 className="font-semibold mb-2">Delivery Address</h2>

                    <p className="text-sm text-gray-600">
                        {order.address}
                    </p>

                </div>

            </div>

            <Footer />

        </>
    );
};

export default TrackOrderPage;