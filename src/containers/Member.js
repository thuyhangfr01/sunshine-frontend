import "./MemberStyle.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fab, faTwitter, faFacebookF, faInstagram, faTiktok} from "@fortawesome/free-brands-svg-icons";
import Team4 from "../assets/images/team4.jpg"
import Ava1 from "../assets/images/ava1.jpg"
import TablesLeft from "../assets/images/tables_left_dec.png";
import TablesLRight from "../assets/images/tables_right_dec.png";

function Member(){
    return (
        <div class="container-xxl" style={{fontFamily: 'Montserrat, sans-serif'}}>
                <div class="tables-left-dec">
                    <img src={TablesLeft} alt=""/>
                </div>
                <div class="tables-right-dec">
                    <img src={TablesLRight} alt=""/>
                </div>
            <div class="container">
                <div class="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "500px"}}>
                    <h2>Những người tạo nên <em>SUN</em><span>SHINE</span></h2>
                    <p class="fw">Những mảng màu tạo nên một bức tranh diệu kỳ của Sunshine</p>
                </div>
                <div class="row g-4">
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="team-item rounded overflow-hidden pb-4">
                            <img class="img-fluid mb-4" src={Ava1} alt=""/>
                            <h5>Bà <b>Nguyễn Minh Anh</b></h5>
                            <span>Nhóm chăm sóc Qũy Sunshine</span>
                            <ul class="team-social">
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faTwitter} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faTiktok} /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div class="team-item rounded overflow-hidden pb-4">
                            <img class="img-fluid mb-4" src={Ava1} alt=""/>
                            <h5>Bà <b>Cao Thị Thúy Hằng</b></h5>
                            <span>Quản lý Qũy Sunshine</span>
                            <ul class="team-social">
                            <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faTwitter} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faTiktok} /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div class="team-item rounded overflow-hidden pb-4">
                            <img class="img-fluid mb-4" src={Ava1} alt=""/>
                            <h5>Ông <b>Lưu Mạnh Ninh</b></h5>
                            <span class="text-primary">Quản lý Qũy Sunshine</span>
                            <ul class="team-social">
                            <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faTwitter} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faTiktok} /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                        <div class="team-item rounded overflow-hidden pb-4">
                            <img class="img-fluid mb-4" src={Ava1} alt=""/>
                            <h5>Bà <b>Nguyễn Thùy Mai Linh</b></h5>
                            <span class="text-primary">Kế toán trưởng Qũy Sunshine</span>
                            <ul class="team-social">
                            <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faTwitter} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
                                <li><a class="btn btn-square" href=""><FontAwesomeIcon icon={faTiktok} /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Member;