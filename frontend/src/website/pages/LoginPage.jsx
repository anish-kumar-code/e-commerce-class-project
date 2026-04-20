import { Link } from "react-router";
import { FiMail, FiLock } from "react-icons/fi";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left Side - Image */}
      <div className="hidden md:block h-full">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Login to continue shopping
          </p>

          {/* Form */}
          <form className="mt-6 space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="flex items-center border rounded-lg mt-1 px-3">
                <FiMail className="text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="flex items-center border rounded-lg mt-1 px-3">
                <FiLock className="text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <a href="#" className="text-gray-500 hover:text-black">
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Login
            </button>

          </form>

          {/* Signup Redirect */}
          <p className="text-sm text-center mt-6 text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-black font-medium">
              Sign up
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;