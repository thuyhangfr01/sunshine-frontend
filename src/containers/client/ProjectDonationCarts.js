import {Row, Col, Card, InputNumber, Table, Radio, Space} from "antd";
import {DeleteFilled} from '@ant-design/icons';

const ProjectDonationCarts = () => {
    const columns = [
        {
          title: 'Tên hiện vật',
          dataIndex: 'artifactName',
        },
        {
          title: 'Số lượng',
          dataIndex: 'minQuantity',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'calculationUnit',
        }
      ];
    const dataSource  = [
        {
            artifactName: "Bàn",
            minQuantity: 10,
            calculationUnit: "Cái"
        },
        {
            artifactName: "Bàn",
            minQuantity: 10,
            calculationUnit: "Cái"
        },
    ];

    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px", height: 900}}>
            <div className="container-title">
                <div className="section-heading row">
                    <div className='col-12'>
                        <h2 >Chi tiết đóng góp cho dự án của <em>SUN</em><span>SHINE</span></h2>
                        <div className="line-dec"></div>
                        <p style={{paddingLeft: "150px", paddingRight: "150px"}}>Sự đóng góp của bạn sẽ góp phần thắp sáng những ước mơ còn dang dở của những người đang gặp khó khăn!</p>
                    </div>
                </div>
            </div>
            <Row style={{fontFamily: "Montserrat", marginTop: 50}}>
                <Col span={17} style={{background: "#fbfbfb", borderRadius: 15, height: "fit-content"}}>
                    <Card style={{margin: 20}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <p style={{fontSize: "15px", fontWeight: 500}}>Cuộc sống khó khăn phải về quê sống nhờ cha mẹ, không may gặp nạn trên đường đi</p>
                            <DeleteFilled style={{color: "#a50f0f", fontSize: 16, paddingLeft: "15px"}}/>
                        </div>
                        {dataSource.length !== 0 ? 
                            <div className="project-table" style={{marginBottom: 20}}>
                            <Table pagination={false} className="project-artifact" columns={columns} dataSource={dataSource}/>
                            </div>
                        :
                            <p className="project-notice">*Dự án không kêu gọi hiện vật nhưng bạn vẫn có thể gửi đơn xin đóng góp cho chúng tôi. Chân thành cảm ơn!</p>
                        }
                        <div style={{marginTop: 20, display: "flex", justifyContent: "space-between"}}>
                            <InputNumber
                                min={0}
                                style={{fontFamily: "Montserrat" }}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                addonAfter="VND"
                            />
                            <p>Số tiền đóng góp: <span>30.000.000 VNĐ</span></p>
                        </div>
                    </Card>
                    <Card style={{margin: 20}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <p style={{fontSize: "15px", fontWeight: 500}}>Cuộc sống khó khăn phải về quê sống nhờ cha mẹ, không may gặp nạn trên đường đi</p>
                            <DeleteFilled style={{color: "#a50f0f", fontSize: 16, paddingLeft: "15px"}}/>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <InputNumber
                                min={0}
                                style={{fontFamily: "Montserrat" }}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                addonAfter="VND"
                            />
                            <p>Số tiền đóng góp: <span>30.000.000 VNĐ</span></p>
                        </div>
                    </Card>
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
                            <p>Tổng tiền đóng góp: <span>3.000.000 VNĐ</span></p>
                            <p>*Chú ý: <span>Vui lòng chờ Admin duyệt đơn đóng góp hiện vật của bạn!</span></p>
                            <button className="btn btn-danger" style={{width: "100%"}}>Thanh toán</button>
                        </Card>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default ProjectDonationCarts;