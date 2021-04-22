import React, { useEffect, useState, Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { postToServer, fileUpload } from '../../lib/comm-utils'
import Resizer from 'react-image-file-resizer';
import  {URL_BASE} from '../../lib/constants'
import axios from 'axios'
import PrevExpenseApproverList from './PrevExpenseApproverList'
import SfaSpinner from "../../BasicComponet/sfaSpinner";


class ExpensePopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      area: "",
      region: "",
      rpsDate: "",
      reqDate: "",
      subarea: "",
      speciality: "",
      CurrentBusiness: "",
      ExpectedBusiness: "",
      serviceType: "",
      actualexpbill1: 0,
      actualexpbill2: 0,
      miscExp: 0,
      totalActualExpense: 0,
      advanceReceived: "",
      balance: 0,
      btcExp: "",
      checked: false,
      reason: "",
      imageUploadFile: [],
      imageUploadBill: [],
      imageUpload: [],
      uploadedFile: "",
      uploadedBill: "",
      showSuccess: false,
      billUpload: [],
      fileUpload: [],
      expectedCostOfService: "",
      uploadBillValidate: "",
      uploadFileValidate: "",
      rejectReasonValidate: "",
      removeUploadedFiles: "",
      removeUploadedBills: "",
      disabled: false,
      requestForCancel: "",
      remarks: "",
      fsName: "",
      doctorName: "",
      doctorCode: "",
      dGrade: "",
      expStatus: "",
      appConfirmbutton:"",
      prevRemarks:[],
      saveFile:"",
      saveBill:"",
      disabledCheckbox:false,
      disableRemarks:false,
      spinner: false,
      disableFileAndBill:false,
      billFileButtonShowHide:""

    }
    this.actualExpBill1 = this.actualExpBill1.bind(this)
    this.actualExpBill2 = this.actualExpBill2.bind(this)
    this.sendForApproval = this.sendForApproval.bind(this)
    this.miscExp = this.miscExp.bind(this)
    this.btcExp = this.btcExp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.reason = this.reason.bind(this)
    this.remarks = this.remarks.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.uploadBill = this.uploadBill.bind(this)
    this.onCancelFile = this.onCancelFile.bind(this)
    this.onCancelBill = this.onCancelBill.bind(this)
    this.approve = this.approve.bind(this)
    this.onDownloadFile = this.onDownloadFile.bind(this)
    this.onDownloadBill = this.onDownloadBill.bind(this)
    this.getData = this.getData.bind(this)

  }

  getData(){
    let files = [], bills = [], chekedForCancel = false, reasonforCancel = "",disableBillFile = false, requestCanceld = "",billFileButtonShowHide = "";
    let disbalebillFilen_advflg =  false
    var data = {
      "Index": "AppExpenceListSrnoClick",
      "data": {
        "srno": this.props.srno
      },
      "Token": ""
    }
    postToServer("Rps", data).then((Result) => {
      if (Result.data.Status == "Success") {
        Result.data.PRPPhotoDet.map((res, i) => {
          if(res.ImgFilename!= ""){
          files.push({
            "id": i,
            "ImgFilename": res.ImgFilename,
            "path": ""
          })
        }
        })
        Result.data.PRPBillDet.map((res, i) => {
          if(res.ImgFilename!= ""){
          bills.push({
            "id": i,
            "ImgFilename": res.ImgFilename,
            "path": ""
          })
        }
        })
            if(Result.data.ReqAdvFlagforimage.length > 0){
              Result.data.ReqAdvFlagforimage.map(res=>{
                billFileButtonShowHide = res.n_advflg
                if(res.n_advflg == "1"){
                  disbalebillFilen_advflg =true
                }
              })
                          }
            if(Result.data.cancelReq.length > 0){
              Result.data.cancelReq.map(res=>{
                if(res.n_exp_cancel_req == "1"){
                   requestCanceld =  res.n_exp_cancel_req
                  chekedForCancel = true
                  disableBillFile = true
                  reasonforCancel = res.c_exp_cancel_Remarks,
                this.setState({  disableFileAndBill: disableBillFile})
                }else{
                requestCanceld =  res.n_exp_cancel_req
                chekedForCancel = false
                reasonforCancel = ""
                disableBillFile = false
         this.setState({  disableFileAndBill: disableBillFile})

          }
              })

         }
        this.setState({
          area: Result.data.data[0].area,
          region: Result.data.data[0].region,
          rpsDate: Result.data.data[0].rpsdate,
          reqDate: Result.data.data[0].reqdate,
          subarea: Result.data.data[0].subarea,
          speciality: Result.data.data[0].speciality,
          CurrentBusiness: Result.data.data[0].CurrentBusiness,
          ExpectedBusiness: Result.data.data[0].ExpectedBusiness,
          serviceType: Result.data.data[0].typeofservice,
          advanceReceived: Result.data.data[0].AdvanceReceived,
          actualexpbill1: Result.data.data[0].ActualBillAmount1,
          actualexpbill2: Result.data.data[0].ActualBillAmount2,
          miscExp: Result.data.data[0].MiscExpense,
          totalActualExpense: Result.data.data[0].ActualExpense,
          balance: Result.data.data[0].balance,
          btcExp: Result.data.data[0].servicereq,
          expectedCostOfService: Result.data.data[0].expcostofservc,
          imageUploadFile: files,
          imageUploadBill: bills,
          fsName: Result.data.data[0].fs,
          doctorName: Result.data.data[0].docname,
          doctorCode: Result.data.data[0].doccode,
          dGrade: Result.data.data[0].docgrade,
          expStatus: Result.data.data[0].STATUS,
          prevRemarks:Result.data.PrevRemarks,
          checked:chekedForCancel,
          reason:reasonforCancel,
          appConfirmbutton: Result.data.AppCOnfStat[0].status,
          RequestCancelUploadBillEnable:requestCanceld,
          disabled: (Result.data.AppCOnfStat[0].status == "Approve" || Result.data.AppCOnfStat[0].status == "Confirm" || requestCanceld == "1") || (Result.data.AppCOnfStat[0].status == "Request" && (this.props.nStatus == "4"|| this.props.nStatus == "3" ) && requestCanceld!="1" )? true: false,
          disabledCheckbox: (Result.data.AppCOnfStat[0].status == "Approve" || Result.data.AppCOnfStat[0].status == "Confirm" || this.props.nStatus == "2" || this.props.nStatus == "3" || this.props.nStatus == "4" ) ? true: false,
          disableRemarks:(Result.data.AppCOnfStat[0].status == "Approve" && (this.props.nStatus == "0" || this.props.nStatus == "1") && Result.data.data[0].AdvanceReceived != "0.00" && this.props.singleappstat == undefined) || (Result.data.AppCOnfStat[0].status == "Confirm" &&  Result.data.data[0].AdvanceReceived != "0.00" && (this.props.nStatus == "0" || this.props.nStatus == "2")  && this.props.singleappstat == undefined)? false: true,
          billFileButtonShowHide:billFileButtonShowHide,
          disableFileAndBill:Result.data.AppCOnfStat[0].status == "Approve" || Result.data.AppCOnfStat[0].status == "Confirm"|| disbalebillFilen_advflg == true? true: false,
        })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })


       this.setState({checked:false})
 
  }

  componentDidMount() {
   this.getData()

    
  }
  componentDidUpdate(prevprops, prevstate) {
    if (prevprops.srno != this.props.srno) {
              this.getData()
    }
  }
  actualExpBill1(e) {
    let total = 0, balance = 0,b1 = 0;
    if (e.target.value == "") {
      e.target.value = 0
    }
    total = total + parseInt(e.target.value) + parseInt(this.state.actualexpbill2) + parseInt(this.state.miscExp)
      balance = total - parseInt(this.state.advanceReceived) 
    this.setState({ actualexpbill1: parseInt(e.target.value), totalActualExpense: total, balance: balance })

  }
  actualExpBill2(e) {
    let total = 0, balance = 0;
    if (e.target.value == "") {
      e.target.value = 0
    }
    total = total + parseInt(e.target.value) + parseInt(this.state.actualexpbill1) + parseInt(this.state.miscExp)
         balance = total - parseInt(this.state.advanceReceived) 


    this.setState({ actualexpbill2: parseInt(e.target.value), totalActualExpense: total, balance: balance })
  }
  miscExp(e) {
    let total = 0, balance = 0;
    if (e.target.value == "") {
      e.target.value = 0
    }
    total = total + parseInt(e.target.value) + parseInt(this.state.actualexpbill1) + parseInt(this.state.actualexpbill2)
          balance = total - parseInt(this.state.advanceReceived) 

    this.setState({ miscExp: parseInt(e.target.value), totalActualExpense: total, balance: balance })
  }
  btcExp(e) {
    if (e.target.value == "") {
      e.target.value = 0
    }
    this.setState({ btcExp: parseInt(e.target.value) })
  }
  handleChange(event) {
     //Photo upload delete
    
    this.state.imageUploadFile.map(res => {

    var file = {
      "Index": "RPSPhotoUploadfile_delete",
      "Data": {
        "srno": this.props.srno,
        "filename": res.ImgFilename
      }, "Token": ""
    }
    postToServer("Rps", file)
  })

    //Bill upload delete
        this.state.imageUploadBill.map(res => {

    var bill = {
      "Index": "RPSBillUploadfile_delete",
      "Data": {
        "srno": this.props.srno,
        "filename": res.ImgFilename
      }, "Token": ""
    }
    postToServer("Rps", bill)
  })
    

    const checkstatus=event.target.checked
   if (event.target.checked==true){
    this.setState({ checked: true ,reason:""})
    }else{
      this.setState({ checked: false,reason:""})
    }

    if (checkstatus == true || this.state.imageUploadBill.length > 0 || this.state.imageUploadFile.length > 0) {
      this.setState({
        requestForCancel: "All the data and files will be removed",
        imageUploadFile: [],
        imageUploadBill: [],
        actualexpbill2: 0,
        actualexpbill1: 0,
        miscExp: 0,
        balance: 0,
        totalActualExpense: 0,
        disabled: true
      })
    }
    else if (checkstatus== false) {
      this.setState({ requestForCancel: "", disabled: false })
    }
  }
  reason(e) {
    this.setState({ rejectReasonValidate: "", requestForCancel: "" })
    this.setState({ reason: e.target.value })
  }
  remarks(e) {
    this.setState({ remarks: e.target.value })
  }
  uploadFile(e) {
    this.setState({ uploadFileValidate: "" })
    let files = e.target.files;
    let fileData = []
    Object.values(files).map((res, i) => {
      fileData.push({
        "id": i,
        "ImgFilename": res.name,
        "path": URL.createObjectURL(res)
      })

    })
         let token = localStorage.getItem("SFA_TOKEN")

         const data1 = new FormData();
      Object.values(files).map(res => {
        data1.append("file", res)
      })
      data1.append("Token", token);
      data1.append("Index", "RPSPhotoUpload");
      data1.append("srno", this.props.srno);
      fileUpload("RPSFileUpload", data1).then((result) => {
                if (result.data.Status == "Success") {
                    this.setState({saveFile: result.data.data})
                }
            });
            this.setState({ imageUploadFile: [...this.state.imageUploadFile, ...fileData] })

  }
  uploadBill(e) {
    this.setState({ uploadBillValidate: "" })
    let files = e.target.files;
    let billData = []
    Object.values(files).map((res, i) => {
      billData.push({
        "id": i,
        "ImgFilename": res.name,
        "path": URL.createObjectURL(res)
      })

    })
     let token = localStorage.getItem("SFA_TOKEN")
      const data = new FormData();
      Object.values(files).map(res => {
        data.append("file", res)
      })
      data.append("Token", token);
      data.append("Index", "RPSBillPhotoUpload");
      data.append("srno", this.props.srno);
      fileUpload("RPSBillFileUpload", data).then((result) => {
                if (result.data.Status == "Success") {
                    this.setState({saveBill: result.data.data})
                }
            });
            this.setState({ imageUploadBill: [...this.state.imageUploadBill, ...billData] })


  }
  onCancelFile(image, status) {
    this.setState({ removeUploadedFiles: "" })
    var file = {
      "Index": "RPSPhotoUploadfile_delete",
      "Data": {
        "srno": this.props.srno,
        "filename": image
      }, "Token": ""
    }
    postToServer("Rps", file)
    let result = (this.state.imageUploadFile).filter(img => img.ImgFilename !== image);
    this.setState({ imageUploadFile: result })
  }

  onCancelBill(image, status) {
    this.setState({ removeUploadedBills: "" })
    var bill = {
      "Index": "RPSBillUploadfile_delete",
      "Data": {
        "srno": this.props.srno,
        "filename": image
      }, "Token": ""
    }
    postToServer("Rps", bill)
    let result = (this.state.imageUploadBill).filter(img => img.ImgFilename !== image);
    this.setState({ imageUploadBill: result })

  }
  onDownloadFile(image){
    let image1=image
    let path = URL_BASE +'RPSPhotDownload'
     if(image == ""){
      alert("No Data Available to Download")
    }else{
   var data = {
    "Data":{ 
      "srno":this.props.srno,
      "filename":image
    }
  }
  return axios.post(path,data,{ responseType: 'arraybuffer' }).then((response) => {
    let image = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    let a = document.createElement('a');
    a.href = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
    a.download = image1;
    a.click();
  })
}
}
 onDownloadBill(image){
   let image1=image
    let path = URL_BASE +'RPSBillDownload'
  
     if(image == ""){
      alert("No Data Available to Download")
    }else{
   var data = {
    "Data":{ 
      "srno":this.props.srno,
      "filename":image
    }
  }
  return axios.post(path,data,{ responseType: 'arraybuffer' }).then((response) => {
    let image = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    let a = document.createElement('a');
    a.href = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
    a.download = image1;
    a.click();
  })
}
}
  approve(mode) {
    this.setState({ spinner: true})
   if(mode == "REJECT" && this.state.remarks == ""){
        alert("Please enter remarks")
        this.setState({ spinner: false})


  } else{
      if(mode == "REJECT"){
             //Photo upload delete
    this.state.imageUploadFile.map(res=>{
       var file = {
      "Index": "RPSPhotoUploadfile_delete",
      "Data": {
        "srno": this.props.srno,
        "filename": res.ImgFilename
      }, "Token": ""
    }
    postToServer("Rps", file)
    })
   

    //Bill upload delete
        this.state.imageUploadBill.map(res => {

    var bill = {
      "Index": "RPSBillUploadfile_delete",
      "Data": {
        "srno": this.props.srno,
        "filename": res.ImgFilename
      }, "Token": ""
    }
    postToServer("Rps", bill)
  })
      var data = {
      "Index": "ExpenseApprovalDataSave",
      "data": {
        "srno": this.props.srno,
        "mode": mode.toString(),
        "remarks": this.state.remarks
      }, "Token": ""
    }
    postToServer("Rps", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ spinner: false})
        if(mode.toString() == "APPROVE"){
          alert("Approved successfully")
                  this.props.onHide()

        }
        else if(mode.toString() == "CONFIRM"){
          alert("Confirmed successfully")
                  this.props.onHide()

        }else if(mode.toString() == "REJECT"){
          alert("Rejected successfully")
                  this.props.onHide()

        }

      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in sending request" })
    })
  }else{
     var data = {
      "Index": "ExpenseApprovalDataSave",
      "data": {
        "srno": this.props.srno,
        "mode": mode.toString(),
        "remarks": this.state.remarks
      }, "Token": ""
    }
    postToServer("Rps", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        if(mode.toString() == "APPROVE"){
          alert("Approved successfully")
                  this.props.onHide()

        }
        else if(mode.toString() == "CONFIRM"){
          alert("Confirmed successfully")
                  this.props.onHide()

        }else if(mode.toString() == "REJECT"){
          alert("Rejected successfully")
                  this.props.onHide()

        }

      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in sending request" })
    })

  }
  }
  }
  sendForApproval() {
    this.setState({ spinner: true})
  let imageFileFormat  = [],imageBillFormat = []
  let imagefile = this.state.imageUploadFile.filter(res=>{
    let format =res.ImgFilename.slice((res.ImgFilename.lastIndexOf(".") - 1 >>> 0) + 2)
    if(format == "png"){
      imageFileFormat.push(true)  
    }else if (format == "jpeg"){
      imageFileFormat.push(true)  
    }else if(format == "jpg"){
      imageFileFormat.push(true)  
    }
    else{
      imageFileFormat.push(false)  
    }
  })
   
     let fileFormatData  = imageFileFormat.filter(res=> res == false)
 
     let imageBill = this.state.imageUploadBill.filter(res=>{
      let format1 =res.ImgFilename.slice((res.ImgFilename.lastIndexOf(".") - 1 >>> 0) + 2)
      if(format1 == "png"){
        imageBillFormat.push(true)  
      }else if (format1 == "jpeg"){
        imageBillFormat.push(true)  
      }else if(format1 == "jpg"){
        imageBillFormat.push(true)  
      }
      else{
        imageBillFormat.push(false)  
      }
    })
     
       let billFormatData  = imageBillFormat.filter(res=> res == false)
       let checkedValue = "0";
  
    if (this.state.checked == true) {
      checkedValue = "1";
    } 
   
    // else if(imagebill != "png" || imagebill != "jpg"|| imagebill != "jpeg"){
    // //   alert("Upload  only jpg,jpeg and png bill formats")

    //  }
     if (this.state.checked == false && (this.state.actualexpbill1 == 0)) {
      alert("Please enter Actual Expense as per Bill 1 or Actual Expense as per Bill 2 or Misc Expense ")
      this.setState({ spinner: false})

    }
    else if(this.state.checked == false && fileFormatData.length > 0 ){
      alert(" Please Upload only jpg,jpeg and png file formats for files")
      this.setState({ spinner: false})

    }
    else if(this.state.checked == false && billFormatData.length > 0 ){
      alert(" Please Upload only jpg,jpeg and png file formats for bills")
      this.setState({ spinner: false})

    }
    else if (this.state.checked == true && this.state.reason == "") {
      checkedValue = "1";
      this.setState({ rejectReasonValidate: "Please enter the reason for Cancellation" })
      this.setState({ spinner: false})

    }
    else if (this.state.checked == false && (this.state.imageUploadFile.length == 0 || this.state.imageUploadFile.length == 1)) {
      this.setState({ uploadFileValidate: "Please upload minimum 2 files" })
      this.setState({ spinner: false})

    } else if (this.state.checked == false && (this.state.imageUploadBill.length == 0 || this.state.imageUploadBill.length == 1)) {
      checkedValue = "1";
      this.setState({ uploadBillValidate: "Please upload minimum 2 bills" })
      this.setState({ spinner: false})

    }
    else if (this.state.checked == true && this.state.imageUploadFile.length > 0) {
      checkedValue = "1";
      this.setState({ removeUploadedFiles: "Please remove the uploaded files" })
      this.setState({ spinner: false})

    }
    else if (this.state.checked == true && this.state.imageUploadBill.length > 0) {
      checkedValue = "1";
      this.setState({ removeUploadedBills: "Please remove the uploaded bills" })
      this.setState({ spinner: false})

    }

    else {
      let ub = "", uf = ""
      this.state.imageUploadBill.map(res => {
        ub = ub + res.ImgFilename + "|"
      })
      this.state.imageUploadFile.length > 0 ? this.state.imageUploadFile.map(res => {
        uf = uf + res.ImgFilename + "|"
      }) : ""
      //upload bill 
     
      //upload file
 


      var data2 = {
        "Index": "ExpenseRequestDataSave",
        "data": {
          "srno": this.props.srno,
          "acualexp": this.state.totalActualExpense.toString(),
          "BTCExpense": this.state.btcExp.toString(),
          "balance": this.state.balance.toString(),
          "actualexpbill1": this.state.actualexpbill1.toString(),
          "actualexpbill2": this.state.actualexpbill2.toString(),
          "miscexp": this.state.miscExp.toString(),
          "canceltext": this.state.reason,
          "photoid": uf,
          "advance": parseInt(this.state.advanceReceived).toString(),
          "checkedValue": checkedValue,
          "billid": ub
        }, "Token": ""
      }
        postToServer("Rps", data2).then((Result) => {
        if (Result.data.Status == 'Success') {
          this.setState({ spinner: false})
          if( Result.data.data[0].result == "1"){
              alert("saved successfully")
               this.props.onHide()
          }

          }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in sending request" })
      })
    }
  }
  render() {
    return (
      <React.Fragment>
         {this.state.spinner == true &&
                    <SfaSpinner />
                }
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="expenseRps"
      >

        <Modal.Header closeButton onClick={this.props.onHide}>
          <Modal.Title className="expentry-headertitle" id="contained-modal-title-vcenter">
            Expense Entry
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="body-scroll">
          <div className="expentry-body">
            <h3 className="expentry-title">RPS/CRM Expense Details</h3>
            <Row>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">RPS Number</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={true}
                    className="customized-input"
                    placeholder="Enter RPS Number"
                    value={this.props.srno}

                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">HQ Name</Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter HQ Name" disabled={true} value={this.state.area} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Region</Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Region" disabled={true} value={this.state.region} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">F.S Name</Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter F.S Name" disabled={true} value={this.state.fsName} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Request Date</Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Request Date" disabled={true} value={this.state.reqDate} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Expected Cost Of Service</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={true}
                    className="customized-input"
                    placeholder="Enter Expected Cost Of Service"
                    value={this.state.expectedCostOfService}
                  />
                </Form.Group>
              </Col>
            </Row>
            <h3 className="expentry-title">Service Type: {this.state.serviceType}</h3>
            <Row>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">RPS Date <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" disabled={true} className="customized-input" placeholder="Enter RPS Date" value={this.state.rpsDate} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Subarea <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Subarea" disabled={true} value={this.state.subarea} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Dr. Name <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Dr. Name" disabled={true} value={this.state.doctorName} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Dr. Code <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Dr. Code" disabled={true} value={this.state.doctorCode} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Dr Speciality <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Dr Speciality" disabled={true} value={this.state.speciality} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Dr. Grade <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Dr. Grade" disabled={true} value={this.state.dGrade} />
                </Form.Group>
              </Col>
            </Row>
            <h3 className="expentry-title">Business Details</h3>
            <Row>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Current Business(₹) <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Current Business(₹)" disabled={true} value={this.state.CurrentBusiness} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Expected Business(₹) <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Expected Business(₹)" disabled={true} value={this.state.ExpectedBusiness} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Actual Expense as per Bill1 <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="number" className="customized-input" placeholder="Enter amount here" value={this.state.actualexpbill1} disabled={this.state.disabled} onChange={this.actualExpBill1} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">BTC Expense <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="number" className="customized-input" placeholder="Enter" value={this.state.btcExp} disabled={true}  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Actual Expense as per Bill2 <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="number" className="customized-input" placeholder="Enter" value={this.state.actualexpbill2} disabled={this.state.disabled} onChange={this.actualExpBill2} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Misc expense <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="number" className="customized-input" placeholder="Enter" disabled={this.state.disabled} value={this.state.miscExp}  onChange={this.miscExp} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Advance Received <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter" disabled={true} value={this.state.advanceReceived} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Total Actual Expense <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter" disabled={this.state.disabled} value={this.state.totalActualExpense} />
                </Form.Group>
              </Col>
              <Col xs={6} md={4} lg={4} xl={4}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Balance <span className="colorRed">*</span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter" disabled={this.state.disabled} value={this.state.balance} />
                </Form.Group>
              </Col>
            </Row>
            {this.state.appConfirmbutton == "Confirm" || this.state.appConfirmbutton == "Approve" ?
              <Row>
                <Col xs={12} md={12} lg={12} xl={12}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="customized-label">Remarks <span className="colorRed">*</span></Form.Label>
                    <Form.Control as="textarea" rows="3" className="customized-input" placeholder="Enter remarks"  value={this.state.remarks} disabled = {this.state.disableRemarks} onChange={this.remarks} />
                  </Form.Group>
                </Col>
              </Row>
              : null}

            <Row>
              <Col xs={12} md={6} lg={6} xl={6}>
                <div className="relative">
                  <input type="file" className="fileupload-input mt-1" multiple accept="image/png, image/jpeg, image/jpg" disabled ={this.state.disableFileAndBill} onChange={this.uploadFile} />
                  <div className="secondary secondary-outline uploadfile mr-3 mt-1">
                    <img src="../public/assets/images/attachment.svg" className="mr-2" />Upload File
                  </div>
                  {this.state.imageUploadFile.length > 0 ?
                    this.state.imageUploadFile.map((res, i) => (
                      //  this.state.appConfirmbutton == "Approve" || this.state.appConfirmbutton == "Confirm" ?
                      <div>
                            <span className="attachmentprp srcDetails" key={i} onClick={() => this.onDownloadFile(res.ImgFilename)}>{res.ImgFilename}</span>
                       
                       {
                        this.state.appConfirmbutton == "Approve" || this.state.appConfirmbutton == "Confirm" || this.state.billFileButtonShowHide == "1"? "":
                         <div className="attachmentdiv">
                         <img src="../../public/assets/images/cancel-white.svg" className="closeImg attachmentcancel" onClick={() => this.onCancelFile(res.ImgFilename)} />
                        </div>
                       }
                        </div>

                    ))
                    : <div className="supported-files">There is no uploaded files.</div>}

                </div>
                <p className="supported-files">Supported Formats: jpeg, jpg, png upto 2 MB</p>
                <div className="validation-message"> {this.state.uploadFileValidate} </div>
                <div className="validation-message"> {this.state.removeUploadedFiles} </div>


                <div className="relative">
                  <input type="file" className="fileupload-input mt-1" multiple accept="image/png, image/jpeg, image/jpg"   disabled ={this.state.disableFileAndBill} onChange={this.uploadBill} />
                  <Button className="secondary secondary-outline uploadfile mr-3 mt-1">
                    <img src="../public/assets/images/attachment.svg" className="mr-2" />Upload Bill
                  </Button>
                </div>
                {this.state.imageUploadBill.length > 0 ?
                  this.state.imageUploadBill.map((res, i) => (
                    // this.state.appConfirmbutton == "Approve" || this.state.appConfirmbutton == "Confirm" ?
                          <div> <span className="attachmentprp srcDetails" key={i} onClick={() => this.onDownloadBill(res.ImgFilename)}>{res.ImgFilename}</span>
                     
                     {this.state.appConfirmbutton == "Confirm" || this.state.appConfirmbutton == "Approve" || this.state.billFileButtonShowHide == "1"?"":
                      <div className="attachmentdiv"><img src="../../public/assets/images/cancel-white.svg" className=" closeImg attachmentcancel" onClick={() => this.onCancelBill(res.ImgFilename)} />
                      </div>
                     }
                    </div>
                  ))
                  : <div className="supported-files">There is no uploaded bills.</div>}
                <p className="supported-files">Supported Formats: jpeg, jpg, png upto 2 MB</p>
                <div className="validation-message"> {this.state.uploadBillValidate} </div>
                <div className="validation-message"> {this.state.removeUploadedBills} </div>


              </Col>
              <Col xs={12} md={6} lg={6} xl={6}>
                <Form.Check
                  custom
                  type="checkbox"
                  id="cancel"
                  checked={this.state.checked}
                  label="Request for Cancellation"
                  className="mb-2 jointCheck expentry-title"
                  name="Request for Cancellation"
                  disabled ={this.state.disabledCheckbox}
                  onChange={this.handleChange}
                />
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Reason <span className="colorRed">*</span></Form.Label>
                  <Form.Control as="textarea" rows="3" className="customized-input" placeholder="Enter Cancellation Reason" value={this.state.reason} disabled ={this.state.disabledCheckbox} onChange={this.reason} />
                </Form.Group>
                <div className="validation-message"> {this.state.requestForCancel}</div>
                <div className="validation-message"> {this.state.rejectReasonValidate}</div>
              </Col>
            </Row>
            {this.state.prevRemarks ? this.state.prevRemarks.length > 0 ?
        <div>
          <div className="rps-tab-sec-title mt-2_0 prevDet pt20">Previous Approval Details</div>
          <div className="prevAlist">
            <PrevExpenseApproverList prevList={this.state.prevRemarks} />
          </div>
        </div> : '' : ''}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {(this.state.appConfirmbutton == "Request" && this.props.nStatus == "0"  && this.state.advanceReceived != "0.00" )?
            <Button onClick={this.sendForApproval}  className="expentry-btn">Send For Appproval</Button>
            : null
          }
          {(this.state.appConfirmbutton == "Request" && this.props.nStatus == "4" && this.state.advanceReceived == "0.00" && this.state.RequestCancelUploadBillEnable!="1" && this.state.billFileButtonShowHide == "-1")?
            <Button onClick={this.sendForApproval}  className="expentry-btn">Upload Bill and File</Button>
            : null
          }

          {this.state.appConfirmbutton == "Approve" && (this.props.nStatus == "0" || this.props.nStatus == "1") && this.state.advanceReceived != "0.00" && this.props.singleappstat == undefined?
            <div>
              <Button onClick={(e) => { this.approve("APPROVE") }} className="expentry-btn">Approve</Button>
              <Button onClick={(e) => { this.approve("REJECT") }} className="danger danger-outline mr-2  padleft">Reject</Button>
            </div>
            : null
          }
          {this.state.appConfirmbutton == "Confirm" &&  this.state.advanceReceived != "0.00" && (this.props.nStatus == "0" || this.props.nStatus == "2") && this.props.singleappstat == undefined ?
            <div>
              <Button onClick={(e) => { this.approve("CONFIRM") }} className="expentry-btn">Confirm</Button>
              <Button onClick={(e) => { this.approve("REJECT") }} className="danger danger-outline mr-2  padleft">Reject</Button>
            </div>
            : null
          }

        </Modal.Footer>
      </Modal>
     </React.Fragment>
    );
  }
}

export default ExpensePopup;
/ / / <h3 className="expentry-title">Request for Cancellation</h3>
// <div>
          //      <Button onClick ={(e) => {this.approve("C")}} className="expentry-btn">Confirm</Button>
          //      <Button onClick ={(e) => {this.approve("R")}} className="danger danger-outline mr-2 padleft">Reject</Button>
          // </div> : null