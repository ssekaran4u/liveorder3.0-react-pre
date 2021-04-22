import React, { Component } from 'react'
import { Row, Col, Dropdown, DropdownItem, Tab, Nav, Table, Accordion, Card } from 'react-bootstrap'

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
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles, Example } from "react-circular-progressbar";

import WorkOverviewCard from './WorkOverviewCard'
import CustomTooltipWorkOverview from './CustomTooltipWorkOverview'
import DashLoader from "../../lib/DashboardLoader";
class WorkOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            activeTab: "1",
            showchatbox: false,
            clickplus: true,
            selectedmonth:'',
            selectedmonthcode:''
        };
        this.handleView = this.handleView.bind(this);
        this.addclass = this.addclass.bind(this);
        this.showchatbox = this.showchatbox.bind(this);
        this.handleplus = this.handleplus.bind(this);
        this.getMonthDetail = this.getMonthDetail.bind(this);
        this.workOverviewChildMiddle = this.workOverviewChildMiddle.bind(this);
        this.visibilityRef = React.createRef()
    }
    /* component full screen view function in clild component*/
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
    /* Adding class for active tab in nav pills in clild components*/
    addclass(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    /*handle open and close accordian plus and minus image*/
    handleplus() {
        this.setState({
            clickplus: !this.state.clickplus
        })
    }
    /*Show and hide chatbox*/
    showchatbox() {
        this.setState({
            showchatbox: !this.state.showchatbox
        });
    }
    getMonthDetail(data,name){
        // this.props.updatMy_workdetais(data)
        this.props.getWorkDetailsMonthly(data,'')
        this.setState({
            selectedmonth:name,
            selectedmonthcode:data
        })
    }
    workOverviewChildMiddle(data, month){
        month = this.state.selectedmonthcode
        this.props.workOverviewChild(data, month)
    }
    // handleScroll() {
    //     //alert("ok")
    //     if (this.props.data > 0)
    //         return
    //     const el = this.visibilityRef.current
    //     const bounds = el.getBoundingClientRect();
    //     if ((bounds.top < 0) || (bounds.bottom < window.screen.height)) {
    //         this.props.getLeaderBoardDataLazy && this.props.getLeaderBoardDataLazy()
    //     }
    // }

    // componentDidMount() {
    //     window.addEventListener('scroll', this.handleScroll, true);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll);
    // }
    render() { 
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var now = new Date();
        var thisMonth = months[now.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
        var percentage = ''
        const { my_work_detail } = this.props
        const { teamwork_detail } = this.props
        const { month_list } = this.props
        if (my_work_detail && my_work_detail != undefined) {
            percentage = my_work_detail[0].workedPercentage;
        }
        console.log("work",my_work_detail)

        const { nonperforming } = this.props
        const { data } = this.props
        return (
            <Row className="">
                <Col xl={6} md={6} sm={12} xs={12} className="paddr10">
                    <div ref={this.visibilityRef} className={this.state.isFull ? "fullscreenView" : "ucdoctorsecondrow-first small-component"}>
                        <div className="manager_component_head">
                            <div className="manager_mainhead">
                                <div className="mainhead_content_one bartitle">
                                    Work Overview
                            </div>
                                <div className="mainhead_content_two">
                                    <div className="manager_sales_filter">
                                        <Dropdown>
                                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                                <span>{this.state.selectedmonth ? this.state.selectedmonth : thisMonth}</span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                                                <div className="month-padding columns-height cal-scrollbar">
                                                    {month_list && month_list != undefined ?
                                                        month_list.map((localdata,index) => (
                                                            <DropdownItem 
                                                                key={index}
                                                                onClick={() => this.getMonthDetail(localdata["Code"], localdata["Name"])} 
                                                                className="manager_sales_filter_month" >{localdata['Name']}
                                                            </DropdownItem>
                                                        ))
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div className="manager_component_head_icon">
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
                        <div className="">
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row className="nomar0">
                                    <Col xl={12} md={12} sm={12} xs={12} className="nopad0 manager_workoverview_containerheight">
                                        <Tab.Content className="tabrow">
                                            <Tab.Pane eventKey="first">
                                                {my_work_detail && my_work_detail != undefined ?
                                                    <div>
                                                        <div className="manager_subheading_workoverview">
                                                            <div className="workoverview_claimpersentage">
                                                                {/* <img className="downimage" src="../public/assets/images/Arrow_dashboard.svg"></img> */}
                                                                <span className="workoverview_claimpersentage_value">{(my_work_detail[0].workedPercentage - my_work_detail[0].last_workedPercentage).toFixed(2)}% </span>Vs Last Month
                                                    </div>
                                                            <div className="workoverview_workingdays">
                                                                <p>{my_work_detail[0].workedDays}/{my_work_detail[0].TotalWorkingDays} WORKING DAYS</p>
                                                            </div>
                                                        </div>
                                                        <div className="piechart_container">
                                                            <div className="manager_leastfocus_graph">
                                                                <CircularProgressbar
                                                                    value={percentage ? percentage : 0}
                                                                    text={percentage ? `${percentage}%` :0}
                                                                    strokeWidth={5}
                                                                />
                                                                <div className="piebelow_text">Working Days</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <DashLoader></DashLoader>
                                                }
                                            </Tab.Pane>
                                        </Tab.Content>
                                        <Tab.Content className="">
                                            <Tab.Pane eventKey="second">
                                                <div style={{ width: "100%", height: 300 }}>
                                                {!teamwork_detail ?
                                                    <DashLoader></DashLoader>
                                                    :
                                                    <ResponsiveContainer>
                                                        <ComposedChart
                                                            width={500}
                                                            height={300}
                                                            data={teamwork_detail}
                                                        >
                                                            <CartesianGrid
                                                                stroke="#adafb121"
                                                                strokeDasharray="3 3"
                                                            />
                                                            <XAxis dataKey="NAME" />
                                                            <YAxis domain={[0, 30]} />
                                                            <Tooltip content={<CustomTooltipWorkOverview />} />
                                                            <Legend />
                                                            <Line
                                                                dataKey="Work_Average"
                                                                stroke="#ff7300"
                                                                strokeWidth={3}
                                                                activeDot={{ r: 3 }}
                                                            />
                                                        </ComposedChart>
                                                    </ResponsiveContainer>
                                                }
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                        <Tab.Content className="">
                                            <Tab.Pane eventKey="third">
                                                <div className="border-container">
                                                    <div className="managerdash_hierarchical_container">
                                                        <WorkOverviewCard
                                                            data={data}
                                                            workOverviewChild={this.workOverviewChildMiddle}
                                                        />
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                    <Col xl={12} md={12} sm={12} xs={12} className="nopad0 topbordertab">
                                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                            <li className={this.state.activeTab == 1 ? 'nav-item elementcontainer workoverview-border' : 'nav-item elementcontainer activelink2'} onClick={() => { this.addclass('1'); }}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first" className="linkcontainer">
                                                        <p className="dashtabhead">My Details</p>
                                                        <p className="dashtabsubhead">{my_work_detail && my_work_detail != undefined ?( my_work_detail[0].workedPercentage - my_work_detail[0].last_workedPercentage).toFixed(2) : null}% Vs Last Month</p>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </li>
                                            <li className={this.state.activeTab == 2 ? 'nav-item elementcontainer workoverview-border' : 'nav-item elementcontainer activelink2'} onClick={() => { this.addclass('2'); }}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second" className="linkcontainer">
                                                        <p className="dashtabhead">Team Work</p>
                                                        <p className="dashtabsubhead"> Current Month</p>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </li>
                                            <li className={this.state.activeTab == 3 ? 'nav-item elementcontainer workoverview-border' : 'nav-item elementcontainer activelink2'} onClick={() => { this.addclass('3'); }}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="third" className="linkcontainer">
                                                        <p className="dashtabhead">Downline</p>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>
                    </div>
                </Col>
                {/* <Col xl={6} md={6} sm={12} xs={12} className="paddl10">
                    <div className={this.state.isFull ? "fullscreenView" : "ucdoctorsecondrow-first small-component"}>
                        <div className="manager_component_head">
                            <div className="manager_mainhead">
                                <div className="mainhead_content_one bartitle">
                                    Non Performing Products
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
                                    <img
                                        className="dashfullscreen"
                                        src="../public/assets/images/overflow.svg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="below-head-content">
                            <div className="table-responsive">
                                <Table className="dashtable table">
                                    <thead className="dashtableheadrow">
                                        <tr className="dashtableheadrow">
                                            <th className="dashtablehead">SR. NO.</th>
                                            <th className="dashtablehead">BRAND NAME</th>
                                            <th className="dashtablehead">SALES (In INR)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {nonperforming && nonperforming != undefined ? 
                                            nonperforming.map((leastdata,index)=>(
                                        <tr className="dashtableheadlist" key={index}>
                                            <td className="brandname">{leastdata.slno}</td>
                                            <td className="brandname">{leastdata.item}</td>
                                            <td className="brandname">{leastdata.sales}</td>
                                        </tr>
                                        ))
                                        : 
                                        <tr className="dashtableheadlist">
                                            <td className="brandname" colSpan="3">No Data Found</td>
                                        </tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </Col> */}
            </Row>
        )
    }
}
export default WorkOverview