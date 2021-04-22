import React, { Component } from 'react';
import {Row,Col,Dropdown,Tab,Nav} from 'react-bootstrap';
import { CircularProgressbar,CircularProgressbarWithChildren,buildStyles,Example } from "react-circular-progressbar";
import DistributorClaimList from './DistributorClaimList';
import DistributorCoverageDetailList from './DistributorCoverageDetailList';
import { connect } from 'react-redux';

class DistributorCoverage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFull: false,
            activeTab:1
        }
        this.addclass = this.addclass.bind(this)
        this.handleView = this.handleView.bind(this)
    }
    addclass(tab){
        if(this.state.activeTab != tab){
            this.setState({
                activeTab:tab
            })
        } 
    }
    handleView(){
        this.setState({
            isFull: !this.state.isFull
        });  
    }
    render() {
        const percentage = 60;
        const months = this.props.months;
        return (
             <React.Fragment>
                 <Row className="pullDistributor">
                    <Col xl={4}>
                        <div className="distributorCoverage">
                        <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
                            <div >
                                
                                {this.state.activeTab == 1 ? 
                                <div className="distributorBlock">
                                    <div className="flex-row ">
                                    <div className="mainhead_content_one bartitle">Distributor Coverage</div>
                                    <div className="flexDisplay disCovred">
                                        <div className="unlockmenu invenMonth">
                                            <Dropdown>
                                                    <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                                        <div className="distrubutorFilter">
                                                            <span className="unloackStatusText">August</span>
                                                        </div>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>    
                                                            <Dropdown.Item href="#/action-1" >
                                                                <div className="statusdropmenu" >
                                                                    {months!=undefined && months.length>0?months.map((months)=>(
                                                                    <div className="pipelinePad" key={months.Code}>{months.Name}</div>
                                                                    )):null}
                                                                </div>
                                                            </Dropdown.Item>
                                                    </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className="admin_component_head_icon">
                                            <div className="headicon_position">
                                                {this.state.isFull ? (
                                                    <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView} />
                                                ) : (
                                                    <img src="../public/assets/images/fullscreen.svg" onClick={this.handleView} />
                                                )}
                                                <img
                                                    className="dashfullscreen"
                                                    src="../public/assets/images/overflow.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-row lastMonthTitle">
                                    <div className="mainhead_content_one bartitle">
                                        <p className="kcovragelabel"><span className="s1">12%</span> Vs Last Month</p>
                                    </div>
                                    <div className="flexDisplay ">
                                        <div className="admin_component_head_icon">
                                            <div className="headicon_position coverMobile">
                                            <p className="">60/100 Covered</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <div className="piechart_container kamg">
                                        <div className="admin_leastfocus_graph">
                                            <div className="circleBlueBar1">
                                                <CircularProgressbar
                                                value={percentage}
                                                text={`${percentage}%`}
                                                strokeWidth={5}
                                                 
                                            />
                                            </div>
                                            <div className="submissionText">Covered</div>
                                        </div>
                                    </div>
                                </div>:
                                <DistributorCoverageDetailList months={months}/>
                                 }
                            </div>
                            </div>
                        <div className="AdashboardTable">
                            <ul className="nav nav-pills listborderTop" id="pills-tab" role="tablist">
                                <li className={this.state.activeTab == 1 ?  'nav-item elementcontainer kamDistrActivebar':  'nav-item elementcontainer activelink1' } onClick={() => { this.addclass('1'); }}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="first" className="linkcontainer">
                                            <p className="dashtabhead">Monthly</p>
                                            <p  className="dashtabsubhead">Distributor Covered</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                </li>
                                <li className={this.state.activeTab == 2 ?  'nav-item elementcontainer kamDistrActivebar':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('2'); }}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="first" className="linkcontainer">
                                            <p className="dashtabhead">Detailed View </p>
                                            <p  className="dashtabsubhead">Current Month</p>
                                        </Nav.Link>
                                    </Nav.Item>
                                </li>
                                    
                            </ul>
                        </div> 
                    </div>
                </Col>
                <Col xl={8}>
                    <DistributorClaimList months={months} />
                </Col>
            </Row>
                
             </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    months: state.KAMDashboard.months
 })

export default connect(mapStateToProps)(DistributorCoverage);