import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import {Drawer, Button, DatePicker, Form, Input, InputNumber, Select, Upload, Space, Image, Spin, Row, Col, Card} from "antd";
import { PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {CloudinaryContext } from 'cloudinary-react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from "moment";
import "./ProjectStyle.scss";
import { updateProject, updateMoneyById, updateArtifactById } from "../../../slices/projects";
import { retrieveTypes } from "../../../slices/types";
import { retrieveStatus } from "../../../slices/status";

dayjs.extend(customParseFormat);
const { TextArea } = Input;

const ProjectUpdate = (props) => {
    const {openViewUpdateProject, setOpenViewUpdateProject, dataUpdate, setDataUpdate} = props;
    const [form] = Form.useForm();
    const [initForm, setInitForm] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const [showImage, setShowImage] = useState(false);
    const [images, setImages] = useState([]);

    const typesList = useSelector((state) => state.types);
    const statusList = useSelector((state) => state.status);
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState(null);
    const [currentStatus, setCurrentStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const [currentMoney, setCurrentMoney] = useState({});
    const initArtifactState = {
        artifactName: "",
        minQuantity: 0,
        calculationUnit: ""
    }
    const [currentArtifact, setCurrentArtifact] = useState(initArtifactState);

    var disabledDate = (current) => {
        return current < dayjs().endOf('day');
    };

    useEffect(() => {
        dispatch(retrieveTypes());
        dispatch(retrieveStatus());
    }, [])

    //cap nhat gia tri ban dau cua form theo id
    useEffect(() => {
        if(dataUpdate?.id){
            const minMoney = dataUpdate?.projectMonies?.map(money => {
                return money.minMoney
            });
            const idMoney = dataUpdate?.projectMonies?.map(money => {
                return money.id
            });
            const artifact = dataUpdate?.projectArtifacts?.map(artifact => {
                    return {
                        idArtifact: artifact.id,
                        nameArtifact: artifact.artifactName,
                        quantity: artifact.minQuantity,
                        unit: artifact.calculationUnit
                    }
            });
            const imageList = dataUpdate?.projectImages?.map(image => {
                return {
                    name: image.name
                }
            })
            const init = {
                id: dataUpdate.id,
                name: dataUpdate.name,
                details: dataUpdate.details,
                numVolunteers: dataUpdate.numVolunteers,
                startTime: moment(dataUpdate.startTime),
                endTime:  moment(dataUpdate.endTime),
                holdTime: moment(dataUpdate.holdTime),
                position: dataUpdate.position,
                typeId: dataUpdate.projectType.id,
                statusId: dataUpdate.projectStatus.id,
                typeName: dataUpdate.projectType.name,
                statusName: dataUpdate.projectStatus.name,
                minMoney: minMoney,
                idMoney: idMoney,
                artifacts: artifact,
            }
            setInitForm(init);
            setImages(imageList);
            setShowImage(true);
            setCurrentStatus(dataUpdate.projectStatus.name);
            setCurrentId(dataUpdate.id)
            setCurrentArtifact(artifact)
            setCurrentMoney({idMoney: idMoney, minMoney: minMoney})
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
        }
    }, [dataUpdate])

    const onFinish = (values) => {
        const id = currentId;
        const { name, details, typeId, statusId, numVolunteers, startTime, endTime, holdTime, position, idMoney, minMoney, artifacts} = values;
        setIsSubmit(true)
        setLoading(true);
        dispatch(updateProject({ id, name, details, typeId, statusId, numVolunteers, startTime, endTime, holdTime, position }))
          .unwrap()
          .then(data => {
            setCurrentArtifact(artifacts);
            setCurrentMoney({idMoney: idMoney, minMoney: minMoney})
            setLoading(false);
            toast.success("Cập nhật dự án thành công!");
            setIsSubmit(false);
            setShowImage(false);
            form.resetFields();
            props.getLatestProject();
            setOpenViewUpdateProject(false)
            return;
          })
          .catch(e => {
            toast.error("Cập nhật dự án thất bại!");
            console.log(e);
            setIsSubmit(false);
            setLoading(false);
          });
      };

    //cap nhat money
    const handleUpdateMoney = () => {
        const currMoneyId =  currentMoney.idMoney;
        const currMinMoney = currentMoney.minMoney;
        const moneyId = currMoneyId;
        const minMoney = currMinMoney;
        dispatch(updateMoneyById({moneyId, minMoney}))
        .unwrap()
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        })
    }
    useEffect(handleUpdateMoney, [currentMoney]);

    // cap nhat hien vat
    const handleUpdateArtifact = () => {
        if(currentArtifact.length > 0) {
            currentArtifact?.map((current) => {
                const artifactId = current.idArtifact;
                const artifactName = current.nameArtifact;
                const minQuantity = current.quantity;
                const calculationUnit = current.unit;
                dispatch(updateArtifactById({artifactId, artifactName, minQuantity, calculationUnit}))
                .unwrap()
                .then(response => {
                    console.log(response);
                })
                .catch(e => {
                    console.log(e);
                })
            })
        }
    }
    useEffect(handleUpdateArtifact, [currentArtifact]);

    return (
        <Drawer
            className="project-drawer-add"
            title="Chỉnh sửa dự án"
            width={"50vw"}
            onClose={() => {
                form.resetFields();
                setInitForm(null);
                setDataUpdate(null);
                setShowImage(false);
                setCurrentMoney({});
                setOpenViewUpdateProject(false)
            }}
            open={openViewUpdateProject}
            maskClosable={false}>
                <Spin spinning={loading}>
                    {currentStatus === "Đang vận động" ? 
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
                                <Col span={24}>
                                    <Form.Item 
                                        labelCol={{ span: 24 }}
                                        name="name"
                                        label="Tên dự án:"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                {/* Loại dự án */}
                                <Col span={12}>
                                    <Form.Item 
                                        labelCol={{ span: 24 }}
                                        style={{marginRight: "10px"}}
                                        name="typeId"
                                        label="Loại dự án:"
                                        rules={[{ required: true, message: 'Vui lòng chọn 1 loại dự án!' }]}>
                                        <Select 
                                            placeholder="Chọn loại dự án" 
                                            showSearch
                                            allowClear
                                            style={{fontFamily: 'Montserrat'}}>
                                            {typesList && typesList.map((type, index) => (
                                                <Select.Option key={index} value={type.id}>{type.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                {/* Trạng thái */}
                                <Col span={12}>
                                    <Form.Item 
                                        labelCol={{ span: 24 }}
                                        name="statusId"
                                        label="Trạng thái:"
                                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                                        <Select 
                                            placeholder="Chọn trạng thái" 
                                            showSearch
                                            allowClear
                                            style={{fontFamily: 'Montserrat'}}>
                                            {statusList && statusList.map((status, index) => (
                                                <Select.Option key={index} value={status.id}>{status.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                {/* Tiền kêu gọi */}
                                <Col span={24}>
                                    <Form.Item
                                        name="idMoney"
                                        label="id Money:"
                                        labelCol={{ span: 24 }}
                                        style={{marginRight: "10px"}}
                                    >
                                        <InputNumber
                                            min={10000}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
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
                                        <InputNumber min={1} style={{width: 370}}/>
                                    </Form.Item>
                                </Col>
                                {/* Thông tin hiện vật*/}
                                <Col span={24}>
                                    <Form.List name="artifacts" label="Thông tin hiện vật">
                                        {(fields, { add, remove }) => (
                                            <>
                                            {fields.map((field, index ) => (
                                                <Space key={field.key} style={{display: "flex"}} direction="horizontal">
                                                    <Form.Item hidden name={[field.name, "idArtifact"]}  >
                                                        <Input style={{width: 267}} placeholder='Tên hiện vật'/>
                                                    </Form.Item>
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
                                                // customRequest={handleImageUpload}
                                                action=""
                                            >
                                                <div>
                                                    <Button icon={<PlusOutlined />} style={{borderStyle: "dashed",  }}>Chọn ảnh</Button>
                                                </div>
                                            </Upload>
                                        </CloudinaryContext>
                                    </Form.Item>
                                </Col>
                                {showImage && 
                                    <Col span={24} style={{display: "flex"}}>
                                        {images && images.map((image, index) => (
                                            <Card key={index} style={{height: 160, width: 220, marginRight: 10}}>
                                                <Image src={image.name} style={{width: 190, height: 130, marginTop: -30, marginLeft: -20}}  />
                                            </Card>
                                        ))}
                                    </Col>
                                }
                                {/* Upload hình ảnh minh chứng */}
                                {/* {(dataUpdate.projectStatus.name === "Đang triển khai" || dataUpdate.projectStatus.name === "Đã hoàn thành") &&
                                    <>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Hình ảanhrtrong quá trình triển khai dự án"
                                                name="file"
                                            >
                                                <CloudinaryContext cloudName="dp0hbi49d">
                                                    <Upload
                                                        name="file"
                                                        listType="text"
                                                        multiple={true}
                                                        // customRequest={handleImageUpload}
                                                        action=""
                                                    >
                                                        <div>
                                                            <Button icon={<PlusOutlined />} style={{borderStyle: "dashed",  }}>Chọn ảnh</Button>
                                                        </div>
                                                    </Upload>
                                                </CloudinaryContext>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} style={{display: "flex"}}>
                                            {images && images.map((image, index) => (
                                                <Card key={index} style={{height: 160, width: 220, marginRight: 10}}>
                                                    <Image src={image.name} style={{width: 190, height: 130, marginTop: -30, marginLeft: -20}}  />
                                                </Card>
                                            ))}
                                        </Col>
                                    </>
                                } */}
                                <Button style={{marginTop: 15, color: "#fff !important"}} type="primary" htmlType="submit" loading={isSubmit}>
                                    Cập nhật
                                </Button>
                            </Row>
                        </Form> 
                    :
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
                                <Col span={24}>
                                    <Form.Item 
                                        labelCol={{ span: 24 }}
                                        name="name"
                                        label="Tên dự án:"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}>
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>
                                {/* Loại dự án */}
                                <Col span={12}>
                                    <Form.Item 
                                        labelCol={{ span: 24 }}
                                        style={{marginRight: "10px"}}
                                        name="typeId"
                                        label="Loại dự án:"
                                        rules={[{ required: true, message: 'Vui lòng chọn 1 loại dự án!' }]}>
                                        <Select 
                                            disabled
                                            placeholder="Chọn loại dự án" 
                                            showSearch
                                            allowClear
                                            style={{fontFamily: 'Montserrat'}}>
                                            {typesList && typesList.map((type, index) => (
                                                <Select.Option key={index} value={type.id}>{type.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                {/* Trạng thái */}
                                <Col span={12}>
                                    <Form.Item 
                                        labelCol={{ span: 24 }}
                                        name="statusId"
                                        label="Trạng thái:"
                                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                                        <Select 
                                            placeholder="Chọn trạng thái" 
                                            showSearch
                                            allowClear
                                            style={{fontFamily: 'Montserrat'}}>
                                            {statusList && statusList.map((status, index) => (
                                                <Select.Option key={index} value={status.id}>{status.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                {/* Tiền kêu gọi */}
                                <Col span={24}>
                                    <Form.Item
                                        name="idMoney"
                                        label="id Money:"
                                        labelCol={{ span: 24 }}
                                        style={{marginRight: "10px"}}
                                    >
                                        <InputNumber
                                            min={10000}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="minMoney"
                                        label="Số tiền kêu gọi:"
                                        labelCol={{ span: 24 }}
                                        style={{marginRight: "10px"}}
                                        rules={[{ required: true, message: 'Vui lòng nhập số tiền kêu gọi!' }]}
                                    >
                                        <InputNumber
                                            disabled
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
                                        <InputNumber disabled min={1} style={{width: 370}}/>
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
                                                        <Input disabled style={{width: 267}} placeholder='Tên hiện vật'/>
                                                    </Form.Item>
                                                    <Form.Item name={[field.name, "quantity"]}
                                                        rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
                                                        <InputNumber disabled min={1} style={{width: 145}} placeholder='Số lượng'/>
                                                    </Form.Item>
                                                    <Form.Item name={[field.name, "unit"]}
                                                        rules={[{ required: true, message: "Vui lòng nhập đơn vị!" }]}>
                                                        <Input disabled placeholder='Đơn vị'/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined style={{color: "red", paddingBottom: 25}} onClick={() => remove(field.name)} />
                                                </Space>
                                            ))}
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
                                            disabled
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
                                            disabled
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
                                            disabled
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
                                        <Input disabled/>
                                    </Form.Item>
                                </Col>
                                {/* Mô tả dự án */}
                                <Col span={24}>
                                    <Form.Item 
                                        labelCol={{ span: 24 }}
                                        name="details"
                                        label="Mô tả dự án"
                                        rules={[{ required: true, message: 'Vui lòng nhập mô tả dự án!' }]}>
                                        <TextArea  disabled rows={5} name="details"></TextArea>
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
                                                // customRequest={handleImageUpload}
                                                action=""
                                            >
                                                <div>
                                                    <Button icon={<PlusOutlined />} style={{borderStyle: "dashed",  }}>Chọn ảnh</Button>
                                                </div>
                                            </Upload>
                                        </CloudinaryContext>
                                    </Form.Item>
                                </Col>
                                {showImage && 
                                    <Col span={24} style={{display: "flex"}}>
                                        {images && images.map((image, index) => (
                                            <Card key={index} style={{height: 160, width: 220, marginRight: 10}}>
                                                <Image src={image.name} style={{width: 190, height: 130, marginTop: -30, marginLeft: -20}}  />
                                            </Card>
                                        ))}
                                    </Col>
                                }
                                {/* Upload hình ảnh minh chứng */}
                                {(currentStatus === "Đã hoàn thành" || currentStatus === "Đang triển khai") &&
                                    <>
                                        <Col span={24} style={{marginTop: 20}}>
                                            <Form.Item
                                                label="Hình ảnh trong quá trình triển khai dự án"
                                                name="file"
                                            >
                                                <CloudinaryContext cloudName="dp0hbi49d">
                                                    <Upload
                                                        name="file"
                                                        listType="text"
                                                        multiple={true}
                                                        // customRequest={handleImageUpload}
                                                        action=""
                                                    >
                                                        <div>
                                                            <Button icon={<PlusOutlined />} style={{borderStyle: "dashed",  }}>Chọn ảnh</Button>
                                                        </div>
                                                    </Upload>
                                                </CloudinaryContext>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} style={{display: "flex"}}>
                                            {images && images.map((image, index) => (
                                                <Card key={index} style={{height: 160, width: 220, marginRight: 10}}>
                                                    <Image src={image.name} style={{width: 190, height: 130, marginTop: -30, marginLeft: -20}}  />
                                                </Card>
                                            ))}
                                        </Col>
                                    </>
                                }
                                <Button style={{marginTop: 15, color: "#fff !important"}} type="primary" htmlType="submit" loading={isSubmit}>
                                    Cập nhật
                                </Button>
                            </Row>
                        </Form> 
                    }
                </Spin>
    </Drawer>
    )
}

export default ProjectUpdate;