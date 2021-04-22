import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Footer from '../../../landing-page/components/Footer';
// import '../../../public/assets/css/sfcstyle.css';
import Smasterdropdown from '../component/smasterdropdown';
import SmasterTable from '../component/smastertable';

class Smastercontainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

            LoadDatalist: [],
            selecteddata: {

                "month": '',
                "year": '',
                "selectedFs": '',
                "stockist": '',
                "SalesType": '',
            }


        }

        this.senddata = this.senddata.bind(this)

    }

    senddata(data, selecteddata) {
        this.setState({ LoadDatalist: data, selecteddata: selecteddata })
    }


    render() {
        return (

            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing body-scroll">
                        <div className="min-height-100">
                            <div className="dashboard-sec ">
                                <div className="admindashboard-sfc">
                                    {/* <div className="content-spacing dashscroll"> */}
                                    <div className="min-height-100">
                                        <div className="flex-row">
                                            <div>
                                                <h4 className="dahboardheading">   Secondary Sales Entry</h4>
                                            </div>
                                            <div>
                                                <Breadcrumb className="dcr-breadcrumb">
                                                    <Breadcrumb.Item>
                                                        <Link to="/">Dashboard </Link>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item active>
                                                        Secondary Sales
                                            </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                        <Smasterdropdown senddata={this.senddata} selecteddata={this.state.selecteddata} />
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                            <Footer />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Smastercontainer;