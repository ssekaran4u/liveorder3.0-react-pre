import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../../../public/assets/css/prpstyle.css";
import { postToServer } from '../../lib/comm-utils'
import  {URL_BASE} from '../../lib/constants'
import axios from 'axios'
class DocumentUpload extends Component {
  constructor(props){
    super(props)
    this.state={
      Error : false,
      Errormsg : ""
    }
  }
  downloadphoto(img){
    if(img == "No Data"){
       this.setState({
        showValidModal:!this.state.showValidModal,
        validmsg:"No Data Available to Download",
        vsuccess:false
       })
    }else{
    const data ={
      "Data": {
        "srno": this.props.srNo,
        "filename": img
      }
    }


  
    let aa = URL_BASE +'PRPPhotDownload'
   // return postToServer("PRPPhotDownload", data, { responseType: 'arraybuffer'}).then((response) => {
  return axios.post( aa,data,{ responseType: 'arraybuffer' }).then((response) => {
    let image = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );


    
    let a = document.createElement('a');
    a.href = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
    a.download = img;
    a.click();
  });
}
}
downloadbill(img){
  if(img == "No Data"){
     this.setState({
      showValidModal:!this.state.showValidModal,
      validmsg:"No Data Available to Download",
      vsuccess:false
     })
  }else{
  const data ={
    "Data": {
      "srno": this.props.srNo,
      "filename": img
    }
  }


  let aa = URL_BASE +'PRPBillDownload'
  //return postToServer("PRPBillDownload", data, { responseType: 'arraybuffer'}).then((response) => {
  return axios.post(aa,data,{ responseType: 'arraybuffer' }).then((response) => {
  let image = btoa(
    new Uint8Array(response.data)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  let a = document.createElement('a');
  a.href = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
  a.download = img;
  a.click();
});
}
}
    render() {
      let Checkphoto = this.props.PRPPhotoDet.filter( item => item.ImgFilename == "")
      let Checkbill = this.props.PRPBillDet.filter( item => item.ImgFilename == "")
        return (
          <div>
            {Checkphoto.length == 0  && Checkbill.length == 0  && this.props.PRPPhotoDet.length != "0" && this.props.PRPBillDet.length != "0" ?
            <div className="palletback pallet2 appdetails">
            <Row>
                <Col xs={12}>
                  <div className="pbartitle">
                    Documents Uploaded
                  </div>
                </Col>
                <Col xl={6}>
                  {Checkphoto.length == 0  ? 
                  <div>
                    <div className="paralocation-prp prpmarginbtm">
                      Uploaded Photo
                    </div>
                    {this.props.PRPPhotoDet.map((item, index) => (
                  <span className="attachmentprp srcDetails" key={index} onClick={() => this.downloadphoto(item.ImgFilename)}>{item.ImgFilename}
                  {/* <div className="attachmentdiv"><img src="../public/assets/images/cancel-white.svg" className=" closeImg attachmentcancel" onClick={() => this.props.removeItemlocal(item.ImgFilename)} /></div> */}
                  </span>
                ))}
                  </div>:null}
                  {Checkbill.length == 0 ? 
                  <div>
                    <div className="paralocation-prp prpmarginbtm">
                      Uploaded Document
                    </div>
                    {this.props.PRPBillDet.map((item, index) => (
                  <span className="attachmentprp srcDetails" key={index} onClick={() => this.downloadbill(item.ImgFilename)}>{item.ImgFilename}
                  {/* <div className="attachmentdiv"><img src="../public/assets/images/cancel-white.svg" className=" closeImg attachmentcancel" onClick={() => this.props.removeItemlocal(item.ImgFilename)} /></div> */}
                  </span>
                ))}
                  </div>:null}
                </Col>
                {this.props.n_exp_cancel_req == 1 ?
                  <Col xl={6}>
                  <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input filled-in" id="filledInCheckbox" checked="checked"/>
                    <label className="form-check-label" htmlFor="filledInCheckbox">Request for Cancellation</label>
                  </div>
                </Col>
                :null}
            </Row>
        </div> : null}
            
            </div>
        );
    }
}
export default DocumentUpload;