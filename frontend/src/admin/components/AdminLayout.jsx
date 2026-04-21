import { Layout } from "antd";
import { Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

const { Content, Header } = Layout;

const AdminLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>

            {/* SIDEBAR */}
            <AdminSidebar />

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
                    <h3 className="text-lg font-semibold">Admin Panel</h3>
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