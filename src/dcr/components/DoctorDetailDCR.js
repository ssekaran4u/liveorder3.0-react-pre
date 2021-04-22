/*
* This code will display selected doctor and particular components for selected doctor 
* Request URL=url/DcrComponentAdd
* Index=1
* Request string={"n_type":"1","Token":""}
* Response string={
    c_name:Product Detailing & Doctor Role
    c_worktrype:000001
    n_Required:1
    n_id:1
    n_priority:1
    n_visible:1


   c_name:Samples & pramotions
   c_worktrype:000001
   n_Required:0
   n_id:1
   n_priority:2
   n_visible:1

  c_name:POB (item wise)
  c_worktrype:000001
  n_Required:0
  n_id:1
  n_priority:3
  n_visible:1

  c_name:Joint Working
  c_worktrype:000001
  n_Required:0
  n_id:1
  n_priority:5
  n_visible:1

 c_name:In Clinical Discussion
 c_worktrype:000001
 n_Required:1
 n_id:1
 n_priority:13
 n_visible:1
}

Response Error={}

*/









import React, { Component } from 'react'
import { Breadcrumb, Row, Col, Form, Table } from 'react-bootstrap'
import { connect } from 'react-redux';
import ProductDeatilDropdown from '../components/ProductDeatilDropdown'
import SamplePramotionDropdown from '../components/SamplePramotionDropdown'
import POBDropdown from '../components/POBDropdown'
import RCPA from '../components/DoctorRCPA'
import ClinicalDisscussion from '../components/ClinicalDisscussion'
import OtherActivity from '../popups/OtherActivity'
import JointWorkingDropdown from '../components/JointWorkingDropdown'
import { getProductDropdown } from '../../actions/DCR'
import { tick } from '../../lib/comm-utils'
import { postToServer } from '../../lib/comm-utils'
// pop up component 
import StatusPopup from '../../lib/StatusPopup'
import DCRSave from '../popups/DcrCreatedPopup'
import MCRSave from '../popups/FeedbackComp'
import Poptxt from './Poptxt'
import Loader from '../../lib/Loader'
import DoctorRCPA from '../components/DoctorRCPA'
//import { Accordion, AccordionItem } from 'react-light-accordion';
import { Accordion, Card } from 'react-bootstrap';

