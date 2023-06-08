import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotPermitted = () => {
    const navigate = useNavigate();
    return (
        <Result
            style={{fontFamily: "Montserrat", fontWeight: 500}}
            status="403"
            title="403"
            subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này!"
            extra={<Button type="primary" style={{fontFamily: "Montserrat", fontWeight: 500, fontSize: 15}}
                onClick={() => navigate('/home')}
            >Trở lại</Button>}
        />
    )
};

export default NotPermitted;