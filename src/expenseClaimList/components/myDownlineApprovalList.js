import React, { Component } from "react";
import SfaDatatable from '../../BasicComponet/dataTable';
import { withRouter } from "react-router-dom";
import { postToServer } from "../.././lib/comm-utils";
import Modal from 'react-bootstrap/Modal';
import { URL_EXPENSE_CLAIM } from "../.././lib/constants";
import SfaSpinner from "../../BasicComponet/sfaSpinner";

class MyDownlineApprovalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            approvalList: [],
            reportNo: "",
            missingDates: [],
            showPopUp: false,
            spinner: false,
        }
        this.handleView = this.handleView.bind(this)
        this.onReportNo = this.onReportNo.bind(this)
        this.onHide = this.onHide.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onContinue = this.onContinue.bind(this)
    }

    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }

    onHide() {
        this.setState({ showPopUp: true })
    }

    onCancel() {
        this.setState({ showPopUp: false})
    }

    onContinue(){
        this.props.history.push("/expenseclaimentry/" + "00/" + "approval/" + this.state.reportNo)
    }

    onReportNo(no) {
        this.setState({reportNo: no.props.children.props.children})
        let data = {
            "Index": "Dcr_Missing",
            "Data": { "srno": no.props.children.props.children }
        }
        postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                if (Result.data.data[0].id == "0" || Result.data.data[0].Result == "0") {
                    this.props.history.push("/expenseclaimentry/" + "00/" + "approval/" + no.props.children.props.children)
                }
                else {
                    this.setState({ missingDates: Result.data.data[0].Result.split(", "), showPopUp: true })
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in dcr missing dates api" })
        })
    }

    componentDidMount() {
        this.setState({spinner: true})
        //To get the downline approval list
        let data = {
            "Index": "exp_approvel_list",
        }
        postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({  spinner: false, approvalList: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Expense" })
        })
    }

    render() {
        const header = [
            { prop: 'reportNo', title: 'Report No.', filterable: true },
            { prop: 'claimCode', title: 'Claim Code', filterable: true },
            { prop: 'employee', title: 'Employee', filterable: true, sortable: true },
            { prop: 'headQuarter', title: 'Head Quarter', filterable: true },
            { prop: 'frDate', title: 'Date(From)', sortable: true },
            { prop: 'toDate', title: 'Date(To)', sortable: true },
            { prop: 'approvedOn', title: 'Approved On', sortable: true },
        ];
        var body = []
        this.state.approvalList.map((list) => {
            body.push({
                reportNo: list.srno,
                claimCode: list["ClaimCode"],
                employee: list["Employee"],
                headQuarter: list["HeadQuarter"],
                frDate: list["DateFrom"],
                toDate: list["DateTo"],
                approvedOn: list["ApprovedDt"] == "" ? "Pending for approval" : list["ApprovedDt"]
            })
        })

        body.map((res) => {
            if (res.reportNo != "") {
                res.reportNo =
                    <div>
                        <a className="report-link" onClick={() => this.onReportNo(res.reportNo)}>{res.reportNo}</a>
                    </div>
            }
        })

        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };
        return (
            <React.Fragment>
                {this.state.spinner == true &&
                    <SfaSpinner />
                }
                <Modal
                    className="dcr-missing-dates-modal-container"
                    centered
                    show={this.state.showPopUp}
                    onHide={this.onHide}
                    size="lg"
                >
                    <div className="dcr-missing-heading">
                        MISSING DCR/MCR ENTRY DATES LIST
                        <img
                            className="dcr-list-cancel"
                            src="../public/assets/images/CLOSE.svg"
                            onClick={this.onCancel}
                        />
                    </div>
                    <div className="dcr-missing-dates-body">
                        <div className="dcr-missing-dates-body-heading">
                            DCR Entry is not found for the following Dates <span>{"(" + this.state.missingDates.length + " " + "days" + ")"}</span>.
                        </div>
                        <div className="date-container">
                            {this.state.missingDates.map(res =>
                                <div className="date_col">
                                    <div className="date_txt">{res}</div>
                                </div>
                            )}
                        </div>
                        <div className="dcr-missing-dates-body-footer">
                            Do you want to Continue ?
                        </div>
                    </div>
                    <div className="dcr-missing-dates-footer">
                        <button className="dcr_cancel_btn" onClick={this.onCancel}>Cancel</button>
                        <button className="dcr_save_btn" onClick={this.onContinue}>Continue</button>
                    </div>
                </Modal>
                <SfaDatatable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    pagination={true}
                    searchlist={true}
                    mainHeading={true}
                    heading="My Downline Approval List"
                    isFull={this.state.isFull}
                    handleView={this.handleView}
                // filterOptions={<FilterOption/>}
                />
            </React.Fragment>
        )
    }
}

export default withRouter(MyDownlineApprovalList);