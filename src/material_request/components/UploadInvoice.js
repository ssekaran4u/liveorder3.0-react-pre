import React,{Component} from 'react'
import{Breadcrumb,Row,Col,Form,Button,InputGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import Dropdown from '../../BasicComponet/DropDown'
import Resizer from 'react-image-file-resizer';
import Card from "react-bootstrap/Card";
import Breadcrumbs from '../../BasicComponet/breadcrumbs'
import DatePicker from "react-datepicker";
import {postToServer,fileUpload} from '../../lib/comm-utils'
import { format } from "date-fns";
import StatusPopup from '../../lib/StatusPopup'

class UploadInvoice extends Component{
    constructor(props){
        super(props)
        this.state={
            modeDis:"",
            imageUpload: [],
            desc:'',
            imgName:'',
            showStatusModal:false,
            date:'',
            showValidModal:false,
            validmsg:'',
            vsuccess:false,
            selectedFile:null,
            showModal:false,
            sucessmsg:'',
            sel_month:''

            // showModal:true,
            // :result.data.data[0]['msg'],
            // success:true



        }
        this.onChange = this.onChange.bind(this)
        this.dateChanged = this.dateChanged.bind(this)
        this.selectedProduct = this.selectedProduct.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.cancelUpload = this.cancelUpload.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
        this.getModeDispatch = this.getModeDispatch.bind(this)
        this.fileUploadHelp = this.fileUploadHelp.bind(this)
        this.hideValidModal = this.hideValidModal.bind(this)
    }
    onChange(e) { 
        let files = e.target.files;console.log("files",files)
        let img
        Object.values(files).forEach(value => {
            Resizer.imageFileResizer(
                value,
                3000,
                3000,
                'JPEG',
                100,
                0,
                uri => {
                    // setImgUpload(prevState => [...prevState, uri]);
                    this.setState({ imageUpload: [uri, ...this.state.imageUpload] })
                },
                // 'base64'
            );
            img = value.name
            this.setState({
                imgName:img
            })
        })
        console.log("image",img)
    };
    dateChanged(d){
        this.setState({
            date:d
        })
    }
    selectedProduct(data){
        this.setState({
            modeDis:data
        })
    }
    handleChange(){
        const d = event.target.value
        this.setState({
            desc:d
        })
    }
    onCancel(image){
        let result = (this.state.imageUpload).filter(img => img !== image);
        this.setState({ imgName: '', imageUpload:''})
    }
    handleSubmit(selectedMonth){ 
        this.setState({
            sel_month:selectedMonth
        })
        var date = this.state.date ? format(this.state.date, "YYYY-MM-DD") : "";
        var d = this.state.date ? date.split("-"):""
        let dYear = this.state.date ? d[0].toString():''
        let dMon = this.state.date ? d[1].toString() :''
        let dDate = this.state.date ? d[2].toString():''
        let srno = localStorage.getItem("srno")
     //   console.log(this.state.imgName,this.state.date,this.state.desc,this.state.modeDis )
        if(this.state.imgName == "" && this.state.date == "" &&  this.state.desc == "" && this.state.modeDis == "" && this.state.imgName == ""){
            this.setState({
                showValidModal:!this.state.showValidModal,
                validmsg:"Please fill atleast one field ",
                vsuccess:false
              
            })
        }else{
            if(this.state.selectedFile == null){
                var data = {"Index":"UpdateDispatch", "Token":"token","Data":{"srno":srno,"filename":"","mode":this.state.modeDis,"dd":dDate,"mm":dMon,"yyyy":dYear,"address":this.state.desc}}
                postToServer("MaterialRequestApi",data).then( (Result)=>{ 
                    if(Result.data.Status == "Success"){
                        this.setState({
                            showModal:true,
                            sucessmsg:Result.data.data[0].msg,
                            success:true
                        })
                    }
        
                }).catch(  (Error)=> {  
            // this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
                })

            }else{
           
            let token = localStorage.getItem("SFA_TOKEN")
            const data = new FormData();
            data.append("filename", this.state.selectedFile);
            data.append("srno", srno.toString());
            data.append("mode", this.state.modeDis);
            data.append("dd", dDate);
            data.append("mm", dMon);
            data.append("yyyy", dYear);
            data.append("address", this.state.desc);
            data.append(
                "Token",token
            );
           data.append("Index", "UpdateDispatch1");
           fileUpload("MaterialFileUpload", data).then( (result)=> {
            if(result.data.Status == "Success"){
                this.setState({
                    showModal:!this.state.showModal,
                    sucessmsg:result.data.data[0].msg,
                    success:true
                })
            }
        
          
        });
    }
      


        }
    }
    hideStatusModal(){
        this.setState({
            showStatusModal:false
        })
        localStorage.setItem("sMonth",this.state.sel_month)
        this.props.history.push('/Manager_material')
    }
    cancelUpload(){
        this.setState({
            filename:'',
            desc:'',
            date:'',
            modeDis:'',
            imageUpload:'',
            imgName:''
        })
    }
    getModeDispatch(){
        const mode = event.target.value
        this.setState({
            modeDis:mode
        })
    }
    fileUploadHelp(event) {
       
        let file  = event.target.value;
        let fname = event.target.files[0].name;
        this.setState({
            loaded: 0,
            selectedFile: event.target.files[0],
            imgName: fname
        });
//console.log('selec',event.target.files)
        // this.setState({
        //     fileName: event.target.value
        // })
       
    }
    hideValidModal(){
        this.setState({
            showValidModal:!this.state.showValidModal
        })
    }
    
    render(){
        const selectedMonth = localStorage.getItem("sel_month")
       const data = [{
           'key':'1',
           'text':'hello',
           'value':'1'
       }]
       const modeOfDispatch=[{
           'key':'1',
           'text':'Courier',
           'value':'1'
       }]
       var subContent = <div className="sub-content">
                            <Link to="/dashboard"><span>Dashboard</span></Link> / 
                            <Link to="/"><span>Operational</span></Link> /
                            <Link to="/manager_material"><span>Material Request List</span></Link> / 
                            Dispatch Details
                        </div>
        return(
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <Breadcrumbs content="Material Request" subContent={subContent} />
                    <div className="materialEntryField">
                        <div className="dcr-head">
                            <h5  className="dispatchUploadHead">Enter Dispatch Details</h5>
                        </div>
                        <div className="VisitDivision">
                            <Row>
                                <Col lg={6} md={6}>
                                    <div className="MaterialInPad">
                                        <div className="materialText">Material</div>
        <div className="statinoraryText">{localStorage.getItem("material_Type")}</div>
                                    </div>
                                    <div className="MaterialInPad upload flex-row ">
                                        <div className="selectlocation">
                                            <div className="materialText">Mode Of Dispatch</div>
                                            {/* <Dropdown   name={"from"} Type={1}     Selected={this.state.modeDis} selectedProduct={this.selectedProduct} data={modeOfDispatch} /> */}
                                            <Form.Control
                                                type="text"
                                                value={this.state.modeDis}
                                                onChange={this.getModeDispatch}
                                            />
                                        </div>
                                        <div className="selectlocation upload mb16">
                                            <div className="materialText">Dispatched Date</div>
                                            <InputGroup className="datepickerAligment controls text-right">
                                            <DatePicker
                                                selected={this.state.date}
                                                onChange={this.dateChanged}
                                                dateFormat="dd-MMM-yy"
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>
                                                    <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                                </InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                            {/* <div className="datepickerAligment">
                                                <DatePicker
                                                    selected={this.state.date}
                                                    onChange={this.dateChanged}
                                                    dateFormat="d/MM/yyyy"
                                                    placeholderText="Select Date"
                                                />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="MaterialInPad mt20">
                                        <div className="materialText">Dispatched Proof</div>
                                        <div className="filename">{this.state.imgName ? this.state.imgName : "No File Attached"}</div>
                                    </div>
                                    <div className="MaterialInPad mt20">
                                        <div className="materialText">Dispatched Address</div>
                                        <Form.Control
                                                    required
                                                    as="textarea"
                                                    rows="3"
                                                    maxLength="300"
                                                    placeholder="Enter Dispatched Address "
                                                    className="popup-textbox"
                                                    value={this.state.desc}
                                                    onChange={this.handleChange}
                                                />
                                    </div>
                                    <div className="materialBtn">
                            <Button
                                variant="secondary"
                                onClick={this.cancelUpload}
                                className="cancelBtn"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="planBtn"
                                id="saveBtn"
                                onClick={()=>this.handleSubmit(selectedMonth)}
                            >
                                Save
                            </Button>         
                        </div>
                                </Col>
                                <Col lg={6} md={6}>
                               
                                        
                                    <div className=" uploadBorder">
                                    {/* {this.state.imageUpload.length > 0 ?
                                                this.state.imageUpload.map((image, index) => (
                                                    <div className="uploaded-images" key={index}>
                                                        <Card className="uploaded-image-card">
                                                            <img className="uploadedimage" src={image} alt="" />
                                                            <img src="../../public/assets/images/red_close.svg"  alt="" className="del-img invoiceDel"  onClick={this.onCancel}/>
                                                        </Card>
                                                    </div>
                                                ))
                                                : 
                                        <div className="upload-bills">
                                        <div className="background-container imgIcon pd50">
                                            <img src="../../public/assets/images/picture.svg" alt="" />
                                          
                                        </div>
                                        <div className="upload-bills-container imgIcon hcursur">
                                            <input
                                                id="file-type"
                                                type="file"
                                                style={{ display: "none" }}
                                                multiple
                                                accept="image/*"
                                                name="imgUpload"
                                                onChange={this.onChange}
                                            />
                                              <label htmlFor="file-type">
                                                <div className="add-files-box" htmlFor="file-type">
                                                    <div className="add-file-container">
                                                    <div className="imgIcon pt20">
                                                                <img src="../public/assets/images/AttachFile.svg" onClick={() => this.onCancel()} />
                                                                </div>
                                                    </div>
                                                </div>
                                            </label>
                                           
                                          
                                        </div>
                                         
                                    </div>
                                     }  */}
                                      <Form.Group controlId="files">
                                        <Col
                                            lg={12}
                                            md={12}
                                            xl={12}
                                            xs={12}
                                            className="Ubuttonfile"
                                        >
                                            <Form.Label className="">
                                                {/* <div className="buttonbox"> */}
                                                <img src="../../public/assets/images/picture.svg" alt="" />
                                                <div className="pt10"><img src="../public/assets/images/AttachFile.svg" onClick={() => this.onCancel()} /></div>
                                                    {/* <Form.Label className="filelabel">
                                                        Upload File
                                                    </Form.Label> */}
                                                {/* </div> */}
                                            </Form.Label>
                                            {/* <p className="filename">
                                                {this.state.fileName}
                                            </p> */}
                                            <Form.Control
                                                id="files"
                                                type="file"
                                                onChange={this.fileUploadHelp}
                                                className="filehide"
                                                accept="application/pdf,image/png, image/jpeg,.doc,.docx,.xls,application/msword"
                                            />
                                        </Col>
                                    </Form.Group>
                                </div>
                                <div className="imgnm">{this.state.imgName}</div>
                                </Col>
                            </Row>
                        </div>
                          
                    </div>
                    <Footer />
                    </div>
                   
                    <StatusPopup
                        message={this.state.validmsg}
                        show={this.state.showValidModal}
                        onClose={this.hideValidModal}
                        success={this.state.vsuccess}
                    />
                     <StatusPopup
                        message={this.state.sucessmsg}
                        show={this.state.showModal}
                        onClose={this.hideStatusModal}
                        success={this.state.success}
                    />
                </div>
            // </div>
        )
    }
}

export default UploadInvoice