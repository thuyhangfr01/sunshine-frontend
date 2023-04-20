import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmpty } from 'validator';
import { Routes, Route, Link } from "react-router-dom";

import './LoginStyle.scss';
import AuthService from "../../services/auth.service"
import LogoTextMin from "../../assets/images/logo_text_min.png";
import Cover from "../../assets/images/cover1.png";
import Register from "./Register";
import { withRouter } from '../../common/with-router';

const required = (value) => {
  if (isEmpty(value)) {
      return <small className="form-text text-danger" style={{position: "relative", top: "7px"}}>Vui lòng không để trống</small>;
  }
}

const vemail = (value) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return <small className="form-text text-danger" style={{position: "relative", top: "7px"}}>Email chưa đúng định dạng</small>;
  }
}

const vpassword = (value) => {
  if (value.trim().length < 6 || value.trim().length >20 ) {
      return <small className="form-text text-danger" style={{position: "relative", top: "7px"}}>Mật khẩu phải lớn hơn 6 và nhỏ hơn 20</small>;
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    
    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password).then(
        () => {
          this.props.router.navigate("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div>
        <div class="form-shape-wrapper">
            <div class="form-shape">
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
                              <img src={LogoTextMin} alt="logo" style={{width: '220px', marginBottom: '-70px', marginTop: '50px'}} />
                          </div>
                          <div>
                              <h3 style={{marginBottom: '-30px', fontSize: '18px', fontWeight: '600'}}>Chào bạn,</h3>
                              <p className="lead my-5" style={{fontWeight: '400'}}>tạo tài khoản mới để đồng hành cùng Sunshine nào!</p>
                              <a href={"/register"} class="btn btn-outline-primary 2btn-lg" 
                                style={{fontSize: '16px', fontWeight: '600', border: '1px solid', padding: '18px', marginBottom: '-15px'}}>Đăng ký</a>
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
                                      <p className="text-muted" style={{fontSize: '16px'}}>Vui lòng đăng nhập để tiếp tục</p>
                                  </div>
                                  <Form onSubmit={this.handleLogin}
                                      ref={c => {
                                      this.form = c;
                                      }}>
                                      <div className="form-group">
                                          <div className="form-icon-wrapper">
                                              <Input 
                                              name="email"
                                              type="email"
                                              className="form-control" 
                                              style={{fontSize: '16px'}} 
                                              placeholder="Nhập email" autofocus 
                                              required 
                                              value={this.state.email}
                                              onChange={this.onChangeEmail}
                                              validations={[required, vemail]}
                                              />
                                              <FontAwesomeIcon className="form-icon-left" icon={faEnvelope} />
                                          </div>
                                      </div>
                                      <div className="form-group">
                                          <div className="form-icon-wrapper">
                                              <Input 
                                              name="password"
                                              type="password" 
                                              className="form-control" 
                                              style={{fontSize: '16px'}} 
                                              placeholder="Nhập mật khẩu"
                                              required 
                                              value={this.state.password}
                                              onChange={this.onChangePassword}
                                              validations={[required, vpassword]}
                                              />
                                              <FontAwesomeIcon className="form-icon-left" icon={faLock} />
                                          </div>
                                      </div>
                                      <p className="text-center mb-4" style={{fontSize: '14px'}}>
                                          Bạn đã quên mật khẩu? <a href="password-reset.html" style={{textDecoration: 'none'}}>Đặt lại mật khẩu ngay!</a>
                                      </p>
                                      <button 
                                          type="submit"
                                          className="btn btn-primary btn-block mb-4" 
                                          style={{padding: '20px', fontSize: '16px', fontWeight: '600'}}
                                          onClick={() => {this.handleLogin()}}
                                          disabled={this.state.loading}>Đăng nhập
                                           {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm" style={{marginLeft: "10px"}}></span>
                                          )}
                                      </button>
                                      {this.state.message && (
                                          <div className="form-group">
                                              <div className="alert alert-danger" role="alert">
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
                                  <div className="text-divider" style={{fontSize: '14px'}}>hoặc</div>
                                  <div className="social-links justify-content-center">
                                      <a href='#top' style={{fontSize: '16px'}}>
                                          <i class="fa-brands" style={{ color: '#ffffff;'}}></i>Google
                                      </a>
                                      <a href="sign-up.html" style={{fontSize: '14px'}}>
                                          <i className="fab fa-facebook-f" style={{ color: '#ffffff;'}}></i> Facebook
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container mt-3">
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);