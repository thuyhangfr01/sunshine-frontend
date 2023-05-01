import Pagination from "@material-ui/lab/Pagination";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Project.scss";
import ProjectDataService from "../services/project.service";
import TypeDataService from "../services/type.service";
import {retrieveProjects, retrieveStatus } from "../slices/projects";
import {retrieveTypes} from "../slices/types"
import { Link } from "react-router-dom";

const ProjectList = () => {
    const [projects, setProjects] = useState([])
    // const [types, setTypes] = useState([])
    const [currentProject, setCurrentProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    // const [searchType, setSearchType] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(6);

    const pageSizes =[6,9,12,15];

    const types = useSelector((state) => state.types);
    const dispatch = useDispatch();
    const initFetch = useCallback(() => {
        dispatch(retrieveTypes());
      }, [dispatch])
    
      useEffect(() => {
        initFetch()
      }, [initFetch])
    
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
                const {projects, totalPages} = response.data;

                setProjects(projects);
                setCount(totalPages);

                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(retrieveProjects, [page, pageSize]);

    const refreshList = () => {
        retrieveProjects();
        setCurrentProject(null);
        setCurrentIndex(-1);
    };

    const setActiveProject = (project, index) => {
        setActiveProject(project);
        setCurrentIndex(index);
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    }

    return (
        <div style={{fontFamily: 'Montserrat, sans-serif'}}>
            <div class="projects section" id="projects">
                <div class="container" style={{marginTop: "30px"}}>
                    <div class="container-title">
                        <div class="section-heading row">
                            <div className='col-12'>
                                <h2 >Những dự án từ thiện của <em>SUN</em><span>SHINE</span></h2>
                                <div class="line-dec"></div>
                                <p>Từ nhiều năm nay, Quỹ Từ thiện Sunshine đã và đang tiếp tục thực hiện dự án Trợ giúp y tế. Mong muốn giúp đỡ những bệnh nhân nghèo có thêm kinh phí điều trị, vượt qua phần nào khó khăn trong cuộc sống. </p>
                                </div>
                            <div className='section-line col-12'></div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchName}
                            onChange={onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={retrieveProjects}>
                            Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container row" style={{margin: "0px auto", paddingTop: "80px"}}>
                    <div className="col-2" style={{witdh: "20% !important"}}>
                        <div class="types-container">
                            <h6 class="types-text">Loại dự án</h6> 
                            <ul class="list-group">
                                <li class="list-group-item"><i class="fas fa-male text-info mx-2"></i>Hỗ trợ y tế</li>
                                <li class="list-group-item"><i class="fas fa-male text-info mx-2"></i>Hỗ trợ dịch COVID</li>
                            </ul>
                        </div>
                        <div class="types-container">
                            <h6 class="types-text">Trạng thái dự án</h6> 
                            <ul class="list-group">
                                <li class="list-group-item"><i class="fas fa-male text-info mx-2"></i>Đang vận động</li>
                                <li class="list-group-item"><i class="fas fa-venus text-warning mx-2"></i>Đang triển khai</li>
                                <li class="list-group-item"><i class="fas fa-gavel text-danger mx-2"></i> Đã hoàn thành</li>
                            </ul>
                        </div>
                    </div>
                    <div className='project-list col-10'>
                        {projects && projects.map((project, index) => (
                        <div className='project-card'>
                            <div className='project-img-card'>
                                <img className='project-img' src="https://res.cloudinary.com/dp0hbi49d/image/upload/v1682429430/sunshine/tn_covid4_zl9lgi.jpg"></img>
                                {(() => {
                                    if (project.statusName === "Đang vận động" ) {
                                    return (
                                        <>
                                            <p className='status-hover-pending'>{project.statusName}</p>
                                            <p className='line-pending'></p>
                                        </>
                                    )
                                    } else if (project.statusName === "Đã hoàn thành") {
                                    return (
                                        <>
                                            <p className='status-hover-success'>{project.statusName}</p>
                                            <p className='line-success'></p>
                                        </>
                                    )
                                    } else {
                                    return (
                                        <>
                                            <p className='status-hover-cancelable'>{project.statusName}</p>
                                            <p className='line-cancelable'></p>
                                        </>
                                    )
                                    }
                                })()}
                        </div>
                        <div className='project-content'>
                            <p className='project-title'>{project.projName}</p>
                            <div className='project-description'>
                                <p>{project.details}</p>
                            </div>
                            <p className='project-amountRequest'><span>Cần huy động:</span> 10.000.000 VND</p>
                            <p className='project-amountReceipt'><span>Tiền góp được:</span> 8.000.000 VND</p>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                    style={{width: "75%"}}></div>
                            </div>
                            {(() => {
                                if (project.status === "Đang vận động" ) {
                                return (
                                    <>
                                        <button type="button" className="btn btn-danger">Đóng góp</button>
                                    </>
                                )
                                } else{
                                return (
                                    <>
                                        <button type="button" className="btn btn-success">Xem chi tiết</button>
                                    </>
                                )
                                } 
                            })()}
                            </div>
                        </div>  
                        ))}    
                    </div>
                    <div className="mt-3">
                        {"Items per Page: "}
                        <select onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                            {size}
                            </option>
                        ))}
                        </select>

                        <Pagination
                        className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectList;