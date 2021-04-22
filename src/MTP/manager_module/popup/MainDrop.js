import React, { Component } from 'react';

class MainDrop extends Component {
    constructor(props){
        super(props);
        this.state = {
            show : false,
            deleteConfirm: false,
            deleteConfmMsg:''
        }

        this.showDropdown = this.showDropdown.bind(this);
        this.hideApprovalDropdown = this.hideApprovalDropdown.bind(this);
        this.showDeleteAlert= this.showDeleteAlert.bind(this);
      //  this.hideDeleteModal = this.hideDeleteModal.bind(this);
        
       // this.deleteData = this.deleteData.bind(this)
    }

    showDropdown(){
        this.setState({
            show : true
        })
    }

    hideApprovalDropdown(){
        this.setState({
            show : false
        })
    }


    showDeleteAlert(){
        this.props.deleteData()
    }
    
    
    
    render() {
        return (
            <React.Fragment>
                {/* { this.state.deleteAlert ? <DeleteAlert hideDeleteModal={this.hideDeleteModal} /> : null } */}
                <img src="../public/assets/images/overflow.svg" className="handCurser" onClick={ this.showDropdown }/>
                { this.state.show ? <div className="optionDrop" onMouseLeave={this.hideApprovalDropdown}>
                    {/* <li><Link to="/tourPlan" style={{color: "#6c757d"}}>View</Link></li> */}
                    {/* <li>Request for edit</li> */}
                    <li onClick={this.showDeleteAlert}>Delete</li>
                    {/* <li> <img src="../public/assets/images/delete.png"  onClick={this.showDeleteAlert}/></li> */}
                </div> : ''}
               
            </React.Fragment>
        );
    }
}

export default MainDrop;
