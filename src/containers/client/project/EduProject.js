import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import "./ProjectStyle.scss";
import { responsive, EduProjectItems } from './EduProjectItems';
import {findProjectByType} from "../../../slices/projects";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function EduProject(){
    const dispatch = useDispatch();
    // const getListProjects = () => {
    //     const id = 1;
    //     const page = 0; 
    //     const size = 12
    //     dispatch(findProjectByType({id, page, size}))
    //     .then((res) => {
    //         console.log(">>> res: " + JSON.stringify(res));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }
    // useEffect(getListProjects, []);

    return (
        <div style={{fontFamily: 'Montserrat, sans-serif'}}>
            <div className="projects-section" id="projects">
                <div className="container" style={{marginTop: "-30px"}}>
                    <div className="container-title">
                        <div className="section-heading row">
                            <div className='col-9'>
                                <h2 >Những dự án hỗ trợ <em>Giáo</em><span> Dục</span></h2>
                                <div className="line-dec"></div>
                                <p>Trẻ em cần một môi trường giáo dục tốt để phát triển và Qũy từ thiện Sunshine đang ngày một đồng hành cùng các em nhỏ, trao tặng những suất học bổng đến các em.</p>
                                </div>
                            <div className='col-3'>
                                <button className='btn btn-outline-danger btn-madical col-5' style={{
                                    marginLeft: "385px !important",
                                    marginTop: "55px !important",
                                    fontWeight: "600",
                                    padding: "10px"
                                }}>Đóng góp</button>
                            </div>
                            <div className='section-line col-12'></div>
                        </div>
                    </div>
                </div>
                <Carousel responsive={responsive} 
                    additionalTransfrom={0}
                    arrows
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable>
                        {EduProjectItems.map((project, index) =>{
                            return(
                            <div key={index} className='card-project'>
                                <div className='card-img'>
                                    <img className='img-project' src={project.imageurl}></img>
                                    {(() => {
                                        if (project.status === "Đang vận động" ) {
                                        return (
                                            <>
                                                <p className='status-hover-pending'>{project.status}</p>
                                                <p className='line-pending'></p>
                                            </>
                                        )
                                        } else if (project.status === "Đã hoàn thành") {
                                        return (
                                            <>
                                                <p className='status-hover-success'>{project.status}</p>
                                                <p className='line-success'></p>
                                            </>
                                        )
                                        } else {
                                        return (
                                            <>
                                                <p className='status-hover-cancelable'>{project.status}</p>
                                                <p className='line-cancelable'></p>
                                            </>
                                        )
                                        }
                                    })()}
                                </div>
                                <div className='content'>
                                    <p className='title'>{project.title}</p>
                                    <div className='box-description'>
                                        <p>{project.description}</p>
                                    </div>
                                    <p className='amountRequest'><span>Cần huy động:</span> {project.tienCanGoi}</p>
                                    <p className='amountReceipt'><span>Tiền góp được:</span> {project.tienNhanDuoc}</p>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                            style={{width: project.progressBar}}></div>
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
                            )
                        })}
                </Carousel>;
            </div>
        </div>
    )
}

export default EduProject;