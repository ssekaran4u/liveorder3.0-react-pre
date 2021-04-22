import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { postToServer } from '../../lib/comm-utils'
import { URL_CAMPAIGN } from '../../lib/constants'
import Drop from '../../BasicComponet/DropDown'
import Geocode from "react-geocode";
import Text from '../../BasicComponet/Text'
import { withRouter } from 'react-router-dom'
import SearchDropdown from "../../BasicComponet/searchDropdown";
import ApprovePopup from "../popup/ApprovePopup";
import CampaignCreatedPopup from "../popup/CampaignCreatedPopup";
import RejectPopup from "../popup/RejectPopup";
import CampaignRejectedPopup from "../popup/CampaignRejectedPopup"
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import DoctorListCheckbox from './DoctorListCheckbox'
import DashLoader from "../../lib/DashboardLoader";


class doctorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Error: false,
      Errormsg: '',
      designation: [],
      designationValue: "-1",
      designationErr: "",
      descode: "",
      region: [],
      regionValue: "",
      regionErr: "",
      regioncode: "",
      show: false,
      approveshow: false,
      rejectshow: false,
      campaignRejectedPopupShow: false,
      doctorSelectedData: {},
      notetxt: "",
      doctorSelected: [],
      showSuccessPopup: false,
      data: [],
      filterData: [],
      doctorSelectErr: "",
      SuccessMessage: "",
      doctorErr: "",
      rejectnote: "",
      chars_left: 200,
      max_char: 200,
      maxlengthText: 200,
      showRemaing: true,
      rejectErr: "",
      doctorListmodified: false,
      approvalNote: "",
      confirmnote: "",
      subAreaCode: "",
      noteMandatory: "",
      approvalNote1:""
    }
    this.onHide = this.onHide.bind(this)
    this.getDoctorList = this.getDoctorList.bind(this)
    this.reset = this.reset.bind(this)
    this.onNotechange = this.onNotechange.bind(this)
    this.sendRequest = this.sendRequest.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.accept = this.accept.bind(this)
    this.closeSuccessPopup = this.closeSuccessPopup.bind(this)
    this.approve = this.approve.bind(this)
    this.rejectPopup = this.rejectPopup.bind(this)
    this.reject = this.reject.bind(this)
    this.rejectNote = this.rejectNote.bind(this)
    this.errorMsg = this.errorMsg.bind(this)
    this.confirm = this.confirm.bind(this)
    this.rejectAdmin = this.rejectAdmin.bind(this)
  }
  componentDidUpdate(prevprops, prevstate) {
    if (this.state.subAreaCode != this.props.subarea) {
      this.setState({ subAreaCode: this.props.subarea })
    }
    if(this.props.clearDoctorCount != prevprops.clearDoctorCount){
     this.setState({doctorSelectedData:{}})
    }
  }
  componentDidMount() {
    let item = {}
    let doctors = [], doctorObj = {}
    if (this.props.editData != undefined && this.props.editData != null && Object.keys(this.props.editData).length > 0) {   
      this.props.editData.Selected_doct.map(ele => {
        const id = ele["C_Name"].trim() + "$" + ele.Code
        item = {
          DoctCode: ele.Code,
          DoctName: ele["C_Name"].trim(),
          disabled: false

        }
        this.getDoctorList(id, ele["C_Name"].trim(), true, item)
      })
      let charLength = 0
      if (this.props.showHideAcceptRejectBtn.noteText == true) {
        const charCount = this.props.editData.Headlist[0].Note.length;
        const maxChar = this.state.max_char;
        if (maxChar != charCount) {
          charLength = maxChar - charCount;
        }
      }
      else if (this.props.showHideAcceptRejectBtn.approvalNote == true) {
        if(this.props.multipleApproversNote == ""){
           const charCount1 = this.props.editData.Headlist[0].appnote.length;
        const maxChar1 = this.state.max_char;
        if (maxChar1 != charCount1) {
          charLength = maxChar1 - charCount1;
        }
        }else{
        const charCount1 = this.props.multipleApproversNote.length;
        const maxChar1 = this.state.max_char;
        if (maxChar1 != charCount1) {
          charLength = maxChar1 - charCount1;
        }
      }
    }
      else if (this.props.showHideAcceptRejectBtn.confirmNote == true) {
        const charCount2 = this.props.editData.Headlist[0].ConfirmNote.length;
        const maxChar2 = this.state.max_char;
        if (maxChar2 != charCount2) {
          charLength = maxChar2 - charCount2;
        }
      }
      this.setState({
        notetxt: this.props.editData.Headlist[0].Note,
        doctorListmodified: false,
        confirmnote: this.props.editData.Headlist[0].ConfirmNote,
        approvalNote:this.props.multipleApproversNote == "" && this.props.appType == "1" ? this.props.editData.Headlist[0].appnote : this.props.multipleApproversNote == "" && this.props.appType == "2"?this.props.approversRejectionNote :this.props.multipleApproversNote,
        showRemaing: false,
        maxlengthText: charLength,
        subAreaCode: this.props.subarea
      })
    }
  }

  handleSearch(e) {
    let value = e.target.value;
    if (this.props.data != undefined) {
      const newData = this.props.data.filter(item => {
        const itemData = `${item.DoctName.toLowerCase()}`;
        const textData = value.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        filterData: newData
      })
    }
  }
  reset() {
    this.setState({
      doctorSelectedData: {},
      notetxt: ""
    })
  }
  onHide() {
    this.setState({ showSuccessPopup: false })
  }

  onNotechange(e) {
    let charLength = 0
    const note = e.target.value;
    const charCount = e.target.value.length;
    const maxChar = this.state.max_char;
    if (maxChar != charCount) {
      charLength = maxChar - charCount;
    }
    this.setState({
      Errormsg: '',
      notetxt: e.target.value,
      approvalNote: e.target.value,
      confirmnote: e.target.value,
      showRemaing: false,
      maxlengthText: charLength,
      noteMandatory: "",
      approvalNote1:e.target.value
    })
  }

  rejectPopup() {
    if(Object.keys(this.state.doctorSelectedData).length > 0){
    if (this.state.doctorListmodified == true && this.state.confirmnote == "" && this.props.showHideAcceptRejectBtn.confirmNote == true) {
      this.setState({ noteMandatory: "Please Enter Note" })
    } else if (this.state.doctorListmodified == true && this.state.approvalNote == "" && this.props.showHideAcceptRejectBtn.approvalNote == true) {
      this.setState({ noteMandatory: "Please Enter Note" })
    } else {
      this.setState({
        rejectshow: true,
        noteMandatory: ""
      })
    }
  }else{
    this.setState({doctorErr:"Please Select atleast one doctor"})
  }
  }
  getDoctorList(id, name, checked, item) {
    this.setState({ doctorErr: "" })
    let selectedDoctortemp = {}, doctorListmodified = false
    selectedDoctortemp = this.state.doctorSelected
    let { doctorSelectedData } = this.state
    if (checked) {
      doctorSelectedData[id] = item.DoctCode
      doctorListmodified = true
      selectedDoctortemp[item.DoctCode] = item.DoctName
    } else if (doctorSelectedData[id] == name) {
      doctorSelectedData[id] = false
      doctorListmodified = true
      delete selectedDoctortemp[item.DoctCode]
    } else {
      doctorListmodified = true
      delete doctorSelectedData[id]
    }
    this.setState({
      doctorSelectedData: doctorSelectedData,
      doctorSelected: selectedDoctortemp,
      doctorListmodified: doctorListmodified,
      noteMandatory: ""
    })
  }
  rejectNote(value) {
    let charLength = 0
    const charCount = value.length;
    const maxChar = this.state.max_char;
    if (maxChar != charCount) {
      charLength = maxChar - charCount;
    }
    this.setState({
      Errormsg: '',
      showRemaing: false,
      maxlengthText: charLength,
      rejectnote: value,
      rejectErr: ""
    })
  }

  confirm() {
        this.setState({approveshow:false})

    let doctorCode = "", doctorCode1 = ""
    let length = Object.values(this.state.doctorSelectedData).length
    if (length == 1) {
      doctorCode = Object.values(this.state.doctorSelectedData)
    }
    for (let i = 0; i < length - 1; i++) {
      doctorCode = doctorCode + Object.values(this.state.doctorSelectedData)[i] + ","
      doctorCode1 = Object.values(this.state.doctorSelectedData)[i + 1]
    }
    var data = {
      "Index": "ConfirmAdmin",
      "Data": {
        "srno": this.props.srno,
        "note": this.state.confirmnote,
        "doctor": doctorCode + doctorCode1
      }
    }
    postToServer(URL_CAMPAIGN, data).then((Result) => {
      if (Result.data.Status == 'Success') {
        if (Result.data.data[0].result == "Selected No of Drs Count Is Greater Than Campaign Allowed Drs Count ") {
          alert(Result.data.data[0].result)
        } else {
          this.setState({
            showSuccessPopup: true,
            SuccessMessage: Result.data.data[0].result
          })
        }
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in sending request" })
    })
  }
  sendRequest() {
    let doctorCode = '', doctorCode1 = '';
    let length = Object.values(this.state.doctorSelectedData).length
    if (length == 1) {
      doctorCode = Object.values(this.state.doctorSelectedData)
    }
    else {
      for (let i = 0; i < length - 1; i++) {
        doctorCode = doctorCode + Object.values(this.state.doctorSelectedData)[i] + ","
        doctorCode1 = Object.values(this.state.doctorSelectedData)[i + 1]
      }
    }
    if (length == 0) {
      this.props.errorMsg("Please Select atleast one doctor")
      this.setState({
        doctorErr: "Please Select atleast one doctor"
      })
    }
    else {
      let subArea = "", subArea1 = ""
      if (this.props.editData != undefined && this.props.editData.Selected_Subarea != null && this.props.editData.Selected_Subarea.length > 0) {
        let length = this.props.editData.Selected_Subarea.length
        if (length == 1) {
          subArea = this.props.editData.Selected_Subarea[0].Code
        }
        else {
          for (let i = 0; i < length - 1; i++) {
            subArea = subArea + this.props.editData.Selected_Subarea[i] + ","
            subArea1 = this.props.editData.Selected_Subarea[i + 1]
          }
        }
      }
      if(this.props.campaign == "" || this.props.data.length == 0){
      alert("Invalid Request...So Please send a new request")
    }else{
      var data = {
        "Index": "CampaignSave",
        "Data": {
          "campaign": this.props.campaign,
          "subarea": this.state.subAreaCode != this.props.subarea ? this.props.subarea : this.state.subAreaCode,
          "note": this.state.notetxt,
          "doctor": doctorCode + doctorCode1,
          "srno": this.props.srno != undefined ? this.props.srno : "",
          "fscode": this.props.mr != undefined ? this.props.mr : ""
        },
      }
      postToServer(URL_CAMPAIGN, data).then((Result) => {
        if (Result.data.Status == 'Success') {
          if (Result.data.data[0].result == "Selected No of Drs Count Is Greater Than Campaign Allowed Drs Count ") {
            alert(Result.data.data[0].result)
          }
          else if (Result.data.data[0].result == "Updated Successfully  ") {
            this.setState({ showSuccessPopup: true, SuccessMessage: "Resubmitted Successfully" })
          } else if (Result.data.data[0].result == "Saved Successfully  ") {
            this.setState({ showSuccessPopup: true, SuccessMessage: "Request Sent Successfully" })
          }else if(Result.data.data[0].result == "Campaign Request already exists with the same(campaign, subarea,fs)."){
            alert(Result.data.data[0].result)
          }
          else {
            this.setState({
              showSuccessPopup: true,
              SuccessMessage: Result.data.data[0].result
            })
          }

        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in sending request" })
      })
    }
    }
  }
  errorMsg(data) {
    this.props.errorMsg("")
    this.setState({ doctorErr: ""                                                                                        })
  }

  accept() {
     if(Object.keys(this.state.doctorSelectedData).length == 0){
        alert("Please select atleast one doctor")
        }else if(this.props.campaign == ""){
      alert("Invalid Request...")
    }
        else{
           this.setState({
            approveshow: true,
    })
    }
  }
  closeSuccessPopup() {
    this.setState({
      approveshow: false,
      rejectshow: false,
      rejectErr: ""
    })
  }
  approve() {
    this.setState({approveshow:false})
    let doctorCode = "", doctorCode1 = ""
    let length = Object.values(this.state.doctorSelectedData).length
     if(length == 0){
      this.setState({doctorErr:"Please Select atleast one doctor"})
    }
    else if (length == 1) {
      doctorCode = Object.values(this.state.doctorSelectedData)
    }
    for (let i = 0; i < length - 1; i++) {
      doctorCode = doctorCode + Object.values(this.state.doctorSelectedData)[i] + ","
      doctorCode1 = Object.values(this.state.doctorSelectedData)[i + 1]
    }
    var data = {
      "Index": "CampaignApprove",
      "Data": {
        "srno": this.props.srno,
        "note": this.state.approvalNote,
        "doctor": doctorCode + doctorCode1
      },
    }
    postToServer(URL_CAMPAIGN, data).then((Result) => {
      if (Result.data.Status == 'Success') {
        if (Result.data.data[0].result == "Selected No of Drs Count Is Greater Than Campaign Allowed Drs Count ") {
          alert(Result.data.data[0].result)
        } else {
          this.setState({
            showSuccessPopup: true,
            SuccessMessage: Result.data.data[0].result
          })
        }
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in sending request" })
    })
  }
  reject() {
    this.setState({rejectshow:false})
    let doctorCode = "", doctorCode1 = ""
    let length = Object.values(this.state.doctorSelectedData).length
    if (length == 1) {
      doctorCode = Object.values(this.state.doctorSelectedData)
    }
    for (let i = 0; i < length - 1; i++) {
      doctorCode = doctorCode + Object.values(this.state.doctorSelectedData)[i] + ","
      doctorCode1 = Object.values(this.state.doctorSelectedData)[i + 1]
    }
    var data = {
      "Index": "CampaignReject",
      "Data": {
        "srno": this.props.srno,
        "doctor": doctorCode + doctorCode1,
        "note": this.state.approvalNote
      }
    }
    postToServer(URL_CAMPAIGN, data).then((Result) => {
      if (Result.data.Status == 'Success') {
        if(Result.data.data[0].id == "0"){
          alert(Result.data.data[0].result)
        }else{


        this.setState({
          campaignRejectedPopupShow: true,
          SuccessMessage: Result.data.data[0].result
        })
      }
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in sending request" })
    })

  }
  rejectAdmin() {
    this.setState({rejectshow:false})
    let doctorCode = "", doctorCode1 = ""
    let length = Object.values(this.state.doctorSelectedData).length
    if (length == 1) {
      doctorCode = Object.values(this.state.doctorSelectedData)
    }
    for (let i = 0; i < length - 1; i++) {
      doctorCode = doctorCode + Object.values(this.state.doctorSelectedData)[i] + ","
      doctorCode1 = Object.values(this.state.doctorSelectedData)[i + 1]
    }
    var data = {
      "Index": "RejectedAdmin",
      "Data": {
        "srno": this.props.srno,
        "note": this.state.confirmnote,
        "doctor": doctorCode + doctorCode1
      }
    }
    postToServer(URL_CAMPAIGN, data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({
          campaignRejectedPopupShow: true,
          SuccessMessage: Result.data.data[0].result
        })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in sending request" })
    })

  }
  render() {
    const { doctorSelectedData, filterData } = this.state
    let data = []
    let totalLength = 0;
    let notetxtDisable = false, approvalNoteDisable = false, confirmNoteDisable = false
    if (this.props.showHideAcceptRejectBtn.showHideBtn == false) {
      notetxtDisable = true
    }
    if (this.props.showHideAcceptRejectBtn.acceptReject == false) {
      approvalNoteDisable = true
      confirmNoteDisable = true
    }
    if (this.props.data != undefined && this.props.data.length > 0) {
      totalLength = this.props.data.length
    } else {
      totalLength = 0
    }
    if (this.props.data != undefined && this.props.data.length > 0) {
      let doctorData = []
       this.props.data.map(ele=>{
        if(ele.checked == "True"){
          doctorData.push(ele)
        }
       })
        this.props.data.map(ele=>{
        if(ele.checked == "False"){
          doctorData.push(ele)
        }
       })
      data = this.props.data.reduce((prev, item, index) => {
        const id = item.DoctName.trim() + "$" + item.DoctCode;
        const selection = doctorSelectedData[id] ? doctorSelectedData[id] : false
        prev.push(
          <DoctorListCheckbox
            key={index}
            selection={selection}
            getDoctorList={this.getDoctorList}
            id={id}
            item={item}
            clearDoctorCount = {this.props.clearDoctorCount}
            errorMsg={this.errorMsg}
            approvalNoteDisable={approvalNoteDisable}
            confirmNoteDisable={confirmNoteDisable}
            notetxtDisable={notetxtDisable}
          />
        )
        return prev
      }, [])
    }
    const searchDoctor = filterData.reduce((prev, item, index) => {
      const id = item.DoctName.trim() + "$" + item.DoctCode;
      const selection = doctorSelectedData[id] ? doctorSelectedData[id] : false
      prev.push(
        <DoctorListCheckbox
          key={index}
          selection={selection}
          getDoctorList={this.getDoctorList}
          id={id}
          item={item}
          clearDoctorCount = {this.props.clearDoctorCount}
          errorMsg={this.errorMsg}
          approvalNoteDisable={approvalNoteDisable}
          confirmNoteDisable={confirmNoteDisable}
          notetxtDisable={notetxtDisable}
        />
      )
      return prev
    }, [])

    return (
      <React.Fragment>
        {
          !this.props.data ?
            <div className="">
              <DashLoader></DashLoader>
            </div>
            :
            <>
              <div className="flex-row bottomLine">
                <div className="row">
                  <h6 className="pt-15">
                    <span className="selectdoctor">Select the doctor from the list below </span>
                    <span className="heading-doctorlist">( {totalLength} Doctors )</span>
                  </h6>
                </div>
                <div className="flexDisplay paddingRight32 statsuDropdown">
                  <div className="form-group-has-search">
                    <input type="text" name="searchbar" id="searchbar" className="Rectangle-doctor searchhide" placeholder="Search for Doctor" onChange={this.handleSearch} />
                  </div>
                </div>
              </div>

              <div className="alldropsfclocation doctorData cal-scrollbar">
                {this.props.data.length > 0 && filterData == "" ? data : searchDoctor}
              </div>
               <div className="error-msg"> {this.props.doctorErr} </div>

            </>
        }
        <Row className="note-label">
          <Col lg={5} md={5} sm={12} xs={12} >
            <Form.Label className="customized-label">Note</Form.Label>
            <span className="maxLengthNote">Max <span className="maxlenColor">{this.state.maxlengthText}</span> Character</span>
            {localStorage.getItem("type") == "1" || (localStorage.getItem("type") == "2" && this.props.showHideAcceptRejectBtn.noteText == true) ?
              <Form.Control as="textarea"  className="heading-doctorlist" rows="3" placeholder='write here' maxLength="200" disabled={notetxtDisable} value={this.state.notetxt} onChange={this.onNotechange} />
              : ((localStorage.getItem("type") == "2" || localStorage.getItem("type") == "3") && this.props.showHideAcceptRejectBtn.approvalNote == true) ?
                <Form.Control as="textarea" className="heading-doctorlist" rows="3" placeholder='write here' maxLength="200" disabled={approvalNoteDisable} value={this.state.approvalNote} onChange={this.onNotechange} />
              
                : ((localStorage.getItem("type") == "2" || localStorage.getItem("type") == "3"  ) && this.props.showHideAcceptRejectBtn.confirmNote == true) ?
                  <Form.Control as="textarea" className="heading-doctorlist" rows="3" placeholder='write here' maxLength="200" disabled={confirmNoteDisable} value={this.state.confirmnote} onChange={this.onNotechange} />
                  : ""
            }
          </Col>
        </Row>
        <div className="error-msg"> {this.state.noteMandatory}</div>
        <div className="ml-9">
          {
            (localStorage.getItem("type") == '2' && this.props.showHideAcceptRejectBtn.showTab ) || (localStorage.getItem("type") == '3' && this.props.showHideAcceptRejectBtn.acceptRejectShowHide == true &&  this.props.showHideAcceptRejectBtn.confirmNote == true) ?
              <Button onClick={this.accept} className="acceptBtn mb-2">Confirm</Button> :
              (localStorage.getItem("type") == '2'|| localStorage.getItem("type") == '3') && this.props.showHideAcceptRejectBtn.acceptReject == true && this.props.showHideAcceptRejectBtn.acceptRejectShowHide == true ? <Button className="acceptBtn  mb-2" onClick={this.accept}>Approve</Button> :
                localStorage.getItem("type") == '2' && this.props.showHideAcceptRejectBtn.acceptReject == false ? "" :
                  localStorage.getItem("type") == '2' && this.props.showHideAcceptRejectBtn.acceptRejectShowHide == false ? "" :
                    this.props.showHideSendRequestBtn == false ? <div></div> : (localStorage.getItem("type") == '1' && this.props.showHideAcceptRejectBtn.editableDoctorNote == true) || (localStorage.getItem("type") == '2' && this.props.showHideAcceptRejectBtn.editableDoctorNote == true) ?
                      <Button onClick={this.sendRequest} className="sendRequest-btn">Resubmit</Button> : (localStorage.getItem("type") == "1" && this.props.showHideAcceptRejectBtn.showHideBtn == true || localStorage.getItem("type") == "2" && this.props.showHideAcceptRejectBtn.showHideBtn == true) ?
                        <Button onClick={this.sendRequest} className="sendRequest-btn">Send Request</Button> : ""
          }
          {
            localStorage.getItem("type") == '3' && this.props.showHideAcceptRejectBtn.acceptRejectShowHide == true ?
              <Button onClick={this.rejectPopup} className="danger danger-outline mr-2 mb-2  mt-18 padleft" >Reject</Button> :
              localStorage.getItem("type") == '2' && this.props.showHideAcceptRejectBtn.acceptReject == true && this.props.showHideAcceptRejectBtn.acceptRejectShowHide == true ? <Button onClick={this.rejectPopup} className="danger danger-outline mr-2 mb-2  mt-18 padleft" >Reject</Button> :
                this.props.showHideSendRequestBtn == true ? <Button onClick={this.reset} className="danger danger-outline padleft mt-12" >Reset</Button> : ""
          }
        </div>
        <ApprovePopup
          show={this.state.approveshow}
          onHide={this.closeSuccessPopup}
          showTab = {this.props.showHideAcceptRejectBtn.showTab}
          confirmation ={this.props.showHideAcceptRejectBtn.confirmNote == true}
          showApproveTabinAdmin ={this.props.showHideAcceptRejectBtn.showApproveTabinAdmin}
          approve={localStorage.getItem("type") == '2' && this.props.showHideAcceptRejectBtn.showTab ? this.confirm : localStorage.getItem("type") == '3' ? this.confirm : this.approve}
        />
        <CampaignCreatedPopup
          show={this.state.showSuccessPopup}
          onHide={this.onHide}
          message={this.state.SuccessMessage}
        />
        <RejectPopup
          show={this.state.rejectshow}
          onHide={this.closeSuccessPopup}
          reject={localStorage.getItem("type") == '2' && this.props.showHideAcceptRejectBtn.showTab ? this.rejectAdmin : localStorage.getItem("type") == '3' ? this.rejectAdmin : this.reject}
          rejectNote={this.rejectNote}
          rejectErr={this.state.rejectErr}
        />
        <CampaignRejectedPopup
          show={this.state.campaignRejectedPopupShow}
          onHide={this.closeSuccessPopup}
        />
        <hr />
        <div>
          <span className="ml-20 heading-doctorlist"> {Object.keys(this.state.doctorSelectedData).length} out of {totalLength} Doctors are selected</span>
        </div>
      </React.Fragment>
    )
  }
}
export default doctorList;





   /// {localStorage.getItem("type") == '2'  ? 
   //            localStorage.getItem("type") == '3' ?
   //            <Button className="acceptBtn">Confirm</Button>  : null


   //           }
   //               in case of new entry or edit confirm button ,in case of view just put done button for admin
   //               in case of new entry or edit send request button, in case of view just accept button for manager

//                    <Button  onClick={this.showSuccessPopup} className="sfcAddBtn-loaditem">Send Request</Button> 


//<button className="savedcrBtn  mb-2" onClick={()=>this.showSuccessPopup(this.state.stayLocation)}>Save DWR</button>
          //              <button onClick={this.reset} className="danger danger-outline mr-2 mb-2 padleft" >Reset</button>



                  // <Col lg={5} md={5} sm={12} xs={12} >
                  //    <Form.Label className="customized-label ml-10">Note</Form.Label>
                  //       <span className="maxLengthNote">Max <span className="maxlenColor">{this.state.maxlengthText}</span> Character</span>  
                  //       {localStorage.getItem("type") == "1" || localStorage.getItem("type") == "2" && this.props.showHideAcceptRejectBtn.showTable == false && this.props.showHideAcceptRejectBtn.showData == false ?
                  //       <Form.Control as="textarea" rows="3" placeholder='write here'maxLength="200"  value = {this.state.notetxt} onChange={this.onNotechange} />
                  //       : localStorage.getItem("type") == "2" && this.props.showHideAcceptRejectBtn.showTable == false && this.props.showHideAcceptRejectBtn.showData == true ? 
                  //           <Form.Control as="textarea" rows="3" placeholder='write here'maxLength="200" value = {this.state.approvalNote} onChange={this.onNotechange} /> 
                  //           : localStorage.getItem("type") == "3" || localStorage.getItem("type") == "2" &&  this.props.showHideAcceptRejectBtn.showData == true && this.props.showHideAcceptRejectBtn.showTable == true ? 
                  //           <Form.Control as="textarea" rows="3" placeholder='write here'maxLength="200"  value = {this.state.confirmnote} onChange={this.onNotechange} /> 
                  //           :""
                  //         }


                  //           </Col>