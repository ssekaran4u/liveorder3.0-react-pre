import React, { Component } from "react";
import { Card, Form, Accordion, Row, Col, InputGroup, Button } from 'react-bootstrap'
import SearchDropdown from "../../BasicComponet/searchDropdown";
import { postToServer } from '../../lib/comm-utils'
import { Dropdown } from 'semantic-ui-react';
import ProductDeatilDropdown from '../components/ProductDeatilDropdown'
import DCRSave from '../popups/DcrCreatedPopup'
// const options = [
//     { key: 'angular', text: 'Angular', value: 'angular' },
//     { key: 'css', text: 'CSS', value: 'css' },
//     { key: 'design', text: 'Graphic Design', value: 'design' },
//     { key: 'ember', text: 'Ember', value: 'ember' },
//     { key: 'html', text: 'HTML', value: 'html' },
//     { key: 'ia', text: 'Information Architecture', value: 'ia' },
//     { key: 'javascript', text: 'Javascript', value: 'javascript' },
//     { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
//     { key: 'meteor', text: 'Meteor', value: 'meteor' },
//     { key: 'node', text: 'NodeJS', value: 'node' },
//     { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
//     { key: 'python', text: 'Python', value: 'python' },
//     { key: 'rails', text: 'Rails', value: 'rails' },
//     { key: 'react', text: 'React', value: 'react' },
//     { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
//     { key: 'ruby', text: 'Ruby', value: 'ruby' },
//     { key: 'ui', text: 'UI Design', value: 'ui' },
//     { key: 'ux', text: 'User Experience', value: 'ux' },
// ]

class DigitalCallReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeOfCall: "-1",
            callOptions: "-1",
            remarks: "",
            key: "",
            Typecall:[],
            Typecalloption:[],
            productenable:false,
            loadself:{},
            Selectedproductdic:{},Selected:'',
            dcrmsg: '', dcrNo:'', saveDcrstatus: false,
            
        }
        this.getTypeOfCall = this.getTypeOfCall.bind(this)
        this.getCallOptions = this.getCallOptions.bind(this)
        this.remarksChange = this.remarksChange.bind(this)
        this.tick = this.tick.bind(this)
        this.getTime = this.getTime.bind(this)
        this.onReset = this.onReset.bind(this)
        this.onAccordIon = this.onAccordIon.bind(this)
        this.loadType_ofcall=this.loadType_ofcall.bind(this)
        this.handleDropdown=this.handleDropdown.bind(this)
        this.saveDistance=this.saveDistance.bind(this)
        this.onHide1=this.onHide1.bind(this)
    }

    onHide1() { 
        this.setState({ saveDcrstatus: false })
      
    }
        
      

    saveDistance(){

let product=''
        Object.keys(this.state.Selectedproductdic).map( (a)=>{
            product=a +'~'+product 
        })


        console.log(this.props.date,'ppppp')
        let date=this.props.date
       let year= date.getFullYear()
       let month=date.getMonth()+1
       let day=date.getDay()
        let data={"index":"Distance_Save",
        "Data":{
            "date":  month+'/'+ day+'/'+year,
            "doc":this.props.Otherdata["DoctorCode"] ,
            "call_type":this.state.Selected,
            "call_option":this.state.callOptions,
            "note":this.state.remarks,
            "stay":this.props.subarea,
            "dcrno":'',
            "product":product
        }}
     
        postToServer('DCRAPI', data).then((result) => {


            if(result.data["Data"]){ 
                if(result.data["Data"][0]){
                    if(result.data["Data"][0]["dcrno"]){
                const dcr = result.data["Data"][0]["dcrno"] ? result.data["Data"][0]["dcrno"] : result.data["Data"][0]["n_Srno"];
                const result1 = result.data["Data"][0]["result"]
                this.setState({ dcrmsg: result1, dcrNo:dcr, saveDcrstatus: true })
                }else{
                this.setState({ Error: true, Errormsg: 'Not Saved' })
                }
            }else{
            this.setState({ Error: true, Errormsg: 'Not Saved' })
            }
            }else{
                this.setState({ Error: true, Errormsg: 'API CAll Error' })
            }

          
           
         
       }).catch((Error) => {
   
   
       })



       //  console.log( product, this.state.typeOfCall,this.state.callOptions,this.props.subarea, this.state.remarks )
    }

    Selectedproduct(id, name, item, status) {
        //var arr = id.split('$')
        //alert(name)
        var procduct = {}
        procduct = this.state.Selectedproductdic
        if (procduct[item.c_item_code]) {
            delete procduct[item.c_item_code]
        }
        if (status == "1") {
            this.setState({
                Selectedproductdic: procduct,
                Errormsg: ''
            })
            return
        }
        procduct[item.c_item_code] = { "Type": "NONE", "disname": item["c_name"] }
        if (item["textval"] == undefined) {
            item["textval"] = '0'
        }
        if (name == "Prescriber") {
            procduct[item.c_item_code] = { "Type": "1", "textval": item["textval"], "disname": item["c_name"] }
        }
        if (name == "Non Prescriber") {
            procduct[item.c_item_code] = { "Type": "2", "textval": item["textval"], "disname": item["c_name"] }
        }
        if (name == "Convert") {
            procduct[item.c_item_code] = { "Type": "3", "textval": item["textval"], "disname": item["c_name"] }
        }
        if (name == "Others") {
            procduct[item.c_item_code] = { "Type": "4", "textval": item["textval"], "disname": item["c_name"] }
        }
        this.setState({
            Selectedproductdic: procduct,
            Errormsg: ''
        })
        console.log("----------------------------------------->",procduct)
    }

    onAccordIon(value) {
        if (this.state.key == value) {
            this.setState({ key: "" })
        }
        else {
            this.setState({ key: value })
        }
    }

    getTypeOfCall(value) {
        this.setState({ typeOfCall: value })
    }

    getCallOptions(value) {
        this.setState({ callOptions: value })
    }

    remarksChange(e) {
        if (e.target.value.length < 501) {
            this.setState({ remarks: e.target.value })
        }
    }

    getTime() {
        let time = new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0");
        return time;
    }

    tick() {
        let hour = new Date().getHours();
        let TimeType;
        if (hour <= 11) {
            TimeType = 'AM';
        }
        else {
            TimeType = 'PM';
        }
        if (hour > 12) {
            hour = hour - 12;
        }
        return TimeType
    }

    onReset() {
        this.setState({
            typeOfCall: "-1",
            callOptions: "-1",
            remarks: ""
        })
    }




    loadType(id){
        let data={"index":"Distance_Type_call","Data":{"n_srno":id,"fscode":""}}
     
        postToServer('DCRAPI', data).then((result) => {

            let k=[]

            result.data["Data"].map((a)=>{
               k.push( { key:  a.c_name, value: a.n_srno , text: a.c_name })
            })
           
           this.setState({ Typecalloption: k,typeOfCall:'1'   })
       }).catch((Error) => {
   
   
       })
    }

    loadType_ofcall(){
        let data={"index":"Distance_Type","Data":{"SearchKey":'',"fscode":""}}
     
        postToServer('DCRAPI', data).then((result) => {
           
           this.setState({ Typecall: result.data["Data"]   })
       }).catch((Error) => {
   
   
       })
    }

    handleDropdown(event,value){

this.setState({Selected:value.value})



value.options.map( (data)=>{


    
   if(data.value == value.value){
    if(data.value == "-1"){
        this.setState({productenable:false ,  typeOfCall: "-1"})
    }else{


      if(data.n_product == "1"){
          this.setState({productenable:true ,  typeOfCall: "-1" })
      }else{
          this.setState({productenable:false})
          this.loadType(value.value)
      }
    }
   }
})

      

    }



    componentDidUpdate(oldprop,oldstate){

      
          //  console.log(this.props.Editmodedata,'llllll',oldstate,oldprop)
        
    }

