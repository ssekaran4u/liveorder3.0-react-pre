import React, { Component } from "react";
import { Row, Col, Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import '../../../../public/assets/css/sfcstyle.css'
import Sfcapprovalpage from './approvalistpage'
 



class Sfcapprovallisthead extends Component {
  render() {
    return (
      <div className="dashboard-sec ">
        <div className="admindashboard">
          {/* <div className="content-spacing dashscroll"> */}
            <div className="min-height-100">
              <div className="flex-row">
                <div>
                  <h4 className="dahboardheading">Standard Fare Chart (SFC)</h4>
                </div>
                <div>
                  <Breadcrumb className="dcr-breadcrumb">
                    <Breadcrumb.Item>
                      <Link to="/kdashboard">Dashboard </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                     My Downline Approval List
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              <Sfcapprovalpage/>
            </div>
          {/* </div> */}
        </div>
      </div>
    );
  }
}
export default Sfcapprovallisthead;
