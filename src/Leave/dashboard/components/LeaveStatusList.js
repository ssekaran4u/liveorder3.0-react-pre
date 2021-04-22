import React, { Component } from 'react';
import LeaveStatusCustomTable from './LeaveStatusCustomTable';
import ShowDropdown from './ShowDropdown';
import { connect } from 'react-redux';
import { getRequestLeave } from '../../../actions/Leave';
import { getAllStatus } from '../../../actions/Leave';
//import { Item } from 'react-bootstrap/lib/Breadcrumb';


class LeaveStatusList extends Component {
    constructor(props){
        super(props)
        this.state = {
            status:'',
            fdate:'',
            tdate:'',
            requeststatus:''
        
        }
        this.getstatusselection = this.getstatusselection.bind(this)
        this.getDates = this.getDates.bind(this)
        this.getRequestFilter = this.getRequestFilter.bind(this)
    }
    
    componentDidMount(){
        // var data = {"Token":"","Header":{"LeaveStatus":"","Fromdate":"","Todate":""},"Index":"LeaveRequestStatus"}
        // this.props.getRequestLeave(data)
        this.getstatusselection("","","")
        var data2 = {"Index":"LeaveStatus" }
        this.props.getAllStatus(data2)
    }

    getstatusselection(status,stat,fdate,ldate){
    // console.log(status+"status",fdate+"fd",ldate+"ld","kumar")
        var data = {"Token":"","Header":{"LeaveStatus":status,"Fromdate":fdate,"Todate":ldate},"Index":"LeaveRequestStatus" }
        this.props.getRequestLeave(data)
       
  
      }
   
    getDates(fdate,ldate){
         this.setState({
            fdate:fdate,
            ldate:ldate
         })
        
         this.getstatusselection(this.state.requeststatus,this.state.status,fdate,ldate)
    }
    

    getRequestFilter(data){
         this.setState({
           requeststatus:data
         })
     
         this.getstatusselection(data,this.state.status,this.state.fdate,this.state.ldate)
        
    }     

    
    render() {
        const header = [
            { prop: 'Id', title: 'Sr. No.', sortable: true, filterable: true },
            { prop: 'C_Type', title: 'Leave Type',filterable: true, sortable:true },
            { prop: 'Description', title: 'Description',filterable: true },
            { prop: 'AppliedDate', title: 'Applied Date',filterable: true, sortable:true },
            { prop: 'DateFrom', title: 'From Date',filterable: true, sortable:true },
            { prop: 'DateTo', title: 'To Date',filterable: true, sortable:true },
            { prop: 'leavestatus1', title: 'Status',filterable: true, sortable:true },
            { prop: 'Reason', title: 'Rejection Reason',filterable: true },
            { prop: 'action', title: 'Action',filterable: true }
              
        ];

            var activeText= <span className="activeTextGreen">Approved</span>
            var requestLeave= <span className="inActiveTextRed001">Request for cancellation is rejected</span>
            var submittedText= <span className="submittedTextBlue01">Pending</span>
            var partiallyActiveText = <span className="partiallyActiveTextYellow">Request for Cancelling</span>
            var rejectedText = <span className="inActiveTextRed">Submitted leave rejected</span>
            var PendingLeaveRejected = <span className="inActiveTextRed">Pending Leave Rejected</span>
            let  Dataval=[]

          if( this.props.requestLeaveStatus!=undefined){
            this.props.requestLeaveStatus.map((item)=>{
                // item["action"]=<ShowDropdown  getstatusselection={this.getstatusselection}  Req_Action={ item.Req_Action } N_Srno={ item.N_Srno} leavestatus={item.leavestatus} />
                

                  delete item["action"]
                
                if(item.leavestatus !='') {
                    item.action=<ShowDropdown  getstatusselection={this.getstatusselection}  Req_Action={ item.Req_Action } N_Srno={ item.N_Srno} leavestatus1={item.leavestatus} />
                }else{
                    item.action=<ShowDropdown  getstatusselection={this.getstatusselection}  Req_Action={ item.Req_Action } N_Srno={ item.N_Srno} leavestatus1={item.leavestatus} />
                }
                
                
                 if(item["leavestatus"]== "Pending" ){
                     item.leavestatus1 = submittedText
                 }
                if(item["leavestatus"] == "Submitted Leave Rejected"){
                    item.leavestatus1 = rejectedText
                }
                if(item["leavestatus"] == "Approved" ){
                    item.leavestatus1 = activeText
                }
                if(item["leavestatus"] == "Request for Cancelling" ){
                    item.leavestatus1 = partiallyActiveText
                }
                if(item["leavestatus"] == "Request for cancellation is rejected" ){
                    item.leavestatus1 = requestLeave
                }
                if(item["leavestatus"] == "Pending Leave Rejected" ){
                    item.leavestatus1 = PendingLeaveRejected
                }
               
                if(item.Req_Action){
                    
                    item.Req_Action = item.Req_Action
                    
                }
                if(item.N_Srno){
                    item.N_Srno = item.N_Srno
                }

                if(item.Id){
                    item.Id = Number(item.Id)
                }
                Dataval.push(item)
            })
           
          }
        
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

        if(!this.props.requestLeaveStatus){
            return null
        }

        
        
        return(
            <div className="">
                <LeaveStatusCustomTable
                    tableHeader={header}
                    tableBody={Dataval}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5,10, 20, 50, 100, 200]}
                    initialSort= {{ prop: "username", isDescending: true }}
                    labels={customLabels}
                    leaveStatus = {this.props.leaveStatus}
                    getreqTypeFilter={this.getRequestFilter}
                    getDates={this.getDates}
                    Req_Action = {this.Req_Action}
                />
            </div>
        )
    }
}

const mapStateToProps =state =>({
    requestLeaveStatus:state.Leave.requestLeaveStatus,
    leaveStatus:state.Leave.leaveStatus
  })

const mapDispatchToProps = dispatch =>({
    getRequestLeave:data => dispatch(getRequestLeave(data)),
    getAllStatus:data => dispatch(getAllStatus(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(LeaveStatusList);