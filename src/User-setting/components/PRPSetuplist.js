import React from 'react'
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import DCRLockHeader from './DCRLockHeader'
import Footer from "../../landing-page/components/Footer";
import PRPList from "./PRPList";
const PRPSetUpList=(props)=>{
    let mrSubContent
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      <Link to="/user-setting"><span>Setup Module</span></Link>/
                       PRP Setup List</div>
    return(
        <div>
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <Breadcrumbs content="rps Product Setup" subContent={mrSubContent} />
                    <div className="dcr-list-sec ">
                        <DCRLockHeader headerText="PRP Setup List" />
                        <PRPList />
                    </div>
                    <Link to = {{
                    pathname:"/prp-add/" + " " ,
                   }} >
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

export default PRPSetUpList