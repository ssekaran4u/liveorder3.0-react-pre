import React,{Component} from 'react'
import {Modal,Form,Row,Col} from 'react-bootstrap';

class Alert extends Component{
    constructor(props){
        super(props)
        this.state={
            show:true
        }
        this.onClose = this.onClose.bind(this)
    }
    onClose(){
       this.setState({
           show:false
       }) 
    }
    
    render(){
        return(
                <Modal centered className="alert" show={this.state.show} onHide={this.onClose}>
                    <Modal.Body className="text-center">
                    <div className="alertImgPad" ><img src="../public/assets/images/danger.svg" /></div>
                        <div className="alertText">Are You Sure ?</div>
                        <div className="alertSubText">You want to cancel your leave, please give me reason</div>
                        <div>
                            <Form.Control type="text" className="customized-input" placeholder="Please Enter Here" />
                        </div>
                        <div className="alertBtns">
                        <Row>
                        <Col lg={2} md={2} ></Col>
                        <Col lg={4} md={4} >
                            <div className=" cancel">Cancel</div>
                            </Col>
                            <Col lg={4} md={4}>
                            <div className="ok">ok</div>
                            </Col>
                            <Col lg={2} md={2} ></Col>
                            </Row>
                        </div>
                    </Modal.Body>
                </Modal>
                )
    }
    
}
export default Alert 

