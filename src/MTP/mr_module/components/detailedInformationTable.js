import React, { Component } from "react";
import Footer from "../../../landing-page/components/Footer";
import { Row, Col, Card, Table, Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom"

class DetailedInformationTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            showproductable : false,
        }
        this.closeModal = this.closeModal.bind(this);
        this.onClickPlus = this.onClickPlus.bind(this)
    }

    closeModal() {
        this.setState({
            show: !this.state.show
        })
    }

    onClickPlus(){
        this.setState({showproductable : !this.state.showproductable})
    }
    render() {
        return (
            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <div className="mr-module-page">
                                <Modal centered className="mr-module-delete-popup" show={this.state.show} onHide={this.closeModal}>
                                    <Modal.Body className="text-center">
                                        <div className="alertImgPad" ><img src="../public/assets/images/danger.svg" /></div>
                                        <div className="alertText">Are You Sure ?</div>
                                        <div className="alertSubTextDelete">
                                            You want to Delete it, Once you delete
                                            the data will not be recovered.
                                        </div>
                                        <div className="alertBtns">
                                            <Button className="cancelDelete" onClick={this.closeModal}><div className="txt-btn">Cancel</div></Button>
                                            <Button className="okDelete" onClick={this.closeModal}><div className="txt-btn">OK</div></Button>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                                {/* <div className="main-heading">
                                    <Row>
                                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <div className="main-display">
                                                <div className="main-content name-edi">DETAILED INFORMATION TABLE -&nbsp;
                                                    <div className="doc-name">DR. VISHWAS JHA</div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div> */}
                                <Card className="appointment-details">
                                    <div className=" tpdetailinfo">MR1 TP STATUS - DETAILED INFORMATION TABLE - <span className=" tpdetailinfospan">01/01/2020, Monday - Week 1 </span></div>
                                    <div className="heading">APPOINTMENT DETAILS - <span className="doctornumm">DOCTOR (02)</span></div>
                                    <Table className="appointment-details-table" responsive="xl">
                                        <thead>
                                            <tr>
                                                <th className="table-dis">Sl. No.</th>
                                                <th className="day">Doctor Name</th>
                                                <th className="day">Doctor Code</th>
                                                <th className="day">Products Mapped</th>
                                                <th className="day">Appointment</th>
                                                <th className="day">Working With</th>
                                                <th className="action">Product Mapping Details</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="table-dis">01</td>
                                                <td>Dr. Suresh</td>
                                                <td>D012456</td>
                                                <td>03</td>
                                                <td>12.00 PM TO 12.30 PM</td>
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
                                                <td>{this.state.showproductable == false ? <img onClick = {this.onClickPlus} src= "../../../../public/assets/images/plusicon.svg"/> : <img onClick = {this.onClickPlus} src= "../../../../public/assets/images/minus.png"/> }</td>
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
                                {this.state.showproductable == true ?
                                <Card className="product-mapping-details">
                                    <div className="heading">PRODUCT MAPPING DETAILS</div>
                                    <Table className="product-mapping-details-table" responsive="xl">
                                        <thead>
                                            <tr>
                                                <th className="table-dis sl-no">Sl. No.</th>
                                                <th className="date">Date</th>
                                                <th className="product">Product</th>
                                                <th className="sample">Sample</th>
                                                <th className="promotional-items">Promotional Items</th>
                                                <th className="brand-reminders">Brand Reminders</th>
                                                <th className="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="table-dis">01</td>
                                                <td>01-01-2020</td>
                                                <td>
                                                    <div>Product 1 - 2 No's</div>
                                                    <div>Calcila Susp - 1 No.</div>
                                                    <div>Dermadew Soap - 1 No.</div>
                                                    <div>Product 100 - 1 No.</div>
                                                </td>
                                                <td>
                                                    <div>Anocream - 2 No's</div>
                                                    <div>Sample 1 - 1 No.</div>
                                                    <div>Bromogen 2.5 MG - 1 No.</div>
                                                </td>
                                                <td>
                                                    <div>Pen - 2 No's</div>
                                                    <div>Brief Case - 1 No.</div>
                                                </td>
                                                <td>
                                                    <div>Pink Care Hand Sanitizer - 1 No.</div>
                                                    <div>Yearly Calender - 1 No.</div>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <div className="image"><img src="../public/assets/images/edit_icon.svg" alt="" /></div>
                                                        <div className="image"><img src="../public/assets/images/deletetpd.svg" alt="" onClick={this.closeModal} /></div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="table-dis">02</td>
                                                <td>15-01-2020</td>
                                                <td>
                                                    <div>Product 1 - 2 No's</div>
                                                    <div>Calcila Susp - 1 No.</div>
                                                </td>
                                                <td>
                                                    <div>Anocream - 2 No's</div>
                                                    <div>Sample 1 - 1 No.</div>
                                                </td>
                                                <td>
                                                    <div>---</div>
                                                </td>
                                                <td>
                                                    <div>Yearly Calender</div>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <div className="image"><img src="../public/assets/images/edit_icon.svg" alt="" /></div>
                                                        {/* <div className="image"><img src="../public/assets/images/deletetpd.svg" alt="" onClick={this.closeModal} /></div> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card>:null}
                                {/* <div className="detailed-information-button-groups">
                                    <div className="cancel-button">
                                        <Link to="/day-wise-tp-template"><Button><div className="text">Cancel</div></Button></Link>
                                    </div>
                                    <div className="save-button">
                                        <Link to="/day-wise-tp-template"><Button><div className="text">Save</div></Button></Link>
                                    </div>
                                </div> */}
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailedInformationTable;