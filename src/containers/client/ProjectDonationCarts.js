import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Row, Col, Card, InputNumber, Table, Radio, Space, Button, Result, Popconfirm } from "antd";
import {DeleteFilled} from '@ant-design/icons';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {updateAmountMoneyById, removeContribution } from "../../slices/contribution";
import icSunBlue from "../../assets//images/ic_sunBlue.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
import "./Project.scss";
import {updateStatusMoney } from "../../slices/contribution";

const ProjectDonationCarts = () => {
    let navigate = useNavigate();
    const [successful, setSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);
    const contributions = useSelector((state) => state.contributions.contributionDonation);
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
        dispatch(removeContribution({id}))
        .then((response) => {
            toast.success("Xóa đơn đóng góp thành công!");
        })
        .catch((error) => {
            toast.error("Xóa đơn đóng góp thất bại!");
        });
    }

    const handlePayment = () => {
        updateStatusByMoneyId();
        // navigate("/payment");
    }

    const updateStatusByMoneyId = async () => {
        setLoading(false);
        if(contributions){
            console.log(">>> contributions: " + JSON.stringify(contributions));
            for(let i = 0; i < contributions.length; i++){
                const moneyId = contributions[i].contributionMoney.id;
                const statusId = 3;
                await dispatch(updateStatusMoney({moneyId, statusId}))
                .then((res) => {
                    setLoading(false);
                })
                .catch((err) => {
                    toast.error("Thanh toán thất bại)");
                })
                // console.log("aloooooooooo")
            }
            navigate("/payment");
            // contributions.map((contribution) => {  
            //     const moneyId = contribution.contributionMoney.id;
            //     const statusId = 3;
                
            // })
             
        }
    }

    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px", marginBottom: 200}}>
            <div className="container-title">
                <div className="section-heading row">
                    <div className='col-12'>
                        <h2 >Chi tiết đóng góp cho dự án của <em>SUN</em><span>SHINE</span></h2>
                        <div className="line-dec"></div>
                        <p style={{paddingLeft: "150px", paddingRight: "150px", paddingTop: 10}}>Sự đóng góp của bạn sẽ góp phần thắp sáng những ước mơ còn dang dở của những người đang gặp khó khăn!</p>
                    </div>
                </div>
            </div>
            
                {showCart ? 
                <>
                    <Row className="detail-cart" style={{fontFamily: "Montserrat", marginTop: 30}}>
                        <Col span={17} style={{background: "#fbfbfb", borderRadius: 15, height: "fit-content"}}>
                        {contributions && contributions.map((contribution, index) => (
                            <Card key={index} style={{margin: 20}}>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <p className="p-title" style={{fontSize: "15px", fontWeight: 500}}><img src={icSunBlue}/><span>Dự án: </span>{contribution.projectName}</p>
                                    <Popconfirm
                                        placement="leftTop"
                                        title={"Xác nhận xóa đơn đóng góp"}
                                        description={"Bạn có chắc chắn muốn xóa đơn này không?"}
                                        onConfirm={() => handleDelete(contribution)}
                                        onText="Xác nhận"
                                        cancelText="Hủy">
                                            <DeleteFilled
                                                style={{color: "#a50f0f", fontSize: 16, paddingLeft: "15px", cursor: "pointer", marginTop: "-40px"}}/>
                                    </Popconfirm>
                                </div>
                                <div className="money-cart" style={{display: "flex", fontFamily: "Montserrat", marginTop: "-25px", marginLeft: 35}}>
                                    <p >Số tiền quyên góp: </p>
                                    <InputNumber
                                        defaultValue={contribution.amountMoney}
                                        // onChange={(money) => handleChange(money)}
                                        onChange={(value) => handleOnChangeInput(value, contribution)} 
                                        style={{fontFamily: "Montserrat", marginLeft: 20 }}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        addonAfter="VND"
                                    />
                                </div>
                                {contribution.contributionArtifacts.length !== 0 && 
                                    <div className="project-table" style={{margin: "20px 40px 0px 35px"}}>
                                        <Table pagination={false} className="project-artifact" columns={columns} dataSource={contribution.contributionArtifacts}/>
                                        <p>*Chú ý: <span>Đối với đơn đóng góp hiện vật vui lòng đợi admin phê duyệt!</span></p>
                                    </div>
                                }
                            </Card>
                        ))}
                        </Col>
                        <Col>
                            <Col style={{borderRadius: 15, marginLeft: 20, width: 355}}>
                                <Card className="card-info" title = "Chọn phương thức thanh toán" style={{fontFamily: "Montserrat"}}>
                                    <Radio.Group style={{fontFamily: "Montserrat"}}>
                                        <Space direction="vertical">
                                            <Radio checked={true} style={{fontFamily: "Montserrat", fontSize: 15, color: "rgb(78 78 78)", fontWeight: 500, marginBottom: 5}}>Thanh toán bằng VNPAY</Radio>
                                            <Radio value={2} style={{fontFamily: "Montserrat", fontSize: 15, color: "rgb(78 78 78)", fontWeight: 500, marginBottom: 10}}>Thanh toán bằng thẻ quốc tế</Radio>
                                            <Radio value={3} style={{fontFamily: "Montserrat", fontSize: 15, color: "rgb(78 78 78)", fontWeight: 500}}>Thanh toán bằng Ví MoMo</Radio>
                                        </Space>
                                    </Radio.Group>
                                </Card>
                            </Col>
                            <Col style={{borderRadius: 15, marginLeft: 20, marginTop: 20, width: 355}}>
                                <Card className="card-info" title = "Thông tin đóng góp" style={{fontFamily: "Montserrat"}}>
                                    <p style={{color: "#b35959"}}><FontAwesomeIcon icon={faSackDollar} style={{color: "#b35959", fontSize: 16, marginRight: 10}}></FontAwesomeIcon>
                                        Tổng tiền: <span style={{fontSize: 16}}>{sumMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></p>
                                    <Button loading={loading} className="btn btn-danger" style={{width: "100%", height: 45}}
                                        onClick = {() => {handlePayment()}}
                                        >Thanh toán</Button>
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