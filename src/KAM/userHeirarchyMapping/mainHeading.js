import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import SearchDropdown from "../../BasicComponet/searchDropdown";
import Textfield from "../../BasicComponet/textfield";
import UserHeirarchyDatatable from "./userHeirarchyDatatable";
import { postToServer } from '../../lib/comm-utils';
import SfaModal from "../../BasicComponet/sfaModal";

class MainHeading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userHeirarchyList: [],
            userCode: "",
            userName: [],
            designation: [],
            area: [],
            subArea: [],
            reportingTo: [],
            userNameErr: "",
            designationErr: "",
            areaErr: "",
            subAreaErr: "",
            reportingToErr: "",
            areaValue: "-1",
            userNameValue: "-1",
            designationValue: "-1",
            subAreaValue: "-1",
            reportingToValue: "-1",
            employeecode: "",
            designationType: "",
            areaCode: "",
            subAreaCode: "",
            reportingCode: "",
            showModal: false,
            mapping: false
        }
        this.getAreaValue = this.getAreaValue.bind(this)
        this.getUserNameValue = this.getUserNameValue.bind(this)
        this.getDesignationValue = this.getDesignationValue.bind(this)
        this.getSubAreaValue = this.getSubAreaValue.bind(this)
        this.getReportingToValue = this.getReportingToValue.bind(this)
        this.onMap = this.onMap.bind(this)
        this.onClickSubArea = this.onClickSubArea.bind(this)
        this.onClickReporting = this.onClickReporting.bind(this)
        this.onHide = this.onHide.bind(this)
    }

    getUserNameValue(userName) {
        this.setState({ userNameValue: userName })
        if (userName != "") {
            this.setState({ userNameErr: "" })
        }
        this.state.userName.map((user) => {
            if (user.C_Name == userName) {
                this.setState({ employeecode: user.C_EmpCode })
            }
        })
    }
    getDesignationValue(designation) {
        if (designation != "") {
            this.setState({ designationErr: "" })
        }
        this.state.designation.map((res) => {
            if (res.C_Name == designation) {
                this.setState({ designationType: res.N_Type })
            }
        })
        this.setState({ designationValue: designation })
        if (this.state.designation.length > 0) {
            this.state.designation.map((designationName) => {
                if (designationName.C_Name == designation) {
                    var reportingData = {
                        "Index": "ReportingTo",
                        "Data": { "Designation": designationName.N_Type }
                    }
                    postToServer("KMDashBoardPage", reportingData).then((Result) => {
                        if (Result.data.Status == 'Success') {
                            this.setState({ reportingTo: Result.data.data })
                        }
                    }).catch((Error) => {
                        this.setState({ Error: true, Errormsg: "Error in App At User heirarchy mapping " })
                    })
                }
            })
        }
    }
    //To Hide the modal
    onHide() {
        this.setState({ showModal: false })
    }

    getSubAreaValue(subArea) {
        if (this.state.areaValue == "") {
            this.setState({ areaErr: "Select the Area" })
        }
        this.state.subArea.map((res) => {
            if (res.C_Name == subArea) {
                this.setState({ subAreaCode: res.C_Code })
            }
        })
        this.setState({ subAreaValue: subArea })
    }
    getReportingToValue(reportingTo) {
        if (reportingTo != "") {
            this.setState({ reportingToErr: "" })
        }
        this.state.reportingTo.map((res) => {
            if (res.C_Name == reportingTo) {
                this.setState({ reportingCode: res.C_Code })
            }
        })
        this.setState({ reportingToValue: reportingTo })
    }

    onClickSubArea() {
        if (this.state.areaValue == "-1") {
            this.setState({ areaErr: "Select the Area !" })
        }
    }

    onClickReporting() {
        if (this.state.designationValue == "-1") {
            this.setState({ designationErr: "Select the Designation !" })
        }
    }

    getAreaValue(area) {
        if (area != "") {
            this.setState({ areaErr: "" })
        }
        this.state.area.map((res) => {
            if (res.C_Name == area) {
                this.setState({ areaCode: res.C_Code })
            }
        })
        this.setState({ areaValue: area })
        if (this.state.area.length > 0) {
            this.state.area.map((areaName) => {
                if (areaName.C_Name == area) {
                    var subAreaData = {
                        "Index": "SubAreaMst",
                        "Data": { "area": areaName.C_Code }
                    }
                    postToServer("KMDashBoardPage", subAreaData).then((Result) => {
                        if (Result.data.Status == 'Success') {
                            this.setState({ subArea: Result.data.data })
                        }
                    }).catch((Error) => {
                        this.setState({ Error: true, Errormsg: "Error in App At User heirarchy mapping " })
                    })
                }
            })
        }
    }

    getUserMappingList() {
        var data = {
            "Index": "UserHierarchyMappingList",
        }
        postToServer("KMDashBoardPage", data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ userHeirarchyList: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At KAM Stockist Profile Top Retailers API " })
        })
    }

    componentDidMount() {
        this.getUserMappingList();
        var data = {
            "Index": "UserData"
        }
        postToServer("KMDashBoardPage", data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ userName: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At User heirarchy mapping " })
        })
        var designationData = {
            "Index": "Designation"
        }
        postToServer("KMDashBoardPage", designationData).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ designation: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At User heirarchy mapping " })
        })
        var areaData = {
            "Index": "AreaMst"
        }
        postToServer("KMDashBoardPage", areaData).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ area: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At User heirarchy mapping " })
        })
    }

    onMap() {
        if (this.state.userNameValue == "-1" || this.state.designationValue == "-1" || this.state.reportingToValue == "-1") {
            if (this.state.userNameValue == "-1") {
                this.setState({ userNameErr: "Select the User Name !" })
            }
            if (this.state.designationValue == "-1") {
                this.setState({ designationErr: "Select the Designation !" })
            }
            if (this.state.reportingToValue == "-1") {
                this.setState({ reportingToErr: "Select the Reporting To !" })
            }
        }
        else if (this.state.reportingToErr == "" && this.state.designationErr == "" && this.state.userNameErr == "") {
            this.setState({ showModal: true })
            var data = {
                "Index": "UserHierarchyMap",
                "Data": {
                    "usercode": this.state.employeecode,
                    "designation": this.state.designationType,
                    "area": this.state.areaCode,
                    "subarea": this.state.subAreaCode,
                    "reporting": this.state.reportingCode
                }
            }
            postToServer("KMDashBoardPage", data).then((Result) => {
                if (Result.data.Status == 'Success') {
                    if (Result.data.data[0].result == "Already This User Mapped ....") {
                        this.setState({ mapping: false })
                    }
                    else {
                        this.setState({
                            userNameValue: "-1",
                            designationValue: "-1",
                            areaValue: "-1",
                            subAreaValue: "-1",
                            reportingToValue: "-1"
                        })
                        this.getUserMappingList();
                        this.setState({ mapping: true })
                    }
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in App At User heirarchy mapping " })
            })
        }
    }

    render() {
        let userNameList = []
        let designationList = []
        let areaList = []
        let subAreaList = []
        let reportingToList = []
        if (this.state.userName.length > 0) {
            this.state.userName.map((list) => {
                userNameList.push({
                    "key": list.C_EmpCode,
                    "value": list.C_Name,
                    "text": list.C_Name.toLowerCase()
                })
            })
        }
        if (this.state.designation.length > 0) {
            this.state.designation.map((list) => {
                designationList.push({
                    "key": list.N_Type,
                    "value": list.C_Name,
                    "text": list.C_Name
                })
            })
        }
        if (this.state.area.length > 0) {
            this.state.area.map((list) => {
                areaList.push({
                    "key": list.C_Code,
                    "value": list.C_Name,
                    "text": list.C_Name.toLowerCase()
                })
            })
        }
        if (this.state.subArea.length > 0) {
            this.state.subArea.map((list) => {
                subAreaList.push({
                    "key": list.C_Code,
                    "value": list.C_Name,
                    "text": list.C_Name.toLowerCase()
                })
            })
        }
        if (this.state.reportingTo.length > 0) {
            this.state.reportingTo.map((list) => {
                reportingToList.push({
                    "key": list.C_Code,
                    "value": list.C_Name,
                    "text": list.C_Name.toLowerCase()
                })
            })
        }
        var subContent = <div className="sub-content"><Link to="/kdashboard"><span>Dashboard</span></Link> / Distributor Analysis Report</div>
        var buttonGroup = <div className="user-heirarchy-button-group">
            <Button onClick={this.onHide} className="user-heirarchy-submit-button">
                <div className="button-text">Done</div>
            </Button>
        </div>
        var text = <div className={this.state.mapping == true ? "user-heirarchy-success-text" : "user-heirarchy-warning-text"}>
            {this.state.mapping == true ? "Mapped Successfully!" : "This User Already Mapped!"}
        </div>
        return (
            <React.Fragment>
                <Breadcrumbs content="User Hierarchy Mapping" subContent={subContent} />
                <Card className="user-heirarchy-card">
                    <SfaModal
                        show={this.state.showModal}
                        imagePath={this.state.mapping == true ? "../public/assets/images/submitplan.svg" : "../public/assets/images/danger.svg"}
                        buttonGroup={buttonGroup}
                        text={text}
                        onHide={this.onHide}
                    />
                    {/* <div className="user-heirarchy-field-containers">
                        <Textfield labelName="User Code" important={false} disabled={true} textfieldValue = "10021" />
                    </div> */}
                    <div className="user-heirarchy-field-containers">
                        <SearchDropdown
                            labelName="User Name"
                            errorMessage={this.state.userNameErr}
                            important={true}
                            placeholder="Search or Select"
                            Selected={this.state.userNameValue}
                            dropdownList={userNameList}
                            getValue={this.getUserNameValue}
                        />
                    </div>
                    <div className="user-heirarchy-field-containers">
                        <SearchDropdown
                            labelName="Designation"
                            errorMessage={this.state.designationErr}
                            important={true}
                            disabled={true}
                            placeholder="Select"
                            Selected={this.state.designationValue}
                            dropdownList={designationList}
                            getValue={this.getDesignationValue}
                        />
                    </div>
                    <div className="user-heirarchy-field-containers">
                        <SearchDropdown
                            labelName="Area"
                            errorMessage={this.state.areaErr}
                            important={false}
                            placeholder="Search or Select"
                            Selected={this.state.areaValue}
                            dropdownList={areaList}
                            getValue={this.getAreaValue}
                        />
                    </div>
                    <div className="user-heirarchy-field-containers">
                        <SearchDropdown
                            labelName="Sub Area"
                            important={false}
                            placeholder="Search or Select"
                            Selected={this.state.subAreaValue}
                            dropdownList={subAreaList}
                            getValue={this.getSubAreaValue}
                            onClickDropdown={this.onClickSubArea}
                        />
                    </div>
                    <div className="user-heirarchy-field-containers">
                        <SearchDropdown
                            labelName="Reporting To"
                            errorMessage={this.state.reportingToErr}
                            important={true}
                            placeholder="Search or Select"
                            Selected={this.state.reportingToValue}
                            dropdownList={reportingToList}
                            getValue={this.getReportingToValue}
                            onClickDropdown={this.onClickReporting}
                        />
                    </div>
                    <div className={this.state.reportingToErr != "" ? "error-user-heirarchy-button" : "user-heirarchy-button"}>
                        <Button className="map-button" onClick={this.onMap}>
                            <div className="map-button-text">Map</div>
                        </Button>
                    </div>
                </Card>
                <UserHeirarchyDatatable userHeirarchyList={this.state.userHeirarchyList} />
            </React.Fragment>
        )
    }
}

export default MainHeading;