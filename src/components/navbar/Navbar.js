import { Component, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

import "./NavbarStyle.scss"
import { MenuItems } from "./MenuItems";
// import LogoTextMin from "./../../assets/images/logo_text_min45.png"
import LogoCut from "./../../assets/images/logo_cut2.png"

export function Navbar() {
    const[fix, setFix] = useState(false)

    function setFixed(){
        if(window.scrollY >= 200){
            setFix(true)
        } else{
            setFix(false)
        }
    }

    window.addEventListener("scroll", setFixed)
        return(
            <div style={{fontFamily: 'Montserrat, sans-serif', position: "relative"}}>
                <div className="container-fluid text-white d-none d-lg-flex" style={{background: 'linear-gradient(90deg, #ff4955, #673ab7)', height: '32px'}}>
                    <div className="container">
                        <div className="d-flex align-items-center" style={{marginTop: "5px"}}>
                                <small style={{fontWeight: "500", marginRight: "40px"}}>
                                    <i className="me-2"><FontAwesomeIcon className="form-icon-left" icon={faPhone} /></i>
                                    <span>Liên hệ:</span>
                                    <i className="fa fa-map-marker-alt me-2"></i>(+84) 765 700 007</small>
                                <small style={{fontWeight: "500"}}>
                                    <i className="me-2"><FontAwesomeIcon className="form-icon-left" icon={faEnvelope} /></i>
                                    <span>Email:</span>
                                    <i className="fa fa-envelope me-2"></i>yoursunshine@gmail.com</small>
                            <div className="ms-auto d-flex align-items-center" style={{fontWeight: "500"}}>
                                <a className="btnAuth" href="/" style={{marginRight: "7px"}}>Đăng nhập </a> / 
                                <a className="btnAuth" href="/" style={{marginLeft: "7px"}}> Đăng ký</a>
                            </div>
                        </div>
                    </div>
                </div>
                <header className={fix ? 'header-area fixed wow slideInDown' : 'header-area'} data-wow-duration="0.75s" data-wow-delay="0s" 
                    style={{fontFamily: 'Montserrat, sans-serif', fontSize: "14px"}}>
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <nav class="main-nav">
                                    <a href="index.html" class="logo">
                                        <img src={LogoCut} style={{ heigh: "60px !important"}}/>
                                    </a>
                                    <ul class="nav">
                                        {MenuItems.map((item, index) => {
                                        return(
                                            <li key={index} className={item.cName} >
                                                <Link to={item.url}>
                                                    {item.title}
                                                </Link>
                                            </li>
                                            )
                                        })}
                                    </ul>  
                                </nav>
                            </div>
                        </div>
                    </div>
                </header> 
            </div>
        )
}