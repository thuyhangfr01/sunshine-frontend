import Pagination from "@material-ui/lab/Pagination";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import ProjectDataService from "../services/project.service";
import { retrieveStatus } from "../slices/status";
import { retrieveTypes } from "../slices/types";

import BeatLoader from "react-spinners/BeatLoader";
import "./Project.scss";
import {Row, Col} from "antd";

const ProjectList = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [loadingProject, setLoadingProject] = useState(true);

    const [projects, setProjects] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const pageSizes =[6,9,12,15];

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
    const getRequestParamsType = (id, page, pageSize) => {
        let params = {};
        if(id){
            params["id"] = id;
        }
        if(page){
            params["page"] = page - 1;
        }
        if(pageSize){
            params["size"] = pageSize;
        }
        return params;
    }
    
    const handleFilterByType = (id) => {
        setLoadingProject(true);
        setTypeId(id);
    }

    const findByTypeId = () => {
        const params = getRequestParamsType(typeId, page, pageSize);
        ProjectDataService.findByType(params)
            .then((response) => {
                const {projects, totalPages} = response.data;

                setLoadingProject(false);
                setProjects(projects);
                setCount(totalPages);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
                setLoadingProject(true);
            })
    }

    useEffect(findByTypeId, [typeId, page, pageSize]);

    //lay tham so loc theo status
    const getRequestParamsStatus = (id, page, pageSize) => {
        let params = {};
        if(id){
            params["id"] = id;
        }
        if(page){
            params["page"] = page - 1;
        }
        if(pageSize){
            params["size"] = pageSize;
        }
        return params;
    }
    
    const handleFilterByStatus = (id) => {
        setLoadingProject(true);
        setStatusId(id);
    }

    const findByStatusId = () => {
        const params = getRequestParamsStatus(statusId, page, pageSize);
        ProjectDataService.findByStatus(params)
            .then((response) => {
                const {projects, totalPages} = response.data;

                setLoadingProject(false);
                setProjects(projects);
                setCount(totalPages);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
                setLoadingProject(true);
            })
    }

    useEffect(findByStatusId, [statusId, page, pageSize]);

    //lay gia tri trong o tim kiem
    const onChangeSearchName = (e) => {
        // setLoading(true);
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
                const {projects, totalPages} = response.data;

                setLoading(false);
                setProjects(projects);
                setCount(totalPages);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
                setLoading(true);
            })
    }

    useEffect(retrieveProjects, [searchName, page, pageSize]);

    const handlePageChange = (event, value) => {
        setLoading(true);
        setPage(value);
    }

    const handlePageSizeChange = (event) => {
        setLoading(true);
        setPageSize(event.target.value);
        setPage(1);
    }

    const handleSubmit = (id) => {
        navigate("/project/" + id);
    }

    return (
        <div style={{fontFamily: 'Montserrat, sans-serif'}}>
            {loading ? 
                <div style={{height: 300}}>
                    <BeatLoader
                        color="#17709b"
                        loading={loading}
                        size={15}
                        cssOverride={{marginLeft: "50%", marginTop: "20%"}}
                    ></BeatLoader> 
                </div>
            : 
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
                            <Col span={6} style={{fontFamily: "Montserrat"}}>
                                <div style={{float: "right"}}>
                                    <div style={{display: "flex"}}>
                                        <p style={{fontSize: 15, fontWeight: 500, color: "#4773b5"}}>Số dự án:</p>
                                        <select onChange={handlePageSizeChange} value={pageSize}
                                            style={{
                                                height: 30, width: 50, textAlignLast: "center", color: "#084298", fontWeight: "600", border: "1px solid #2f74b5", borderRadius: 5
                                            }}>
                                            {pageSizes.map((size) => (
                                                <option key={size} value={size}>
                                                {size}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <Pagination
                                    count={count}
                                    page={page}
                                    siblingCount={1}
                                    boundaryCount={1}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handlePageChange}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="container row" style={{margin: "0px auto", paddingTop: "30px"}}>
                        <div className="col-2" style={{witdh: "20% !important"}}>
                            <div className="types-container">
                                <h6 className="types-text">Loại dự án</h6> 
                                <ul className="list-group">
                                    {typesList.map((type) => (
                                        <li key={type.id} className="list-group-item"
                                            onClick={() => handleFilterByType(type.id)}
                                        ><i className="fas fa-male text-info mx-2"></i>{type.name}</li>
                                    ))}
                                    {/* <li className="list-group-item"><i className="fas fa-male text-info mx-2"></i>Hỗ trợ y tế</li>
                                    <li className="list-group-item"><i className="fas fa-male text-info mx-2"></i>Hỗ trợ dịch COVID</li> */}
                                </ul>
                            </div>
                            <div className="types-container">
                                <h6 className="types-text">Trạng thái dự án</h6> 
                                <ul className="list-group">
                                    {statusList.map((status) => (
                                        <li key={status.id} className="list-group-item"
                                            onClick={() => handleFilterByStatus(status.id)}
                                        ><i className="fas fa-male text-info mx-2"></i>{status.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='project-list col-10'>
                                {loadingProject ? 
                                <span className="spinner-border spinner-border-sm" style={{marginLeft: "10px"}}></span>
                                :
                                    <>
                                        {projects && projects.map((project, index) => (
                                        <div key={index} className='project-card'>
                                            <div className='project-img-card'>
                                                <img className='project-img' src={project.projectImages[0].name}/>
                                                {(() => {
                                                    if (project.projectStatus.name === "Đang vận động" ) {
                                                    return (
                                                        <>
                                                            <p className='status-hover-pending'>{project.projectStatus.name}</p>
                                                            <p className='line-pending'></p>
                                                        </>
                                                    )
                                                    } else if (project.projectStatus.name === "Đã hoàn thành") {
                                                    return (
                                                        <>
                                                            <p className='status-hover-success'>{project.projectStatus.name}</p>
                                                            <p className='line-success'></p>
                                                        </>
                                                    )
                                                    } else {
                                                    return (
                                                        <>
                                                            <p className='status-hover-cancelable'>{project.projectStatus.name}</p>
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
                                                <p className='project-amountReceipt'><span>Tiền góp được:</span> 8.000.000 VND</p>
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
                                    </>
                                }
                            
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProjectList;