import React, { useState } from "react";
import {
    Table,
    Tag,
    Switch,
    Button,
    Space,
    Popconfirm,
    message,
    Card,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

function AllCoupon() {
    const navigate = useNavigate();

    // ✅ Dummy Data (Replace with API)
    const [data, setData] = useState([
        {
            key: "1",
            code: "SAVE50",
            type: "flat",
            discount: 50,
            minValue: 500,
            startDate: "2026-04-01",
            expiryDate: "2026-04-30",
            uses: 100,
            perUserUses: 2,
            status: true,
        },
        {
            key: "2",
            code: "OFF10",
            type: "percentage",
            discount: 10,
            minValue: 1000,
            startDate: "2026-04-05",
            expiryDate: "2026-04-25",
            uses: 200,
            perUserUses: 1,
            status: false,
        },
    ]);

    // ✅ Status Toggle
    const handleStatusChange = (checked, record) => {
        const newData = data.map((item) =>
            item.key === record.key ? { ...item, status: checked } : item
        );
        setData(newData);
        message.success("Status updated");
    };

    // ✅ Delete
    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
        message.success("Coupon deleted");
    };

    // ✅ Type Tag
    const renderType = (type) => {
        if (type === "flat") return <Tag color="blue">Flat</Tag>;
        if (type === "percentage") return <Tag color="green">%</Tag>;
        return <Tag color="purple">Upto</Tag>;
    };

    // ✅ Table Columns
    const columns = [
        {
            title: "Code",
            dataIndex: "code",
            render: (code) => <strong>{code}</strong>,
        },
        {
            title: "Type",
            dataIndex: "type",
            render: renderType,
        },
        {
            title: "Discount",
            render: (_, record) =>
                record.type === "percentage"
                    ? `${record.discount}%`
                    : `₹${record.discount}`,
        },
        {
            title: "Min Value",
            dataIndex: "minValue",
            render: (val) => `₹${val}`,
        },
        {
            title: "Validity",
            render: (_, record) =>
                `${record.startDate} → ${record.expiryDate}`,
        },
        {
            title: "Uses",
            render: (_, record) =>
                `${record.uses} / ${record.perUserUses} per user`,
        },
        {
            title: "Status",
            render: (_, record) => (
                <Switch
                    checked={record.status}
                    onChange={(checked) =>
                        handleStatusChange(checked, record)
                    }
                />
            ),
        },
        {
            title: "Action",
            render: (_, record) => (
                <Space>
                    {/* EDIT */}
                    <Button
                        icon={<EditOutlined />}
                        onClick={() =>
                            navigate(`/admin/edit-coupon?id=${record.key}`)
                        }
                    />

                    {/* DELETE */}
                    <Popconfirm
                        title="Delete Coupon"
                        description="Are you sure to delete this coupon?"
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
        <Card title="All Coupons">
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
            />
        </Card>
    );
}

export default AllCoupon;