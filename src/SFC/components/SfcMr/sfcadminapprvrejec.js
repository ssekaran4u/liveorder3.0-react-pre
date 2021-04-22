import React, { Component } from "react";
import { Row, Col, Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../../landing-page/components/Footer";

import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import '../../../../public/assets/css/sfcstyle.css'
import Sfcadminapprvrejectpage from './sfcadminapprvrejectpage'
import Sfcadminadd from './sfcadminadd'
class Sfcadminapprvreject extends Component {


  constructor(props) {
    super(props)
    this.state = {
     
     
      id:""
    }
  }

  componentDidMount(){
  // console.log(this.props.match.params,'klkl')
const id=this.props.match.params
  this.setState({id:id})

  // alert(this.props.match.params.id)
  }

  render() {
    return (
      <div className="dashboard-sec ">
        <div className="admindashboard">
          <div className="content-spacing dashscroll">
            <div className="min-height-100">
              <div className="flex-row">
                <div>
                  <h4 className="dahboardheading">Standard Fare Chart (SFC)</h4>
                </div>
                <div>
                  <Breadcrumb className="dcr-breadcrumb">
                    <Breadcrumb.Item>
                      <Link to="/">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <Link to="/sfclistadmin">My SFC List </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                      SFC Details
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              {/* <Sfcadminapprvrejectpage  n_srno={this.props.match.params.id} /> */}
              <Sfcadminadd n_srno={this.props.match.params.id}/>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Sfcadminapprvreject;
