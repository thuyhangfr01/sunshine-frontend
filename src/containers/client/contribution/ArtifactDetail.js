import React, {useState, useEffect} from "react";
import {Modal, Descriptions, Divider, Table, Tag, Button, InputNumber} from "antd";
import {useDispatch } from "react-redux";
import moment from "moment";
import vi from "moment/locale/vi";
import "../../../pages/admin/Form/FormHelp.scss";

import {getArtifactsByContributionId} from "../../../slices/artifact";

const ArtifactDetail = (props) => {
    const {openViewDetail, setOpenViewDetail, dataViewDetail, contributionId} = props;
    const dispatch = useDispatch();

    //bang hien vat
    const columnsArtifact = [
        {
          title: 'Tên hiện vật',
          dataIndex: 'artifactName',
          key: 'artifactName',
        },
        {
          title: 'Số lượng',
          dataIndex: 'donatedAmount',
          key: 'donatedAmount',
        },
        {
          title: 'Đơn vị',
          dataIndex: 'calculationUnit',
          key: 'calculationUnit',
        },
        {
            title: 'Số lượng nhận',
            dataIndex: 'receivedAmount',
            key: 'receivedAmount',
        },
        {
            title: 'Trạng thái đơn',
            dataIndex: 'artifactStatus',
            render: (text, record) => {
                let color = "#37ad76"
                if(text === "Đang chờ duyệt"){
                    color = "yellow"
                } else if(text === "Đã nhận"){
                    color = "#6c98d7"
                } else if(text === "Đã từ chối"){
                    color = "#d14444"
                }
                return (
                    <Tag color={color} key={text} style={{fontSize: 15, fontWeight: 500, fontFamily: "Montserrat"}}>
                        {text}
                    </Tag>
                )
            }
        },
      ];
    let [dataSourceArtifact, setDataSourceArtifact] = useState([]);

    const getListArtifacts = () => {
        const id = contributionId;
        if(id !== null){
            dispatch(getArtifactsByContributionId({id}))
            .then((response) => {
                console.log(">>>>>" + JSON.stringify(response.payload));
                setDataSourceArtifact(response.payload);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    useEffect(getListArtifacts, [contributionId]);

    return (
        <Modal
        title="Chi tiết đơn đóng góp"
        centered
        width={1000}
        style={{padding: 30}}
        open={openViewDetail}
        footer = {null}
        onOk={() => {setOpenViewDetail(false)}}
        onCancel={() => {setOpenViewDetail(false);}}>

        <Divider style={{fontFamily: "Montserrat", fontSize: "15px"}}>Thông tin người gửi</Divider>
        <Descriptions bordered column={3}
            style={{fontFamily: "Montserrat", fontSize: "15px"}}>
            <Descriptions.Item label="Họ và tên" span={3}>{dataViewDetail?.userName}</Descriptions.Item>
        </Descriptions>

        <Divider style={{fontFamily: "Montserrat", fontSize: "15px"}}>Nội dung đơn yêu cầu</Divider>
        <Descriptions bordered column={3}
            style={{fontFamily: "Montserrat", fontSize: "15px"}}>
            <Descriptions.Item label="Tên dự án" span={3}>{dataViewDetail?.projectName}</Descriptions.Item>
            <Descriptions.Item label="Thời gian gửi" span={3}>{moment(dataViewDetail?.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
        </Descriptions>

        <Divider style={{fontFamily: "Montserrat", fontSize: "15px"}}>Chi tiết hiện vật đóng góp</Divider>
        <div style={{marginTop: 20}}>
                <Table columns={columnsArtifact} dataSource={dataSourceArtifact} pagination={false}/>
        </div>    
    </Modal>
    )
}

export default ArtifactDetail;