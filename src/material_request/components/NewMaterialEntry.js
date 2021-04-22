import React,{Component} from 'react'
import {Breadcrumb} from 'react-bootstrap'
import MaterialEntryDropdown from '../components/MaterialEntryDropdown'
import {Link} from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';

function NewMaterialEntry(props){

    // render(){
       // let srno = localStorage.getItem("srno")
       let srno  = props.match.params.id;
       let visitFlag = localStorage.getItem("visitingFlag")
        let url = localStorage.getItem("type");
        //let senderempcode =  localStorage.getItem("senderempcode");
        return(
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">Material Request Entry</h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item href="#"><Link to='/dashboard'>Dashboard</Link></Breadcrumb.Item>
                                <Breadcrumb.Item >Operational</Breadcrumb.Item>
                                <Breadcrumb.Item >
                                    {url == "mr" ? 
                                        <Link to='/material_request'>Material Request List</Link>
                                    :<Link to='/manager_material'>Material Request List</Link>}
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>New Request Entry</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                   
                    <MaterialEntryDropdown 
                        srno={srno} 
                        visitFlag={visitFlag} 
                        url={url}
                        // senderempcode ={senderempcode}
                    />
                    <Footer />
                </div>
               
               
            </div>
        )
    // }
}
export default NewMaterialEntry