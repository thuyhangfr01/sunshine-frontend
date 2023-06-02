import React, {useState} from "react";
import {Modal, Descriptions, Divider, Card, Image, Badge, Button} from "antd";
import {useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import moment from "moment";
import vi from "moment/locale/vi";

const FormHelpDetail = (props) => {
    const {openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail} = props;
    const [isSubmit1, setIsSubmit1] = useState(false);
    const [isSubmit2, setIsSubmit2] = useState(false);
    const dispatch = useDispatch();

    return (
        <Modal
            title="Đơn đóng góp"
            centered
            width={1000}
            style={{padding: 30}}
            open={openViewDetail}
            onOk={() => setOpenViewDetail(false)}
            onCancel={() => {setOpenViewDetail(false)}}
            footer={false}
        >
            <Divider style={{fontFamily: "Montserrat", fontSize: "15px"}}>Thông tin cá nhân</Divider>
            <Descriptions bordered column={3}
                style={{fontFamily: "Montserrat", fontSize: "15px"}}>
                <Descriptions.Item label="Họ và tên" span={3}>{dataViewDetail?.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email" span={1.5}>{dataViewDetail?.email}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại" span={1.5}>{dataViewDetail?.phone}</Descriptions.Item>
            </Descriptions>

            <Divider style={{fontFamily: "Montserrat", fontSize: "15px"}}>Nội dung đơn yêu cầu</Divider>
            <Descriptions bordered column={3}
                style={{fontFamily: "Montserrat", fontSize: "15px"}}>
                <Descriptions.Item label="Tiêu đề" span={3}>{dataViewDetail?.title}</Descriptions.Item>
                <Descriptions.Item label="Nội dung" span={3}>{dataViewDetail?.contents}</Descriptions.Item>
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

            <Divider style={{fontFamily: "Montserrat", fontSize: "15px"}}>Hình ảnh đính kèm</Divider>
            <div style={{display: "flex", width: 730, flexWrap: "wrap", gap: 25, marginTop: 20}}>
                {dataViewDetail?.formImageList && dataViewDetail?.formImageList.map((img, index) => (
                    <Card key={index} style={{height: 160, width: 220,}}>
                        <Image preview={false} src={img.name} style={{width: 190, height: 130, marginTop: 20, marginLeft: -20}}  />
                    </Card>
                ))}
            </div>
        </Modal>
    )
}

export default FormHelpDetail;