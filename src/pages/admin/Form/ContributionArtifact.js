import React, {useState, useEffect} from "react";
import {useDispatch } from "react-redux";
import {Link} from "react-router-dom"; 

import {Spin, Table, Row, Col, Select, DatePicker} from "antd";
import {DeleteFilled} from '@ant-design/icons'

import moment from "moment";
import vi from "moment/locale/vi";
import dayjs from 'dayjs';
import ContributionArtifactDetail from "./ContributionArtifactDetail";
import {getListContributionArtifacts} from "../../../slices/artifact";

const ContributionArtifact = () => {
    const dispatch = useDispatch();

    const [openViewDetail ,setOpenViewDetail] = useState(false);
    const [dataViewDetail ,setDataViewDetail] = useState();
    const [contributionId, setContributionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = React.useState(1);
    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => (index + 1),
        },
        {
          title: 'Mã đơn đóng góp',
          dataIndex: 'id',
          render: (text, record, index) => {
            return (
                <Link style={{color: "#1554ad", fontWeight: 600}} onClick={() => {
                    setContributionId(text);
                    setOpenViewDetail(true);
                    setDataViewDetail(record);
                }}>{text}
                </Link>
            )
          },
        },
        {
          title: 'Người gửi',
          dataIndex: 'userName',
          render: (text, record, index) => {
            return (<p style={{fontSize: 14, marginBottom: 0}}>{text}</p>)
          }
        },
        {
            title: 'Tên dự án',
            dataIndex: 'projectName',
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

    const getAllListContributionArtifacts = () => {
        setLoading(true);
        dispatch(getListContributionArtifacts())
            .then((response) => {
                console.log(">>>> artifact: " + JSON.stringify(response.payload));
                setLoading(false);
                setDataSource(response.payload);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })
    }
    useEffect(getAllListContributionArtifacts, []);
    return (
        <div style={{padding: "55px 30px 30px 30px"}}>
        <Row className="receipt-payment" style={{marginLeft: "10px"}}>
            <Col span={14} style={{display: "flex"}}>
                <p className="p-text">Lọc theo dự án: </p>
                <Select placeholder="Tất cả..." 
                    showSearch
                    allowClear
                    style={{fontFamily: 'Montserrat'}}>
                </Select>
          </Col>
          {/* Thời gian bắt đầu */}
          <Col span={5}>
              <DatePicker  format="YYYY-MM-DD HH:mm:ss"
                  showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }} />
          </Col>
          {/* Thời gian kết thúc */}
          <Col span={5}>
              <DatePicker format="YYYY-MM-DD HH:mm:ss"
                  showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                  style={{ paddingRight: 20  }} />
          </Col>   
      </Row> 
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

        <ContributionArtifactDetail
            openViewDetail={openViewDetail}
            setOpenViewDetail={setOpenViewDetail}
            dataViewDetail={dataViewDetail} 
            contributionId={contributionId}
            setContributionId={setContributionId}
            getAllListContributionArtifacts={getAllListContributionArtifacts}
        />
    </div>
    )
}

export default ContributionArtifact;