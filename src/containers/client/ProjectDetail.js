import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';

import ProjectDataService from "../../services/project.service";
import {retrieveProjs} from "../../slices/projects";

import "./Project.scss";
import {Tabs, Row, Col, Carousel, Button} from "antd";
import {Table, Divider, Image} from 'antd';
import icSunRed from "../../assets//images/ic_sunRed.png";
import icSunBlue from "../../assets/images/ic_sunBlue.png";
import AboutLeft from "../../assets/images/about_left.png";
import TablesLRight from "../../assets/images/tables_right_dec.png";
import moment from "moment";
import vi from "moment/locale/vi";

const ProjectDetail = () => {
    let navigate = useNavigate();

    const { id } = useParams();
    const [currentId, setCurrentId] = useState(id);
    const [currentProject, setCurrentProject] = useState({});
    const [status, setStatus] = useState("");
    const [images, setImages] = useState([]);
    const [money, setMoney] = useState([]);
    const [artifacts, setArtifacts] = useState([]);
    const [proofs, setProofs] = useState([]);

    const totalProj = useSelector((state) => state.projects)
    const dispatch = useDispatch();
    const columns = [
      {
        title: 'Tên hiện vật',
        dataIndex: 'artifactName',
      },
      {
        title: 'Số lượng',
        dataIndex: 'minQuantity',
      }
    ];
    const [dataSource, setDataSource] = useState([]);

    //lay tat ca project
    useEffect(() => {
      dispatch(retrieveProjs())
    }, [])

    //lay ra project hien tai
    const getCurrentProject = currentId => {
      ProjectDataService.get(currentId)
        .then(response => {
          setCurrentProject(response.data);
          setStatus(response.data.projectStatus.name);
        })
        .catch(e => {
          console.log(e);
        });
    };

    //lay ra tat ca anh cua project
    const getAllImages = (currentId) => {
      ProjectDataService.getAllImages(currentId)
        .then(response => {
          setImages(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    //lay ra money cua project
    const getAllMoney = (currentId) => {
      ProjectDataService.getAllMoney(currentId)
        .then(response => {
          setMoney(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    //lay ra hien vat cua project
    const getAllArtifacts = (currentId) => {
      ProjectDataService.getAllArtifacts(currentId)
        .then(response => {
          setArtifacts(response.data);
          setDataSource(response.data);
      })
        .catch(e => {
          console.log(e);
        });
    }

    //lay ra tat ca anh minh chung cua project
    const getAllProofs = (currentId) => {
      ProjectDataService.getAllProofs(currentId)
        .then(response => {
          setProofs(response.data);
      })
        .catch(e => {
          console.log(e);
        });
    }

    useEffect(() => {
      if (currentId){
        getCurrentProject(currentId);
        getAllImages(currentId);
        getAllMoney(currentId);
        getAllArtifacts(currentId);
        getAllProofs(currentId);
      }
    }, [currentId]);
    
    console.log("curr" + currentProject);
    
    //lay ra index phia truoc cua project
    const getPrevCurrent = () => {
      const prevIndex = (totalProj.findIndex(proj => proj.id === currentProject.id)) - 1;
      const prevProject = totalProj[prevIndex];
      setCurrentProject(prevProject);
      setCurrentId(prevProject.id);
      navigate("/project/" + prevProject.id);
    }

     //lay ra index phia sau cua project
    const getNextCurrent = () => {
      const nextIndex = (totalProj.findIndex(proj => proj.id === currentProject.id)) + 1;
      const nextProject = totalProj[nextIndex];
      setCurrentProject(nextProject);
      setCurrentId(nextProject.id);
      navigate("/project/" + nextProject.id);
    }

    const handlePrevProject = () => {
      getPrevCurrent();
    }

    const handleNextProject = () => {
      getNextCurrent();
    }

    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px"}}>
          <div className="container-title">
            <div className="section-heading row">
                <div className='col-12'>
                  <h2 >Những dự án từ thiện của <em>SUN</em><span>SHINE</span></h2>
                  <div className="line-dec"></div>
                  <p style={{paddingLeft: "150px", paddingRight: "150px"}}>Từ nhiều năm nay, Quỹ Từ thiện Sunshine đã và đang tiếp tục thực hiện nhiều dự án thiện nguyện đến cộng đồng hơn với hy vọng lan tỏa yêu thương, gắn kết mọi người. </p>
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
                  onClick={() => handlePrevProject()}
                  style={{marginRight: "10px"}}
                  > <span className="title"><b>&#8249;&#8249; </b>Trước</span>
                </Button>
              <Button className="project-btn" type="primary" size="large"
                onClick={() => handleNextProject()}
              > <span className="title">Tiếp<b> &#8250;&#8250;</b></span>
              </Button>
            </div>
            <Tabs className="project-tab" style={{fontFamily: 'Montserrat', marginTop: "20px"}}>
              <Tabs.TabPane tab="Thông tin chi tiết" key="tab1">
                <Row className="project-row1">
                  <Col span={20}>
                      <p className="project-title"><img src={icSunRed}/>{currentProject.name}</p>
                  </Col>
                  <Col span={4}>
                    <p className="project-status"><span>Trạng thái: </span>{status}</p>
                    </Col>
                </Row>
                
                <Row className="project-row2">
                  <Col className="project-info" span={12}>
                    <div>
                      {money.map((_money, index) => (
                        <p key={index} className='project-amountRequest'>*Cần huy động:<span> {_money.minMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></p>
                      ))}
                      <p className='project-amountReceipt'>*Tiền góp được:<span> 8.000.000 VND</span></p>
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                            style={{width: "75%"}}></div>
                      </div>
                      {currentProject.numVolunteers !== 0 ?
                        <p className='project-numVolunteers'>*Số lượng tình nguyện viên:<span> {currentProject.numVolunteers} tình nguyện viên</span></p>
                      :
                        <p className="project-notice-vol">*Dự án không cần tình nguyện viên.</p>
                      } 
                      {dataSource.length !== 0 ? 
                        <div className="project-table">
                          <p>*Thông tin hiện vật kêu gọi:</p>
                          <Table className="project-artifact" columns={columns} dataSource={dataSource}/>
                        </div>
                      :
                        <p className="project-notice">*Dự án không kêu gọi hiện vật nhưng bạn vẫn có thể gửi đơn xin đóng góp cho chúng tôi. Chân thành cảm ơn!</p>
                      }
                      
                    </div>
                  </Col>
                  <Col className="project-img" span={12}>
                    <Carousel autoplay>
                      {images.map((image, index) => (
                        <div key={index}>
                          <Image src={image.name} />
                        </div>
                      ))}
                    </Carousel>
                  </Col>
                </Row>

                <Row className="project-row3">
                    <Divider orientation="right">
                      {currentProject.numVolunteers === 0 || status !== "Đang vận động" ? 
                        <button type="button" className="btn btn-info" disabled>Đăng ký tình nguyện viên</button>  
                      : 
                        <button type="button" className="btn btn-info">Đăng ký tình nguyện viên</button>  
                      }

                      {status === "Đang vận động" ?
                        <button type="button" className="btn btn-danger">Đóng góp</button>
                      :
                        <button type="button" className="btn btn-danger" disabled>Đóng góp</button>
                      }                 
                      
                    </Divider>
                </Row>

                <Row className="project-row4">
                  <p>{currentProject.details}</p>
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </Row>

                <Row className="project-row5">
                  <Col className="project-text" span={24}>
                    <p className="project-text">**Vui lòng chú ý các mốc thời gian của dự án:</p></Col>
                  <Col className="project-time-left" span={8}>
                    <p>*Thời gian vận động:<span> {moment(currentProject.startTime).locale("vi", vi).format("DD/MM/YYYY - HH:mm")}</span></p>
                  </Col>
                  <Col className="project-time-right" span={8}>
                    <p>*Thời gian kết thúc:<span> {moment(currentProject.endTime).locale("vi", vi).format("DD/MM/YYYY - HH:mm")}</span></p>
                  </Col >  
                  <Col className="project-time-right" span={8}>
                    <p>*Thời gian tổ chức:<span> {moment(currentProject.holdTime).locale("vi", vi).format("DD/MM/YYYY - HH:mm")}</span></p>
                  </Col >  
                  <Col className="project-time-right" span={24}>
                    <p>*Địa điểm tổ chức:<span> {currentProject.position} </span></p>
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

                {proofs.map((proof, index) => (
                  <Row key={index} className="project-row6">
                    <Divider  orientation="left" orientationMargin="0"> 
                    <p className="project-title"><img src={icSunBlue}/>Hình ảnh dự án được triển khai</p></Divider>
                    <Image.PreviewGroup className="project-proof"
                      preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                      }}
                    >
                      <Image src={proof.name} />
                    </Image.PreviewGroup>
                  </Row>
                ))
                }
              </Tabs.TabPane>

              <Tabs.TabPane tab="Tiến độ ủng hộ" key="tab2">
                <p className="project-tab" ><img src={icSunRed}/>Trụ cột bất ngờ gặp nạn, gia đình khó khăn chồng chất</p>
              </Tabs.TabPane>
            </Tabs>
        </div>
    )
}
export default ProjectDetail;