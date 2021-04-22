import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "../../../public/assets/css/prpstyle.css";
class Remark extends Component {
    render() {
        return (
            <div className="palletback pallet2 appdetails">
                <Row>
                    <Col xs={12}>
                      <div className="pbartitle">
                        Remarks
                      </div>
                    </Col>
                    <Col xl={6}>
                    <div className="paralocation-prp">
                      Description
                      {/* <span className="colorRed">*</span> */}
                    </div>
                    {this.props.Description_error ? 
                    <div className="expense-note-det appdetails">
                      <span className="prpexpnote">Please Enter Description</span>
                    </div> : null }
                    <div className="value2">
                    <div>
                    <textarea className="form-control"  rows="2" placeholder="Enter Here" ref={this.input} onChange={(event) => this.props.Getremarks(event)}></textarea>
                    </div>
                    </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Remark;