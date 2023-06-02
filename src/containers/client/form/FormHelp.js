import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {Link} from "react-router-dom";   
import {Spin, Table, Tag, Row, Col, Divider, Card} from "antd";
import {DeleteFilled} from '@ant-design/icons'
import "./FormHelp.scss";
import moment from "moment";
import vi from "moment/locale/vi";

import FormHelpDetail from "./FormHelpDetail";
import FormHelpAdd from "./FormHelpAdd";
import {getAllFormHelpByUser} from "../../../slices/form";

const FormHelp = () => {
    const dispatch = useDispatch();
    const {user: currentUser} = useSelector((state) => (state.auth));
    const [loading, setLoading] = useState(false);

    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState([]);
    const [openViewAdd, setOpenViewAdd] = useState(false);

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
                <Link style={{fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#1554ad"}} 
                    onClick={() => {
                        setDataViewDetail(record);
                        setOpenViewDetail(true);}}
                    >{text}
                </Link>
            )
          },
        }, 
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (text, record, index) => {
                return {
                    props: { style: {fontSize: "15px", marginBottom: "0px", fontWeight: 500, color: "#767676"}},
                    children: moment(record.createdAt).locale("vi", vi).format('DD-MM-YYYY HH:mm:ss')
                  };
            },
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
                    <Tag style={{fontSize: 15, fontWeight: 500, fontFamily: "Montserrat"}} color={color} key={text}>
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

    const getAllFormHelp = () => {
        setLoading(true);
        const fullName = currentUser.name;
        dispatch(getAllFormHelpByUser({fullName}))
            .then((response) => {
                setLoading(false);
                setDataSource(response.payload);
            })
            .catch((err) => {
                setLoading(false);
                console.log(">>> err: " + err);
            })
    }
    useEffect(getAllFormHelp, []);

    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px", marginBottom: 300}}>
            <div className="container-title">
                <div className="section-heading row">
                    <div className='col-12'>
                        <h2 >ĐƠN YÊU CẦU HỖ TRỢ TỪ <em>SUN</em><span>SHINE</span></h2>
                        <div className="line-dec"></div>
                        <p style={{paddingLeft: "150px", paddingRight: "150px", paddingTop: 5}}>Nếu bạn có gặp hoàn cảnh hay tổ chức nào có hoàn cảnh khó khăn cần sự giúp đỡ, hãy gửi đơn cho Sunshine.</p>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p style={{color: "#d75758", fontStyle: "italic", fontWeight: "500", paddingTop: "30px"}}>*Chú ý: Kết quả phê duyệt đơn yêu cầu sẽ được gửi qua email!</p>
                <button className="btn btn-primary" style={{height: "45px", marginTop: "20px", background: "#c1605b", border: "none", fontWeight: "500"}}
                    onClick={() => {setOpenViewAdd(true)}}>
                    <span style={{fontSize: 20, marginRight: 5, marginLeft: "-10px"}}>&#8250;&#8250;</span>
                        Gửi đơn yêu cầu
                    <span style={{fontSize: 20, marginRight: "-12px", marginLeft: "5px"}}>&#8249;&#8249;</span>
                </button>
            </div>
            <Spin spinning={loading}>
                <Table className="table-contribution" style={{marginTop: 20, fontSize: "15px !important"}}
                    columns={columns} dataSource={dataSource} pagination={false}>
                </Table>
            </Spin>

        <FormHelpDetail
            openViewDetail = {openViewDetail}
            setOpenViewDetail = {setOpenViewDetail}
            dataViewDetail = {dataViewDetail}
            setDataViewDetail = {setDataViewDetail}
        />

        <FormHelpAdd
            openViewAdd = {openViewAdd}
            setOpenViewAdd = {setOpenViewAdd}
            getAllFormHelp = {getAllFormHelp}
        />
    </div>
    )
}

export default FormHelp;