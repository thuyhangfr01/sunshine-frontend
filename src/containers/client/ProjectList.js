import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import ProjectDataService from "../../services/project.service";
import { retrieveStatus } from "../../slices/status";
import { retrieveTypes } from "../../slices/types";
import {retrieveProjects} from "../../slices/projects";
import "./Project.scss";
import {Row, Col, Divider, Pagination} from "antd";
import moment from "moment";
import vi from "moment/locale/vi";

const ProjectList = () => {
    let navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [totalItems, setTotalItems] = useState(6);

    const typesList = useSelector((state) => state.types);
    const [typeId, setTypeId] = useState(-1);
    const statusList = useSelector((state) => state.status);
    const [statusId, setStatusId] = useState(-1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveTypes());
        dispatch(retrieveStatus());
    }, [])

    //lay tham so loc theo type
    // const getRequestParamsType = (id, page, pageSize) => {
    //     let params = {};
    //     if(id){
    //         params["id"] = id;
    //     }
    //     if(page){
    //         params["page"] = page - 1;
    //     }
    //     if(pageSize){
    //         params["size"] = pageSize;
    //     }
    //     return params;
    // }
    
    // const handleFilterByType = (id) => {
    //     setTypeId(id);
    // }

    // const findByTypeId = () => {
    //     const params = getRequestParamsType(typeId, page, pageSize);
    //     ProjectDataService.findByType(params)
    //         .then((response) => {
    //             const {projects, totalPages, totalItems} = response.data;
    //             // setLoadingProject(false);
    //             setProjects(projects);
    //             setCount(totalPages);
    //             setTotalItems(totalItems);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         })
    // }

    // useEffect(findByTypeId, [typeId, page, pageSize]);

    //lay tham so loc theo status
    // const getRequestParamsStatus = (id, page, pageSize) => {
    //     let params = {};
    //     if(id){
    //         params["id"] = id;
    //     }
    //     if(page){
    //         params["page"] = page - 1;
    //     }
    //     if(pageSize){
    //         params["size"] = pageSize;
    //     }
    //     return params;
    // }
    
    // const handleFilterByStatus = (id) => {
    //     setStatusId(id);
    // }

    // const findByStatusId = () => {
    //     const params = getRequestParamsStatus(statusId, page, pageSize);
    //     ProjectDataService.findByStatus(params)
    //         .then((response) => {
    //             const {projects, totalPages, totalItems} = response.data;
    //             setProjects(projects);
    //             setCount(totalPages);
    //             setTotalItems(totalItems);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         })
    // }

    // useEffect(findByStatusId, [statusId, page, pageSize]);

    //lay gia tri trong o tim kiem
    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    //lay tham so tim kiem
    const getRequestParams = (searchName, page, pageSize) => {
        let params = {};
        if(searchName){
            params["name"] = searchName;
        }
        if(page){
            params["page"] = page - 1;
        }
        if(pageSize){
            params["size"] = pageSize;
        }
        return params;
    }

    //bat su kien onClick nut tim kiem
    const retrieveProjects = () => {
        const params = getRequestParams(searchName, page, pageSize);
        ProjectDataService.getAll(params)
            .then((response) => {
                console.log(">>>> haiza: " + JSON.stringify(response.data.projects))
                const {totalPages, totalItems} = response.data;
                setProjects(response.data.projects);
                setCount(totalPages);
                setTotalItems(totalItems);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(retrieveProjects, [searchName, page, pageSize]);

    const handlePageChange = (pageNumber, pageSize) => {
        console.log('Page number:', pageNumber);
        console.log('Page size:', pageSize);
        setPage(pageNumber);
    }

    const handleSubmit = (id) => {
        navigate("/project/" + id);
    }

    return (
        <div style={{fontFamily: 'Montserrat, sans-serif'}}>
                <div className="projects section" id="projects">
                    <div className="container" style={{marginTop: "30px"}}>
                        <div className="container-title">
                            <div className="section-heading row">
                                <div className='col-12'>
                                    <h2 >Những dự án từ thiện của <em>SUN</em><span>SHINE</span></h2>
                                    <div className="line-dec"></div>
                                    <p>Từ nhiều năm nay, Quỹ Từ thiện Sunshine đã và đang tiếp tục thực hiện dự án Trợ giúp y tế. Mong muốn giúp đỡ những bệnh nhân nghèo có thêm kinh phí điều trị, vượt qua phần nào khó khăn trong cuộc sống. </p>
                                    </div>
                                <div className='section-line col-12'></div>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{paddingLeft: 30, paddingTop: 30}}>
                        <Row>
                            <Col span={18}>
                                <div className="input-group" style={{fontFamily: "Montserrat"}}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm tên dự án bạn muốn..."
                                        value={searchName}
                                        onChange={onChangeSearchName}
                                        style={{fontSize: 15, fontWeight: 400, borderRadius: 5, border: "1px solid #e1e1e1", marginRight: 7}}
                                    />
                                    <div className="input-group-append">
                                        <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={retrieveProjects}
                                        style={{fontSize: 15, fontWeight: 500, border: "none", backgroundColor: "#4773b5"}}>
                                        Search
                                        </button>
                                    </div>
                                </div>
                            </Col>
                            <Col span={6} style={{fontFamily: "Montserrat", marginTop: 8}}>
                                <div style={{ display: "flex", float: "right", marginLeft: 20}}>
                                    <Pagination defaultCurrent={page} pageSize={6} total={totalItems} onChange={handlePageChange}  />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="container" style={{paddingTop: 50}}>
                        <Row>
                            <Col span={20}>
                                <div className='project-list' style={{marginLeft: "-22px"}}>
                                    {projects && projects.map((project, index) => (
                                    <div key={index} className='project-card'>
                                        <div className='project-img-card'>
                                            <img className='project-img' src={project.projectImages[0].name}/>
                                            {(() => {
                                                if (project.projectStatus.name === "Đang vận động" ) {
                                                return (
                                                    <>
                                                        <p className='status-hover-pending' style={{width: "312px !important"}}>{project.projectStatus.name}</p>
                                                        <p className='line-pending'></p>
                                                    </>
                                                )
                                                } else if (project.projectStatus.name === "Đã hoàn thành") {
                                                return (
                                                    <>
                                                        <p className='status-hover-success' style={{width: "312px !important"}}>{project.projectStatus.name}</p>
                                                        <p className='line-success'></p>
                                                    </>
                                                )
                                                } else {
                                                return (
                                                    <>
                                                        <p className='status-hover-cancelable' style={{width: "312px !important"}}>{project.projectStatus.name}</p>
                                                        <p className='line-cancelable'></p>
                                                    </>
                                                )
                                                }
                                            })()}
                                        </div>
                                        <div className='project-content'>
                                            <p className='project-title'>{project.name}</p>
                                            <div className='project-description'>
                                                <p>{project.details}</p>
                                            </div>
                                            <p className='project-amountRequest'><span>Cần huy động:
                                                </span> {project.projectMonies.map(money => money.minMoney).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                                            <p className='project-createdAt'><span>Thời gian đăng:</span>{moment(project.createdAt).locale("vi", vi).format("DD-MM-YYYY HH:mm")}</p>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-striped " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                    style={{width: "75%"}}></div>
                                            </div>
                                            {(() => {
                                                if (project.projectStatus.name=== "Đang vận động" ) {
                                                return (
                                                    <>
                                                        <button type="button" className="btn btn-danger"
                                                            onClick={()=>handleSubmit(project.id)}
                                                        >Đóng góp</button>
                                                    </>
                                                )
                                                } else{
                                                return (
                                                    <>
                                                        <button type="button" className="btn btn-success"
                                                            onClick={()=>handleSubmit(project.id)}>Xem chi tiết</button>
                                                    </>
                                                )
                                                } 
                                            })()}
                                            </div>
                                        </div>  
                                    ))}  
                                </div>
                            </Col>
                            <Divider type="vertical" style={{height: "1150px", marginLeft: "-50px", marginRight: "40px"}}></Divider>
                            <Col span={4}>
                                <div>
                                    <div className="types-container">
                                        <h6 className="types-text">Loại dự án</h6> 
                                        <ul className="list-group" style={{marginTop: 15}}>
                                            {/* {typesList.map((type) => ( */}
                                                <li className="list-group-item"><i className="fas fa-male text-info mx-2"></i><span>&rsaquo;</span> Hỗ trợ giáo dục</li>
                                                <li className="list-group-item"><i className="fas fa-male text-info mx-2"></i><span>&rsaquo;</span> Hỗ trợ y tế</li>
                                                <li className="list-group-item"><i className="fas fa-male text-info mx-2"></i><span>&rsaquo;</span> Suất ăn giá rẻ</li>
                                                <li className="list-group-item"><i className="fas fa-male text-info mx-2"></i><span>&rsaquo;</span> Cứu trợ khẩn cấp</li>
                                                <li className="list-group-item"><i className="fas fa-male text-info mx-2"></i><span>&rsaquo;</span> Hỗ trợ người nghèo</li>
                                        </ul>
                                    </div>
                                    <div className="types-container" style={{marginTop: 30}}>
                                        <h6 className="types-text">Trạng thái dự án</h6> 
                                        <ul className="list-group" style={{marginTop: 15}}>
                                                <li className="list-group-item" ><i className="fas fa-male text-info mx-2"></i><span>&rsaquo;</span> Đang vận động</li>
                                                <li className="list-group-item" ><i className="fas fa-male text-info mx-2"></i><span>&rsaquo;</span> Đang triển khai</li>
                                                <li  className="list-group-item" ><i className="fas fa-male text-info mx-2"></i><span>&rsaquo;</span> Đã hoàn thành</li>
                                                <li  className="list-group-item" ><i className="fas fa-male text-info mx-2"></i><span>&rsaquo;</span> Đã tạm hoãn</li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
        </div>
    )
}

export default ProjectList;