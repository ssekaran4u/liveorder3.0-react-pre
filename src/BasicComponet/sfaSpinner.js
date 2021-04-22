import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import "../../public/assets/css/BasicComponents/sfaSpinner.css";

class SfaSpinner extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPopUp : true,
        }
        this.onHide = this.onHide.bind(this);
    }

    onHide(){
        this.setState({showPopUp: true})
    }

    render() {
        return (
            <Modal
                className="spinner-modal"
                centered
                show={this.state.showPopUp}
                onHide={this.onHide}
                size="lg"
            >
                <Spinner className="sfa_spinner" animation="border" variant="primary"/>
            </Modal>
        )
    }
}

export default SfaSpinner;