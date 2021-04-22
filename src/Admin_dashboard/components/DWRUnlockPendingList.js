import React,{Component} from 'react'
import DWRPendingUnlockTable from '../components/DWRPendingUnlockTable'
import {Form,Dropdown} from 'react-bootstrap'
import { localeData } from 'moment';
import ShowApprovalDrop from '../components/ShowApprovalDrop'
import ListCheckbox from '../components/ListCheckbox'
import {getDwrFilters} from '../../actions/AdminDashboard'
import { connect } from 'react-redux'
class DWRUnlockPendingList extends Component{
  constructor() {
    super();
    this.state = {
       
        activeTab: '1',
        isFull: false,
         allcheck:false,
        filtermenu:[],
        showSubarea:false,
        showSubdiv:false,
        showSubDesg:false
        
    }
    this.handleChange = this.handleChange.bind(this)
    this.getfilterdata = this.getfilterdata.bind(this)
}
    componentDidMount(){
        
        var filters={"Token":"","Index":"Filter"}
        this.props.getDwrFilters(filters)
    }
    handleView(){ 
    this.setState({
        isFull: !this.state.isFull
    });
    }
    handleChange(event){
        
        const { checked} = event.target
    // console.log("hi",event.target.checked)
        if(checked ==  true){
            let itemval={}
            this.setState({
                allcheck:!this.state.allcheck
            })
            this.props.data.map((item) =>{
                itemval[item.Id] = true;
            })
            this.setState({
                filtermenu:itemval
            })
        }
        if(checked ==  false){
            this.setState({
                allcheck:!this.state.allcheck,
                filtermenu:this.props.data
            }) 
        
        }
    }
getSelectCheck(data){
    console.log("data",data)
}
getData(id, name, checked, item,date) { 
    
    let k={} 
    k=this.state.filtermenu
   
    if(checked){
    k[id]=true
    k[item.fscode] = name
    k[item.DATE] = date
    }else{ 
      
      delete k[id]
      delete k[item.fscode]
      delete k[item.date]
    }
    this.setState({ filtermenu:k })
   // console.log("pin",this.state.filtermenu)
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
    getfilterdata(zone,divi,desig){ 
        this.props.getunlockdata(zone,divi,desig)
     }
    render(){
        // const header = [
        //   { title: <Form.Check  
        //     custom inline 
        //     type="checkbox" 
        //     id="checkbox1" 
        //     className="pendingcheckbox"
        //     checked={this.state.allcheck}
        //     onChange={this.handleChange}
        //     label="F.S. Code" />, prop: 'Checkbox'},
            
        //     { title: 'F.S. Name', prop: 'c_sh_name' },
        //     { title: 'Region', prop: 'region'  },
        //     { title: 'Locked Date', prop: 'DATE'  },
        //     { title: 'Action', prop: 'Action' },
            
        //   ];
        const header = [
              { title: 'F.S. Code', prop: 'fscode' ,sortable: true},
              { title: 'F.S. Name', prop: 'c_name' },
              { title: 'Region', prop: 'region'  },
              { title: 'Locked Date', prop: 'DATE'  },
              { title: 'Action', prop: 'Action' },
              
            ];   
         
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
        if(this.props.data){ 
             this.props.data.map( (localdata,index)=>{ 
          
            //   localdata.Checkbox=<Form.Check  
            //                        custom inline 
            //                        type="checkbox" 
            //                        id={localdata.Id} 
            //                        checked={this.state.allcheck}
            //                        label="" />
            localdata.Checkbox=<ListCheckbox 
                                Selectcheck={this.state.filtermenu}
                                key={localdata.Id}
                                getData={this.getData.bind(this)}
                            //  selection={selection}
                                id={localdata.Id }
                                item={localdata}
                                
                                />
             //  localdata.Action=<img src="../public/assets/images/overflow.svg" />
                localdata.Action=<ShowApprovalDrop  requestAction={localdata.Req_Action} srno={localdata.Srno} url={localdata.url} requestType={localdata.ReqType} getAction={this.getAction}/> 
        })
        
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
            <div className="unlockmarginTop">
              <div className={this.state.isFull ? "fullscreenView" : "dwrsubmit-first  "}>
            <div className=" AdashboardTable">  
                <div className="flex-row"> 
                    <div className="pendingListhead mainhead_content_one bartitle">DWR Unlock Request</div>
                    <div className="flexDisplay">
                    {/* <div>
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <div className="approveAllBtn">
                                    <span className="statusText">Approve All</span>
                                </div>
                                </Dropdown.Toggle>
                                
                            </Dropdown>     
                                      
                    </div> */}
                    <div className="adashboardmenu submissionlist">
                            <Dropdown className="menuDrop responsivedrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <div className="dashboardfiltersBtn responsiveSubdrop">
                                    <span className="statusText">All India</span>
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
                                                        <div className="unloacksubzone">{zone.map((item) =>(
                                                            <div className="pipelinePad" onClick={()=>this.getfilterdata(item.C_Code,'','')}>{item.C_Name}</div>
                                                        ))}</div>:this.state.showSubdiv ? <div className="unloacksubzone">{division.map((item) =>(
                                                            <div className="pipelinePad" onClick={()=>this.getfilterdata('',item.C_Code,'')}>{item.C_Name}</div>
                                                        ))}</div> : this.state.showSubDesg ? <div className="unloacksubzone">{designation.map((item) =>(
                                                            <div className="pipelinePad" onClick={()=>this.getfilterdata('','',item.N_Type)}>{item.C_Name}</div>
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
                                        <div className="unlockBtnAdmin responsivedwrSub ">
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
                                                    <div className="pipelinePad"  onClick={()=>this.getfilterdata(item.C_Code,'','')} >{item.C_Name}</div>
                                                ))}</div>:this.state.showSubdiv ? <div className="subzone">{division.map((item) =>(
                                                    <div className="pipelinePad" onClick={()=>this.getfilterdata('',item.C_Code,'')} >{item.C_Name}</div>
                                                ))}</div> : this.state.showSubDesg ? <div className="subzone">{designation.map((item) =>(
                                                    <div className="pipelinePad" onClick={()=>this.getfilterdata('','',item.N_Type)} >{item.C_Name}</div>
                                                ))}</div> :''}
                                                </Dropdown.Item>
                                            </div>
                                        </div>
                                            
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                    <div className="manager_component_head_icon">
                            <div className="headicon_position">
                            {this.state.isFull ? (
                                <img
                                    src="../public/assets/images/collapse-grey.svg"
                                    onClick={this.handleView.bind(this)}
                                />
                            ) : (
                                <img
                                    src="../public/assets/images/fullscreen.svg"
                                    onClick={this.handleView.bind(this)}
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
                <DWRPendingUnlockTable
                tableHeader={header}
                tableBody={this.props.data}
                keyName="userTable"
                tableClass="striped hover table-responsive"
                rowsPerPage={5}
                rowsPerPageOption={[5, 15, 20, 25, 30]}
                initialSort={{ prop: "username", isAscending: true }}
                labels={customLabels}
                activeTab={this.state.activeTab}
                isFull={this.state.isFull}
                />
                </div>
            </div>
        )
    }
}
const mapStateToProps =state =>({
    
    dwrsublist:state.AdminDashboard.dwrsublist
  })
  const mapDispatchToProps = dispatch =>({
    
    getDwrFilters:(data) => dispatch(getDwrFilters(data))
  })

export default connect(mapStateToProps,mapDispatchToProps)(DWRUnlockPendingList)
