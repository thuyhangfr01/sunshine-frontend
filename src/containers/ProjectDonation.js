import {Button, Form, Input, InputNumber, Select, Divider, Tabs, Space, Row, Col} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./Project.scss";
import React from 'react';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
    size: 'large',
  };
const { TextArea } = Input;

const onFinish = (values) => {
    console.log(values);
  };

const ProjectDonation = () => {
    return (
        <div className="container" style={{fontFamily: 'Montserrat, sans-serif', marginTop: "30px"}}>
        <div class="container-title">
            <div class="section-heading row">
                <div className='col-12'>
                <h2 >Đóng góp cho dự án từ thiện của <em>SUN</em><span>SHINE</span></h2>
                <div class="line-dec"></div>
                <p style={{paddingLeft: "150px", paddingRight: "150px"}}>Cảm ơn bạn vì đã là một phần của Sunshine, cùng chung tay lan tỏa yêu thương đến cộng đồng </p>
                </div>
            </div>
        </div>
        <Form className="project-form" {...layout}
            name="nest-messages"
            onFinish={onFinish}>
                <Row>
                    <Col span={12}>
                        <Divider>Thông tin người đóng góp</Divider>
                        <Form.Item label="Họ và tên:">
                            <Input disabled></Input>
                        </Form.Item>
                        <Form.Item label="Email:">
                            <Input disabled></Input>
                        </Form.Item>
                        <Form.Item label="Số điện thoại:">
                            <Input disabled></Input>
                        </Form.Item>
                        <Form.Item label="Tên công khai:">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item label="Sử dụng vào dự án:">
                            <Input disabled></Input>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Divider>Chi tiết đóng góp</Divider>
                        <Tabs centered className="project-tab" style={{fontFamily: 'Montserrat'}}>
                            <Tabs.TabPane tab="Đóng góp tiền" key="tab1">
                                <Form.Item className="project-label" label="Nhập số tiền">
                                    <InputNumber className="input-money"
                                        defaultValue={10000}
                                    />
                                </Form.Item>
                                <Form.Item label="Nhập lời nhắn">
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Đóng góp hiện vật" key="tab2">
                                <Form.List name="artifact">
                                {(fields, { add, remove }) => (
                                <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{display: "flex", marginBottom: 8}} align="baseline">
                                        <Form.Item name={['user', 'name']}  rules={[{ required: true }]}>
                                            <Input placeholder='Tên hiện vật'/>
                                        </Form.Item>
                                        <Form.Item >
                                            <InputNumber placeholder='Số lượng' className="input-quantity"/>
                                        </Form.Item>
                                        <Form.Item>
                                            <InputNumber placeholder='Đơn vị' className="input-donvi"/>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                    </Button>
                                </Form.Item>
                                </>
                                )}
                                </Form.List>
                            </Tabs.TabPane>
                        </Tabs>
                    </Col>
                </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </div>
    )

}

export default ProjectDonation;