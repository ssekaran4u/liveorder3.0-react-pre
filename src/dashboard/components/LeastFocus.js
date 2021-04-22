import React, { Component } from 'react'
import {Row,Col,Table} from 'react-bootstrap'

import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles,Example
  } from "react-circular-progressbar";

class LeastFocus extends Component {
    constructor(){
        super()
        this.state = {
            isFull: false
        };
        this.handleView = this.handleView.bind(this)
    }
    handleView(){
        this.setState({
            isFull: !this.state.isFull
        })
    } 
    render() {
        const percentage = 66;
        const {data} = this.props
        
        return (
            <Row>
                {/* <Col xl={6} md={6} sm={12} xs={12} className="paddr10">
                    <div className="secondrow-first_dash small-component">
                        <Row>
                            <Col xs={12}>
                                <div className="iconbar">
                                    <div className="bartitle nomar0 dashtitle">RCPA Report (Current Month)</div>
                                    <div className="dashrighticon">
                                        {this.state.isFull ? 
                                            <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView}></img>
                                        :
                                            <img src="../public/assets/images/fullscreen.svg" onClick={this.handleView}></img>
                                        }
                                            <img className="dashfullscreen" src="../public/assets/images/overflow.svg"></img>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} className="lastmonth">
                                <div className="lastmonth_imagecontainer col-6 nopad0">
                                    <img className="downimage" src="../public/assets/images/Arrow_dashboard.svg" />
                                    <div className=""><span className="lastmonth_persentage">33%</span> Vs Last Month</div>
                                </div>
                                <div className="lastmonth_right col-6 nopad0">
                                        <span className="lastmonth_complted">20</span> COMPLETED
                                </div>
                                <div className="leastfocus_graph">
                                <CircularProgressbar
                                    value={percentage}
                                    text={`${percentage}%`}
                                    strokeWidth={5}
                                />
                                <div className="piebelow_text">Completed</div>
                                </div>
                            </Col>
                            <Col xs={6} className="rcpa heading_border">
                                <div className="totalnorcpa_text">
                                    <p className="heading">Total No. Of RCPA</p>
                                    <p className="heading_value">30</p>
                                </div>
                            </Col>
                            <Col xs={6} className="rcpa">
                                <div>
                                    <p className="heading">To Be completed</p>
                                    <p className="heading_value">10</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col> */}
                <Col xl={6} md={6} sm={12} xs={12} className="paddl10">
                    <div className={this.state.isFull ? "fullscreenView" : "ucdoctorsecondrow-first small-component"}>
                        <Row className="ucdocheading">
                            <Col xs={12}>
                                <div className="iconbar">
                                    <div className="bartitle nomar0 dashtitle">Low Performing Products</div>
                                    <div className="dashrighticon">
                                        {this.state.isFull ? 
                                            <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView}></img>
                                        :
                                            <img src="../public/assets/images/fullscreen.svg" onClick={this.handleView}></img>
                                        }
                                            <img className="dashfullscreen" src="../public/assets/images/overflow.svg"></img>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="listcontainer">
                            <div className="table-responsive">
                                <Table className="dashtable table">
                                    <thead className="dashtableheadrow">
                                        <tr className="dashtableheadrow">
                                            <th className="dashtablehead">SR. NO.</th>
                                            <th className="dashtablehead">BRAND NAME</th>
                                            <th className="dashtablehead">SALES (In INR)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data !=0 && data != undefined ? 
                                            data.map((leastdata,index)=>(
                                            <tr className="dashtableheadlist" key={index}>
                                                <td className="brandname">{leastdata.slno}</td>
                                                <td className="brandname">{leastdata.item}</td>
                                                <td className="brandname">{leastdata.sales}</td>
                                            </tr>
                                            ))
                                            : 
                                            <tr className="dashtableheadlist">
                                            <td className="brandname" colSpan="3">No Low Performing Products</td>
                                            </tr>
                                            }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}
export default LeastFocus