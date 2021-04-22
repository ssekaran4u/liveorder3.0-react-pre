import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import CommonHeader from '../../../lib/CommonHeader';

import ExpenseRequestedList from "./ExpenseRequestedList";
import ExpenseConfirmed from "./ExpenseConfirmedList";
import AccountList from "./AccountList";
import FullScreen from 'react-full-screen';
class ExpenseReqComponent extends Component{
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
              <ExpenseRequestedList/>
            </div>
          </Tab>
          <Tab eventKey="prp-approved-list" title="Confirmed List">
          <div className="maineContent">
            <ExpenseConfirmed/>
            </div>
          </Tab>
          <Tab eventKey="account-details" title="AccountDetails">
            <div className="mainContent">
              <AccountList/>
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
(withRouter(ExpenseReqComponent));