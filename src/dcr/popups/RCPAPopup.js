import React, { Component } from "react";
import { Form, Modal, Button,Row,Col } from "react-bootstrap";



class RCPAPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            showTaskModal: true,
            CompititorName:'',
            BrandName:''
            
        };
        this.hideTaskModal = this.hideTaskModal.bind(this);
       
      
        this.handleChange = this.handleChange.bind(this);
        this.CompititorName=this.CompititorName.bind(this)
        this.BrandName=this.BrandName.bind(this)
        this.ONsubmit=this.ONsubmit.bind(this)
     
    }
    CompititorName(param){

         const val=param.target.value

         this.setState({ CompititorName:val })

    }
    ONsubmit(param){
     
        const  _this=this
        //this.state.CompititorName,this.state.BrandName
        _this.props.RcpaNewEntry(this.state.CompititorName,this.state.BrandName) 
    }

    BrandName(param){
        const val=param.target.value
        this.setState({ BrandName:val })
    }

    hideTaskModal() {
        this.setState({
            showTaskModal: false
        });
    }

   
    handleChange(e) {
        this.setState({
            desc: e.target.value
        });
    }


    
   

    render() {
        const { taskType } = this.state;
        return (
            <div>
                <Modal size="lg" show={this.props.showTaskModal} centered>
                    <Modal.Header className="plan-this-task">
                        <Modal.Title className="modalTitle">
                            ADD  NEW Competitor Product Details
                            <span
                                className="modalCancelBtn"
                                onClick={this.props.closeModal}
                            >
                                <img src="../public/assets/images/cancel.png" />
                            </span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="plan-this-task">
                        <Form>
                        <Row className="rcpaModal">
                            <Col lg={6} md={6} sm={12} xs={12} >
                                <Form.Group controlId="formBasicEmail ">
                                    <Form.Label className="customized-label">Brand Name</Form.Label>
                                    <Form.Control  onChange={this.BrandName}  type="text" className="customized-input" placeholder="Enter here" />
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="customized-label">Manufacturer</Form.Label>
                                    <Form.Control  onChange={this.CompititorName} type="text" className="customized-input" placeholder="Enter here" />
                                </Form.Group>
                            </Col>
                        </Row>
                           
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="plan-this-task">
                        <Button
                            variant="secondary"
                            onClick={this.handleClose}
                            className="cancelBtn"
                            onClick={this.props.closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="planBtn"
                            onClick={this.ONsubmit }
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const MapDispatchToProps = dispatch => ({
    AddnewTask: data => dispatch(AddnewTask(data)),
    AddnewPlannedTask: data => dispatch(AddnewPlannedTask(data))
});

export default RCPAPopup
