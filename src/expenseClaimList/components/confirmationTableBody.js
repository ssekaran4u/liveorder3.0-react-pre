import React, { Component } from "react";
import InputField from "./inputField";
import TextArea from "./textArea";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { URL_EXPENSE_CLAIM } from "../.././lib/constants";
import { postToServer } from "../.././lib/comm-utils";
import Modal from 'react-bootstrap/Modal';
import { withRouter } from "react-router-dom";

class ConfirmationTableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopUp: false,
            date: "",
            showMcrPopUp: false,
            mcrDate: "",
            workWithLink: [],
            status: "0",
            mName: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.onHide = this.onHide.bind(this)
        this.onMcrHide = this.onMcrHide.bind(this)
        this.workWithLink = this.workWithLink.bind(this)
        this.onWorkWith = this.onWorkWith.bind(this)
        this.onDate = this.onDate.bind(this)
    }

    componentDidMount() {
        let data = {
            "Index": "ExpWorkedWithLink"
        }
        postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({
                    workWithLink: Result.data.data,
                    status: Result.data.WorkedWithLink[0].ExpWorkedWithLink
                })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in expense work with link api" })
        })
    }

    onWorkWith(name, dtt) {
        this.setState({ mName: name, mcrDate: dtt })
        let dte = dtt.split("-").reverse().join("-");
        if (this.state.workWithLink.length) {
            if (this.state.workWithLink.some(res => res.C_Name == name)) {
                let ans = this.state.workWithLink.filter(li => li.C_Name == name)
                let data = {
                    "Index": "DcrWorkwith",
                    "Data": { "fscode": ans[0].C_Code, "date": dte }
                }
                postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        if (Result.data.data.length) {
                            this.props.history.push("/expensemcr/" + ans[0].C_Code + "/" + this.props.entryType[0].type + "/" + dtt + "/" + ans[0].C_Name)
                        }
                        else {
                            this.setState({ showMcrPopUp: true });
                            setTimeout(function () {
                                this.setState({ showMcrPopUp: false });
                            }.bind(this), 2000);
                        }
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in expense work with link api" })
                })
            }
        }
    }

    workWithLink(names, dtt) {
        let result;
        let users = names.split(",")
        if (this.state.status == "1" && names != "") {
            let list =
                users.map(res =>
                    <div
                        className={this.state.workWithLink.some(li => li.C_Name == res.trim()) == true ? "mcr_link" : "mcr_name"}
                        onClick={() => this.onWorkWith(res.trim(), dtt)}
                    >
                        {res.trim()},
                    </div>
                )
            result = list;
        }
        else {
            if (names == "") {
                result = "--"
            }
            else {
                result = names
            }
        }
        return result;
    }

    //on change method for editable fields in expense details
    handleChange(value, category, id) {
        this.props.onHandleChange(value, category, id)
    }

    onHide() {
        this.setState({ showPopUp: false })
    }

    onMcrHide() {
        this.setState({ showMcrPopUp: false })
    }

    //onClick of date.
    onDate(date, no) {
        // this.props.entryType[0].type
        this.setState({ date: date })
        let dte = date.split("-").reverse().join("-");
        let data = {
            "Index": "DcrReport",
            "Data": { "srno": no, "date": dte }
        }
        postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                if (Result.data.data.length) {
                    this.props.history.push("/expensedcrlist/" + no + "/" + this.props.entryType[0].type + "/" + date)
                }
                else {
                    this.setState({ showPopUp: true });
                    setTimeout(function () {
                        this.setState({ showPopUp: false });
                    }.bind(this), 2000);
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in dcr list api" })
        })
    }

    render() {
        const details = this.props.expenseDetails;
        let constHeader = this.props.constHeader;
        let alterHeader = this.props.alterHeader;
        let entryType = this.props.entryType;
        let confirmationFlags = this.props.confirmationFlags;
        return (
            <React.Fragment>
                <Modal
                    className="dcr-list-modal-container"
                    centered
                    show={this.state.showPopUp}
                    onHide={this.onHide}
                    size="md"
                >
                    <div className="modal_header">
                        DCR details for {this.state.date}.
                    </div>
                    <div className="modal_body">
                        <img src="../../../public/assets/images/danger.svg" alt="" />
                        <div className="dcr_modal_txt">No Details Found !</div>
                    </div>
                </Modal>
                <Modal
                    className="dcr-list-modal-container"
                    centered
                    show={this.state.showMcrPopUp}
                    onHide={this.onMcrHide}
                    size="md"
                >
                    <div className="modal_header">
                        MCR details of {this.state.mName} for {this.state.mcrDate}.
                    </div>
                    <div className="modal_body">
                        <img src="../../../public/assets/images/danger.svg" alt="" />
                        <div className="dcr_modal_txt">No Details Found !</div>
                    </div>
                </Modal>
                {details.map(result =>
                    <React.Fragment key={result.dtt}>
                        <tr className={result.Sunday != "" ? "sunday-row" : result.Leave != "" ? "leave-row" : result.Holiday != "" ? "holiday-row" : ""}>
                            {constHeader.some(res => res.headerName == "dtt") ?
                                <td className="extra-padding">
                                    <div
                                        className={result.Sunday != ""
                                            ? "sunday-date body-content"
                                            : result.Leave != ""
                                                ? "leave-date body-content"
                                                : result.Holiday != ""
                                                    ? "holiday-date body-content"
                                                    : "body-content"}
                                    >
                                        <div className="date_link" onClick={() => this.onDate(result.dtt, entryType[0].reportNo)}>{result.dtt}</div>
                                    </div>
                                </td>
                                : null}
                            {constHeader.some(res => res.headerName == "doccnt") ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        <div className="body-content">
                                            <div>{result.doccnt == "" ? "--" : result.doccnt}</div>
                                        </div>

                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "stkcnt") ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        <div className="body-content">
                                            <div>{result.stkcnt == "" ? "--" : result.stkcnt}</div>
                                        </div>
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "chemcnt") ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        <div className="body-content">
                                            <div>{result.chemcnt == "" ? "--" : result.chemcnt}</div>
                                        </div>
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "AreaVisited") ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        <div className="body-content">
                                            {result.AreaVisited == "" ? "--" : result.AreaVisited}
                                        </div>
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "stayedat") ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        <div className="body-content">
                                            {result.stayedat == "" ? "--" : result.stayedat}
                                        </div>
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "VisitType") ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        <div className="body-content">
                                            {result.VisitType == "" ? "--" : result.VisitType}
                                        </div>
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "STP KM") ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        <div className="body-content">
                                            {result["STP KM"] == "" ? "--" : result["STP KM"]}
                                        </div>
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "distance") ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        <div className="body-content">
                                            {result.distance == "" ? "--" : result.distance}
                                        </div>
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "ModeOfTravel") ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        <div className="body-content">
                                            {result.ModeOfTravel == "" ? "--" : result.ModeOfTravel}
                                        </div>
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "workedWith") ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td className="center-aligned">
                                        <div className="body-content">
                                        {this.workWithLink(result.workedWith, result.dtt)}
                                        </div>
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {alterHeader.map(res =>
                                (res.headerName.includes("Remark") || res.headerName.includes("Note")) ?
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <div className="expense-tooltip">
                                                {result.dtt}
                                            </div>
                                        }
                                    >
                                        <td>
                                            {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                <div className="body-content">
                                                    <div>{result[res.headerName] == "" || result[res.headerName] == undefined ? "--" : result[res.headerName]}</div>
                                                </div>
                                                :
                                                confirmationFlags.some(list =>
                                                    list["Hcolumn"].toLowerCase() == res.headerName.toLowerCase()) ?
                                                    <div className="body-content">
                                                        <TextArea
                                                            value={result[res.headerName]}
                                                            onChange={this.handleChange}
                                                            id={result.dtt}
                                                            category={res.headerName}
                                                            textLength="201"
                                                        />
                                                    </div> :
                                                    <div className="body-content">
                                                        <div>{result[res.headerName] == "" || result[res.headerName] == undefined ? "--" : result[res.headerName]}</div>
                                                    </div>
                                                : null}
                                        </td>
                                    </OverlayTrigger>
                                    :
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <div className="expense-tooltip">
                                                {result.dtt}
                                            </div>
                                        }
                                    >
                                        <td>
                                            {entryType.length ? entryType[0].confirmation == "confirmed" ?
                                                <div className="body-content">
                                                    <div>{result[res.headerName] == "" ? "--" : result[res.headerName]}</div>
                                                </div>
                                                :
                                                confirmationFlags.some(list =>
                                                    list["Hcolumn"].toLowerCase() == res.headerName.toLowerCase()) ?
                                                    <div className="body-content">
                                                        <InputField
                                                            value={result[res.headerName]}
                                                            inputType="number"
                                                            onChange={this.handleChange}
                                                            id={result.dtt}
                                                            category={res.headerName}
                                                            step="0.01"
                                                            textLength="11"
                                                        />
                                                    </div>
                                                    :
                                                    <div className="body-content">
                                                        <div>{result[res.headerName] == "" ? "--" : result[res.headerName]}</div>
                                                    </div>
                                                : null}
                                        </td>
                                    </OverlayTrigger>)}
                        </tr>
                    </React.Fragment>)}
            </React.Fragment>
        )
    }
}

export default withRouter(ConfirmationTableBody);