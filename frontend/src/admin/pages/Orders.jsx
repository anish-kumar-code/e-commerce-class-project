import React, { useState } from "react";
import {
    Tabs,
    Table,
    Tag,
    Button,
    Space,
    Select,
    Card,
    message,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Option } = Select;

function Orders() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([
        {
            key: "1",
            id: "#1001",
            user: "Rahul",
            amount: 2500,
            status: "pending",
            date: "2026-04-21",
            payment: "COD",
        },
        {
            key: "2",
            id: "#1002",
            user: "Amit",
            amount: 1800,
            status: "shipped",
            date: "2026-04-20",
            payment: "Online",
        },
    ]);

    const statuses = [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
    ];

    // ✅ Change Status
    const handleStatusChange = (value, record) => {
        const newData = orders.map((item) =>
            item.key === record.key ? { ...item, status: value } : item
        );
        setOrders(newData);
        message.success("Order status updated");
    };

    // ✅ Filter by Tab
    const getFilteredOrders = (status) => {
        return orders.filter((order) => order.status === status);
    };

    // ✅ Status Tag
    const getStatusTag = (status) => {
        const colors = {
            pending: "orange",
            confirmed: "blue",
            shipped: "purple",
            delivered: "green",
            cancelled: "red",
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
    };

    // ✅ Table Columns
    const columns = [
        {
            title: "Order ID",
            dataIndex: "id",
        },
        {
            title: "Customer",
            dataIndex: "user",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            render: (val) => `₹${val}`,
        },
        {
            title: "Payment",
            dataIndex: "payment",
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Status",
            render: (_, record) => getStatusTag(record.status),
        },
        {
            title: "Action",
            render: (_, record) => (
                <Space>
                    {/* VIEW */}
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => navigate(`/admin/order-details?id=${record.key}`)}
                    />

                    {/* STATUS CHANGE */}
                    <Select
                        value={record.status}
                        style={{ width: 130 }}
                        onChange={(value) =>
                            handleStatusChange(value, record)
                        }
                    >
                        {statuses.map((s) => (
                            <Option key={s} value={s}>
                                {s}
                            </Option>
                        ))}
                    </Select>
                </Space>
            ),
        },
    ];

    // ✅ Tabs Config
    const tabItems = statuses.map((status) => ({
        key: status,
        label: status.toUpperCase(),
        children: (
            <Table
                columns={columns}
                dataSource={getFilteredOrders(status)}
                pagination={{ pageSize: 5 }}
            />
        ),
    }));

    return (
        <Card title="Order Management">
            <Tabs defaultActiveKey="pending" items={tabItems} />
        </Card>
    );
}

export default Orders;