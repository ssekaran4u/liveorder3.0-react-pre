import React, {Component} from 'react'

import { postToServer } from '../../lib/comm-utils'

import "../../../public/assets/font-awesome/css/font-awesome.css"
import "../../../public/assets/css/bootstrap.min.css"
import "../../../public/assets/css/style.css" 
import "../../../public/assets/css/responsive.css"

class Visitdetails extends Component{
    constructor(props){
        super(props)
        this.state={
            visitList:[]
        }
        this.getVisitDetails = this.getVisitDetails.bind(this)
    }
    componentDidMount(){ 
        
        this.getVisitDetails()
    }
    getVisitDetails() { 
 

         
        var data =  {"Token": "" ,"Index":"VisitDetails","Data":{"Doctor":this.props.doccode}}
        postToServer("DashBoardPage", data).then((result) => { 
            //Success  /Status
            if (result.data["Status"] == "Success") { 
                this.setState({ visitList: result.data.data })

              
            } else {

                this.setState({ visitList:[] })
            }


        }).catch((error) => {
            this.setState({ visitList:[] })
            console.log(error)
        
        })

    }

    render(){ 
        if(!this.state.visitList){
            return null
        }
        return(
            <div className="visit-container ">
                <h3 className="container-head">Pre Visit Details</h3>
                           <div className="pl24 maindivdrop visitdetbar">
                                {this.state.visitList.map((item,index) => (
                                    <div key={index}>
                                    <div className="clinicDiss">DWR Date</div>
                                    <div className="disscuss">{item.dte}</div>
                                    <div className="clinicDiss">In Clinic Discussion Message</div>
                                    <div className="disscuss">{item.C_Note1}</div>
                                    <div className="clinicDiss">Detailed Product</div>
                                    <ul className="explained-product disscuss">
                                    {item.product}
                                    </ul>
                                    <div className="border-bottom" />
                                    </div>
                                )) }
                            </div>
                            </div>
                       
                       
        )
    }
}

export default Visitdetails