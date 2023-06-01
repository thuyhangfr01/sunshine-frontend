import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {Modal, Upload, Table, message, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import "./ReceiptPayment.scss";
import { toast } from 'react-toastify';

import { createProjectPayment } from "../../../slices/projects";

import * as XLSX from 'xlsx';

const { Dragger } = Upload;
const ImportFilePayment = (props) => {
    const dispatch = useDispatch();

    const {showModalPaymentImport, setShowModalPaymentImport, getListPayments} = props;

    const [isSubmit, setIsSubmit] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [dataExcel, setDataExcel] = useState([]);

    const columns = [
        {
            title: "Người chuyển",
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
            title: "Người nhận",
            dataIndex: 'receiver',
            render: (text, record, index) => {
                return (<>{text}</>)
            }
        },
        {
            title: 'Ghi chú',
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
                            header: ["userId", "projectId", "amountMoney", "receiver", "reason"], //quy dinh dang format tra ve
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

    const handleSubmit = async () => {
        setIsSubmit(true);
        console.log("dataa: " + JSON.stringify(dataExcel));
        for(let i = 0; i < dataExcel.length; i++) {
            const userId = dataExcel[i].userId;
            const projectId = dataExcel[i].projectId;
            const amountMoney = dataExcel[i].amountMoney;
            const receiver = dataExcel[i].receiver;
            const reason = dataExcel[i].reason;
            await dispatch(createProjectPayment({userId, projectId, amountMoney, receiver, reason}))
            .then((response) => {
                setIsSubmit(false);
                setFileList([]);
                setDataExcel([]);
                setShowModalPaymentImport(false)
            })
            .catch((error) => {
                setFileList([])
                setIsSubmit(false)
                setDataExcel([]);
                console.log(error);
                setShowModalPaymentImport(false);
            })
            getListPayments();
        }
    }
    
    return (
        <Modal
            className="upload-modal"
            title="Upload file"
            centered
            width={800}
            style={{padding: 30}}
            maskClosable={false}
            open={showModalPaymentImport}
            onOk={() => {setShowModalPaymentImport(false); setFileList([])}}
            onCancel={() => {setShowModalPaymentImport(false); setDataExcel([]); setFileList([]); setIsSubmit(false);}}
            footer={[
                <Button key="1" type="primary" 
                    loading={isSubmit}
                    onClick={() => {handleSubmit()}}
                    style={{fontSize: 15, fontFamily: "Montserrat", background: "#d95c5c !important"}}>
                    Import file
                </Button>
            ]}>
            <Dragger className="upload" {...propsUpload} fileList={fileList} style={{fontFamily: "Montserrat"}}>
                <p className="ant-upload-drag-icon upload-modal">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấp chuột hoặc kéo thả vào đây để tải lên</p>
                <p className="ant-upload-hint">Chỉ chấp nhận tải lên các files .csv, .xls, xlsx</p>
            </Dragger>
            <Table className="project-payment" 
                    dataSource={dataExcel}
                    columns={columns}
                    pagination={false}
                    style={{marginTop: 30}}
            />
        </Modal>
    )
}

export default ImportFilePayment;