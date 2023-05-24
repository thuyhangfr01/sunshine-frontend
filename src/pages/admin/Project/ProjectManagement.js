import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Table, Tag, Button, Spin} from "antd";
import {DeleteFilled, EditOutlined, ImportOutlined, ExportOutlined, PlusOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import ProjectDataService from "../../../services/project.service";
import ProjectDetail from "./ProjectDetail";
import ProjectAdd from "./ProjectAdd";
import ProjectUpdate from "./ProjectUpdate";
import { retrieveTypes } from "../../../slices/types";
import moment from "moment";
import vi from "moment/locale/vi";

const ProjectManagement = () => {
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState([]);
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
            return (<p style={{fontSize: 14}}>{text}</p>)
          }
        },
        {
            title: 'Trạng thái',
            dataIndex: ['projectStatus','name'],
            render: (text, record) => {
                let color = "green"
                if(text === "Đã tạm hoãn"){
                    color = "volcano"
                } else if(text === "Đã hoàn thành"){
                    color = "geekblue"
                } else if(text === "Đang triển khai"){
                    color = "yellow"
                }
                return (
                    <Tag color={color} key={text}>
                        {text.toUpperCase()}
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
        ProjectDataService.getLatestProject()
            .then(response => {
                setLoading(false);
                setDataSource(response.data);
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
                    <Button><ExportOutlined /> Export</Button>
                    <Button><ImportOutlined /> Import</Button>
                    <Button
                        onClick={() => setOpenViewAddProject(true)}
                    ><PlusOutlined /> Thêm mới</Button>
                </span>
            </div>
        )
    }
    return (
        <div style={{padding: "55px 30px 30px 30px"}}>
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

            <ProjectDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
        </div>
    )
}

export default ProjectManagement;