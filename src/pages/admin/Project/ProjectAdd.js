import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import {Drawer, Button, DatePicker, Form, Input, InputNumber, Select, Upload, Space, Image, Spin, Row, Col, Card} from "antd";
import {CloudinaryContext } from 'cloudinary-react';
import { PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { retrieveTypes } from "../../../slices/types";
import { createProject, createMoneyByProject, createArtifactByProject, createImageByProject} from "../../../slices/projects";
import "./ProjectStyle.scss";

dayjs.extend(customParseFormat);
const { TextArea } = Input;

const ProjectAdd = (props) => {
    const [form] = Form.useForm();

    const open = props.openViewAddProject;

    const [newProjectId, setNewProjectId] = useState(null);
    const [money, setMoney] = useState(0);
    const [artifacts, setArtifacts] = useState([]);

    const typesList = useSelector((state) => state.types);
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);

    const [showImage, setShowImage] = useState(false);
    const [images, setImages] = useState([]);
    const [loadingImage, setLoadingImage] = useState(false);
    const [loading, setLoading] = useState(false);
    var disabledDate = (current) => {
        // Can not select days before today
        return current < dayjs().endOf('day');
    };

    useEffect(() => {
        dispatch(retrieveTypes());
    }, [])

    const onFinish = (values) => {
        console.log("values: " + values);
        const { name, details, typeId, numVolunteers, startTime, endTime, holdTime, position, minMoney, artifacts} = values;
        setIsSubmit(true)
        setLoading(true);
        dispatch(createProject({ name, details, typeId, numVolunteers, startTime, endTime, holdTime, position }))
          .unwrap()
          .then(data => {
            setNewProjectId(data.id);
            setMoney(minMoney);
            setArtifacts(artifacts);
            setLoading(false);
            toast.success("Thêm dự án thành công!");
            setIsSubmit(false);
            form.resetFields();
            props.getLatestProject();
            props.setOpenViewAddProject(false);
            return;
          })
          .catch(e => {
            toast.error("Thêm dự án thất bại!");
            console.log(e);
            setIsSubmit(false);
            setLoading(false);
          });
      };
    
    const handleImageUpload = async ({ file }) => {
    // const fileImg = e.target.file[0];
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

    //them tien
    const handleAddMinMoney = () => {
        const id = newProjectId;
        const minMoney = money;
        if(id !== null && minMoney !== 0)
            dispatch(createMoneyByProject({id, minMoney}));
    }

    //them hien vat
    const handleAddArtifact = () => {
        const id = newProjectId;
        let artifactName = null, minQuantity = 0, calculationUnit = null;
        if(artifacts !== undefined) {
            artifacts.map((artifact) => {
                artifactName = artifact.nameArtifact;
                minQuantity = artifact.quantity;
                calculationUnit = artifact.unit;
                if(id !== null && artifactName !== null && minQuantity !== 0 && calculationUnit !== null){
                    dispatch(createArtifactByProject({id, artifactName, minQuantity, calculationUnit}))
                } 
            })
        }
    }

    //them anh
    const handleAddImage = () => {
        setShowImage(true);
        const id = newProjectId;
        let name = null;
        if(images.length !== 0) {
            images.map((image) => {
                name = image.url;
                if(id !== null && name !== null){
                    dispatch(createImageByProject({id, name}))
                } 
            })
        }
    }

    useEffect(handleAddMinMoney, [newProjectId, money]);
    useEffect(handleAddArtifact, [newProjectId, artifacts]);
    useEffect(handleAddImage, [newProjectId, images]);

    return ( 
        <Drawer
            className="project-drawer-add"
            title="Thêm mới dự án"
            width={"50vw"}
            onClose={() => {
                form.resetFields();
                props.setOpenViewAddProject(false)
                setShowImage(false);
                setImages([])
            }}
            open={open}
            maskClosable={false}>
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
                            {/* Tên dự án */}
                            <Col span={18}>
                                <Form.Item 
                                    labelCol={{ span: 24 }}
                                    style={{marginRight: "10px"}}
                                    name="name"
                                    label="Tên dự án:"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            {/* Loại dự án */}
                            <Col span={6}>
                                <Form.Item 
                                    labelCol={{ span: 24 }}
                                    name="typeId"
                                    label="Loại dự án:"
                                    rules={[{ required: true, message: 'Vui lòng chọn 1 loại dự án!' }]}>
                                    <Select placeholder="Chọn loại dự án" 
                                        showSearch
                                        allowClear
                                        style={{fontFamily: 'Montserrat'}}>
                                        {typesList && typesList.map((type, index) => (
                                            <Select.Option key={index} value={type.id}>{type.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Tiền kêu gọi */}
                            <Col span={12}>
                                <Form.Item
                                    name="minMoney"
                                    label="Số tiền kêu gọi:"
                                    labelCol={{ span: 24 }}
                                    style={{marginRight: "10px"}}
                                    rules={[{ required: true, message: 'Vui lòng nhập số tiền kêu gọi!' }]}
                                >
                                    <InputNumber
                                        min={10000}
                                        style={{ width: '100%' }}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        addonAfter="VND"
                                    />
                                </Form.Item>
                            </Col>
                            {/* Số lượng tình nguyện viên */}
                            <Col span={12}>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    name="numVolunteers"
                                    label="Số lượng tình nguyện viên:"
                                    rules={[{ required: true, message: 'Vui lòng nhập số lượng tình nguyện viên!' }]}
                                >
                                    <InputNumber min={0} style={{width: 370}}/>
                                </Form.Item>
                            </Col>
                            {/* Thông tin hiện vật*/}
                            <Col span={24}>
                                <Form.List name="artifacts" label="Thông tin hiện vật">
                                    {(fields, { add, remove }) => (
                                        <>
                                        {fields.map((field, index ) => (
                                            <Space key={field.key} style={{display: "flex"}} direction="horizontal">
                                                <Form.Item name={[field.name, "nameArtifact"]} label={`${index+1}- Hiện vật:`}  
                                                    rules={[{ required: true, message: "Vui lòng nhập tên hiện vật!" }]}>
                                                    <Input style={{width: 267}} placeholder='Tên hiện vật'/>
                                                </Form.Item>
                                                <Form.Item name={[field.name, "quantity"]}
                                                    rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
                                                    <InputNumber min={1} style={{width: 145}} placeholder='Số lượng'/>
                                                </Form.Item>
                                                <Form.Item name={[field.name, "unit"]}
                                                    rules={[{ required: true, message: "Vui lòng nhập đơn vị!" }]}>
                                                    <Input placeholder='Đơn vị'/>
                                                </Form.Item>
                                                <MinusCircleOutlined style={{color: "red", paddingBottom: 25}} onClick={() => remove(field.name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => {add()}} block icon={<PlusOutlined />}>
                                                Thêm hiện vật
                                            </Button>
                                        </Form.Item>
                                    </>
                                    )}
                                </Form.List>
                            </Col>
                            {/* Thời gian kêu gọi */}
                            <Col span={8}>
                                <Form.Item 
                                    labelCol={{ span: 24 }}
                                    name="startTime"
                                    label="Thời gian vận động" 
                                    style={{marginRight: 10}}
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn thời gian kêu gọi!' },  
                                    ]}>
                                    <DatePicker  format="YYYY-MM-DD HH:mm:ss"
                                        disabledDate={disabledDate}
                                        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                                        style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            {/* Thời gian kết thúc */}
                            <Col span={8}>
                                <Form.Item 
                                    labelCol={{ span: 24 }}
                                    name="endTime"
                                    label="Thời gian kết thúc" 
                                    style={{marginRight: 10}}
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn thời gian kết thúc!' },
                                        { validator: async (_, endTime) => {
                                            var startTime = form.getFieldValue("startTime");
                                            if(startTime != null){
                                                if(endTime <= startTime)
                                                    return Promise.reject("Thời gian kết thúc phải sau thời gian vận động!");
                                                else
                                                    return;
                                            }
                                        }}
                                    ]}>
                                    <DatePicker format="YYYY-MM-DD HH:mm:ss"
                                        disabledDate={disabledDate}
                                        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                                        style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>                            
                            {/* Thời gian tổ chức */}
                            <Col span={8}>
                                <Form.Item 
                                    labelCol={{ span: 24 }}
                                    name="holdTime"
                                    label="Thời gian tổ chức" 
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn thời gian tổ chức!' },
                                        { validator: async (_, holdTime) => {
                                            var endTime = form.getFieldValue("endTime");
                                            if(endTime != null){
                                                if(holdTime <= endTime)
                                                    return Promise.reject("Thời gian tổ chức phải sau thời gian kết thúc!");
                                                else
                                                    return;
                                            }
                                        }}    
                                    ]}>
                                    <DatePicker format="YYYY-MM-DD HH:mm:ss"
                                        disabledDate={disabledDate}
                                        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                                        style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            {/* Nơi tổ chức */}
                            <Col span={24}>
                                <Form.Item 
                                    labelCol={{ span: 24 }}
                                    name="position"
                                    label="Địa điểm tổ chức:"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa điểm tổ chức!' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            {/* Mô tả dự án */}
                            <Col span={24}>
                                <Form.Item 
                                    labelCol={{ span: 24 }}
                                    name="details"
                                    label="Mô tả dự án"
                                    rules={[{ required: true, message: 'Vui lòng nhập mô tả dự án!' }]}>
                                    <TextArea  rows={5} name="details"></TextArea>
                                </Form.Item>
                            </Col>
                            {/* Upload hình ảnh */}
                            <Col span={24}>
                                <Form.Item
                                    label="Hình ảnh của dự án"
                                    name="file"
                                >
                                    <CloudinaryContext cloudName="dp0hbi49d">
                                        <Upload
                                            name="file"
                                            listType="text"
                                            className="avatar-uploader"
                                            multiple={true}
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
                                            <Card key={index} style={{height: 160, width: 220,}}>
                                                <Image src={image.url} style={{width: 190, height: 130, marginTop: -30, marginLeft: -20}}  />
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
        </Drawer>
    )
}

export default ProjectAdd;