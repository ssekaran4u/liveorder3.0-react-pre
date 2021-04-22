import React, { Component } from "react";
import CustomTable from "./CustomTable";
import "../../../../public/assets/css/campaignRequest.css";
import AddBeneficiary from "../popup/AddBeneficiary"
import {postToServer,fileUpload} from '../../../lib/comm-utils'
import {withRouter} from 'react-router-dom'
import ShowActions from '../popup/ShowActions'
import StatusPopup from '../../../lib/StatusPopup'
import DashLoader from "../../../lib/DashboardLoader";
import Loader from '../../../lib/Loader'
class ConfirmationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleHeader: this.props.toggleHeader,
            showModal:false,
            monthList:[],
            yearList:[],
            reqList:[],
            month:new Date().getMonth() + 1,
            year:new Date().getFullYear(),
            statusList:[],
            status:'All',
            reqno:'',
            showSuccessModal:false,
            sucessmsg:'',
            showLoader:true,
        };
        this.handleShowModal = this.handleShowModal.bind(this)
        this.getMonth = this.getMonth.bind(this)
        this.getFilterList = this.getFilterList.bind(this)
        this.getYear = this.getYear.bind(this)
        this.getStatus = this.getStatus.bind(this)
        this.showForword = this.showForword.bind(this)
        this.ConfirmReq = this.ConfirmReq.bind(this)
        this.showApprovalDropdown = this.showApprovalDropdown.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
    }

    componentDidMount(){
      this.setState({showLoader : true})
      this.getFilterList(this.state.month,this.state.year,this.state.status)

      var data = {"index":"MonthList","Data":{},"Token":""}
       postToServer("RPSDEskApi",data).then( (Result)=>{ 
        this.setState({
          monthList:Result.data
        })
      }).catch({

      })
      var res = {"index":"TargetYear","Data":{},"Token":""}
      postToServer("RPSDEskApi",res).then( (Result)=>{ 
        this.setState({
          yearList:Result.data
        })
      }).catch({

      })
      var res1 ={"index":"RPSDeskStatus","Data":{ },"Token":""}
      postToServer("RPSDEskApi",res1).then( (Result)=>{ 
        this.setState({
          statusList:Result.data
        })
      }).catch({

      })
    }
    componentDidUpdate(oldprop,oldstate){
      if(oldprop.refrenshFlag != this.props.refrenshFlag){
        if(this.props.refrenshFlag == "1"){
          this.getFilterList(this.state.month,this.state.year,'All')
        }
        
      }
      
    }

    getFilterList(month,year,status){
      this.setState({showLoader : true})
      var rep =  {"index":"RPSDeskOtherListItem","Data":{"nmonth":month.toString(),"nyear":year.toString(),"nflag":status},"Token":""}
      postToServer("RPSDEskApi",rep).then( (Result)=>{ 
        this.setState({
          reqList:Result.data.data,
          showLoader : false
        })
      }).catch( (Error) => {
        this.setState({ Error: true, Errormsg: "Error in App Prp List API", showLoader: false })
     })
    }
    getMonth(month){
      this.setState({
        month:month
      })
      this.getFilterList(month,this.state.year,this.state.status)
    }
    getYear(year){
      let _this = this
      _this.setState({
        year:year
      })
      _this.getFilterList(this.state.month,year,this.state.status)
    }
    getStatus(code,name){
        this.setState({
          status:name
        })
        this.getFilterList(this.state.month,this.state.year,code)
      }
       static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data) {
            // console.log(nextProps.data);
            return { ...prevState, data: nextProps.data };
        }
        if (prevState.toggleHeader !== nextProps.toggleHeader)
            return { ...prevState, toggleHeader: nextProps.toggleHeader };
        return null;
    }
    handleShowModal(id,status){
      console.log("hiii",this.state.showModal)
      // this.setState({
      //       showModal:!this.state.showModal,
      //       reqno:reqNo
      // })
      this.props.history.push('/rps-deskHeadView/'+id)
      sessionStorage.setItem('status',status)
    }
    showForword(id,status,type){
      // if(status == "CONFIRMED"){
         // this.setState({
         //   showModal:!this.state.showModal,
         //   reqno:reqno
         // })
       //}
      if(type == "forwd" || type== "view"){
        // this.ConfirmReq(id,status)
         this.props.history.push('/rps-deskHeadView/'+id)
          sessionStorage.setItem('status',status)
       }else{
         // this.props.history.push('/rps-deskHeadView/'+id)
         // sessionStorage.setItem('status',status)
         this.ConfirmReq(id,status)
       }
       
     }
     ConfirmReq(reqNo,status){
      let d = new Date()
      let mon = d.getMonth() > 9 ? parseInt(d.getMonth()+1) : '0'+parseInt(d.getMonth()+1)
      //console.log("ff",mon)
      let currDate = d.getDate()+'/'+mon+'/'+d.getFullYear()
       let req_No = reqNo.toString()
       let s = status.toString()
       let date = currDate.toString()
      let token = localStorage.getItem("SFA_TOKEN")
      const data = new FormData();
      // data.append("filename", this.state.selectedFile);
      data.append("RpsSrno", req_No);
      data.append("deskStatus", s);
      data.append("deskDate", date);
      data.append("deskNote", "");
      data.append(
          "Token",token
      );
     data.append("Index", "UploadDeskFile");
     fileUpload("DeskRPSFileUpload", data).then( (result)=> {
      let msg 
      if(result.data.Status == "Success"){
        msg = result.data.data[0].Result
        this.setState({
          showSuccessModal:!this.state.showSuccessModal,
          sucessmsg:msg,
          success:true
      })
      this.getFilterList(mon,d.getFullYear(),'All')
      }
     
      
     })
    }
    showApprovalDropdown(){
      this.setState({
          showDrop:!this.state.showDrop
      })
  }
  hideStatusModal(){
    this.setState({
      showSuccessModal:!this.state.showSuccessModal
    })
  }
  //
    render() { 
     
       //console.log("addBeneficiaryView",this.props.status)
       const header = [
            { prop: 'reqNo', title: 'Req.No.', filterable: true },
            { prop: 'RPSAmt', title: 'RPS Amt(₹)', filterable: true },
            { prop: 'status1', title: 'Status', filterable: true },
            { prop: 'RPSDate', title: 'RPS Date', filterable: true },
            { prop: 'SubmittedBy', title: 'Submitted By', filterable: true },
            { prop: 'Division', title: 'Division', filterable: true },
            { prop: 'Region', title: 'Region', filterable: true },
            { prop: 'RPSName', title: 'RPS Name', filterable: true },
            { prop: 'RPSAmt', title: 'A.R.A(₹)', filterable: true },
            { prop: 'InitiatedOn', title: 'Initiated On', filterable: true },
            { prop: 'approvername', title: 'Approver', filterable: true },
            { prop: 'approvername', title: 'Approver', filterable: true },
            { prop: 'approvedon', title: 'Approved On', filterable: true },
            { prop: 'confirmedby', title: 'Confirmed By', filterable: true },
            { prop: 'confirmedon', title: 'Confirmed On', filterable: true },
            { prop: 'deskconfirmedon', title: 'Desk Confirmed On', filterable: true },
            { prop: 'note', title: 'Approved/Confirmed/Desk Confirmed Note', filterable: true },
            { prop: 'HoldNote', title: 'Hold Note', filterable: true },
            { prop: 'accountdate', title: 'Accountable Date', filterable: true },
           
        ];
        const imglink = 
                <img
                className ="img action-img"
                src="../public/assets/images/edit_icon.svg"
                alt="edit"
                 onClick={()=>this.handleShowModal(item.reqNo)}
              />
           
                  var approvedText= <span className="approved-status">Approved</span>
                  var requestText= <span className="reqested-status">Requested</span>
                  var deskconfirmedText= <span className="confirmed-status">Desk Confirmed</span>
                  var confirmedText= <span className="confirmed-status">Confirmed</span>
                  var rejectedText= <span className="rejected-status">Rejected</span>
                  var holdtext= <span className="confirmed-status">Hold</span>
                  var forwordtext= <span className="reqested-status">Forwarded</span>
                  let editReq
                  let holdReq
                  if(this.state.reqList.length > 0){
                  this.state.reqList.map((item)=>{
                    holdReq= <ShowActions  
                    reqType="oneTab" 
                    benificiaryCode={item.BankStatusCode} 
                    showForword={this.showForword} 
                    srno={item.ReqNo} 
                    status={item.status} 
                  />

                     editReq = <span>
                    {/* {item.status == "DESK CONFIRMED" || item.status == "DESK REJECTED"? */}
                    <div>
                    <img 
                    src="../public/assets/images/blue_eye.svg" 
                    className="dcrimg mr-3" 
                    onClick={item.status == "DESK REJECTED" ? '' :
                      ()=>this.handleShowModal(item["ReqNo"],item.status)} 
                  />
                    <span>{item['ReqNo']}</span>
                    </div>
                    {/* // :
                
                    // <ShowActions  reqType="secTab" showForword={this.showForword} srno={item.ReqNo} status={item.status} />
                    // } */}
                  </span>

                      if(item.status == "CONFIRMED"){
                          item.status1 =  confirmedText
                      }
                      if(item.status == "APPROVED"){
                        item.status1 =  approvedText
                      }
                      if(item.status == "HOLD"){
                        item.status1 =  holdtext
                      }
                      if(item.status == "FORWORD"){
                        item.status1 =  forwordtext
                      }
                      if(item.status == "DESK REJECTED"){
                        item.status1 =  rejectedText
                      }
                      if(item.status == "DESK CONFIRMED"){
                        item.status1 =  deskconfirmedText
                      }
                      item.reqNo = item.status =="HOLD" ? holdReq : editReq  
                      
                  })
                }
   const monthFilter = []
  
  let i = 1
  monthFilter.push({
    key: '1,2,3,4,5,6,7,8,9,10,11,12',
    value:'1,2,3,4,5,6,7,8,9,10,11,12',
    text: 'All',
    image: { avatar: true, src: '../public/assets/images/right.svg' },
  })
   this.state.monthList.map((item,index)=>{
    monthFilter.push({
      key: parseInt(index)+1,
      value: parseInt(index)+1,
      text: item.Name,
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    })
   
  })
  
  const yearFilter=[]
  this.state.yearList.map((item,index)=>{
    let name = JSON.parse(item.Name)
    let code = JSON.parse(item.Code)
    let obj = {
      key: code,
      text: name,
      value: code,
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    }
    yearFilter.push(obj)
  })
  const statusFilter = []
  this.state.statusList.map((item,index)=>{
    //let name = JSON.parse(item.Name)
  //  let code = JSON.parse(item.Code)
    let obj = {
      key: item.Code,
      text: item.Name,
      value: item.Code,
      image: { avatar: true, src: '../public/assets/images/right.svg' },
    }
   statusFilter.push(obj)
  })


        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            entries: "entries",
            filterPlaceholder: "Search Anything",
            noResults: "There is no data to be displayed"
        };
            return (
                <div className="">
                {this.state.showModal ? <AddBeneficiary  
                                          showPlanModal={this.state.showModal}  
                                          closeModal={this.handleClose} 
                                          showSuccess={this.showSuccess}
                                          reqno={this.state.reqno}
                                        /> : null}
                <div className=" ">
                {!this.state.reqList ?
                    <div className="">
                    <DashLoader></DashLoader></div>
                    :
                  <CustomTable
                      tableHeader={header}
                      tableBody={this.state.reqList}
                      keyName="userTable"
                      tableClass="striped hover table-responsive"
                      rowsPerPage={10}
                      rowsPerPageOption={[10, 20, 50, 100, 200]}
                      initialSort={{ prop: "username", isAscending: true, }}
                      labels={customLabels}
                      monthFilter={monthFilter}
                      yearFilter={yearFilter}
                      month={this.state.month}
                      year={this.state.year}
                      getMonth={this.getMonth}
                      getYear={this.getYear}
                      sendReq="Frw"
                      statusFilter={statusFilter}
                      getStatus={this.getStatus}
                      statusList={this.state.statusList}
                      status={this.state.status}
                  />}
                  <Loader show={this.state.showLoader} />
                </div>
                <StatusPopup
                    message={this.state.sucessmsg}
                    show={this.state.showSuccessModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
                    />
                </div>
            );
     
    }
}


export default  withRouter(ConfirmationList)



