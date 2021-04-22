import React,{Component} from 'react'
import {Breadcrumb,Row,Col,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import {postToServer} from '../../lib/comm-utils'
import {getDownloadFile} from '../../lib/comm-utils'
import axios from 'axios'
import StatusPopup from '../../lib/StatusPopup'

class Invoice extends Component{
    constructor(props){
        super(props)
        this.state={
            dispatchDetails:[],
            imgurl:'',
            srno:'',
            showValidModal:false,
            validmsg:''
        }
        this.downloadEmployeeData = this.downloadEmployeeData.bind(this)
        this.hideValidModal = this.hideValidModal.bind(this)
    }
    componentDidMount(){
        let srno = this.props.match.params.id
        this.setState({
            srno:srno
        })
        var data={"Index":"DispatchDetails", "Token":"token","Data":{"srno":srno}}
        postToServer("MaterialRequestApi",data).then( (Result)=>{ 
            if(Result.data.Status == "Success"){ 
                this.setState({ dispatchDetails: Result.data.data })
              
               
            }
            
          
        }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
    }
    downloadEmployeeData(img){



        if(img == "No Data"){
           this.setState({
            showValidModal:!this.state.showValidModal,
            validmsg:"No Data Available to Download",
            vsuccess:false
           })
        }else{
        const data ={"Data":{"srno":this.state.srno ,"filename":img  },"Token":""}
        
        return axios.post('http://111.93.190.156:85/MaterialFileDownload',data,{ responseType: 'arraybuffer' }).then((response) => {
        let image = btoa(
          new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      //  console.log( `data:${response.headers['content-type'].toLowerCase()};base64,${image}`);

        let a = document.createElement('a');
	a.href = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
	a.download = img;
	a.click();
      });

    }



    }
    hideValidModal(){
        this.setState({
            showValidModal:!this.state.showValidModal,
        })
    }
    
    render(){
        let address 
        let date
        let mode
        let img
        this.state.dispatchDetails ? this.state.dispatchDetails.map((item)=>{
            address = item.address
            date = item.date
            mode = item.mode
            img = item.proof
        }): null
     //   let url = 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
       // img = 'demo.jpg'
        return(
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">Material Request Entry</h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item href="#"><Link to='/dashboard'>Dashboard</Link></Breadcrumb.Item>
                                <Breadcrumb.Item >Operational</Breadcrumb.Item>
                                <Breadcrumb.Item ><Link to='/material_request'>Material Request List</Link></Breadcrumb.Item>
                                <Breadcrumb.Item active>Dispatch Details</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                   
                    <div className="materialEntryField">
                        <div className="dcr-head">
                            <h5  className="dcr-list-sec-head">Dispatch Details</h5>
                        </div>
                        <div className="VisitDivision">
                            <Row>
                                <Col lg={6} md={6}>
                                <div className="MaterialInPad">
                                    <div className="materialText">Material</div>
                                    <div className="statinoraryText">{localStorage.getItem("materialType")}</div>
                                </div>
                                <div className="MaterialInPad">
                                    <div className="flex-row">
                                        <div>
                                            <div className="materialText">Mode Of Dispatch</div>
                                            <div className="subheading">{mode}</div>
                                        </div>
                                        <div>
                                            <div className="materialText">Dispatch Date</div>
                                            <div className="subheading">{date}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="MaterialInPad">
                                    <div className="flex-row">
                                        <div>
                                            <div className="materialText">Dispatch Proof</div>
                                            <div className="subheading">{img}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="MaterialInPad pb20">
                                    <div className="flex-row">
                                        <div>
                                            <div className="materialText">Dispatch Address</div>
                                            <div className="subheading">{address?address:'-'}</div>
                                            </div>
                                        
                                    </div>
                                </div>
                                </Col>
                                <Col lg={6} md={6}>
                                    {/* <div>
                                        <img className="pt20 invoiceImg" src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" />
                                    </div> */}
                                    <div className="flex-row">
                                        <div className="invoiceName">{img}</div>
                                        <div className="downloadRightPad"><Button  onClick={()=>this.downloadEmployeeData(img)}  className="addMatBtn">Download</Button></div>
                                    </div>
                                    <img  src={this.state.imgurl ? <img src={`data:image/png;base64,${this.state.imgurl}`}/>: ''}/>
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
            </div>
        )
    }
}

export default Invoice