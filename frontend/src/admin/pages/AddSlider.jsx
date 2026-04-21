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

function AddSlider() {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    // ✅ Upload handler
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1)); // only 1 image
    };

    // ✅ Submit
    const onFinish = (values) => {
        if (fileList.length === 0) {
            return message.error("Please upload slider image");
        }

        console.log("Form Data:", values);
        console.log("Image:", fileList);

        message.success("Slider added successfully");
        form.resetFields();
        setFileList([]);
    };

    return (
        <Card
            title="Add Slider"
            style={{ maxWidth: 600, margin: "auto" }}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                {/* NAME */}
                <Form.Item
                    label="Slider Name"
                    name="name"
                    rules={[
                        { required: true, message: "Slider name is required" },
                    ]}
                >
                    <Input placeholder="Enter slider name" />
                </Form.Item>

                {/* IMAGE */}
                <Form.Item label="Slider Image" required>
                    <ImgCrop aspect={16 / 9} rotationSlider>
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
                        Add Slider
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default AddSlider;