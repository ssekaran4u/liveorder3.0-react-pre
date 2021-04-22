import React from 'react'
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import Footer from "../../landing-page/components/Footer";
// import CopySetup from './CopySetup'
// import RPSSetup from './RPSSetup'
import {Button} from 'react-bootstrap'
import PRPSetupOption from "./PRPSetupoption";

const PRPAdd=(props)=>{
    let mrSubContent
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      <Link to="/user-setting"><span>Setup Module</span></Link>/
                       New PRP Setup Page</div>
                    //    console.log(props.match.params.id,"iii")
    return(
        <div>
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <Breadcrumbs content="New PRP Report Format" subContent={mrSubContent} />
                    {/* <div className="dcr-list-sec ">
                       <CopySetup />
                    </div> */}
                    <div className="">
                       <PRPSetupOption srnum={props.match.params.id}/>
                    </div>
                     {/* <div className="flexDisplay">
                        <div>
                            <Button onClick="" className="userSaveBtn">SAVE</Button>
                        </div>
                        <div>
                            <Button onClick="" className="userCancelBtn">CANCEL</Button>
                        </div>
                    </div>  */}
                    <Footer />
                </div>
            </div>
        </div>
    )
}
export default PRPAdd