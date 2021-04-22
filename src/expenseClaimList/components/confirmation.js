import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SearchDropdown from "../../BasicComponet/searchDropdown";
import SfaDateRangePicker from "../../BasicComponet/sfaDateRangePicker";
import { postToServer } from "../../lib/comm-utils";
import { URL_EXPENSE_CLAIM } from "../../lib/constants";
import ConfirmationTable from "./confirmationTable";
import SfaSpinner from "../../BasicComponet/sfaSpinner";

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: [null, null],
            dateErr: "",
            dateValue: "",
            regionList: [],
            areaList: [],
            designationList: [],
            divisionList: [],
            region: "-1",
            regionErr: "",
            area: "-1",
            areaErr: "",
            designation: "-1",
            designationErr: "",
            division: "-1",
            divisionErr: "",
            confirmationList: [],
            spinner: false,
        }
        this.onDateChange = this.onDateChange.bind(this);
        this.getDivision = this.getDivision.bind(this);
        this.getRegion = this.getRegion.bind(this);
        this.getDesignation = this.getDesignation.bind(this);
        this.getArea = this.getArea.bind(this);
        this.getRegionValue = this.getRegionValue.bind(this);
        this.getAreaValue = this.getAreaValue.bind(this);
        this.getDesignationValue = this.getDesignationValue.bind(this);
        this.getDivisionValue = this.getDivisionValue.bind(this);
        this.onLoadDetails = this.onLoadDetails.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem("details") != null) {
            this.setState({ spinner: true })
            let dateFormat = require('dateformat');
            let details = JSON.parse(sessionStorage.getItem("details"))
            this.setState({ date: details.date, })
            let fromDate = dateFormat(details.date[0], "isoDate");
            let toDate = dateFormat(details.date[1], "isoDate")
            this.getRegion(fromDate, toDate, details.region, details.area, details.designation, details.division)
            let data = {
                "Index": "ExpConfirmList",
                "Data": {
                    "fromdate": fromDate,
                    "todate": toDate,
                    "area": details.area,
                    "region": details.region,
                    "designation": details.designation,
                    "division": details.division
                },
            }
            postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ confirmationList: Result.data.data })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in expense admin confirmation list" })
            })
        }
    }

    //To get the value of region.
    getRegionValue(code) {
        let dateFormat = require('dateformat');
        let fromDate = dateFormat(this.state.date[0], "isoDate")
        let toDate = dateFormat(this.state.date[1], "isoDate")
        this.setState({ regionErr: "", region: code })
        if (code == "") {
            this.getArea(fromDate, toDate, "", "", "")
            this.getDivision("", "")
        }
        else {
            this.getArea(fromDate, toDate, code, "", "")
            this.getDivision(code, "")
        }
    }

    //To get the value of designation.
    getDesignationValue(code) {
        this.setState({ designationErr: "", designation: code })
    }

    //To get the value of area.
    getAreaValue(code) {
        let dateFormat = require('dateformat');
        let fromDate = dateFormat(this.state.date[0], "isoDate")
        let toDate = dateFormat(this.state.date[1], "isoDate")
        this.setState({ areaErr: "", area: code })
        if (code == "") {
            this.getDesignation(feomDate, toDate, "", "")
        }
        else {
            this.getDesignation(fromDate, toDate, code, "")
        }
    }

    //To get the value of division.
    getDivisionValue(code) {
        this.setState({ divisionErr: "", division: code })
    }

    //To change the range of the date
    onDateChange(date) {
        this.setState({
            dateErr: "",
            regionErr: "",
            areaErr: "",
            designationErr: "",
            divisionErr: ""
        })
        let dateFormat = require('dateformat');
        this.setState({ date: date, spinner: true });
        let fromDate = dateFormat(date[0], "isoDate")
        let toDate = dateFormat(date[1], "isoDate")
        this.getRegion(fromDate, toDate, "", "", "", "")
    }

    //To get the list of region.
    getRegion(fromDate, toDate, region, area, designation, division) {
        let expRegion = {
            "Index": "ExpRegion",
            "Data": { "fromdate": fromDate, "todate": toDate }
        }
        postToServer(URL_EXPENSE_CLAIM, expRegion).then((Result) => {
            let regionList = [];
            if (Result.data.Status == 'Success') {
                Result.data.data.map(res => {
                    regionList.push({
                        "key": res.C_Code,
                        "value": res.C_Code,
                        "text": res.C_Name
                    })
                })
                this.setState({ regionList: regionList })
                if(!Result.data.data.length){
                    this.getArea(fromDate, toDate, "", "", "")
                    this.getDivision("", "")
                }
                else if (region == "") {
                    this.getArea(fromDate, toDate, Result.data.data[0].C_Code, "", "")
                    this.getDivision(Result.data.data[0].C_Code, "")
                    this.setState({ region: Result.data.data[0].C_Code })
                }
                else {
                    this.getArea(fromDate, toDate, region, area, designation)
                    this.getDivision(region, division)
                    this.setState({ region: region })
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in expense admin region dropdown" })
        })
    }

    //To get the list of area.
    getArea(fromDate, toDate, region, area, designation) {
        let expArea = {
            "Index": "ExpArea",
            "Data": { "fromdate": fromDate, "todate": toDate, "region": region }
        }
        postToServer(URL_EXPENSE_CLAIM, expArea).then((Result) => {
            let areaList = []
            if (Result.data.Status == 'Success') {
                Result.data.data.map(res => {
                    areaList.push({
                        "key": res.C_Code,
                        "value": res.C_Code,
                        "text": res.C_Name
                    })
                })

                this.setState({ areaList: areaList })
                if(!Result.data.data.length){
                    this.getDesignation(fromDate, toDate, "", "")
                }
                else if (area == "") {
                    this.getDesignation(fromDate, toDate, Result.data.data[0].C_Code, "")
                    this.setState({ area: Result.data.data[0].C_Code })
                }
                else {
                    this.getDesignation(fromDate, toDate, area, designation)
                    this.setState({ area: area })
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in expense admin area dropdown" })
        })
    }

    //To get the list of designation.
    getDesignation(fromDate, toDate, area, designation) {
        let expDesignation = {
            "Index": "ExpDesignation",
            "Data": { "fromdate": fromDate, "todate": toDate, "area": area }
        }
        postToServer(URL_EXPENSE_CLAIM, expDesignation).then((Result) => {
            let designationList = []
            if (Result.data.Status == 'Success') {
                Result.data.data.map(res => {
                    designationList.push({
                        "key": res.C_Code,
                        "value": res.C_Code,
                        "text": res.C_Name
                    })
                })
                this.setState({ designationList: designationList })
                if (designation == "") {
                    this.setState({ designation: Result.data.data[0].C_Code })
                }
                else {
                    this.setState({ designation: designation })
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in expense admin designation dropdown" })
        })
    }

    //To get the list of division.
    getDivision(region, division) {
        let expDivision = {
            "Index": "ExpDivision",
            "Data": { "region": region }
        }
        postToServer(URL_EXPENSE_CLAIM, expDivision).then((Result) => {
            let divisionList = []
            if (Result.data.Status == 'Success') {
                this.setState({ spinner: false })
                Result.data.data.map(res => {
                    divisionList.push({
                        "key": res.code,
                        "value": res.code,
                        "text": res.name
                    })
                })
                this.setState({ divisionList: divisionList })
                if (division == "") {
                    this.setState({ division: Result.data.data[0].code })
                }
                else {
                    this.setState({ division: division })
                }
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in expense admin designation dropdown" })
        })
    }

    onLoadDetails() {
        this.setState({ spinner: true })
        if (this.state.date[0] == null ||
            this.state.area == "-1" ||
            this.state.region == "-1" ||
            this.state.designation == "-1" ||
            this.state.division == "-1") {
            if (this.state.date[0] == null) {
                this.setState({ dateErr: "Select the date !", spinner: false })
            }
            if (this.state.area == "-1") {
                this.setState({ areaErr: "Select the area !", spinner: false })
            }
            if (this.state.region == "-1") {
                this.setState({ regionErr: "Select the region !", spinner: false })
            }
            if (this.state.designation == "-1") {
                this.setState({ designationErr: "Select the designation !", spinner: false })
            }
            if (this.state.division == "-1") {
                this.setState({ divisionErr: "Select the division !", spinner: false })
            }
        }
        else {
            let dateFormat = require('dateformat');
            let fromDate = dateFormat(this.state.date[0], "isoDate")
            let toDate = dateFormat(this.state.date[1], "isoDate")
            let data = {
                "Index": "ExpConfirmList",
                "Data": {
                    "fromdate": fromDate,
                    "todate": toDate,
                    "area": this.state.area,
                    "region": this.state.region,
                    "designation": this.state.designation,
                    "division": this.state.division
                },
            }
            postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ spinner: false, confirmationList: Result.data.data })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in expense admin confirmation list" })
            })
            let details = {
                date: this.state.date,
                region: this.state.region,
                area: this.state.area,
                designation: this.state.designation,
                division: this.state.division
            }
            sessionStorage.setItem("details", JSON.stringify(details))
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.spinner == true &&
                    <SfaSpinner />
                }
                <Card className="claimlist-main-card">
                    <Row className="admin-row">
                        <Col className="admin-col" sm={12} md={6} lg={4} xl={4}>
                            <SfaDateRangePicker
                                labelName="Date"
                                onChange={this.onDateChange}
                                dateRange={this.state.date}
                                important={true}
                                errorMessage={this.state.dateErr}
                            />
                        </Col>
                        <Col className="admin-col" sm={12} md={6} lg={4} xl={4}>
                            <SearchDropdown
                                labelName="Region"
                                placeholder="Search or Select Region"
                                Selected={this.state.region}
                                dropdownList={this.state.regionList}
                                important={true}
                                errorMessage={this.state.regionErr}
                                getValue={this.getRegionValue}
                            />
                        </Col>
                        <Col className="admin-col" sm={12} md={6} lg={4} xl={4}>
                            <SearchDropdown
                                labelName="Area"
                                placeholder="Search or Select Area"
                                Selected={this.state.area}
                                dropdownList={this.state.areaList}
                                important={true}
                                errorMessage={this.state.areaErr}
                                getValue={this.getAreaValue}
                            />
                        </Col>
                        <Col className="admin-col" sm={12} md={6} lg={4} xl={4}>
                            <SearchDropdown
                                labelName="Designation"
                                placeholder="Search or Select Designation"
                                Selected={this.state.designation}
                                dropdownList={this.state.designationList}
                                important={true}
                                errorMessage={this.state.designationErr}
                                getValue={this.getDesignationValue}
                            />
                        </Col>
                        <Col className="admin-col" sm={12} md={6} lg={4} xl={4}>
                            <SearchDropdown
                                labelName="Division"
                                placeholder="Search or Select Division"
                                Selected={this.state.division}
                                dropdownList={this.state.divisionList}
                                important={true}
                                errorMessage={this.state.divisionErr}
                                getValue={this.getDivisionValue}
                            />
                        </Col>
                        <Col className="admin-col" sm={12} md={6} lg={4} xl={4}>
                            <div
                                className={(this.state.dateErr != "" ||
                                    this.state.areaErr != "" ||
                                    this.state.designationErr != "" ||
                                    this.state.regionErr != "" ||
                                    this.state.divisionErr != "") ? "claimlist-button claimlist_btn" : "claimlist-button"}>
                                <Button className="claimlist-btn" onClick={this.onLoadDetails}>
                                    <div className="btn-text">LOAD DETAILS</div>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
                {sessionStorage.getItem("details") != null ?
                    <div className="claimlist-datatable-container">
                        <ConfirmationTable confirmationList={this.state.confirmationList} />
                    </div>
                    : null}
            </React.Fragment>
        )
    }
}

export default Confirmation;