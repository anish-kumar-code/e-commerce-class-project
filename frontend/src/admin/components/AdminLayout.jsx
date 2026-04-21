import { Layout, Button, Badge } from "antd";
import { Outlet } from "react-router";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

const { Content, Header } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [time, setTime] = useState("");

    // ✅ Live Time
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formatted = now.toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
            });
            setTime(formatted);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>

            {/* SIDEBAR */}
            <AdminSidebar collapsed={collapsed} />

            <Layout>
                {/* HEADER */}
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-4">
                        <Button
                            type="text"
                            icon={
                                collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: "18px" }}
                        />

                        <h3 className="text-lg font-semibold">ShopKart</h3>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-6">

                        {/* TIME */}
                        <span style={{ fontSize: "14px", color: "#555" }}>
                            {time}
                        </span>

                        {/* NOTIFICATION */}
                        <Badge count={3}>
                            <BellOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
                        </Badge>

                        {/* USER */}
                        <UserOutlined style={{ fontSize: "18px", cursor: "pointer" }} />
                    </div>
                </Header>

                {/* CONTENT */}
                <Content style={{ margin: "20px" }}>
                    <div
                        style={{
                            padding: 20,
                            background: "#fff",
                            minHeight: "80vh",
                            borderRadius: "8px",
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>

                {/* FOOTER */}
                <AdminFooter />
            </Layout>
        </Layout>
    );
};

export default AdminLayout;