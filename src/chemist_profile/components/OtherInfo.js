import React from "react";
import { Row, Col } from "react-bootstrap";

function Otherinfo(props) {
    return (
        <div className="secondrow-firstchem">
            <div className="cbartitle nomar0">OTHER INFO</div>
            <Row>
                <Col xl={3} lg={6} md={6} sm={12} xs={12}>
                    <div className="infochemist infobox2">Fridge</div>
                    <div className="valuechem">
                        {props.data.Fridge ? (
                            <p>{props.data.Fridge}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
                <Col xl={3} lg={6} md={6} sm={12} xs={12}>
                    <div className="infochemist infobox2">
                        Account/Store Manager
                    </div>
                    <div className="valuechem">
                        {props.data.stmanager ? (
                            <p>{props.data.stmanager}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
                <Col xl={3} lg={6} md={6} sm={12} xs={12}>
                    <div className="infochemist infobox2">Store Type</div>
                    <div className="valuechem ">
                        {props.data.storetype ? (
                            <p>{props.data.storetype}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
                <Col xl={3} lg={6} md={6} sm={12} xs={12}>
                    <div className="infochemist infobox2">Discount</div>
                    <div className="valuechem ">
                        {props.data.Discount ? (
                            <p>{props.data.Discount}</p>
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

export default Otherinfo;
