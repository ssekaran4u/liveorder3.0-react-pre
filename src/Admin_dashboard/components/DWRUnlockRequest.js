import React,{Component} from 'react'
import {Nav,Dropdown,DropdownItem} from 'react-bootstrap'
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter
} from "recharts";
import CustomBar from "../../dashboard/components/CustomBar";
import DWRUnlockPendingList from '../components/DWRUnlockPendingList'
import { connect } from 'react-redux'
import {getUnlockList} from '../../actions/AdminDashboard'
import DashLoader from "../../lib/DashboardLoader";
import {getDwrFilters} from '../../actions/AdminDashboard'
import {getunlockfilter} from '../../actions/AdminDashboard'
class DWRUnlockRequest extends Component{
    constructor() {
        super();
        this.state = {
            isFull: false,
            activeTab: '3'
            
        }
        this.addclass = this.addclass.bind(this)
        this.handleView = this.handleView.bind(this)
        this.getSubZone = this.getSubZone.bind(this)
        this.hideZone = this.hideZone.bind(this)
        this.getunlockdata = this.getunlockdata.bind(this)
    }
    addclass(tab){
        if (this.state.activeTab !== tab) {
            this.setState({
              activeTab: tab
            });
          }
    }
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
    componentDidMount(){
        var data = {"Token":"" ,"Index":"DWRUnlockRequest_Table" }
        this.props.getUnlockList(data)

        var filters={"Token":"","Index":"Filter"}
        this.props.getDwrFilters(filters)
        this.getunlockdata()
    }
    getunlockdata(zone,divi,desig){ 
    
        var filterapi = 
        {"Token":"","Index":"DWRUnlockRequest_Table","Header":{"Division":divi,"Designation":desig ,"Zone":zone}}
    
        this.props.getunlockfilter(filterapi)
    }
    getSubZone(data){ 
        if(data == 1){
        this.setState({
            showSubarea:true,
            showSubdiv:false,
            showSubDesg:false
        })
        }else if(data ==  2){
            this.setState({
                showSubarea:false,
                showSubdiv:true,
                showSubDesg:false
            })  
        }else if(data == 3){
            this.setState({
                showSubarea:false,
                showSubDesg:true,
                showSubdiv:false
            }) 
        }                                        
    }
    hideZone(){ 
        this.setState({
            showSubarea:false,
            showSubdiv:false,
            showSubDesg:false
        })
    }
    render(){  
      
        const data = [
            {
                name: "Sun",
                PrimaryTarget: 12,
                PrimarySales: 10,
                SecSales:12
            },
            {
                name: "Mon",
                PrimaryTarget: 10,
                PrimarySales: 8,
                SecSales:10
            },
            {
                name: "Tue",
                PrimaryTarget: 11,
                PrimarySales: 7,
                SecSales:11
            },
            {
                name: "Wed",
                PrimaryTarget: 10,
                PrimarySales: 6,
                SecSales:10
            },
            {
                name: "Thr",
                PrimaryTarget: 11,
                PrimarySales: 8,
                SecSales:11
            },
            {
                name: "Fri",
                PrimaryTarget: 9,
                PrimarySales: 7,
                SecSales:9
            },
            {
                name: "Sat",
                PrimaryTarget: 8,
                PrimarySales: 6,
                SecSales:8
            }
            
        ];
        // if(!this.props.unlockstatus){
        //    return null
        // }
        return(
            <div className="submissiongraph " >
             {this.state.activeTab == 1 ?   
            <div className="unlockrequestMargin">
                <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
                <div className="flex-row">
                    <div className="dwrSubHeading mainhead_content_one bartitle">DWR Unlock Request</div>
                    <div>
                        <div className="flexDisplay">
                        <div className="unlockmenu">
                        <Dropdown>
                        <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <div className="unlockBtn">
                                    <span className="unloackStatusText">All India</span>
                                </div>
                                </Dropdown.Toggle>
                            {/* <Dropdown.Menu>    
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                            <div className="pipelinePad">Zone Wise  </div>
                                            <div className="pipelinePad">Division</div>
                                            <div className="pipelinePad">Designation</div>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu> */}
                                <Dropdown.Menu className="dwrsubmissiondrop">    
                                            <Dropdown.Item href="#/action-1" >
                                                <div className="statusdropmenu" onMouseLeave={this.hideZone}>
                                                    {/* <div>
                                                        <div>
                                                            <div className="pipelinePad " onMouseOver={()=>this.getSubZone(1)} >Zone Wise</div>
                                                            <div className="pipelinePad" onMouseOver={() =>this.getSubZone(2)} >Division</div>
                                                            <div className="pipelinePad" onMouseOver={() =>this.getSubZone(3)} >Designation</div>
                                                        </div>
                                                        {this.state.showSubarea ? 
                                                        <div className="subzone">{zone.map((item) =>(
                                                            <div className="pipelinePad">abc</div>
                                                        ))}</div>:this.state.showSubdiv ? <div className="subzone">{division.map((item) =>(
                                                            <div className="pipelinePad">{item.C_Name}</div>
                                                        ))}</div> : this.state.showSubDesg ? <div className="subzone">{designation.map((item) =>(
                                                            <div className="pipelinePad">{item.C_Name}</div>
                                                        ))}</div> :''}
                                                    </div> */}
                                                    
                                                </div>
                                            </Dropdown.Item>
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
                    
                </div>
               
                <div className="managergraph_container">
                    <div style={{ width: "100%", height: 300 }}>
                        {/* <ResponsiveContainer>
                            <ComposedChart
                                width={500}
                                height={400}
                                data={data}
                            >
                                <CartesianGrid
                                    stroke="#adafb121"
                                    strokeDasharray="3 3"
                                />
                                <XAxis dataKey="name" />
                                <YAxis />
                                
                                <Legend />
                                {/* <Area
                                    className="backwave"
                                    type="monotone"
                                    dataKey="PrimarySales"
                                    fill="rgba(27, 132, 231,0.5)"
                                    stroke="none"
                                /> */}
                                {/* <Bar
                                    dataKey="PrimarySales"
                                    stackId="a"
                                    barSize={24}
                                    fill="#ccf1f1"
                                    radius={[5, 5, 0, 0]}
                                /> */}
                                {/* <Bar
                                    dataKey="PrimaryTarget"
                                    stackId="a"
                                    fill="#ccf1f1"
                                    shape={<CustomBar />}
                                    className="barg"
                                    radius={[5, 5, -10, 0]}
                                    
                                    barSize={24}
                                /> */}
                                {/* <Line
                                    
                                    dataKey="PrimarySales"
                                    stroke="#00b7b7"
                                    strokeWidth={3} 
                                    activeDot={{r: 3}}
                                />
                            </ComposedChart> */}
                        {/* </ResponsiveContainer> */} 
                    </div>
                </div> 
                </div>
                </div>:this.state.activeTab == 2 ? 
                <div  style={{ width: "100%", height: 378 }}>hi</div>
                :this.state.activeTab == 3 ? 
                <div className=" pendingUnlocktable unlockreqheight responsiveHeight">
                {!this.props.dwrunlockfilterdata ?
                    <div className="mxheight pdtop120">
                    <DashLoader></DashLoader></div>
                    :
                    
                <DWRUnlockPendingList data={this.props.dwrunlockfilterdata} getunlockdata={this.getunlockdata}/> }
                </div>
                :'' }
                <ul className="nav nav-pills listborderTop" id="pills-tab" role="tablist">
                    {/* <li className={this.state.activeTab == 1 ?  'nav-item elementcontainer activedwrcall' :  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('1'); }}>
                        <Nav.Item>
                            <Nav.Link eventKey="first" className="linkcontainer">
                                <p className="dashtabhead">Weekly</p>
                                <p  className="dashtabsubhead"><span>+</span> 15% Vs Last Month</p>
                            </Nav.Link>
                        </Nav.Item>
                    </li> */}
                    {/* <li className={this.state.activeTab == 2 ?  'nav-item elementcontainer activedwrcall':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('2'); }}>
                        <Nav.Item>
                            <Nav.Link eventKey="second" className="linkcontainer">
                                <p className="dashtabhead">Year To Date(YTD)</p>
                                <p  className="dashtabsubhead"><span>+</span> 15% Vs Last Year</p>
                            </Nav.Link>
                        </Nav.Item>
                    </li> */}
                    <li className={this.state.activeTab == 3 ?  'nav-item elementcontainer activedwrcall':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('3'); }}>
                        <Nav.Item>
                            <Nav.Link eventKey="second" className="linkcontainer">
                                <p className="dashtabhead">View Pending List</p>
                                <p  className="dashtabsubhead"> As On Date</p>
                            </Nav.Link>
                        </Nav.Item>
                    </li>
                </ul>
                
            </div>
        )
    }
}
const mapStateToProps =state =>({
    unlockstatus:state.AdminDashboard.unlockstatus,
    dwrsublist:state.AdminDashboard.dwrsublist,
    dwrunlockfilterdata:state.AdminDashboard.dwrunlockfilterdata,
  })
  const mapDispatchToProps = dispatch =>({
    getUnlockList:data => dispatch(getUnlockList(data)),
    getDwrFilters:(data) => dispatch(getDwrFilters(data)),
    getunlockfilter:(data) => dispatch(getunlockfilter(data))
  })
export default connect(mapStateToProps,mapDispatchToProps)(DWRUnlockRequest)