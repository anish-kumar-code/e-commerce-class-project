import React, { useState } from "react";
import {
    Card,
    Descriptions,
    Button,
    Form,
    Input,
    Row,
    Col,
    message,
} from "antd";

function AdminProfile() {
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState(false);

    // ✅ Dummy Data (Replace with API)
    const [admin, setAdmin] = useState({
        name: "Admin User",
        email: "admin@shopkart.com",
        phone: "9876543210",
        ip: "192.168.1.1",
    });

    // ✅ Edit Mode
    const handleEdit = () => {
        setIsEdit(true);
        form.setFieldsValue(admin);
    };

    // ✅ Cancel
    const handleCancel = () => {
        setIsEdit(false);
    };

    // ✅ Save
    const handleSave = (values) => {
        setAdmin({ ...admin, ...values });
        setIsEdit(false);
        message.success("Profile updated successfully");
    };

    return (
        <Card
            title="Admin Profile"
            extra={
                !isEdit && (
                    <Button type="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                )
            }
            style={{ maxWidth: 700, margin: "auto" }}
        >
            {!isEdit ? (
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Name">
                        {admin.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        {admin.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mobile">
                        {admin.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Current IP">
                        {admin.ip}
                    </Descriptions.Item>
                </Descriptions>
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSave}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: "Name required" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Email required" },
                                    { type: "email", message: "Invalid email" },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Mobile"
                                name="phone"
                                rules={[
                                    { required: true, message: "Mobile required" },
                                    { len: 10, message: "Must be 10 digits" },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* ACTION BUTTONS */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>

                        <Button
                            style={{ marginLeft: 10 }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Card>
    );
}

export default AdminProfile;