componentDidMount()
{
this.loadType_ofcall();

if(this.props.Editmodedata){
    if(this.props.Editmodedata["Dwrdetails"]){


      
        this.props.Editmodedata["Dwrdetails"].map((s)=>{
         
                if(s.C_DSC_Code== this.props.Otherdata["DoctorCode"]){
                this.setState({ Selected:s.c_dis_call_type , remarks: s.c_note })

                if(s.c_dis_call_option == '' || s.c_dis_call_option == '-1' ){
                    this.setState({productenable:true})
                }else{
                this.setState({callOptions:s.c_dis_call_option})


                    this.loadType(s.c_dis_call_type)
                }

                }
    //       selecteddr.push( { DoctorCode:s.C_DSC_Code , Dr_Name :s.Dr_Name , DSCASubName:'' ,Area:''}  )
        })
       
    }
}




//  console.log(this.props.Editmodedata,'KUNAL SINHA')


//this.props.Selectdate
var d = new Date()

const month = d.getMonth() + 1
const date = d.getFullYear() + '-' + month + '-' + d.getDate();
const data = { "index": "DoctorApp", "Data": { "date": date, "doc": this.props.Otherdata["DoctorCode"] } }

postToServer("DCRAPI", data).then((result) => {
    const WorkType = result.data["Component"][0]["c_worktrype"]

   

    this.setState({
        loadself: result.data["data"][0],
        Mandatory: result.data["Validaion"][0],
       // datakey: result.data["Component"],
        WorkType: WorkType
    })
}).catch((Error) => { 
    console.log(Error, 'man') 
})




}

    render() {


        
        return (
            <div className="digital_call_report">
                <div className=" marginTop21">
                    <div className="marginBottom parentAccordian">
                        <Accordion>
                            <Card className="digital_call_report_card">
                                <Accordion.Toggle onClick={() => this.onAccordIon("0")} as={Card.Header} variant="link" eventKey="0">
                                    <div className="call_report_card_header">
                                        <div classname="call_report_card_name">
                                           {this.props.Otherdata["Dr_Name"]   }
                                        </div>
                                        {this.state.key != "0" ?
                                            <img src="../public/assets/images/plus_blue.svg" alt="plus" /> :
                                            <img src="../public/assets/images/minus_blue.svg" alt="minus" />}
                                    </div>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div className="digital_call_report_body">
                                            <div className="timeSec">
                                                <div className="timeIcon"><img src="../public/assets/images/time.svg" /></div>
                                                <div className="currtime">{this.getTime()}</div>
                                                <div className="currtimeslot">{this.tick()}</div>
                                            </div>
                                            <div className="digital_call_report_detail_container">
                                                <Row>
                                                    <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                        <div className="sub_div">
                                                           
                                                        <Form.Label className="customized-label">Call Type  </Form.Label>  
                                                        <Dropdown
                    //onClick={this.props.onClickDropdown}
                    value={this.state.Selected}
                    onChange={this.handleDropdown.bind(this)}
                    fluid
                  //  search={this.props.disabled ? false : true}
                    selection
                    icon={<img src="../../public/assets/images/Path 2590.svg" alt="" />}
                    options={this.state.Typecall}
                  //  className={this.props.Selected == "-1" ? "initial-value" : null}
                />
                                                           
                                                            {/* <SearchDropdown
                                                                labelName="Type Of Call"
                                                                placeholder="Search or Select"
                                                                Selected={this.state.typeOfCall}
                                                                dropdownList={this.state.Typecall}
                                                                disabled
                                                                getValue={this.getTypeOfCall}
                                                            />  */}
                                                        </div>
                                                    </Col>





                                                    {/* {this.state.productenable ==true? */}
                                                    
                                                
                                               { Object.keys(this.state.loadself ).length >0  && this.state.productenable==true ?      <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                    <Form.Label className="customized-label">Product Detailing & Doctor Role {this.props.Mandatory["PdtMan"] == "1" ? <span className="colorRed">*</span> : ''} </Form.Label>
                                                     <ProductDeatilDropdown  loadself={this.state.loadself} Mandatory={this.props.Mandatory["product"]} Selectdate={this.props.Selectdate} clearAll={this.state.clearAll} Editmodedata={this.props.Editmodedata} eventKey={this.props.eventKey} getSelectProduct={this.Selectedproduct.bind(this)} docode={this.props.Otherdata["DoctorCode"]} id={"Product" + this.props.Otherdata["DoctorCode"]} />
                                                
                                                 
                                               </Col> :null}
                                               {/* :null } */}
                                                    <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                        <div className={this.state.typeOfCall!="-1"?"sub_div":"sub_div hide"}>
                                                            <SearchDropdown
                                                                labelName="Call Options"
                                                                placeholder="Search or Select"
                                                                Selected={this.state.callOptions}
                                                                dropdownList={this.state.Typecalloption}
                                                                disabled
                                                                getValue={this.getCallOptions}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                                                        <div className="sub_div">
                                                            <Form.Label className="customized-label">Remarks</Form.Label>
                                                            <span className="maxLength">Max <span className="maxlenColor">500</span> Character</span>
                                                            <Form.Control
                                                                as="textarea"
                                                                rows="5"
                                                                placeholder="Enter Remaks Here"
                                                                maxLength="500"
                                                                value={this.state.remarks}
                                                                onChange={this.remarksChange}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="digital_call_report_footer">
                                                <Row className="marginTop21 ">
                                                    <Col lg={6} md={12} sm={12} xs={12} className="product">
                                                        <button  onClick={this.saveDistance} className="savedcrBtn  mb-2">Save DWR</button>
                                                        <button
                                                            onClick={this.onReset}
                                                            className="danger danger-outline mr-2 mb-2 padleft"
                                                        >Reset</button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
                <DCRSave onHide={this.onHide1} dcrNo={this.state.dcrNo} dcrmsg={this.state.dcrmsg} show={this.state.saveDcrstatus} />
            </div>
        )
    }
}

export default DigitalCallReportList;