import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import "../../public/assets/css/BasicComponents/sfaModal.css"

class SfaModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // show: this.props.show
        }
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({
            show: !this.state.show
        })
    }
    render() {
        return (
            <React.Fragment>
                <Modal 
                className="sfa-modal-container" 
                centered show={this.props.show} 
                onHide={this.props.onHide} 
                size={this.props.size?this.props.size:"md"}
                >
                    {this.props.imagePath && <img src={this.props.imagePath} alt="" />}
                    {this.props.mainText &&
                    <div className="sfa-modal-main-text-container">
                        {this.props.mainText}
                    </div>
                    }
                    {this.props.text &&
                        <div className="sfa-modal-text-container">
                            {this.props.text}
                        </div>
                    }
                    {this.props.subDiv &&
                    <div className="sub-div">
                        {this.props.subDiv}
                    </div>
                    }
                    {this.props.buttonGroup && <div className="sfa-modal-button-group">{this.props.buttonGroup}</div>}
                </Modal>
            </React.Fragment>
        )
    }
}

export default SfaModal;