import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { tick } from "../../lib/comm-utils";
import StayAtComp from "../components/StayAtComp";

class OtherTypeCamp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().getHours() + ":" + new Date().getMinutes()
        };
    }
    render() {
        return (
            <div className="dcr-list-sec meetingDiv">
                <div className="meetingHead">Camp Activity</div>
                <div className="dcrTime">Time</div>
                <div className="dcrtimeSec">
                    <div className="timeIcon">
                        <img src="../public/assets/images/time.svg" />
                    </div>
                    <div className="currtime">{this.state.time}</div>
                    <div className="currtimeslot">{tick()}</div>
                </div>
                <div className="margin25 paddRight100">
                    <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <Form.Label className="customized-label">
                                Village
                            </Form.Label>
                            <StayAtComp />
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <Form.Label className="customized-label">
                                Camp Type<span className="colorRed">*</span>
                            </Form.Label>
                            <StayAtComp />
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <Form.Label className="customized-label">
                                Camp Topic<span className="colorRed">*</span>
                            </Form.Label>
                            <StayAtComp />
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <Form.Label className="customized-label">
                                Key Opinion Leader(KOL)
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="customized-input"
                                placeholder="Enter Here"
                            />
                        </Col>
                    </Row>
                    <Row className="marginTop">
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <Form.Label className="customized-label">
                                Qualification
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="customized-input"
                                placeholder="Enter Here"
                            />
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <Form.Label className="customized-label">
                                Attendenees
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="customized-input"
                                placeholder="Enter Here"
                            />
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <Form.Label className="customized-label">
                                Footfall
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="customized-input"
                                placeholder="Enter Here"
                            />
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                            <Form.Label className="customized-label">
                                No. Of Cards
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="customized-input"
                                placeholder="Enter Here"
                            />
                        </Col>
                    </Row>
                    <Row className="marginTop41 ">
                        <Col lg={6} md={12} sm={12} xs={12} className="product">
                            <button
                                className="savedcrBtn  mb-2"
                                onClick={this.showSuccessPopup}
                            >
                                Save DWR
                            </button>
                            <button className="danger danger-outline mr-2 mb-2 padleft">
                                Reset
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
export default OtherTypeCamp;
