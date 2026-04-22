import React, { useState } from "react";
import {
    Card,
    Row,
    Col,
    Avatar,
    Tag,
    Button,
    Descriptions,
    Table,
    Space,
    message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

function UserDetails() {
    const navigate = useNavigate();

    // ✅ Dummy Data (Replace with API)
    const [user, setUser] = useState({
        id: "1",
        name: "Rahul Sharma",
        email: "rahul@mail.com",
        phone: "9876543210",
        status: "active",
        address: {
            line: "House 123, Gomti Nagar",
            city: "Lucknow",
            state: "UP",
            pincode: "226010",
        },
        orders: [
            {
                key: "1",
                id: "#1001",
                amount: 2500,
                status: "delivered",
                date: "2026-04-20",
            },
            {
                key: "2",
                id: "#1002",
                amount: 1800,
                status: "pending",
                date: "2026-04-22",
            },
        ],
    });

    // ✅ Toggle Block
    const toggleStatus = () => {
        const newStatus = user.status === "active" ? "blocked" : "active";
        setUser({ ...user, status: newStatus });
        message.success(`User ${newStatus}`);
    };

    // ✅ Status Tag
    const getStatusTag = (status) => {
        return status === "active" ? (
            <Tag color="green">ACTIVE</Tag>
        ) : (
            <Tag color="red">BLOCKED</Tag>
        );
    };

    // ✅ Order Table
    const columns = [
        {
            title: "Order ID",
            dataIndex: "id",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            render: (val) => `₹${val}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <Tag color={status === "delivered" ? "green" : "orange"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Action",
            render: (_, record) => (
                <Button
                    onClick={() =>
                        navigate(`/admin/order-details?id=${record.key}`)
                    }
                >
                    View
                </Button>
            ),
        },
    ];

    return (
        <div>
            {/* USER PROFILE */}
            <Card>
                <Row justify="space-between" align="middle">
                    <Space>
                        <Avatar size={64} icon={<UserOutlined />} />
                        <div>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            {getStatusTag(user.status)}
                        </div>
                    </Space>

                    <Button
                        danger={user.status === "active"}
                        type={user.status === "blocked" ? "primary" : "default"}
                        onClick={toggleStatus}
                    >
                        {user.status === "active" ? "Block User" : "Unblock User"}
                    </Button>
                </Row>
            </Card>

            {/* DETAILS */}
            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={12}>
                    <Card title="User Details">
                        <Descriptions column={1}>
                            <Descriptions.Item label="Name">
                                {user.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email">
                                {user.email}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone">
                                {user.phone}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="Address">
                        <p>{user.address.line}</p>
                        <p>
                            {user.address.city}, {user.address.state}
                        </p>
                        <p>{user.address.pincode}</p>
                    </Card>
                </Col>
            </Row>

            {/* ORDER HISTORY */}
            <Card title="Order History" style={{ marginTop: 20 }}>
                <Table
                    columns={columns}
                    dataSource={user.orders}
                    pagination={false}
                />
            </Card>
        </div>
    );
}

export default UserDetails;