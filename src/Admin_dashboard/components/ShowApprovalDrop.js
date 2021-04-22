import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
class ShowApprovalDrop extends Component{
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
    getaction(data){
        //console.log("data",this.props.requestType.props.children[1].props.children)
        this.props.getAction(data,this.props.srno,this.props.requestType)
    }
    
    render(){ console.log("ReqType",this.props.ReqType)
    let string =[]
    
    if(this.props.requestAction){
        string  =  this.props.requestAction.split(',');
      //  action = string[1];console.log("ss",action)
    //   string.map((item)=>{
    //       console.log("item",item)
    //   })
    }
    console.log("dd",this.props.ReqType)
        return(
            <div >
                <img src="../public/assets/images/overflow.svg"  className="handCurser" onClick={this.showApprovalDropdown}   />
                {this.props.requestType == "LEAVE" ? '':
                    <div className="tdPosiion" 
                   
                    key={this.props.value}>
                        <div onMouseLeave={this.hideApprovalDropdown}>{this.state.showDrop ? 
                            <div className="menuShow">
                                {this.props.RequstType == "2" ? 
                                <NavLink  className="" exact={true} to='/manager_material' onClick={this.props.showIcon}>
                                    <div className="delText" >Confirm</div>
                                </NavLink>:
                                this.props.requestType == "Material Request" ? 
                                <NavLink  className="" exact={true} to='/manager_material' onClick={this.props.showIcon}>
                                    <div className="delText" >Confirm</div>
                                </NavLink>:
                                <NavLink  className="" exact={true} to={this.props.url } onClick={this.props.showIcon}>
                                    <div className="delText" >Confirm</div>
                                </NavLink>}
                            </div> : '' }
                                   
                        </div>
                </div>}
            </div>
        )
    }
}
export default ShowApprovalDrop