import React from "react";
import {Drawer, Descriptions, Badge, Image, Col, Card, Row} from "antd";
import moment from "moment";
import vi from "moment/locale/vi";

const ContributionDetail = (props) => {
    const {openViewContributionDetail, setOpenViewContributionDetail, dataViewContributionDetail} = props;

    const onClose = () => {
        props.setOpenViewContributionDetail(false)
    };

    return (
        <Drawer title="Xem thông tin chi tiết đơn đóng góp"
            width={"50vw"}
            onClose={onClose} open={openViewContributionDetail}>
            <Descriptions bordered column={2}>
                {/* <Descriptions.Item label="Tên dự án" span={2}>{dataViewContributionDetail?.name}</Descriptions.Item>
                <Descriptions.Item label="Tên dự án" span={2}>{dataViewContributionDetail?.name}</Descriptions.Item>
                <Descriptions.Item label="Thời gian vận động">{moment(projectDetail?.startTime).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item> */}
            </Descriptions>
        </Drawer>
    )
}

export default ContributionDetail;