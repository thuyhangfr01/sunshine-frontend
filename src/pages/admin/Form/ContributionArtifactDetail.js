import React, {useState, useEffect} from "react";
import {Drawer, Descriptions, Divider, Table, Spin, Select, Input, Button, InputNumber} from "antd";
import {useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import moment from "moment";
import vi from "moment/locale/vi";
import "./FormHelp.scss";

import {getArtifactsByContributionId, updateArtifactStatus} from "../../../slices/artifact";

const ContributionArtifactDetail = (props) => {
    const {openViewDetail, setOpenViewDetail, dataViewDetail, contributionId, getAllListContributionArtifacts} = props;
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);

    const options = [
        {value: "Đã duyệt", label: "Đồng ý duyệt", color: "#37ad76"},
        {value: "Đã nhận", label: "Đã nhận", color: "#6c98d7"},
        {value: "Đã từ chối", label: "Từ chối duyệt", color: "#d14444"},
    ]
    const colorOption = (option) => {
        return (
            <div style={{color: option.color, fontFamily: 'Montserrat', fontWeight: 500}} key={option.value}>
                {option.label}
            </div>
        )
    }

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
                            <InputNumber min={1} max={record.donatedAmount} onChange={(value) => handleChangeInput(value, record.artifactId)} value={text}></InputNumber>   
                        :
                            <InputNumber value={0} disabled></InputNumber>   
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
                            style={{fontFamily: 'Montserrat',  alignSelf: "center", width: 160}}
                            onChange={(value) => {handleSelect(value, record.artifactId)}}
                            value={text}
                            >
                                {options.map(option => (
                                    <Select.Option value={option.value} key={option.value}>{colorOption(option)}</Select.Option>))
                                }
                                {/* <Select.Option style={{fontFamily: 'Montserrat'}} key={2} value="Đã duyệt">Đồng ý duyệt</Select.Option>
                                <Select.Option style={{fontFamily: 'Montserrat'}} key={3} value="Đã nhận">Đã nhận</Select.Option> 
                                <Select.Option style={{fontFamily: 'Montserrat'}} key={4} value="Đã từ chối">Từ chối duyệt</Select.Option> */}
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

    const handleSelect = (value, id) => {
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

    const handleUpdate = () => {
        if(dataSourceArtifact){
            setIsSubmit(true);
            var statusId = 1;
            dataSourceArtifact.map((item) => {
                const artId = item.artifactId;
                const artifactId = item.artifactId;
                const receivedAmount = item.receivedAmount;
                const statusName = item.artifactStatus;
                if(statusName === "Đã duyệt") { statusId = 2; }
                else if(statusName === "Đã nhận") { statusId = 3; }
                else if(statusName === "Đã từ chối") { statusId = 4; }
                console.log("test: " + artId + " - " + artifactId + " - " + receivedAmount + " - " + statusId)
                dispatch(updateArtifactStatus({artId, artifactId, receivedAmount, statusId}))
                    .then((res) => {
                        setIsSubmit(false);
                        console.log(">>> res: " + JSON.stringify(res));
                    })
                    .catch((err) => {
                        setIsSubmit(false);
                        console.log(err);
                    })
            })
            setDataSourceArtifact([]);
            getAllListContributionArtifacts();
            setOpenViewDetail(false);
            toast.success("Cập nhật thành công!");
        }
    }

    return (
        <Drawer title="Xem thông tin chi tiết của đơn đón góp"
        style={{fontFamily: "Montserrat", fontSize: "15px"}}
        width={"50vw"}
        onClose={() => {setOpenViewDetail(false);  setDataSourceArtifact([]);}} open={openViewDetail}
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
                loading={isSubmit}
                onClick={handleUpdate}
                style={{fontSize: 15, fontFamily: "Montserrat", backgroundColor: "#d95c5c !important", float: "right", marginTop: 15, fontWeight: 500}}>
                    Cập nhật
        </Button>      
    </Drawer>
    )
}

export default ContributionArtifactDetail;