import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';

import {Modal, Form, Spin, Button, Row, Col, Input, Select} from 'antd';
import { toast } from 'react-toastify';

import  {createFormVolunteer, getAllFormVolunteer} from "../../slices/form";

const ProjectVolunteer = (props) => {
    const {openModalProjectVolunteer, setOpenModalProjectVolunteer, currentProject} = props;
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [initForm, setInitForm] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const {user: currentUser} = useSelector((state) => (state.auth));

    const [listForm, setListForm] = useState([]);
    //get tat ca form da dang ky tinh nguyen vien
    const getAll = () => {
        dispatch(getAllFormVolunteer())
            .then((res) => {
                setListForm(res.payload);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(getAll, []);

    //get gia tri mac dinh cho form neu nguoi dung da dang nhap
    useEffect(() => {
        if(currentUser){
            const init = {
                email: currentUser.email,
                phone: currentUser.phone,
                projectId: currentProject.id,
                projectName: currentProject.name,
            }
            setInitForm(init);
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
        }
    }, [currentProject])

    const checkValidate = (_email, _phone, _projectName) => {
        return listForm.some(obj => obj.email.trim() === _email.trim() && obj.phone.trim() === _phone.trim() && 
            obj.projectName.trim() === _projectName.trim())
    }
    
    const onFinish = async (values) => {
        const { email, phone, projectId, projectName } = values;
        setIsSubmit(true)
        setLoading(true);
        //check xem da ton tai don dang ky chua
        if(!checkValidate(email, phone, projectName)){
            dispatch(createFormVolunteer({ email, phone, projectId }))
                .unwrap()
                .then(data => {
                    console.log("dataaa: " + JSON.stringify(data));
                    setLoading(false);
                    toast.success("Đăng ký thành công!");
                    setIsSubmit(false);
                    setOpenModalProjectVolunteer(false);
                    getAll();
                    return;
                })
                .catch(e => {
                    toast.error("Đăng ký thất bại!");
                    console.log(e);
                    setIsSubmit(false);
                    setLoading(false); 
                });
        } else{
            toast.error("Bạn đã đăng ký cho dự án này rồi!");
            setLoading(false);
            setIsSubmit(false);
            setOpenModalProjectVolunteer(false);
            return;
        }
    }

    return (
        <Modal
            title="Đơn đăng ký tình nguyện viên"
            centered
            width={800}
            style={{padding: 30}}
            open={openModalProjectVolunteer}
            onOk={() => setOpenModalProjectVolunteer(false)}
            onCancel={() => {
                setOpenModalProjectVolunteer(false)
            }}
            footer={[
                <Button key="2" type="primary"
                     style={{fontSize: 15, fontFamily: "Montserrat"}}
                     loading={isSubmit}
                     onClick={() => { form.submit(); }}>
                  Gửi đơn đăng ký
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
                        {/* email */}
                        <Col span={24}>
                            <Form.Item name="email" labelCol={{ span: 24 }} label="Email:"
                                rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        {/* phone */}
                        <Col span={24}>
                            <Form.Item name="phone" labelCol={{ span: 24 }} label="Số điện thoại:"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        {/* project name */}
                        <Col span={24} style={{fontStyle: "Montserrat"}}>
                            <Form.Item hidden name="projectId" labelCol={{ span: 24 }} label="Sử dụng vào dự án:"
                                rules={[{ required: true, message: 'Vui lòng chọn dự án!' }]}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item name="projectName" labelCol={{ span: 24 }} label="Sử dụng vào dự án:">
                                <Input disabled></Input>
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{fontFamily: "Montserrat", marginTop: "20px"}}>
                            <p className='text-title'>*Các thông tin cần lưu ý khi đăng ký trở thành tình nguyện viên:</p>
                            <p className='text-content'>1. Vui lòng nhập đủ các thông tin yêu cầu.</p>
                            <p className='text-content'>2. Đơn đăng ký sẽ được phản hồi qua email của bạn!</p>
                        </Col> 
                    </Row>
                </Form>
            </Spin>
        </Modal>
    )
}

export default ProjectVolunteer;