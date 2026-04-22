import React, { useState } from "react";
import {
    Tabs,
    Table,
    Tag,
    Button,
    Space,
    Card,
    message,
    Avatar,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

function Users() {
    const navigate = useNavigate();

    // ✅ Dummy Data (Replace with API)
    const [users, setUsers] = useState([
        {
            key: "1",
            name: "Rahul Sharma",
            email: "rahul@mail.com",
            phone: "9876543210",
            status: "active",
            isNew: true,
        },
        {
            key: "2",
            name: "Amit Kumar",
            email: "amit@mail.com",
            phone: "9999999999",
            status: "blocked",
            isNew: false,
        },
        {
            key: "3",
            name: "Sneha Singh",
            email: "sneha@mail.com",
            phone: "8888888888",
            status: "active",
            isNew: false,
        },
    ]);

    // ✅ Block / Unblock
    const toggleStatus = (record) => {
        const newData = users.map((user) =>
            user.key === record.key
                ? {
                    ...user,
                    status: user.status === "active" ? "blocked" : "active",
                }
                : user
        );
        setUsers(newData);
        message.success("User status updated");
    };

    // ✅ Filters
    const getFilteredUsers = (type) => {
        if (type === "new") return users.filter((u) => u.isNew);
        if (type === "active") return users.filter((u) => u.status === "active");
        if (type === "blocked") return users.filter((u) => u.status === "blocked");
        return users;
    };

    // ✅ Status Tag
    const getStatusTag = (status) => {
        return status === "active" ? (
            <Tag color="green">ACTIVE</Tag>
        ) : (
            <Tag color="red">BLOCKED</Tag>
        );
    };

    // ✅ Table Columns
    const columns = [
        {
            title: "User",
            render: (_, record) => (
                <Space>
                    <Avatar>{record.name[0]}</Avatar>
                    {record.name}
                </Space>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
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
                        onClick={() =>
                            navigate(`/admin/user-details?id=${record.key}`)
                        }
                    />

                    {/* BLOCK / UNBLOCK */}
                    <Button
                        danger={record.status === "active"}
                        type={record.status === "blocked" ? "primary" : "default"}
                        onClick={() => toggleStatus(record)}
                    >
                        {record.status === "active" ? "Block" : "Unblock"}
                    </Button>
                </Space>
            ),
        },
    ];

    // ✅ Tabs
    const tabItems = [
        {
            key: "new",
            label: "New Users",
            children: (
                <Table
                    columns={columns}
                    dataSource={getFilteredUsers("new")}
                    pagination={{ pageSize: 5 }}
                />
            ),
        },
        {
            key: "active",
            label: "Active Users",
            children: (
                <Table
                    columns={columns}
                    dataSource={getFilteredUsers("active")}
                    pagination={{ pageSize: 5 }}
                />
            ),
        },
        {
            key: "blocked",
            label: "Blocked Users",
            children: (
                <Table
                    columns={columns}
                    dataSource={getFilteredUsers("blocked")}
                    pagination={{ pageSize: 5 }}
                />
            ),
        },
        {
            key: "all",
            label: "Total Users",
            children: (
                <Table
                    columns={columns}
                    dataSource={getFilteredUsers("all")}
                    pagination={{ pageSize: 5 }}
                />
            ),
        },
    ];

    return (
        <Card title="User Management">
            <Tabs defaultActiveKey="new" items={tabItems} />
        </Card>
    );
}

export default Users;