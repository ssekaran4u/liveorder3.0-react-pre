import React,{Component} from 'react'
import { OverlayTrigger,Tooltip} from 'react-bootstrap'
import CustomTable from  '../components/CustomTable' 
import ShowApprovalDrop from '../components/ShowApprovalDrop'
import { connect } from 'react-redux';
import {getrequestType} from '../../actions/AdminDashboard'
import {getAllStatus} from '../../actions/AdminDashboard'
import {getlistdata} from '../../actions/AdminDashboard'
import DCRSave from '../../dcr/popups/DcrCreatedPopup'
import { postToServer } from '../../lib/comm-utils'
import DashLoader from "../../lib/DashboardLoader";
class PipeLineTodo extends Component{
    constructor(props){
      super(props)
      this.state={
        showdrop:false,
        action:'',
        show:false,
        setvalue:'',
        status:'',
        requeststatus:'',
        fdate:'',
        tdate:''
      }
      this.getstatusselection = this.getstatusselection.bind(this)
      this.getAction = this.getAction.bind(this)
      this.onHide = this.onHide.bind(this)
      this.getView = this.getView.bind(this)
      this.getRequestFilter = this.getRequestFilter.bind(this)
      this.getDates = this.getDates.bind(this)
      this.getStatus = this.getStatus.bind(this)
    }
    componentDidMount(){
      var requestdata = {"Token":"","Index":"RequestType" }
      this.props.getrequestType(requestdata)

      var statusdata = {"Token":"","Index":"Status" }
      this.props.getAllStatus(statusdata)

      var data = {"Token":"","Header":{"Color":"","AllRequest":"","Fromdt":"","Todt":""},"Index":"MyPipeline" }
      this.props.getlistdata(data)

    }
    
    getstatusselection(request,status,fadate,ldate){
     
      var data = {"Token":"","Header":{"Color":status,"AllRequest":request,"Fromdt":fadate,"Todt":ldate},"Index":"MyPipeline" }
      this.props.getlistdata(data)
     

    }
    getAction(value,srno,type){ 
      
      var data = {"Token":"",
                  "Header":{"RequestType":type,"Srno":srno,"Action":value},
                  "Index":"RequestAction" }
                  postToServer("AdminDashbord", data).then((result) => { 
            
                    if (result.data["Status"] == "Success") {
                        this.setState({ 
                          action: result.data.data[0].status,
                          show:true
                         })
        
                      
                    } else {
        
                        this.setState({ action:''})
                    }
        
        
                }).catch((error) => {
                    this.setState({ action:'' })
                 //   console.log(error)
                
                })

    }
    onHide() {
      this.setState({ show: false })
     
      }
      getView(data){ //console.log("g",data)
        this.setState({
          setvalue : data
        })
      }
      getRequestFilter(data){
        console.log("data",data)
        this.setState({
          requeststatus:data
        })
        this.getstatusselection(data,this.state.status,this.state.fdate,this.state.tdate)
      }
      getStatus(data){
       // console.log("data1",data)
        this.setState({
          status:data
        })
        this.getstatusselection(this.state.requeststatus,data,this.state.fdate,this.state.tdate)
      }
      getDates(fadate,ldate){
       // console.log("dates2",fadate,ldate)
        this.setState({
          fdate:fadate,
          tdate:ldate
        })
        this.getstatusselection(this.state.requeststatus,this.state.status,fadate,ldate)
      }
    render(){ 
      let header =[]
      if(this.state.requeststatus == "4"){
         header = [
            { title: 'Request Type', prop: 'ReqType1', sortable: true},
            { title: 'Description', prop: 'Description1' },
            { title: 'Req. Date', prop: 'ReqDate', sortable: true },
            { title: 'Requested By', prop: 'Person Name' },
            { title: 'Approved By/Rejected By', prop: 'ApprovedBy' },
            { title: 'Approved Date/Rejected Date', prop: 'ApprovedDate' },
            // { title: 'From Date', prop: 'DateFrom' },
            // { title: 'To Date', prop: 'DateTo' },
            { title: 'Action', prop: 'Action' },
          ];
        }else{
           header = [
            { title: 'Request Type', prop: 'ReqType1', sortable: true},
            { title: 'Description', prop: 'Description1' },
            { title: 'Req. Date', prop: 'ReqDate', sortable: true },
            { title: 'Requested By', prop: 'Person Name' },
            { title: 'Approved By/Rejected By', prop: 'ApprovedBy' },
            { title: 'Approved Date/Rejected Date', prop: 'ApprovedDate' },
            { title: 'From Date', prop: 'DateFrom' },
            { title: 'To Date', prop: 'DateTo' },
            { title: 'Action', prop: 'Action' },
          ];
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
        
        if(this.props.requestList){
          
        this.props.requestList.map((item) => { 
          if(item.ReqType){
            item.ReqType1="";
            item.ReqType1 = <div className="flexDisplay">
                                <div className="pdLeft5">
                                  {item.color == 2 ? 
                                  <div className="darkOrange"></div> : item.color == 1 ? <div className="lightOrange"></div> : item.color == 3 ? <div className="redCircle "></div>:''}
                                </div>
                                <div className="">{item.ReqType}</div>
                            </div>
          }
          if(item.Description){
            item.Description1 =  <OverlayTrigger
            overlay={
                <Tooltip
                  
                >
                  <div style={{"white-space":"initial","line-height":"1.5em" }}>{item.Description}</div>
                </Tooltip>
            }
            placement="right"
        ><div className="descriptionlist">{item.Description}</div></OverlayTrigger>
                           
          }
          item.Action=<ShowApprovalDrop  requestAction={item.Req_Action} srno={item.Srno} url={item.url} requestType={item.ReqType} getAction={this.getAction}/> 
        })
      }
       // console.log("tra",this.state.isFull)
        return( 
            
            <div className="marginTop20 ">
               {!this.props.requestList ?
                <div className="mt-20 pipelineheight">
                <DashLoader></DashLoader></div>
                :
                <CustomTable
                  tableHeader={header}
                  tableBody={this.props.requestList}
                  keyName="userTable"
                  tableClass="striped hover table-responsive"
                  rowsPerPage={5}
                  rowsPerPageOption={[5, 10, 15, 20, 25]}
                  initialSort={{ prop: "username", isAscending: true }}
                  labels={customLabels}
                  requestType={this.props.requeststatus}
                  allstatus={this.props.allstatus}
                  list={this.props.requestList}
                  typeselection={this.getStatus}
                  getreqTypeFilter={this.getRequestFilter}
                  getfullview={this.getView}
                  getDates={this.getDates}
                />}
                 <DCRSave onHide={this.onHide} dcrNo={this.state.action} dcrmsg="" show={this.state.show} />
               
            </div>
    
        )
    }
}
const mapStateToProps =state =>({
  requeststatus : state.AdminDashboard.requeststatus,
  allstatus : state.AdminDashboard.allstatus,
  requestList:state.AdminDashboard.requestList,
})
const mapDispatchToProps = dispatch =>({
  getrequestType:requestdata => dispatch(getrequestType(requestdata)),
  getAllStatus:statusdata => dispatch(getAllStatus(statusdata)),
  getlistdata:data => dispatch(getlistdata(data))
})
export default  connect(mapStateToProps,mapDispatchToProps)(PipeLineTodo)