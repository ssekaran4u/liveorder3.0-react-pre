import React, { Component } from "react";
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import { Row, Card, Button, Dropdown, ButtonGroup, Nav } from 'react-bootstrap';
import DetailedViewOfDistributor from "./detailed_view_of_distributor";
import AverageSalesTooltip from "./avearage_sales_tooltip";
import { connect } from 'react-redux';

const data = [
    {
        name: '2011-2012', uv: 10, pv: 20
    },
    {
        name: '2012-2013', uv: 18, pv: 48
    },
    {
        name: '2013-2014', uv: 43, pv: 68
    },
    {
        name: '2014-2015', uv: 24, pv: 39
    },
    {
        name: '2015-2016', uv: 31, pv: 48
    },
    {
        name: '2016-2017', uv: 45, pv: 48
    },
    {
        name: '2017-2018', uv: 20, pv: 43
    },
    {
        name: '2018-2019', uv: 42, pv: 78
    },
    {
        name: '2019-2020', uv: 65, pv: 68
    }
];

class StokiestProfileGraph extends Component {
    constructor() {
        super()
        this.state = {
            isFull: false,
            activeTab: '1',
        }
        this.addclass = this.addclass.bind(this)
        this.handleView = this.handleView.bind(this)
    }
    addclass(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
   
    render() {
        const financialYear = this.props.financialYear;
        return (
            <div className="graphs-of-stokiest">
                <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
                    <Card className="graph-card">
                        <div className="graph-header">
                            <div className="graph-header-main-text">Business Information <span>( Value in lakh)</span></div>
                            <div className="graph-header-col2">
                                <div className="graph-header-dropdowns">
                                    {this.state.activeTab == 2 ?
                                        <div className="top-retailers-dd">
                                            <Dropdown className="retailer-numbers">
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="retailer-numbers-btn">
                                                    Financial Year:<span> 2019-20 </span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {financialYear != undefined && financialYear.length > 0 ? financialYear.map((financialYear) => (
                                                        <Dropdown.Item href="#/action-1" key={financialYear.Code}>{financialYear.Name}</Dropdown.Item>
                                                    )) : null}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div> : null}
                                    <div className="top-retailers-dd">
                                        <Dropdown className="retailer-numbers">
                                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="retailer-numbers-btn">
                                                Division : <span>All </span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Cardiology</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Neurology</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Edicronology</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    {this.state.activeTab == 1 ?
                                        <div className="graph-dots">
                                            <div className="primary-sales-dot"></div>
                                            <div className="graph-texts">Primary Sales</div>
                                        </div>
                                        : null}
                                    {this.state.activeTab == 1 ?
                                        <div className="graph-dots">
                                            <div className="secondary-sales-dot"></div>
                                            <div className="graph-texts">Sec. Sales</div>
                                        </div>
                                        : null}
                                </div>
                                <div className="fullScreen-image">
                                    {this.state.isFull ? (
                                        <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView} />) : (
                                            <img src="../public/assets/images/fullscreen.svg" alt="" onClick={this.handleView} />)}
                                </div>
                                <div className="menu-dots">
                                    <img src="../public/assets/images/overflow.svg" />
                                </div>
                            </div>
                        </div>
                        {this.state.activeTab == 1 ?
                            <div>
                                <ResponsiveContainer width='100%' height={400}>
                                    <ComposedChart
                                        strokeWidth={2}
                                        data={data}
                                        margin={{ top: 50, right: 20, left: 2, bottom: 40, }}>
                                        <CartesianGrid strokeDasharray="2" />
                                        <XAxis dataKey="name" />
                                        <YAxis type="number" domain={[0, 80]} />
                                        <Tooltip content={<AverageSalesTooltip />} />
                                        <Area
                                            className="backwave"
                                            type="monotone"
                                            dataKey="uv"
                                            // fill="true"
                                            stroke="none"
                                        />
                                        <Bar
                                            dataKey="pv"
                                            barSize={18}
                                            fill="#1515af"
                                            opacity={0.9}
                                            className="stokiest-profile-bargraph"
                                            radius={[5, 5, 0, 0]}
                                        />
                                        <Line
                                            dataKey="uv"
                                            type="monotone"
                                            stroke="#f49917"
                                            strokeWidth={3}
                                            activeDot={{ r: 5 }}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div> :
                            <div><DetailedViewOfDistributor /></div>}
                    </Card>
                </div>
                <div className="AdashboardTable">
                    <ul className="nav nav-pills listborderTop" id="pills-tab" role="tablist">
                        <li className={this.state.activeTab == 1 ? 'nav-item elementcontainer kamActivebar' : 'nav-item elementcontainer activelink1'} onClick={() => { this.addclass('1'); }}>
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="linkcontainer">
                                    <p className="dashtabhead">Overall Sales View</p>
                                    <p className="dashtabsubhead"><span>+12.00%</span> Business increased this year </p>
                                </Nav.Link>
                            </Nav.Item>
                        </li>
                        <li className={this.state.activeTab == 2 ? 'nav-item elementcontainer kamActivebar' : 'nav-item elementcontainer activelink2'} onClick={() => { this.addclass('2'); }}>
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="linkcontainer">
                                    <p className="dashtabhead">Detailed View Of Business Info</p>
                                    <p className="dashtabsubhead">Till Current Month</p>
                                </Nav.Link>
                            </Nav.Item>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    financialYear: state.KAMDashboard.financial_year,
})

export default connect(mapStateToProps)(StokiestProfileGraph);