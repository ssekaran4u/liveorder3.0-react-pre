import React, { Component } from 'react'
import { Row, Col, Tab, Nav, Accordion, Card, Button, Dropdown, DropdownItem } from 'react-bootstrap'
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
import CustomTooltip from "../../dashboard/components/CustomTooltip";
import ManagerSecondarySalesAccor from './ManagerSecondarySalesAccor'
import YearDropDown from '../../lib/YearDropDown'
import SecondarySalesCards from './SecondarySalesCard'
import DashLoader from "../../lib/DashboardLoader";
class ManagerSecondrySales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            activeTab: "1",
            selectedmonth: '',
            selectedmonthcode: '',
            selectedYear:'',
            displayFilter:true,
            displayReportFilter:false,
            selectedReportYear:''
            // clickplus:true
        };
        this.handleView = this.handleView.bind(this);
        this.addclass = this.addclass.bind(this);
        this.getMonthDetail = this.getMonthDetail.bind(this);
        this.monthnextchildsecondarysales = this.monthnextchildsecondarysales.bind(this);
        this.getYearlyData = this.getYearlyData.bind(this)
        this.getYearlyReportData = this.getYearlyReportData.bind(this)
        this.handleScroll= this.handleScroll.bind(this)
        this.visibilityRef = React.createRef()
    }
    handleScroll() { 
        const { data } = this.props
        if (data && (data.length > 0))
            return
        const el = this.visibilityRef.current
        if(el != null){ 
        const bounds = el.getBoundingClientRect();
        if ((bounds.top < 0 ) || (bounds.bottom < window.screen.height)) {
            if(this.props.secondryCall == false){ 
                this.props.getSecondryGraph && this.props.getSecondryGraph()
            }
        } 
        }
    }
    componentDidMount(){
        this.setState({
            firstmonth:this.props.defaultMonth
        })
        window.addEventListener('scroll', this.handleScroll, true);
    }
    componentWillUnmount() {
       // window.removeEventListener('scroll', this.handleScroll);
    }
    
    /* component full screen view function in clild component*/
    handleView() {
        this.setState({
            isFull: !this.state.isFull,
            selectedYear:[]
        });
    }
    /* Adding class for active tab in nav pills in clild components*/
    addclass(tab) {
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
                displayReportFilter:true
            })
        }else{
            this.setState({
                displayReportFilter:false
            })
        }
    }
   
    getMonthDetail(data, name) {
        let year
        if(this.state.selectedReportYear == ""){
            year = new Date().getFullYear()
        }else{
            year = this.state.selectedReportYear
        }
        //console.log("lion",year)
        this.props.getTeamSalesReportMonthly(data,'',year)
        this.setState({
            selectedmonth: name,
            selectedmonthcode: data
        })
    }
     /*handle open and close accordian plus and minus image*/
    monthnextchildsecondarysales(data, month) {
        // console.log(this.state.selectedmonthcode,"secondary")
        let thismonth = new Date().getMonth()+1
        let year
        if(this.state.selectedYear == ""){
            year = new Date().getFullYear()
        }else{
            year = this.state.selectedYear
        }
       
        month = this.state.selectedmonthcode ? this.state.selectedmonthcode : thismonth.toString()
        
        this.props.nextchildsecondarysales(data, month,year)
    }
    getYearlyData(year){
        this.setState({
            selectedYear:year
        })
        this.props.yearWiseData(year)
    }
    getYearlyReportData(year){
        this.setState({
            selectedReportYear:year
        })
        let month
        if(this.state.selectedmonthcode == ""){
            month = "01"
        }else{
            month = this.state.selectedmonthcode
        }
        this.props.yearWiseReportData('',month,year)
    }
    
    render() { 
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var now = new Date();
        var thisMonth = months[now.getMonth()];
        const { month_list } = this.props
        const { secsales } = this.props
        //console.log(secsales,"2nd level")
        var shortmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var shortnow = new Date();
        var shortthisMonth = shortmonths[shortnow.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
        //alert(thisMonth);
        var shortprevMonth = shortmonths[shortnow.getMonth() - 1];
        var lastmonthsecsale = 0
        var thismonthsecsale = 0
        var compairsecsalest = 0
        const { secondarygraph } = this.props
        let td = []
        let tempmax = []
        let minmax = [0,]
        let list =[]
        let years
        // console.log(data,"sssssuuummeettt")
        let currentYear = new Date().getFullYear();
            years = currentYear-1
            for (var i= currentYear ; i > currentYear-3 ;i--) {
            list.push(i);
            }
        if (secondarygraph) {
            td = secondarygraph.map((localdata) => {

                /*Conevrting target,primary,secondary data to roundup value*/
                var round_target = Math.round(localdata["targetdata"]);
                var round_primary = Math.round(localdata["primarydata"]);
                var round_secondary = Math.round(localdata["secdata"]);
                let d = { ...localdata }
                if (round_target > 1 || round_target < 1) {
                    var convert_target = (round_target / 100000);
                    var convert_target_twodigit = convert_target.toFixed(2);
                    d.targetdata = convert_target_twodigit;
                }
                else {

                }
                if (round_primary > 1 || round_primary < 1) {
                    var convert_primary = (round_primary / 100000);
                    var convert_primary_twodigit = convert_primary.toFixed(2);
                    d.primarydata = convert_primary_twodigit;

                }
                else {

                }
                if (round_secondary > 1 || round_secondary < 1) {
                    // console.log(shortthisMonth)
                    var convert_secondary = (round_secondary / 100000);
                    var convert_secondary_twodigit = convert_secondary.toFixed(2);
                    d.secdata = convert_secondary_twodigit;
                    
                }
                else {

                }
                if (d.disp == shortthisMonth) {

                    thismonthsecsale = d.secdata
                    // console.log(thismonthsecsale,"thismonthsecsale")
                }
                if (d.disp == shortprevMonth) {
                    lastmonthsecsale = d.secdata
                    // console.log(thismonthsecsale,"thismonthsecsale")
                }
                return d

            })
            // console.log(td,lastmonthsecsale,thismonthsecsale,compairsecsalest,"ssdsds")
            var maxtarget = Math.max.apply(null,
                Object.keys(td).map(function (e) {
                    return td[e]['targetdata'];
                }));
            var maxprimary = Math.max.apply(null,
                Object.keys(td).map(function (e) {
                    return td[e]['primarydata'];
                }));
            var maxsecdata = Math.max.apply(null,
                Object.keys(td).map(function (e) {
                    return td[e]['secdata'];
                }));
            tempmax.push(Number(maxtarget))
            tempmax.push(Number(maxprimary))
            tempmax.push(Number(maxsecdata))

            var finalmax = Math.max.apply(null, tempmax);
            var roundfinalmax = Math.round((finalmax / 10) * 10)
            if(roundfinalmax == 0){
                minmax.push(1)
            }else{
                minmax.push(Number(roundfinalmax))
            }
            
            if(lastmonthsecsale != 0){
                compairsecsalest = Math.round(((thismonthsecsale - lastmonthsecsale) / lastmonthsecsale) * 100)
            }
            else if(lastmonthsecsale == 0 && thismonthsecsale == 0){
                compairsecsalest=0
            }
            else{
                compairsecsalest=100
            }
        }
        else {
            <span>No Data Found </span>
        }
       // let currMonth = new Date().getMonth()+1
        //console.log("minmax",roundfinalmax)
        return (
            <Row className="rowone">
                <Col xl={12} md={12} sm={12} xs={12} className="nopad0">
                    <div ref={this.visibilityRef}
                        className={this.state.isFull ? "fullscreenView" : "ucdoctorsecondrow-first"}
                    >
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row className="nomar0">
                                <Col xl={12} md={12} sm={12} xs={12} className="nopad0 manager_custom-height">
                                    <Tab.Content className="tabrow">
                                        <Tab.Pane eventKey="first">
                                            <div className="manager_component_head">
                                                <div className="manager_mainhead ">
                                                    <div className="mainhead_content_one bartitle">
                                                        Sales & Target Report <span className="smallheading">(In Lakh)</span>
                                                    </div>
                                                    <div className="yearDiv flexDisplay">
                                                    <div className="mainhead_content_two mar">
                                                        <div className="indication2 responsemargin">
                                                            <div className="yellowcircle" />Sec.
                                                            Sales
                                                        </div>
                                                        <div className="indication3">
                                                            <div className="bluecircledash" />
                                                            Primary Sales
                                                        </div>
                                                        <div className="indication3">
                                                            <div className="lightbluecircledash" />
                                                            Primary Target
                                                        </div>
                                                    </div>
                                                    {this.state.displayFilter ?
                                                    <YearDropDown getYearlyData={this.getYearlyData} yearDropVal={this.props.salesYear} />:null}
                                                    </div>
                                                </div>
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
                                            <div className="managergraph_container">
                                                <div style={{ width: "100%", height: 300 }}>
                                                    {td =='' ?

                                                        <DashLoader></DashLoader>
                                                        :
                                                        td.length == 0 ? 
                                                        <DashLoader></DashLoader>: 
                                                        <ResponsiveContainer>
                                                            <ComposedChart
                                                                style={{ "padding": "10px 5px 7px 25px" }}
                                                                width={500}
                                                                height={400}
                                                                data={td}
                                                            >
                                                                <CartesianGrid
                                                                    stroke="#adafb121"
                                                                    strokeDasharray="3 3"
                                                                />
                                                                <XAxis dataKey="disp" />
                                                                <YAxis domain={minmax } />
                                                                <Tooltip content={<CustomTooltip />} />
                                                                <Legend />
                                                                <Area
                                                                    className="backwave"
                                                                    type="monotone"
                                                                    dataKey="primarydata"
                                                                    fill="rgba(27, 132, 231,0.5)"
                                                                    stroke="none"
                                                                />
                                                                <Bar
                                                                    dataKey="targetdata"
                                                                    barSize={10}
                                                                    fill="#1b84e7"
                                                                    className="barg"
                                                                    radius={[10, 10, 0, 0]}
                                                                />
                                                                <Bar
                                                                    dataKey="primarydata"
                                                                    barSize={10}
                                                                    fill="#1b84e7"
                                                                    radius={[10, 10, 0, 0]}
                                                                    margin={{ top: 0, right: 0, bottom: 0, left: 10 }}
                                                                />

                                                                <Line

                                                                    dataKey="secdata"
                                                                    stroke="#ff7300"
                                                                    strokeWidth={3}
                                                                    activeDot={{ r: 3 }}
                                                                />
                                                            </ComposedChart>
                                                        </ResponsiveContainer>
                                                    }
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                    <Tab.Content className="">
                                        <Tab.Pane eventKey="second">
                                            <div className="manager_component_head">
                                                <div className="manager_mainhead">
                                                    <div className="mainhead_content_one bartitle">
                                                        Sales Representative Report
                                                    </div>
                                                    <div className="mainhead_content_two flexDisplay">
                                                        <div className="manager_sales_filter userMonthDrop">
                                                            <Dropdown>
                                                                <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                                                    {/* <span>{this.state.selectedmonth ? this.state.selectedmonth : this.props.defaultMonth }</span> */}
                                                                    <span>{this.state.selectedmonth ? this.state.selectedmonth : thisMonth }</span>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                                                                    <div className="month-padding columns-height cal-scrollbar">
                                                                        {month_list && month_list != undefined ?
                                                                            month_list.map((localdata,index) => (
                                                                                <DropdownItem key={index} onClick={() => this.getMonthDetail(localdata["Code"], localdata["Name"])} className="manager_sales_filter_month" >{localdata['Name']}</DropdownItem>
                                                                            ))
                                                                            :
                                                                            null
                                                                        }
                                                                    </div>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                        {/* {this.state.displayReportFilter ? 
                                                        <div className="manager_callaverage_filter mrYearDrop">
                                                        <Dropdown>
                                                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                                                <span className="">{this.state.selectedReportYear ? this.state.selectedReportYear : currentYear}</span>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                                                                <div className="month-padding columns-height cal-scrollbar ">
                                                                
                                                                    {list.map((item) => (
                                                                        <DropdownItem className="manager_sales_filter_month" onClick={() => this.getYearlyReportData(item)}>{item}</DropdownItem>
                                                                    ))}
                                                                </div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>:null} */}
                                                    {this.state.displayReportFilter ? <YearDropDown getYearlyData={this.getYearlyReportData} yearDropVal={this.props.teamYearData}/>:null}
                                                    </div>
                                                </div>
                                                <div className="manager_component_head_icon">
                                                    <div className="manager_translateimage">
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
                                            <div className="managerdash_maincomponent_contrainer">
                                                <ManagerSecondarySalesAccor
                                                    data={secsales}
                                                    monthnextchildsecondarysales={this.monthnextchildsecondarysales}
                                                />
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                                <Col xl={12} md={12} sm={12} xs={12} className="nopad0 topbordertab">
                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                        <li className={this.state.activeTab == 1 ? 'nav-item elementcontainer activelinkcall' : 'nav-item elementcontainer activelink2'} onClick={() => { this.addclass('1'); }}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="first" className="linkcontainer">
                                                    <p className="dashtabhead">Overall View with downline</p>
                                                    <p className="dashtabsubhead">{compairsecsalest}% Vs Last Month</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </li>
                                        <li className={this.state.activeTab == 2 ? 'nav-item elementcontainer activelinkcall' : 'nav-item elementcontainer activelink2'} onClick={() => { this.addclass('2'); }}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second" className="linkcontainer">
                                                    <p className="dashtabhead">Team Sales Report</p>
                                                    <p className="dashtabsubhead"> Current Month</p>
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
export default ManagerSecondrySales