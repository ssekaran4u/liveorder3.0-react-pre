import React from "react";
import { Row, Col } from "react-bootstrap";

function MoreInfo() {
    return (
        <div className="secondrow-firstchem">
            <div className="cbartitle nomar0">MORE INFO</div>
            <Row>
                <Col xs={6} xl={6} lg={6} md={6}>
                    <div className="infochemist  infobox2">Contact Person</div>
                    <div className="valuechem">Steve</div>
                </Col>
                <Col xs={6} xl={6} lg={6} md={6}>
                    <div className="infochemist  infobox2">
                        Contact Person Mobile No.
                    </div>
                    <div className="valuechem">+91 9878787656</div>
                </Col>
                <Col xs={6} xl={6} lg={6} md={6}>
                    <div className="infochemist  infobox2">Fax Number</div>
                    <div className="valuechem">91-78887678</div>
                </Col>
            </Row>
        </div>
    );
}
export default MoreInfo;
