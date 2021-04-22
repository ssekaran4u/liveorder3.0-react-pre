import React,{Component} from 'react'
import {Dropdown,DropdownItem} from 'react-bootstrap'
import {XAxis, YAxis, Tooltip, ResponsiveContainer,LineChart,CartesianGrid,Line,ComposedChart,Area} from 'recharts';
import AdminCustomTooltip from "../components/AdminCustomTooltip";
import { connect } from 'react-redux';
import {getdwrsubmission} from '../../actions/AdminDashboard'
import DashLoader from "../../lib/DashboardLoader";
import {getDwrFilters} from '../../actions/AdminDashboard'
import  {getfilterSelect} from '../../actions/AdminDashboard'
class DWRSubmission extends Component{
    constructor() {
        super();
        this.state = {
            isFull: false,
            itemdata:'',
            showSubarea:false,
            showSubdiv:false,
            showSubDesg:false,
            desig:'',
            divi:'',
            zone:''
        }
        this.handleView = this.handleView.bind(this)
        this.getSubZone = this.getSubZone.bind(this)
        this.hideZone = this.hideZone.bind(this)
      // this.getSubDivision = this.getSubDivision.bind(this)
       // this.hideSubDivision = this.hideSubDivision.bind(this)
       // this.hideSubDesig = this.hideSubDesig.bind(this)
       // this.getSubDesig = this.getSubDesig.bind(this)
       this.getdwrfilterList = this.getdwrfilterList.bind(this)
       this.getfilterresult = this.getfilterresult.bind(this)
    }
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
    componentDidMount(){
        var data = {"Token":"",
                    "Index":"DWRSubmitted_Graph" 
                    }
        this.props.getdwrsubmission(data)

        var filters={"Token":"","Index":"Filter"}
        this.props.getDwrFilters(filters)

        
    }
    getdwrfilterList(divi,desig,zone){
      
    }
    getSubZone(data){
        if(data == 1){
        this.setState({
            showSubarea:true,
            showSubdiv:false,
            showSubDesg:false,
            zone:data
        })
        this.getdwrfilterList(this.state.divi,this.state.desig,this.state.zone)
        }else if(data ==  2){
            this.setState({
                showSubarea:false,
                showSubdiv:true,
                showSubDesg:false,
                divi:data
            })
        this.getdwrfilterList(this.state.divi,this.state.desig,this.state.zone)
        }else if(data == 3){
            this.setState({
                showSubarea:false,
                showSubDesg:true,
                showSubdiv:false,
                desig:data
            })
        this.getdwrfilterList(this.state.divi,this.state.desig,this.state.zone) 
        }                                        
    }
    hideZone(){ 
        this.setState({
            showSubarea:false,
            showSubdiv:false,
            showSubDesg:false
        })
    }
    getfilterresult(zone,divi,desi){ 
        var filterapi =  {"Token":"",
        "Index":"DWRSubmitted_Graph",
        "Header":{"Division":divi,"Designation":desi ,"Zone":zone}
        }
        this.props.getfilterSelect(filterapi)
    }
    render(){ 
     
      
        // const data = [
        //     {
        //       name: 'Sun', uv: 100, pv: 2400, amt: 2400,test:'23',
        //     },
        //     {
        //       name: 'Mon', uv: 3000, pv: 1398, amt: 2210,test:'23',
        //     },
        //     {
        //       name: 'Tue', uv: 2500, pv: 9800, amt: 2290,test:'23',
        //     },
        //     {
        //       name: 'Wed', uv: 3000, pv: 3908, amt: 2000,test:'23',
        //     },
        //     {
        //       name: 'Fri', uv: 2500, pv: 4800, amt: 2181,test:'23',
        //     },
        //     {
        //       name: 'Sat', uv: 3000, pv: 3800, amt: 2500,test:'23',
        //     },
        //   ];
        
        let minmax = [0,]
        let charts = []
        let charts1 =[]
        
        if(this.props.dwrfilterdata){ 
            this.props.dwrfilterdata.map((localdata) => {
            charts.push({
                name: localdata.day_name,
                uv: localdata.value,
                dayname:localdata.popup_dt
             }) 
            })
            var maxtarget = Math.max.apply(null,
                this.props.dwrfilterdata.map((localdata) => {
                    return localdata['value'];
                }));
            
                minmax.push(Number(maxtarget))
          }else{
            if(this.props.dwrstatus){
       
                this.props.dwrstatus.map((localdata) => {
                 
                   charts.push({
                      name: localdata.day_name,
                      uv: localdata.value,
                      dayname:localdata.popup_dt
                   })                
                 
                })
                
              
                var maxtarget = Math.max.apply(null,
                  this.props.dwrstatus.map((localdata) => {
                      return localdata['value'];
                  }));
              
                  minmax.push(Number(maxtarget))
              }
          }
        let designation = []
        let division = []
        let zone = []
        if(this.props.dwrsublist){ 
           
           designation = this.props.dwrsublist.designation
           division = this.props.dwrsublist.division
           zone = this.props.dwrsublist.zone
        }
       
        return(
            <div className="submissiongraph requestMargin ">
                <div className={this.state.isFull ? "fullscreenView" : "dwrsubmit-first  "}>
                <div className="flex-row">
                    <div className="dwrSubHeading mainhead_content_one bartitle">DWR Submitted As On Date(Weekly)</div>
                        <div className="flexDisplay">
                            <div className="unlockmenu submissionlist">
                                <Dropdown>
                                    <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                        <div className="unlockBtn responsivedwrSub ">
                                            <span className="unloackStatusText">All India</span>
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dwrsubmissiondrop">    
                                            <Dropdown.Item href="#/action-1" >
                                                <div className="statusdropmenu" onMouseLeave={this.hideZone}>
                                                    <div>
                                                        <div>
                                                            <div className="pipelinePad " onMouseOver={()=>this.getSubZone(1)} >Zone Wise</div>
                                                            <div className="pipelinePad" onMouseOver={() =>this.getSubZone(2)} >Division</div>
                                                            <div className="pipelinePad" onMouseOver={() =>this.getSubZone(3)} >Designation</div>
                                                        </div>
                                                        {this.state.showSubarea ? 
                                                        <div className="subzone">{zone.map((item) =>(
                                                            <div className="pipelinePad" onClick={()=>this.getfilterresult(item.C_Code,'','')} >{item.C_Name}</div>
                                                        ))}</div>:this.state.showSubdiv ? <div className="subzone">{division.map((item) =>(
                                                            <div className="pipelinePad" onClick={()=>this.getfilterresult('',item.C_Code,'')} >{item.C_Name}</div>
                                                        ))}</div> : this.state.showSubDesg ? <div className="subzone">{designation.map((item) =>(
                                                            <div className="pipelinePad" onClick={()=>this.getfilterresult('','',item.N_Type)} >{item.C_Name}</div>
                                                        ))}</div> :''}
                                                    </div>
                                                    
                                                </div>
                                            </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="unlockmenu submissionmobileview">
                                <Dropdown>
                                    <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                        <div className="unlockBtn responsivedwrSub ">
                                            <span className="unloackStatusText">All India</span>
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dwrsubmissiondrop">    
                                        <div className="statusdropmenu" onMouseLeave={this.hideZone} >
                                            <div>
                                                <div>
                                                    <div className="pipelinePad " onClick={()=>this.getSubZone(1)} >Zone Wise</div>
                                                    <div className="pipelinePad" onClick={() =>this.getSubZone(2)} >Division</div>
                                                    <div className="pipelinePad" onClick={() =>this.getSubZone(3)} >Designation</div>
                                                </div>
                                                <Dropdown.Item href="#/action-1" >
                                                {this.state.showSubarea ? 
                                                <div className="subzone">{zone.map((item) =>(
                                                    <div className="pipelinePad" onClick={()=>this.getfilterresult(item.C_Code,'','')} >{item.C_Name}</div>
                                                ))}</div>:this.state.showSubdiv ? <div className="subzone">{division.map((item) =>(
                                                    <div className="pipelinePad" onClick={()=>this.getfilterresult('',item.C_Code,'')} >{item.C_Name}</div>
                                                ))}</div> : this.state.showSubDesg ? <div className="subzone">{designation.map((item) =>(
                                                    <div className="pipelinePad" onClick={()=>this.getfilterresult('','',item.N_Type)} >{item.C_Name}</div>
                                                ))}</div> :''}
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                            
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="admin_component_head_icon">
                                <div className="headicon_position">
                                    {this.state.isFull ? (
                                        <img
                                            src="../public/assets/images/collapse-grey.svg"
                                            onClick={this.handleView}
                                        />
                                    ) : (
                                        <img
                                            src="../public/assets/images/fullscreen.svg"
                                            onClick={this.handleView}
                                        />
                                    )}
                                    {/* <img
                                        className="dashfullscreen"
                                        src="../public/assets/images/overflow.svg"
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                
                <div style={{ width: '100%', height: 360 }}>
                {!charts ?
                    <DashLoader></DashLoader>
                    :
                    <ResponsiveContainer>
                        <ComposedChart
                            width={400}
                            height={300}
                            data={charts}
                        >
                        <CartesianGrid stroke='#f5f5f5' strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        {maxtarget == 0 ?
                        <YAxis domain={[0,1]}/> :
                        <YAxis domain={minmax}/> }
                        <Tooltip content={<AdminCustomTooltip  />}/>
                        <Line type='monotone' dataKey='uv' stroke='#f49917' strokeWidth={3} activeDot={{r: 3}}/>
                        </ComposedChart>
                    </ResponsiveContainer>
                }
                </div>
                </div>
            </div>
            
        )
    }
}
const mapStateToProps= state=>({
    dwrstatus:state.AdminDashboard.dwrstatus,
    dwrsublist:state.AdminDashboard.dwrsublist,
    dwrfilterdata:state.AdminDashboard.dwrfilterdata
})
const mapDispatchToProps = dispatch =>({
    getdwrsubmission:(data) => dispatch(getdwrsubmission(data)),
    getDwrFilters:(data) => dispatch(getDwrFilters(data)),
    getfilterSelect:(data) => dispatch(getfilterSelect(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(DWRSubmission)