import React from "react";
import {Drawer, Descriptions, Image, Card, Divider, Table} from "antd";
import moment from "moment";
import vi from "moment/locale/vi";
import "./ProjectStyle.scss";

const ProjectDetail = (props) => {
    const {openViewDetail, dataViewDetail} = props;
    console.log(">> nhan duoc: " + JSON.stringify(dataViewDetail));

    const onClose = () => {
        props.setOpenViewDetail(false)
    };

    const columnsArtifact = [
        {
          title: 'Tên hiện vật',
          dataIndex: 'artifactName',
          key: 'artifactName',
        },
        {
          title: 'Số lượng',
          dataIndex: 'minQuantity',
          key: 'minQuantity',
        },
        {
          title: 'Đơn vị',
          dataIndex: 'calculationUnit',
          key: 'calculationUnit',
        },
      ];

    return (
        <Drawer style={{fontFamily: "Montserrat"}} className="project-detail" title="Xem thông tin chi tiết dự án"
            width={"50vw"}
            onClose={onClose} open={openViewDetail}>
            <Divider style={{fontFamily: "Montserrat", fontSize: "15px", fontWeight: "600", color: "#b92735"}}>Thông tin của dự án</Divider>
            <Descriptions style={{fontFamily: 'Montserrat'}} bordered column={3}>
                <Descriptions.Item label="Tên dự án" span={3}>{dataViewDetail?.name}</Descriptions.Item>
                <Descriptions.Item label="Loại dự án" span={1.5}>{dataViewDetail?.projectType && dataViewDetail?.projectType?.name ? dataViewDetail?.projectType?.name : "lỗi rui"}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái" span={1.5}>
                    {dataViewDetail?.projectStatus && dataViewDetail?.projectStatus?.name ? dataViewDetail?.projectStatus?.name : "lỗi rui"}    
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian vận động" span={1.5}>{moment(dataViewDetail?.startTime).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                <Descriptions.Item label="Thời gian kết thúc:" span={1.5}>{moment(dataViewDetail?.endTime).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                <Descriptions.Item label="Thời gian tổ chức:" span={1.5}>{moment(dataViewDetail?.holdTime).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                <Descriptions.Item label="Địa điểm tổ chức:" span={1.5}>{dataViewDetail?.position}</Descriptions.Item>
                <Descriptions.Item label="Mô tả dự án:" span={3}>{dataViewDetail?.details}</Descriptions.Item>
            </Descriptions>

            <Divider style={{fontFamily: "Montserrat", fontSize: "15px", fontWeight: "600", color: "#b92735"}}>Thông tin kêu gọi của dự án</Divider>
            <Descriptions style={{fontFamily: 'Montserrat'}} bordered column={2}>
            {dataViewDetail.projectMonies && dataViewDetail.projectMonies.map((money, index) => (
                     <Descriptions.Item key={index} label="Số tiền kêu gọi:"  span={2}>{money.minMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</Descriptions.Item>
                ))}
            <Descriptions.Item label="Số lượng tình nguyện viên:"  span={2}>{dataViewDetail?.numVolunteers}</Descriptions.Item>
            </Descriptions>
            {dataViewDetail.projectArtifacts.length > 0 && 
                <div style={{marginTop: 20}}>
                    <Table columns={columnsArtifact} dataSource={dataViewDetail.projectArtifacts} pagination={false}/>
                </div>
            }
            <Divider style={{fontFamily: "Montserrat", fontSize: "15px", fontWeight: "600", color: "#b92735"}}>Hình ảnh của dự án</Divider>
            <div style={{display: "flex", width: 730, flexWrap: "wrap", gap: 25, marginTop: 20}}>
                {dataViewDetail.projectImages && dataViewDetail.projectImages.map((img, index) => (
                    <Card key={index} style={{height: 160, width: 220,}}>
                        <Image src={img.name} style={{width: 190, height: 130, marginTop: -10, marginLeft: -10}}  />
                    </Card>
                ))}
            </div>
            {dataViewDetail.projectProofs.length > 0 && 
                <>
                                <Divider style={{fontFamily: "Montserrat", fontSize: "15px", fontWeight: "600", color: "#b92735"}}>Hình ảnh triển khai của dự án</Divider>
                    <div style={{display: "flex", width: 730, flexWrap: "wrap", gap: 25, marginTop: 20}}>
                        {dataViewDetail.projectProofs && dataViewDetail.projectProofs.map((img, index) => (
                            <Card key={index} style={{height: 160, width: 220,}}>
                                <Image src={img.name} style={{width: 190, height: 130, marginTop: -10, marginLeft: -10}}  />
                            </Card>
                        ))}
                    </div>
                </>
            }
        </Drawer>    
    )
}

export default ProjectDetail;