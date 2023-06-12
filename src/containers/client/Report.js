import React, {useState, useEffect} from "react";
import {useSelector, useDispatch } from 'react-redux';

import {Row, Col, Card, Divider, Select, Tabs, Spin, Table, DatePicker, Input} from "antd";
import "../../pages/admin/ReceiptPayment/ReceiptPayment.scss";
import "../../containers/client/contribution/HistoryContribution.scss";
import moment from "moment";
import vi from "moment/locale/vi";
import dayjs from 'dayjs';

import { getListContributionsReport, getListPaymentsReport } from "../../slices/report";
import  {retrieveListProjectName} from "../../slices/name";

const { Search } = Input;

const Report = () => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [_fromDate, setFromDate] = useState(" ");
    const [_toDate, setToDate] = useState(" ");

    // const listProjectName = useSelector((state) => state.name);
    const [listName, setListName] = useState([]);
    const [projectId, setProjectId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = React.useState(1);
    const [filteredInfo, setFilteredInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
      setFilteredInfo(filters);
    };

    const handleStartDateChange = (value, dateString) => {
        setStartDate(value);
        if(dateString){
            setFromDate(dateString);
        } else{
            setFromDate(" ");
        }
    }
    const handleEndDateChange = (value, dateString) => {
        setEndDate(value);
        if(dateString){
            setToDate(dateString);
        } else{
            setToDate(" ");
        }
    }
    const disabledEndDate = (current) => {
        if(startDate){
            return current < startDate;
        }
        return false;
    };

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

    //bang receipt
    const columnsReceipt = [
        {
            title: "Mã đơn đóng góp",
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return (<p style={{marginBottom: 0, fontSize: 15, fontWeight: 600, color: "#5477b1"}}>{text}</p>)
            }
        },
        {
            title: 'Người đóng góp',
            dataIndex: 'userName',
            render: (text, record, index) => {
                return (<p style={{marginBottom: 0, fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#767676"}}>{text}</p>)
            }
        },
        {
            title: 'Hình thức',
            dataIndex: 'type',
            render: (text, record, index) => {
                return (<p style={{marginBottom: 0, fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#767676"}}>{text}</p>)
            },
            filters: [
                {text: "Chuyển khoản ngân hàng", value: "Chuyển khoản ngân hàng"},
                {text: "Tiền mặt", value: "Tiền mặt"}
            ],
            onFilter: (value, record) => {
                return record.type.includes(value)
            }
        },
        {
            title: 'Số tiền',
            dataIndex: 'amountMoney',
            key: 'amountMoney',
            render(text, record) {
                return {
                  props: {
                    style: { marginBottom: 0, color: "#198754", fontWeight: 600, fontSize: 15 }
                  },
                  children: text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                };
              },
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) => {
                return {
                    props: { style: { marginBottom: 0, fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#767676" }},
                    children: moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
                  };
            },
            sorter: (a,b) => compareTime(a.createdAt, b.createdAt),
        },
    ]
    const [dataSourceReceipt, setDataSourceReceipt] = useState([]);
    const getListReceipts = () => {
        setLoading(true);
        const fromDate = _fromDate;
        const toDate = _toDate;
        dispatch(getListContributionsReport({projectId, fromDate, toDate}))
        .then((data) => {
            setLoading(false);
            setDataSourceReceipt(data.payload);
            // setDataPdf(data.payload);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(getListReceipts, [projectId, _fromDate, _toDate]);
    //bang payment
    const columnsPayment = [
        {
            title: "Mã phiếu chi",
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return (<p style={{marginBottom: 0, fontSize: 15, fontWeight: 600, color: "#5477b1"}}>{text}</p>)
            }
        },
        {
            title: 'Người chi',
            dataIndex: 'userName',
            render: (text, record, index) => {
                return (<p style={{fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#767676"}}>{text}</p>)
            }
        },
        {
            title: 'Người nhận',
            dataIndex: 'receiver',
            render: (text, record, index) => {
                return (<p style={{fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#767676"}}>{text}</p>)
            }
        },
        {
            title: 'Ghi chú',
            dataIndex: 'type',
            render: (text, record, index) => {
                return (<p style={{fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#767676"}}>{text}</p>)
            }
        },
        {
            title: 'Số tiền',
            dataIndex: 'amountMoney',
            key: 'amountMoney',
            render(text, record) {
                return {
                  props: {
                    style: { color: "#b90816", fontWeight: 600, fontSize: 15 }
                  },
                  children: text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                };
              },
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) => {
                return {
                    props: { style: { fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#767676"  }},
                    children: moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
                  };
            },
            sorter: (a,b) => compareTime(a.createdAt, b.createdAt),
        },
    ]
    const [dataSourcePayment, setDataSourcePayment] = useState([]);
    const getListPayments = () => {
        setLoading(true);
        const fromDate = _fromDate;
        const toDate = _toDate;
        dispatch(getListPaymentsReport({projectId, fromDate, toDate}))
        .then((data) => {
            setLoading(false);
            setDataSourcePayment(data.payload);
            // setDataPdf(data.payload);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(getListPayments, [projectId, _fromDate, _toDate]);

    //lay danh sach ten du an
    useEffect(() => {
        dispatch(retrieveListProjectName())
            .then((res) => {
                console.log(">> name report: " + JSON.stringify(res.payload));
                setListName(res.payload);
            })
    }, [])

    //bat su kien chon du an
    const handleSelect = (value) => {
        if(value !== undefined){
            setProjectId(value);
        } else{
            setProjectId(0);
        }
    }

    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px", marginBottom: 100}}>
            <div className="container-title">
                <div className="section-heading row">
                    <div className='col-12'>
                        <h2 >Báo cáo tài chính của Qũy từ thiện <em>SUN</em><span>SHINE</span></h2>
                        <div className="line-dec"></div>
                            <p style={{paddingLeft: "150px", paddingRight: "150px", paddingTop: "10px"}}>Để đảm bảo cho tính minh bạch trong việc nhận đóng góp và chi cho những dự án từ thiện đã kêu gọi, chúng tôi sẽ cập nhật thường xuyên báo cáo tài chính tới quý mạnh thường quân sớm nhất có thể!</p>
                        </div>
                </div>
            </div>
            <div className="receipt-payment">
                <Row style={{marginTop: "35px"}}>
                    <Col span={14} style={{display: "flex"}}>
                        <p className="p-text">Lọc theo dự án: </p>
                        <Select placeholder="Tất cả..." 
                            showSearch
                            allowClear
                            style={{fontFamily: 'Montserrat',  alignSelf: "center", marginBottom: "10px"}}
                            onChange={handleSelect}>
                            {listName && listName.map((name, index) => (
                                <Select.Option style={{fontFamily: 'Montserrat'}} key={index} value={name.projectId}>{name.projectName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    {/* Thời gian bắt đầu */}
                    <Col span={5}>
                        <DatePicker  format="YYYY-MM-DD HH:mm:ss"
                            value={startDate}
                            onChange={handleStartDateChange}
                            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }} />
                    </Col>
                    {/* Thời gian kết thúc */}
                    <Col span={5}>
                        <DatePicker format="YYYY-MM-DD HH:mm:ss"
                            value={endDate}
                            onChange={handleEndDateChange}
                            disabledDate={disabledEndDate}
                            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                            style={{ paddingRight: 20  }} />
                    </Col>   
                </Row> 
            </div>
            <Row className="form-help-row" style={{marginTop: 50}}>
                <Col span={24}>
                    <Tabs className="project-tab" style={{fontFamily: 'Montserrat'}}>
                        <Tabs.TabPane tab="Phiếu thu" style={{ fontSize: 15}} key="tab1">        
                            <Spin spinning={loading}>
                                <Table style={{marginTop: 20}} className="table-contribution" columns={columnsReceipt} dataSource={dataSourceReceipt} onChange={handleChange}
                                    pagination={{
                                        pageSize: 10,
                                        onChange(current) {
                                            setPage(current);
                                        }
                                }}/>
                            </Spin>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Phiếu chi" style={{ fontSize: 15}}  key="tab2">       
                            <Spin spinning={loading}>
                                <Table style={{marginTop: 20}} className="table-contribution" columns={columnsPayment} dataSource={dataSourcePayment}
                                    pagination={{
                                        pageSize: 10,
                                        onChange(current) {
                                            setPage(current);
                                        }
                                    }}/>
                                </Spin>
                        </Tabs.TabPane>
                    </Tabs>                      
                </Col>
                {/* <Divider type="vertical" style={{height: "800px", marginLeft: "-20px", marginRight: "20px"}}></Divider> */}
                {/* <Col span={4}>
                    <Card 
                        style={{width: "315px", fontFamily: 'Montserrat'}}
                        title = "Lời nhắn nhủ">
                        <p>Qũy từ thiện Sunshine luôn tìm cách để thể hiện sự minh bạch trong việc thu chi các khoản tiền từ thiện đến quý Mạnh thường quân!</p>
                        <p>Nếu có bất cứ sai xót hoặc thắc mắc nào, quý Mạnh thường quân vui lòng liên hệ tới Qũy để được giải đáp 24/7!</p>
                        <Divider style={{fontFamily: 'Montserrat'}}>Thông tin liên hệ</Divider>
                        <p>Email: <span>quytuthiensunshine@gmail.com</span></p>
                        <p>Số điện thoại: <span>0765700777 - Gặp chị Hằng</span></p>
                    </Card>
                    <button className="btn btn-primary" style={{marginTop: 15, placeContent: "center"}}>HƯỚNG DẪN LIÊN HỆ</button>
                    <button className="btn btn-primary" style={{marginTop: 15, placeContent: "center"}}>NHỮNG QUY ĐỊNH CỦA QUỸ</button>
                </Col> */}
            </Row>
      </div>
    )
}

export default Report;