import React, { Component } from "react";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import { Link } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import ExpenseDetails from "./expenseDetails";
import OtherExpenses from "./otherExpenses";
import "../../../public/assets/css/expenseClaimList.css";
import "../../../public/assets/css/expenseClaimTemplate.css";
import UploadBills from "./uploadBills";
import { URL_EXPENSE_CLAIM } from "../.././lib/constants";
import { postToServer, fileUpload } from "../.././lib/comm-utils";
import SfaModal from "../../BasicComponet/sfaModal";
import SfaSpinner from "../../BasicComponet/sfaSpinner";
import EmployeeDetails from "./employeeDetails";

class ECETemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flagDetails: [],
            constHeader: [],
            alterHeader: [],
            expenseDetails: [],
            entryType: [],
            otherExpenses: [],
            reimbursement: [],
            additionalExpense: [],
            supmerDetails: [],
            mainFlag: [],
            detailedFlag: [],
            otherExpenseChange: [],
            reimbursementChange: [],
            additionalExpenseChange: [],
            supmerDetailsChange: [],
            expenseTotal: 0,
            appExpenseTotal: 0,
            conExpenseTotal: 0,
            otherExpenseTotal: 0,
            approvedOtherExpenseTotal: 0,
            confirmedOtherExpenseTotal: 0,
            reimbursementTotal: 0,
            approvedReimbursementTotal: 0,
            confirmedReimbursementTotal: 0,
            expenseGrandTotal: 0,
            appExpenseGrandTotal: 0,
            conExpenseGrandTotal: 0,
            redirect: false,
            showSuccess: false,
            submitStatus: false,
            submitModal: "1",
            uploadedImages: [],
            uploadImage: [],
            visitTypes: [],
            approvedFlags: [],
            confirmationFlags: [],
            approvalSuccess: false,
            fsName: "",
            submitSuccess: false,
            year: "",
            month: "",
            empDet1: "",
            empDet2: "",
            empDet3: "",
            empDet4: "",
            note1: "",
            note2: "",
            note3: "",
            otherExpenseStatus: false,
            reimbursementStatus: false,
            confirmSaveStatus: "",
            additionalExpenseStatus: false,
            supmerDetailsStatus: false,
            fromDate: "",
            toDate: "",
            claimLimit: "",
            claimLimitCheck: false,
            printSubmit: "0",
            upperLimitCheck: false,
            upperLimitHead: [],
            activeTab: "details",
            editRequired: "1",
            confirmationSuccess: false,
            approvalDays: "",
            warningMsg: [],
            warMsgName: "",
            warMsgCheck: false,
            warnMsgCheck: false,
            spinner: false,
            apprStatus: "1"
        }
        this.getOtherExpense = this.getOtherExpense.bind(this)
        this.getReimbursement = this.getReimbursement.bind(this)
        this.onExpenseChange = this.onExpenseChange.bind(this)
        this.onOtherExpenseChange = this.onOtherExpenseChange.bind(this)
        this.onOtherExpenseSave = this.onOtherExpenseSave.bind(this)
        this.onReimbursementSave = this.onReimbursementSave.bind(this)
        this.onExpenseSave = this.onExpenseSave.bind(this)
        this.getExpenseTotal = this.getExpenseTotal.bind(this)
        this.getOtherExpenseTotal = this.getOtherExpenseTotal.bind(this)
        this.getReimbursementTotal = this.getReimbursementTotal.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.approvalSuccess = this.approvalSuccess.bind(this)
        this.approvalDone = this.approvalDone.bind(this)
        this.submitDone = this.submitDone.bind(this)
        this.submitSuccess = this.submitSuccess.bind(this)
        this.onShowSuccess = this.onShowSuccess.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.getImages = this.getImages.bind(this)
        this.onImages = this.onImages.bind(this)
        this.onUpload = this.onUpload.bind(this)
        this.getApprovalOtherExpense = this.getApprovalOtherExpense.bind(this)
        this.getApprovalReimbursement = this.getApprovalReimbursement.bind(this)
        this.onApprove = this.onApprove.bind(this)
        this.getApprove = this.getApprove.bind(this)
        this.onNoteChange = this.onNoteChange.bind(this)
        this.getAdditionalExpense = this.getAdditionalExpense.bind(this)
        this.addRow = this.addRow.bind(this)
        this.addDetailRow = this.addDetailRow.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onDetailDelete = this.onDetailDelete.bind(this)
        this.onAdminConfirm = this.onAdminConfirm.bind(this)
        this.onAdminSave = this.onAdminSave.bind(this)
        this.claimLimitCheck = this.claimLimitCheck.bind(this)
        this.onClaimOk = this.onClaimOk.bind(this)
        this.onLimitValidation = this.onLimitValidation.bind(this)
        this.onSubmitLimitValidation = this.onSubmitLimitValidation.bind(this)
        this.upperLimitCheck = this.upperLimitCheck.bind(this)
        this.onLimitOk = this.onLimitOk.bind(this)
        this.onTabChange = this.onTabChange.bind(this)
        this.onAdditionalExpenseSave = this.onAdditionalExpenseSave.bind(this)
        this.onSupMerSave = this.onSupMerSave.bind(this)
        this.confirmationSuccess = this.confirmationSuccess.bind(this)
        this.confirmDone = this.confirmDone.bind(this)
        this.getDetails = this.getDetails.bind(this)
        this.onWarMsgCheck = this.onWarMsgCheck.bind(this)
        this.onWarMsgCancel = this.onWarMsgCancel.bind(this)
        this.onWarMsgCon = this.onWarMsgCon.bind(this)
        this.onWarnMsgCheck = this.onWarnMsgCheck.bind(this)
        this.onWarnMsgCancel = this.onWarnMsgCancel.bind(this)
        this.onWarnMsgCon = this.onWarnMsgCon.bind(this)
        this.onApproveValidation = this.onApproveValidation.bind(this)
        this.onAdminConfirmValidation = this.onAdminConfirmValidation.bind(this)
    }

    onTabChange(name) {
        if (name != this.state.activeTab) {
            this.setState({ activeTab: name })
        }
    }

    //on Approved amount validation modal cancel buton.
    onWarMsgCancel() {
        this.setState({ warMsgCheck: false })
    }

    //on click outside the modal of approved amount validation.
    onWarMsgCheck() {
        this.setState({ warMsgCheck: true })
    }

    //on approved amount validation modal ok button.
    onWarMsgCon() {
        this.setState({ spinner: true })
        if (this.state.warningMsg.length > 1) {
            this.setState({
                warMsgName: this.state.warningMsg[1],
                warMsgCheck: false
            })
            setTimeout(function () {
                this.setState({ spinner: false })
                this.state.warningMsg.shift()
                this.setState({ warMsgCheck: true })
            }.bind(this), 100);
        }
        else {
            this.setState({ spinner: false, warMsgCheck: false })
            this.onApproveValidation()
        }
    }

    //on confirmed amount validation modal cancel buton.
    onWarnMsgCancel() {
        this.setState({ warnMsgCheck: false })
    }

    //on click outside the modal of confirmed amount validation.
    onWarnMsgCheck() {
        this.setState({ warnMsgCheck: true })
    }

    //on confirmed amount validation modal ok button.
    onWarnMsgCon() {
        if (this.state.warningMsg.length > 1) {
            this.setState({
                warMsgName: this.state.warningMsg[1],
                warnMsgCheck: false
            })
            setTimeout(function () {
                this.setState({ spinner: false })
                this.state.warningMsg.shift()
                this.setState({ warnMsgCheck: true })
            }.bind(this), 100);
        }
        else {
            this.setState({ spinner: false, warnMsgCheck: false })
            this.onAdminConfirmValidation()
        }
    }

    //onChange functionality of notes.
    onNoteChange(note, value, maxLength) {
        this.setState({ submitStatus: true })
        if (note == "note1") {
            if (value.length <= maxLength) {
                this.setState({ note1: value })
            }
        }
        else if (note == "note2") {
            if (value.length <= maxLength) {
                this.setState({ note2: value })
            }
        }
        else if (note == "note3") {
            if (value.length <= maxLength) {
                this.setState({ note3: value })
            }
        }
    }

    //To add row in supmer details.
    addDetailRow() {
        let list = this.state.supmerDetails;
        list.push({
            id: Math.random(),
            ACTUAL_EXPENSEAMOUNT: "",
            ADD_RECOVERY: "",
            ADVANCE_RECEIVED: "",
            NameOfTheEvent: "",
            PRP_RPSNO: ""
        })
        this.setState({ supmerDetails: list })
    }

    onDetailDelete(id) {
        this.setState({ submitStatus: true })
        let list = [{
            id: Math.random(),
            ACTUAL_EXPENSEAMOUNT: "",
            ADD_RECOVERY: "",
            ADVANCE_RECEIVED: "",
            NameOfTheEvent: "",
            PRP_RPSNO: ""
        }]
        let details = this.state.supmerDetails;
        if (details.length <= 1) {
            this.setState({ supmerDetails: list, supmerDetailsChange: [] })
        }
        else {
            let result = this.state.supmerDetails.filter(res => res.id != id);
            this.setState({ supmerDetails: result, supmerDetailsChange: result })
        }
        this.setState(prevState => ({ supmerDetailsStatus: !prevState.supmerDetailsStatus }))
    }

    //To get the uploaded images.
    getImages() {
        let upload = { "srno": this.props.match.params.id }
        postToServer("Expfiledownload", upload).then((Result) => {
            if (Result.data.length) {
                this.setState({ uploadedImages: Result.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Expense upload" })
        })
    }

    //To get the newly uploaded images.
    onImages(images) {
        let result = [];
        if (images.length) {
            images.map(res => {
                if (res.status != "added") {
                    result.push(res)
                }
            })
        }
        this.setState({ uploadImage: result })
    }

    //Image uploading api integration.
    onUpload(id, status) {
        this.setState({ spinner: true })
        if (status == "upload") {
            this.setState({ submitModal: "3" })
        }
        if (this.state.uploadImage.length) {
            let token = localStorage.getItem("SFA_TOKEN")
            const data = new FormData();
            this.state.uploadImage.map(res => {
                data.append("file", res.name)
            })
            data.append("Token", token);
            data.append("Index", "FileUpload");
            data.append("srno", id.toString());
            data.append("subject", "");
            fileUpload("ExpUploadFiles", data).then((Result) => {
                if (Result.data.Status == "Success") {
                    this.setState({ uploadImage: [] })
                    if (status == "save") {
                        this.setState({ spinner: false, showSuccess: true })
                        setTimeout(function () {
                            this.setState({ showSuccess: false, submitStatus: false });
                            this.props.history.replace("/expenseclaimentry/" + "00" + "/" + "savedentry/" + id)
                            this.getDetails()
                        }.bind(this), 2000);
                    }
                    if (status == "submit") {
                        let expenseSubmit = {
                            "Index": "expense_submit",
                            "Data": { "srno": id }
                        }
                        postToServer(URL_EXPENSE_CLAIM, expenseSubmit).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.setState({ spinner: false, submitSuccess: true })
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in submit Expense" })
                        })

                    }
                    if (status == "upload") {
                        this.setState({ showSuccess: true })
                        setTimeout(function () {
                            this.setState({ showSuccess: false });
                        }.bind(this), 2000);
                    }
                }
            })
                .catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense upload" })
                })
        }
    }

    componentDidMount() {
        this.getDetails()
    }

    //To get the details of the entry.
    getDetails() {
        this.setState({ spinner: true })
        //To get the claim month and year.
        if (this.props.match.params.id.includes("-")) {
            let months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"]
            let dateDetails = this.props.match.params.id.split(',');
            let frDate = dateDetails[0].split("-").reverse().join("-");
            let toDate = dateDetails[1].split("-").reverse().join("-");
            let date = dateDetails[0];
            let dates = date.split('-');
            this.setState({
                year: dates[0],
                month: months[parseInt(dates[1])],
                fromDate: frDate,
                toDate: toDate
            })
        }
        else {
            let dates = this.props.match.params.id.split(',');
            let months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"]
            this.setState({ year: dates[1], month: months[parseInt(dates[0]) - 1] })
        }
        //To get the values of visit types.
        let vt = {
            "Index": "VisitType"
        }
        postToServer(URL_EXPENSE_CLAIM, vt).then((Result) => {
            if (Result.data.length) {
                this.setState({ visitTypes: Result.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Expense" })
        })
        //To get the details for particular entry type.
        if (this.props.match.params.entryType != "") {
            //To get the details for saved entry.
            if (this.props.match.params.entryType == "savedentry") {
                this.setState({ submitStatus: true })
                //To get the selected expense Claim data.
                let list = [];
                let data = {
                    "Index": "MyExpenseClaimList",
                }
                postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        Result.data.data.map(res => {
                            if (this.props.match.params.id == res.REPORTNO) {
                                if (res.ApprovedOn == "") {
                                    //To get the details of reimbursement for not approved entry.
                                    let reimbursement = {
                                        "Index": "ReimbursementView",
                                        "Data": { "srno": this.props.match.params.id },
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, reimbursement).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            if (!Result.data.data.length) {
                                                this.setState({
                                                    reimbursement: [
                                                        {
                                                            "Amount": 0,
                                                            "Description": "",
                                                            "n_rowid": "1",
                                                            "newId": "newly added"
                                                        }
                                                    ]
                                                })
                                            }
                                            else {
                                                this.getReimbursement(this.props.match.params.id)
                                            }
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in Expense" })
                                    })
                                }
                                else {
                                    //To get the details of reimbursement for particular entry.
                                    this.getReimbursement(this.props.match.params.id)
                                }
                                list.push({
                                    type: this.props.match.params.entryType,
                                    profile: localStorage.getItem("type") == 1 ? "mr" :
                                        localStorage.getItem("type") == 2 ? "manager" : localStorage.getItem("type") == 3 ? "admin" : null,
                                    reportNo: res.REPORTNO,
                                    submitted: res.Submit_Flag == 0 ? "notSubmitted" : "submitted",
                                    approved: res.Approved_Flag == 0 ? "notApproved" : "approved",
                                    confirmed: res.Confirmed_Flag == 0 ? "notConfirmed" : "confirmed",
                                    approval: res.Approved_Flag == 0 ? "notApproved" : "approved",
                                    confirmation: res.Confirmed_Flag == 0 ? "notConfirmed" : "confirmed"
                                })
                                this.setState({ entryType: list })
                            }
                        })
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })

                //To get the header for particular entry.
                let expenseHeader = {
                    "Index": "ExpenseHeader",
                    "Data": { "srno": this.props.match.params.id },
                }
                postToServer(URL_EXPENSE_CLAIM, expenseHeader).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        let constHeader = [];
                        let alterHeader = [];
                        let data = Result.data.data;
                        for (let i = 0; i < data.length; i++) {
                            if (
                                data[i]["Hcolumn"] == "dtt" ||
                                data[i]["Hcolumn"] == "doccnt" ||
                                data[i]["Hcolumn"] == "stkcnt" ||
                                data[i]["Hcolumn"] == "chemcnt" ||
                                data[i]["Hcolumn"] == "AreaVisited" ||
                                data[i]["Hcolumn"] == "stayedat" ||
                                data[i]["Hcolumn"] == "VisitType" ||
                                data[i]["Hcolumn"] == "STP KM" ||
                                data[i]["Hcolumn"] == "distance" ||
                                data[i]["Hcolumn"] == "ModeOfTravel" ||
                                data[i]["Hcolumn"] == "workedWith" ||
                                data[i]["Hcolumn"] == "worktype" ||
                                data[i]["Hcolumn"] == "visitType_code" ||
                                data[i]["Hcolumn"] == "Holiday" ||
                                data[i]["Hcolumn"] == "Leave" ||
                                data[i]["Hcolumn"] == "Sunday"
                            ) {
                                constHeader.push({ slno: data[i]["slno"], headerName: data[i]["Hcolumn"] })
                            }
                            else {
                                alterHeader.push({ slno: data[i]["slno"], headerName: data[i]["Hcolumn"] })
                            }
                        }
                        this.setState({ constHeader: constHeader })
                        this.setState({ alterHeader: alterHeader })
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })

                //To get the details for particular entry and to get validation for details of the body.
                let expenseDetail = {
                    "Index": "ExpenseDetail",
                    "Data": { "srno": this.props.match.params.id },
                }
                postToServer(URL_EXPENSE_CLAIM, expenseDetail).then((Result) => {
                    // console.log(Result,"kumar")
                    let detailedFlag = [];
                    if (Result.data.Status == 'Success') {
                        this.setState({
                            spinner: false,
                            apprStatus: Result.data.Heirachysetup[0].n_approval_required,
                            expenseDetails: Result.data.data,
                            mainFlag: Result.data.c_Mainflag,
                            empDet1: Result.data.employee[0].FsName,
                            empDet2: Result.data.employee[0].ReportingTo,
                            empDet3: Result.data.employee[0].HeadQuarter,
                            empDet4: Result.data.employee[0].Expdate,
                            note1: Result.data.employee[0].ClaimNote,
                            note2: Result.data.employee[0].ApprovalNote,
                            note3: Result.data.employee[0].ConfirmNote,
                            claimLimit: Result.data.Heirachysetup[0].N_CLAIM_LIMIT,
                            printSubmit: Result.data.Heirachysetup[0].PrintButtonOnSubmit,
                        })
                        Result.data.c_OtherFlag.map(res => {
                            if (res.checked == "True") {
                                if (res.flag == 0) {
                                    detailedFlag.push({
                                        "limitCheck": res.LimitCheck,
                                        "editable": res.Visible_Status,
                                        "name": res.expname,
                                        "upperLimit": res.LimitCheck == "0" ? "--" : res.upperlimit
                                    })
                                }
                            }
                        })
                    }
                    this.setState({ detailedFlag: detailedFlag })
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })

                //To get the details of other expense for particular entry.
                this.getOtherExpense(this.props.match.params.id)
                //To get sup mer details.
                this.getSupMerDetails(this.props.match.params.id)
                this.getImages()
            }

            //To get the details for new entry.
            else if (this.props.match.params.entryType == "newentry") {
                this.setState({ submitStatus: true })
                sessionStorage.setItem("approvalTab", "myexpense")
                //To get the flag details for new Entry.
                // let MonthlyFixedExpense = "";
                let constHeader = [];
                let alterHeader = [];
                let list = [];
                let flagData = {
                    "Index": "FlagDetails",
                    "Data": { "claim_code": this.props.match.params.code },
                }
                postToServer(URL_EXPENSE_CLAIM, flagData).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        // MonthlyFixedExpense = Result.data.data[0]["MonthlyFixedExpense"]
                        this.setState({ mainFlag: Result.data.data })
                        //To get the reimbursement details for new entry.
                        if (Result.data.data[0]["Reimbursement"] == 1) {
                            this.setState({
                                reimbursement: [
                                    {
                                        "Amount": 0,
                                        "Description": "",
                                        "n_rowid": "1",
                                        "newId": "newly added"
                                    }
                                ]
                            })
                        }
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in reimbursement Expense" })
                })
                if (this.props.match.params.id.includes("-")) {
                    let dates = this.props.match.params.id.split(',');
                    var newentry = {
                        "Index": "NewEntry",
                        "Data": {
                            "claim_code": this.props.match.params.code,
                            "month": "", "year": "",
                            "fromdate": dates[0],
                            "todate": dates[1]
                        }
                    }
                    var otherExpNew = {
                        "Index": "OtherExpenseList",
                        "Data": {
                            "srno": "",
                            "claim_code": this.props.match.params.code,
                            "month": "", "year": "",
                            "fromdate": dates[0],
                            "todate": dates[1]
                        }
                    }
                }
                else {
                    let dates = this.props.match.params.id.split(',');
                    var newentry = {
                        "Index": "NewEntry",
                        "Data": {
                            "claim_code": this.props.match.params.code,
                            "month": dates[0], "year": dates[1],
                            "fromdate": "",
                            "todate": ""
                        }
                    }
                    var otherExpNew = {
                        "Index": "OtherExpenseList",
                        "Data": {
                            "srno": "",
                            "claim_code": this.props.match.params.code,
                            "month": dates[0], "year": dates[1],
                            "fromdate": "",
                            "todate": ""
                        }
                    }
                }
                //To get the other expense for new entry.
                postToServer(URL_EXPENSE_CLAIM, otherExpNew).then((Result) => {
                    let otherExpense = [];
                    let otherExpenseChange = [];
                    if (Result.data.Status == 'Success') {
                        let otherExpenseNew = Result.data.data
                        let otherFlag = {
                            "Index": "OtherFlag",
                            "Data": { "claim_code": this.props.match.params.code },
                        }
                        postToServer(URL_EXPENSE_CLAIM, otherFlag).then((res) => {
                            if (res.data.Status == 'Success') {
                                otherExpenseNew.map(list => {
                                    res.data.data.map(li => {
                                        if (list.c_exp_code == li.c_code) {
                                            otherExpense.push({
                                                Remark: list.Remark,
                                                amount: list.amount,
                                                c_exp_code: list.c_exp_code,
                                                c_exp_heading: list.c_exp_heading,
                                                upper_limit: list.n_upper_limit,
                                                upperLimit: li.Visible_Status != 1 ? li.LimitCheck == "0" ? "--" : list.n_upper_limit : "--",
                                                srno: "",
                                                editable: li.Visible_Status,
                                            })
                                            otherExpenseChange.push({
                                                srno: "",
                                                code: list.c_exp_code,
                                                amount: list.amount,
                                                note: list.Remark
                                            })
                                        }
                                    })
                                })
                            }
                            this.setState({ otherExpenses: otherExpense, otherExpenseChange: otherExpenseChange })
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in other Expense" })
                        })
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in other Expense" })
                })
                //To get the details of expense for new entry.
                postToServer(URL_EXPENSE_CLAIM, newentry).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        this.setState({
                            spinner: false,
                            expenseDetails: Result.data.data,
                            empDet1: Result.data.Employee[0].FsName,
                            empDet2: Result.data.Employee[0].ReportingTo,
                            empDet3: Result.data.Employee[0].HeadQuarter,
                            empDet4: Result.data.Employee[0].Expdate,
                            note1: Result.data.Employee[0].Note,
                            claimLimit: Result.data.Heirachysetup[0].N_CLAIM_LIMIT,
                            printSubmit: Result.data.Heirachysetup[0].PrintButtonOnSubmit
                        })
                        let data = Result.data.header;
                        for (let i = 0; i < data.length; i++) {
                            if (
                                data[i]["Hcolumn"] == "dtt" ||
                                data[i]["Hcolumn"] == "doccnt" ||
                                data[i]["Hcolumn"] == "stkcnt" ||
                                data[i]["Hcolumn"] == "chemcnt" ||
                                data[i]["Hcolumn"] == "AreaVisited" ||
                                data[i]["Hcolumn"] == "stayedat" ||
                                data[i]["Hcolumn"] == "VisitType" ||
                                data[i]["Hcolumn"] == "STP KM" ||
                                data[i]["Hcolumn"] == "distance" ||
                                data[i]["Hcolumn"] == "ModeOfTravel" ||
                                data[i]["Hcolumn"] == "workedWith" ||
                                data[i]["Hcolumn"] == "worktype" ||
                                data[i]["Hcolumn"] == "visitType_code" ||
                                data[i]["Hcolumn"] == "Holiday" ||
                                data[i]["Hcolumn"] == "Leave" ||
                                data[i]["Hcolumn"] == "Sunday"
                            ) {
                                constHeader.push({ slno: data[i]["slno"], headerName: data[i]["Hcolumn"] })
                            }
                            else {
                                alterHeader.push({ slno: data[i]["slno"], headerName: data[i]["Hcolumn"] })
                            }
                        }
                        this.setState({ constHeader: constHeader, alterHeader: alterHeader })
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })
                list.push({
                    type: this.props.match.params.entryType,
                    profile: localStorage.getItem("type") == 1 ? "mr" :
                        localStorage.getItem("type") == 2 ? "manager" : localStorage.getItem("type") == 3 ? "admin" : null,
                    reportNo: "",
                    submitted: "notSubmitted",
                    approved: "notApproved",
                    confirmed: "notConfirmed",
                    approval: "notApproved",
                    confirmation: "notConfirmed"
                })
                this.setState({ entryType: list })

                //To get the editable fields of expense detail page for new entry.
                let otherFlag = {
                    "Index": "OtherFlag",
                    "Data": { "claim_code": this.props.match.params.code },
                }
                postToServer(URL_EXPENSE_CLAIM, otherFlag).then((Result) => {
                    let detailedFlag = [];
                    if (Result.data.Status == 'Success') {
                        Result.data.data.map(res => {
                            if (res.checked == "True") {
                                if (res.flag == 0) {
                                    detailedFlag.push({
                                        "limitCheck": res.LimitCheck,
                                        "editable": res.Visible_Status,
                                        "name": res.expname,
                                        "upperLimit": res.LimitCheck == "0" ? "--" : res.upperlimit
                                    })
                                }
                            }
                        })
                    }
                    this.setState({
                        detailedFlag: detailedFlag
                    })
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })
            }
            // To get the details for manager approval.
            else if (this.props.match.params.entryType == "approval") {
                let list = [];
                let data = {
                    "Index": "exp_approvel_list",
                }
                postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        Result.data.data.map(res => {
                            if (this.props.match.params.id == res.srno) {
                                list.push({
                                    type: this.props.match.params.entryType,
                                    profile: localStorage.getItem("type") == 1 ? "mr" :
                                        localStorage.getItem("type") == 2 ? "manager" : localStorage.getItem("type") == 3 ? "admin" : null,
                                    reportNo: res.srno,
                                    submitted: "submitted",
                                    approved: "approved",
                                    approval: res.Approved == 0 ? "notApproved" : "approved",
                                    confirmed: res.Conformed == 0 ? "notConfirmed" : "confirmed",
                                    confirmation: res.Conformed == 0 ? "notConfirmed" : "confirmed",
                                })
                                this.setState({ entryType: list })
                            }
                        })
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })
                //To get the table body and header for particular entry.
                let expenseHeader = {
                    "Index": "exp_approvel_details",
                    "Data": { "srno": this.props.match.params.id },
                }
                postToServer(URL_EXPENSE_CLAIM, expenseHeader).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        let constHeader = [];
                        let alterHeader = [];
                        let data = Result.data.Header;
                        for (let i = 0; i < data.length; i++) {
                            if (
                                data[i]["Hcolumn"] == "dtt" ||
                                data[i]["Hcolumn"] == "doccnt" ||
                                data[i]["Hcolumn"] == "stkcnt" ||
                                data[i]["Hcolumn"] == "chemcnt" ||
                                data[i]["Hcolumn"] == "AreaVisited" ||
                                data[i]["Hcolumn"] == "stayedat" ||
                                data[i]["Hcolumn"] == "VisitType" ||
                                data[i]["Hcolumn"] == "STP KM" ||
                                data[i]["Hcolumn"] == "distance" ||
                                data[i]["Hcolumn"] == "ModeOfTravel" ||
                                data[i]["Hcolumn"] == "workedWith" ||
                                data[i]["Hcolumn"] == "worktype" ||
                                data[i]["Hcolumn"] == "visitType_code" ||
                                data[i]["Hcolumn"] == "Holiday" ||
                                data[i]["Hcolumn"] == "Leave" ||
                                data[i]["Hcolumn"] == "Sunday"
                            ) {
                                constHeader.push({ slno: data[i]["slno"], headerName: data[i]["Hcolumn"] })
                            }
                            else {
                                alterHeader.push({ slno: data[i]["slno"], headerName: data[i]["Hcolumn"] })
                            }
                        }
                        this.setState({
                            spinner: false,
                            constHeader: constHeader,
                            alterHeader: alterHeader,
                            expenseDetails: Result.data.data,
                            approvedFlags: Result.data.ColumnEdit,
                            empDet1: Result.data.Employee[0].FsName,
                            empDet2: Result.data.Employee[0].EmployeeCode,
                            empDet3: Result.data.Employee[0].HeadQuarter,
                            empDet4: Result.data.Employee[0].Expdate,
                            note1: Result.data.Employee[0].ClaimNote,
                            note2: Result.data.Employee[0].ApprovalNote,
                            note3: Result.data.Employee[0].ConfirmNote,
                            approvalDays: Result.data.controlpanel[0].n_DaysExtendedForExpApproval
                        })
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })
                //To get other expense for manager approval.
                this.getApprovalOtherExpense(this.props.match.params.id)
                //To get reimbursement for manager approval.
                this.getApprovalReimbursement(this.props.match.params.id)
                //To get sup mer details.
                this.getSupMerDetails(this.props.match.params.id)
                //To get uploaded images.
                this.getImages()
            }
            // To get the details for admin confirmation.
            else if (this.props.match.params.entryType == "confirmation" || this.props.match.params.entryType == "reconfirmation") {
                this.setState({ submitStatus: true })
                //To get the table body and header for particular entry.
                let expenseHeader = {
                    "Index": "exp_confirm_details",
                    "Data": { "srno": this.props.match.params.id },
                }
                postToServer(URL_EXPENSE_CLAIM, expenseHeader).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        let list = [];
                        let constHeader = [];
                        let alterHeader = [];
                        list.push({
                            type: this.props.match.params.entryType,
                            profile: localStorage.getItem("type") == 1 ? "mr" :
                                localStorage.getItem("type") == 2 ? "manager" : localStorage.getItem("type") == 3 ? "admin" : null,
                            reportNo: this.props.match.params.id,
                            submitted: "submitted",
                            approved: "approved",
                            approval: "approved",
                            confirmed: "confirmed",
                            confirmation:
                                this.props.match.params.entryType == "reconfirmation" ?
                                    Result.data.AllowReconfirmation[0].AllowReconfirmation != "1" ? "confirmed" : "notConfirmed" :
                                    Result.data.Employee[0].confirmed == 1 ? "confirmed" : "notConfirmed",
                        })
                        let data = Result.data.Header;
                        for (let i = 0; i < data.length; i++) {
                            if (
                                data[i]["Hcolumn"] == "dtt" ||
                                data[i]["Hcolumn"] == "doccnt" ||
                                data[i]["Hcolumn"] == "stkcnt" ||
                                data[i]["Hcolumn"] == "chemcnt" ||
                                data[i]["Hcolumn"] == "AreaVisited" ||
                                data[i]["Hcolumn"] == "stayedat" ||
                                data[i]["Hcolumn"] == "VisitType" ||
                                data[i]["Hcolumn"] == "STP KM" ||
                                data[i]["Hcolumn"] == "distance" ||
                                data[i]["Hcolumn"] == "ModeOfTravel" ||
                                data[i]["Hcolumn"] == "workedWith" ||
                                data[i]["Hcolumn"] == "worktype" ||
                                data[i]["Hcolumn"] == "visitType_code" ||
                                data[i]["Hcolumn"] == "Holiday" ||
                                data[i]["Hcolumn"] == "Leave" ||
                                data[i]["Hcolumn"] == "Sunday"
                            ) {
                                constHeader.push({ slno: data[i]["slno"], headerName: data[i]["Hcolumn"] })
                            }
                            else {
                                alterHeader.push({ slno: data[i]["slno"], headerName: data[i]["Hcolumn"] })
                            }
                        }
                        this.setState({
                            apprStatus: Result.data.Heirachysetup[0].n_approval_required,
                            spinner: false,
                            entryType: list,
                            constHeader: constHeader,
                            alterHeader: alterHeader,
                            expenseDetails: Result.data.data,
                            confirmationFlags: Result.data.ColumnEdit,
                            empDet1: Result.data.Employee[0].FsName,
                            empDet2: Result.data.Employee[0].EmployeeCode,
                            empDet3: Result.data.Employee[0].HeadQuarter,
                            empDet4: Result.data.Employee[0].Expdate,
                            note1: Result.data.Employee[0].ClaimNote,
                            note2: Result.data.Employee[0].ApprovalNote,
                            note3: Result.data.Employee[0].ConfirmNote,
                            confirmSaveStatus: Result.data.SaveStatus[0].confirm_submit
                        })
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })
                //To get other expense for admin confirmation.
                this.getConfirmationOtherExpense(this.props.match.params.id)
                //To get reimbursement for admin confirmation.
                this.getConfirmationReimbursement(this.props.match.params.id)
                //To get additional expense.
                this.getAdditionalExpense(this.props.match.params.id)
                //To get sup mer details.
                this.getSupMerDetails(this.props.match.params.id)
                //To get uploaded images.
                this.getImages()
            }
        }
    }

    //To get the details of sup mer.
    getSupMerDetails(id) {
        let supMerDetails = {
            "Index": "SuppMerDetailsview",
            "Data": { "srno": id }
        }
        postToServer(URL_EXPENSE_CLAIM, supMerDetails).then((Result) => {
            if (Result.data.Status == 'Success') {
                if (Result.data.SupMerflag[0].SupMerDetails == "1") {
                    if (this.props.match.params.entryType == "confirmation") {
                        if (Result.data.SupMerflag[0].N_CONFIRMED == "0") {
                            if (Result.data.data.length) {
                                let list = [];
                                Result.data.data.map(res => {
                                    list.push({
                                        id: Math.random(),
                                        ACTUAL_EXPENSEAMOUNT: res.ACTUAL_EXPENSEAMOUNT,
                                        ADD_RECOVERY: res.ADD_RECOVERY,
                                        ADVANCE_RECEIVED: res.ADVANCE_RECEIVED,
                                        NameOfTheEvent: res.NameOfTheEvent,
                                        PRP_RPSNO: res.PRP_RPSNO
                                    })
                                })
                                this.setState({ supmerDetails: list })
                            }
                            else {
                                let list = [];
                                list.push({
                                    id: Math.random(),
                                    ACTUAL_EXPENSEAMOUNT: "",
                                    ADD_RECOVERY: "",
                                    ADVANCE_RECEIVED: "",
                                    NameOfTheEvent: "",
                                    PRP_RPSNO: ""
                                })
                                this.setState({ supmerDetails: list })
                            }
                        }
                        else {
                            if (Result.data.data.length) {
                                let list = [];
                                Result.data.data.map(res => {
                                    list.push({
                                        id: Math.random(),
                                        ACTUAL_EXPENSEAMOUNT: res.ACTUAL_EXPENSEAMOUNT,
                                        ADD_RECOVERY: res.ADD_RECOVERY,
                                        ADVANCE_RECEIVED: res.ADVANCE_RECEIVED,
                                        NameOfTheEvent: res.NameOfTheEvent,
                                        PRP_RPSNO: res.PRP_RPSNO
                                    })
                                })
                                this.setState({ supmerDetails: list })
                            }
                        }
                    }
                    else if (this.props.match.params.entryType == "reconfirmation") {
                        if (Result.data.data.length) {
                            let list = [];
                            Result.data.data.map(res => {
                                list.push({
                                    id: Math.random(),
                                    ACTUAL_EXPENSEAMOUNT: res.ACTUAL_EXPENSEAMOUNT,
                                    ADD_RECOVERY: res.ADD_RECOVERY,
                                    ADVANCE_RECEIVED: res.ADVANCE_RECEIVED,
                                    NameOfTheEvent: res.NameOfTheEvent,
                                    PRP_RPSNO: res.PRP_RPSNO
                                })
                            })
                            this.setState({ supmerDetails: list })
                        }
                        else {
                            let list = [];
                            list.push({
                                id: Math.random(),
                                ACTUAL_EXPENSEAMOUNT: "",
                                ADD_RECOVERY: "",
                                ADVANCE_RECEIVED: "",
                                NameOfTheEvent: "",
                                PRP_RPSNO: ""
                            })
                            this.setState({ supmerDetails: list })
                        }
                    }
                    else {
                        if (Result.data.data.length) {
                            let list = [];
                            Result.data.data.map(res => {
                                list.push({
                                    id: Math.random(),
                                    ACTUAL_EXPENSEAMOUNT: res.ACTUAL_EXPENSEAMOUNT,
                                    ADD_RECOVERY: res.ADD_RECOVERY,
                                    ADVANCE_RECEIVED: res.ADVANCE_RECEIVED,
                                    NameOfTheEvent: res.NameOfTheEvent,
                                    PRP_RPSNO: res.PRP_RPSNO
                                })
                            })
                            this.setState({ supmerDetails: list })
                        }
                    }
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in sup mer details" })
        })
    }

    //on click of approve button in manager approval.
    onApprove() {
        this.setState({ spinner: true })
        let flags = this.state.approvedFlags.filter(res => res.Hcolumn != "App'l Note")
        let dets = this.state.expenseDetails;
        let sortedFlags = [];
        flags.map(li => {
            sortedFlags.push({ name: li.Hcolumn.replace("App'd ", "") })
        })
        let war = [];
        sortedFlags.map(list => {
            let res = ""
            dets.map(li => {
                if (parseFloat(li["App'd " + list.name]) > parseFloat(li[list.name])) {
                    res += li.dtt.substring(0, 2) + ","
                }
            })
            if (res != "") {
                war.push(list.name + " amount is more than the claimed amount on " + res + " Do you want to continue ?")
            }
        })
        this.setState({ warningMsg: war })
        if (war.length) {
            this.setState({
                spinner: false,
                warMsgName: war[0],
                warMsgCheck: true,
            })
        }
        else {
            this.onApproveValidation()
        }
    }

    //on success of approved amount validation.
    onApproveValidation() {
        this.setState({ spinner: true })
        sessionStorage.setItem("approvalTab", "downline")
        let appro = {
            "Index": "exp_approvel_list",
        }
        postToServer(URL_EXPENSE_CLAIM, appro).then((Result) => {
            if (Result.data.Status == 'Success') {
                for (let i = 0; i < Result.data.data.length; i++) {
                    if (Result.data.data[i].srno == this.props.match.params.id) {
                        let newName = Result.data.data[i].Employee.toLowerCase()
                        let sortedName = newName.split('[')
                        this.setState({ fsName: sortedName[0] })
                        break;
                    }
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Expense" })
        })
        if (this.state.otherExpenseChange.length || this.state.reimbursementChange.length) {
            if (this.state.otherExpenseChange.length && this.state.reimbursementChange.length) {
                let otherExpenseData = "";
                let reimbursementData = "";
                this.state.otherExpenseChange.map(res => {
                    otherExpenseData += `${res.code}~${res.appAmt}~${res.appNote}#`
                })
                let otherExpenseSave = {
                    "Index": "OtherExpenseApproveSave",
                    "Data": { "srno": this.props.match.params.id, "data": otherExpenseData }
                }
                postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        this.onOtherExpenseSave()
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                })
                this.state.reimbursementChange.map(res => {
                    reimbursementData += `${res.rowid}~${res.appAmt}~${res.appDescription}#`
                })
                let reimbursementSave = {
                    "Index": "ReimbursementApprovelSave",
                    "Data": { "srno": this.props.match.params.id, "data": reimbursementData }
                }
                postToServer(URL_EXPENSE_CLAIM, reimbursementSave).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        this.onReimbursementSave()
                        this.getApprove()
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                })
            }
            else if (this.state.otherExpenseChange.length) {
                let otherExpenseData = "";
                this.state.otherExpenseChange.map(res => {
                    otherExpenseData += `${res.code}~${res.appAmt}~${res.appNote}#`
                })
                let otherExpenseSave = {
                    "Index": "OtherExpenseApproveSave",
                    "Data": { "srno": this.props.match.params.id, "data": otherExpenseData }
                }
                postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        this.onOtherExpenseSave()
                        this.getApprove()
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                })
            }
            else if (this.state.reimbursementChange.length) {
                let reimbursementData = "";
                this.state.reimbursementChange.map(res => {
                    reimbursementData += `${res.rowid}~${res.appAmt}~${res.appDescription}#`
                })
                let reimbursementSave = {
                    "Index": "ReimbursementApprovelSave",
                    "Data": { "srno": this.props.match.params.id, "data": reimbursementData }
                }
                postToServer(URL_EXPENSE_CLAIM, reimbursementSave).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        this.onReimbursementSave()
                        this.getApprove()
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                })
            }
        }
        else {
            this.getApprove()
        }
    }

    //manager approvalSuccess.
    getApprove() {
        let det = JSON.parse(JSON.stringify(this.state.expenseDetails));
        if (det.length) {
            det.map(res => {
                if (res.dtt != "") {
                    let value = res.dtt.split("-").reverse().join("-");
                    res["dtt"] = value
                    if (this.state.visitTypes.length) {
                        this.state.visitTypes.map(ans => {
                            if (res.VisitType == ans.Name) {
                                res["VisitType"] = ans.Code
                            }
                        })
                    }
                }
            })
        }
        let approvalData = {
            "Index": "expense_approved",
            "det": det,
            "Data": {
                "srno": this.props.match.params.id,
                "approve_total": sessionStorage.getItem("app_Exp_Total").toString(),
                "note": this.state.note2
            },
        }
        postToServer(URL_EXPENSE_CLAIM, approvalData).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ spinner: false, approvalSuccess: true })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in expense approval" })
        })
    }

    //click on done button of approval success pop up.
    approvalDone() {
        this.setState({ approvalSuccess: false });
        this.props.history.goBack()
    }

    //click on done button of confirmation success pop up.
    confirmDone() {
        this.setState({ confirmationSuccess: false });
        this.props.history.goBack()
    }

    //click on save button of confirmation.
    onAdminSave() {
        this.setState({ spinner: true })
        let det = JSON.parse(JSON.stringify(this.state.expenseDetails));
        if (det.length) {
            det.map(res => {
                if (res.dtt != "") {
                    let value = res.dtt.split("-").reverse().join("-");
                    res["dtt"] = value
                    if (this.state.visitTypes.length) {
                        this.state.visitTypes.map(ans => {
                            if (res.VisitType == ans.Name) {
                                res["VisitType"] = ans.Code
                            }
                        })
                    }
                }
            })
        }
        let saveData = {
            "Index": "expense_ConfirmSave",
            "det": det,
            "Data": {
                "srno": this.props.match.params.id,
                "note": this.state.note3,
                "amount": sessionStorage.getItem("Con_Exp_Total").toString()
            },
        }
        postToServer(URL_EXPENSE_CLAIM, saveData).then((Result) => {
            if (Result.data.Status == 'Success') {
                if (this.state.otherExpenseChange.length ||
                    this.state.reimbursementChange.length ||
                    this.state.additionalExpenseChange.length ||
                    this.state.supmerDetailsChange.length) {
                    if (this.state.otherExpenseChange.length &&
                        this.state.reimbursementChange.length &&
                        this.state.additionalExpenseChange.length &&
                        this.state.supmerDetailsChange.length) {
                        let confirmOtherExpense = "";
                        this.state.otherExpenseChange.map(res => {
                            confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                        })
                        let confirm_other = {
                            "Index": "OtherExpensConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmOtherExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onOtherExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                        })
                        let confirmReimbursement = "";
                        this.state.reimbursementChange.map(res => {
                            confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                        })
                        let confirm_reimb = {
                            "Index": "ReimbursementConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmReimbursement
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onReimbursementSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                        })
                        let confirmAdditionalExpense = "";
                        this.state.additionalExpenseChange.map(res => {
                            confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                        })
                        let confirm_additional = {
                            "Index": "AdditionalExp_confirm_Save",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmAdditionalExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onAdditionalExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                        })
                        let confirmSupMerDetails = "";
                        this.state.supmerDetails.map(res => {
                            confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                        })
                        let confirm_supmer = {
                            "Index": "SuppMerDetailsInsert",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmSupMerDetails
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onSupMerSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                        })
                    }
                    else if (this.state.otherExpenseChange.length &&
                        this.state.reimbursementChange.length &&
                        this.state.additionalExpenseChange.length) {
                        let confirmOtherExpense = "";
                        this.state.otherExpenseChange.map(res => {
                            confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                        })
                        let confirm_other = {
                            "Index": "OtherExpensConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmOtherExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onOtherExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                        })
                        let confirmReimbursement = "";
                        this.state.reimbursementChange.map(res => {
                            confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                        })
                        let confirm_reimb = {
                            "Index": "ReimbursementConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmReimbursement
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onReimbursementSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                        })
                        let confirmAdditionalExpense = "";
                        this.state.additionalExpenseChange.map(res => {
                            confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                        })
                        let confirm_additional = {
                            "Index": "AdditionalExp_confirm_Save",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmAdditionalExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onAdditionalExpenseSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                        })
                    }
                    else if (this.state.otherExpenseChange.length &&
                        this.state.reimbursementChange.length &&
                        this.state.supmerDetailsChange.length) {
                        let confirmOtherExpense = "";
                        this.state.otherExpenseChange.map(res => {
                            confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                        })
                        let confirm_other = {
                            "Index": "OtherExpensConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmOtherExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onOtherExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                        })
                        let confirmReimbursement = "";
                        this.state.reimbursementChange.map(res => {
                            confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                        })
                        let confirm_reimb = {
                            "Index": "ReimbursementConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmReimbursement
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onReimbursementSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                        })
                        let confirmSupMerDetails = "";
                        this.state.supmerDetails.map(res => {
                            confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                        })
                        let confirm_supmer = {
                            "Index": "SuppMerDetailsInsert",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmSupMerDetails
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onSupMerSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                        })
                    }
                    else if (this.state.otherExpenseChange.length &&
                        this.state.additionalExpenseChange.length &&
                        this.state.supmerDetailsChange.length) {
                        let confirmOtherExpense = "";
                        this.state.otherExpenseChange.map(res => {
                            confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                        })
                        let confirm_other = {
                            "Index": "OtherExpensConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmOtherExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onOtherExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                        })
                        let confirmAdditionalExpense = "";
                        this.state.additionalExpenseChange.map(res => {
                            confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                        })
                        let confirm_additional = {
                            "Index": "AdditionalExp_confirm_Save",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmAdditionalExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onAdditionalExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                        })
                        let confirmSupMerDetails = "";
                        this.state.supmerDetails.map(res => {
                            confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                        })
                        let confirm_supmer = {
                            "Index": "SuppMerDetailsInsert",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmSupMerDetails
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onSupMerSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                        })
                    }
                    else if (this.state.reimbursementChange.length &&
                        this.state.additionalExpenseChange.length &&
                        this.state.supmerDetailsChange.length) {
                        let confirmReimbursement = "";
                        this.state.reimbursementChange.map(res => {
                            confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                        })
                        let confirm_reimb = {
                            "Index": "ReimbursementConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmReimbursement
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onReimbursementSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                        })
                        let confirmAdditionalExpense = "";
                        this.state.additionalExpenseChange.map(res => {
                            confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                        })
                        let confirm_additional = {
                            "Index": "AdditionalExp_confirm_Save",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmAdditionalExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onAdditionalExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                        })
                        let confirmSupMerDetails = "";
                        this.state.supmerDetails.map(res => {
                            confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                        })
                        let confirm_supmer = {
                            "Index": "SuppMerDetailsInsert",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmSupMerDetails
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onSupMerSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                        })
                    }
                    else if (this.state.otherExpenseChange.length &&
                        this.state.reimbursementChange.length) {
                        let confirmOtherExpense = "";
                        this.state.otherExpenseChange.map(res => {
                            confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                        })
                        let confirm_other = {
                            "Index": "OtherExpensConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmOtherExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onOtherExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                        })
                        let confirmReimbursement = "";
                        this.state.reimbursementChange.map(res => {
                            confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                        })
                        let confirm_reimb = {
                            "Index": "ReimbursementConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmReimbursement
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onReimbursementSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                        })
                    }
                    else if (this.state.otherExpenseChange.length &&
                        this.state.additionalExpenseChange.length) {
                        let confirmOtherExpense = "";
                        this.state.otherExpenseChange.map(res => {
                            confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                        })
                        let confirm_other = {
                            "Index": "OtherExpensConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmOtherExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onOtherExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                        })
                        let confirmAdditionalExpense = "";
                        this.state.additionalExpenseChange.map(res => {
                            confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                        })
                        let confirm_additional = {
                            "Index": "AdditionalExp_confirm_Save",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmAdditionalExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onAdditionalExpenseSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                        })
                    }
                    else if (this.state.otherExpenseChange.length &&
                        this.state.supmerDetailsChange.length) {
                        let confirmOtherExpense = "";
                        this.state.otherExpenseChange.map(res => {
                            confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                        })
                        let confirm_other = {
                            "Index": "OtherExpensConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmOtherExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onOtherExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                        })
                        let confirmSupMerDetails = "";
                        this.state.supmerDetails.map(res => {
                            confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                        })
                        let confirm_supmer = {
                            "Index": "SuppMerDetailsInsert",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmSupMerDetails
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onSupMerSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                        })
                    }
                    else if (this.state.reimbursementChange.length &&
                        this.state.additionalExpenseChange.length) {
                        let confirmReimbursement = "";
                        this.state.reimbursementChange.map(res => {
                            confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                        })
                        let confirm_reimb = {
                            "Index": "ReimbursementConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmReimbursement
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onReimbursementSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                        })
                        let confirmAdditionalExpense = "";
                        this.state.additionalExpenseChange.map(res => {
                            confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                        })
                        let confirm_additional = {
                            "Index": "AdditionalExp_confirm_Save",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmAdditionalExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onAdditionalExpenseSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                        })
                    }
                    else if (this.state.reimbursementChange.length &&
                        this.state.supmerDetailsChange.length) {
                        let confirmReimbursement = "";
                        this.state.reimbursementChange.map(res => {
                            confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                        })
                        let confirm_reimb = {
                            "Index": "ReimbursementConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmReimbursement
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onReimbursementSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                        })
                        let confirmSupMerDetails = "";
                        this.state.supmerDetails.map(res => {
                            confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                        })
                        let confirm_supmer = {
                            "Index": "SuppMerDetailsInsert",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmSupMerDetails
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onSupMerSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                        })
                    }
                    else if (this.state.additionalExpenseChange.length &&
                        this.state.supmerDetailsChange.length) {
                        let confirmAdditionalExpense = "";
                        this.state.additionalExpenseChange.map(res => {
                            confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                        })
                        let confirm_additional = {
                            "Index": "AdditionalExp_confirm_Save",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmAdditionalExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onAdditionalExpenseSave()
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                        })
                        let confirmSupMerDetails = "";
                        this.state.supmerDetails.map(res => {
                            confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                        })
                        let confirm_supmer = {
                            "Index": "SuppMerDetailsInsert",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmSupMerDetails
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onSupMerSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                        })
                    }
                    else if (this.state.otherExpenseChange.length) {
                        let confirmOtherExpense = "";
                        this.state.otherExpenseChange.map(res => {
                            confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                        })
                        let confirm_other = {
                            "Index": "OtherExpensConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmOtherExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onOtherExpenseSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                        })
                    }
                    else if (this.state.reimbursementChange.length) {
                        let confirmReimbursement = "";
                        this.state.reimbursementChange.map(res => {
                            confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                        })
                        let confirm_reimb = {
                            "Index": "ReimbursementConfirmSave",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmReimbursement
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onReimbursementSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                        })
                    }
                    else if (this.state.additionalExpenseChange.length) {
                        let confirmAdditionalExpense = "";
                        this.state.additionalExpenseChange.map(res => {
                            confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                        })
                        let confirm_additional = {
                            "Index": "AdditionalExp_confirm_Save",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmAdditionalExpense
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onAdditionalExpenseSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                        })
                    }
                    else if (this.state.supmerDetailsChange.length) {
                        let confirmSupMerDetails = "";
                        this.state.supmerDetails.map(res => {
                            confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                        })
                        let confirm_supmer = {
                            "Index": "SuppMerDetailsInsert",
                            "Data": {
                                "srno": this.props.match.params.id,
                                "data": confirmSupMerDetails
                            }
                        }
                        postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onSupMerSave()
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                                    this.getDetails()
                                    if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                                        let months = ["January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"]
                                        let dateDetails = this.state.empDet4.split(' To ')
                                        let dates = dateDetails[0].split('-');
                                        this.setState({
                                            year: dates[2],
                                            month: months[parseInt(dates[1]) - 1],
                                            fromDate: dateDetails[0],
                                            toDate: dateDetails[1]
                                        })
                                    }
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                        })
                    }
                }
                else {
                    this.setState({ spinner: false, showSuccess: true })
                    setTimeout(function () {
                        this.setState({ showSuccess: false, submitStatus: false });
                        this.props.history.replace("/expenseclaimentry/" + "00/" + "confirmation/" + this.props.match.params.id)
                        this.getDetails()
                        if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                            let months = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"]
                            let dateDetails = this.state.empDet4.split(' To ')
                            let dates = dateDetails[0].split('-');
                            this.setState({
                                year: dates[2],
                                month: months[parseInt(dates[1]) - 1],
                                fromDate: dateDetails[0],
                                toDate: dateDetails[1]
                            })
                        }
                    }.bind(this), 2000);
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in expense confirmation" })
        })
    }

    //click on confirm and reconfirm button of confirmation and reconfirmation.
    onAdminConfirm() {
        this.setState({ spinner: true })
        let flags = this.state.confirmationFlags.filter(res => res.Hcolumn != "Conf'n Note")
        let dets = this.state.expenseDetails;
        let sortedFlags = [];
        flags.map(li => {
            sortedFlags.push({ name: li.Hcolumn.replace("Conf'd ", "") })
        })
        let war = [];
        sortedFlags.map(list => {
            let res = ""
            dets.map(li => {
                if (parseFloat(li["Conf'd " + list.name]) > parseFloat(li[list.name])) {
                    res += li.dtt.substring(0, 2) + ","
                }
            })
            if (res != "") {
                war.push(list.name + " amount is more than the claimed amount on " + res + " Do you want to continue ?")
            }
        })
        this.setState({ warningMsg: war })
        if (war.length) {
            this.setState({
                spinner: false,
                warMsgName: war[0],
                warnMsgCheck: true
            })
        }
        else {
            this.onAdminConfirmValidation()
        }
    }

    //on success of confirmed amount validation.
    onAdminConfirmValidation() {
        this.setState({ spinner: true })
        if (this.state.submitStatus == true) {
            let det = JSON.parse(JSON.stringify(this.state.expenseDetails));
            if (det.length) {
                det.map(res => {
                    if (res.dtt != "") {
                        let value = res.dtt.split("-").reverse().join("-");
                        res["dtt"] = value
                        if (this.state.visitTypes.length) {
                            this.state.visitTypes.map(ans => {
                                if (res.VisitType == ans.Name) {
                                    res["VisitType"] = ans.Code
                                }
                            })
                        }
                    }
                })
            }
            let saveData = {
                "Index": "expense_ConfirmSave",
                "det": det,
                "Data": {
                    "srno": this.props.match.params.id,
                    "note": this.state.note3,
                    "amount": sessionStorage.getItem("Con_Exp_Total").toString()
                },
            }
            postToServer(URL_EXPENSE_CLAIM, saveData).then((Result) => {
                if (Result.data.Status == 'Success') {
                    if (this.state.otherExpenseChange.length ||
                        this.state.reimbursementChange.length ||
                        this.state.additionalExpenseChange.length ||
                        this.state.supmerDetailsChange.length) {
                        if (this.state.otherExpenseChange.length &&
                            this.state.reimbursementChange.length &&
                            this.state.additionalExpenseChange.length &&
                            this.state.supmerDetailsChange.length) {
                            let confirmOtherExpense = "";
                            this.state.otherExpenseChange.map(res => {
                                confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                            })
                            let confirm_other = {
                                "Index": "OtherExpensConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmOtherExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onOtherExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                            })
                            let confirmReimbursement = "";
                            this.state.reimbursementChange.map(res => {
                                confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                            })
                            let confirm_reimb = {
                                "Index": "ReimbursementConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmReimbursement
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onReimbursementSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                            })
                            let confirmAdditionalExpense = "";
                            this.state.additionalExpenseChange.map(res => {
                                confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let confirm_additional = {
                                "Index": "AdditionalExp_confirm_Save",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmAdditionalExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onAdditionalExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                            })
                            let confirmSupMerDetails = "";
                            this.state.supmerDetails.map(res => {
                                confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                            })
                            let confirm_supmer = {
                                "Index": "SuppMerDetailsInsert",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmSupMerDetails
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onSupMerSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                            })
                        }
                        else if (this.state.otherExpenseChange.length &&
                            this.state.reimbursementChange.length &&
                            this.state.additionalExpenseChange.length) {
                            let confirmOtherExpense = "";
                            this.state.otherExpenseChange.map(res => {
                                confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                            })
                            let confirm_other = {
                                "Index": "OtherExpensConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmOtherExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onOtherExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                            })
                            let confirmReimbursement = "";
                            this.state.reimbursementChange.map(res => {
                                confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                            })
                            let confirm_reimb = {
                                "Index": "ReimbursementConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmReimbursement
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onReimbursementSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                            })
                            let confirmAdditionalExpense = "";
                            this.state.additionalExpenseChange.map(res => {
                                confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let confirm_additional = {
                                "Index": "AdditionalExp_confirm_Save",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmAdditionalExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onAdditionalExpenseSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                            })
                        }
                        else if (this.state.otherExpenseChange.length &&
                            this.state.reimbursementChange.length &&
                            this.state.supmerDetailsChange.length) {
                            let confirmOtherExpense = "";
                            this.state.otherExpenseChange.map(res => {
                                confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                            })
                            let confirm_other = {
                                "Index": "OtherExpensConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmOtherExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onOtherExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                            })
                            let confirmReimbursement = "";
                            this.state.reimbursementChange.map(res => {
                                confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                            })
                            let confirm_reimb = {
                                "Index": "ReimbursementConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmReimbursement
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onReimbursementSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                            })
                            let confirmSupMerDetails = "";
                            this.state.supmerDetails.map(res => {
                                confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                            })
                            let confirm_supmer = {
                                "Index": "SuppMerDetailsInsert",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmSupMerDetails
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onSupMerSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                            })
                        }
                        else if (this.state.otherExpenseChange.length &&
                            this.state.additionalExpenseChange.length &&
                            this.state.supmerDetailsChange.length) {
                            let confirmOtherExpense = "";
                            this.state.otherExpenseChange.map(res => {
                                confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                            })
                            let confirm_other = {
                                "Index": "OtherExpensConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmOtherExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onOtherExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                            })
                            let confirmAdditionalExpense = "";
                            this.state.additionalExpenseChange.map(res => {
                                confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let confirm_additional = {
                                "Index": "AdditionalExp_confirm_Save",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmAdditionalExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onAdditionalExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                            })
                            let confirmSupMerDetails = "";
                            this.state.supmerDetails.map(res => {
                                confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                            })
                            let confirm_supmer = {
                                "Index": "SuppMerDetailsInsert",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmSupMerDetails
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onSupMerSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                            })
                        }
                        else if (this.state.reimbursementChange.length &&
                            this.state.additionalExpenseChange.length &&
                            this.state.supmerDetailsChange.length) {
                            let confirmReimbursement = "";
                            this.state.reimbursementChange.map(res => {
                                confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                            })
                            let confirm_reimb = {
                                "Index": "ReimbursementConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmReimbursement
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onReimbursementSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                            })
                            let confirmAdditionalExpense = "";
                            this.state.additionalExpenseChange.map(res => {
                                confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let confirm_additional = {
                                "Index": "AdditionalExp_confirm_Save",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmAdditionalExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onAdditionalExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                            })
                            let confirmSupMerDetails = "";
                            this.state.supmerDetails.map(res => {
                                confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                            })
                            let confirm_supmer = {
                                "Index": "SuppMerDetailsInsert",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmSupMerDetails
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onSupMerSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                            })
                        }
                        else if (this.state.otherExpenseChange.length &&
                            this.state.reimbursementChange.length) {
                            let confirmOtherExpense = "";
                            this.state.otherExpenseChange.map(res => {
                                confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                            })
                            let confirm_other = {
                                "Index": "OtherExpensConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmOtherExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onOtherExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                            })
                            let confirmReimbursement = "";
                            this.state.reimbursementChange.map(res => {
                                confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                            })
                            let confirm_reimb = {
                                "Index": "ReimbursementConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmReimbursement
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onReimbursementSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                            })
                        }
                        else if (this.state.otherExpenseChange.length &&
                            this.state.additionalExpenseChange.length) {
                            let confirmOtherExpense = "";
                            this.state.otherExpenseChange.map(res => {
                                confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                            })
                            let confirm_other = {
                                "Index": "OtherExpensConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmOtherExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onOtherExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                            })
                            let confirmAdditionalExpense = "";
                            this.state.additionalExpenseChange.map(res => {
                                confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let confirm_additional = {
                                "Index": "AdditionalExp_confirm_Save",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmAdditionalExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onAdditionalExpenseSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                            })
                        }
                        else if (this.state.otherExpenseChange.length &&
                            this.state.supmerDetailsChange.length) {
                            let confirmOtherExpense = "";
                            this.state.otherExpenseChange.map(res => {
                                confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                            })
                            let confirm_other = {
                                "Index": "OtherExpensConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmOtherExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onOtherExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                            })
                            let confirmSupMerDetails = "";
                            this.state.supmerDetails.map(res => {
                                confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                            })
                            let confirm_supmer = {
                                "Index": "SuppMerDetailsInsert",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmSupMerDetails
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onSupMerSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                            })
                        }
                        else if (this.state.reimbursementChange.length &&
                            this.state.additionalExpenseChange.length) {
                            let confirmReimbursement = "";
                            this.state.reimbursementChange.map(res => {
                                confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                            })
                            let confirm_reimb = {
                                "Index": "ReimbursementConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmReimbursement
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onReimbursementSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                            })
                            let confirmAdditionalExpense = "";
                            this.state.additionalExpenseChange.map(res => {
                                confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let confirm_additional = {
                                "Index": "AdditionalExp_confirm_Save",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmAdditionalExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onAdditionalExpenseSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                            })
                        }
                        else if (this.state.reimbursementChange.length &&
                            this.state.supmerDetailsChange.length) {
                            let confirmReimbursement = "";
                            this.state.reimbursementChange.map(res => {
                                confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                            })
                            let confirm_reimb = {
                                "Index": "ReimbursementConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmReimbursement
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onReimbursementSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                            })
                            let confirmSupMerDetails = "";
                            this.state.supmerDetails.map(res => {
                                confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                            })
                            let confirm_supmer = {
                                "Index": "SuppMerDetailsInsert",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmSupMerDetails
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onSupMerSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                            })
                        }
                        else if (this.state.additionalExpenseChange.length &&
                            this.state.supmerDetailsChange.length) {
                            let confirmAdditionalExpense = "";
                            this.state.additionalExpenseChange.map(res => {
                                confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let confirm_additional = {
                                "Index": "AdditionalExp_confirm_Save",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmAdditionalExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onAdditionalExpenseSave()
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                            })
                            let confirmSupMerDetails = "";
                            this.state.supmerDetails.map(res => {
                                confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                            })
                            let confirm_supmer = {
                                "Index": "SuppMerDetailsInsert",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmSupMerDetails
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onSupMerSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                            })
                        }
                        else if (this.state.otherExpenseChange.length) {
                            let confirmOtherExpense = "";
                            this.state.otherExpenseChange.map(res => {
                                confirmOtherExpense += `${res.code}~${res.conAmt}~${res.conNote}#`
                            })
                            let confirm_other = {
                                "Index": "OtherExpensConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmOtherExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_other).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onOtherExpenseSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other expense save confirmation" })
                            })
                        }
                        else if (this.state.reimbursementChange.length) {
                            let confirmReimbursement = "";
                            this.state.reimbursementChange.map(res => {
                                confirmReimbursement += `${res.rowid}~${res.conAmt}~${res.conDescription}#`
                            })
                            let confirm_reimb = {
                                "Index": "ReimbursementConfirmSave",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmReimbursement
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_reimb).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onReimbursementSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in reimbursement save confirmation" })
                            })
                        }
                        else if (this.state.additionalExpenseChange.length) {
                            let confirmAdditionalExpense = "";
                            this.state.additionalExpenseChange.map(res => {
                                confirmAdditionalExpense += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let confirm_additional = {
                                "Index": "AdditionalExp_confirm_Save",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmAdditionalExpense
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_additional).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onAdditionalExpenseSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in additional expense save confirmation" })
                            })
                        }
                        else if (this.state.supmerDetailsChange.length) {
                            let confirmSupMerDetails = "";
                            this.state.supmerDetails.map(res => {
                                confirmSupMerDetails += `${res.PRP_RPSNO}~${res.NameOfTheEvent}~${res.ACTUAL_EXPENSEAMOUNT}~${res.ADVANCE_RECEIVED}~${res.ADD_RECOVERY}#`
                            })
                            let confirm_supmer = {
                                "Index": "SuppMerDetailsInsert",
                                "Data": {
                                    "srno": this.props.match.params.id,
                                    "data": confirmSupMerDetails
                                }
                            }
                            postToServer(URL_EXPENSE_CLAIM, confirm_supmer).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let adm_con = {
                                        "Index": this.props.match.params.entryType == "confirmation" ?
                                            "expense_confirmed" : "expense_Reconfirmed",
                                        "Data": { "srno": this.props.match.params.id }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onSupMerSave()
                                            this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in supmer details save confirmation" })
                            })
                        }
                    }
                    else {
                        let adm_con = {
                            "Index": this.props.match.params.entryType == "confirmation" ?
                                "expense_confirmed" : "expense_Reconfirmed",
                            "Data": { "srno": this.props.match.params.id }
                        }
                        postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.setState({ spinner: false, confirmationSuccess: true, submitStatus: false })
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
                        })
                    }
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in expense confirmation" })
            })
        }
        else {
            let adm_con = {
                "Index": this.props.match.params.entryType == "confirmation" ?
                    "expense_confirmed" : "expense_Reconfirmed",
                "Data": { "srno": this.props.match.params.id }
            }
            postToServer(URL_EXPENSE_CLAIM, adm_con).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ spinner: false, confirmationSuccess: true })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in confirm button confirmation" })
            })
        }
    }

    //To delete row in reimbursement.
    onDelete(id, newId) {
        let reportNo = this.props.match.params.id;
        let list = [{
            "Amount": 0.00,
            "Description": "",
            "n_rowid": "1",
            "newId": "newly added"
        }]
        if (newId == "newly added") {
            if (this.state.reimbursement.length <= 1) {
                this.setState({ reimbursement: list })
                this.setState({ reimbursementChange: [] })
            }
            else {
                let result = this.state.reimbursement.filter(res => res.n_rowid != id);
                let changes = this.state.reimbursementChange.filter(response => response.rowid != id);
                this.setState({ reimbursement: result })
                this.setState({ reimbursementChange: changes })
            }
        }
        else {
            if (this.state.reimbursement.length <= 1) {
                let deleteData = {
                    "Index": "ReimbursementDelete",
                    "Data": { "srno": reportNo, "rowid": id }
                }
                postToServer(URL_EXPENSE_CLAIM, deleteData).then((Result) => {
                    if (Result.data.Status == 'Success') {
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })
                this.setState({ reimbursement: list })
                this.setState({ reimbursementChange: [] })
            }
            else {
                let result = this.state.reimbursement.filter(res => res.n_rowid != id);
                let changes = this.state.reimbursementChange.filter(response => response.rowid != id);
                let deleteData = {
                    "Index": "ReimbursementDelete",
                    "Data": { "srno": reportNo, "rowid": id }
                }
                postToServer(URL_EXPENSE_CLAIM, deleteData).then((Result) => {
                    if (Result.data.Status == 'Success') {
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })
                this.setState({ reimbursement: result })
                this.setState({ reimbursementChange: changes })
            }
        }
    }

    //To add row in reimbursement.
    addRow() {
        let list = this.state.reimbursement;
        let id = list.length ? (parseInt(list[list.length - 1].n_rowid) + 1).toString() : "1"
        list.push({
            "Amount": 0.00,
            "Description": "",
            "n_rowid": id,
            "newId": "newly added"
        })
        this.setState({ reimbursement: list })
    }

    //To get other expense for manager apporoval.
    getApprovalOtherExpense(id) {
        let otherExpense = {
            "Index": "OtherExpenseApprovelList",
            "Data": { "srno": id },
        }
        postToServer(URL_EXPENSE_CLAIM, otherExpense).then((Result) => {
            if (Result.data.Status == 'Success') {
                let res = [];
                let ans = [];
                Result.data.data.map(list => {
                    res.push({
                        srno: list.srno,
                        code: list.c_exp_code,
                        appAmt: list["App'd Amount"],
                        appNote: list["App'l Remark"]
                    })
                    ans.push({
                        "App'd Amount": list["App'd Amount"],
                        "App'l Remark": list["App'l Remark"],
                        "Remark": list.Remark,
                        "amount": list.amount,
                        "c_exp_code": list.c_exp_code,
                        "c_exp_heading": list.c_exp_heading,
                        "upper_limit": list.n_upper_limit,
                        "upperLimit": list.n_upper_limit,
                        "srno": list.srno,
                        "Conf'd Amount": list["Conf'd Amount"],
                        "Conf'n Remark": list["Conf'n Remark"]
                    })
                })
                this.setState({
                    otherExpenses: ans,
                    otherExpenseChange: res,
                    editRequired: Result.data.SaveStatus[0]["EditRequired"]
                })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in manager other Expense" })
        })
    }

    //To get other expense for admin confirmation.
    getConfirmationOtherExpense(id) {
        let otherExpense = {
            "Index": "OtherExpenseApprovelList",
            "Data": { "srno": id },
        }
        postToServer(URL_EXPENSE_CLAIM, otherExpense).then((Result) => {
            if (Result.data.Status == 'Success') {
                let conOth = [];
                Result.data.data.map(li => {
                    conOth.push({
                        Remark: li.Remark,
                        amount: li.amount,
                        c_exp_code: li.c_exp_code,
                        c_exp_heading: li.c_exp_heading,
                        upper_limit: li.n_upper_limit,
                        upperLimit: li.n_upper_limit,
                        srno: li.srno,
                        "App'd Amount": li["App'd Amount"],
                        "App'l Remark": li["App'l Remark"],
                        "Conf'd Amount": li["Conf'd Amount"],
                        "Conf'n Remark": li["Conf'n Remark"]
                    })
                })
                if (Result.data.SaveStatus[0].confirm_submit == 0) {
                    let res = [];
                    Result.data.data.map(list => {
                        res.push({
                            srno: list.srno,
                            code: list.c_exp_code,
                            conAmt: list["Conf'd Amount"],
                            conNote: list["Conf'n Remark"]
                        })
                    })
                    this.setState({ otherExpenses: conOth, otherExpenseChange: res })
                }
                else {
                    this.setState({ otherExpenses: conOth })
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in admin other Expense" })
        })
    }

    //To get the details of reimbursement for manager approval.
    getApprovalReimbursement(id) {
        let reimbursement = {
            "Index": "ReimbursementApprovelList",
            "Data": { "srno": id },
        }
        postToServer(URL_EXPENSE_CLAIM, reimbursement).then((Result) => {
            if (Result.data.Status == 'Success') {
                let res = [];
                Result.data.data.map(list => {
                    res.push({
                        rowid: list.n_rowid,
                        appAmt: list["App'd Amount"],
                        appDescription: list["App'l Remark"],
                        newId: list.n_rowid
                    })
                })
                this.setState({ reimbursement: Result.data.data, reimbursementChange: res })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in manager reimbursement" })
        })
    }

    //To get the details of reimbursement for admin confirmation.
    getConfirmationReimbursement(id) {
        let reimbursement = {
            "Index": "ReimbursementApprovelList",
            "Data": { "srno": id },
        }
        postToServer(URL_EXPENSE_CLAIM, reimbursement).then((Result) => {
            if (Result.data.Status == 'Success') {
                if (Result.data.SaveStatus[0].confirm_submit == 0) {
                    let res = [];
                    Result.data.data.map(list => {
                        res.push({
                            rowid: list.n_rowid,
                            conAmt: list["Conf'd Amount"],
                            conDescription: list["Conf'n Remark"],
                            newId: list.n_rowid
                        })
                    })
                    this.setState({ reimbursement: Result.data.data, reimbursementChange: res })
                }
                else {
                    this.setState({ reimbursement: Result.data.data })
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in admin reimbursement" })
        })
    }

    //To get the details of additional expense.
    getAdditionalExpense(id) {
        let addExpense = {
            "Index": "AdditionalExp_confirm",
            "Data": { "srno": id },
        }
        postToServer(URL_EXPENSE_CLAIM, addExpense).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ additionalExpense: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in additional Expense" })
        })
    }

    //Change the details of otherExpense and reimbursement.
    onOtherExpenseChange(value, category, id) {
        this.setState({ submitStatus: true })
        //change in prp-rps no.
        if (category == "Prp_RpsNo") {
            let list = this.state.supmerDetails
            list.map(res => {
                if (res.id == id) {
                    let result = this.state.supmerDetailsChange
                    res.PRP_RPSNO = value
                    if (result.some(li => li.id == id) == true) {
                        result.map(res => {
                            if (res.id == id) {
                                res.PRP_RPSNO = value
                            }
                        })
                    }
                    else {
                        result.push({
                            id: res.id,
                            PRP_RPSNO: value,
                            NameOfTheEvent: res.NameOfTheEvent,
                            ACTUAL_EXPENSEAMOUNT: res.ACTUAL_EXPENSEAMOUNT,
                            ADVANCE_RECEIVED: res.ADVANCE_RECEIVED,
                            ADD_RECOVERY: res.ADD_RECOVERY
                        })
                    }
                    this.setState({ supmerDetailsChange: result })
                }
            })
            this.setState({ supmerDetails: list })
            this.setState(prevState => ({ supmerDetailsStatus: !prevState.supmerDetailsStatus }))
        }
        //change in name of the event.
        else if (category == "NameOfTheEvent") {
            let list = this.state.supmerDetails
            list.map(res => {
                if (res.id == id) {
                    let result = this.state.supmerDetailsChange
                    res.NameOfTheEvent = value
                    if (result.some(li => li.id == id) == true) {
                        result.map(res => {
                            if (res.id == id) {
                                res.NameOfTheEvent = value
                            }
                        })
                    }
                    else {
                        result.push({
                            id: res.id,
                            PRP_RPSNO: res.PRP_RPSNO,
                            NameOfTheEvent: value,
                            ACTUAL_EXPENSEAMOUNT: res.ACTUAL_EXPENSEAMOUNT,
                            ADVANCE_RECEIVED: res.ADVANCE_RECEIVED,
                            ADD_RECOVERY: res.ADD_RECOVERY
                        })
                    }
                    this.setState({ supmerDetailsChange: result })
                }
            })
            this.setState({ supmerDetails: list })
            this.setState(prevState => ({ supmerDetailsStatus: !prevState.supmerDetailsStatus }))
        }
        //change in actual expense amount.
        else if (category == "actualExpenseAmount") {
            let list = this.state.supmerDetails
            list.map(res => {
                if (res.id == id) {
                    let result = this.state.supmerDetailsChange
                    res.ACTUAL_EXPENSEAMOUNT = value
                    if (result.some(li => li.id == id) == true) {
                        result.map(res => {
                            if (res.id == id) {
                                res.ACTUAL_EXPENSEAMOUNT = value
                            }
                        })
                    }
                    else {
                        result.push({
                            id: res.id,
                            PRP_RPSNO: res.PRP_RPSNO,
                            NameOfTheEvent: res.NameOfTheEvent,
                            ACTUAL_EXPENSEAMOUNT: value,
                            ADVANCE_RECEIVED: res.ADVANCE_RECEIVED,
                            ADD_RECOVERY: res.ADD_RECOVERY
                        })
                    }
                    this.setState({ supmerDetailsChange: result })
                }
            })
            this.setState({ supmerDetails: list })
            this.setState(prevState => ({ supmerDetailsStatus: !prevState.supmerDetailsStatus }))
        }
        //change in advance received.
        else if (category == "advanceReceived") {
            let list = this.state.supmerDetails
            list.map(res => {
                if (res.id == id) {
                    let result = this.state.supmerDetailsChange
                    res.ADVANCE_RECEIVED = value
                    if (result.some(li => li.id == id) == true) {
                        result.map(res => {
                            if (res.id == id) {
                                res.ADVANCE_RECEIVED = value
                            }
                        })
                    }
                    else {
                        result.push({
                            id: res.id,
                            PRP_RPSNO: res.PRP_RPSNO,
                            NameOfTheEvent: res.NameOfTheEvent,
                            ACTUAL_EXPENSEAMOUNT: res.ACTUAL_EXPENSEAMOUNT,
                            ADVANCE_RECEIVED: value,
                            ADD_RECOVERY: res.ADD_RECOVERY
                        })
                    }
                    this.setState({ supmerDetailsChange: result })
                }
            })
            this.setState({ supmerDetails: list })
            this.setState(prevState => ({ supmerDetailsStatus: !prevState.supmerDetailsStatus }))
        }
        //change in add/Recovery.
        else if (category == "addRecovery") {
            let list = this.state.supmerDetails
            list.map(res => {
                if (res.id == id) {
                    let result = this.state.supmerDetailsChange
                    res.ADD_RECOVERY = value
                    if (result.some(li => li.id == id) == true) {
                        result.map(res => {
                            if (res.id == id) {
                                res.ADD_RECOVERY = value
                            }
                        })
                    }
                    else {
                        result.push({
                            id: res.id,
                            PRP_RPSNO: res.PRP_RPSNO,
                            NameOfTheEvent: res.NameOfTheEvent,
                            ACTUAL_EXPENSEAMOUNT: res.ACTUAL_EXPENSEAMOUNT,
                            ADVANCE_RECEIVED: res.ADVANCE_RECEIVED,
                            ADD_RECOVERY: value
                        })
                    }
                    this.setState({ supmerDetailsChange: result })
                }
            })
            this.setState({ supmerDetails: list })
            this.setState(prevState => ({ supmerDetailsStatus: !prevState.supmerDetailsStatus }))
        }
        //change in additional expense amount.
        else if (category == "additionalExpenseAmount") {
            let list = this.state.additionalExpense
            list.map(res => {
                if (res.C_Code == id) {
                    let result = this.state.additionalExpenseChange
                    if (value == "") {
                        res.N_CONFIRMED_AMT = 0
                    }
                    else {
                        res.N_CONFIRMED_AMT = value
                    }
                    if (result.some(li => li.code == id) == true) {
                        result.map(res => {
                            if (res.code == id) {
                                res.amount = value
                            }
                        })
                    }
                    else {
                        result.push({
                            code: res.C_Code,
                            amount: value,
                            note: res.note
                        })
                    }
                    this.setState({ additionalExpenseChange: result })
                }
            })
            this.setState({ additionalExpense: list })
            this.setState(prevState => ({ additionalExpenseStatus: !prevState.additionalExpenseStatus }))
        }
        //change in additional expense remark.
        else if (category == "additionalExpenseRemark") {
            let list = this.state.additionalExpense
            list.map(res => {
                if (res.C_Code == id) {
                    let result = this.state.additionalExpenseChange
                    if (value == "") {
                        res.note = 0
                    }
                    else {
                        res.note = value
                    }
                    if (result.some(li => li.code == id) == true) {
                        result.map(res => {
                            if (res.code == id) {
                                res.note = value
                            }
                        })
                    }
                    else {
                        result.push({
                            code: res.C_Code,
                            amount: res.N_CONFIRMED_AMT,
                            note: value
                        })
                    }
                    this.setState({ additionalExpenseChange: result })
                }
            })
            this.setState({ additionalExpense: list })
        }
        //change in other expense value.
        else if (category == "otherExpenseAmount") {
            let list = this.state.otherExpenses
            list.map(res => {
                if (res.c_exp_code == id) {
                    let result = this.state.otherExpenseChange
                    if (value == "") {
                        res.amount = 0
                    }
                    else {
                        res.amount = value
                    }
                    if (result.some(li => li.code == id) == true) {
                        result.map(res => {
                            if (res.code == id) {
                                res.amount = value
                            }
                        })
                    }
                    else {
                        result.push({
                            srno: res.srno,
                            code: res.c_exp_code,
                            amount: value,
                            note: res.Remark
                        })
                    }
                    this.setState({ otherExpenseChange: result })
                }
            })
            this.setState({ otherExpenses: list })
            this.setState(prevState => ({ otherExpenseStatus: !prevState.otherExpenseStatus }))
            // this.getOtherExpenseTotal()
        }
        //change in approved other expense value
        else if (category == "app'dAmt") {
            let list = this.state.otherExpenses
            list.map(res => {
                if (res.c_exp_code == id) {
                    let result = this.state.otherExpenseChange
                    if (value == "") {
                        res["App'd Amount"] = 0
                    }
                    else {
                        res["App'd Amount"] = value
                    }
                    if (result.some(li => li.code == id) == true) {
                        result.map(res => {
                            if (res.code == id) {
                                res.appAmt = value
                            }
                        })
                    }
                    else {
                        result.push({
                            srno: res.srno,
                            code: res.c_exp_code,
                            appAmt: value,
                            appNote: res["App'l Remark"]
                        })
                    }
                    this.setState({ otherExpenseChange: result })
                }
            })
            this.setState({ otherExpenses: list })
            this.setState(prevState => ({ otherExpenseStatus: !prevState.otherExpenseStatus }))
            // this.getOtherExpenseTotal()
        }
        //change in confirmed other expense value
        else if (category == "con'dAmt") {
            let list = this.state.otherExpenses
            list.map(res => {
                if (res.c_exp_code == id) {
                    let result = this.state.otherExpenseChange
                    if (value == "") {
                        res["Conf'd Amount"] = 0
                    }
                    else {
                        res["Conf'd Amount"] = value
                    }
                    if (result.some(li => li.code == id) == true) {
                        result.map(res => {
                            if (res.code == id) {
                                res.conAmt = value
                            }
                        })
                    }
                    else {
                        result.push({
                            srno: res.srno,
                            code: res.c_exp_code,
                            conAmt: value,
                            conNote: res["Conf'n Remark"]
                        })
                    }
                    this.setState({ otherExpenseChange: result })
                }
            })
            this.setState({ otherExpenses: list })
            this.setState(prevState => ({ otherExpenseStatus: !prevState.otherExpenseStatus }))
            // this.getOtherExpenseTotal()
        }
        //change in other expense remark.
        else if (category == "othExpRemark") {
            let list = this.state.otherExpenses
            list.map(res => {
                if (res.c_exp_code == id) {
                    let result = this.state.otherExpenseChange
                    res.Remark = value
                    if (result.some(li => li.code == id) == true) {
                        result.map(res => {
                            if (res.code == id) {
                                res.note = value
                            }
                        })
                    }
                    else {
                        result.push({
                            srno: res.srno,
                            code: res.c_exp_code,
                            amount: res.amount,
                            note: value
                        })
                    }
                    this.setState({ otherExpenseChange: result })
                }
            })
            this.setState({ otherExpenses: list })
        }
        //change in manager other expense remark.
        else if (category == "managerNote") {
            let list = this.state.otherExpenses
            list.map(res => {
                if (res.c_exp_code == id) {
                    let result = this.state.otherExpenseChange
                    res["App'l Remark"] = value
                    if (result.some(li => li.code == id) == true) {
                        result.map(res => {
                            if (res.code == id) {
                                res.appNote = value
                            }
                        })
                    }
                    else {
                        result.push({
                            srno: res.srno,
                            code: res.c_exp_code,
                            appAmt: res["App'd Amount"],
                            appNote: value
                        })
                    }
                    this.setState({ otherExpenseChange: result })
                }
            })
            this.setState({ otherExpenses: list })
        }
        //change in admin other expense remark.
        else if (category == "adminNote") {
            let list = this.state.otherExpenses
            list.map(res => {
                if (res.c_exp_code == id) {
                    let result = this.state.otherExpenseChange
                    res["Conf'n Remark"] = value
                    if (result.some(li => li.code == id) == true) {
                        result.map(res => {
                            if (res.code == id) {
                                res.conNote = value
                            }
                        })
                    }
                    else {
                        result.push({
                            srno: res.srno,
                            code: res.c_exp_code,
                            conAmt: res["Conf'd Amount"],
                            conNote: value
                        })
                    }
                    this.setState({ otherExpenseChange: result })
                }
            })
            this.setState({ otherExpenses: list })
        }
        // change in reimbursement amount.
        else if (category == "reimbursementAmount") {
            let list = this.state.reimbursement
            list.map(res => {
                if (res.n_rowid == id) {
                    let result = this.state.reimbursementChange
                    if (value == "") {
                        res.Amount = 0
                    }
                    else {
                        res.Amount = value
                    }
                    if (result.some(li => li.rowid == id) == true) {
                        result.map(res => {
                            if (res.rowid == id) {
                                res.amount = value
                            }
                        })
                    }
                    else {
                        result.push({
                            rowid: res.n_rowid,
                            amount: value,
                            description: res.Description,
                            newId: res.newId
                        })
                    }
                    this.setState({ reimbursementChange: result })
                }
            })
            this.setState({ reimbursement: list })
            this.setState(prevState => ({ reimbursementStatus: !prevState.reimbursementStatus }))
            // this.getReimbursementTotal()
        }
        // change in approval reimbursement amount.
        else if (category == "app'dReimbursementAmount") {
            let list = this.state.reimbursement
            list.map(res => {
                if (res.n_rowid == id) {
                    let result = this.state.reimbursementChange
                    if (value == "") {
                        res["App'd Amount"] = 0
                    }
                    else {
                        res["App'd Amount"] = value
                    }
                    if (result.some(li => li.rowid == id) == true) {
                        result.map(res => {
                            if (res.rowid == id) {
                                res.appAmt = value
                            }
                        })
                    }
                    else {
                        result.push({
                            rowid: res.n_rowid,
                            appAmt: value,
                            appDescription: res["App'l Remark"],
                            newId: res.n_rowid
                        })
                    }
                    this.setState({ reimbursementChange: result })
                }
            })
            this.setState({ reimbursement: list })
            this.setState(prevState => ({ reimbursementStatus: !prevState.reimbursementStatus }))
            // this.getReimbursementTotal()
        }
        // change in confirmation reimbursement amount.
        else if (category == "con'dReimbursementAmount") {
            let list = this.state.reimbursement
            list.map(res => {
                if (res.n_rowid == id) {
                    let result = this.state.reimbursementChange
                    if (value == "") {
                        res["Conf'd Amount"] = 0
                    }
                    else {
                        res["Conf'd Amount"] = value
                    }
                    if (result.some(li => li.rowid == id) == true) {
                        result.map(res => {
                            if (res.rowid == id) {
                                res.conAmt = value
                            }
                        })
                    }
                    else {
                        result.push({
                            rowid: res.n_rowid,
                            conAmt: value,
                            conDescription: res["Conf'n Remark"],
                            newId: res.n_rowid
                        })
                    }
                    this.setState({ reimbursementChange: result })
                }
            })
            this.setState({ reimbursement: list })
            this.setState(prevState => ({ reimbursementStatus: !prevState.reimbursementStatus }))
            // this.getReimbursementTotal()
        }
        // change in manager reimbursement description.
        else if (category == "managerDescription") {
            let list = this.state.reimbursement
            list.map(res => {
                if (res.n_rowid == id) {
                    let result = this.state.reimbursementChange
                    res["App'l Remark"] = value
                    if (result.some(li => li.rowid == id) == true) {
                        result.map(res => {
                            if (res.rowid == id) {
                                res.appDescription = value
                            }
                        })
                    }
                    else {
                        result.push({
                            rowid: res.n_rowid,
                            appAmt: res["App'd Amount"],
                            appDescription: value,
                            newId: res.n_rowid
                        })
                    }
                    this.setState({ reimbursementChange: result })
                }
            })
            this.setState({ reimbursement: list })
        }
        // change in admin reimbursement description.
        else if (category == "adminDescription") {
            let list = this.state.reimbursement
            list.map(res => {
                if (res.n_rowid == id) {
                    let result = this.state.reimbursementChange
                    res["Conf'n Remark"] = value
                    if (result.some(li => li.rowid == id) == true) {
                        result.map(res => {
                            if (res.rowid == id) {
                                res.appDescription = value
                            }
                        })
                    }
                    else {
                        result.push({
                            rowid: res.n_rowid,
                            appAmt: res["Conf'd Amount"],
                            appDescription: value,
                            newId: res.n_rowid
                        })
                    }
                    this.setState({ reimbursementChange: result })
                }
            })
            this.setState({ reimbursement: list })
        }
        // change in reimbursement description.
        else if (category == "description") {
            let list = this.state.reimbursement
            list.map(res => {
                if (res.n_rowid == id) {
                    let result = this.state.reimbursementChange
                    res.Description = value
                    if (result.some(li => li.rowid == id) == true) {
                        result.map(res => {
                            if (res.rowid == id) {
                                res.description = value
                            }
                        })
                    }
                    else {
                        result.push({
                            rowid: res.n_rowid,
                            amount: res.Amount,
                            description: value,
                            newId: res.newId
                        })
                    }
                    this.setState({ reimbursementChange: result })
                }
            })
            this.setState({ reimbursement: list })
        }
    }

    //after validation of claim limit of save button.
    onLimitValidation() {
        this.setState({ spinner: true })
        let det = JSON.parse(JSON.stringify(this.state.expenseDetails));
        if (det.length) {
            det.map(res => {
                if (res.dtt != "") {
                    let value = res.dtt.split("-").reverse().join("-");
                    res["dtt"] = value
                    if (this.state.visitTypes.length) {
                        this.state.visitTypes.map(ans => {
                            if (res.VisitType == ans.Name) {
                                res["VisitType"] = ans.Code
                            }
                        })
                    }
                }
            })
        }
        let Data;
        if (this.props.match.params.id.includes("-")) {
            let dates = this.props.match.params.id.split(',');
            Data = {
                "claim_code": this.props.match.params.code,
                "month": "",
                "year": "",
                "fromdate": dates[0],
                "todate": dates[1],
                "note": this.state.note1,
                "claimtotal": sessionStorage.getItem("exp_Total").toString(),
                "srno": ""
            }
        }
        else if (!this.props.match.params.id.includes(",")) {
            Data = {
                "claim_code": "",
                "month": "",
                "year": "",
                "fromdate": "",
                "todate": "",
                "note": this.state.note1,
                "claimtotal": sessionStorage.getItem("exp_Total").toString(),
                "srno": this.props.match.params.id
            }
        }
        else {
            let dates = this.props.match.params.id.split(',');
            Data = {
                "claim_code": this.props.match.params.code,
                "month": dates[0],
                "year": dates[1],
                "fromdate": "",
                "todate": "",
                "note": this.state.note1,
                "claimtotal": sessionStorage.getItem("exp_Total").toString(),
                "srno": ""
            }
        }
        let ExpenseSave = {
            "Index": "ExpenseSave",
            "det": det,
            "Data": Data
        }
        postToServer(URL_EXPENSE_CLAIM, ExpenseSave).then((Result) => {
            if (Result.data.Status == 'Success') {
                let reportNo = Result.data.data[0].srno;
                if (this.state.otherExpenseChange.length || this.state.reimbursementChange.length || this.state.uploadImage.length) {
                    if ((this.state.otherExpenseChange.length && this.state.reimbursementChange.length) || this.state.uploadImage.length) {
                        if ((this.state.otherExpenseChange.length && this.state.reimbursementChange.length) && this.state.uploadImage.length) {
                            let otherExpenseData = "";
                            let reimbursementData = "";
                            this.state.otherExpenseChange.map(res => {
                                otherExpenseData += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let otherExpenseSave = {
                                "Index": "OtherExpenseSave",
                                "Data": { "srno": reportNo, "data": otherExpenseData }
                            }
                            postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onOtherExpenseSave()
                                    this.getOtherExpense(reportNo)
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                            })
                            this.state.reimbursementChange.map(res => {
                                let index = res.newId == "newly added" ? 0 : res.rowid;
                                reimbursementData += `${index}~${res.amount}~${res.description}#`
                            })
                            let ReimbursementSave = {
                                "Index": "ReimbursementSave",
                                "Data": { "srno": reportNo, "data": reimbursementData }
                            }
                            postToServer(URL_EXPENSE_CLAIM, ReimbursementSave).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onReimbursementSave()
                                    this.getReimbursement(reportNo)
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in Expense" })
                            })
                            this.onUpload(reportNo, "save")
                        }
                        else if ((this.state.otherExpenseChange.length || this.state.reimbursementChange.length) && this.state.uploadImage.length) {
                            if (this.state.otherExpenseChange.length && this.state.uploadImage.length) {
                                let otherExpenseData = "";
                                this.state.otherExpenseChange.map(res => {
                                    otherExpenseData += `${res.code}~${res.amount}~${res.note}#`
                                })
                                let otherExpenseSave = {
                                    "Index": "OtherExpenseSave",
                                    "Data": { "srno": reportNo, "data": otherExpenseData }
                                }
                                postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
                                    if (Result.data.Status == 'Success') {
                                        this.onOtherExpenseSave()
                                        this.getOtherExpense(reportNo)
                                    }
                                }).catch((Error) => {
                                    this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                                })
                                this.onUpload(reportNo, "save")
                            }
                            else if (this.state.reimbursementChange.length && this.state.uploadImage.length) {
                                let reportNo = Result.data.data[0].srno;
                                let reimbursementData = "";
                                this.state.reimbursementChange.map(res => {
                                    let index = res.newId == "newly added" ? 0 : res.rowid;
                                    reimbursementData += `${index}~${res.amount}~${res.description}#`
                                })
                                let ReimbursementSave = {
                                    "Index": "ReimbursementSave",
                                    "Data": { "srno": reportNo, "data": reimbursementData }
                                }
                                postToServer(URL_EXPENSE_CLAIM, ReimbursementSave).then((Result) => {
                                    if (Result.data.Status == 'Success') {
                                        this.onReimbursementSave()
                                        this.getReimbursement(reportNo)
                                    }
                                }).catch((Error) => {
                                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                                })
                            }
                            this.onUpload(reportNo, "save")
                        }
                        else if (this.state.reimbursementChange.length && this.state.otherExpenseChange.length) {
                            let otherExpenseData = "";
                            this.state.otherExpenseChange.map(res => {
                                otherExpenseData += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let otherExpenseSave = {
                                "Index": "OtherExpenseSave",
                                "Data": { "srno": reportNo, "data": otherExpenseData }
                            }
                            postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onOtherExpenseSave()
                                    this.getOtherExpense(reportNo)
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                            })
                            let reimbursementData = "";
                            this.state.reimbursementChange.map(res => {
                                let index = res.newId == "newly added" ? 0 : res.rowid;
                                reimbursementData += `${index}~${res.amount}~${res.description}#`
                            })
                            let ReimbursementSave = {
                                "Index": "ReimbursementSave",
                                "Data": { "srno": reportNo, "data": reimbursementData }
                            }
                            postToServer(URL_EXPENSE_CLAIM, ReimbursementSave).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    this.onReimbursementSave()
                                    this.getReimbursement(reportNo)
                                    this.setState({ spinner: false, showSuccess: true })
                                    setTimeout(function () {
                                        this.setState({ showSuccess: false, submitStatus: false });
                                        this.props.history.replace("/expenseclaimentry/" + "00" + "/" + "savedentry/" + reportNo)
                                        this.getDetails()
                                    }.bind(this), 2000);
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in Expense" })
                            })
                        }
                        else if (this.state.uploadImage.length) {
                            this.onUpload(reportNo, "save")
                        }
                    }
                    else if (this.state.otherExpenseChange.length) {
                        let otherExpenseData = "";
                        this.state.otherExpenseChange.map(res => {
                            otherExpenseData += `${res.code}~${res.amount}~${res.note}#`
                        })
                        let otherExpenseSave = {
                            "Index": "OtherExpenseSave",
                            "Data": { "srno": reportNo, "data": otherExpenseData }
                        }
                        postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onOtherExpenseSave()
                                this.getOtherExpense(reportNo)
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00" + "/" + "savedentry/" + reportNo)
                                    this.getDetails()
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                        })
                    }
                    else if (this.state.reimbursementChange.length) {
                        let reimbursementData = "";
                        this.state.reimbursementChange.map(res => {
                            let index = res.newId == "newly added" ? 0 : res.rowid;
                            reimbursementData += `${index}~${res.amount}~${res.description}#`
                        })
                        let ReimbursementSave = {
                            "Index": "ReimbursementSave",
                            "Data": { "srno": reportNo, "data": reimbursementData }
                        }
                        postToServer(URL_EXPENSE_CLAIM, ReimbursementSave).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.onReimbursementSave()
                                this.getReimbursement(reportNo)
                                this.setState({ spinner: false, showSuccess: true })
                                setTimeout(function () {
                                    this.setState({ showSuccess: false, submitStatus: false });
                                    this.props.history.replace("/expenseclaimentry/" + "00" + "/" + "savedentry/" + reportNo)
                                    this.getDetails()
                                }.bind(this), 2000);
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in Expense" })
                        })
                    }
                }
                else {
                    this.setState({ spinner: false, showSuccess: true })
                    setTimeout(function () {
                        this.setState({ showSuccess: false, submitStatus: false });
                        this.props.history.replace("/expenseclaimentry/" + "00" + "/" + "savedentry/" + reportNo)
                        this.getDetails()
                    }.bind(this), 2000);
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Expense save" })
        })
    }

    //on Expense save.
    onExpenseSave() {
        this.setState({ spinner: true })
        sessionStorage.setItem("approvalTab", "myexpense")
        let upperLimitFail = [];
        if (this.state.otherExpenses.length) {
            for (let i = 0; i < this.state.otherExpenses.length; i++) {
                if (this.state.otherExpenses[i].upperLimit != "--") {
                    if (parseInt(this.state.otherExpenses[i].amount) > parseInt(this.state.otherExpenses[i].upperLimit)) {
                        upperLimitFail.push({ name: this.state.otherExpenses[i].c_exp_heading });
                    }
                }
            }
            this.setState({ upperLimitHead: upperLimitFail })
        }
        if (this.state.claimLimit != "") {
            if (parseInt(this.state.claimLimit) != 0) {
                if (parseInt(sessionStorage.getItem("exp_Total")) > parseInt(this.state.claimLimit)) {
                    this.setState({ spinner: false, claimLimitCheck: true })
                }
                else {
                    if (!upperLimitFail.length) {
                        this.onLimitValidation()
                    }
                    else {
                        this.setState({ spinner: false, upperLimitCheck: true })
                    }
                }
            }
            else {
                if (!upperLimitFail.length) {
                    this.onLimitValidation()
                }
                else {
                    this.setState({ spinner: false, upperLimitCheck: true })
                }
            }
        }
        else {
            if (!upperLimitFail.length) {
                this.onLimitValidation()
            }
            else {
                this.setState({ spinner: false, upperLimitCheck: true })
            }
        }
    }

    //After validation of claim limit of submit button.
    onSubmitLimitValidation() {
        this.setState({ spinner: true })
        if (this.props.match.params.entryType == "newentry" || this.state.submitStatus == true) {
            let det = JSON.parse(JSON.stringify(this.state.expenseDetails));
            if (det.length) {
                det.map(res => {
                    if (res.dtt != "") {
                        let value = res.dtt.split("-").reverse().join("-");
                        res["dtt"] = value
                        if (this.state.visitTypes.length) {
                            this.state.visitTypes.map(ans => {
                                if (res.VisitType == ans.Name) {
                                    res["VisitType"] = ans.Code
                                }
                            })
                        }
                    }
                })
            }
            let Data;
            if (this.props.match.params.id.includes("-")) {
                let dates = this.props.match.params.id.split(',');
                Data = {
                    "claim_code": this.props.match.params.code,
                    "month": "",
                    "year": "",
                    "fromdate": dates[0],
                    "todate": dates[1],
                    "note": this.state.note1,
                    "claimtotal": sessionStorage.getItem("exp_Total").toString(),
                    "srno": ""
                }
            }
            else if (!this.props.match.params.id.includes(",")) {
                Data = {
                    "claim_code": "",
                    "month": "",
                    "year": "",
                    "fromdate": "",
                    "todate": "",
                    "note": this.state.note1,
                    "claimtotal": sessionStorage.getItem("exp_Total").toString(),
                    "srno": this.props.match.params.id
                }
            }
            else {
                let dates = this.props.match.params.id.split(',');
                Data = {
                    "claim_code": this.props.match.params.code,
                    "month": dates[0],
                    "year": dates[1],
                    "fromdate": "",
                    "todate": "",
                    "note": this.state.note1,
                    "claimtotal": sessionStorage.getItem("exp_Total").toString(),
                    "srno": ""
                }
            }
            let ExpenseSave = {
                "Index": "ExpenseSave",
                "det": det,
                "Data": Data
            }
            postToServer(URL_EXPENSE_CLAIM, ExpenseSave).then((Result) => {
                if (Result.data.Status == 'Success') {
                    let reportNo = Result.data.data[0].srno;
                    if (this.state.otherExpenseChange.length || this.state.reimbursementChange.length || this.state.uploadImage.length) {
                        if ((this.state.otherExpenseChange.length && this.state.reimbursementChange.length) || this.state.uploadImage.length) {
                            if ((this.state.otherExpenseChange.length && this.state.reimbursementChange.length) && this.state.uploadImage.length) {
                                let otherExpenseData = "";
                                let reimbursementData = "";
                                this.state.otherExpenseChange.map(res => {
                                    otherExpenseData += `${res.code}~${res.amount}~${res.note}#`
                                })
                                let otherExpenseSave = {
                                    "Index": "OtherExpenseSave",
                                    "Data": { "srno": reportNo, "data": otherExpenseData }
                                }
                                postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
                                    if (Result.data.Status == 'Success') {
                                        this.onOtherExpenseSave()
                                        this.getOtherExpense(reportNo)
                                    }
                                }).catch((Error) => {
                                    this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                                })
                                this.state.reimbursementChange.map(res => {
                                    let index = res.newId == "newly added" ? 0 : res.rowid;
                                    reimbursementData += `${index}~${res.amount}~${res.description}#`
                                })
                                let ReimbursementSave = {
                                    "Index": "ReimbursementSave",
                                    "Data": { "srno": reportNo, "data": reimbursementData }
                                }
                                postToServer(URL_EXPENSE_CLAIM, ReimbursementSave).then((Result) => {
                                    if (Result.data.Status == 'Success') {
                                        this.onReimbursementSave()
                                        this.getReimbursement(reportNo)
                                    }
                                }).catch((Error) => {
                                    this.setState({ Error: true, Errormsg: "Error in reimbursement" })
                                })
                                this.onUpload(reportNo, "submit")
                            }
                            else if ((this.state.otherExpenseChange.length || this.state.reimbursementChange.length) && this.state.uploadImage.length) {
                                if (this.state.otherExpenseChange.length && this.state.uploadImage.length) {
                                    let otherExpenseData = "";
                                    this.state.otherExpenseChange.map(res => {
                                        otherExpenseData += `${res.code}~${res.amount}~${res.note}#`
                                    })
                                    let otherExpenseSave = {
                                        "Index": "OtherExpenseSave",
                                        "Data": { "srno": reportNo, "data": otherExpenseData }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onOtherExpenseSave()
                                            this.getOtherExpense(reportNo)
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                                    })
                                    this.onUpload(reportNo, "submit")
                                }
                                else if (this.state.reimbursementChange.length && this.state.uploadImage.length) {
                                    let reimbursementData = "";
                                    this.state.reimbursementChange.map(res => {
                                        let index = res.newId == "newly added" ? 0 : res.rowid;
                                        reimbursementData += `${index}~${res.amount}~${res.description}#`
                                    })
                                    let ReimbursementSave = {
                                        "Index": "ReimbursementSave",
                                        "Data": { "srno": reportNo, "data": reimbursementData }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, ReimbursementSave).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onReimbursementSave()
                                            this.getReimbursement(reportNo)
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in Expense" })
                                    })
                                }
                                this.onUpload(reportNo, "submit")
                            }
                            else if (this.state.reimbursementChange.length && this.state.otherExpenseChange.length) {
                                let otherExpenseData = "";
                                this.state.otherExpenseChange.map(res => {
                                    otherExpenseData += `${res.code}~${res.amount}~${res.note}#`
                                })
                                let otherExpenseSave = {
                                    "Index": "OtherExpenseSave",
                                    "Data": { "srno": reportNo, "data": otherExpenseData }
                                }
                                postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
                                    if (Result.data.Status == 'Success') {
                                        this.onOtherExpenseSave()
                                        this.getOtherExpense(reportNo)
                                    }
                                }).catch((Error) => {
                                    this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                                })
                                let reimbursementData = "";
                                this.state.reimbursementChange.map(res => {
                                    let index = res.newId == "newly added" ? 0 : res.rowid;
                                    reimbursementData += `${index}~${res.amount}~${res.description}#`
                                })
                                let ReimbursementSave = {
                                    "Index": "ReimbursementSave",
                                    "Data": { "srno": reportNo, "data": reimbursementData }
                                }
                                postToServer(URL_EXPENSE_CLAIM, ReimbursementSave).then((Result) => {
                                    if (Result.data.Status == 'Success') {
                                        let expenseSubmit = {
                                            "Index": "expense_submit",
                                            "Data": { "srno": reportNo }
                                        }
                                        postToServer(URL_EXPENSE_CLAIM, expenseSubmit).then((Result) => {
                                            if (Result.data.Status == 'Success') {
                                                this.onReimbursementSave()
                                                this.getReimbursement(reportNo)
                                                this.setState({ spinner: false, submitSuccess: true })
                                            }
                                        }).catch((Error) => {
                                            this.setState({ Error: true, Errormsg: "Error in submit Expense" })
                                        })
                                    }
                                }).catch((Error) => {
                                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                                })
                            }
                            else if (this.state.uploadImage.length) {
                                this.onUpload(reportNo, "submit")
                            }
                        }
                        else if (this.state.otherExpenseChange.length) {
                            let otherExpenseData = "";
                            this.state.otherExpenseChange.map(res => {
                                otherExpenseData += `${res.code}~${res.amount}~${res.note}#`
                            })
                            let otherExpenseSave = {
                                "Index": "OtherExpenseSave",
                                "Data": { "srno": reportNo, "data": otherExpenseData }
                            }
                            postToServer(URL_EXPENSE_CLAIM, otherExpenseSave).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let expenseSubmit = {
                                        "Index": "expense_submit",
                                        "Data": { "srno": reportNo }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, expenseSubmit).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onOtherExpenseSave()
                                            this.getOtherExpense(reportNo)
                                            this.setState({ spinner: false, submitSuccess: true })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in submit Expense" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in other Expense save" })
                            })
                        }
                        else if (this.state.reimbursementChange.length) {
                            let reimbursementData = "";
                            this.state.reimbursementChange.map(res => {
                                let index = res.newId == "newly added" ? 0 : res.rowid;
                                reimbursementData += `${index}~${res.amount}~${res.description}#`
                            })
                            let ReimbursementSave = {
                                "Index": "ReimbursementSave",
                                "Data": { "srno": reportNo, "data": reimbursementData }
                            }
                            postToServer(URL_EXPENSE_CLAIM, ReimbursementSave).then((Result) => {
                                if (Result.data.Status == 'Success') {
                                    let expenseSubmit = {
                                        "Index": "expense_submit",
                                        "Data": { "srno": reportNo }
                                    }
                                    postToServer(URL_EXPENSE_CLAIM, expenseSubmit).then((Result) => {
                                        if (Result.data.Status == 'Success') {
                                            this.onReimbursementSave()
                                            this.getReimbursement(reportNo)
                                            this.setState({ spinner: false, submitSuccess: true })
                                        }
                                    }).catch((Error) => {
                                        this.setState({ Error: true, Errormsg: "Error in submit Expense" })
                                    })
                                }
                            }).catch((Error) => {
                                this.setState({ Error: true, Errormsg: "Error in reimbursement" })
                            })
                        }
                    }
                    else {
                        let expenseSubmit = {
                            "Index": "expense_submit",
                            "Data": { "srno": reportNo }
                        }
                        postToServer(URL_EXPENSE_CLAIM, expenseSubmit).then((Result) => {
                            if (Result.data.Status == 'Success') {
                                this.setState({ spinner: false, submitSuccess: true })
                            }
                        }).catch((Error) => {
                            this.setState({ Error: true, Errormsg: "Error in submit Expense" })
                        })
                    }
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Expense save" })
            })
        }
        else {
            let expenseSubmit = {
                "Index": "expense_submit",
                "Data": { "srno": this.props.match.params.id }
            }
            postToServer(URL_EXPENSE_CLAIM, expenseSubmit).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ spinner: false, submitSuccess: true })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in submit Expense" })
            })
        }
    }

    //on click function of submit.
    onSubmit() {
        this.setState({ spinner: true })
        sessionStorage.setItem("approvalTab", "myexpense")
        let upperLimitFail = [];
        if (this.state.otherExpenses.length) {
            for (let i = 0; i < this.state.otherExpenses.length; i++) {
                if (this.state.otherExpenses[i].upperLimit != "--") {
                    if (parseInt(this.state.otherExpenses[i].amount) > parseInt(this.state.otherExpenses[i].upperLimit)) {
                        upperLimitFail.push({ name: this.state.otherExpenses[i].c_exp_heading });
                    }
                }
            }
            this.setState({ upperLimitHead: upperLimitFail })
        }
        if (this.state.claimLimit != "") {
            if (parseInt(this.state.claimLimit) != 0) {
                if (parseInt(sessionStorage.getItem("exp_Total")) > parseInt(this.state.claimLimit)) {
                    this.setState({ spinner: false, claimLimitCheck: true })
                }
                else {
                    if (!upperLimitFail.length) {
                        this.onSubmitLimitValidation()
                    }
                    else {
                        this.setState({ spinner: false, upperLimitCheck: true })
                    }
                }
            }
            else {
                if (!upperLimitFail.length) {
                    this.onSubmitLimitValidation()
                }
                else {
                    this.setState({ spinner: false, upperLimitCheck: true })
                }
            }
        }
        else {
            if (!upperLimitFail.length) {
                this.onSubmitLimitValidation()
            }
            else {
                this.setState({ spinner: false, upperLimitCheck: true })
            }
        }
    }

    //onClick of submit popup done button.
    submitDone() {
        this.setState({ submitSuccess: false })
        this.props.history.goBack()
    }

    //onclick outside the modal for submit popup.
    submitSuccess() {
        this.setState({ submitSuccess: true })
    }

    //function to show success popup.
    onShowSuccess() {
        this.setState({ showSuccess: true })
        setTimeout(function () {
            this.setState({ showSuccess: false });
        }.bind(this), 2000);
    }

    //onclick outside the modal for success popup.
    onSuccess() {
        this.setState({ showSuccess: false })
    }

    //onclick outside the modal for approval popup.
    approvalSuccess() {
        this.setState({ approvalSuccess: true })
    }

    //onclick outside the modal for confirm popup.
    confirmationSuccess() {
        this.setState({ confirmationSuccess: true })
    }

    //on success of Other Expense save.
    onOtherExpenseSave() {
        this.setState({ otherExpenseChange: [], submitStatus: false })
    }

    //on success of reimbursement save.
    onReimbursementSave() {
        this.setState({ reimbursementChange: [], submitStatus: false })
    }

    //on success of additional expense save.
    onAdditionalExpenseSave() {
        this.setState({ additionalExpenseChange: [], submitStatus: false })
    }

    //on success of sup mer details save.
    onSupMerSave() {
        this.setState({ supmerDetailsChange: [], submitStatus: false })
    }

    //change the value in expense details.
    onExpenseChange(value, category, id) {
        let list = this.state.expenseDetails;
        list.map(res => {
            if (res.dtt == id) {
                res[category] = value
            }
        })
        this.setState({ expenseDetails: list, submitStatus: true })
        this.getExpenseTotal()
    }

    //To get the total of expense.
    getExpenseTotal() {
        let Total = [];
        let expenseTotal = 0;
        let appExpenseTotal = 0;
        let conExpenseTotal = 0;
        this.state.alterHeader.map((res) => {
            if (res.headerName.includes("Remark") || res.headerName.includes("Note")) {
                Total.push({ total: "remark", name: res.headerName })
            }
            else {
                let index = 0;
                for (let i = 0; i < this.state.expenseDetails.length; i++) {
                    index += parseFloat(this.state.expenseDetails[i][res.headerName])
                }
                Total.push({ total: index, name: res.headerName })
            }
        })
        if (this.state.entryType.length) {
            if (this.state.expenseDetails.length) {
                if (this.state.entryType[0].approved == "notApproved" && this.state.entryType[0].confirmed == "notConfirmed") {
                    Total.map(res => {
                        if (res.total != "remark") {
                            expenseTotal += parseFloat(res.total)
                        }
                    })
                }
                else if (this.state.entryType[0].confirmed == "notConfirmed") {
                    Total.map(res => {
                        if (res.total != "remark") {
                            if (res.name.includes("App'd")) {
                                appExpenseTotal += parseFloat(res.total)
                            }
                            else {
                                expenseTotal += parseFloat(res.total)
                            }
                        }
                    })
                }
                else {
                    Total.map(res => {
                        if (res.total != "remark") {
                            if (res.name.includes("App'd")) {
                                appExpenseTotal += parseFloat(res.total)
                            }
                            else if (res.name.includes("Conf'd")) {
                                conExpenseTotal += parseFloat(res.total)
                            }
                            else {
                                expenseTotal += parseFloat(res.total)
                            }
                        }
                    })
                }
            }
        }
        this.setState({
            expenseTotal: expenseTotal,
            appExpenseTotal: appExpenseTotal,
            conExpenseTotal: conExpenseTotal
        })
    }

    //To get the total of other expense.
    getOtherExpenseTotal(total1, total2, total3) {
        // let otherExpenseTotal = 0;
        // let approvedOtherExpenseTotal = 0;
        // let confirmedOtherExpenseTotal = 0;
        // if (this.state.entryType.length) {
        //     if (this.state.otherExpenses.length) {
        //         // for (let i = 0; i < this.state.otherExpenses.length; i++) {
        //         //     otherExpenseTotal += parseFloat(this.state.otherExpenses[i].amount)
        //         // }
        //         if (this.state.entryType[0].approved == "approved" && this.state.entryType[0].confirmed != "confirmed") {
        //             for (let i = 0; i < this.state.otherExpenses.length; i++) {
        //                 otherExpenseTotal += parseFloat(this.state.otherExpenses[i].amount)
        //                 approvedOtherExpenseTotal += parseFloat(this.state.otherExpenses[i]["App'd Amount"])
        //             }
        //         }
        //         else if (this.state.entryType[0].confirmed == "confirmed") {
        //             for (let i = 0; i < this.state.otherExpenses.length; i++) {
        //                 otherExpenseTotal += parseFloat(this.state.otherExpenses[i].amount)
        //                 approvedOtherExpenseTotal += parseFloat(this.state.otherExpenses[i]["App'd Amount"])
        //                 confirmedOtherExpenseTotal += parseFloat(this.state.otherExpenses[i]["conf'd Amount"])
        //             }
        //         }
        //         else {
        //             for (let i = 0; i < this.state.otherExpenses.length; i++) {
        //                 otherExpenseTotal += parseFloat(this.state.otherExpenses[i].amount)
        //             }
        //         }
        //     }
        // }
        // this.setState({
        //     otherExpenseTotal: total1,
        //     approvedOtherExpenseTotal: total2,
        //     confirmedOtherExpenseTotal: total3
        // })
    }

    //To get the total of reimbursement.
    getReimbursementTotal() {
        // let reimbursementTotal = 0;
        // let approvedReimbursementTotal = 0;
        // let confirmedReimbursementTotal = 0;
        // if (this.state.entryType.length) {
        //     if (this.state.reimbursement.length) {
        //         // for (let i = 0; i < this.state.reimbursement.length; i++) {
        //         //     reimbursementTotal += parseFloat(this.state.reimbursement[i]["Amount"])
        //         // }
        //         if (this.state.entryType[0].approved == "approved" && this.state.entryType[0].confirmed != "confirmed") {
        //             for (let i = 0; i < this.state.reimbursement.length; i++) {
        //                 approvedReimbursementTotal += parseFloat(this.state.reimbursement[i]["App'd Amount"])
        //                 reimbursementTotal += parseFloat(this.state.reimbursement[i]["Amount"])
        //             }
        //         }
        //         else if (this.state.entryType[0].confirmed == "confirmed") {
        //             for (let i = 0; i < this.state.reimbursement.length; i++) {
        //                 approvedReimbursementTotal += parseFloat(this.state.reimbursement[i]["App'd Amount"])
        //                 reimbursementTotal += parseFloat(this.state.reimbursement[i]["Amount"])
        //                 confirmedReimbursementTotal += parseFloat(this.state.reimbursement[i]["conf'd Amount"])
        //             }
        //         }
        //         else {
        //             for (let i = 0; i < this.state.reimbursement.length; i++) {
        //                 reimbursementTotal += parseFloat(this.state.reimbursement[i]["Amount"])
        //             }
        //         }
        //     }
        // }
        // this.setState({
        //     reimbursementTotal: reimbursementTotal,
        //     approvedReimbursementTotal: approvedReimbursementTotal,
        //     confirmedReimbursementTotal: confirmedReimbursementTotal
        // })
    }

    //To get the expense grand total.
    // getGrandTotal(status) {
    //     if (status == "notApproved") {
    //         let total = this.state.expenseTotal + this.state.otherExpenseTotal + this.state.reimbursementTotal;
    //         this.setState({ expenseGrandTotal: total })
    //     }
    //     else if (status == "approved") {
    //         let total = this.state.expenseTotal + this.state.otherExpenseTotal + this.state.reimbursementTotal;
    //         let appTotal = this.state.appExpenseTotal +
    //             this.state.approvedOtherExpenseTotal +
    //             this.state.approvedReimbursementTotal;
    //         this.setState({ expenseGrandTotal: total, appExpenseGrandTotal: appTotal })
    //     }
    //     else if (status == "confirmed") {
    //         let total = this.state.expenseTotal + this.state.otherExpenseTotal + this.state.reimbursementTotal;
    //         let appTotal = this.state.appExpenseTotal +
    //             this.state.approvedOtherExpenseTotal +
    //             this.state.approvedReimbursementTotal;
    //         let conTotal = this.state.conExpenseTotal +
    //             this.state.confirmedOtherExpenseTotal +
    //             this.state.confirmedReimbursementTotal;
    //         this.setState({
    //             expenseGrandTotal: total,
    //             appExpenseGrandTotal: appTotal,
    //             conExpenseGrandTotal: conTotal
    //         })
    //     }
    // }

    //onclick outside the claim limit modal.
    claimLimitCheck() {
        this.setState({ claimLimitCheck: true })
    }

    //onclick of ok button in claim limit modal.
    onClaimOk() {
        this.setState({ claimLimitCheck: false })
    }

    //onclick outside the upper limit modal.
    upperLimitCheck() {
        this.setState({ upperLimitCheck: true })
    }

    //onclick of ok button in upper limit modal.
    onLimitOk() {
        this.setState({ upperLimitCheck: false, activeTab: "other", upperLimitHead: [] })
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.expenseDetails.length != this.state.expenseDetails.length) ||
            (prevState.alterHeader.length != this.state.alterHeader.length) ||
            // (prevState.otherExpenses.length != this.state.otherExpenses.length) ||
            (prevState.entryType.length != this.state.entryType.length)
            // (prevState.reimbursement.length != this.state.reimbursement.length)
        ) {
            this.getExpenseTotal()
        }
        // if ((prevState.otherExpenses.length != this.state.otherExpenses.length) ||
        //     (prevState.entryType.length != this.state.entryType.length)) {
        //     this.getOtherExpenseTotal()
        // }
        // if ((prevState.entryType.length != this.state.entryType.length) ||
        //     (prevState.reimbursement.length != this.state.reimbursement.length)) {
        //     this.getReimbursementTotal()
        // }
        // if ((prevState.expenseTotal != this.state.expenseTotal) ||
        //     (prevState.otherExpenseTotal != this.state.otherExpenseTotal) ||
        //     (prevState.entryType.length != this.state.entryType.length) ||
        //     (prevState.reimbursementTotal != this.state.reimbursementTotal)) {
        //     this.getGrandTotal("notApproved")
        // }
        // if ((prevState.approvedOtherExpenseTotal != this.state.approvedOtherExpenseTotal) ||
        //     (prevState.appExpenseTotal != this.state.appExpenseTotal) ||
        //     (prevState.entryType.length != this.state.entryType.length) ||
        //     (prevState.approvedReimbursementTotal != this.state.approvedReimbursementTotal)) {
        //     this.getGrandTotal("approved")
        // }
        // if ((prevState.confirmedOtherExpenseTotal != this.state.confirmedOtherExpenseTotal) ||
        //     (prevState.confirmedReimbursementTotal != this.state.confirmedReimbursementTotal) ||
        //     (prevState.entryType.length != this.state.entryType.length) ||
        //     (prevState.conExpenseTotal != this.state.conExpenseTotal)) {
        //     this.getGrandTotal("confirmed")
        // }
        if (prevState.expenseDetails.length != this.state.expenseDetails.length) {
            if (this.state.expenseDetails.length) {
                let months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"]
                let dateDetails = this.state.expenseDetails;
                let date = dateDetails[0].dtt;
                let dates = date.split('-');
                this.setState({ year: dates[2], month: months[parseInt(dates[1]) - 1] })
            }
        }
        if (prevState.empDet4 != this.state.empDet4) {
            if (this.state.empDet4 != "" && this.state.empDet4 != undefined) {
                let months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"]
                let dateDetails = this.state.empDet4.split(' To ')
                let dates = dateDetails[0].split('-');
                this.setState({
                    year: dates[2],
                    month: months[parseInt(dates[1]) - 1],
                    fromDate: dateDetails[0],
                    toDate: dateDetails[1]
                })
            }
        }
    }

    //To get the details of other expense.
    getOtherExpense(id) {
        let otherExpense = {
            "Index": "OtherExpenseList",
            "Data": {
                "srno": id,
                "claim_code": "",
                "month": "",
                "year": "",
                "fromdate": "",
                "todate": ""
            }
        }
        postToServer(URL_EXPENSE_CLAIM, otherExpense).then((Result) => {
            let otherData = []
            let otherExpenseData = []
            if (Result.data.Status == 'Success') {
                otherData = Result.data.data
                let expenseDetail = {
                    "Index": "ExpenseDetail",
                    "Data": { "srno": this.props.match.params.id },
                }
                postToServer(URL_EXPENSE_CLAIM, expenseDetail).then((res) => {
                    if (res.data.Status == 'Success') {
                        otherData.map(list => {
                            res.data.c_OtherFlag.map(li => {
                                if (list.c_exp_code == li.c_code) {
                                    otherExpenseData.push({
                                        Remark: list.Remark,
                                        amount: list.amount,
                                        c_exp_code: list.c_exp_code,
                                        c_exp_heading: list.c_exp_heading,
                                        upper_limit: list.n_upper_limit,
                                        upperLimit: li.Visible_Status != 1 ? li.LimitCheck == "0" ? "--" : list.n_upper_limit : "--",
                                        srno: "",
                                        editable: li.Visible_Status,
                                        "App'd Amount": list["App'd Amount"],
                                        "App'l Remark": list["App'l Remark"],
                                        "Conf'd Amount": list["Conf'd Amount"],
                                        "Conf'n Remark": list["Conf'n Remark"]
                                    })
                                }
                            })
                        })
                    }
                    this.setState({ otherExpenses: otherExpenseData })
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Expense" })
                })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in other Expense" })
        })
    }

    //To get the details of reimbursement.
    getReimbursement(id) {
        let reimbursement = {
            "Index": "ReimbursementView",
            "Data": { "srno": id },
        }
        postToServer(URL_EXPENSE_CLAIM, reimbursement).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ reimbursement: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Expense" })
        })
    }

    render() {
        let doneBtn = <div className="ece-modal-button-group">
            <Button className="done-button" onClick={this.approvalDone}>
                <div className="button-text">Done</div>
            </Button>
        </div>
        let confirmDoneBtn = <div className="ece-modal-button-group">
            <Button className="done-button" onClick={this.confirmDone}>
                <div className="button-text">Done</div>
            </Button>
        </div>
        let subDoneBtn = <div className="ece-modal-button-group">
            <Button className="done-button" onClick={this.submitDone}>
                <div className="button-text">Done</div>
            </Button>
        </div>
        let claimLimitOkBtn = <div className="ece-modal-button-group">
            <Button className="done-button ok-claim-btn" onClick={this.onClaimOk}>
                <div className="button-text">OK</div>
            </Button>
        </div>
        let claimLimitText = <div className="limit-text">
            claim amount should not exceed - {this.state.claimLimit}
        </div>
        let upperLimitOkBtn = <div className="ece-modal-button-group">
            <Button className="done-button" onClick={this.onLimitOk}>
                <div className="button-text">OK</div>
            </Button>
        </div>
        let upperLimitText = <div className="limit-text">
            {this.state.upperLimitHead.length ?
                this.state.upperLimitHead[0].name + " amount should not be greater than upper limit"
                : ""}
        </div>
        let warMsgTxt = <div className="limit-text">
            {this.state.warMsgName}
        </div>
        let warMsgBtnGrp = <div className="war_btn_grp">
            <Button className="cancel-button" onClick={this.onWarMsgCancel}>
                <div className="button-text">Cancel</div>
            </Button>
            <Button className="ok-button" onClick={this.onWarMsgCon}>
                <div className="button-text">OK</div>
            </Button>
        </div>
        let warnMsgTxt = <div className="limit-text">
            {this.state.warMsgName}
        </div>
        let warnMsgBtnGrp = <div className="war_btn_grp">
            <Button className="cancel-button" onClick={this.onWarnMsgCancel}>
                <div className="button-text">Cancel</div>
            </Button>
            <Button className="ok-button" onClick={this.onWarnMsgCon}>
                <div className="button-text">OK</div>
            </Button>
        </div>
        let successText = this.state.submitModal == "3" ?
            <div className="expense-success-msg">Uploaded successfully !</div> :
            <div className="expense-success-msg">Saved successfully !</div>
        let approvalText = <div>
            <div className="expense-approval-msg">You have approved</div>
            <div className="expense-approval-sub-div">
                Expense Report of&nbsp;
                <span className="fs-name">{this.state.fsName}</span>
                &nbsp;for&nbsp;{this.state.month},&nbsp;{this.state.year}.
            </div>
        </div>
        let confirmationText = <div>
            <div className="expense-approval-msg">
                {this.props.match.params.entryType == "confirmation" ?
                    "You have confirmed" : "You have Reconfirmed"}
            </div>
            <div className="expense-approval-sub-div">
                Expense Report of&nbsp;
            <span className="fs-name">{this.state.empDet1.toLowerCase()}</span>
                &nbsp;for&nbsp;{this.state.month},&nbsp;{this.state.year}.
            </div>
        </div>
        let submitText = <div>
            <div className="expense-approval-msg">You have Submitted</div>
            <div className="expense-approval-sub-div">
                Expense Report&nbsp;
            for&nbsp;{this.state.month},&nbsp;{this.state.year}.
        </div>
        </div>
        let subContent = <div className="sub-content">
            <Link
                to={localStorage.getItem("type") == 1 ?
                    "/dashboard" : localStorage.getItem("type") == 2 ? "/mdashboard"
                        : localStorage.getItem('type') == 3 ? "/adashboard" : null}
            ><span>Dashboard</span></Link>&nbsp;
            <Link to="/expenseclaimlist"><span>
                /&nbsp;
                {this.props.match.params.entryType == "approval" ?
                    "Expense Downline Approval List" : this.props.match.params.entryType == "confirmation" ?
                        "Expense Confirmation List" : this.props.match.params.entryType == "reconfirmation" ?
                            "Expense Reconfirmation List" : "Expense Claim List"}
            </span></Link>&nbsp;
            /&nbsp;{this.props.match.params.entryType == "approval" ?
                "Expense Claim Approval" : this.props.match.params.entryType == "confirmation" ?
                    "Expense Claim Confirmation" : this.props.match.params.entryType == "reconfirmation" ?
                        "Expense Claim Reconfirmation" : "Expense Claim Entry"}</div>
        return (
            <div className="dashboard-sec " >
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="ece-template">
                            <SfaModal
                                show={this.state.showSuccess}
                                imagePath={"../../../public/assets/images/submitplan.svg"}
                                onHide={this.onSuccess}
                                subDiv={successText}
                                size="sm"
                            />
                            <SfaModal
                                show={this.state.approvalSuccess}
                                imagePath={"../../../public/assets/images/submitplan.svg"}
                                onHide={this.approvalSuccess}
                                subDiv={approvalText}
                                buttonGroup={doneBtn}
                            />
                            <SfaModal
                                show={this.state.confirmationSuccess}
                                imagePath={"../../../public/assets/images/submitplan.svg"}
                                onHide={this.confirmationSuccess}
                                subDiv={confirmationText}
                                buttonGroup={confirmDoneBtn}
                            />
                            <SfaModal
                                show={this.state.claimLimitCheck}
                                imagePath={"../../../public/assets/images/danger.svg"}
                                onHide={this.claimLimitCheck}
                                subDiv={claimLimitText}
                                buttonGroup={claimLimitOkBtn}
                            />
                            <SfaModal
                                show={this.state.warMsgCheck}
                                imagePath={"../../../public/assets/images/danger.svg"}
                                onHide={this.onWarMsgCheck}
                                subDiv={warMsgTxt}
                                buttonGroup={warMsgBtnGrp}
                            />
                            <SfaModal
                                show={this.state.warnMsgCheck}
                                imagePath={"../../../public/assets/images/danger.svg"}
                                onHide={this.onWarnMsgCheck}
                                subDiv={warnMsgTxt}
                                buttonGroup={warnMsgBtnGrp}
                            />
                            <SfaModal
                                show={this.state.upperLimitCheck}
                                imagePath={"../../../public/assets/images/danger.svg"}
                                onHide={this.upperLimitCheck}
                                subDiv={upperLimitText}
                                buttonGroup={upperLimitOkBtn}
                            />
                            <SfaModal
                                show={this.state.submitSuccess}
                                imagePath={"../../../public/assets/images/submitplan.svg"}
                                onHide={this.submitSuccess}
                                subDiv={submitText}
                                buttonGroup={subDoneBtn}
                            />
                            {this.state.spinner == true &&
                                <SfaSpinner />
                            }
                            <Breadcrumbs
                                content={this.props.match.params.entryType == "approval" ?
                                    "Expense Claim Approval" : this.props.match.params.entryType == "confirmation" ?
                                        "Expense Claim Confirmation" : this.props.match.params.entryType == "reconfirmation" ?
                                            "Expense Claim Reconfirmation" : "Expense Claim Entry"}
                                subContent={subContent}
                            />
                            <EmployeeDetails
                                mainFlag={this.state.mainFlag}
                                fromDate={this.state.expenseDetails.length ? this.state.expenseDetails[0].dtt : this.state.fromDate}
                                toDate={this.state.expenseDetails.length ? this.state.expenseDetails[this.state.expenseDetails.length - 1].dtt : this.state.toDate}
                                entryType={this.state.entryType.length ? this.state.entryType : []}
                                empDet1={this.state.empDet1}
                                empDet2={this.state.empDet2}
                                empDet3={this.state.empDet3}
                                note1={this.state.note1}
                                note2={this.state.note2}
                                note3={this.state.note3}
                                onNoteChange={this.onNoteChange}
                                year={this.state.year}
                                month={this.state.month}
                                apprStatus={this.state.apprStatus}
                                alterHeader={this.state.alterHeader}
                            />
                            <div className="claim-list-tabs-container">
                                <Tabs
                                    activeKey={this.state.activeTab}
                                    onSelect={(e) => this.onTabChange(e)}
                                    className="claim-list-tabs entry-template"
                                >
                                    <Tab
                                        eventKey="details"
                                        title="Expense Details"
                                    >
                                        <ExpenseDetails
                                            constHeader={this.state.constHeader}
                                            alterHeader={this.state.alterHeader}
                                            expenseDetails={this.state.expenseDetails}
                                            entryType={this.state.entryType}
                                            onExpenseChange={this.onExpenseChange}
                                            mainFlag={this.state.mainFlag}
                                            detailedFlag={this.state.detailedFlag}
                                            onExpenseSave={this.onExpenseSave}
                                            expenseTotal={this.state.expenseTotal}
                                            appExpenseTotal={this.state.appExpenseTotal}
                                            conExpenseTotal={this.state.conExpenseTotal}
                                            onSubmit={this.onSubmit}
                                            visitTypes={this.state.visitTypes}
                                            approvedFlags={this.state.approvedFlags}
                                            confirmationFlags={this.state.confirmationFlags}
                                            onApprove={this.onApprove}
                                            year={this.state.year}
                                            month={this.state.month}
                                            onAdminSave={this.onAdminSave}
                                            onAdminConfirm={this.onAdminConfirm}
                                            fromDate={this.state.fromDate}
                                            toDate={this.state.toDate}
                                            printSubmit={this.state.printSubmit}
                                            approvalDays={this.state.approvalDays}
                                            apprStatus={this.state.apprStatus}
                                        />
                                    </Tab>
                                    <Tab
                                        eventKey="other"
                                        title="Other Expenses"
                                    >
                                        <OtherExpenses
                                            otherExpenseStatus={this.state.otherExpenseStatus}
                                            reimbursementStatus={this.state.reimbursementStatus}
                                            alterHeader={this.state.alterHeader}
                                            entryType={this.state.entryType}
                                            otherExpenses={this.state.otherExpenses}
                                            reimbursement={this.state.reimbursement}
                                            getOtherExpense={this.getOtherExpense}
                                            getReimbursement={this.getReimbursement}
                                            mainFlag={this.state.mainFlag}
                                            onOtherExpenseChange={this.onOtherExpenseChange}
                                            otherExpenseChange={this.state.otherExpenseChange}
                                            reimbursementChange={this.state.reimbursementChange}
                                            onOtherExpenseSave={this.onOtherExpenseSave}
                                            onReimbursementSave={this.onReimbursementSave}
                                            expenseTotal={this.state.expenseTotal}
                                            appExpenseTotal={this.state.appExpenseTotal}
                                            conExpenseTotal={this.state.conExpenseTotal}
                                            onShowSuccess={this.onShowSuccess}
                                            confirmSaveStatus={this.state.confirmSaveStatus}
                                            additionalExpense={this.state.additionalExpense}
                                            additionalExpenseStatus={this.state.additionalExpenseStatus}
                                            supmerDetails={this.state.supmerDetails}
                                            addDetailRow={this.addDetailRow}
                                            onDetailDelete={this.onDetailDelete}
                                            addRow={this.addRow}
                                            onDelete={this.onDelete}
                                            editRequired={this.state.editRequired}
                                            supmerDetailsStatus={this.state.supmerDetailsStatus}
                                            apprStatus={this.state.apprStatus}
                                        />
                                    </Tab>
                                    <Tab
                                        eventKey="upload"
                                        title={this.state.entryType.length ? this.state.entryType[0].approved == "notApproved" ? "Upload Bills" : "Uploaded Bills" : "Upload Bills"}
                                    >
                                        <UploadBills
                                            entryType={this.state.entryType}
                                            uploadedImages={this.state.uploadedImages}
                                            onImages={this.onImages}
                                            onUpload={this.onUpload}
                                        />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ECETemplate;