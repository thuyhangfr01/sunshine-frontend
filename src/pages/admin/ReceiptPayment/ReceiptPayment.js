import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ReceiptPayment.scss"
import {Spin, Table, Select, Row, Col, DatePicker, Card, Statistic, Button, Tabs} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, MoneyCollectOutlined, AccountBookOutlined, ExportOutlined, ImportOutlined , PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from "moment";
import vi from "moment/locale/vi";
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

import { getListContributionsReport, getListPaymentsReport } from "../../../slices/report";
import  {retrieveListProjectName} from "../../../slices/name";
import ImportFileReceipt from "./ImportFileReceipt";
import ImportFilePayment from "./ImportFilePayment";
import AddPayment from "./AddPayment";

const ReceiptPayment = () => {    
    const dispatch = useDispatch();
    const [showModalReceiptImport, setShowModalReceiptImport] = useState(false);
    const [showModalPaymentImport, setShowModalPaymentImport] = useState(false);
    const [showModalPaymentAdd, setShowModalPaymentAdd] = useState(false);

    const [budget, setBudget] = useState(500000000)
    const [receiptMoney, setReceiptMoney] = useState(0)
    const [paymentMoney, setPaymentMoney] = useState(0)
    const [remainingMoney, setRemainingMoney] = useState(0)

    const listProjectName = useSelector((state) => state.name);
    const [projectId, setProjectId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = React.useState(1);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [_fromDate, setFromDate] = useState(" ");
    const [_toDate, setToDate] = useState(" ");
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

    //receipt
    const columnsReceipt = [
        {
            title: "Mã phiếu thu",
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return (
                    <Link style={{color: "#1554ad", fontWeight: 600, fontSize: 15}}
                        // to= {`/admin/payment/detail/${record.id}`}
                    >{text}
                    </Link>
                )
              },
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) => {
                return {
                    props: { style: { fontSize: 15, fontWeight: 500, padding: "0px !important"  }},
                    children: moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
                  };
            },
            sorter: (a,b) => compareTime(a.createdAt, b.createdAt),
        },
        {
            title: 'Người đóng góp',
            dataIndex: 'userName',
            render: (text, record, index) => {
                return (<>{text}</>)
            }
        },
        {
            title: 'Người nhận',
            dataIndex: 'receiver',
            render: (text, record, index) => {
                return (<>{text}</>)
            }
        },
        {
            title: 'Hình thức',
            dataIndex: 'type',
            render: (text, record, index) => {
                return (<>{text}</>)
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
                    style: { color: "#198754", fontWeight: 600, fontSize: 15 }
                  },
                  children: text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                };
              },
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
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(getListReceipts, [projectId, _fromDate, _toDate]);

    //payment
    const columnsPayment = [
        {
            title: "Mã phiếu chi",
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return (
                    <Link style={{color: "#1554ad", fontWeight: 600, fontSize: 15}}
                        // to= {`/admin/payment/detail/${record.id}`}
                    >{text}
                    </Link>
                )
              },
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) => {
                return {
                    props: { style: { fontSize: 15, fontWeight: 500, padding: 10 }},
                    children: moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
                  };
            },
            sorter: (a,b) => compareTime(a.createdAt, b.createdAt),
        },
        {
            title: 'Người chi',
            dataIndex: 'userName',
            render: (text, record, index) => {
                return (<>{text}</>)
            }
        },
        {
            title: 'Người nhận',
            dataIndex: 'receiver',
            render: (text, record, index) => {
                return (<>{text}</>)
            }
        },
        {
            title: 'Ghi chú',
            dataIndex: 'type',
            render: (text, record, index) => {
                return (<>{text}</>)
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
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(getListPayments, [projectId, _fromDate, _toDate]);

    //xu ly tong tien thu va chi
    useEffect(() => {
        if(dataSourceReceipt || dataSourcePayment){
            let receipt = 0;
            let payment = 0;
            dataSourceReceipt.forEach((record) =>{ receipt += record.amountMoney;});
            dataSourcePayment.forEach((record) =>{ payment += record.amountMoney;});
            setReceiptMoney(receipt);
            setPaymentMoney(payment);
            setRemainingMoney(receipt-payment);
            }
        }, [dataSourceReceipt, dataSourcePayment])

    // get danh sach ten du an
    useEffect(() => {
        dispatch(retrieveListProjectName());
    }, [])

    //bat su kien chon du an
    const handleSelect = (value) => {
        if(value !== undefined){
            setProjectId(value);
        } else{
            setProjectId(0);
        }
    }

    const handleExportReceipt = () => {
        if(dataSourceReceipt.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(dataSourceReceipt);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportReceipt.csv");
        }
    }

    const handleExportPayment = () => {
        if(dataSourcePayment.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(dataSourcePayment);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportPayment.csv");
        }
    }

    const renderHeaderTab1= () => {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <span className="title" style={{fontSize: 18}}>DANH SÁCH PHIẾU THU (ĐƠN ĐÓNG GÓP)</span>
            <span style={{display: "flex", gap: 10}}>
                <Button 
                    onClick={() => setShowModalReceiptImport(true)}
                    style={{fontFamily: 'Montserrat', fontSize: "15px", fontWeight: "500", color: "#0d6efd", border: "1px solid #0d6efd", height: "38px"}}>
                    <ImportOutlined/> Import</Button>
                <Button
                    onClick={() => handleExportReceipt()}
                     style={{fontFamily: 'Montserrat', fontSize: "15px", fontWeight: "500", color: "#0d6efd", border: "1px solid #0d6efd", height: "38px"}}>
                    <ExportOutlined /> Export</Button>
            </span>
        </div>
        )
    }
    const renderHeaderTab2= () => {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <span className="title" style={{fontSize: 18}}>DANH SÁCH PHIẾU CHI</span>
            <span style={{display: "flex", gap: 10}}>
                <Button 
                    onClick={() => setShowModalPaymentImport(true)}
                    style={{fontFamily: 'Montserrat', fontSize: "15px", fontWeight: "500", color: "#0d6efd", border: "1px solid #0d6efd", height: "38px"}}>
                    <ImportOutlined/> Import</Button>
                <Button
                    onClick={() => handleExportPayment()}
                     style={{fontFamily: 'Montserrat', fontSize: "15px", fontWeight: "500", color: "#0d6efd", border: "1px solid #0d6efd", height: "38px"}}>
                    <ExportOutlined /> Export</Button>
                <Button
                    onClick={() => setShowModalPaymentAdd(true)}
                    style={{fontFamily: 'Montserrat', fontSize: "15px", fontWeight: "500", color: "#358e65", border: "1px solid #358e65", height: "38px"}}>
                    <PlusOutlined /> Thêm phiếu chi</Button>
            </span>
        </div>
        )
    }

    return (
        <div className="receipt-payment" style={{marginTop: 50}}>
            <Row style={{margin: "35px"}}>
                <Col span={14} style={{display: "flex"}}>
                    <p className="p-text">Lọc theo dự án: </p>
                    <Select placeholder="Tất cả..." 
                        showSearch
                        allowClear
                        style={{fontFamily: 'Montserrat',  alignSelf: "center", marginBottom: "10px"}}
                        onChange={handleSelect}>
                        {listProjectName && listProjectName.map((name, index) => (
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
            <Row className="payment">
                <Col span={6}>
                    <Card style={{marginRight: 20}} bordered={false}>
                        <Statistic
                        title="Qũy của dự án"
                        value={budget.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                        precision={2}
                        valueStyle={{ color: '#1b4f99', fontFamily: "Montserrat", fontWeight: 500, fontSize: 21 }}
                        prefix={<MoneyCollectOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{marginRight: 20}} bordered={false}>
                        <Statistic
                        title="Tổng thu"
                        value={receiptMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                        precision={2}
                        valueStyle={{ color: '#198754', fontFamily: "Montserrat", fontWeight: 500, fontSize: 21 }}
                        prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{marginRight: 20}} bordered={false}>
                        <Statistic
                        title="Tổng chi"
                        value={paymentMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                        precision={2}
                        valueStyle={{ color: '#b90816', fontFamily: "Montserrat", fontWeight: 500, fontSize: 21 }}
                        prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card bordered={false}>
                        <Statistic
                        title="Tồn quỹ"
                        value={remainingMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                        precision={2}
                        valueStyle={{ color: '#ff9c16', fontFamily: "Montserrat", fontWeight: 500, fontSize: 21 }}
                        prefix={<AccountBookOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <Tabs style={{fontFamily: 'Montserrat', margin: 35}}>
                <Tabs.TabPane tab="Phiếu thu" key="tab1">        
                    <Spin spinning={loading}>
                        <Table className="report-payment" columns={columnsReceipt} dataSource={dataSourceReceipt}
                            title={renderHeaderTab1}
                            pagination={{
                                pageSize: 8,
                                onChange(current) {
                                    setPage(current);
                                }
                        }}/>
                    </Spin>
                </Tabs.TabPane>
                <Tabs.TabPane  tab="Phiếu chi" key="tab2">       
                    <Spin spinning={loading}>
                        <Table className="project-payment-data" columns={columnsPayment} dataSource={dataSourcePayment}
                            title={renderHeaderTab2}
                            pagination={{
                                pageSize: 8,
                                onChange(current) {
                                    setPage(current);
                                }
                            }}/>
                        </Spin>
                </Tabs.TabPane>
            </Tabs>     

            <ImportFileReceipt
                showModalReceiptImport = {showModalReceiptImport}
                setShowModalReceiptImport = {setShowModalReceiptImport}
                getListReceipts = {getListReceipts}
            />

            <ImportFilePayment
                showModalPaymentImport = {showModalPaymentImport}
                setShowModalPaymentImport = {setShowModalPaymentImport}
                getListPayments = {getListPayments}
            />

            <AddPayment
                showModalPaymentAdd = {showModalPaymentAdd}
                setShowModalPaymentAdd = {setShowModalPaymentAdd}
                getListPayments = {getListPayments}
            />
        </div>
    )
}

export default ReceiptPayment;