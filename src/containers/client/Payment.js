import React, {useEffect, useState} from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import "./Project.scss";
import { toast } from 'react-toastify';
const Payment = () => {
    let navigate = useNavigate();

    const redirectPage = () => {
        toast.success("Thanh toán thành công!")
        if(localStorage.getItem("persist:root")){
            localStorage.removeItem("persist:root");
            window.location.reload();
        }
    }

    useEffect(redirectPage, []);

    return (
        <Result
            style={{marginBottom: 200, marginTop: 50, fontFamily: "Montserrat"}}
            icon={<SmileOutlined style={{color: "#d75471"}}/>}
            title="Thanh toán thành công!"
            subTitle="Sunshine cảm ơn sự đóng góp của bạn"
            extra={
                <Button size="large"
                    style={{background: "linear-gradient(90deg, rgb(255, 73, 85), rgb(103, 58, 183))", fontFamily:"Montserrat", fontSize: 15, fontWeight: 500, color: "#fff" }}
                    onClick={() => {navigate("/historyContribution");}}
                    >
                    <span className="title">Xem lịch sử đóng góp</span>
                </Button>}
        />
    )
}

export default Payment;