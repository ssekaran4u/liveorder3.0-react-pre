import React,{Component} from 'react'
import {Modal,Form,Row,Col} from 'react-bootstrap';

class DeleteAlert extends Component{
    constructor(props){
        super(props)
        this.state={
            // show:true,
            reason:'',
            resonMsg:''
        }
        this.onClose = this.onClose.bind(this)
        this.btnAction= this.btnAction.bind(this)
        this.getReason = this.getReason.bind(this)
    }
    onClose(){
       this.setState({
           show:false,
       }) 
    }
    btnAction(data,validation){
        if(data == 'yes'){
            if(validation == "1"){
                this.props.btnAction(data,this.state.reason)
            }else{
                if(this.state.reason == ""){
                    this.setState({
                        resonMsg:"please enter reason"
                    })
                }else{
                    this.props.btnAction(data,this.state.reason)
                }
            }
        }else{
            this.setState({
                resonMsg:''
            })
            this.props.btnAction(data,this.state.reason)
        }
        
    }
    getReason(){
        const reason = event.target.value
        this.setState({
            reason:reason
        })
        // this.props.getReason(reason)
    }
    render(){
        return(
                <Modal centered className="alert" show={this.props.show} onHide={this.onClose}>
                    <Modal.Body className="text-center">
                    <div className="alertImgPad" ><img src="../public/assets/images/danger.svg" /></div>
                        <div className="alertText">Are You Sure ?</div>
                        <div className="alertSubText">{this.props.msg}</div>
                        <div>
                            <Form.Control 
                                type="text" 
                                className="reason-input" 
                                placeholder="Please Enter Here" 
                                value={this.state.reason}
                                onChange={this.getReason}
                            />
                        </div>
                        <div className="resonErr">{this.state.resonMsg}</div>
                        <div className="alertBtns">
                        <Row>
                        <Col lg={2} md={2} ></Col>
                        <Col lg={4} md={4} >
                            <div className=" cancel hcursur"  onClick={()=>this.btnAction('no')}>Cancel</div>
                            </Col>
                            <Col lg={4} md={4}>
                            <div className="ok hcursur" onClick={()=>this.btnAction('yes',this.props.validation)}>ok</div>
                            </Col>
                            <Col lg={2} md={2} ></Col>
                            </Row>
                        </div>
                        
                    </Modal.Body>
                </Modal>
                )
    }
    
}
export default DeleteAlert 

