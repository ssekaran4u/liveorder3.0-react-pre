import React, { Component } from "react";
import { Modal, Button , Card} from "react-bootstrap";
import { setInterval } from 'timers';

class MrsubmitChart extends Component{
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
              <p className="order-para-cnfrm">SFC Sent for Approval</p>
              <p>Please check the record in SFC List</p>
              <button className="btn-done-order1" onClick={this.props.onHide} >OK</button>
              
              </div>
              
             </Modal>
            </div>

        )
    }
}

export default MrsubmitChart