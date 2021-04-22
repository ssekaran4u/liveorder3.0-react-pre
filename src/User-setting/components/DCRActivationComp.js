import React from 'react'
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import DCRLockHeader from './DCRLockHeader'
import DCRLockActivationList from './DCRLockActivationList'
import DCRMCRForm from './DCRMCRForm'

const DCRActivationComp=(props)=>{
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
                    <DCRLockHeader headerText="DCR Lock Activation Form" />
                    <DCRLockActivationList />
                </div>
              </div>
            </div>
           
        </div>
       
    )
}

export default DCRActivationComp