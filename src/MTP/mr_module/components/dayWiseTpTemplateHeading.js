import React, { Component } from "react";
import { Row, Col, Button ,Form} from 'react-bootstrap';
import { Link } from "react-router-dom"
import {postToServer} from '../../../lib/comm-utils'
import StatusPopup from '../../../lib/StatusPopup'
import ConfirmationBox from '../../../lib/ConfirmationBox'
import {withRouter} from 'react-router-dom'
import NotePopup from '../popups/NotePopup'

class TpHeading extends Component {
    constructor(props){
        super(props)
        this.state={
            selectionVal: false,
            showSucess:false,
            Errormsg:'',
            Messagetype:'',
            statusModal:false,
            msg:'',
            data:[],
            showNoteState:false,
            Areanote:'',
            showNotePopup:false
        }
        this.oncheck = this.oncheck.bind(this)
        this.deleteNodetail = this.deleteNodetail.bind(this)
        this.onHide = this.onHide.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.getBtnResponse = this.getBtnResponse.bind(this)
        this.redirect = this.redirect.bind(this)
        this.showNote=this.showNote.bind(this)
        this.areachange=this.areachange.bind(this)
        this.Savearea=this.Savearea.bind(this)
        this.onClose = this.onClose.bind(this)
        this.redirectCal = this.redirectCal.bind(this)
    }

    Savearea(){


        var data = {"Data":{"Month":this.props.monthCode,
                            "Year":this.props.year,
                            "Note":this.state.Areanote ,
                            "day":this.props.day,
                            "subarea":this.props.areaCode
                        },

                           
                            "index":"MTP_subnote","Token":"",
                            "menuid":"38"
                    }

                    postToServer("MTP", data).then((result) => {

                        this.setState({ showNotePopup:!this.state.showNotePopup })
                    })
                    
    }

    areachange(area){
         //const va=event.target.value
    this.setState({ Areanote:area })


    }


