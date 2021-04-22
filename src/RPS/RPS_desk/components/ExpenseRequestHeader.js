import React, { Component } from "react";
import { toggleDcrHeader, goFullView } from "../../../actions/DCRList";
import { connect } from "react-redux";
import { Modal, Button, Form, Row, Col, InputGroup, Tabs, Tab, } from 'react-bootstrap'
import ExpenseListTable from './ExpenseListTable'
import ExpenseConfirmationListTable from './ExpenseConfirmationListTable'
import AccountList from '../components/AccountList'

class ExpenseRequestHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleHeader: "",
            isFull: "",
            activeExpTab:"Expense"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.onTabChange = this.onTabChange.bind(this)

    }
     onTabChange(tab) {
        this.setState({ activeExpTab: tab })
        sessionStorage.setItem("ExpTab", tab)
    }
    handleChange() {
        this.props.toggleDcrHeader();
    }

    handleViewChange() {
        this.props.goFullView();
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.toggleHeader !== nextProps.toggleHeader)
            return { toggleHeader: nextProps.toggleHeader };
        if (prevState.isFull !== nextProps.isFull)
            return { isFull: nextProps.isFull };
        return null;
    }



    render() {
        return (
            <div className="tabRps ">
                <div>
                    <div className="">

                        <Tabs
                            id="controlled-tab-example"
                            className="rpsSubTab"
                            activeKey={this.state.activeExpTab}
                            onSelect={(e) => this.onTabChange(e)}
                        >
                            <Tab eventKey="Expense" title="Expense List">
                                <>
                                    <ExpenseListTable activeExpTab = {this.state.activeExpTab} />
                                </>
                            </Tab>
                            <Tab eventKey="ConfirmCancel" title=" Confirmed/Cancel List">
                            <ExpenseConfirmationListTable activeExpTab = {this.state.activeExpTab} />
                            </Tab>
                            <Tab eventKey="HL" title=" Account Details Summary">
                                <AccountList activeExpTab = {this.state.activeExpTab} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>

        );

    }
}
const mapStateToProps = state => ({
    toggleHeader: state.DCRList.toggleHeader,
    isFull: state.DCRList.isFull
});

const mapDispatchToProps = dispatch => ({
    toggleDcrHeader: () => dispatch(toggleDcrHeader()),
    goFullView: () => dispatch(goFullView())
});
export default connect(
    mapStateToProps,
    mapDispatchToProps)(ExpenseRequestHeader)



  // <div className="dcr-head">
  //               <div>
  //                <div className="dcr-list-sec-head">
  //                      <Button className={ this.state.requestListBtn ? "planBtn mr-3" : "secondary  mr-3" } onClick ={this.handlereqlistBtn}>
  //                           Expense List
  //                       </Button> 
  //                       <Button className={ this.state.statusBtn ? "planBtn mr-3 ml-3" : " secondary mr-3 ml-3" } onClick ={this.handleStatusBtn}>
  //                           Confirmed/Cancel List
  //                       </Button> 
  //                        <Button className={ this.state.accountSummaryBtn ? "planBtn mr-3 ml-3" : "secondary ml-3 mr-3" } onClick ={this.handleAccsumBtn}>
  //                          Account Details Summary
  //                       </Button>

  //                   </div> 
  //               </div>
  //               <div className="dcr-head-options">
  //                   {this.state.isFull ? (
  //                       <img
  //                           src="../public/assets/images/collapse-grey.svg"
  //                           className="fullscreen_img"
  //                           alt="fullscreen_img"
  //                           onClick={this.handleViewChange}
  //                       />
  //                   ) : (
  //                       <img
  //                           src="../public/assets/images/fullscreen.svg"
  //                           className="fullscreen_img"
  //                           alt="fullscreen_img"
  //                           onClick={this.handleViewChange}
  //                       />
  //                   )}
  //               </div>
  //           </div>
                                //<ExpenseConfirmationListTable />
