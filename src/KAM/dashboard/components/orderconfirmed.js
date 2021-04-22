import React, { Component } from "react";
import { Modal, Button , Card} from "react-bootstrap";
import { setInterval } from 'timers';

class OrderConfirmed extends Component{
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
             <Modal   className="master-success2"
          {...this.props}
          
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
              <div className="succsimg">
              <img className="img-ordersuccess" src="../public/assets/images/submit.png"/>
              <p className="order-para-cnfrm">Order has been Confirmed !   </p>
              
              </div>
              
             </Modal>
            </div>

        )
    }
}

export default OrderConfirmed