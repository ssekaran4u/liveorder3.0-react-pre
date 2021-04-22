import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import RPSList from '../mrComponents/RPSList'
import RPSRequestList from "./RPSRequestList";
import RPSRequestListTable from "./RPSExpenseApprovalList";
import { Link } from "react-router-dom";
import RPSConfirmList from './RPSConfirmList'

const RPSListTab = () => {
  return (
    <div className="rpstab">
    <div className="claim-list-tabs-container">
      <Tabs defaultActiveKey="RPSRequestList" className="claim-list-tabs entry-template">
        <Tab eventKey="RPSRequestList" title="My Request List">
          <div>
          <RPSList />
          <Link to={"/rps-entry/add"}>
              <div className="add-new-dcr">
                <img
                  src="../public/assets/images/add-icon.svg"
                  alt="add_icon"
                />
              </div>{" "}
            </Link>
          </div>
         
        </Tab>
        <Tab eventKey="RPSRequestDownList" title="My Downline Request List">
          <RPSRequestList />
        </Tab>
        <Tab eventKey="RPSRequestConfirmList" title="RPS Approved/Confirmed/Rejected History">
          <RPSConfirmList />
        </Tab>
        <Tab eventKey="RPSExpenseApprovalList" title="My Downline RPS Expense Approval List">
          <RPSRequestListTable />
        </Tab>
      </Tabs>
    </div>
    </div>
  )
}

export default RPSListTab;