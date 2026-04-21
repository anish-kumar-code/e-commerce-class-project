import { Layout } from "antd";

const { Footer } = Layout;

const AdminFooter = () => {
    return (
        <Footer style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} Admin Panel • Built with Ant Design
        </Footer>
    );
};

export default AdminFooter;