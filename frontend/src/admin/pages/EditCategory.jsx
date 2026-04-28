import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router";
import { getSingleCategoryAPI, updateCategoryAPI } from "../services/categoryServices";


function EditCategory() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [oldImage, setOldImage] = useState("");

    // ==============================
    // GET SINGLE CATEGORY DETAILS
    // ==============================
    const fetchCategoryDetails = async () => {
        try {
            setLoading(true);

            const res = await getSingleCategoryAPI(id);

            if (res.success) {
                const category = res.data;

                form.setFieldsValue({
                    name: category.name,
                    status: category.status
                });

                setOldImage(category.image);
            }

        } catch (error) {
            message.error(error.response?.data?.message || "Failed to load category");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, [id]);


    // ==============================
    // IMAGE CHANGE
    // ==============================
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1));
    };


    // ==============================
    // UPDATE CATEGORY
    // ==============================
    const onFinish = async (values) => {
        try {
            setBtnLoading(true);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("status", values.status);

            if (fileList.length > 0) {
                formData.append("image", fileList[0].originFileObj);
            }

            const res = await updateCategoryAPI(id, formData);

            if (res.success) {
                message.success(res.message || "Category updated successfully");
                navigate("/admin/all-category");
            }

        } catch (error) {
            message.error(error.response?.data?.message || "Update failed");
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <Card
            title="Edit Category"
            style={{ maxWidth: 600, margin: "auto" }}
            loading={loading}
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

                {/* STATUS */}
                <Form.Item
                    label="Status"
                    name="status"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>

                {/* OLD IMAGE */}
                {oldImage && fileList.length === 0 && (
                    <div style={{ marginBottom: "15px" }}>
                        <img
                            src={oldImage}
                            alt="old"
                            style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "cover",
                                borderRadius: "8px"
                            }}
                        />
                    </div>
                )}

                {/* NEW IMAGE */}
                <Form.Item label="Category Image">
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
                        Upload new image only if you want to replace old one
                    </p>
                </Form.Item>

                {/* SUBMIT */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={btnLoading}
                    >
                        Update Category
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default EditCategory;