  showNote(){
        this.setState({ showNotePopup:!this.state.showNotePopup })

        var data = {"Data":{"Month":this.props.monthCode,
        "Year":this.props.year,
        "Note":this.state.Areanote ,
        "day":this.props.day,
        "subarea":this.props.areaCode
    },

       
        "index":"MTP_getsubnote","Token":"",
        "menuid":"38"
}  

postToServer("MTP", data).then((result) => {

    const kl= result.data[0]["C_Subarea_Note"]

    //alert(kl)

    this.setState({ Areanote:kl })
})
    }
    componentDidMount(){
        var data = {"Data":{"Month":this.props.monthCode,
                            "Year":this.props.year,
                            "subarea":this.props.areaCode}
                            ,"index":"MTP_cal","Token":"",
                            "menuid":"38"
                    }
                    
                    postToServer("MTP", data).then((result) => {
                        if(result.data.Nodetails){
                            result.data.Nodetails.map((item)=>{ 
                                let monthVal = item.month
                                let dayVal = item.day
                                let yearVal = item.year
                                if(monthVal == this.props.monthCode && dayVal == this.props.day && yearVal == this.props.year){
                                    this.setState({
                                       // toggleTable:true,
                                        selectionVal:true,
                                       // selectedData:item,
                                       data:result.data.Nodetails
                                    })
                                    this.props.onShowEntry('A',item)
                                }
                            })
                          }
                     }).catch( (Error)=>{
                         this.setState({ Error: true, Errormsg: "Error in App" })
                     })
    }
    oncheck(){ 
        const {id,checked} = event.target
        if(checked){
            this.setState({isChecked: !this.state.isChecked},()=>{this.props.onShowEntry('B','')})
        }else{
            if(this.state.data.length > 0){
                this.deleteNodetail()
            }else{
                this.setState({isChecked: !this.state.isChecked},()=>{this.props.onShowEntry('B','')})
            }
            
        }
        
    }
    deleteNodetail(){
        this.setState({
            statusModal:!this.state.statusModal,
            msg:'You want to delete  No detail ?'
        })
        
    }
    onHide(){
        this.setState({ 
            showSucess: !this.state.showSucess,
        })
    }
    hideModal(){
        this.setState({ 
            statusModal: !this.state.statusModal,
        })
    }
    getBtnResponse(data){
        if(data == "yes"){
            this.setState({selectionVal: false},()=>{this.props.onShowEntry('C','')})
            var worktype = {"index":"MTP_NODETAIL_delete","Token":"",
            "Data":{"Month":this.props.monthCode,
                    "Year":this.props.year,
                    "subarea":this.props.areaCode,
                    "day":this.props.day
                }
            }
            postToServer("MTP",worktype).then( (Result)=>{ 
            // if(Result.data.Status == 'Success'){ 

            this.setState({ 
                statusModal: !this.state.statusModal,
                showSucess: !this.state.showSucess,
                Errormsg:Result.data[0].RESULT,
                Messagetype:true
            })
            //}
            }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
            })
        }else{
            
            this.setState({ 
                selectionVal:true,
                statusModal: !this.state.statusModal,
            })
        }
    }
    redirect(data,mtpType){
        localStorage.setItem("latestmonth",data);
        if(mtpType == "manager"){
            this.props.history.push('/manager-mtp')
        }else{
            this.props.history.push('/mrtp')
        }
        
    }
    onClose(){
        this.setState({
            showNotePopup:!this.state.showNotePopup
        })
    }
    redirectCal(data,mtpType){
        localStorage.setItem("latestmonth",data);
        this.props.history.push('/newTourPlan')
    }

    render() { 
        return (
            <div className="main-heading">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="main-display">
                            <div className="main-content"> </div>
                            <div className="main-content-col2">
                            {/* <div className="plan-for-meeting-btn">
                                <div className="tourP" onClick={this.showNote}> 
                                    <div style={{"font-size":"13px","padding":"6px 0px"}}>NOTE</div>
                                </div>
                            </div> */}
                                <div className="plan-for-meeting-btn">
                                
                                  
                                    {/* <Button variant="primary" className="no-detail-button" disabled> */}
                                    { this.props.docmandatory == 0   ?
                                    <div className="tourP"> 
                                        {/* <input type="checkbox" className="myCheck" onClick={ this.handleChange } />No Details */}
                                        <Form.Check 
                                            custom
                                            type="checkbox"
                                            checked={this.state.selectionVal?this.state.selectionVal:null}
                                            id="day12"
                                            label="No Details"
                                            name="No Details"
                                            onChange={this.oncheck}
                                        />
                                       
                                    </div>: null}
                                    {/* </Button> */}
                                </div>
                                <div className="sub-content">
                                    <Link to="/dashboard">
                                        <span>Dashboard</span>
                                    </Link > &nbsp;/&nbsp;
                                    
                                    <span>
                                        {/* <span className="hcursur" onClick={()=>this.redirect(this.props.month,this.props.mtpType)}>TP Calendar</span> */}
                                        </span> &nbsp;&nbsp;
                                    {this.props.mtpType == "manager" ?   <span 
                                                                            className="hcursur" 
                                                                            onClick={()=>this.redirectCal(this.props.month,this.props.mtpType)}>
                                                                                TP Calendar&nbsp;/&nbsp;
                                                                        </span>: <span className="hcursur" onClick={()=>this.redirect(this.props.month,this.props.mtpType)}>TP Calendar /  </span>  }  Template
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

{/* 
                <NotePopup 
                    show={this.state.showNotePopup } 
                    Savearea={this.Savearea}
                    onClose={this.onClose}
                    areachange={this.areachange}
                    Areanote={this.state.Areanote}
                /> */}

                {/* { this.state.showNoteState ==true ?   <div className="optionDrop" onMouseLeave={this.hideApprovalDropdown}>
                 

                 <div className=" plan-this-task applyLeaveHeader">
                                    <Form.Label className="customized-label" placeholder="Password">Note</Form.Label>
                                                <Form.Control
                                                    required
                                                    as="textarea"
                                                    rows="3"
                                                    maxLength="300"
                                                    placeholder="Add message here"
                                                    className="popup-textbox"
                                                    value={this.state.Areanote}
                                                    onChange={this.areachange}
                                                />
                                    </div>
                 <Button variant="primary"  onClick={this.Savearea} className="no-detail-button" >Save</Button>
                </div>:null} */}
                <StatusPopup
                    message={this.state.Errormsg}
                    show={this.state.showSucess}
                    onClose={this.onHide}
                    success={this.state.Messagetype}
                /> 
                <ConfirmationBox 
                    show={this.state.statusModal}
                    onClose={this.hideModal}
                    msg={this.state.msg}
                    btnResponse={this.getBtnResponse}
                 /> 
            </div>
        )
    }
}

export default withRouter(TpHeading)