/*
* This file displays doctor profile which includes components like business info,clinic address,residential address
* Request URL=url/Calender
* index=Profile
* Request string={"index":"Profile","Result":"0","TableName":"","Token":"","ColumnName":"","Data":{"doc":"D026266","year":"2018","month":"7","Result":"1"}}
* Response string={
  AccountAddress:""	
  AccountClassfctn:""
  AccountCode:""
  Address1:""	
  Address2:""
  Address3:""
  Address4:""
  AreaName:TAMLUK
  BrandExecutive:PSR010
  BusinessPotential:""	
  Category:PHYSICIAN
  Computerised:No
  ContactPersonMobile:""	
  CurrentBusiness:""
  DOB:""
  DOW:""
  DSCName:AMIT DEY
  DSCQualification:MBBS
  DSCType	Doctor:""
  DSCcode:D026266
  Discount:""	
  DoctorAge:""
  DoctorEmailId:""	
  DoctorGrade:PROSPECT
  DoctorLandlineNumber:""	
  DoctorPrescription:No
  DrPurschse:No
  Fridge:No
  Fscode:PSR010
  Gstno:""
  LandMark:""	
  Latitude:""
  Logitute:""
  MobileNumber:1111111111
  NoOfPatientsPerDay:""	
  OutletContactNo:""
  Pincode:""
  ReferenceNo:""	
  RegistrationNumber:""	
  Store_Manager:""
  SubareName:PADUMBASAN
  TinNo:""
  chemisttype:""	
  classification:""	
  classificationcode:""	
  contact_name:""
  desc_display_shelf:""
  distributorcode:""	
  lic_food:""
  lic_no:""
  n_No_of_display_Shelf:""	
  n_Sft_shop:""
  stmanager:""
  storetype:""
}
Response Error={}
*/


import React, {Component} from 'react'
import {Breadcrumb,Row} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl'
import { getDoctorDetail } from '../../actions/DoctorProfile'
import BusinessInfo from '../components/BusinessInfo'
import DissDropDown from '../components/DissDropDown'
import Footer from "../../landing-page/components/Footer";

import "../../../public/assets/font-awesome/css/font-awesome.css"
import "../../../public/assets/css/bootstrap.min.css"
import "../../../public/assets/css/style.css" 
import "../../../public/assets/css/responsive.css"

const messages = defineMessages({
    title: {
        id: 'doctor_profile.container.profile',
        defaultMessage:'Doctor Profile'
    },
    regs:{
      id:'doctor_profile.container.regs',
      defaultMessage:'Registration Number'
    },
    dateofbirth:{
      id:'doctor_profile.container.dob',
      defaultMessage:'Date Of Birth'
    },
    doctorage:{
      id:'doctor_profile.container.age',
      defaultMessage:'Age'
    },
    doctoremail:{
      id:'doctor_profile.container.email',
      defaultMessage:'E-mail'
    },
    doctormobile:{
      id:'doctor_profile.container.mobile',
      defaultMessage:'Mobile Number'
    },
    doctorlandline:{
      id:'doctor_profile.container.landline',
      defaultMessage:'Landline Number'
    }
})

class Profile extends Component {
  constructor(props){
      super(props)
      this.state = {
      data: [],
      }
  }
  componentDidMount(){
    const DocterCode = this.props.match.params.id
    var data ={
      "index": "Profile",
      "Result":"0",
      "TableName": "",
      "Token":"",
      "ColumnName": "",
      "Data": 
        {
          "doc":DocterCode,
          "year": "2018",
          "month": "7",
          "Result":"1"
        }
      
      }
    this.props.getDoctorDetail(data)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data !== nextProps.data)
        //console.log("completed", nextProps.data)
        return {...prevState, data:nextProps.data}
    return null
  }
  showLocation(areaname){
    window.open('https://www.google.com/maps/place/' + areaname, '_blank');
  }

  render() {
    const { intl,data } = this.props
    if(!data) 
        return null
    return (
      <div className="content-spacing body-scroll">
        <div className="min-height-100">
        <div className="dcr-head">
            <div>
                <h4 className="daily-call-report">{intl.formatMessage(messages.title)}</h4>
            </div>
            <div>
                <Breadcrumb className="dcr-breadcrumb">
                  <DissDropDown docCode={this.props.match.params.id} />
                    <Breadcrumb.Item>
                      <Link 
                        to={localStorage.getItem("type") == '1'? "/dashboard":   localStorage.getItem("type") == '2'? "/mdashboard" :"/adashboard" }
                        >Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Doctor Profile</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>
        {this.state.data ? (
            this.state.data.map((docdata, index) => (
            <div className="profilecontainer" key={index}>
                <div className="firstrow">
                    <Row>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="doctorimagerow">
                          <div className="borderright">
                            <div className="imagedotcon">
                                <div className="greendot"></div>
                                <img className="innerframe" src="../public/assets/images/Doctormale@3x.png"/>
                                <img className="frame" src="../public/assets/images/frame200.png"/>
                                <img className="diamond" src="../public/assets/images/diamond.png"/>
                              </div>
                              <div className="imagenamebox">
                                <Row className="docdetails nomar0">
                                  <div className="nopad0 dr_name col-12">{docdata.DSCName}</div>
                                    <div className="nopad0">
                                      <div className="drrectac">{docdata.DSCcode}</div>
                                    </div>
                                    <div className="nopad0">
                                      <div className="drrectac">Grade: {docdata.DoctorGrade}</div>
                                    </div>
                                    <div className="nopad0 col-12 docdetail degis">{docdata.Category}</div>
                                    <div className="nopad0 col-12 docdetail">{docdata.DSCQualification}</div>
                                    <div className="nopad0 col-12 markerdetail" onClick={()=>this.showLocation(docdata.AreaName)}><i className="fa fa-map-marker" aria-hidden="true"></i>  <span>{docdata.AreaName}</span>(<span>{docdata.SubareName}</span>)</div>
                                </Row>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="sideinfo">
                        <Row>
                            <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">{intl.formatMessage(messages.regs)}:</div>
                            <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{docdata.RegistrationNumber ? docdata.RegistrationNumber : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                            <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">{intl.formatMessage(messages.dateofbirth)}:</div>
                            <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{docdata.DOB ? docdata.DOB : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                            <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">{intl.formatMessage(messages.doctorage)}:</div>
                            <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{docdata.DoctorAge ? docdata.DoctorAge : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                            <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">{intl.formatMessage(messages.doctoremail)}:</div>
                            <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{docdata.DoctorEmailId ? docdata.DoctorEmailId : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                            <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">{intl.formatMessage(messages.doctormobile)}:</div>
                            <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{docdata.MobileNumber ? docdata.MobileNumber : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                            <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">{intl.formatMessage(messages.doctorlandline)}:</div>
                            <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{docdata.DoctorLandlineNumber ? docdata.DoctorLandlineNumber : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                          </Row>
                      </div> 
                    </div>
                  </Row>
            </div>
                <BusinessInfo  info={docdata} />  
            </div>     
            ))
            ) : null}
            <Footer />  
            </div> 
          </div>
    )
  }
}

const mapStateToProps = state =>({ 
  data:state.DOCTOR.data
})

const mapDispatchToProps = dispatch => ({
  getDoctorDetail:(data) => dispatch(getDoctorDetail(data))
})
export default injectIntl(connect(mapStateToProps,mapDispatchToProps)(Profile));
// export default Profile;

