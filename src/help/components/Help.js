import React, { Component } from "react";
import {
    Row,
    Col,
    Breadcrumb,
    Form,
    InputGroup,
    FormControl,
    Modal,
    Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "./lottiesuccess.json";
import { postToServer, fileUpload } from "../../lib/comm-utils";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";
import Footer from "../../landing-page/components/Footer";

class Help extends Component {
    constructor() {
        super();
        this.state = {
            selectedFile: null,
            fileName: "",
            show: false,
            chars_left: 500,
            max_char: 500,
            maxlengthText: "500",
            showRemaing: true,
            msg: ""
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fileUploadHelp = this.fileUploadHelp.bind(this);
        this.handleWordCount = this.handleWordCount.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }
    fileUploadHelp(event) {
        this.setState({
            loaded: 0,
            selectedFile: event.target.files[0],
            fileName: event.target.value
        });

        // this.setState({
        //     fileName: event.target.value
        // })
    }
    handleClear(event) {
        this.setState({
            fileName: ""
        });
        const charCount = event.target.value.length;
        const maxChar = this.state.max_char;
        const charLength = maxChar - charCount;

        this.setState({
            showRemaing: false,
            maxText: charLength,
            msg: event.target.value
        });
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow(event) {
        event.preventDefault();
        this.setState({
            fileName: ""
        });
        const _this = this;
        _this.setState({ show: true, update: true });

        const data = new FormData();
        data.append("file", this.state.selectedFile);
        data.append(
            "Token",
            "MR1|MR1|TNH0012|RllBelKFZVgXOb2019-02-18T19:01:59+05:30"
        );
        data.append("msg", _this.state.msg);
        data.append("Index", "Help");

        fileUpload("FileUpload", data).then(function(result) {
            _this.setState({ show: true, update: true });
            setTimeout(
                function() {
                    this.handleClose();
                }.bind(_this),
                1500
            );
            // alert(result.data)
          //  console.log(result.data, "out put");
            document.getElementById("message").value = "";
        });
    }
    handleWordCount(event) {
        const charCount = event.target.value.length;
        const maxChar = this.state.max_char;
        const charLength = maxChar - charCount;

        this.setState({
            showRemaing: false,
            maxText: charLength,
            msg: event.target.value
        });
    }
    render() {
        const defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">Help</h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item>
                                    <Link to="/dashboard">Dashboard</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Help</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className="container-fluid profilecontainer">
                        <form onSubmit={this.handleShow}>
                            <Row className="boxrow">
                                <Col
                                    lg={10}
                                    md={10}
                                    xl={10}
                                    xs={11}
                                    className="mainbox"
                                >
                                    <Form.Group
                                        className="messagenew"
                                        controlId="formGroupEmail"
                                    >
                                        <Form.Label className="labelhelp">
                                            Your Query{" "}
                                            <span className="star">*</span>
                                        </Form.Label>
                                        {this.state.showRemaing ? (
                                            <Form.Label className="labeltext float-right">
                                                Max{" "}
                                                <span className="limit">
                                                    {this.state.maxlengthText}
                                                </span>{" "}
                                                character
                                            </Form.Label>
                                        ) : (
                                            <Form.Label className="labeltext float-right">
                                                <span className="limit">
                                                    {this.state.maxText}
                                                </span>{" "}
                                                Character Remaining
                                            </Form.Label>
                                        )}
                                        <Form.Control
                                            as="textarea"
                                            id="message"
                                            rows="5"
                                            className="helptext"
                                            maxLength="500"
                                            onChange={this.handleWordCount}
                                            placeholder="Write here..."
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col
                                    lg={10}
                                    md={10}
                                    xl={10}
                                    xs={12}
                                    className="filebox"
                                >
                                    <Form.Group controlId="files">
                                        <Col
                                            lg={12}
                                            md={12}
                                            xl={12}
                                            xs={12}
                                            className="buttonfile"
                                        >
                                            <Form.Label className="labelbox">
                                                <div className="buttonbox">
                                                    <img src="../public/assets/images/attachment.svg" />
                                                    <Form.Label className="filelabel">
                                                        Upload File
                                                    </Form.Label>
                                                </div>
                                            </Form.Label>
                                            <p className="filename">
                                                {this.state.fileName}
                                            </p>
                                            <Form.Control
                                                id="files"
                                                type="file"
                                                onChange={this.fileUploadHelp}
                                                className="filehide"
                                                accept="application/pdf,image/png, image/jpeg,.doc,.docx,application/msword"
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col
                                    lg={12}
                                    md={12}
                                    xl={12}
                                    xs={12}
                                    className="notetext"
                                >
                                    <p className="notetext2">
                                        Supported Formats: doc, docx, rtf, pdf,
                                        jpg, png upto 2 MB
                                    </p>
                                </Col>
                                <Col
                                    lg={12}
                                    md={12}
                                    xl={12}
                                    xs={12}
                                    className="buttonsbox"
                                >
                                    <button
                                        className="primary mr-2 sendbutton"
                                        type="submit"
                                    >
                                        Send Message
                                    </button>
                                    <button
                                        className="secondary mr-2 clearbutton"
                                        onClick={this.handleClear}
                                        type="reset"
                                    >
                                        Clear
                                    </button>
                                </Col>
                            </Row>
                        </form>
                    </div>

                    <Modal
                        centered
                        className="master-success"
                        show={this.state.show}
                        onHide={this.handleClose}
                    >
                        <Modal.Body className="text-center">
                            <div className="lottieanimation">
                                <Lottie options={defaultOptions} />
                            </div>
                            <div className="successmsg">
                                <p className="green-clr">
                                    Message Sent Successfully!
                                </p>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Help;
