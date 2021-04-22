import React, { Component } from 'react'
import {Row,Col,Tab,Nav,Dropdown,DropdownItem} from 'react-bootstrap'
import { NavLink,Link } from "react-router-dom";

import { URL_MANAGER_DOWN_CALL_AVERAGE } from '../../lib/constants'
import ManagerCallAverageGraph from './ManagerCallAverageGraph'
import DashboardManagerCustomTable from './DashboardManagerCustomTable'
import ManagerCallAverageRegionalManager from './ManagerCallAverageRegionalManager'
import DownlineManagerCallAverageGraph from './DownlineManagerCallAverageGraph'
import DashLoader from "../../lib/DashboardLoader";
import YearDropDown from '../../lib/YearDropDown'

class ManagerCallAverage extends Component {
    constructor(props){
        super(props)
        this.state = {
            isFull: false,
            activeTab: '1',
            displayFilter:false,
            selectedMonthName:'',
            selectedMonthCode:'',
            selectedDesignationName:'',
            selectedDesignationCode:'',
            displayYearFilter:false,
            selectedYear:''
        };
        this.handleView = this.handleView.bind(this)
        this.addclass = this.addclass.bind(this)
        this.visibilityRef = React.createRef()
        this.handleScroll = this.handleScroll.bind(this)
        this.getMonthDetail = this.getMonthDetail.bind(this)
        this.nextchildcallaveragemiddle = this.nextchildcallaveragemiddle.bind(this)
        this.getYearlyData= this.getYearlyData.bind(this)
    }
    
    /* component full screen view function*/
    handleView(){
        this.setState({
            isFull: !this.state.isFull
        })
    }
    addclass(tab){
        if (this.state.activeTab !== tab) {
            this.setState({
              activeTab: tab
            });
          }
          if(tab == 4 || tab == 1 ){
              this.setState({
                displayFilter:true
              })
          }
          else{
            this.setState({
                displayFilter:false
              })
          }
          if(tab == 2){
              this.setState({
                displayYearFilter:true
              })
          }else{
            this.setState({
                displayYearFilter:false
              })
          }
    }
    handleScroll() { 
        const { data } = this.props
        if (data && (data.length > 0))
            return
        const el = this.visibilityRef.current
        if(el != null){
        const bounds = el.getBoundingClientRect();
        if ((bounds.top < 0 ) || (bounds.bottom < window.screen.height)) {
            this.props.getData && this.props.getData('','')
        } 
        }
    }
    
    componentDidMount() { 
        this.props.getData && this.props.getData('','')
      //  window.addEventListener('scroll', this.handleScroll, true);
    }

    //  componentDidUpdate(olsprops,oldstate){
    //     if(oldstate.selectedMonthCode != this.state.selectedMonthCode){
    //     this.props.getData(this.state.selectedMonthCode,'')
    //     }
    //  }

    componentWillUnmount() {
       // window.removeEventListener('scroll', this.handleScroll);
    }
    getMonthDetail(data,name){
        // console.log(data,"<-code",name,"<-name month")
        this.setState({
            selectedMonthName:name,
            selectedMonthCode:data
        })
        this.props.getData(data,'')
    }
    nextchildcallaveragemiddle(month,fscode){
        month = this.state.selectedMonthCode
        // this.props.getData(data,'')
        this.props.nextchildcallaverage(month,fscode)
        // console.log(month,data,"middle data")
        // this.props.nextchildcallaverage(data, month)
    }
    // getDesignationDetail(des,descode){
    //     // console.log(des,"<-code",descode,"<-name month")
    //     this.setState({
    //         selectedDesignationCode:descode,
    //         selectedDesignationName:des
    //     })
    //     // console.log(this.state.selectedMonthCode,"<-code",this.state.selectedMonthName,"<-name month")
    //     // console.log(this.state.selectedDesignationCode,"<-code",this.state.selectedDesignationName,"<-name desg")
    // }
    getYearlyData(year){
        this.setState({
            selectedYear:year
        })
        this.props.getyeardata(year)
    }
    
