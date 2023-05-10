import React, { useState, useEffect } from "react";
import {Table, Tag, Button} from "antd";
import {DeleteFilled, ImportOutlined, ExportOutlined, PlusOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import ProjectDataService from "../../../services/project.service";
import ProjectDetail from "./ProjectDetail";
import ProjectAdd from "./ProjectAdd";

const ProjectManagement = () => {
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState([]);
    const [openViewAddProject, setOpenViewAddProject] = useState(false);
    
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
                <Link onClick={() => {
                    setDataViewDetail(record);
                    setOpenViewDetail(true);
                }}>{text}
                </Link>
            )
          }
        },
        {
          title: 'Loại dự án',
          dataIndex: ['projectType', 'name'],
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
            title: 'Thao tác',
            key: 'action',
            render: (text, record, index) => {
              return (
                <>
                    <DeleteFilled style={{color: "#a50f0f", fontSize: 16, paddingLeft: "25px"}}/>
                </>
              )
            },
          },
      ];
    const [dataSource, setDataSource] = useState([]);

    const getLatestProject = () => {
        ProjectDataService.getLatestProject()
            .then(response => {
                setDataSource(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }

    useEffect(getLatestProject, []);

    const renderHeader = () => {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span>Danh sách dự án</span>
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
            <Table className="project-artifact" columns={columns} dataSource={dataSource}
                title={renderHeader}
                style={{marginTop: 20}}
                pagination={{
                    pageSize: 8,
                    onChange(current) {
                        setPage(current);
                    }
                }}/>

            <ProjectAdd
                openViewAddProject={openViewAddProject}
                setOpenViewAddProject={setOpenViewAddProject}
                getLatestProject={getLatestProject}
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