import {Button, Form, Input, Modal, Select, Space, Spin, Table, Tag, message} from "antd";
import { useEffect, useState } from "react";
import { request } from "../util/request";

function CategoryPage() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [formRef] = Form.useForm();
    const [editData, setEditData] = useState({});


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
        setEditData(record);
        formRef.setFieldsValue({
            id: record.id,
            name: record.name,
            code: record.code,
            description: record.description,
            status: record.status,
        });
        setOpenModal(true);
    };        // ✅ accepts record

    const handleBtnDelete = () => {
        console.log();
    };      // ✅ accepts record

    const handleAddNewCategory = () => {
        console.log();
    };

    const ShowModalPopup = () => {
        setOpenModal(true);
    };

    const CloseModalPopup = () => {
        setOpenModal(false);
        setEditData({});
        formRef.resetFields();
    };

    const onFinish = async (values) => {
        const data = {
            id: editData?.id,          // ✅ from state, not form
            name: values.name,
            code: values.code,
            description: values.description,
            status: values.status,
        };

        const method = editData?.id ? "PUT" : "POST";
        const url = editData?.id ? `categories/${editData.id}` : "categories";

        setLoading(true);
        try {
            const res = await request(url, method, data);
            if (res.success) {
                message.success(res.message);
                fetchListCategory().catch(console.error);
                CloseModalPopup();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);  // ✅ always runs
        }
    };

    return (
        <div>
            <Spin spinning={loading}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Space>
                        <p>Category: {list.length}</p>
                        <Input/>
                    </Space>
                    <Button type="primary" onClick={() => ShowModalPopup()}>New Category</Button>
                </div>

                <Table
                    rowKey={record => record.id}
                    style={{marginTop: 20}}
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
                                    <Button type="primary" danger
                                            onClick={() => handleBtnDelete(record)}>Delete</Button>
                                </Space>
                            ),
                        },
                    ]}
                />
            </Spin>

            {/* Modal */}
            <Modal style={{marginTop: 16}} title="Category Form" open={openModal} onCancel={() => CloseModalPopup()} footer={null}>
                <Form form={formRef} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Name" name="name"
                               rules={[{required: true, message: "Please enter name Category!"}]}>
                        <Input placeholder="Enter name Category"/>
                    </Form.Item>
                    <Form.Item label="Code" name="code"
                               rules={[{required: true, message: "Please enter code Category!"}]}>
                        <Input placeholder="Please enter your code Category"/>
                    </Form.Item>
                    <Form.Item label="Description" name="description"
                               rules={[{required: true, message: "Please enter description!"}]}>
                        <Input.TextArea rows={3} placeholder="Enter description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{required: true, message: "Please select status!"}]}
                    >
                        <Select
                            placeholder="Select status"
                            options={[
                                {label: "Active", value: 1},
                                {label: "Inactive", value: 0},
                            ]}
                        />
                    </Form.Item>
                    <div style={{textAlign: "right", marginTop: 20}}>
                        <Space>
                            <Button type="primary" danger onClick={() => CloseModalPopup()}>Close</Button>
                            <Button type="primary" htmlType="submit">
                                {editData?.id ? "Update" : "Save"} {/* ✅ dynamic button label */}
                            </Button>
                        </Space>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default CategoryPage;