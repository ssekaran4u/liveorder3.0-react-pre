/*
* This code display start visit which includes business,productwise trend and samples to be given
* Request URL=url/DCRValidation
* Index=Dcrno_dr_area
* Request string={"Token":"","validate":"Dcrno_dr_area","drcode":"D060900"}
* Response string={
      Dr_subarea:SA2173
      FS:PSR010
      HQ_Code:A00177
      dcrNo:""
}
* Response Error=null

*/

import React, { Component } from "react";

import { Breadcrumb, Row, Col } from "react-bootstrap";

import DoctorInfo from "../components/DocterInfo";
import BusinessInfo from "../components/BusinessInfo";
import ProductInfo from "../components/ProductInfo";
import Samples from "../components/Samples";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../landing-page/components/Footer";
import { getDoctorDetail } from "../../actions/DoctorProfile";
import { getDoctorInfo } from "../../actions/DoctorProfile";
import { getDoctorArea } from "../../actions/DoctorProfile";
import { withRouter } from "react-router";
import {sendSample} from '../../actions/DCRSamples'
import {getProducts} from '../../actions/DCR'
import Visitdetails from '../components/Visitdetails'

class VisitPreparation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ""
        };

        this.getDoctor = this.getDoctor.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getAreaInfo = this.getAreaInfo.bind(this);
        this.changeurl = this.changeurl.bind(this)
        this.getSampleValues = this.getSampleValues.bind(this)
        this.sendProducts = this.sendProducts.bind(this)
    }

    componentDidMount() {

       
        const DocterCode = this.props.match.params.id;
        this.getDoctor(DocterCode);
        
    }

    getDoctor(DocterCode) {
        var data = {
            index: "Profile",
            Result: "0",
            Token: "",
            TableName: "",
            ColumnName: "",
            Data: {
                doc: DocterCode,
                year: "2018",
                month: "7",
                Result: "1"
            }
        };
        this.props.getDoctorDetail(data);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data) {
            // console.log("completed", nextProps.data)
            return { ...prevState, data: nextProps.data };
        }
        return null;
    }



 componentDidUpdate(olsprops ,newstate){
     if(newstate.data != this.state.data ){
         if(this.state.data[0]){
           //  debugger
        if(this.state.data[0]['DSCType'] == 'Chemist' || this.state.data[0]['DSCType'] == 'Stockiest'){  
         //   debugger
         //   this.changeurl();
            }
        }
     }
 }

    handleClick(data) {
        //console.log(data, "sin");

        const calldcr = {
            N_Type:
                data[0]["DSCType"] == "Doctor"
                    ? "1"
                    : data[0]["DSCType"] == "Chemist"
                    ? "3"
                    : "2",
            DSCAName: data[0]["DSCName"],
            DoctorCode: data[0]["DSCcode"],
            Type: "dcr"
        };
        if (data[0] == undefined) {
            return;
        }

        let docInfo = [];
        docInfo.push({
            docId: data[0]["DSCcode"],
            docName: data[0]["DSCName"]
        });
        this.props.getDoctorInfo(data);
        this.getAreaInfo(data[0]["DSCcode"]);
        //this.props.history.push('/dcr/containers/createNewDCR');
    }
    getAreaInfo(DocterCode) {
        let docArea = {
            Token: "",
            validate: "Dcrno_dr_area",
            drcode: DocterCode
        };
        this.props.getDoctorArea(docArea);
    }
    // if it not a doctor  then  this page not worrk
    changeurl(){
     //   this.props.history.push('/dcr');
        this.props.history.push('/dcr');
    }
    getSampleValues(samples){ 
        this.props.sendSample(samples)
    }
    sendProducts(productlist){
        this.props.getProducts(productlist)
    }

    render() {
        const { data } = this.state;

         //console.log(data,'kunal sinha')

         if (data==undefined) return null;
        
        if (!data) return null;


        if(data.length>0){
      //console.log( data[0]["BrandExecutive"],'jack' )
        }        
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">Start Visit</h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                {/* <Breadcrumb.Item href="#">
                                    <Link to="/dcr">
                                        <button
                                            className="warning"
                                            onClick={this.handleClick(this.state.data)}
                                        >
                                            START DWR
                                        </button>
                                    </Link>
                                </Breadcrumb.Item> */}
                                <Breadcrumb.Item href="#">
                                    <Link 
                                        to={localStorage.getItem("type") == '1'? "/dashboard":   localStorage.getItem("type") == '2'? "/mdashboard" :"/adashboard" }
                                    >Dashboard</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Start Visit
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <Row className="custom-row">
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={6}
                            xl={6}
                            className="custom-column"
                        >
                            <DoctorInfo DocterDetails={data} />
                            <BusinessInfo DocterDetails={data} />
                            <Visitdetails doccode={this.props.match.params.id}  />
                        </Col>
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={6}
                            xl={6}
                            className="custom-column"
                        >
                            <ProductInfo sendProducts={this.sendProducts} doccode={this.props.match.params.id}/>
                            {data[0]['DSCType'] == 'Doctor' ? 
                                 <Samples fscode= { data[0]["BrandExecutive"] }   dcode={this.props.match.params.id} getSampleValues={this.getSampleValues} />
                            :''}
                           
                        </Col>
                        <Col className="custom-column">
                            <Link to="/dcr">
                                <button
                                    className="warning"
                                    onClick={this.handleClick(this.state.data)}
                                >
                                    START DWR
                                </button>
                            </Link>
                        </Col>
                    </Row>
                    <Footer />
                </div>
            </div>
        );
        
         
        
    }
}

const mapStateToProps = state => ({
    data: state.DOCTOR.data
});

const mapDispatchToProps = dispatch => ({
    getDoctorDetail: data => dispatch(getDoctorDetail(data)),
    getDoctorInfo: data => dispatch(getDoctorInfo(data)),
    getDoctorArea: data => dispatch(getDoctorArea(data)),
    sendSample: data => dispatch(sendSample(data)),
    getProducts:data =>dispatch(getProducts(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( withRouter(VisitPreparation));