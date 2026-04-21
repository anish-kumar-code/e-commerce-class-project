import { Layout, Menu } from "antd";
import {
    LayoutDashboard,
    Users,
    Settings,
    ShoppingCart,
    Layers,
    Tag,
    TicketPercent,
    SlidersHorizontal,
} from "lucide-react";
import { CgProductHunt } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router";

const { Sider } = Layout;

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: "/admin/dashboard",
            icon: <LayoutDashboard size={18} />,
            label: "Dashboard",
        },

        // ✅ SLIDER
        {
            key: "slider",
            icon: <SlidersHorizontal size={18} />,
            label: "Slider Manage",
            children: [
                {
                    key: "/admin/all-slider",
                    label: "All Slider",
                },
                {
                    key: "/admin/add-slider",
                    label: "Add Slider",
                },
            ],
        },

        // ✅ PRODUCT
        {
            key: "product",
            icon: <ShoppingCart size={18} />,
            label: "Product Manage",
            children: [
                {
                    key: "/admin/all-product",
                    label: "All Products",
                },
                {
                    key: "/admin/add-product",
                    label: "Add Product",
                },
            ],
        },

        // ✅ CATEGORY
        {
            key: "category",
            icon: <Layers size={18} />,
            label: "Category Manage",
            children: [
                {
                    key: "/admin/all-category",
                    label: "All Categories",
                },
                {
                    key: "/admin/add-category",
                    label: "Add Category",
                },
            ],
        },

        // ✅ COUPON
        {
            key: "coupon",
            icon: <TicketPercent size={18} />,
            label: "Coupon Manage",
            children: [
                {
                    key: "/admin/all-coupon",
                    label: "All Coupons",
                },
                {
                    key: "/admin/add-coupon",
                    label: "Add Coupon",
                },
            ],
        },

        // ✅ ORDER
        {
            key: "/admin/orders",
            icon: <ShoppingCart size={18} />,
            label: "Order Manage",
        },

        // ✅ USER
        {
            key: "/admin/users",
            icon: <Users size={18} />,
            label: "User Manage",
        },

        // ✅ SETTINGS
        {
            key: "settings",
            icon: <Settings size={18} />,
            label: "Settings",
            children: [
                {
                    key: "/admin/profile",
                    label: "Profile",
                },
                {
                    key: "/admin/change-password",
                    label: "Change Password",
                },
                {
                    key: "/admin/admin-logs",
                    label: "Admin Logs",
                },
            ],
        },
    ];

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="80"
            style={{ minHeight: "100vh" }}
        >
            <div className="text-white text-xl font-bold text-center py-4">
                Admin
            </div>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                defaultOpenKeys={["product"]} // optional
                items={menuItems}
                onClick={({ key }) => {
                    if (key.startsWith("/")) {
                        navigate(key);
                    }
                }}
            />
        </Sider>
    );
};

export default AdminSidebar;