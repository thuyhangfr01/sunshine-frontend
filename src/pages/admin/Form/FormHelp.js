import React, {useState, useEffect} from "react";
import {useDispatch } from "react-redux";
import {Link} from "react-router-dom";   
import dayjs from 'dayjs';

import {Spin, Table, Tag, Row, Col, Select, DatePicker} from "antd";
import {DeleteFilled} from '@ant-design/icons'

import moment from "moment";
import vi from "moment/locale/vi";
import "../ReceiptPayment/ReceiptPayment.scss"; 
import FormHelpDetail from "./FormHelpDetail.js";
import {getAllFormHelp} from "../../../slices/form";

const FormHelpManagement = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState([]);
    const [openViewDetail, setOpenViewDetail] = useState(false);

    const [page, setPage] = React.useState(1);
    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => (index + 1),
        },
        {
          title: 'Tiêu đề',
          dataIndex: 'title',
          render: (text, record, index) => {
            return (
                <Link style={{color: "#1554ad", fontWeight: 600}} onClick={() => {
                    setDataViewDetail(record);
                    setOpenViewDetail(true);
                }}>{text}
                </Link>
            )
          },
        },
        {
          title: 'Người gửi',
          dataIndex: 'fullName',
          render: (text, record, index) => {
            return (<p style={{fontSize: 14, marginBottom: 0}}>{text}</p>)
          }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (text, record, index) => {
                return moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'statusName',
            render: (text, record) => {
                let color = "green"
                if(text === "Đã từ chối"){
                    color = "red"
                } else if(text === "Đang chờ duyệt"){
                    color = "yellow"
                }
                return (
                    <Tag style={{fontSize: 14, fontFamily: "Montserrat"}} color={color} key={text}>
                        {text}
                      </Tag>
                )
            }, 
            filters: [
                {text: "Đang chờ duyệt", value: "Đang chờ duyệt"},
                {text: "Đã duyệt", value: "Đã duyệt"},
                {text: "Đã từ chối", value: "Đã từ chối"}
            ],
            onFilter: (value, record) => {
                return record.statusName === value
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record, index) => {
              return (
                <>
                    <DeleteFilled style={{color: "#a50f0f", fontSize: 16, paddingLeft: "15px"}}/>
                </>
              )
            },
          },
      ];
    const [dataSource, setDataSource] = useState([]);

    const getAll = () => {
        setLoading(true);
        dispatch(getAllFormHelp())
        .then((res) => {
            setLoading(false);
            console.log("data form: " + JSON.stringify(res));
            setDataSource(res.payload);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(getAll, []);

    return (
        <div style={{padding: "55px 30px 30px 30px"}}>
        <Spin spinning={loading}>
            <Table className="project-artifact" columns={columns} dataSource={dataSource}
                // title={"DANH SÁCH ĐƠN YÊU CẦU"}
                style={{marginTop: 20}}
                pagination={{
                    pageSize: 6,
                    onChange(current) {
                        setPage(current);
                    }
            }}/>
        </Spin>

        <FormHelpDetail
            openViewDetail={openViewDetail}
            setOpenViewDetail={setOpenViewDetail}
            dataViewDetail={dataViewDetail}
            setDataViewDetail={setDataViewDetail}
            getAll = {getAll}
        />
    </div>
    )
}

export default FormHelpManagement;