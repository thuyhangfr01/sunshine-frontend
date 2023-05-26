import React, {useState} from "react";
import {Drawer, Descriptions, Divider, Card, Image, Badge, Button} from "antd";
import {useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import moment from "moment";
import vi from "moment/locale/vi";
import "./FormHelp.scss";
import {updateStatusFormVolunteer} from "../../../slices/form";

const FormHelpDetail = (props) => {
    const {openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail, getAll} = props;
    const [isSubmit1, setIsSubmit1] = useState(false);
    const [isSubmit2, setIsSubmit2] = useState(false);
    const dispatch = useDispatch();

    const updateStatus = (statusId) => {
        console.log(">>> : " + statusId);
        if(statusId === 2) { setIsSubmit1(true); setIsSubmit2(false); }
        else {setIsSubmit2(true); setIsSubmit1(false); }
        const id = dataViewDetail.id;
        const fullName = dataViewDetail.fullName;
        const email = dataViewDetail.email;
        const phone = dataViewDetail.phone;
        const projectId = dataViewDetail.projectId;
        dispatch(updateStatusFormVolunteer({id, fullName, email, phone, projectId, statusId}))
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
        <Drawer title="Xem thông tin chi tiết của đơn yêu cầu"
            style={{fontFamily: "Montserrat", fontSize: "15px"}}
            width={"50vw"}
            onClose={() => {setOpenViewDetail(false); setDataViewDetail([])}} open={openViewDetail}>

            <Divider style={{fontFamily: "Montserrat", fontSize: "15px"}}>Thông tin người gửi</Divider>
            <Descriptions bordered column={3}
                style={{fontFamily: "Montserrat", fontSize: "15px"}}>
                <Descriptions.Item label="Họ và tên" span={3}>{dataViewDetail?.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email" span={1.5}>{dataViewDetail?.email}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại" span={1.5}>{dataViewDetail?.phone}</Descriptions.Item>
            </Descriptions>

            <Divider style={{fontFamily: "Montserrat", fontSize: "15px"}}>Nội dung đơn yêu cầu</Divider>
            <Descriptions bordered column={3}
                style={{fontFamily: "Montserrat", fontSize: "15px"}}>
                <Descriptions.Item label="Dự án tham gia" span={3}>{dataViewDetail?.projectName}</Descriptions.Item>
                <Descriptions.Item span={1.5} label="Trạng thái đơn">
                    {dataViewDetail?.statusName === 'Đang chờ duyệt' &&
                        <Badge style={{fontFamily: "Montserrat", color: '#ffc107', fontWeight: 600, fontStyle: "italic"}} status="warning" text={dataViewDetail?.statusName} />
                    }
                    {dataViewDetail?.statusName === 'Đã duyệt' &&
                        <Badge style={{fontFamily: "Montserrat", color: 'green', fontWeight: 600, fontStyle: "italic"}} status="success" text={dataViewDetail?.statusName} />
                    }
                    {dataViewDetail?.statusName === 'Đã từ chối' &&
                        <Badge style={{fontFamily: "Montserrat", color: 'red', fontWeight: 600, fontStyle: "italic"}} status="error" text={dataViewDetail?.statusName} />
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian gửi" span={1.5}>{moment(dataViewDetail?.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
            </Descriptions>

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