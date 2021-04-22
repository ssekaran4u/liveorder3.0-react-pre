import React from "react";
import { Link } from "react-router-dom";

import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import Footer from "../../landing-page/components/Footer";
//import RPSApprovalDetails from "../managerComponents/RPSApprovalDetails";

const RPSApprovalDetailsContainer = () => {
    var subContent = <div className="sub-content"><Link to="/dashboard"><span>Dashboard</span></Link>/ <Link to="/rps-manager"><span>RPS Approval & Confirmation list</span></Link> / RPS Approval & Confirmation</div>
    return (
      <div className="dashboard-sec" >
        <div className="admindashboard">
          <div className="content-spacing dashscroll">
            <div className="min-height-100">
                <Breadcrumbs content="RPS Approval" subContent={subContent} />
                {/* <RPSApprovalDetails /> */}

                <Footer />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default RPSApprovalDetailsContainer;
  