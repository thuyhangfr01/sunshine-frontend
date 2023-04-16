import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import LogoTextMin from "../../assets/images/logo_text_min.png";
import Cover from "../../assets/images/cover1.png";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleOnChangeEmail = (event) =>{
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = () => {
        console.log('email: ', this.state.email, ' password: ', this.state.password)
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
                        <div className="card" style={{margin: '70px 60px 60px 60px'}}>
                            <div className="row no-gutters">
                                <div className="col d-none d-lg-flex" style={{backgroundImage: `url(${Cover})` }}>
                                        <div className="logo">
                                            <img src={LogoTextMin} alt="logo" style={{width: '220px', marginBottom: '-70px', marginTop: '50px'}} />
                                        </div>
                                        <div>
                                            <h3 style={{marginBottom: '-30px', fontSize: '18px', fontWeight: '600'}}>Chào bạn,</h3>
                                            <p className="lead my-5" style={{fontWeight: '400'}}>bạn đã có tài khoản để đồng hành cùng Sunshine chưa?</p>
                                            <a href="sign-up.html" class="btn btn-outline-primary 2btn-lg" 
                                             style={{fontSize: '16px', fontWeight: '600', border: '1px solid', padding: '22px', marginBottom: '-15px'}}>Đăng ký</a>
                                        </div>
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <a href="sign-up.html" style={{textDecoration: 'none', fontSize: '15px'}}>Chính sách bảo mật</a>
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
                                            <form>
                                                <div className="form-group">
                                                    <div className="form-icon-wrapper">
                                                        <input type="email" class="form-control" style={{fontSize: '16px'}} placeholder="Nhập email" autofocus 
                                                        required value={this.state.email}
                                                        onChange={(event) => this.handleOnChangeEmail(event)}/>
                                                        <i className="form-icon-left fas fa-envelope" style={{color: "#9e9e9e",}}></i>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="form-icon-wrapper">
                                                        <input type="password" class="form-control" style={{fontSize: '16px'}} placeholder="Nhập mật khẩu"
                                                            required value={this.state.password}
                                                            onChange={(event) => this.handleOnChangePassword(event)}/>
                                                        <i className="form-icon-left fas fa-lock" style={{color: "#9e9e9e",}}></i>
                                                    </div>
                                                </div>
                                                <p className="text-center mb-4" style={{fontSize: '14px'}}>
                                                    Bạn đã quên mật khẩu? <a href="password-reset.html" style={{textDecoration: 'none'}}>Đặt lại mật khẩu ngay!</a>
                                                </p>
                                                <button className="btn btn-primary btn-block mb-4" style={{padding: '22px', fontSize: '16px', fontWeight: '600'}}
                                                onClick={() => {this.handleLogin()}}>Đăng nhập</button>
                                            </form>
                                            <div className="text-divider" style={{fontSize: '14px'}}>hoặc</div>
                                            <div className="social-links justify-content-center">
                                                <a href='#top' style={{fontSize: '16px'}}>
                                                    <i class="fab fa-google" style={{ color: '#ffffff;'}}></i>Google
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
