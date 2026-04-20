import { Mail, MapPin, Phone } from "lucide-react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import { Link } from "react-router";


const Footer = () => {
    return (
        <footer className="bg-black text-gray-300 mt-16">

            <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">

                {/* Branding */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-white">
                        ShopKart
                    </h2>
                    <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                        Your one-stop destination for trendy, affordable, and high-quality
                        products. We aim to deliver the best shopping experience with fast
                        delivery and secure payments.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="hover:text-white transition">
                            <FaFacebook size={18} />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <BsInstagram size={18} />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <BsTwitter size={18} />
                        </a>
                        <a href="#" className="hover:text-white transition">
                            <LiaLinkedin size={18} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
                        <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
                        <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                        <li><Link to="/refund-policy" className="hover:text-white">Refund Policy</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">

                        <li className="flex items-start gap-2">
                            <MapPin size={16} className="mt-1" />
                            <span>Lucknow, Uttar Pradesh, India</span>
                        </li>

                        <li className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>+91 1234567890</span>
                        </li>

                        <li className="flex items-center gap-2">
                            <Mail size={16} />
                            <span>support@shopkart.com</span>
                        </li>

                    </ul>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 text-center text-sm py-4 text-gray-500">
                © {new Date().getFullYear()} ShopKart. All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;