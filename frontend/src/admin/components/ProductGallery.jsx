import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductGallery = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const images = [product.image, product.image, product.image];

    return (
        <div className="flex gap-4">

            {/* LEFT - THUMBNAILS */}
            <div className="hidden md:flex flex-col gap-3">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="w-16 h-16 rounded-lg overflow-hidden border hover:border-black cursor-pointer"
                    >
                        <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* RIGHT - MAIN SLIDER */}
            <div className="relative flex-1">

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow hover:scale-110 transition cursor-pointer">
                    <FaHeart />
                </button>

                {/* Custom Buttons */}
                <button className="custom-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow hover:bg-black hover:text-white transition">
                    <FaChevronLeft />
                </button>

                <button className="custom-next absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow hover:bg-black hover:text-white transition">
                    <FaChevronRight />
                </button>

                <Swiper
                    modules={[Navigation, Thumbs]}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = ".custom-prev";
                        swiper.params.navigation.nextEl = ".custom-next";
                    }}
                    thumbs={{ swiper: thumbsSwiper }}
                    spaceBetween={10}
                    className="rounded-2xl overflow-hidden"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div className="h-[400px] w-full overflow-hidden">
                                <img
                                    src={img}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    );
};

export default ProductGallery;