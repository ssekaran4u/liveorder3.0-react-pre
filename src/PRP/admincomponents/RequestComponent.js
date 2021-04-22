import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import CommonHeader from '../../lib/CommonHeader';

import RequestedList from "./RequestedList";
import ConfirmedList from "./ConfirmedList";
import "../../../public/assets/css/prpresponsive.css";
import "../../../public/assets/css/prpstyle.css";
import FullScreen from 'react-full-screen';
class ReqComponent extends Component{
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
      <div className="maineContent prptab">
        <div className={this.state.isFull ? "fullscreenView" : "" }>
          <CommonHeader/>
          <Tabs id="controlled-tab-example" className="dcrtab-req tabhead">
          <Tab eventKey="prp-request-list" title="Requested List">
            <div className="maineContent">
              <RequestedList/>
            </div>
          </Tab>
          <Tab eventKey="prp-approved-list" title="Confirmed/Rejected/Hold List">
          <div className="maineContent">
            <ConfirmedList/>
            </div>
          </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  isFull: state.DCRList.isFull
})
export default connect(
  mapStateToProps, 
  null)
(withRouter(ReqComponent));