/*
* This file will display commondcr page which includes fieldworkdwr,groupactivity and otherworktypedwr for creating dwr entry
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



*/
import React, { Component } from "react";
import { Breadcrumb, Tabs, Tab } from "react-bootstrap";
import FieldWorkDWR from "../components/FieldWorkDWR";
import GroupActivity from "../components/GroupActivity";
import OtherWorkDWR from "../components/OtherWorkDWR";
import Loader from "../../lib/Loader";
import { postToServer } from "../../lib/comm-utils";
import { Link } from "react-router-dom";
import StatusPopup from "../../lib/StatusPopup";
import Footer from "../../landing-page/components/Footer";
import OtherActivity from '../popups/OtherActivity'
import SuccessSave from '../popups/successSavePopup'
import DigitalCallReport from "../components/DigitalCallReport";
//import Covid from '../components/Covid'

class CommonDCR extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: "field-work",
            Mandatory: {},
            Errormsg: "",
            Error: false,
            Editmodedata: {},
            showModal: false,
            sucessModal: false
        };
        this.loadvalidation = this.loadvalidation.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.Errorclose = this.Errorclose.bind(this)
        this.showSuccess = this.showSuccess.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.DCREDITActive = this.DCREDITActive.bind(this)
    }

    DCREDITActive(DCRNO) {

        const _this = this
        const data = { "index": "DCR_Edit", "Header": { "Dcr_no": DCRNO } }
        postToServer("DCRAPI", data).then(function (result) {

            if (result.data["DWR"][0]) {
                _this.setState({ Editmodedata: result.data })

            }

        }).catch((Error) => {

            console.log(Error)
            _this.setState({ loader: false, Error: true, Errormsg: "Edit DWR Error" });
            return

        })
    }


    /* ---------------------- COMMENT SECTION--------------------------
     *  WHICH IS REQURED  TO  TAKE FROM USER  //Mandatory
     * ------------TASK INFO--------------------------
     * CURRENTLY ADDED
     * -----------------------------------------------
     * 1.SAMEPLE REQURED ?
     * 2.PRODUCT REQUIRED ?
     * 3.NOTE  REQUIRED ?
     * 4.POP  REQUIRED  ?
     * -------------API INFO-----------------------
     * INPUT API WILL TAKE
     * 1.DATE
     * 2.VALIDATION AS API INDEX
     * 3. TOKEN *
     * ----------------------------------------------
     *  NOTE :- IT MAY BE REDUX BECAUSE IT IS ONLY ONE TIME CALL
     *
     *
     *
     * ----------------- DEVLOPER INFO---------------------------
     *  CREATED BY :-    KUNAL KUMAR
     *  UNDER PRODUCT :- SFA360
     *  DATE:-           7-3-2019
     * --------------------------------------------
     */
    loadvalidation() {
        const _this = this;
        var data = {
            validate: "DCRLoadvalidation"
        };
        postToServer("DCRValidation", data)
            .then(function (result) {
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

                this.setState({ Error: true, Errormsg: "Error in App" });
            });
    }


    Errorclose() {
        this.setState({ Error: false })
    }
    componentDidMount() {
        const _this = this;

        if (_this.props.match.params.id) {


            _this.setState({ loader: true })
            const data = { "index": "DCR_Edit", "Header": { "Dcr_no": _this.props.match.params.id } }
            postToServer("DCRAPI", data).then(function (result) {

                if (result.data["DWR"][0]) {

                    // console.log(result.data["DWR"], 'jack')
                    if (result.data["DWR"][0]["n_group_activity"].trim() == "1") {
                        _this.setState({ loader: false, Editmodedata: result.data, key: "GA", })
                        return
                    }



                    if (result.data["DWR"][0]["n_group_activity"].trim() == "3") {
                        _this.setState({ loader: false, Editmodedata: result.data, key: "digital-call-report", })
                        return
                    }

                    //digital-call-report
                    if (result.data["DWR"][0]["n_group_activity"].trim() == "0") {
                        _this.setState({ loader: false, Editmodedata: result.data, key: "other-work", })
                        return
                    }
                    if (result.data["DWR"][0]["n_group_activity"].trim() == "2") {
                        _this.setState({ loader: false, Editmodedata: result.data, key: "field-work", })
                        return
                    }
                } else {
                    _this.setState({ loader: false, Error: true, Errormsg: "Work Type  Not Seted For This Dwr" });
                }

                _this.setState({ loader: false, Error: true, Errormsg: "Work Type  Not Seted For This Dwr" });
            }).catch((Error) => {
                _this.setState({ loader: false, Error: true, Errormsg: "Edit DWR Error" });
                return
                //  console.log(Error,'DCREDIT')
            })

        }

        //  this.loadvalidation();
    }
    handleShowModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    handleClose() {
        this.setState({ showModal: false });
    }
    showSuccess(val, status) {
        if (val == true) {
            this.setState({
                sucessModal: true,
                msg: status
            })
        }
    }
    closeModal() {
        this.setState({ sucessModal: false });
    }
    render() {
        return (
            <div className="content-spacing body-scroll ">
                <Loader show={this.state.loader} ></Loader>
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            {this.props.match.params.id ? (
                                <h4 className="daily-call-report">
                                    Edit DWR Entry
                                </h4>
                            ) : (
                                    <h4 className="daily-call-report">
                                        Create DWR Entry
                                </h4>
                                )}
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <div
                                    className="activityBtn"
                                    onClick={this.handleShowModal}
                                >
                                    <img
                                        src="../public/assets/images/add-icon.svg"
                                        className="exportImgPad1"
                                    />
                                    Other Activity
                                </div>
                                <Breadcrumb.Item href="#">
                                    <Link
                                        to={localStorage.getItem("type") == '1' ? "/dashboard" : localStorage.getItem("type") == '2' ? "/mdashboard" : "/adashboard"}
                                    >Dashboard</Link>
                                </Breadcrumb.Item>

                                <Breadcrumb.Item href="#">
                                    <Link to="/dcr-list">DWR List</Link>
                                </Breadcrumb.Item>

                                <Breadcrumb.Item active>
                                    DWR Entry
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <Tabs
                        id="controlled-tab-example"
                        className="dcrtab"
                        activeKey={this.state.key}
                        onSelect={key => { this.props.match.params.id ? this.setState({ Error: true, Errormsg: "Tab Switch Not Allowed  In Edit Mode" }) : this.setState({ key }) }}
                    >
                        <Tab eventKey="field-work" title="Field Work DWR">
                            {this.state.key == "field-work" ? (
                                <FieldWorkDWR
                                    DCREDITActive={this.DCREDITActive}
                                    Editmodedata={this.state.Editmodedata}
                                    Mandatory={this.state.Mandatory}
                                />
                            ) : null}
                        </Tab>
                        <Tab eventKey="GA" title="Group Activity">
                            {this.state.key == "GA" ? (
                                <GroupActivity
                                    Editmodedata={this.state.Editmodedata} Mandatory={this.state.Mandatory}
                                />
                            ) : null}
                        </Tab>
                        <Tab eventKey="other-work" title="Other Work Type DWR">
                            {this.state.key == "other-work" ? (
                                <OtherWorkDWR Editmode={this.props.match.params.id} Editmodedata={this.state.Editmodedata} />
                            ) : null}
                        </Tab>
                        {/* <Tab eventKey="Covid-19" title="Covid-19">
                            {this.state.key == "Covid-19" ? (
                                <Covid  />
                            ) : null}
                        </Tab> */}
                       
                    </Tabs>
                    {this.state.showModal ?
                        <OtherActivity dcrno={this.props.match.params.id} showPlanModal={this.state.showModal} closeModal={this.handleClose} showSuccess={this.showSuccess} /> : ''}


                    <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.Errorclose}
                        success={false}
                    />
                    <SuccessSave show={this.state.sucessModal} Msg={this.state.msg} closeModal={this.closeModal} />
                    {/* <Otherac  showPlanModal={true} > </Otherac> */}
                    <Footer />
                </div>
            </div>
        );
    }
}
export default CommonDCR;
