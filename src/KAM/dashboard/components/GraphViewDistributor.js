import React, { Component } from 'react'
import CustomDisSalesTooltip from '../components/CustomDisSalesTooltip'
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Legend, Text } from 'recharts';
import { Row, Col, Table, Dropdown } from "react-bootstrap";
import CustomizedAxisTick from '../components/CustomizedAxisTick'
import { connect } from 'react-redux';

const data = [
    {
        name: 'Wellness Phrama', uv: 10, pv: 24
    },
    {
        name: 'Mahaveer Medi-sales', uv: 18, pv: 48
    },
    {
        name: 'Balaji Pharma', uv: 23, pv: 98
    },
    {
        name: 'Vardhmaan Phrama', uv: 34, pv: 39
    },
    {
        name: '1 mg Pharama', uv: 31, pv: 48
    },
    {
        name: 'DM Pharama', uv: 45, pv: 48
    },
    {
        name: 'Medico Pharama', uv: 40, pv: 43
    },
    {
        name: 'Global Phrama', uv: 42, pv: 98
    },
    {
        name: 'Varun Pharama', uv: 65, pv: 68
    },
    {
        name: 'c-square pharama', uv: 55, pv: 78
    },

];


class GraphViewDistributor extends Component {
    constructor() {
        super()
        this.state = {
            isFull: false,

        }

    }
    render() {
        var months = this.props.months
        return (
            <div className="avgDisChart">
                <div className="flex-row">
                    <div className="dwrSubHeading mainhead_content_one bartitle">Primary & Secondary Sales<span className="avgsalesspan"> (Value in lakh)</span></div>
                    <div className="flex-row">
                        <div className="adashboardmenu unlockmenu distributorList">
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="kfilterBtn topdistResponsivepad">
                                        <img src="../../../../public/assets/images/Path_2093.svg" />
                                        <span className="distributorStatusText">Top 10 Distributors </span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                            <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Top 10 Distri.. </div>
                                            <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Least 10</div>
                                            <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Sales 10-20 L</div>
                                            <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Sales 20-30 L</div>
                                            <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Sales 30-40 L</div>
                                            <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Sales 40-50 L</div>
                                            <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Sales 50-100 L</div>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="unlockmenu invenMonth">
                            <Dropdown>
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="distrubutorFilter topdistResponsivepad">
                                        <span className="unloackStatusText">August</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                            {months.length > 0 ? months.map((months) => (
                                                <div className="pipelinePad" key={months.Code}>{months.Name}</div>
                                            )) : null}
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="flexDisplay topdistResponsivepad">
                            <div className="flexDisplay">
                                <div className="darkblue"></div>
                                <div className="primarylabel">Primary Sales</div>
                            </div>
                            <div className="flexDisplay">
                                <div className="kyellow-circle"></div>
                                <div className="primarylabel">Sec Sales</div>
                            </div>
                        </div>
                        <div className="manager_component_head_icon topdistResponsivepad">
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
                <div className="distributorGraph">
                    <ResponsiveContainer width='100%' height={350}>
                        <ComposedChart
                            strokeWidth={0}
                            stroke={"#fff"}
                            data={data}
                            margin={{ top: 50, right: 20, left: 2, bottom: 0, }}>
                            <CartesianGrid strokeDasharray="2" />
                            <XAxis dataKey="name" tick={<CustomizedAxisTick />} interval={0} height={100} stroke="red" />
                            <YAxis type="number" domain={[0, 80]} />
                            <Tooltip content={<CustomDisSalesTooltip />} />
                            {/* <Area type="monotone" dataKey="uv" stroke="#1515af" fill="rgb(229, 235, 248)" fill-opacity="0.4" /> */}
                            <Area
                                className="backwave"
                                type="monotone"
                                dataKey="uv"
                                fill="rgba(27, 132, 231,0.5)"
                                stroke="none"
                            />
                            <Bar
                                dataKey="pv"
                                barSize={17}
                                fill="#1515af"
                                className="kbargraph"
                                radius={[5, 5, 0, 0]}
                            />
                            <Line
                                dataKey="uv"
                                stroke="#f49917"
                                strokeWidth={3}
                                activeDot={{ r: 3 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    months: state.KAMDashboard.months
})

export default connect(mapStateToProps)(GraphViewDistributor);