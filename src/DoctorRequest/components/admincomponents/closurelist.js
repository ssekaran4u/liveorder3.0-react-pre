import React, { Component } from 'react';
import { Tab, Tabs, Form, Col, Row} from "react-bootstrap";
import CommonHeader from '../../../lib/CommonHeader';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Newdoctortable from '../admincomponents/newdoctortable'
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
class Closurelist extends Component{
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
            <CommonHeader heading="Closure Doctor Confirmation List" />
            <div className="maineContent">
              <Newdoctortable/>
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
)(withRouter(Closurelist));