import React, { Component } from "react";
import { Modal, Button , Card} from "react-bootstrap";
import { setInterval } from 'timers';
import { Link } from 'react-router-dom'

class SfclistApprove extends Component{
    constructor(props){
        super(props) 
        this.state={
            hidesucces:true,
        }
         this.onOrder = this.onOrder.bind(this)
    }
   
   onOrder(){
       this.props.onHide()
       this.setState({
        hidesucces:false,
       })
   }
     
    

    render(){
        // console.log(this.props);

        return(
            <div className="ordersuccs" onClick={this.onOrder} >
             <Modal   className="master-success3"
          {...this.props}
          
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
              <div className="succsimg1">
              <img className="img-ordersuccess" src="../public/assets/images/submit.png"/>
              {this.props.showapprovalpopup ? <p className="order-para-cnfrm">You Have Approved</p> : <p className="order-para-cnfrm">You Have Confirmed</p>}
        <p className="apprvedsfchart" >Standard Fare Chart No. {this.props.sId} of {this.props.sName}</p>
            {/* <Link to =  {"/sfclistadmin/" }>  <button className="btn-done-order1" onClick={this.props.onHide} >Done</button></Link> */}
            {this.props.showapprovalpopup ?  <Link to =  {"/sfcmr" }>  <button className="btn-done-order1" onClick={this.props.onHide} >Done</button></Link>: 
             <Link to =  {"/sfclistadmin/" }>  <button className="btn-done-order1" onClick={this.props.onHide} >Done</button></Link>}
              
              </div>
              
             </Modal>
            </div>

        )
    }
}

export default SfclistApprove

