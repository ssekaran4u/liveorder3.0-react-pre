
import React,{Component} from 'react'
import RPSDetailsHead from "./RPSDetailsHead" 
import DoctorDetails from "./DoctorDetails"
import PreviousApprovalDetails from "./PreviousApprovalDetails"
import RPSDetailsDeskHead from "./RPSDetailsDeskHead"
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from 'react-datepicker'

class ComponentToPrint extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }
        this.requestFrwed = this.requestFrwed.bind(this)
    }
    requestFrwed(reqno,status,note){
        this.props.requestFrwed(reqno,status,note)
    }
render(){
    return(
         <div style={{"width":"100%"}}>               
          <div>
            {sessionStorage.getItem("status") == "DESK CONFIRMED" ? ' ' :
              <div>
                <div className="rps-tab-sec-title mt-2_0 view-color "></div>
                <RPSDetailsDeskHead requestFrwed={this.requestFrwed} reqList={this.props.rpsDetails} />
              </div>}
            </div>
            <div>
              <div className="rps-tab-sec-title mt-2_0 view-color pt18">RPS Details</div>
                <RPSDetailsHead rpsDetails={this.props.rpsDetails} />
              </div>
            <div>
              <div className="rps-tab-sec-title mt-2_0 view-color pt18">Doctor Details</div>
                <DoctorDetails docDetails={this.props.docDetails} />
              </div>
            <div>
            <div className="rps-tab-sec-title mt-2_0 view-color pt18">Previous Approval Details</div>
              <PreviousApprovalDetails rps_det={this.props.rps_det} />
            </div>
            <div className="rps-tab-sec-title mt-2_0 pt18 pr30">Uploaded  Documents From Requester</div>
            <div className="flexDisplay">
            {/* <Form.Group controlId="files">
              <div className="pr30">
                  <Form.Label className="">
                    <div className="pt10"><img src="../public/assets/images/AttachFile.svg"  /></div>
                      </Form.Label>
                        <Form.Control
                          id="files"
                          type="file"
                          onChange={this.fileUploadHelp}
                          className="filehide"
                          accept="application/pdf,image/png, image/jpeg,.doc,.docx,.xls,application/msword"
                        />
                      </div>
              </Form.Group>   */}
              {/* <div className="uploadPic">{this.state.imgName}</div> */}
              </div> 
              </div>  
    )
}
}

export default ComponentToPrint