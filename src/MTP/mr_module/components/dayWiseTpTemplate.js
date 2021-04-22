import React, { Component } from "react";
import { Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import InputBox from '../../../TPT/components/InputBox'
import StatusPopup from '../../../lib/StatusPopup'
import {postToServer} from '../../../lib/comm-utils'
import Spinner from '../../../BasicComponet/sfaSpinner'
class DayWiseTpTemplate extends Component {
    constructor(props){
        super(props)
        this.state={
            doctor:'',
            chemist:'',
            stockist:'',
            other:'',
            showSucess:false,
            totaldata:{},
            docMantory:'',
            loderon:false
        }
        this.saveNoDetailsData= this.saveNoDetailsData.bind(this)
        this.getValue = this.getValue.bind(this)
        this.onHide = this.onHide.bind(this)
    }
    componentDidMount(){
        var inputdata = {
            "Data": {
                "Month": this.props.monthCode.toString(),
                "Year": this.props.year.toString(),
                "day":"1"
                
            },
            "index": "MTP_NOT_Allowed",
           
            "menuid": "38"
        }
        postToServer("MTP",inputdata).then( (Result)=>{ 
            let docMan =Result.data["flag"][0]["n_mtp_DoctorMandatory"];
            this.setState({
                docMantory:docMan
            })
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in  API " })
        })
    }
    getValue(name,value){
        this.props.wrkType.map((item) =>{
            this.state.totaldata[name] = value
            
        })
    }
    saveNoDetailsData(){
        if(this.props.mtpLock == 0   || this.props.mtpLock==2 ){
            let  doc= ''
            let  che =''
            let  stock=''
            let   other=''
            let hospital=''

            if(this.state.totaldata["DOCTOR"]){
                doc=this.state.totaldata["DOCTOR"]
            }else{
                doc=this.props.data.Doctor
            }
            if(this.state.totaldata["CHEMIST"]){
                che=this.state.totaldata["CHEMIST"]
            }else{
                che = this.props.data.Chemist
            }
            if(this.state.totaldata["STOCKIST"]){
                stock=this.state.totaldata["STOCKIST"]
            }else{
                stock = this.props.data.STOCKIEST
            }
            if(this.state.totaldata["OTHERS"]){
                other=this.state.totaldata["OTHERS"]
            }else{
                other= this.props.data.Others
            }
            if(this.state.totaldata["HOSPITAL"]){
                hospital=this.state.totaldata["HOSPITAL"]
            }else{
                hospital= this.props.data.hospital  //this.props.data.HOSPITAL
            }
            if (hospital==undefined)
            {
                hospital='0'
            }

            if (other==undefined){
                other='0'
            }

            if(che==undefined){
                che='0'
            }

            if(stock==undefined){
                stock='0'
            }
            if(doc==undefined){
                doc='0'
            }
                        
            if(this.state.docMantory == 1){
          //  if(this.props.n_type != 1){
                if(this.state.totaldata["DOCTOR"] == "0"){
                    this.setState({
                        showSucess:!this.state.showSucess,
                        Messagetype:false,
                        Errormsg:"Doctor is Mandatory"
                    }) 
                }else{

                    this.setState({loderon:true})
                    var data = {"index": "MTP_Save_No","Token": "","menuid":"38",
                                "Data": {
                                    "subarea":this.props.areaCode,
                                    "Year":this.props.year,
                                    "Month":this.props.monthCode,
                                    "day":this.props.day,
                                    "workwith":"",
                                    "n_doc":doc,
                                    "n_che":che,
                                    "n_stock":stock,
                                    "n_othr":other,
                                    "n_hospital":hospital
                                    }
                                }
                    postToServer("MTP", data).then((result) => {
                    if(result.data){
                        this.setState({
                            loderon:false,
                            showSucess:!this.state.showSucess,
                            Errormsg:result.data[0].RESULT,
                            Messagetype:true
                        })
                    }else{
                        this.setState({ loderon:false})
                    }
                    }).catch( (Error)=>{
                        this.setState({ loderon:false,  Error: true, Errormsg: "Error in App" })
                    })

                }
            //}
        }else{

            this.setState({loderon:true } )
            var data = {"index": "MTP_Save_No","Token": "","menuid":"38",
            "Data": {
                "subarea":this.props.areaCode,
                "Year":this.props.year,
                "Month":this.props.monthCode,
                "day":this.props.day,
                "workwith":"",
                "n_doc":doc,
                "n_che":che,
                "n_stock":stock,
                "n_othr":other,
                "n_hospital":hospital
                }
            }
            postToServer("MTP", data).then((result) => {
            if(result.data){
                this.setState({
                    loderon:false,
                    showSucess:!this.state.showSucess,
                    Errormsg:result.data[0].RESULT,
                    Messagetype:true
                })
            }else{
                this.setState({  loderon:false})
            }
            }).catch( (Error)=>{
                this.setState({  loderon:false, Error: true, Errormsg: "Error in App" })
            })
        }
    }else{


      //  alert(this.props.mtpLock )
       
        this.setState({
            showSucess:!this.state.showSucess,
            Messagetype:false,
            Errormsg:"MTP Already Approved"
           })
    }
        
        
    }
    onHide(){ 
        this.setState({
            showSucess:!this.state.showSucess
        })
        
    }
    render() { 



        console.log(this.props.data,'i m')
        let chemist = this.props.data.Chemist
        let doctor = this.props.data.Doctor
        let other = this.props.data.Others
        let stock = this.props.data.STOCKIEST
        let hospital = this.props.data.hospital
        return (

            <div className="daywise-template">

               {this.state.loderon ==true ? <Spinner></Spinner> :null}
                <Card className="date-wise-template-card">
                    <Row>
                        {  this.props.wrkType ? this.props.wrkType.map((item,index)=>(
                        <Col xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                            {item.C_Name == "Worktype OTHERS"  ? null :
                            <InputBox 
                                name={item.C_Name} 
                                getValue={this.getValue} 
                                inputVal={
                                    item.C_Name == 'DOCTOR' ? doctor :
                                    item.C_Name == 'CHEMIST' ? chemist:
                                    item.C_Name == 'OTHERS' ? other:
                                    item.C_Name == 'STOCKIST' ? stock:
                                    item.C_Name == 'HOSPITAL' ? hospital:
                                    ''
                                } 
                            /> }
                        </Col>)): null}
                        <Col xs={12} sm={6} md={4} lg={3} xl={3} className="button-column">
                            <button className="submit-button">
                                <div className="text" onClick={this.saveNoDetailsData}>Submit</div>
                            </button>
                        </Col>
                    </Row>
                </Card>
                <StatusPopup
                    message={this.state.Errormsg}
                    show={this.state.showSucess}
                    onClose={this.onHide}
                    success={this.state.Messagetype}
                    />  
            </div>
        )
    }
}

export default DayWiseTpTemplate;