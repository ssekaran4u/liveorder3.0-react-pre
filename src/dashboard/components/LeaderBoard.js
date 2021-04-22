import React, { Component } from 'react'
import {Row,Col,Nav,Tab,Table,Dropdown,DropdownItem} from 'react-bootstrap'

class LeaderBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFull: false,
            activeTab: '1',
            displayImage:false,
            selectedmonth:'Monthly'
        };
        this.handleView = this.handleView.bind(this)
        this.addclass = this.addclass.bind(this)
        this.selectmonth = this.selectmonth.bind(this)
    }
    /* component full screen view function onClick={() => { this.addclass('1'); }}*/
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
    }

    selectmonth(event){
        this.setState({
            selectedmonth:event.target.innerText
        })
        this.props.updateleaderboard(event.target.id)
    }

    render() {
        const {data} =this.props
        //console.log(data,"leaderboard view")
        return (
            <Row className={this.state.isFull ? "fullscreenView" : ""}>
                    <Col xl={12} md={12} sm={12} xs={12}>
                        <div className="ucdoctorsecondrow-first">
                            <Row className="ucdocheading">
                                <div className="nopad3 component_heading">
                                    <div className="iconbar">
                                        <div className="bartitle nomar0 dashtitle">Leader Board</div>
                                        {/* <Dropdown onChange={this.props.selecteddateleaderboard} >
                                            <Dropdown.Toggle className="dcr-options filter" id="dropdown-basic">
                                                <span>{this.state.selectedmonth}</span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                                                <div   className="month-padding columns-height cal-scrollbar">
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="1">Jan</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="2">Feb</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="3">Mar</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="4">Apr</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="5">May</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="6">Jun</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="7">Jul</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="8">Aug</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="9">Sep</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="10">Oct</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="11">Nov</DropdownItem>
                                                    <DropdownItem className="manager_sales_filter_month" onClick={this.selectmonth} id="12">Dec</DropdownItem>
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                        {/* <div className="filter"> </div> */}
                                    </div>
                                </div>
                                <div className="iconbar">
                                        <div className="dashrighticon">
                                            {this.state.isFull ? 
                                                <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView}></img>
                                            :
                                                <img src="../public/assets/images/fullscreen.svg" onClick={this.handleView}></img>
                                            }
                                                <img className="dashfullscreen" src="../public/assets/images/overflow.svg"></img>
                                        </div>
                                </div>
                            </Row>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row className="nomar0">
                                    <Col xl={12} md={12} sm={12} xs={12} className="nopad0 lastmargin">
                                        <Tab.Content className="tabrow listcontainer">
                                            <Tab.Pane eventKey="first" className="rmoveborder">
                                            <div className="table-responsive">
                                                <Table className="uncover_table">
                                                    <tbody>
                                                    {data && data!=undefined ?
                                                        data.map((localdata,index)=>(
                                                            <tr className="uncovered_tablerow" key={index}>
                                                            <td className="uncovered_tabledata_image">
                                                            { this.state.displayImage ?
                                                                <div className="scoreboard">
                                                                    <img className="scoreboardimage" src="../public/assets/images/ucdoctor.jpg"></img>
                                                                    <img className="medal" src="../public/assets/images/crown.png"></img>
                                                                </div>
                                                                :
                                                                <div className="scoreboard">
                                                                    <div className="uncoverednametext">{localdata.C_Name.charAt(0)}</div>
                                                                </div>
                                                                
                                                            }
                                                            </td>
                                                            <td className="uncovered_tabledata_name">
                                                                <div className="scoreboardname nopad2">
                                                                    <p className="ucdocname">{localdata.C_Name} </p>
                                                                    <p className="ucdocarea">{localdata.desiganation}, {localdata.area}</p>
                                                                </div>
                                                            </td>
                                                            <td className="uncovered_tabledata_replan leaderboard">
                                                                <div className="nopad2">
                                                                    <p className="ranking">RANKING</p>
                                                                    <p className="rank">{localdata.ranking}</p>
                                                                </div>
                                                            </td>
                                                            <td className="uncovered_tabledata_replan leaderboard">
                                                                <div className="nopad2">
                                                                    <p className="ranking">TOTAL SALES (In INR)</p>
                                                                    <p className="scoresale">{localdata.sec}</p>
                                                                </div>
                                                            </td>
                                                            <td className="uncovered_tabledata_replan">
                                                                <div className="nopad2">
                                                                    <p className="ranking">SCORE</p>
                                                                    <p className="scoresale">{localdata.score}</p>
                                                                </div>
                                                            </td>
                                                        </tr>       
                                                        ))
                                                        :
                                                        <tr>
                                                            <td colspan="5">No One Is Leader In This Month</td>
                                                        </tr>
                                                    }
                                                    </tbody>
                                                </Table>
                                            </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                        <Tab.Content className="tabrow listcontainer">
                                            <Tab.Pane eventKey="second">
                                                
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                    <Col xl={12} md={12} sm={12} xs={12} className="nopad0 topbordertab">
                                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                            <li className={this.state.activeTab == 1 ?  'nav-item elementcontainer activelink' :  'nav-item elementcontainer' } onClick={() => { this.addclass('1'); }}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first" className="linkcontainer">
                                                        <p className="dashtabhead">Sales Wise</p>
                                                        <p  className="dashtabsubhead"><span>+</span> 15% Vs Last Month</p>
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

export default LeaderBoard