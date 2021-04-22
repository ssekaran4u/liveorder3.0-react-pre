import React from 'react'
import { Component } from 'react';
import '../../../../public/assets/css/sfcstyle.css'
import '../../../../public/assets/css/transactionmodule.css'
import { Row, Col, Button, Checkbox, Form } from "react-bootstrap";
import "../../../../public/assets/css/prpstyle.css";
import Resizer from 'react-image-file-resizer';
import { postToServer, fileUpload } from '../../../lib/comm-utils'
import { URL_PRP } from '../../../lib/constants'


class Advmember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            reason: "",
            imageUploadFile: [],
            imageUploadBill: [],
            selectedFile:null,
            imgName:"",
            imageUpload: [],
            saveDoc:"",
						saveBill:"",
						ischecked : false,
						showupload : true
        }
        this.onReuest = this.onReuest.bind(this)
        this.reason = this.reason.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.uploadBill = this.uploadBill.bind(this)
        this.onCancelFile = this.onCancelFile.bind(this)
        this.onCancelBill = this.onCancelBill.bind(this)
    }
  
    componentDidMount(){
        var data = { "Index": "MRExpenseSrnoClick", "Data": { "srno":this.props.srnum}, }
        let PRPBillDet = []
        postToServer(URL_PRP, data)
          .then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
              response.data.PRPBillDet.map((res,i) => {
                PRPBillDet.push({
                    ImgFilename : res.ImgFilename,
                    UploadedBy: res.UploadedBy,
                    id: i,
                })
              })
              this.setState({imageUploadFile: response.data.PRPPhotoDet})
              this.setState({imageUploadBill: response.data.PRPBillDet})
      }
    })
}
    reason(e) {
        this.setState({ reason: e.target.value })
        this.props.Getcancelreason(e)
    }

    uploadFile(e) {
        let files = e.target.files;
        let fileData = []
        Object.values(files).map((res, i) => {
            fileData.push({
                "id": i,
                "ImgFilename": res.name,
                "path": URL.createObjectURL(res)
            })

        })
 
        const data = new FormData();

            let token = localStorage.getItem("SFA_TOKEN")
            let image = ""
              Object.values(files).map(res => {
                data.append("Files",res)
            })
            data.append("Token", token);
            data.append("Index", "PRPPhotoUpload");
            data.append("srno", this.props.srnum);
            fileUpload("PRPFileUpload", data).then((result) => {
                if (result.data.Status == "Success") {
                    this.setState({saveDoc: result.data.data})
                }
            });
            this.setState({ imageUploadFile: [...this.state.imageUploadFile, ...fileData] })
            this.props.onUploadDoc(fileData,this.state.saveDoc, [...this.state.imageUploadFile, ...fileData])


        // }
    }
    uploadBill(e) {
        let files = e.target.files;
        let billData = []
        Object.values(files).map((res, i) => {
            billData.push({
                "id": i,
                "ImgFilename": res.name,
                "path": URL.createObjectURL(res)
            })

        })

        const data = new FormData();

        // if (fileData.length) {
            let token = localStorage.getItem("SFA_TOKEN")
            let image = ""
            // fileData.map(res => {
            //     image = image + res.ImgFilename + "|"
            // })
              Object.values(files).map(res => {
                data.append("Files",res)
            })
            // data.append("file", e.target.files[0])
            data.append("Token", token);
            data.append("Index", "PRPBillPhotoUpload");
            data.append("srno", this.props.srnum);
            fileUpload("PRPBillFileUpload", data).then((result) => {
                if (result.data.Status == "Success") {
                    this.setState({saveBill: result.data.data})
                }
            });           
        this.setState({ imageUploadBill: [...this.state.imageUploadBill, ...billData] })
        this.props.onUploadBill(billData,  [...this.state.imageUploadBill, ...billData])


    }
    onCancelFile(image, status) {
        let result = (this.state.imageUploadFile).filter(img => img.ImgFilename !== image);
				this.setState({ imageUploadFile: result })
        this.props.onUploadDoc(result)

        var photo = {
            "Index": "PRPPhotoUploadfile_delete",
            "Data": {
              "srno": this.props.srnum,
              "filename": image
            }, "Token": ""
          }
          postToServer(URL_PRP, photo)
    };

    onCancelBill(image, status) {
			let result = (this.state.imageUploadBill).filter(img => img.ImgFilename !== image);
			this.setState({ imageUploadBill: result })
			this.props.onUploadBill(result)


			var bill = {
					"Index": "PRPBillUploadfile_delete",
					"Data": {
						"srno": this.props.srnum,
						"filename": image
					}, "Token": ""
				}
				postToServer(URL_PRP, bill)
	}

    onReuest(e) {
			if(this.state.imageUploadFile.length > 0 || this.state.imageUploadBill.length > 0){
				alert("Please Remove All Uploded Images Before Cancel!" )
				this.setState({ischecked : false})
			}
      else{
				this.setState({ischecked : true, showupload : false})
				this.setState({ checked: !this.state.checked })
     		this.props.onRequestCancel(!this.state.checked,e)
			}
        // this.setState({ imageUploadFile: [] })
        // this.setState({ imageUploadBill: [] })
    }

    render() {
        // console.log(this.state.imageUploadFile ,this.state.saveDoc, 'imageUploadBill')
        // console.log(this.state.imageUploadBill, this.state.saveBill,'imageUploadBill')
        return (
					<div>
					<div className="palletback pallet2 appdetails">						
						<Row>
							<Col xs={12} xl={6} md={6}>
								<div className="pbartitle prpdochead">
										Document Upload <span className="colorRed">*</span>
								</div>
							</Col>
							<Col xs={12} xl={6} md={6}>												
								<div class="form-check mb-2 prpcanceldiv">
										<input
												type="checkbox"
												class="form-check-input filled-in"
												id="filledInCheckbox"
												onChange={(event) => this.onReuest(event)}
											checked = {this.state.checked} />
										<label class="form-check-label " className="reqcancel" for="filledInCheckbox">Request for Cancellation</label>
								</div>
								<div>
										<div>
												<div className="reasonforcan">Reason <span className="colorRed">*</span></div>
												<textarea className="entercomemt" disabled={!this.state.checked} rows="4" cols="50" placeholder="Enter Comments" value={this.state.reason} onChange={this.reason}>
												</textarea>
										</div>
								</div>									
							</Col>
						</Row>
						<Row>
							<div className="prpbillupload">
							<Col xl={12} key="c1">
								<form enctype='multipart/form-data'>
									<div>
										<input
												type="file"
												className="fileupload-input mt-1"
												multiple
												accept="image/png, image/jpeg, image/jpg"
												onChange={this.uploadFile}
												disabled={this.state.checked} />
												<div className="add-files-box prpfilebox" >
													<div className="secondary secondary-outline uploadfiles mr-3 mt-1">
														<img src="../../../public/assets/images/attachment.svg" className="mr-2" />Upload Photo
													</div>
												</div>
												<div>
												{this.state.imageUploadFile.length > 0 ? this.state.imageUploadFile.map((res) => (
													<div className="attachmentprp">{res.ImgFilename}
													    <div className="attachmentdiv"><img src="../../../public/assets/images/cancel-white.svg" onClick={() => this.onCancelFile(res.ImgFilename)} className=" closeImg attachmentcancel" /></div> 			
													</div>
												)) : null}
												</div>
												<div className="expense-note-det">Supported Formats: jpeg, jpg, png upto 2 MB</div>
										</div>
								</form>
							</Col>
							<Col xl={12}>
								<div>
									<input
											type="file"
											className="fileupload-input mt-1"
											multiple accept="image/png, image/jpeg, image/jpg"
											onChange={this.uploadBill}
											disabled={this.state.checked}
									/>
									<div className="add-files-box prpfilebox"  >
										<div className="secondary secondary-outline uploadfiles mr-3 mt-1">
												<img src="../../../public/assets/images/attachment.svg" className="mr-2" />Upload Bill
										</div>
									</div>
									<div>
									{this.state.imageUploadBill.length > 0 ? this.state.imageUploadBill.map((res) =>
											<div className="attachmentprp">{res.ImgFilename}
															<div className="attachmentdiv"><img src="../../../public/assets/images/cancel-white.svg" onClick={() => this.onCancelBill(res.ImgFilename)} className=" closeImg attachmentcancel" /></div>
											</div>) : null}
									</div>
										<div className="expense-note-det">Supported Formats: jpeg, jpg, png upto 2 MB</div>
								</div>
						</Col>
							</div>
						
				</Row>
				</div> 
				</div>
        );
    }
}
export default Advmember;