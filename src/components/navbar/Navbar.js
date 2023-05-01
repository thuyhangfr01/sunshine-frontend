import React, { Component, useState } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faAngleDown} from '@fortawesome/free-solid-svg-icons'
// import AuthService from "../services/auth.service";
import "./NavbarStyle.scss"
import { MenuItems } from "./MenuItems";
import Dropdown from './Dropdown';
import LogoCut from "./../../assets/images/logo_cut3.png"

export default function Navbar() {
    const {user: currentUser} = useSelector((state) => (state.auth));
    const[fix, setFix] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    
    const [show, setShow] = useState(false);

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
                                {currentUser ? (
                                    <span style={{fontStyle: "italic"}}>"Cảm ơn bạn đã đồng hành cùng Sunshine!"</span>
                                ) : (
                                    <>
                                        <a className="btnAuth" href="/login" style={{marginRight: "7px"}}>Đăng nhập </a> / 
                                        <a className="btnAuth" href="/register" style={{marginLeft: "7px"}}> Đăng ký</a>
                                    </>
                                )}
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
                                        <li className="scroll-to-section">
                                            <NavLink to="/home" className="n-item" activeClassName="active" exact={true}>TRANG CHỦ</NavLink>
                                        </li>
                                        <li className="scroll-to-section">
                                            <NavLink to="/about" className="n-item" activeClassName="active">GIỚI THIỆU</NavLink>
                                        </li>
                                        <li className="scroll-to-section">
                                            <NavLink to="/project" className="n-item" activeClassName="active">CHƯƠNG TRÌNH</NavLink>
                                        </li>
                                        <li className="scroll-to-section">
                                            <NavLink to="/report" className="n-item" activeClassName="active">BÁO CÁO TÀI CHÍNH</NavLink>
                                        </li>
                                        <li className="scroll-to-section">
                                            <NavLink to="/contact" className="n-item" activeClassName="active">LIÊN HỆ</NavLink>
                                        </li>
                                        {currentUser ? (
                                            <li
                                            onMouseEnter={() => setDropdown(true)}
                                            onMouseLeave={() => setDropdown(false)}
                                            className="scroll-to-section">
                                            <NavLink to="/infoUser" className="n-item" activeClassName="active">Chào, <span style={{textTransform: "uppercase"}}>{currentUser.name}</span>
                                                <FontAwesomeIcon icon={faAngleDown} style={{marginLeft: "7px"}} />
                                            </NavLink>
                                            {dropdown && <Dropdown/>}
                                            </li>
                                        ) : <></>}
                                    </ul>  
                                </nav>
                            </div>
                        </div>
                    </div>
                </header> 
            </div>
        )
}