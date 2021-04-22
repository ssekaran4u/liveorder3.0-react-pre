import React, { Component } from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import UploadedDocumentList from './UploadedDocumentList'
import { postToServer, fileUpload } from '../../../lib/comm-utils'


class UploadFileSecondarySale extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageUploadFile: [],
            documentList: [],
            uploadSuccessMsg: ''
        }
        this.uploadFile = this.uploadFile.bind(this)
        this.getUploadedDocument = this.getUploadedDocument.bind(this)
    }
    uploadFile(e) {
        //  this.setState({ uploadFileValidate: "" })
        let files = e.target.files;
        let fileData = []
        Object.values(files).map((res, i) => {
            fileData.push({
                "id": i,
                "ImgFilename": res.name,
                "path": URL.createObjectURL(res)
            })

        })
        let token = localStorage.getItem("SFA_TOKEN")
        const data1 = new FormData();
        Object.values(files).map(res => {
            data1.append("file", res)
        })
        data1.append("Token", token);
        data1.append("Index", "SecondarySalesUpload");
        data1.append("srno", this.props.srno);
        data1.append("stock", this.props.stockist)
        fileUpload("SecondarySalesUpload", data1).then((result) => {
            if (result.data.Status == "Success") {
                setTimeout(
                    function () {
                        this.props.getUploadedDocumentList(this.props.month.toString(), this.props.year.toString(), this.props.stockist)
                        this.setState({ saveFile: result.data.data })
                    }
                        .bind(this),
                    2000
                );
                setTimeout(function () {
                    this.setState({ imageUploadFile: [], uploadSuccessMsg: '' });

                }.bind(this), 1000)

            }
        });
        this.setState({ imageUploadFile: [...this.state.imageUploadFile, ...fileData] })


    }
    getUploadedDocument(month, year, stockist) {
        this.props.getUploadedDocumentList(month.toString(), year.toString(), stockist)

    }
    render() {
        return (
            <div>
                <Modal
                    show={this.props.showUploadFileModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="expenseRps">

                    <Modal.Header closeButton onClick={this.props.onHide}>
                        <Modal.Title className="sales-headertitle" id="contained-modal-title-vcenter">
                            Stock and Sales Documents Upload
                   </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="upload-file-popup body-scroll">


                        <Col xs={12} md={12} lg={12} xl={12}>
                            <div className="relative">
                                <input type="file" className="fileupload-input mt-1" multiple accept="image/png, image/jpeg, image/jpg" onChange={this.uploadFile} />
                                <div className="secondary secondary-outline uploadfile mr-3 mt-1">
                                    <img src="../public/assets/images/attachment.svg" className="mr-2" />Upload File
                  </div>
                                {this.state.imageUploadFile.length > 0 ?
                                    this.state.imageUploadFile.map((res, i) => (
                                        <div>
                                            <span className="attachmentprp srcDetails" key={i}>{res.ImgFilename}</span>
                                            {/* <div className="attachmentdiv">
                                            <img src="../../public/assets/images/cancel-white.svg" className="closeImg attachmentcancel" />
                                        </div> */}

                                        </div>

                                    ))
                                    : <div className="supported-files">No File Chosen.</div>}

                            </div>
                            <div className="upload-success-msg">{this.state.uploadSuccessMsg}</div>
                        </Col>

                        <div className="uploaded-list-title mt-2_0 prevDet pt20">Uploaded Documents</div>
                        <div className="uploaded-list">
                            <UploadedDocumentList getUploadedDocument={this.getUploadedDocument} stockist={this.props.stockist} month={this.props.month} year={this.props.year} documentList={this.props.documentList} />
                        </div>
                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}




export default UploadFileSecondarySale
