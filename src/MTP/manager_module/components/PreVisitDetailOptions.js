import React, { Component } from 'react';
import { Dropdown, Row, Col, Form } from "react-bootstrap";

class PreVisitDetailOptions extends Component {
    render() {
        return (
            <div>
                 <Dropdown className="myDropdown">
                    {/* <Dropdown.Toggle variant="primary" className="no-detail-button" id="dropdown-basic">
                            <img src="public/assets/images/mobileCall.svg" alt="" style={{paddingRight:'5px'}}></img>
                            Pre Visit Details
                    </Dropdown.Toggle> */}
                    <Dropdown.Menu className="Repothers-dropdown1">
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12}>
                                    <div className="heading0001">Date</div>
                                    <div className="description0001">17th December, 2019</div>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={12}>
                                    <div className="heading0001">Number of Doctors Covered</div>
                                    <div className="description0001">Five</div>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={12}>
                                    <div className="heading0001">Patches Covered</div>
                                    <div className="description0001">Airoli</div>
                                </Col>
                            </Row>  
                            <div class="horizontalLine"></div>  
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12}>
                                    <div className="heading0001">Date</div>
                                    <div className="description0001">17th December, 2019</div>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={12}>
                                    <div className="heading0001">Number of Doctors Covered</div>
                                    <div className="description0001">Five</div>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={12}>
                                    <div className="heading0001">Patches Covered</div>
                                    <div className="description0001">Airoli</div>
                                </Col>
                            </Row>  
                            <div class="horizontalLine"></div>  
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12}>
                                    <div className="heading0001">Date</div>
                                    <div className="description0001">17th December, 2019</div>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={12}>
                                    <div className="heading0001">Number of Doctors Covered</div>
                                    <div className="description0001">Five</div>
                                </Col>
                            </Row>  
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

export default PreVisitDetailOptions;