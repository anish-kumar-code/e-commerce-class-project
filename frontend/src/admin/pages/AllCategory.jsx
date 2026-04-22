import React, { useState } from "react";
import {
    Table,
    Button,
    Space,
    Popconfirm,
    message,
    Image,
    Card,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

function AllCategory() {
    const navigate = useNavigate();

    // ✅ Dummy Data (Replace with API)
    const [data, setData] = useState([
        {
            key: "1",
            name: "Summer Sale Banner",
            image: "https://via.placeholder.com/300x150",
        },
        {
            key: "2",
            name: "Winter Collection",
            image: "https://via.placeholder.com/300x150",
        },
    ]);

    // ✅ Delete Slider
    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
        message.success("Slider deleted successfully");
    };

    // ✅ Table Columns
    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            render: (img) => (
                <Image
                    src={img}
                    width={120}
                    style={{ borderRadius: "6px" }}
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Action",
            render: (_, record) => (
                <Space>
                    {/* EDIT */}
                    <Button
                        icon={<EditOutlined />}
                        onClick={() =>
                            navigate(`/admin/edit-category?id=${record.key}`)
                        }
                    />

                    {/* DELETE */}
                    <Popconfirm
                        title="Delete Slider"
                        description="Are you sure you want to delete this slider?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card title="All Category">
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
            />
        </Card>
    );
}

export default AllCategory;