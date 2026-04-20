import { Link } from "react-router";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ErrorPage = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

        <div className="text-center max-w-xl">

          {/* Big 404 */}
          <h1 className="text-7xl md:text-8xl font-bold text-black">
            404
          </h1>

          {/* Title */}
          <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
            Oops! Page not found
          </h2>

          {/* Description */}
          <p className="mt-3 text-gray-500 text-sm md:text-base">
            The page you are looking for doesn’t exist or has been moved.
            Don’t worry, you can go back or explore our homepage.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

            <Link
              to="/"
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <FaHome size={14} />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FaArrowLeft size={14} />
              Go Back
            </button>

          </div>

          {/* Optional Extra */}
          <p className="mt-8 text-xs text-gray-400">
            Error Code: 404 | Page Not Found
          </p>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default ErrorPage;