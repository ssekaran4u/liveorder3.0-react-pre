import React,{Component} from 'react'
import DeleteDropdown from '../components/DeleteDropdown'
import {NavLink} from 'react-router-dom'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class ShowActions extends Component{
    constructor(props){
        super(props)
        this.state = {
            showDrop:false,
            showModal:false,
            successMsg:''
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.showApprovalDropdown= this.showApprovalDropdown.bind(this)
        this.hideApprovalDropdown= this.hideApprovalDropdown.bind(this)
       this.returnItem= this.returnItem.bind(this)
       this.RequestProcess = this.RequestProcess.bind(this)
       this.hide =this.hide.bind(this)
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
        this.setState({
            showDrop:!this.state.showDrop
        })
    }
    hideApprovalDropdown(){
        this.setState({
            showDrop:false
        })
    }
    returnItem(item){
        let a = item.split("~")[1]
        return a
    }
    RequestProcess(item,srno){ 
        let action = item.split("~")[0]
        var data = {
                "Index":"RequestUpdate",
                "Header":{
                    "SerialNo":srno,
                    "Action":action,
                    "Reason":""
                    },
                "Token":""
            }
            postToServer("Leave",data).then( (Result)=>{ 
                if(Result.data.Status == 'Success') { 
                    this.setState({ 
                        showModal: !this.state.showModal,
                        successMsg:Result.data.Data[0].status
                    })
                }
                    
                }).catch(  (Error)=> {  
                    this.setState({ Error: true, Errormsg: "Error in App At Request API " })
            })
    }
    hide(){
        this.setState({
            showModal:!this.state.showModal
        })
        this.props.updateStatus()
    }
    render(){ 
       
        let result
        
        if(this.props.reqAction && "string" == typeof(this.props.reqAction) ){   
            result = this.props.reqAction.split(",");
           
        }
       
        return(
            <div>
                <img src="../public/assets/images/overflow.svg"  className="handCurser" onClick={this.showApprovalDropdown} />
                {this.state.showDrop ? 
                <div>
                    {this.props.status == "Approved" || this.props.status == "Pending" ?
                    <div className="tdPosiion" 
                        key={this.props.value}>
                            <div onMouseLeave={this.hideApprovalDropdown}>{this.state.showDrop ? 


                                <div className="menuShow">
                                   {this.props.ReqType == 'LEAVE' ?
                                        <div>
                                            {result ? result.map((item,index) => (
                                                <div className="delText" key={index} onClick={()=> this.RequestProcess(item,this.props.srno)}>{this.returnItem(item)}</div>
                                            )):''}
                                        </div> :
                                        <NavLink activeClassName='is-active' className="" exact={true} to={this.props.url } onClick={this.props.showIcon}>
                                            <div className="delText">Confirm</div>
                                        </NavLink>
                                        }
                        
                                </div> : '' }
                    </div>
                </div> :''}
            </div>:''}
            <StatusPopup show={this.state.showModal} success="success" message={this.state.successMsg} onClose={this.hide} />
        </div>
        )
    }
}

export default ShowActions
