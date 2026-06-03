import { useEffect, useState } from "react";
import { request } from "../util/request";
import { Modal } from "antd";
import { Space, Table, Button, Form, Input, Select } from "antd"; // ✅ removed unused imports

function RolePage() {
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null); // ✅ track edit vs create
    const [formRef] = Form.useForm();
    const fetchRole = async () => {
        const res = await request("roles", "GET");
        setList(res.list);
    };

    useEffect(() => {
        fetchRole();
    }, []);

    // ✅ Open modal for CREATE
    const handleOpenCreate = () => {
        setEditData(null);
        formRef.resetFields();
        setOpen(true);
    };

    // ✅ Open modal for EDIT — prefill form with existing data
    const handleOpenEdit = (record) => {
        setEditData(record);
        formRef.setFieldsValue({
            name: record.name,
            description: record.description,
            status: record.status,
        });
        setOpen(true);
    };

    // ✅ Reset everything on close
    const handleCloseModal = () => {
        setOpen(false);
        setEditData(null);
        formRef.resetFields();
    };

    // ✅ Delete role
    const handleDelete = async (record) => {
        const res = await request("roles/" + record.id, "DELETE");
        if (res.success) {
            fetchRole(); // ✅ removed alert() — just refresh
        } else {
            alert(res.message || "Delete failed.");
        }
    };

    // ✅ Single onFinish handles both POST (create) and PUT (update)
    const onFinish = async (item) => {
        const data = {
            name: item.name,
            description: item.description,
            status: item.status,
        };

        if (editData) {
            // ✅ EDIT — PUT
            const res = await request("roles/" + editData.id, "PUT", data);
            if (res.success) {
                handleCloseModal();
                fetchRole();
            } else {
                alert("Update failed.");
            }
        } else {
            // ✅ CREATE — POST
            const res = await request("roles", "POST", data);
            if (res.success) {
                handleCloseModal();
                fetchRole();
            } else {
                alert("Create failed.");
            }
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4>List Role: <span style={{color:"green", fontSize: 20}}>{list.length}</span></h4>

                {/* ✅ Fixed button name */}
                <Button type="primary" onClick={handleOpenCreate}>Add Role</Button>
            </div>

            {/* ✅ One modal handles both Create and Edit */}
            <Modal
                open={open}
                title={editData ? "Edit Role" : "Add New Role"} // ✅ dynamic title
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form form={formRef} layout="vertical" style={{ marginTop: 16 }} onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Role Name"
                        rules={[{ required: true, message: "Please enter role name!" }]}
                    >
                        <Input placeholder="Enter role name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: "Please enter description!" }]}
                    >
                        <Input.TextArea rows={3} placeholder="Enter description" />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Please select status!" }]}
                    >
                        <Select
                            placeholder="Select status"
                            options={[
                                { label: "Active", value: 1 },
                                { label: "Inactive", value: 0 },
                            ]}
                        />
                    </Form.Item>

                    <div style={{ textAlign: "right", marginTop: 20 }}>
                        <Space>
                            <Button type="primary" danger onClick={handleCloseModal}>Cancel</Button>
                            <Button type="primary" htmlType="submit">
                                {editData ? "Update" : "Save"} {/* ✅ dynamic button label */}
                            </Button>
                        </Space>
                    </div>
                </Form>
            </Modal>

            <Table
                style={{ marginTop: 20 }}
                dataSource={list}
                rowKey="id"
                columns={[
                    {
                        title: "No",
                        key: "no",
                        render: (_, __, index) => index + 1 // ✅ fixed param name (was "request")
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
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
                        render: (text) =>
                            text === 1
                                ? <Button color="green" variant="outlined" shape="round">Active</Button>
                                : <Button color="red" variant="outlined" shape="round">Inactive</Button>
                    },
                    {
                        title: "Action",
                        key: "action", // ✅ fixed key (was "center " with space)
                        render: (_, record) => ( // ✅ removed unused params
                            <Space>
                                {/* ✅ Edit button now works */}
                                <Button type="primary" onClick={() => handleOpenEdit(record)}>Edit</Button>
                                <Button type="primary" danger onClick={() => handleDelete(record)}>Delete</Button>
                            </Space>
                        )
                    }
                ]}
            />
        </div>
    );
}

export default RolePage;