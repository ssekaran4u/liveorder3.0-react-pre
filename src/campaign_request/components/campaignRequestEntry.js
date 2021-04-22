import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form, Dropdown } from 'react-bootstrap'
import { postToServer } from '../../lib/comm-utils'
import { URL_CAMPAIGN } from "../.././lib/constants";
import SearchDropdown from "../../BasicComponet/searchDropdown";
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import '../../../public/assets/css/campaignResponsive.css'
import DoctorList from "./doctorList"
import SearchInput from './SearchInput'
import SubAreaCheckbox from "./SubAreaCheckbox"
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../landing-page/components/Footer";
import CampaignCreatedPopup from "../popup/CampaignCreatedPopup";

class campaignRequestEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Campaign: [],
      campaignValue: "-1",
      subarea: [],
      subareaValue: "-1",
      mr: [],
      mrValue: "-1",
      show: false,
      filterdata: [],
      selectedData: {},
      subAreaSelected: [],
      campaignList: [],
      subAreaList: [],
      doctorList: [],
      mrList: [],
      campaignCode: "",
      subAreaCode: "",
      mrCode: "",
      editData: {},
      campaignErr: "",
      subAreaErr: "",
      mrErr: "",
      sa: [],
      mrName: "",
      data: [],
      requestedBy: "",
      requestDate: "",
      note: "",
      noofDoctors: "",
      status: "",
      approvedBy: "",
      approvedDate: "",
      approvalNote: "",
      doctorErr: "",
      saveddoctor: [],
      fsName: "",
      fsCode: "",
      subAreaCode: "",
      approvalHistory:[],
      rejectedHistory:[],
      approvalType:"",
      managerRequestedMR:"",
      doctorSelectedData:{},
      clearDoctorCount:false,
      multipleApproversNote:"",
      approversRejectionNote:""
    }
    this.gobtn = this.gobtn.bind(this)
    this.getCampaignValue = this.getCampaignValue.bind(this)
    this.getMrValue = this.getMrValue.bind(this)
    this.getsubarea = this.getsubarea.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.onCheckAll = this.onCheckAll.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.errorMsg = this.errorMsg.bind(this)
  }

  componentDidMount() {
    let approversNote  = ""
    let mrcode = ""
    var data = {
      "Index": "LoginDetails"
    }
    postToServer(URL_CAMPAIGN, data).then((Result) => {
      if (Result.data.Status == 'Success') {
        mrcode = Result.data.data.FSCode;
        this.setState({
          LoginUserDetails: Result.data.data,
          fsName: Result.data.data.FSNAME,
          fsCode: Result.data.data.FSCode
        })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in campaign dropdown" })
    })
    let a = ""
    let selectedsubArea = [], subarealist = [], subarea = []
    if (this.props.match.params.id.trim() != '') {
      var edit = {
        "Index": "CampaignEdit",
        "Data": {
          "srno": this.props.match.params.id,
          "campcode": this.props.location.EditViewData.campaignCode != undefined ? this.props.location.EditViewData.campaignCode :""
        }
      }
      postToServer(URL_CAMPAIGN, edit).then((Result) => {
        if (Result.data.Status == 'Success') {
          Result.data.Selected_Subarea.map(ele => {
            selectedsubArea.push({
              C_Code: ele.Code,
              C_Name: ele.C_Name,
              isChecked: true
            })
          })
          if (localStorage.getItem("type") == "1") {
            var data1 = {
              "Index": "SubArea",
            }
            postToServer(URL_CAMPAIGN, data1).then((Result1) => {
              if (Result1.data.Status == 'Success') {
                Result1.data.data.map(res => {
                  subarealist.push({
                    C_Code: res.C_Code,
                    C_Name: res.C_Name,
                    isChecked: false
                  })
                })
              }
              this.gobtn()
              let m = {}
              let b = []
              let dl = []
              Result.data.Doct_List.map(ele => {
                if (this.props.match.params.id == ele.n_srNo || ele.n_srNo == "") {
                  dl.push(ele)
                }
              })
              subarealist.map(res => {
                m[res.C_Code] = res
              })
              selectedsubArea.map(item => { m[item.C_Code] = item })
              Object.keys(m).map(a => {
                b.push(m[a])
              })
              let subarea = []
              if (this.props.location.EditViewData.editableAll == true) {
                subarea = b
              } else {
                subarea = selectedsubArea

              }
              this.setState({ subAreaList: subarea })
            }).catch((Error) => {
              this.setState({ Error: true, Errormsg: "Error in subarea list" })
            })
          } else if (localStorage.getItem("type") == "2" || localStorage.getItem("type") == "3") {
            let mr = ""
            this.state.mrList.map(ele => {
              if (ele.C_Name.trim() == Result.data.Headlist[0].RequestedBy.trim()) {
                mr = ele.C_Code
              }
            })
            var subareaData = {
              "Index": "Campaign_FswiseSubarea",
              "Data": {
                "fscode": mr
              }
            }
            postToServer(URL_CAMPAIGN, subareaData).then((Result) => {
              if (Result.data.Status == 'Success') {
                
                Result.data.data.map((res, i) => {
                  sub.push({
                    C_Code: res.C_CODE,
                    C_Name: res.C_NAME,
                    isChecked: false
                  })
                })
                let m = {}
                let b = []
                sub.map(res => {
                  m[res.C_Code] = res
                })
                selectedsubArea.map(item => { m[item.C_Code] = item })
                Object.keys(m).map(a => {
                  b.push(m[a])
                })
                let subarea = []
                if (this.props.location.EditViewData.editableAll == true) {
                  subarea = b
                } else {
                  subarea = selectedsubArea
                }
                this.setState({ subAreaList: subarea })
              }
            }).catch((Error) => {
              this.setState({ Error: true, Errormsg: "Error in campaign subarea list" })
            })
          }
          let subAreaCode = "", subAreaCode1 = ""
            selectedsubArea.map(ele=>{
              subAreaCode = subAreaCode + ele.C_Code  +","
            })
         
          let approversNote ="",approversRejectionNote =""
           // for checking the same fs to map the note
                Result.data.Approvelhistory.map(ele=>{
                  if(mrcode  == ele.CODE){
                    approversNote = ele.AppNote
                  }
                }) 
                Result.data.Rejectecthistory.map(ele=>{
                  if(mrcode  == ele.CODE){
                    approversRejectionNote = ele.RejectNote
                  }
                }) 
          this.setState({
            editData: Result.data,
            campaignValue: Result.data.Headlist[0].CampaignName,
            campaignCode: Result.data.Headlist[0].c_code,
            mrValue: Result.data.Headlist[0].RequestedBy,
            fsCode: Result.data.Headlist[0].Fscode,
            doctorList: Result.data.Doct_List,
            subAreaCode: subAreaCode,
            requestedBy: Result.data.Headlist[0].RequestedBy,
            requestDate: Result.data.Headlist[0].ReqDate,
            note: Result.data.Headlist[0].Note,
            noofDoctors: Result.data.Headlist[0]["No-Doc"],
            status: Result.data.Headlist[0].status,
            approvedBy: Result.data.Headlist[0].Approver,
            approvedDate: Result.data.Headlist[0].AppDate,
            approvalNote: Result.data.Headlist[0].appnote,
            confirmDate: Result.data.Headlist[0].confDate,
            confirmNote: Result.data.Headlist[0].ConfirmNote,
            confirmedBy: Result.data.Headlist[0].confirmer,
            approvalHistory:Result.data.Approvelhistory,
            rejectedHistory:Result.data.Rejectecthistory,
            approvalType:Result.data.Headlist[0].APPType,
            show: true,
            multipleApproversNote:approversNote,
            approversRejectionNote:approversRejectionNote
          })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in edit" })
      })
    }
    else if (this.props.match.params.id.trim() == '') {
      var data1 = {
        "Index": "SubArea"
      }
      postToServer(URL_CAMPAIGN, data1).then((Result) => {
        if (Result.data.Status == 'Success') {
          Result.data.data.map((res, i) => {
            sub.push({
              C_Code: res.C_Code,
              C_Name: res.C_Name,
              isChecked: false
            })
          })
          this.setState({ subAreaList: sub })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in subarea list" })
      })
    }
    var sub = []
    var data = {
      "Index": "Campaign"
    }
    postToServer(URL_CAMPAIGN, data).then((Result) => {
      if (Result.data.Status == 'Success') {

        this.setState({ campaignList: Result.data.data })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in campaign dropdown" })
    })

    //for subarea dropdown
    if (localStorage.getItem("type") == '2') {
      var data1 = {
        "Index": "Campaign_Fs"
      }
      postToServer(URL_CAMPAIGN, data1).then((Result) => {

        if (Result.data.Status == 'Success') {

          this.setState({ mrList: Result.data.data })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in campaign mr list" })
      })
      let mr = ""
      this.state.mrList.map(ele => {
        if (ele.C_Name.trim() == Result.data.Headlist[0].RequestedBy.trim()) {
          mr = ele.C_Code
        }
      })
      var subareaData = {
        "Index": "Campaign_FswiseSubarea",
        "Data": {
          "fscode": mr
        }
      }
      postToServer(URL_CAMPAIGN, subareaData).then((Result) => {
        if (Result.data.Status == 'Success') {
          Result.data.data.map((res, i) => {
            sub.push({
              C_Code: res.C_CODE,
              C_Name: res.C_NAME,
              isChecked: false,
            })
          })
          this.setState({ subAreaList: sub })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in campaign subarea list" })
      })
    }
  }
  removeItem(id) {
    let { subAreaList } = this.state
    delete subAreaList[id]
    let subAreaSelected = this.state.subAreaSelected
    var k = id.C_Code
    delete subAreaSelected[k]
    this.setState({ subAreaList: subAreaList, subAreaSelected: subAreaSelected })

  }
  getsubarea(event, id, name, checked, item) {
    let selectedSubAreatemp = {}
    let id1 = event.target.id
    selectedSubAreatemp = this.state.subAreaSelected
    let { selectedData } = this.state
    if (checked) {
      selectedData[id1] = event.target.name
      selectedSubAreatemp[event.target.name] = event.target.name
      this.setState({ subAreaErr: "" })
    } else if (selectedData[id1] == event.target.name) {
      selectedData[id1] = false
      delete selectedSubAreatemp[event.target.name]
    } else {
      delete selectedData[id1]
    }
    this.setState({
      selectedData: selectedData,
      subAreaSelected: selectedSubAreatemp
    })
  }

  getCampaignValue(campaign) {
    this.setState({ campaignValue: campaign })
    if (campaign != "") {
      this.setState({ campaignErr: "" })
    }
    this.state.campaignList.map((item) => {
      if (item.Name.trim() == campaign.trim()) {
        this.setState({ campaignCode: item.Code })
      }
    })

  }

  getMrValue(mr) {
    this.setState({ mrValue: mr })
    let mrCode = ""
    if (localStorage.getItem("type") == '2') {
      if (mr != "") {
        this.setState({ mrErr: "" })
      }
      this.state.mrList.map(item => {
        if (item.C_Name == mr) {
          mrCode = item.C_Code
          this.setState({ mrCode: item.C_Code ,
            managerRequestedMR:item.C_Name})
        }
      })
      let sub = []
      var data = {
        "Index": "Campaign_FswiseSubarea",
        "Data": {
          "fscode": mrCode
        }
      }
      postToServer(URL_CAMPAIGN, data).then((Result) => {
        if (Result.data.Status == 'Success') {
          Result.data.data.map((res, i) => {
            sub.push({
              C_Code: res.C_CODE,
              C_Name: res.C_NAME,
              isChecked: false
            })
          })
          this.setState({ subAreaList: sub })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in campaign subarea list" })
      })
    }
  }

  gobtn() {
    this.setState({ doctorErr: "" })
    this.errorMsg()
    let subAreaCode = "", subAreaCode1 = ""
    let subarea = []
    this.state.subAreaList.map(res => {
      if (res.isChecked == true) {
        subarea.push({
          code: res.C_Code,
          name: res.C_Name,
          isChecked: res.isChecked
        })
      }
    })
    if (localStorage.getItem("type") == '1') {
      if (this.state.campaignValue != "-1" && subarea.length > 0) {
        let length = subarea.length
        if (length == 1) {
          subarea.map(res => {
            subAreaCode = res.code
          })
        }
        else {
          for (let i = 0; i < length - 1; i++) {
            subAreaCode = subAreaCode + subarea[i].code + ","
            subAreaCode1 = subarea[i + 1].code
          }
        }
        this.setState({
          subAreaCode: subAreaCode + subAreaCode1
        })
        var data = {
          "Index": "NewDoctorList",
          "Data": {
            "campaign": this.state.campaignCode,
            "subarea": subAreaCode + subAreaCode1
          },
        }
        let doctors = []
        let doctorObj = {}
        postToServer(URL_CAMPAIGN, data).then((Result) => {
          this.setState({clearDoctorCount:!this.state.clearDoctorCount})
          if (Result.data.Status == 'Success') {

               Result.data.data.map(ele=>{
               doctorObj[ele.DoctCode] ={
               C_Qualification:ele.C_Qualification,
               DoctCode:ele.DoctCode,
               DoctName:ele.DoctName,
               isAdded:"",
               disabled:false
             } 
            })
               Result.data.data.map(ele=>{
               Result.data.SavedDoct.map(item=>{
                  if(item.c_DoctCode.trim() == ele.DoctCode.trim()){
                   doctorObj[item.c_DoctCode] ={
                  C_Qualification:ele.C_Qualification,
                  DoctCode:ele.DoctCode,
                  DoctName:ele.DoctName,
                  isAdded:"Already Added",
                  disabled:true
                }   
                  }

               })
            })           

                      Object.keys(doctorObj).map(a=>{
                             doctors.push(doctorObj[a])
            })
            this.setState({
              doctorList: Result.data.data,
              saveddoctor: Result.data.SavedDoct, 
              show: true, 
              subAreaCode: subAreaCode + subAreaCode1
            })
          }
        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in doctor list" })
        })
      } else if (this.state.campaignValue == "-1" && subarea.length == 0) {

        this.setState({
          campaignErr: "Please select campaign",
          subAreaErr: "Please select SubArea"
        })
      } else if (this.state.campaignValue == "-1") {
        this.setState({
          campaignErr: "Please select campaign"
        })

      } else if (subarea.length == 0) {
        this.setState({
          subAreaErr: "Please select SubArea"
        })

      }

    } else if (localStorage.getItem("type") == '2') {
      if (this.state.campaignValue != "-1" && this.state.mrValue != "-1" && subarea.length > 0) {
        this.setState({
          show: true
        })
      
        let length = subarea.length
        if (length == 1) {
          subarea.map(res => {
            subAreaCode = res.code
          })
        }
        else {
          for (let i = 0; i < length - 1; i++) {
            subAreaCode = subAreaCode + subarea[i].code + ","
            subAreaCode1 = subarea[i + 1].code
          }
        }
        this.setState({
          subAreaCode: subAreaCode + subAreaCode1
        })
        let doctorObj = {}
        let doctors = []
        var data = {
          "Index": "M_NewDoctorList",
          "Data": {
            "campaign": this.state.campaignCode,
            "subarea": subAreaCode + subAreaCode1,
            "fscode": this.state.mrCode
          }
        }
        postToServer(URL_CAMPAIGN, data).then((Result) => {
          if (Result.data.Status == 'Success') {
            this.setState({ doctorList: Result.data.data })
          }
        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in doctor list" })
        })
      } else if (this.state.campaignValue == "-1") {
        this.setState({
          campaignErr: "Please select campaign"
        })
      } else if (this.state.mrValue == "-1") {
        this.setState({
          mrErr: "Please Select MR"
        })
      } else if (subarea.length == 0) {
        this.setState({
          subAreaErr: "Please select SubArea"
        })
      }

    }
  }
  onCheckAll(event) {
    let subAreaList = this.state.subAreaList
    if (this.state.subAreaList.length > 0) {
      subAreaList.forEach(res => {
        res.isChecked = event.target.checked
      })
      this.setState({ subAreaList: subAreaList })
    }
  }
  errorMsg(data) {
    this.setState({
      doctorErr: data,
      doctorSelectedData:{}
    })
  }
  onCheck(event) {
    let subAreaList = this.state.subAreaList
    subAreaList.forEach(res => {
      if (res.C_Code == event.target.value) {
        res.isChecked = event.target.checked
      }
    })
    this.setState({ subAreaList: subAreaList })
  }
  render() {
    let mr = this.state.mrName
    let campaigndropdown = [], subareadropdown = [], doctorListCheckbox = [], mrdropdown = [], mrCode = ""
    this.state.campaignList.map(ele => {
      campaigndropdown.push({
        key: ele.Code,
        text: ele.Name,
        value: ele.Name
      })
    })
    if (localStorage.getItem("type") == '1') {
      mrdropdown.push({
        key: this.state.fsCode,
        text: this.state.fsName,
        value: this.state.fsName
      })
    }
    if (localStorage.getItem("type") == '2') {
      this.state.mrList.map(ele => {
        mrdropdown.push({
          'key': ele["C_Code"],
          'text': ele["C_Name"],
          'value': ele["C_Name"]
        })
      })
      this.state.mrList.map(ele => {
        if (ele.C_Name.trim() == this.state.mrValue.trim()) {
          mrCode = ele.C_Code
        }
      })

    }
    const { filterdata, selectedData, subAreaList, sa } = this.state
    const items = subAreaList.reduce((prev, item, index) => {
      const id = item.C_Code + "$" + item.C_Name;
      const selection = selectedData[id] ? selectedData[id] : false
      prev.push(
        <div>
          <label className="table-checkbox-label mt-checkbox doctor-name">
            <input
              readOnly
              type="checkbox"
              className="table-customized-checkbox doctor-name"
              checked={item["isChecked"]}
              value={item["C_Code"]}
              onClick={this.onCheck}
            />
            <span className="table-checkbox-custom mt-checkbox doctor-name"></span>
            <span className="checkbox-label1">{item["C_Name"]}</span>
          </label>
        </div>
      )
      return prev
    }, [])
    const selections = subAreaList.reduce((p, n, i) => {
      if (n.isChecked == true) {
        p.push(
          <div key={n} className="selectedDropdown1 text-capital"> {n.C_Name.toLowerCase()}</div>
        )
      }
      return p
    }, [])

    return (
      <div className="content-spacing body-scroll">
        <div className="min-height-100">
          <div className="dcr-head">
            <div>
              <h4 className="daily-call-report">
                Campaign Request
                        </h4>
            </div>
            <div>
              <Breadcrumb className="dcr-breadcrumb">
                <Breadcrumb.Item>
                  <Link to="/">Dashboard </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  Operational
                            </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {localStorage.getItem("type") == '2' ?
                    <Link to="/managerCampaign">Campaign Request List </Link> :
                    localStorage.getItem("type") == '3'?
                    <Link to="/adminConfirmationList">Campaign Request List </Link>:
                    <Link to="/campaignRequestList">Campaign Request List </Link>
                  }
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                  New Request Entry
                            </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div>
            <>
              <div>
                <div className="pullleft KamClaimTablesfc">
                  <div>
                    <h5 className="dcr-list-sec-head">
                      Campaign Request Entry
                    </h5>
                  </div>
                  {this.props.location.EditViewData.showData == true ?
                    <div className ="ctable-1">
                    <table className ="table-data">
                    <tbody>
                    <tr>
                     <th className = "campaign-padleft"><span className="history-label">Requested By</span></th>
                     <th className = "campaign-padleft"><span className="history-label">Request Date</span></th>
                     <th className = "campaign-padleft"><span className="history-label">No.of Doctors</span></th>
                     <th className = "campaign-padleft"><span className="history-label">Status</span></th>
                     <th className = "campaign-padleft"><span className="history-label">Request Note</span></th>

                    </tr>
                     <tr>
                     <td className = "campaign-padleft"><span className="details-input1">{this.state.requestedBy}</span></td>
                     <td className = "campaign-padleft"><span className="details-input1">{this.state.requestDate}</span></td>
                     <td className = "campaign-padleft"><span className="details-input1">{this.state.noofDoctors}</span></td>
                     <td className = "campaign-padleft"><span className="details-input1">{this.state.status}</span></td>
                     <td className = "campaign-padleft note-width"><span className="details-input1">{this.state.note}</span></td>

                    </tr>
                     
                    </tbody>
                    </table>
                      <hr/>
                      </div>
                      : ""}
                  {this.props.location.EditViewData.showTable == true && this.state.approvalType == "1"?
                     <div className ="ctable-1">
                    <table className ="table-data">
                    <thead>
                    <tr>
                     <th className = "campaign-padleft"><span className="history-label">{this.state.status == "Rejected" ? "Rejected By":"Approved By" }</span></th>
                     <th className = "campaign-padleft"><span className="history-label">{this.state.status == "Rejected" ? "Rejected Date":"Approved Date" }</span></th>
                     <th className = "campaign-padleft note-width"><span className="history-label">{this.state.status == "Rejected" ? "Rejected Note":"Approved Note" }</span></th>
                   </tr>
                   </thead>
                  
                                        <tbody>
                                            <tr>
                                                <td className = "campaign-padleft"><span className="details-input1">{this.state.approvedBy}</span></td>
                                                <td className = "campaign-padleft"><span className="details-input1">{this.state.approvedDate}</span></td>
                                                <td className = "campaign-padleft note-width"><span className="details-input1">{this.state.approvalNote}</span></td>
                        </tr>
                                        </tbody>
                                      
                    
                    </table>
                     <hr />
                      </div>
                    : null  }   
                  {this.state.approvalType == "2" ?
                     <div className ="ctable-1">
                    <table className ="table-data">
                    {this.state.approvalHistory.length > 0 ?

                    <thead>
                    <tr>
                     <th className = "campaign-padleft"><span className="history-label">Approved By</span></th>
                     <th className = "campaign-padleft"><span className="history-label">Approved Date</span></th>
                     <th className = "campaign-padleft note-width"><span className="history-label">Approved Note</span></th>
                   </tr>
                   </thead>
                   :
                  ""
                }

                 {this.state.approvalHistory.length ? this.state.approvalHistory.map(res =>
                                        <tbody>
                                            <tr>
                                                <td className = "campaign-padleft"><span className="details-input1">{res.C_Name}</span></td>
                                                <td className = "campaign-padleft"><span className="details-input1">{res.ApprovedDate}</span></td>
                                                <td className = "campaign-padleft note-width"><span className="details-input1">{res.AppNote}</span></td>
                        </tr>
                                        </tbody>) : ""
                                      }
                    
                    </table>
                    
                      </div>
                    : null  }
                    {this.props.location.EditViewData.showTable == true && this.state.approvalType == "2"  ?
                     <div className ="ctable-1">
                    <table className ="table-data">
                    {this.state.rejectedHistory.length > 0 ?

                    <thead>
                    <tr>
                     <th className = "campaign-padleft"><span className="history-label">Rejected By</span></th>
                     <th className = "campaign-padleft"><span className="history-label">Rejected Date</span></th>
                     <th className = "campaign-padleft note-width"><span className="history-label">Rejected Note</span></th>
                   </tr>
                   </thead>
                   :
                  null
                }

                 {this.state.rejectedHistory.length ? this.state.rejectedHistory.map(res =>
                                        <tbody>
                                            <tr>
                                                <td className = "campaign-padleft"><span className="details-input1">{res.C_Name}</span></td>
                                                <td className = "campaign-padleft"><span className="details-input1">{res.RejectDate}</span></td>
                                                <td className = "campaign-padleft note-width"><span className="details-input1">{res.RejectNote}</span></td>
                        </tr>
                                        </tbody>) : 
                                       ""}
                    
                    </table>
                      </div>
                    : null  }
                       
                  {this.state.status == "Confirmed" || this.state.status == "Confirmator Rejected" ?
                     <div className ="ctable-1">
                    <table className ="table-data">
                    <tbody>
                    <tr>
                     <th className = "campaign-padleft"><span className="history-label">{this.state.status == "Confirmed" ? "Confirmed By" : "Confirmator-Rejected By"}</span></th>
                     <th className = "campaign-padleft"><span className="history-label">{this.state.status == "Confirmed" ? "Confirmed Date" : "Confirmator-Rejected Date"}</span></th>
                     <th className = "campaign-padleft note-width"><span className="history-label">{this.state.status == "Confirmed" ? "Confirmed Note" : "Confirmator-Rejected Note"}</span></th>

                   </tr>
                   
                     <tr>
                     <td className = "campaign-padleft"><span className="details-input1">{this.state.confirmedBy}</span></td>
                     <td className = "campaign-padleft"><span className="details-input1">{this.state.confirmDate}</span></td>
                      <td className = "campaign-padleft note-width"><span className="details-input1">{this.state.confirmNote}</span></td>

                      </tr>
                     
                    </tbody>
                    </table>
                    <hr/>
                      </div>

                    : ""}

                  <div className="alldropsfclocation">
                    <div className="locationsfa">
                      {this.props.location.EditViewData.editableAll == true || this.props.location.EditViewData.newEntry == true ?
                        <div className="user-heirarchy-field-containers campaign-dd">
                          <SearchDropdown
                            className="designation"
                            labelName="Campaign"
                            errorMessage={this.state.campaignErr}
                            important={true}
                            placeholder="Select Campaign"
                            Selected={this.state.campaignValue}
                            dropdownList={campaigndropdown}
                            getValue={this.getCampaignValue}
                          />
                        </div> :
                        <div className="user-heirarchy-field-containers">
                          <Form.Label className="customized-label">Campaign<span className="colorRed">*</span></Form.Label>
                          <div className="campaign-name">
                            <input type="text" className="dropdown-input input-text" value={this.state.campaignValue} />
                            <img className="image-1" src="../../public/assets/images/Path 2590.svg" alt="" />
                          </div>
                        </div>
                      }
                    </div>
                    {
                      localStorage.getItem("type") == '2' || localStorage.getItem("type") == '3' ?
                        this.props.location.EditViewData.editableAll == true || this.props.location.EditViewData.newEntry == true ?
                          <div className="locationsfa">
                            <div className="user-heirarchy-field-containers">
                              <SearchDropdown
                                className="designation"
                                labelName="MR"
                                errorMessage={this.state.mrErr}
                                important={true}
                                placeholder="Select MR"
                                Selected={this.state.mrValue}
                                dropdownList={mrdropdown}
                                getValue={this.getMrValue}
                              />
                            </div>
                          </div> :
                          <div className="locationsfa">
                            <div className="user-heirarchy-field-containers">
                              <Col lg={3} md={3} sm={12} xs={12}>
                                <Form.Label className="customized-label">MR<span className="colorRed">*</span></Form.Label>
                              </Col>
                              <div className="campaign-name">
                                <input type="text" className="dropdown-input input-text" value={this.state.mrValue} />
                                <img className="image-1" src="../../public/assets/images/Path 2590.svg" alt="" />
                              </div>
                            </div>
                          </div>

                        : localStorage.getItem("type") == '1' ?
                          <div className="locationsfa">
                            <div className="user-heirarchy-field-containers">
                              <Form.Label className="customized-label">MR<span className="colorRed">*</span></Form.Label>

                              <div className="campaign-name">
                                <input type="text" className="dropdown-input input-text" value={this.state.fsName} />
                                <img className="image-1" src="../../public/assets/images/Path 2590.svg" alt="" />
                              </div>
                            </div>
                          </div> : null
                    }
                    <div className="locationsfa">
                      <div className="user-heirarchy-field-containers jhd">
                        <div className="productDetailDrop">
                          <div className="sfa-search-dropdown .search-dropdown-label subareaLable">SubArea<span className="colorRed">*</span></div>
                          <Dropdown className="multiple-dropdown marginBot10">
                            <Dropdown.Toggle id="dropdown-basic">
                              <div className="subarea-input">
                                <input className="subarea-text" placeholder="Select SubArea" />
                              </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <div className="Padding10 paddingTop jointData cal-scrollbar">
                                <div>
                                  <label className="table-checkbox-label mt-checkbox  doctor-name">
                                    <input
                                      readOnly
                                      type="checkbox"
                                      className="table-customized-checkbox"
                                      checked={subAreaList["isChecked"]}
                                      value={subAreaList["C_Code"]}
                                      onClick={this.onCheckAll}
                                    />
                                    <span className="table-checkbox-custom mt-checkbox ml-checkbox"></span>
                                    <span className="checkbox-label1 doctor-name ml-checkbox">All</span>
                                  </label>
                                </div>
                                <div className="mt-30">
                                  {items}
                                </div>
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="selectedDiv">
                          {selections}
                          <div className="daterror-msg"> {selections == "" ? this.state.subAreaErr : ""} </div>
                        </div>
                      </div>
                    </div>
                    {this.props.location.EditViewData.editableAll == true || this.props.location.EditViewData.newEntry == true ?
                      <Button className="sfcAddBtn-loaditem" onClick={this.gobtn}>Go</Button> : ""
                    }

                  </div>
                </div>
              </div>

              {this.state.show ?
                <div className="dcr-list-sec pt-15">
                  <DoctorList
                    data={this.state.doctorList}
                    campaign={this.state.campaignCode}
                    subarea={this.state.subAreaCode}
                    mr={localStorage.getItem("type") == "1" ? this.state.fsCode : this.state.mrCode}
                    errorMsg={this.errorMsg}
                    doctorErr={this.state.doctorErr}
                    editData={this.state.editData != undefined && this.state.editData}
                    srno={this.props.match.params.id}
                    showHideSendRequestBtn={this.props.location.EditViewData != undefined ? this.props.location.EditViewData.showHideBtn : ""}
                    showHideAcceptRejectBtn={this.props.location.EditViewData != undefined ? this.props.location.EditViewData : ""}
                    handleSearchDoctor={this.handleSearchDoctor}
                    showTab={this.props.location.EditViewData.showTab != undefined ? this.props.location.EditViewData.showTab : ""}
                    showApproveTabinAdmin ={this.props.location.EditViewData.showApproveTabinAdmin != undefined ? this.props.location.EditViewData.showApproveTabinAdmin : ""}
                    status={this.state.status}
                    appType ={this.state.approvalType}
                    clearDoctorCount ={this.state.clearDoctorCount}
                    multipleApproversNote ={this.state.multipleApproversNote}
                    approversRejectionNote ={this.state.approversRejectionNote}
                  />
                </div>
                : null
              }
            </>
          </div>
             <Footer />
        </div>
     
      </div>
    )
  }
}
export default campaignRequestEntry;


