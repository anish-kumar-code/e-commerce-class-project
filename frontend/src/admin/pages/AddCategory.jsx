import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    Upload,
    Card,
    message,
    Switch,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useNavigate } from "react-router";
import { addCategoryAPI } from "../services/categoryServices";

function AddCategory() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    // ==============================
    // IMAGE UPLOAD HANDLER
    // ==============================
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1));
    };

    // ==============================
    // FORM SUBMIT
    // ==============================
    const onFinish = async (values) => {
        try {
            if (fileList.length === 0) {
                return message.error("Please upload category image");
            }

            setLoading(true);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("status", values.status ?? true);
            formData.append("image", fileList[0].originFileObj);

            const res = await addCategoryAPI(formData);

            if (res.success) {
                message.success(res.message || "Category added successfully");
                form.resetFields();
                setFileList([]);
                navigate("/admin/all-category");
            }

        } catch (error) {
            message.error(error.response?.data?.message || "Failed to add category");
        } finally {
            setLoading(false);
        }
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
                initialValues={{
                    status: true
                }}
            >
                {/* CATEGORY NAME */}
                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[
                        { required: true, message: "Category name is required" },
                    ]}
                >
                    <Input placeholder="Enter Category name" />
                </Form.Item>

                {/* STATUS */}
                <Form.Item
                    label="Status"
                    name="status"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>

                {/* IMAGE */}
                <Form.Item label="Category Image" required>
                    <ImgCrop aspect={1 / 1}>
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
                        Image upload with crop enabled
                    </p>
                </Form.Item>

                {/* SUBMIT */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                    >
                        Add Category
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default AddCategory;