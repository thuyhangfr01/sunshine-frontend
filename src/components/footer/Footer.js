import "./FooterStyle.scss";
import FooterDec from "../../assets/images/footer_dec.png";
import Logo from "../../assets/images/logo_text.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fab, faTwitter, faFacebookF, faInstagram, faTiktok} from "@fortawesome/free-brands-svg-icons";

function Footer(){
    return (
        <>
            <div class="footer-dec">
                <img src={FooterDec} alt=""/>
            </div>
            <footer>
            <div class="container" style={{fontFamily: 'Montserrat, sans-serif'}}>
                <div class="row">
                    <div class="col-lg-3">
                        <div class="about footer-item">
                            <div class="logo">
                                <a href="#"><img src={Logo} alt="Onix Digital TemplateMo"/></a>
                            </div>
                            <a href="#">yoursunshine@gmail.com</a>
                            <ul>
                                <li><a href="#"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                                <li><a href="#"><FontAwesomeIcon icon={faTiktok} /></a></li>
                                <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="services footer-item">
                            <h4>CHƯƠNG TRÌNH</h4>
                            <ul>
                                <li><a href="#">Trợ giúp y tế</a></li>
                                <li><a href="#">Trợ giúp suất ăn giá rẻ</a></li>
                                <li><a href="#">Cứu trợ khẩn cấp</a></li>
                                <li><a href="#">Giáo dục và dạy nghề</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="community footer-item">
                            <h4>HƯỚNG DẪN VÀ GIỚI THIỆU</h4>
                            <ul>
                            <li><a href="#">Hướng dẫn đóng góp</a></li>
                            <li><a href="#">Giới thiệu</a></li>
                            <li><a href="#">Liên hệ</a></li>
                            <li><a href="#">Quy chế</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="subscribe-newsletters footer-item">
                            <h4>LIÊN HỆ VỚI CHÚNG TÔI</h4>
                            <p>Nếu có bất cứ yêu cầu nào, hãy gửi cho chúng tôi!</p>
                            <form action="#" method="get">
                                <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Email của bạn" required=""/>
                                <button type="submit" id="form-submit" class="main-button "><i class="fa fa-paper-plane-o"></i></button>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="copyright">
                            <p>Copyright © 2021 QUỸ TỪ THIỆN SUNSHINE Co., Ltd. All Rights Reserved. 
                            <br/>
                            Thực hiện bởi <a rel="nofollow" href="https://templatemo.com" title="free CSS templates">CAO THỊ THÚY HẰNG</a></p>
                        </div>
                    </div>
                </div>
            </div>
            </footer>
        </>
    )
}

export default Footer;