import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Tab, Tabs } from "react-bootstrap";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import CommonHeader from '../../lib/CommonHeader';

import PrpExpenseRequestedTable from "./PrpExpenseRequestedTable";
import PrpExpenseApprovedTable from './PrpExpenseApprovedTable';

import "../../../public/assets/css/prpresponsive.css";
import "../../../public/assets/css/prpstyle.css";
import FullScreen from 'react-full-screen';
class PrpExpenseComponent extends Component{
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
              <PrpExpenseRequestedTable/>
            </div>
          </Tab>
          <Tab eventKey="prp-approved-list" title="Approved List">
          <div className="maineContent">
            <PrpExpenseApprovedTable/>
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
(withRouter(PrpExpenseComponent));