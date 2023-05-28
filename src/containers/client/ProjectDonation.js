import React from 'react';
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Button, Form, Input, InputNumber, Modal, Divider, Space, Row, Col, Select, Spin} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import "./Project.scss";

import  {retrieveListProjectName} from "../../slices/name";
import  {createContribution} from "../../slices/contribution";

const { TextArea } = Input;
const ProjectDonation = (props) => {
    let navigate = useNavigate();
    const {openModalProjectDonation, setOpenModalProjectDonation, currentUserId, currentProject, dataSource, totalMoney, money} = props;
    
    const [form] = Form.useForm();
    const [initForm, setInitForm] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isNavigate, setIsNavigate] = useState(false);
    const [loading, setLoading] = useState(false);

    //get danh sach ten du an
    const listProjectName = useSelector((state) => state.name);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(retrieveListProjectName());
    }, [])

    //get gia tri mac dinh cho form
    useEffect(() => {
        if(currentProject){
            const artifact = dataSource?.map(data => {
                return {
                    artifactName: data.artifactName,
                    donatedAmount: data.minQuantity,
                    calculationUnit: data.calculationUnit
                }
            });
            const init = {
                projectId: currentProject.id,
                projectName: currentProject.name,
                userId: currentUserId,
                nickname: "Ẩn danh",
                contributionArtifacts: artifact
            }
            setInitForm(init);
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
        }
    }, [currentProject])

    const onFinish = (values) => {
        const userId = currentUserId;
        const { nickname, messages, projectId, amountMoney, contributionArtifacts} = values;
        setIsSubmit(true)
        setLoading(true);
        dispatch(createContribution({ userId, projectId, nickname, messages, amountMoney, contributionArtifacts }))
        .unwrap()
        .then(data => {
            console.log("dataaa: " + JSON.stringify(data));
            setLoading(false);
            toast.success("Thêm đơn đóng góp thành công!");
            setIsSubmit(false);
            if(isNavigate === true) {
                // navigate("/order");
                navigate('/order');
            }
            form.resetFields();
            props.setOpenModalProjectDonation(false);
            return;
        })
        .catch(e => {
          toast.error("Thêm đơn đóng góp thất bại!");
          console.log(e);
          setIsSubmit(false);
          setLoading(false);
          setIsNavigate(false);
        });
      };

    return (
        <Modal
            title="Đơn đóng góp"
            centered
            width={800}
            style={{padding: 30}}
            open={openModalProjectDonation}
            onOk={() => setOpenModalProjectDonation(false)}
            onCancel={() => {
                setOpenModalProjectDonation(false)
                form.setFieldsValue(initForm)}}
            footer={[
                <Button key="1" type="primary" 
                    loading={isSubmit}
                    onClick={() => { form.submit() }}
                    style={{fontSize: 15, fontFamily: "Montserrat", background: "#d95c5c !important"}}>
                  Thêm vào danh sách chờ
                </Button>,
                <Button key="2" type="primary"
                     style={{fontSize: 15, fontFamily: "Montserrat"}}
                    //  loading2={isSubmit}
                     onClick={() => { form.submit(); setIsNavigate(true)}}>
                  Đóng góp
                </Button>
              ]}
        >
            <Spin spinning={loading}>
                <Form className="donation-form"
                    form={form}
                    autoComplete="off"
                    layout="horizontal"
                    onFinish={onFinish}>
                    <Row>
                        {/* nickname */}
                        <Col span={24}>
                            <Form.Item hidden name="userId" >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name="nickname" labelCol={{ span: 24 }} label="Tên công khai:"
                                rules={[{ required: true, message: 'Vui lòng nhập tên công khai!' }]}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        {/* messages */}
                        <Col span={24}>
                            <Form.Item name="messages" labelCol={{ span: 24 }}label="Lời nhắn:">
                                <TextArea></TextArea>
                            </Form.Item>
                        </Col>
                        {/* project name */}
                        <Col span={24} style={{fontStyle: "Montserrat"}}>
                            <Form.Item name="projectId" labelCol={{ span: 24 }} label="Sử dụng vào dự án:"
                                rules={[{ required: true, message: 'Vui lòng chọn dự án!' }]}>
                                <Select placeholder="Chọn dự án muốn đóng góp..." 
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
                            <Divider>Thông tin đóng góp</Divider>
                            <Form.Item name="amountMoney" labelCol={{ span: 24 }} className="project-label" label="Nhập số tiền"
                                rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}>
                                <InputNumber
                                    min={0}
                                    style={{ width: '100%', fontFamily: "Montserrat" }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    addonAfter="VND"
                                />
                            </Form.Item>
                        </Col>   
                        {/* artifact  */}
                        <Col span={24} style={{fontFamily: "Montserrat"}}>
                            <p style={{fontFamily: "Montserrat", fontSize: "15px", color: "#2b4c8f", fontWeight: 500}}>Đóng góp hiện vật</p>
                            <Form.List labelCol={{ span: 24 }} name="contributionArtifacts">
                                {(fields, { add, remove }) => (
                                    <>
                                    {fields.map((field, index ) => (
                                        <Space key={field.key} style={{display: "flex"}} direction="horizontal">
                                            <Form.Item name={[field.name, "artifactName"]} label={`${index+1}- Hiện vật:`}  
                                                rules={[{ required: true, message: "Vui lòng nhập tên hiện vật!" }]}>
                                                <Input style={{width: 275}} placeholder='Tên hiện vật'/>
                                            </Form.Item>
                                            <Form.Item style={{fontFamily: "Montserrat"}} name={[field.name, "donatedAmount"]}
                                                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
                                                <InputNumber min={1} style={{width: 120, fontFamily: "Montserrat"}} placeholder='Số lượng'/>
                                            </Form.Item>
                                            <Form.Item name={[field.name, "calculationUnit"]}
                                                rules={[{ required: true, message: "Vui lòng nhập đơn vị!" }]}>
                                                <Input style={{width: 150}} placeholder='Đơn vị'/>
                                            </Form.Item>
                                            <MinusCircleOutlined style={{color: "red", paddingBottom: 25}} onClick={() => remove(field.name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button style={{fontSize: 15, fontFamily: "Montserrat", fontWeight: "500"}} type="dashed" onClick={() => {add()}} block icon={<PlusOutlined />}>
                                            Thêm hiện vật
                                        </Button>
                                    </Form.Item>
                                </>
                                )}
                            </Form.List>
                        </Col> 
                        <Col span={24} style={{fontFamily: "Montserrat", marginTop: "20px"}}>
                            <p className='text-title'>*Các thông tin cần lưu ý khi đóng góp:</p>
                            <p className='text-content'>1. Vui lòng nhập đủ các thông tin yêu cầu.</p>
                            <p className='text-content'>2. Bạn có thể đóng góp cho dự án bạn muốn bằng tiền hoặc hiện vật hoặc cả hai.</p>
                            <p className='text-content'>3. Bạn có thể đóng góp những hiện vật theo yêu cầu của dự án hoặc bạn có thể đóng góp hiện vật khác.</p>
                            <p className='text-content'>4. Đơn đóng góp hiện vật sẽ phải chờ Admin phê duyệt và nếu được duyệt, bạn cần đem hiện vật tới địa chỉ mà tổ chức yêu cầu.</p>
                        </Col> 
                    </Row>
                </Form>
            </Spin>
        </Modal>
    )

}

export default ProjectDonation;