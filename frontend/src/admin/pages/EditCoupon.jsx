import React, { useState } from "react";
import {
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    DatePicker,
    Card,
    Row,
    Col,
    message,
} from "antd";

const { Option } = Select;

function EditCoupon() {
    const [form] = Form.useForm();
    const [type, setType] = useState("flat");

    // ✅ Submit
    const onFinish = (values) => {
        console.log("Coupon Data:", values);
        message.success("Coupon Created Successfully");
        form.resetFields();
    };

    return (
        <Card title="Edit Coupon" style={{ maxWidth: 800, margin: "auto" }}>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    {/* COUPON CODE */}
                    <Col span={12}>
                        <Form.Item
                            label="Coupon Code"
                            name="code"
                            rules={[
                                { required: true, message: "Coupon code required" },
                                { min: 3, message: "Minimum 3 characters" },
                            ]}
                        >
                            <Input placeholder="e.g. SAVE50" />
                        </Form.Item>
                    </Col>

                    {/* DISCOUNT TYPE */}
                    <Col span={12}>
                        <Form.Item
                            label="Discount Type"
                            name="type"
                            initialValue="flat"
                            rules={[{ required: true }]}
                        >
                            <Select onChange={(val) => setType(val)}>
                                <Option value="flat">Flat</Option>
                                <Option value="percentage">Percentage</Option>
                                <Option value="upto">Upto</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* DISCOUNT */}
                    <Col span={12}>
                        <Form.Item
                            label={
                                type === "percentage"
                                    ? "Discount (%)"
                                    : "Discount Amount"
                            }
                            name="discount"
                            rules={[{ required: true, message: "Discount required" }]}
                        >
                            <InputNumber style={{ width: "100%" }} min={1} />
                        </Form.Item>
                    </Col>

                    {/* MIN VALUE */}
                    <Col span={12}>
                        <Form.Item
                            label="Minimum Order Value"
                            name="minValue"
                            rules={[{ required: true, message: "Required" }]}
                        >
                            <InputNumber style={{ width: "100%" }} min={0} />
                        </Form.Item>
                    </Col>

                    {/* START DATE */}
                    <Col span={12}>
                        <Form.Item
                            label="Start Date"
                            name="startDate"
                            rules={[{ required: true, message: "Select start date" }]}
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    {/* EXPIRY DATE */}
                    <Col span={12}>
                        <Form.Item
                            label="Expiry Date"
                            name="expiryDate"
                            rules={[
                                { required: true, message: "Select expiry date" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value > getFieldValue("startDate")) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("Expiry must be after start date")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    {/* TOTAL USES */}
                    <Col span={12}>
                        <Form.Item
                            label="Total Uses"
                            name="uses"
                            rules={[{ required: true, message: "Required" }]}
                        >
                            <InputNumber style={{ width: "100%" }} min={1} />
                        </Form.Item>
                    </Col>

                    {/* PER USER USE */}
                    <Col span={12}>
                        <Form.Item
                            label="Per User Uses"
                            name="perUserUses"
                            rules={[{ required: true, message: "Required" }]}
                        >
                            <InputNumber style={{ width: "100%" }} min={1} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* SUBMIT */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Edit Coupon
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default EditCoupon;