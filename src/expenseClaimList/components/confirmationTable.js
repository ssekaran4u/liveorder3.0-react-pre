import React, { Component } from "react";
import SfaDatatable from '../../BasicComponet/dataTable';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import "../../../public/assets/css/expenseClaimList.css";
import TextArea from "../../BasicComponet/textArea";
import Textfield from "../../BasicComponet/textfield";
import { postToServer } from "../.././lib/comm-utils";
import { URL_EXPENSE_CLAIM } from "../.././lib/constants";
import Col from "react-bootstrap/Col";
import SfaDatePicker from "../../BasicComponet/sfaDatePicker";

class ConfirmationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            showPopUp: false,
            reportNo: "",
            beneficiary: "",
            chequeNo: "",
            details: "",
            amount: "",
            date: null,
            dateErr: "",
            detailErr: "",
            beneficiaryErr: "",
            chequeNoErr: "",
            amtErr: "",
            disable: false,
            bankName: ""
        }
        this.handleView = this.handleView.bind(this)
        this.showPopUp = this.showPopUp.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.onBenificiary = this.onBenificiary.bind(this)
        this.onDetailChange = this.onDetailChange.bind(this)
        this.onAmtChange = this.onAmtChange.bind(this)
        this.onChequeNo = this.onChequeNo.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onHide = this.onHide.bind(this)
    }

    onSave() {
        if (this.state.date == null ||
            this.state.beneficiary == "" ||
            this.state.details == "" ||
            this.state.chequeNo == "" ||
            this.state.amount == "") {
            if (this.state.date == null) {
                this.setState({ dateErr: "This field can not be blank !" })
            }
            if (this.state.beneficiary == "") {
                this.setState({ beneficiaryErr: "This field can not be blank !" })
            }
            if (this.state.details == "") {
                this.setState({ detailErr: "This field can not be blank !" })
            }
            if (this.state.chequeNo == "") {
                this.setState({ chequeNoErr: "This field can not be blank !" })
            }
            if (this.state.amount == "") {
                this.setState({ amtErr: "This field can not be blank !" })
            }
        }
        else {
            let dateFormat = require('dateformat');
            let dateValue = dateFormat(this.state.date, "isoDate");
            let ben_details_save = {
                "Index": "BeneficiarySave",
                "Data": {
                    "srno": this.state.reportNo,
                    "beneficiary": this.state.beneficiary,
                    "chequeno": this.state.chequeNo,
                    "details": this.state.details,
                    "date": dateValue,
                    "amount": this.state.amount,
                    "status": "1"
                }
            }
            postToServer(URL_EXPENSE_CLAIM, ben_details_save).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({
                        showPopUp: false,
                        dateErr: "",
                        detailErr: "",
                        beneficiaryErr: "",
                        chequeNoErr: "",
                        amtErr: "",
                    })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in expense benificiary detail save api" })
            })
        }
    }

    onBenificiary(value) {
        this.setState({
            beneficiaryErr: "",
            beneficiary: value
        })
    }

    onDetailChange(value) {
        this.setState({
            detailErr: "",
            details: value
        })
    }

    onAmtChange(value) {
        this.setState({
            amtErr: "",
            amount: value
        })
    }

    onChequeNo(value) {
        this.setState({
            chequeNoErr: "",
            chequeNo: value
        })
    }

    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }

    showPopUp(no) {
        let ben_details = {
            "Index": "BeneficiaryList",
            "Data": { "srno": no.props.children.props.children }
        }
        postToServer(URL_EXPENSE_CLAIM, ben_details).then((Result) => {
            if (Result.data.Status == 'Success') {
                if (Result.data.bankname.length) {
                    this.setState({ bankName: Result.data.bankname[0].BankName })
                }
                if (Result.data.flag[0].Status == "1" || Result.data.flag[0].Status == "2") {
                    this.setState({
                        disable: true,
                        beneficiary: Result.data.data[0].Beneficiary,
                        amount: Result.data.data[0].PaymentAmount,
                        chequeNo: Result.data.data[0].PaymentChequeNo,
                        details: Result.data.data[0].PaymentDetails,
                        date: new Date(Result.data.data[0].PaymentDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
                    })
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in expense benificiary detail" })
        })
        this.setState({ reportNo: no.props.children.props.children, showPopUp: true })
    }

    onHide() {
        this.setState({ showPopUp: true })
    }

    closeModal() {
        this.setState({
            date: null,
            details: "",
            chequeNo: "",
            amount: "",
            beneficiary: "",
            dateErr: "",
            detailErr: "",
            beneficiaryErr: "",
            chequeNoErr: "",
            amtErr: "",
            showPopUp: false
        })
    }

    onDateChange(selectedDate) {
        this.setState({ dateErr: "", date: selectedDate })
    }

    render() {
        const header = [
            { prop: 'reportNo', title: 'Report No.', filterable: true },
            { prop: 'empCode', title: 'Emp Code', filterable: true },
            { prop: 'empName', title: 'Emp Name', filterable: true, sortable: true },
            { prop: 'designation', title: 'Designation', filterable: true, sortable: true },
            { prop: 'frDate', title: 'Date(From)', filterable: true },
            { prop: 'toDate', title: 'Date(To)', filterable: true },
            { prop: 'region', title: 'Region', sortable: true, filterable: true },
            { prop: 'area', title: 'Area', sortable: true, filterable: true },
            { prop: 'division', title: 'Division', sortable: true, filterable: true },
            { prop: 'deskName', title: 'Desk Name', filterable: true },
            { prop: 'approvedOn', title: 'Approved On', filterable: true },
            { prop: 'confirmedOn', title: 'Confirmed On', filterable: true },
            { prop: 'addBenificiary', title: 'Add Beneficiary Details' }
        ];
        var body = []
        if (this.props.confirmationList != undefined) {
            this.props.confirmationList.map((list) => {
                body.push({
                    reportNo: list["n_srno"],
                    empCode: list["c_emp_code"],
                    empName: list["empname"],
                    designation: list["desig"],
                    frDate: list["frdate"],
                    toDate: list["todate"],
                    region: list["reg"],
                    area: list["areaname"],
                    division: list["div"],
                    deskName: list["desk"],
                    approvedOn: list["appDate"] == "" ? "--" : list["appDate"],
                    confirmedOn: list["cnfDate"] == "" ? "--" : list["cnfDate"],
                    addBenificiary: list["cnfDate"] == "" ? "" : list["cnfDate"],
                })
            })

            body.map((res) => {
                if (res.reportNo != "") {
                    res.reportNo =
                        <div>
                            <Link to={"/expenseclaimentry/" + "00/" + "confirmation/" + res.reportNo}>
                                {res.reportNo}
                            </Link>
                        </div>
                }
                if (res.addBenificiary != "") {
                    res.addBenificiary = <div className="img-center-aligned">
                        <img onClick={() => this.showPopUp(res.reportNo)} src="../public/assets/images/ben_det.svg" alt="Img" />
                    </div>
                }
                else {
                    res.addBenificiary = "--"
                }
            })
        }

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
                <Modal
                    className="beneficiary-modal-container"
                    centered
                    show={this.state.showPopUp}
                    onHide={this.onHide}
                    size="lg"
                >
                    <div className="benf-heading">
                        Beneficiary Details For Expense No.&nbsp;{this.state.reportNo}
                        <img
                            className="ben-cancel"
                            src="../public/assets/images/CLOSE.svg"
                            onClick={this.closeModal}
                        />
                    </div>
                    <div className="ben-first-row">
                        <TextArea
                            labelName="Beneficiary"
                            important={true}
                            placeholder="Enter here"
                            value={this.state.beneficiary}
                            disabled={this.state.disable}
                            maxLength="101"
                            onChange={this.onBenificiary}
                            errorMessage={this.state.beneficiaryErr}
                        />
                    </div>
                    <div className="ben-second-row">
                        <Col className="ben-cheq-no">
                            <Textfield
                                labelName="Payment Cheque No"
                                important={true}
                                placeholder="Enter here"
                                value={this.state.chequeNo}
                                type="number"
                                maxLength="7"
                                onChange={this.onChequeNo}
                                errorMessage={this.state.chequeNoErr}
                                disabled={this.state.disable}
                            />
                        </Col>
                        <Col className="ben-cheq-no">
                            <SfaDatePicker
                                labelName="Payment Date"
                                important={true}
                                date={this.state.date}
                                onChange={this.onDateChange}
                                placeholder="Enter here"
                                errorMessage={this.state.dateErr}
                                disabled={this.state.disable}
                            />
                        </Col>
                    </div>
                    <div className="ben-third-row">
                        <TextArea
                            labelName="Payment Details"
                            important={true}
                            placeholder="Enter here"
                            value={this.state.details}
                            disabled={this.state.disable}
                            maxLength="101"
                            onChange={this.onDetailChange}
                            errorMessage={this.state.detailErr}
                        />
                    </div>
                    <div className="ben-fourth-row">
                        <Textfield
                            labelName="	Payment Amount"
                            important={true}
                            placeholder="Enter here"
                            value={this.state.amount}
                            type="number"
                            disabled={this.state.disable}
                            maxLength="11"
                            onChange={this.onAmtChange}
                            errorMessage={this.state.amtErr}
                        />
                    </div>
                    <div className="ben-fourth-row">
                        <Textfield
                            labelName="	Bank Name"
                            important={false}
                            value={this.state.bankName}
                            type="text"
                            disabled={true}
                        />
                    </div>
                    {this.state.disable == false &&
                        <div className="benf-footer">
                            <button className="ben_save_btn" onClick={this.onSave}>Save</button>
                            <button className="ben_cancel_btn" onClick={this.closeModal}>Cancel</button>
                        </div>
                    }
                </Modal>
                <SfaDatatable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                    labels={customLabels}
                    pagination={true}
                    searchlist={true}
                    mainHeading={true}
                    heading="Expense Confirmation List"
                    isFull={this.state.isFull}
                    handleView={this.handleView}
                />
            </React.Fragment>
        )
    }
}

export default ConfirmationTable;