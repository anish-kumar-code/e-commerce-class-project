import React, { useState } from "react";
import { Card, Row, Col, Select, List, Avatar } from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    stats,
    revenueData,
    orderData,
    todayOrders,
    recentUsers,
} from "../data/dashboardData";

const { Option } = Select;

function Dashboard() {
    const [filter, setFilter] = useState("7days");

    return (
        <div>
            {/* 🔥 STATS */}
            <Row gutter={16}>
                {[
                    { title: "Sliders", value: stats.sliders },
                    { title: "Products", value: stats.products },
                    { title: "Categories", value: stats.categories },
                    { title: "Coupons", value: stats.coupons },
                    { title: "Orders", value: stats.orders },
                    { title: "Users", value: stats.users },
                ].map((item, i) => (
                    <Col span={8} key={i}>
                        <Card>
                            <h3>{item.title}</h3>
                            <h2>{item.value}</h2>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 🔥 CHARTS */}
            <Row gutter={16} style={{ marginTop: 20 }}>
                {/* REVENUE */}
                <Col span={16}>
                    <Card
                        title="Revenue"
                        extra={
                            <Select
                                defaultValue="7days"
                                onChange={(val) => setFilter(val)}
                            >
                                <Option value="daily">Daily</Option>
                                <Option value="7days">7 Days</Option>
                                <Option value="30days">30 Days</Option>
                            </Select>
                        }
                    >
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                {/* TODAY ORDERS */}
                <Col span={8}>
                    <Card title="Today's Orders">
                        <List
                            dataSource={todayOrders}
                            renderItem={(item) => (
                                <List.Item>
                                    {item.id} - ₹{item.amount}
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            {/* 🔥 SECOND ROW */}
            <Row gutter={16} style={{ marginTop: 20 }}>
                {/* ORDERS CHART */}
                <Col span={16}>
                    <Card title="Orders">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={orderData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                {/* RECENT USERS */}
                <Col span={8}>
                    <Card title="Recent Users">
                        <List
                            dataSource={recentUsers}
                            renderItem={(user) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar>{user.name[0]}</Avatar>}
                                        title={user.name}
                                        description={user.email}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;