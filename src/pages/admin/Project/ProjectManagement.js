import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Table, Tag, Button, Spin,  Row, Col, Select, DatePicker} from "antd";
import {DeleteFilled, EditOutlined, PlusOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import {retrieveLatestProjects} from "../../../slices/projects";
import ProjectDetail from "./ProjectDetail";
import ProjectAdd from "./ProjectAdd";
import ProjectUpdate from "./ProjectUpdate";
import { retrieveTypes } from "../../../slices/types";
import moment from "moment";
import vi from "moment/locale/vi";
import dayjs from 'dayjs';

const ProjectManagement = () => {
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);
    const [openViewAddProject, setOpenViewAddProject] = useState(false);
    const [openViewUpdateProject, setOpenViewUpdateProject] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [loading, setLoading] = useState(false);

    const typesList = useSelector((state) => state.types);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(retrieveTypes());
    }, [])


    const [page, setPage] = React.useState(1);
    const columns = [
        {
            title: "STT",
            key: "index",
            // render: (value, item, index) => {return (page - 1) * 10 + index + 1},
            render: (text, record, index) => (index + 1),
        },
        {
          title: 'Tên dự án',
          dataIndex: 'name',
          render: (text, record, index) => {
            return (
                <Link style={{color: "#1554ad", fontWeight: 600}} onClick={() => {
                    console.log(">>> record: " + JSON.stringify(record));
                    setDataViewDetail(record);
                    setOpenViewDetail(true);
                }}>{text}
                </Link>
            )
          },
        },
        {
          title: 'Loại dự án',
          dataIndex: ['projectType', 'name'],
          render: (text, record, index) => {
            console.log("type: " + text);
            return (<p style={{fontSize: 14, marginBottom: 0}}>{text}</p>)
          }
        },
        {
            title: 'Trạng thái',
            dataIndex: ['projectStatus','name'],
            render: (text, record) => {
                let color = "#e0ae4c"
                if(text === "Đã tạm hoãn"){
                    color = "#d14444"
                } else if(text === "Đã hoàn thành"){
                    color = "#20a668"
                } else if(text === "Đang triển khai"){
                    color = "#6c98d7"
                }
                return (
                    <Tag style={{fomtFamily: "Montserrat", fontSize: 15}} color={color} key={text}>
                        {text}
                      </Tag>
                )
            }, 
            filters: [
                {text: "Đang vận động", value: "Đang vận động"},
                {text: "Đang triển khai", value: "Đang triển khai"},
                {text: "Đã hoàn thành", value: "Đã hoàn thành"},
                {text: "Đã tạm hoãn", value: "Đã tạm hoãn"}
            ],
            onFilter: (value, record) => {
                return record.projectStatus.name === value
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
            title: 'Thao tác',
            key: 'action',
            render: (text, record, index) => {
              return (
                <>
                    <EditOutlined style={{color: "#dbbb33", fontSize: 16, paddingLeft: "25px"}}
                        onClick={() => {
                            setOpenViewUpdateProject(true);
                            setDataUpdate(record);
                        }}/>
                    <DeleteFilled style={{color: "#a50f0f", fontSize: 16, paddingLeft: "15px"}}/>
                </>
              )
            },
          },
      ];
    const [dataSource, setDataSource] = useState([]);

    const getLatestProject = () => {
        setLoading(true);
        dispatch(retrieveLatestProjects())
            .then(response => {
                console.log(">>> daataaaaaa: " + JSON.stringify(response));
                setLoading(false);
                setDataSource(response.payload);
            })
            .catch(e => {
                setLoading(false);
                console.log(e);
            });
        }

    useEffect(getLatestProject, []);

    const renderHeader = () => {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span className="title">DANH SÁCH DỰ ÁN</span>
                <span style={{display: "flex", gap: 10}}>
                    {/* <Button><ExportOutlined /> Export</Button>
                    <Button><ImportOutlined /> Import</Button> */}
                    <Button style={{fontFamily: "Montserrat", fontSize: 15, fontWeight: 500}}
                        onClick={() => setOpenViewAddProject(true)}
                    ><PlusOutlined /> Thêm mới</Button>
                </span>
            </div>
        )
    }
    return (
        <div style={{padding: "55px 30px 30px 30px"}}>
            <div className="receipt-payment">
                <Row style={{marginLeft: 10}}>
                    <Col span={14} style={{display: "flex"}}>
                        <p className="p-text">Lọc theo dự án: </p>
                        <Select placeholder="Tất cả..." 
                            showSearch
                            allowClear
                            style={{fontFamily: 'Montserrat',  alignSelf: "center", marginBottom: "10px"}}>
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
            </div>

            <Spin spinning={loading}>
                <Table className="project-artifact" columns={columns} dataSource={dataSource}
                    title={renderHeader}
                    style={{marginTop: 20}}
                    pagination={{
                        pageSize: 6,
                        onChange(current) {
                            setPage(current);
                        }
                }}/>
            </Spin>

            <ProjectAdd
                openViewAddProject={openViewAddProject}
                setOpenViewAddProject={setOpenViewAddProject}
                getLatestProject={getLatestProject}
            /> 

            <ProjectUpdate
                openViewUpdateProject={openViewUpdateProject}
                setOpenViewUpdateProject={setOpenViewUpdateProject}
                getLatestProject={getLatestProject}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />

            {dataViewDetail !== null &&
                <ProjectDetail
                    openViewDetail={openViewDetail}
                    setOpenViewDetail={setOpenViewDetail}
                    dataViewDetail={dataViewDetail}
                    setDataViewDetail={setDataViewDetail}
                />
            }
        </div>
    )
}

export default ProjectManagement;