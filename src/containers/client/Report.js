import React, {useState, useEffect} from "react";
// import { PDFViewer } from 'react-pdf';
import {Row, Col, Card, Divider, Select, Collapse} from "antd";
import {getFilesByTitle, getAllFiles} from "../../slices/report";
import { useDispatch } from 'react-redux';

const { Panel } = Collapse;
const Report = () => {
    // const pdfUrl = 'https://sunshine2001.blob.core.windows.net/sunshine-container/bao-cao-thang-5.pdf';
    const [list, setList] = useState([]);
    const [_title, setTitle] = useState(" ");
    const [pdfUrlList, setPdfUrlList] = useState([]);
    const dispatch = useDispatch();

    const getAll = () => {
        dispatch(getAllFiles())
            .then((res) => {
                console.log(">>> res: " + JSON.stringify(res.payload));
                setList(res.payload);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(getAll, []);

    const handleSelect = (value) => {
        if(value !== undefined){
            setTitle(value);
        } else{
            setTitle(' ');
        }
    }

    const getAllByTitle = () => {
        const title = _title;
        dispatch(getFilesByTitle({title}))
            .then((res) => {
                setPdfUrlList(res.payload);
                console.log(">>>: " + JSON.stringify(res.payload));
            })
            .catch((err) => { console.log(err) })
    }
    useEffect(getAllByTitle, [_title]);
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
            <Row className="form-help-row" style={{marginTop: 30}}>
                <Col span={18} style={{paddingRight: 40}}>
                    <div style={{display: "flex"}}>
                        <p style={{fontFamily: 'Montserrat', fontSize: 15, fontWeight: 500, marginTop: "15px"}} className="p-text">Lọc báo cáo: </p>
                        <Select placeholder="Tất cả..." 
                            showSearch
                            allowClear
                            style={{fontFamily: 'Montserrat', width: 500, marginLeft: 20, alignSelf: "center", fontSize: 15}}
                            onChange={handleSelect}
                            >
                            {list && list?.map((item, index) => (
                                <Select.Option style={{fontFamily: 'Montserrat'}} key={index} value={item.title}>{item.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    {pdfUrlList && pdfUrlList?.map((item, index) => (
                        <Collapse style={{marginTop: 10, marginTop: "20px", background: "#ffeae9c2", fontFamily: 'Montserrat', fontWeight: 500}}>
                            <Panel header={item.title}>
                                <iframe src={`https://docs.google.com/viewer?url=${item.urlImg}&embedded=true`} width="100%" height="600px"></iframe>
                            </Panel>
                        </Collapse>
                        // <div key={index}>
                        //     <h3>{item.title}</h3>
                        //     <iframe src={`https://docs.google.com/viewer?url=${item.urlImg}&embedded=true`} width="100%" height="600px"></iframe>
                        // </div>
                    )) }                    
                </Col>
                <Divider type="vertical" style={{height: "800px", marginLeft: "-20px", marginRight: "20px"}}></Divider>
                <Col span={4}>
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
                </Col>
            </Row>
      </div>
    )
}

export default Report;