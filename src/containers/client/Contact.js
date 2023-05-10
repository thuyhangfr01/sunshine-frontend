import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

import "./ContactStyle.scss";
import ContactDec from "../../assets/images/contact_dec.png";
import ContactLeftDec from "../../assets/images/contact_left_dec.png";

function Contact(){
    return (
        <div id="contact" className="contact-us section" style={{fontFamily: 'Montserrat, sans-serif'}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="section-heading">
                            <h2>Để lại  <em>lời nhắn</em> cho <span>SUNSHINE</span></h2>
                            <div id="map">
                                <iframe src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                                 width="100%" height="360px"  frameBorder="0" style={{border:0}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                            </div>
                            <div className="info">
                                <span><FontAwesomeIcon icon={faPhone} /><a href="#">(+84) 0765 700 007<br/>(+84) 0905 003 330</a></span>
                                <span><FontAwesomeIcon icon={faEnvelope} /><a href="#">yoursunshine@gmail.com<br/>sunshineute@gmail.com</a></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 align-self-center">
                        <form id="contact" action="" method="get">
                            <div className="row">
                                <div className="col-lg-12">
                                    <fieldset>
                                        <input type="name" name="name" id="name" placeholder="Họ và tên" autoComplete="on" required/>
                                    </fieldset>
                                </div>
                                <div className="col-lg-12">
                                    <fieldset>
                                        <input type="surname" name="surname" id="surname" placeholder="Số điện thoại" autoComplete="on" required/>
                                    </fieldset>
                                </div>
                                <div className="col-lg-12">
                                    <fieldset>
                                        <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Email" required=""/>
                                    </fieldset>
                                </div>
                                <div className="col-lg-12">
                                    <fieldset>
                                        <input type="text" name="website" id="website" placeholder="Địa chỉ trang web" required=""/>
                                    </fieldset>
                                </div>
                                <div className="col-lg-12">
                                    <fieldset>
                                        <button type="submit" id="form-submit" className="main-button">Gửi lời nhắn</button>
                                    </fieldset>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="contact-dec">
            <img src={ContactDec} alt=""/>
            </div>
            <div className="contact-left-dec">
            <img src={ContactLeftDec} alt=""/>
            </div> 
      </div>
    )
}

export default Contact;