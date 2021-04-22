import React, { Component } from "react";
import { Row, Col, Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../../landing-page/components/Footer";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import Ordersummary from './ordersummary'
import Suggestedpro from './suggestedproduct'
 

class Cartsummary extends Component {
   

  render() {
    return (
      <div className="dashboard-sec "  >
        <div className="admindashboard">
          <div className="content-spacing dashscroll">
            <div className="min-height-100">
              <div className="flex-row">
                <div>
                  <h4 className="dahboardheading">Cart Summary</h4>
                </div>
                <div>
                  <Breadcrumb className="dcr-breadcrumb">
                    <Breadcrumb.Item>
                      <Link to="/kdashboard">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                     Cart summary
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                
              </div>
              <Ordersummary  />
              <Suggestedpro/>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Cartsummary;