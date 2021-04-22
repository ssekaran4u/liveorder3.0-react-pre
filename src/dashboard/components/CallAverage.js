import React, { Component } from 'react'
import {Row,Col,Tab,Nav,Dropdown,DropdownItem} from 'react-bootstrap'
import { NavLink,Link } from "react-router-dom";


import CallAverageGraph from './CallAverageGraph'
import DashboardMrCustomTable from './DashboardMrCustomTable'
import { exportDefaultSpecifier } from '@babel/types';
import DashLoader from "../../lib/DashboardLoader";
import YearDropDown from '../../lib/YearDropDown'


class CallAverage extends Component {
    constructor(){
        super()
        this.state = {
            isFull: false,
            activeTab: '1',
            selectedYear:'',
            displayFilter:true,
            displayTableFilter:false,
            selectedTableYear:''
        };
        this.handleView = this.handleView.bind(this)
        this.addclass = this.addclass.bind(this)
        this.visibilityRef = React.createRef()
        this.handleScroll = this.handleScroll.bind(this)
        this.getYearlyData = this.getYearlyData.bind(this)
        this.getYearlyTableData = this.getYearlyTableData.bind(this)
    }

    handleScroll() {
        const { data } = this.props
        if (data && (data.length > 0))
            return
        const el = this.visibilityRef.current
        if(el != null){
        const bounds = el.getBoundingClientRect();
        // console.log(bounds,"bounds")
            if ((bounds.top < 0 ) || (bounds.bottom < window.screen.height)) {
                // console.log(bounds,"bounds")
                this.props.getData && this.props.getData()
            }
        } 
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
        if(tab == 1){
              this.setState({
                displayFilter:true
              })
        }else{
            this.setState({
                displayFilter:false
            })
        }
        if(tab == 2){
            this.setState({
                displayTableFilter:true
            })
        }else{
            this.setState({
                displayTableFilter:false
            })
        }
    }
    componentDidMount() {
        this.props.getData && this.props.getData()
        // window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
       // window.removeEventListener('scroll', this.handleScroll);
    }
    getYearlyData(year){
        // this.setState({
        //     selectedYear:year
        // })
        this.props.getcallAvgYeardata(year)
    }
    getYearlyTableData(year){
        // this.setState({
        //     selectedTableYear:year
        // })
        this.props.getcallAvgtableYeardata(year)
    }

    render() {
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
       
        var prevMonth  ;
        if(now.getMonth() == 0){
            prevMonth = 'Dec'
        }else{
            prevMonth = months[now.getMonth()-1]
        }
        var lastmonthcallavg=''
        var thismonthcallavg=''
        var compairavgpercent=''
        const { data } = this.props
        let usedata = null
        if (data) {
            usedata = [...data]
        }
        if (usedata && (usedata.length == 1) && (usedata[0] == 'loading'))
            usedata = null
        var excess=<span className="excess">Excess</span>
        var complete=<span className="complete">Complete</span>
        var incomplete=<span className="incomplete">Incomplete</span>
        //var doctorlink=
        //<a href="/profile/D033399"><p class="ucdocname">AJIT MASHALKAR   </p></a>
        // var count=0
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
                                            <p className="manager ucdocname">{localdata["DR.Name"]} </p>
                                         </Link>
                                        //  count++
                                        //  console.log(count,"doctor name")
                }
                
            })
            // console.log("lastmonthcallavg=>",lastmonthcallavg,"thismonthcallavg=>",thismonthcallavg,"compairavgpercent=>",compairavgpercent)
         }
         
         else{
            <span className="">No data</span>
         }
        const{graphdata} = this.props
        let  lastavg
        let  curravg 
        let tcalls
        if(this.props.totalcalls){
            this.props.totalcalls.map((item) =>{
                tcalls=item.No_of_calls
            })
        }
       
        if(graphdata){ 
            
            graphdata.map( (graph)=>{
                // console.log("graph=>",graphdata)
                // if(graph["disp"]==prevMonth){
                //     lastmonthcallavg=graph["CallAverage"]; 
                //    let totallastcalls= parseInt(graph["CoredoctorVisit"]*lastmonthcallavg)
                //     lastavg = parseInt((lastmonthcallavg/tcalls)*100);console.log("no",lastavg)
                //     console.log("last",lastmonthcallavg,tcalls)
                // }
                
                // if(graph["disp"]==thisMonth){
                //     thismonthcallavg=graph["CallAverage"]
                //     let totallastcalls= parseInt(graph["CoredoctorVisit"]*thismonthcallavg)
                //     curravg = parseInt((thismonthcallavg/tcalls)*100)
                //     console.log("curr",thismonthcallavg,tcalls)
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
          
           // console.log("nan",lastavg,curravg)
          //  compairavgpercent=((thismonthcallavg - lastmonthcallavg)/lastmonthcallavg)*100
          //compairavgpercent=(lastavg - curravg)
          compairavgpercent = t.toFixed()
         }

        const{totalcalls} = this.props
        let currentYear = new Date().getFullYear();
        let years = currentYear-1
        //console.log("currentYear",currentYear-3)
        let list =[]
        for (var i= currentYear ; i > currentYear-3 ;i--) {
           list.push(i);
        } 
        return (
            <Row className="rowone">
                <Col xl={12} md={12} sm={12} xs={12} className="nopad0">
                    <div ref={this.visibilityRef} className={
                        this.state.isFull
                            ? "fullscreenView"
                            : "ucdoctorsecondrow-first"
                    }
                    >
                        <Row className="ucdocheading">
                            <Col xs={12} className="nopad3">
                                <div className="iconbar flex-row">
                                    <div className="bartitle nomar0 dashtitle">Call Average</div>
                                    <div className="flexDisplay">
                                        {this.state.displayFilter ?
                                       <YearDropDown getYearlyData={this.getYearlyData}  yearDropVal={this.props.yearDropVal} />:null}
                                        {/* {this.state.displayTableFilter ?
                                        <YearDropDown getYearlyData={this.getYearlyTableData} />:null} */}
                                    <div className="dashrighticon">
                                        {this.state.isFull ? 
                                            <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView}></img>
                                        :
                                            <img src="../public/assets/images/fullscreen.svg" onClick={this.handleView}></img>
                                        }
                                            {/* <img className="dashfullscreen" src="../public/assets/images/overflow.svg"></img> */}
                                    </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row className="nomar0">
                                <Col xl={12} md={12} sm={12} xs={12} className="nopad0">
                                    <div className="custom-height">
                                    <Tab.Content className="tabrow">
                                        <CallAverageGraph graphdata={graphdata} totalcalls={totalcalls}/>
                                    </Tab.Content>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="second">
                                            {usedata || usedata != undefined  ?
                                            <DashboardMrCustomTable
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
                                    </div>
                                </Col>
                                <Col xl={12} md={12} sm={12} xs={12} className="nopad0 topbordertab">
                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                        <li className={this.state.activeTab == 1 ?  'nav-item elementcontainer callavg_activelinkcall' :  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('1'); }}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="first" className="linkcontainer">
                                                    <p className="dashtabhead">Monthly View</p>
                                                    <p  className="dashtabsubhead"> {compairavgpercent}% Vs Last Month</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </li>
                                        <li className={this.state.activeTab == 2 ?  'nav-item elementcontainer callavg_activelinkcall':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('2'); }}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second" className="linkcontainer">
                                                    <p className="dashtabhead">Doctor Call Table</p>
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
export default CallAverage