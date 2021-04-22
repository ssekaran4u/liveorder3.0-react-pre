import React,{Component} from 'react'
import Breadcrumbs from '../BasicComponet/breadcrumbs'
import {Link} from 'react-router-dom'
import Footer from '../landing-page/components/Footer';
import { postToServer } from '../lib/comm-utils'

class MarketingDashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            headdata: {},
        }
    }
    componentDidMount(){
        let _this = this
            var data = {
                "index": "Basicinfo",
                "Result":"0",
               
                "TableName": "",
                "ColumnName": "",
                "Data": [
                    {
                    "doc":"",
                    "year": "",
                    "month": "",
                    "Result":"1"
                    }
                ]
            }
            postToServer("USerinfo", data)
                .then(function (result) {
                _this.setState({headdata:result.data[0]})
                }) 
    }
    render(){
        let name
        if(this.state.headdata["C_Name"]){
            let namestring = this.state.headdata["C_Name"]
            name=namestring.toLowerCase()
        }
        var subContent = <div className="sub-content">
                            Dashboard
                        </div>
        return(
            <div>
                 {/* <div className="content-spacing dashscroll">
                    <div className="min-height-100">
                        <div className="dcr-head">
                            <div>
                                <h4 className="dahboardheading">
                                    Welcome , <span className="userName">{name}</span>
                                </h4>
                            </div>
                            <div className="demopage">

                            </div>
                        </div>
                        <Footer />
                    </div>
                   
                </div> */}
                 <div className="content-spacing body-scroll">
                <div className="min-height-100">
                <h4 className="dahboardheading">
                                    Welcome , <span className="userName">{name}</span>
                                </h4>
                    <div className="materialEntryField">
                        <div className="dcr-head">
                            <h5  className="dispatchUploadHead">
                                <div className="demopage"></div>
                            </h5>
                        </div>
                    </div>
                    <Footer />
                    </div>
                    </div>
            
        </div>
                
           
        )
    }
}

export default MarketingDashboard