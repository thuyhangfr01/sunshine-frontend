// import 'antd/dist/antd.css';
import "./Project.scss";
import {Tabs, Row, Col, Carousel} from "antd";
import { Space, Table, Tag, Divider, Image } from 'antd';
import icSunRed from "../../src/assets/images/ic_sunRed.png";
import icSunBlue from "../../src/assets/images/ic_sunBlue.png";
import tnCovid3 from "../../src/assets/images/tn_covid3.jpeg";
import tnCovid5 from "../../src/assets/images/tn_covid5.jpg";
import tnCovid10 from "../../src/assets/images/tn_covid10.jpg";
import AboutLeft from "./../assets/images/about_left.png";
import TablesLRight from "../assets/images/tables_right_dec.png";

const columns = [
  {
    title: 'Tên hiện vật',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity'
  },
]

const data = [
  {
    name: "Bàn",
    quantity: "20"
  },
  {
    name: "Ghế",
    quantity: "30"
  },
]

const ProjectDetail = () => {
    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px"}}>
          <div class="container-title">
            <div class="section-heading row">
                <div className='col-12'>
                  <h2 >Những dự án từ thiện của <em>SUN</em><span>SHINE</span></h2>
                  <div class="line-dec"></div>
                  <p style={{paddingLeft: "150px", paddingRight: "150px"}}>Từ nhiều năm nay, Quỹ Từ thiện Sunshine đã và đang tiếp tục thực hiện nhiều dự án thiện nguyện đến cộng đồng hơn với hy vọng lan tỏa yêu thương, gắn kết mọi người. </p>
                  </div>
            </div>
          </div>
          <div class="services-left-dec">
            <img src={AboutLeft} 
                style={{  width: "240px",
                    height: "410px",
                    left: "-112px",
                    top: "170px",
                    position: "absolute",
                    zIndex: "1"}}
                alt=""/>
          </div>
          <div class="tables-right-dec">
            <img src={TablesLRight} alt="" style={{
              width: "135px",
              height: "344px",
              right: "0",
              left: "1445px",
              top: "715px",
              position: "absolute",
              zIndex: "1",
            }}/>
          </div>
          <Tabs className="project-tab" style={{fontFamily: 'Montserrat', marginTop: "20px"}}>
            <Tabs.TabPane tab="Thông tin chi tiết" key="tab1">
              <Row className="project-row1">
                <Col span={20}>
                    <p className="project-title"><img src={icSunRed}/>Trụ cột bất ngờ gặp nạn, gia đình khó khăn chồng chất</p>
                </Col>
                <Col span={4}><p className="project-status"><span>Trạng thái: </span>Đang vận động</p></Col>
              </Row>
              
              <Row className="project-row2">
                <Col className="project-info" span={12}>
                  <div>
                    <p className='project-amountRequest'>*Cần huy động:<span> 10.000.000 VND</span></p>
                    <p className='project-amountReceipt'>*Tiền góp được:<span> 8.000.000 VND</span></p>
                    <div class="progress">
                      <div class="progress-bar progress-bar-striped " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                          style={{width: "75%"}}></div>
                    </div>
                    <p className='project-numVolunteers'>*Số lượng tình nguyện viên:<span> 20 tình nguyện viên</span></p>
                    <div className="project-table">
                      <p>*Thông tin hiện vật kêu gọi:</p>
                      <Table className="project-artifact" columns={columns} dataSource={data}/>
                    </div>
                  </div>
                </Col>
                <Col className="project-img" span={12}>
                  <Carousel autoplay>
                    <div>
                      <h3 style={{  height: '400px',
                        color: '#fff',
                        lineHeight: '160px',
                        textAlign: 'center',
                        background: '#364d79',}}>1</h3>
                    </div>
                    <div>
                      <h3 style={{  height: '400px',
                        color: '#fff',
                        lineHeight: '160px',
                        textAlign: 'center',
                        background: '#364d79',}}>2</h3>
                    </div>
                    <div>
                      <h3 style={{  height: '400px',
                        color: '#fff',
                        lineHeight: '160px',
                        textAlign: 'center',
                        background: '#364d79',}}>3</h3>
                    </div>
                    <div>
                      <h3 style={{  height: '400px',
                        color: '#fff',
                        lineHeight: '160px',
                        textAlign: 'center',
                        background: '#364d79',}}>4</h3>
                    </div>
                  </Carousel>
                </Col>
              </Row>

              <Row className="project-row3">
                  <Divider orientation="right">
                    <button type="button" className="btn btn-info">Đăng ký tình nguyện viên</button>
                    <button type="button" className="btn btn-danger">Đóng góp</button>
                  </Divider>
              </Row>

              <Row className="project-row4">
                <text>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</text>
                <br/>
                <text>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</text>
              </Row>

              <Row className="project-row5">
                <Col className="project-text" span={24}>
                  <p className="project-text">**Vui lòng chú ý các mốc thời gian của dự án:</p></Col>
                <Col className="project-time-left" span={8}>
                  <p>*Thời gian vận động:<span> 23/04/2023 8:00:00</span></p>
                </Col>
                <Col className="project-time-right" span={8}>
                  <p>*Thời gian kết thúc:<span> 23/04/2023 8:00:00</span></p>
                </Col >  
                <Col className="project-time-right" span={8}>
                  <p>*Thời gian tổ chức:<span> 23/04/2023 8:00:00</span></p>
                </Col >  
                <Col className="project-time-right" span={24}>
                  <p>*Địa điểm tổ chức:<span> 02 Thanh Sơn, phường Thanh Bình, quận Hải Châu, Đà Nẵng </span></p>
                </Col>
                <Col className="project-time-right" span={24}>
                  <p>*Địa điểm nhận hiện vật:<span> 02 Thanh Sơn, phường Thanh Bình, quận Hải Châu, Đà Nẵng </span></p>
                </Col>
                <Col className="project-text" span={24}>
                  <p className="project-text">**Vui lòng chuyển khoản qua các số tài khoản sau:</p></Col>
                <Col className="project-time-right" span={24}>
                  <p>*Số tài khoản 1:<span> – 6420201012822 – Ngân hàng Agribank – Chi nhánh 10</span></p>
                  <p>*Số tài khoản 2:<span> – 6420201012822 – Ngân hàng Agribank – Chi nhánh 10</span></p>
                </Col>
              </Row>

              <Row className="project-row6">
                <Divider  orientation="left" orientationMargin="0"> 
                  <p className="project-title"><img src={icSunBlue}/>Hình ảnh dự án được triển khai</p></Divider>
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                  >
                    <Image width={300} src="https://res.cloudinary.com/dp0hbi49d/image/upload/v1682440439/sunshine/mc_ngang12_ikjmox.jpg" />
                    <Image width={300} src="https://res.cloudinary.com/dp0hbi49d/image/upload/v1682440439/sunshine/mc_ngang14_rdxsso.jpg"/>
                    <Image width={300} src="https://res.cloudinary.com/dp0hbi49d/image/upload/v1682440437/sunshine/mc_don1_wsb32q.jpg"/>
                  </Image.PreviewGroup>
              </Row>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Tiến độ ủng hộ" key="tab2">
              <p className="project-tab" ><img src={icSunRed}/>Trụ cột bất ngờ gặp nạn, gia đình khó khăn chồng chất</p>
            </Tabs.TabPane>
          </Tabs>
        </div>
    )
}
export default ProjectDetail;