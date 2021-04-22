import React,{Component} from 'react'
import SfcmrLoactiondrpdn from './sfcmrloactiondropdown'
import {postToServer} from '../../../lib/comm-utils'
import { Row, Col, Breadcrumb, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
class NewSfcEdit extends Component{
    constructor(props){
        super(props)
        this.state={
            mysfclist:[]
        }
    }
    componentDidMount(){
        var data={
            "Index":"SFC"
        }
        postToServer("SFC",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
        // console.log( Result.data.Result ,"soundarya")
            this.setState({ mysfclist: Result.data.Result })
        }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
         }  )
        
        
    }
    render(){
        return(
            <div className="dashboard-sec ">
        <div className="admindashboard">
          <div className="content-spacing dashscroll">
            <div className="min-height-100">
              <div className="flex-row">
                <div>
                  <h4 className="dahboardheading">Standard Fare Chart (SFC)</h4>
                </div>
                <div>
                  <Breadcrumb className="dcr-breadcrumb">
                    <Breadcrumb.Item>
                      <Link to="/">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <Link    to="/sfcmr">My SFC List </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                     New SFC Chart
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
                <SfcmrLoactiondrpdn data={this.state.mysfclist} />
            </div>
            </div>
            </div>
            </div>
            

        )
    }
}
export default NewSfcEdit