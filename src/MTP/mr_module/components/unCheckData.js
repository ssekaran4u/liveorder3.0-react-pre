import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';

class UnCheckData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show
        }
        this.closeModal = this.closeModal.bind(this);
    }


    componentDidUpdate(olsdprops,state){
        if(olsdprops.show!=this.props.show){
            alert(this.props.show)
        }
    }

    closeModal() {
        this.setState({
            show: !this.state.show
        })
    }
    render() {
        return (
            <div className="uncheck-alert">
                <Modal centered className="mr-module-delete-popup" show={this.state.show} onHide={this.closeModal}>
                    <Modal.Body className="text-center">
                        <div className="alertImgPad" ><img src="../public/assets/images/danger.svg" /></div>
                        <div className="alertText">Are You Sure ?</div>
                        <div className="alertSubTextDelete">
                            You want to Uncheck it, Once you uncheck 
                            the data will not be saved.
                        </div>
                        <div className="alertBtns">
                            <Button className="cancelDelete" onClick={this.closeModal}><div className="txt-btn">Cancel</div></Button>
                            <Button className="okDelete" onClick={this.closeModal}><div className="txt-btn">OK</div></Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default UnCheckData;