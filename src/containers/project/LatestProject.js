import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import "./ProjectStyle.scss";
import { responsive, LatestProjectItems } from './LatestProjectItems';
import Covid3 from "../../assets/images/tn_covid3.jpeg";
import ProjectRight from "../../assets/images/projects_right_dec.png";

function LatestProject(){
    return (
        <div style={{fontFamily: 'Montserrat, sans-serif'}}>
            <div class="projects section" id="projects">
                <div class="videos-right-dec">
                    <img src={ProjectRight} style={{  
                        width: "730px",
                        height: "523px",
                        right: "40px",
                        top: "1500px",
                        position: "absolute"}} alt=""/>
                </div>
                <div class="container">
                    <div class="container-title">
                        <div class="section-heading">
                            <h2>Những dự án <em>Mới</em><span> Nhất</span></h2>
                                <div class="line-dec"></div>
                            <p>Đồng hành cùng Sunshine để mang những dự án thiện nguyện đến gần hơn với cộng đồng!</p>
                        </div>
                    </div>
                </div>
                <Carousel responsive={responsive} 
                     additionalTransfrom={0}
                     arrows={false}
                    // autoPlay
                    //  autoPlaySpeed={2500}
                     centerMode={false}
                     className=""
                     containerClass="container-padding-bottom"
                     dotListClass=""
                     draggable
                     focusOnSelect
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
                    showDots
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable>
                        {LatestProjectItems.map((project) =>{
                            return(
                                <div className='card-project'>
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
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-striped " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
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

export default LatestProject;