import React, { Component } from "react";
import Resizer from 'react-image-file-resizer';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { postToServer } from "../.././lib/comm-utils";
import { URL_EXPENSE_CLAIM } from "../.././lib/constants";

class UploadBills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUpload: [],
            newImages: [],
        }
        this.onChange = this.onChange.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onImage = this.onImage.bind(this)
    }

    //on select of images.
    onChange(e) {
        let files = e.target.files;
        Object.values(files).forEach(value => {
            Resizer.imageFileResizer(
                value,
                3000,
                3000,
                'JPEG',
                100,
                0,
                uri => {
                    this.setState({
                        imageUpload: [{
                            "status": "newly added",
                            "name": value,
                            "image": uri
                        }, ...this.state.imageUpload]
                    })
                },
            );
        })
    };

    //onClick functionality of delete icon.
    onCancel(image, status) {
        let result = (this.state.imageUpload).filter(img => img.name !== image);
        this.setState({ imageUpload: result })
        if (status == "added") {
            let data = {
                "Index": "uploadfile_delete",
                "Data": { "filename": image, "srno": this.props.entryType[0].reportNo }
            }
            postToServer(URL_EXPENSE_CLAIM, data)
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.uploadedImages != this.props.uploadedImages) {
            let images = []
            this.props.uploadedImages.map((res) => {
                images.push({
                    "status": "added",
                    "name": res.file,
                    "image": `data:image/png;base64,${res.image}`
                })
            })
            this.setState({ imageUpload: images })
        }
        if (prevState.imageUpload != this.state.imageUpload) {
            this.props.onImages(this.state.imageUpload)
        }
    }

    //onClick of particular image.
    onImage(img) {
        var win = window.open();
        win.document.write('<iframe src="' + img + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    }

    render() {
        let entryType = this.props.entryType;
        return (
            <React.Fragment>
                {/* {entryType.length ? entryType[0].type == "savedentry" ? entryType[0].approved == "notApproved" ?
                    <div className="upload-button">
                        <Button
                            className="upload-btn"
                            onClick={() => this.props.onUpload(entryType[0].reportNo, "upload")}
                        >
                            <div className="btn-text">Upload</div>
                        </Button>
                    </div>
                    : null : null:null} */}
                <div className="upload-bills">
                    {entryType.length ? entryType[0].approved == "notApproved" ?
                        <div className="background-container">
                            <img src="../../../public/assets/images/upload (2).svg" alt="" />
                            <div className="upload-text">Add Images from the folder</div>
                        </div>
                        : null : null}
                    <div className="upload-bills-container">
                        <input
                            id="file-type"
                            type="file"
                            style={{ display: "none" }}
                            multiple
                            accept="image/png, image/jpeg, image/jpg"
                            name="imgUpload"
                            onChange={this.onChange}
                        />
                        {entryType.length ? entryType[0].approved == "notApproved" ?
                            <label htmlFor="file-type">
                                <div className="add-files-box" htmlFor="file-type">
                                    <div className="add-file-container">
                                        <img src="../../../public/assets/images/plus (2).svg" alt="" />
                                        <div className="add-files-text">ADD Images</div>
                                    </div>
                                </div>
                            </label>
                            : null : null}
                        {entryType.length ? entryType[0].approved == "notApproved" ? this.state.imageUpload.length > 0 ?
                            this.state.imageUpload.map((res, i) => (
                                <div className="uploaded-images" key={i}>
                                    <Card className="uploaded-image-card">
                                        <img
                                            className="uploaded-image"
                                            src={res.image} alt=""
                                            onClick={() => this.onImage(res.image)}
                                        />
                                        <img
                                            src="../../../public/assets/images/Group 2363.svg"
                                            onClick={() => this.onCancel(res.name, res.status)}
                                            alt=""
                                            className="del-img"
                                        />
                                    </Card>
                                </div>
                            ))
                            : null : this.state.imageUpload.length > 0 ?
                                this.state.imageUpload.map((res, i) => (
                                    <div className="uploaded-images" key={i}>
                                        <Card className="uploaded-image-card">
                                            <img
                                                className="uploaded-image"
                                                src={res.image} alt=""
                                                onClick={() => this.onImage(res.image)}
                                            />
                                        </Card>
                                    </div>
                                ))
                                : <div>There is no uploaded bills.</div> : null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default UploadBills;