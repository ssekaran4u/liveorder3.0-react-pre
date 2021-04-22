import React from 'react'
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import ControlPanelPage from './ControlPanelPage'
import {InputGroup,FormControl} from 'react-bootstrap'

const ControlPanelSetting=(props)=>{
    let mrSubContent
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      <Link to="/user-setting"><span>Setup Module</span></Link>/
                       Setup Options</div>
    return(
        <div>
            <div className="content-spacing body-scroll">
              <div className="min-height-100">
                <Breadcrumbs content="Setup Module" subContent={mrSubContent} />
                    <div className="dcr-list-sec ">
                        <div className="control-commHead">
                            <div className="flex-row">
                                <div>
                                    Control Panel Setting
                                </div>
                                <div>
                                    <div className="flexDisplay">
                                        <div>
                                            <InputGroup className="">
                                            <FormControl 
                                                //  onChange={this.handleSearch}
                                                placeholder="Search for any setting"
                                                className="controlSearch"
                                            />
                                            </InputGroup>
                                        </div>
                                        <div className="activedot">
                                            <div className="page_pad1">1</div>
                                        </div>
                                        <div>of</div>
                                        <div className="dot">
                                            <div className="page_pad1">2</div>
                                        </div>
                                    </div>
                               
                                </div>
                            </div>
                            
                        </div>
                        <ControlPanelPage />
                    </div>
                  
              {/* </div> */}
             
              </div>
            </div>
        </div>
    )
}

export default ControlPanelSetting