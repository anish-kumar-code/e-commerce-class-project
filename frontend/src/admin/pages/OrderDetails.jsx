import React, { useState } from "react";
import {
    Card,
    Row,
    Col,
    Table,
    Tag,
    Select,
    Divider,
    Descriptions,
    Image,
    message,
    Button,
} from "antd";
import { generateInvoice } from "../utils/generateInvoice";

const { Option } = Select;

function OrderDetails() {
    // ✅ Dummy Data (Replace with API)
    const [order, setOrder] = useState({
        id: "#1001",
        status: "pending",
        payment: "COD",
        date: "2026-04-21",
        customer: {
            name: "Rahul Sharma",
            email: "rahul@mail.com",
            phone: "9876543210",
        },
        address: {
            line: "House 123, Gomti Nagar",
            city: "Lucknow",
            state: "UP",
            pincode: "226010",
        },
        products: [
            {
                key: "1",
                name: "iPhone 15",
                price: 75000,
                qty: 1,
                image: "https://via.placeholder.com/80",
            },
            {
                key: "2",
                name: "Nike Shoes",
                price: 4000,
                qty: 2,
                image: "https://via.placeholder.com/80",
            },
        ],
    });

    const statuses = [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
    ];

    // ✅ Change Status
    const handleStatusChange = (value) => {
        setOrder({ ...order, status: value });
        message.success("Order status updated");
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

    // ✅ Product Table Columns
    const columns = [
        {
            title: "Product",
            render: (_, record) => (
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Image src={record.image} width={50} />
                    {record.name}
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (val) => `₹${val}`,
        },
        {
            title: "Qty",
            dataIndex: "qty",
        },
        {
            title: "Total",
            render: (_, record) => `₹${record.price * record.qty}`,
        },
    ];

    // ✅ Total Calculation
    const totalAmount = order.products.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    return (
        <div>
            {/* ORDER INFO */}
            <Card title={`Order ${order.id}`}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <p><strong>Date:</strong> {order.date}</p>
                        <p><strong>Payment:</strong> {order.payment}</p>
                        <p><strong>Status:</strong> {getStatusTag(order.status)}</p>
                    </Col>

                    <Col>
                        <div className="flex flex-col gap-3">
                            <Select
                                value={order.status}
                                style={{ width: 180 }}
                                onChange={handleStatusChange}
                            >
                                {statuses.map((s) => (
                                    <Option key={s} value={s}>
                                        {s}
                                    </Option>
                                ))}
                            </Select>

                            <Button
                                type="primary"
                                onClick={() => generateInvoice(order)}
                            >
                                Download Invoice
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* CUSTOMER + ADDRESS */}
            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={12}>
                    <Card title="Customer Details">
                        <Descriptions column={1}>
                            <Descriptions.Item label="Name">
                                {order.customer.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email">
                                {order.customer.email}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone">
                                {order.customer.phone}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="Shipping Address">
                        <p>{order.address.line}</p>
                        <p>{order.address.city}, {order.address.state}</p>
                        <p>{order.address.pincode}</p>
                    </Card>
                </Col>
            </Row>

            {/* PRODUCT TABLE */}
            <Card title="Products" style={{ marginTop: 20 }}>
                <Table
                    columns={columns}
                    dataSource={order.products}
                    pagination={false}
                />
            </Card>

            {/* PRICE SUMMARY */}
            <Card title="Order Summary" style={{ marginTop: 20 }}>
                <Row justify="space-between">
                    <Col>Subtotal</Col>
                    <Col>₹{totalAmount}</Col>
                </Row>

                <Row justify="space-between">
                    <Col>Shipping</Col>
                    <Col>₹0</Col>
                </Row>

                <Divider />

                <Row justify="space-between">
                    <Col><strong>Total</strong></Col>
                    <Col><strong>₹{totalAmount}</strong></Col>
                </Row>
            </Card>
        </div>
    );
}

export default OrderDetails; 