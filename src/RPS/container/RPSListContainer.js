import React from "react";
import { Link } from "react-router-dom";

import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import Footer from "../../landing-page/components/Footer";
// mr
import RPSList from "../mrComponents/RPSList";
import RPSListTab from '../managerComponents/RPSListTab'

const RPSListContainer = () => {
  let  mrSubContent
  if(localStorage.getItem('type') == '1'){
     mrSubContent = <div className="sub-content"><Link to="/dashboard"><span>Dashboard</span></Link> / RPS</div>
  }else{
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      {/* <Link to=""><span>Visited Related</span></Link> */}
                       RPS</div>
  }
  
  return (
    <div className="content-spacing body-scroll">
    <div className="min-height-100">
            {/* mr */}
            <Breadcrumbs content="RPS" subContent={mrSubContent} />
            {localStorage.getItem("type") == "1" ?
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
            :
            <RPSListTab />
             } 
         
           
         <Footer />
          </div>
        </div>
     
  )
}

export default RPSListContainer;