    render() { 
        var monthsfull    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var nowfull       = new Date();
        var thisMonthfull = monthsfull[nowfull.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
        const { month_list } = this.props
        const {designation_list}=this.props
        const{graphdata} = this.props
        const{totalcalls} = this.props
        const{downlinedata} =this.props
        const{callavgdowndata} =this.props
        let years
        let list =[]
        let currentYear = new Date().getFullYear();
        years = currentYear-1
        for (var i= currentYear ; i > currentYear-3 ;i--) {
        list.push(i);
        }
        const header = [
            { title: 'Name' , prop: 'DR.Name1', sortable: true, filterable: true },
            { title: 'Dr. Grade', prop: 'DR.Grade', sortable: true, filterable: true },
            { title: 'No. Of Meeting', prop: 'No Of Meeting', sortable: true, filterable: true },
            { title: 'No. Of Call Made', prop: 'No Of Call Made', sortable: true, filterable: true },
            { title: 'Pending Call', prop: 'Pending Call', sortable: true, filterable: true },
            { title: 'Status', prop: 'Status', sortable: true, filterable: true },
        ]
        var months    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var now       = new Date();
        var thisMonth = months[now.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
        //alert(thisMonth);
        var prevMonth
        if(now.getMonth() == 0 ){
            prevMonth = 'Dec'
        }else{
            prevMonth = months[now.getMonth()-1]
        }
       
        var { data } = this.props
        let usedata = null
        if (data) {
            usedata = [...data]
        }
        if (usedata && (usedata.length == 1) && (usedata[0] == 'loading'))
            usedata = null
        var excess=<span className="excess">Excess</span>
        var complete=<span className="complete">Complete</span>
        var incomplete=<span className="incomplete">Incomplete</span>
        var compairavgpercent=''
        var lastmonthcallavg=''
        var thismonthcallavg=''
        if(usedata){
            usedata.map( (localdata)=>{
                if(localdata["Status"]=='Excess'){
                    localdata.Status=excess;
                }
                else if(localdata["Status"]=='Completed'){
                    localdata.Status=complete;
                }
                else if(localdata["Status"]=='incompleted'){
                    localdata.Status=incomplete;
                }
                else{

                }
                if(localdata["DR.Name"]){
                    localdata["DR.Name1"]=<Link to={"/profile/" +localdata["DRCode"]}>
                                            <span className="ucdocname">{localdata["DR.Name"]} </span>
                                        </Link>
                }
            })
            
         }
         else{
            <span className="">No data</span>
         }
         let tCalls
         if(totalcalls){
            totalcalls.map((item) =>{
                tCalls = item.No_of_calls
            })
         }
         if(graphdata && graphdata != undefined){ 
            // graphdata.map( (localdata)=>{
            //   if(localdata["disp"]==prevMonth){
            //       lastmonthcallavg=localdata["CallAverage"]
            //   }
  
            //   if(localdata["disp"]==thisMonth){
            //       thismonthcallavg=localdata["CallAverage"]
            //   }
            //   var round_average=Math.round(localdata["CallAverage"]);
            //   localdata.CallAverage=round_average;
            // })
            // compairavgpercent=((thismonthcallavg - lastmonthcallavg)/lastmonthcallavg)*100
            let lastavg
            let curravg
           
            graphdata.map( (graph)=>{
                // console.log("graph=>",graphdata)
                
                // if(graph["disp"]==prevMonth){ 
                //     lastmonthcallavg=graph["CallAverage"]
                //     let totallastcalls= parseInt(graph["CoredoctorVisit"]*lastmonthcallavg);
                //     lastavg = parseInt((lastmonthcallavg/tCalls)*100);
                // }
                
                // if(graph["disp"]==thisMonth){
                //     thismonthcallavg=graph["CallAverage"]
                //     let totallastcalls= parseInt(graph["CoredoctorVisit"]*thismonthcallavg);
                //     curravg = parseInt((thismonthcallavg/tCalls)*100)
                // }

                if(graph["disp"]==prevMonth){
                    lastmonthcallavg=graph["CoredoctorVisit"];
                }
                if(graph["disp"]==thisMonth){
                    thismonthcallavg=graph["CoredoctorVisit"]
                }
              
            })
            const tAvg = thismonthcallavg-lastmonthcallavg
            const t = (tAvg*100)/lastmonthcallavg
          // compairavgpercent=((thismonthcallavg - lastmonthcallavg)/lastmonthcallavg)*100
          //compairavgpercent=(lastavg - curravg).toFixed()
         // console.log("compairavgpercent",compairavgpercent, lastavg ,curravg)
         compairavgpercent = t.toFixed()
          }
         
        //   console.log(callavgdowndata,"callavgdowndata h data")
        //   console.log(downlinedata,"downlinedata h data")
        return (
            <Row className="rowone">
                    <Col xl={12} md={12} sm={12} xs={12} className="nopad0">
                        <div ref={this.visibilityRef} className={
                            this.state.isFull
                                ? "fullscreenView"
                                : "ucdoctorsecondrow-first"
                        }
                        >
                            <div className="manager_component_head flex-row">
                                <div className="manager_callaverage_mainhead">
                                    <div className="mainhead_content_one bartitle">
                                        Call Average
                                    </div>
                                    </div>
                                    {/* <div className="mainhead_content_two">
                                        <img src="../public/assets/images/manage_refresh.svg"></img>
                                    </div> */}
                                    {this.state.displayFilter && 
                                    <div className="flexDisplay">
                                        {/* <div className="manager_callaverage_filter">
                                            <Dropdown>
                                                <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                                    <span className="">Lowest Call Avg.</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                                                    <div className="month-padding columns-height cal-scrollbar">
                                                        <DropdownItem className="manager_sales_filter_month">Less Then 7</DropdownItem>
                                                        <DropdownItem className="manager_sales_filter_month">Less Then 14</DropdownItem>
                                                        <DropdownItem className="manager_sales_filter_month">Less Then 21</DropdownItem>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div> */}
                                        {/* <div className="manager_callaverage_filter">
                                            <Dropdown>
                                                <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                                    <span className="">{this.state.selectedDesignationName ? this.state.selectedDesignationName : 'Select Designation'}</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                                                    <div className="month-padding columns-height cal-scrollbar">
                                                    {designation_list && designation_list != undefined ? 
                                                        designation_list.map((localdata)=>(
                                                            <DropdownItem 
                                                            className="manager_sales_filter_month"
                                                            onClick={()=>this.getDesignationDetail(localdata['c_name'],localdata['c_code'])}
                                                            >{localdata['c_name']}</DropdownItem>
                                                        ))
                                                        :
                                                        null
                                                        }
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div> */}
                                        <div className="manager_callaverage_filter">
                                            <Dropdown>
                                                <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                                    <span className="">{this.state.selectedMonthName ? this.state.selectedMonthName :thisMonthfull}</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                                                    <div className="month-padding columns-height cal-scrollbar">
                                                    {month_list && month_list != undefined ?
                                                        month_list.map((localdata)=>(
                                                        <DropdownItem 
                                                        className="manager_sales_filter_month"
                                                        onClick={() => this.getMonthDetail(localdata["Code"],localdata["Name"])}
                                                        >{localdata['Name']}</DropdownItem>
                                                        ))
                                                        :
                                                        null    
                                                    }
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    }
                                     {this.state.displayYearFilter && 
                                     <YearDropDown getYearlyData={this.getYearlyData} />
                                    }
                                <div className="manager_component_head_icon">
                                    <div>
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
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row className="nomar0">
                                    <Col xl={12} md={12} sm={12} xs={12} className="nopad0">
                                        <div className="managerCall">
                                        <Tab.Content className="tabrow">
                                            <Tab.Pane eventKey="first">
                                            <DownlineManagerCallAverageGraph graphdata={graphdata} data={downlinedata} totalcalls={totalcalls}/>
                                                
                                            </Tab.Pane>
                                        </Tab.Content>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="second">
                                            <ManagerCallAverageGraph graphdata={graphdata} totalcalls={totalcalls}/>
                                            
                                            </Tab.Pane>
                                        </Tab.Content>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="third">
                                            {usedata || usedata != undefined  ? 
                                                <DashboardManagerCustomTable
                                                    tableHeader={header}
                                                    tableBody={usedata}
                                                    keyName="userTable"
                                                    tableClass="striped hover table-responsive"
                                                    rowsPerPage={10}
                                                    rowsPerPageOption={[10, 15, 20]}
                                                    initialSort={{prop: "username", isAscending: true}}
                                                />
                                                :
                                                <DashLoader></DashLoader>
                                            }
                                            </Tab.Pane>
                                        </Tab.Content>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="forth">
                                                <div className="border-container">
                                                    <div className="managerdash_hierarchical_container">
                                                        <ManagerCallAverageRegionalManager 
                                                        data={callavgdowndata}
                                                        // data={downlinedata}
                                                        nextchildcallaveragemiddle={this.nextchildcallaveragemiddle}
                                                        />
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                        </div>
                                    </Col>
                                    <Col xl={12} md={12} sm={12} xs={12} className="nopad0 topbordertab">
                                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                            <li className={this.state.activeTab == 1 ?  'nav-item elementcontainer callavg_activelinkcall' :  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('1'); }}>
                                            <Nav.Item>
                                                    <Nav.Link eventKey="first" className="linkcontainer">
                                                        <p className="dashtabhead">My Down Hierarchy View</p>
                                                        <p  className="dashtabsubhead"> Graphical view (Current Month)</p>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                
                                            </li>
                                            <li className={this.state.activeTab == 2 ?  'nav-item elementcontainer callavg_activelinkcall':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('2'); }}>
                                            <Nav.Item>
                                                    <Nav.Link eventKey="second" className="linkcontainer">
                                                        <p className="dashtabhead">Monthly View</p>
                                                        <p  className="dashtabsubhead">{Math.round(compairavgpercent)}% Vs Last Month</p>
                                                    </Nav.Link>
                                                </Nav.Item>
                                               
                                            </li>
                                            <li className={this.state.activeTab == 3 ?  'nav-item elementcontainer callavg_activelinkcall':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('3'); }}>
                                            <Nav.Item>
                                                    <Nav.Link eventKey="third" className="linkcontainer">
                                                        <p className="dashtabhead">My Doctor Call Table</p>
                                                        <p  className="dashtabsubhead"> Current Month</p>
                                                    </Nav.Link>
                                                </Nav.Item> 
                                            </li>
                                            <li className={this.state.activeTab == 4 ?  'nav-item elementcontainer callavg_activelinkcall':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('4'); }}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="forth" className="linkcontainer">
                                                        <p className="dashtabhead">Detailed View Downline</p>
                                                        <p  className="dashtabsubhead"> Current Month</p>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>
                    </Col>
                </Row>
        )
    }
}
export default ManagerCallAverage