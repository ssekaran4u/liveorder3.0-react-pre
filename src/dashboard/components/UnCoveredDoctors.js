import React, { Component } from 'react'
import {Row,Col,Tab,Nav,Table} from 'react-bootstrap'
import { NavLink,Link } from "react-router-dom";

import MrCustomTooltipClaims from './MrCustomTooltipClaims'
import {XAxis, YAxis, Tooltip, ResponsiveContainer,LineChart,CartesianGrid,Line,ComposedChart,Area} from 'recharts';
import DashLoader from "../../lib/DashboardLoader";
class UnCoveredDoctors extends Component {
    constructor(){
        super()
        this.state = {
            isFull: false,
            isFullSecond:false,
            displayImage:false
        };
        this.handleView = this.handleView.bind(this)
        this.handleViewSecond = this.handleViewSecond.bind(this)
    }
    handleView(){
        this.setState({
            isFull: !this.state.isFull
        })
    }
    handleViewSecond(){
        this.setState({
            isFullSecond: !this.state.isFullSecond
        })
    }
    
    render() { 
        const {data} = this.props
        const {datagraph}= this.props
        var months    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var now       = new Date();
        var thisMonth = months[now.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
        //alert(thisMonth);
        var prevMonth = months[now.getMonth()-1];
        var claimpercent=''
        var compairpercent=''
        var finalcompair =''
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        //alert(prevMonth);
        if(datagraph && datagraph != undefined){
            datagraph.map((localdata)=>{
                if (localdata.sale > 0)
                    localdata.claim_percent = ((localdata.claim / localdata.sale) * 100).toFixed(2)
                else if (localdata.claim > 0)
                    localdata.claim_percent = 100
                else
                    localdata.claim_percent = 0
                // console.log(">>>>> ", localdata.claim_percent, localdata.claim, localdata.sale)
                if(localdata["disp"]==thisMonth){
                    if(localdata.sale>0){
                        claimpercent=Math.round((localdata.claim/localdata.sale)*100).toFixed(2)
                    }
                    else{
                        claimpercent=0
                    }
                }
                if(localdata["disp"]==prevMonth){
                    if(localdata.sale>0){
                        compairpercent=Math.round((localdata.claim/localdata.sale)*100).toFixed(2)
                    }
                    else{
                        compairpercent=0
                    }
                }
                finalcompair= claimpercent - compairpercent

            })
        }
        let td = []
        let tempmax = []
        let minmax = [0,]
        if(datagraph && datagraph != undefined){
        // console.log(datagraph,"sssssuuummeettt")
       
        
        if (datagraph) {
            td = datagraph.map((localdata) => {

                /*Conevrting target,primary,secondary data to roundup value*/
                var round_sales = Math.round(localdata["claim"]);
                
                let d = { ...localdata }
                if (round_sales > 1 || round_sales < 1) {
                    var convert_target = (round_sales / 100000);
                    var convert_target_twodigit = convert_target.toFixed(2);
                    d.targetdata = convert_target_twodigit;

                }
                else {

                }
                
                return d
            })
            var maxsales = Math.max.apply(null,
                Object.keys(td).map(function (e) {
                    return td[e]['claim'];
                }));
            
            tempmax.push(Number(maxsales))
            

            var finalmax = Math.max.apply(null, tempmax);
          //  to generate the minimum and mnaximum value of y axis if no data is there.
             var roundfinalmax = Math.round((finalmax / 10) * 10)
            minmax.push(Number(roundfinalmax))
        }
      // console.log("min",minmax)
    }
    var d = new Date()
    
    var tdate = d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()
        return (
            <Row className="primesales">
                <Col xl={6} md={6} sm={12} xs={12} className="paddr10">
                    <div className={this.state.isFull ? "fullscreenView" : "ucdoctorsecondrow-first small-component"}>
                        <Row className="ucdocheading">
                            <Col xs={12}>
                                <div className="iconbar">
                                    <div className="bartitle nomar0 dashtitle">Uncovered Doctors</div>
                                    <div className="dashrighticon">
                                        {this.state.isFull ? 
                                            <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView}></img>
                                        :
                                            <img src="../public/assets/images/fullscreen.svg" onClick={this.handleView}></img>
                                        }
                                            {/* <img className="dashfullscreen" src="../public/assets/images/overflow.svg"></img> */}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="listcontainer2">
                        {!data ?
                        <DashLoader></DashLoader>
                        :
                        <div className="table-responsive">
                                <Table className="uncover_table">
                                    <tbody>
                                        {data && data != undefined ? 
                                            data.map((uncover,index)=> (
                                            <tr className="uncovered_tablerow" key={index}>
                                                <td className="uncovered_tabledata_image">
                                                    <div className="uncovered">
                                                        {this.state.displayImage ? <img className="uncoveredimage" src="../public/assets/images/ucdoctor.jpg"></img>
                                                        : 
                                                        <div className="uncoverednametext">{uncover.DrName.charAt(0)}</div>
                                                        }
                                                    </div>
                                                </td>
                                                <td className="uncovered_tabledata_name">
                                                    <div className="nopad2">
                                                        <Link to={
                                                                    "/profile/" +
                                                                    uncover["C_Code"]
                                                                }
                                                        >
                                                            <p className="ucdocname docnamelink">{uncover.DrName} </p>
                                                        </Link>
                                                        <p className="ucdocarea"><span className="mrdoc_category">{uncover.Category}</span>, <span className="mrdoc_subarea">{uncover.Sub_Area}</span></p>
                                                    </div>
                                                </td>
                                                {tdate == uncover.dt ? '' :
                                                <td className="uncovered_tabledata_replan">
                                                    <div className="nopad2">
                                                        <p className="ucdate">Date: {uncover.dt}</p>
                                                        {!uncover.dt || uncover.dt < today ?
                                                        <NavLink activeClassName="is-active" exact={true} className="ucaction" to={ localStorage.getItem("type") ==1 ?   '/mrtp' : '/manager-mtp' }>Replan</NavLink>
                                                        :
                                                        null
                                                    }
                                                    </div>
                                                </td>}
                                            </tr>
                                            ))
                                        :
                                        <tr>
                                            <td colSpan="3">No Data Found</td>
                                        </tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            }
                        </div>
                    </div>
                </Col>
                <Col xl={6} md={6} sm={12} xs={12} className="mrprimarytab paddl10">
                    <div className={this.state.isFullSecond ? "fullscreenView" : "secondrow-second small-component"}>
                        <Row className="ucdocheading">
                                <Col xs={12}>
                                    <div className="iconbar">
                                        <div className="bartitle nomar0 dashtitle">Primary Sales Returns <span className="uncoversubhead">(Value In Rs.)</span></div>
                                        <div className="dashrighticon">
                                            {this.state.isFullSecond ? 
                                                <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleViewSecond}></img>
                                            :
                                                <img src="../public/assets/images/fullscreen.svg" onClick={this.handleViewSecond}></img>
                                            }
                                                {/* <img className="dashfullscreen" src="../public/assets/images/overflow.svg"></img> */}
                                        </div>
                                    </div>
                                </Col>
                                <div className="lastmonth_vs"></div>
                                <div className="lastmonth_vs"><img className="downimage" src="../public/assets/images/Arrow_dashboard.svg" /><span className="lastmonth_persentage">{finalcompair}%</span> ({thisMonth})</div>
                            </Row>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row className="nomar0">
                                    <Col xl={12} md={12} sm={12} xs={12} className="ucdocheading">
                                        <Tab.Content className="tabrow">
                                        <div className="uncoverdoctor_chart">
                                            <div style={{ width: '100%', height: 300 }}>
                                            {!datagraph ?
                                                <DashLoader></DashLoader>
                                                :
                                                <ResponsiveContainer>
                                                <ComposedChart
                                                    width={400}
                                                    height={300}
                                                    data={datagraph}
                                                >
                                                <CartesianGrid stroke='#f5f5f5' strokeDasharray="3 3"/>
                                                <XAxis dataKey="disp"/>
                                                {/* <YAxis domain={[0,1]}/> */}
                                                {minmax[1] == 0 ? <YAxis domain={[0,1]}/>:
                                                <YAxis  domain={minmax}/>}
                                               
                                                <Tooltip content={<MrCustomTooltipClaims/>}/>
                                                <Line type='monotone' dataKey='claim' stroke='#dc3545' strokeWidth={3} activeDot={{r: 3}}/>
                                                </ComposedChart>
                                                </ResponsiveContainer>
                                            }
                                            </div>
                                        </div>
                                        </Tab.Content>
                                    </Col>
                                    {/* <Col xl={12} md={12} sm={12} xs={12} className="nopad0 topbordertab">
                                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                            <li className="nav-item elementcontainer activelinkcall_claim">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first" className="linkcontainer">
                                                        <p className="dashtabhead">Monthly View</p>
                                                        <p className="dashtabsubhead"></p>
                                                        <p  className="dashtabsubhead"> {finalcompair}% Vs Last Month</p>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </li>
                                        </ul>
                                    </Col> */}
                                </Row>
                            </Tab.Container>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default UnCoveredDoctors