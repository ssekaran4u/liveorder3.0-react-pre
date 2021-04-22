import React, { Component } from "react";
import SfaDatatable from '../../BasicComponet/dataTable';
import { postToServer } from "../.././lib/comm-utils";
import { Link } from "react-router-dom";
import { URL_EXPENSE_CLAIM } from "../.././lib/constants";
import Button from "react-bootstrap/Button";
import SearchDropdown from "../../BasicComponet/searchDropdown";
import SfaDateRangePicker from "../../BasicComponet/sfaDateRangePicker";
import MonthPicker from './monthPicker';
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";
import SfaSpinner from "../../BasicComponet/sfaSpinner";

class MyExpenseClaimList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            expenseClaimList: [],
            claimTypeList: [],
            claimTypeValue: "-1",
            date: [null, null],
            dayType: "",
            dateValue: "",
            claimTypeErr: "",
            dateErr: "",
            spinner: false,
        }
        this.handleView = this.handleView.bind(this)
        this.getClaimTypeValue = this.getClaimTypeValue.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.onNewEntry = this.onNewEntry.bind(this)
        this.onMonthChange = this.onMonthChange.bind(this)
    }

    //function for fullscreen-view
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }

    componentDidMount() {
        this.setState({spinner: true})
        //To get the expense Claim list.
        var data = {
            "Index": "MyExpenseClaimList",
        }
        postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ spinner: false, expenseClaimList: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Expense" })
        })
        //To get claim list.
        let list = [];
        var data = {
            "Index": "EmployeeDetails",
        }
        postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                Result.data.Claim.map(res => {
                    list.push({
                        "key": res.n_srno,
                        "value": res.code,
                        "text": res.c_name
                    })
                })
                this.setState({ claimTypeList: list })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in claim list API " })
        })
    }

    //onClick of new Entry button.
    onNewEntry() {
        let fromDate = this.state.date[0];
        let toDate = this.state.date[1];
        let fromMonth = "";
        let toMonth = "";
        let fromYear = "";
        let toYear = "";
        let currentMonth = new Date().getMonth() + 1;
        let currentYear = new Date().getFullYear();
        if (this.state.dayType == "1") {
            let dates = this.state.dateValue.split(',');
            if (this.state.claimTypeValue == -1 || (dates[1] > currentYear)) {
                if (this.state.claimTypeValue == -1) {
                    this.setState({ claimTypeErr: "Select claim Type !" })
                }
                if ((dates[0] > currentMonth) || (dates[1] > currentYear)) {
                    if (dates[1] > currentYear) {
                        this.setState({ dateErr: "Can't claim expense in advance !" })
                    }

                }
            }
            else {
                if (dates[1] == currentYear) {
                    if (dates[0] > currentMonth) {
                        this.setState({ dateErr: "Can't claim expense in advance !" })
                    }
                    else {
                        let dates = this.state.dateValue.split(',')
                        var newentry = {
                            "Index": "NewEntry",
                            "Data": {
                                "claim_code": this.state.claimTypeValue,
                                "month": dates[0], "year": dates[1],
                                "fromdate": "",
                                "todate": ""
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, newentry).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                if (!Result.data.data.length) {
                                    this.props.history.push("/expenseclaimentry/" + this.state.claimTypeValue + "/" + "newentry/" + this.state.dateValue)
                                }
                                else if (Result.data.data[0].Result == undefined) {
                                    this.props.history.push("/expenseclaimentry/" + this.state.claimTypeValue + "/" + "newentry/" + this.state.dateValue)
                                }
                                else {
                                    this.setState({
                                        dateErr: Result.data.data[0].Result + "!"
                                    })
                                }
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in Expense" })
                        })
                    }
                }
                else {
                    let dates = this.state.dateValue.split(',')
                    var newentry = {
                        "Index": "NewEntry",
                        "Data": {
                            "claim_code": this.state.claimTypeValue,
                            "month": dates[0], "year": dates[1],
                            "fromdate": "",
                            "todate": ""
                        }
                    }
                    postToServer(URL_EXPENSE_CLAIM, newentry).then((Result) => {
                        if (Result.data.Status == 'Success') {
                            if (!Result.data.data.length) {
                                this.props.history.push("/expenseclaimentry/" + this.state.claimTypeValue + "/" + "newentry/" + this.state.dateValue)
                            }
                            else if (Result.data.data[0].Result == undefined) {
                                this.props.history.push("/expenseclaimentry/" + this.state.claimTypeValue + "/" + "newentry/" + this.state.dateValue)
                            }
                            else {
                                this.setState({
                                    dateErr: Result.data.data[0].Result + "!"
                                })
                            }
                        }
                    }).catch((Error) => {
                        this.setState({ Error: true, Errormsg: "Error in new entry api in Expense" })
                    })
                }
            }
        }
        else {
            if (fromDate != null || toDate != null) {
                fromMonth = fromDate.getMonth();
                toMonth = toDate.getMonth();
                fromYear = fromDate.getFullYear();
                toYear = toDate.getFullYear();
            }
            if (this.state.claimTypeValue == -1 || (fromMonth != toMonth) || (fromYear != toYear)) {
                if (this.state.claimTypeValue == -1) {
                    this.setState({ claimTypeErr: "Select claim Type !" })
                }
                if ((fromMonth != toMonth) || (fromYear != toYear)) {
                    if (fromYear != toYear) {
                        this.setState({ dateErr: "Select the date of same Year !" })
                    }
                    if (fromMonth != toMonth) {
                        this.setState({ dateErr: "Select the date of same Month !" })
                    }
                }
            }
            else {
                let dates = this.state.dateValue.split(',')
                let newentry = {
                    "Index": "NewEntry",
                    "Data": {
                        "claim_code": this.state.claimTypeValue,
                        "month": "", "year": "",
                        "fromdate": dates[0],
                        "todate": dates[1]
                    }
                }
                postToServer(URL_EXPENSE_CLAIM, newentry).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        if (!Result.data.data.length) {
                            this.props.history.push("/expenseclaimentry/" + this.state.claimTypeValue + "/" + "newentry/" + this.state.dateValue)
                        }
                        else if (Result.data.data[0].Result == undefined) {
                            this.props.history.push("/expenseclaimentry/" + this.state.claimTypeValue + "/" + "newentry/" + this.state.dateValue)
                        }
                        else {
                            this.setState({
                                dateErr: Result.data.data[0].Result + "!"
                            })
                        }
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in new entry api in Expense" })
                })
            }
        }
    }

    //OnChange method of ClaimType Dropdown
    getClaimTypeValue(claimType) {
        let dateFormat = require('dateformat');
        this.setState({ claimTypeValue: claimType });
        this.setState({ claimTypeErr: "" })

        //To set the date format based on the setup
        var data = {
            "Index": "FlagDetails",
            "Data": { "claim_code": claimType }
        }
        postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ dayType: Result.data.data[0]["Month/Day"] })
                if (Result.data.data[0]["Month/Day"] == "0") {
                    this.setState({ date: [new Date(), new Date()] });
                    this.setState({ dateValue: `${dateFormat(new Date(), "isoDate")},${dateFormat(new Date(), "isoDate")}` })
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in claim type API " })
        })
    }

    //onChange method of month and year
    onMonthChange(month, year) {
        this.setState({ dateErr: "" })
        this.setState({ dateValue: `${month},${year}` })
    }

    //To change the range of the date
    onDateChange(date) {
        this.setState({ dateErr: "" })
        let dateFormat = require('dateformat');
        this.setState({ date: date });
        this.setState({ dateValue: `${dateFormat(date[0], "isoDate")},${dateFormat(date[1], "isoDate")}` })
    }

    render() {
        const header = [
            { prop: 'reportNo', title: 'Report No.', filterable: true },
            { prop: 'fromDate', title: 'Date (From)', filterable: true },
            { prop: 'toDate', title: 'Date (To)', filterable: true },
            { prop: 'submitted', title: 'Submitted on', filterable: true },
            { prop: 'approved', title: 'Approved on', filterable: true },
            { prop: 'confirmed', title: 'Confirmed on', filterable: true }
        ];
        var body = []
        this.state.expenseClaimList.map((list) => {
            body.push({
                reportNo: list.REPORTNO,
                fromDate: list["DateFrom"],
                toDate: list["DateTo"],
                submitted: list.Submit_Flag == 0 ? "---" : list["SubmittedOn"],
                approved: list.ApprovedOn == "" ? "---" : list["ApprovedOn"],
                confirmed: list.ConfirmedON == "" ? "---" : list["ConfirmedON"]
            })
        })

        body.map((res) => {
            if (res.reportNo != "") {
                res.reportNo =
                    <div>
                        <Link to={"/expenseclaimentry/" + "00/" + "savedentry/" + res.reportNo}>
                            {res.reportNo}
                        </Link>
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
                <Card className="new-entry-card">
                    <div className="claim-list-dropdown">
                        <SearchDropdown
                            labelName="Claim Type"
                            placeholder="Search or Select Claim Type"
                            Selected={this.state.claimTypeValue}
                            dropdownList={this.state.claimTypeList}
                            important={true}
                            errorMessage={this.state.claimTypeErr}
                            getValue={this.getClaimTypeValue}
                        />
                    </div>
                    <div className="claim-list-dropdown">
                        {this.state.dayType == "0" ?
                            <SfaDateRangePicker
                                labelName="Date"
                                onChange={this.onDateChange}
                                dateRange={this.state.date}
                                important={true}
                                errorMessage={this.state.dateErr}
                            />
                            : this.state.dayType == "1" ?
                                <MonthPicker
                                    labelName="Date"
                                    important={true}
                                    onMonthChange={this.onMonthChange}
                                    maxDate={new Date()}
                                    errorMessage={this.state.dateErr}
                                /> :
                                <SfaDateRangePicker
                                    labelName="Date"
                                    onChange={this.onDateChange}
                                    dateRange={this.state.date}
                                    important={true}
                                    errorMessage={this.state.dateErr}
                                />
                        }
                    </div>
                    <div
                        className={this.state.dateErr != "" || this.state.claimTypeErr != "" ? "claimlist-button claimlist_btn" : "claimlist-button"}>
                        <Button className="claimlist-btn" onClick={this.onNewEntry}>
                            <div className="btn-text">New Entry</div>
                        </Button>
                    </div>
                </Card>
                <div className="claimlist-datatable-container">
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
                        heading="My Expense Claim List"
                        isFull={this.state.isFull}
                        handleView={this.handleView}
                    />
                </div>
            </React.Fragment>
        )
    }
}

// const mapStateToProps = state => ({})

// const mapDispatchToProps = dispatch => ({
//     setEntryType: data => dispatch(getEntryType(data))
// })

export default withRouter(MyExpenseClaimList);