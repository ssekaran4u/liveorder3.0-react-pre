import React from "react";
import { Link } from "react-router-dom";

import Footer from "../../landing-page/components/Footer";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";

// manager
import RPSListTab from "../managerComponents/RPSListTab";

const RPSApprovalListContainer = () => {
  var managerSubContent = <div className="sub-content"><Link to="/dashboard"><span>Dashboard</span></Link> / RPS Approval & Confirmation List</div>
  return (
    <div className="dashboard-sec" >
      <div className="admindashboard">
        <div className="content-spacing dashscroll">
          <div className="min-height-100">

            {/* manager */}
            <Breadcrumbs content="RPS Approval & Confirmation" subContent={managerSubContent} />
            <RPSListTab />

            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RPSApprovalListContainer;
