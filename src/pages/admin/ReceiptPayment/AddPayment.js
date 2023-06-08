import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Modal, Button, Spin, Form, Row, Col, Input, InputNumber, Select} from "antd";
import { createProjectPayment } from "../../../slices/projects";
import {retrieveListProjectName} from "../../../slices/name";
import { toast } from 'react-toastify';
const { TextArea } = Input;

const AddPayment = (props) => {
    const {showModalPaymentAdd, setShowModalPaymentAdd, getListPayments} = props;
    const {user: currentUser} = useSelector((state) => (state.auth));
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    //get danh sach ten du an
    const listProjectName = useSelector((state) => state.name);
    useEffect(() => {
        dispatch(retrieveListProjectName());
    }, [])

    const onFinish = async (values) => {
        const userId = currentUser.id;
        const { projectId, amountMoney, receiver, reason } = values;
        setIsSubmit(true)
        setLoading(true);
        console.log(">>> data: " + projectId + " - " + amountMoney + " - " + receiver + " - " + reason + " - " + userId)
        dispatch(createProjectPayment({userId, projectId, amountMoney, receiver, reason }))
            .unwrap()
            .then(data => {
                console.log("dataaa: " + JSON.stringify(data));
                setLoading(false);
                toast.success("Thêm mới thành công!");
                setIsSubmit(false);
                setShowModalPaymentAdd(false);
                getListPayments();
                form.resetFields();
                return;
            })
            .catch(e => {
                toast.error("Thêm mới thất bại!");
                console.log(e);
                setIsSubmit(false);
                setLoading(false); 
                form.resetFields();
            });
    }

    return (
        <Modal
            className="upload-modal"
            title="Thêm mới phiếu chi"
            centered
            width={800}
            style={{padding: 30}}
            maskClosable={false}
            open={showModalPaymentAdd}
            onOk={() => {setShowModalPaymentAdd(false); form.resetFields();}}
            onCancel={() => {setShowModalPaymentAdd(false); form.resetFields();}}
            footer={[
                <Button key="1" type="primary" loading={isSubmit}  onClick={() => { form.submit() }}
                    style={{fontFamily: "Montserrat", backgroundColor: "#4763bd", fontWeight: 500}}>
                    Thêm mới
                </Button>
            ]}>
            <Spin spinning={loading}>
                <Form className="donation-form"
                    form={form}
                    autoComplete="off"
                    onFinish={onFinish}>
                    <Row>
                        {/* project name */}
                        <Col span={24} style={{fontStyle: "Montserrat"}}>
                            <Form.Item name="projectId" labelCol={{ span: 24 }} label="Chi cho dự án:"
                                rules={[{ required: true, message: 'Vui lòng chọn dự án!' }]}>
                                <Select placeholder="Chọn dự án muốn chi..." 
                                    showSearch
                                    allowClear
                                    style={{fontFamily: 'Montserrat'}}>
                                    {listProjectName && listProjectName.map((name, index) => (
                                        <Select.Option style={{fontFamily: 'Montserrat'}} key={index} value={name.projectId}>{name.projectName}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* money */}
                        <Col span={24}>
                            <Form.Item name="amountMoney" labelCol={{ span: 24 }} className="project-label" label="Nhập số tiền đã chi"
                                rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}>
                                <InputNumber
                                    value={10000}
                                    min={10000}
                                    style={{ width: '100%', fontFamily: "Montserrat" }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    addonAfter="VND"
                                />
                            </Form.Item>
                        </Col>
                        {/* receiver */}
                        <Col span={24}>
                            <Form.Item name="receiver" labelCol={{ span: 24 }} label="Nhập thông tin người nhận:"
                                rules={[{ required: true, message: 'Vui lòng nhập thông tin người nhận!' }]}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        {/* reason */}
                        <Col span={24}>
                            <Form.Item name="reason" labelCol={{ span: 24 }} label="Nhập lý do chi:"
                                rules={[{ required: true, message: 'Vui lòng nhập lý do chi!' }]}>
                                <TextArea></TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Modal>
    )
}

export default AddPayment;