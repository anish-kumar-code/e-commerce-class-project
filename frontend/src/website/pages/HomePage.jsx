import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import products from "../data/product";

import { Swiper, SwiperSlide } from "swiper/react"; // ✅
import { Navigation } from "swiper/modules"; // ✅

import "swiper/css";
import "swiper/css/navigation";
import AboutSection from "../components/AboutSection";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";

const HomePage = () => {

  return (
    <>

      <Navbar />

      <div className="bg-gray-50">

        {/* Hero Section */}
        <section className="bg-black text-white py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Discover Your Style
          </h1>
          <p className="mt-4 text-gray-300">
            Trendy collections at unbeatable prices
          </p>
          <a
            href="/shop"
            className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium"
          >
            Shop Now
          </a>
        </section>

        {/* Featured Products */}
        {/* <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">
            Featured Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section> */}

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 py-12 relative">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Featured Products
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


        {/* Trending Products */}
        <section className="max-w-7xl mx-auto px-4 py-12 relative">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Trending Products
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

        {/* Summer Products */}
        <section className="max-w-7xl mx-auto px-4 py-12 relative">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Summer Products
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

        <AboutSection />

        <TestimonialSection />

        <Footer />

      </div>
    </>
  );
};

export default HomePage;