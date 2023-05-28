import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faGoogle} from "@fortawesome/free-brands-svg-icons";
import './LoginStyle.scss';
import LogoTextMin from "../../assets/images/logo_text_min.png";
import Cover from "../../assets/images/cover1.png";
import { toast } from 'react-toastify';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const Login = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {isLoggedIn} = useSelector((state) => state.auth);
  const {user: currentUser} = useSelector((state) => (state.auth));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(EMAIL_REGEX, "Email chưa đúng định dạng!").required("Email không được để trống!"),
    password: Yup.string().required("Mật khẩu không được để trống!"),
  })

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);

    dispatch(login({email, password}))
      .unwrap()
      .then(() => {
        toast.success("Đăng nhập thành công!");
        // navigate("/home");
        window.location.reload();
    })
    .catch(() => {
      toast.error("Đăng nhập thất bại!");
      setLoading(false);
    });
  }

  if(isLoggedIn) {
    if(currentUser.roles.includes("ROLE_ADMIN")){
      return <Navigate to="/admin"/>
    }
    return <Navigate to="/home"/>
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
        <div className="form-wrapper">
            <div className="container">
                <div className="card">
                    <div className="row no-gutters">
                      <div className="col d-none d-lg-flex" style={{backgroundImage: `url(${Cover})` }}>
                          <div className="logo">
                              <img src={LogoTextMin} alt="logo" style={{cursor: "pointer"}}
                                onClick={() => {navigate("/home");}}/>
                          </div>
                          <div>
                              <h3 style={{marginBottom: '-30px', fontSize: '18px', fontWeight: '600'}}>Chào bạn,</h3>
                              <p className="lead my-5" style={{fontWeight: '400'}}>tạo tài khoản mới để đồng hành cùng Sunshine nào!</p>
                              <Link to={"/register"} className="btn btn-outline-primary 2btn-lg" 
                                style={{fontSize: '16px', fontWeight: '600', border: '1px solid', padding: '15px 20px 15px 20px', marginBottom: '-15px'}}>Đăng ký</Link>
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
                                  <div className="logo d-block d-lg-none text-center text-lg-left">
                                      <img src="../../dist/images/logo-colorful.png" alt="logo"/>
                                  </div>
                                  <div className="my-5 text-lg-left">
                                      <h3 className="font-weight-bold" style={{fontWeight: '600'}}>Đăng nhập</h3>
                                      <p className="text-muted" style={{fontSize: '16px', marginTop: 5}}>Vui lòng đăng nhập để tiếp tục</p>
                                  </div>
                                  <Formik
                                     initialValues={initialValues}
                                     validationSchema={validationSchema}
                                     onSubmit={handleLogin}
                                  >
                                  <Form> 
                                      <div className="form-group">
                                          <div className="form-icon-wrapper">
                                              <Field 
                                              name="email"
                                              type="email"
                                              className="form-control" 
                                              style={{fontSize: '16px', position: "relative"}} 
                                              placeholder="Nhập email" autofocus 
                                              />
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
                                              name="password"
                                              type="password" 
                                              className="form-control" 
                                              style={{fontSize: '16px', position: "relative"}} 
                                              placeholder="Nhập mật khẩu"
                                              />
                                              <FontAwesomeIcon className="form-icon-left" icon={faLock} />
                                              <ErrorMessage
                                                name="password"
                                                component="small"
                                                className="form-text text-danger" style={{top: "5px", position: "relative"}}></ErrorMessage>
                                          </div>
                                      </div>
                                      <p className="text-center mb-4" style={{fontSize: '14px'}}>
                                          Bạn đã quên mật khẩu? <a href="password-reset.html" style={{textDecoration: 'none'}}>Đặt lại mật khẩu ngay!</a>
                                      </p>
                                      <button 
                                          type="submit"
                                          className="btn btn-primary btn-block mb-4" 
                                          style={{padding: '16px', fontSize: '16px', fontWeight: '600', border: 'none'}}
                                          onClick={() => {this.handleLogin()}}
                                          disabled={loading}>Đăng nhập
                                           {loading && (
                                            <span className="spinner-border spinner-border-sm" style={{marginLeft: "10px"}}></span>
                                          )}
                                      </button>
                                  </Form>
                                  </Formik>
                                  </div>
                                  <div className="text-divider" style={{fontSize: '14px'}}>hoặc</div>
                                  <div className="social-links justify-content-center">
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
      );
    }


export default Login;