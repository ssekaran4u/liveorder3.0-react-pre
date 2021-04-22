import React from 'react'
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import RPSSetupTab from './RPSSetupTab'
import Footer from "../../landing-page/components/Footer";


const RPSEdit=(props)=>{
    let mrSubContent
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      <Link to="/user-setting"><span>Setup Module</span></Link>/
                       New rps Setup Page</div>
    return(
       
        <div>
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <Breadcrumbs content="New RPS Setup Page" subContent={mrSubContent} />
                        <RPSSetupTab tabno="1"/>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default RPSEdit