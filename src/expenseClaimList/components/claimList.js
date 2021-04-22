import React, { Component } from "react";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MyExpenseClaimList from "./myExpenseClaimList";
import MyDownlineApprovalList from "./myDownlineApprovalList";
import { postToServer } from "../.././lib/comm-utils";
import { URL_EXPENSE_CLAIM } from "../.././lib/constants";
import ExpenseConfirmation from "./expenseConfirmation";
import Confirmation from "./confirmation";
import ReConfirmation from "./reconfirmation";
import {withRouter} from "react-router-dom";

class ClaimList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeDetails: {},
            activeTab: "myexpense",
            confirmator: "0",
        }
        this.onTabChange = this.onTabChange.bind(this)
    }

    onTabChange(tab) {
        this.setState({ activeTab: tab })
        sessionStorage.setItem("approvalTab", tab)
    }

    componentDidMount() {
        if (sessionStorage.getItem("approvalTab") != null) {
            this.setState({ activeTab: sessionStorage.getItem("approvalTab") })
        }
        else {
            this.setState({ activeTab: "myexpense" })
        }
        //To get Employee detail.
        var data = {
            "Index": "EmployeeDetails",
        }
        postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ employeeDetails: Result.data.Header[0] })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Expense API " })
        })
        //To check the final confirmator.
        var check_confirmator = {
            "Index": "desk_confirm",
        }
        postToServer(URL_EXPENSE_CLAIM, check_confirmator).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ confirmator: Result.data.data[0].Id })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in  confirmator Expense API " })
        })
    }

    render() {
        var subContent = <div className="sub-content">
            <Link
                to={localStorage.getItem("type") == 1 ?
                    "/dashboard" : localStorage.getItem("type") == 2 ? "/mdashboard"
                        : localStorage.getItem('type') == 3 ? "/adashboard" : null}
            ><span>Dashboard</span></Link>&nbsp;
        / Expense Claim List</div>
        if (localStorage.getItem('type') == 3) {
            return (
                <div className="expense-claim-list">
                    <Breadcrumbs content="Expense Claim List" subContent={subContent} />
                    <ExpenseConfirmation />
                </div>
            )
        }
        else if (localStorage.getItem('type') == 1 || localStorage.getItem('type') == 2) {
            return (
                <div className="expense-claim-list">
                    <Breadcrumbs content="Expense Claim List" subContent={subContent} />
                    <Card className="claimlist-main-card">
                        <div className="heading">Employee Details</div>
                        <div className="emp-details">
                            <div className="col-details">
                                <div className="row-details">
                                    <div className="main-text">Employee Name</div>
                                    <div className="sub-text">
                                        : &nbsp; {this.state.employeeDetails.FsName != undefined ? this.state.employeeDetails.FsName.toLowerCase() : null}
                                        &nbsp;{this.state.employeeDetails.FsCode != undefined ? "(" + this.state.employeeDetails.FsCode + ")" : null}
                                    </div>
                                </div>
                                <div className="row-details">
                                    <div className="main-text">Reporting To</div>
                                    <div className="sub-text">
                                        : &nbsp;{this.state.employeeDetails.ReportingTo != undefined ? this.state.employeeDetails.ReportingTo.toLowerCase() : null}
                                    </div>
                                </div>
                            </div>
                            <div className="col-details">
                                <div className="row-details">
                                    <div className="main-text">Designation</div>
                                    <div className="sub-text">
                                        : &nbsp;{this.state.employeeDetails.Designation != undefined ? this.state.employeeDetails.Designation : null}
                                    </div>
                                </div>
                                <div className="row-details">
                                    <div className="main-text">HeadQuarter</div>
                                    <div className="sub-text">: &nbsp;
                                {this.state.employeeDetails.HeadQuarter != undefined ? this.state.employeeDetails.HeadQuarter.toLowerCase() : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    {this.props.profile == "manager" ?
                        <div className="claim-list-tabs-container">
                            <Tabs
                                activeKey={this.state.activeTab}
                                onSelect={(e) => this.onTabChange(e)}
                                className="claim-list-tabs"
                            >
                                <Tab eventKey="myexpense" title="My Expense Claim List">
                                    <div className="claimlist-datatable-container">
                                        <MyExpenseClaimList
                                        />
                                    </div>
                                </Tab>
                                <Tab eventKey="downline" title="My Downline Approval List">
                                    <div className="claimlist-datatable-container">
                                        <MyDownlineApprovalList />
                                    </div>
                                </Tab>
                                {this.state.confirmator == "1" ?
                                    <Tab eventKey="confirmation" title="Expense Confirmation List">
                                        <div className="claimlist-datatable-container">
                                            <Confirmation />
                                        </div>
                                    </Tab> : null}
                                {this.state.confirmator == "1" ?
                                    <Tab eventKey="reconfirmation" title="Expense ReConfirmation List">
                                        <div className="claimlist-datatable-container">
                                            <ReConfirmation />
                                        </div>
                                    </Tab> : null}
                            </Tabs>
                        </div> :
                        this.props.profile == "mr" ?
                            <MyExpenseClaimList />
                            : null}
                </div>
            )
        }
    }
}

export default withRouter(ClaimList);
