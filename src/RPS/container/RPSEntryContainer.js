import React from "react";
import { Link } from "react-router-dom";
import "../../../public/assets/css/rpsWizard.css";

import Footer from "../../landing-page/components/Footer";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";

// mr
import RPSEntry from "../mrComponents/RPSEntry";


const RPSEntryContainer = () => {
  let  mrSubContent 
  if(localStorage.getItem('type') == "1"){
     mrSubContent = <div className="sub-content"><Link to="/dashboard"><span>Dashboard</span></Link> / <Link to="/rps"><span>RPS</span></Link> / RPS Entry</div>
  }else{
    mrSubContent = <div className="sub-content"><Link to="/dashboard"><span>Dashboard</span></Link> / 
    {/* <Link to=""><span>Visited Related</span></Link> /  */}
    <Link to="/rps"><span>RPS</span></Link> / RPS Entry</div>
  }
  
  return (
   
        <div className="content-spacing dashscroll">
          <div className="min-height-100">
            {/* mr  */}
            <Breadcrumbs content="RPS Request Entry" subContent={mrSubContent} />
            <RPSEntry />

            {/* manager */}

            <Footer />
          </div>
        </div>
    
  )
}

export default RPSEntryContainer;