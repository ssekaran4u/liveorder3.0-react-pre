import React, { Component } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import DistributorSalesList from '../components/DistributorSalesList'
import CustomAvgSalesTooltip from '../components/CustomAvgSalesTooltip'
import DashLoader from "../../../lib/DashboardLoader"
import GraphViewDistributor from '../components/GraphViewDistributor'

// const data = [
//   {
//     name: 'Jan', uv: 10, pv: 24
//   },
//   {
//     name: 'Feb', uv: 18, pv: 48
//   },
//   {
//     name: 'Mar', uv: 23, pv: 98
//   },
//   {
//     name: 'Apr', uv: 34, pv: 39
//   },
//   {
//     name: 'May', uv: 31, pv: 48
//   },
//   {
//     name: 'Jun', uv: 45, pv: 48
//   },
//   {
//     name: 'Jul', uv: 40, pv: 43
//   },
//   {
//     name: 'Aug', uv: 42, pv: 98
//   },
//   {
//     name: 'Sep', uv: 65, pv: 68
//   },
//   {
//     name: 'Oct', uv: 55, pv: 78
//   },
//   {
//     name: 'Nov', uv: 80, pv: 88
//   },
//   {
//     name: 'Dec', uv: 45, pv: 50
//   },
// ];

class AverageSales extends Component {
  constructor() {
    super()
    this.state = {
      isFull: false,
      activeTab: '1',
      primaryAndSecondarySales: [],
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

  componentDidMount() {
    var data = { "Index": "PrimarySecondaryView", "Data": { "year": "2019" } }
    this.props.overAllSales(data)
  }

  render() {
    let sales = []
    let maxvalue = []
    let minmax = [0,]
    var overAllSales = this.props.overall_sales_view
    if (overAllSales) {
      sales = overAllSales.map((localvalues) => {
        var primarySales = Math.round(localvalues["PrimarySales"])
        var secondarySales = Math.round(localvalues["SecondarySales"])
        let result = { ...localvalues }
        if (primarySales > 1) {
          var convert_primary = (primarySales / 100000)
          var convert_primarysales = (convert_primary.toFixed(2))
          result.PrimarySales = convert_primarysales;
        }
        if (secondarySales > 1) {
          var convert_secondary = (secondarySales / 100000)
          var convert_secondarySales = (convert_secondary.toFixed(2))
          result.SecondarySales = convert_secondarySales;
        }
        return result;
      })
    }
    var max_primary = Math.max.apply(null,
      Object.keys(sales).map(function (e) {
        return sales[e]["PrimarySales"];
      }));
    var max_secondary = Math.max.apply(null,
      Object.keys(sales).map(function (e) {
        return sales[e]["SecondarySales"];
      }));
    maxvalue.push(Number(max_primary))
    maxvalue.push(Number(max_secondary))

    var finalmax = Math.max.apply(null,maxvalue)
    if(finalmax==0){
      minmax.push(1)
    }
    else{
      minmax.push(Number(finalmax))
    }
    // console.log(sales)
    return (
      <div className="pullTop responsePull">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <div className="averageSalesGraph">
              <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
                {this.state.activeTab == 1 ?
                  <div>
                    <div className="flex-row">
                      <div className="dwrSubHeading mainhead_content_one bartitle">Primary & Secondary Sales <span className="avgsalesspan">(Value in lakh)</span></div>
                      <div className="flexDisplay">
                        <div className="unlockmenu"></div>
                        <div className="admin_component_head_icon flexDisplay">
                          <div className="flexDisplay primarylabelpad">
                            <div className="flexDisplay">
                              <div className="darkblue"></div>
                              <div className="primarylabel">Primary Sales</div>
                            </div>
                            <div className="flexDisplay">
                              <div className="kyellow-circle"></div>
                              <div className="primarylabel">Sec Sales</div>
                            </div>
                          </div>
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

                    <div className="avgChart">
                      {!sales|| !sales.length > 0?<DashLoader></DashLoader>:
                      <ResponsiveContainer width='100%' height={300}>
                        <ComposedChart
                          strokeWidth={3}
                          data={sales}
                          margin={{ top: 50, right: 20, left: 2, bottom: 0, }}>
                          <CartesianGrid strokeDasharray="2" />
                          <XAxis dataKey="months" />
                          <YAxis type="number" domain={minmax} />
                          <Tooltip content={<CustomAvgSalesTooltip />} />
                          {/* <Area type="monotone" dataKey="uv" stroke="#1515af" fill="rgb(229, 235, 248)" fill-opacity="0.4" /> */}
                          <Area
                            className="backwave"
                            type="monotone"
                            dataKey="SecondarySales"

                            stroke="none"
                          />
                          <Bar
                            dataKey="PrimarySales"
                            barSize={17}
                            fill="#1515af"

                            className="kbargraph"
                            radius={[5, 5, 0, 0]}
                          />
                          <Line
                            dataKey="SecondarySales"
                            type="monotone"
                            stroke="#f49917"
                            strokeWidth={3}
                            activeDot={{ r: 3 }}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>}

                    </div></div> :
                  this.state.activeTab == 2 ?
                    <div>

                      <DistributorSalesList />
                    </div> :
                    this.state.activeTab == 3 ?
                      <GraphViewDistributor /> :
                      ''}
              </div>
            </div>
          </Col>
        </Row>
        <div className="AdashboardTable">
          <ul className="nav nav-pills listborderTop" id="pills-tab" role="tablist">
            <li className={this.state.activeTab == 1 ? 'nav-item elementcontainer kamActivebar' : 'nav-item elementcontainer activelink1'} onClick={() => { this.addclass('1'); }}>
              <Nav.Item>
                <Nav.Link eventKey="first" className="linkcontainer">
                  <p className="dashtabhead">Overall Sales View</p>
                  <p className="dashtabsubhead">+12% sales orders incraesed this month </p>
                </Nav.Link>
              </Nav.Item>
            </li>
            <li className={this.state.activeTab == 2 ? 'nav-item elementcontainer kamActivebar' : 'nav-item elementcontainer activelink2'} onClick={() => { this.addclass('2'); }}>
              <Nav.Item>
                <Nav.Link eventKey="first" className="linkcontainer">
                  <p className="dashtabhead">Detail View Of Distributor Sales</p>
                  <p className="dashtabsubhead">Till Current Month</p>
                </Nav.Link>
              </Nav.Item>
            </li>
            <li className={this.state.activeTab == 3 ? 'nav-item elementcontainer kamActivebar' : 'nav-item elementcontainer activelink2'} onClick={() => { this.addclass('3'); }}>
              <Nav.Item>
                <Nav.Link eventKey="first" className="linkcontainer">
                  <p className="dashtabhead">Graphical View Of Distributors Sales</p>
                  <p className="dashtabsubhead">Till Current Month</p>
                </Nav.Link>
              </Nav.Item>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AverageSales;
