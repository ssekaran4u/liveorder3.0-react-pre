/*
* This file includes components like address,otherinfo,legal,moreinfo,shopinfo
* Request URL=url/Calender
* Index=Profile
* Request string={"index":"Profile","Result":"0","TableName":"","Token":"":"","Data":{"doc":"C016498","year":"2018","month":"7","Result":"1"}}
* Response string={
    AccountAddress:""
    AccountClassfctn:""	
    AccountCode:""
    Address1:""	
    Address2:PADUMBASAN
    Address3:TAMLUK
    Address4:WEST BENGAL
    AreaName:TAMLUK
    BrandExecutive:PSR010
    BusinessPotential:""	
    Category:""	
    Computerised:Yes
    ContactPersonMobile:""	
    CurrentBusiness:""
    DOB:""
    DOW:""
    DSCName:M/S SECURE MEDICAL
    DSCQualification:""	
    DSCType:Chemist
    DSCcode:C016498
    Discount:""	
    DoctorAge:""	
    DoctorEmailId:""	
    DoctorGrade:""
    DoctorLandlineNumber:""	
    DoctorPrescription:""	
    DrPurschse:""
    Fridge:No
    Fscode:""	
    Gstno:""
    LandMark:""	
    Latitude:""	
    Logitute:""	
    MobileNumber:""	
    NoOfPatientsPerDay:""	
    OutletContactNo:""
    Pincode:721636
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
    n_No_of_display_Shelf:0
    n_Sft_shop:0
    stmanager:""
    storetype:""
}
* Response Error=null

*/
import React, { Component } from "react";
import { Breadcrumb, Row ,Col} from "react-bootstrap";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Address from '../components/Address'
import Otherinfo from '../components/OtherInfo'
import Legal from '../components/LegalIdentities'
import { getDoctorDetail } from '../../actions/DoctorProfile'
import MoreInfo from '../components/MoreInfo'
import ShopInfo from '../components/ShopInfo'
import Footer from "../../landing-page/components/Footer";

class ChemistProfile extends Component {
      constructor(props){
    super(props)
    this.state = {
        data: [],
    }
}
    
    componentDidMount(){
    const chemistCode = this.props.match.params.id
    var data ={
      "index": "Profile",
      "Result":"0",
      "TableName": "",
      "Token":"",
      "ColumnName": "",
      "Data":
        {
          "doc":chemistCode,
          "year": "2018",
          "month": "7",
          "Result":"1"
        }

        }
        this.props.getDoctorDetail(data)
    }

    showLocation(areaname){
        window.open('https://www.google.com/maps/place/' + areaname, '_blank');
      }

    render() { 
       
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                <div className="dcr-head">
                    <div>
                        <h4 className="daily-call-report">Chemist Profile</h4>
                    </div>
                    <div>
                        <Breadcrumb className="dcr-breadcrumb">
                            {/* <button
                                className="EditProfilebtn"
                                onClick={this.handleShowModal}
                            >
                                Edit
                            </button> */}
                            <Breadcrumb.Item>
                                <Link 
                                    to={localStorage.getItem("type") == '1'? "/dashboard":   localStorage.getItem("type") == '2'? "/mdashboard" :"/adashboard" }
                                >Dashboard</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Chemist Profile</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                {this.props.data ? (
                this.props.data.map((item, index) => (
                <div className=" profilecontainer" key={index}>
                    <Row className="firstrows">
                        <div className="col-xl-7 col-lg-6 col-md-6 col-sm-12 col-12">
                            <Row className="nopad0">
                                <div className="borderrightside">
                                    <div className="imagedotcon">
                                        <div className="greendot"></div>
                                         {/* src="../public/assets/images/Chemist@2x.png" */}
                                        <img
                                            className="innerframe"
                                           
                                            src="../public/assets/images/Chemist@3x.png"
                                        />
                                        <img
                                            className="frame"
                                            src="../public/assets/images/dr_frame.png"
                                        />
                                        <img
                                            className="diamond"
                                            src="../public/assets/images/diamond.png"
                                        />
                                    </div>

                                    <div className="imagenameboxChemeist">
                                        <Row className="docdetails nomar0">
                                            <div className="nopad0 dr_name col-12">
                                                {item.DSCName}
                                            </div>
                                            <div className="nopad0 gradepad ">
                                                <div className="drrectac ">
                                                    {item.DSCcode}
                                                </div>
                                            </div>
                                            <div className="nopad0 ">
                                                <div className="drrectac">
                                                    Grade:{item.DoctorGrade}
                                                </div>
                                            </div>
                                            <div className="nopad0 col-12 markerdetail">
                                                <i
                                                    className="fa fa-map-marker"
                                                    aria-hidden="true"
                                                />
                                                <span className="padd5" onClick={()=>this.showLocation(item.AreaName)}>{item.AreaName}({item.Address1}, {item.Address2})</span>
                                            </div>
                                        </Row>
                                    </div>

                                </div>
                            </Row>
                        </div>

                        <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="sideinfoBarChemist">
                                <Row>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">Contact Person:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval"><div>{item.contact_name  ? <p>{item.contact_name}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div></div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">Reference Number:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.ReferenceNo  ? <p>{item.ReferenceNo}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">Outlet Contact No:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.MobileNumber  ? <p>{item.MobileNumber}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">Phone Number:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.MobileNumber  ? <p>{item.MobileNumber}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">E-mail:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.DoctorEmailId  ? <p>{item.DoctorEmailId}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">Date Of Birth:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.DOB  ? <p>{item.DOB}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">Date Of Wedding:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.DOW  ? <p>{item.DOW}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                </Row>
                            </div>
                        </div>
                    </Row>
                    <Row className="custom-row">
                        <Col lg={7} md={6} sm={12} xs={12} className="custom-column">
                            <Legal data={item} />
                            {/* <Address data={item} /> */}
                            {/* <Otherinfo data={item} /> */}
                        </Col>
                        <Col lg={5} md={6} sm={12} xs={12} className="custom-column">
                        {/* <Legal data={item} /> */}
                        <Address data={item} />
                            {/* <MoreInfo data={item}/>
                            <ShopInfo data={item} /> */}
                        </Col>
                    </Row>
                </div>
                ))
                ) : <div>No Data Avaialble</div>}
                <Footer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>({
  data:state.DOCTOR.data
})

const mapDispatchToProps = dispatch => ({
  getDoctorDetail:(data) => dispatch(getDoctorDetail(data))
})
 
export default connect(mapStateToProps,mapDispatchToProps)(ChemistProfile);
