import React, { Component } from "react";
import Footer from "../../../landing-page/components/Footer";
import { Row, Col, Card, Table, Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom"

class Detailinfotable extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

     
    render() {
        return (
            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <div className="mr-module-page">
                                
                                
                                <Card className="appointment-details">
                                    <div className=" tpdetailinfo">MR1 TP STATUS - DETAILED INFORMATION TABLE - <span className=" tpdetailinfospan">01/01/2020, Monday - Week 1 </span></div>
                                    <div className="heading">APPOINTMENT DETAILS - <span className="doctornumm">NO DETAIL</span></div>
                                    <Table className="appointment-details-table" responsive="xl">
                                        <thead>
                                            <tr>
                                                <th className="table-dis">Doctor</th>
                                                <th className="date">Stockist</th>
                                                <th className="time">Chemist</th>
                                                <th className="day">Hospital</th>
                                                <th className="day">Others</th>
                                                <th className="day">Working With</th>
                                                <th className="action"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="table-dis">01</td>
                                                <td>02</td>
                                                <td>02</td>
                                                <td>00</td>
                                                <td>01</td>
                                                <td><label className="table-checkbox-label">
                                                    <input
                                                        readOnly
                                                        type="checkbox"
                                                        className="table-customized-checkbox"
                                                        checked={true}
                                                    // value={list["C_Code"]}
                                                    // onClick={this.props.onCheck}
                                                    />
                                                    <span className="table-checkbox-custom"></span>
                                                </label></td>
                                                <td></td>
                                                {/* <td>
                                                    <div className="action-buttons">
                                                        <div className="image"><img src="../public/assets/images/edit_icon.svg" alt="" /></div>
                                                        <div className="image"><img src="../public/assets/images/deletetpd.svg" alt="" onClick={this.closeModal} /></div>
                                                    </div>
                                                </td> */}
                                            </tr>
                                            <tr>
                                                <td className="table-dis">01</td>
                                                <td>02</td>
                                                <td>02</td>
                                                <td>00</td>
                                                <td>01</td>
                                                <td><label className="table-checkbox-label">
                                                    <input
                                                        readOnly
                                                        type="checkbox"
                                                        className="table-customized-checkbox"
                                                        checked={true}
                                                    // value={list["C_Code"]}
                                                    // onClick={this.props.onCheck}
                                                    />
                                                    <span className="table-checkbox-custom"></span>
                                                </label></td>
                                                <td></td>
                                                {/* <td>
                                                    <div className="action-buttons">
                                                        <div className="image"><img src="../public/assets/images/edit_icon.svg" alt="" /></div>
                                                        <div className="image"><img src="../public/assets/images/deletetpd.svg" alt="" onClick={this.closeModal} /></div>
                                                    </div>
                                                </td> */}
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card>
                                
                                
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detailinfotable;