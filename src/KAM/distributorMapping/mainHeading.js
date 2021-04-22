import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import SearchDropdown from "../../BasicComponet/searchDropdown";
import DistributorMappingDatatable from "./distributorMappingDatatable";
import { postToServer } from '../../lib/comm-utils';

class MainHeading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameValue: "-1",
            userList: [],
            userNameErr: "",
            distributorList: [],
            // checkedAll: false,
            // checked: false
        }
        this.getUserNameValue = this.getUserNameValue.bind(this)
        this.onDistributorMap = this.onDistributorMap.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.onCheckAll = this.onCheckAll.bind(this)
    }

    //onChange method of User Name in distributor mapping
    getUserNameValue(userName) {
        this.setState({ userNameValue: userName })
        if (userName != "" || userName == "-1") {
            this.state.userList.map((res) => {
                if (res.value == userName) {
                    this.getDistributorList("", "", res.key)
                }
            })
            this.setState({ userNameErr: "" })
        }
    }

    //To get the Distributor List Table
    getDistributorList(area, subarea, usercode) {
        let list = [];
        var data = {
            "index": "DistributorMappingList",
            "Data": { "area": area, "subarea": subarea, "usercode": usercode }
        }
        postToServer("KMDashBoardPage", data).then((Result) => {
            if (Result.data.Status == 'Success') {
                Result.data.data.map(res => {
                    list.push({
                        "isChecked": res.Saved == "N" ? false : true,
                        "value": res.Code,
                        "Area": res.Area,
                        "Distributor": res.Distributor,
                        "Pincode": res.Pincode,
                        "Subarea": res.Subarea
                    })
                })
                this.setState({ distributorList: list })
            }
        }).catch((Error) => {
            console.log("Error in App At User heirarchy mapping ")
        })
    }

    //onClick functionality of distributor mapping
    onDistributorMap() {
        let distributorsCode = ""
        let usercode = ""
        if (this.state.userNameValue == "-1") {
            this.setState({ userNameErr: "Select the User Name" })
        }
        else {
            this.state.userList.map((res) => {
                if (res.value == this.state.userNameValue) {
                    usercode = res.key
                }
            })
            this.state.distributorList.map(res => {
                if (res.isChecked == true) {
                    distributorsCode = distributorsCode + res.value + ","
                }
            })
            if (usercode != "" ) {
                let data = {
                    "index": "DistributorMappingSave",
                    "Data": { "usercode": usercode, "distributor": distributorsCode }
                }
                postToServer("KMDashBoardPage", data).then((Result) => {
                    if (Result.data.Status == 'Success') {
                        // console.log(Result.data.data)
                    }
                })
                    .catch((Error) => {
                        this.setState({ Error: true, Errormsg: "Error in App At User heirarchy mapping " })
                    })
            }
        }
    }

    // CheckAll functionality
    onCheckAll(event) {
        // if(this.state.checkedAll==true){
        //     this.setState({checkedAll: false, checked: false})
        // }
        // else{
        //     this.setState({checkedAll: true, checked: true})
        // }
        let distributorList = this.state.distributorList
        if (this.state.distributorList.length > 0) {
            distributorList.forEach(res => {
                res.isChecked = event.target.checked
            })
            this.setState({ distributorList: distributorList })
        }
    }

    // Individual checkbox functionality
    onCheck(event) {
        // if(this.state.checked==true){
        //     this.setState({checkedAll: false, checked: false})
        // }
        // else{
        //     this.setState({checkedAll: true, checked: true})
        // }
        let distributorList = this.state.distributorList
        distributorList.forEach(res => {
            if (res.value == event.target.value) {
                res.isChecked = event.target.checked
            }
        })
        this.setState({ distributorList: distributorList })
    }

    componentDidMount() {
        this.getDistributorList("", "", "")
        let list = [];
        var data = {
            "index": "DistributorMappingUser"
        }
        postToServer("KMDashBoardPage", data).then((Result) => {
            if (Result.data.Status == 'Success') {
                Result.data.data.map(res => {
                    list.push({
                        "key": res.C_Code,
                        "value": res.C_Name,
                        "text": res.C_Name.toLowerCase()
                    })
                })
            }
            this.setState({ userList: list })
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At User heirarchy mapping " })
        })
    }

    render() {
        var subContent = <div className="sub-content"><Link to="/kdashboard"><span>Dashboard</span></Link> / Distributor Analysis Report</div>
        return (
            <React.Fragment>
                <Breadcrumbs content="Distributor Mapping" subContent={subContent} />
                <Card className="distributor-mapping-card">
                    <div className="distributor-mapping-field-containers">
                        <SearchDropdown
                            labelName="User Name"
                            important={true}
                            placeholder="Search or Select"
                            Selected={this.state.userNameValue}
                            dropdownList={this.state.userList}
                            errorMessage={this.state.userNameErr}
                            getValue={this.getUserNameValue}
                        />
                    </div>
                </Card>
                <DistributorMappingDatatable
                    distributorList={this.state.distributorList}
                    onDistributorMap={this.onDistributorMap}
                    onCheckAll={this.onCheckAll}
                    onCheck={this.onCheck}
                    // checkedAll={this.state.checkedAll}
                    // checked={this.state.checked}
                />
            </React.Fragment>
        )
    }
}

export default MainHeading;