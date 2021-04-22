import React, { Component } from "react";
import { Row, Col, Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../../landing-page/components/Footer";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import Orderbill from "./orderbillpage";

class Orderinvoicedet extends Component {
  render() {
    return (
      <div className="dashboard-sec ">
        <div className="admindashboard">
          <div className="content-spacing dashscroll">
            <div className="min-height-100">
              <div className="flex-row">
                <div>
                  <h4 className="dahboardheading">Order Details</h4>
                </div>
                <div>
                  <Breadcrumb className="dcr-breadcrumb">
                    <Breadcrumb.Item>
                      <Link to="/kdashboard">Dashboard /</Link>
                      <Link to="/orderhistory"> Order History /</Link>
                      <Link to="/orderhistory"> Ongoing Orders </Link>

                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                    Order Details
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>

              </div>
             <Orderbill/>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Orderinvoicedet;
