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
import { updateProject, updateMoneyById, updateArtifactById, createProofByProject, createImageByProject } from "../../../slices/projects";
import { retrieveTypes } from "../../../slices/types";
import { retrieveStatus } from "../../../slices/status";

dayjs.extend(customParseFormat);
const { TextArea } = Input;

const ProjectUpdate = (props) => {
    const {openViewUpdateProject, setOpenViewUpdateProject, dataUpdate, setDataUpdate} = props;
    const [form] = Form.useForm();
    const [initForm, setInitForm] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    const [showImage, setShowImage] = useState(false);
    const [images, setImages] = useState([]);
    const [imagesCurrent, setImagesCurrent] = useState([]);
    const [loadingImage, setLoadingImage] = useState(false);
    const [showProof, setShowProof] = useState(false);
    const [proofs, setProofs] = useState([]);
    const [proofsCurrent, setProofsCurrent] = useState([]);
    const [loadingProof, setLoadingProof] = useState(false);

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
            });
            const proofList = dataUpdate?.projectProofs?.map(proof => {
                return {
                    name: proof.name
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
            setProofs(proofList);
            setShowImage(true);
            setShowProof(true);
            setCurrentStatus(dataUpdate.projectStatus.name) 
            if( dataUpdate.projectStatus.name !== "Đang vận động"){
                setShowDetail(true)
            } else{
                setShowDetail(false)
            }
            setCurrentId(dataUpdate.id)
            setCurrentArtifact(artifact)
            setCurrentMoney({idMoney: idMoney, minMoney: minMoney})
            form.setFieldsValue(init);
        }
        return () => {
            form.resetFields();
        }
    }, [dataUpdate])

    //bat su kien an form
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
            setShowProof(false);
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
        if(moneyId !== undefined){
            dispatch(updateMoneyById({moneyId, minMoney}))
            .unwrap()
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            })
        }
    }
    useEffect(handleUpdateMoney, [currentMoney]);

    //cap nhat hien vat
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

    //cap nhat hinh anh minh chung
    const handleProofUpload = async ({ file }) => {
        console.log("file khi handle: " +  file);
        setLoadingProof(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'sunshine');
        const response = await fetch("https://api.cloudinary.com/v1_1/dp0hbi49d/image/upload",
        {
            method: 'POST',
            body: formData
        })
        setLoadingProof(false);
        const data = await response.json();
        setProofsCurrent([...proofsCurrent, {name: data.secure_url}])
        setProofs([...proofs, {name: data.secure_url}])
        return data.secure_url;
    }

    console.log("proofs current: " + JSON.stringify(proofsCurrent));
    console.log("proofs: " +  JSON.stringify(proofs));

    const handleAddProof = () => {
        const id = currentId;
        let name = null;
        if(proofsCurrent.length !== 0) {
            proofsCurrent.map((proof) => {
                name = proof.name;
                if(id !== null && name !== null){
                    dispatch(createProofByProject({id, name}))
                } 
            })
        }
    }

    useEffect(handleAddProof, [currentId, proofs, proofsCurrent]);

    //cap nhat hinh anh 
    const handleImagesUpload = async ({ file }) => {
        console.log("file khi handle: " +  file);
        setLoadingImage(true);
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
        setImagesCurrent([...imagesCurrent, {name: data.secure_url}])
        setImages([...images, {name: data.secure_url}])
        return data.secure_url;
    }

    console.log("images current: " + JSON.stringify(imagesCurrent));
    console.log("images: " +  JSON.stringify(images));

    const handleAddImage = () => {
        const id = currentId;
        let name = null;
        if(imagesCurrent.length !== 0) {
            imagesCurrent.map((image) => {
                name = image.name;
                if(id !== null && name !== null){
                    dispatch(createImageByProject({id, name}))
                } 
            })
        }
    }

    useEffect(handleAddImage, [currentId, images, imagesCurrent]);

    const options = [
        {value: 1, label: "Đang vận động", color: "#e0ae4c"},
        {value: 2, label: "Đang triển khai", color: "#6c98d7"},
        {value: 3, label: "Đã hoàn thành", color: "#20a668"},
        {value: 4, label: "Đã tạm hoãn", color: "#d14444"},
    ]
    const colorOption = (option) => {
        return (
            <div style={{color: option.color, fontFamily: 'Montserrat', fontWeight: 600}} key={option.value}>
                {option.label}
            </div>
        )
    }

    const handleSelect = (value) => {
        console.log(">> selected: " + value);
        if(value !== 1){
            setShowDetail(true);
        } else {
            setShowDetail(false);
        }
    }

    return (
        <Drawer
            className="project-drawer-add"
            title="Chỉnh sửa dự án"
            width={"50vw"}
            onClose={() => {
                setShowDetail(false);
                form.resetFields();
                setInitForm(null);
                setDataUpdate(null);
                setShowImage(false);
                setShowProof(false);
                setCurrentMoney({});
                setProofsCurrent([]);
                setProofs([]);
                setImagesCurrent([]);
                setImages([]);
                setOpenViewUpdateProject(false);
            }}
            open={openViewUpdateProject}
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
                            <Col span={24}>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    name="name"
                                    label="Tên dự án:"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}>
                                    <Input disabled={showDetail} />
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
                                        disabled={showDetail} 
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
                                        onChange={(value) => {handleSelect(value)}}
                                        style={{fontFamily: 'Montserrat'}}>
                                            {options.map(option => (
                                                    <Select.Option value={option.value} key={option.value}>{colorOption(option)}</Select.Option>))
                                            }
                                        {/* {statusList && statusList.map((status, index) => (
                                            <Select.Option key={index} value={status.id}>{status.name}</Select.Option>
                                        ))} */}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Tiền kêu gọi */}
                            <Col span={24}>
                                <Form.Item
                                    hidden
                                    name="idMoney"
                                    label="id Money:"
                                    labelCol={{ span: 24 }}
                                    style={{marginRight: "10px"}}
                                >
                                    <InputNumber
                                        disabled={showDetail} 
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
                                        disabled={showDetail} 
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
                                >
                                    <InputNumber disabled={showDetail}  style={{width: 370}}/>
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
                                                    <Input disabled={showDetail}  style={{width: 250}} placeholder='Tên hiện vật'/>
                                                </Form.Item>
                                                <Form.Item name={[field.name, "nameArtifact"]} label={`${index+1}- Hiện vật:`}  
                                                    rules={[{ required: true, message: "Vui lòng nhập tên hiện vật!" }]}>
                                                    <Input disabled={showDetail} style={{width: 250}} placeholder='Tên hiện vật'/>
                                                </Form.Item>
                                                <Form.Item name={[field.name, "quantity"]}
                                                    rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
                                                    <InputNumber disabled={showDetail} min={1} style={{width: 145}} placeholder='Số lượng'/>
                                                </Form.Item>
                                                <Form.Item name={[field.name, "unit"]}
                                                    rules={[{ required: true, message: "Vui lòng nhập đơn vị!" }]}>
                                                    <Input disabled={showDetail} placeholder='Đơn vị'/>
                                                </Form.Item>
                                                {/* <MinusCircleOutlined style={{color: "red", paddingBottom: 25}} onClick={() => remove(field.name)} /> */}
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
                                    <DatePicker disabled={showDetail}  format="YYYY-MM-DD HH:mm:ss"
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
                                    <DatePicker disabled={showDetail}  format="YYYY-MM-DD HH:mm:ss"
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
                                    <DatePicker disabled={showDetail}  format="YYYY-MM-DD HH:mm:ss"
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
                                    <Input disabled={showDetail}  />
                                </Form.Item>
                            </Col>
                            {/* Mô tả dự án */}
                            <Col span={24}>
                                <Form.Item 
                                    labelCol={{ span: 24 }}
                                    name="details"
                                    label="Mô tả dự án"
                                    rules={[{ required: true, message: 'Vui lòng nhập mô tả dự án!' }]}>
                                    <TextArea disabled={showDetail}  rows={8} name="details"></TextArea>
                                </Form.Item>
                            </Col>
                            {/* Upload hình ảnh */}
                            {showImage && 
                            <>
                                <Col span={24}>
                                    <Form.Item
                                        label="Hình ảnh của dự án"
                                        name="file">
                                        <CloudinaryContext cloudName="dp0hbi49d">
                                            <Upload
                                                name="file"
                                                listType="text"
                                                className="avatar-uploader"
                                                multiple={true}
                                                customRequest={handleImagesUpload}
                                                action=""
                                            >
                                                <div>
                                                    <Button hidden={showDetail} icon={<PlusOutlined />} style={{borderStyle: "dashed",  }}>Chọn ảnh</Button>
                                                </div>
                                            </Upload>
                                        </CloudinaryContext>
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{display: "flex", width: 730, flexWrap: "wrap", gap: 25}}>
                                {loadingImage
                                    ? 
                                        <Space size="large" style={{marginLeft: 50}}>
                                            <Spin size="middle"/>
                                        </Space>
                                    :
                                        <>
                                            {images && images.map((image, index) => (
                                                <Card key={index} style={{height: 160, width: 220}}>
                                                    <Image src={image.name} style={{width: 190, height: 130, marginTop: -10, marginLeft: -10}}  />
                                                </Card>
                                            ))}
                                        </>
                                }
                                    
                                </Col>
                            </>
                            }
                            {/* Upload hình ảnh minh chứng */}
                            {showDetail &&
                                <>
                                    <Col span={24} style={{marginTop: 30}}>
                                        <Form.Item
                                            label="Hình ảnh trong quá trình triển khai dự án"
                                            name="file"
                                        >
                                            <CloudinaryContext cloudName="dp0hbi49d">
                                                <Upload
                                                    name="file"
                                                    listType="text"
                                                    multiple={false}
                                                    customRequest={handleProofUpload}
                                                    action=""
                                                >
                                                    <div>
                                                        <Button icon={<PlusOutlined />} style={{borderStyle: "dashed",  }}>Chọn ảnh</Button>
                                                    </div>
                                                </Upload>
                                            </CloudinaryContext>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24} style={{display: "flex", width: 730, flexWrap: "wrap", gap: 25}}>
                                    {loadingProof
                                        ? 
                                            <Space size="large" style={{marginLeft: 50}}>
                                                <Spin size="middle"/>
                                            </Space>
                                        :
                                            <>
                                                {proofs && proofs.map((proof, index) => (
                                                    <Card key={index} style={{height: 160, width: 220}}>
                                                        <Image src={proof.name} style={{width: 190, height: 130, marginTop: -10, marginLeft: -10}}  />
                                                    </Card>
                                                ))}
                                            </>
                                    }
                                    </Col>
                                </>
                            }
                            <Button style={{marginTop: 15, color: "#fff !important"}} type="primary" htmlType="submit" loading={isSubmit}>
                                Cập nhật
                            </Button>
                        </Row>
                    </Form> 
                </Spin>
    </Drawer>
    )
}

export default ProjectUpdate;