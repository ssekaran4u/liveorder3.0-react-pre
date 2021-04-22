import React from 'react'
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import { Link } from "react-router-dom";
import DCRMCRForm from './DCRMCRForm'
import DCRLockHeader from './DCRLockHeader'
import DCRLockReleaseList from './DCRLockReleaseList'

const DCRMCRLockRelease=(props)=>{
    let mrSubContent
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      <Link to="/user-setting"><span>Setup Module</span></Link>/
                       DCR/MCR Lock Activation Form</div>

    return(
        <div>
            <div className="content-spacing body-scroll">
              <div className="min-height-100">
                <Breadcrumbs content="DCR/MCR Lock Activation Form" subContent={mrSubContent} />
                    <div className="dcr-list-sec ">
                        <DCRMCRForm />
                    </div>
              {/* </div> */}
                <div className='dcr-list-sec meetingDiv'>
                    <DCRLockHeader headerText="DCR Lock Release Form" />
                    <DCRLockReleaseList />
                </div>
              </div>
            </div>
        </div>
    )
}

export default DCRMCRLockRelease