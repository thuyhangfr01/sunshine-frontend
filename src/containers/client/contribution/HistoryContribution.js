import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import {Spin, Table, Tag, Popconfirm, Row, Col, Divider, Card, Statistic} from "antd";
import {DeleteFilled} from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpa, faSackDollar, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import moment from "moment";
import vi from "moment/locale/vi";

import {getContributionsByUserId, removeContribution} from "../../../slices/contribution"
import HistoryContributionDetail from "./Detail";

const HistoryContribution = () => {
    const {user: currentUser} = useSelector((state) => (state.auth));
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState([]);

    const currentUserId = currentUser.id;
    const [page, setPage] = React.useState(1);

    const [totalMoney, setTotalMoney] = useState(0);
    const [projectNumber, setProjectNumber] = useState(0);

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
    const columns = [
        {
            title: "Mã đơn",
            dataIndex: 'id',
            render: (text, record, index) => {
                return (
                    <Link style={{color: "#1554ad", fontWeight: 600}}
                        onClick={() => {
                            setDataViewDetail(record);
                            setOpenViewDetail(true);
                        }}>{text}
                    </Link>
                )
            },
        },
        {
          title: 'Tên dự án đã đóng góp',
          dataIndex: 'projectName',
          render: (text, record, index) => {
            return (
                (<p style={{fontSize: 14}}>{text}</p>)
            )
          },
        },
        {
            title: 'Số tiền',
            dataIndex: 'contributionMoney',
            key: 'contributionMoney',
            render: (text, record, index) => {
                return  text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
            },
        },
        {
            title: 'Trạng thái đơn',
            dataIndex: 'moneyStatus',
            render: (text, record) => {
                let color = "green"
                if(text === "Đang chờ duyệt"){
                    color = "yellow"
                }
                return (
                    <Tag color={color} key={text}>
                        {text.toUpperCase()}
                    </Tag>
                )
            }, 
            filters: [
                {text: "Đang chờ duyệt", value: "Đang chờ duyệt"},
                {text: "Đã nhận", value: "Đã nhận"}
            ],
            onFilter: (value, record) => {
                return record.moneyStatus === value
            }
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            render: (text, record, index) => {
                return {
                    props: { style: { fontSize: 15, fontWeight: 400 }},
                    children: moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
                  };
            },
            sorter: (a,b) => compareTime(a.createdAt, b.createdAt),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record, index) => {
              return (
                <>
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa đơn đóng góp"}
                        description={"Bạn có chắc chắn muốn xóa đơn này không?"}
                        onConfirm={() => handleDeleteContribution(record)}
                        onText="Xác nhận"
                        cancelText="Hủy">
                            <DeleteFilled style={{color: "#a50f0f", fontSize: 16, paddingLeft: "15px",  cursor: "pointer"}}/>
                    </Popconfirm>
                </>
              )
            },
          },
      ];
    const [dataSource, setDataSource] = useState([]);

    //get contributions by user id
    const getListContributions = () => {
        setLoading(true);
        console.log("userId: " + currentUserId);
        if(currentUserId){
            const id = currentUserId;
            dispatch(getContributionsByUserId({id}))
                .then((response) => {
                    setLoading(false);
                    console.log("dataa: " + JSON.stringify(response))
                    setDataSource(response.payload);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                })
        }
    }
    useEffect(getListContributions, [])

    const getTotalMoneyAndProject = () => {
        if(dataSource){
            let _totalMoney = 0;
            let _projectNumber = 0;
            dataSource.forEach((record) =>{
                _totalMoney += record.contributionMoney;
                _projectNumber += 1;
            });
            setTotalMoney(_totalMoney);
            setProjectNumber(_projectNumber);
        }
    };
    useEffect(getTotalMoneyAndProject, [dataSource]);

    //xoa don dong gop
    const handleDeleteContribution = (contribution) => {
        if(contribution.moneyStatus === 'Đang chờ duyệt' || contribution.moneyStatus === 'Đã từ chối'){
            const id = contribution.id;
            dispatch(removeContribution({id}))
            .then((response) => {
                toast.success("Xóa đơn đóng góp thành công!");
            })
            .catch((error) => {
                toast.error("Xóa đơn đóng góp thất bại!");
            })
        } else{
            toast.error("Bạn không thể xóa đơn này!");
        }
        
    }

    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px", marginBottom: 300}}>
            <div className="container-title">
                <div className="section-heading row">
                    <div className='col-12'>
                        <h2 >Danh sách đơn <em>ĐÓNG </em><span>GÓP</span></h2>
                        <div className="line-dec"></div>
                        <p style={{paddingLeft: "150px", paddingRight: "150px", paddingTop: 5}}>Lịch sử đơn đóng góp tiền và hiện vật của bạn đã ủng hộ cho những dự án của Sunshine. </p>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", marginTop: 30}}>
                <div className="card-item">
                    <div className="line"></div>
                    <p>Số dự án đã đóng góp</p>
                    <h3><span>{projectNumber}</span> dự án từ thiện</h3>
                    <div className="card-icon"><FontAwesomeIcon icon={faSpa} style={{color: "rgb(133 159 193)", fontSize: 25}}/></div>
                </div>
                <div className="card-item-money" style={{marginLeft: 20}}>
                    <div className="line"></div>
                    <p>Số tiền đã đóng góp</p>
                    <h3><span style={{fontSize: 25, marginTop: "0px !important"}}>{totalMoney.toLocaleString('it-IT')}</span>VNĐ</h3>
                    <div className="card-icon"><FontAwesomeIcon icon={faSackDollar} style={{color: "rgb(133 159 193)", fontSize: 25}}/></div>
                </div>
                <div className="card-item-note" style={{marginLeft: 20}}>
                    <div className="line"></div>
                    <p>Nếu có bất cứ thắc mắc nào, vui lòng liên hệ:</p>
                    <h3><span style={{fontSize: 25, marginTop: "0px !important"}}>0765 700 777</span> - Gặp chị Hằng</h3>
                    <div className="card-icon"><FontAwesomeIcon icon={faPhoneAlt} style={{color: "rgb(133 159 193)", fontSize: 25}}/></div>
                </div>
            </div>
            <Spin spinning={loading}>
                <Table className="table-contribution" columns={columns} dataSource={dataSource}
                    style={{marginTop: 30, fontSize: "15px !important"}}
                    pagination={false}/>
            </Spin>

            <HistoryContributionDetail
                openViewDetail = {openViewDetail}
                setOpenViewDetail = {setOpenViewDetail}
                dataViewDetail = {dataViewDetail}
            />
        </div>
    )
}

export default HistoryContribution;