import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Footer from '../../../landing-page/components/Footer';
// import '../../../public/assets/css/sfcstyle.css';
import Primarydropdown from '../components/primarydropdown';


class Primarycontainer extends Component {
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
                                                <h4 className="dahboardheading">Primary Sales Target</h4>
                                            </div>
                                            <div>
                                                <Breadcrumb className="dcr-breadcrumb">
                                                    <Breadcrumb.Item>
                                                        <Link to="/">Dashboard </Link>
                                                    </Breadcrumb.Item>
                                                    <Breadcrumb.Item active>
                                                    Primary Sales Target
                                            </Breadcrumb.Item>
                                                </Breadcrumb>
                                            </div>
                                        </div>
                                        <Primarydropdown />

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

export default Primarycontainer;