import React, { Component } from "react";
import CustomTable from "./CustomTable";
import "../../../../public/assets/css/campaignRequest.css";
import AddBeneficiary from "../popup/AddBeneficiary"
import {postToServer,fileUpload} from '../../../lib/comm-utils'
import {withRouter} from 'react-router-dom'
import ShowActions from '../popup/ShowActions'
import StatusPopup from '../../../lib/StatusPopup'
import DashLoader from "../../../lib/DashboardLoader";
import ConfirmationBox from '../../../lib/ConfirmationBox'
import DeleteAlert from '../../../lib/DeleteAlert'
import AccountableDate from '../components/AccountableDate'
import Loader from '../../../lib/Loader'
class RPSDeskListTable extends Component {
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
            reqno:'',
            showSuccessModal:false,
            sucessmsg:'',
            success:false,
            showBeniPopup:false,
            beniReq:'',
            benistatus:'',
            showReasonPopup:false,
            reasonMsg:'',
            status:'',
            id:'',
            deskDate:'',
            showLoader:true,
        };
        this.handleShowModal = this.handleShowModal.bind(this)
        this.getMonth = this.getMonth.bind(this)
        this.getFilterList = this.getFilterList.bind(this)
        this.getYear = this.getYear.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.showForword = this.showForword.bind(this)
        this.ConfirmReq = this.ConfirmReq.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
        this.btnResponse = this.btnResponse.bind(this)
        this.hideBeniModal = this.hideBeniModal.bind(this)
        this.hideReasonPopup = this.hideReasonPopup.bind(this)
        this.btnAction = this.btnAction.bind(this)
        this.getRefreshOtherPage = this.getRefreshOtherPage.bind(this)
        this.getBenificiary = this.getBenificiary.bind(this)
        this.getAccountDate = this.getAccountDate.bind(this)
        this.AccDate = this.AccDate.bind(this)
    }

    componentDidMount(){
      this.setState({showLoader : true})
      this.getFilterList(this.state.month,this.state.year)

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
    }

    getFilterList(month,year){ 
      this.setState({showLoader : true})
      var rep =  {"index":"RpsDeskReqList","Data":{"nmonth":month.toString(),"nyear":year.toString()},"Token":""}
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
      this.getFilterList(month,this.state.year)
    }
    getYear(year){
      let _this = this
      _this.setState({
        year:year
      })
      _this.getFilterList(this.state.month,year)
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
    handleShowModal(reqno){
     // console.log("hiii",this.state.showModal)
      this.setState({
            showModal:!this.state.showModal,
            reqno:reqno
      })
    }
    handleRedirect(id){
      this.props.history.push('/rps-deskHeadView/'+id)
    }
    handleClose(){
      this.setState({
        showModal:false,
      })
      this.getFilterList(this.state.month,this.state.year)
    }
    showForword(id,status,type,benificiary){
   
     if(status == "F" || status == "V"){
       // this.ConfirmReq(id,status)
        this.props.history.push('/rps-deskHeadView/'+id)
         sessionStorage.setItem('status',status)
      }else if(status == "C"){
       if(benificiary == 0){
          this.setState({
              showBeniPopup:!this.state.showBeniPopup,
              beniMsg:'Benificiary Amount not added you want to continue ?',
              beniReq:id,
              benistatus:status,
              reqno:id
          })
        }else{
          let  msg = 'You are Confirming request'
          this.setState({
            showReasonPopup:!this.state.showReasonPopup,
            reasonMsg:msg,
            id:id,
            status:status
          })
        //this.ConfirmReq(id,status)
        }
      }else if(status == "H" || status == "R"){
        let msg 
        if(status == 'H'){
          msg = 'You are putting on hold'
        }else if(status == "R"){
          msg = 'You are rejecting request'
        }
        this.setState({
          showReasonPopup:!this.state.showReasonPopup,
          reasonMsg:msg,
          id:id,
          status:status
        })
      }else{
        this.ConfirmReq(id,status,'')
      }
      
    }
    ConfirmReq(reqNo,status,reason){
      let d = new Date()
      let d_date = d.getDate() > 9 ? d.getDate() : '0'+parseInt(d.getDate())
      let mon = parseInt(d.getMonth()+1) > 9 ? parseInt(d.getMonth()+1) : '0'+parseInt(d.getMonth()+1)
     // console.log("ff",mon)
      let currDate = d_date+'/'+mon+'/'+d.getFullYear()
       let req_No = reqNo.toString()
       let s = status.toString()
       let date 
       if(this.state.deskDate == ''){
        date = currDate.toString()
       }else{
        date = this.state.deskDate.toString()
       }
      //  console.log("date",date)
      //  return 
      let token = localStorage.getItem("SFA_TOKEN")
      const data = new FormData();
      // data.append("filename", this.state.selectedFile);
      data.append("RpsSrno", req_No);
      data.append("deskStatus", s);
      data.append("deskDate", date);
      data.append("deskNote", reason);
      data.append(
          "Token",token
      );
     data.append("Index", "UploadDeskFile");
     fileUpload("DeskRPSFileUpload", data).then( (result)=> {
       let msg = result.data.data[0].Result
      //  if(result.data.data[0].Result == "1"){
      //    msg = "SucessFully Done"
      //  }else{
      //    msg = "Request Not Confirmed"
      //  }
       if(result.data.Status == "Success"){
         if(status == "H" || status == "R"){
          this.setState({
            showReasonPopup:!this.state.showReasonPopup,
            showSuccessModal:!this.state.showSuccessModal,
            sucessmsg:result.data.data[0].Result,
            success:true
          })
         }else{
          this.setState({
            showReasonPopup:false,
            showSuccessModal:!this.state.showSuccessModal,
            sucessmsg:msg,
            success:true
          })
         }
      
        this.getFilterList(this.state.month,this.state.year)
        this.getRefreshOtherPage(this.state.month,this.state.year)
       }
      
     })
    }
    getRefreshOtherPage(month,year){
      // var data = {"index":"RPSDeskOtherListItem","Data":
      // {"nmonth":month.toString(),"nyear":year.toString(),"nflag":"All"},"Token":""}
      // postToServer("RPSDEskApi",data).then( (Result)=>{ 
      //   this.setState({
      //     reqList:Result.data.data
      //   })
      // }).catch({

      // })
      this.props.refersh("1")
    }

    hideStatusModal(){

      this.setState({
        
        showSuccessModal:!this.state.showSuccessModal,
      })
      this.getFilterList(this.state.month,this.state.year)
    }
    btnResponse(data){
      if(data == 'yes'){
        this.setState({
          showBeniPopup:!this.state.showBeniPopup,
        })
        this.ConfirmReq(this.state.beniReq,this.state.benistatus,'')
       
      }else{
        this.setState({
          showBeniPopup:!this.state.showBeniPopup,
          showModal:!this.state.showModal
        })
      }
    }
    hideBeniModal(){
      this.setState({
        showBeniPopup:!this.state.showBeniPopup,
      })
    }
    hideReasonPopup(){
      this.setState({
        showReasonPopup:!this.state.showReasonPopup
      })
    }
    btnAction(data,reason){ 
      if(data == 'yes'){
        this.ConfirmReq(this.state.id,this.state.status,reason)
      }else{
        this.setState({
          showReasonPopup:!this.state.showReasonPopup
        })
      }
    }
  //
  getBenificiary(reqno){
    this.setState({ 
      showModal:!this.state.showModal,
      reqno:reqno
    })
  }
  getAccountDate(d){
    // this.setState({
    //   deskDate:d
    // })
  }
  AccDate(d){ 
  //   let d_date = d.getDate() > 9 ? d.getDate() : '0'+parseInt(d.getDate())
  //   let mon = parseInt(d.getMonth()+1) > 9 ? parseInt(d.getMonth()+1) : '0'+parseInt(d.getMonth()+1)
  //  // console.log("ff",mon)
  //   let currDate = d_date+'/'+mon+'/'+d.getFullYear()
  //   // let req_No = reqNo.toString()
  //   // let s = status.toString()
  //    let date 
  //    if(this.state.deskDate == ''){
  //     date = currDate.toString()
  //    }else{
  //     date = d.toString()
  //    }
    this.setState({
      deskDate:d,
      showDateModal:!this.state.showDateModal
    })
  }
    render() { 
     
       //console.log("addBeneficiaryView",this.props.status)
       const header = [
            { prop: 'reqNo1', title: 'Req.No.', filterable: true },
            { prop: 'RPSAmt', title: 'RPS Amt(₹)', filterable: true },
            { prop: 'status1', title: 'Status', filterable: true },
            { prop: 'RPSDate', title: 'RPS Date', filterable: true },
            { prop: 'SubmittedBy', title: 'Submitted By', filterable: true },
            { prop: 'Division', title: 'Division', filterable: true },
            { prop: 'Region', title: 'Region', filterable: true },
            { prop: 'RPSName', title: 'RPS Name', filterable: true },
            { prop: 'advanceamount', title: 'A.R.A(₹)', filterable: true },
            { prop: 'InitiatedOn', title: 'Initiated On', filterable: true },
            { prop: 'approvername', title: 'Approver', filterable: true },
            { prop: 'confirmedby', title: 'Confirmed By', filterable: true },
            { prop: 'confirmedon', title: 'Confirmed On', filterable: true },
            { prop: 'note', title: 'Approval/Confirmation Note', filterable: true },
            { prop: 'benificiary', title: 'Add Benificiary', filterable: true },
            { prop: 'Accountdate', title: 'Accountable Date', filterable: true },
           
        ];
        const imglink = 
                <img
                className ="img action-img"
                src="../public/assets/images/edit_icon.svg"
                alt="edit"
                 onClick={this.handleShowModal}
              />
           
                  var approvedText= <span className="approved-status">Approved</span>
                  var requestText= <span className="reqested-status">Requested</span>
                  var confirmedText= <span className="confirmed-status">Confirmed</span>
                  var rejectedText= <span className="rejected-status">Rejected</span>
                  var holdText= <span className="confirmed-status">Hold</span>

                  if(this.state.reqList.length > 0){
                  this.state.reqList.map((item)=>{
                  //   const editReq = <span>
                   
                  //   <img 
                  //     src="../public/assets/images/overflow.svg" 
                  //     className="dcrimg mr-3" 
                  //     onClick={()=>this.showDrop(item.ReqNo)} 
                  //   />
                  
                  //   <span>{item['ReqNo']}</span>
                  // </span>
                  const addlink = <div className="hcursur" onClick={()=>this.getBenificiary(item.ReqNo)} style={{"color":"#1b84e7"}}>{item.BankStatus}</div>

                    const editReq = <ShowActions  
                                      reqType="oneTab" 
                                      benificiaryCode={item.BankStatusCode} 
                                      showForword={this.showForword} 
                                      srno={item.ReqNo} 
                                      status={item.status} 
                                    />
                      if(item.status == "CONFIRMED"){
                          item.status1 =  confirmedText
                      }
                      if(item.status == "APPROVED"){
                        item.status1 =  approvedText
                      }
                      if(item.status == "HOLD"){
                        item.status1 =  holdText
                      }
                      if(item.status == "REQUESTED"){
                        item.status1 =  requestText
                      }
                      if(item.status == "DESK REJECTED"){
                        item.status1 =  requestText
                      }
                      item.reqNo1 = editReq 
                       item['benificiary'] = addlink 
                      item.Accountdate = <AccountableDate 
                      AccDate={this.AccDate}
                      srno={item.ReqNo}
                      sendAccountDate={this.getAccountDate} />
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
  //const yearFilter = []


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
                <AddBeneficiary  
                    reqno={this.state.reqno}
                    show={this.state.showModal}  
                    closeModal={()=>this.handleClose()} 
                    showSuccess={this.showSuccess}
                /> 
                 {!this.state.reqList ?
                    <div className="">
                    <DashLoader></DashLoader></div>
                    :
                    <div className="">
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
                          sendReq="Req"
                      />
                      <Loader show={this.state.showLoader} />
                    </div>
                }
                 <StatusPopup
                    message={this.state.sucessmsg}
                    show={this.state.showSuccessModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
                    />
                <ConfirmationBox 
                  show={this.state.showBeniPopup}
                  msg={this.state.beniMsg}
                  onClose={this.hideBeniModal}
                  btnResponse={this.btnResponse}
                />
                <DeleteAlert 
                  show={this.state.showReasonPopup}
                  msg={this.state.reasonMsg}
                  onClose={this.hideReasonPopup}
                  btnAction={this.btnAction}
                  validation={this.state.status == "C" || "H"  ? "1" : "0"}
                />
                </div>
            );
     
    }
}


export default  withRouter(RPSDeskListTable)



