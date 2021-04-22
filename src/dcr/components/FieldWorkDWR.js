/*
* This code will display selected doctor and components for selected doctor
* Request URL=url/DCRValidation
* Index=HolidayValidation
* Request string={"validate":"HolidayValidation","date":"27-8-2019","Token":""}
* Response string={
    Pob:""
    Stay_AT:2
    n_DcrDrNoteMandatory:1
    n_Dcr_Product_Mandatory:0
    n_Dcr_sample_madatory:0
    n_stayflg:0
}
* Response Error=null



*Request URL=url/DCRAPI
*Index=DCRSEARCH
*Request string= {"index":"DCRSEARCH","Data":{"SearchKey":"a"},"Token":""}
*Response string={
    Area:TAMLUK
    DSCAName:DOCTOR
    DSCASubName:DHARINDA
    DoctorCode:D026247
    Dr_Name:ARUN BHUNIA
    FsCode:PSR010
    FsName:SOURINDRA KUMAR SINDA
    N_Type:1
    Type:dcr
}
*Response Error=null


*/


import React, { Component } from 'react'
import { Form, Dropdown, Row, Col, InputGroup, Button } from 'react-bootstrap'
import SearchDropdown from './SearchDropdown'
import { Accordion, Card } from 'react-bootstrap';
import DoctorDetailDCR from '../components/DoctorDetailDCR'
import { connect } from 'react-redux';
import { getserachData } from '../../actions/DCRSearch'
import DatePicker from 'react-datepicker'
// import StayAtComp from './StayAtComp'
import { tick } from '../../lib/comm-utils'
import SearchDoctor from '../components/SearchDoctor'
import StatusPopup from '../../lib/StatusPopup'
//import ChemistDetailDCR from '../components/ChemistDetailDCR'
import Alert from 'react-bootstrap/Alert'
import { postToServer } from '../../lib/comm-utils'
import { withRouter } from "react-router";
import {getPlannedTask} from "../../actions/calendar";
//import RCPAPopup from '../popups/RCPAPopup'
import ShowDeletePopup from '../popups/ShowDeletePopup'
import Designation from '../components/Designation'
import FSDropDown from '../components/FSDropDown'
//import StayAt from '../components/StayAt'
class FieldWorkDWR extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            Worktype: [],
            plannedTask:[],
            selectedName: [],
            subList: false,
            selectedData: {},
            removeData: null,
            filterdata: [],
            value: '',
            date: new Date(),
            Entry_Date: new Date(),
            time: new Date().getHours()+":"+String(new Date().getMinutes()).padStart(2, "0"),
            Errormsg: '',
            Error: false,
            SelectDate: '',
            AllowDCRError: false,
            searchkey:0,
            clearsearch:false,
            showDeletePopup:false,
            DocEdit:{},
            deleteoff:true,
            designation:'',
            SelectedDeg:'',
            SelectedFS:'',
            deleteDCR:'',
            StayAtLocation:'',
            defaultHq:'',
            stayFlag:'',
            stayAutoFlag:'',
            Activedcr:''
        }
        this.getData = this.getData.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.getserach = this.getserach.bind(this)
        this.Errorclose = this.Errorclose.bind(this)
        this.dateChanged = this.dateChanged.bind(this);
        this.getSearchData = this.getSearchData.bind(this)
        this.removeItemlocal=this.removeItemlocal.bind(this)
        this.save=this.save.bind(this)
        this.loadplantak=this.loadplantak.bind(this)
        this.deletedoc=this.deletedoc.bind(this)
        this.showPopup = this.showPopup.bind(this)
        this.closePopup = this.closePopup.bind(this)
        this.getDeg=this.getDeg.bind(this)
        this.getfsname=this.getfsname.bind(this)
        this.getStayAt = this.getStayAt.bind(this)
        this.getStayAtLoc = this.getStayAtLoc.bind(this)
        this.getStayLocation = this.getStayLocation.bind(this)
        this.funActivateAcodian=this.funActivateAcodian.bind(this)
        this.funActivateAcodian1=this.funActivateAcodian1.bind(this)
    }
    funActivateAcodian1(dcrNO){
            if(this.state.Activedcr == dcrNO){
                if(sessionStorage.getItem("ActiveDCR")=="null"){
                    sessionStorage.setItem("ActiveDCR",null)
                   }
                this.setState({Activedcr:''})
                return
                
            }
    
            this.setState({Activedcr:dcrNO})

}
    funActivateAcodian(dcrNO){
        if(this.state.Activedcr == dcrNO){
            this.setState({Activedcr:''})
            if(sessionStorage.getItem("ActiveDCR")=="null"){
                sessionStorage.setItem("ActiveDCR",null)
               }
            return
        }
            this.setState({Activedcr:dcrNO})
    }


    deletedoc(value){
        const data={"index":"DWR_DELETE","Header":{ "Dcr_no":this.state.deleteDCR,"doc":value }}
        postToServer("DCRAPI", data).then((result) => { 
        this.removeItemlocal(value)
        if(result.data["data"][0]["validate"]){
            const msgdis=result.data["data"][0]["validate"]
            this.setState( { Error: true, Errormsg:msgdis })
        }else{
            this.setState( { Error: true, Errormsg: 'DCR Deleted  For  '+ value })
        }
        
             
        }).catch( (Error)=> { 

            this.setState( { Error: true, Errormsg: 'DCR Delete not Allowed' })
          } )
     
    }
    getfsname(fscode){
        this.setState({ SelectedFS:fscode })
     }
     getStayAt(){
         
     }

     getDeg(deg){

        if(deg=="-1"){
            this.setState({SelectedDeg:'',fscode:''})
        }else{
            this.setState({SelectedDeg:deg,fscode:''})
        }
        

    }
 


    loadplantak(){
       
        if(this.props.match.params.id==undefined){
           
            if(this.state.plannedTask){
               
                if (this.state.plannedTask==undefined){
                    return
                }
    
                let k={}
                
                this.state.plannedTask.map( (l,index)=>{
    
                 var today= this.state.date
                 var current=  new Date(l["PlannedDate"])
              // if(index<6){

                var Nowdate=  new Date()
                var day2 = Nowdate.getDate()
                var year2 = Nowdate.getFullYear()
                var month2 = Nowdate.getMonth() 

                var day = today.getDate()
                var year = today.getFullYear()
                var month = today.getMonth() 

                var day1 = current.getDate()
                var year1 = current.getFullYear()
                var month1 = current.getMonth()
                
            
                if(day2==day && year2==year && month2==month ){

                 if(day==day1 && year==year1 && month==month1 ){
                    k[l["DSC Code"]]={"Area":"","DSCAName":l["DSCType"],"DSCASubName":"kkk","DoctorCode": l["DSC Code"],"Dr_Name": l["DSC Name"],"FsCode":"","FsName":"","N_Type":l["DSCType"],"Type":l["Type"]}
                // }
                }
            }
                })
                this.setState({selectedData :k })
             
                
    
                     
                   
                   
             }
        }
        }



        Deletedoc(){

        }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data)
            ////console.log("data=",nextProps.data)
            return { ...prevState, data: nextProps.data }
        if (nextProps.plannedTask != prevState.plannedTask) {
            // console.log( nextProps.plannedTask,'ddd')
               return { ...prevState, plannedTask: nextProps.plannedTask };
           }
           return prevState;
    }
    /* ----------------------  Error close--------------------------
            *   
            * ------------TASK INFO--------------------------
            *    this function close error pop
            * ----------------------------------------------- 
            *  NOTE :-  Error state false make pop off
            * 
            * 
            * 
            * ----------------- DEVLOPER INFO---------------------------
            *  CREATED BY :-    KUNAL KUMAR 
            *  UNDER PRODUCT :- SFA360
            *  DATE:-           4-7-2019 
            * --------------------------------------------
            */
    Errorclose() {
        this.setState({ Error: false })
    }
    componentDidMount() {
        
        this.intervalID = setInterval(
            () => tick(),
            1000
        );
        sessionStorage.setItem("ActiveDCR",null)
       
        var day = this.state.date.getDate()
        var year = this.state.date.getFullYear()
        var month = this.state.date.getMonth() + 1
        const selecteddate = year + '-' + month + '-' + day

        if(this.props.Editmodedata)
        {
            if(this.props.Editmodedata["DWR"]){
           
 
            }else{
                this.dateChanged(this.state.date)
            }

        }else{
            this.dateChanged(this.state.date)
        }

       // this.getStayLocation()
        var stayFlags ={"Index":"StayFlags","Token":""}
        postToServer("DCRAPI", stayFlags).then((result)=> { 
         if(result){ console.log("res",result.data)
            result.data.map((item)=>{
                this.setState({
                    stayFlag:item.n_stayflg,
                    stayAutoFlag:item.n_stay_auto
                }) 
            })
            //  this.setState({
            //      stayFlag:result.data
            //  })  
         }

 
     }).catch((Error)=> {
         this.setState({ Error: true, Errormsg: Error })
        // console.log(result)
     }  )
        
      
    }
    getStayLocation(){
        // let day = this.state.date.getDate().toString(); 

        // let month = this.state.date.getMonth().toString()
        // let mon  = month > 9 ? month : '0'+month
        // let year = this.state.date.getFullYear().toString()
        //   var data = {"Index":"StayedAt","Token":"token","Data":{"workwithfscode":this.state.SelectedFS,"dd":day,"mm":mon,"yyyy":year}}  
        //  // var data = {"index":"fs_mapped","Data":{"Division":"","Region":"","Desc": Secdata }} 
        //   postToServer("DCRAPI", data).then((result)=> { 
        //       if(result){ 
        //         result.data.map((item)=>{
        //             if(item.type != ""){ 
        //                 this.setState({
        //                     defaultHq :item.c_code
        //                 })
        //             }
        //         })
        //           this.setState({
        //               staydata:result.data
        //           })  
        //       }
  
        //   }).catch((Error)=> {
        //       this.setState({ Error: true, Errormsg: Error })
        //      // console.log(result)
        //   }  )
    }
    /* ---------------------- COMMENT SECTION--------------------------
    *   date validation  
    * ------------TASK INFO--------------------------
    *   this function  check date is valid or not 
    * ----------------------------------------------- 
    *  NOTE :-  flag validation is missed  need to add
    * ----------------- DEVLOPER INFO---------------------------
    *  CREATED BY :-    KUNAL KUMAR 
    *  UNDER PRODUCT :- SFA360
    *  DATE:-           7-3-2019 
    * --------------------------------------------
    */
    dateChanged(d) {

if(this.props.match.params.id){
    // this.loadplantak()

    //alert('kunal  sinha')
return
}
       
//         if(this.props.Editmodedata)
//         {
// if(this.props.Editmodedata["DWR"]){
//     return d
// }
//         }
        var day = d.getDate()
        var year = d.getFullYear()
        var month = d.getMonth() + 1
        const selecteddate = year + '-' + month + '-' + day
        // alert(selecteddate)
        const _this = this
        _this.setState({ date: d, SelectDate: selecteddate });
        var dd = d.getMonth() + 1
        //console.log(d,d.getDate() +'-'+d.getMonth()+'-'+d.getFullYear())
        var data = {
             "validate": "HolidayValidation"
            , "date": d.getDate() + '-' + dd + '-' + d.getFullYear()
        }
        
        postToServer("DCRValidation", data).then((result) => {
            
            if (result.data.length != 0) {  
                const validatedate = result.data[0]["validate"]
                if (result.data[0]["flag"] == "0") { 
                    //  AllowDCRError
                    // not  
                    if(!this.props.match.params.id==undefined){
                    
                        _this.setState({   selectedData: {}, Error: true, Errormsg: validatedate, AllowDCRError: false })
                
                    }else{
                        _this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: false })
                    }
               
                }


                if (result.data[0]["flag"] == "1") { 
                    //  AllowDCRError
                    // not  

                    if(!this.props.match.params.id==undefined){
                    _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate, AllowDCRError: false })
               
                    }else{
                        _this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: false })
                    }
                }
                if (result.data[0]["flag"] == "2") {

                    if(!this.props.match.params.id==undefined){
                    _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '    DCR Not Allowed  For  This Date', AllowDCRError: true })
             
                }else{
                    _this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: true })
                }
                }
                if (result.data[0]["flag"] == "14") {
                    if(!this.props.match.params.id==undefined){
                    _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '       DCR Not Allowed  For  This Date', AllowDCRError: true })
                }else{
                    _this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: true })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                }   
                }

                // if (result.data[0]["flag"] == "132") {
                //     _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '       DCR Not Allowed  For  This Date', AllowDCRError: true })
                // }
            } else                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              {//  _this.setState({ selectedData: data })

            if(!this.props.match.params.id==undefined){
                _this.setState({ Errormsg: '', AllowDCRError: false })
            }else{
                _this.setState({ Errormsg: '', AllowDCRError: false })
            }
              
            }
            this.loadplantak()
        }).catch((Error) => {
            console.log(Error, 'Error')
            _this.setState({ Error: true, Errormsg: "Error in App" })
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
       
    }
    getData(id, name, checked, type, data) {
        let { selectedData } = this.state
      
        if (checked) {
            selectedData[data["DoctorCode"]] = data
        } else {
            delete selectedData[data["DoctorCode"]]
        }
        this.setState({
            selectedData: selectedData,
            type: type
        })
    }
    removeItem(id) {
        const _this = this
        const data = this.state.selectedData
        delete data[id]
        _this.setState({ selectedData: data })


        
        if(Object.keys(data).length==0){
            
            this.props.history.push('/dcr-list');
        }
    }


    removeItemlocal(id) {

        //alert(id)

        if(sessionStorage.getItem("ActiveDCR") == id ){
            sessionStorage.setItem("ActiveDCR",null)
        }else{
            if(Object.keys(this.state.selectedData).length==1){
                sessionStorage.setItem("ActiveDCR",null)
            }
        }

        const _this = this
        const data = this.state.selectedData
        delete data[id]
        _this.setState({  clearsearch:!this.state.clearsearch , selectedData: data })

    }
    save(){
//clearsearch
this.setState({ clearsearch: !this.state.clearsearch })
    }
    getserach(val) {

        if(val.length==1){
        let data = {
         
            "index": "DCRSEARCH",
            "Data": { "SearchKey": val,"fscode":this.state.SelectedFS  == undefined ?'':this.state.SelectedFS }
        }
        const len=val.length
       
         this.setState({searchkey:len})
        
        this.props.getserachData(data)
    }else{
        if(val.length % 3==0){
            let data = {
                "index": "DCRSEARCH",
                "Data": { "SearchKey": val, "fscode":this.state.SelectedFS  == undefined ?'':this.state.SelectedFS  }
            }
            const len=val.length
           
             this.setState({searchkey:len})
            
            this.props.getserachData(data)
        }
    }
        
    }
    getSearchData(data) {
        if (this.state.AllowDCRError == true) {
            //  this.props.getserachData(null)
            this.setState({ Error: true  })
        } else {
            ////console.log(data)
            //   this.getvalue(event.target.value)
            // let searchLen = data.length;
            // if (!data == "") {
            // if (searchLen > 0) {
            this.getserach(data)
            //  }
            //}
        }
    }
     componentDidUpdate(oldprops,newstate){

        if( newstate.plannedTask != this.state.plannedTask){
            this.loadplantak()
        }
        if(oldprops.Editmodedata!=this.props.Editmodedata){
            let  dcrno=''
            let listdoc={}
            if(this.props.Editmodedata["DWR"]){
                // console.log(this.props.Editmodedata["DWR"],'dwr')
               let tempdate =  this.props.Editmodedata["DWR"][0]["D_Date"].split('/')
               let Entry_Date =  this.props.Editmodedata["DWR"][0]["Entry_Date"].split('/')
               var d =new Date(tempdate[2], tempdate[0]-1, tempdate[1]) 
               var d1 =new Date(Entry_Date[2], Entry_Date[0]-1, Entry_Date[1]) 
               var g1 = new Date(); 
              this.dateChanged(d)
              //this.loadplantak()
               //deleteoff
               dcrno = this.props.Editmodedata['DWR'][0]["N_Srno"] 
           
    this.dateChanged(d)
            
            
               if (d1.getDate() != g1.getDate() || d1.getMonth()!= g1.getMonth() || d1.getFullYear()!= g1.getFullYear()  ){
                this.setState({date :d,Entry_Date:d1 })
            }else{
                this.setState({date :d, Entry_Date:d1, deleteoff:false})
            }
              
            }
        if(this.props.Editmodedata["Dwrdetails"]){
            let k={}
            k=this.state.selectedData
            Object.keys(this.props.Editmodedata["Dwrdetails"]).map( (l)=>{
           
                listdoc[this.props.Editmodedata["Dwrdetails"][l]["C_DSC_Code"]]=dcrno
                console.log("a",listdoc)
                k[this.props.Editmodedata["Dwrdetails"][l]["C_DSC_Code"]]={"Area":"","DSCAName": this.props.Editmodedata["Dwrdetails"][l]["DSCAName"],"DSCASubName":"kkk","DoctorCode": this.props.Editmodedata["Dwrdetails"][l]["C_DSC_Code"],"Dr_Name": this.props.Editmodedata["Dwrdetails"][l]["Dr_Name"],"FsCode":"","FsName":"","N_Type":this.props.Editmodedata["Dwrdetails"][l]["n_type"],"Type":this.props.Editmodedata["Dwrdetails"][l]["n_type"]}
                console.log("b",k)
            })
            this.setState({selectedData :k,DocEdit:listdoc }
        )
           
           
 
         }
        }

      
     }
     showPopup(val,DCR){
        
        this.setState({
            showDeletePopup:!this.state.showDeletePopup,
            itemvalue:val,
            deleteDCR:DCR
        })
     }
     closePopup() {
        this.setState({
            showDeletePopup: false
        });
    }
    getStayAtLoc(location){ console.log("location",location)
        this.setState({
            StayAtLocation:location
        })
    }
    render() {
        let items
        let itemChemist
        let itemStock
        let che_count
        let stock_count
        let doc_count
        let FilterList = {}
        const { data } = this.state
     //    console.log(data,' call me')
        if (data) {
            data.map((Onedata) => {
                let list = []
                if (FilterList[Onedata["DSCAName"]]) {
                    list = FilterList[Onedata["DSCAName"]]
                    list.push(Onedata)
                    FilterList[Onedata["DSCAName"]] = list
                } else {
                    list.push(Onedata)
                    FilterList[Onedata["DSCAName"]] = list;
                }
            })
        }
        const Accordiondata = this.state.selectedData
        
      //  console.log(Accordiondata, 'Accodian')
        const selections = Object.keys(Accordiondata).reduce((p, n, i) => {
            if (Accordiondata[n]) {
                p.push(
                    <div>
                        <div key={n} className="selectedDropdown"> {this.state.selectedData[n]["Dr_Name"].toLowerCase()}
                            <img src="../public/assets/images/cancel.png" className="closeImg"
                                onClick={this.removeItemlocal.bind(this, n)} />
                        </div>
                    </div>
                )
            }
            return p
        }, [])
        const serachRes = Object.keys(Accordiondata).reduce((p, n, i) => {
            p.push(
                <span data={this.state.selectedData[n]} key={n} className="doctorName"> {this.state.selectedData[n]["Dr_Name"].toLowerCase()}  </span>
            )
            return p
        }, [])
        const accordionCards = Object.keys(Accordiondata).map((value, index) => {
            return (
                <Card key={value}>
                    <Accordion.Toggle   as={Card.Header} onClick={()=>{ this.funActivateAcodian1(value) }} eventKey={value}>
            <div className="pointer capitalizationName longtextWrap">{Accordiondata[value]["Dr_Name"].toLowerCase() + '(' + Accordiondata[value]["DSCAName"].toLowerCase() + ')'}  {this.state.DocEdit[value] ?   this.state.deleteoff ? null :  <img  onClick={()=>this.showPopup(value, this.state.DocEdit[value])}  className="deleteimagedcr pull-right" src="../public/assets/images/delete.svg"></img> : null} </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse    eventKey={  value }>
                        <Card.Body>
                            <div>
                                <DoctorDetailDCR  
                                    funActivateAcodian={this.funActivateAcodian}
                                    Entry_Date={this.state.Entry_Date}  
                                    DCREDITActive={this.props.DCREDITActive}     
                                    doccode={value} 
                                    Searchdata={Accordiondata} 
                                    Selectdate={this.state.date} 
                                    Editmodedata={ this.state.DocEdit[value]? this.props.Editmodedata :{}} 
                                    removeItem={this.removeItem} 
                                    dcrallowstatus={this.state.AllowDCRError} 
                                    eventKey={value} 
                                    Executedate={this.state.SelectDate} 
                                    Mandatory={this.props.Mandatory} 
                                    dataDoc={Accordiondata[value]} 
                                    StayAtLocation={this.state.StayAtLocation}
                                    stayAutoFlag={this.state.stayAutoFlag}
                                    edit={this.props.match.params.id == undefined ? '' : 'edit'}
                                    configurationData={this.props.configurationData}
                                        
                                    />
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        })
        
        //console.log(Accordiondata,'SINHA--->')
        return (
            <React.Fragment>
                <div className="marginTop16 dcr-list-sec">
                    <div className="dcrboxhead">
                        Search below for An activity
                        </div>
                         
                    <div className="dcrsearch">
                        <Row>
                            <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                                <Form.Label className="customized-label">Date <span className="colorRed">*</span></Form.Label>
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
                            </Col>


                            {localStorage.getItem("type") !="1" ?
                         <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                           
                            <Form.Label className="customized-label">Designation<span className="colorRed">*</span></Form.Label>
                            <Designation  getDeg={this.getDeg} data={this.state.designation} getValue={this.getdesignation} />
                        </Col> :null
                            }
                        {localStorage.getItem("type") !="1" ?
                        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Form.Label className="customized-label">Field Staff Name<span className="colorRed">*</span></Form.Label>
                            <FSDropDown data={this.state.SelectedDeg} getfsname={this.getfsname} />

                        </Col>:null
                        }
                          


{localStorage.getItem("type") ==1  ?
                            <Col xl={8} lg={8} md={8} sm={12} xs={12} className=" ">
                                <Form.Label className="customized-label">Search <span className="colorRed">*</span></Form.Label>
                                <div className="productDetailDrop">
                                <Dropdown     className="multiple-dropdown marginBot10">
                                    
                                    <Dropdown.Toggle  id="dropdown-basic">
                                        <img src="../public/assets/images/search_grey@2x.png" className="serachImg" />
                                        <SearchDoctor  clear={this.state.clearsearch} getSearchData={this.getSearchData} />
                                    </Dropdown.Toggle>

                                    {/* <SearchDropdown
                                                                                    data={array}
                                                                                    key={array["DoctorCode"]}
                                                                                    id={"SearchDropdown" + array["DoctorCode"]}
                                                                                    getData={this.getData.bind(this)}
                                                                                    selection={this.state.selectedData[array["DoctorCode"]] ? 'checked' : null}
                                                                                    id={array["DoctorCode"]}
                                                                                    item={array}
                                                                                    type={"1"}
                                                                                />  */}
                                    {data == undefined ? '' :

                                        <Dropdown.Menu toggle={true}  className="cal-scrollbar">
                                            <div className="Padding10 paddingTop searchData cal-scrollbar">
                                                {this.state.searchkey > 0   ? data.length > 0 ?
                                                    <Form>
                                                        <div>

                                                            {
                                                                Object.keys(FilterList).map((list) => {
                                                                    return <div>
                                                                        <div id={list} className='searchDiv'>{list} </div>
                                                                        {FilterList[list].map((array) => {
                                                                            return <div>
                                                                                <SearchDropdown
                                                                                    data={array}
                                                                                    key={array["DoctorCode"]}
                                                                                    id={"SearchDropdown" + array["DoctorCode"]}
                                                                                    getData={this.getData.bind(this)}
                                                                                    selection={this.state.selectedData[array["DoctorCode"]] ? 'checked' : null}
                                                                                    id={array["DoctorCode"]}
                                                                                    item={array}
                                                                                    type={"1"}
                                                                                />   </div>
                                                                        })
                                                                        }
                                                                    </div>
                                                                })
                                                            }
                                                            {/* <SearchDropdown
                                                                //data={item}
                                                                key={''}
                                                                getData={this.getData.bind(this)}
                                                              //  selection={selection}
                                                                id={''}
                                                               // item={item}
                                                                type={"1"}
                                                            /> */}
                                                        </div>
                                                    </Form> : '' : ''}
                                            </div>
                                            <Dropdown.Item eventKey={this.props.eventKey}>
                                                <button onClick={this.save} className="serachDoneBtn">DONE</button>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>}
                                </Dropdown>
                                </div>
                                <div className="selectedDiv">
                                    {selections}
                                </div>
                            </Col>
                            

:   <Col      xl={12} lg={12} md={12} sm={12} xs={8}     className="pt10">
<Form.Label className="customized-label">Search <span className="colorRed">*</span></Form.Label>
<div className="productDetailDrop">
<Dropdown toggle={true}  className="multiple-dropdown marginBot10">
    
    <Dropdown.Toggle id="dropdown-basic">
        <img src="../public/assets/images/search_grey@2x.png" className="serachImg" />
        <SearchDoctor   clear={this.state.clearsearch} getSearchData={this.getSearchData} />
    </Dropdown.Toggle>
    {data == undefined ? '' :

        <Dropdown.Menu className="cal-scrollbar">
            <div className="Padding10 paddingTop searchData cal-scrollbar">
                {this.state.searchkey > 0   ? data.length > 0 ?
                    <Form>
                        <div>

                            {
                                Object.keys(FilterList).map((list) => {
                                    return <div>
                                        <div id={list} className='searchDiv'>{list} </div>
                                        {FilterList[list].map((array) => {
                                            return <div>
                                                <SearchDropdown
                                                    data={array}
                                                    key={array["DoctorCode"]}
                                                    id={"SearchDropdown" + array["DoctorCode"]}
                                                    getData={this.getData.bind(this)}
                                                    selection={this.state.selectedData[array["DoctorCode"]] ? 'checked' : null}
                                                    id={array["DoctorCode"]}
                                                    item={array}
                                                    type={"1"}
                                                />   </div>
                                        })
                                        }
                                    </div>
                                })
                            }
                            {/* <SearchDropdown
                                //data={item}
                                key={''}
                                getData={this.getData.bind(this)}
                              //  selection={selection}
                                id={''}
                               // item={item}
                                type={"1"}
                            /> */}

                            {/* <Col xl={3} lg={3} md={3}>
                                <Form.Label className="customized-label">Stay at<span className="colorRed">*</span></Form.Label>
                                <StayAtComp />
                            </Col> */}
                        </div>
                    </Form> : '' : ''}
            </div>
            <Dropdown.Item eventKey={this.props.eventKey}>
                <button onClick={this.save} className="serachDoneBtn">DONE</button>
            </Dropdown.Item>
        </Dropdown.Menu>}
</Dropdown>
</div>
<div className="selectedDiv">
    {selections}
</div>
</Col>  }
                 


                        </Row>
                    </div>
                    <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.Errorclose}
                        success={false}
                    />
                </div>
                {this.state.Errormsg != '' ?
                    <div className="paddingTop">
                        <Alert variant={this.state.AllowDCRError == true ? "danger" : "warning"}>
                        {this.state.AllowDCRError == true ?<img className="dcralertimg" src="../public/assets/images/danger_alert.svg" /> : <img className="waringImg" src="../public/assets/images/danger.svg" width="25px" height="25px" />}
                        {this.state.Errormsg}
                       
                    </Alert>
                     {/* <Alert variant="danger">
                     <img className="dcralertimg" src="../public/assets/images/danger_alert.svg" />{this.state.Errormsg}
                   
                 </Alert> */}
                    </div> : ''}
                {Accordiondata && (Object.keys(Accordiondata).length > 0) &&
                    <div className=" marginTop21">
                        <div className="marginBottom parentAccordian">
                            <Accordion   activeKey={this.state.Activedcr} >
                                {accordionCards}
                            </Accordion>
                        </div>
                    </div>
                }
                <ShowDeletePopup show={this.state.showDeletePopup} closeModal={this.closePopup}  deletedoc={()=>this.deletedoc(this.state.itemvalue)} id={this.state.itemvalue}/>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    data: state.DCRSEARCH.data,
    plannedTask: state.Calendar.plannedTask,
})

const mapDispatchToProps = (dispatch) => ({
    getserachData: (data) => dispatch(getserachData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(FieldWorkDWR))
