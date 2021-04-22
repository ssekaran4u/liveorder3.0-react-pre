import React, { Component } from 'react'
import { Row, Col, Tab, Nav, Accordion, Card, Button, Dropdown, DropdownItem } from 'react-bootstrap'
import DashLoader from "../../lib/DashboardLoader";

class ManagerLeaderBoard extends Component {
    constructor() {
        super();
        this.state = {
            isFull: false,
            activeTab: "1",
            clickplus: true,
            selectedMonthName:'',
            selectedMonthCode:'',
        };
        this.handleView = this.handleView.bind(this);
        this.addclass = this.addclass.bind(this);
        this.handleplus = this.handleplus.bind(this);
        this.handleScroll = this.handleScroll.bind(this)
        this.visibilityRef = React.createRef()
        this.getMonthDetail = this.getMonthDetail.bind(this)
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
    getMonthDetail(code,name){
        // console.log(code,"<-code",name,"<-name month")
        this.setState({
            selectedMonthName:name,
            selectedMonthCode:code
        })
        this.props.updateleaderboard(code)
    }
    // componentDidUpdate(olsprops,oldstate){
    //     if(oldstate.selectedMonthCode != this.state.selectedMonthCode){
    //     this.props.forfilter(this.state.selectedMonthCode,'')
    //     }
    //  }
    // selectmonth(event) {
    //     this.setState({
    //         selectedmonth: event.target.innerText
    //     })
    //     this.props.updateleaderboard(event.target.id)
    // }
    handleScroll() {
        const { data } = this.props
        if (data && (data.length > 0))
            return
        const el = this.visibilityRef.current
        if(el != null){
        const bounds = el.getBoundingClientRect();
        if ((bounds.top < 0) || (bounds.bottom < window.screen.height)) {
            if(this.props.leaderBoardCall == false)
            this.props.getLeaderBoardDataLazy && this.props.getLeaderBoardDataLazy()
        }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var now = new Date();
        var thisMonth = months[now.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
        const { month_list } = this.props
        if(month_list){
            // console.log(month_list,"monthlist")
        }
        const { data } = this.props
        let usedata = null
        if (data) {
            usedata = [...data]
        }
        if (usedata && (usedata.length == 1) && (usedata[0] == 'loading'))
            usedata = null
        return (
            <Row className="rowone">
                <Col xl={12} md={12} sm={12} xs={12} className="nopad0">
                    <div
                        ref={this.visibilityRef}
                        className={this.state.isFull ? "fullscreenView" : "ucdoctorsecondrow-first"}
                    >
                        <div className="manager_component_head flex-row">
                            <div className="manager_mainhead">
                                <div className="mainhead_content_one bartitle">
                                    Leader Board
                                </div>
                            </div>
                            {/* <div className="mainhead_content_two">
                                <img src="../public/assets/images/manage_refresh.svg"></img>
                            </div> */}
                            <div className="flexDisplay">

                                {/* <div className="manager_callaverage_filter">
                                    <Dropdown>
                                        <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                            <span className="">Lowest Call Avg.</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                                            <div className="month-padding columns-height cal-scrollbar">
                                                <DropdownItem className="manager_sales_filter_month">100</DropdownItem>
                                                <DropdownItem className="manager_sales_filter_month">200</DropdownItem>
                                                <DropdownItem className="manager_sales_filter_month">300</DropdownItem>
                                                <DropdownItem className="manager_sales_filter_month">400</DropdownItem>
                                                <DropdownItem className="manager_sales_filter_month">500</DropdownItem>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div> */}
                                {/* <div className="manager_callaverage_filter">
                                    <Dropdown>
                                        <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                            <span className="">General Manager</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                                            <div className="month-padding columns-height cal-scrollbar">
                                                <DropdownItem className="manager_sales_filter_month">General Manager</DropdownItem>
                                                <DropdownItem className="manager_sales_filter_month">National Manager</DropdownItem>
                                                <DropdownItem className="manager_sales_filter_month">Zonal Manager</DropdownItem>
                                                <DropdownItem className="manager_sales_filter_month">Regional Manager</DropdownItem>
                                                <DropdownItem className="manager_sales_filter_month">Area Manager</DropdownItem>
                                                <DropdownItem className="manager_sales_filter_month">Medical Rep. </DropdownItem>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div> */}
                                <div className="manager_callaverage_filter">
                                    <Dropdown>
                                        <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                            <span className="">{this.state.selectedMonthName ? this.state.selectedMonthName :thisMonth}</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                                            <div className="month-padding columns-height cal-scrollbar">
                                            {month_list && month_list != undefined ?
                                                month_list.map((localdata,index)=>(
                                                <DropdownItem 
                                                key={index}
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
                                <Col xl={12} md={12} sm={12} xs={12} className="nopad0 lastmargin">
                                    <Tab.Content className="tabrow listcontainer">
                                        <Tab.Pane eventKey="first" className="rmoveborder">
                                            <div className="listcontainer listOverflow">
                                                {usedata && usedata != undefined ? usedata == "" ? <div className="nodataMsg">No Data Available</div> :
                                                    usedata.map((localdata, index) => (
                                                        <div className="manager_leaderboard_accor_cardholder" key={index}>
                                                            <div className="manager-leaderboard_left-containet">
                                                                <div className="manager-avatar-container">
                                                                    {this.state.displayImage ?
                                                                        <img className="manager-avatar-image img-fluid" src="../public/assets/images/manager_avatar.png"></img>
                                                                        :
                                                                        <div className="uncoverednametext">{localdata.C_Name.charAt(0)}</div>
                                                                    }
                                                                </div>
                                                                <div className="managerpadl1em manager-seconday_left-containet_info">
                                                                    <p className="manager-seconday_left-containet_name">{localdata.C_Name}</p>
                                                                    <p className="manager-seconday_left-containet_area">{localdata.desiganation}, <span className="manager-seconday_left-containet_subarea">{localdata.area}</span></p>
                                                                </div>
                                                            </div>
                                                            <div className="manager-leaderboard_right-containet">
                                                                <div className="leaderboard_right-containet-primary">
                                                                    <p className="ranking">RANKING</p>
                                                                    <p className="rank">{localdata.ranking} </p>
                                                                </div>
                                                                <div className="leaderboard_right-containet-primary">
                                                                    <p className="ranking">TOTAL SALES (In INR)</p>
                                                                    <p className="scoresale">{localdata.sec}</p>
                                                                </div>
                                                                <div className="leaderboard_right-containet-primary">
                                                                    <p className="ranking">SCORE </p>
                                                                    <p className="scoresale">{localdata.score} </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                    :
                                                    <DashLoader></DashLoader>
                                                }
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                                <Col xl={12} md={12} sm={12} xs={12} className="nopad0 topbordertab">
                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                        <li className={this.state.activeTab == 1 ? 'nav-item elementcontainer activelink' : 'nav-item elementcontainer'} onClick={() => { this.addclass('1'); }}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="first" className="linkcontainer">
                                                    <p className="dashtabhead">Sales Wise</p>
                                                    <p className="dashtabsubhead"> Current Month</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </li>
                                        {/* <li className={this.state.activeTab == 2 ?  'nav-item elementcontainer activelink':  'nav-item elementcontainer' } onClick={() => { this.addclass('2'); }}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second" className="linkcontainer">
                                                    <p className="dashtabhead">Marks By Manager</p>
                                                    <p  className="dashtabsubhead"><span>+</span> 25% Vs Last Month</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </li>
                                        <li className="nav-item elementcontainer">
                                            <Nav.Item>
                                                <Nav.Link eventKey="second" className="linkcontainer">
                                                    <p className="dashtabhead">Based On LMS</p>
                                                    <p  className="dashtabsubhead"><span>+</span> 25% Vs Last Month</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </li>
                                        <li className="nav-item elementcontainer">
                                            <Nav.Item>
                                                <Nav.Link eventKey="second" className="linkcontainer">
                                                    <p className="dashtabhead">Doctor Coverage</p>
                                                    <p  className="dashtabsubhead"><span>+</span> 25% Vs Last Month</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </li>
                                        <li className="nav-item elementcontainer">
                                            <Nav.Item>
                                                <Nav.Link eventKey="second" className="linkcontainer">
                                                    <p className="dashtabhead">Work Report</p>
                                                    <p  className="dashtabsubhead"><span>+</span> 25% Vs Last Month</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </li> */}
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
export default ManagerLeaderBoard
