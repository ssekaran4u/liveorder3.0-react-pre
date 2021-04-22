/*
* This code displays stockiestprofile with components legalidentities,address and moreinfo
* Request URL=url/Calender
* Index=Profile
* Request string={"index":"Profile","Result":"0","TableName":"","Token":"","ColumnName":"","Data":{"doc":"C014262","year":"2018","month":"7","Result":"1"}}
* Response string={
   Address1:SHIVAJI NAGAR
   Address2:""
   Address3:GOVANDI
   Address4:""
   AreaName:Mumbai
   BrandExecutive:11M1A12
   BusinessPotential:""	
   Category:""
   Computerised:No
   ContactPersonMobile:""	
   CurrentBusiness:""
   DOB:""
   DOW:""
   DSCName:MODERNA
   DSCQualification:""	
   DSCType:Chemist
   DSCcode:C014262
   Discount:""	
   Latitude:""
   Logitute:""
   FaxNumber:""	
   Gstno:""
}
* Response Error=null

*/
import React, { Component } from "react";
import { Breadcrumb, Row ,Col} from "react-bootstrap";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Address from '../components/Address'
import Legal from '../components/Legal'
import { getDoctorDetail } from '../../actions/DoctorProfile'
import MoreInfo from '../components/MoreInfo'
import Footer from "../../landing-page/components/Footer";

class StockiestProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
        }
        this.showLocation = this.showLocation.bind(this)
    }
    
    componentDidMount(){
        const DocterCode = this.props.match.params.id
        var data ={
            "index": "Profile",
            "Result":"0",
            "TableName": "",
            "Token":"",
            "ColumnName": "",
            "Data":{
                "doc":DocterCode,
               
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
                        <h4 className="daily-call-report">Stockiest Profile</h4>
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
                            <Breadcrumb.Item active>Stockiest Profile</Breadcrumb.Item>
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
                                        <img
                                            className="innerframe"
                                            src="../public/assets/images/stockiest.png"
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

                                    <div className="imagenameboxStockiest ">
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
                            <div className="sideinfoBarStockiest">
                                <Row>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">Short Name:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval"><div>{item.contact_name  ? <p>{item.contact_name}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div></div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">PAN Number:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.ReferenceNo  ? <p>{item.ReferenceNo}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">Date Of Birth:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.DOB  ? <p>{item.DOB}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">E-mail:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.DoctorEmailId  ? <p>{item.DoctorEmailId}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">Mobile Number:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.MobileNumber  ? <p>{item.MobileNumber}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                    <div className="col-xl-5 col-md-5 col-sm-5 col-5 lefthead">Date Of Wedding:</div>
                                    <div className="col-xl-7 col-md-5 col-sm-7 col-6 rightval">{item.DOW  ? <p>{item.DOW}</p> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                                </Row>
                            </div>
                        </div>
                    </Row>
                    <Row className="custom-row">
                        <Col lg={7} md={6} sm={12} xs={12} className="custom-column">
                            <Legal data={item} />
                            <Address data={item} />
                        </Col>
                        <Col lg={5} md={6} sm={12} xs={12} className="custom-column">
                            <MoreInfo data={item}/>
                        </Col>
                    </Row> 
                </div>
                ))
                ) : null}
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
 
export default connect(mapStateToProps,mapDispatchToProps)(StockiestProfile);
