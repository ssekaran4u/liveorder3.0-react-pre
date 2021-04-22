import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form } from 'react-bootstrap';
import { Dropdown } from "semantic-ui-react";

class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            show : true
        }
        this.onClose = this.onClose.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onClose(){
        this.setState({
            show:false
        }) 
     }
 
     closeModal(){
         this.props.hideMOdal(this.state.show)
     }
    render() {
        
        return (
            <React.Fragment>
                    <Modal size="lg" centered className="" show={this.state.show} onHide={this.onClose}>
                        <Modal.Header className="plan-this-task applyLeaveHeader ">
                            <Modal.Title className="modalTitle">
                                ADD PRODUCTS AND SAMPLE DETAILS
                                <span
                                    className="modalCancelBtn"
                                    onClick={this.closeModal}
                                >
                                    <img src="../public/assets/images/cancel.png" />
                                </span>
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body className="plan-this-task">
                            <Form>
                                <div className="singledropdown mb-2 paddTop24 padd48">
                                    <Form.Label className="customized-label">
                                        Products
                                    </Form.Label>
                
                                        <Dropdown
                                            placeholder="Search or Select products"
                                            className="customized-input"
                                            fluid
                                            selection
                                            name="selectedType"
                                            // options={data}
                                        />
                                </div>

                                <div className="singledropdown mb-2 paddTop24 padd48">
                                    <Form.Label className="customized-label">
                                        Sample and Promotions
                                    </Form.Label>
                
                                        <Dropdown
                                            placeholder="Search or Select Sample and Promotions"
                                            className="customized-input"
                                            fluid
                                            selection
                                            name="selectedType"
                                            // options={leaveType}
                                        />
                                </div>

                                <div className="padd48 padBottom28">
                                    <Form.Label className="customized-label">
                                        Description
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        name="desc"
                                        rows="3"
                                        placeholder="Add Message here.."
                                        className="popup-textbox"
                                        value={this.state.desc}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className="plan-this-task">
                            <Button
                                variant="secondary"
                                onClick={this.closeModal}
                                className="cancelBtn"
                                
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="planBtn"
                                onClick={this.closeModal}
                            >
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </React.Fragment>
        );
    }
}

export default AddProduct;