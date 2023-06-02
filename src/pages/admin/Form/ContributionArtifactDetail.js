import React, {useState, useEffect} from "react";
import {Drawer, Descriptions, Divider, Table, Spin, Select, Input, Button, InputNumber} from "antd";
import {useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import moment from "moment";
import vi from "moment/locale/vi";
import "./FormHelp.scss";

import {getArtifactsByContributionId, updateArtifactStatus} from "../../../slices/contribution";

const ContributionArtifactDetail = (props) => {
    const {openViewDetail, setOpenViewDetail, dataViewDetail, contributionId, setContributionId, getAllListContributionArtifacts} = props;
    const dispatch = useDispatch();
    const [_receivedAmount, setReceivedAmount] = useState(0);
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
            render: (text, record, index) => {
                return (
                  <div style={{display: "flex", fontFamily: "Montserrat", width: 100}}>
                        {record.artifactStatus === "Đã nhận" ?
                            <InputNumber min={1} max={record.donatedAmount} onChange={(value) => handleChangeInput(value, record.artifactId)} defaultValue={text}></InputNumber>   
                        :
                            <InputNumber defaultValue={0} disabled></InputNumber>   
                        }
                  </div>
                )
            }
        },
        {
            title: 'Thao tác',
            dataIndex: 'artifactStatus',
            key: 'artifactStatus',
            render: (text, record, index) => {
            return {
                props: {
                    style: { color: "#b90816", fontWeight: 600, fontSize: 15 }
                },
                children: 
                    <div style={{display: "flex", fontFamily: "Montserrat"}}>
                        <Select
                            showSearch
                            allowClear
                            style={{fontFamily: 'Montserrat',  alignSelf: "center", width: 150}}
                            onChange={(value) => {handleSelect(value, record.artifactId)}}
                            defaultValue={text}
                            >
                                <Select.Option style={{fontFamily: 'Montserrat'}} key={2} value="Đã duyệt">Đồng ý duyệt</Select.Option>
                                <Select.Option style={{fontFamily: 'Montserrat'}} key={3} value="Đã nhận">Đã nhận</Select.Option> 
                                <Select.Option style={{fontFamily: 'Montserrat'}} key={4} value="Đã từ chối">Từ chối duyệt</Select.Option>
                        </Select>
                    </div>
                };
            },
        }
      ];
    let [dataSourceArtifact, setDataSourceArtifact] = useState([]);

    const handleChangeInput = (_value, id) => {
        const newData = dataSourceArtifact.map((row) => 
            row.artifactId === id ? {...row, receivedAmount: _value} : row
        );
        console.log("new data: " + JSON.stringify(newData));
        setDataSourceArtifact(newData);
    }
    // const handleSelect = (record, value) => {
    //     updateStatus(record, value);
    // }

    const handleSelect = (value, id) => {
        // const newData = [...dataSourceArtifact];
        // newData[index].artifactStatus = value;
        // console.log("new data: " + JSON.stringify(newData));
        const newData = dataSourceArtifact.map((row) => 
            row.artifactId === id ? {...row, artifactStatus: value} : row
        );
        console.log("new data: " + JSON.stringify(newData));
        setDataSourceArtifact(newData);
    }

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

    // const updateStatus = (record, value) => {
    //     const artId = record.artifactId;
    //     const artifactId = record.artifactId;
    //     const receivedAmount = _receivedAmount;
    //     const statusId = value;

    //     console.log("test: " + artId + " - " + artifactId + " - " + receivedAmount + " - " + statusId)
    //         dispatch(updateArtifactStatus({artId, artifactId, receivedAmount, statusId}))
    //         .then((response) => {
    //             console.log("res: " + JSON.stringify(response));
    //             setReceivedAmount(0);
    //             getAllListContributionArtifacts();
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    const handleUpdate = () => {
        // if(dataSourceArtifact){
        //     dataSourceArtifact.map((item) => {
        //         const artId = item.artifactId;
        //         const artifactId = item.artifactId;
        //         const receivedAmount = item.receivedAmount;
        //         const statusName = item.artifactStatus;
        //         if(statusName === "Đã duyệt") { const statusId = 2; }
        //         else if(statusName === "Đã nhận") { const statusId = 3; }
        //         else if(statusName === "Đã từ chối") { const statusId = 4; }
        //         console.log("test: " + artId + " - " + artifactId + " - " + receivedAmount + " - " + statusId)
        //     })
        // }
    }

    return (
        <Drawer title="Xem thông tin chi tiết của đơn đón góp"
        style={{fontFamily: "Montserrat", fontSize: "15px"}}
        width={"50vw"}
        onClose={() => {setOpenViewDetail(false);}} open={openViewDetail}
        >

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

        <Button key="1" type="primary" 
                onClick={handleUpdate}
                style={{fontSize: 15, fontFamily: "Montserrat", background: "#d95c5c !important"}}>
                    Cập nhật
        </Button>      
    </Drawer>
    )
}

export default ContributionArtifactDetail;