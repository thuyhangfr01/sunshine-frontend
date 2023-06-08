import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

import "./FormHelp.scss";
import {Row, Col, Spin, Form , Button, Modal, Input, Upload, Card, Image, Space} from "antd";
import {PlusOutlined} from '@ant-design/icons'

import {CloudinaryContext } from 'cloudinary-react';
import {createFormHelp, createImageByForm} from "../../../slices/form";

const { TextArea } = Input;
const FormHelpAdd = (props) => {
    const {openViewAdd, setOpenViewAdd, getAllFormHelp} = props;
    const dispatch = useDispatch();
    const {user: currentUser} = useSelector((state) => (state.auth));

    const [form] = Form.useForm();
    const [initForm, setInitForm] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newFomrId, setNewFomrId] = useState(null);

    const [showImage, setShowImage] = useState(false);
    const [images, setImages] = useState([]);
    const [loadingImage, setLoadingImage] = useState(false);

    useEffect(() => {
        if(currentUser){
            const init = {
                fullName: currentUser.name,
                email: currentUser.email,
                phone: currentUser.phone,
            }
            setInitForm(init);
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
        }
    }, [])

    const onFinish = (values) => {
        const {fullName, email, phone, title, contents} = values;
        setIsSubmit(true)
        setLoading(true);
        console.log("hmm: " + fullName + " - " + email + " - " + phone + " - " + title + " - " + contents)
        dispatch(createFormHelp({fullName, email, phone, title, contents}))
          .unwrap()
          .then(data => {
            setNewFomrId(data.id);
            setLoading(false);
            setIsSubmit(false);
            toast.success("Gửi đơn yêu cầu thành công!");
            form.resetFields();
            getAllFormHelp();
            setOpenViewAdd(false)
            return;
          })
          .catch(e => {
            toast.error("Gửi đơn yêu cầu thất bại!");
            console.log(e);
            setIsSubmit(false);
            setLoading(false);
            setOpenViewAdd(false)
          });
      };

    const handleImageUpload = async ({ file }) => {
        setLoadingImage(true)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'sunshine');
        const response = await fetch("https://api.cloudinary.com/v1_1/dp0hbi49d/image/upload",
        {
            method: 'POST',
            body: formData
        })
        setLoadingImage(false);
        const data = await response.json();
        setImages([...images, {url: data.secure_url}])
        return data.secure_url;
    }

    //them anh
    const handleAddImage = () => {
        setShowImage(true);
        const id = newFomrId;
        let name = null;
        console.log("images: " + JSON.stringify(images));
        if(images.length !== 0) {
            images.map((image) => {
                name = image.url;
                if(id !== null && name !== null){
                    dispatch(createImageByForm({id, name}))
                    .then((res) => {
                        setShowImage(false);
                        setImages([])
                    })
                    .catch((e) => {
                        console.log(e);
                        setShowImage(false);
                        setImages([]);
                    })
                } 
            })
        }
    }
    useEffect(handleAddImage, [newFomrId, images]);    
    
    return (
        <Modal
            title="Đơn yêu cầu hỗ trợ"
            centered
            width={800}
            style={{padding: 30}}
            open={openViewAdd}
            onOk={() => {setOpenViewAdd(false); setShowImage(false)}}
            onCancel={() => {setOpenViewAdd(false); setShowImage(false)}}
            footer={false}
        >
            <Spin spinning={loading}>
                <Form
                    className="project-form-add"
                    form={form}
                    autoComplete="off"
                    layout="horizontal"
                    style={{ maxWidth: 1000 }}
                    initialValues={{ prefix: 'VND' }}
                    onFinish={onFinish}       
                    >
                    <Row>
                        <Col span={24}>
                            <Form.Item name="fullName" labelCol={{ span: 24 }} label="Họ và tên:"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
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
                        {/* Tiêu đề */}
                        <Col span={24}>
                            <Form.Item 
                                labelCol={{ span: 24 }}
                                name="title"
                                label="Tiêu đề:"
                                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        {/* Nội dung */}
                        <Col span={24}>
                            <Form.Item 
                                labelCol={{ span: 24 }}
                                name="contents"
                                label="Nội dung chi tiết"
                                rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}>
                                <TextArea  rows={15} name="details"></TextArea>
                            </Form.Item>
                        </Col>
                        {/* Upload hình ảnh */}
                        <Col span={24}>
                            <Form.Item
                                label="Hình ảnh minh chứng kèm theo"
                                name="file"
                            >
                                <CloudinaryContext cloudName="dp0hbi49d">
                                    <Upload
                                        name="file"
                                        listType="text"
                                        className="avatar-uploader"
                                        multiple={false}
                                        customRequest={handleImageUpload}
                                        action=""
                                    >
                                        <div>
                                            <Button icon={<PlusOutlined />} style={{borderStyle: "dashed",  }}>Upload</Button>
                                        </div>
                                    </Upload>
                                </CloudinaryContext>
                            </Form.Item>
                        </Col>
                        {showImage &&
                            <Col span={24} style={{display: "flex", width: 730, flexWrap: "wrap", gap: 25}}>
                                {loadingImage 
                                ? 
                                    <Space size="large" style={{marginLeft: 50}}>
                                        <Spin size="middle"/>
                                    </Space>
                                :
                                    <>
                                    {images && images.map((image, index) => (
                                        <Card className="card-form" key={index} style={{height: 160, width: 220,}}>
                                            <Image preview={false} className="img-form" src={image.url} style={{width: 190, height: 130, marginTop: "-8px", marginLeft: "-9px"}}  />
                                        </Card>
                                        ))}
                                    </>
                                }
                            </Col>
                        }
                        <Button style={{marginTop: 15, color: "#fff !important"}} type="primary" htmlType="submit" loading={isSubmit}>
                            Thêm mới
                        </Button>
                    </Row>
                </Form> 
            </Spin>
        </Modal>
    )
}

export default FormHelpAdd;