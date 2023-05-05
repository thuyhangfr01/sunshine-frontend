import "./AboutStyle.scss";
import AboutUs from "./../assets/images/about.jpg";
import AboutIcon1 from "./../assets/images/about_icon1.png";
import AboutIcon2 from "./../assets/images/about_icon2.png";
import AboutIcon3 from "./../assets/images/about_icon3.png";
import AboutRight from "./../assets/images/about_right.png";
import AboutLeft from "./../assets/images/about_left.png";

function About(){
    return (
        <div id="about" className="about-us section">
            <div className="services-right-dec">
                <img src={AboutRight} alt=""
                style={{  width: "200px",
                    height: "200px",
                    right: "3px",
                    bottom: "3055px",
                    position: "absolute",
                    zIndex: "1"}}/>
            </div>
            <div className="container" style={{fontFamily: 'Montserrat, sans-serif'}}>
                <div className="services-left-dec">
                    <img src={AboutLeft} 
                        style={{  width: "240px",
                            height: "410px",
                            left: "-70px",
                            top: "1125px",
                            position: "absolute",
                            zIndex: "1"}}
                        alt=""/>
                </div>
                <div className="row" >
                    <div className="col-lg-6 align-self-center">
                        <div className="left-image">
                            <img src={AboutUs} alt="Two Girls working together"/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="section-heading">
                            <h2>Giới thiệu về <em>SUN</em><span>SHINE</span></h2>
                            <p>Quỹ Từ thiện Sunshine (gọi tắt là Quỹ Sunshine) là Quỹ Từ thiện tư nhân được thành lập theo Quyết định số: 24/QĐ-BNV do Bộ Nội vụ cấp phép ngày 5 tháng 1 năm 2020. Quỹ Bông Sen là phiên bản mở rộng của Quỹ Từ thiện Tình Thương thành phố Đà Nẵng được thành lập qua Quyết Định 2267/QĐ-UBND của Ủy ban nhân dân thành phố Đà Nẵng cấp ngày 5 tháng 5 năm 2015.</p>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="fact-item">
                                        <div className="count-area-content">
                                            <div className="icon">
                                                <img src={AboutIcon1} alt=""/>
                                            </div>
                                            <div className="count-digit">15M</div>
                                            <div className="count-title">Tổng số tiền quyên góp</div>
                                            <p>Từ mạnh thường quân</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="fact-item">
                                        <div className="count-area-content">
                                            <div className="icon">
                                                <img src={AboutIcon2}  alt=""/>
                                            </div>
                                            <div className="count-digit">15</div>
                                            <div className="count-title">Dự án đã, đang triển khai</div>
                                            <p>Lĩnh vực y tế, giáo dục,...</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="fact-item">
                                        <div className="count-area-content">
                                            <div className="icon">
                                                <img src={AboutIcon3}  alt=""/>
                                            </div>
                                            <div className="count-digit"> 18</div>
                                            <div className="count-title">Tổ chức, cá nhân tài trợ</div>
                                            <p>Trên khắp cả nước</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;