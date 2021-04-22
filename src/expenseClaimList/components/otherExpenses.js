import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputField from "./inputField";
import TextArea from "./textArea";
import { postToServer } from '../.././lib/comm-utils';
import { URL_EXPENSE_CLAIM } from "../.././lib/constants";

class OtherExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otherExpenses: [],
            reimbursement: [],
            setup: [],
            otherExpenseChange: [],
            reimbursementChange: [],
            otherExpenseTotal: 0,
            approvedOtherExpenseTotal: 0,
            confirmedOtherExpenseTotal: 0,
            reimbursementTotal: 0,
            approvedReimbursementTotal: 0,
            confirmedReimbursementTotal: 0,
            expenseGrandTotal: 0,
            appExpenseGrandTotal: 0,
            conExpenseGrandTotal: 0,
            additionalExpenseTotal: 0,
            supmerDetails: [],
            actualExpenseTotal: 0,
            advanceTotal: 0,
            recoveryTotal: 0,
        }
        // this.onOtherExpenseSave = this.onOtherExpenseSave.bind(this)
        // this.reimbursementSave = this.reimbursementSave.bind(this)
        this.getOtherExpenseTotal = this.getOtherExpenseTotal.bind(this)
        this.getReimbursementTotal = this.getReimbursementTotal.bind(this)
        this.getAdditionalExpenseTotal = this.getAdditionalExpenseTotal.bind(this)
        this.getSupMerDetailsTotal = this.getSupMerDetailsTotal.bind(this)
    }

    //To get the total of other expense.
    getOtherExpenseTotal() {
        let otherExpenseTotal = 0;
        let approvedOtherExpenseTotal = 0;
        let confirmedOtherExpenseTotal = 0;
        if (this.props.entryType.length) {
            if (this.props.otherExpenses.length) {
                if (this.props.entryType[0].approved == "approved" && this.props.entryType[0].confirmed != "confirmed") {
                    for (let i = 0; i < this.props.otherExpenses.length; i++) {
                        otherExpenseTotal += parseFloat(this.props.otherExpenses[i].amount)
                        approvedOtherExpenseTotal += parseFloat(this.props.otherExpenses[i]["App'd Amount"])
                    }
                }
                else if (this.props.entryType[0].confirmed == "confirmed") {
                    for (let i = 0; i < this.props.otherExpenses.length; i++) {
                        otherExpenseTotal += parseFloat(this.props.otherExpenses[i].amount)
                        approvedOtherExpenseTotal += parseFloat(this.props.otherExpenses[i]["App'd Amount"])
                        confirmedOtherExpenseTotal += parseFloat(this.props.otherExpenses[i]["Conf'd Amount"])
                    }
                }
                else {
                    for (let i = 0; i < this.props.otherExpenses.length; i++) {
                        otherExpenseTotal += parseFloat(this.props.otherExpenses[i].amount)
                    }
                }
            }
        }
        this.setState({
            otherExpenseTotal: otherExpenseTotal,
            approvedOtherExpenseTotal: approvedOtherExpenseTotal,
            confirmedOtherExpenseTotal: confirmedOtherExpenseTotal
        })
    }

    //To get the total of reimbursement.
    getReimbursementTotal() {
        let reimbursementTotal = 0;
        let approvedReimbursementTotal = 0;
        let confirmedReimbursementTotal = 0;
        if (this.props.entryType.length) {
            if (this.props.reimbursement.length) {
                if (this.props.entryType[0].approved == "approved" && this.props.entryType[0].confirmed != "confirmed") {
                    for (let i = 0; i < this.props.reimbursement.length; i++) {
                        approvedReimbursementTotal += parseFloat(this.props.reimbursement[i]["App'd Amount"])
                        reimbursementTotal += parseFloat(this.props.reimbursement[i]["Amount"])
                    }
                }
                else if (this.props.entryType[0].confirmed == "confirmed") {
                    for (let i = 0; i < this.props.reimbursement.length; i++) {
                        approvedReimbursementTotal += parseFloat(this.props.reimbursement[i]["App'd Amount"])
                        reimbursementTotal += parseFloat(this.props.reimbursement[i]["Amount"])
                        confirmedReimbursementTotal += parseFloat(this.props.reimbursement[i]["Conf'd Amount"])
                    }
                }
                else {
                    for (let i = 0; i < this.props.reimbursement.length; i++) {
                        reimbursementTotal += parseFloat(this.props.reimbursement[i]["Amount"])
                    }
                }
            }
        }
        this.setState({
            reimbursementTotal: reimbursementTotal,
            approvedReimbursementTotal: approvedReimbursementTotal,
            confirmedReimbursementTotal: confirmedReimbursementTotal
        })
    }

    //To get the total of additional Expense.
    getAdditionalExpenseTotal() {
        let additionalExpenseTotal = 0;
        if (this.props.entryType.length) {
            if (this.props.additionalExpense.length) {
                for (let i = 0; i < this.props.additionalExpense.length; i++) {
                    additionalExpenseTotal += parseFloat(this.props.additionalExpense[i]["N_CONFIRMED_AMT"])
                }
            }
        }
        this.setState({ additionalExpenseTotal: additionalExpenseTotal })
    }

    //To get the total of supmer details.
    getSupMerDetailsTotal() {
        let actualExpenseTotal = 0;
        let advanceTotal = 0;
        let recoveryTotal = 0;
        if (this.props.supmerDetails.length) {
            for (let i = 0; i < this.props.supmerDetails.length; i++) {
                actualExpenseTotal +=
                    this.props.supmerDetails[i]["ACTUAL_EXPENSEAMOUNT"] == "" ?
                        0 : parseFloat(this.props.supmerDetails[i]["ACTUAL_EXPENSEAMOUNT"])
                advanceTotal +=
                    this.props.supmerDetails[i]["ADVANCE_RECEIVED"] == "" ?
                        0 : parseFloat(this.props.supmerDetails[i]["ADVANCE_RECEIVED"])
                recoveryTotal +=
                    this.props.supmerDetails[i]["ADD_RECOVERY"] == "" ?
                        0 : parseFloat(this.props.supmerDetails[i]["ADD_RECOVERY"])
            }
        }
        this.setState({
            actualExpenseTotal: actualExpenseTotal,
            advanceTotal: advanceTotal,
            recoveryTotal: recoveryTotal
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.otherExpenses != this.props.otherExpenses ||
            prevProps.otherExpenseStatus != this.props.otherExpenseStatus ||
            prevProps.entryType != this.props.entryType ||
            prevProps.otherExpenses.length != this.props.otherExpenses.length) {
            this.getOtherExpenseTotal()
        }
        if (prevProps.reimbursement != this.props.reimbursement ||
            prevProps.reimbursementStatus != this.props.reimbursementStatus ||
            prevProps.entryType != this.props.entryType ||
            prevProps.reimbursement.length != this.props.reimbursement.length) {
            this.getReimbursementTotal()
        }
        if (prevProps.additionalExpense.length != this.props.additionalExpense.length ||
            prevProps.additionalExpenseStatus != this.props.additionalExpenseStatus) {
            this.getAdditionalExpenseTotal()
        }
        if (prevProps.supmerDetails.length != this.props.supmerDetails.length ||
            prevProps.supmerDetailsStatus != this.props.supmerDetailsStatus) {
            this.getSupMerDetailsTotal()
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //To get the other expense details.
        if (nextProps.otherExpenses.length) {
            this.setState({ otherExpenses: nextProps.otherExpenses })
        }
        //To get the reimbursement details.
        if (nextProps.reimbursement) {
            this.setState({ reimbursement: nextProps.reimbursement })
        }
        //To get the sup mer details.
        if (nextProps.supmerDetails) {
            this.setState({ supmerDetails: nextProps.supmerDetails })
        }
    }

    //click on other expense save button.
    // onOtherExpenseSave() {
    //     let reportNo = this.props.entryType[0].reportNo;
    //     let data = ""
    //     if (this.props.otherExpenseChange.length) {
    //         this.props.otherExpenseChange.map(res => {
    //             data += `${res.code}~${parseFloat(res.amount)}~${res.note}#`
    //         })
    //         var otherExpenseSave = {
    //             "Index": "OtherExpenseSave",
    //             "Data": { "srno": reportNo, "data": data }
    //         }
    //         postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
    //             if (Result.data.Status == 'Success') {
    //                 this.props.onOtherExpenseSave()
    //                 this.props.onShowSuccess()
    //                 this.props.getOtherExpense(reportNo)
    //             }
    //         }).catch((Error) => {
    //             this.setState({ Error: true, Errormsg: "Error in Expense" })
    //         })
    //     }
    // }

    //click on reimbursement save.
    // reimbursementSave() {
    //     let reportNo = this.props.entryType[0].reportNo;
    //     let data = ""
    //     if (this.props.reimbursementChange.length) {
    //         this.props.reimbursementChange.map(res => {
    //             let index = res.newId == "newly added" ? 0 : res.rowid;
    //             data += `${index}~${res.amount}~${res.description}#`
    //         })
    //         var ReimbursementSave = {
    //             "Index": "ReimbursementSave",
    //             "Data": { "srno": reportNo, "data": data }
    //         }
    //         postToServer(URL_EXPENSE_CLAIM, ReimbursementSave).then((Result) => {
    //             if (Result.data.Status == 'Success') {
    //                 this.props.onReimbursementSave()
    //                 this.props.onShowSuccess()
    //                 this.props.getReimbursement(reportNo)
    //             }
    //         }).catch((Error) => {
    //             this.setState({ Error: true, Errormsg: "Error in Expense" })
    //         })
    //     }
    // }

    render() {
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
        console.log(appStatus,"kumar")
        let entryType = this.props.entryType;
        let otherExpenses = this.state.otherExpenses;
        let reimbursement = this.state.reimbursement;
        let expenseTotal = this.props.expenseTotal;
        let appExpenseTotal = this.props.appExpenseTotal;
        let conExpenseTotal = this.props.conExpenseTotal;
        let otherExpenseTotal = this.state.otherExpenseTotal;
        let approvedOtherExpenseTotal = this.state.approvedOtherExpenseTotal;
        let confirmedOtherExpenseTotal = this.state.confirmedOtherExpenseTotal;
        let reimbursementTotal = this.state.reimbursementTotal;
        let approvedReimbursementTotal = this.state.approvedReimbursementTotal;
        let confirmedReimbursementTotal = this.state.confirmedReimbursementTotal;
        let expenseGrandTotal = parseFloat(
            this.props.expenseTotal + this.state.otherExpenseTotal + this.state.reimbursementTotal
        )
        let appExpenseGrandTotal = parseFloat(
            this.props.appExpenseTotal + this.state.approvedOtherExpenseTotal + this.state.approvedReimbursementTotal
        )
        let conExpenseGrandTotal = parseFloat(
            this.props.conExpenseTotal + this.state.confirmedOtherExpenseTotal + this.state.confirmedReimbursementTotal
            + this.state.additionalExpenseTotal
        )
        sessionStorage.setItem("exp_Total", expenseGrandTotal)
        sessionStorage.setItem("app_Exp_Total", appExpenseGrandTotal)
        sessionStorage.setItem("Con_Exp_Total", conExpenseGrandTotal)
        return (
            <React.Fragment>
                <div className="other-expenses">
                    {otherExpenses.length > 0 ?
                        <Card className="other-expenses-card">
                            <div className="other-expenses-heading">
                                <div className="main-text">Other Expenses</div>
                                {/* {entryType.length ? entryType[0].approved == "notApproved" ? entryType[0].type != "newentry" ?
                                    <div className="other-expenses-btn-grp">
                                        <div className="other-expense-btn">
                                            <Button className="save-button" onClick={this.onOtherExpenseSave}>
                                                <div className="save-btn-txt">SAVE</div>
                                            </Button>
                                        </div>
                                    </div>
                                    : null : null : null} */}
                            </div>
                            <div className="other-expense-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="category extra-padding">
                                                <div className="header-container">
                                                    Category
                                            </div>
                                            </th>
                                            <th className="amount">
                                                <div className="header-container">Upper Limit</div>
                                            </th>
                                            <th className="amount">
                                                <div className="header-container">Amount in {"\u20B9"}</div>
                                            </th>
                                            <th className={entryType.length ? entryType[0].approved == "approved" ? "remarks" : "app-remarks" : "remarks"}>
                                                <div className="header-container">Remarks</div>
                                            </th>
                                            {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                                                <th className="amount">
                                                    <div className="header-container">Approved<br />Amount</div>
                                                </th>
                                                : null : null : null}
                                            {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                                                <th className={entryType.length ? entryType[0].confirmed == "confirmed" ? "remarks" : "app-remarks" : "remarks"}>
                                                    <div className="header-container">App'l<br />Remarks</div>
                                                </th>
                                                : null : null : null}
                                            {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                                <th className="amount">
                                                    <div className="header-container">Confirmed<br />Amount</div>
                                                </th>
                                                : null : null}
                                            {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                                <th className="remarks">
                                                    <div className="header-container">Conf'n<br /> Remarks</div>
                                                </th>
                                                : null : null}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {otherExpenses.map(res =>
                                            res.editable != 0 ?
                                                <tr key={res.c_exp_code}>
                                                    <td className="extra-padding">
                                                        <div className="body-content">
                                                            {res.c_exp_heading.toLowerCase()}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="body-content">{res.upper_limit}</div>
                                                    </td>
                                                    <td>
                                                        {entryType.length ? entryType[0].approved == "approved" ?
                                                            <div className="body-content">
                                                                {res.amount}
                                                            </div> :
                                                            res.editable != 1 ?
                                                                <div className={res.upperLimit != "--" ? parseInt(res.amount) > parseInt(res.upperLimit) ? "error-input body-content" : "body-content" : "body-content"}>
                                                                    <InputField
                                                                        onChange={this.props.onOtherExpenseChange}
                                                                        id={res.c_exp_code}
                                                                        category="otherExpenseAmount"
                                                                        inputType="number"
                                                                        value={res.amount}
                                                                        step="0.01"
                                                                        textLength="11"
                                                                    />
                                                                </div> :
                                                                <div className="body-content">
                                                                    {res.amount}
                                                                </div>
                                                            : null}
                                                    </td>
                                                    <td>
                                                        {entryType.length ? entryType[0].approved == "approved" ?
                                                            <div className="body-content">
                                                                {res.Remark == "" || res.Remark == undefined ? "--" : res.Remark}
                                                            </div> :
                                                            <div className="body-content">
                                                                <TextArea
                                                                    value={res.Remark}
                                                                    onChange={this.props.onOtherExpenseChange}
                                                                    id={res.c_exp_code}
                                                                    category="othExpRemark"
                                                                    textLength="201"
                                                                />
                                                            </div>
                                                            : null}
                                                    </td>
                                                    {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                                                        <td>
                                                            {entryType.length ? entryType[0].approval == "approved" ?
                                                                <div className="body-content">
                                                                    {res["App'd Amount"]}
                                                                </div> :
                                                                this.props.editRequired == "1" ?
                                                                    <div className="body-content">
                                                                        <InputField
                                                                            value={res["App'd Amount"]}
                                                                            onChange={this.props.onOtherExpenseChange}
                                                                            id={res.c_exp_code}
                                                                            category="app'dAmt"
                                                                            inputType="number"
                                                                            step="0.01"
                                                                            className="error-input"
                                                                            textLength="11"
                                                                        />
                                                                    </div>
                                                                    : <div className="body-content">
                                                                        {res["App'd Amount"]}
                                                                    </div> : null}
                                                        </td>
                                                        : null : null : null}
                                                    {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                                                        <td>
                                                            {entryType.length ? entryType[0].approval == "approved" ?
                                                                <div className="body-content">
                                                                    {res["App'l Remark"] == "" ? "--" : res["App'l Remark"]}
                                                                </div> :
                                                                <div className="body-content">
                                                                    <TextArea
                                                                        value={res["App'l Remark"]}
                                                                        onChange={this.props.onOtherExpenseChange}
                                                                        id={res.c_exp_code}
                                                                        category="managerNote"
                                                                        textLength="201"
                                                                    />
                                                                </div>
                                                                : null}
                                                        </td>
                                                        : null : null : null}
                                                    {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                                        <td>
                                                            {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                                <div className="body-content">
                                                                    {res["Conf'd Amount"]}
                                                                </div> :
                                                                <div className="body-content">
                                                                    <InputField
                                                                        inputType="number"
                                                                        value={res["Conf'd Amount"]}
                                                                        id={res.c_exp_code}
                                                                        step="0.01"
                                                                        category="con'dAmt"
                                                                        onChange={this.props.onOtherExpenseChange}
                                                                        textLength="11"
                                                                    />
                                                                </div>
                                                                : null}
                                                        </td>
                                                        : null : null}
                                                    {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                                        <td>
                                                            {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                                <div className="body-content">
                                                                    {res["Conf'n Remark"] == "" ? "--" : res["Conf'n Remark"]}
                                                                </div> :
                                                                <div className="body-content">
                                                                    <TextArea
                                                                        value={res["Conf'n Remark"]}
                                                                        id={res.c_exp_code}
                                                                        category="adminNote"
                                                                        onChange={this.props.onOtherExpenseChange}
                                                                        textLength="201"
                                                                    />
                                                                </div>
                                                                : null}
                                                        </td>
                                                        : null : null}
                                                </tr> : null
                                        )}
                                    </tbody>
                                </table>
                                <div className="other-expense-total">
                                    <div className="other-expenses-total-text">
                                        Other Expenses Total&nbsp;=&nbsp;&nbsp;<span>{"\u20B9"}{(parseFloat(otherExpenseTotal)).toFixed(2)}</span>
                                    </div>
                                    {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                                        <div className="other-expenses-total-text">
                                            Approved Other Expenses Total&nbsp;=&nbsp;&nbsp;<span>{"\u20B9"}{(parseFloat(approvedOtherExpenseTotal)).toFixed(2)}</span>
                                        </div>
                                        : null : null : null}
                                    {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                        <div className="other-expenses-total-text">
                                            {entryType.length ? entryType[0].type == "reconfirmation" ?
                                                "Reconfirmed Other Expenses Total" : "Confirmed Other Expenses Total" : "Confirmed Other Expenses Total"}
                                            &nbsp;=&nbsp;&nbsp;<span>{"\u20B9"}{(parseFloat(confirmedOtherExpenseTotal)).toFixed(2)}</span>
                                        </div>
                                        : null : null}
                                </div>
                            </div>
                        </Card>
                        : null}
                    {/* Reimbursement */}
                    {reimbursement.length > 0 ?
                        <Card className="other-expenses-card">
                            <div className="other-expenses-heading">
                                <div className="main-text">Reimbursement</div>
                                {entryType.length ? entryType[0].approved == "notApproved" ?
                                    <div className="other-expenses-btn-grp">
                                        <div className="other-expense-btn">
                                            <Button className="add-button" onClick={this.props.addRow}>
                                                <img src="../../../public/assets/images/Path_2093.svg" alt="" />
                                                <div className="add-btn-txt">Add New Row</div>
                                            </Button>
                                        </div>
                                        {/* {entryType.length ? entryType[0].type != "newentry" ?
                                            <div className="other-expense-btn">
                                                <Button className="save-button">
                                                    <div className="save-btn-txt" onClick={this.reimbursementSave}>SAVE</div>
                                                </Button>
                                            </div>
                                            : null : null} */}
                                    </div>
                                    : null : null}
                            </div>
                            <div className="other-expense-table">
                                <table>
                                    <thead>
                                        <tr>
                                            {entryType.length ? entryType[0].approved == "notApproved" ?
                                                <th className="action extra-padding">
                                                    <div className="header-container">Action</div>
                                                </th>
                                                : null : null}
                                            <th className={entryType.length ? entryType[0].approved == "approved" ? "extra-padding description-head" : "description-head" : "description-head"}>
                                                <div className="header-container">Description</div>
                                            </th>
                                            <th className={entryType.length ? entryType[0].approved == "approved" ? "amount" : "reimbursement-amount" : "amount"}>
                                                <div className="header-container">Amount in {"\u20B9"}</div>
                                            </th>
                                            {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                                                <th className="amount">
                                                    <div className="header-container">Approved<br />Amount</div>
                                                </th>
                                                : null : null : null}
                                            {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                                                <th className={entryType.length ? entryType[0].confirmed == "notConfirmed" ? "app-remarks" : "remarks" : "remarks"}>
                                                    <div className="header-container">App'l<br />Remarks</div>
                                                </th>
                                                : null : null : null}
                                            {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                                <th className="amount">
                                                    <div className="header-container">Confirmed<br /> Amount</div>
                                                </th>
                                                : null : null}
                                            {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                                <th className="app-remarks">
                                                    <div className="header-container">Conf'n<br />Remarks</div>
                                                </th>
                                                : null : null}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reimbursement.map(result =>
                                            <tr key={result.n_rowid}>
                                                {entryType.length ? entryType[0].approved == "notApproved" ?
                                                    <td className="extra-padding">
                                                        <div className="image-container">
                                                            <img
                                                                onClick={() => this.props.onDelete(result.n_rowid, result.newId)}
                                                                src="../../../public/assets/images/deletetpd.svg" alt="d"
                                                            />
                                                        </div>
                                                    </td>
                                                    : null : null}
                                                <td className={entryType.length ? entryType[0].approved == "approved" ? "extra-padding" : null : null}>
                                                    {entryType.length ? entryType[0].approved == "approved" ?
                                                        <div className="body-content">
                                                            {result.Description}
                                                        </div> :
                                                        <div className="body-content">
                                                            <TextArea
                                                                onChange={this.props.onOtherExpenseChange}
                                                                id={result.n_rowid}
                                                                category="description"
                                                                value={result.Description}
                                                                textLength="201"
                                                            />
                                                        </div>
                                                        : null}
                                                </td>
                                                <td>
                                                    {entryType.length ? entryType[0].approved == "approved" ?
                                                        <div className="body-content">
                                                            {result.Amount}
                                                        </div> :
                                                        <div className="body-content">
                                                            <InputField
                                                                onChange={this.props.onOtherExpenseChange}
                                                                id={result.n_rowid}
                                                                category="reimbursementAmount"
                                                                inputType="number"
                                                                value={result.Amount == 0 ? "0.00" : result.Amount}
                                                                step="0.01"
                                                                textLength="11"
                                                            />
                                                        </div>
                                                        : null}
                                                </td>
                                                {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                                                    <td>
                                                        {entryType.length ? entryType[0].approval == "approved" ?
                                                            <div className="body-content">
                                                                {result["App'd Amount"]}
                                                            </div> :
                                                            this.props.editRequired == "1" ?
                                                                <div className="body-content">
                                                                    <InputField
                                                                        onChange={this.props.onOtherExpenseChange}
                                                                        id={result.n_rowid}
                                                                        category="app'dReimbursementAmount"
                                                                        inputType="number"
                                                                        value={result["App'd Amount"] == 0 ? "0.00" : result["App'd Amount"]}
                                                                        step="0.01"
                                                                        textLength="11"
                                                                    />
                                                                </div> :
                                                                <div className="body-content">
                                                                    {result["App'd Amount"]}
                                                                </div>
                                                            : null}
                                                    </td>
                                                    : null : null : null}
                                                {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                                                    <td>
                                                        {entryType.length ? entryType[0].approval == "approved" ?
                                                            <div className="body-content">
                                                                {result["App'l Remark"] == "" ? "--" : result["App'l Remark"]}
                                                            </div> :
                                                            <div className="body-content">
                                                                <TextArea
                                                                    value={result["App'l Remark"]}
                                                                    onChange={this.props.onOtherExpenseChange}
                                                                    id={result.n_rowid}
                                                                    category="managerDescription"
                                                                    textLength="201"
                                                                />
                                                            </div>
                                                            : null}
                                                    </td>
                                                    : null : null : null}
                                                {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                                    <td>
                                                        {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                            <div className="body-content">
                                                                {result["Conf'd Amount"]}
                                                            </div> :
                                                            <div className="body-content">
                                                                <InputField
                                                                    inputType="number"
                                                                    value={result["Conf'd Amount"]}
                                                                    step="0.01"
                                                                    onChange={this.props.onOtherExpenseChange}
                                                                    id={result.n_rowid}
                                                                    category="con'dReimbursementAmount"
                                                                    textLength="11"
                                                                />
                                                            </div>
                                                            : null}
                                                    </td>
                                                    : null : null}
                                                {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                                    <td>
                                                        {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                            <div className="body-content">
                                                                {result["Conf'n Remark"] == "" ? "--" : result["Conf'n Remark"]}
                                                            </div> :
                                                            <div className="body-content">
                                                                <TextArea
                                                                    value={result["Conf'n Remark"]}
                                                                    onChange={this.props.onOtherExpenseChange}
                                                                    id={result.n_rowid}
                                                                    category="adminDescription"
                                                                    textLength="201"
                                                                />
                                                            </div>
                                                            : null}
                                                    </td>
                                                    : null : null}
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="other-expense-total">
                                    <div className="other-expenses-total-text">
                                        Reimbursement Total&nbsp;  =&nbsp;&nbsp;<span>{"\u20B9"}{(parseFloat(reimbursementTotal)).toFixed(2)}</span>
                                    </div>
                                    {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                                        <div className="other-expenses-total-text">
                                            Approved Reimbursement Total&nbsp;  =&nbsp;&nbsp;<span>{"\u20B9"}{(parseFloat(approvedReimbursementTotal)).toFixed(2)}</span>
                                        </div>
                                        : null : null : null}
                                    {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                        <div className="other-expenses-total-text">
                                            {entryType.length ? entryType[0].type == "reconfirmation" ?
                                                "Reconfirmed Reimbursement Total" : "Confirmed Reimbursement Total" : "Confirmed Reimbursement Total"}
                                            &nbsp;  =&nbsp;&nbsp;<span>{"\u20B9"}{(parseFloat(confirmedReimbursementTotal)).toFixed(2)}</span>
                                        </div>
                                        : null : null}
                                </div>
                            </div>
                        </Card>
                        : null}
                    {/* additional Expense */}
                    {entryType.length ? entryType[0].confirmation != "confirmed" ? this.props.additionalExpense.length ?
                        <Card className="other-expenses-card">
                            <div className="other-expenses-heading">
                                <div className="main-text">Additional Expenses</div>
                            </div>
                            <div className="other-expense-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="category extra-padding">
                                                <div className="header-container">
                                                    Category
                                                </div>
                                            </th>
                                            <th className="amount">
                                                <div className="header-container">Upper Limit</div>
                                            </th>
                                            <th className="amount">
                                                <div className="header-container">Amount</div>
                                            </th>
                                            <th className="remarks">
                                                <div className="header-container">Remarks</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.additionalExpense.map(res =>
                                            <tr>
                                                <td className="extra-padding">
                                                    <div className="body-content">
                                                        {res.C_Name}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="body-content">{res.n_Upper_Amount}</div>
                                                </td>
                                                <td>
                                                    <div className="body-content">
                                                        <InputField
                                                            onChange={this.props.onOtherExpenseChange}
                                                            id={res.C_Code}
                                                            category="additionalExpenseAmount"
                                                            inputType="number"
                                                            value={res.N_CONFIRMED_AMT}
                                                            step="0.01"
                                                            textLength="11"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="body-content">
                                                        <TextArea
                                                            value={res.note}
                                                            onChange={this.props.onOtherExpenseChange}
                                                            id={res.C_Code}
                                                            category="additionalExpenseRemark"
                                                            textLength="201"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="other-expense-total">
                                    <div className="other-expenses-total-text">
                                        Additional Expenses Total&nbsp;=&nbsp;&nbsp;<span>{"\u20B9"}{(parseFloat(this.state.additionalExpenseTotal)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        : null : null : null}
                    {/* sup mer details */}
                    {this.props.supmerDetails.length ?
                        <Card className="other-expenses-card">
                            <div className="other-expenses-heading">
                                <div className="main-text">Supp Mer Details Sent</div>
                                {entryType.length ? entryType[0].confirmation != "confirmed" ?
                                <div className="other-expenses-btn-grp">
                                    <div className="other-expense-btn">
                                        <Button className="add-button" onClick={this.props.addDetailRow}>
                                            <img src="../../../public/assets/images/Path_2093.svg" alt="" />
                                            <div className="add-btn-txt">Add New Row</div>
                                        </Button>
                                    </div>
                                </div>
                                : null : null}
                            </div>
                            <div className="other-expense-table">
                                <table>
                                    <thead>
                                        <tr>
                                            {entryType.length ? entryType[0].confirmation != "confirmed" ?
                                                <th className="action extra-padding">
                                                    <div className="header-container">Action</div>
                                                </th>
                                                : null : null}
                                            <th className={entryType.length ? entryType[0].confirmation == "confirmed" ? "extra-padding amount" : "amount" : "amount"}>
                                                <div className="header-container">PRP/RPS No</div>
                                            </th>
                                            <th className="amount">
                                                <div className="header-container">Name Of The Event</div>
                                            </th>
                                            <th className="amount">
                                                <div className="header-container">Actual Expense Amount</div>
                                            </th>
                                            <th className="amount">
                                                <div className="header-container">Advance Received</div>
                                            </th>
                                            <th className="amount">
                                                <div className="header-container">Add/Recovery</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.supmerDetails.map(result =>
                                            <tr key={result.id}>
                                                {entryType.length ? entryType[0].confirmation != "confirmed" ?
                                                    <td className="extra-padding">
                                                        <div className="image-container">
                                                            <img
                                                                onClick={() => this.props.onDetailDelete(result.id)}
                                                                src="../../../public/assets/images/deletetpd.svg" alt="d"
                                                            />
                                                        </div>
                                                    </td>
                                                    : null : null}
                                                <td className={entryType.length ? entryType[0].confirmation == "confirmed" ? "extra-padding" : null : null}>
                                                    {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                        <div className="body-content">
                                                            {result.PRP_RPSNO}
                                                        </div> :
                                                        <div className="body-content">
                                                            <InputField
                                                                onChange={this.props.onOtherExpenseChange}
                                                                id={result.id}
                                                                category="Prp_RpsNo"
                                                                inputType="number"
                                                                value={result.PRP_RPSNO}
                                                                step="0.01"
                                                                textLength="11"
                                                            />
                                                        </div>
                                                        : null}
                                                </td>
                                                <td>
                                                    {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                        <div className="body-content">
                                                            {result.NameOfTheEvent == "" ? "--" : result.NameOfTheEvent}
                                                        </div> :
                                                        <div className="body-content">
                                                            <InputField
                                                                onChange={this.props.onOtherExpenseChange}
                                                                id={result.id}
                                                                category="NameOfTheEvent"
                                                                inputType="text"
                                                                value={result.NameOfTheEvent}
                                                                textLength="201"
                                                            />
                                                        </div>
                                                        : null}
                                                </td>
                                                <td>
                                                    {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                        <div className="body-content">
                                                            {result["ACTUAL_EXPENSEAMOUNT"]}
                                                        </div> :
                                                        <div className="body-content">
                                                            <InputField
                                                                onChange={this.props.onOtherExpenseChange}
                                                                id={result.id}
                                                                category="actualExpenseAmount"
                                                                inputType="number"
                                                                value={result["ACTUAL_EXPENSEAMOUNT"]}
                                                                step="0.01"
                                                                textLength="11"
                                                            />
                                                        </div>
                                                        : null}
                                                </td>
                                                <td>
                                                    {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                        <div className="body-content">
                                                            {result["ADVANCE_RECEIVED"]}
                                                        </div> :
                                                        <div className="body-content">
                                                            <InputField
                                                                onChange={this.props.onOtherExpenseChange}
                                                                id={result.id}
                                                                category="advanceReceived"
                                                                inputType="number"
                                                                value={result["ADVANCE_RECEIVED"]}
                                                                step="0.01"
                                                                textLength="11"
                                                            />
                                                        </div>
                                                        : null}
                                                </td>
                                                <td>
                                                    {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                        <div className="body-content">
                                                            {result["ADD_RECOVERY"]}
                                                        </div> :
                                                        <div className="body-content">
                                                            <InputField
                                                                inputType="number"
                                                                value={result["ADD_RECOVERY"]}
                                                                step="0.01"
                                                                onChange={this.props.onOtherExpenseChange}
                                                                id={result.id}
                                                                category="addRecovery"
                                                                textLength="11"
                                                            />
                                                        </div>
                                                        : null}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="other-expense-total">
                                    <div className="other-expenses-total-text">
                                        Actual Expense Amount Total&nbsp;  =&nbsp;&nbsp;<span>{"\u20B9"}{(parseFloat(this.state.actualExpenseTotal)).toFixed(2)}</span>
                                    </div>
                                    {entryType.length ? entryType[0].approved == "approved" ?
                                        <div className="other-expenses-total-text">
                                            Advanced Received Total&nbsp;  =&nbsp;&nbsp;<span>{"\u20B9"}{(parseFloat(this.state.advanceTotal)).toFixed(2)}</span>
                                        </div>
                                        : null : null}
                                    {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                        <div className="other-expenses-total-text">
                                            Add/Recovery Total&nbsp;  =&nbsp;&nbsp;<span>{"\u20B9"}{(parseFloat(this.state.recoveryTotal)).toFixed(2)}</span>
                                        </div>
                                        : null : null}
                                </div>
                            </div>
                        </Card>
                        : null}
                    <div className="amount-summary-container">
                        <div className="amt-summary">
                            <div className="amt-summary-heading">Amount summary</div>
                            <Card className="amt-summary-card">
                                <div className="amt-summary-text">
                                    <div className="total-oth-exp-text">Expense Total</div>
                                    <div className="amt-sum-value">
                                        &nbsp;{"\u20B9"}&nbsp;{expenseTotal.toFixed(2)}
                                    </div>
                                </div>
                                {otherExpenses.length ?
                                    <div className="amt-summary-text">
                                        <div className="total-oth-exp-text">Other Expenses</div>
                                        <div className="amt-sum-value">
                                            (+)&nbsp;{"\u20B9"}&nbsp;{otherExpenseTotal.toFixed(2)}
                                        </div>
                                    </div>
                                    : null}
                                {reimbursement.length ?
                                    <div className="amt-summary-text">
                                        <div className="total-oth-exp-text">Reimbursement Amount</div>
                                        <div className="amt-sum-value">
                                            (+)&nbsp;{"\u20B9"}&nbsp;{reimbursementTotal.toFixed(2)}
                                        </div>
                                    </div>
                                    : null}
                                <div className="total-reimb-amt">
                                    <div className="total-reimb-amt-txt">Total Expense Amount</div>
                                    <div className="total-reimb-amt-value">
                                        {"\u20B9"}&nbsp;{expenseGrandTotal.toFixed(2)}
                                    </div>
                                </div>
                            </Card>
                        </div>
                        {appStatus!="0" ? entryType.length ? entryType[0].approved == "approved" ?
                            <div className="amt-summary">
                                <div className="amt-summary-heading">Approved Amount summary</div>
                                <Card className="amt-summary-card">
                                    <div className="amt-summary-text">
                                        <div className="total-oth-exp-text">Expense Total</div>
                                        <div className="amt-sum-value">
                                            &nbsp;{"\u20B9"}&nbsp;{appExpenseTotal.toFixed(2)}
                                        </div>
                                    </div>
                                    {otherExpenses.length ?
                                        <div className="amt-summary-text">
                                            <div className="total-oth-exp-text">Other Expenses</div>
                                            <div className="amt-sum-value">
                                                (+)&nbsp;{"\u20B9"}&nbsp;{approvedOtherExpenseTotal.toFixed(2)}
                                            </div>
                                        </div>
                                        : null}
                                    {reimbursement.length ?
                                        <div className="amt-summary-text">
                                            <div className="total-oth-exp-text">Reimbursement Amount</div>
                                            <div className="amt-sum-value">
                                                (+)&nbsp;{"\u20B9"}&nbsp;{approvedReimbursementTotal.toFixed(2)}
                                            </div>
                                        </div>
                                        : null}
                                    <div className="total-reimb-amt">
                                        <div className="total-reimb-amt-txt">Total Approved Expense Amount</div>
                                        <div className="total-reimb-amt-value">
                                            {"\u20B9"}&nbsp;{appExpenseGrandTotal.toFixed(2)}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            : null : null : null}
                        {entryType.length ? entryType[0].confirmed == "confirmed" ?
                            <div className="amt-summary">
                                <div className="amt-summary-heading">
                                    {entryType.length ? entryType[0].type == "reconfirmation" ?
                                        "Reconfirmed amount summary" : "Confirmed amount summary" : "Confirmed amount summary"}
                                </div>
                                <Card className="amt-summary-card">
                                    <div className="amt-summary-text">
                                        <div className="total-oth-exp-text">Expense Total</div>
                                        <div className="amt-sum-value">
                                            &nbsp;{"\u20B9"}&nbsp;{conExpenseTotal.toFixed(2)}
                                        </div>
                                    </div>
                                    {otherExpenses.length ?
                                        <div className="amt-summary-text">
                                            <div className="total-oth-exp-text">Other Expenses</div>
                                            <div className="amt-sum-value">
                                                (+)&nbsp;{"\u20B9"}&nbsp;{confirmedOtherExpenseTotal.toFixed(2)}
                                            </div>
                                        </div>
                                        : null}
                                    {reimbursement.length ?
                                        <div className="amt-summary-text">
                                            <div className="total-oth-exp-text">Reimbursement Amount</div>
                                            <div className="amt-sum-value">
                                                (+)&nbsp;{"\u20B9"}&nbsp;{confirmedReimbursementTotal.toFixed(2)}
                                            </div>
                                        </div>
                                        : null}
                                    {entryType.length ? entryType[0].confirmation != "confirmed" ? this.props.additionalExpense.length ?
                                        <div className="amt-summary-text">
                                            <div className="total-oth-exp-text">Additional Expense Amount</div>
                                            <div className="amt-sum-value">
                                                (+)&nbsp;{"\u20B9"}&nbsp;{this.state.additionalExpenseTotal.toFixed(2)}
                                            </div>
                                        </div>
                                        : null : null : null}
                                    <div className="total-reimb-amt">
                                        <div className="total-reimb-amt-txt">
                                            {entryType.length ? entryType[0].type == "reconfirmation" ?
                                                "Total Reconfirmed Expense Amount" : "Total Confirmed Expense Amount" : "Total Confirmed Expense Amount"}
                                        </div>
                                        <div className="total-reimb-amt-value">
                                            {"\u20B9"}&nbsp;{conExpenseGrandTotal.toFixed(2)}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            : null : null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default OtherExpenses;