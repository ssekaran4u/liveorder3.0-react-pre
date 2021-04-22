


//    sendForApproval(){
//     if(this.state.checked == true && this.state.reason == "" && this.state.imageUploadFile.length > 0 && this.state.imageUploadBill.length >0){
//       alert("Please enter reason for cancellation and remove the uploaded bills and files")
//     }else if(this.state.imageUploadFile.length == 0 || this.state.imageUploadFile.length == 1){

//           alert("Please upload minimum 2 files")

//     }else if(this.state.imageUploadBill.length == 0 || this.state.imageUploadBill.length == 1){

//           alert("Please upload minimum 2 bills")

//     }else{
//     var data = {
//       "Index":"ExpenseRequestDataSave",
//       "data":{
//         "srno":this.props.srno,  
//         "acualexp":this.state.totalActualExpense.toString(),
//         "BTCExpense":this.state.btcExp,
//         "balance":this.state.balance.toString(),
//         "actualexpbill1":this.state.actualexpbill1.toString(),
//         "actualexpbill2":this.state.actualexpbill2.toString(),
//         "miscexp":this.state.miscExp.toString(),
//         "canceltext":this.state.reason,
//         "photoid":"97_3.jpg|97_4.jpg|",
//         "advance":"1",
//         "checkedValue":"0",
//         "billid":"97_3.jpg|97_4.jpg|",
//       },"Token":""}
//       console.log(data,"sendforapprove")
//     }
//   }






import React from 'react'
import { Component } from 'react';
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import { Row, Col, Button, Checkbox, Form } from "react-bootstrap";
import "../../../public/assets/css/prpstyle.css";
import Resizer from 'react-image-file-resizer';
import { postToServer, fileUpload } from '../../lib/comm-utils'
import { URL_PRP } from '../../lib/constants'


class MrDocUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            reason: "",
            imageUploadFile: [],
            imageUploadBill: [],
            selectedFile: null,
            imgName: "",
            imageUpload: [],
            saveDoc: "",
            saveBill: "",
            imgfiles: [],
            imgbills: [],
            expcancel: "",
						remark: "",
						showupload : true,
						ischkdisabled : false,
						n_status : ""
        }
        this.onReuest = this.onReuest.bind(this)
        this.reason = this.reason.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.uploadBill = this.uploadBill.bind(this)
        this.onCancelFile = this.onCancelFile.bind(this)
        this.onCancelBill = this.onCancelBill.bind(this)
        this.onEditCancelFile = this.onEditCancelFile.bind(this)
        this.onEditCancelBill = this.onEditCancelBill.bind(this)

    }

    componentDidMount() {
        var data = { "Index": "MRExpenseSrnoClick", "Data": { "srno": this.props.srnum }, }
        let PRPBillDet = []
        let PRPPhotoDet = []
        let chekedForCancel = false
        let reasonforCancel = ""
        postToServer(URL_PRP, data)
            .then((response) => {
                // console.log(response, data, "data")
                if (response.status == 200 && response.statusText == "OK") {
                    response.data.PRPBillDet.map((res, i) => {
                        if (res.ImgFilename != "") {
                            PRPBillDet.push({
                                "id": i,
                                "ImgFilename": res.ImgFilename,
                                "path": ""
                            })
                        }
                    })

                    response.data.PRPPhotoDet.map((res, i) => {
                        if (res.ImgFilename != "") {
                            PRPPhotoDet.push({
                                "id": i,
                                "ImgFilename": res.ImgFilename,
                                "path": ""
                            })
                        }
                    })
                    // if (response.data.Details[0].n_exp_cancel_req == "1") {
                    //     this.setState({ checked: true })
                    // }

                    if(response.data.Details.length > 0){
                        response.data.Details.map(res=>{
                          if(res.n_exp_cancel_req == "1"){
                            chekedForCancel = true
                            reasonforCancel = res.c_exp_cancel_Remarks
                          }else{
                            chekedForCancel = false
                            reasonforCancel = ""
												}
												if(res.n_status == 3){
													this.setState({ischkdisabled : true})
												}
                        })

                    }          


                    //   console.log(TeamMembers,"TeamMembers")
                    // console.log(PRPBillDet, PRPPhotoDet, "PRPBillDet")
                    this.setState({ imageUploadFile: PRPPhotoDet })
                    this.setState({ imageUploadBill: PRPBillDet })
                    this.setState({checked : chekedForCancel })
										this.setState({reason : reasonforCancel })
                    // this.setState({ reason: response.data.Details[0].c_exp_cancel_Remarks }),

                    this.props.onUploadDoc(PRPPhotoDet)
                    this.props.onUploadBill(PRPBillDet)
										this.props.onRequestCancel(chekedForCancel)


                }
            })
    }

    reason(e) {
        this.setState({ reason: e.target.value })
        this.props.onReason(e.target.value)
    }

    uploadFile(e) {
        let files = e.target.files;
        let fileData = []
        // console.log(files, "files")
        Object.values(files).map((res, i) => {
            fileData.push({
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
            data.append("Files", res)
        })
        // data.append("file", e.target.files[0])
        data.append("Token", token);
        data.append("Index", "PRPPhotoUpload");
        data.append("srno", this.props.srnum);
        fileUpload("PRPFileUpload", data).then((result) => {
            if (result.data.Status == "Success") {
                // saveDoc =  result.data.data
                // this.props.onUploadDoc(fileData,result.data.data)
                this.setState({ saveDoc: result.data.data })
            }
        });

        this.setState({ imageUploadFile: [...this.state.imageUploadFile, ...fileData] })
        this.props.onUploadDoc(fileData, this.state.saveDoc, [...this.state.imageUploadFile, ...fileData])


        // console.log(fileData, e.target.files, "fileData")
        // this.setState({ imageUploadFile: fileData, imgfiles:e.target.files })
        // this.props.onUploadDoc(fileData, e.target.files)


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
            data.append("Files", res)
        })
        // data.append("file", e.target.files[0])
        data.append("Token", token);
        data.append("Index", "PRPBillPhotoUpload");
        data.append("srno", this.props.srnum);
        fileUpload("PRPBillFileUpload", data).then((result) => {
            if (result.data.Status == "Success") {
                // this.props.onUploadBill(billData,  result.data.data)
                this.setState({ saveBill: result.data.data })
            }
        });

        this.setState({ imageUploadBill: [...this.state.imageUploadBill, ...billData] })
        this.props.onUploadBill(billData, this.state.saveBill, [...this.state.imageUploadBill, ...billData])

        // this.setState({ imageUploadBill: billData, imgbills: e.target.files})
        // this.props.onUploadBill(billData, e.target.files)
    }

    onEditCancelFile(image, status) {
        var data = { "Index": "PRPPhotoUploadfile_delete", "Data": { "srno": this.props.srnum, "filename": image }, }
        postToServer(URL_PRP, data)
            .then((response) => {
                // console.log(response, data, "deletedata")

            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in App At MRPRP" })
            })

        let result = (this.state.imageUploadFile).filter(img => img.ImgFilename !== image);
        this.setState({ imageUploadFile: result })
        this.props.onUploadDoc(result)
    };

    onEditCancelBill(image, status) {
        var data = { "Index": "PRPBillUploadfile_delete", "Data": { "srno": this.props.srnum, "filename": image }, }
        postToServer(URL_PRP, data)
            .then((response) => {
                // console.log(response, data, "deletedata")

            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in App At MRPRP" })
            })

        let result = (this.state.imageUploadBill).filter(img => img.ImgFilename !== image);
        this.setState({ imageUploadBill: result })
        this.props.onUploadBill(result)
    };

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

    onReuest(event) {
			if(this.state.imageUploadFile.length > 0 || this.state.imageUploadBill.length > 0){
				alert("Please Remove All Uploded Images Before Cancel!" )
				this.setState({checked : false})
			}
      else{
			//	this.setState({ checked: event.target.checked, checked : true, showupload : false})
				this.setState({ checked: event.target.checked,showupload : false, reason : ""})
        // console.log(event.target.checked,"requestt1")
        this.props.onRequestCancel(event.target.checked)
			}
        // this.setState({ checked: event.target.checked })
        // console.log(event.target.checked,"requestt1")
        // this.props.onRequestCancel(event.target.checked)
        // this.state.imageUploadFile.map(res => {

        //     var photo = {
        //       "Index": "PRPPhotoUploadfile_delete",
        //       "Data": {
        //         "srno": this.props.srnum,
        //         "filename": res.ImgFilename
        //       }, "Token": ""
        //     }
        //     postToServer(URL_PRP, photo)
        //   })

          // this.state.imageUploadBill.map(res => {

          //   var bill = {
          //     "Index": "PRPBillUploadfile_delete",
          //     "Data": {
          //       "srno": this.props.srnum,
          //       "filename": res.ImgFilename
          //     }, "Token": ""
          //   }
          //   console.log(bill,"bill")
          //   postToServer(URL_PRP, bill)
          // })

        //   const checkstatus=event.target.checked
				// 	debugger
        //   if (checkstatus == true || this.state.imageUploadBill.length > 0 || this.state.imageUploadFile.length > 0) {
				// 		debugger
        //     this.setState({
        //       imageUploadFile: [],
        //       imageUploadBill: [],
        //       reason: ""
        //     })
        //   }
        // this.setState({ reason: "" })
    }

    render() {
        // console.log(this.state.imageUploadFile, this.state.imgfiles, 'imageUploadBill')
        // console.log(this.state.imageUploadBill, this.state.imgbills, 'imageUploadBill')
        // console.log(this.state.reason, this.state.checked, "expcancel")
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
												checked = {this.state.checked} 
												disabled={this.state.ischkdisabled}/>
											<label class="form-check-label " className="reqcancel" for="filledInCheckbox">Request for Cancellation</label>
									</div>
									<div>
											<div>
													<div className="reasonforcan">Reason <span className="colorRed">*</span></div>
													<textarea className="entercomemt" disabled={!this.state.checked} rows="4" cols="50" placeholder="Please Enter Reason" value={this.state.reason} onChange={this.reason}>
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
																{this.props.showHideBtn == false ?
																	<div className="attachmentdiv"><img src="../../../public/assets/images/cancel-white.svg" onClick={() => this.onCancelFile(res.ImgFilename)} className=" closeImg attachmentcancel" /></div> :
																	<div className="attachmentdiv"><img src="../../../public/assets/images/cancel-white.svg" onClick={() => this.onEditCancelFile(res.ImgFilename)} className=" closeImg attachmentcancel" /></div>}
														</div>
													)) : <div className="expense-note-det nofile">No file choosen</div>}
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
														{this.props.showHideBtn == false ?
																<div className="attachmentdiv"><img src="../../../public/assets/images/cancel-white.svg" onClick={() => this.onCancelBill(res.ImgFilename)} className=" closeImg attachmentcancel" /></div> :
																<div className="attachmentdiv"><img src="../../../public/assets/images/cancel-white.svg" onClick={() => this.onEditCancelBill(res.ImgFilename)} className=" closeImg attachmentcancel" /></div>}
												</div>) : <div className="expense-note-det nofile" >No file choosen</div>}
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
export default MrDocUpload;