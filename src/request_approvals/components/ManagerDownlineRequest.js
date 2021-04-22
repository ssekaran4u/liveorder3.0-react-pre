import React, { Component } from 'react';
import {Form} from 'react-bootstrap'
import RequestManagerDownlineTable from './RequestManagerDownlineTable'
import ManagerShowApprovalDrop from './ManagerShowApprovalDrop'
import ManagerRequestAction from './ManagerRequestAction'
import { getDownlinerequest } from '../../actions/RequestApproval'
import { connect } from 'react-redux';
import { getReqType } from '../../actions/RequestApproval'
import { getReqStatus } from '../../actions/RequestApproval'
import ShowDrop from '../components/ShowDrop'
import { OverlayTrigger,Tooltip} from 'react-bootstrap'
import DashLoader from "../../lib/DashboardLoader";
class ManagerDownlineRequest extends Component {
    constructor(props){
        super(props)
        this.state={
            showDropdown:false,
            status:'',
            filter:'',
            startdate:'',
            enddate:''
        }
        this.getrequest = this.getrequest.bind(this)
        this.update= this.update.bind(this)
        this.filterStatusList = this.filterStatusList.bind(this)
        this.filterTypeList = this.filterTypeList.bind(this)
        this.filterRequestDateList = this.filterRequestDateList.bind(this)
    }
    componentDidMount(){
        this.getrequest()
    }
    getrequest(status,filter,startdate,enddate){ 
        var note
        if(filter || status || startdate || enddate != undefined){ 
           note={"Token": "" ,
                "Index":"RequestStatus" ,"Data":{"Status":status,"Filter":filter,"Fromdate":startdate,"Todate":enddate,"Myrequest":"1"}
           }
           }else{ 
               note={"Token": "" ,
                   "Index":"RequestStatus" ,"Data":{"Status":"","Filter":"","Fromdate":"","Todate":"","Myrequest":"1"}
               }
           }
       this.props.getDownlinerequest(note)
    }
    getReqStatus(){
        var reqnote={"Token": "" ,
               "Index":"RequestType"
          }
      this.props.getReqType(reqnote)

    }
    getReqType(){
      var typenote={"Token": "" ,"Index":"Status" }
      this.props.getReqStatus(typenote)

    }

