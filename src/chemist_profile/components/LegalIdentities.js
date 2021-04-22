import React from "react";
import { Row, Col } from "react-bootstrap";

function Legal(props) {
    return (
        <div className="secondrow-firstchem">
            <div className="cbartitle nomar0">LEGAL IDENTITIES</div>
            <Row>
                <Col lg={4} md={6} sm={12} xs={12}>
                    <div className="infochemist infobox2">Tin Number</div>
                    <div className="valuechem">
                        {props.data.TinNo ? (
                            <p>{props.data.TinNo}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12} xs={12}>
                    <div className="infochemist infobox2">Licence Number</div>
                    <div className="valuechem">
                        {props.data.lic_no ? (
                            <p>{props.data.lic_no}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12} xs={12}>
                    <div className="infochemist  infobox2">
                        License Number (Food)
                    </div>
                    <div className="valuechem ">
                        {props.data.lic_food ? (
                            <p>{props.data.lic_food}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}
export default Legal;
