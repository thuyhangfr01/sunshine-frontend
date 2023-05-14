import React from "react";
import {Drawer, Descriptions, Badge, Image, Col, Card, Row} from "antd";
import moment from "moment";
import vi from "moment/locale/vi";

const ProjectDetail = (props) => {
    const open = props.openViewDetail;
    const projectDetail = props.dataViewDetail;
    console.log(projectDetail);
    const onClose = () => {
        props.setOpenViewDetail(false)
    };

    return (
        <Drawer title="Xem thông tin chi tiết dự án"
            width={"50vw"}
            onClose={onClose} open={open}>
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Tên dự án" span={2}>{projectDetail?.name}</Descriptions.Item>
                <Descriptions.Item label="Loại dự án">{projectDetail.projectType && projectDetail.projectType.name ? projectDetail.projectType.name : "lỗi rui"}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái"><Badge status="processing" text={projectDetail.projectStatus && projectDetail.projectStatus.name ? projectDetail.projectStatus.name : "lỗi rui"} /></Descriptions.Item>
                <Descriptions.Item label="Thời gian vận động">{moment(projectDetail?.startTime).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                <Descriptions.Item label="Thời gian kết thúc:">{moment(projectDetail?.endTime).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                <Descriptions.Item label="Thời gian tổ chức:">{moment(projectDetail?.holdTime).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                <Descriptions.Item label="Địa điểm tổ chức:">{projectDetail?.position}</Descriptions.Item>
                {projectDetail.projectMonies && projectDetail.projectMonies.map((money, index) => (
                     <Descriptions.Item key={index} label="Số tiền kêu gọi:">{money.minMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Descriptions.Item>
                ))}
                <Descriptions.Item label="Số lượng tình nguyện viên:">{projectDetail?.numVolunteers}</Descriptions.Item>
                <Descriptions.Item label="Mô tả dự án:" span={2}>{projectDetail?.details}</Descriptions.Item>
            </Descriptions>
                <div style={{display: "flex", width: 730, flexWrap: "wrap", gap: 25, marginTop: 20}}>
                    {projectDetail.projectImages && projectDetail.projectImages.map((img, index) => (
                        <Card key={index} style={{height: 160, width: 220,}}>
                            <Image src={img.name} style={{width: 190, height: 130, marginTop: -30, marginLeft: -20}}  />
                        </Card>
                    ))}
                </div>
        </Drawer>
    )
}

export default ProjectDetail;