import React, { Component } from "react";
import { Card,Form } from 'react-bootstrap';
import DoctorsProfileTable from './doctorsProfileTable';
import { Link } from "react-router-dom";
import ProductMapping from "./productMapping";
import UnCheckData from "./unCheckData";
import {postToServer} from '../../../lib/comm-utils'
import CustomCheckbox from '../components/CustomCheckbox'
import Alert from 'react-bootstrap/Alert'
import ConfirmationBox from '../../../lib/ConfirmationBox'
import StatusPopup from '../../../lib/StatusPopup'
 import Appointment from './Appointment'
 import {withRouter} from 'react-router-dom'
 import DashLoader from "../../../lib/DashboardLoader";
import { NavLink } from "react-router-dom";

import { Row, Col, Dropdown, Navbar, Nav, NavDropdown, Modal, Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activateDashLoader:false,
            active: 1,
            isFull: false,
            showModel: false,
            showUncheckAlert: false,
            data:[],
            // slectcheck:{},
            selectedValue:[],
            doc_code:'',
            selectCheck:[],
            list:this.props.list,
            dataArr:[],
            Alert:'',
            statusModal:false,
            msg:'',
            selectedId:'',
            showProductMap:'',
            docMantory:'',
            docCount:'',
            smsg:'',
            showStatusModal:false,
            stockCount:'',
            chemCount:'',
            Assigment:false,
            proData:{},
            samData:{},
            Remark:{},
            active: true,
            
        }
        this.onTabChange = this.onTabChange.bind(this)
        this.handleView = this.handleView.bind(this)
        this.showModel = this.showModel.bind(this)
        this.onShowUncheckAlert = this.onShowUncheckAlert.bind(this)
        // this.submitPlan = this.submitPlan.bind(this)
        this.saveData = this.saveData.bind(this)
        this.Sendforaprovel=this.Sendforaprovel.bind(this)
      //  this.onAlertHide=this.onAlertHide.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.getBtnResponse = this.getBtnResponse.bind(this)
        this.showProductpoup = this.showProductpoup.bind(this)
        this.CheckSelecteddoc=this.CheckSelecteddoc.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
        this.showModel1=this.showModel1.bind(this)
        this.redirect_subordinate = this.redirect_subordinate.bind(this)
        this.getprosamData= this.getprosamData.bind(this)
        this.Remark=this.Remark.bind(this)
        this.getList= this.getList.bind(this)
    }





 getList(){
    var data = {
        "Data": {
            "month": this.props.monthCode,
            "c_day": this.props.day,
            "year": this.props.year,
            "subarea": this.props.areaCode,
            "N_Type":this.props.n_type
        },
        "index": "Mtp_dsca_type",
        "Token": ""
    }
    postToServer("MTP",data).then( (Result)=>{ 

        if(this.props.n_type=="1"){
            //let docCount=0
            // Result.data.map((a)=>{
            //     alert(a.d_date)
            //     if(a.d_date!=''){
            //         docCount=docCount+1

            //         alert('okok')
            //     }
            // }, this.setState({docCount:docCount }))


          
       
        }
     
     
            this.setState({ data: Result.data })
           
        
    }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in  API " })
    })

 }


    Remark(data){

        console.log(data,'Remark')
        this.setState({Remark:data})
    }

    showModel1(doccode,data) { 

       

          try{
        this.setState({
             doc_code:doccode,
             Assigment: !this.state.Assigment
             
         })
        }
        catch(Errp){
            console.log(Errp)
        }
         
     }

    CheckSelecteddoc(){




        let selectedVal ={}
        var data = {
            "Data": {
                "Month": this.props.monthCode,
                "day": this.props.day,
                "Year": this.props.year,
                "subarea": this.props.areaCode,
                "N_Type":this.props.n_type
            },
            "index": "MTP_Select_mtp_dsca"
           
        }
        postToServer("MTP",data).then( (Result)=>{ 
          //  if(Result.data.Status == 'Success'){ 
            
                //this.setState({ data: Result.data })
                let Selectedkey=this.state.Selectedkey
                let list =[]
                let doccount=0
                let stockcount=0
                let chemcount=0
                Result.data.map((item)=>{
                    selectedVal[item["C_Doc_Code"].trim()] = true 
                        doccount  =    parseInt( item.Dcnt)
                        chemcount  =  parseInt( item.Ccnt)
                        stockcount  =  parseInt(item.Scnt)
                       // list.push(selectedVal)
                    })
                this.setState({
                    docCount:doccount,
                    chemCount:chemcount,
                    stockCount:stockcount
                })
                this.props.getAllData(selectedVal)
          //  }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in  API " })
        })

        
        this.setState({
            selectedValue:selectedVal,
        })


       //  console.log(selectedVal,'kop')
    
    }

    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
        })
        
    }
    componentDidMount(){ 
        this.CheckSelecteddoc();
        // var data = {
        //     "Data": {
        //         "month": "3",
        //         "c_day": "23",
        //         "year": "2020",
        //         "subarea": "SA1191",
        //         "N_Type":this.props.n_type
        //     },
        //     "index": "Mtp_dsca_type",
        //     "Token": "S360DEMO|VISHWAS SHAIWALE R|PSR013|A00137|dryEuGzeNulzOBg2020-03-26T10:51:48+05:30"
        // }
      
        var data = {
            "Data": {
                "month": this.props.monthCode,
                "c_day": this.props.day,
                "year": this.props.year,
                "subarea": this.props.areaCode,
                "N_Type":this.props.n_type
            },
            "index": "Mtp_dsca_type",
            "Token": ""
        }
        postToServer("MTP",data).then( (Result)=>{ 

            if(this.props.n_type=="1"){
                //let docCount=0
                // Result.data.map((a)=>{
                //     alert(a.d_date)
                //     if(a.d_date!=''){
                //         docCount=docCount+1

                //         alert('okok')
                //     }
                // }, this.setState({docCount:docCount }))


              
           
            }
         
         
                this.setState({ data: Result.data })
               
            
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in  API " })
        })
        // this.setState({
        //     selectedValue:selectedVal,
        // })

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
            
            this.props.getMandatoryFlag(docMan)
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in  API " })
        })
    }
   

    handleView() {

       
        this.setState({
            isFull: !this.state.isFull
        });
    }

    onShowUncheckAlert(e) {
        if (e.target.checked == false) {
            this.setState({ showUncheckAlert: true })
        }
        else {
            this.setState({ showUncheckAlert: false })
        }
    }

    onTabChange(tab) {
        if (this.state.active !== tab) {
            this.setState({
                active: tab
            })
        }
    }
    showModel(doccode,data) { 
       this.setState({
            doc_code:doccode,
            showModel: !this.state.showModel,
            showProductMap:data
        })
        
    }
    handleCheckboxChange(){
        let _this1 = this
        const value = event.target.checked
        let checked = {}
        let checkedval = this.state.data
        let selectedValue = this.state.selectedValue
        if(value == true){
            checkedval.map((item)=>{ 
                checked[item.C_CUST_CODE] = true
            })
            _this1.setState({
                selectedValue:checked
            })
        }else{ 
            checkedval.map((item)=>{ 
                if(item.N_Month == "" && item.N_Year =="" && item.c_day ==""){ 
                    checked[item.C_Code] = false
                }else{
                    checked[item.C_Code] = true
                }
                
            })
            _this1.setState({
                selectedValue:checked
            })

        }
      // console.log("aaa",checked)
    }



    getData(name,checked,id){

        this.setState({ success:true })
       
        if(this.props.mtpLock == "0"   ||this.props.mtpLock == "2" ){
           
        const day=this.props.day
        const month = this.props.monthCode
        const year = this.props.year
        let k = {}
      //  k=this.state.slectcheck
        // //-year~month~days~Doctor~ntype~subarea
        let str =this.props.year+'~'+this.props.monthCode+'~'+this.props.day+'~'+id+'~'+this.props.n_type+'~'+this.props.areaCode+'~#'
        if(checked){
        
            if(this.state.docMantory == 1){
                if(this.props.n_type != 1){
                    if(this.state.docCount == "0" || this.state.docCount == undefined){
                       // delete  k[id]
                       k[id]= false
                        this.setState({
                            selectedValue:k,
                            showStatusModal:true,
                            success:false,
                            smsg:"Doctor is Mandatory"
                        })
                      
                   // }
                        // if(this.state.docCount == undefined){
                        //     this.setState({
                        //         showStatusModal:true,
                        //         success:false,
                        //         smsg:"Doctor is Mandatory"
                        //     })
                            
                        }else{

                            
                           
                            var data = {
                                "index": "MTP_Save_Without_details",
                                "Token": "",
                                "Data":{ "data":str }
                            }
                        
                            postToServer("MTP",data).then( (Result)=>{ 
                            //  if(Result.data.Status == 'Success'){ 
                               
                              
                                const st=Result.data[0]["status"]
                               
                                let selectedValue={}
                               selectedValue=this.state.selectedValue
                                if(st.trim() == '1'){
                                    const rsult=Result.data[0]["RESULT"]+' '+name
                                  selectedValue[id.trim()] = true
                                  this.setState({ 
                                    smsg:rsult,
                                    showStatusModal:!this.state.showStatusModal,
                                    success:true,selectedValue:selectedValue
                                 })
                                  
                              }else{
                                const rsult=Result.data[0]["RESULT"]
                               
                                  selectedValue[id.trim()] = null
                                 


                                  this.setState({ 
                                    smsg:rsult,
                                    showStatusModal:!this.state.showStatusModal,
                                    success:false,selectedValue:selectedValue
                                 })
                              }
                             
                               
                            }).catch(  (Error)=> {  
                            
                                this.setState({ Error: true, Errormsg: "Error in  API " })
                            })
                }
            }else{
              
                var data = {
                    "index": "MTP_Save_Without_details",
                    "Token": "",
                    "Data":{ "data":str }
                }
            
                postToServer("MTP",data).then( (Result)=>{ 
                //  if(Result.data.Status == 'Success'){ 
                   
                   
                    const st=Result.data[0]["status"]
                   let docCount=this.state.docCount
                    let selectedValue={}
                     selectedValue=this.state.selectedValue
                     if(st.trim() =="1"){
                        const rsult=Result.data[0]["RESULT"]+' '+name
                       selectedValue[id.trim()] = true
                       docCount=docCount+1

                       this.setState({ 
                        // Alert:rsult 
                        smsg:rsult,
                        docCount:docCount,
                        showStatusModal:!this.state.showStatusModal,
                        success:true,selectedValue:selectedValue
                    })
                     
                   }else{
                    const rsult=Result.data[0]["RESULT"]
                       if(selectedValue[id.trim()]){
                           delete selectedValue[id.trim()]
                           this.setState({ success:false })
                       }else{

                       }

                       this.setState({ 
                        // Alert:rsult 
                        smsg:rsult,
                        docCount:docCount,
                        showStatusModal:!this.state.showStatusModal,
                        success:false,selectedValue:selectedValue
                    })
                   }
                   
                  
                }).catch(  (Error)=> {  
                
                    this.setState({ Error: true, Errormsg: "Error in  API " })
                })
            }

            // var data = {
            //     "index": "MTP_Save_Without_details",
            //     "Token": "",
            //     "Data":{ "data":str }
            // }
            // postToServer("MTP",data).then( (Result)=>{ 
            //   //  if(Result.data.Status == 'Success'){ 
                
            //       const rsult=Result.data[0]["RESULT"]
                
            //       this.setState({ Alert:rsult })
            // }).catch(  (Error)=> {  
              
            //     this.setState({ Error: true, Errormsg: "Error in  API " })
            // })

            }else{

               //no doc
                var data = {
                    "index": "MTP_Save_Without_details",
                    "Token": "",
                    "Data":{ "data":str }
                }
                postToServer("MTP",data).then( (Result)=>{ 
                    
                  //  if(Result.data.Status == 'Success'){ 
                  
                     
                      const st=Result.data[0]["status"]
                      let selectedValue={}
                      
                    selectedValue=this.state.selectedValue
                      if(st.trim() =="1"){
                        selectedValue[id.trim()] = true
                        const rsult=Result.data[0]["RESULT"]+' '+name
                        this.setState({ 
                            //   Alert:rsult 
                            smsg:rsult,
                            showStatusModal:!this.state.showStatusModal,
                            success:true,selectedValue:selectedValue
                            })
                        
                    }else{
                        selectedValue[id.trim()] = null
                        const rsult=Result.data[0]["RESULT"]
                        this.setState({ 
                            //   Alert:rsult 
                            smsg:rsult,
                            showStatusModal:!this.state.showStatusModal,
                            success:false,selectedValue:selectedValue
                            })
                    }
                      
                      //  this.CheckSelecteddoc()
                }).catch(  (Error)=> {  
                  
                    this.setState({ Error: true, Errormsg: "Error in  API " })
                })
            }
            //MTP_Save_Without_details
            //-year~month~days~Doctor~ntype~subarea
        


        }else{
           
            this.setState({
                statusModal:!this.state.statusModal,
                msg:'You Want To Delete ?',
                selectedId:id
            })
        
    //         const day=this.props.day
    //     const month = this.props.monthCode
    //     const year = this.props.year
    //     let k = {}
    //   //  k=this.state.slectcheck
    //     // //-year~month~days~Doctor~ntype~subarea
    //     //let str =this.props.year+'~'+this.props.monthCode+'~'+this.props.day+'~'+id+'~'+this.props.n_type+'~'+this.props.areaCode+'~#'
       
         
    //         var data = {
    //             "index": "MTP_doc_delete",
    //             "Token": "",
    //             "Data":{ "Year": this.props.year,  
    //             "Month":this.props.monthCode,
    //             'day':this.props.day,
    //             'doc':id , 'subarea':this.props.areaCode  ,'n_type':this.props.n_type   }
    //         }
    //         postToServer("MTP",data).then( (Result)=>{ 
    //           //  if(Result.data.Status == 'Success'){ 
                
    //               const rsult=Result.data[0]["RESULT"]
                  
    //               this.setState({ Alert:rsult })
    //         }).catch(  (Error)=> {  
    //             console.log(Error)
    //             this.setState({ Error: true, Errormsg: "Error in  API " })
    //         })
    //         //MTP_Save_Without_details
    //         //-year~month~days~Doctor~ntype~subarea


    //         delete k[id]
        }
        


       // console.log(k,this.state.slectcheck,'sinhaok')
        // this.setState({
        //     slectcheck:k
        // })
        }else{
            this.setState({
                showStatusModal:!this.state.showStatusModal,
                success:false,
                smsg:"MTP Already Approved"
            })
        }
    }

    Sendforaprovel(A){

    }
    hideModal(){
        this.setState({
            statusModal:!this.state.statusModal
        })
    }
    getBtnResponse(data){ 
        this.setState({
            statusModal:false
        })
        if(data == "yes"){
        const day=this.props.day
        const month = this.props.monthCode
        const year = this.props.year
        let k = {}
        k=this.state.slectcheck
        //-year~month~days~Doctor~ntype~subarea
        let str =this.props.year+'~'+this.props.monthCode+'~'+this.props.day+'~'+this.state.selectedId+'~'+this.props.n_type+'~'+this.props.areaCode+'~#'
        if(this.state.docMantory == 1){
           // if(this.props.n_type != 1){
            //if(this.state.stockCount > 0 || this.state.chemCount > 0 ){


           
            
           
              
                let docCount=0
                docCount= this.state.docCount
                if (this.props.n_type==1){
                    docCount= this.state.docCount
                    docCount=docCount-1
                    this.setState({docCount: docCount })
                }
                var data = {
                    "index": "MTP_doc_delete",
                    "Token": "",
                    "Data":{ "Year": this.props.year,  
                    "Month":this.props.monthCode,
                    'day':this.props.day,
                    'doc':this.state.selectedId , 'subarea':this.props.areaCode  ,'n_type':this.props.n_type   }
                }
                postToServer("MTP",data).then( (Result)=>{ 
                  //  if(Result.data.Status == 'Success'){ 
                    
                      const rsult=Result.data[0]["RESULT"]
                      const status=Result.data[0]["status"]

                      if(status==0){
                        this.setState({ 
                            showUncheckAlert:false,
                            smsg:rsult,
                            showStatusModal:!this.state.showStatusModal,
                            success:false
                            })
                      }else{
                        let selectedValue=this.state.selectedValue
                     
                        selectedValue[this.state.selectedId.trim()] = null
                  
                      this.setState({ 
                        //   Alert:rsult,
                        showUncheckAlert:false,
                        smsg:rsult,selectedValue:selectedValue,
                        showStatusModal:!this.state.showStatusModal,
                        success:true
                         
                        })
                    }
                }).catch(  (Error)=> {  
                    console.log(Error)
                    this.setState({ Error: true, Errormsg: "Error in  API " })
                })
            
      //  }
    }else{

     
         
            var data = {
                "index": "MTP_doc_delete",
                "Token": "",
                "Data":{ "Year": this.props.year,  
                "Month":this.props.monthCode,
                'day':this.props.day,
                'doc': this.state.selectedId , 'subarea':this.props.areaCode  ,'n_type':this.props.n_type   }
            }

            let docCount=0
            docCount= this.state.docCount
            if (this.props.n_type==1){
                docCount= this.state.docCount
                docCount=docCount-1
                this.setState({docCount: docCount })
            }
            postToServer("MTP",data).then( (Result)=>{ 
              //  if(Result.data.Status == 'Success'){ 
                
                  const rsult=Result.data[0]["RESULT"]
                  const status=Result.data[0]["status"]

                  if(status==0){
                    this.setState({ 
                        showUncheckAlert:false,
                        smsg:rsult,
                        showStatusModal:!this.state.showStatusModal,
                        success:false
                        })
                  }else{
                let  selectedValue=this.state.selectedValue
                     
                        selectedValue[this.state.selectedId.trim()] = null
                  this.setState({ 
                    showUncheckAlert:false,
                    smsg:rsult,
                    showStatusModal:!this.state.showStatusModal,
                    success:true,selectedValue:selectedValue
                    })
                }
            }).catch(  (Error)=> {  
                console.log(Error)
                this.setState({ Error: true, Errormsg: "Error in  API " })
            })
            // MTP_Save_Without_details
            // -year~month~days~Doctor~ntype~subarea


            delete this.state.slectcheck[this.state.selectedId]

            k=this.state.selectedValue
            k[this.state.selectedId] = null

           
        }
        }else{
            let k = {}
            k=this.state.selectedValue
            k[this.state.selectedId] = true
            
        }
    }
    saveData(date,fromtime,totime,productdata,sampledata,desc,doc){
       
       // let dataArr =[] // this.state.dataArr
        // dataArr.push({
        //     appointdate:date,
        //     appointFromTime:fromtime,
        //     appointToTime:totime,
        //     product:productdata,
        //     samples:sampledata,
        //     desc:desc
        // })

       let dataArr=[{
            appointdate:date,
            appointFromTime:fromtime,
            appointToTime:totime,
            product:productdata,
            samples:sampledata,
            desc:desc
        }]
        this.setState({
            dataArr:dataArr
        }, this.submitPlan('A',desc,doc,dataArr,fromtime,totime))
       
       // console.log("array",dataArr)
    }
    // save(){
       // 2020~5~15~D033431~11:45:00~1~SA2921$PVCTS320~^PLCYF199:1~#"
        //2020~5~7~D033557~00:00:00~1~SA2931$PDOLI007~^#
     //   "2020~5~7~D033423   ~11:30:00~1~SA2921$PVCTS320~^PLCYF199:1~#2020~5~7~D033423   ~11:30:00~1~SA2921$PVCTS320~PVCTS320~PTKMP101~^PLCYF199:1~PLCYF199:1~#
    //     @Data='2020~1~2~D033459~2:30~1~1SA2925$Produc~Product~Produc~^Samplecode:10~Samplecode:10~#2020~2~2~Doctor~apointmenttime~ntype~SA2925$Product~Productc~^Samplecode:10~Sample:10#' 
    // }
    submitPlan(status,desc,doc,dataArr,fromtime,totime){ 
        // if(this.state.docMantory == 1){
        //     if(this.state.docCount == "0"){
        //         this.setState({
        //             showStatusModal:!this.state.showStatusModal,
        //             success:false,
        //             smsg:"Doctor is Mandatory"
        //         })
        //     }else{

        //     }
        // }else{



            if(this.props.mtpLock == "1"){
                

        
                

            this.setState({
                showStatusModal:!this.state.showStatusModal,
                success:false,
                smsg:"MTP Already Approved"
            })

            return
        }
       
       
        let string = ''
        let appointmentToTime=totime
        let appointmentFromTime=fromtime
        let productString =''
        let sampleString =''
        let docCode=''
        docCode=doc
        dataArr.map((item)=>{ console.log("dataArr",item)
            Object.keys(item['appointdate']).map((val)=>{ 
              
                // if(item['appointFromTime'][val]){
                //     docCode = val
                //     Object.keys(item['appointFromTime'][val]).map((fromtime)=>{
                   
                //         appointmentFromTime = item['appointFromTime'][val][fromtime]
                //     })
                // }
                // if(item['appointToTime'][val]){
                //     docCode = val
                //     Object.keys(item['appointToTime'][val]).map((totime)=>{
                        
                //         appointmentToTime = item['appointToTime'][val][totime]
                //     })
                // }

                if(item['product'][val] !=undefined ){
                if(item['product'][val]){ console.log("pro",item['product'][val])
                    Object.keys(item['product'][val]).map((product)=>{
                        docCode = product
                        item['product'][val][product].map((pro)=>{
                            productString = productString+pro+'~'
                        })
                        
                    })
                }
            }

                if(item['samples'][val]!=undefined){
                if(item['samples'][val]){
                    Object.keys(item['samples'][val]).map((sample)=>{
                       // console.log("sam",sample)
                         docCode = sample
                       Object.keys(item['samples'][val][sample]).map((sam)=>{
                           //console.log("sam",sam)
                           Object.keys(item['samples'][val][sample][sam]).map((qty)=>{
                           //console.log("sam",item['samples'][val][sample][sam][qty],item['samples'][val][sample])
                            sampleString =sampleString+sam+':'+item['samples'][val][sample][sam][qty] +'~'
                           })
                       })
                        
                    })
                    //console.log("sampleString",sampleString)1:30:00 PM
                }
            }
            })
          //  console.log("docCode",docCode)

            if(productString==undefined){
                productString=''
            }

            if(sampleString==undefined){
                sampleString=''
            }
            if(appointmentFromTime==undefined){
                appointmentFromTime='00:00'
            }

            if(appointmentToTime==undefined){
                appointmentToTime='00:00'
            }
            let Remark=''
            if(desc){
                if(desc[this.props.n_type]){
                    if(desc[this.props.n_type][doc.trim()]){
                        Remark= desc[this.props.n_type][doc.trim()]
                    }
                }
            }


            if (Remark==undefined){
                Remark=''
            }
           
            string = string+this.props.year+'~'+this.props.monthCode+'~'+this.props.day+'~'+doc.trim()+'~'+appointmentFromTime+'~'+this.props.n_type+'~'+this.props.areaCode+ '~'+Remark +'~'+appointmentToTime +'$'+productString+'^'+sampleString+'#'
      
        })
        //dataArr// desc[this.props.n_type][doc.trim()],doc,



        //alert('okok')
      // console.log("docCode", string)

    //return
   
    if(this.props.mtpLock == 0   ||  this.props.mtpLock == 2   ){
        this.setState({activateDashLoader:true})
            var data = {
                "index": "MTP_Save",
                "Token": "",
                "Data":{ "data":string }
            }
            postToServer("MTP",data).then( (Result)=>{ 
            //  if(Result.data.Status == 'Success'){ 
                const rsult=Result.data[0]["RESULT"]
                const status=Result.data[0]["status"]
                this.setState({activateDashLoader:false})
                if(status=="1"){
                this.setState({ 
                    // Alert:rsult 
                    smsg:rsult,
                    showStatusModal:!this.state.showStatusModal,
                    success:true,
                  
                })
                this.getList()

            }else{

                let selectedValue=  this.state.selectedValue
                selectedValue[doc.trim()] = null
                this.setState({ 
                    // Alert:rsult 
                    smsg:rsult,
                    showStatusModal:!this.state.showStatusModal,
                    success:false,selectedValue:selectedValue
                  
                })
            }
                
            }).catch(  (Error)=> {  
                this.setState({ Error: true, Errormsg: "Error in  API " })
            })
        }else{

         
            this.setState({
                showStatusModal:!this.state.showStatusModal,
                success:false,
                smsg:"MTP Already Approved",
            })
        }
   // }
    }

    showProductpoup(){
        this.setState({

        })
    }
   
    
    getprosamData(proData,samData,doc){ 
      
      
       // let procount = Object.keys(proData).length;
        // if(procount > 0){
        //     Object.keys(proData[1]).map((item)=>{
                
        //         doc = item.trim()
        //     })
        // }else{
        //     Object.keys(samData[1]).map((item)=>{
        //         console.log("sweta",item)
               
        //         doc = item.trim()
        //     })
        // }
        
            let select ={}
            select = this.state.selectedValue
            select[doc.trim()] = true
            //console.log("sweta22",select)
            this.setState({
                selectedValue:select
            })

           
        }
    redirect_subordinate(){
        if(this.state.selectedValue.length >0 ){
            this.props.history.push('/tp-view')
        }
    }
    render() { 
       

      //  console.log(this.state.data,'kunal sinha')
        let header
        if(this.props.n_type == 1){
            if(this.props.mtpType == "manager"){
                header = [
                    { prop: 'productMapping', title: 'Action', filterable: true },
                    { prop: 'checkbox', title: '', filterable: true },
                    { prop: 'srno', title: 'Sl. No.', filterable: true },
                    { prop: 'C_CUST_CODE', title: 'Doctor Code', filterable: true },
                    { prop: 'C_NAME1', title: 'Doctor Name', sortable: true, filterable: true },
                    // { prop: 'Grad', title: 'Grad', filterable: true },
                    { prop: 'N_NOOF_VISIT', title: 'Target', filterable: true },
                    { prop: 'pland', title: 'Planned', filterable: true },
                    { prop: 'd_date', title: 'Last Visit', filterable: true },
                    // { prop: 'subordinate', title: 'Subordinate Status', filterable: true },
                    { prop: 'C_NOTE', title: 'Note', filterable: true },
                    { prop: 'nextplan', title: 'Appointment', sortable: true, filterable: true },
                    { prop: 'status', title: 'Status', sortable: true, filterable: true },
                    // { prop: 'appointment', title: 'Appointment', filterable: true },
                   
                ];
            }else{
                header = [
                    { prop: 'productMapping', title: 'Action', filterable: true },
                    { prop: 'checkbox', title: '', filterable: true },
                    { prop: 'srno', title: 'Sl. No.', filterable: true },
                    { prop: 'C_CUST_CODE', title: 'Doctor Code', filterable: true },
                    { prop: 'C_NAME1', title: 'Doctor Name', sortable: true, filterable: true },
                    // { prop: 'Grad', title: 'Grad', filterable: true },
                    { prop: 'N_NOOF_VISIT', title: 'Target', filterable: true },
                    { prop: 'pland', title: 'Planned', filterable: true },
                    { prop: 'd_date', title: 'Last Visit', filterable: true },
                    { prop: 'C_NOTE', title: 'Note', filterable: true },
                    { prop: 'nextplan', title: 'Appointment', sortable: true, filterable: true },
                    { prop: 'status', title: 'Status', sortable: true, filterable: true },
                    // { prop: 'appointment', title: 'Appointment', filterable: true },
                    
                ];
            }
            
        }
        if(this.props.n_type == 2){
            header = [
                { prop: 'productMapping', title: 'Action', filterable: true },
                { prop: 'checkbox', title: '', filterable: true },
                { prop: 'srno', title: 'Sl. No.', filterable: true },
                { prop: 'C_CUST_CODE', title: 'Stockist Code', filterable: true },
                { prop: 'C_NAME1', title: 'Stockist Name', sortable: true, filterable: true },
                { prop: 'C_NOTE', title: 'Note', filterable: true },
               
            ];
        }
        if(this.props.n_type == 3){
            header = [
                { prop: 'productMapping', title: 'Action', filterable: true },
                { prop: 'checkbox', title: '', filterable: true },
                { prop: 'srno', title: 'Sl. No.', filterable: true },
                { prop: 'C_CUST_CODE', title: 'Chemist Code', filterable: true },
                { prop: 'C_NAME1', title: 'Chemist Name', sortable: true, filterable: true },
                { prop: 'C_NOTE', title: 'Note', filterable: true },
                
            ];
        }
        if(this.props.n_type != 3   && this.props.n_type != 2 && this.props.n_type !=1  ){
            header = [
                { prop: 'checkbox', title: '', filterable: true },
                { prop: 'srno', title: 'Sl. No.', filterable: true },
                { prop: 'C_CUST_CODE', title:' Code', filterable: true },
                { prop: 'C_NAME', title: this.props.CName+' Name', sortable: true, filterable: true },
                { prop: 'C_NOTE', title: 'Note', filterable: true }
            ];
        }
       

        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };
        var checkBox = <label className="table-checkbox-label">
                            <input type="checkbox" className="table-customized-checkbox" onChange={ this.onShowUncheckAlert} />
                            <span className="table-checkbox-custom"></span>
                        </label>
       
        var headerCheckBox = <div className="weekheadCheck"><Form.Check
                                custom
                                type="checkbox"
                                id="day1"
                                label=""
                                name=""
                               
                                onChange={this.handleCheckboxChange.bind(this)}
                            /></div>

        var completedButton = <button className="completed-button">Completed</button>
        var excessButton = <button className="excess-button">Excess</button>
        var nextPlanButton = <div>
                                <button className="nextPlan-button">next plan&nbsp;&nbsp;
                                    <img src="../public/assets/images/white-play-button.svg" alt="" />
                                </button>
                            </div>
      
            this.state.data.map((item,index) => { 
                let id =  item["C_CUST_CODE"]!=undefined? item["C_CUST_CODE"].trim():item["C_CUST_CODE"]
                let selection={}
                if(this.state.selectedValue){ 
                    selection = this.state.selectedValue[id]  ?   this.state.selectedValue[id] !=null ? this.state.selectedValue[id] :null:null
                
              // console.log(this.state.selectedValue,'okok')
                
                }else{
                    selection= null
                 
                }
                //slectcheck
                item.checkbox = <CustomCheckbox
                item={item}
               
                check={this.state.checked}
                getData={this.getData.bind(this)}
                id={item.C_Doc_Code}
                slectcheck={selection}
            />
          
            item.srno = index+1
            if (item.C_NAME != " ") {
                item.C_NAME1 = <Link 
                                    to={
                                        this.props.n_type == 1 ? "/profile/"+item.C_CUST_CODE:
                                        this.props.n_type == 3 ? "/ChemistProfile/"+item.C_CUST_CODE:
                                        this.props.n_type == 2 ? "/StockiestProfile/"+item.C_CUST_CODE:null
                                        } 
                                    className="mr-module-doctor-name">
                                        {item.C_NAME}
                                </Link>
            }
            var activeText= <span className="activeTextGreen">Completed</span>
            var inactiveText= <span className="inActiveTextRed">Excess</span>
           
            if (item.target == item.planned) {
                item.nextplan =<React.Fragment><img onClick={()=> this.showModel1(item.C_CUST_CODE,'N')} src="../public/assets/images/timecal.svg" alt="" className="handCurser" /></React.Fragment>
               // item.nextplan = <div className="nextplanBtn" onClick={()=> this.showModel1(item.C_CUST_CODE,'N')}>Appointment</div>
            }
            if( item.pland > item.N_NOOF_VISIT){
                item.status=inactiveText
            }else if(item.pland == item.N_NOOF_VISIT ){
                item.status = activeText
            }
           item.subordinate = <button className="primary primary-outline1" onClick={()=>this.redirect_subordinate()}>View</button>
            if (item.action == "View") {
               item.action = <Link to="/detailedview"><React.Fragment><img src="../public/assets/images/act.svg" alt="" className="handCurser" /></React.Fragment></Link>
            }
          
            item.productMapping = <React.Fragment> 
                 <OverlayTrigger
                                    overlay={<Tooltip id="tooltip-right">Add to visit the doctor 
                                    with MR</Tooltip>}
                                    placement="right"
                                >
                                    <img src= "../../../../public/assets/images/plusicon.svg" alt="Plus" className="" />
                               </OverlayTrigger> 
                
              &nbsp;  <img src="../public/assets/images/infoblue.svg" alt="" className="handCurser" onClick={()=> this.showModel(item.C_CUST_CODE,'A')} />
                </React.Fragment>
           
        })
    
        return (

          
                this.state.activateDashLoader ==true ? <DashLoader /> : 
            <React.Fragment>
                
                <div className="docttable">
                {this.state.showModel == true && <ProductMapping
                                                    locked={this.props.mtpLock}
                                                    hideMOdal={this.showModel}  
                                                    show={this.state.showModel}
                                                    doc_code={this.state.doc_code}
                                                    ntype={this.props.n_type}
                                                    saveData={this.saveData}
                                                    year ={this.props.year}
                                                    monthCode={this.props.monthCode}
                                                    day={this.props.day}
                                                    areacode={this.props.areaCode}
                                                    showProductMap={this.state.showProductMap}
                                                    prosamData={this.getprosamData}
                                                    Remark={this.Remark}
                                                   // onHidecancel={this.hidecancelexp1}
                                                />}
                                                 
                <div   className="doctors-details ">
                    {this.state.Assigment ==true ?
                    <Appointment   
                    ntype={this.props.n_type}
                   
                    year ={this.props.year}
                    monthCode={this.props.monthCode}
                    day={this.props.day}
                    areacode={this.props.areaCode}
                     showModel1={this.showModel1} doc={this.state.doc_code}  
                     show={this.state.Assigment} ></Appointment> :null}
                    {this.state.showUncheckAlert == true && <UnCheckData show={this.state.showUncheckAlert} />}
                    <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
                        <div className="mr-module-doctor-profile-heading">
                            <div className="mr-module-doctor-profile-text">
                                Week {this.props.weekNo} -{this.props.day} {this.props.month} {this.props.year}, {this.props.area} ({this.props.type})
                            </div>
                           
                            <div className="fullScreen-image">
                                {this.state.isFull ? (
                                    <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView} />) : (
                                    <img src="../public/assets/images/fullscreen.svg" alt="" onClick={this.handleView} />)}
                            </div>
                        </div>
                        {this.state.Alert != '' ? <Alert variant="success"  >
                                                 {this.state.Alert}  
                                                  </Alert> : null}
                        <DoctorsProfileTable
                            tableHeader={header}
                            tableBody={this.state.data}
                            keyName="userTable"
                            tableClass="striped hover table-responsive"
                            rowsPerPage={this.state.data.length}
                            rowsPerPageOption={[]}
                            initialSort={{ prop: "username", isAscending: true, }}
                            labels={customLabels}
                            submitPlan={this.Sendforaprovel}

                              Year={this.props.year}
                               Month={ this.props.monthCode}
                               Day={this.props.day}
                        />
                    </div>
                </div>
                </div>
                <ConfirmationBox 
                    show={this.state.statusModal}
                    onClose={this.hideModal}
                    msg={this.state.msg}
                    btnResponse={this.getBtnResponse}
                 /> 
                <StatusPopup
                    message={this.state.smsg}
                    show={this.state.showStatusModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
                />
             </React.Fragment>
                                    
        )
    }
}

export default withRouter(UserProfile)