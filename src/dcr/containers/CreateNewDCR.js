/*
* This file includes fieldworkdwr,groupactivity and otherworktypedwr for creating dcr and display selected additional doctor
* Request URL=url/DCRValidation
* Index=DCRLoadvalidation
* Request string={"index":"DCRLoadvalidation","Token":""}
* Response string={
    Pob:1
    Stay_AT:1
    n_DcrDrNoteMandatory:1
    n_Dcr_Product_Mandatory:0
    n_Dcr_sample_madatory:0
    n_stayflg:0
}
* Response Error={}




* Request URL=url/DCRValidation
* Index=HolidayValidation
* Request string={"index":"HolidayValidation","date":"27-8-2019","Token":""}
* Response string=null
* Response Error={}




* Request URL=url/DcrComponentAdd
* n_type=4
* Request string={"index":"","Token":""}
* Response string=null
* Response Error={}


*/


import React, { Component } from "react";
import { Breadcrumb, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import ProductDeatilDropdown from "../components/ProductDeatilDropdown";
import SamplePramotionDropdown from "../components/SamplePramotionDropdown";
import POBDropdown from "../components/POBDropdown";
import ClinicalDisscussion from "../components/ClinicalDisscussion";
import OtherActivity from "../popups/OtherActivity";
import JointWorkingDropdown from "../components/JointWorkingDropdown";
import { getProductDropdown } from "../../actions/DCR";
import { tick } from "../../lib/comm-utils";
import DcrCreatedPopup from "../popups/DcrCreatedPopup";
import DoctorDetailDCR from "../components/DoctorDetailDCR";
import { Link } from "react-router-dom";
import Footer from "../../landing-page/components/Footer";
import { postToServer } from '../../lib/comm-utils'

import { withRouter } from "react-router";
class CreateNewDCR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            date: new Date(),
            time: new Date().getHours() + ":" + new Date().getMinutes(),
            timeType: "",
            data: [],
            docInfo: [],
            docArea: [],
            show: false,
            SelectDate: '',
            Mandatory: {},
            AllowDCRError: false,
            docdetails:[],
            Editmodedata:{}
        };
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        //        this.tick = this.tick.bind(this)
        this.getDropdown = this.getDropdown.bind(this);
        this.showSuccessPopup = this.showSuccessPopup.bind(this);
        this.closeSuccessPopup = this.closeSuccessPopup.bind(this);
        this.loadvalidation = this.loadvalidation.bind(this);
        this.removeItem = this.removeItem.bind(this)
        this.getDoctordetails=this.getDoctordetails.bind(this)
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.docInfo !== nextProps.docInfo &&
            prevState.docArea !== nextProps.docArea
        ) {
            // console.log("data=",nextProps.docInfo)
            return {
                ...prevState,
                docInfo: nextProps.docInfo,
                docArea: nextProps.docArea
            };
        }
        if (prevState.data !== nextProps.data)
            // console.log(nextProps.data)
            return { ...prevState, data: nextProps.data };
        return null;
    }
    funpopflag() {
        var data = {
            Token: "",
            validate: "validateDoctorPOBDetailsEntry"
        };
    }
    componentDidMount() {
        this.getDropdown();
        this.intervalID = setInterval(() => tick(), 1000);
        this.dateChanged(this.state.date)
        this.loadvalidation();
        this.getDoctordetails()
    }


    getDoctordetails(){
        //  docdetails
        var d=new Date()

      
        const month=d.getMonth() + 1
        const date =d.getFullYear()  +'-'+  month   +'-'+ d.getDate();
         const data={"index":"DoctorApp","Data":{   date:date,  "doc":  this.state.docInfo[0]["DSCcode"] }}
        postToServer("DCRAPI", data).then((result) => { 
          

            console.log(result.data["data"][0],'data came from')
          
            this.setState({ 


              docdetails:result.data["data"][0]
             })
          }).catch( (Error)=> { })
        
      }

    loadvalidation() {
        const _this = this;
        var data = {
           
            validate: "DCRLoadvalidation"
          
        };
        postToServer("DCRValidation", data)
            .then(function(result) {
                if (result.data.length > 0) {
                    const sample = result.data[0]["n_Dcr_sample_madatory"];
                    const product = result.data[0]["n_Dcr_Product_Mandatory"];
                    const note = result.data[0]["n_DcrDrNoteMandatory"];
                    const pop = result.data[0]["Pob"];
                    let c = {
                        sample: sample,
                        product: product,
                        note: note,
                        pop: pop
                    };
                    //Mandatory
                    _this.setState({
                        Mandatory: c
                    });
                }
            })
            .catch(ERROR => {


                 conmsole.log(ERROR,'kunal sinha')
                this.setState({ Error: true, Errormsg: "Error in App" });
            });
    }

    dateChanged(d) {
        var day = d.getDate()
        var year = d.getFullYear()
        var month = d.getMonth() + 1
        const selecteddate = year + '-' + month + '-' + day
        // alert(selecteddate)
        const _this = this
        _this.setState({ date: d, SelectDate: selecteddate });
        var dd = d.getMonth() + 1
        //console.log(d,d.getDate() +'-'+d.getMonth()+'-'+d.getFullYear())
        var data = {
             "validate": "HolidayValidation"
            , "date": d.getDate() + '-' + dd + '-' + d.getFullYear()
        }
        postToServer("DCRValidation", data).then((result) => {
            
            if (result.data.length != 0) {
                const validatedate = result.data[0]["validate"]
                if (result.data[0]["flag"] == "1") {
                    _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate, AllowDCRError: false })
                }
                if (result.data[0]["flag"] == "2") {
                    _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '    DCR Not Allowed  For  This Date', AllowDCRError: true })
                }
                if (result.data[0]["flag"] == "14") {
                    _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '       DCR Not Allowed  For  This Date', AllowDCRError: true })
                }
            } else {
                _this.setState({ Errormsg: '', AllowDCRError: false, selectedData: {} })
            }
        }).catch((Error) => {
          //  console.log(Error, 'Error')
            _this.setState({ Error: true, Errormsg: "Error in App" })
        })
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    showSuccessPopup() {
        this.setState({
            show: true
        });
    }
    closeSuccessPopup() {
        this.setState({
            show: false
        });
    }

    removeItem(id) {

        const k= localStorage.getItem("type")
        if(k=="1"){
            this.props.history.push('dashboard');
        }else{
            this.props.history.push('mdashboard');
        }
         
    }
    getDropdown() {
        var data = {
            n_type: "1",
            Token: ""
        };
        this.props.getProductDropdown(data);
    }
    handleShowModal() {
        this.setState({
            showModal: true
        });
    }
    handleClose() {
        this.setState({
            showModal: false
        });
    }
    render() {
        const { data, docInfo, docArea } = this.state;
         const calldcr={
            'N_Type':docInfo[0]["DSCType"]=='Doctor' ?'1': docInfo[0]["DSCType"]=='Chemist'?'3':'2',
            'DSCAName':docInfo[0]["DSCName"],
            'DoctorCode':docInfo[0]["DSCcode"],
            'Type':'dcr'

        }
        if (!data) return null;
        return (
            <div className="content-spacing body-scroll ">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                Quick DWR Entry
                            </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <div
                                    className="activityBtn flexDisplay"
                                    onClick={this.handleShowModal}
                                >
                                    <div>
                                    <img
                                        src="../public/assets/images/add-icon.svg"
                                        className="exportImgPad"
                                    />
                                    </div>
                                    <div className="otherpad">Other Activity</div>
                                </div>
                                <Breadcrumb.Item>
                                    <Link 
                                    to={localStorage.getItem("type") == '1'? "/dashboard":   localStorage.getItem("type") == '2'? "/mdashboard" :"/adashboard" }
                                    >Dashboard</Link>
                                </Breadcrumb.Item>
                               
                                <Breadcrumb.Item active>
                                    DWR Entry
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <OtherActivity
                        showPlanModal={this.state.showModal}
                        closeModal={this.handleClose}
                    />
                    <div className="dcr-list-sec">
                        <div className="docName borderBottom">
                            {docInfo == null ? (
                                ""
                            ) : (
                                <span>
                                    {docInfo[0]["DSCName"].toLowerCase()}(
                                    {docInfo[0]["DSCType"]})
                                </span>
                            )}
                        </div>
                        {/* <div className="timeSec">
                            <div className="timeIcon">
                                <img src="../public/assets/images/time.svg" />
                            </div>
                            <div className="currtime">{this.state.time}</div>
                            <div className="currtimeslot">{tick()}</div>
                        </div> */}
                        <div className="newdcr">
                            <DoctorDetailDCR  Editmodedata={this.state.Editmodedata} removeItem={this.removeItem}  Mandatory={this.state.Mandatory} Executedate={this.state.SelectDate}  dcrallowstatus={this.state.AllowDCRError}  doccode={docInfo[0]["DSCcode"]}      dataDoc={this.state.docdetails} />
                        </div>
                    </div>

                    <DcrCreatedPopup
                        show={this.state.show}
                        onHide={this.closeSuccessPopup}
                    />
                    <Footer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.DCR.dataDropdown,
    docInfo: state.DOCTOR.docInfo,
    docArea: state.DOCTOR.docArea
});

const mapDispatchToProps = dispatch => ({
    getProductDropdown: data => dispatch(getProductDropdown(data))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)( withRouter(CreateNewDCR));
