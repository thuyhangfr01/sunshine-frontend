import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {Modal, Button, Upload, message, Input, Spin} from "antd";
import { InboxOutlined } from '@ant-design/icons';
import axios from "axios";
import { toast } from "react-toastify";
import {addFile} from "../../../slices/report";

const {Dragger} = Upload;

const ImportFile = (props) => {
    const dispatch = useDispatch();

    const {showModalImport, setShowModalImport, getAll} = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [nameImg, setNameImg] = useState(null);
    const [urlImg, setUrlImg] = useState(null);
    const [title, setTitle] = useState(null);

    const handleChangeInput = (event) => {
        setTitle(event.target.value);
        console.log(event.target.value);
    }
    const uploadFile = async (file, nameFile) => {
        const url = 'http://localhost:8080/api/blob/upload';
        const formData = new FormData();
        formData.append('file', file)

        try{
            await axios.post(url, formData) 
                .then((result) => {
                    console.log("<<<< link: " + result.data);
                    console.log("<<<< link: " + nameFile);
                    setUrlImg(result.data);             
                    setNameImg(nameFile);
                    message.success(`${nameFile} đã được tải lên thành công.`);
                })
        } catch(e){
            console.log(e);
        }
    }
    const dummyRequest = ({file, onSuccess}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 5000);
    }
    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        action: 'http://localhost:8080/api/blob/upload',
        enctype: "multipart/form-data",
        customRequest: dummyRequest,
        onChange(info) {
            // setFileList(info.fileList);
            const { status } = info.file;
            if(status !== 'uploading'){
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                if(info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj; //lay file
                    uploadFile(file, info.file.name);
                    // setNameImg(info.file.name);
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} tải lên thất bại.`);
            }
        },
    };

    const addReport= () => {
        setIsSubmit(true);
        console.log(">>>>> title: " + title + " - nameImg: " + nameImg + " - urlImg: " + urlImg);
        // if(title !== null && nameImg !== null && urlImg !== null) {
        dispatch(addFile({title, nameImg, urlImg}))
            .then((res) => {
                setIsSubmit(false);
                console.log(">>>>> res: " + res);
                toast.success("Thêm mới thành công!");
                getAll();
                setShowModalImport(false);
                return;
            })
            .catch((err) => {
                setIsSubmit(false);
                console.log(err);
                toast.success("Thêm mới thành công!");
                setShowModalImport(false);
                getAll();
            })
        // }
    }

    return (
        <Modal
            className="upload-modal"
            title="Upload file"
            centered
            width={600}
            style={{padding: 30}}
            maskClosable={false}
            open={showModalImport}
            onOk={() => {setShowModalImport(false); setIsSubmit(false)}}
            onCancel={() => {setShowModalImport(false); setIsSubmit(false)}}
            footer={[
                <Button key="1" type="primary" 
                    loading={isSubmit}
                    onClick={addReport}
                    style={{fontSize: 15, fontFamily: "Montserrat", background: "#d95c5c !important", height: "40px!important"}}>
                    Thêm mới
                </Button>
            ]}>
                <Input value={title} style={{fontSize: 15, fontFamily: "Montserrat", height: "40px!important", fontWeight: 500, marginTop: 20, marginBottom: 20}}
                    placeholder="Nhập tiêu đề..." onChange={(e) => handleChangeInput(e)}>
                </Input>
                <Dragger style={{fontFamily: "Montserrat"}} className="upload" {...propsUpload}  >
                    <p className="ant-upload-drag-icon upload-modal">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Nhấp chuột hoặc kéo thả vào đây để tải lên</p>
                    <p className="ant-upload-hint">Chỉ chấp nhận tải lên file .pdf</p>
                </Dragger>
        </Modal>
    )
}

export default ImportFile;