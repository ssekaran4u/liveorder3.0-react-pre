import React,{Component} from 'react'
//import DeleteDropdown from '../components/DeleteDropdown'
import {NavLink} from 'react-router-dom'
import { postToServer } from '../../../lib/comm-utils'
import StatusPopup from '../../../lib/StatusPopup'
//import CancelReasonPopup from '../components/CancelReasonPopup'

class ShowActions extends Component{
    constructor(props){
        super(props)
        this.state = {
            showDrop:false,
            showModal:false,
            successMsg:'',
            cancelAlert:false,
            actionData:''
        }
   
         this.showApprovalDropdown= this.showApprovalDropdown.bind(this)
         this.hideApprovalDropdown= this.hideApprovalDropdown.bind(this)
   
      this.handleFwd = this.handleFwd.bind(this)
    }
    
    showApprovalDropdown(){
        this.setState({
            showDrop:!this.state.showDrop
        })
    }
    hideApprovalDropdown(){
        this.setState({
            showDrop:false
        })
    }
    
    handleFwd(srno,status,type,benificiary){
        this.props.showForword(srno,status,type,benificiary)
    }
    
    render(){ 
       
        // let result
        
        // if(this.props.reqAction && "string" == typeof(this.props.reqAction) ){   
        //     result = this.props.reqAction.split(",");
           
        // }
       // console.log("resu",result)
       
        return(
            <div className="rpsAction">
                 {/* {this.state.cancelAlert ? <CancelReasonPopup  Action={this.state.actionData} SerialNo={this.props.srno}  hideMOdal={this.hideMOdal} /> : null} */}
                <img 
                    src="../public/assets/images/overflow.svg"  
                    className="handCurser" 
                    onClick={this.showApprovalDropdown} 
                /><span className="ml10">{this.props.srno}</span>
                {this.state.showDrop ? 
                <div className="tdPosiion">
                    <div onMouseLeave={this.hideApprovalDropdown}>{this.state.showDrop ? 
                        <div className="menuShow">
                            <div className="delText" onClick={()=>this.handleFwd(this.props.srno,"C","confirm",this.props.benificiaryCode)}>Confirm</div>
                            <div  className="delText" onClick={()=>this.handleFwd(this.props.srno,"R","reject",this.props.benificiaryCode)}>Reject</div>
                            {this.props.status == "HOLD" ? '':
                            <div  className="delText"  onClick={()=>this.handleFwd(this.props.srno,"H","Hold",this.props.benificiaryCode)}>Hold</div>}
                            <div  className="delText" onClick={()=>this.handleFwd(this.props.srno,"F","forwd",this.props.benificiaryCode)}>Forward</div>
                            <div  className="delText" onClick={()=>this.handleFwd(this.props.srno,"V","view",this.props.benificiaryCode)}>View</div>
                        </div>:''}
                    </div>
                </div>:''}
            <StatusPopup show={this.state.showModal} success="success" message={this.state.successMsg} onClose={this.hide} />
        </div>
        )
    }
}

export default ShowActions
