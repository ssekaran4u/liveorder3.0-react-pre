import React from 'react';
import { Component } from 'react';
import SearchDropdown from "./../../BasicComponet/searchDropdown";
import '../../../public/assets/css/sfcstyle.css';
import '../../../public/assets/css/transactionmodule.css';
import '../../../public/assets/css/prpstyle.css';
import { Button, Col, Row, Form, InputGroup, Dropdown, } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import BrandsPrp from "./brandsprp";
import BusinessDetailBrand from "./businesdetail";
import PrpExpeseDetail from "./prpexpensdetail";
import { dateFormat } from "dateformat"
import { postToServer } from '../../lib/comm-utils'
import { URL_PRP } from '../../lib/constants'
import SubareDoctocheckbox from "./subaredoctorcheckbox"
import SfaModal from "./../../BasicComponet/sfaModal";
import { Link } from 'react-router-dom';
import Loader from '../../lib/Loader'


class NewentryPrpType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "-1",
      prpDate: "",
      Date: new Date(),
      prptopicname: "",
      prpname: "",
      prpDaterr: "",
      venue: "",
      totalexpectdoctor: "",
      categoryofdr: "",
      minattend: "",
      invitedspkr: "",
      doctorattend: "",
      location: "",
      subarea: [],
      filterdata: [],
      selectedData: {},
      subAreaSelected: [],
      doctordata: [],
      doctorfilterdata: [],
      doctorselectedata: {},
      doctorselecetd: [],
      Brands: [],
      showSuccess: false,
      prptopiccode: "",
      prpcode: "",
      brandsselectedata: {},
      AccountheadsList: [],
      BusinessList: [],
      totalcostestimate: "",
      totalexpectdoctorerr: "",
      categoryofdrerr: "",
      minattenderr: "",
      invitedspkrerr: "",
      venuerr: "",
      selectedDataerr: "",
      doctorselectedataerr: "",
      emptydoctorerr: "",
      brandsselectedataerr: "",
      sendfordatafail: "",
      sendfordata: "",
      header: "",
      locationerr: "",
      Accountheaddata: [],
      Businessdata: [],
      Businessdataerr:"",
      NextSrno:"",
      TCEAChange:"",
      MandatoryVisiblesetup : [],
      preDateEnableFlag : [],
      CurBussinessmand : "",
      ExpBussinessMand : "",
      attendeesMan : "",
      attendeesvisiblity : "",
      prpdatevisiblity : "",
      datefieldMan : "",
      locationMan : "",
      locationvisiblity : "",
      placeMan : "",
      speakerMan : "",
      speakervisiblity : "",
      reqdateerr : "",
      ReqStatus : [],
      // showLoader : true
    }
    this.handlePrpDate = this.handlePrpDate.bind(this)
    this.getsubarea = this.getsubarea.bind(this)
    this.getdoctordata = this.getdoctordata.bind(this)
    this.onClickSendforapproval = this.onClickSendforapproval.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onBrands = this.onBrands.bind(this)
    this.onPrpExpense = this.onPrpExpense.bind(this)
    this.onBusiness = this.onBusiness.bind(this)
    this.doctorNum = this.doctorNum.bind(this)
    this.getGrandvalue = this.getGrandvalue.bind(this)
    this.onBusinessdataerr = this.onBusinessdataerr.bind(this)
    this.onNumChange = this.onNumChange.bind(this)
    this.onMinmumChange = this.onMinmumChange.bind(this)
    this.categortyChnage = this.categortyChnage.bind(this)
    this.invitedSpkchnage = this.invitedSpkchnage.bind(this)
    this.OnEstimate = this.OnEstimate.bind(this)
    this.reqdateChanged = this.reqdateChanged.bind(this)
    this.onLocationChange = this.onLocationChange.bind(this)
  }

  onNumChange(event){
  //   let newValue = event.target.value;
  //   if(newValue.length < 9){
  //     // this.state.totalexpectdoctor = newValue;
  //     this.setState({totalexpectdoctor:newValue})
  //     this.setState({totalexpectdoctorerr:""})
  //  }else{
  //     alert("Please Enter Upto 8 digit")
  //  }


   const { name, value } = event.target;

   if (name === "numchange" || event.target.value.length < 9) {
     // console.log(value);
     this.setState({totalexpectdoctor:value})
     var fi = /^[0-9\b]*$/;
     if (fi.test(value)) {
       this.setState({totalexpectdoctorerr:""})
     }  else {
       this.setState({totalexpectdoctorerr:"*Please Enter Numeric Only!"});
      }
   }else{
         alert("Please Enter Upto 8 Digit")
      }
  }

  onMinmumChange(event){
    
  //   let newValue = event.target.value;
  //   if(newValue.length < 9){
  //     // this.state.minattend = newValue;
  //     this.setState({minattend:newValue})
  //     this.setState({minattenderr:""})
  //  }else{
  //     alert("Please Enter Upto 8 digit")
  //  }

    const { name, value } = event.target;

    if (name === "minimum" || event.target.value.length < 9) {
      // console.log(value);
      this.setState({minattend:value})
      var fi = /^[0-9\b]*$/;
      if (fi.test(value)) {
        this.setState({minattenderr:""})
      }  else {
        this.setState({minattenderr:"*Please Enter Numeric Only!"});
       }
    }else{
          alert("Please Enter Upto 8 Digit")
       }
  }

  categortyChnage(event){
    // console.log(event.target,"event")
    const { name, value } = event.target;

    if (name === "category") {
      // console.log(value);
      this.setState({categoryofdr:value})
      var fi = /^[A-Z a-z]*$/;
      if (fi.test(value)) {
        this.setState({categoryofdrerr:""})
      } else {
        this.setState({categoryofdrerr:"*Please Enter Alphabet Characters Only!"});
      }
    }
  }

  invitedSpkchnage(event){
    // console.log(event.target,"event")
    const { name, value } = event.target;

    if (name === "invitedspk") {
      // console.log(value);
      this.setState({invitedspkr:value})
      var fi = /^[A-Z a-z]*$/;
      if (fi.test(value)) {
        this.setState({invitedspkrerr:""})
      } else {
        this.setState({invitedspkrerr:"*Please Enter Alphabet Characters Only!"});
      }
    }
  }


  onSuccess() {
    // this.setState({ showSuccess: false })
    this.setState({ showSuccess: true })

  }

  onBusinessdataerr(data){
    this.setState({Businessdataerr:data})
   }

  doctorNum() {
    if (Object.keys(this.state.selectedData).length == 0) {
      this.setState({ selectedDataerr: "Please Select Sub Area" })
    }
  }
  getGrandvalue() {
    let grandvalue = 0
    let Accountheaddata = this.state.Accountheaddata;
    Accountheaddata.map((list) => {
      grandvalue = grandvalue + (list.n_estimatedamount == "" ? 0 : parseFloat(list.n_estimatedamount))
    })
    return grandvalue
  }

  onBrands(brandsselectedata) {
    // console.log(brandsselectedata, "brandsselectedata")
    this.setState({ brandsselectedata: brandsselectedata })
  }

  onPrpExpense(AccountheadsList, getGrandvalue) {
    // console.log(AccountheadsList,getGrandvalue,TCEAChange,"AccountheadsList")
    this.setState({ AccountheadsList: AccountheadsList })
    this.setState({ totalcostestimate: getGrandvalue })
    // this.setState({TCEAChange:TCEAChange})
  }

  OnEstimate(TCEAChange){
    // console.log(TCEAChange, "tChange")
    this.setState({TCEAChange:TCEAChange})
  }

  onBusiness(BusinessList) {
    // console.log(BusinessList,"BusinessList")
    this.setState({ BusinessList: BusinessList })
  }


  handlePrpDate(date) {
    this.setState({ prpDate: date })
   // let getDatenew = new Date()
    let year1 = date.getFullYear()
    let year2 = this.state.Date.getFullYear()

    let month1 = date.getMonth()
    let month2 = this.state.Date.getMonth()

    let date1 = date.getDate()
    let date2 = this.state.Date.getDate()
    if(this.state.preDateEnableFlag[0].n_PrpPreviousDateEnable == 0){
      if(year1 == year2 ){
        if(month1 > month2){
          this.setState({ prpDaterr: "" })
        }
        else if(month1 == month2){
          if(date1 >= date2){
            this.setState({ prpDaterr: "" })
         }
         else{
          this.setState({ prpDaterr: "PRP Date  Should Not Be Lesser Than Requested Date!" })
         }
        }
        else{
          this.setState({ prpDaterr: "PRP Date  Should Not Be Lesser Than Requested Date!" })
        }
      }
      else if(year1 > year2){
        this.setState({ prpDaterr: "" })
      }
      else{
        this.setState({ prpDaterr: "PRP Date  Should Not Be Lesser Than Requested Date!" })
      }
   }
    else{
      this.setState({ prpDaterr: "" })
    }
    // else{
    //   debugger
    //   console.log("canot pass")
    // }
    // let dateforamt = new Date(date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2))
		// var requestdate = new Date(this.state.Date.getFullYear() + "/" + ("0" + (this.state.Date.getMonth() + 1)).slice(-2) + "/" + ("0" + this.state.Date.getDate()).slice(-2))
    // this.setState({ prpDate: date })
    // if(this.state.preDateEnableFlag[0].n_PrpPreviousDateEnable == 0){
    //   if (dateforamt > requestdate) {
    //     this.setState({ prpDaterr: "" })
    //   }
    //   else {
    //     this.setState({ prpDaterr: "PRP Date  should not be Lesser than Requested Date!" })
    //   }
    // }
    // else{
    //   this.setState({ prpDate: date })
    //   this.setState({ prpDaterr: "" })
    // }
    // let dateFormat = require('dateformat');
    // this.setState({ prpDate: date })
    // if (`${dateFormat(date, "dd")}` >= `${dateFormat(this.state.Date, "dd")}`) {
    //   this.setState({ prpDaterr: "" })
    // }
    // else {
    //   this.setState({ prpDaterr: "PRP Date  should not be Lesser than Requested Date!" })
    // }
  }
  reqdateChanged(date){
    if(this.state.preDateEnableFlag[0].n_PrpPreviousDateEnable == 1){
      this.setState({ Date: date,reqdateerr : "" })
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps, "nextProps")
    if (nextProps.golist.TopicandPRPname) {
      if (nextProps.golist.TopicandPRPname[0] != undefined) {
        this.setState({ prptopicname: nextProps.golist.TopicandPRPname[0].topic })
        this.setState({ prpname: nextProps.golist.TopicandPRPname[0].c_name })
        this.setState({ prptopiccode: nextProps.golist.TopicandPRPname[0].topiccode })
        this.setState({ prpcode: nextProps.golist.TopicandPRPname[0].C_Code })
      }
    }
    if (nextProps.golist.Brands) {
      if (nextProps.golist.Brands != undefined) {
        this.setState({ Brands: nextProps.golist.Brands })
      }
    }

    if (nextProps.golist.Accountheads) {
      if (nextProps.golist.Accountheads != undefined) {
        this.setState({ Accountheaddata: nextProps.golist.Accountheads })
      }
    }

    if (nextProps.golist.Business) {
      if (nextProps.golist.Business != undefined) {
        this.setState({ Businessdata: nextProps.golist.Business })
      }
    }

    if(nextProps.golist.NextSrno){
      if (nextProps.golist.NextSrno.length != 0) {
        this.setState({ NextSrno: nextProps.golist.NextSrno[0].srno })
      }
    }
    if(nextProps.golist.MandatoryVisiblesetup){
      if (nextProps.golist.MandatoryVisiblesetup.length != 0) {
        this.setState({ MandatoryVisiblesetup: nextProps.golist.MandatoryVisiblesetup,
          CurBussinessmand: nextProps.golist.MandatoryVisiblesetup[0].CurBussinessmand,
          ExpBussinessMand : nextProps.golist.MandatoryVisiblesetup[0].ExpBussinessMand,
          attendeesMan : nextProps.golist.MandatoryVisiblesetup[0].attendeesMan,
          attendeesvisiblity : nextProps.golist.MandatoryVisiblesetup[0].attendeesvisiblity,
          prpdatevisiblity : nextProps.golist.MandatoryVisiblesetup[0].prpdatevisiblity,
          datefieldMan : nextProps.golist.MandatoryVisiblesetup[0]. datefieldMan, 
          locationMan: nextProps.golist.MandatoryVisiblesetup[0].locationMan,
          locationvisiblity : nextProps.golist.MandatoryVisiblesetup[0].locationvisiblity,
          placeMan :  nextProps.golist.MandatoryVisiblesetup[0].placeMan,
          speakervisiblity : nextProps.golist.MandatoryVisiblesetup[0].speakervisiblity,
          speakerMan : nextProps.golist.MandatoryVisiblesetup[0].speakerMan
    })
      }
    }
    if(nextProps.golist.preDateEnableFlag){
      if (nextProps.golist.preDateEnableFlag.length != 0) {
        this.setState({ preDateEnableFlag: nextProps.golist.preDateEnableFlag})
      }
    }
  }

  componentDidMount() {

    let subarea = []
    var subareadata = { "Index": "SubareaBind", "Data": { "Srno": "" }, }
    postToServer(URL_PRP, subareadata)
      .then((response) => {
        // console.log(response.data.data, "subareadata")
        if (response.status == 200 && response.statusText == "OK") {

          this.setState({ subarea: response.data.data, showLoader: false })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At MRPRP", showLoader: false })
      })

    if (this.props.srnum.trim() != '') {
      var edit = {
        "Index": "RequestSrnoClick", "Data": { "srno": this.props.srnum },
      }
      let arealistselected = []
      let doctorrselected = []
      postToServer(URL_PRP, edit).then((response) => {
        // console.log(response.data, "edit")
        if (response.status == 200 && response.statusText == "OK") {
          response.data.SubareDet.map(ele => {
            //  console.log(response.data,"data")
            arealistselected.push({
              key: ele.c_code,
              text: ele.c_name,
              value: ele.c_name.toLowerCase()
            })
          })
          this.setState({showLoader: false})
          //  console.log(arealistselected,"arealistselected")

          //  let subAreaCode = ""
          arealistselected.map(item => {
            const id = item.key + "$" + item.text + "$" + item.value;
            //  subAreaCode = subAreaCode + item.key + ","
            this.getsubarea(id, item.value, true, item)
          })
          response.data.DoctorDet.map(ele => {
            //  console.log(response.data,"data")
            doctorrselected.push({
              key: ele.c_DoctorCode,
              text: ele.C_Name,
              value: ele.C_Name.toLowerCase()
            })
          })

          //  console.log(doctorrselected,"doctorrselected")

          doctorrselected.map(item => {
            const id = item.key + "$" + item.text + "$" + item.value;
            this.getdoctordata(id, item.value, true, item)
          })


          let d = response.data.Details[0].d_PrpDate
          let dd = response.data.Details[0].d_PrpDate.split('/')
          let pdate = dd[1] + '/' + dd[0] + '/' + dd[2]

        //  let d1 = response.data.Details[0].Date
          let dd1 = response.data.Details[0].d_PostedDate.split('/')
          let reqdate = dd1[1] + '/' + dd1[0] + '/' + dd1[2]

          this.setState({
            invitedspkr: response.data.Details[0].c_InvitSpeakCom,
            header: response.data.Details[0].PrpHeadName,
            location: response.data.Details[0].c_Location,
            minattend: response.data.Details[0].n_Attendees,
            venue: response.data.Details[0].c_venue,
            totalexpectdoctor: response.data.Details[0].n_ExpAudience,
            categoryofdr: response.data.Details[0].c_RequestNote,
            prpDate: new Date(pdate),
            TCEAChange:  response.data.Details[0].n_BTC,
            Date : new Date(reqdate),
            ReqStatus : response.data.ReqStatus
          })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in edit" })
      })
    }
  }


  getsubarea(id, name, checked, item) {
    //this.setState({showLoader:true})
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
          this.setState({ doctordata: response.data.data, showLoader: false })

        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At MRPRP",showLoader: false })
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
  //  console.log(this.state.TCEAChange,this.getGrandvalue(), "madhuri1")

    // console.log("else if", this.state.locationerr,);
    // console.log("else if", this.state.prpDaterr,);
    // console.log("else if", this.state.totalexpectdoctorerr,);
    // console.log("else if", this.state.categoryofdrerr,);
    // console.log("else if", this.state.minattenderr);
    // console.log("else if", this.state.invitedspkrerr,);
    // console.log("else if", this.state.venuerr,);
    // console.log("else if", this.state.selectedDataerr,);
    // console.log("else if", this.state.doctorselectedataerr)

    // console.log("onclicks end")

    // if (this.state.location == "" || this.state.prpDate == "" || this.state.totalexpectdoctor == "" || this.state.categoryofdr == "" || this.state.minattend == "" || this.state.invitedspkr == ""  || Object.keys(this.state.selectedData).length == 0 || Object.keys(this.state.doctorselectedata).length == 0 || Object.keys(this.state.brandsselectedata).length == 0) {
	
      let CurrbussnessAmt =  this.state.Businessdata.filter( item => item.CurrbussnessAmt == "")
      let Expbussinessamt =  this.state.Businessdata.filter( item => item.Expbussinessamt == "")
      let estimatedamount =  this.state.Accountheaddata.filter( item => item.n_estimatedamount == "")
      let AdvanceAmount =  this.state.Accountheaddata.filter( item => item.n_AdvanceAmount == "")


      if (this.state.prpDate == "" && this.state.datefieldMan != 0) {
        this.setState({ prpDaterr: "Please Enter PRP Date !" })
        alert("Please Enter PRP Date !")
      }
     else  if (this.state.Date == null) {
        this.setState({ reqdateerr: "Please Enter PRP Request Date !" })
        alert("Please Enter PRP Request Date !")
      }
      else if (Object.keys(this.state.selectedData).length == 0) {
        this.setState({ selectedDataerr: "Please Select Sub Area !" })
        alert("Please Select Sub Area  !")
      }
      else if (Object.keys(this.state.doctorselectedata).length == 0) {
        this.setState({ doctorselectedataerr: "Please Select Doctors Expected To Attend !" })
        alert("Please Select Doctors Expected To Attend !")
      }

      // if (this.state.venue == "") {
      //   this.setState({ venuerr: "please enter Venue !" })
      //   alert("please Enter Venue !")
      // }


      else if (this.state.totalexpectdoctor == "") {
        this.setState({ totalexpectdoctorerr: "Please Enter Total Expected No. Of Doctors !" })
        alert("Please Enter Total Expected No. Of Doctors !")
      }
      else if (this.state.categoryofdr == "") {
        this.setState({ categoryofdrerr: "Please Enter Category Of Dr. Going To Attend PRP !" })
        alert("Please Enter Category Of Dr. Going To Attend PRP !")
      }
      else if (this.state.minattend == "" && this.state.attendeesMan != 0) {
        this.setState({ minattenderr: "Please Enter Minimum Attendance !" })
        alert("Please Enter Minimum Attendance !")
      }
      else if (this.state.invitedspkr == "" && this.state.speakerMan != 0) {
        this.setState({ invitedspkrerr: "Please Enter Invited Speaker Name !" })
        alert("Please Enter Invited Speaker Name !")
      }
     else if (this.state.location == "" && this.state.locationMan != 0) {
        this.setState({ locationerr: "Please Enter Location !" })
        alert("Please Enter Location !")
      }
      else if (Object.keys(this.state.brandsselectedata).length == 0) {
        // this.setState({ brandsselectedataerr: "please Select Brands !" })
        alert("Please Select Atleast One Brands !")
      }
       
      // else if (this.state.Businessdata.length > 0) {
      //   this.state.Businessdata.map(res => {
      //     console.log(this.state.Businessdata,"Businessdata")
      //   if (res.CurrbussnessAmt == "" && res.Expbussinessamt == "") {
      //     console.log(res.CurrbussnessAmt,res.Expbussinessamt,"Businessdata")
      //      alert("please Enter CurrbussnessAmt and Expbussinessamt")
      //       this.setState({ Businessdataerr: "please enterCurrbussnessAmt and Expbussinessamt!" })
      //     }
      //   })
      // }
      
    // }

    else if(CurrbussnessAmt.length != 0 && this.state.CurBussinessmand != 0){
      alert("Please Enter CurrbussnessAmt And Expbussinessamt")
    }

    else if( Expbussinessamt.length != 0 && this.state.ExpBussinessMand != 0){
      alert("Please Enter CurrbussnessAmt And Expbussinessamt")
    }

   

    // else if( estimatedamount.length != 0){
    //   alert("Please enter estimatedamount")
    // }

    // else if( AdvanceAmount.length != 0){
    //   alert("Please enter AdvanceAmount")
    // }
    else if (this.state.TCEAChange == ""){
      alert("Total Cost Estimate Amount Can't Be Empty And Please Enter Estimate Amount")
    }

    else if (this.state.TCEAChange == 0){
      alert("Total Cost Estimate Amount Can't Be 0 , Please Enter An Amount")
    }

    else if(this.state.TCEAChange != this.getGrandvalue()){
  //  console.log(this.state.TCEAChange,this.getGrandvalue(), "madhuri2")
      alert("Total Cost Estimate Amount And Total Estimate Amount Should Be Same")
    }

    else if (this.state.locationerr == "" && this.state.prpDaterr == "" && this.state.totalexpectdoctorerr == "" && this.state.categoryofdrerr == "" && this.state.minattenderr == "" && this.state.invitedspkrerr == ""  && this.state.selectedDataerr == "" && this.state.doctorselectedataerr == "" && this.state.reqdateerr == "") {
      // console.log("else if")

      let dateFormat = require('dateformat');
      let prpDate = `${dateFormat(this.state.prpDate, "dd/mm/yyyy")}`
      let Date = `${dateFormat(this.state.Date, "dd/mm/yyyy")}`
      let subAreaCode = ""
      Object.values(this.state.selectedData).map(ele => {
        // console.log(ele, "eleee")
        subAreaCode = subAreaCode + ele + "~"
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


      let estimatedamount = ""
      if (this.state.AccountheadsList.length == "0") {
        this.state.Accountheaddata.map(ele => {
          // console.log(ele, "eleee")
          estimatedamount = estimatedamount + ele.c_code + "^" + ele.n_estimatedamount + "|"
        })
      } else {
        this.state.AccountheadsList.map(ele => {
          // console.log(ele, "eleee")
          estimatedamount = estimatedamount + ele.c_code + "^" + ele.n_estimatedamount + "|"
        })
      }

      let AdvanceAmount = ""
      if (this.state.AccountheadsList.length == "0") {
        this.state.Accountheaddata.map(ele => {
          // console.log(ele, "eleee")
          AdvanceAmount = AdvanceAmount + ele.c_code + "^" + ele.n_AdvanceAmount + "|"
        })
      } else {
        this.state.AccountheadsList.map(ele => {
          // let AdvanceAmount = ele.n_AdvanceAmount != '0' ? ele.n_estimatedamount : '0'
          // console.log(ele, "eleee")
          AdvanceAmount = AdvanceAmount + ele.c_code + "^" + ele.n_AdvanceAmount + "|"
        })
      }





      let currentamt = ""
      if (this.state.BusinessList.length == "0") {
        this.state.Businessdata.map(ele => {
          let CurrbussnessAmt = ele.CurrbussnessAmt == "" ? 0 : ele.CurrbussnessAmt
          // console.log(ele, "eleee")
          currentamt = currentamt + ele.code + "^" + CurrbussnessAmt + "|"
        })
      } else {
        this.state.BusinessList.map(ele => {
          let CurrbussnessAmt = ele.CurrbussnessAmt == "" ? 0 : ele.CurrbussnessAmt
          // console.log(ele, "eleee")
          currentamt = currentamt + ele.code + "^" + CurrbussnessAmt + "|"
        })
      }

      let expectedamt = ""
      if (this.state.BusinessList.length == "0") {
        this.state.Businessdata.map(ele => {
          let Expbussinessamt = ele.CurrbussnessAmt == "" ? 0 : ele.Expbussinessamt
          // console.log(ele, "eleee")
          expectedamt = expectedamt + ele.code + "^" + Expbussinessamt + "|"
        })
      } else {
        this.state.BusinessList.map(ele => {
          let Expbussinessamt = ele.CurrbussnessAmt == "" ? 0 : ele.Expbussinessamt
          // console.log(ele, "eleee")
          expectedamt = expectedamt + ele.code + "^" + Expbussinessamt + "|"
        })
      }

      // let dataaa
      // if(this.state.AccountheadsList.length == ""){
      //   dataaa = this.getGrandvalue().toString()
      // }else{
      //    dataa = this.state.totalcostestimate
      // }


      var srnum = this.props.srnum.trim() != '' ? this.props.srnum : ""

      var sendata = {
        "Index": "MrSaveRequest",
        "Data": {
          "srno": srnum,
          "reqdate": Date,
          "prpdate": prpDate,
          "place": subAreaCode,
          "location": this.state.location,
          "prpcode": this.state.prpcode,
          "topic": this.state.prptopiccode,
          "expectedAudience": this.state.totalexpectdoctor,
          "Categoryofdoc": this.state.categoryofdr,
          "expenseEstimate": estimatedamount,
          "Advanceestimate": AdvanceAmount,
          "attendees": this.state.minattend,
          "speaker": this.state.invitedspkr,
          "brands": brandcode,
          "doctors": doctorcode,
          "currbus": currentamt,
          "expbus": expectedamt,
          "venue": this.state.venue,
          "TCEs": this.state.AccountheadsList.length == "" ? this.getGrandvalue().toString() : this.state.totalcostestimate.toString(),
          // "TCEs":  this.state.totalcostestimate ,


          // "srno" :"","reqdate":"26/08/2020","prpdate" :"27/08/2020","place" :"SA020359~","location" : "ytr","prpcode" : "PRP040","topic" : "PRT003","expectedAudience" : "1","Categoryofdoc" : "ngk","expenseEstimate" : "AC0001^0141|AC0003^0|AC0004^0|AC0005^0|",
          // "Advanceestimate" : "AC0001^0141|AC0003^0|AC0004^0|AC0005^0|","attendees" : "1","audio":"","video":"","speaker" : "lkjh","brands" : "S00031|",
          // "doctors" : "D0499110|","currbus": "S00002^01|S00003^0|S00031^0|S00034^0|S00040^0|S00041^0|U01^0|U09^0|U10^0|U46^0|U52^0|U53^0|U58^0|U59^0|U72^0|U73^0|U74^0|U75^0|","expbus" : "S00002^05|S00003^0|S00031^0|S00034^0|S00040^0|S00041^0|U01^0|U09^0|U10^0|U46^0|U52^0|U53^0|U58^0|U59^0|U72^0|U73^0|U74^0|U75^0|","venue" : "dg","TCEs" : "141"
        }
      }
      // console.log(sendata, "soundarya")

      postToServer(URL_PRP, sendata).then((response) => {
        // console.log(response, sendata, "sendata")
        if (response.status == 200 && response.statusText == "OK") {
          this.setState({ sendfordata: response.data.data[0].result })
          this.setState({ sendfordatafail: response.data.data.data })
          this.setState({ showSuccess: true, showLoader: false })
          // setTimeout(function () {
          // <Redirect to="/mrprplist" />
          // this.setState({showSuccess:false})
          // }.bind(this), 3000);

        }
      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in Api At MRPRP", showLoader: false })
      })


      //  console.log(eventDate,Date,"eventDate")
    }


  }
  onLocationChange(event){
    const { name, value } = event.target;

    if (name === "locationname") {
      // console.log(value);
      this.setState({location:value})
      var fi = /^[A-Z a-z]*$/;
      if (fi.test(value)) {
        this.setState({locationerr:""})
      } else {
        this.setState({locationerr:"*Please Enter Alphabet Characters Only!"});
      }
    }
    }
  render() {
    // console.log(this.state.TCEAChange,"ddddd")
    // console.log(this.state.totalcostestimate,"ddddd")
    // console.log(this.props.srnum,this.state.totalcostestimate, this.state.AccountheadsList.length, this.state.BusinessList.length,"ssrnum")
    // console.log(this.state.Accountheaddata, this.state.Businessdata,"Accountheaddata")
    //  console.log(this.props.hideshowbtn, "hideshowbtn")
    // console.log(this.state.totalcostestimate,"sound")
    // console.log(this.state.BusinessList,this.state.Businessdata,"Businessdata")

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

    if (this.state.doctordata.length > 0) {
      this.state.doctordata.map((item) => {
        doctordatadropdown.push({
          "key": item.c_code,
          "text": item.c_name,
          "value": item.c_name.toLowerCase()
        })
      })
    }
    // console.log(this.state.sendfordata, this.state.sendfordatafail,"sendfordata")
    // console.log(this.state.selectedData, this.state.doctorselectedata, this.state.brandsselectedata,"this.state.selectedData")
    // console.log(this.state.subarea, "this.state.subarea")
    // console.log(this.state.doctordata, doctordatadropdown,"doctordatadropdown")
    // console.log(this.props.golist,this.state.prptopicname,this.state.prpname,"soundarya data")
    // console.log(this.state.Brands,"Brands")


    // let Araytype = []
    // Araytype.push(
    //   {
    //     "key": '-1',
    //     "text": 'Search & Select',
    //     "value": '-1',
    //   },
    //   {
    //     "key": '100',
    //     "text": 'ABC',
    //     "value": '100',
    //   },
    //   {
    //     "key": '101',
    //     "text": 'DEF',
    //     "value": '101',
    //   },
    //   {
    //     "key": '102',
    //     "text": 'HIJ',
    //     "value": '102',
    //   }
    // )

    const { filterdata, selectedData } = this.state
    const items = subareadropdown.reduce((prev, item, index) => {

      const id = item.key + "$" + item.text + "$" + item.value;
      // console.log(id, "idd")
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
              <img src="../../public/assets/images/cancel.svg" className="closeImg"
                onClick={this.removeSelectedItem.bind(this, n)}
              />
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
              <img src="../../public/assets/images/cancel.svg" className="closeImg"
                onClick={this.removedoctorSelectedItem.bind(this, n)}
              />
            </div>
          </div>
        )
        // this.setState({doctorselectedataerr:""})
      }
      return p
    }, [])

    var successText = <div className="expense-success-msg">{this.state.sendfordata} !</div>
    var OK = <Link to="/mrprplist"><div className="prpok"><button className="btnnok">OK</button></div></Link>
    return (
      <React.Fragment>
        <div className="pullleft KamClaimTablesfc newentryprp">
          <SfaModal
            show={this.state.showSuccess}
            imagePath={"../../../public/assets/images/submitplan.svg"}
            onHide={this.onSuccess}
            subDiv={successText}
            buttonGroup={OK}
            size="sm"
          />
          <div>
            <div className="prptype-req">
              {this.state.header}
              {/* PRP Type Request({this.props.namevalue}) */}
              {/* PRP Type Request({this.state.prptopicname}) */}
            </div>
          </div>
          <div className="alldropsfclocation">
            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">PRP No. </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    value={this.props.srnum.trim() != '' ? this.props.srnum : this.state.NextSrno}
                    // placeholder="Enter"
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">PRP Name <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    value={this.state.prpname}
                    // placeholder="Enter"
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Requested Date </p>
                </div>
                {/* {this.state.Date ? 
                <div className="selectlocation">
                <InputGroup className="datepickerAligment controls text-right">
                  <DatePicker
                    selected={this.state.Date}
                    // onChange={this.dateChanged}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select"
                    readOnly/>
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </div> :  */}
              {this.state.ReqStatus.length != 0 ? 
              <div className="selectlocation">
              <InputGroup className="datepickerAligment controls text-right">
                <DatePicker
                  selected={this.state.Date}
               //   onChange={this.reqdateChanged}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select"
                  readOnly/>
                <InputGroup.Append>
                  <InputGroup.Text>
                    <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div> : 
              <div className="selectlocation">
              <InputGroup className="datepickerAligment controls text-right">
                <DatePicker
                  selected={this.state.Date}
                  onChange={this.reqdateChanged}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select"/>
                <InputGroup.Append>
                  <InputGroup.Text>
                    <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>}
               
             <div className="daterror-msg"> {this.state.reqdateerr} </div>
               
              </div>
            </div>

            {this.state.prpdatevisiblity == 1 ? 
            <div className="locationsfa">
            <div className="user-heirarchy-field-containers">
              <div className="distributorClaimListsfc">
                <p className="paralocation-prp">PRP Date {this.state.datefieldMan == 1 ? <span className="colorRed">*</span> : null}</p>
              </div>
              <div className="selectlocation">
                <InputGroup className="datepickerAligment controls text-right">
                  <DatePicker
                    selected={this.state.prpDate}
                    onChange={this.handlePrpDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD-MM-YYYY"
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </div>
              <div className="daterror-msg"> {this.state.prpDaterr} </div>
            </div>

          </div> : null}
            {/* <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <SearchDropdown
                  labelName="Sub Area"
                  //   errorMessage={this.state.designationErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.data}
                  dropdownList={subareadropdown}
                //   getValue={this.getDesignationValue}
                />
              </div>
            </div> */}
            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="productDetailDrop">
                  <div className="sfa-search-dropdown .search-dropdown-label subareaLableprp">SubArea<span className="colorRed">*</span></div>
                  <Dropdown className="multiple-dropdown marginBot10">
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="dcrInput">
                        <input className="prp-subarea-text" placeholder="Select SubArea" />
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="Padding10 paddingTop jointData cal-scrollbar">

                        <div className="mt-30">
                          {items}
                        </div>
                      </div>

                    </Dropdown.Menu>

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
                  <div className="sfa-search-dropdown .search-dropdown-label subareaLableprp">Doctors Expected To Attend<span className="colorRed">*</span></div>
                  <Dropdown className="multiple-dropdown marginBot10" onClick={this.doctorNum}>
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="dcrInput">
                        <input className="prp-subarea-text" placeholder="Select Doctors" />
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <div className="Padding10 paddingTop jointData cal-scrollbar">

                        <div className="mt-30">
                          <div className="daterror-msg"> {this.state.emptydoctorerr} </div>
                          {doctorlist}
                        </div>
                      </div>

                    </Dropdown.Menu>

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
                  <p className="paralocation-prp">Venue  </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    onChange={(e) => { this.setState({ venue: e.target.value, venuerr: "" }) }}
                    value={this.state.venue}
                    placeholder="Enter here"
                    // disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.venuerr} </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Total Expected No. Of Doctors  <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    name = "numchange"
                    // onChange={(e) => { this.setState({ totalexpectdoctor: e.target.value, totalexpectdoctorerr: "" }) }}
                    onChange={(event) => this.onNumChange( event)}

                    value={this.state.totalexpectdoctor}
                    placeholder="Enter here"
                         min="0"
                        // pattern="\d*"
                        maxlength="8"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.totalexpectdoctorerr} </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Category Of Dr. Going To Attend PRP <span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    name = "category"
                    onChange={(e) => { this.setState({ categoryofdr: e.target.value, categoryofdrerr: "" }) }}
                    // onChange ={(event) => this.categortyChnage(event)}
                    value={this.state.categoryofdr}
                    placeholder="Enter here"
                    // disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.categoryofdrerr} </div>
              </div>
            </div>

            {this.state.attendeesvisiblity == 1 ? 
            <div className="locationsfa">
            <div className="user-heirarchy-field-containers">
              <div className="distributorClaimListsfc">
                <p className="paralocation-prp">Minimum Attendance {this.state.attendeesMan == 1 ? <span className="colorRed">*</span> : null}  </p>
              </div>
              <div className="selectlocation">
                <div><input
                  type="text"
                  className="customized-input"
                  name = "minimum"
                  // onChange={(e) => { this.setState({ minattend: e.target.value, minattenderr: "" }) }}
                  onChange={(event) => this.onMinmumChange( event)}

                  value={this.state.minattend}
                  placeholder="Enter here"
                  min="0"
                  // pattern="\d*"
                  maxlength="8"
                  onWheel={event => event.currentTarget.blur()}

                /></div>
              </div>
              <div className="daterror-msg"> {this.state.minattenderr} </div>
            </div>
          </div> : null}
          {this.state.speakervisiblity == 1 ? 
          <div className="locationsfa">
          <div className="user-heirarchy-field-containers">
            <div className="distributorClaimListsfc">
              <p className="paralocation-prp">Invited Speaker Name {this.state.speakerMan == 1 ? <span className="colorRed">*</span> : null}  </p>
            </div>
            <div className="selectlocation">
              <div><input
                type="text"
                className="customized-input"
                name = "invitedspk"
                onChange={(e) => { this.setState({ invitedspkr: e.target.value, invitedspkrerr: "" }) }}
                // onChange ={(event) => this.invitedSpkchnage(event)}
                value={this.state.invitedspkr}
                placeholder="Enter here"
                // disabled={true}
                min="0"
                onWheel={event => event.currentTarget.blur()}

              /></div>
            </div>
            <div className="daterror-msg"> {this.state.invitedspkrerr} </div>
          </div>
        </div> : null}
            

            {/* <div className="locationsfa">
              <div className="user-heirarchy-field-containers ">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Doctors Expected To Attend <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation ">
                  <div><input
                    type="text"
                    className="customized-input"
                    onChange={(e) => { this.setState({ doctorattend: e.target.value }) }}
                    value={this.state.doctorattend}
                    placeholder="Enter here"
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
              </div>
            </div> */}

            {this.state.locationvisiblity == 1 ?
            <div className="locationsfa">
            <div className="user-heirarchy-field-containers ">
              <div className="distributorClaimListsfc">
                <p className="paralocation-prp">Location {this.state.locationMan ? <span className="colorRed">*</span> : null} </p>
              </div>
              <div className="selectlocation ">
                <div><input
                  type="text"
                  className="customized-input"
                  onChange={(event) => this.onLocationChange(event)}
                  // onChange={(e) => { this.setState({ location: e.target.value }); this.setState({ locationerr: "" }) }}
                  value={this.state.location}
                  placeholder="Enter here"
                  name = "locationname"
                  min="0"
                  onWheel={event => event.currentTarget.blur()}

                /></div>
              </div>
              <div className="daterror-msg"> {this.state.locationerr} </div>
            </div>
          </div> : null}

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
                    // disabled={true}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                 /></div>
               </div>
             </div>
           </div>
          </div>
        </div>
        <BrandsPrp 
        brands={this.state.Brands}
         onBrands={this.onBrands} 
         brandsselectedataerr={this.state.brandsselectedataerr}
          srnum={this.props.srnum} />

        <BusinessDetailBrand 
        golist={this.props.golist} 
        onBusiness={this.onBusiness} 
        onBusinessdataerr= {this.onBusinessdataerr}
         Businessdataerr={this.state.Businessdataerr} />
        {/* <PrpExpeseDetail golist={this.props.golist} onPrpExpense={this.onPrpExpense} /> */}
        <PrpExpeseDetail 
        hideshowbtn = {this.props.hideshowbtn} 
        golist={this.props.golist} 
        onPrpExpense={this.onPrpExpense} 
        AccountheadsList={this.state.AccountheadsList}
        TCEAChange = {this.state.TCEAChange}
        OnEstimate = {this.OnEstimate}
        MandatoryVisiblesetup= {this.state.MandatoryVisiblesetup}/>

        {this.props.hideshowbtn == false ? <div></div> :
          <Button className="sfcAddBtn-loaditem send-for-aprvl" onClick={this.onClickSendforapproval}>Send For Approval</Button>
        }
        <Loader show={this.state.showLoader} />
      </React.Fragment>
    )
  }
}
export default NewentryPrpType;