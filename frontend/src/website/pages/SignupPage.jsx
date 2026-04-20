import { Link } from "react-router";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

const SignupPage = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left Side - Image */}
      <div className="hidden md:block h-full">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
          alt="Signup Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center">
            Create Account 🚀
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Sign up to start shopping
          </p>

          {/* Form */}
          <form className="mt-6 space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <div className="flex items-center border rounded-lg mt-1 px-3">
                <FiUser className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 outline-none bg-transparent text-sm"
                />
              </div>
            </div>

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

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium">Mobile Number</label>
              <div className="flex items-center border rounded-lg mt-1 px-3">
                <FiPhone className="text-gray-400" />
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
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
                  placeholder="Create a password"
                  className="w-full p-2 outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Sign Up
            </button>

          </form>

          {/* Login Redirect */}
          <p className="text-sm text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-medium">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default SignupPage;