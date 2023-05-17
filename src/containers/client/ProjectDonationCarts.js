import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Row, Col, Card, InputNumber, Table, Radio, Space, Button, Result } from "antd";
import {DeleteFilled} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import {updateAmountMoneyById, removeContribution, updateStatusMoney } from "../../slices/contribution";
import {createPayment} from "../../slices/payment";

const ProjectDonationCarts = () => {
    let navigate = useNavigate();
    const contributions = useSelector((state) => state.contributions.contributions);
    const dispatch = useDispatch();
    const [sumMoney, setSumMoney] = useState(0);
    const [showCart, setShowCart] = useState(false);

    const columns = [
        {
          title: 'Tên hiện vật',
          dataIndex: 'artifactName',
        },
        {
          title: 'Số lượng',
          dataIndex: 'donatedAmount',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'calculationUnit',
        }
      ];

    useEffect(() => {
        let sum = 0;
        if(contributions && Object.keys(contributions).length > 0){
            setShowCart(true);
            contributions.map(contribution => {
                sum += contribution.amountMoney;
            })
            setSumMoney(sum);
        } else{
            sum = 0;
            setShowCart(false);
        }
    }, [contributions])

    const handleOnChangeInput = (value, contribution) => {
        console.log("value: " + value + "--- contribution: " + JSON.stringify(contribution) + "--- id: " + contribution.id);
        console.log("index: " + JSON.stringify(contribution.contributionMoney.id))
        const mId = contribution.contributionMoney.id;
        const amountMoney = value;
        const moneyId = contribution.contributionMoney.id;
        if(!value || value < 1) return;
        if(!isNaN(value)){
            dispatch(updateAmountMoneyById({mId, amountMoney, moneyId}));
        }
    }

    const handleDelete = (contribution) => {
        const id = contribution.id;
        dispatch(removeContribution({id}));
    }

    const updateStatusByMoneyId = () => {
        if(contributions){
            contributions.map((contribution) => {
                const moneyId = contribution.contributionMoney.id;
                const statusId = 3;
                dispatch(updateStatusMoney({moneyId, statusId}))
                localStorage.removeItem("persist:root");
            })
        }
    }

    const handlePayment = (sumMoney) => {
        const amount = sumMoney*100;
        dispatch(createPayment({amount}))
        .then((response) => {
            console.log("payment: " + JSON.stringify(response.payload.url));
            window.open(response.payload.url);
            updateStatusByMoneyId();
        })
        .catch((e) => {
            console.log(e);
        })
    }

    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px", marginBottom: 200}}>
            <div className="container-title">
                <div className="section-heading row">
                    <div className='col-12'>
                        <h2 >Chi tiết đóng góp cho dự án của <em>SUN</em><span>SHINE</span></h2>
                        <div className="line-dec"></div>
                        <p style={{paddingLeft: "150px", paddingRight: "150px"}}>Sự đóng góp của bạn sẽ góp phần thắp sáng những ước mơ còn dang dở của những người đang gặp khó khăn!</p>
                    </div>
                </div>
            </div>
            
                {showCart ? 
                <>
                    <Row style={{fontFamily: "Montserrat", marginTop: 50}}>
                        <Col span={17} style={{background: "#fbfbfb", borderRadius: 15, height: "fit-content"}}>
                        {contributions && contributions.map((contribution, index) => (
                            <Card key={index} style={{margin: 20}}>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <p style={{fontSize: "15px", fontWeight: 500}}>{contribution.projectName}</p>
                                    <DeleteFilled 
                                        onClick = {() => handleDelete(contribution)}
                                        style={{color: "#a50f0f", fontSize: 16, paddingLeft: "15px", cursor: "pointer"}}/>
                                </div>
                                {contribution.contributionArtifacts !== null && 
                                    <div className="project-table" style={{marginBottom: 20}}>
                                    <Table pagination={false} className="project-artifact" columns={columns} dataSource={contribution.contributionArtifacts}/>
                                    </div>
                                }
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <InputNumber
                                        defaultValue={contribution.amountMoney}
                                        // onChange={(money) => handleChange(money)}
                                        onChange={(value) => handleOnChangeInput(value, contribution)} 
                                        style={{fontFamily: "Montserrat" }}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        addonAfter="VND"
                                    />
                                </div>
                            </Card>
                        ))}
                        </Col>
                        <Col>
                            <Col style={{borderRadius: 15, marginLeft: 20, width: 355}}>
                                <Card 
                                    title = "Thông tin người đóng góp">
                                    <p>Họ và tên: <span>CAO THỊ THÚY HẰNG</span></p>
                                    <p>Số điện thoại: <span>0987789987</span></p>
                                    <p>Email: <span>thuyhangfr01@gmail.com</span></p>
                                </Card>
                            </Col>
                            <Col style={{borderRadius: 15, marginLeft: 20, marginTop: 20, width: 355}}>
                                <Card 
                                    title = "Chọn phương thức thanh toán">
                                    <Radio.Group style={{fontFamily: "Montserrat"}}>
                                        <Space direction="vertical">
                                            <Radio value={1} checked>Thanh toán bằng VNPAY</Radio>
                                            <Radio value={2}>Thanh toán bằng thẻ quốc tế</Radio>
                                            <Radio value={3}>Thanh toán bằng Ví MoMo</Radio>
                                        </Space>
                                    </Radio.Group>
                                </Card>
                            </Col>
                            <Col style={{borderRadius: 15, marginLeft: 20, marginTop: 20, width: 355}}>
                                <Card 
                                    title = "Thông tin đóng góp">
                                    <p>Tổng tiền đóng góp: <span>{sumMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></p>
                                    <p>*Chú ý: <span>Vui lòng chờ Admin duyệt đơn đóng góp hiện vật của bạn!</span></p>
                                    <button className="btn btn-danger" style={{width: "100%"}}
                                        onClick = {() => handlePayment(sumMoney)}
                                        >Thanh toán</button>
                                </Card>
                            </Col>
                        </Col>
                    </Row>
                </>
                :
                <Result style = {{fontFamily: "Montserrat"}}
                    centered
                    status="404"
                    title="Hmm..."
                    subTitle="Bạn không có đơn đóng góp nào!"
                    extra={<Button style = {{fontFamily: "Montserrat", fontSize: 15}} type="primary" onClick={() => {navigate("/project")}}>Trở lại</Button>}
                />
                }
        </div>
    )
}

export default ProjectDonationCarts;