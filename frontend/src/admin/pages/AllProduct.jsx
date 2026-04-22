import React, { useState } from "react";
import {
    Table,
    Tag,
    Switch,
    Button,
    Space,
    Popconfirm,
    message,
    Image,
    Card,
} from "antd";
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

function AllProduct() {
    const navigate = useNavigate();

    // ✅ Dummy Data (Replace with API)
    const [data, setData] = useState([
        {
            key: "1",
            title: "iPhone 15",
            price: 80000,
            sellingPrice: 75000,
            stock: 10,
            status: true,
            image: "https://via.placeholder.com/80",
        },
        {
            key: "2",
            title: "Nike Shoes",
            price: 5000,
            sellingPrice: 4000,
            stock: 25,
            status: false,
            image: "https://via.placeholder.com/80",
        },
    ]);

    // ✅ Toggle Status
    const handleStatusChange = (checked, record) => {
        const newData = data.map((item) =>
            item.key === record.key ? { ...item, status: checked } : item
        );
        setData(newData);
        message.success("Status updated");
    };

    // ✅ Delete Product
    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
        message.success("Product deleted");
    };

    // ✅ Table Columns
    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            render: (img) => <Image src={img} width={60} />,
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Original Price",
            dataIndex: "price",
            render: (price) => `₹${price}`,
        },
        {
            title: "Selling Price",
            dataIndex: "sellingPrice",
            render: (price) => `₹${price}`,
        },
        {
            title: "Stock",
            dataIndex: "stock",
        },
        {
            title: "Status",
            render: (_, record) => (
                <Switch
                    checked={record.status}
                    onChange={(checked) => handleStatusChange(checked, record)}
                />
            ),
        },
        {
            title: "Action",
            render: (_, record) => (
                <Space>
                    {/* VIEW */}
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => navigate(`/admin/product/${record.key}`)}
                    />

                    {/* EDIT */}
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/admin/edit-product?id=${record.key}`)}
                    />

                    {/* DELETE */}
                    <Popconfirm
                        title="Delete Product"
                        description="Are you sure to delete this product?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card title="All Products">
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
            />
        </Card>
    );
}

export default AllProduct;