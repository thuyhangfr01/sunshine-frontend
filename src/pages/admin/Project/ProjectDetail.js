import React from "react";
import {Drawer, Descriptions, Badge, Image} from "antd";
import moment from "moment";
import vi from "moment/locale/vi";

const ProjectDetail = (props) => {
    const open = props.openViewDetail;
    const projectDetail = props.dataViewDetail;
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
                <Descriptions.Item label="Thời gian vận động">{moment(projectDetail?.startTime).locale("vi", vi).format('DD-MM-YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Thời gian kết thúc:">{moment(projectDetail?.endTime).locale("vi", vi).format('DD-MM-YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Thời gian tổ chức:">{moment(projectDetail?.holdTime).locale("vi", vi).format('DD-MM-YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Địa điểm tổ chức:">{projectDetail?.position}</Descriptions.Item>
                {projectDetail.projectMonies && projectDetail.projectMonies.map((money, index) => (
                     <Descriptions.Item key={index} label="Số tiền kêu gọi:">{money.minMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Descriptions.Item>
                ))}
                <Descriptions.Item label="Số lượng tình nguyện viên:">{projectDetail?.numVolunteers}</Descriptions.Item>
                <Descriptions.Item label="Mô tả dự án:" span={2}>{projectDetail?.details}</Descriptions.Item>
            </Descriptions>
            {projectDetail.projectImages && projectDetail.projectImages.map((img, index) => (
                <Image.PreviewGroup className="project-detail"
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    <Image key={index} src={img.name} />
                </Image.PreviewGroup>
            ))}
        </Drawer>
    )
}

export default ProjectDetail;