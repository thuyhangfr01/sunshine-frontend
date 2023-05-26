import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";   

import {Spin, Table, Tag, Button, Row, Col, Select, DatePicker} from "antd";
import {DeleteFilled} from '@ant-design/icons'
import "../Payment/ReceiptPayment.scss"; 
import moment from "moment";
import vi from "moment/locale/vi";
import dayjs from 'dayjs';
import FormVolunteerDetail from "./FormVolunteerDetail";
import {getAllFormVolunteerByProjectId} from "../../../slices/form";
import  {retrieveListProjectName} from "../../../slices/name";

const FormVolunteerManagement = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState([]);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [page, setPage] = React.useState(1);
    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => (index + 1),
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            render: (text, record, index) => {
              return (<p style={{fontSize: 14}}>{text}</p>)
            }
          },
        {
          title: 'Email',
          dataIndex: 'email',
          render: (text, record, index) => {
            return (<p style={{fontSize: 14}}>{text}</p>)
          }
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            render: (text, record, index) => {
              return (<p style={{fontSize: 14}}>{text}</p>)
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (text, record, index) => {
                return moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'statusName',
            render: (text, record) => {
                let color = "green"
                if(text === "Đã từ chối"){
                    color = "red"
                } else if(text === "Đang chờ duyệt"){
                    color = "yellow"
                }
                return (
                    <Tag color={color} key={text}>
                        {text.toUpperCase()}
                      </Tag>
                )
            }, 
            filters: [
                {text: "Đang chờ duyệt", value: "Đang chờ duyệt"},
                {text: "Đã duyệt", value: "Đã duyệt"},
                {text: "Đã từ chối", value: "Đã từ chối"}
            ],
            onFilter: (value, record) => {
                return record.statusName === value
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <>
                        <DeleteFilled style={{color: "#a50f0f", fontSize: 16, paddingLeft: "15px"}}/>
                        <DeleteFilled 
                            onClick={() => {
                                setDataViewDetail(record);
                                setOpenViewDetail(true);
                            }}
                            style={{color: "yellow", fontSize: 16, paddingLeft: "15px"}}/>
                    </>
                )
            },
          },
      ];
    const [dataSource, setDataSource] = useState([]);
    const [projectId, setProjectId] = useState(0);
    const listProjectName = useSelector((state) => state.name);
    // get danh sach ten du an
    useEffect(() => {
        dispatch(retrieveListProjectName());
    }, [])

    //bat su kien chon du an
    const handleSelect = (value) => {
        if(value !== undefined){
            setProjectId(value);
        } else{
            setProjectId(0);
        }
    }

    const getAll = () => {
        setLoading(true);
        const id = projectId;
        dispatch(getAllFormVolunteerByProjectId({id}))
        .then((res) => {
            setLoading(false);
            console.log("data form: " + JSON.stringify(res));
            setDataSource(res.payload);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(getAll, [projectId]);

    return (
        <div className="receipt-payment"  style={{padding: "55px 30px 30px 30px"}}>
            <Row style={{margin: "35px"}}>
                <Col span={14} style={{display: "flex"}}>
                    <p className="p-text">Lọc theo dự án: </p>
                    <Select placeholder="Tất cả..." 
                        showSearch
                        allowClear
                        style={{fontFamily: 'Montserrat'}}
                        onChange={handleSelect}>
                        {listProjectName && listProjectName.map((name, index) => (
                            <Select.Option style={{fontFamily: 'Montserrat'}} key={index} value={name.projectId}>{name.projectName}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                {/* Thời gian bắt đầu */}
                <Col span={5}>
                    <DatePicker  format="YYYY-MM-DD HH:mm:ss"
                        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }} />
                </Col>
                {/* Thời gian kết thúc */}
                <Col span={5}>
                    <DatePicker format="YYYY-MM-DD HH:mm:ss"
                        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                        style={{ paddingRight: 20  }} />
                </Col>   
            </Row> 
            <Spin spinning={loading}>
                <Table className="project-artifact" columns={columns} dataSource={dataSource}
                    // title={"DANH SÁCH ĐƠN YÊU CẦU"}
                    style={{marginTop: 20}}
                    pagination={{
                        pageSize: 6,
                        onChange(current) {
                            setPage(current);
                        }
                }}/>
            </Spin>
            <FormVolunteerDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
                getAll = {getAll}
                />
        </div>
    )
}

export default FormVolunteerManagement;