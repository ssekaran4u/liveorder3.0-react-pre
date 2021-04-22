import React, { Component } from 'react';
import { Tab, Tabs, Form, Col, Row} from "react-bootstrap";
import CommonHeader from '../../../lib/CommonHeader';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Doctorlisttable from './doctorlisttable'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
class DoctorList extends Component{
  constructor(props) {
    super(props);
    this.state = {
        isFull: this.props.isFull
    };
}
static getDerivedStateFromProps(nextState, prevState) {
  if (prevState.isFull !== nextState.isFull)
      return { isFull: nextState.isFull };
  return null;
}
  render(){
    return (
      <div>
        <div className ="maineContent prptab">
          <Row>
            <Col xl={4} md={4} xs={6} className="">
              <div className="singledropdown doctorformmargin">
                <Form.Label className="customized-label chemistlabel">Designation <span className="colorRed">*</span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={4} xs={6} className="">
              <div className="singledropdown doctorformmargin">
                <Form.Label className="customized-label chemistlabel">Name <span className="colorRed">*</span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={2} md={2}>
              <div className="singledropdown">
                <button className="loadbtn btn-primary">Load</button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="maineContent">
          <div
            className={
            this.state.isFull ? "fullscreenView" : "" }>
            <CommonHeader heading="Doctor List to Be Closed Or Updated" />
            <div className="maineContent">
              <Doctorlisttable/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  isFull: state.DCRList.isFull
});

export default connect(
  mapStateToProps,
  null
)(withRouter(DoctorList));