import React, { useState } from "react";
import {
    Table,
    Tag,
    Input,
    Select,
    Row,
    Col,
    Card,
} from "antd";

const { Option } = Select;

function AdminLogs() {
    // ✅ Dummy Logs Data (Replace with API)
    const [logs] = useState([
        {
            key: "1",
            admin: "Admin",
            action: "LOGIN",
            module: "Auth",
            ip: "192.168.1.1",
            date: "2026-04-22 10:30 AM",
        },
        {
            key: "2",
            admin: "Admin",
            action: "ADD_PRODUCT",
            module: "Product",
            ip: "192.168.1.1",
            date: "2026-04-22 11:00 AM",
        },
        {
            key: "3",
            admin: "Admin",
            action: "DELETE_COUPON",
            module: "Coupon",
            ip: "192.168.1.1",
            date: "2026-04-22 11:20 AM",
        },
    ]);

    const [search, setSearch] = useState("");
    const [actionFilter, setActionFilter] = useState("");

    // ✅ Filter Logs
    const filteredLogs = logs.filter((log) => {
        const matchSearch =
            log.admin.toLowerCase().includes(search.toLowerCase()) ||
            log.module.toLowerCase().includes(search.toLowerCase());

        const matchAction =
            actionFilter === "" || log.action === actionFilter;

        return matchSearch && matchAction;
    });

    // ✅ Action Tag Color
    const getTag = (action) => {
        const colors = {
            LOGIN: "green",
            ADD_PRODUCT: "blue",
            DELETE_COUPON: "red",
            UPDATE: "orange",
        };
        return <Tag color={colors[action] || "default"}>{action}</Tag>;
    };

    // ✅ Table Columns
    const columns = [
        {
            title: "Admin",
            dataIndex: "admin",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: getTag,
        },
        {
            title: "Module",
            dataIndex: "module",
        },
        {
            title: "IP Address",
            dataIndex: "ip",
        },
        {
            title: "Date & Time",
            dataIndex: "date",
        },
    ];

    return (
        <Card title="Admin Logs">
            {/* 🔍 FILTERS */}
            <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={12}>
                    <Input
                        placeholder="Search by admin or module..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>

                <Col span={12}>
                    <Select
                        placeholder="Filter by action"
                        style={{ width: "100%" }}
                        allowClear
                        onChange={(val) => setActionFilter(val || "")}
                    >
                        <Option value="LOGIN">Login</Option>
                        <Option value="ADD_PRODUCT">Add Product</Option>
                        <Option value="DELETE_COUPON">Delete Coupon</Option>
                        <Option value="UPDATE">Update</Option>
                    </Select>
                </Col>
            </Row>

            {/* 📋 TABLE */}
            <Table
                columns={columns}
                dataSource={filteredLogs}
                pagination={{ pageSize: 6 }}
            />
        </Card>
    );
}

export default AdminLogs;