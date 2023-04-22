import "./AboutStyle.scss";
import AboutUs from "./../assets/images/about.jpg";
import AboutIcon1 from "./../assets/images/about_icon1.png";
import AboutIcon2 from "./../assets/images/about_icon2.png";
import AboutIcon3 from "./../assets/images/about_icon3.png";
import AboutRight from "./../assets/images/about_right.png";
import AboutLeft from "./../assets/images/about_left.png";

function About(){
    return (
        <div id="about" class="about-us section">
            <div class="services-right-dec">
                <img src={AboutRight} alt=""
                style={{  width: "200px",
                    height: "200px",
                    right: "5px",
                    bottom: "365px",
                    position: "absolute",
                    zIndex: "1"}}/>
            </div>
            <div class="container" style={{fontFamily: 'Montserrat, sans-serif'}}>
                <div class="services-left-dec">
                    <img src={AboutLeft} 
                        style={{  width: "240px",
                            height: "410px",
                            left: "-115px",
                            top: "750px",
                            position: "absolute",
                            zIndex: "1"}}
                        alt=""/>
                </div>
                <div class="row" >
                    <div class="col-lg-6 align-self-center">
                        <div class="left-image">
                            <img src={AboutUs} alt="Two Girls working together"/>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="section-heading">
                            <h2>Giới thiệu về <em>SUN</em><span>SHINE</span></h2>
                            <p>Quỹ Từ thiện Sunshine (gọi tắt là Quỹ Sunshine) là Quỹ Từ thiện tư nhân được thành lập theo Quyết định số: 24/QĐ-BNV do Bộ Nội vụ cấp phép ngày 5 tháng 1 năm 2020. Quỹ Bông Sen là phiên bản mở rộng của Quỹ Từ thiện Tình Thương thành phố Đà Nẵng được thành lập qua Quyết Định 2267/QĐ-UBND của Ủy ban nhân dân thành phố Đà Nẵng cấp ngày 5 tháng 5 năm 2015.</p>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="fact-item">
                                        <div class="count-area-content">
                                            <div class="icon">
                                                <img src={AboutIcon1} alt=""/>
                                            </div>
                                            <div class="count-digit">15M</div>
                                            <div class="count-title">Tổng số tiền quyên góp</div>
                                            <p>Từ mạnh thường quân</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="fact-item">
                                        <div class="count-area-content">
                                            <div class="icon">
                                                <img src={AboutIcon2}  alt=""/>
                                            </div>
                                            <div class="count-digit">15</div>
                                            <div class="count-title">Dự án đã, đang triển khai</div>
                                            <p>Lĩnh vực y tế, giáo dục,...</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="fact-item">
                                        <div class="count-area-content">
                                            <div class="icon">
                                                <img src={AboutIcon3}  alt=""/>
                                            </div>
                                            <div class="count-digit"> 18</div>
                                            <div class="count-title">Tổ chức, cá nhân tài trợ</div>
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