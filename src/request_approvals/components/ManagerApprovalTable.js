
import React,{Component} from 'react'
import { connect } from 'react-redux';
import { getrequest } from '../../actions/RequestApproval'
import { getReqType } from '../../actions/RequestApproval'
import { getReqStatus } from '../../actions/RequestApproval'
import MrCustomTable from '../components/MrCustomtable'
import DeleteDropdown from '../components/DeleteDropdown'
import ShowActions from '../components/ShowActions'
import { postToServer } from '../../lib/comm-utils'
import RequestManagerSelfTable from './RequestManagerSelfTable'
import { OverlayTrigger,Tooltip} from 'react-bootstrap'
import DashLoader from "../../lib/DashboardLoader";
class ManagerApprovalTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            showDeleteDrop:true,
            showDropdown:false,
            manager_leaves:{},
            status:'',
            filter:'',
            startdate:'',
            enddate:''
        }
        this.getReqList = this.getReqList.bind(this);
        this.getReqStatus = this.getReqStatus.bind(this)
        this.getReqType = this.getReqType.bind(this)
        this.getDropdown = this.getDropdown.bind(this)
        this.update = this.update.bind(this)
        this.filterTypetList = this.filterTypetList.bind(this)
        this.filterRequestList = this.filterRequestList.bind(this)
        this.filterRequestDateList= this.filterRequestDateList.bind(this)
    }
    componentDidMount(){
        this.getReqList()
        this.getReqStatus()
        this.getReqType()
    }

    getReqList(status,filter,startdate,enddate){ 
        
    var note
         if(filter || status || startdate || enddate != undefined){ 
            note={"Token": "" ,
                 "Index":"RequestStatus" ,"Data":{"Status":status,"Filter":filter,"Fromdate":startdate,"Todate":enddate,"Myrequest":this.props.managerreqtype}
            }
            }else{ 
                note={"Token": "" ,
                    "Index":"RequestStatus" ,"Data":{"Status":"","Filter":"","Fromdate":"","Todate":"","Myrequest":this.props.managerreqtype}
                }
            }
        this.props.getrequest(note)

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
    getDropdown(action,srno,retype,fs){ 
        var dataItem =  {
            "Token": "sfa360|MR1(Salem)|MR1|TNH0012|AIAaDdKtMMZSQSxbEwU2019-05-02T11:33:51+05:30" ,
            "Index":"RequestUpdate" ,
            "Data":{"SerialNo":srno,"RequType":retype,"Action":action,"FS":fs}
        }
        postToServer("RequestApprovel", dataItem).then(function (result) {
            if (result.data.Status == 'Success') {
               // console.log("res",result)
            }
        }).catch( (Error)=>{

            //console.log( Error)

           _this.setState({ Error: true, Errormsg:"App Error" })
       })
    }
    update(){
        this.getReqList()
    }
    filterRequestList(status){
        this.setState({
            status:status
        })
        this.getReqList(status,this.state.filter,this.state.startdate,this.state.enddate)
    }
    filterTypetList(filter){
        this.setState({
            filter:filter
        })
        this.getReqList(this.state.status,filter,this.state.startdate,this.state.enddate)
    }
    filterRequestDateList(sdate,ldate){
        this.setState({
            startdate:sdate,
            enddate:ldate,
        })
        this.getReqList(this.state.status,this.state.filter,sdate,ldate)
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
            { title: 'Description', prop: 'Description1' },
            //{ title: 'Req. Date', prop: 'reqdate', cell: (row) => row.realname.toUpperCase() },
            { title: 'Req. Date', prop: 'ReqDate' ,sortable: true},
            { title: 'From Date', prop: 'DateFrom' ,sortable: true},
            { title: 'To Date', prop: 'DateTo' ,sortable: true},
            { title: 'Status', prop: 'status1',sortable: true },
            { title: 'Action', prop: 'Srno1' },
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

        var Submitted=<span className=" submittedTextBlue01">Submitted</span>
        var Confirmed=<span className="complete">Confirmed</span>
        var Approved=<span className="complete">Approved</span>
        var Cancel=<span className="incomplete">Cancel</span>
        var Rejected=<span className="incomplete">Rejected</span>
        var rejectcancel=<span className="pendingtd">Request for cancelling</span>
        var pendingLeaveReject = <span className="incomplete">Pending Leave Rejected</span>
        var pending=<span className="submittedTextBlue01">Pending</span>
        var requestReject=<span className="incomplete">Request for cancellation is rejected</span>
        var notaaprove=<span className="incomplete">Not Approved</span>
        var Postponed=<span className="pendingtd">Postponed</span>
        
        if(data){ 
            data.map( (localdata)=>{ 
                
                // localdata.Srno=<ShowDrop srno={localdata["Srno"]} showDropdown={this.state.showDropdown} getDropdown={this.getDropdown}/>
             //   console.log(localdata,"all  data")
                if(localdata["status"]=='Submitted' ){ 
                    localdata.status1=Submitted;
                }
                else if(localdata["status"]=='Cancel') {
                    localdata.status1=Cancel;
                }
                else if(localdata["status"]=='Approved' ){
                    localdata.status1=Approved;
                }
                else if(localdata["status"]=='Rejected'){
                    localdata.status1=Rejected;
                }else if(localdata["status"]=='Request for cancelling'){
                    localdata.status1=rejectcancel;
                }else if(localdata["status"]=='Confirmed'){
                    localdata.status1=Confirmed;
                }else if(localdata["status"]=='Pending'){
                    localdata.status1=pending;
                }else if(localdata["status"]=='Request for cancellation is rejected'){
                    localdata.status1=requestReject;
                }else if(localdata["status"]=='Pending Leave Rejected'){
                    localdata.status1=pendingLeaveReject;
                }else if(localdata['status'] == 'Not Approved'){
                    localdata.status1=notaaprove;
                }else if(localdata["status"] == 'Postponed'){
                    localdata.status1=Postponed;
                }

               // if(localdata["Srno"]){
                   // localdata.Srno=<img src="../public/assets/images/overflow.svg" id={localdata["Srno"]} onMouseEnter={this.getDropdown} />
                   localdata.Srno1=<ShowActions updateStatus={this.update} status={localdata['status']} FS={localdata['FS']} reqAction={localdata['Req_Action']} ReqType={localdata['ReqType']} url={localdata['url']} srno={localdata["Srno"]} getDropdown={this.getDropdown} showDropdown={this.state.showDropdown} />
               // }

            //   if(localdata.Description){
                localdata.Description1 =  <OverlayTrigger
                overlay={
                    <Tooltip
                      
                    >
                      <div style={{"white-space":"initial","line-height":"1.5em" }}>{localdata.Description}</div>
                    </Tooltip>
                }
                placement="right"
            ><div className="descriptionlist">{localdata.Description}</div></OverlayTrigger>
                               
          //    }
            })
            
         }
        
         else{
            <span className="">No data</span>
        }
        
        // this.props.data.map((item)=>{
        //     if()

        // })
        // console.log("sweta",localStorage.getItem("User"))
        // if (!this.props.data){
        //     return null
        // }
        return(
            <div>
                {!this.props.data ?
                    <DashLoader /> :
                <RequestManagerSelfTable
                    tableHeader={header}
                    tableBody={this.props.data}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 15, 20]}
                    initialSort={{prop: "username", isAscending: true}}
                    labels={customLabels}
                    requestdata={this.props.reqdata}
                    filterRequestList={this.filterRequestList}
                    filterTypetList={this.filterTypetList}
                    requestTypeList={this.props.reqstatus}
                    filterRequestDateList={this.filterRequestDateList}
                />}
            </div>
        )
    }
}
const mapStateToProps = state =>({
    data:state.Request.data,
    reqdata:state.Request.reqTypeData,
    reqstatus:state.Request.reqStatusData,
  })

const mapDispatchToProps = (dispatch) => ({
    getrequest:(note) => dispatch(getrequest(note)),
    getReqType:(reqnote) => dispatch(getReqType(reqnote)),
    getReqStatus:(reqnote) => dispatch(getReqStatus(reqnote))

})
export default connect(mapStateToProps,mapDispatchToProps)(ManagerApprovalTable)