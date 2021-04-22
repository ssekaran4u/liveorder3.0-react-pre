import React, { Component } from 'react';

class ManagerShowApprovalDrop extends Component {
    constructor(props){
        super(props)
        this.state={
            showDrop:false
        }
        this.showApprovalDropdown = this.showApprovalDropdown.bind(this)
        this.hideApprovalDropdown = this.hideApprovalDropdown.bind(this)
    }
    showApprovalDropdown(){
        this.setState({
            showDrop:true
        })
    }
    hideApprovalDropdown(){
        this.setState({
            showDrop:false
        })
    }
    render() {
        return (
            <div onMouseLeave={this.hideApprovalDropdown}>
                <span className="pending_drop" onClick={this.showApprovalDropdown}>
                Pending<img src="../public/assets/images/pending_drop.svg" />
                </span>
                
                
                    <div className="tdPosiion" 
                   
                    key={this.props.value}>
                        <div>{this.state.showDrop ? 
                            <div className="menuShow" onClick={this.hideApprovalDropdown}>
                            <div className="delText" >Confirm</div>
                            <div className="delText"  >Reject</div></div> : '' }
                                   
                        </div>
                </div> 
            </div>
        );
    }
}

export default ManagerShowApprovalDrop;