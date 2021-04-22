import React,{Component} from 'react';
import DeleteAlert from './DeleteAlert';
import CancelAlert from './CancelAlert';

class ShowDropdown extends Component{
    constructor(props){
        super(props)
        this.state = {
            showDrop:false,
            deleteAlert: false,
            cancelAlert: false
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.showApprovalDropdown= this.showApprovalDropdown.bind(this)
        this.hideApprovalDropdown= this.hideApprovalDropdown.bind(this)
        this.showDeleteAlert= this.showDeleteAlert.bind(this);
        this.showCancelAlert= this.showCancelAlert.bind(this);
        this.hideMOdal = this.hideMOdal.bind(this);
        this.hideDeleteModal = this.hideDeleteModal.bind(this);
       
    }
    handleHover(){ 
        this.setState({
            showDropdown:!this.state.showDropdown
        })
      
    }
    deleteItem(action,srno,retype,fs){
        
        this.props.getDropdown(action,srno,retype,fs)
    }
    hideDrop(){
        this.setState({
            showDropdown:!this.state.showDropdown
        })
    }
    showApprovalDropdown(){

      // console.log(this.props.leavestatus1,'pk')
        this.setState({
            showDrop:true
        })
    }
    hideApprovalDropdown(){
        this.setState({
            showDrop:false
        })
    }

    showDeleteAlert(){
        this.setState({
            deleteAlert: !this.state.deleteAlert
        })
    }

    showCancelAlert() {
        this.setState({
            cancelAlert: !this.state.cancelAlert
            
        })
        
    }
    hideMOdal(){ 
        this.setState({
            cancelAlert:!this.state.cancelAlert
        })
    }

    hideDeleteModal(){ 
        this.setState({
            deleteAlert:!this.state.deleteAlert
        })
    }

     componentDidMount(){
         //console.log(this.props,'ok')
     }
    
    render(){
        let res=''
        let ser=''
        if(this.props.Req_Action){   
            res = this.props.Req_Action.split("~");
        }
        // if(this.props.reqAction && "string" == typeof(this.props.reqAction) ){   
        //     result = this.props.reqAction.split("~");
           
        // }
        if(this.props.N_Srno){
            ser = this.props.N_Srno;
        }
        

        // console.log("ffffffffffffffffffffffffffffffffffff", this.props.leavestatus1)
        return(
            <div>
                
                {this.state.deleteAlert ? <DeleteAlert  getstatusselection={this.props.getstatusselection} SerialNo={ser} Action={res[0]} hideDeleteModal={this.hideDeleteModal} /> : null}
                {this.state.cancelAlert ? <CancelAlert getstatusselection={this.props.getstatusselection} SerialNo={ser} Action={res[0]}  hideMOdal={this.hideMOdal} /> : null}
                <img src="../public/assets/images/overflow.svg"  className="handCurser" onClick={this.showApprovalDropdown} />
                    {this.state.showDrop ? 
                        <div>
                            {this.props.leavestatus1 == 'Pending'  || this.props.leavestatus1 =="Approved"    ?
                                <div className="tdPosiion" >
                                    <div onMouseLeave={this.hideApprovalDropdown}>
                                        {this.state.showDrop ? 
                                            <div className="leaveShowMenu">
                                                {res[0] == "D" ? <div onClick={this.showDeleteAlert}>{res[1]}</div> :  res[0] == "F" ? <div onClick={this.showCancelAlert}>{res[1]}</div> : '' }
                                             </div>
                                        : '' }  
                                    </div>
                                </div> :''}
                        </div> : ''}

                            
                       
            </div>   
        )
    }
}



export default ShowDropdown;