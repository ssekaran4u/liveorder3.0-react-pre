import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import {Tabs,Tab,Breadcrumb} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {postToServer,fileUpload} from '../../../lib/comm-utils'
import ReactToPrint from "react-to-print";
import ComponentToPrint from './ComponentToPrint'

 class RPSDeskHeadReqView extends Component {
  constructor(props) {
    super(props);
    this.state ={
      checked:false,
      rpsDetails:[],
      docDetails:[],
      rps_det:[],
      selectedFile:'',
      imgName:'',
      DeskPrintFlag : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.fileUploadHelp = this.fileUploadHelp.bind(this)
    this.requestFrwed = this.requestFrwed.bind(this)
  }
  
handleChange(){
  this.setState({
    checked:true
  })
}
  componentDidMount(){
    let srno = this.props.match.params.id
    var data=   {"index":"RPSDeskListView","Data":{"Srno":srno},"Token":""}
    postToServer("RPSDEskApi",data).then( (Result)=>{ 
      this.setState({
        rpsDetails:Result.data.data[0],
        docDetails:Result.data.data[1],
        rps_det:Result.data.data[2],
        DeskPrintFlag : Result.data.data[3][0].DeskPrintFlag
      })
    }).catch({

    })
  }
  fileUploadHelp(event) {
       
    let file  = event.target.value;
    let fname = event.target.files[0].name;
    this.setState({
        loaded: 0,
        selectedFile: event.target.files[0],
        imgName: fname
    });
//console.log('selec',event.target.files)
    // this.setState({
    //     fileName: event.target.value
    // })
   
  }
  requestFrwed(reqNo,status,note){ 
    // console.log("note",note)
      let srno =  this.props.match.params.id
      let d = new Date()
      let mon = d.getMonth() > 9 ? parseInt(d.getMonth()+1) : '0'+parseInt(d.getMonth()+1)
      // console.log("ff",mon)
      let currDate = d.getDate()+'/'+mon+'/'+d.getFullYear()
       let req_No = reqNo.toString()
       let s = status.toString()
       let date = currDate.toString()
      let token = localStorage.getItem("SFA_TOKEN")
      let data = new FormData();
      // data.append("filename", this.state.selectedFile);
      data.append("RpsSrno", srno);
      data.append("deskStatus", s);
      data.append("deskDate", date);
      data.append("deskNote", note.toString());
      data.append("assignEmp", '0395');
      data.append(
          "Token",token
      );
     data.append("Index", "UploadDeskFile");
     fileUpload("DeskRPSFileUpload", data).then( (result)=> {
       let msg
       if(result.data.data[0].Result == "1"){
         msg = "SucessFully Done"
       }else{
         msg = "Request Not Confirmed"
       }
       if(result.data.Status == "Success"){
        this.setState({
          showBeniPopup:!this.state.showBeniPopup,
          showSuccessModal:!this.state.showSuccessModal,
          sucessmsg:msg,
          success:true
      })
       }
      
     })
    
  }

  render(){
  return (
    <div className="content-spacing body-scroll">
      <div className="min-height-100">
        <div className="dcr-head">
          <div>
            <h4 className="daily-call-report">RPS Detail View</h4>
          </div>
          <div>
            <Breadcrumb className="dcr-breadcrumb">
              <Breadcrumb.Item href="#">
                  <Link to='/adashboard'>Dashboard</Link>
              </Breadcrumb.Item>
                <Breadcrumb.Item >
                  <Link to='/rps-deskHeadadmin'>RPS Desk Head</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                  RPS Detail View
              </Breadcrumb.Item>
            </Breadcrumb>
            {/* <Breadcrumbs content="RPS" subContent={mrSubContent} /> */}
          </div>
        </div>
        <div className="rps-tab-sec">
          <div className = "flex-row bottomLine">
            <h4 className ="view-color bold">RPS Details View</h4>
            {/* <div> */}
            {this.state.DeskPrintFlag == 1 ?
            <ReactToPrint
            trigger={() =>  
            <button type ="button" className ="secondary secondary-outline uploadfile btn btn-primary">
              <img src ="../public/assets/images/print.svg" className ="mr-2"/>
                 Print
            </button>}
        content={() => this.componentRef}
      />:null}
          <ComponentToPrint 
            ref={el => (this.componentRef = el)} 
            rpsDetails={this.state.rpsDetails}
            docDetails={this.state.docDetails}
            rps_det={this.state.rps_det}
            requestFrwed={this.requestFrwed}
          />
            {/* </div> */}
          </div> 
             
          </div>  
        </div>
    </div>
  )
}
}

export default RPSDeskHeadReqView