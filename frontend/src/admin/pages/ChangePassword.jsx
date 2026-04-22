import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    Card,
    Progress,
    message,
} from "antd";

function ChangePassword() {
    const [form] = Form.useForm();
    const [strength, setStrength] = useState(0);

    // ✅ Password Strength Checker
    const checkStrength = (password) => {
        let score = 0;

        if (!password) return setStrength(0);

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;

        setStrength((score / 4) * 100);
    };

    // ✅ Submit
    const onFinish = (values) => {
        console.log("Password Change:", values);
        message.success("Password changed successfully");
        form.resetFields();
        setStrength(0);
    };

    return (
        <Card
            title="Change Password"
            style={{ maxWidth: 500, margin: "auto" }}
        >
            <Form layout="vertical" form={form} onFinish={onFinish}>

                {/* CURRENT PASSWORD */}
                <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[
                        { required: true, message: "Current password required" },
                    ]}
                >
                    <Input.Password placeholder="Enter current password" />
                </Form.Item>

                {/* NEW PASSWORD */}
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                        { required: true, message: "New password required" },
                        {
                            min: 8,
                            message: "Minimum 8 characters required",
                        },
                        {
                            pattern: /^[^\s]+$/,
                            message: "Spaces are not allowed",
                        },
                        {
                            pattern: /[A-Z]/,
                            message: "At least one uppercase letter required",
                        },
                        {
                            pattern: /[a-z]/,
                            message: "At least one lowercase letter required",
                        },
                        {
                            pattern: /[0-9]/,
                            message: "At least one number required",
                        },
                    ]}
                >
                    <Input.Password
                        placeholder="Enter new password"
                        onChange={(e) => checkStrength(e.target.value)}
                    />
                </Form.Item>

                {/* PASSWORD STRENGTH */}
                <Progress
                    percent={strength}
                    showInfo={false}
                    strokeColor={
                        strength < 50 ? "red" : strength < 75 ? "orange" : "green"
                    }
                    style={{ marginBottom: 20 }}
                />

                {/* CONFIRM PASSWORD */}
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    rules={[
                        { required: true, message: "Confirm your password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("newPassword") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Passwords do not match")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm password" />
                </Form.Item>

                {/* SUBMIT */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Update Password
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default ChangePassword;