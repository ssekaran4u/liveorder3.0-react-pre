import React from 'react'
import { Link } from "react-router-dom";
// import Tabs from "react-bootstrap/Tabs";
// import Tab from "react-bootstrap/Tab";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import Footer from "../../landing-page/components/Footer";
import "../../../public/assets/css/user-setting.css";
import SetupTabsComp from '../components/SetupTabsComp'
import {InputGroup,FormControl } from 'react-bootstrap'

const SetUpContainer=(props)=>{
    let mrSubContent
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      <Link to="/set-up"><span>Setup Module</span></Link>/
                       Setup Options</div>

   
    return(
          <div>
            <div className="content-spacing body-scroll">
              <div className="min-height-100">
                <Breadcrumbs content="Setup Module" subContent={mrSubContent} />
                  <div className="dcr-list-sec ">
                    <div style={{"border-bottom":"1px solid #dfdfdf"}}>
                    <div className="flex-row ">
                      <div className="dcr-head ">
                        <h5  className="dispatchUploadHead">Setup Module Options</h5>
                      </div>
                      <div>
                      <InputGroup className="mb-3">
                                 {/* <InputGroup.Prepend>
                                     <InputGroup.Text ><img src="public/assets/images/search_grey.png" alt="" /></InputGroup.Text>
                                 </InputGroup.Prepend> */}
                                 <FormControl 
                                    //  onChange={this.handleSearch}
                                     placeholder="Search for Setup"
                                     className="searchPad"
                                 />
                             </InputGroup>
                      </div>
                    </div>
                    </div>   
                    <SetupTabsComp />         
             

              
           </div>
           
         <Footer />
          </div>
        </div>
        </div>
    )
}

export default SetUpContainer