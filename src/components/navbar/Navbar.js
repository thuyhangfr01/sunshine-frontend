import React, { useState } from "react";
import { NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faAngleDown, faCartPlus, faBell} from '@fortawesome/free-solid-svg-icons'
// import AuthService from "../services/auth.service";
import "./NavbarStyle.scss"
import Dropdown from './Dropdown';
import DropdownNoti from './DropdownNoti';
import LogoCut from "./../../assets/images/logo_cut3.png"
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    let navigate = useNavigate();
    const contributions = useSelector((state) => state.contributions)
    const data = contributions.contributions;
    let counter = Object.keys(data).length;
    // for(let i = 0; i < data.lenght; i++){
    //     counter++;
    // }
    console.log("count: " + counter);
    const {user: currentUser} = useSelector((state) => (state.auth));
    const[fix, setFix] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [dropDownNoti, setDropDownNoti] = useState(false);

    function setFixed(){
        if(window.scrollY >= 200){
            setFix(true)
        } else{
            setFix(false)
        }
    }

    function handleClick(){
        navigate("/order");
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
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <nav className="main-nav">
                                    <a href="index.html" className="logo">
                                        <img src={LogoCut} style={{ heigh: "60px !important"}}/>
                                    </a>
                                    <ul className="nav">
                                        <li className="scroll-to-section">
                                            <NavLink to="/home" className="n-item"  exact="true">TRANG CHỦ</NavLink>
                                        </li>
                                        <li className="scroll-to-section">
                                            <NavLink to="/about" className="n-item" >GIỚI THIỆU</NavLink>
                                        </li>
                                        <li className="scroll-to-section">
                                            <NavLink to="/project" className="n-item" >CHƯƠNG TRÌNH</NavLink>
                                        </li>
                                        <li className="scroll-to-section">
                                            <NavLink to="/reports" className="n-item" >BÁO CÁO TÀI CHÍNH</NavLink>
                                        </li>
                                        <li className="scroll-to-section">
                                            <NavLink to="/contact" className="n-item" >LIÊN HỆ</NavLink>
                                        </li>
                                        {currentUser ? (
                                            <>
                                                <li style={{display: "flex"}}>
                                                    <FontAwesomeIcon onClick={handleClick}
                                                        icon={faCartPlus} style={{marginTop: 9, fontSize: 20, color: "#4b78a4", cursor: "pointer"}} />
                                                    <span style={{width: "17px", height: "17px", textAlign: "center", borderRadius: "10px", marginLeft: "-4px", background: "#dc3545"}}>
                                                        <p style={{color: "#fff", fontWeight: "600", fontSize: "10", marginTop: "-7px", fontSize: "10px"}}>
                                                            {counter > 0 ? counter : 0}
                                                        </p>
                                                    </span>
                                                </li>
                                                <li style={{display: "flex"}}
                                                    onMouseEnter={() => setDropDownNoti(true)}
                                                    onMouseLeave={() => setDropDownNoti(false)}>
                                                    <FontAwesomeIcon icon={faBell} style={{marginTop: 9, fontSize: 20, color: "#4b78a4", marginLeft: "-25px"}} />
                                                    <span style={{width: "17px", height: "17px", textAlign: "center", borderRadius: "10px", marginLeft: "-4px", background: "#dc3545"}}>
                                                        <p style={{color: "#fff", fontWeight: "600", fontSize: "10", marginTop: "-7px", fontSize: "10px"}}>3</p>
                                                    </span>
                                                    {dropDownNoti && <DropdownNoti/>}
                                                </li>
                                                <li
                                                    style={{marginLeft: "-20px"}}
                                                    onMouseEnter={() => setDropdown(true)}
                                                    onMouseLeave={() => setDropdown(false)}
                                                    className="scroll-to-section">
                                                    <NavLink to="/infoUser" className="n-item" activeClassName="active">Chào, <span style={{textTransform: "uppercase"}}>{currentUser.name}</span>
                                                        <FontAwesomeIcon icon={faAngleDown} style={{marginLeft: "7px"}} />
                                                    </NavLink>
                                                    {dropdown && <Dropdown/>}
                                                </li>
                                            </>
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