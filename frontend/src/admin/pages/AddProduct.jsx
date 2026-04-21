import React, { useState } from "react";
import {
    Form,
    Input,
    InputNumber,
    Button,
    Upload,
    Select,
    message,
    Row,
    Col,
    Card,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

const { TextArea } = Input;

function AddProduct() {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    // ✅ Image Upload Handler
    const onChange = ({ fileList: newFileList }) => {
        if (newFileList.length <= 5) {
            setFileList(newFileList);
        } else {
            message.error("Maximum 5 images allowed");
        }
    };

    // ✅ Offer Calculation
    const calculateDiscount = () => {
        const original = form.getFieldValue("originalPrice");
        const selling = form.getFieldValue("sellingPrice");

        if (original && selling && original > selling) {
            const discount = (((original - selling) / original) * 100).toFixed(2);
            form.setFieldsValue({ discount });
        } else {
            form.setFieldsValue({ discount: 0 });
        }
    };

    // ✅ Submit
    const onFinish = (values) => {
        if (fileList.length === 0) {
            return message.error("Please upload at least 1 image");
        }

        console.log("Form Values:", values);
        console.log("Images:", fileList);

        message.success("Product Added Successfully");
    };

    return (
        <Card title="Add Product" style={{ maxWidth: 1000, margin: "auto" }}>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    {/* TITLE */}
                    <Col span={12}>
                        <Form.Item
                            label="Product Title"
                            name="title"
                            rules={[{ required: true, message: "Title is required" }]}
                        >
                            <Input placeholder="Enter product title" />
                        </Form.Item>
                    </Col>

                    {/* STOCK */}
                    <Col span={12}>
                        <Form.Item
                            label="Stock"
                            name="stock"
                            rules={[{ required: true, message: "Stock is required" }]}
                        >
                            <InputNumber style={{ width: "100%" }} min={0} />
                        </Form.Item>
                    </Col>

                    {/* DESCRIPTION */}
                    <Col span={24}>
                        <Form.Item
                            label="Short Description"
                            name="description"
                            rules={[{ required: true, message: "Description required" }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>

                    {/* ORIGINAL PRICE */}
                    <Col span={12}>
                        <Form.Item
                            label="Original Price"
                            name="originalPrice"
                            rules={[{ required: true, message: "Required" }]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                min={1}
                                onChange={calculateDiscount}
                            />
                        </Form.Item>
                    </Col>

                    {/* SELLING PRICE */}
                    <Col span={12}>
                        <Form.Item
                            label="Selling Price"
                            name="sellingPrice"
                            rules={[{ required: true, message: "Required" }]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                min={1}
                                onChange={calculateDiscount}
                            />
                        </Form.Item>
                    </Col>

                    {/* DISCOUNT */}
                    <Col span={12}>
                        <Form.Item label="Discount (%)" name="discount">
                            <InputNumber style={{ width: "100%" }} disabled />
                        </Form.Item>
                    </Col>

                    {/* REVIEW */}
                    <Col span={12}>
                        <Form.Item
                            label="Review (Rating)"
                            name="review"
                            rules={[{ required: true, message: "Review is required" }]}
                        >
                            <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    {/* STATUS */}
                    <Col span={12}>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: "Select status" }]}
                        >
                            <Select placeholder="Select status">
                                <Select.Option value="active">Active</Select.Option>
                                <Select.Option value="inactive">Inactive</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* IMAGE UPLOAD */}
                    <Col span={24}>
                        <Form.Item label="Product Images" required>
                            <ImgCrop rotationSlider aspect={1}>
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    beforeUpload={() => false} // prevent auto upload
                                >
                                    {fileList.length < 5 && (
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    )}
                                </Upload>
                            </ImgCrop>
                            <p style={{ color: "#999" }}>
                                Max 5 images • 1:1 ratio • Crop enabled
                            </p>
                        </Form.Item>
                    </Col>
                </Row>

                {/* SUBMIT */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default AddProduct;