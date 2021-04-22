import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Modal, Button,Form,Row,Col,InputGroup } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import {postToServer} from '../../../lib/comm-utils'
import StatusPopup from '../../../lib/StatusPopup'


class AddAccntDate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            data: [],
            dwrno: '',
            feedback: '',
            expcode: '',
            expenseAmt: '',
            expDeatils: '',
            finalvalues: {},
            show: true,
            errorMsgState: false,
            subarray: [],
            dcrNo: '',
            msg: '',
            Editmodedata: [],
            subareaupdate:'',
            Butndisable:false,
            reqList:[],
            benificiary:'',
            payChqNo:'',
            paymentDet:'',
            paymentAmt:'',
            chqDate:'',
            sMsg:'',
            sucess:true,
            successPop:false
        }
       // this.handleBeni = this.handleBeni.bind(this)
        //this.handlePayCheck = this.handlePayCheck.bind(this)
        //this.handlePaymentDetail = this.handlePaymentDetail.bind(this)
        //this.handlePaymentAmt = this.handlePaymentAmt.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleSave= this.handleSave.bind(this)
        this.showSuccess = this.showSuccess.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    componentDidMount(){
        let d = new Date()
        let a = d.getDate() > 9 ? d.getDate() : '0'+d.getDate()
        let mon = d.getMonth()+1
        let b =mon > 9 ? mon : '0'+mon
        let c = d.getFullYear();
        let date = a+'/'+b+'/'+c
        this.setState({
           
            chqDate:date
        })
    }
    // componentDidUpdate(oldprop,olstate){
    //     if(oldprop.reqno != this.props.reqno){
    //         // let data =  {"index":"RPSDeskBeneficiaryDetailsPopupLoad","Data":{"Srno":this.props.reqno},
    //         // "Token":""}
    //        let data =  {"index":"RPSDeskBeneficiaryDetailsPopupLoad","Data":{"Srno":this.props.reqno},"Token":""}
    //         postToServer("RPSDEskApi",data).then( (Result)=>{ 
                
    //             let date
    //             if(Result.data.data[0].d_chequedate == ""){
    //                 date = ''
    //             }else{
    //                 let d = (Result.data.data[0].d_chequedate).split('/')

    //             let a = d[0]
    //             let b = d[1]
    //             //let b =mon > 9 ? mon : '0'+mon
    //             let c = d[2]
    //             let  rdate = b+'/'+a+'/'+c
    //                 date = new Date(rdate)
                   
    //             }
              
    //           this.setState({
    //             benificiary:Result.data.data[0].c_benif,
    //             payChqNo:Result.data.data[0].c_chequeno,
    //             paymentDet:Result.data.data[0].c_paymentdtls,
    //             paymentAmt:Result.data.data[0].c_paymentamt,
    //             date:date,
    //           })
    //         })
    //     }
    // }

    // handleBeni(){
    //     let a = event.target.value
    //     this.setState({
    //         benificiary:a
    //     })
    // }
    // handlePayCheck(){
    //     let a = event.target.value
    //     this.setState({
    //         payChqNo:a
    //     })
    // }
    // handlePaymentDetail(){
    //     let a = event.target.value
    //     this.setState({
    //         paymentDet:a
    //     })
    // }
    // handlePaymentAmt(){
    //     let a = event.target.value
    //     this.setState({
    //         paymentAmt:a
    //     })
    // }
    handleDateChange(d){
        
        let a = d.getDate() > 9 ? d.getDate() : '0'+d.getDate()
        let mon = d.getMonth()+1
        let b =mon > 9 ? mon : '0'+mon
        let c = d.getFullYear();
        let date = a+'/'+b+'/'+c
        this.setState({
            date:d,
            chqDate:date
        })
    }
    handleSave(reqno){
        this.props.AccDate(this.state.date)
    }
    showSuccess(){
        this.setState({
            successPop:!this.state.successPop,
        })
    }
    handleReset(){
        this.setState({
            benificiary:'',
            payChqNo:'',
            paymentDet:'',
            paymentAmt:'',
            date:''
        })
    }
     render() {
     //  console.log("fhfhfhfhfh")
        return (
            <div className="otherActivityModal">
                <Modal centered  size="lg"  show={ this.props.show  } onHide={this.props.closeModal}>
                      <Form>
                        <Modal.Header className="plan-this-task">
                            <Modal.Title className="modalTitle benifisary">Accountable Date   <span className="modalCancelBtn">
                                <img src="../public/assets/images/cancel.png" onClick={this.props.closeModal} /></span>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="otherAc">
                        <Form.Label className="customized-label">Payment Date <span className="colorRed">*</span></Form.Label>
                                        <InputGroup className="datepickerAligment controls text-right">
                                            <DatePicker
                                                selected={this.state.date}
                                                 dateFormat="dd/MM/yyyy"
                                                // value={this.state.chqDate}
                                                onChange={this.handleDateChange}
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>
                                                    <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                                </InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                          
                        </Modal.Body>


                       
                        <Modal.Footer className="plan-this-task1">
                        <Button variant="primary" className="planBtn" onClick={()=>this.handleSave(this.props.reqno)}>
                                    Done
                        </Button> 
                           
                                
                        </Modal.Footer> 
                    </Form>
                </Modal>
                <StatusPopup 
                    show={this.state.successPop} 
                    success={this.state.sucess}
                    message={this.state.sMsg} 
                    onClose={()=>this.showSuccess()} 
                />
            </div>
        );
    }
}



export default AddAccntDate; 
