import React, { Component } from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import UploadedDocumentList from './UploadedDocumentList'
import { postToServer, fileUpload } from '../../../lib/comm-utils'
import DownloadDocumentList from '../popup/DownloadDocumentList'


class DownloadDocumentPopup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageUploadFile: [],
            documentList: [],
            uploadSuccessMsg: ''
        }
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.showdownloadModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="expenseRps">

                    <Modal.Header closeButton onClick={this.props.onHide}>
                        <Modal.Title className="sales-headertitle" id="contained-modal-title-vcenter">
                            Download Documents
                   </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="upload-file-popup body-scroll">
                        <div className="uploaded-list">
                            <DownloadDocumentList getUploadedDocument={this.getUploadedDocument} stockist={this.props.stockist} month={this.props.month} year={this.props.year} documentList={this.props.documentList} />
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}




export default DownloadDocumentPopup
