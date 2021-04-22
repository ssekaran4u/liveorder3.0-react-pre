import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import Footer from "../../landing-page/components/Footer";
import RCPAEntryDetails from './RCPAEntryDetails';

const RCPAEntry=(props)=>{
    const [ date,setDate] = useState(new Date())
    const [clearsearch,setClear] = useState(false)
    const [serachKey,setSearchkey] = useState('0')
    const [Searchdata,setData] = useState('')

    let mrSubContent
    mrSubContent = <div className="sub-content">
                      <Link to="/dashboard"><span>Dashboard</span></Link>/ 
                      <Link to="/user-setting"><span>RCPA List</span></Link>/
                       Create RCPA</div>

    

   
    return(
        <div>
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                <Breadcrumbs content="Create RCPA Entry" subContent={mrSubContent} />
                    <div className="">
                       <RCPAEntryDetails />
                    </div>
                <Footer />
                </div>
            </div>
        </div>
    )
}



export default (RCPAEntry)