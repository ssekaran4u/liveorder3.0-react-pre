import React,{Component} from 'react'
import {Form} from 'react-bootstrap'
import StatusPopup from '../../lib/StatusPopup'

class VisitingCardDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            Textval:'',
            empDiv:'',
            desig:'',
            mobile:'',
            email:'',
            quali:'',
            reuqest:'',
            flagMob:false,
            flagEmail:false,
            flagquali:false,
            flagReq:false,
            showStatusModal:false,
            success:false,
            sucessmsg:'',
        }
        this.handleMobile = this.handleMobile.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleQuali = this.handleQuali.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
    }
   
    handleMobile(){
        let mobile = event.target.value;
        if(mobile.length > 10 ){
            this.setState({
                showStatusModal:!this.state.showStatusModal,
                success:false,
                sucessmsg:'Please Enter 10 digit mobile number'
            })
        }else{
            this.setState({
                mobile:mobile,
                flagMob:true
            }) 
            this.props.getMobile(mobile)
        }
    }
    handleEmail(){
        const email = event.target.value
        this.setState({
            email:email,
            flagEmail:true
        }) 
        this.props.getEmail(email)
    }
    handleQuali(){
        const quali = event.target.value
        this.setState({
            quali:quali,
            flagquali:true
        }) 
        this.props.getQualification(quali)
    }
    handleChange(){
        const reuqest = event.target.value
        this.setState({
            reuqest:reuqest,
            flagReq:true
        }) 
    this.props.getChangeRequest(reuqest)
    }
    componentDidUpdate(oldstate,oldprops){
     //   console.log("visit",this.props.visitData)
        if(oldprops.reuqest != this.props.requestChng){
           if(this.state.reuqest == ''){
            this.setState({
                reuqest:this.props.requestChng
            })
           }
           
        }
    }
    // componentDidMount(){ alert(this.props.requestChng)
    //     this.setState({
    //         reuqest:this.props.requestChng
    //     })
    // }
    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
        })
    }

    render(){ console.log("ggnn",this.props.requestChng)
        let desig
        let empDiv
        let empid
        let empMob = ''
        let empQuali
        let empstatus
       this.props.visitData ? this.props.visitData.map((item)=>{
           desig = item.empDesignation
           empDiv = item.empDiv
           empid = item.empEmail
           empMob = item.empMob
           empQuali = item.empQuali
        //    empstatus= item.status
       }): null

if (this.state.flagMob == true && this.state.mobile == ''){
    empMob=''
}
if(this.state.mobile.length>0){
    empMob=this.state.mobile
}
if (this.state.flagEmail == true && this.state.email == ''){
    empid=''
}
if(this.state.email.length>0){
    empid=this.state.email
}

if (this.state.flagquali == true && this.state.quali == ''){
    empQuali=''
}
if(this.state.quali.length>0){
    empQuali=this.state.quali
}
if (this.state.flagReq == true && this.state.reuqest == ''){
    empstatus=''
}
if(this.state.reuqest.length>0){
    empstatus=this.state.reuqest
}

console.log("gg",empstatus)
        return(
            <div className="visitingSection">
                <div className="detailheading">Fill Visiting Card Details</div>
                <div className="alldropsfclocation">
                        
                        <div className="locationsfa">
                                
                                <div className="distributorClaimListsfc">
                                    <p className="paralocation">Employee Name<span className="colorRed">*</span></p>
                                </div>
                                <div className="selectlocation mb16">
                                <Form.Control 
                                    type="text" 
                                    className="customized-input " 
                                    placeholder="Enter your Name" 
                                    value={this.props.usename} 
                                    onChange=""
                                />
                                </div>
                        </div>
                        <div className="locationsfa">
                           
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Designation</p>
                            </div>
                            <div className="selectlocation mb16">
                            <Form.Control 
                                    type="text" 
                                    className="customized-input " 
                                    placeholder="Enter your Designation" 
                                    value={desig} 
                                    onChange=""
                                />
                            </div>
                        </div>
                        <div className="locationsfa">
                            
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Division</p>
                            </div>
                            <div className="selectlocation mb16">
                            <Form.Control 
                                    type="text" 
                                    className="customized-input " 
                                    placeholder="Enter your Division" 
                                    value={empDiv} 
                                    onChange=""
                                />
                            </div>
                        </div>
                        <div className="locationsfa">
                            
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Mobile Number</p>
                            </div>
                            <div className="selectlocation mb16">
                                <Form.Control 
                                    type="text" 
                                    className="customized-input " 
                                    placeholder="Enter your Mobile No." 
                                    value={   empMob } 
                                    onChange={this.handleMobile}
                                />
                            </div>
                        </div>
                        <div className="locationsfa">
                            
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Email ID</p>
                            </div>
                            <div className="selectlocation mb16">
                                <Form.Control 
                                    type="text" 
                                    className="customized-input " 
                                    placeholder="Enter you email ID" 
                                    value={ empid} 
                                    onChange={this.handleEmail}
                                />
                            </div>
                        </div>
                        <div className="locationsfa">
                            
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Qualification</p>
                            </div>
                            <div className="selectlocation mb16">
                                <Form.Control 
                                    type="text" 
                                    className="customized-input " 
                                    placeholder="Enter your qualification" 
                                    value={ empQuali} 
                                    onChange={this.handleQuali}
                                />
                            </div>
                        </div>
                        <div className="locationsfa">
                            
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Change Request</p>
                            </div>
                            <div className="selectlocation mb16">
                                <Form.Control 
                                    type="text" 
                                    className="customized-input " 
                                    placeholder="Enter your request here" 
                                    value={empstatus} 
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <StatusPopup
                    message={this.state.sucessmsg}
                    show={this.state.showStatusModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
                />
            </div>
        )
    }
}
export default VisitingCardDetails