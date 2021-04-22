import React, { Component } from "react";
import { Tabs, Tab,Row,Col,Form,Button} from 'react-bootstrap';
import Dropdown from '../../../BasicComponet/DropDown'
import {postToServer} from '../../../lib/comm-utils'
import {connect} from 'react-redux'
import StatusPopup from '../../../lib/StatusPopup'
import {getAreaPatchs} from '../../../actions/MTP'
import ConfirmationBox from '../../../lib/ConfirmationBox'
class Others extends Component {
    constructor(props){
        super(props)
        this.state={
            Grouptype:[],
            showSucess:false,
            Errormsg:'',
            selectedValue:{},
            wrkCode:'',
            meetingStatus:'',
            statusModal:false,
            sKey:''
        }
        this.save = this.save.bind(this)
        this.selectedProduct = this.selectedProduct.bind(this)
        this.onHide = this.onHide.bind(this)
        this.Load_forEdit=this.Load_forEdit.bind(this)
        this.getData = this.getData.bind(this)
        this.deleteWorkTye = this.deleteWorkTye.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.getBtnResponse = this.getBtnResponse.bind(this)
    }
    getData(){
        const {name,id,checked} = event.target
        let selectedValue = {}
        selectedValue = this.state.selectedValue
        if(checked){ 
            //if(this.state.meetingStatus == "No Metting  Submitted"){
                this.save(id)
                selectedValue[id] = true
                this.setState({
                    selectedValue:selectedValue
                })
            // }else{
            //     selectedValue[id] = false
            //     this.setState({
            //         selectedValue:selectedValue,
            //         showSucess:!this.state.showSucess,
            //         Errormsg:"Work Type Already Submitted",
            //         Messagetype:false,
            //     })
            // }
        }else{
            this.deleteWorkTye(id)
            delete selectedValue[id]
        }
    }
    deleteWorkTye(key){
        this.setState({
            statusModal:!this.state.statusModal,
            msg:'You want to delete work type ?',
            sKey:key
        })
    }

