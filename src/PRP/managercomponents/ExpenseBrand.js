import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "../../../public/assets/css/prpstyle.css";
class expenseBrand extends Component {
    render() {
        return (
            <div className="palletback pallet2">
                <Row>
                    <Col xs={12}>
                      <div className="pbartitle">
                        Brands for PRP
                      </div>
                    </Col>
                    <Col xl={12}>
                    <div className="paralocation-prp">
                      Brands
                      <span className="colorRed">*</span>
                    </div>
                    <div className="value2 flexwrap">
                    {this.props.Brands ? this.props.Brands.map((item, index) => (
                      <span key={index} className="selectedDropdown">{item.Name}
                      </span>
                    ))
                    : null}
                    </div>
                    </Col>                    
                </Row>
            </div>
        );
    }
}
export default expenseBrand;