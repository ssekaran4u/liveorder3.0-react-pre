import React from 'react'
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import DCRLockHeader from './DCRLockHeader'
import RPSList from './RPSList'
import Footer from "../../landing-page/components/Footer";

const RPSSetupList=(props)=>{
    let mrSubContent
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      <Link to="/user-setting"><span>Setup Module</span></Link>/
                       rps Setup List</div>
    return(
        <div>
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <Breadcrumbs content="rps Product Setup" subContent={mrSubContent} />
                    <div className="dcr-list-sec ">
                        <DCRLockHeader headerText="RPS Setup List" />
                        <RPSList />
                    </div>
                    <Link to={"/rps-add"}>
                        <div className="add-new-dcr">
                            <img
                                src="../public/assets/images/add-icon.svg"
                                alt="add_icon"
                            />
                        </div>{" "}
                    </Link>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default RPSSetupList