    update(){
        this.getrequest()
    }
    filterStatusList(status){
        this.setState({
            status:status
        })
        this.getrequest(status,this.state.filter,this.state.startdate,this.state.enddate)
    }
    filterTypeList(filter){
        this.setState({
            filter:filter
        })
        this.getrequest(this.state.status,filter,this.state.startdate,this.state.enddate)
    }
    filterRequestDateList(sdate,ldate){
        this.setState({
            startdate:sdate,
            enddate:ldate
        })
        this.getrequest(this.state.status,this.state.filter,sdate,ldate)
    }
    render(){ 
        const header = [
            // { title: 'Name' , prop: 'DR.Name', sortable: true, filterable: true },
            // { title: 'Dr. Grade', prop: 'DR.Grade', sortable: true },
            // { title: 'No. Of Meeting', prop: 'No Of Meeting', sortable: true },
            // { title: 'No. Of Call Made', prop: 'No Of Call Made', sortable: true },
            // { title: 'Pending Call', prop: 'Pending Call', sortable: true },
            // { title: 'Status', prop: 'Status', sortable: true },
            { title: 'Request Type', prop: 'ReqType', sortable: true, filterable: true },
            { title: 'Person Name', prop: 'Person Name',filterable: true },
            { title: 'Description', prop: 'Description1' },
            { title: 'Leave Type', prop: 'LeaveType',sortable: true },
            { title: 'Req. Date', prop: 'ReqDate' ,sortable: true},
            { title: 'From Date', prop: 'DateFrom' ,sortable: true},
            { title: 'To Date', prop: 'DateTo' ,sortable: true},
            //{ title: 'Req. Date', prop: 'reqdate', cell: (row) => row.realname.toUpperCase() },
            { title: 'Status', prop: 'status1',sortable: true },
            { title: 'Reason', prop: 'Reason' },
            { title: 'Action', prop: 'Srno' },
        ]

   
    const customLabels = {
        first: "<<",
        last: ">>",
        prev: "< Prev",
        next: "Next >",
        show: "Show",
        entries: "items/page",
        filterPlaceholder: "Search",
        noResults: "There is no data to be displayed"
    };
    var { data } = this.props
    // var Submitted=<span className="pendingtd">Submitted</span>
    // var Confirmed=<span className="complete">Confirmed</span>
    // var Approved=<span className="complete">Approved</span>
    // var Cancel=<span className="incomplete">Cancel</span>
    // var Rejected=<span className="incomplete">Rejected</span>
    // var reqcancal=<span className="incomplete">Request for cancelling</span>
    // var pending=<span className="pendingtd">Pending</span>
    // var requestCancelReject = <span className="incomplete">Request for cancellation is rejected</span>
    // var pendingLeaveReject = <span className="incomplete">Pending Leave Rejected</span>

    var Submitted=<span className=" submittedTextBlue01">Submitted</span>
        var Confirmed=<span className="complete">Confirmed</span>
        var Approved=<span className="complete">Approved</span>
        var cancel=<span className="incomplete">Cancel</span>
        var Rejected=<span className="incomplete">Rejected</span>
        var rejectcancel=<span className="pendingtd">Request for cancelling</span>
        var pendingLeaveReject = <span className="incomplete">Pending Leave Rejected</span>
        var pending=<span className="submittedTextBlue01">Pending</span>
        var requestReject=<span className="incomplete">Request for cancellation is rejected</span>
        var notaaprove=<span className="incomplete">Not Approved</span>
        var postpone=<span className="pendingtd">Postponed</span>
    
    if(data){ 
        data.map( (localdata)=>{ 
            
            // localdata.Srno=<ShowDrop srno={localdata["Srno"]} showDropdown={this.state.showDropdown} getDropdown={this.getDropdown}/>
         //   console.log(localdata,"all  data")
            if(localdata["status"]=='Submitted' ){ 
                localdata.status1=Submitted;
            }
            else if(localdata["status"]=='Cancel') {
                localdata.status1=cancel;
            }
            else if(localdata["status"]=='Approved'  ){
                localdata.status1=Approved;
            }
            else if(localdata["status"]=='Rejected'){
                localdata.status1=Rejected;
            }else if(localdata["status"]=='Confirmed'){
                localdata.status1=Confirmed;
            }else if(localdata["status"]=='Request for cancelling'){
                localdata.status1=rejectcancel;
            }else if(localdata["status"]=='Pending'){
                localdata.status1=pending;
            }else if(localdata['status'] == 'Request for cancellation is rejected'){
                localdata.status1=requestReject;
            }else if(localdata['status'] == 'Pending Leave Rejected'){
                localdata.status1=pendingLeaveReject;
            }else if(localdata['status'] == 'Not Approved'){
                localdata.status1=notaaprove;
            }else if(localdata['status'] == 'Postponed'){
                localdata.status1=postpone;
            }
            
           // if(localdata["Srno"]){
               // localdata.Srno=<img src="../public/assets/images/overflow.svg" id={localdata["Srno"]} onMouseEnter={this.getDropdown} />
               localdata.Srno=<ShowDrop updateStatus={this.update} status={localdata['status']}  FS={localdata['FS']} ReqType={localdata['ReqType']} reqAction={localdata['Req_Action']} url={localdata['url']} srno={localdata["Srno"]} getDropdown={this.getDropdown} showDropdown={this.state.showDropdown} />
           // }
           if(localdata.Description){
            localdata.Description1 =  <OverlayTrigger
            overlay={
                <Tooltip
                  
                >
                  <div style={{"white-space":"initial","line-height":"1.5em" }}>{localdata.Description}</div>
                </Tooltip>
            }
            placement="right"
        ><div className="descriptionlist">{localdata.Description}</div></OverlayTrigger>
                           
          }
        })
     }
    
     else{
        <span className="">No data</span>
    }
    

   
    return(
        <div>
            {!this.props.data ? 
                <DashLoader></DashLoader> :
           <RequestManagerDownlineTable
                 tableHeader={header}
                 tableBody={this.props.data}
                 keyName="userTable"
                 tableClass="striped hover table-responsive"
                 rowsPerPage={10}
                 rowsPerPageOption={[10, 15, 20]}
                 initialSort={{prop: "username", isAscending: true}}
                 labels={customLabels}
                 requestdata={this.props.reqdata}
                 filterStatusList={this.filterStatusList}
                 filterTypeList={this.filterTypeList}
                 requestTypeList={this.props.reqstatus}
                 filterRequestDateList={this.filterRequestDateList}
            />}
        </div>
        );
    }
}
const mapStateToProps = state =>({
    data:state.Request.reqStatusdown,
    reqdata:state.Request.reqTypeData,
    reqstatus:state.Request.reqStatusData,
   
  })

const mapDispatchToProps = (dispatch) => ({
    getDownlinerequest:(note) => dispatch(getDownlinerequest(note)),
    getReqType:(reqnote) => dispatch(getReqType(reqnote)),
    getReqStatus:(reqnote) => dispatch(getReqStatus(reqnote))
   

})
export default connect(mapStateToProps,mapDispatchToProps)(ManagerDownlineRequest);