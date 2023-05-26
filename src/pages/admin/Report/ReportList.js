import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {Spin, Table, Button} from "antd";
import { ImportOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import vi from "moment/locale/vi";
import ImportFile from "./ImportFile";
import "./ReportFile.scss";
import {getAllFiles} from "../../../slices/report";

const ReportList = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = React.useState(1);

    const [showModalImport, setShowModalImport] = useState(false);

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
            title: "STT",
            key: "index",
            render: (text, record, index) => (index + 1)
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            render: (text, record, index) => {
                return (<>{text}</>)
            }
        },
        {
            title: 'Tên file',
            dataIndex: 'nameImg',
            render: (text, record, index) => {
                return (
                <div style={{justifyContent: "center",  display: "flex", border: "2px solid #ffa0a0", borderRadius: "10px", width: "245px", paddingTop: 15}}>
                    <FontAwesomeIcon icon={faFilePdf} style={{color: "ca4949", fontSize: 25}} />
                    <p style={{marginLeft: 10}}>{text}</p>
                </div>)
            }
        },
        {
            title: 'Thời gian đăng',
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
    ]
    const [dataSource, setDataSource] = useState([]);

    const getAll = () => {
        setLoading(true);
        dispatch(getAllFiles())
            .then((res) => {
                setLoading(false);
                setDataSource(res.payload);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(getAll, []);

    const renderHeaderTab1= () => {
        return (
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <span className="title" style={{fontSize: 18}}>DANH SÁCH PHIẾU THU CHI</span>
            <span style={{display: "flex", gap: 10}}>
                <Button 
                    onClick={() => setShowModalImport(true)}
                    style={{fontFamily: 'Montserrat', fontSize: "15px", fontWeight: "500", color: "#0d6efd", border: "1px solid #0d6efd", height: "38px"}}>
                    <ImportOutlined /> Thêm mới</Button>
            </span>
        </div>
        )
    }
    return (
        <div className="receipt-payment" style={{marginTop: 50}}>          
            <Spin spinning={loading}>
                <Table className="report-payment" columns={columns} dataSource={dataSource}
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

export default ReportList;