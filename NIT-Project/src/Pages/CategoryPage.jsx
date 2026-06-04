import { useEffect, useState } from "react";
import { request } from "../util/request";
import { Button, Input, Space, Spin, Table, Tag } from "antd";

function CategoryPage() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchListCategory = async () => {       // ✅ moved above useEffect
        setLoading(true);
        try {
            const res = await request("categories", "GET");
            if (res.list) setList(res.list);
        } finally {
            setLoading(false);                    // ✅ always runs
        }
    };

    useEffect(() => {
        fetchListCategory().catch(console.error);
    }, []);

    const handleBtnEdit = (record) => {
        console.log(record);
    };        // ✅ accepts record
    const handleBtnDelete = (record) => {
        console.log(record);
    };      // ✅ accepts record
    const handleAddNewCategory = (record) => {
        console.log(record);
    };

    return (
        <div>
            <Spin spinning={loading}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Space>
                        <p>Category: {list.length}</p>
                        <Input />
                    </Space>
                    <Button type="primary" onClick={() => handleAddNewCategory}>New Category</Button>
                </div>

                <Table
                    rowKey={record => record.id}
                    style={{ marginTop: 20 }}
                    dataSource={list}
                    columns={[
                        {
                            title: "No",
                            render: (text, record, index) => index + 1,
                        },
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                        },
                        {
                            title: "Code",
                            dataIndex: "code",
                            key: "code",
                        },
                        {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
                        },
                        {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            render: (text) => (
                                text === 1
                                    ? <Tag color="green">Active</Tag>
                                    : <Tag color="red">Inactive</Tag>
                            ),
                        },
                        {
                            title: "Actions",
                            key: "actions",
                            align: "center",
                            render: (text, record) => (
                                <Space>
                                    <Button type="primary" onClick={() => handleBtnEdit(record)}>Edit</Button>
                                    <Button type="primary" danger onClick={() => handleBtnDelete(record)}>Delete</Button>
                                </Space>
                            ),
                        },
                    ]}
                />
            </Spin>

            {/* Modal */}
        </div>
    );
}

export default CategoryPage;