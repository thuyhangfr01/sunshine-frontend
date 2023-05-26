import React, { useState, useEffect, useCallback  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';

import EventBus from "../../common/EventBus";
import { logout } from "../../slices/auth";
// import { callLogout } from '../../services/api';
// import { doLogoutAction } from '../../redux/account/accountSlice';

import "./LayoutAdmin.scss";
import {
    AppstoreOutlined,
    ExceptionOutlined,
    TeamOutlined,
    UserOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined, FormOutlined, LockOutlined,
    ContactsOutlined, SaveOutlined, ReadOutlined
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space } from 'antd';
import LogoTextMin from "./../../assets/images/logo_text_min.png";

const { Content, Sider } = Layout;

const items = [
    {
        label: <Link to='/admin'>Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label: <span>Quản lý người dùng</span>,
        icon: <UserOutlined />,
        children: [
            {
                label: <Link to='/admin/user'>Cập nhật thông tin</Link>,
                key: 'crud_user',
                icon: <TeamOutlined />,
            },
            {
                label: <Link to='/admin/authorized'>Phân quyền người dùng</Link>,
                key: 'authorized',
                icon: <ContactsOutlined />,
            }
        ]
    },
    {
        label: <span>Quản lý dự án</span>,
        key: 'project',
        icon: <ExceptionOutlined />,
        children: [
            {
                label: <Link to='/admin/project'>Cập nhật thông tin</Link>,
                key: 'crud_project',
                icon: <SaveOutlined />,
            },
            {
                label: <Link to='/admin/contribution'>Đơn đóng góp hiện vật</Link>,
                key: 'contribution',
                icon: <ReadOutlined />,
            }
        ]
    },
    {
        label: <span>Quản lý thu chi</span>,
        key: 'receiptAndPayment',
        icon: <ExceptionOutlined />,
        children: [
            {
                label: <Link to='/admin/receiptPayment'>Cập nhật thu chi</Link>,
                key: 'payment',
                icon: <SaveOutlined />,
            },
            {
                label: <Link to='/admin/report'>Cập nhật báo cáo</Link>,
                key: 'report',
                icon: <SaveOutlined />,
            },
        ]
    },
    {
        label: <span>Quản lý đơn yêu cầu</span>,
        key: 'form',
        icon: <DollarCircleOutlined />,
        children: [
            {
                label: <Link to='/admin/help'>Đơn yêu cầu hỗ trợ</Link>,
                key: 'help',
                icon: <FormOutlined />,
            },
            {
                label: <Link to='/admin/volunteer'>Đơn yêu cầu TNV</Link>,
                key: 'volunteer',
                icon: <ReadOutlined />,
            }
        ]
    }
];

const LayoutAdmin = () => {
    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const {user: currentUser} = useSelector((state) => (state.auth));

    const logOut = useCallback(() => {
        dispatch(logout());
      }, [dispatch]);
    
    useEffect(() => {
        EventBus.on("logout", () => {
            logOut();
        });
        return () => {
            EventBus.remove("logout");
    };
    }, [logOut]);

    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
            icon: <UserOutlined />,
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={logOut}
            >Đăng xuất</label>,
            key: 'logout',
            icon: <LockOutlined />,
        },

    ];

    return (
        <Layout style={{ minHeight: '100vh' }} className="layout-admin">
            <Sider style={{minWidth: "500 !important"}} theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 70, margin: 16, textAlign: 'center' }}>
                    <img style={{width: 100}} src={LogoTextMin}/>
                </div>
                <Menu style={{fontFamily: "Montserrat", fontWeight: 500}} defaultSelectedKeys={[activeMenu]} mode="inline" items={items} onClick={(e) => setActiveMenu(e.key)}/>
            </Sider>
            <Layout style={{fontFamily: "Montserrat"}}>
                <div className='admin-header'>
                    <span>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </span>
                    <Dropdown style={{fontStyle: "Montserrat"}} menu={{ items: itemsDropdown }} trigger={['click']}>
                        <Link onClick={(e) => e.preventDefault()}>
                            <Space style={{color: "#4079cd", fontWeight: 500, fontStyle: "italic"}}>
                                Xin chào, <span style={{fontWeight: 600}}>{currentUser?.name}</span>
                                <DownOutlined />
                            </Space>
                        </Link>
                    </Dropdown>
                </div>
                <Content>
                    <Outlet />
                </Content>
                {/* <Footer style={{ padding: 0 }}>
                    React Test Fresher &copy; Hỏi Dân IT - Made with <HeartTwoTone />
                </Footer> */}
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;