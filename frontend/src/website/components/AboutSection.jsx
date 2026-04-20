const AboutSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">

                {/* Image */}
                <div className="w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
                        alt="About Us"
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                </div>

                {/* Content */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        About Our Store
                    </h2>

                    <p className="text-gray-600 mt-4 leading-relaxed">
                        We are a modern e-commerce platform focused on delivering high-quality
                        products with a seamless shopping experience. Our goal is to provide
                        customers with trendy, reliable, and affordable products across multiple
                        categories.
                    </p>

                    <p className="text-gray-600 mt-4 leading-relaxed">
                        With a strong commitment to customer satisfaction, we ensure fast delivery,
                        secure payments, and a hassle-free return process. Thousands of customers
                        trust us for their daily shopping needs.
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-gray-100 p-4 rounded-xl text-center">
                            <h3 className="text-xl font-bold">10K+</h3>
                            <p className="text-sm text-gray-500">Happy Customers</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-xl text-center">
                            <h3 className="text-xl font-bold">500+</h3>
                            <p className="text-sm text-gray-500">Products</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-xl text-center">
                            <h3 className="text-xl font-bold">4.8★</h3>
                            <p className="text-sm text-gray-500">Customer Rating</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-xl text-center">
                            <h3 className="text-xl font-bold">24/7</h3>
                            <p className="text-sm text-gray-500">Support</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <a
                        href="/shop"
                        className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                        Explore Products
                    </a>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;