import React from "react";
import {Modal, Badge, Descriptions, Table, Tag} from "antd";
import moment from "moment";
import vi from "moment/locale/vi";
import "./HistoryContribution.scss";

const HistoryContributionDetail = (props) => {
    const {openViewDetail, setOpenViewDetail, dataViewDetail} = props;
    console.log("data nhan dc: " + JSON.stringify(dataViewDetail));

    const columns = [
        {
          title: 'Tên hiện vật',
          dataIndex: 'artifactName',
        },
        {
          title: 'Số lượng đã đóng góp',
          dataIndex: 'donatedAmount',
        },
        {
            title: 'Số lượng đã nhận',
            dataIndex: 'receivedAmount',
        },
        {
          title: 'Đơn vị',
          dataIndex: 'calculationUnit',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'artifactStatus',
            render: (text, record) => {
                let color = "green"
                if(text === "Đang chờ duyệt"){
                    color = "yellow"
                } else if (text === "Đã từ chối"){
                    color = "red"
                } else if (text === "Đã duyệt"){
                    color = "blue"
                }
                return (
                    <Tag color={color} key={text}>
                        {text.toUpperCase()}
                    </Tag>
                )
            }, 
          }
      ];

    return (
        <Modal
            title="Chi tiết đơn đóng góp"
            centered
            width={1000}
            style={{padding: 30}}
            open={openViewDetail}
            footer = {null}
            onOk={() => setOpenViewDetail(false)}
            onCancel={() => {setOpenViewDetail(false)}}>
            {dataViewDetail.length !== 0 && 
            <>
            <Descriptions className="detail-contribution" bordered column={3}>                
                <Descriptions.Item span={3} label="Mã đơn đóng góp">{dataViewDetail?.id} </Descriptions.Item>
                <Descriptions.Item span={1.5} label="Nickname">{dataViewDetail?.nickname}</Descriptions.Item>
                <Descriptions.Item span={1.5} label="Lời nhắn">{dataViewDetail?.messages}</Descriptions.Item>
                <Descriptions.Item span={3} label="Tên dự án">{dataViewDetail?.projectName}</Descriptions.Item>
                <Descriptions.Item span={3} label="Loại dự án">{dataViewDetail?.projectType}</Descriptions.Item>
                <Descriptions.Item span={1.5} label="Số tiền ủng hộ">{dataViewDetail?.contributionMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Descriptions.Item>
                <Descriptions.Item span={1.5} label="Thời gian">{moment(dataViewDetail?.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                <Descriptions.Item span={3} label="Hình thức đóng góp">{dataViewDetail?.paymentType}</Descriptions.Item>
                <Descriptions.Item span={3} label="Trạng thái đơn">
                    {dataViewDetail?.moneyStatus === 'Đã nhận' ?
                        <Badge style={{fontFamily: "Montserrat", color: 'green'}} status="processing" text={dataViewDetail?.moneyStatus} />
                    :
                        <Badge style={{fontFamily: "Montserrat", color: 'yellow'}} status="processing" text={dataViewDetail?.moneyStatus} />
                    }
                </Descriptions.Item>
            </Descriptions>
            {dataViewDetail?.contributionArtifactDto.length !== 0 &&
                <div style={{fontFamily: "Montserrat", fontSize: 15, fontWeight: 600, marginTop: 20, color: "#1b5d91 !important"}} className="project-table">
                    <p>*Thông tin hiện vật</p>
                    <Table 
                        pagination={false}
                        className="project-artifact" columns={columns} dataSource={dataViewDetail?.contributionArtifactDto}/>
                </div>
            }
            </>
                
        }
        </Modal>
    )
}

export default HistoryContributionDetail;