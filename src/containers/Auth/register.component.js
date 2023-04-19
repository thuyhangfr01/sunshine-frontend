import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import LogoTextMin from "../assets/images/logo_text_min.png";
import Cover from "../assets/images/cover1.png";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vname = value => {
  if (value.length < 1 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 1 and 50 characters.
      </div>
    );
  }
};

const vphone = value => {
  if (value.length < 1 || value.length > 11) {
    return (
      <div className="alert alert-danger" role="alert">
        The phone number must be between 1 and 11 number.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

// const vrole = value => {
//   if (value.length < 1 || value.length > 50) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The role must be between 1 and 50 characters.
//       </div>
//     );
//   }
// };

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    // this.onChangeRole = this.onChangeRole.bind(this);

    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      // role: "",
      successful: false,
      message: ""
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

  // onChangeRole(e) {
  //   this.setState({
  //     role: e.target.value
  //   });
  // }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.name,
        this.state.email,
        this.state.phone,
        this.state.password,
        // this.state.role
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
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

        <div className="form-wrapper">
            <div className="container">
                <div className="card">
                    <div className="row no-gutters">
                        <div className="col d-none d-lg-flex" style={{backgroundImage: `url(${Cover})`}}>
                            <div className="logo">
                                <img src={LogoTextMin} alt="logo"/>
                            </div>
                            <div>
                              <h3 style={{marginBottom: '-30px', fontSize: '18px', fontWeight: '600'}}>Chào bạn,</h3>
                              <p className="lead my-5" style={{fontWeight: '400'}}>bạn đã có tài khoản để đồng hành cùng Sunshine chưa?</p>
                              <a href={"/login"} class="btn btn-outline-primary 2btn-lg" 
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
                                        <img src={LogoTextMin} alt="logo"/>
                                    </div>
                                    <div className="my-5 text-center text-lg-left">
                                        <h3 className="font-weight-bold">Đăng ký</h3>
                                        <p className="text-muted">Tạo tài khoản mới</p>
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
                                                      value={this.state.name}
                                                      onChange={this.onChangeName}
                                                      validations={[required, vname]}/>
                                                    <i className="form-icon-left mdi mdi-account"></i>
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
                                                      value={this.state.email}
                                                      onChange={this.onChangeEmail}
                                                      validations={[required, email]}/>
                                                    <i className="form-icon-left mdi mdi-email"></i>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-icon-wrapper">
                                                    <Input 
                                                      type="number"
                                                      name="phone"
                                                      className="form-control"
                                                      placeholder="Nhập số điện thoại"
                                                      value={this.state.phone}
                                                      onChange={this.onChangePhone}
                                                      validations={[required, vphone]}/>
                                                    <i className="form-icon-left mdi mdi-lock"></i>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-icon-wrapper">
                                                    <Input 
                                                    type="password" 
                                                    name="password"
                                                    className="form-control" 
                                                    placeholder="Nhập mật khẩu password"
                                                    value={this.state.password}
                                                    onChange={this.onChangePassword}
                                                    validations={[required, vpassword]}
                                                    />
                                                    <i className="form-icon-left mdi mdi-lock"></i>
                                                </div>
                                            </div>
                                        
                                            <div className="form-group">
                                                <div className="form-icon-wrapper">
                                                    <Input 
                                                      type="password"
                                                      name="repassword"
                                                      className="form-control"
                                                      placeholder="Nhập lại mật khẩu"
                                                      value={this.state.password}
                                                      onChange={this.onChangePassword}
                                                      validations={[required, vpassword]}/>
                                                    <i className="form-icon-left mdi mdi-lock"></i>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary btn-block mb-4">Đăng ký</button>
                                        </div>
                                         )}
                                    </Form>
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
                                    <div className="text-divider">hoặc</div>
                                    <div className="social-links justify-content-center">
                                        <a href="#">
                                            <i className="mdi mdi-google"></i> Google
                                        </a>
                                        <a href="#">
                                            <i className="mdi mdi-facebook"></i> Facebook
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
