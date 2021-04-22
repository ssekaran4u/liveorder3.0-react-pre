import React, { Component } from 'react';
import { Tab, Tabs, Form, Col, Row} from "react-bootstrap";
import CommonHeader from '../../../lib/CommonHeader';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Requestlist from '../admincomponents/requestlist'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
class Updatedoctorconflist extends Component{
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
        <div className="maineContent">
          <div
            className={
            this.state.isFull ? "fullscreenView" : "" }>
            <CommonHeader heading="Update Doctor Approval list" />
            <div className="maineContent">
              <Requestlist/>
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
)(withRouter(Updatedoctorconflist));