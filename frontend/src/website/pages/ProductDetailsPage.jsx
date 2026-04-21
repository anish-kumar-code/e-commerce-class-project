import { useParams } from "react-router";
import products from "../data/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FaChevronLeft, FaChevronRight, FaHeart, FaStar } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const product = products.find((p) => p.id === Number(id));

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  if (!product) return <div>Product not found</div>;

  const images = [product.image, product.image, product.image];

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ================= LEFT SIDE ================= */}
          <div className="flex gap-4">

            {/* THUMBNAILS */}
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

            {/* MAIN IMAGE */}
            <div className="relative flex-1 max-w-[500px]">

              {/* Wishlist */}
              <button className="absolute top-4 right-4 z-20 bg-white p-3 rounded-full shadow hover:scale-110 transition">
                <FaHeart />
              </button>

              {/* Navigation */}
              <button className="custom-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow hover:bg-black hover:text-white transition">
                <FaChevronLeft />
              </button>

              <button className="custom-next absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow hover:bg-black hover:text-white transition">
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
                    <div className="w-full h-[400px] md:h-[500px] bg-gray-100 overflow-hidden rounded-2xl">
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

          {/* ================= RIGHT SIDE ================= */}
          <div className="space-y-4">

            {/* TITLE */}
            <h1 className="text-xl md:text-2xl font-medium leading-snug">
              {product.title}
            </h1>

            {/* BRAND */}
            <p className="text-blue-600 text-sm cursor-pointer hover:underline">
              Visit the Store
            </p>

            {/* RATING */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-blue-600 cursor-pointer">(21,309)</span>
            </div>

            <hr />

            {/* PRICE */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-red-500 text-lg font-medium">-35%</span>
                <span className="text-3xl font-semibold">
                  ₹{product.price}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                M.R.P:
                <span className="line-through ml-1">
                  ₹{product.oldPrice}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                Inclusive of all taxes
              </p>
            </div>

            {/* EMI */}
            <p className="text-sm text-gray-700">
              EMI starts at ₹562. No Cost EMI available
              <span className="text-blue-600 ml-1 cursor-pointer">
                EMI options
              </span>
            </p>

            {/* OFFERS */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="font-medium mb-2">Offers</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✔ Bank Offer: 10% Cashback</li>
                <li>✔ No Cost EMI available</li>
                <li>✔ Special Discount on prepaid orders</li>
              </ul>
            </div>

            {/* BUTTONS */}
            <div className="space-y-3 pt-4">
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-full">
                Add to Cart
              </button>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full">
                Buy Now
              </button>
            </div>

          </div>

        </div>


        {/* Related Products */}
        <section className="max-w-7xl mx-auto px-4 py-12 relative">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Related Products
            </h2>

            {/* Custom Buttons */}
            <div className="flex gap-3">
              <button className="custom-prev w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-black hover:text-white transition">
                <ChevronLeft size={18} />
              </button>
              <button className="custom-next w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-black hover:text-white transition">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard product={item} />
              </SwiperSlide>
            ))}
          </Swiper>

        </section>


      </div>

      <Footer />
    </>
  );
};

export default ProductDetailsPage;