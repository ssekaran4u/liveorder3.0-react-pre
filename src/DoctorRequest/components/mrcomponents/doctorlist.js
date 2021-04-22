import React, { Component } from 'react';
import { Tab, Tabs } from "react-bootstrap";
import CommonHeader from '../../../lib/CommonHeader';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Tablecomponent from './tablecomponent'
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
      <div className="maineContent prptab">
        <div
          className={
          this.state.isFull ? "fullscreenView" : ""
          }
         >
           {/* <CommonHeader> */}
           <CommonHeader heading="Doctor List to Be Closed Or Updated" />
           <div className="maineContent">
            <Tablecomponent/>
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