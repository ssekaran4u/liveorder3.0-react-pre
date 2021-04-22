import React,{Component} from 'react'
import {Modal,Form,Row,Col} from 'react-bootstrap';

class ConfirmationBox extends Component{
    constructor(props){
        super(props)
        this.state={
            show:true
        }
        this.btnResponse = this.btnResponse.bind(this)
    }
  
    btnResponse(res){
        this.props.btnResponse(res)
    }
    
    render(){
        return(
                <Modal centered className="alert" show={this.props.show} onHide={this.props.onClose}>
                    <Modal.Body className="text-center">
                    <div className="alertImgPad" ><img src="../public/assets/images/danger.svg" /></div>
                        <div className="alertText">Are You Sure ?</div>
                        <div className="alertSubText f14">{this.props.msg}</div>
                        <div className="alertBtns">
                            <Row>
                                <Col lg={2} md={2} xs={2}></Col>
                                <Col lg={4} md={4} xs={4}>
                                    <div className="cancel hcursur" onClick={()=>this.btnResponse('no')}>No</div>
                                </Col>
                                <Col lg={4} md={4} xs={4}>
                                    <div className="ok hcursur" onClick={()=>this.btnResponse('yes')}>Yes</div>
                                </Col>
                                <Col lg={2} md={2} ></Col>
                            </Row>
                        </div>
                    </Modal.Body>
                </Modal>
                )
    }
    
}
export default ConfirmationBox 

