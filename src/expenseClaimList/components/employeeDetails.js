import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextareaAutosize from 'react-textarea-autosize';

class EmployeeDetails extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    onChange(e, maxLength) {
        this.props.onNoteChange(e.target.id, e.target.value, maxLength)
    }

    render() {
        let entryType = this.props.entryType;
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
        let mF = this.props.mainFlag
        return (
            <div className="expense-claim-list">
                <Card className="claimlist-main-card emp-de">
                    <div className="emp-details">
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                <div className="details-employee">
                                    <div className="emp-header">Employee Name</div>
                                    <div className="emp-txt">
                                        : &nbsp; {this.props.empDet1}
                                    </div>
                                </div>
                                <div className="details-employee">
                                    <div className="emp-header">
                                        {entryType.length ?
                                            (entryType[0].type == "newentry" || entryType[0].type == "savedentry") ?
                                                "Reporting To" : "Employee Code" : "Employee Code"}
                                    </div>
                                    <div className="emp-txt">
                                        : &nbsp; {this.props.empDet2}
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                <div className="details-employee">
                                    <div className="emp-header">Head Quarter</div>
                                    <div className="emp-txt">
                                        : &nbsp; {this.props.empDet3}
                                    </div>
                                </div>
                                <div className="details-employee">
                                    <div className="emp-header">Date</div>
                                    {(mF.length && mF[0]["Month/Day"] == "1") ?
                                        <div className="emp-txt">
                                            : &nbsp;{this.props.month != undefined ? this.props.month : ""},&nbsp;
                                            {this.props.year != undefined ? this.props.year : ""}&nbsp;
                                        </div> :
                                        <div className="emp-txt">
                                            : &nbsp;{this.props.fromDate}&nbsp;&nbsp;To&nbsp;&nbsp;{this.props.toDate}
                                        </div>}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="note-container">
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                <div className="sub-container">
                                    <div className="note-heading">Claim Note</div>
                                    <TextareaAutosize
                                        className="expense-text-area"
                                        value={this.props.note1}
                                        onChange={(e) => this.onChange(e, "500")}
                                        id="note1"
                                        disabled={entryType.length ? entryType[0].approved == "approved" ? true : false : false}
                                    />
                                </div>
                            </Col>
                            {appStatus!=0 ? entryType.length ? entryType[0].approved == "approved" ?
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="sub-container">
                                        <div className="note-heading">Approval Note</div>
                                        <TextareaAutosize
                                            className="expense-text-area"
                                            value={this.props.note2}
                                            onChange={(e) => this.onChange(e, "500")}
                                            id="note2"
                                            disabled={entryType.length ? entryType[0].approval == "approved" ? true : false : false}
                                        />
                                    </div>
                                </Col>
                                : null : null : null}
                            {entryType.length ? entryType[0].confirmed == "confirmed" ?
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="sub-container">
                                        <div className="note-heading">
                                            {entryType.length ? entryType[0].type == "reconfirmation" ?
                                                "Reconfirmation Note" : "Confirmation Note" : "Confirmation Note"}
                                        </div>
                                        <TextareaAutosize
                                            className="expense-text-area"
                                            value={this.props.note3}
                                            onChange={(e) => this.onChange(e, "500")}
                                            id="note3"
                                            disabled={entryType.length ? entryType[0].confirmation == "confirmed" ? true : false : false}
                                        />
                                    </div>
                                </Col>
                                : null : null}
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}

export default EmployeeDetails;