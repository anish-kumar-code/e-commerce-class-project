import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Rahul Sharma",
        review:
            "Amazing quality products and super fast delivery. Highly recommended!",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 2,
        name: "Priya Verma",
        review:
            "Loved the collection. The UI is smooth and checkout was super easy.",
        rating: 4,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 3,
        name: "Amit Patel",
        review:
            "Great experience overall. Customer support was very helpful.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
        id: 4,
        name: "Neha Singh",
        review:
            "Affordable pricing with premium quality. Will shop again for sure!",
        rating: 4,
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
];

const TestimonialSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16 relative">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">
                    What Our Customers Say
                </h2>

                {/* Custom Buttons */}
                <div className="flex gap-3">
                    <button className="testi-prev w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md border hover:bg-black hover:text-white transition">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="testi-next w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md border hover:bg-black hover:text-white transition">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Swiper */}
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: ".testi-next",
                    prevEl: ".testi-prev",
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = ".testi-prev";
                    swiper.params.navigation.nextEl = ".testi-next";
                }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {testimonials.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition h-full border-2">

                            {/* User */}
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>

                                    {/* Rating */}
                                    <div className="flex gap-1 mt-1">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className="text-yellow-500 fill-yellow-500"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Review */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                "{item.review}"
                            </p>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
};

export default TestimonialSection;