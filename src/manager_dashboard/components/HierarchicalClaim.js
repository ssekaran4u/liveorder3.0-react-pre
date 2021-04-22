import React, { Component } from 'react'
import {Row,Col,Accordion,Card,Tab,Nav} from 'react-bootstrap'
import {XAxis, YAxis, Tooltip, ResponsiveContainer,LineChart,CartesianGrid,Line,ComposedChart,Area} from 'recharts';

import HierrachicalClaimAccor from './HierrachicalClaimAccor'
import MrCustomTooltipClaims from '../../dashboard/components/MrCustomTooltipClaims'
import DashLoader from "../../lib/DashboardLoader";

export default class HierarchicalClaim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            activeTab: "1",
            showchatbox:false,
            clickplus:true
        };
        this.handleView = this.handleView.bind(this);
        this.addclass = this.addclass.bind(this);
        this.showchatbox = this.showchatbox.bind(this);
        this.handleplus = this.handleplus.bind(this);
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
    handleplus(){
    this.setState({ 
        clickplus: ! this.state.clickplus 
    })
    }
    /*Show and hide chatbox*/
    showchatbox(){
        this.setState({
            showchatbox: !this.state.showchatbox
        });
    }
    render() {
        const {datagraph} = this.props
        const {data} = this.props
        var months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var monthsshort    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var now       = new Date();
        var thisMonth = months[now.getMonth()];
        var shortmonth = monthsshort[now.getMonth()];
        var prevMonth = monthsshort[now.getMonth()-1];
        var currentmonthclaim=''
        var claimpercent=''
        var compairpercent=''
        var finalcompair =''
        let td=[]
        // let minmax = [0,]
        //alert(prevMonth);
        if(datagraph && datagraph != undefined){
            td = datagraph.map((localdata)=>{
            let d={...localdata}
                if (d.sale > 0){
                    d.claim_percent = ((d.claim / d.sale) * 100).toFixed(2) 
                }
                else if (d.claim > 0)
                d.claim_percent = 100
                else
                d.claim_percent = 0
                
                if(d["disp"]==shortmonth){
                    if(d.sale>0){
                        claimpercent=((d.claim/d.sale)*100).toFixed(2)
                    }
                    else{
                        claimpercent=0
                    }
                }
                if(d["disp"]==prevMonth){
                    if(d.sale>0){
                        compairpercent=Math.round((d.claim/d.sale)*100).toFixed(2)
                    }
                    else{
                        compairpercent=0
                    }
                }
                finalcompair= claimpercent - compairpercent

                return d
            })
        }
        
        return (
            <Col xl={6} md={6} sm={12} xs={12} className="paddl10">
                    <div className={this.state.isFull ? "fullscreenView" : "ucdoctorsecondrow-first small-component"}>
                        <div className="manager_component_head">
                            <div className="manager_mainhead">
                                <div className="mainhead_content_one bartitle">
                                Primary Sales Return <span className="smallheading">(Value In Rs.)</span>
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
                        <div className="manager_subheading">
                            <img className="downimage" src="../public/assets/images/Arrow_dashboard.svg"></img>
                            {finalcompair}% ({thisMonth})
                        </div>
                        <div className="below-head-content">
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row className="nomar0">
                                    <Col xl={12} md={12} sm={12} xs={12} className="nopad0 manager_claim_containerheight">
                                        <Tab.Content className="tabrow">
                                            <Tab.Pane eventKey="first">
                                            <div style={{ width: '100%', height: 245 }}>
                                            {!datagraph ?
                                                <DashLoader></DashLoader>
                                                :
                                                <ResponsiveContainer>
                                                    <ComposedChart
                                                        width={400}
                                                        height={300}
                                                        data={td}
                                                    >
                                                    <CartesianGrid stroke='#f5f5f5' strokeDasharray="3 3"/>
                                                    <XAxis dataKey="disp"/>
                                                    <YAxis domain={[0,1]}/>
                                                    <Tooltip content={<MrCustomTooltipClaims/>}/>
                                                    <Line type='monotone' dataKey='claim' stroke='#dc3545' strokeWidth={3} activeDot={{r: 3}}/>
                                                    </ComposedChart>
                                                </ResponsiveContainer>
                                            }
                                            </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                        <Tab.Content className="">
                                            <Tab.Pane eventKey="second">
                                                <div className="border-container">
                                                    <div className="managerdash_hierarchical_container">
                                                        <HierrachicalClaimAccor
                                                        data={data}
                                                        nextClaimChild={this.props.nextClaimChild}
                                                        />
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                    <Col xl={12} md={12} sm={12} xs={12} className="nopad0 topbordertab">
                                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                            <li className={this.state.activeTab == 1 ?  'nav-item elementcontainer activelinkcallred' :  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('1'); }}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first" className="linkcontainer">
                                                        <p className="dashtabhead">Monthly</p>
                                                        <p  className="dashtabsubhead">{finalcompair}% Vs Last Month</p>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </li>
                                            <li className={this.state.activeTab == 2 ?  'nav-item elementcontainer activelinkcallred':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('2'); }}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second" className="linkcontainer">
                                                        <p className="dashtabhead">Team Claim Report</p>
                                                        <p  className="dashtabsubhead">Monthly View</p>
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
        )
    }
}
