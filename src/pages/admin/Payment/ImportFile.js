import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {Modal, Radio, Upload, Table, message, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import "./ReceiptPayment.scss";
import { toast } from 'react-toastify';

import  {createContribution} from "../../../slices/contribution";
import { createProjectPayment } from "../../../slices/projects";

import * as XLSX from 'xlsx';

const { Dragger } = Upload;
const ImportFile = (props) => {
    const dispatch = useDispatch();
    const [radioValue, setRadioValue] = useState(1);

    const {showModalImport, setShowModalImport, getAll} = props;

    const [showContributions, setShowContributions] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [dataExcel, setDataExcel] = useState([]);

    const [showPayment, setShowPayment] = useState(false);
    const [isSubmitPayment, setIsSubmitPayment] = useState(false);
    const [fileListPayment, setFileListPayment] = useState([]);
    const [dataExcelPayment, setDataExcelPayment] = useState([]);

    const columns = [
        {
            title: "Mã người dùng",
            dataIndex: 'userId',
        },
        {
            title: "Mã dự án",
            dataIndex: 'projectId',
        },
        {
            title: 'Người chuyển',
            dataIndex: 'nickname',
        },
        {
            title: 'Số tiền',
            dataIndex: 'amountMoney',
            key: 'amountMoney',
            render(text, record) {
                return text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
            }
        },
        {
            title: 'Loại',
            dataIndex: 'paymentType',
            render: (text, record, index) => {
                return (<>{text}</>)
            }
        },
    ]
    const columnsPayment = [
        {
            title: "Mã người dùng",
            dataIndex: 'userId',
        },
        {
            title: "Mã dự án",
            dataIndex: 'projectId',
        },
        {
            title: 'Số tiền',
            dataIndex: 'amountMoney',
            key: 'amountMoney',
            render(text, record) {
                return text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
            }
        },
        {
            title: 'Loại',
            dataIndex: 'reason',
            render: (text, record, index) => {
                return (<>{text}</>)
            }
        },
    ]

    const dummyRequest = ({file, onSuccess}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    }
    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        customRequest: dummyRequest,
        onChange(info) {
            setFileList(info.fileList);
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                if(info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj; //lay file
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = function(e){
                        const data = new Uint8Array(reader.result);
                        const workbook = XLSX.read(data, {type: 'array'}); //convert sang workbook
                        const sheet = workbook.Sheets[workbook.SheetNames[0]]; //lay sheet dau tien
                        const json = XLSX.utils.sheet_to_json(sheet, {
                            header: ["userId", "projectId", "nickname", "amountMoney", "paymentType"], //quy dinh dang format tra ve
                            range: 1
                        });
                        console.log("hmm: " + JSON.stringify(json));
                        if(json && json.length > 0) setDataExcel(json)
                    }
                    message.success(`${info.file.name} đã được tải lên thành công.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} tải lên thất bại.`);
                }
            }
            },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const propsUploadPayment = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        customRequest: dummyRequest,
        onChange(info) {
            setFileListPayment(info.fileList);
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                if(info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj; //lay file
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = function(e){
                        const data = new Uint8Array(reader.result);
                        const workbook = XLSX.read(data, {type: 'array'}); //convert sang workbook
                        const sheet = workbook.Sheets[workbook.SheetNames[0]]; //lay sheet dau tien
                        const json = XLSX.utils.sheet_to_json(sheet, {
                            header: ["userId", "projectId", "amountMoney", "reason"], //quy dinh dang format tra ve
                            range: 1
                        });
                        console.log("hmm: " + JSON.stringify(json));
                        if(json && json.length > 0) setDataExcelPayment(json)
                    }
                    message.success(`${info.file.name} đã được tải lên thành công.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} tải lên thất bại.`);
                }
            }
            },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleSubmit = async () => {
        setIsSubmit(true)
        setIsSubmitPayment(false)
        for(let i = 0; i < dataExcel.length; i++) {
            const userId = dataExcel[i].userId;
            const projectId = dataExcel[i].projectId;
            const nickname = dataExcel[i].nickname;
            const amountMoney = dataExcel[i].amountMoney;
            const createdAt = dataExcel[i].createdAt;
            const paymentType = dataExcel[i].paymentType;
            await dispatch(createContribution({userId, projectId, nickname, amountMoney, createdAt, paymentType}))
            .then((response) => {
                setFileList([]);
                setIsSubmit(false);
                setIsSubmitPayment(false);
                setDataExcel([]);
                setShowModalImport(false);
            })
            .catch((error) => {
                setFileList([]);
                setIsSubmit(false);
                setIsSubmitPayment(false);
                console.log(error);
                toast.error("Upload file thất bại!");
            })
            getAll();
        }
    }
    const handleSubmitPayment = async () => {
        setIsSubmit(false);
        setIsSubmitPayment(true);
        console.log("dataa: " + JSON.stringify(dataExcelPayment));
        for(let i = 0; i < dataExcelPayment.length; i++) {
            const userId = dataExcelPayment[i].userId;
            const projectId = dataExcelPayment[i].projectId;
            const amountMoney = dataExcelPayment[i].amountMoney;
            const reason = dataExcelPayment[i].reason;
            await dispatch(createProjectPayment({userId, projectId, amountMoney, reason}))
            .then((response) => {
                setFileListPayment([]);
                setIsSubmit(false);
                setIsSubmitPayment(false);
                setDataExcelPayment([]);
                setShowModalImport(false);
            })
            .catch((error) => {
                setFileListPayment([])
                setIsSubmit(false)
                setIsSubmitPayment(false);
                console.log(error);
                toast.error("Upload file thất bại!");
            })
            getAll();
        }
    }
    const onChangeRadio = (e) => {
        console.log("checked " + e.target.value);
        setRadioValue(e.target.value);
        if(e.target.value === 1){
            setShowContributions(true);
            setShowPayment(false);
        } else {
            setShowContributions(false);
            setShowPayment(true);
        }
    }
    
    return (
        <Modal
            className="upload-modal"
            title="Upload file"
            centered
            width={1200}
            style={{padding: 30}}
            maskClosable={false}
            open={showModalImport}
            onOk={() => {setShowModalImport(false); setFileList([]); setFileListPayment([])}}
            onCancel={() => {setShowModalImport(false); setDataExcel([]); setFileList([]); setFileListPayment([]); setDataExcelPayment([]); 
                    setIsSubmit(false); setIsSubmitPayment(false)}}
            footer={[
                <Button key="1" type="primary" 
                    loading={isSubmit ? isSubmit : isSubmitPayment}
                    onClick={() => { showContributions ? handleSubmit() : handleSubmitPayment() }}
                    style={{fontSize: 15, fontFamily: "Montserrat", background: "#d95c5c !important"}}>
                    Import file
                </Button>
            ]}>
            <Radio.Group onChange={onChangeRadio} value={radioValue}>
                <Radio value={1}>Phiếu thu</Radio>
                <Radio value={2}>Phiếu chi</Radio>
            </Radio.Group>
            {showContributions && 
                <>
                    <Dragger className="upload" {...propsUpload} fileList={fileList}>
                        <p className="ant-upload-drag-icon upload-modal">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Nhấp chuột hoặc kéo thả vào đây để tải lên</p>
                        <p className="ant-upload-hint">Chỉ chấp nhận tải lên các files .csv, .xls, xlsx</p>
                    </Dragger>
                    <Table className="project-payment" 
                            title={() => <span>Dữ liệu tải lên của thu:</span>}
                            dataSource={dataExcel}
                            columns={columns}
                    />
                </>
            }
            {showPayment && 
            <>
                <Dragger className="upload" {...propsUploadPayment} fileList={fileListPayment}>
                    <p className="ant-upload-drag-icon upload-modal">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Nhấp chuột hoặc kéo thả vào đây để tải lên</p>
                    <p className="ant-upload-hint">Chỉ chấp nhận tải lên các files .csv, .xls, xlsx</p>
                </Dragger>
                <Table className="project-payment" 
                    title={() => <span>Dữ liệu tải lên của chi:</span>}
                    dataSource={dataExcelPayment}
                    columns={columnsPayment}
                />
            </>
            }
        </Modal>
    )
}

export default ImportFile;