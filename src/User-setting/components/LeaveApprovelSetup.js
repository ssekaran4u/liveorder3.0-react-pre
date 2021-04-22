import React from 'react'
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import DCRLockHeader from './DCRLockHeader'
import LeaveApprovelSetupList from './LeaveApprovelSetupList'
//  import DCRMCRForm from './DCRMCRForm'
import { Breadcrumb } from "react-bootstrap";
const LeaveApprovelSetup=(props)=>{
   
   

    return(
        <div>
            <div className="content-spacing body-scroll">
            <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">
                                Leave Approvel Setup List 
                        </h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    <Breadcrumb.Item>
                                        <Link to="/dashboard">Dashboard </Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                    <Link to="/user-setting">
                                      Leave Approvel Setup
                                    </Link>
                            </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                    Leave Approvel Setup List
                            </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
              
                <div className='dcr-list-sec meetingDiv'>
                    {/* <DCRLockHeader headerText="Leave Approvel Setup List" /> */}
                    <LeaveApprovelSetupList />
                </div>
                <Link to = {{
                    pathname:"/LeaveApprovelSetupSave",
                     EditViewData:{
                    id: 'new',
                    mode:'New'
                  }
                   }} >
                    
                        <div className="add-new-dcr">
                            <img
                                src="../public/assets/images/add-icon.svg"
                                alt="add_icon"
                               
                            />
                        </div>{" "}
                        </Link>
            
            </div>
           
        </div>
       
    )
}

export default LeaveApprovelSetup