import React, { Component } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Dashboard extends Component {
    render() {
        const name = this.props.name != undefined && this.props.name[0].cname.toLowerCase();
        const currentMonth = this.props.totalSales!=undefined && this.props.totalSales[1]!=undefined && this.props.totalSales[1];
        const currentmonthSale = Math.round(currentMonth.TotalSales);
        const currentMonthSales = (currentmonthSale/100000).toFixed(1);
        const lastMonth = this.props.totalSales!=undefined && this.props.totalSales[0]!=undefined && this.props.totalSales[0];
        const lastmonthSale = Math.round(lastMonth.TotalSales);
        const lastMonthSales = (lastmonthSale/100000).toFixed(1);
        const salesComparison = (currentMonthSales/lastMonthSales)*100;
        const percentage = (salesComparison-100);
        return (
            <div>

                <Row>
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="flex-row pb10">
                            <div> <div className="kam-dashboard-heading dahboardheading">Welcome, <span>{name}&nbsp;</span>!</div></div>
                            <div className="flexDisplay">
                                <div><img src="../public/assets/images/rainy.svg" /></div>
                                <div className="Monthdis">July <div className="acurrTime">2019</div></div>
                                <div><span className="mintemp">25</span > <span className="slash"> | </span><span className="maxtemp">32 </span></div>
                                <div className="area">Banglore<div className="acurrTime">11:34am</div></div>
                            </div>
                        </div>

                    </Col>

                </Row>
                <Row className="rowone">

                    <Col xl={3} xs={12} className="marginBot10 nopad0">
                        <div className="monthsummry1 ">
                            <div className="greencircle1">
                                <img className="kaminnercircledash" src="../../../public/assets/images/kam_money.svg" />
                            </div>
                            <div className={salesComparison>=100?"totalclaimamt green-clr total":"totalclaimamt red-clr total"}>Total Sales &nbsp;{"("+currentMonth.Month_name+")"} </div>
                            <div className="totalorderamt">{currentMonthSales}&nbsp;Lakh</div>
                            <div className="trend">Sales Trend comparison last Month</div>
                            <div className={salesComparison>=100?"claimcomp green-clr":"claimcomp red-clr"}>{salesComparison>=100?"+"+percentage+" "+"%":percentage+" "+"%"}</div>
                        </div>
                    </Col>
                    <Col xl={3} xs={12} className="marginBot10 nopad0">
                        <div className="monthsummry1 ">
                            <div className="redcircle1">
                                <img className="kaminnercircledash" src="../../../public/assets/images/kam_stethoscope.svg" />
                            </div>
                            <div className="totalclaimamt red-clr total">Total Claims (August)</div>
                            <div className="totalorderamt">0.2 Milion</div>
                            <div className="trend">Claims Trend comparison last Month</div>
                            <div className="claimcomp red-clr">-15%</div>
                        </div>
                    </Col>
                    <Col xl={3} xs={12} className="marginBot10 nopad0">
                        <div className="monthsummry1 ">
                            <div className="yellowcircle1">
                                <img className="kaminnercircledash" src="../../../public/assets/images/1box.svg" />
                            </div>
                            <div className="orderAnysys total">Order Analysis (August)</div>
                            <div className="totalorderamt">16</div>
                            <div className="trend">Order Analysis comparison last Month</div>
                            <Link to="/orderhistory">
                                <div className=" details">View Details</div>
                            </Link>

                        </div>
                    </Col>
                    <Col xl={3} xs={12} className="marginBot10 nopad0 ">
                        <div className="monthsummry1 nomr0 ">

                            <p className="distrubutorRepo">Distributor Report</p>
                            <div className="distributorflex">
                                <div className="distributorTotalBlock">
                                    <p className="distotal">Total</p>
                                    <p className="disAmt">30</p>
                                </div>
                                <div className="distributorBlueBlock">
                                    <p className="distotal">Active</p>
                                    <p className="disAmt">20</p>
                                </div>
                            </div>
                            <div className="flex-row">
                                <div className="disinactive">Inactive: 12%</div>
                                <div className="disInactiveAmt"><span className="inactiveamt">04</span>/03</div>
                            </div>
                            <div className="greenprogress  tooltipcustom">
                                <div className="yellowprogress-bar" style={{ width: '30%' }}></div>
                            </div>
                            <div className="flex-row">
                                <div className="dispartialactive">Partially Active: 20%</div>
                                <div className="disInactiveAmt"><span className="inactiveamt">04</span>/03</div>
                            </div>
                            <div className="greenprogress  tooltipcustom">
                                <div className="blueprogress-bar" style={{ width: '30%' }}></div>
                            </div>
                            <Link to="/order_analysis">
                                <div className="distrubutorDeatils">VIEW DETAILS</div>
                            </Link>


                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;