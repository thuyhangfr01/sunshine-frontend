import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';

import {Tabs, Row, Col, Carousel, Button, Table, Divider, Image, Spin} from "antd";
import icSunRed from "../../assets//images/ic_sunRed.png";
import icSunBlue from "../../assets/images/ic_sunBlue.png";
import AboutLeft from "../../assets/images/about_left.png";
import TablesLRight from "../../assets/images/tables_right_dec.png";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from 'react-toastify';
import moment from "moment";
import vi from "moment/locale/vi";
import "./Project.scss";
import "../../containers/client/contribution/HistoryContribution.scss";

import {retrieveProject, getTotalMoneyByProjectId, retrieveProjs, getPaymentsByProjectId} from "../../slices/projects";
import {getContributionsByProjectIdByStatus} from "../../slices/contribution";
import ProjectDonation from "./ProjectDonation";
import ProjectVolunteer from "./ProjectVolunteer";

const ProjectDetail = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { id } = useParams();
    const {user: currentUser} = useSelector((state) => (state.auth));
    const [currentProjectId, setCurrentProjectId] = useState(id);
    const [currentProject, setCurrentProject] = useState({});
    const [currentMinMoney, setCurrentMinMoney] = useState(0);
    const [currentReceiptMoney, setCurrentReceiptMoney] = useState(0);
    const [currentPer, setCurrentPer] = useState(0);
    const [totalProject, setTotalProject] = useState([]);
    const [showPrevButton, setShowPrevButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);

    const [loading, setLoading] = useState(false);
    const [openModalProjectDonation, setOpenModalProjectDonation] = useState(false);
    const [openModalProjectVolunteer, setOpenModalProjectVolunteer] = useState(false);

    //bang hien vat
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
    //bang contributions
    const columnsContributions = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => (index + 1),
        },
        {
        title: 'Mã đóng góp',
        dataIndex: 'id',
        render: (text, record, index) => {
            return (<p style={{marginBottom: 0, fontSize: 15, fontWeight: 600, color: "#5477b1"}}>{text}</p>)
        },
        },
        {
        title: 'Người gửi',
        dataIndex: 'nickname',
        render: (text, record, index) => {
            return (<p style={{fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#767676"}}>{text}</p>)
        }
        },
        {
        title: 'Lời nhắn',
        dataIndex: 'messages',
        render: (text, record, index) => {
            return (<p style={{fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#767676"}}>{text}</p>)
        }
        },
        {
        title: 'Số tiền',
        dataIndex: 'contributionMoney',
        render: (text, record, index) => {
            return {
            props: { style: { fontSize: 15, fontWeight: 500,  color: "#767676" }},
            children: text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
            }
        }
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            render: (text, record, index) => {
            return {
                props: { style: { fontSize: 15, fontWeight: 500,  color: "#767676" }},
                children: moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
            };
            },
            sorter: (a,b) => compareTime(a.createdAt, b.createdAt),
        },
    ];
    const [dataSourceContribution, setDataSourceContribution] = useState([]);
    //bang Payment
    const columnsPayment = [
    {
        title: "STT",
        key: "index",
        render: (text, record, index) => (index + 1),
    },
    {
        title: 'Mã phiếu chi',
        dataIndex: 'id',
        render: (text, record, index) => {
        return (<p style={{marginBottom: 0, fontSize: 15, fontWeight: 600, color: "#5477b1"}}>{text}</p>)
        },
    },
    {
        title: 'Người chi',
        dataIndex: 'userName',
        render: (text, record, index) => {
        return (<p style={{marginBottom: 0, fontSize: 15, fontWeight: 500, color: "#767676"}}>{text}</p>)
        }
    },
    {
        title: 'Người nhận',
        dataIndex: 'receiver',
        render: (text, record, index) => {
        return (<p style={{marginBottom: 0, fontSize: 15, fontWeight: 500, color: "#767676"}}>{text}</p>)
        }
    },
    {
        title: 'Ghi chú',
        dataIndex: 'reason',
        render: (text, record, index) => {
        return (<p style={{marginBottom: 0, fontSize: 15, fontWeight: 500, color: "#767676"}}>{text}</p>)
        }
    },
    {
        title: 'Số tiền',
        dataIndex: 'amountMoney',
        render: (text, record, index) => {
        return {
            props: { style: {marginBottom: 0, fontSize: 15, fontWeight: 500, color: "#767676"}},
            children: text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
        }
        }
    },
    {
        title: 'Thời gian',
        dataIndex: 'createdAt',
        render: (text, record, index) => {
            return {
            props: { style: { fontSize: 15, fontWeight: 500, color: "#767676" }},
            children: moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
            };
        },
        sorter: (a,b) => compareTime(a.createdAt, b.createdAt),
    },
    ];
    const [dataSourcePayment, setDataSourcePayment] = useState([]);

    //lay ra tat ca don dong gop
    const getContributions = () => {
        if(currentProjectId){
            const id = currentProjectId;
            dispatch(getContributionsByProjectIdByStatus({id}))
                .then((res) => {
                setDataSourceContribution(res.payload);
                })
        }
    }
    //lay ra tat ca don dong gop
    const getPayments = () => {
        if(currentProjectId){
            const id = currentProjectId;
            dispatch(getPaymentsByProjectId({id}))
            .then((res) => {
                setDataSourcePayment(res.payload);
            })
        }
    }
    useEffect(() => {
        getContributions();
        getPayments();
    }, [currentProjectId]);

    //lay ra thong tin cua project theo id
    const getCurrentProject = () => {
        setLoading(true);
        if(currentProjectId){
            const id = currentProjectId;
            dispatch(retrieveProject({id}))
            .then(response => {
                setCurrentProject(response.payload);
                setCurrentProjectId(response.payload.id);
                setDataSourceArtifact(response.payload.projectArtifacts);
                setCurrentMinMoney(response.payload.projectMonies[0].minMoney);
                getReceiptMoney(response.payload.id);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            });
        }
    };
    useEffect(() => {
        getCurrentProject();
        dispatch(retrieveProjs())
            .then((res) => {
                setTotalProject(res.payload);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [currentProjectId]);

    useEffect(() => {
        if(currentMinMoney && currentReceiptMoney){
            setValueProgressBar(currentMinMoney, currentReceiptMoney);
        }
      }, [currentMinMoney, currentReceiptMoney]);
    console.log(">>> current per: " + currentPer + " - minMoney: " + currentMinMoney + " - receiptMoney: " + currentReceiptMoney);
    
    //tong tien nhan duoc
    const getReceiptMoney = (currProjectId) => {
      if(currProjectId){
        const id = currProjectId;
        dispatch(getTotalMoneyByProjectId({id}))
          .then(response => {
            setCurrentReceiptMoney(response.payload.totalMoney);
            return response.payload.totalMoney;
          })
          .catch(e => {
            console.log(e);
            setCurrentReceiptMoney(0);
            return 0;
          }); 
      }
    }
    //phan tram cua thanh progress bar
    const setValueProgressBar = (currMinMoney, currReceiptMoney) => {
        if(currMinMoney && currReceiptMoney && currMinMoney !== 0 && !currMinMoney.isNaN && !currReceiptMoney.isNaN)
            setCurrentPer((currReceiptMoney/currMinMoney)*100);
    }
    //bat su kien xem project phia truoc
    const handlePrevProject = () => {
        const prevIndex = (totalProject.findIndex(proj => proj.projectId === currentProject.id)) - 1;
        console.log(">>> prevIndex: " + prevIndex);
        if(prevIndex !== totalProject.length - 1){
            const prevProject = totalProject[prevIndex];
            setCurrentProject(prevProject);
            setCurrentProjectId(prevProject.projectId);
            navigate("/project/" + prevProject.projectId);
        } else{
            const prevProject = totalProject[prevIndex -1];
            setCurrentProject(prevProject);
            setCurrentProjectId(prevProject.projectId);
            navigate("/project/" + prevProject.projectId);
        }
    }
    //bat su kien xem project phia sau
    const handleNextProject = () => {
        const nextIndex = (totalProject.findIndex(proj => proj.projectId === currentProject.id)) + 1;
        if(nextIndex !== totalProject.length + 1){
            const nextProject = totalProject[nextIndex];
            setCurrentProject(nextProject);
            setCurrentProjectId(nextProject.projectId);
            navigate("/project/" + nextProject.projectId);
        } else{
            const nextProject = totalProject[nextIndex + 1];
            setCurrentProject(nextProject);
            setCurrentProjectId(nextProject.projectId);
            navigate("/project/" + nextProject.projectId);
        }
    }
    //them don dong gop
    const handleShowModal = () => {
        if(currentUser){
          setOpenModalProjectDonation(true);
        }
        else{
          toast.error("Vui lòng đăng nhập để tiếp tục!");
        }
    }
    //them don tinh nguyen vien
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
              onClick={handlePrevProject}
              style={{marginRight: "10px"}}
              > <span className="title"><b>&#8249;&#8249; </b>Trước</span>
            </Button>
          <Button className="project-btn" type="primary" size="large"
            onClick={handleNextProject}
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
                            <p className="project-title"><img src={icSunRed}/>{currentProject?.name}</p>
                        </Col>
                        <Col span={4}>
                            {currentProject?.projectStatus?.name === "Đang vận động" ?
                                <p className="project-status" style={{color: "#22b322"}}><span>Trạng thái: </span>{currentProject?.projectStatus?.name}</p>
                                :
                                <p className="project-status" style={{color: "#ebc656"}}><span>Trạng thái: </span>{currentProject?.projectStatus?.name}</p>
                            }
                            
                        </Col>
                    </Row>
                    
                    <Row className="project-row2">
                        <Col className="project-info" span={12}>
                            <div>
                                <p className='project-amountRequest'>*Cần huy động:<span> {currentMinMoney?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></p> 
                                <p className='project-amountReceipt'>*Tiền góp được:<span>{currentReceiptMoney?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></p>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                style={{width: `${currentPer}%`}}></div>
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
                            <button type="button" className="btn btn-info" onClick={handleShowModalVolunteer}>Đăng ký tình nguyện viên</button>  
                        }

                        {currentProject?.projectStatus?.name === "Đang vận động" ?
                            <button type="button" className="btn btn-danger" onClick={handleShowModal}>Đóng góp</button>
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
                </>
            }
          </Tabs.TabPane>

          <Tabs.TabPane tab="Tiến độ ủng hộ" key="tab2">
            <Spin spinning={loading}>
              <Table className="table-contribution" columns={columnsContributions} dataSource={dataSourceContribution}
                  style={{marginTop: 20, marginBottom: 100}}
                  pagination={false}/>
            </Spin>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Tiến độ triển khai" key="tab3">
            <Table className="table-contribution" columns={columnsPayment} dataSource={dataSourcePayment}
                style={{marginTop: 20, marginBottom: 100}}
                pagination={false}/>
          </Tabs.TabPane>
        </Tabs>

        {currentUser && 
            <ProjectDonation
                openModalProjectDonation = {openModalProjectDonation}
                setOpenModalProjectDonation = {setOpenModalProjectDonation}
                currentUserId = {currentUser.id}
                currentProjectId = {currentProjectId}
                currentProject = {currentProject}
                dataSourceArtifact = {dataSourceArtifact}
            />
        }
        
        {currentProject && 
            <ProjectVolunteer
                openModalProjectVolunteer = {openModalProjectVolunteer}
                setOpenModalProjectVolunteer = {setOpenModalProjectVolunteer}
                currentProject = {currentProject}
            />
        }
      </div>
    )
}

export default ProjectDetail;