import React,{Component} from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import Dropdown from '../../BasicComponet/DropDown'
import VisitingCardDetails from '../components/VisitingCardDetails'
import SuccessMsg from '../popup/successMsg'
import {postToServer} from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
import {withRouter} from 'react-router-dom'

class MaterialEntryDropdown extends Component{
    constructor(props){
        super(props)
        this.state={
            defaultVal:'-1',
            showPopup:false,
            msg:'',
            materialLIst:[],
            delievryType:[],
            desc1:'',
            mCode:'',
            priority:'',
            dType:'-1',
            priority:'2',
            materialCode:'-1',
            // deliveryType:'-1',
            empCode:'',
            d_date:'',
            userName:'',
            visitData:[],
            new_srno:'',
            showStatusModal:false,
            reuqest:'',
            quali:'',
            email:'',
            mobile:'',
            rejectStatus:'',
            visitMob:'',
            url:this.props.url,
            requestChng:'',
            visitShowFlag:'2'
        }
        this.selectedDelivery = this.selectedDelivery.bind(this)
        this.sendRequest = this.sendRequest.bind(this)
        this.onShowPopup = this.onShowPopup.bind(this)
        this.handleDesc = this.handleDesc.bind(this)
        this.selectedMaterial = this.selectedMaterial.bind(this)
        this.selectedPriority = this.selectedPriority.bind(this)
        this.updateRequest = this.updateRequest.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
        this.getQualification = this.getQualification.bind(this)
        this.getChangeRequest = this.getChangeRequest.bind(this)
        this.getEmail = this.getEmail.bind(this)
        this.getMobile = this.getMobile.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    selectedDelivery(data){
        this.setState({
            dType:data
        })
    }
    
    sendRequest(){
        if(this.state.mCode == ""){
            this.setState({
                showStatusModal:!this.state.showStatusModal,
                sucessmsg:'Please Select Material ',
                success:false
            })
        }else{
            if(this.state.mCode == 'M000000002'){
                if(this.state.dType == "-1"){
                    this.setState({
                        showStatusModal:!this.state.showStatusModal,
                        sucessmsg:'Please Select Delivery Type ',
                        success:false
                    })
                }else{
                    let a = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email);
                    if(this.state.email != ""){
                        if(a == false){
                            this.setState({
                                showStatusModal:!this.state.showStatusModal,
                                success:false,
                                sucessmsg:'Please Enter Valid Email Id'
                            })
                        }else{
                            var data = {"index":"SendRequest",
                            "Token":"",
                            "Data":{
                                "mtrlcode":this.state.mCode,
                                "desc1":this.state.desc1,
                                "desc2":"",
                                "desc3":this.state.reuqest,
                                "prior":this.state.priority,
                                "dltyp":this.state.dType,
                                "mobile":this.state.mobile,
                                "email":this.state.email,
                                "qlfc": this.state.quali
                            }}	
                            postToServer("MaterialRequestApi",data).then( (Result)=>{ 
                                if(Result.data.Status == "Success"){ 
                                    this.setState({
                                        showPopup:!this.state.showPopup,
                                        msg:'please check record in Material List',
                                        rejectStatus:'success'
                                    })
                                }
                            
                            }).catch(  (Error)=> {  
                            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
                            })
                        }
                    }else{
                        var data = {"index":"SendRequest",
                        "Token":"",
                        "Data":{
                            "mtrlcode":this.state.mCode,
                            "desc1":this.state.desc1,
                            "desc2":"",
                            "desc3":this.state.reuqest,
                            "prior":this.state.priority,
                            "dltyp":this.state.dType,
                            "mobile":this.state.mobile,
                            "email":this.state.email,
                            "qlfc": this.state.quali
                        }}	
                        postToServer("MaterialRequestApi",data).then( (Result)=>{ 
                            if(Result.data.Status == "Success"){ 
                                this.setState({
                                    showPopup:!this.state.showPopup,
                                    msg:'please check record in Material List',
                                    rejectStatus:'success'
                                })
                            }
                        
                        }).catch(  (Error)=> {  
                        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
                        })
                    }
                }
            }else{
                let a = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email);
                if(this.state.email != ""){
                    if(a == false){
                        this.setState({
                            showStatusModal:!this.state.showStatusModal,
                            success:false,
                            sucessmsg:'Please Enter Valid Email Id'
                        })
                    }else{
                        var data = {"index":"SendRequest",
                        "Token":"",
                        "Data":{
                            "mtrlcode":this.state.mCode,
                            "desc1":this.state.desc1,
                            "desc2":"",
                            "desc3":this.state.reuqest,
                            "prior":this.state.priority,
                            "dltyp":this.state.dType,
                            "mobile":this.state.mobile,
                            "email":this.state.email,
                            "qlfc": this.state.quali
                        }}	
                        postToServer("MaterialRequestApi",data).then( (Result)=>{ 
                            if(Result.data.Status == "Success"){ 
                                this.setState({
                                    showPopup:!this.state.showPopup,
                                    msg:'please check record in Material List',
                                    rejectStatus:'success'
                                })
                            }
                        
                        }).catch(  (Error)=> {  
                        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
                        })
                    }
                }else{
                    var data = {"index":"SendRequest",
                        "Token":"",
                        "Data":{
                            "mtrlcode":this.state.mCode,
                            "desc1":this.state.desc1,
                            "desc2":"",
                            "desc3":this.state.reuqest,
                            "prior":this.state.priority,
                            "dltyp":this.state.dType,
                            "mobile":this.state.mobile,
                            "email":this.state.email,
                            "qlfc": this.state.quali
                        }}	
                        postToServer("MaterialRequestApi",data).then( (Result)=>{ 
                            if(Result.data.Status == "Success"){ 
                                this.setState({
                                    showPopup:!this.state.showPopup,
                                    msg:'please check record in Material List',
                                    rejectStatus:'success'
                                })
                            }
                        
                        }).catch(  (Error)=> {  
                        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
                        })
                    }
                }
            }
       
    }
    onShowPopup(){
        this.setState({
            showPopup:!this.state.showPopup,
        
        })
        if(this.state.url == "mr"){
            this.props.history.push('/material_request')
        }else{
            this.props.history.push('/manager_material')
        }
        
    }
    componentDidMount(){
        //material type
        var data = {"Index":"MaterialList", "Token":""} 
        postToServer("MaterialRequestApi",data).then( (Result)=>{ 
            if(Result.data.Status == "Success"){ 
                this.setState({ materialLIst: Result.data.data })
     
            }
          
        }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })

        //dilevery type
        var data = 
        {"Index":"DeliveryTypeList", "Token":"token"}  
        postToServer("MaterialRequestApi",data).then( (Result)=>{ 
            if(Result.data.Status == "Success"){ 
                this.setState({ delievryType: Result.data.data })
     
            }
          
        }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })

        //userinfo
        var userInfo = {"Index":"NewRequestNo", "Token":""}
        postToServer("MaterialRequestApi",userInfo).then( (Result)=>{ 
        let userName
        let empCode
        let d_date 
        let new_srno
            if(Result.data.Status == "Success"){ 
                Result.data.data.map((item)=>{
                    userName = item.empname
                    empCode = item.empcode,
                    new_srno = item.srno
                    d_date= item.date
                })
            }
            this.setState({
                userName:userName,
                empCode:empCode,
                d_date:d_date,
                new_srno:new_srno
            })
            
        }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
      
        //visiting card details
        

        //edit reuquest
        if(isNaN(this.props.srno) == false){
           //let sempcode = this.props.senderempcode ? this.props.senderempcode : ''
            var data = {"Index":"EditRequest", "Token":"","Data":{"srno":this.props.srno}}
            postToServer("MaterialRequestApi",data).then( (Result)=>{ 
                if(Result.data.Status == "Success"){ 
                    let materialCode
                    let deliveryType
                    let description
                    let srno
                    let empCode
                    let d_date
                    let priority
                    let requestChng
                    Result.data.data ? Result.data.data.map((item)=>{
                        materialCode = item.c_material_code.toString()
                        deliveryType = item.C_DeliveryType 
                        description = item.c_description1
                        priority = item.n_priority
                        requestChng =item.c_description3
                        srno = item.n_srno
                        empCode = item.c_emp_code
                        let mon = new Date(item.d_date).getMonth() > 9 ? new Date(item.d_date).getMonth() : '0'+new Date(item.d_date).getMonth()
                        let date = new Date(item.d_date).getDate()  > 9 ? new Date(item.d_date).getDate() : '0'+new Date(item.d_date).getDate()
                        d_date = date+'/'+mon+'/'+new Date(item.d_date).getFullYear()
                        
                    }): null
                    if(this.props.visitFlag == 1){
                        var visit = {"Index":"MaterialChange", "Token":"","Data":{"mat_code":materialCode,"srno":this.props.srno}}
                        postToServer("MaterialRequestApi",visit).then( (Result)=>{ 
                            if(Result.data.Status == "Success"){ 
                                this.setState({ visitData: Result.data.data })
                                Result.data.data.map((item)=>{
                                    this.setState({
                                        visitMob:item.empMob
                                    })
                                    
                                })
                            }
                          
                        }).catch(  (Error)=> {  
                        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
                        })
                    }
                    this.setState({
                        materialCode:materialCode,
                        dType:deliveryType,
                        desc1:description,
                        srno:srno,
                        empCode:empCode,
                        d_date:d_date,
                        priority:priority,
                        requestChng:requestChng
                    })
                }
              
            }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
            })
        }
        
    }
    handleDesc(){
        const tex = event.target.value
        this.setState({
            desc1:tex
        })
    }
    selectedMaterial(mCode){
        this.setState({
            mCode:mCode,
            materialCode:mCode
        })
       // if(mCode == "M000000001"){
            var visit = {"Index":"MaterialChange", "Token":"","Data":{"mat_code":mCode.toString(),"srno":""}}
            postToServer("MaterialRequestApi",visit).then( (Result)=>{  console.log("sweta",Result.data.data[0].status)
                if(Result.data.Status == "Success"){ 
                    this.setState({ 
                        visitData: Result.data.data,
                        visitShowFlag:Result.data.data[0].status
                     })
                    Result.data.data.map((item)=>{ 
                        this.setState({
                            visitMob:item.empMob,
                        })
                        
                    })
                }
              
            }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
            })
       // }
    }
    selectedPriority(priority){
        this.setState({
            priority:priority
        })
    }
    updateRequest(){
        let a = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email);
        if(this.state.email != ""){
            if(a == false){
                this.setState({
                    showStatusModal:!this.state.showStatusModal,
                    success:false,
                    sucessmsg:'Please Enter Valid Email Id'
                })
            }else{
                var data = {"Index":"UpdateRequest", 
                                "Token":"",
                                "Data":{"mtrlcode":this.state.materialCode,
                                        "desc1":this.state.desc1,
                                        "desc2":"",
                                        "desc3":this.state.reuqest,
                                        "prior":this.state.priority,
                                        "srno":this.state.srno,
                                        "dltyp":this.state.dType,
                                        "mobile":this.state.mobile,
                                        "email":this.state.email,
                                        "qlfc": this.state.quali
                                    }
                                }
                postToServer("MaterialRequestApi",data).then( (Result)=>{ 
                    if(Result.data.Status == "Success"){ 
                        Result.data.data.map((item)=>{
                        // console.log("gg",item)
                        Object.keys(item).map((aa)=>{
                                this.setState({
                                    showStatusModal:!this.state.showStatusModal,
                                    sucessmsg:item[aa],
                                    success:true
                                })
                        })
                        })
                    }
                    
                }).catch(  (Error)=> {  
                this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
                })
            }
        }else{
            var data = {"Index":"UpdateRequest", 
            "Token":"",
            "Data":{"mtrlcode":this.state.materialCode,
                    "desc1":this.state.desc1,
                    "desc2":"",
                    "desc3":this.state.reuqest,
                    "prior":this.state.priority,
                    "srno":this.state.srno,
                    "dltyp":this.state.dType,
                    "mobile":this.state.mobile,
                    "email":this.state.email,
                    "qlfc": this.state.quali
                }
            }
            postToServer("MaterialRequestApi",data).then( (Result)=>{ 
            if(Result.data.Status == "Success"){ 
            Result.data.data.map((item)=>{
            // console.log("gg",item)
            Object.keys(item).map((aa)=>{
                    this.setState({
                        showStatusModal:!this.state.showStatusModal,
                        sucessmsg:item[aa],
                        success:true
                    })
            })
            })
            }

            }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
            })
        }
    }
    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
           
        })
        
    }
    getChangeRequest(reuqest){
        this.setState({
            reuqest:reuqest
        }) 
    }
    getQualification(quali){
        this.setState({
            quali:quali
        }) 
    }
    getEmail(email){
        this.setState({
            email:email
        }) 
    }
    getMobile(mobile){
        this.setState({
            mobile:mobile
        }) 
    }
    cancel(){
        this.setState({
            materialCode:'-1',
            dType:'-1',
            desc1:'',
            priority:'2',
           
        })
    }
   
    render(){
       
        let materialList = []
        materialList.push(
            {
              "key": '-1',
              "text": 'please Select',
              "value": '-1',
            }
          )
        this.state.materialLIst ? this.state.materialLIst.map((item)=>{
            materialList.push(
                {
                    'key':item.c_code,
                    'text':item.c_name,
                    'value':item.c_code
                },
                )
        }): null
        let Del_List = []
        Del_List.push(
            {
              "key": '-1',
              "text": 'please Select',
              "value": '-1',
            }
          )
        this.state.delievryType ? this.state.delievryType.map((item)=>{
            Del_List.push(
                {
                    'key':item.Code,
                    'text':item.Name,
                    'value':item.Code
                },
                )
        }): null    
        let pri_List = [  
            {
                'key':'1',
                'text':'High',
                'value':'1'
            },
            {
                'key':'2',
                'text':'Medium',
                'value':'2'
            },
            {
                'key':'3',
                'text':'Low',
                'value':'3'
             },
        ]
      
        return(
            <React.Fragment>
                <div className="materialEntryField">
                    <div className="dcr-head">
                        <h5  className="dcr-list-sec-head">Material Request List</h5>
                    </div>
                    <div className="alldropsfclocation pl7">
                        
                        <div className="locationsfa">
                                <div>
                                    <spna className="drophead">Sr No:</spna>
                                    <span className="dropheadVal">{this.state.srno ? this.state.srno: this.state.new_srno}</span>
                                </div>
                                <div className="distributorClaimListsfc">
                                    <p className="paralocation">Material<span className="colorRed">*</span></p>
                                </div>
                                <div className="selectlocation mb16">
                                    <Dropdown   name={"from"} Type={1}     Selected={this.state.materialCode} selectedProduct={this.selectedMaterial} data={materialList} />
                                </div>
                        </div>
                        <div className="locationsfa">
                            <div>
                                <spna className="drophead">Employee Name:</spna>
                                <span className="dropheadVal">{this.state.userName}</span>
                            </div>
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Priority</p>
                            </div>
                            <div className="selectlocation mb16">
                                <Dropdown   name={"from"} Type={1}     Selected={this.state.priority} selectedProduct={this.selectedPriority} data={pri_List} />
                            </div>
                        </div>
                        <div className="locationsfa">
                            <div>
                                <spna className="drophead">Employee Code:</spna>
                                <span className="dropheadVal">{this.state.empCode}</span>
                            </div>
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Delivery Type
                                    {this.state.mCode == 'M000000002' ? 
                                    <span className="colorRed">*</span>: null}
                                </p>
                            </div>
                            <div className="selectlocation mb16">
                                <Dropdown   name={"from"} Type={1}     Selected={this.state.dType} selectedProduct={this.selectedDelivery} data={Del_List} />
                            </div>
                        </div>
                        <div className="locationsfa">
                            <div>
                                <spna className="drophead">Date:</spna>
                                <span className="dropheadVal">{this.state.d_date}</span>
                            </div>
                            <div className="distributorClaimListsfc">
                                <p className="paralocation">Description</p>
                            </div>
                            <div className="selectlocation mb16">
                                <Form.Control 
                                    type="text" 
                                    className="customized-input " 
                                    placeholder="Enter here" 
                                    value={this.state.desc1} 
                                    onChange={this.handleDesc}
                                />
                            </div>
                        </div>
                       
                    </div>
                {this.props.visitFlag == 1 ? 
                     <VisitingCardDetails 
                        visitData={this.state.visitData} 
                        usename={this.state.userName}
                        getChangeRequest={this.getChangeRequest}
                        getQualification={this.getQualification}
                        getEmail={this.getEmail}
                        getMobile={this.getMobile}
                        visitMob={this.state.visitMob}
                        requestChng={this.state.requestChng}
                        
                    /> :
                this.state.visitShowFlag == "1" ? 
                    <VisitingCardDetails  
                        visitData={this.state.visitData} 
                        usename={this.state.userName}
                        getChangeRequest={this.getChangeRequest}
                        getQualification={this.getQualification}
                        getEmail={this.getEmail}
                        getMobile={this.getMobile}
                        visitMob={this.state.visitMob}
                        requestChng={this.state.requestChng}
                    />:
                null}
                         
                 <div className="mt32">
                     {localStorage.getItem("edit") == "edit" ?
                     <Button  onClick={this.updateRequest}  className="addMatBtn"> Update</Button>: 
                     <Button  onClick={this.sendRequest}  className="addMatBtn">Send Request</Button>}
                     <Button  onClick={this.cancel}  className="materialCancelBtn materialCancelBtn-outline mr-2 mb-2 padleft" >Cancel</Button>
                     
                 </div>
                 </div>
                 <StatusPopup
                    message={this.state.sucessmsg}
                    show={this.state.showStatusModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
                />
                 {this.state.showPopup ? 
                 <SuccessMsg   
                    tital="Material Request Submitted" 
                     msg={this.state.msg} 
                    success={this.onShowPopup} 
                    status={this.state.rejectStatus}
                /> : null}
                
                </React.Fragment>
        )
    }
}

export default withRouter(MaterialEntryDropdown)