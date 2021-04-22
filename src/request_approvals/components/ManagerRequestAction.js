import React, { Component } from 'react';

class ManagerRequestAction extends Component {
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
                <div>
                    <span className="" onClick={this.showApprovalDropdown}>
                        <img src="../public/assets/images/overflow.svg" />
                    </span>
                    <div className="tdPosiion" 
                        key={this.props.value}>
                        <div onMouseLeave={this.hideApprovalDropdown}>
                        {this.state.showDrop ? 
                        <div className="menuShow" onClick={this.hideApprovalDropdown}>
                            <div className="delText" >Delete</div>
                        </div> 
                        : 
                        '' 
                        }
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

export default ManagerRequestAction;