import AddRow from './AddRow'
import MCRTimeComp from '../components/MCRTimeComp'
import MCRWorkingWithComp from '../components/MCRWorkingWithComp'
import Alert from 'react-bootstrap/Alert'
import {setApiCallStatus} from '../../actions/MrDashboard'
import StayAt from '../components/StayAt'
import ConfirmationBox from '../../lib/ConfirmationBox'
class DoctorDetailDCR extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            time: new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0"),
            timeType: '',
            datakey: [],
            docInfo: [],
            docArea: [],
            Selectedproductdic: {},
            SelectedSampledic: {},
            Selectedpop: {},
            Selectednote: '',
            saveDcrstatus: false,
            poptxt: '',
            notetxt: '',
            jointdic: {},
            dcrNo: '',
            dcrmsg: '',
            tableData: [],
            WorkType: '',
            morningcomponetstatus: 'M',
            workwithstr: {},
            selfworkcomponetstate: '0',
            mcrshow: false,
            mcrpopcontain: [],
            Finalcompititordata: {},
            FinalproductwiseRCPA: {},
            Errormsg: '',
            Outstanding: '',
            Closingvalue: '',
            Sales: '',
            loader: false,
            clearAll: false,
            loadself: {},
            Mandatory: {},
            Editmode: false,
            DCRNO: '',
            nosample: false,
            nogift: false,
            stayLocation:'',
            Wshow:false,
            WMsg:'Do you Want Leave Data Without Save',
            loadsample:false

        }
        //onHide={this.onMCRHide}  show={this.state.mcrshow}
        this.onMCRHide = this.onMCRHide.bind(this)
        this.handleShowModal = this.handleShowModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.getDropdown = this.getDropdown.bind(this)
        this.sendtable = this.sendtable.bind(this)
        this.SelectedSample = this.SelectedSample.bind(this)
        this.popSelected = this.popSelected.bind(this)
        this.showSuccessPopup = this.showSuccessPopup.bind(this)
        this.onHide = this.onHide.bind(this)
        this.Errorclose = this.Errorclose.bind(this)
        this.poptTxtchange = this.poptTxtchange.bind(this)
        this.onNotechange = this.onNotechange.bind(this)
        this.Selected = this.Selected.bind(this)
        this.Morningfun = this.Morningfun.bind(this)
        this.selfworkcomponetfun = this.selfworkcomponetfun.bind(this)
        this.funRCPA = this.funRCPA.bind(this)
        this.productRCPA = this.productRCPA.bind(this)
        this.reset = this.reset.bind(this)
        this.salesChange = this.salesChange.bind(this)
        this.ClosingvalueChange = this.ClosingvalueChange.bind(this)
        this.OutstandingvalueChange = this.OutstandingvalueChange.bind(this)
        this.getStayAtLoc = this.getStayAtLoc.bind(this)
        this.Samplevalidation = this.Samplevalidation.bind(this)
        this.handleHoverOff=this.handleHoverOff.bind(this)
        this.Wclose=this.Wclose.bind(this)
        this.getBtnResponse=this.getBtnResponse.bind(this)
        this.handleHoverOn=this.handleHoverOn.bind(this)
        this.funRCPARemove = this.funRCPARemove.bind(this)

    }



   


    handleHoverOn(){



        //alert(sessionStorage.getItem("ActiveDCR"))
        //alert('kunal')
        //console.log(sessionStorage.getItem("ActiveDCR") , this.props.dataDoc["DoctorCode"],'trail0')
       
        // if(sessionStorage.getItem("ActiveDCR")=="null"){
        //     sessionStorage.setItem("ActiveDCR",this.props.dataDoc["DoctorCode"])
        //     return
        // }
        if(sessionStorage.getItem("ActiveDCR") !="null" ){
          // console.log(sessionStorage.getItem("ActiveDCR") , null,'trail1')
            //console.log(sessionStorage.getItem("ActiveDCR"),"trail2" )
        if(sessionStorage.getItem("ActiveDCR")!=this.props.dataDoc["DoctorCode"])
        {
            this.setState({Wshow:true, WMsg:'Your last MCL Details Not Save You Want Delete ? ',})
        }
        // if(sessionStorage.getItem("ActiveDCR")!=this.props.dataDoc["DoctorCode"]){

            
        //     this.setState({Wshow:false, WMsg:'Your last MCL Details Not Save ? ',})
            
        // }
    }
this.setState({loadsample:!this.state.loadsample})
    
        
    }
    Wclose(){
        this.setState({Wshow:false})
    }
    getBtnResponse(ok){

        if(ok=="yes"){
        this.setState({Wshow:false})
        // this.reset();
        this.props.removeItem(sessionStorage.getItem("ActiveDCR"))
        this.props.funActivateAcodian(this.props.dataDoc["DoctorCode"])
        sessionStorage.setItem("ActiveDCR",this.props.dataDoc["DoctorCode"])
        }else{
        this.setState({Wshow:false})
      
        this.props.funActivateAcodian(sessionStorage.getItem("ActiveDCR"))
        }
    }


    handleHoverOff(){
       

       // console.log("doctor list",sessionStorage.getItem("ActiveDCR"),this.props.dataDoc["DoctorCode"])
        //alert( sessionStorage.getItem("ActiveDCR"))

        // if(sessionStorage.getItem("ActiveDCR")=="null"){
        //     // sessionStorage.setItem("ActiveDCR",this.props.dataDoc["DoctorCode"])
        // }else{
        //     if(sessionStorage.getItem("ActiveDCR")!=this.props.dataDoc["DoctorCode"]){
               
        //        if(sessionStorage.getItem("ActiveDCR")!= "null"){
        //         this.setState({Wshow:true})
        //        }
        //     }
        // }
        // alert('kunal')
        
    }


    Samplevalidation(){


        if (sessionStorage.getItem("n_Balanceqtydisplay_dcr") == null){
        var data = {
            "index": "DCR_Validation"
        }

       
        postToServer("DCRAPI", data).then((result) => {
      
     let    res=result.data["Data"][0]

        
        sessionStorage.setItem("n_Balanceqtydisplay_dcr",res["n_Balanceqtydisplay_dcr"])
        sessionStorage.setItem("n_Balanceqtydisplay_mcr",res["n_Balanceqtydisplay_mcr"])
        sessionStorage.setItem("n_balqtyvalidateMCR", res["n_balqtyvalidateMCR"])
        sessionStorage.setItem("n_balqtyvalidateDCR", res["n_balqtyvalidateDCR"])

        }).catch((Error) => {
        })
    }
    }

    reset() {
        this.setState({
            poptxt: '',
            notetxt: '',
            Selectednote: '',

            poptxt: '',
            Selectedproductdic: {},
            SelectedSampledic: {},
            Selectedpop: {},
            Outstanding: '',
            Closingvalue: '',
            Sales: '',
            morningcomponetstatus: 'M',
            workwithstr: {},
            selfworkcomponetstate: '0',
            clearAll: !this.state.clearAll, tableData: [],

        })
    }




    //  i am working alone component active only for mcr
    selfworkcomponetfun(data) {
        if (data == true) {
            this.setState({ selfworkcomponetstate: '1' })


        } else {


            this.setState({ selfworkcomponetstate: '0' })
        }
    }
    // morning evening component status
    Morningfun(data) {
        this.setState({ morningcomponetstatus: data })
    }

    componentDidUpdate(oldprops, oldstate) {








        
        if ( oldprops.Editmodedata!= this.props.Editmodedata) {
            if (this.props.Editmodedata['DWR']) {
                const dcrno = this.props.Editmodedata['DWR'][0]["N_Srno"]
                const n_workedwithself=this.props.Editmodedata['DWR'][0]["n_workedwithself"]
                this.setState({  selfworkcomponetstate:n_workedwithself, Editmode: true, DCRNO: dcrno })
            }
            if (this.props.Editmodedata['Dwrdetails']) {
                this.props.Editmodedata['Dwrdetails'].map((s) => {
                    if (s.C_DSC_Code == this.props.doccode) {
                        this.setState({ Outstanding: s.N_Outstanding, Closingvalue: s.N_Closing, Sales: s.N_Sales_Value })
                    }
                })
            }


        }




        if (oldstate.loadself != this.state.loadself) {

            if (this.state.loadself == undefined) {
                return null
            }
            var data = {
                "n_type": this.state.loadself["N_Type"]
            }
            postToServer("DcrComponentAdd", data).then((result) => {
                const WorkType = result.data[0]["c_worktrype"]
                this.setState({ datakey: result.data, WorkType: WorkType })
            }).catch((Error) => {
            })
        }
    }
    componentDidMount() {
this.Samplevalidation()
        if (this.props.Editmodedata) {
            if (this.props.Editmodedata['DWR']) {
                const dcrno = this.props.Editmodedata['DWR'][0]["N_Srno"]
                const n_workedwithself=this.props.Editmodedata['DWR'][0]["n_workedwithself"]
                this.setState({  selfworkcomponetstate:n_workedwithself, Editmode: true, DCRNO: dcrno })
            }
            if (this.props.Editmodedata['Dwrdetails']) {
                this.props.Editmodedata['Dwrdetails'].map((s) => {
                    if (s.C_DSC_Code == this.props.doccode) {
                        this.setState({ Outstanding: s.N_Outstanding, Closingvalue: s.N_Closing, Sales: s.N_Sales_Value })
                    }
                })
            }


        }

        var d = new Date(this.props.Selectdate)


        const month = d.getMonth() + 1
        const date = d.getFullYear() + '-' + month + '-' + d.getDate();
        const data = { "index": "DoctorApp", "Data": { "date": date, "doc": this.props.doccode } }
        postToServer("DCRAPI", data).then((result) => {
            //console.log(result, 'man')
            const WorkType = result.data["Component"][0]["c_worktrype"]
            if (result.data["Edit"]) {
                if (result.data["Edit"][0]) {
                    if (result.data["Edit"][0]["N_Srno"]) {
                        if (!this.props.Editmodedata['DWR']) {
                            this.props.DCREDITActive(result.data["Edit"][0]["N_Srno"])
                        }
                    }
                }
            }
            this.setState({
                loadself: result.data["data"][0],
                Mandatory: result.data["Validaion"][0],
                datakey: result.data["Component"],
                WorkType: WorkType
            })



        }).catch((Error) => { console.log(Error, 'man') })
        // const data = { "index": "DoctorApp", "Data": { "doc": this.props.doccode } }
        // postToServer("DCRAPI", data).then((result) => {
        //     this.setState({
        //         loadself: result.data["data"][0]
        //     })
        // }).catch((Error) => { })

    }
    sendtable(datatable) {

        this.setState({
            tableData: datatable
        })
    }
    componentWillUnmount() {
        //clearInterval(this.intervalID);
    }
    getDropdown() {
        var data = {
            "n_type": this.props.dataDoc["N_Type"]
        }
        postToServer("DcrComponentAdd", data).then((result) => {
            const WorkType = result.data[0]["c_worktrype"]
            this.setState({ datakey: result.data, WorkType: WorkType })
        }).catch((Error) => {
        })
    }
    handleShowModal() {
        this.setState({
            showModal: true
        });
    }
    handleClose() {
        this.setState({
            showModal: false
        })
    }
    // Selected   Product Detailing & Doctor Role 
    /* ---------------------- COMMENT SECTION--------------------------
*   
* ------------TASK INFO--------------------------
*  filter  the selected  product and  Product Detailing
* ----------------------------------------------- 
*  NOTE :-  Need to create dictionary  along with product id and Product Detailing
* 
* 
* 
* ----------------- DEVLOPER INFO---------------------------
*  CREATED BY :-    KUNAL KUMAR 
*  UNDER PRODUCT :- SFA360
*  DATE:-     4-7-2019 
* --------------------------------------------
*/
    Selectedproduct(id, name, item, status) {
        //var arr = id.split('$')
        // alert(name)

        
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
        //console.log("----------------------------------------->",item)
    }
    // taking sample data from child 
    /* ---------------------- COMMENT SECTION--------------------------
*   sample  selected by user 
* ------------TASK INFO--------------------------
*  create  dictionary  to  keep sample with  quantity
* ----------------------------------------------
*  NOTE :-  
* 
* 
* 
* ----------------- DEVLOPER INFO---------------------------
*  CREATED BY :-    KUNAL KUMAR 
*  UNDER PRODUCT :- SFA360
*  DATE:-     7-3-2019 
* --------------------------------------------
*/
    SelectedSample(SelectedSample, nosample, nogift) {
   
         // sessionStorage.setItem("ActiveDCR",this.props.dataDoc["DoctorCode"])
        this.setState({ nosample: nosample, nogift: nogift, Errormsg: '', SelectedSampledic: SelectedSample })
        // this.setState({ Errormsg: '', SelectedSampledic: SelectedSample })
    }
    /* ---------------------- COMMENT SECTION--------------------------
    *   pop selected  by user data
    * ------------TASK INFO--------------------------
    * CURRENTLY ADDED  
    * ----------------------------------------------- 
    *  NOTE :- IT MAY BE REDUX BECAUSE IT IS ONLY ONE TIME CALL
    * 
    * 
    * 
    * ----------------- DEVLOPER INFO---------------------------
    *  CREATED BY :-    KUNAL KUMAR 
    *  UNDER PRODUCT :- SFA360
    *  DATE:-     7-3-2019 
    * --------------------------------------------
    */
    popSelected(Selectedpop) {
        // Selectedpop
        this.setState({ Errormsg: '', Selectedpop: Selectedpop })
    }
    /* ---------------------- COMMENT SECTION--------------------------
   *   NOTE  SELECTED   by user data
   * ----------------------------------------------- 
   *  NOTE :-  DOCTOR WISE NOTE
   * 
   * ----------------- DEVLOPER INFO---------------------------
   *  CREATED BY :-    KUNAL KUMAR 
   *  UNDER PRODUCT :- SFA360
   *  DATE:-     7-4-2019 
   * --------------------------------------------
   */
    NoteSelected(Selectednote) {
        // Selectedpop
        this.setState({ Errormsg: '', Selectednote: Selectednote })
    }
    /* ---------------------- COMMENT SECTION--------------------------
    *     THIS FUNCTION   CHECK Mandatory  FILED SELECTED AND VALIDATE   AND CREATE JSON 
    *     TO CALL   DCR SAVE API  
    * ------------TASK INFO--------------------------
    * 
    * ----------------------------------------------- 
    *  NOTE :-  
    * -------------API INFO-----------------------
    * INPUT API WILL TAKE 
    * 1. JSON OBJECTS
    * 2. SAVE DCR API FOR WORK TYPE
    * 3. TOKEN * 
    * ----------------- DEVLOPER INFO---------------------------
    *  CREATED BY :-    KUNAL KUMAR 
    *  UNDER PRODUCT :- SFA360
    *  DATE:-     7-3-2019 
    * --------------------------------------------
    */
    showSuccessPopup(staylocation) { 

         console.log(this.state.SelectedSampledic,'<<<<kunal>>>>')
        if(this.props.apiResultState){
        if(this.props.apiResultState["callAvg"] == 1 ){
        var apiRest = this.props.apiResultState['callAvg'];//console.log("sweta",apiRest)
        var apiRest = 0
        this.props.setApiCallStatus(apiRest)
        //console.log("chauhan",apidata)
        }
    }
        let Errorstate = false
        let RCPALIST = {}



        // RCPA code to check  selected data

        var str = ''
        var listResult = {}
        const RCPAproduct = this.state.FinalproductwiseRCPA
        const compititor = this.state.Finalcompititordata
        if (RCPAproduct != undefined) {
            Object.keys(RCPAproduct).map((key) => {
                if (compititor) {
                    if (Object.keys(compititor).length == 0 || compititor == undefined) {
                        this.setState({ Error: true, Errormsg: 'Please Select Compititor' })
                        Errorstate = true
                        return null
                    }
                }
                Object.keys(compititor[key]).map((compitior) => {
                    // brandcode~brandName~RX~QTY~VALUE~WEightage#Competitorcode~CompetitorName~RX~QTY~VALUE~WEightage#Competitorcode~CompetitorName~RX~QTY~VALUE~WEightage#$
                    const prrx = RCPAproduct[key][compitior]["rx"] == undefined || RCPAproduct[key][compitior]["rx"] == '' ? '0' : RCPAproduct[key][compitior]["rx"]
                    const prQuantity = RCPAproduct[key][compitior]["Quantity"] == undefined || RCPAproduct[key][compitior]["Quantity"] == '' ? '0' : RCPAproduct[key][compitior]["Quantity"]
                    const prValue = RCPAproduct[key][compitior]["Value"] == undefined || RCPAproduct[key][compitior]["Value"] == '' ? '0' : RCPAproduct[key][compitior]["Value"]
                    const prWeightage = RCPAproduct[key][compitior]["Weightage"] == undefined || RCPAproduct[key][compitior]["Weightage"] == '' ? '0' : RCPAproduct[key][compitior]["Weightage"]
                    str = str + compitior + '~' + 'A' + '~' + prrx + '~' + prQuantity + '~' + prValue + '~' + prWeightage + '#'
                    //console.log('-->', compitior,RCPAproduct[key][compitior]["rx"],RCPAproduct[key][compitior]["rx"],RCPAproduct[key][compitior]["Value"],RCPAproduct[key][compitior]["Quantity"] ,RCPAproduct[key][compitior]["Weightage"],'key')
                    Object.keys(compititor[key][compitior]).map((onecomp) => {
                        const comrx = compititor[key][compitior][onecomp]["rx"] == '' ? '0' : compititor[key][compitior][onecomp]["rx"]
                        const comQuantity = compititor[key][compitior][onecomp]["Quantity"] == '' ? '0' : compititor[key][compitior][onecomp]["Quantity"]
                        const comValue = compititor[key][compitior][onecomp]["Value"] == '' ? '0' : compititor[key][compitior][onecomp]["Value"]
                        const comWeightage = compititor[key][compitior][onecomp]["Weightage"] == '' ? '0' : compititor[key][compitior][onecomp]["Weightage"]
                        //console.log( 'compititor->>>',key,compitior, onecomp,compititor[key][compitior][onecomp]["rx"], compititor[key][compitior][onecomp]["Value"], compititor[key][compitior][onecomp]["Quantity"],compititor[key][compitior][onecomp]["Weightage"])
                        str = str + onecomp + '~' + onecomp + '~' + comrx + '~' + comQuantity + '~' + comValue + '~' + comWeightage + '#'
                    }
                    )
                    str = str + '$'
                })
                listResult[key] = str
                str = ''
                // console.log(product[key]["rx"],product [key]["Value"],product[key]["Quantity"] ,product[key]["Weightage"] )
            })
            //console.log(listResult, 'Result')
        }
        RCPALIST = listResult



        // End RCPA



        if (this.props.dcrallowstatus == true) {
            this.setState({ Error: true, Errormsg: 'DCR Not Allowed' })
            return null
        }

        
        if (this.state.Mandatory["PdtMan"] == "1") {
            if (Object.keys(this.state.Selectedproductdic).length == 0) {
                this.setState({ Error: true, Errormsg: 'Please Select product' })
                return null
            }
        }

        let lacoalsample = false
        let localgift = false
        let giftcount=0
        if (this.state.nosample) {
            lacoalsample = true

        }

         
        // return

           if (this.state.nogift) {
            localgift = true

        }
        
        if (this.state.Mandatory["SampleMan"] == "1") {
            if (Object.keys(this.state.SelectedSampledic).length == 0) {


               

                if (!this.state.nogift) {
                    this.setState({ Error: true, Errormsg: 'Please Select Brand Reminder' })


                    return null
                }


                if (this.state.nogift==false) {
                    this.setState({ Error: true, Errormsg: 'Please Select Brand Reminder' })


                    return null
                }

                if (!this.state.nosample || !this.state.nogift) {
                    this.setState({ Error: true, Errormsg: 'Please Select Sample ' })


                    return null
                }

            } else {
                Object.keys(this.state.SelectedSampledic).map((lo) => {

                    if (!this.state.nosample) {
                        if (this.state.SelectedSampledic[lo]["type"] == "sample") {
                            lacoalsample = true
                        }
                    }
                    if (!this.state.nogift) {
                        if (this.state.SelectedSampledic[lo]["type"] == "gift") {

                           // alert(this.state.SelectedSampledic[lo]["type"])
                            localgift = true
                        }
                    }

                    if (this.state.SelectedSampledic[lo]["type"] == "gift") {
                    giftcount=giftcount+1
                    alert('okok')
                    }
                })
                if (!lacoalsample) {
                    this.setState({ Error: true, Errormsg: 'Please Select Sample' })
                    return null
                }
                if (!localgift) {
                    this.setState({ Error: true, Errormsg: 'Please Select Brand Reminder' })
                    return null
                }
                // if (localgift==false) {
                //     this.setState({ Error: true, Errormsg: 'Please Select Brand Reminder' })
                //     return null
                // }
            }



        }


if(Object.keys(this.state.SelectedSampledic).length>0){
    //alert('okoko')
        Object.keys(this.state.SelectedSampledic).map((lo) => {

          console.log(this.state.SelectedSampledic[lo]["type"],'8980')
            if (this.state.SelectedSampledic[lo]["type"] == "gift") {
            giftcount=giftcount+1
           // alert('okok')
            }
        })
    }

        if(giftcount==0){


            if (this.state.Mandatory["GiftMan"] != 0   ) {
            if (this.state.nogift==false) {
                this.setState({ Error: true, Errormsg: 'Please Select Brand Reminder...' })
                return null
            }
        }
        }

        // if (this.state.Mandatory["GiftMan"] != 0   ) {
            
           
        //     if ( giftcount != 0) {

               
        //             this.setState({ Error: true, Errormsg: 'Please Select Brand Reminder..' })
        //             return null
                
               
        //     }
           
          
        // }
        
        if (this.state.Mandatory["NoteMan"] != 0) {
            if (this.state.notetxt.length == 0) {
                this.setState({ Error: true, Errormsg: 'Please Enter Note' })
                return null
            }
        }

        let workstr = ''
        if( typeof this.state.workwithstr!="string"){
        Object.keys(this.state.workwithstr).map((d) => {
            workstr = workstr + d + ','
        })
    }else{

        workstr=this.state.workwithstr+ ','

    }
        let product = ''
        Object.keys(this.state.Selectedproductdic).map((key) => {
            // procduct[item.c_item_code] = {  "Type":  name,"qty":item["textval"] }
            if (this.state.Selectedproductdic[key]["Type"] == 'NONE') {

                if (this.props.Mandatory["doctorrol"] == "1") {
                    var msg = "Doctor Roll Not Selected For  " + this.state.Selectedproductdic[key]["disname"] + '(' + key + ')'
                    this.setState({ Error: true, Errormsg: msg })
                    Errorstate = true
                } else {
                    product = product + key + '~' + '0' + '~' + '0' + '#'
                }
            } else {
                if (this.state.Selectedproductdic[key]["textval"] == undefined) {
                    product = product + key + '~' + this.state.Selectedproductdic[key]["Type"] + '~' + 0 + '#'
                } else {
                    product = product + key + '~' + this.state.Selectedproductdic[key]["Type"] + '~' + this.state.Selectedproductdic[key]["textval"] + '#'
                }
            }
        })
        if (Errorstate == true) {
            return null
        }
        let samplestr = ''
        // if (this.state.Selectedproductdic[Object.keys(this.state.Selectedproductdic)[0]]) {
        //     product =   Object.keys(this.state.Selectedproductdic)[0]
        // } else {
        //     product = ''
        // }
        Object.keys(this.state.SelectedSampledic).map((Samplekey) => {
            samplestr = samplestr + Samplekey + '~' + this.state.SelectedSampledic[Samplekey]["qty"] + '#'
        })
        let popdeatis = ''
        let lamsam = 0
        Object.keys(this.state.Selectedpop).map((k) => {
            popdeatis = popdeatis + k + '~' + this.state.Selectedpop[k]["name"] + '~' + this.state.Selectedpop[k]["rate"] + '#'
            //lamsam=lamsam +  this.state.Selectedpop[k]["rate"] 
        })
        // console.log(product,'pro')
        // console.log(workstr,'worlwith')
        //console.log(lamsam,'lamsame',)
        if(this.state.staylocation == ""){
            this.setState({ Error: true, Errormsg: 'Please Select Stay At' })
            return null
        }
        this.setState({ loader: true })
        let sample = ''
        let sampleqty = ''

        if (!this.state.Editmode) {
            var savevariable = {

                "save": "Main",
                "date_report": this.props.Executedate,
                "dsc_code": this.state.loadself["DoctorCode"],
                "pob": popdeatis,
                "Poblamsam": this.state.poptxt == '' ? lamsam == 0 ? '' : lamsam : this.state.poptxt,
                "worked_with": this.state.selfworkcomponetstate == '0' ? workstr : '',
                "work_type": this.state.WorkType,
                "reson": "", // NOT KNOW  WHAT TO PASS 
                "discussion": this.state.notetxt,
                "remark": "", // still not get what to PASS
                "product": product,
                "sample": samplestr,
                "n_flag": this.state.loadself["Type"] == "mcr" ? '1' : '0',
                "Mor_evn": this.state.morningcomponetstatus,
                "SelfWork": this.state.selfworkcomponetstate,
                "RCPA": RCPALIST,
                "Outstanding": this.state.Outstanding,
                "Closingvalue": this.state.Closingvalue,
                "Sales": this.state.Sales,
                "ba": String(this.state.nosample ? '0' : '1') + String(this.state.nogift ? '0' : '1'),
                "stayat":staylocation
            }
            this.setState({ loader: true })
            postToServer("DWRSave", savevariable).then((result) => {
                if (result.data[0]["result"]) {
                    const dcr = result.data[0]["dcrno"]

                    if (dcr == "0") {
                        this.setState({ loader: false, Error: true, Errormsg: result.data[0]["result"] })
                    } else {
                        const result1 = result.data[0]["result"]
                        let mscrpop = []
                        if (result.data[0]["MCRpopup"]) {
                            mscrpop = result.data[0]["MCRpopup"]
                        }
                        this.setState({ loader: false, dcrmsg: result1, dcrNo: dcr, saveDcrstatus: true, mcrpopcontain: mscrpop })

                    }
                } else {
                    const dcr = result.data[0]["n_Srno"]

                    if (dcr == "0") {
                        this.setState({ loader: false, Error: true, Errormsg: result.data[0]["result"] })
                    } else {
                        this.setState({ loader: false, dcrNo: dcr, saveDcrstatus: true })
                    }
                }



            }).catch((Error) => {
                this.setState({ loader: false, Error: true, Errormsg: ' Error in  APP ' })
            })
        } else {
          
            var savevariable = {
                "dcrno": this.state.DCRNO,
                "save": "DWR_EDIT",
                "date_report": this.props.Executedate,
                "dsc_code": this.state.loadself["DoctorCode"],
                "pob": popdeatis,
                "poblamsam": this.state.poptxt == '' ? lamsam == 0 ? '' : lamsam : this.state.poptxt,
                "worked_with": this.state.selfworkcomponetstate == '0' ? workstr : '',
                "work_type": this.state.WorkType,
                "reson": "", // NOT KNOW  WHAT TO PASS 
                "discussion": this.state.notetxt,
                "remark": "", // still not get what to PASS
                "product": product,
                "sample": samplestr,
                "n_flag": this.state.loadself["Type"] == "mcr" ? '1' : '0',
                "Mor_evn": this.state.morningcomponetstatus,
                "SelfWork": this.state.selfworkcomponetstate,
                "Outstanding": this.state.Outstanding,
                "Closingvalue": this.state.Closingvalue,
                "Sales": this.state.Sales,
                "RCPA": RCPALIST,
                "ba": String(this.state.nosample ? '0' : '1') + String(this.state.nogift ? '0' : '1')

            }
            this.setState({ loader: true })
            postToServer("DWRSave", savevariable).then((result) => {
                if (result.data[0]["result"]) {
                    const dcr = result.data[0]["dcrno"]

                    if (dcr == "0") {
                        this.setState({ loader: false, Error: true, Errormsg: result.data[0]["result"] })
                    } else {
                        const result1 = result.data[0]["result"]
                        let mscrpop = []
                        if (result.data[0]["MCRpopup"]) {
                            mscrpop = result.data[0]["MCRpopup"]
                        }
                        this.setState({ loader: false, dcrmsg: result1, dcrNo: dcr, saveDcrstatus: true, mcrpopcontain: mscrpop })

                    }
                } else {
                    const dcr = result.data[0]["n_Srno"]

                    if (dcr == "0") {
                        this.setState({ loader: false, Error: true, Errormsg: result.data[0]["result"] })
                    } else {
                        this.setState({ loader: false, dcrNo: dcr, saveDcrstatus: true })
                    }
                }
            }).catch((Error) => {
                this.setState({ loader: false, Error: true, Errormsg: ' Error in  APP ' })
            })
           
        }

    }
    //hide mcr save popup
    onMCRHide() {
        this.setState({ mcrshow: false })
        sessionStorage.setItem("ActiveDCR",null)
        this.props.funActivateAcodian('')
        this.props.removeItem(this.props.dataDoc["DoctorCode"])
    }
    // to hide save dcr pop up
    onHide() {
        this.setState({ saveDcrstatus: false })
        if (this.props.dataDoc["Type"] == "mcr") {
            if (this.state.mcrpopcontain.length > 0) {
                this.setState({ mcrshow: true })
            } else {
                this.props.removeItem(this.props.dataDoc["DoctorCode"])
            }
        } else {
            this.props.removeItem(this.props.dataDoc["DoctorCode"])
        }
    }
    // to close error message 
    Errorclose() {
        this.setState({ Error: false })
    }
    /* ---------------------- COMMENT SECTION--------------------------
 *     THIS FUNCTION   CHECK Mandatory  FILED SELECTED AND VALIDATE   AND CREATE JSON 
 *     TO CALL   DCR SAVE API  
 * ------------TASK INFO--------------------------
 * 
 * ----------------------------------------------- 
 *  NOTE :-  
 * ----------------- DEVLOPER INFO---------------------------
 *  CREATED BY :-    KUNAL KUMAR 
 *  UNDER PRODUCT :- SFA360
 *  DATE:-     7-4-2019 
 * --------------------------------------------
 */
    poptTxtchange(poptxt) {
        this.setState({ Errormsg: '', poptxt: poptxt })
    }
    /* ---------------------- COMMENT SECTION--------------------------
 *     THIS FUNCTION   CHECK Mandatory  FILED SELECTED AND VALIDATE   AND CREATE JSON 
 *     TO CALL   DCR SAVE API  
 * ------------TASK INFO--------------------------
 * 
 * ----------------------------------------------- 
 *  NOTE :-  
 * ----------------- DEVLOPER INFO---------------------------
 *  CREATED BY :-    KUNAL KUMAR 
 *  UNDER PRODUCT :- SFA360
 *  DATE:-     7-4-2019 
 * --------------------------------------------
 */
    onNotechange(note) {
        this.setState({ Errormsg: '', notetxt: note })
    }
    /* ---------------------- COMMENT SECTION--------------------------
   *     THIS FUNCTION   CHECK Mandatory  FILED SELECTED AND VALIDATE   AND CREATE JSON 
   *     TO CALL   DCR SAVE API  
   * ------------TASK INFO--------------------------
   * ----------------------------------------------- 
   *  NOTE :-  
   * -------------API INFO-----------------------
   * INPUT API WILL TAKE 
   * 1. JSON OBJECTS
   * 2. SAVE DCR API FOR WORK TYPE
   * 3. TOKEN * 
   * ----------------- DEVLOPER INFO---------------------------
   *  CREATED BY :-    KUNAL KUMAR 
   *  UNDER PRODUCT :- SFA360
   *  DATE:-     7-4-2019 
   * --------------------------------------------
   */
    Selected(data) {


        this.setState({ Errormsg: '', workwithstr: data })
    }
    /* ---------------------- COMMENT SECTION--------------------------
  *     THIS FUNCTION   Take rcpa selcted from from child component
  *   
  * ------------TASK INFO--------------------------
  * ----------------------------------------------- 
  *  NOTE :-  
  * -------------API INFO-----------------------
  *   JSON formte will come like
  * 1. JSON OBJECTS  -
  * EXample [Doctor object]=[Bdand object][  selected information] 
  * ----------------- DEVLOPER INFO---------------------------
  *  CREATED BY :-    KUNAL KUMAR 
  *  UNDER PRODUCT :- SFA360
  *  DATE:-     7-4-2019 
  * --------------------------------------------
  */
    funRCPA(Data, doctorcode) {
        var Finalcompititordata = {}
        Finalcompititordata = this.state.Finalcompititordata
        Finalcompititordata[doctorcode] = Data
        this.setState({ Finalcompititordata: Finalcompititordata })
        // console.log(Finalcompititordata)
    }
    productRCPA(Data, doctorcode) {
        var FinalproductwiseRCPA = {}
        FinalproductwiseRCPA = this.state.FinalproductwiseRCPA
        FinalproductwiseRCPA[doctorcode] = Data
        this.setState({ FinalproductwiseRCPA: FinalproductwiseRCPA })
        // console.log(FinalproductwiseRCPA)
    }
    RCPASavecode() {
        var str = ''
        let count = 0
        var listResult = {}
        const product = this.state.FinalproductwiseRCPA
        const compititor = this.state.Finalcompititordata
        if (product != undefined) {

            Object.keys(product).map((key) => {

                if (compititor) {
                    // alert(Object.keys(compititor).length)
                    // debugger
                    //alert(Object.keys(compititor).length)
                    if (Object.keys(compititor).length == 0 || compititor == undefined) {
                        this.setState({ Error: true, Errormsg: 'Please Select Compititor' })
                        return ''
                    }
                }
                Object.keys(compititor[key]).map((compitior) => {
                    // brandcode~brandName~RX~QTY~VALUE~WEightage#Competitorcode~CompetitorName~RX~QTY~VALUE~WEightage#Competitorcode~CompetitorName~RX~QTY~VALUE~WEightage#$
                    const prrx = product[key][compitior]["rx"] == undefined ? '0' : product[key][compitior]["rx"]
                    const prQuantity = product[key][compitior]["Quantity"] == undefined ? '0' : product[key][compitior]["Quantity"]
                    const prValue = product[key][compitior]["Value"] == undefined ? '0' : product[key][compitior]["Value"]
                    const prWeightage = product[key][compitior]["Weightage"] == undefined ? '0' : product[key][compitior]["Weightage"]
                    str = str + compitior + '~' + 'A' + '~' + prrx + '~' + prQuantity + '~' + prValue + '~' + prWeightage + '#'
                    // console.log('-->', compitior,product[key][compitior]["rx"],product[key][compitior]["rx"],product[key][compitior]["Value"],product[key][compitior]["Quantity"] ,product[key][compitior]["Weightage"],'key')
                    Object.keys(compititor[key][compitior]).map((onecomp) => {
                        const comrx = compititor[key][compitior][onecomp]["rx"] == '' ? '0' : compititor[key][compitior][onecomp]["rx"]
                        const comQuantity = compititor[key][compitior][onecomp]["Quantity"] == '' ? '0' : compititor[key][compitior][onecomp]["Quantity"]
                        const comValue = compititor[key][compitior][onecomp]["Value"] == '' ? '0' : compititor[key][compitior][onecomp]["Value"]
                        const comWeightage = compititor[key][compitior][onecomp]["Weightage"] == '' ? '0' : compititor[key][compitior][onecomp]["Weightage"]
                        //console.log( 'compititor->>>',key,compitior, onecomp,compititor[key][compitior][onecomp]["rx"], compititor[key][compitior][onecomp]["Value"], compititor[key][compitior][onecomp]["Quantity"],compititor[key][compitior][onecomp]["Weightage"])
                        str = str + onecomp + '~' + onecomp + '~' + comrx + '~' + comQuantity + '~' + comValue + '~' + comWeightage + '#'

                        count = count + 1
                    }
                    )
                    str = str + '$'
                })
                listResult[key] = str
                str = ''
                // console.log(product[key]["rx"],product [key]["Value"],product[key]["Quantity"] ,product[key]["Weightage"] )
            })
            //console.log(listResult, 'Result')
        }


        // if(Object.keys(this.state.Finalcompititordata).length>0){
        //     if(count>0){

        //     }else{
        //         alert('yess not selected')
        //     }
        // }

        return listResult
    }
    //salescomponet function
    salesChange(event) {


        const d = new Date()
        let savehide = false

        if (Object.keys(this.props.Editmodedata).length > 0) {

            const selectDate =this.props.Entry_Date
            const selectdateformat = selectDate.getFullYear() + '-' + (selectDate.getMonth() + 1) + "-" + selectDate.getDate()
            const tdate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

            if (tdate != selectdateformat) {

                savehide=true
            }


        }


        if(savehide==true){
            this.setState({ Errormsg:'EDIT NOT Allowed ', Error:true })

                    return
                   }
        const { value } = event.target
        const re = /^\d{1,}(\.\d{0,4})?$/;
        if (value.length == 0) {
            this.setState({ Sales: '' })
        }
        if (re.test(value)) {
            if (value.length < 10) {
                this.setState({ Sales: value })
            }
        }
    }
    // Outstanding value function
    OutstandingvalueChange(event) {

        const d = new Date()
        let savehide = false

        if (Object.keys(this.props.Editmodedata).length > 0) {

            const selectDate =this.props.Entry_Date
            const selectdateformat = selectDate.getFullYear() + '-' + (selectDate.getMonth() + 1) + "-" + selectDate.getDate()
            const tdate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

            if (tdate != selectdateformat) {

                savehide=true
            }


        }


        if(savehide==true){
            this.setState({ Errormsg:'EDIT NOT Allowed ', Error:true })

                    return
                   }
        

        const { value } = event.target;
        const re = /^\d{1,}(\.\d{0,4})?$/;
        if (value.length == 0) {
            this.setState({ Outstanding: '' })
        }
        if (re.test(value)) {
            if (value.length < 10) {
                this.setState({ Outstanding: value })
            }
        }
    }
    // Closing value componet function
    ClosingvalueChange(event) {

        const d = new Date()
        let savehide = false

        if (Object.keys(this.props.Editmodedata).length > 0) {

            const selectDate =this.props.Entry_Date
            const selectdateformat = selectDate.getFullYear() + '-' + (selectDate.getMonth() + 1) + "-" + selectDate.getDate()
            const tdate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

            if (tdate != selectdateformat) {

                savehide=true
            }


        }


        if(savehide==true){
            this.setState({ Errormsg:'EDIT NOT Allowed ', Error:true })

                    return
                   }
        const { value } = event.target
        const re = /^\d{1,}(\.\d{0,4})?$/;
        if (value.length == 0) {
            this.setState({ Closingvalue: '' })
        }
        if (re.test(value)) {
            if (value.length < 10) {
                this.setState({ Closingvalue: value })
            }
        }
    }

    funRCPARemove(doctorCode, brandCode, oldData) {
        alert()
        if (doctorCode != "" && doctorCode != undefined && 
            brandCode != "" && brandCode != undefined &&
            oldData != "" && oldData != undefined) {

            let Finalcompititordata = this.state.Finalcompititordata
            let newInnerData = {}
            let oldInnerData = Finalcompititordata[doctorCode][brandCode]
            Object.keys(oldInnerData).map((key) => {
                if (oldData != key) {
                    newInnerData[key] = oldInnerData[key]
                }
            })
            Finalcompititordata[doctorCode][brandCode] = newInnerData
            this.setState({ Finalcompititordata: Finalcompititordata })
        }
    }
    getStayAtLoc(location){ 
        // const d = new Date()
        // let savehide = false

        // if (Object.keys(this.props.Editmodedata).length > 0) {

        //     const selectDate =this.props.Entry_Date
        //     const selectdateformat = selectDate.getFullYear() + '-' + (selectDate.getMonth() + 1) + "-" + selectDate.getDate()
        //     const tdate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

        //     if (tdate != selectdateformat) {

        //         savehide=true
        //     }


        // }


        // if(savehide==true){
        //     this.setState({ Errormsg:'EDIT NOT Allowed 1137', Error:true })

        //             return
        //            }
        this.setState({
            stayLocation:location
        })
    }
    render() {
        const d = new Date()
        let savehide = false

        if (Object.keys(this.props.Editmodedata).length > 0) {

            const selectDate =this.props.Entry_Date
            const selectdateformat = selectDate.getFullYear() + '-' + (selectDate.getMonth() + 1) + "-" + selectDate.getDate()
            const tdate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

            // if (tdate != selectdateformat )  {

            //     savehide=true
            // }
            if(this.props.Editmodedata["EditDCR"]){
                if(this.props.Editmodedata["EditDCR"][0]){
                    if(this.props.Editmodedata["EditDCR"][0]["Edit"]){
                    
                //alert(this.props.Editmodedata["EditDCR"][0]["Edit"])

                if(this.props.Editmodedata["EditDCR"][0]["Edit"]=="yes"){
                    savehide=false
                }else{
                    savehide=true
                }
                    }   
                
                } 
            }


        }

        let dataDoc = {}

        if (this.state.loadself == undefined) {
            return null
        }
        dataDoc = this.state.loadself

        if (!dataDoc)
            return null
        const { datakey, tableData } = this.state
        const accordianItems = Object.keys(tableData).reduce((p, n, i) => {
            if (typeof (tableData[n]) === "string") {
                const name = n.split('$')[1]
                p.push(
                    <Card key={name}>
                        <Accordion.Toggle as={Card.Header} eventKey={name}>
                            {name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={name}>
                            <Card.Body>
                                <AddRow Editmodedata={this.props.Editmodedata} configurationData={this.props.configurationData} productRCPA={this.productRCPA}  productRCPARemove={this.productRCPARemove} funRCPARemove={this.funRCPARemove} funRCPA={this.funRCPA} name={name} data={n.split('$')[2]} />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                )
            }
            return p
        }, [])
        /*const accordianItems = Object.keys(tableData).reduce((p, n, i) => {
           if (typeof(tableData[n]) === "string") {
               const name = n.split('$')[1];
               p.push(
                      
                   <AccordionItem key={"item" + name} title={ name}  >
                       <AddRow />
                     </AccordionItem>
                   
                   )
           }
           return p
       }, [])*/
        if (!datakey)
            return null
        return (
            <div   onMouseEnter={this.handleHoverOn} onMouseLeave={this.handleHoverOff}   className="DcrDropdown ">
                <div className="mcrFlex">
                    <div className="timeSec">
                        <div className="timeIcon"><img src="../public/assets/images/time.svg" /></div>
                        <div className="currtime">{this.state.time}</div>
                        <div className="currtimeslot">{tick()}</div>
                    </div>
                    {
                        dataDoc["Type"] == "mcr" ? <MCRWorkingWithComp   result={this.state.selfworkcomponetstate} Editmodedata={this.props.Editmodedata} id={dataDoc["Dr_Name"]} selfworkcomponetfun={this.selfworkcomponetfun} /> : ''
                    }
                    <MCRTimeComp dsccode={dataDoc["DoctorCode"]} Editmodedata={this.props.Editmodedata} Morningfun={this.Morningfun} />
                </div>
                {this.state.Errormsg != '' ?
                    <Alert variant="danger"  >
                        {this.state.Errormsg}
                        {/* <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
    like. */}
                    </Alert> : ''}
                <div className="pad22">
                    <Row key={"row" + dataDoc["DoctorCode"]} >
                        {datakey.map((item, index) => {
                            
                            if (item.c_name == "Product Detailing & Doctor Role") {
                                if (item.n_visible == 1) {
                                    return <Col key={dataDoc["DoctorCode"]} lg={6} md={12} sm={12} xs={12} className="product singledropdown" >
                                        <Form.Label className="customized-label">Product Detailing & Doctor Role {this.state.Mandatory["PdtMan"] == "1" ? <span className="colorRed">*</span> : ''} </Form.Label>
                                        <ProductDeatilDropdown  notallowed={savehide} loadself={this.state.loadself} Mandatory={this.props.Mandatory["product"]} Selectdate={this.props.Selectdate} clearAll={this.state.clearAll} Editmodedata={this.props.Editmodedata} eventKey={this.props.eventKey} getSelectProduct={this.Selectedproduct.bind(this)} docode={dataDoc["DoctorCode"]} id={"Product" + dataDoc["DoctorCode"]} />
                                    </Col>
                                }
                            }
                            if (item.c_name.includes("Samples & pramotions")) {
                                if (item.n_visible == 1) {
                                    return <Col key={"col-sample" + dataDoc["DoctorCode"]} lg={6} md={12} sm={12} xs={12} className="product singledropdown">
                                        <div className="flexDisplay">
                                            <div className="paddRight5">
                                                <Form.Label className="customized-label">Samples & promotions   {this.state.Mandatory["SampleMan"] == "1" || this.state.Mandatory["GiftMan"] == "1" ? <span className="colorRed">*</span> : ''} </Form.Label>
                                            </div>
                                            {/* <div>
                                                <Form.Check
                                                    custom
                                                    type="checkbox"
                                                    id="checkbox2"
                                                    label=""
                                                    className="column-label padd1"
                                                />
                                            </div> */}
                                        </div>
                                        <SamplePramotionDropdown  notallowed={savehide} loadsample={this.state.loadsample} dcrtype={dataDoc["Type"]}  loadself={this.state.loadself} Mandatory={this.state.Mandatory} Selectdate={this.props.Selectdate} Editmodedata={this.props.Editmodedata} clearAll={this.state.clearAll} eventKey={this.props.eventKey} id={"sample-" + dataDoc["DoctorCode"]} key={"sample-pramotions" + dataDoc["DoctorCode"]} dsccode={dataDoc["DoctorCode"]} SelectedSample={this.SelectedSample} />
                                    </Col>
                                }
                            }
                            if (item.c_name == "POB (item wise)") {
                                if (item.n_visible == 1) {
                                    return <Col key={item.n_priority} lg={6} md={12} sm={12} xs={12} className="product singledropdown" >
                                        {this.state.Mandatory["pop"] == "1" ? <div> <Form.Label className="customized-label">POB (Item wise)    </Form.Label>
                                            <POBDropdown notallowed={savehide}  docid={dataDoc["DoctorCode"]} Selectdate={this.props.date} Editmodedata={this.props.Editmodedata} clearAll={this.state.clearAll} eventKey={this.props.eventKey} popSelected={this.popSelected} /> </div> :
                                            <Poptxt   notallowed={savehide} dsccode={dataDoc["DoctorCode"]} Editmodedata={this.props.Editmodedata} clearAll={this.state.clearAll} popEnter={this.poptTxtchange} />
                                        }
                                    </Col>
                                }
                            }
                            if (item.c_name == "In Clinical Discussion") {
                                if (item.n_visible == 1) {
                                    return <Col key={item.n_priority} lg={6} md={12} sm={12} xs={12} className="product">
                                        <ClinicalDisscussion   notallowed={savehide} Editmodedata={this.props.Editmodedata} clearAll={this.state.clearAll} compName={dataDoc["DSCAName"]} dsccode={dataDoc["DoctorCode"]} Notechange={this.onNotechange} Mandatory={this.state.Mandatory} />
                                    </Col>
                                }
                            }
                            if (item.c_name == "Joint Working") {
                                if (item.n_visible == 1) {
                                    if (this.state.selfworkcomponetstate == '0') {
                                        return <Col key={item.n_priority} lg={6} md={12} sm={12} xs={12} className="product singledropdown">
                                            <Form.Label className="customized-label">Joint Working</Form.Label>
                                            <JointWorkingDropdown  notallowed={savehide}  type="fild" dataDoc={dataDoc} Selectdate={this.props.date} Editmodedata={this.props.Editmodedata} clearAll={this.state.clearAll} eventKey={this.props.eventKey} dsccode={dataDoc["DoctorCode"]} Selected={this.Selected} />
                                        </Col>
                                    }
                                }
                            }
                            if (item.c_name == "RCPA") {
                                return <Col lg={6} md={6} >
                                    <Form.Label className="customized-label">RCPA</Form.Label>
                                    <DoctorRCPA Selectdate={this.props.date} Editmodedata={this.props.Editmodedata} clearAll={this.state.clearAll} eventKey={this.props.eventKey} sendtable={this.sendtable} docid={dataDoc["DoctorCode"]} />
                                </Col>
                            }

                            if (item.c_name == "Sale") {
                                if (item.n_visible == 1) {
                                    return <Col key={item.n_priority} lg={6} md={12} sm={12} xs={12} className="product">
                                        <Form.Label className="customized-label">Sales</Form.Label>
                                        <Form.Control Editmodedata={this.props.Editmodedata} clearAll={this.state.clearAll} onChange={this.salesChange} value={this.state.Sales} rows="5" placeholder="Please Enter Value" />
                                    </Col>
                                }
                            }
                            if (item.c_name == "Outstanding") {
                                if (item.n_visible == 1) {
                                    return <Col key={item.n_priority} lg={6} md={12} sm={12} xs={12} className="product">
                                        <Form.Label className="customized-label">Outstanding value</Form.Label>
                                        <Form.Control Editmodedata={this.props.Editmodedata} clearAll={this.state.clearAll} onChange={this.OutstandingvalueChange} value={this.state.Outstanding} rows="5" placeholder="Please Enter  Value" />
                                    </Col>
                                }
                            }
                            if (item.c_name == "Closing value") {
                                if (item.n_visible == 1) {
                                    return <Col key={item.n_priority} lg={6} md={12} sm={12} xs={12} className="product">
                                        <Form.Label className="customized-label">Closing value</Form.Label>
                                        <Form.Control Editmodedata={this.props.Editmodedata} clearAll={this.state.clearAll} onChange={this.ClosingvalueChange} value={this.state.Closingvalue} rows="5" placeholder="Please Enter Value" />
                                    </Col>
                                }
                            }
                        })
                        }
                         {localStorage.getItem("type") == "1" ||  localStorage.getItem("type") =="2"?
                            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="pb10">
                                <Form.Label className="customized-label">Stay At<span className="colorRed">*</span></Form.Label>
                                <StayAt 
                                    // fscode={this.state.SelectedFS}
                                    docCode={this.props.dataDoc['DoctorCode']}
                                    staydata={this.state.staydata}
                                    // defaultHq = {this.state.defaultHq}
                                     getStayAtPlace={this.getStayAtLoc}
                                     stayFlag={this.state.stayFlag}
                                     stayAutoFlag= {this.props.stayAutoFlag}
                                     Editmodedata={this.props.Editmodedata}
                                     edit={this.props.edit}
                                     dcrno={this.state.DCRNO}
                                />
    
                            </Col>
                            :null
                            }
                    </Row>
                    <Row>
                    </Row>
                    <Row>
                        <Col lg={12} md={12}>
                            {(accordianItems.length > 0) &&
                                <div className="rcpaAccor">
                                    <Accordion >
                                        {accordianItems}
                                    </Accordion>
                                </div>
                            }
                        </Col>
                    </Row>
                </div>
                <Row className="marginTop21 dcrBtnPad">
                    <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.Errorclose}
                        success={false}
                    />
                    <Loader show={this.state.loader} ></Loader>
                    <MCRSave doc={dataDoc["DoctorCode"]} dcrno={this.state.dcrNo} question={this.state.mcrpopcontain} onHide={this.onMCRHide} show={this.state.mcrshow} />
                    <DCRSave onHide={this.onHide} dcrNo={this.state.dcrNo} dcrmsg={this.state.dcrmsg} show={this.state.saveDcrstatus} />
                    {savehide == false ? <Col lg={6} md={12} sm={12} xs={12} className="product">
                        <button className="savedcrBtn  mb-2" onClick={()=>this.showSuccessPopup(this.state.stayLocation)}>Save DWR</button>
                        <button onClick={this.reset} className="danger danger-outline mr-2 mb-2 padleft" >Reset</button>
                    </Col> : null}
                </Row>

                <ConfirmationBox 
                show={this.state.Wshow}
                onClose={this.Wclose}
                msg={this.state.WMsg}
                btnResponse={this.getBtnResponse}
            /> 
            </div>
        );
    }
}
const mapStateToProps =(state)=>({
    apiResultState:state.MRDashboard.apiresult,
})

const mapDispatchToProps = (dispatch) =>({
    setApiCallStatus:data => dispatch(setApiCallStatus(data)),
})


export default  connect(mapStateToProps,mapDispatchToProps)(DoctorDetailDCR)
