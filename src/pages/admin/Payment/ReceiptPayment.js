import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ReceiptPayment.scss"
import {Spin, Table, Select, Row, Col, DatePicker, Card, Statistic, Button} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, MoneyCollectOutlined, AccountBookOutlined, ExportOutlined, ImportOutlined , PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from "moment";
import vi from "moment/locale/vi";
import dayjs from 'dayjs';

import { getListReceiptPayment } from "../../../slices/receiptPayment";
import  {retrieveListProjectName} from "../../../slices/name";
import ImportFile from "./ImportFile";

import jsPDF from "jspdf";
import "jspdf-autotable";
import Roboto from "../../../assets/fonts/Roboto-Regular.ttf";

const ReceiptPayment = () => {
    const [dataPdf, setDataPdf] = useState([]);
    const dispatch = useDispatch();
    const [showModalImport, setShowModalImport] = useState(false);

    const [budget, setBudget] = useState(500000000)
    const [receiptMoney, setReceiptMoney] = useState(0)
    const [paymentMoney, setPaymentMoney] = useState(0)
    const [remainingMoney, setRemainingMoney] = useState(0)

    const listProjectName = useSelector((state) => state.name);
    const [projectId1, setProjectId1] = useState(0);
    const [projectId2, setProjectId2] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = React.useState(1);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [fromDate, setFromDate] = useState(" ");
    const [toDate, setToDate] = useState(" ");
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

    //all
    const columnsReceiptPayment = [
        {
            title: "Mã phiếu thu/chi",
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
            filters: [
                {text: "Mã phiếu chi", value: "HDC"},
                {text: "Mã phiếu thu", value: "HDT"}
            ],
            onFilter: (value, record) => {
                return record.id.includes(value)
            }
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) => {
                return {
                    props: { style: { fontSize: 15, fontWeight: 500 }},
                    children: moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
                  };
            },
            sorter: (a,b) => compareTime(a.createdAt, b.createdAt),
        },
        {
            title: 'Người chuyển',
            dataIndex: 'userName',
            render: (text, record, index) => {
                return (<>{text}</>)
            }
        },
        {
            title: 'Loại',
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
                    style: { color: record.id.includes("HDC") ? "red" : "green",
                        fontWeight: 600, fontSize: 15 }
                  },
                  children: record.id.includes("HDC") ? "- " + text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) :
                                                        "+ " + text.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
                };
              },
        },
    ]
    const [dataSourceReceiptPayment, setDataSourceReceiptPayment] = useState([]);
    const getAll = () => {
        setLoading(true);
        const fromDate1 = fromDate;
        const toDate1 = toDate;
        const fromDate2 = fromDate;
        const toDate2 = toDate;
        dispatch(getListReceiptPayment({projectId1, projectId2, fromDate1, toDate1, fromDate2, toDate2}))
        .then((data) => {
            setLoading(false);
            setDataSourceReceiptPayment(data.payload);
            setDataPdf(data.payload);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(getAll, [projectId1, projectId2, fromDate, toDate]);

    //xu ly tong tien thu va chi
    useEffect(() => {
        if(dataSourceReceiptPayment){
            let receipt = 0;
            let payment = 0;
            dataSourceReceiptPayment.forEach((record) =>{
                if(record.id.includes("HDT")){
                    receipt += record.amountMoney;
                } else{
                    payment += record.amountMoney;
                }
            });
                setReceiptMoney(receipt);
                setPaymentMoney(payment);
                setRemainingMoney(receipt-payment);
            }
        }, [dataSourceReceiptPayment])

    // get danh sach ten du an
    useEffect(() => {
        dispatch(retrieveListProjectName());
    }, [])

    //bat su kien chon du an
    const handleSelect = (value) => {
        if(value !== undefined){
            setProjectId1(value);
            setProjectId2(value);
        } else{
            setProjectId1(0);
            setProjectId2(0);
        }
    }

    //bat su kien export pdf
    const handleExportPdf = (dataPdf) => {
        let table = [];
        dataPdf.forEach((item) => {
            let row = [];
            row.push(item.id);
            row.push(moment(item.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss'));
            row.push(item.userName);
            row.push(item.type);
            row.push(item.amountMoney.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}));

            table.push(row);
        })

        console.log("data pdf: " + JSON.stringify(table));

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'cm',
            format: 'A4',
        });

        doc.addFileToVFS('Roboto-Regular.ttf', Roboto);
        doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
        doc.setFont('Roboto');
        doc.text('Báo cáo thu chi tháng 5', 20, 20);

        const options = {
            headStyles: {fillColor: [155, 155, 155]},
            startY: 20,
        }

        const columnWidth = [40, 50, 50, 50, 40];
        const headers = [['Ma phieu thu/chi', 'Thoi gian', 'Nguoi chuyen', 'Loai', 'So tien']];
    
        doc.autoTable({
            options,
            head: headers,
            body: table,
            columnWidth,
        });

        doc.save('bao-cao-thu-chi.pdf')
    }

    const renderHeaderTab1= () => {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <span className="title" style={{fontSize: 18}}>DANH SÁCH PHIẾU THU CHI</span>
            <span style={{display: "flex", gap: 10}}>
                <Button 
                    onClick={() => setShowModalImport(true)}
                    style={{fontFamily: 'Montserrat', fontSize: "15px", fontWeight: "500", color: "#0d6efd", border: "1px solid #0d6efd", height: "38px"}}>
                    <ExportOutlined /> Import</Button>
                <Button
                    onClick={() => handleExportPdf(dataPdf)}
                     style={{fontFamily: 'Montserrat', fontSize: "15px", fontWeight: "500", color: "#0d6efd", border: "1px solid #0d6efd", height: "38px"}}>
                    <ImportOutlined /> Export</Button>
                <Button
                     style={{fontFamily: 'Montserrat', fontSize: "15px", fontWeight: "500", color: "#0d6efd", border: "1px solid #0d6efd", height: "38px"}}>
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
                        style={{fontFamily: 'Montserrat'}}
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
            <Spin spinning={loading}>
                <Table className="project-payment" columns={columnsReceiptPayment} dataSource={dataSourceReceiptPayment}
                    title={renderHeaderTab1}
                    style={{margin: 35}}
                    pagination={{
                        pageSize: 6,
                        onChange(current) {
                            setPage(current);
                        }
                }}/>
            </Spin>

            <ImportFile
                showModalImport = {showModalImport}
                setShowModalImport = {setShowModalImport}
                getAll = {getAll}
            />
        </div>
    )
}

export default ReceiptPayment;