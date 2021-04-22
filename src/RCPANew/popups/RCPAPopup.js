import React, { Component } from "react";
import { Form, Modal, Button,Row,Col } from "react-bootstrap";
import StatusPopup from '../../lib/StatusPopup'

class RCPAPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            showTaskModal: true,
            CompititorName: '',
            BrandName: '',
            UnitPrice: '',
            Error: false,
            Errormsg: ''
        };
        this.hideTaskModal = this.hideTaskModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.CompititorName=this.CompititorName.bind(this);
        this.BrandName=this.BrandName.bind(this);
        this.UnitPrice = this.UnitPrice.bind(this);
        this.ONsubmit=this.ONsubmit.bind(this);
        this.Errorclose = this.Errorclose.bind(this)
    }

    Errorclose() {
        this.setState({ Error: false })
    }
    
    CompititorName(param){
         const val=param.target.value
         this.setState({ CompititorName:val })
    }
    
    BrandName(param){
        const val=param.target.value
        this.setState({ BrandName:val })
    }
    
    UnitPrice(param) {
        this.setState({ UnitPrice: param.target.value })
    }
    
    ONsubmit(param){
        let checkUnitPrice = false
        if (this.props.configurationData.n_unitprice_consider == "0") {
            checkUnitPrice = true
        }

        if (this.state.CompititorName == "" || this.state.BrandName == "") {
            this.setState({
                Error: true,
                Errormsg: 'Please fill all the details'
            })
            Errorstate = true
            return null
        }
        
        if (checkUnitPrice == true && this.state.UnitPrice == "") {
            this.setState({
                Error: true,
                Errormsg: 'Please fill all the details'
            })
            Errorstate = true
            return null
        }

        const  _this=this
        let unitPriceToAdd = this.state.UnitPrice
        if (unitPriceToAdd == "") {
            unitPriceToAdd = "0"
        }
        _this.props.RcpaNewEntry(this.state.CompititorName, this.state.BrandName, unitPriceToAdd)
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
                                    <Form.Control onChange={this.CompititorName} type="text" className="customized-input" placeholder="Enter here" />
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="customized-label">Manufacturer Name</Form.Label>
                                    <Form.Control onChange={this.BrandName} type="text" className="customized-input" placeholder="Enter here" />
                                </Form.Group>
                            </Col>
                            { this.props.configurationData.n_unitprice_consider == "0" ? 
                                <Col lg={6} md={6} sm={12} xs={12}>
                                    <Form.Group controlId="formBasicUnitPrice">
                                        <Form.Label className="customized-label">Unit Price</Form.Label>
                                        <Form.Control  onChange={this.UnitPrice} type="number" className="customized-input" placeholder="Enter here" />
                                    </Form.Group>
                                </Col>
                            :   null }
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
                <StatusPopup
                    message={this.state.Errormsg}
                    show={this.state.Error}
                    onClose={this.Errorclose}
                    success={false} />
            </div>
        );
    }
}

const MapDispatchToProps = dispatch => ({
    AddnewTask: data => dispatch(AddnewTask(data)),
    AddnewPlannedTask: data => dispatch(AddnewPlannedTask(data))
});

export default RCPAPopup
