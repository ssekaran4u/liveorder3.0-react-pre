import React, { Component } from "react";
import { Row, Col, Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../../landing-page/components/Footer";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
 
import ProductwiseTable from './productwisetable'

class Productsale extends Component {
  render() {
    return (
      <div className="dashboard-sec ">
        <div className="admindashboard">
          <div className="content-spacing dashscroll">
            <div className="min-height-100">
              <div className="flex-row">
                <div>
                  <h4 className="dahboardheading">Om Medicals Sales</h4>
                </div>
                <div>
                  <Breadcrumb className="dcr-breadcrumb">
                    <Breadcrumb.Item>
                      <Link to="/kdashboard">Dashboard /</Link>
                      {/* <Link to="/">Distributor Report /</Link> */}
                      <Link to="/kamstokiest_profile"> Distributor Profile</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                      Om Medical Sales Details
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>

              </div>
             <ProductwiseTable/>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Productsale;
