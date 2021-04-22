import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

import Loader from "../../lib/Loader";
import StatusPopup from "../../lib/StatusPopup";
import PopupSuccess from "../popups/PopupSuccess";
import Footer from "../../landing-page/components/Footer";

import FormRCPA from "../components/FormRCPA";
import { postToServer } from "../../lib/comm-utils";

class CreateRCPA extends Component {
    
    constructor(props, context) {
        super(props, context);

        this.state = {
            key: "field-work",
            Errormsg: "",
            Error: false,
            showModal: false,
            sucessModal: false,
            srNo: "",
            dcrNo: "",
            rcpaDate: new Date(),
            isDcr: "",
            isEditable: true,
            isDateDisabled: false
        };

        this.handleClose=this.handleClose.bind(this)
        this.openModalSuccess = this.openModalSuccess.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.closeModalError=this.closeModalError.bind(this)
        this.enableDateForEdit=this.enableDateForEdit.bind(this)
    }

    DCREDITActive(DCRNO){
        const _this=this
        const data = { "index": "RCPA_Edit", "Header": { "Dcr_no": DCRNO} }
        postToServer("RCPA_API", data).then(function (result) {
            if(result.data["Result"][0]) {
                _this.setState({ Editmodedata: result.data  })   
            }
        }).catch((Error) => {
            _this.setState({ loader: false, Error: true, Errormsg: "Edit DWR Error" });
            return  
        })
   }

    componentDidMount() {
        const _this = this;

        if (_this.props.match.params.id) {
            let dataStr = decodeURIComponent(_this.props.match.params.id);
            let dataArray = dataStr.split(",");
            let srNo = dataArray[0];
            let dcrNo = dataArray[1];
            let rcpaDate = dataArray[2];
            let isDcr = dataArray[3];
            let isEditable = true;
            if (dataArray[4] == "0" || dataArray[4] == 0) {
                isEditable = false
            }

            let rcpaDateArray = rcpaDate.split("/")
            let rcpaDateNew = rcpaDateArray[1] + "/" + rcpaDateArray[0] + "/" + rcpaDateArray[2]
            
            const data = { "index": "RCPA_Edit", "Data": { "rcpa_no": srNo } }
            
            postToServer("RCPA_API", data).then(function (result) {    
                if(result.data["Result"][0]) {
                    _this.setState({ Editmodedata: result.data, srNo: srNo, dcrNo: dcrNo, rcpaDate: new Date(rcpaDateNew), isDcr: isDcr, isEditable: isEditable, isDateDisabled: true })
                }
            }).catch((Error) => {
                _this.setState({ loader: false, Error: true, Errormsg: "Edit RCPA Error" });
                return
            })
        }
    }

    openModalSuccess(val, status){ 
        if(val == true){
            this.setState({
                sucessModal: true,
                msg: status
            })
        }
    }

    closeModalError() {
        this.setState({ Error: false })
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    closeModal(){
        this.setState({ sucessModal: false });
    }

    enableDateForEdit() {
        this.setState({ isDateDisabled: false })
    }

    render() {
        return (
            <div className="content-spacing body-scroll ">
               <Loader  show={this.state.loader} ></Loader>
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                Create RCPA Entry
                            </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item href="#">
                                    <Link to={ localStorage.getItem("type") == '1'? "/dashboard":   localStorage.getItem("type") == '2'? "/mdashboard" :"/adashboard" }>
                                        Dashboard
                                    </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="#">
                                    <Link to={ "/RCPAList" }>
                                        RCPAList
                                    </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Create RCPA
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    
                    <FormRCPA 
                        Editmodedata={this.state.Editmodedata}
                        srNo={this.state.srNo}
                        dcrNo={this.state.dcrNo}
                        rcpaDate={this.state.rcpaDate}
                        isDcr={this.state.isDcr}
                        isEditable={this.state.isEditable}
                        isDateDisabled={this.state.isDateDisabled}
                        enableDateForEdit={this.enableDateForEdit}
                    />
                    
                    <StatusPopup
                        message={ this.state.Errormsg }
                        show={ this.state.Error }
                        onClose={ this.closeModalError }
                        success={ false } />
                    <PopupSuccess 
                        show={ this.state.sucessModal } 
                        Msg={ this.state.msg } 
                        closeModal={this.closeModal} />
                    <Footer />
                </div>
            </div>
        );
    }
}
export default CreateRCPA;
