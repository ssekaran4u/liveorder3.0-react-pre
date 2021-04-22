import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Tab, Tabs } from "react-bootstrap";
import CommonHeader from '../../lib/CommonHeader';
import PrpReqListTable from './PrpRequestedList';
import PrpApprovedListTable from './PrpApprovedComponent';
import { withRouter } from "react-router";
import { connect } from "react-redux";

import "../../../public/assets/css/prpstyle.css";
import "../../../public/assets/css/prpresponsive.css";
class PrpRequestComponent extends Component{
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
        <div
          className={
          this.state.isFull ? "fullscreenView" : ""
          }
         >
         <CommonHeader/>
        <Tabs id="controlled-tab-example" className="dcrtab-req tabhead">
          <Tab eventKey="prp-request-list" title="Requested List">
				  <div className="maineContent">
            <PrpReqListTable/>
          </div>
          </Tab>
          <Tab eventKey="prp-approved-list" title="Approved/Rejected List">
            <div className="maineContent">
            <PrpApprovedListTable/>
            </div>
         </Tab>
         <CommonHeader/>
        </Tabs>
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
)(withRouter(PrpRequestComponent));