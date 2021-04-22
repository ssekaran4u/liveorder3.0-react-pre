import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'

import ConfirmModal from "../admincomponents/Popups/ConfirmModal"
class ActionDropdown extends Component{
  constructor(props){
    super(props)
      this.state={
        showDrop:false,
        ShowConfirm : false
        }
      this.showApprovalDropdown = this.showApprovalDropdown.bind(this)
      this.hideApprovalDropdown = this.hideApprovalDropdown.bind(this)
			this.ConfirmData = this.ConfirmData.bind(this)
			this.HoldData = this.HoldData.bind(this)
			this.RejectData = this.RejectData.bind(this)
    }
showApprovalDropdown(){
  this.setState({showDrop:true})
    }
hideApprovalDropdown(){
  this.setState({
    showDrop:false
    })
  }
ConfirmData(){
  let ClickedSrNo = this.props.srno
  this.props.showConfirm(ClickedSrNo)
	}
HoldData(){
	let ClickedSrNo = this.props.srno
  this.props.showHold(ClickedSrNo)
	}
RejectData(){
	let ClickedSrNo = this.props.srno
	this.props.showReject(ClickedSrNo)
}
    render(){
      return(
        <div>
          <img src="../public/assets/images/overflow.svg"  className="handCurser" onClick={this.showApprovalDropdown}   />
          {/* <div className="tdPosiion"> */}
          <div className="prpabsolute">
            <div onMouseLeave={this.hideApprovalDropdown}>
            {/* <div> */}
              {this.state.showDrop ? 
                <div className="menuShow prpmenushow">
									<div className="delText" onClick={this.ConfirmData}>Confirm</div>
									<div className="delText" onClick={this.HoldData}>Hold</div>
									<div className="delText" onClick={this.RejectData}>Reject</div>
                </div> : '' }                               
            </div>
          </div>
        </div>
        )
    }
}
export default ActionDropdown