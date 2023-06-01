import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import "./Project.scss";

import {updateStatusMoney } from "../../slices/contribution";

const Payment = () => {
    let navigate = useNavigate();
    const [showResult, setShowResult] = useState(false);

    const contributions = useSelector((state) => state.contributions.contributionDonation);
    const dispatch = useDispatch();

    const updateStatusByMoneyId = () => {
        if(contributions){
            contributions.map((contribution) => {  
                const moneyId = contribution.contributionMoney.id;
                const statusId = 3;
                dispatch(updateStatusMoney({moneyId, statusId}))
            })
        }
    }

    const urlSearchParams = new URLSearchParams(window.location.href);
    const params = Object.fromEntries(urlSearchParams.entries());
    // Lấy giá trị của đối số vnp_responsecode
    const vnpResponseCode = params['vnp_ResponseCode'];

    const redirectPage = () => {
        if(vnpResponseCode !== "00"){
            navigate("/order");
            console.log(JSON.stringify(localStorage));
        }
        else {
            if(localStorage.getItem("persist:root")){
                localStorage.removeItem("persist:root");
                window.location.reload();
            }
            navigate("/payment");
            updateStatusByMoneyId();
            setShowResult(true);
            console.log(JSON.stringify(localStorage));
        }
    }

    useEffect(redirectPage, []);


    return (
        <>
            {showResult && 
                <Result
                    style={{marginBottom: 200, marginTop: 50, fontFamily: "Montserrat"}}
                    icon={<SmileOutlined style={{color: "#d75471"}}/>}
                    title="Thanh toán thành công!"
                    subTitle="Sunshine cảm ơn sự đóng góp của bạn"
                    extra={
                        <Button size="large"
                            style={{background: "linear-gradient(90deg, rgb(255, 73, 85), rgb(103, 58, 183))", fontFamily:"Montserrat", fontSize: 15, fontWeight: 500, color: "#fff" }}
                            onClick={() => {navigate("/historyContribution");}}>
                            <span className="title">Xem lịch sử đóng góp</span>
                        </Button>}
                />
            }
        </>
    )
}

export default Payment;