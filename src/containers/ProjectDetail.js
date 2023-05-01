import React from 'react';
import './index.css';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const ProjectDetail = () => {
    return (
        <div style={{fontFamily: 'Montserrat, sans-serif'}}>
        <div class="projects section" id="projects">
            <div class="container" style={{marginTop: "30px"}}>
                <div class="container-title">
                    <div class="section-heading row">
                        <div className='col-12'>
                            <h2 >Những dự án từ thiện của <em>SUN</em><span>SHINE</span></h2>
                            <div class="line-dec"></div>
                            <p>Từ nhiều năm nay, Quỹ Từ thiện Sunshine đã và đang tiếp tục thực hiện dự án Trợ giúp y tế. Mong muốn giúp đỡ những bệnh nhân nghèo có thêm kinh phí điều trị, vượt qua phần nào khó khăn trong cuộc sống. </p>
                            </div>
                        <div className='section-line col-12'></div>
                    </div>
                </div>
            </div>
            <div className="container row" style={{margin: "0px auto", paddingTop: "80px", background: "red"}}>
                
                
            </div>
        </div>
    </div>
    )
}
export default ProjectDetail;