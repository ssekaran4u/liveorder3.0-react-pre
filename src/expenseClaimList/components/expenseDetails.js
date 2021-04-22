import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ExpenseDetailsTableBody from "./expenseDetailsTableBody";
import ApprovalTableBody from "./approvalTableBody";
import ConfirmationTableBody from "./confirmationTableBody";

class ExpenseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
        }
        this.handleView = this.handleView.bind(this)
        this.onHandleChange = this.onHandleChange.bind(this)
        this.getApproval = this.getApproval.bind(this)
    }

    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }

    //validation for manager approval.
    getApproval(status) {
        let details = this.props.expenseDetails;
        if (details != undefined) {
            if (details.length) {
                let approvalDays = parseInt(this.props.approvalDays);
                let date = details[details.length - 1].dtt;
                let parts = date.split("-")
                let d = new Date();
                let dt = String(d.getDate()).padStart(2, '0');
                let n = d.getFullYear();
                let m = d.getMonth() + 1;
                if (approvalDays >= 0) {
                    if (parts[2] == n) {
                        if (parts[1] == m) {
                            let apDay = parseInt(approvalDays) + 1;
                            let apMonth = parseInt(parts[1]) + 1;
                            if (status == "date") {
                                return <div className="date-approval-error">
                                    Note :&nbsp; Approval is possible from &nbsp;
                                    <span>{(apDay < 10 ? "0" + apDay : apDay) + "-" + (apMonth < 10 ? "0" + apMonth : apMonth) + "-" + parts[2]}</span>
                                </div>
                            }
                            else {
                                return true;
                            }
                        }
                        else if (parts[1] + 1 == m) {
                            if (approvalDays >= dt) {
                                if (status == "date") {
                                    return <div className="date-approval-error">
                                        Note :&nbsp; Approval is possible from &nbsp;
                                        <span>{(apDay < 10 ? "0" + apDay : apDay) + "-" + (apMonth < 10 ? "0" + apMonth : apMonth) + "-" + parts[2]}</span>
                                    </div>
                                }
                                else {
                                    return true;
                                }
                            }
                        }
                        else {
                            if (status == "date") {
                                return "";
                            }
                            else {
                                return false;
                            }
                        }
                    }
                    else {
                        if (status == "date") {
                            return "";
                        }
                        else {
                            return false;
                        }
                    }
                }
                else {
                    if (status == "date") {
                        return "";
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                if (status == "date") {
                    return "";
                }
                else {
                    return false;
                }
            }
        }
        else {
            if (status == "date") {
                return "";
            }
            else {
                return false;
            }
        }
    }

    //on change method for editable fields.
    onHandleChange(value, category, id) {
        this.props.onExpenseChange(value, category, id)
    }

    render() {
        let constHeader = this.props.constHeader;
        let alterHeader = this.props.alterHeader;
        let appStatus = "1";
        if(alterHeader.length){
            if(alterHeader.some(res=>!res.headerName.includes("App'l")) || alterHeader.some(res=>!res.headerName.includes("App'd"))){
                appStatus = "0";
            }
        }
        else{
            appStatus = this.props.apprStatus;
        }
        let entryType = this.props.entryType;
        let details = this.props.expenseDetails;
        let docCount = 0;
        let cheCount = 0;
        let stkCount = 0;
        let stp = 0;
        let distance = 0;
        let Total = [];
        let expenseTotal = this.props.expenseTotal;
        let appExpenseTotal = this.props.appExpenseTotal;
        let conExpenseTotal = this.props.conExpenseTotal;
        alterHeader.map((res) => {
            if (res.headerName.includes("Remark") || res.headerName.includes("Note")) {
                Total.push({ total: "remark", name: res.headerName })
            }
            else {
                let index = 0;
                for (let i = 0; i < details.length; i++) {
                    index += parseFloat(details[i][res.headerName])
                }
                Total.push({ total: index, name: res.headerName })
            }
        })
        if (constHeader.some(res => res.headerName == "doccnt") == true) {
            for (let i = 0; i < details.length; i++) {
                docCount += parseInt(details[i].doccnt)
            }
        }
        if (constHeader.some(res => res.headerName == "stkcnt") == true) {
            for (let i = 0; i < details.length; i++) {
                stkCount += parseInt(details[i].stkcnt)
            }
        }
        if (constHeader.some(res => res.headerName == "chemcnt") == true) {
            for (let i = 0; i < details.length; i++) {
                cheCount += parseInt(details[i].chemcnt)
            }
        }
        if (constHeader.some(res => res.headerName == "STP KM") == true) {
            for (let i = 0; i < details.length; i++) {
                stp += parseFloat(details[i]["STP KM"])
            }
        }
        if (constHeader.some(res => res.headerName == "distance") == true) {
            for (let i = 0; i < details.length; i++) {
                if (details[i].distance != undefined) {
                    distance += parseInt(details[i].distance)
                }
            }
        }
        return (
            <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
                {entryType.length ? entryType[0].type == "approval" ?
                    <React.Fragment>{this.getApproval("date")}</React.Fragment>
                    : null : null}
                <Card className="expense-details-datatable">
                    <div className="main-heading">
                        <div className="claim-heading">
                            <div className="heading-1">
                                Expense claim&nbsp;
                                {entryType != undefined ? entryType.length ? entryType[0].type == "approval" ? "approval"
                                    : entryType[0].type == "confirmation" ? "confirmation" : entryType[0].type == "reconfirmation" ?
                                        "reconfirmation" : "entry" : "entry" : "entry"}
                                &nbsp;for the month of&nbsp;
                                {this.props.month != undefined ? this.props.month : ""},&nbsp;
                                {this.props.year != undefined ? this.props.year : ""}&nbsp;
                                {entryType[0] != undefined ? entryType[0].reportNo != "" ? "-  No. " + entryType[0].reportNo : "" : ""}
                            </div>
                            <div className="heading-2">
                                <div className="sunday-container">
                                    <div className="image"></div>
                                    <div>Sunday</div>
                                </div>
                                <div className="leave-container">
                                    <div className="image"></div>
                                    <div>Leave</div>
                                </div>
                                <div className="holiday-container">
                                    <div className="image"></div>
                                    <div>Holiday</div>
                                </div>
                            </div>
                        </div>
                        <div className="full-screen-image">
                            {this.state.isFull ? (
                                <img src="../../../public/assets/images/collapse-grey.svg" alt="img" onClick={this.handleView} />) : (
                                    <img src="../../../public/assets/images/fullscreen.svg" alt="img" onClick={this.handleView} />)}
                        </div>
                    </div>
                    <div className="showEntries">
                        {details != undefined ? (details.length || this.props.fromDate != "") ?
                            <div className="entries-text">
                                Showing entries from&nbsp;
                            <span>{details != undefined ? details.length ? details[0].dtt : this.props.fromDate : null}</span>&nbsp;to&nbsp;
                            <span>{details != undefined ? details.length ? details[details.length - 1].dtt : this.props.toDate : null}</span>.
                        </div>
                            : null : null}
                        <div className="button-options">
                            {entryType[0] != undefined ? entryType[0].approved == "notApproved" ?
                                <div className="claim-details-button">
                                    <Button className="save-button" onClick={this.props.onExpenseSave}>
                                        <div className="save-btn">SAVE</div>
                                    </Button>
                                </div>
                                : null : null}
                            {entryType[0] != undefined ? entryType[0].approved == "notApproved" ?
                                <div className="claim-details-button">
                                    <Button className="submit-button" onClick={this.props.onSubmit}>
                                        <div className="submit-btn">SUBMIT</div>
                                    </Button>
                                </div>
                                : null : null}
                            {entryType[0] != undefined ? entryType[0].type == "approval" && entryType[0].approval != "approved" ?
                                <div className="claim-details-button">
                                    <Button disabled={this.getApproval("disable")} onClick={this.props.onApprove} className="submit-button">
                                        <div className="submit-btn">APPROVE</div>
                                    </Button>
                                </div>
                                : null : null}
                            {entryType[0] != undefined ? entryType[0].type == "confirmation" && entryType[0].confirmation != "confirmed" ?
                                <div className="claim-details-button">
                                    <Button className="save-button" onClick={this.props.onAdminSave}>
                                        <div className="save-btn">SAVE</div>
                                    </Button>
                                </div>
                                : null : null}
                            {entryType[0] != undefined ? (entryType[0].type == "confirmation" || entryType[0].type == "reconfirmation") && entryType[0].confirmation != "confirmed" ?
                                <div className="claim-details-button">
                                    <Button onClick={this.props.onAdminConfirm} className="submit-button">
                                        <div className="submit-btn">
                                            {entryType[0].type == "confirmation" ? "Confirm" : "Reconfirm"}
                                        </div>
                                    </Button>
                                </div>
                                : null : null}
                            {this.props.printSubmit != undefined ? this.props.printSubmit == 0 ?
                                entryType[0] != undefined ? entryType[0].approved == "approved" ?
                                    <div className="claim-details-button">
                                        <Button className="claim-export-button">
                                            <img src="../../../public/assets/images/export.svg" alt="export" />
                                            <div className="claim-export-btn">Export</div>
                                        </Button>
                                    </div>
                                    : null : null :
                                entryType[0] != undefined ? entryType[0].submitted == "submitted" ?
                                    <div className="claim-details-button">
                                        <Button className="claim-export-button">
                                            <img src="../../../public/assets/images/export.svg" alt="export" />
                                            <div className="claim-export-btn">Export</div>
                                        </Button>
                                    </div>
                                    : null : null : null}
                            {this.props.printSubmit != undefined ? this.props.printSubmit == 0 ?
                                entryType[0] != undefined ? entryType[0].approved == "approved" ?
                                    <div className="claim-details-button">
                                        {/* <Link to="/expensedetails"> */}
                                        <Button className="print-button">
                                            <img src="../../../public/assets/images/print.svg" alt="print" />
                                            <div className="print-btn">Print</div>
                                        </Button>
                                        {/* </Link> */}
                                    </div>
                                    : null : null :
                                entryType[0] != undefined ? entryType[0].submitted == "submitted" ?
                                    <div className="claim-details-button">
                                        {/* <Link to="/expensedetails"> */}
                                        <Button className="print-button">
                                            <img src="../../../public/assets/images/print.svg" alt="print" />
                                            <div className="print-btn">Print</div>
                                        </Button>
                                        {/* </Link> */}
                                    </div>
                                    : null : null : null}
                        </div>
                    </div>
                    <div className="expense-claim-detail-datatable">
                        {details.length ?
                            <table>
                                <thead>
                                    <tr>
                                        {constHeader.some(res => res.headerName == "dtt") == true ?
                                            <th className="extra-padding date">
                                                <div className="header-container">
                                                    Date
                                            </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "doccnt") == true ?
                                            <th className="doc">
                                                <div className="header-container">
                                                    Doc
                                            </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "stkcnt") == true ?
                                            <th className="stk">
                                                <div className="header-container">
                                                    Stk
                                            </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "chemcnt") == true ?
                                            <th className="che">
                                                <div className="header-container">
                                                    Che
                                            </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "AreaVisited") == true ?
                                            <th className="area-visited">
                                                <div className="header-container">
                                                    Area Visited
                                            </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "stayedat") == true ?
                                            <th className="stayed-at">
                                                <div className="header-container">
                                                    Stayed At
                                            </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "VisitType") == true ?
                                            <th className="visit-type">
                                                <div className={entryType[0] != undefined ? entryType[0].approved == "approved" ? "header-container" : "header-container center" : "header-container"}>
                                                    Visit Type
                                            </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "STP KM") == true ?
                                            <th className="distance">
                                                <div className="header-container">
                                                    STP (Kms)
                                            </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "distance") == true ?
                                            <th className="distance">
                                                <div className="header-container">
                                                    Distance (Kms)
                                            </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "ModeOfTravel") == true ?
                                            <th className="distance">
                                                <div className="header-container">
                                                    Mode Of Travel
                                            </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "workedWith") == true ?
                                            <th className="worked-with">
                                                <div className="header-container">
                                                    Worked&nbsp;with
                                            </div>
                                            </th>
                                            : null}
                                        {alterHeader.map((res) =>
                                            (res.headerName.includes("Remark") || res.headerName.includes("Note")) ?
                                                <th className="remarks" key={res.slno}>
                                                    <div className="header-container">
                                                        {res.headerName}
                                                    </div>
                                                </th> :
                                                <th className="ta" key={res.slno}>
                                                    <div className="header-container">
                                                        {res.headerName}
                                                    </div>
                                                </th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {entryType.length ?
                                        (entryType[0].type != "confirmation") ? (entryType[0].type != "reconfirmation")
                                            ? entryType[0].type != "approval" ?
                                                <ExpenseDetailsTableBody
                                                    constHeader={constHeader}
                                                    alterHeader={alterHeader}
                                                    expenseDetails={details}
                                                    entryType={entryType}
                                                    onHandleChange={this.onHandleChange}
                                                    mainFlag={this.props.mainFlag}
                                                    detailedFlag={this.props.detailedFlag}
                                                    visitTypes={this.props.visitTypes}
                                                    apprStatus={this.props.apprStatus}
                                                />
                                                :
                                                <ApprovalTableBody
                                                    constHeader={constHeader}
                                                    alterHeader={alterHeader}
                                                    expenseDetails={details}
                                                    entryType={entryType}
                                                    onHandleChange={this.onHandleChange}
                                                    approvedFlags={this.props.approvedFlags}
                                                    apprStatus={this.props.apprStatus}
                                                />
                                            :
                                            <ConfirmationTableBody
                                                constHeader={constHeader}
                                                alterHeader={alterHeader}
                                                expenseDetails={details}
                                                entryType={entryType}
                                                onHandleChange={this.onHandleChange}
                                                confirmationFlags={this.props.confirmationFlags}
                                                apprStatus={this.props.apprStatus}
                                            />
                                            :
                                            <ConfirmationTableBody
                                                constHeader={constHeader}
                                                alterHeader={alterHeader}
                                                expenseDetails={details}
                                                entryType={entryType}
                                                onHandleChange={this.onHandleChange}
                                                confirmationFlags={this.props.confirmationFlags}
                                                apprStatus={this.props.apprStatus}
                                            />
                                        : null}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        {constHeader.some(res => res.headerName == "dtt") == true ?
                                            <th className="extra-padding">
                                                <div className="header-container">Total</div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "doccnt") == true ?
                                            <th className="total">
                                                <div className="header-container">{docCount}</div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "stkcnt") == true ?
                                            <th className="total">
                                                <div className="header-container">{stkCount}</div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "chemcnt") == true ?
                                            <th className="total">
                                                <div className="header-container">{cheCount}</div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "AreaVisited") == true ?
                                            <th></th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "stayedat") == true ?
                                            <th></th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "VisitType") == true ?
                                            <th></th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "STP KM") == true ?
                                            <th className="total">
                                                <div className="header-container"></div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "distance") == true ?
                                            <th className="total">
                                                <div className="header-container">
                                                </div>
                                            </th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "ModeOfTravel") == true ?
                                            <th></th>
                                            : null}
                                        {constHeader.some(res => res.headerName == "workedWith") == true ?
                                            <th></th>
                                            : null}
                                        {Total.map((res) =>
                                            res.total == "remark" ? <th></th> :
                                                <th className="total" key={res.name}>
                                                    <div className="header-container">{"\u20B9"}{(parseFloat(res.total)).toFixed(2)}</div>
                                                </th>)}
                                    </tr>
                                </tfoot>
                            </table>
                            : <div className="no-setup">No setup </div>}
                    </div>
                </Card>
                {details.length ?
                    <div className="total-expense">
                        <div className="total-expense-content">Expense Total&nbsp;= &nbsp;<span>{"\u20B9"}{expenseTotal}</span></div>
                        {appStatus!="0" ? entryType[0] != undefined ? entryType[0].approved == "approved" ?
                            <div className="total-expense-content">Approved Expense Total&nbsp;= &nbsp;<span>{"\u20B9"}{appExpenseTotal}</span></div>
                            : null : null : null}
                        {entryType[0] != undefined ? entryType[0].confirmed == "confirmed" ?
                            <div className="total-expense-content">
                                {entryType.length ? entryType[0].type == "reconfirmation" ?
                                    "Reconfirmed Expense Total" : "Confirmed Expense Total" : "Confirmed Expense Total"}
                                &nbsp;= &nbsp;<span>{"\u20B9"}{conExpenseTotal}</span></div>
                            : null : null}
                    </div>
                    : null}
            </div>
        )
    }
}

export default ExpenseDetails;