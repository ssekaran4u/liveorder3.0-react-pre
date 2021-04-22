import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReConfirmation from "./reconfirmation";
import Confirmation from "./confirmation";
import MyDownlineApprovalList from "./myDownlineApprovalList";
import { postToServer } from "../.././lib/comm-utils";
import { URL_EXPENSE_CLAIM } from "../.././lib/constants";

class ExpenseConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "confirmation",
            approval: false
        }
        this.onTabChange = this.onTabChange.bind(this)
    }

    onTabChange(tab) {
        this.setState({ activeTab: tab })
        sessionStorage.setItem("confirmationTab", tab)
    }

    componentDidMount() {
        let data = {
            "Index": "exp_approvel_list",
        }
        postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                if (sessionStorage.getItem("confirmationTab") != null) {
                    this.setState({ activeTab: sessionStorage.getItem("confirmationTab") })
                }
                else {
                    if (Result.data.data.length) {
                        this.setState({ activeTab: "downline" })
                    }
                    else {
                        this.setState({ activeTab: "confirmation" })
                    }
                }
                if (Result.data.data.length) {
                    this.setState({ approval: true })
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Expense" })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="claim-list-tabs-container">
                    <Tabs
                        activeKey={this.state.activeTab}
                        onSelect={(e) => this.onTabChange(e)}
                        className="claim-list-tabs"
                    >
                        {this.state.approval == true &&
                            <Tab eventKey="downline" title="My Downline Approval List">
                                <div className="claimlist-datatable-container">
                                    <MyDownlineApprovalList />
                                </div>
                            </Tab>
                        }
                        <Tab eventKey="confirmation" title="Expense Confirmation List">
                            <div className="claimlist-datatable-container">
                                <Confirmation />
                            </div>
                        </Tab>
                        <Tab eventKey="re-confirmation" title="Expense ReConfirmation List">
                            <div className="claimlist-datatable-container">
                                <ReConfirmation />
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </React.Fragment>
        )
    }
}

export default ExpenseConfirmation;