import React from 'react'
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import CompetitorForm from './CompetitorForm'
import CompUserRight from './CompUserRight'

const CompetitorProSetup=(props)=>{
    let mrSubContent
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      <Link to="/user-setting"><span>Setup Module</span></Link>/
                       Competitor Product Setup</div>
    return(
        <div>
            <div className="content-spacing body-scroll">
              <div className="min-height-100">
                <Breadcrumbs content="Competitor Product Setup" subContent={mrSubContent} />
                    <div className="dcr-list-sec ">
                        <CompetitorForm />
                       
                    </div>
                    <div className="dcr-list-sec ">
                        <CompUserRight />
                       
                    </div>
              {/* </div> */}
             
              </div>
            </div>
        </div>
    )
}

export default CompetitorProSetup