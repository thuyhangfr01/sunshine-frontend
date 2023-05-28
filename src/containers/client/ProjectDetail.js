import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ProjectDataService from "../../services/project.service";
import {retrieveProjs} from "../../slices/projects";
import {getContributionsByProjectIdByStatus} from "../../slices/contribution";

import "./Project.scss";
import {Tabs, Row, Col, Carousel, Button} from "antd";
import {Table, Divider, Image, Spin} from 'antd';
import BeatLoader from "react-spinners/BeatLoader";
import icSunRed from "../../assets//images/ic_sunRed.png";
import icSunBlue from "../../assets/images/ic_sunBlue.png";
import AboutLeft from "../../assets/images/about_left.png";
import TablesLRight from "../../assets/images/tables_right_dec.png";
import moment from "moment";
import vi from "moment/locale/vi";
import ProjectDonation from "./ProjectDonation";
import ProjectVolunteer from "./ProjectVolunteer";

const ProjectDetail = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
  
    const { id } = useParams();
    const [currentProjectId, setCurrentProjectId] = useState(id);
    const [currentProject, setCurrentProject] = useState({});
    const [currentUserId, setCurrentUserId] = useState(null);
    const [status, setStatus] = useState("");
    const [images, setImages] = useState([]);
    const [money, setMoney] = useState([]);
    const [totalMoney, setTotalMoney] = useState([]);
    const [per, setPer] = useState([]);
    const [artifacts, setArtifacts] = useState([]);
    const [proofs, setProofs] = useState([]);

    const [openModalProjectDonation, setOpenModalProjectDonation] = useState(false);
    const [openModalProjectVolunteer, setOpenModalProjectVolunteer] = useState(false);

    const {user: currentUser} = useSelector((state) => (state.auth));
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
      },
      {
        title: 'Đơn vị',
        dataIndex: 'calculationUnit',
      }
    ];
    const [dataSource, setDataSource] = useState([]);

    //sort createdAt
    const compareTime = (a, b) => {
      if(a<b){
          return -1;
      }
      if(a>b){
          return 1;
      }
      return 0;
    }

    const columnsReport = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => (index + 1),
        },
        {
          title: 'Mã đóng góp',
          dataIndex: 'id',
          render: (text, record, index) => {
            return (<p>{text}</p>)
          },
        },
        {
          title: 'Người gửi',
          dataIndex: 'nickname',
          render: (text, record, index) => {
            return (<p style={{fontSize: 14}}>{text}</p>)
          }
        },
        {
          title: 'Lời nhắn',
          dataIndex: 'messages',
          render: (text, record, index) => {
            return (<p style={{fontSize: 15, fontWeight: 500}}>{text}</p>)
          }
        },
        {
          title: 'Số tiền',
          dataIndex: 'contributionMoney',
          render: (text, record, index) => {
            return {
              props: { style: { fontSize: 15, fontWeight: 500 }},
              children: text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
            }
          }
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            render: (text, record, index) => {
              return {
                props: { style: { fontSize: 15, fontWeight: 500 }},
                children: moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
              };
            },
            sorter: (a,b) => compareTime(a.createdAt, b.createdAt),
        },
      ];
    const [dataSourceReport, setDataSourceReport] = useState([]);

    //lay ra tat ca don dong gop
    const getContributions = () => {
      const id = currentProjectId;
      dispatch(getContributionsByProjectIdByStatus({id}))
        .then((res) => {
          setDataSourceReport(res.payload);
        })
    }
    useEffect(getContributions, [currentProjectId]);

    //lay tat ca project
    useEffect(() => {
      dispatch(retrieveProjs())
    }, [])

    //lay ra project hien tai
    const getCurrentProject = currentProjectId => {
      setLoading(true);
      ProjectDataService.get(currentProjectId)
        .then(response => {
          const id = currentProjectId;
          console.log("currentId: " + id);
          setLoading(false);
          setCurrentProject(response.data);
          setStatus(response.data.projectStatus.name);
          })
        .catch(e => {
          console.log(e);
        });
    };

    //lay ra tat ca anh cua project
    const getAllImages = (currentProjectId) => {
      setLoadingImg(true);
      ProjectDataService.getAllImages(currentProjectId)
        .then(response => {
          setLoadingImg(false)
          setImages(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    //lay ra money cua project
    const getAllMoney = (currentProjectId) => {
      ProjectDataService.getAllMoney(currentProjectId)
        .then(response => {
          setMoney(response.data[0].minMoney);
        })
        .catch(e => {
          console.log(e);
        });
    }

    //lay ra hien vat cua project
    const getAllArtifacts = (currentProjectId) => {
      ProjectDataService.getAllArtifacts(currentProjectId)
        .then(response => {
          setArtifacts(response.data);
          setDataSource(response.data);
      })
        .catch(e => {
          console.log(e);
        });
    }

    //lay ra tat ca anh minh chung cua project
    const getAllProofs = (currentProjectId) => {
      ProjectDataService.getAllProofs(currentProjectId)
        .then(response => {
          setProofs(response.data);
      })
        .catch(e => {
          console.log(e);
        });
    }

    const getTotalMoney = (currentProjectId) => {
      ProjectDataService.getTotalMoneyByProjectId(currentProjectId)
        .then(response => {
          // console.log("hmmm: " + JSON.stringify(response.data.totalMoney));
          setTotalMoney(response.data.totalMoney)
      })
        .catch(e => {
          console.log(e);
          setTotalMoney(0)
        });
    }

    const setValueProgressBar = () => {
      const a = money;
      const b = totalMoney;
      if(a && b && a !== 0 && a !== NaN && b !== NaN)
        setPer((b/a)*100);
    }
    useEffect(() => {
      if (currentProjectId){
        getCurrentProject(currentProjectId);
        getAllImages(currentProjectId);
        getAllMoney(currentProjectId);
        getAllArtifacts(currentProjectId);
        getAllProofs(currentProjectId);
        getTotalMoney(currentProjectId);
      }
    }, [currentProjectId]);
    useEffect(() => {
      if(money && totalMoney) {
        setValueProgressBar();
      }
    }, [money, totalMoney]);
    //lay ra index phia truoc cua project
    const getPrevCurrent = () => {
      const prevIndex = (totalProj.findIndex(proj => proj.id === currentProject.id)) - 1;
      const prevProject = totalProj[prevIndex];
      setCurrentProject(prevProject);
      setCurrentProjectId(prevProject.id);
      navigate("/project/" + prevProject.id);
    }

     //lay ra index phia sau cua project
    const getNextCurrent = () => {
      const nextIndex = (totalProj.findIndex(proj => proj.id === currentProject.id)) + 1;
      const nextProject = totalProj[nextIndex];
      setCurrentProject(nextProject);
      setCurrentProjectId(nextProject.id);
      navigate("/project/" + nextProject.id);
    }

    const handlePrevProject = () => {
      getPrevCurrent();
    }

    const handleNextProject = () => {
      getNextCurrent();
    }

    const handleShowModal = () => {
      if(currentUser){
        setCurrentUserId(currentUser.id);
        setOpenModalProjectDonation(true);
      }
      else{
        toast.error("Vui lòng đăng nhập để tiếp tục!");
      }
    }

    const handleShowModalVolunteer = () => {
      setOpenModalProjectVolunteer(true);
    }

    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px", marginBottom: 100}}>
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
              {loading ? 
                <div style={{height: 300}}>
                    <BeatLoader
                        color="#17709b"
                        loading={loading}
                        size={15}
                        cssOverride={{marginLeft: "50%", marginTop: "20%"}}
                    ></BeatLoader> 
                </div>
              : 
                <>
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
                      <p className='project-amountRequest'>*Cần huy động:<span> {money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></p>
                      <p className='project-amountReceipt'>*Tiền góp được:<span>{totalMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></p>
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                          style={{width: `${per}%`}}></div>
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
                    <Spin spinning={loadingImg}>
                        <Carousel autoplay>
                            {images.map((image, index) => (
                              <div key={index}>
                                <Image src={image.name} />
                              </div>
                            ))}
                        </Carousel>
                      </Spin>
                  </Col>
                </Row>

                <Row className="project-row3">
                    <Divider orientation="right">
                      {currentProject.numVolunteers === 0 || status !== "Đang vận động" ? 
                        <button type="button" className="btn btn-info" disabled>Đăng ký tình nguyện viên</button>  
                      : 
                        <button type="button" className="btn btn-info" onClick={handleShowModalVolunteer}>Đăng ký tình nguyện viên</button>  
                      }

                      {status === "Đang vận động" ?
                        <button type="button" className="btn btn-danger" onClick={handleShowModal}>Đóng góp</button>
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

                
                  <Row className="project-row6">
                    <Divider  orientation="left" orientationMargin="0"> 
                    <p className="project-title"><img src={icSunBlue}/>Hình ảnh dự án được triển khai</p></Divider>
                    {proofs.map((proof, index) => (
                      <Image.PreviewGroup key={index} className="project-proof">
                        <Image src={proof.name} style={{height: 240, width: 285}}/>
                      </Image.PreviewGroup>
                      ))
                    }
                  </Row>
                </>
              }
            </Tabs.TabPane>

            <Tabs.TabPane tab="Tiến độ ủng hộ" key="tab2">
              <Spin spinning={loading}>
                <Table columns={columnsReport} dataSource={dataSourceReport}
                    style={{marginTop: 20}}
                    pagination={false}/>
              </Spin>
            </Tabs.TabPane>
          </Tabs>

          <ProjectDonation
              openModalProjectDonation = {openModalProjectDonation}
              setOpenModalProjectDonation = {setOpenModalProjectDonation}
              currentUserId = {currentUserId}
              currentProjectId = {currentProjectId}
              currentProject = {currentProject}
              dataSource = {dataSource}
              totalMoney = {totalMoney}
              money = {money}
          />

          <ProjectVolunteer
             openModalProjectVolunteer = {openModalProjectVolunteer}
             setOpenModalProjectVolunteer = {setOpenModalProjectVolunteer}
             currentProject = {currentProject}
          />
        </div>
    )
}
export default ProjectDetail;