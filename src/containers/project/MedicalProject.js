import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import "./ProjectStyle.scss";
import { responsive, MedicalProjectItems } from './MedicalProjectItems';
import Covid3 from "../../assets/images/tn_covid3.jpeg";
import ProjectRight from "../../assets/images/projects_right_dec.png";

function MedicalProject(){
    return (
        <div style={{fontFamily: 'Montserrat, sans-serif'}}>
            <div className="projects section" id="projects">
                <div className="container" style={{marginTop: "-30px"}}>
                    <div className="container-title">
                        <div className="section-heading row">
                            <div className='col-9'>
                                <h2 >Những dự án trợ giúp <em>Y</em><span> TẾ</span></h2>
                                <div className="line-dec"></div>
                                <p>Từ nhiều năm nay, Quỹ Từ thiện Sunshine đã và đang tiếp tục thực hiện dự án Trợ giúp y tế. Mong muốn giúp đỡ những bệnh nhân nghèo có thêm kinh phí điều trị, vượt qua phần nào khó khăn trong cuộc sống. </p>
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
                        {MedicalProjectItems.map((project, index) =>{
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

export default MedicalProject;