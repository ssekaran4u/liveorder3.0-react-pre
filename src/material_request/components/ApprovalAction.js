import React,{Component} from 'react'
import StatusPopup from '../../lib/StatusPopup'
import ConfirmationBox from '../../lib/ConfirmationBox'

class ApprovalAction extends Component{
    constructor(props){
        super(props)
        this.state={
            showDrop:false,
            confrimState:false,
            msg:'',
            showApproved:false
        }
        this.showApprovalDropdown = this.showApprovalDropdown.bind(this)
        this.submitApprove = this.submitApprove.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.getBtnResponse = this.getBtnResponse.bind(this)
    }
    showApprovalDropdown(){
        this.setState({
            showDrop:!this.state.showDrop
        })
    }
    submitApprove(){
        this.setState({
            confrimState:!this.state.confrimState,
            msg:'You want to Approve it ? '
        })
    }
    getBtnResponse(data){
        if(data == 'yes'){
            this.setState({
                showDrop:!this.state.showDrop,
                confrimState:!this.state.confrimState,
                showApproved:!this.state.showApproved
            })
        }else{
            this.setState({
                confrimState:!this.state.confrimState
            })
        }
    }
    hideModal(){
        this.setState({
            confrimState:!this.state.confrimState
        })
    }
    submitReject(){
        
    }
    render(){
        return(
            <div>
            {/* {this.state.cancelAlert ? <CancelReasonPopup  Action={this.state.actionData} SerialNo={this.props.srno}  hideMOdal={this.hideMOdal} /> : null} */}
           {this.state.showApproved ? 
           <img src="../public/assets/images/correct_green.svg"   />
           :
           <img src="../public/assets/images/overflow.svg"  className="handCurser" onClick={this.showApprovalDropdown} />
            }
           {this.state.showDrop ? 
           <div>
               
               <div className="tdPosiion" 
                   key={this.props.value}>
                       <div onMouseLeave={this.hideApprovalDropdown}>
                           {this.props.user == "manager" ?
                           <div className="popupDiv">
                               <div className="divItem" onClick={this.submitApprove}>Approve</div>
                               <div className="divItem" onClick={this.submitReject} >Reject</div>
                            </div> :
                            <div className="popupDiv">
                            <div className="divItem" onClick={this.submitApprove}>Confirm</div>
                            <div className="divItem" onClick={this.submitReject} >Reject</div>
                            <div className="divItem" onClick={this.submitReject} >Postpone</div>
                         </div>}
               </div>
           </div> 
       </div>:null}
       <StatusPopup show={this.state.showModal} success="success" message={this.state.successMsg} onClose={this.hide} />
       <ConfirmationBox 
            show={this.state.confrimState}
            onClose={this.hideModal}
            msg={this.state.msg}
            btnResponse={this.getBtnResponse}
        /> 
   </div>
        )
    }
}

export default ApprovalAction