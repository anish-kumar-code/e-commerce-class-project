import React, { useEffect, useState } from "react";
import {
    Table,
    Button,
    Space,
    Popconfirm,
    message,
    Image,
    Card,
    Tag,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { deleteCategoryAPI, getAllCategoryAPI } from "../services/categoryServices";



function AllCategory() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // ==============================
    // FETCH CATEGORY
    // ==============================
    const fetchCategories = async () => {
        try {
            setLoading(true);

            const res = await getAllCategoryAPI();

            if (res.success) {
                setData(res.data);
            }

        } catch (error) {
            message.error(error.response?.data?.message || "Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    // ==============================
    // DELETE CATEGORY
    // ==============================
    const handleDelete = async (id) => {
        try {
            const res = await deleteCategoryAPI(id);

            if (res.success) {
                message.success(res.message || "Category deleted successfully");
                fetchCategories();
            }

        } catch (error) {
            message.error(error.response?.data?.message || "Delete failed");
        }
    };


    // ==============================
    // TABLE COLUMNS
    // ==============================
    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            render: (img) => (
                <Image
                    src={img}
                    width={100}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                />
            ),
        },
        {
            title: "Category Name",
            dataIndex: "name",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) =>
                status ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
        },
        {
            title: "Created",
            dataIndex: "createdAt",
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Action",
            render: (_, record) => (
                <Space>
                    {/* EDIT */}
                    <Button
                        icon={<EditOutlined />}
                        onClick={() =>
                            navigate(`/admin/edit-category/${record._id}`)
                        }
                    />

                    {/* DELETE */}
                    <Popconfirm
                        title="Delete Category"
                        description="Are you sure you want to delete this category?"
                        onConfirm={() => handleDelete(record._id)}
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
        <Card title="All Categories">
            <Table
                columns={columns}
                dataSource={data}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />
        </Card>
    );
}

export default AllCategory;