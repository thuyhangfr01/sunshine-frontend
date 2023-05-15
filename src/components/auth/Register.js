import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faPhone } from '@fortawesome/free-solid-svg-icons'
import {faFacebookF, faGoogle} from "@fortawesome/free-brands-svg-icons";

import './LoginStyle.scss';
import LogoTextMin from "../../assets/images/logo_text_min.png";
import Cover from "../../assets/images/cover1.png";
import { toast } from 'react-toastify';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PHONE_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/

const Register = () => {
let navigate = useNavigate();
 const [successful, setSuccessful] = useState(false);
 const [loading, setLoading] = useState(false);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(clearMessage());
}, [dispatch]);

 const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: ""
 };

 const validationSchema = Yup.object().shape({
  name: Yup.string().required("Họ và tên không được để trống!"),
  email: Yup.string().matches(EMAIL_REGEX, "Email chưa đúng định dạng!").required("Email không được để trống!"),
  phone: Yup.string().matches(PHONE_REGEX, "Số điện thoại chưa đúng định dạng!").required("Số điện thoại không được để trống!"),
  password: Yup.string().matches(PASS_REGEX, "Mật khẩu phải trên 6 kí tự, ít nhất 1 chữ hoa và 1 chữ số!").required("Mật khẩu không được để trống!"),
 });

 const handleRegister = (formValue) =>{
  const {name, email, phone, password} = formValue;
  setLoading(true);
  setSuccessful(true);

  dispatch(register({name, email, phone, password}))
    .unwrap()
    .then(() => {
      toast.success("Đăng ký thành công!");
      navigate("/login");
      window.location.reload();
      setSuccessful(true);
    })
    .catch(() => {
      toast.error("Đăng ký thất bại!");
      setSuccessful(false);
      setLoading(false);
    });
 };

 if(successful === "true") {
  return <Navigate to="/login"/>
}

  return (
    <div>
      <div className="form-shape-wrapper">
      <div className="form-shape">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 185.4">
              <path fill="red" d="M3000,0v185.4H0V0c496.4,115.6,996.4,173.4,1500,173.4S2503.6,115.6,3000,0z"></path>
          </svg>
      </div>
      </div>
      <div className="form-wrapper" style={{ marginTop: "-20px"}}>
          <div className="signup-form" style={{margin: "0 auto"}}>
              <div className="card">
                  <div className="row no-gutters">
                      <div className="col d-none d-lg-flex" style={{backgroundImage: `url(${Cover})`}}>
                          <div className="logo">
                            <img src={LogoTextMin} alt="logo" style={{width: '220px', marginTop: '40px'}} />
                          </div>
                          <div>
                            <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: "10px"}}>Chào bạn,</h3>
                            <p className="lead" style={{fontWeight: '400', marginBottom: "50px"}}>bạn đã có tài khoản để đồng hành cùng Sunshine chưa?</p>
                            <Link to={"/login"} className="btn btn-outline-primary 2btn-lg" 
                              style={{fontSize: '16px', fontWeight: '600', border: '1px solid', padding: '10px 20px 10px 20px', marginBottom: '-15px'}}>Đăng nhập</Link>
                        </div>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="sign-up.html" style={{textDecoration: 'none', fontSize: '15px', marginRight: "5px"}}>Chính sách bảo mật</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="sign-up.html"  style={{textDecoration: 'none', fontSize: '15px'}}>Điều khoản dịch vụ</a>
                            </li>
                        </ul>
                      </div>
                      <div className="col">
                          <div className="row">
                              <div className="col-md-10 offset-md-1">
                                  <div className="text-lg-left" style={{marginTop: "10px", marginBottom: "30px"}}>
                                    <h3 className="font-weight-bold" style={{fontWeight: '600'}}>Đăng ký</h3>
                                    <p className="text-muted" style={{fontSize: '16px'}}>Vui lòng nhập đầy đủ thông tin để tạo tài khoản mới</p>
                                  </div>
                                  <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleRegister}>
                                  <Form>
                                        <div>
                                          <div className="form-group">
                                              <div className="form-icon-wrapper">
                                                  <Field 
                                                    type="text" 
                                                    name="name"
                                                    className="form-control" 
                                                    placeholder="Nhập họ và tên" 
                                                    autofocus
                                                    style={{fontSize: '16px', position: "relative"}}  />
                                                  <FontAwesomeIcon className="form-icon-left" icon={faUser} />
                                                  <ErrorMessage
                                                    name="name"
                                                    component="small"
                                                    className="form-text text-danger" style={{top: "5px", position: "relative"}}></ErrorMessage>
                                              </div>
                                          </div>
                                          <div className="form-group">
                                              <div className="form-icon-wrapper">
                                                  <Field 
                                                    type="email" 
                                                    name="email"
                                                    className="form-control" 
                                                    placeholder="Nhập email" 
                                                    required
                                                    style={{fontSize: '16px', position: "relative"}} />
                                                  <i className="form-icon-left mdi mdi-email"></i>
                                                  <FontAwesomeIcon className="form-icon-left" icon={faEnvelope} />
                                                  <ErrorMessage
                                                    name="email"
                                                    component="small"
                                                    className="form-text text-danger" style={{top: "5px", position: "relative"}}></ErrorMessage>
                                              </div>
                                          </div>
                                          <div className="form-group">
                                              <div className="form-icon-wrapper">
                                                  <Field 
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                    style={{fontSize: '16px', position: "relative"}} />
                                                  <FontAwesomeIcon className="form-icon-left" icon={faPhone} />
                                                  <ErrorMessage
                                                    name="phone"
                                                    component="small"
                                                    className="form-text text-danger" style={{top: "5px", position: "relative"}}></ErrorMessage>
                                              </div>
                                          </div>
                                          <div className="form-group">
                                              <div className="form-icon-wrapper">
                                                  <Field 
                                                  type="password" 
                                                  name="password"
                                                  className="form-control" 
                                                  placeholder="Nhập mật khẩu"
                                                  style={{fontSize: '16px', position: "relative"}} 
                                                  />
                                                  <FontAwesomeIcon className="form-icon-left" icon={faLock} />
                                                  <ErrorMessage
                                                    name="password"
                                                    component="small"
                                                    className="form-text text-danger" style={{top: "5px", position: "relative"}}></ErrorMessage>
                                              </div>
                                          </div>
                                          {/* <div className="radio" style={{display: "flex", fontSize: "16px", marginBottom: "15px"}} >
                                              <p style={{
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                marginRight: "15px",
                                                marginTop: "1px"
                                              }}>Bạn là:</p>
                                              <label style={{marginTop: '5px', marginRight: "10px"}}>
                                                <Field
                                                  name="role"
                                                  style={{marginRight: "10px"}}
                                                  type="radio"
                                                  value="benefactor"
                                                  checked
                                                />
                                                Mạnh thường quân
                                              </label>
                                              <label style={{ marginTop: '5px'}}>
                                                <Field
                                                  name="role"
                                                  style={{marginRight: "10px"}}
                                                  type="radio"
                                                  value="recipient"
                                                />
                                                Đơn vị nhận hỗ trợ
                                              </label>
                                            
                                          </div> */}
                                          <button 
                                                className="btn btn-primary btn-block"
                                                style={{padding: '16px', fontSize: '16px', fontWeight: '600', border: 'none'}}
                                                disabled={loading}>
                                                Đăng ký
                                                {loading && (
                                                  <span className="spinner-border spinner-border-sm" style={{marginLeft: "10px"}}></span>
                                                )}
                                          </button>
                                      </div>
                                  </Form>
                                  </Formik>
                                  <div className="text-divider">hoặc</div>
                                  <div className="social-links justify-content-center" style={{marginTop: "-10px"}}>
                                      <a href='#top' style={{fontSize: '16px'}} >
                                          <FontAwesomeIcon icon={faGoogle} />Google
                                        </a>
                                        <a href="sign-up.html" style={{fontSize: '14px'}}>
                                          <FontAwesomeIcon icon={faFacebookF} /> Facebook
                                        </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
 };


export default Register;
