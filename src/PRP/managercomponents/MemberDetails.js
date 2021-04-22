import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

class memberDetails extends Component {
    render() {
        return (
            <div className="palletback pallet2 appdetails">
                <Row>
                    <Col xs={12}>
                        <div className="pbartitle">
                          <p>Member Details</p>
                        </div>
                    </Col>
                    <Col xl={12}>
                        <div className="paralocation-prp">
                          No. of Team Member Attending Meeting
                          <span className="colorRed">*</span>
                        </div>
                        <div className="value2">
													<p>{this.props.n_NoTeamMembers}</p>
                        </div>
                    </Col>
                    {this.props.TeamMembers ? this.props.TeamMembers.map((item, index) =>(
                      <Col xl={6} key={index}>
                        <div className="paralocation-prp">
                          Name {index + 1}
                        </div>
                        <div className="value2" key={index}>
													<p>{item.MemberName}</p>
                        </div>
                      </Col>
                    )) : null}
                   </Row>
            </div>
        );
    }
}
export default memberDetails;