    Load_forEdit(key){
        this.setState({ key:key })
        var data =  {"index": "MTP_Selected_other","Token": "",
            "Data": { 
            "subarea":this.props.areaCode,
            "Year":this.props.year,
            "Month":this.props.monthCode,
            "day":this.props.day,
            "Worktype":key,
            "workwith":""
            }
        }
        postToServer("MTP", data).then((result) => {
            if('Alredy metting  Submited '==result.data[0].Result){
                this.setState({ 
                    //Errormsg:result.data[0].Result,
                    wrkCode:result.data[0].c_work_type
                })
             }else{
                this.setState({ 
                    meetingStatus:result.data[0].Result.trim(),
                    wrkCode:''
                })
             }
        }).catch((error) => {
            console.log(error)
        })
    }
    componentDidMount(){
        var data =  {"Token": "","Index":"work_other_type","Data":{"Tab":"3"}}
            postToServer("MTP", data).then((result) => {
                if (result.data["Status"] == "Success") {
                    let wrkType
                    let selectedValue={}
                    result.data.Grade_mst.map((item,index) =>{
                        if(index==0){
                            wrkType =item.c_code
                            var data =  {"index": "MTP_Selected_other","Token": "",
                                        "Data": { 
                                            "subarea":this.props.areaCode,
                                            "Year":this.props.year,
                                            "Month":this.props.monthCode,
                                            "day":this.props.day,
                                            "Worktype":item.c_code,
                                            "workwith":""
                                        }
                                    }
                            postToServer("MTP", data).then((result) => {console.log("selectedValue22",result.data)
                              //  if('No metting  Submited '!=result.data[0].Result){
                                   // selectedValue[result.data[0].c_work_type] = true
                                   result.data.map((aa)=>{
                                    selectedValue[aa.c_work_type]= true
                                    this.setState({ 
                                        meetingStatus:aa.Result.trim(),
                                        wrkCode:aa.c_work_type,
                                        selectedValue:selectedValue
                                    })
                                   })
                                    
                               // }
                            }).catch((error) => {
                            
                                console.log(error)
                            })
                        }
                    })
                    this.setState({ 
                        Grouptype: result.data.Grade_mst,
                        wrkType:wrkType,
                        
                     })
                } else {
                    this.setState({ Grouptype:[] })
                }
            }).catch((error) => {
                this.setState({ Grouptype:[] })
             //   console.log(error)
            })
        
    }
    selectedProduct(id,type,name){
        this.setState({
            id:id,
            wrkCode:name
        })
    }
    save(worktype){
        if(this.props.mtpLock == 0   || this.props.mtpLock==2  ){
            var data =  {"index": "MTP_OtherWok_type_save","Token": "",
                            "Data": { 
                                "subarea":this.props.areaCode,
                                "Year":this.props.year,
                                "Month":this.props.monthCode,
                                "day":this.props.day,
                                "Worktype":worktype,
                                "workwith":""
                            }
                        }
            postToServer("MTP", data).then((result) => {
               


                const sttaus=result.data[0].status

                if (sttaus=="1"){
                this.setState({ 
                    showSucess: true,
                    Errormsg:result.data[0].Result,
                    Messagetype:true,
                    wrkCode:worktype,
                    selectedValue:this.state.selectedValue
                })
                this.Load_forEdit(worktype)
            }else{
               let selectedValue= this.state.selectedValue
                delete selectedValue[worktype] 
                this.setState({ 
                    showSucess: true,
                    Errormsg:result.data[0].Result,
                    Messagetype:false,
                    selectedValue :selectedValue
                 
                  
                })
              
               
            }
                }).catch((error) => {
            
                console.log(error)
            })
        }else{
            this.setState({
                showSucess: !this.state.showSucess,
                Errormsg:'MTP Already Approved',
                Messagetype:false
            })
            
        }
    }
    onHide(){
        this.setState({
            showSucess:!this.state.showSucess
        })
    }
    hideModal(){
        this.setState({
            statusModal:!this.state.statusModal
        })
    }
    getBtnResponse(data){

       
        if(data == "yes"){
            var data =  {"index": "MTP_OTher_Work_delete","Token": "",
            "Data": { 
                "subarea":this.props.areaCode,
                "Year":this.props.year,
                "Month":this.props.monthCode,
                "day":this.props.day,
                "worktype":this.state.sKey
               }
            }
            postToServer("MTP", data).then((result) => {



                let status= result.data[0].status

                if (status=="1"){
               this.setState({
                    statusModal:!this.state.statusModal,
                    showSucess:!this.state.showSucess,
                    Errormsg:result.data[0].RESULT,
                    Messagetype:true
               })
               this.Load_forEdit(this.state.sKey)
            }else{
                this.state.selectedValue[this.state.sKey] = true
                this.setState({
                    statusModal:!this.state.statusModal,
                    showSucess:!this.state.showSucess,
                    Errormsg:result.data[0].RESULT,
                    Messagetype:false
               })
            }
            }).catch((error) => {
                console.log(error)
            })
        }else{
            this.state.selectedValue[this.state.sKey] = true
            this.setState({
                statusModal:!this.state.statusModal
            })
        }
    }
    render() { 
        console.log("selectedValue",this.state.selectedValue)
        const { Grouptype } = this.state
        return (
            <React.Fragment>
                <div className="OtherTab ">
                 <div className="marginTop16 dcrworkPanel ">
                    <div className="dcrboxhead">
                        Select Type Of Work Given Below
                    </div>
                       
                <div className="flexDisplay ">
                  {   Grouptype ? Grouptype.map(  (typekey,index)=>
                        <div className="weekheadCheck pr20 pb20">
                            <Form.Check
                                custom
                                type="checkbox"
                                checked= {this.state.selectedValue[typekey.c_code] ?  true : false }
                                id={typekey.c_code}
                                label={typekey.c_name}
                                name=""
                                onChange={this.getData}
                            />
                        </div>
                    ) :''}
                    </div>
                   
                </div>
                </div>
                <StatusPopup
                    message={this.state.Errormsg}
                    show={this.state.showSucess}
                    onClose={this.onHide}
                    success={this.state.Messagetype}
                /> 
                 <ConfirmationBox 
                    show={this.state.statusModal}
                    onClose={this.hideModal}
                    msg={this.state.msg}
                    btnResponse={this.getBtnResponse}
                 />  
                </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    patches:state.MTP.patches,
    
})

const mapDispatchToProps = dispatch => ({
    getAreaPatchs:data => dispatch(getAreaPatchs(data))
   
    
})

export default  connect(mapStateToProps ,mapDispatchToProps)(Others);