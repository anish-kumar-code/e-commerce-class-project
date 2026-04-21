import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    Upload,
    Card,
    message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

function AddCategory() {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    // ✅ Upload handler
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1)); // only 1 image
    };

    // ✅ Submit
    const onFinish = (values) => {
        if (fileList.length === 0) {
            return message.error("Please upload category image");
        }

        console.log("Form Data:", values);
        console.log("Image:", fileList);

        message.success("Category added successfully");
        form.resetFields();
        setFileList([]);
    };

    return (
        <Card
            title="Add Category"
            style={{ maxWidth: 600, margin: "auto" }}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                {/* NAME */}
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[
                        { required: true, message: "Category name is required" },
                    ]}
                >
                    <Input placeholder="Enter Category name" />
                </Form.Item>

                {/* IMAGE */}
                <Form.Item label="Category Image" required>
                    <ImgCrop aspect={1 / 1} rotationCategory>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            beforeUpload={() => false}
                            maxCount={1}
                        >
                            {fileList.length < 1 && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </ImgCrop>

                    <p style={{ color: "#999" }}>
                        Image ratio: 16:9 • Crop enabled
                    </p>
                </Form.Item>

                {/* SUBMIT */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add Category
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default AddCategory;