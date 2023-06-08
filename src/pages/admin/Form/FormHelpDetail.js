import React, {useState} from "react";
import {Drawer, Descriptions, Divider, Card, Image, Badge, Button} from "antd";
import {useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import moment from "moment";
import vi from "moment/locale/vi";
import "./FormHelp.scss";
import {updateStatusFormHelp} from "../../../slices/form";

const FormHelpDetail = (props) => {
    const {openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail, getAll} = props;
    const [isSubmit1, setIsSubmit1] = useState(false);
    const [isSubmit2, setIsSubmit2] = useState(false);
    const dispatch = useDispatch();

    const updateStatus = (statusId) => {
        if(statusId === 2) { setIsSubmit1(true); setIsSubmit2(false); }
        else {setIsSubmit2(true); setIsSubmit1(false); }
        const id = dataViewDetail.id;
        const fullName = dataViewDetail.fullName;
        const email = dataViewDetail.email;
        const phone = dataViewDetail.phone;
        const title = dataViewDetail.title;
        const contents = dataViewDetail.contents;
        dispatch(updateStatusFormHelp({id, fullName, email, phone, title, contents, statusId}))
            .then((res) => {
                toast.success("Cập nhật đơn yêu cầu thành công!");
                setOpenViewDetail(false);
                setIsSubmit1(false);
                setIsSubmit2(false);
                setDataViewDetail([])
                getAll();
            })
            .catch((err) => {
                console.log(err);
                toast.success("Cập nhật đơn yêu cầu thất bại!");
                setOpenViewDetail(false);
                setIsSubmit1(false);
                setIsSubmit2(false);
                setDataViewDetail([])
            })
    }

    return (
        <Drawer title="Xem thông tin chi tiết của đơn yêu cầu" className="form-detail"
            style={{fontFamily: "Montserrat", fontSize: "15px"}}
            width={"50vw"}
            onClose={() => {setOpenViewDetail(false); setDataViewDetail([])}} open={openViewDetail}>

            <Divider style={{fontFamily: "Montserrat", fontSize: "15px", color: "#185bbd", fontWeight: 600}}>Thông tin người gửi</Divider>
            <Descriptions bordered column={3}
                style={{fontFamily: "Montserrat", fontSize: "15px"}}>
                <Descriptions.Item label="Họ và tên" span={3}>{dataViewDetail?.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email" span={3}>{dataViewDetail?.email}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại" span={3}>{dataViewDetail?.phone}</Descriptions.Item>
            </Descriptions>

            <Divider style={{fontFamily: "Montserrat", fontSize: "15px", color: "#185bbd", fontWeight: 600}}>Nội dung đơn yêu cầu</Divider>
            <Descriptions bordered column={3}
                style={{fontFamily: "Montserrat", fontSize: "15px"}}>
                <Descriptions.Item label="Tiêu đề" span={3}>{dataViewDetail?.title}</Descriptions.Item>
                <Descriptions.Item label="Nội dung" span={3}>{dataViewDetail?.contents}</Descriptions.Item>
                <Descriptions.Item span={3} label="Trạng thái đơn">
                    {dataViewDetail?.statusName === 'Đang chờ duyệt' &&
                        <Badge style={{fontFamily: "Montserrat", color: '#d7b36b', fontWeight: 600, fontStyle: "italic"}} status="warning" text={dataViewDetail?.statusName} />
                    }
                    {dataViewDetail?.statusName === 'Đã duyệt' &&
                        <Badge style={{fontFamily: "Montserrat", color: 'green', fontWeight: 600, fontStyle: "italic"}} status="success" text={dataViewDetail?.statusName} />
                    }
                    {dataViewDetail?.statusName === 'Đã từ chối' &&
                        <Badge style={{fontFamily: "Montserrat", color: 'red', fontWeight: 600, fontStyle: "italic"}} status="error" text={dataViewDetail?.statusName} />
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian gửi" span={3}>{moment(dataViewDetail?.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
            </Descriptions>

            <Divider style={{fontFamily: "Montserrat", fontSize: "15px", color: "#185bbd", fontWeight: 600}}>Hình ảnh đính kèm</Divider>
            <div style={{display: "flex", width: 730, flexWrap: "wrap", gap: 25, marginTop: 20}}>
                {dataViewDetail?.formImageList && dataViewDetail?.formImageList.map((img, index) => (
                    <Card key={index} style={{height: 160, width: 220,}}>
                        <Image src={img.name} style={{width: 190, height: 130, marginTop: -10, marginLeft: -10}}  />
                    </Card>
                ))}
            </div>

            {dataViewDetail?.statusName === "Đang chờ duyệt" ? 
                <div className="btn-group-form" style={{display: "flex", float: "right"}}>
                    <Button loading={isSubmit1} className="btn btn-success" onClick={() => updateStatus(2)}>Duyệt đơn</Button>
                    <Button loading={isSubmit2} className="btn btn-danger" onClick={() => updateStatus(3)}>Từ chối đơn</Button> 
                </div>
                :
                <div className="btn-group-form" style={{display: "flex", float: "right"}}>
                    <Button disabled className="btn btn-success">Duyệt đơn</Button>
                    <Button disabled className="btn btn-danger">Từ chối đơn</Button> 
                </div>
            }
                  
        </Drawer>
    )
}

export default FormHelpDetail;