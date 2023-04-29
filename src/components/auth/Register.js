import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faPhone } from '@fortawesome/free-solid-svg-icons'
import {fab, faFacebookF, faGoogle} from "@fortawesome/free-brands-svg-icons";
import { isEmpty } from "validator";
import './LoginStyle.scss';
import AuthService from "../../services/auth.service";
import Login from "./Login.js";
import LogoTextMin from "../../assets/images/logo_text_min.png";
import Cover from "../../assets/images/cover1.png";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { withRouter } from "../../common/with-router";
import { toast } from 'react-toastify';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PHONE_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
const required = (value) => {
  if (isEmpty(value)) {
      return <small className="form-text text-danger" style={{position: "relative", top: "7px"}}>Vui lòng không để trống</small>;
  }
}

const vemail = (value) => {
  if (!EMAIL_REGEX.test(value)) {
      return <small className="form-text text-danger" style={{position: "relative", top: "7px"}}>Email chưa đúng định dạng</small>;
  }
}

const vphone = (value) => {
  if (!PHONE_REGEX.test(value)) {
      return <small className="form-text text-danger" style={{position: "relative", top: "7px"}}>Số điện thoại chưa đúng định dạng</small>;
  }
};

const vpassword = (value) => {
  if (!PASS_REGEX.test(value) ) {
      return <small className="form-text text-danger" style={{position: "relative", top: "7px"}}>Mật khẩu tối thiếu 6 kí tự, có chứa ít nhất 1 chữ số và 1 chữ in hoa</small>;
  }
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      successful: false,
      message: "",
      loading: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.name,
        this.state.email,
        this.state.phone,
        this.state.password,
        this.state.role
      ).then(
        () => {
          toast.success("Đăng ký thành công!");
          this.props.router.navigate("/login");
          window.location.reload();
        },
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          toast.error("Đăng ký thất bại!");
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
            loading: false,
          });
        },
      );
    } else{
      this.setState({
        loading: false
      });
    }
  }

  render() {
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
            <div className="container">
                <div className="card">
                    <div className="row no-gutters">
                        <div className="col d-none d-lg-flex" style={{backgroundImage: `url(${Cover})`}}>
                            <div className="logo">
                              <img src={LogoTextMin} alt="logo" style={{width: '220px', marginBottom: '-60px', marginTop: '50px'}} />
                            </div>
                            <div>
                              <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: "10px"}}>Chào bạn,</h3>
                              <p className="lead" style={{fontWeight: '400', marginBottom: "30px"}}>bạn đã có tài khoản để đồng hành cùng Sunshine chưa?</p>
                              <Link to={"/login"} class="btn btn-outline-primary 2btn-lg" 
                                style={{fontSize: '16px', fontWeight: '600', border: '1px solid', padding: '10px 20px 10px 20px', marginBottom: '-15px'}}>Đăng ký</Link>
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
                                        <img src={LogoTextMin} alt="logo"/>
                                    </div>
                                    <div className="text-lg-left" style={{marginTop: "10px", marginBottom: "30px"}}>
                                      <h3 className="font-weight-bold" style={{fontWeight: '600'}}>Đăng ký</h3>
                                      <p className="text-muted" style={{fontSize: '16px'}}>Vui lòng nhập đầy đủ thông tin để tạo tài khoản mới</p>
                                    </div>
                                    <Form
                                      onSubmit={this.handleRegister}
                                      ref={c => {
                                        this.form = c;
                                      }}>
                                         {!this.state.successful && (
                                          <div>
                                            <div className="form-group">
                                                <div className="form-icon-wrapper">
                                                    <Input 
                                                      type="text" 
                                                      name="name"
                                                      className="form-control" 
                                                      placeholder="Nhập họ và tên" 
                                                      autofocus
                                                      style={{fontSize: '16px'}} 
                                                      value={this.state.name}
                                                      onChange={this.onChangeName}
                                                      validations={[required]}/>
                                                    <FontAwesomeIcon className="form-icon-left" icon={faUser} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-icon-wrapper">
                                                    <Input 
                                                      type="email" 
                                                      name="email"
                                                      className="form-control" 
                                                      placeholder="Nhập email" 
                                                      required
                                                      style={{fontSize: '16px'}} 
                                                      value={this.state.email}
                                                      onChange={this.onChangeEmail}
                                                      validations={[required, vemail]}/>
                                                    <i className="form-icon-left mdi mdi-email"></i>
                                                    <FontAwesomeIcon className="form-icon-left" icon={faEnvelope} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-icon-wrapper">
                                                    <Input 
                                                      name="phone"
                                                      className="form-control"
                                                      placeholder="Nhập số điện thoại"
                                                      style={{fontSize: '16px'}} 
                                                      value={this.state.phone}
                                                      onChange={this.onChangePhone}
                                                      validations={[required, vphone]}/>
                                                    <FontAwesomeIcon className="form-icon-left" icon={faPhone} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-icon-wrapper">
                                                    <Input 
                                                    type="password" 
                                                    name="password"
                                                    className="form-control" 
                                                    placeholder="Nhập mật khẩu"
                                                    style={{fontSize: '16px'}} 
                                                    value={this.state.password}
                                                    onChange={this.onChangePassword}
                                                    validations={[required, vpassword]}
                                                    />
                                                    <FontAwesomeIcon className="form-icon-left" icon={faLock} />
                                                </div>
                                            </div>
                                            
                                            <div className="radio" style={{display: "flex", fontSize: "16px", marginBottom: "15px"}} onChange={this.onChangeRole}>
                                                <p style={{
                                                  fontSize: "16px",
                                                  fontWeight: "600",
                                                  marginRight: "15px",
                                                  marginTop: "1px"
                                                }}>Bạn là:</p>
                                                <label style={{display: 'flex', marginTop: '5px', marginRight: "10px"}}>
                                                  <Input
                                                    style={{marginRight: "10px"}}
                                                    type="radio"
                                                    value="benefactor"
                                                  />
                                                  Mạnh thường quân
                                                </label>
                                                <label style={{display: 'flex', marginTop: '5px'}}>
                                                  <Input
                                                    style={{marginRight: "10px"}}
                                                    type="radio"
                                                    value="recipient"
                                                  />
                                                  Đơn vị nhận hỗ trợ
                                                </label>
                                              
                                            </div>
                                                <button 
                                                  className="btn btn-primary btn-block"
                                                  style={{padding: '16px', fontSize: '16px', fontWeight: '600', border: 'none'}}
                                                  disabled={this.state.loading}>
                                                  Đăng ký
                                                  {this.state.loading && (
                                                    <span className="spinner-border spinner-border-sm" style={{marginLeft: "10px"}}></span>
                                                  )}
                                              </button>
                                        </div>
                                         )}
                                        {this.state.message && (
                                          <div className="form-group">
                                            <div
                                              className={
                                                this.state.successful
                                                  ? "alert alert-success"
                                                  : "alert alert-danger"
                                              }
                                              role="alert"
                                            >
                                              {this.state.message}
                                            </div>
                                          </div>
                                        )}
                                        <CheckButton
                                          style={{ display: "none" }}
                                          ref={c => {
                                            this.checkBtn = c;
                                          }}
                                        />
                                    </Form>
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
  }
}

export default withRouter(Register)
