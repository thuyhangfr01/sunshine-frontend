import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';

import {Tabs, Row, Col, Carousel, Button, Table, Divider, Image, Spin} from "antd";
import icSunRed from "../../assets//images/ic_sunRed.png";
import icSunBlue from "../../assets/images/ic_sunBlue.png";
import AboutLeft from "../../assets/images/about_left.png";
import TablesLRight from "../../assets/images/tables_right_dec.png";
import moment from "moment";
import vi from "moment/locale/vi";
import "./Project.scss";

import {retrieveProject} from "../../slices/projects";

const Custom = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [currentProjectId, setCurrentProjectId] = useState(id);
    const [currentProject, setCurrentProject] = useState({});

    const [loading, setLoading] = useState(false);

    //hien vat
    const columnsArtifact = [
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
      const [dataSourceArtifact, setDataSourceArtifact] = useState([]);

    //lay ra thong tin cua project theo id
    const getCurrentProject = () => {
        setLoading(true);
        if(currentProjectId){
            const id = currentProjectId;
            dispatch(retrieveProject({id}))
            .then(response => {
                setCurrentProject(response.data);
                setCurrentProjectId(response.data.id);
                setDataSourceArtifact(response.data.projectArtifacts);
                console.log("currentId: " + id);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            });
        }
    };

    useEffect(getCurrentProject, [currentProjectId]);


    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px", marginBottom: 100}}>
            <div className="container-title">
                <div className="section-heading row">
                    <div className='col-12'>
                        <h2 >Những dự án từ thiện của <em>SUN</em><span>SHINE</span></h2>
                        <div className="line-dec"></div>
                        <p style={{paddingLeft: "150px", paddingRight: "150px", paddingTop: 5}}>Từ nhiều năm nay, Quỹ Từ thiện Sunshine đã và đang tiếp tục thực hiện nhiều dự án thiện nguyện đến cộng đồng hơn với hy vọng lan tỏa yêu thương, gắn kết mọi người. </p>
                    </div>
                </div>
        </div>
        <div className="services-left-dec">
          <img src={AboutLeft} 
              style={{  width: "240px",
                  height: "410px",
                  left: "-112px",
                  top: "170px",
                  position: "absolute",
                  zIndex: "1"}}
              alt=""/>
        </div>
        <div className="tables-right-dec">
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
        <div className="project-group-btn">
          <Button className="project-btn" type="primary" size="large"
            //   onClick={() => handlePrevProject()}
              style={{marginRight: "10px"}}
              > <span className="title"><b>&#8249;&#8249; </b>Trước</span>
            </Button>
          <Button className="project-btn" type="primary" size="large"
            // onClick={() => handleNextProject()}
          > <span className="title">Tiếp<b> &#8250;&#8250;</b></span>
          </Button>
        </div>
        <Tabs className="project-tab" style={{fontFamily: 'Montserrat', marginTop: "20px"}}>
          <Tabs.TabPane tab="Thông tin chi tiết" key="tab1">
            <Row className="project-row1">
                <Col span={20}>
                    <p className="project-title"><img src={icSunRed}/>{currentProject?.name}</p>
                </Col>
                <Col span={4}>
                    <p className="project-status"><span>Trạng thái: </span>{currentProject?.projectStatus?.name}</p>
                </Col>
            </Row>
            
            <Row className="project-row2">
                <Col className="project-info" span={12}>
                    <div>
                        <p className='project-amountRequest'>*Cần huy động:<span> {currentProject?.projectMonies[0]?.minMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></p>
                        {/* <p className='project-amountReceipt'>*Tiền góp được:<span>{totalMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></p> */}
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                        style={{width: `75%`}}></div>
                    </div>
                    {currentProject?.numVolunteers !== 0 ?
                        <p className='project-numVolunteers'>*Số lượng tình nguyện viên:<span> {currentProject?.numVolunteers} tình nguyện viên</span></p>
                    :
                        <p className="project-notice-vol">*Dự án không cần tình nguyện viên.</p>
                    } 
                    {dataSourceArtifact?.length !== 0 ? 
                        <div className="project-table">
                            <p>*Thông tin hiện vật kêu gọi:</p>
                            <Table className="project-artifact" columns={columnsArtifact} dataSource={dataSourceArtifact}/>
                        </div>
                    :
                        <p className="project-notice">*Dự án không kêu gọi hiện vật nhưng bạn vẫn có thể gửi đơn xin đóng góp cho chúng tôi. Chân thành cảm ơn!</p>
                    }
                    
                    </div>
                </Col>
                <Col className="project-img" span={12}>
                    <Carousel autoplay>
                        {currentProject?.projectImages?.map((image, index) => (
                        <div key={index}>
                            <Image src={image.name} />
                        </div>
                        ))}
                    </Carousel>
                </Col>
            </Row>

            <Row className="project-row3">
                <Divider orientation="right">
                {currentProject?.numVolunteers === 0 || currentProject?.projectStatus?.name !== "Đang vận động" ? 
                    <button type="button" className="btn btn-info" disabled>Đăng ký tình nguyện viên</button>  
                : 
                    <button type="button" className="btn btn-info" >Đăng ký tình nguyện viên</button>  
                }

                {currentProject?.projectStatus?.name === "Đang vận động" ?
                    <button type="button" className="btn btn-danger">Đóng góp</button>
                :
                    <button type="button" className="btn btn-danger" disabled>Đóng góp</button>
                }                 
                
                </Divider>
            </Row>

            <Row className="project-row4">
                <p>{currentProject?.details}</p>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </Row>

            <Row className="project-row5">
                <Col className="project-text" span={24}>
                    <p className="project-text">**Vui lòng chú ý các mốc thời gian của dự án:</p></Col>
                <Col className="project-time-left" span={8}>
                    <p>*Thời gian vận động:<span> {moment(currentProject?.startTime).locale("vi", vi).format("DD/MM/YYYY - HH:mm")}</span></p>
                </Col>
                <Col className="project-time-right" span={8}>
                    <p>*Thời gian kết thúc:<span> {moment(currentProject?.endTime).locale("vi", vi).format("DD/MM/YYYY - HH:mm")}</span></p>
                </Col >  
                <Col className="project-time-right" span={8}>
                    <p>*Thời gian tổ chức:<span> {moment(currentProject?.holdTime).locale("vi", vi).format("DD/MM/YYYY - HH:mm")}</span></p>
                </Col >  
                <Col className="project-time-right" span={24}>
                    <p>*Địa điểm tổ chức:<span> {currentProject?.position} </span></p>
                </Col>
                <Col className="project-time-right" span={24}>
                    <p>*Địa điểm nhận hiện vật:<span> 02 Thanh Sơn, phường Thanh Bình, quận Hải Châu, Đà Nẵng </span></p>
                </Col>
                <Col className="project-text" span={24}>
                    <p className="project-text">**Vui lòng chuyển khoản qua các số tài khoản sau:</p></Col>
                <Col className="project-time-right" span={24}>
                    <p>*Số tài khoản 1:<span> – 6420201012822 – Ngân hàng Agribank – Chi nhánh 10</span></p>
                    <p>*Số tài khoản 2:<span> – 6420201012122 – Ngân hàng VPBank – Chi nhánh 12</span></p>
                </Col>
            </Row>   

            <Row className="project-row6">
                <Divider  orientation="left" orientationMargin="0"> 
                <p className="project-title"><img src={icSunBlue}/>Hình ảnh dự án được triển khai</p></Divider>
                {currentProject?.projectProofs && currentProject?.projectProofs.map((proof, index) => (
                    <Image.PreviewGroup key={index} className="project-proof">
                        <Image src={proof.name} style={{height: 240, width: 285}}/>
                    </Image.PreviewGroup>
                ))
                }
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Tiến độ ủng hộ" key="tab2">
            {/* <Spin spinning={loading}>
              <Table columns={columnsReport} dataSource={dataSourceReport}
                  style={{marginTop: 20}}
                  pagination={false}/>
            </Spin> */}
          </Tabs.TabPane>

          <Tabs.TabPane tab="Tiến độ triển khai" key="tab3">
            {/* <Table columns={columnsPayment} dataSource={dataSourcePayment}
                style={{marginTop: 20}}
                pagination={false}/> */}
          </Tabs.TabPane>
        </Tabs>

      </div>
    )
}

export default Custom;