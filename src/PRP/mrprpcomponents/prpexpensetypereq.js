import React from 'react';
import { Component } from 'react';
import SearchDropdown from "../../BasicComponet/searchDropdown";
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import { Button, Col, Row, Form, InputGroup, Dropdown } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import ExpenseBrandetail from "./expensbrandprp";
import Expesedetview from "./expensviewdet";
import MrDocUpload from "./mrprpdocupload";
import AcrHistoryDetail from "./acrhistorydetail";
import MrmemberDetails from "./mrmemberdet";
import { postToServer, fileUpload } from '../../lib/comm-utils'
import { URL_PRP } from '../../lib/constants'
import { dateFormat } from "dateformat"
import SubareDoctocheckbox from "./subaredoctorcheckbox"
import SfaModal from "./../../BasicComponet/sfaModal";
import { Link } from 'react-router-dom';
import { roundToNearestMinutes } from 'date-fns';
import Loader from '../../lib/Loader'


class Prpexpensetypereq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "-1",
      Date: new Date(),
      prpDate: "",
      prpDaterr: "",
      RequestedDate: "",
      expenprpname: "",
      expenprpheader: "",
      prptopicname: "",
      venue: "",
      venuerr: "",
      totalexpectdoctor: "",
      totalexpectdoctorerr: "",
      categoryofdr: "",
      categoryofdrerr: "",
      docattend: "",
      docattenderr: "",
      invitedspkr: "",
      invitedspkrerr: "",
      doctorattend: "",
      location: "",
      locationerr: "",
      subarea: [],
      filterdata: [],
      selectedData: {},
      subAreaSelected: [],
      doctordata: [],
      doctorfilterdata: [],
      doctorselectedata: {},
      doctorselecetd: [],
      selectedDataerr: "",
      doctorselectedataerr: "",
      emptydoctorerr: "",
      Brands: [],
      brandsselectedata: {},
      brandsselectedataerr: "",
      Accountheads: [],
      PreviousRemarks: [],
      TeamMembers: [],
      minattend: "",
      minattenderr: "",
      AccountheadsList: [],
      disablefields: false,
      RequestCancel: "",
      prpcode: "",
      topicode: "",
      teamDetail: [],
      teamDetailerr: "",
      sendfordata: "",
      showpopup: false,
      SubareDet: [],
      showSuccess: false,
      reason: "",
      imageUploadFile: [],
      imageUploadBill: [],
      savedoc: [],
      savebill: [],
      Requestpop: false,
      expcancel: "",
      remark: "",
      showLoader : true
    }
    this.handlePrpDate = this.handlePrpDate.bind(this)
    this.getsubarea = this.getsubarea.bind(this)
    this.getdoctordata = this.getdoctordata.bind(this)
    this.doctorNum = this.doctorNum.bind(this)
    this.onBrands = this.onBrands.bind(this)
    this.onPrpExpense = this.onPrpExpense.bind(this)
    this.onClickSendforapproval = this.onClickSendforapproval.bind(this)
    this.onRequestCancel = this.onRequestCancel.bind(this)
    this.getGrandEstimatevalue = this.getGrandEstimatevalue.bind(this)
    this.getAdvanceRequested = this.getAdvanceRequested.bind(this)
    this.getbalanceValue = this.getbalanceValue.bind(this)
    this.teamDetail = this.teamDetail.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onhide = this.onhide.bind(this)
    this.onSuccesspopup = this.onSuccesspopup.bind(this)
    this.onUploadDoc = this.onUploadDoc.bind(this)
    this.onUploadBill = this.onUploadBill.bind(this)
    this.onPoprequest = this.onPoprequest.bind(this)
    this.onRpophide = this.onRpophide.bind(this)
    this.onteamErr = this.onteamErr.bind(this)
    this.onClickReq = this.onClickReq.bind(this)
    this.onReason = this.onReason.bind(this)
    this.onMinmumChange = this.onMinmumChange.bind(this)
    this.invitedSpkchnage = this.invitedSpkchnage.bind(this)
    this.onGo = this.onGo.bind(this)

  }

  onMinmumChange(event) {
    const { name, value } = event.target;

    if (name === "minimum" || event.target.value.length < 9) {
      // console.log(value);
      this.setState({ minattend: value })
      var fi = /^[0-9\b]*$/;
      if (fi.test(value)) {
        this.setState({ minattenderr: "" })
      } else {
        this.setState({ minattenderr: "*Please Enter Numeric Only!" });
      }
    } else {
      alert("Please Enter Upto 8 Digit")
    }
  }

  invitedSpkchnage(event) {
    // console.log(event.target,"event")
    const { name, value } = event.target;

    if (name === "invitedspk") {
      // console.log(value);
      this.setState({ invitedspkr: value })
      var fi = /^[A-Z a-z]*$/;
      if (fi.test(value)) {
        this.setState({ invitedspkrerr: "" })
      } else {
        this.setState({ invitedspkrerr: "*Please Enter Alphabet Characters Only!" });
      }
    }
  }


  onPoprequest() {
    this.setState({ Requestpop: true })
  }
  onRpophide() {
    this.setState({ Requestpop: false })
    // this.setState({ disablefields: false })
  }
  onReason(onReason) {
    // console.log(onReason, "onReason")
    this.setState({ reason: onReason })
  }

  onUploadDoc(doc, savedoc, savedPhoto) {
    // console.log(doc, savedoc, savedPhoto, "uploadsave1")
    // console.log( savedoc, "uploadsave2")
    // console.log(savedPhoto,"uploadsave3")
    if (savedPhoto == undefined) {
      this.setState({ imageUploadFile: doc })
    } else {
      this.setState({ imageUploadFile: savedPhoto })
    }
    this.setState({ savedoc: savedoc })
  }
  onUploadBill(bill, savebill, savedBill) {
    // console.log(bill, savebill, savedBill, "uploadsave")

    if (savedBill == undefined) {
      this.setState({ imageUploadBill: bill })
    } else {
      this.setState({ imageUploadBill: savedBill })
    }
    this.setState({ savebill: savebill })

  }

  onGo() {
    // alert("send")
    let teamDetail = this.state.teamDetail.filter(item => item.MemberName == "")

    if (this.state.RequestCancel == true && this.state.reason == "") {
      alert("Please Enter Reason")
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
    }

    else if (this.state.RequestCancel == false && (this.state.imageUploadFile.length == 0 || this.state.imageUploadFile.length == 1)) {
      alert("Please Upload Minimun 2 Documents")
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      // console.log("else if22")
    }

    else if (this.state.RequestCancel == false && (this.state.imageUploadBill.length == 0 || this.state.imageUploadBill.length == 1)) {
      alert("Please Upload Minimun 2 Bills")
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      // console.log("else if23")
    }

    else if (this.state.RequestCancel == false && this.state.teamDetail.length == 0) {
      this.setState({ teamDetailerr: "Please Enter Team Detail!" })
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      alert("Please Enter TeamDetail  !")
      // console.log("else if24")
    }

    else if (this.state.RequestCancel == false && this.state.prpDate == "") {
      this.setState({ prpDaterr: "Please Enter PRP Date !" })
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      alert("Please Enter PRP Date !")
    }

    else if (this.state.RequestCancel == false && this.state.minattend == "") {
      this.setState({ minattenderr: "Please Enter Minimum Attendance !" })
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      alert("Please Enter Minimum Attendance !")
    }

    else if (this.state.RequestCancel == false && this.state.invitedspkr == "") {
      this.setState({ invitedspkrerr: "Please Enter Invited Speaker Name !" })
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      alert("Please Enter Invited Speaker Name !")
    }

    else if (this.state.RequestCancel == false && this.state.venue == "") {
      this.setState({ venuerr: "Please Enter Venue !" })
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      alert("Please Enter Venue !")
      // console.log("else if Venue")
    }

    else if (this.state.RequestCancel == false && Object.keys(this.state.selectedData).length == 0) {
      this.setState({ selectedDataerr: "Please Select Sub Area !" })
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      alert("Please Select Sub Area  !")
    }

    else if (this.state.RequestCancel == false && Object.keys(this.state.doctorselectedata).length == 0) {
      this.setState({ doctorselectedataerr: "Please Select Doctors Expected To Attend !" })
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      alert("Please Select Doctors Expected To Attend !")
    }

    else if (this.state.RequestCancel == false && Object.keys(this.state.brandsselectedata).length == 0) {
      // this.setState({ brandsselectedataerr: "please Select Brands !" })
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      alert("Please Select Brands !")
    }

    else if (this.state.RequestCancel == false && teamDetail.length != "") {
      this.setState({ showSuccess: false })
      this.setState({ showpopup: false })
      alert("No: Of Team Members And Count Of Team Members Name Should Be Same")
    }
    else {
      if (this.props.showHideBtn == false && this.state.RequestCancel == true) {
        // alert("no pop")
        this.setState({ showSuccess: false })
        this.onClickSendforapproval()
      } else if (this.props.showHideBtn == false  && this.state.RequestCancel == false ) {
        // alert("pop")
        this.setState({ showSuccess: true })
      } else {
        this.setState({ showSuccess: false })
        this.onClickSendforapproval()
      }
      // this.onClickSendforapproval()
    }
  }
  onSuccess() {
    this.setState({ showSuccess: false })
  }
  onhide() {
    this.setState({ showSuccess: false })
  }
  onSuccesspopup() {
    this.setState({ showpopup: true })
  }

  getGrandEstimatevalue() {

    let grandvalue = 0
    let AccountheadsList = this.state.Accountheads;
    AccountheadsList.map((list) => {
      grandvalue = grandvalue + (list.Estimated == "" ? 0 : parseFloat(list.Estimated))
    })
    return grandvalue
  }

  getAdvanceRequested() {
    let grandvalue = 0
    let AccountheadsList = this.state.Accountheads;
    AccountheadsList.map((list) => {
      grandvalue = grandvalue + (list.AdvanceRequested == "" ? 0 : parseFloat(list.AdvanceRequested))
    })
    return grandvalue
  }

  // getAdvanceAmount() {
  //   let grandvalue = 0
  //   let AccountheadsList = this.state.Accountheads;
  //   AccountheadsList.map((list) => {
  //       grandvalue = grandvalue + (list.n_AdvanceAmount == "" ? 0 : parseFloat(list.n_AdvanceAmount))
  //   })
  //   return grandvalue
  // }

  getbalanceValue() {
    let balance = 0
    let AccountheadsList = this.state.Accountheads;
    AccountheadsList.map((list) => {
      balance = balance + (list.AdvanceRequested - list.n_AdvanceAmount)
    })
    return balance
  }

  teamDetail(teamDetail) {
    // console.log(teamDetail,"teamDetail")
    this.setState({ teamDetail: teamDetail })
  }

  onRequestCancel(RequestCancel) {
    this.setState({ RequestCancel: RequestCancel })
    if (RequestCancel == true) {
      // this.setState({Requestpop : true})
      if(this.props.showHideBtn == false){
      alert("All The Update Will Get Removed")
      }
      this.setState({imageUploadFile : [],  imageUploadBill: [] })
      this.componentDidMount()

      var subareadata = { "Index": "SubareaBind", "Data": { "Srno": "" }, }
      postToServer(URL_PRP, subareadata)
        .then((response) => {
          // console.log(response.data.data, "subareadata")
          if (response.status == 200 && response.statusText == "OK") {

            this.setState({ subarea: response.data.data })
          }

        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error In App At MRPRP" })
        })

      var data = { "Index": "MRExpenseSrnoClick", "Data": { "srno": this.props.srnum }, }
      let arealistselected = []
      let doctorrselected = []
      let TeamMembers = []
      postToServer(URL_PRP, data)
        .then((response) => {
          // console.log(response, data, "data")
          if (response.status == 200 && response.statusText == "OK") {

            response.data.SubareDet.map(ele => {
              //  console.log(response.data,"data")
              arealistselected.push({
                key: ele.c_code,
                text: ele.c_name,
                value: ele.c_name.toLowerCase()

              })
            })
            //  console.log(arealistselected,"arealistselected")

            arealistselected.map(item => {
              // console.log(item,"subareaitem")
              const id = item.key + "$" + item.text + "$" + item.value;
              //  subAreaCode = subAreaCode + item.key + ","
              this.getsubarea(id, item.value, true, item)
            })
            // console.log(response.data.DoctorDet,"doctordet")

            response.data.DoctorDet.map(ele => {
              //  console.log(response.data,"data")
              doctorrselected.push({
                key: ele.DocCode,
                text: ele.C_Name,
                value: ele.C_Name.toLowerCase()

              })
            })

            //  console.log(doctorrselected,"doctorrselected")

            doctorrselected.map(item => {
              const id = item.key + "$" + item.text + "$" + item.value;
              this.getdoctordata(id, item.value, true, item)
            })

            let d = response.data.Details[0].PrpDate
            let dd = response.data.Details[0].PrpDate.split('/')
            let pdate = dd[1] + '/' + dd[0] + '/' + dd[2]

            let req = response.data.Details[0].RequestedDate
            let Rdate = response.data.Details[0].RequestedDate.split('/')
            let requserdate = Rdate[1] + '/' + Rdate[0] + '/' + Rdate[2]

            // let dateFormat = require('dateformat');
            this.setState({
              expenprpname: response.data.Details[0].prpname,
              expenprpheader: response.data.Details[0].PrpHeadName,
              prpDate: new Date(pdate),
              prptopicname: response.data.Details[0].topicName,
              venue: response.data.Details[0].Venue,
              // RequestedDate:  new Date(requserdate),
              RequestedDate: response.data.Details[0].RequestedDate,
              invitedspkr: response.data.Details[0].c_Speaker,
              Brands: response.data.Brands,
              Accountheads: response.data.Accountheads,
              PreviousRemarks: response.data.PreviousRemarks,
              // TeamMembers: response.data.TeamMembers,
              minattend: response.data.Details[0].MinimumAttendance,
              prpcode: response.data.Details[0].c_PrpCodeMst,
              topicode: response.data.Details[0].c_TopicCode,
              SubareDet: response.data.SubareDet

            })

          }

        }).catch((Error) => {
          this.setState({ Error: true, Errormsg: "Error in App At MRPRP" })
        })
      // this.setState({ disablefields: true })

    } else {
      // this.setState({ disablefields: false })
    }
  }

  onClickReq() {
    // this.setState({ disablefields: true })
    // this.setState({Requestpop : false})
    //need to MRExpenseSrnoClick and componentDidMount
  }

  onBrands(brandsselectedata) {
    // console.log(brandsselectedata, "brandsselectedata")
    this.setState({ brandsselectedata: brandsselectedata })
  }

  // handlePrpDate(date) {
  //   let dateforamt = new Date(date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2))
	// 	var requestdate = new Date(this.state.Date.getFullYear() + "/" + ("0" + (this.state.Date.getMonth() + 1)).slice(-2) + "/" + ("0" + this.state.Date.getDate()).slice(-2))
	// 	this.setState({ prpDate: date })
	// 	if (dateforamt > requestdate) {
	// 		this.setState({ prpDaterr: "" })
	// 	}
	// 	else {
	// 		this.setState({ prpDaterr: "PRP Date  should not be Lesser than Requested Date!" })
	// 	}
  // }
  handlePrpDate(date) {
    this.setState({ prpDate: date })
   // let getDatenew = new Date()
    let year1 = date.getFullYear()
    let year2 = this.state.Date.getFullYear()

    let month1 = date.getMonth()
    let month2 = this.state.Date.getMonth()

    let date1 = date.getDate()
    let date2 = this.state.Date.getDate()
    // if(this.state.preDateEnableFlag[0].n_PrpPreviousDateEnable == 0){
      if(year1 == year2 ){
        if(month1 > month2){
          this.setState({ prpDaterr: "" })
        }
        else if(month1 == month2){
          if(date1 >= date2){
            this.setState({ prpDaterr: "" })
         }
         else{
          this.setState({ prpDaterr: "PRP Date Should Not Be Lesser Than Requested Date!" })
         }
        }
        else{
          this.setState({ prpDaterr: "PRP Date Should Not Be Lesser Than Requested Date!" })
        }
      }
      else if(year1 > year2){
        this.setState({ prpDaterr: "" })
      }
      else{
        this.setState({ prpDaterr: "PRP Date Should Not Be Lesser Than Requested Date!" })
      }
  //  }
  //   else{
  //     this.setState({ prpDaterr: "" })
  //   }
  }
  doctorNum() {
    if (Object.keys(this.state.selectedData).length == 0) {
      this.setState({ selectedDataerr: "Please Select Sub Area" })
    }
  }

  onPrpExpense(AccountheadsList,) {
    // console.log(AccountheadsList,"AccountheadsList")
    this.setState({ AccountheadsList: AccountheadsList })
  }

  onteamErr(data) {
    this.setState({ teamDetailerr: data })
  }

  componentDidMount() {

    var subareadata = { "Index": "SubareaBind", "Data": { "Srno": "" }, }
    postToServer(URL_PRP, subareadata)
      .then((response) => {
        // console.log(response.data.data, "subareadata")
        if (response.status == 200 && response.statusText == "OK") {

          this.setState({ subarea: response.data.data })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In App At MRPRP" })
      })

    var data = { "Index": "MRExpenseSrnoClick", "Data": { "srno": this.props.srnum }, }
    let arealistselected = []
    let doctorrselected = []
    let TeamMembers = []
    postToServer(URL_PRP, data)
      .then((response) => {
        // console.log(response, data, "data")
        if (response.status == 200 && response.statusText == "OK") {
          // response.data.TeamMembers.map((res,i) => {
          //   TeamMembers.push({
          //     MemberName : res.MemberName,
          //     id : i,
          //   })
          // })
          this.setState({ TeamMembers: TeamMembers })
          response.data.SubareDet.map(ele => {
            //  console.log(response.data,"data")
            arealistselected.push({
              key: ele.c_code,
              text: ele.c_name,
              value: ele.c_name.toLowerCase()

            })
          })
          //  console.log(arealistselected,"arealistselected")

          arealistselected.map(item => {
            // console.log(item,"subareaitem")
            const id = item.key + "$" + item.text + "$" + item.value;
            //  subAreaCode = subAreaCode + item.key + ","
            this.getsubarea(id, item.value, true, item)
          })
          // console.log(response.data.DoctorDet,"doctordet")

          response.data.DoctorDet.map(ele => {
            //  console.log(response.data,"data")
            doctorrselected.push({
              key: ele.DocCode,
              text: ele.C_Name,
              value: ele.C_Name.toLowerCase()

            })
          })

          //  console.log(doctorrselected,"doctorrselected")

          doctorrselected.map(item => {
            const id = item.key + "$" + item.text + "$" + item.value;
            this.getdoctordata(id, item.value, true, item)
          })

          let d = response.data.Details[0].PrpDate
          let dd = response.data.Details[0].PrpDate.split('/')
          let pdate = dd[1] + '/' + dd[0] + '/' + dd[2]

          let req = response.data.Details[0].RequestedDate
          let Rdate = response.data.Details[0].RequestedDate.split('/')
          let requserdate = Rdate[1] + '/' + Rdate[0] + '/' + Rdate[2]

          // let dateFormat = require('dateformat');
          if(response.data.Details.length > 0){
            response.data.Details.map(res=>{
              if(res.n_exp_cancel_req == "1"){
                this.setState({ RequestCancel: true })
                this.setState({ reason : res.c_exp_cancel_Remarks})
              }else{
                // this.setState({ RequestCancel: false })
        }
            })

        }  
          this.setState({
            expenprpname: response.data.Details[0].prpname,
            expenprpheader: response.data.Details[0].PrpHeadName,
            prpDate: new Date(pdate),
            prptopicname: response.data.Details[0].topicName,
            venue: response.data.Details[0].Venue,
            // RequestedDate:  new Date(requserdate),
            RequestedDate: response.data.Details[0].RequestedDate,
            invitedspkr: response.data.Details[0].c_Speaker,
            Brands: response.data.Brands,
            Accountheads: response.data.Accountheads,
            PreviousRemarks: response.data.PreviousRemarks,
            TeamMembers: response.data.TeamMembers,
            minattend: response.data.Details[0].MinimumAttendance,
            prpcode: response.data.Details[0].c_PrpCodeMst,
            topicode: response.data.Details[0].c_TopicCode,
            SubareDet: response.data.SubareDet,
          })

        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In App At MRPRP" })
      })
  }




  getsubarea(id, name, checked, item) {
    let selectedSubAreatemp = {}
    selectedSubAreatemp = this.state.subAreaSelected
    let { selectedData } = this.state
    // console.log(id, name, checked, item, "sususususuu")

    if (checked) {
      selectedData[id] = item.key
      selectedSubAreatemp[item.key] = item.value
      this.setState({ selectedDataerr: "" })
    } else if (selectedData[id] == item.key) {
      selectedData[id] = false
      delete selectedSubAreatemp[item.key]
    } else {
      delete selectedData[id]
    }
    // console.log("hhhhhhhhhhh", selectedData)

    this.setState({
      selectedData: selectedData,
      subAreaSelected: selectedSubAreatemp
    })


    let subAreaCode = ""
    Object.values(this.state.selectedData).map(ele => {
      // console.log(ele,"eleee")
      subAreaCode = subAreaCode + ele + ","
    })
    var docodata = { "Index": "DoctorsExpected", "Data": { "Subarea": subAreaCode }, }
    postToServer(URL_PRP, docodata)
      .then((response) => {
        // console.log(response, docodata,"docodata")
        if (response.status == 200 && response.statusText == "OK") {
          if (response.data.data.length == 0) {
            this.setState({ emptydoctorerr: "There Is No Data For This Sub Area !" })
          } else {
            this.setState({ emptydoctorerr: "" })
          }
          this.setState({ doctordata: response.data.data, showLoader:false })

        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In App At MRPRP" })
      })

  }

  removeSelectedItem(id) {
    const { selectedData } = this.state;

    delete selectedData[id];

    this.setState({
      selectedData: selectedData
    })
    // console.log(selectedData,"selectedData")
  }



  getdoctordata(id, name, checked, item) {
    let selectedDoctor = {}
    selectedDoctor = this.state.doctorselecetd
    let { doctorselectedata } = this.state
    // console.log(id, name, checked, item, "sususususuu")

    if (checked) {
      doctorselectedata[id] = item.key
      selectedDoctor[item.key] = item.value
      this.setState({ doctorselectedataerr: "" })
    } else if (doctorselectedata[id] == item.key) {
      doctorselectedata[id] = false
      delete selectedDoctor[item.key]
    } else {
      delete doctorselectedata[id]
    }
    // console.log("hhhhhhhhhhh", doctorselectedata)

    this.setState({
      doctorselectedata: doctorselectedata,
      doctorselecetd: selectedDoctor
    })
  }

  removedoctorSelectedItem(id) {
    const { doctorselectedata } = this.state;

    delete doctorselectedata[id];

    this.setState({
      doctorselectedata: doctorselectedata
    })
    // console.log(doctorselectedata,"doctorselectedata")
  }


  onClickSendforapproval() {
    // console.log("else if", this.state.prpDaterr,this.state.prpDate);
    // console.log("else if", this.state.minattenderr,this.state.minattend);
    // console.log("else if", this.state.invitedspkrerr,this.state.invitedspkr);
    // console.log("else if", this.state.venuerr,this.state.venue);
    // console.log("else if", this.state.selectedDataerr,this.state.selectedData);
    // console.log("else if", this.state.doctorselectedataerr,this.state.doctorselectedata);
    // console.log("else if", this.state.brandsselectedataerr,this.state.brandsselectedata)
    // console.log("else if", this.state.teamDetailerr, this.state.teamDetail)


    // console.log("onclicks end")
    // if (this.state.RequestCancel == true || this.state.RequestCancel == false || this.state.imageUploadFile.length == 0 || this.state.imageUploadFile.length == 1 || this.state.imageUploadBill.length == 0 || this.state.imageUploadBill.length == 1 || this.state.prpDate == "" || this.state.minattend == "" || this.state.invitedspkr == "" || this.state.venue == "" || Object.keys(this.state.selectedData).length == 0 || Object.keys(this.state.doctorselectedata).length == 0 || Object.keys(this.state.brandsselectedata).length == 0) {

    // nooo////if(this.state.teamDetail.length == []){
    //   this.setState({ teamDetailerr: "please enter Team Detail!" })
    //     alert("please Enter teamDetail  !")
    // }
    // console.log("else if1")
    // let teamDetail =  this.state.teamDetail.filter( item => item.MemberName == "")


    // if (this.state.RequestCancel == true && this.state.reason == "") {
    //   alert("Please Enter Reason")
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    // }

    // else if (this.state.RequestCancel == false && ( this.state.imageUploadFile.length == 0 || this.state.imageUploadFile.length == 1)) {
    //   alert("Please Upload Minimun 2 Documents")
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   console.log("else if22")
    // }

    // else if (this.state.RequestCancel == false && (this.state.imageUploadBill.length == 0 || this.state.imageUploadBill.length == 1)) {
    //   alert("Please Upload Minimun 2 Bills")
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   console.log("else if23")
    // }

    //noo need ///// else if (this.state.RequestCancel == true && (this.state.imageUploadFile.length >= 2 || this.state.imageUploadBill.length >= 2)) {
    //   alert("All Uploaded files will Remove")
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    // }

    // else if (this.state.RequestCancel == false && this.state.teamDetail.length == 0) {
    //   this.setState({ teamDetailerr: "please enter Team Detail!" })
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   alert("please Enter teamDetail  !")
    //   console.log("else if24")
    // }




    // else if ( this.state.RequestCancel == false && this.state.prpDate == "") {
    //   this.setState({ prpDaterr: "please enter PRP Date !" })
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   alert("please Enter PRP Date !")
    // }


    // else if (this.state.RequestCancel == false && this.state.minattend == "") {
    //   this.setState({ minattenderr: "please enter Minimum Attendance !" })
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   alert("please Enter Minimum Attendance !")
    // }
    // else if (this.state.RequestCancel == false && this.state.invitedspkr == "") {
    //   this.setState({ invitedspkrerr: "please enter Invited Speaker Name !" })
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   alert("please Enter Invited Speaker Name !")
    // }
    // else if ( this.state.RequestCancel == false && this.state.venue == "") {
    //   this.setState({ venuerr: "please enter Venue !" })
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   alert("please Enter Venue !")
    //   console.log("else if Venue")
    // }
    // else if (this.state.RequestCancel == false && Object.keys(this.state.selectedData).length == 0) {
    //   this.setState({ selectedDataerr: "please Select Sub Area !" })
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   alert("please Select Sub Area  !")
    // }
    // else if (this.state.RequestCancel == false && Object.keys(this.state.doctorselectedata).length == 0) {
    //   this.setState({ doctorselectedataerr: "please Select Doctors Expected To Attend !" })
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   alert("please Select Doctors Expected To Attend !")
    // }
    // else if (this.state.RequestCancel == false &&  Object.keys(this.state.brandsselectedata).length == 0) {
    //   // this.setState({ brandsselectedataerr: "please Select Brands !" })
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   alert("please Select Brands !")
    // }

    // else if(teamDetail.length != "" ){
    //   this.setState({ showSuccess: false })
    //   this.setState({ showpopup: false })
    //   alert("Please enter Team Member Name")
    // }

    //noo need ///// else if ( this.state.RequestCancel == false &&  this.state.teamDetail.length > 0) {
    //   this.state.teamDetail.map(res => {
    //     console.log(res.MemberName,"MemberName")
    //   if (res.MemberName == "") {
    //     console.log(res.MemberName,"MemberName")
    //      alert("please Enter teamDetail Name " + res.id+1)
    //       this.setState({ teamDetailerr: "please enter Team Detail!" })
    //       this.setState({ showSuccess: false })
    //       this.setState({ showpopup: false })
    //     }else{
    //       alert("dddddddddddd")
    //     }
    //   })
    // }


    // }

    if (this.state.prpDaterr == "" && this.state.minattenderr == "" && this.state.invitedspkrerr == "" && this.state.venuerr == "" && this.state.selectedDataerr == "" && this.state.doctorselectedataerr == "") {

      // console.log("else if2")

      let dateFormat = require('dateformat');
      let prpDate = `${dateFormat(this.state.prpDate, "dd/mm/yyyy")}`
      // let RequestedDate = `${dateFormat(this.state.RequestedDate, "dd/mm/yyyy")}`
      let subAreaCode = ""
      Object.values(this.state.selectedData).map(ele => {
        // console.log(ele, "eleee")
        subAreaCode = subAreaCode + ele + ","
      })

      let doctorcode = ""
      Object.values(this.state.doctorselectedata).map(ele => {
        // console.log(ele, "eleee")
        doctorcode = doctorcode + ele + "|"
      })

      let brandcode = ""
      Object.values(this.state.brandsselectedata).map(ele => {
        // console.log(ele, "eleee")
        brandcode = brandcode + ele + "|"
      })

      // console.log(srnum, this.state.prpcode, this.state.venue, this.state.invitedspkr, this.state.minattend, this.state.RequestedDate, prpDate, "Sou1")

      let ExpenseActualAdvamt = ""
      if (this.state.AccountheadsList.length == 0) {
        this.state.Accountheads.map(ele => {
          // console.log(ele, "eleee")
          ExpenseActualAdvamt = ExpenseActualAdvamt + ele.ExpCode + "|" + ele.n_AdvanceAmount + "|" + "0" + "|" + "0" + "^"
        })
      } else {
        this.state.AccountheadsList.map(ele => {
          // console.log(ele, "eleee")
          ExpenseActualAdvamt = ExpenseActualAdvamt + ele.ExpCode + "|" + ele.n_AdvanceAmount + "|" + "0" + "|" + "0" + "^"
        })
      }

      let teamDetail = ""
      this.state.teamDetail.map(res => {
        teamDetail = teamDetail + res.MemberName + "|"
      })

      


      let imgDoc = ""

      this.state.imageUploadFile ? this.state.imageUploadFile.map(res => {
        imgDoc = imgDoc + res.ImgFilename + "|"
      }) : ""

      let imgBill = ""
      this.state.imageUploadBill ? this.state.imageUploadBill.map(res => {
        imgBill = imgBill + res.ImgFilename + "|"
      }) : ""
      // console.log(prpDate,RequestedDate,"RequestedDate")

      var srnum = this.props.srnum.trim() != '' ? this.props.srnum : ""

      //       const data = new FormData();
      //  console.log(this.state.savedoc,"sooo")
      //       let token = localStorage.getItem("SFA_TOKEN")
      //   if(this.state.savedoc != undefined ){

      //       Object.values(this.state.savedoc).map(res => {
      //         data.append("Files", res)
      //       })
      //       data.append("Token", token);
      //       data.append("Index", "PRPBillPhotoUpload");
      //       data.append("srno", this.props.srnum);
      //       fileUpload("PRPBillFileUpload", data)
      //   }

      // console.log(brandcode, this.state.RequestCancel, this.state.reason, imgDoc, imgBill, "sou4")
      var sendata = {
        "Index": "MRExpenseSaveRequest",
        "Data": {
          "srno": srnum,
          "prpcode": this.state.prpcode,
          "venue": this.state.venue,
          "speaker": this.state.invitedspkr,
          "MinimumAttendance": this.state.minattend,
          "reqdate": this.state.RequestedDate,
          "prpdate": prpDate,
          "topic": this.state.topicode,
          "Subarea": subAreaCode,
          "doctors": doctorcode,
          "TCEs": this.getGrandEstimatevalue().toString(),
          "EstimatedTotal": this.getGrandEstimatevalue().toString(),
          "AdvanceRequestedtotal": this.getAdvanceRequested().toString(),
          "Balance": this.getbalanceValue().toString(),
          "NoTeamMembers": this.state.teamDetail.length.toString(),
          "TeamMembers": teamDetail,
          "ExpenseActualAdvamt": ExpenseActualAdvamt,
          "brands": brandcode,
          "AdvReqChkVal": this.props.status == "P" ? "1" : "0",
          "Cancelreq": this.state.RequestCancel == true ? "1" : "0",
          "cancelledremarks": this.state.RequestCancel == true ? this.state.reason : "",
          "Photoid": imgDoc,
          "Billid": imgBill
        }
      }
      // console.log(sendata, "soundarya")
      postToServer(URL_PRP, sendata).then((response) => {
        if (response.status == 200 && response.statusText == "OK") {
          this.setState({ sendfordata: response.data.data[0].Result })
          this.setState({ showpopup: true })
          this.setState({ showSuccess: false })
        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error In Api At MRPRP" })
      })
    }
  }



  render() {
    let subareadropdown = []
    let doctordatadropdown = []

    if (this.state.subarea.length > 0) {
      this.state.subarea.map((item) => {
        subareadropdown.push({
          "key": item.c_code,
          "text": item.C_Name,
          "value": item.C_Name.toLowerCase()
        })
      })
    }
    // console.log(subareadropdown,"subareadropdown")

    if (this.state.doctordata.length > 0) {
      this.state.doctordata.map((item) => {
        doctordatadropdown.push({
          "key": item.c_code,
          "text": item.c_name,
          "value": item.c_name.toLowerCase()
        })
      })
    }

    const { filterdata, selectedData } = this.state
    const items = subareadropdown.reduce((prev, item, index) => {

      const id = item.key + "$" + item.text + "$" + item.value;
      // console.log(id, "idd")
      // console.log( selectedData[id], "selectedData[id]")

      const selection = selectedData[id] ? selectedData[id] : false

      prev.push(
        <SubareDoctocheckbox
          key={index}
          selection={selection}
          getsubarea={this.getsubarea.bind(this)}
          id={id}
          item={item}
        />
      )
      return prev
    }, [])
    const selections = Object.keys(selectedData).reduce((p, n, i) => {
      if (typeof (selectedData[n]) === "string") {
        const name = n.split('$')[0];
        const desg = n.split('$')[1]
        p.push(
          <div>
            <div key={n} className="subareaselectedDropdown"><div>{desg} </div>
              {this.state.RequestCancel == true ? <div></div> :
                <img src="../../../public/assets/images/cancel.svg" className="closeImg"
                  onClick={this.removeSelectedItem.bind(this, n)}
                />}
            </div>
          </div>
        )
        // this.setState({selectedDataerr:""})
      }
      return p
    }, [])



    const { doctorfilterdata, doctorselectedata } = this.state
    const doctorlist = doctordatadropdown.reduce((prev, item, index) => {

      const id = item.key + "$" + item.text + "$" + item.value;
      // console.log(id, "idd")
      const selection = doctorselectedata[id] ? doctorselectedata[id] : false

      prev.push(
        <SubareDoctocheckbox
          key={index}
          selection={selection}
          getsubarea={this.getdoctordata.bind(this)}
          id={id}
          item={item}
        />
      )
      return prev
    }, [])
    const doctorselections = Object.keys(doctorselectedata).reduce((p, n, i) => {
      if (typeof (doctorselectedata[n]) === "string") {
        const name = n.split('$')[0];
        const desg = n.split('$')[1]
        p.push(
          <div>

            <div key={n} className="subareaselectedDropdown"><div>{desg} </div>
              {this.state.RequestCancel == true ? <div></div> :
                <img src="../../../public/assets/images/cancel.svg" className="closeImg"
                  onClick={this.removedoctorSelectedItem.bind(this, n)}
                />}
            </div>
          </div>
        )
        // this.setState({doctorselectedataerr:""})
      }
      return p
    }, [])


    var successText = <div className="expense-success-msg">“Are You Sure That You Have Entered Actual Expense?” !</div>
    var Yes = <div className="prpok">  <button className="btnnok" onClick={this.onClickSendforapproval}>Yes</button>  &nbsp;&nbsp; <button className="btnnok" onClick={this.onhide}>No</button></div>

    var successTextpop = <div className="expense-success-msg">{this.state.sendfordata}</div>
    var Ok = <div className="prpok"><Link to="/mrprplist"><button className="btnnok">OK</button></Link> </div>

    var rr = <div className="expense-success-msg">“All The Update Will Get Removed” !</div>
    var ee = <div className="prpok"> <button className="btnnok" onClick={this.onClickReq}>Yes</button>  &nbsp;&nbsp; <button className="btnnok" onClick={this.onRpophide}>No</button></div>

    return (
      <React.Fragment>
        <div className="pullleft KamClaimTablesfc newentryprp">
          <div>
            <SfaModal
              show={this.state.showSuccess}
              // imagePath={"../../../public/assets/images/submitplan.svg"}
              onHide={this.onGo}
              subDiv={successText}
              buttonGroup={Yes}
              size="sm"
            />
            <SfaModal
              show={this.state.Requestpop}
              // imagePath={"../../../public/assets/images/submitplan.svg"}
              onHide={this.onPoprequest}
              subDiv={rr}
              buttonGroup={ee}
              size="sm"
            />
            <SfaModal
              show={this.state.showpopup}
              imagePath={"../../../public/assets/images/submitplan.svg"}
              onHide={this.onSuccesspopup}
              subDiv={successTextpop}
              buttonGroup={Ok}
              size="sm"
            />
            <div className="prptype-req">
              {this.state.expenprpheader}
            </div>
          </div>
          <div className="alldropsfclocation">
            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">PRP No. </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">{this.props.srnum}</div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">PRP Name <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">{this.state.expenprpname}</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Requested Date<span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">{this.state.RequestedDate}</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">PRP Date <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation">
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                      selected={this.state.prpDate}
                      onChange={this.handlePrpDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD-MM-YYYY"
                      disableCalendar={this.state.RequestCancel}
                      disabled={this.state.RequestCancel}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../../../public/assets/images/prpcalender.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <div className="daterror-msg"> {this.state.prpDaterr} </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Topic <span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    value={this.state.prptopicname}
                    placeholder="Enter here"
                    disabled={this.state.RequestCancel}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="productDetailDrop">
                  <div className="sfa-search-dropdown .search-dropdown-label subareaLable">SubArea<span className="colorRed">*</span></div>
                  <Dropdown className="multiple-dropdown marginBot10">
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="dcrInput">
                        <input className="prp-subarea-text" placeholder="Select SubArea" disabled={this.state.RequestCancel} />
                      </div>
                    </Dropdown.Toggle>

                    {this.state.RequestCancel == true ? <div></div> :
                      <Dropdown.Menu>
                        <div className="Padding10 paddingTop jointData cal-scrollbar">
                          <div className="mt-30">
                            {items}
                          </div>
                        </div>
                      </Dropdown.Menu>}

                  </Dropdown>
                </div>
                <div className="daterror-msg"> {this.state.selectedDataerr} </div>
                <div className="selectedDiv">
                  {selections}

                </div>

              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="productDetailDrop">
                  <div className="sfa-search-dropdown .search-dropdown-label subareaLable">Doctors Expected To Attend<span className="colorRed">*</span></div>
                  <Dropdown className="multiple-dropdown marginBot10" onClick={this.doctorNum}>
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="dcrInput">
                        <input className="prp-subarea-text" placeholder="Select Doctors" disabled={this.state.RequestCancel} />
                      </div>
                    </Dropdown.Toggle>

                    {this.state.RequestCancel == true ? <div></div> :
                      <Dropdown.Menu>
                        <div className="Padding10 paddingTop jointData cal-scrollbar">

                          <div className="mt-30">
                            <div className="daterror-msg"> {this.state.emptydoctorerr} </div>
                            {doctorlist}
                          </div>
                        </div>

                      </Dropdown.Menu>}

                  </Dropdown>
                </div>
                <div className="daterror-msg"> {this.state.doctorselectedataerr} </div>
                <div className="selectedDiv">
                  {doctorselections}

                </div>

              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Venue <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    onChange={(e) => { this.setState({ venue: e.target.value, venuerr: "" }) }}
                    value={this.state.venue}
                    placeholder="Enter here"
                    disabled={this.state.RequestCancel}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.venuerr} </div>

              </div>
            </div>


            {/* <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Total Expected No. Of Doctors  <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="number"
                    className="customized-input"
                    onChange={(e) => { this.setState({ totalexpectdoctor: e.target.value, totalexpectdoctorerr: "" }) }}
                    value={this.state.totalexpectdoctor}
                    placeholder="Enter here"
                    pattern="\d*"
                    maxlength="10"
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.totalexpectdoctorerr} </div>
              </div>
            </div> */}


            {/* <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Category Of Dr. Going To Attend PRP <span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    onChange={(e) => { this.setState({ categoryofdr: e.target.value, categoryofdrerr: "" }) }}
                    value={this.state.categoryofdr}
                    placeholder="Enter here"
                    // disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.categoryofdrerr} </div>
              </div>
            </div> */}



            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Invited Speaker Name <span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    name="invitedspk"
                    onChange={(e) => { this.setState({ invitedspkr: e.target.value, invitedspkrerr: "" }) }}
                    // onChange ={(event) => this.invitedSpkchnage(event)}
                    value={this.state.invitedspkr}
                    placeholder="Enter here"
                    disabled={this.state.RequestCancel}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.invitedspkrerr} </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers ">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">No Of Dr's Attended <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation ">
                  <div><input
                    type="text"
                    className="customized-input"
                    name="minimum"
                    // onChange={(e) => { this.setState({ minattend: e.target.value, minattenderr: "" }) }}
                    onChange={(event) => this.onMinmumChange(event)}

                    value={this.state.minattend}
                    placeholder="Enter here"
                    pattern="\d*"
                    maxlength="10"
                    min="0"
                    disabled={this.state.RequestCancel}
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.minattenderr} </div>
              </div>
            </div>

            {/* <div className="locationsfa">
              <div className="user-heirarchy-field-containers ">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Location<span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation ">
                  <div><input
                    type="text"
                    className="customized-input"
                    onChange={(e) => { this.setState({ location: e.target.value }); this.setState({ locationerr: "" }) }}
                    value={this.state.location}
                    placeholder="Enter here"
                    // disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.locationerr} </div>
              </div>
            </div> */}

          </div>

        </div>

        <ExpenseBrandetail
          Brands={this.state.Brands}
          srnum={this.props.srnum}
          onBrands={this.onBrands}
          RequestCancel={this.state.RequestCancel} />

        <Expesedetview
          Accountheads={this.state.Accountheads}
          srnum={this.props.srnum}
          onPrpExpense={this.onPrpExpense}
          RequestCancel={this.state.RequestCancel} />
        {/* <MrDocUpload/> */}
        <Row className="custom-row">
          <Col
            xl={7}
            md={7}
            sm={12}
            xs={12}
            className="custom-column">
            <MrDocUpload
              showHideBtn={this.props.showHideBtn}
              onRequestCancel={this.onRequestCancel}
              srnum={this.props.srnum}
              onUploadBill={this.onUploadBill}
              onUploadDoc={this.onUploadDoc}
              RequestCancel={this.state.RequestCancel}
              onReason={this.onReason}
              expcancel={this.state.expcancel}
              remark={this.state.remark} />
          </Col>
          <Col
            xl={5}
            md={5}
            sm={12}
            xs={12}
            className="custom-column">
            <MrmemberDetails
              TeamMembers={this.state.TeamMembers}
              teamDetail={this.teamDetail}
              srnum={this.props.srnum}
              RequestCancel={this.state.RequestCancel}
              onteamErr={this.onteamErr}
              teamDetailerr={this.state.teamDetailerr} />
          </Col>
        </Row>
        <AcrHistoryDetail
          PreviousRemarks={this.state.PreviousRemarks}
          srnum={this.props.srnum} />

        {this.props.showHideBtn == false ?
          <Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={this.onGo}>Send For Approval</Button>
          :
          <Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={this.onGo}>Save</Button>
        }
        <Loader show={this.state.showLoader} />
      </React.Fragment>
    )
  }
}
export default Prpexpensetypereq;