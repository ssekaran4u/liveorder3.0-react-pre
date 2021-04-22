/*
* This code will display the components for selected worktype 
* Request URL=url/GroupActivity
* Index=WorkType
* Request string={"Token":"","Index":"WorkType","Data":{"Tab":"2"}}
* Response string={
   code:0000003
   name:Campaign
}
*Response Error=null

*/

import React,{Component} from 'react'
import {Row,Col,Form,Tabs,Tab,InputGroup,Dropdown} from 'react-bootstrap'
import {tick} from '../../lib/comm-utils'
import DCRNote from '../components/DCRNote'
import { postToServer } from '../../lib/comm-utils'
import StayAtComp from '../components/StayAtComp'
import VillageComponent from '../components/VillageComponent'
import CampTypeComponent from '../components/CampType'
import CampTopic  from '../components/CampTopic'
import CampDoctor from '../components/CampDoctor'
import DatePicker from 'react-datepicker'
import StatusPopup from '../../lib/StatusPopup'
import DCRSave from '../popups/DcrCreatedPopup'
import Alert from 'react-bootstrap/Alert'
import { withRouter } from "react-router";
import VillageCheckbox from '../components/VillageCheckbox'
import SearchInput from '../components/SearchInput'
import { object } from 'prop-types'
import StayAt from '../components/StayAt'

 //const re = /^[0-9\b]+$/;
  const re = /^[0-9]*$/;
class GroupActivity extends Component{
    constructor(props){
        super(props)
        this.state={
            time:new Date().getHours()+":"+String(new Date().getMinutes()).padStart(2, "0"),
            key: 'CAMPAIGN',
            c_CTopic_Code:'',
            Worktype: [],
            campTopic:'',
            campType:'',
            village:'',
            opinion:'',
            qualification:'',
            attendeness:'',
            footfall:'',
            noCard:'',
            Grouptype:[],
            n_CType_Code:'',
//            time: new Date().getHours() + ":" + new Date().getMinutes(),
            date: new Date(),
            Error:false,
            saveDcrstatus:false,
            docCode:'',
            Errormsg:'',
            AllowDCRError:false,
            villageValue:'',
            villagedata:[],
            selectedData: {},
            filterdata:[],
            JoinWorkSelected:{},
            selectstayAt:'',
            palce:'',
            hidebtn:false,
            doctor:[],
            DCRNO:'',
            StayAtLocation:'',
            DCRNO:'',
            stayAutoFlag:''
        }
        this.getGroupActivity = this.getGroupActivity.bind(this)
        this.getVillage = this.getVillage.bind(this)
        this.getNoOfCards=this.getNoOfCards.bind(this)
        this.saveGroupActivity = this.saveGroupActivity.bind(this)
        this.dateChanged = this.dateChanged.bind(this)
        this.Errorclose = this.Errorclose.bind(this)
        this.onHide = this.onHide.bind(this)
        this.getDocCode = this.getDocCode.bind(this)
        this.update = this.update.bind(this)
      this.getData =  this.getData.bind(this)
      this.reset=this.reset.bind(this)
      this.funstayatkselected = this.funstayatkselected.bind(this)
      this.LoadVillage-this.LoadVillage.bind(this)
      this.getStayLocation = this.getStayLocation.bind(this)
      this.getStayAtLoc = this.getStayAtLoc.bind(this)
    }

    // to clear all componet state
    reset(){
        this.setState({clearAll:!this.state.clearAll  ,
            campTopic:'',
            campType:'',
            village:'',
            opinion:'',
            qualification:'',
            attendeness:'',
            footfall:'',
            noCard:'',
            Error:false,
            saveDcrstatus:false,
            docCode:'',
            Errormsg:'',
            palce:'',
            villageValue:'',})
    }
    


    LoadVillage(){
     
        var data={
          
            "Index":"Village",
            "sub":this.state.selectstayAt
        }
        postToServer("GroupActivity",data).then( (Result)=>{
        if(Result.data.Status == 'Success')
            this.setState({ villagedata: Result.data.data })
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At Group Activity API " })
         }  )
    }



    componentDidUpdate(oldprops,newstate){


        if(newstate.selectstayAt != this.state.selectstayAt){
            this.LoadVillage();
        }
        if(oldprops.Editmodedata!=this.props.Editmodedata){
          
      
            if(this.props.Editmodedata)
            {
           
                if( this.props.Editmodedata['DWR']){
                   
                    let m={}
                    if(this.props.Editmodedata['DWR'][0]){
                    if(this.props.Editmodedata['DWR'][0]["c_WrkType"]){
                    const key=this.props.Editmodedata['DWR'][0]["c_name"].trim()
                    let tempdate =  this.props.Editmodedata["DWR"][0]["D_Date"].split('/')
                    var d =new Date(tempdate[2], tempdate[0]-1, tempdate[1])
                    this.setState({ key: key,date :d })
    

                 
                    if(this.props.Editmodedata['Group_Details']){
                        if(this.props.Editmodedata['Group_Details'][0]){
                       const c_CTopic_Code=this.props.Editmodedata['Group_Details'][0]["c_CTopic_Code"]
                       const  c_Footfalls=this.props.Editmodedata['Group_Details'][0]["c_Footfalls"]
                       const c_KOL_Details=this.props.Editmodedata['Group_Details'][0]["c_KOL_Details"]
                       const c_Qualification=this.props.Editmodedata['Group_Details'][0]["c_Qualification"]
                       const c_VillageName=this.props.Editmodedata['Group_Details'][0]["c_VillageName"]
                       const n_CType_Code=this.props.Editmodedata['Group_Details'][0]["n_CType_Code"]
                       const n_Footfalls=this.props.Editmodedata['Group_Details'][0]["n_Footfalls"]
                       const n_NumPatients=this.props.Editmodedata['Group_Details'][0]["n_NumPatients"]
                       const n_noofcards=this.props.Editmodedata['Group_Details'][0]["n_noofcards"]

                    
                        this.setState({
                            opinion:c_KOL_Details,
                            qualification:c_Qualification,
                            attendeness:n_NumPatients,
                            footfall:n_Footfalls,
                            noCard:n_noofcards,
                        })
                    }
                }
 

                    
                }
                }
            }
               
            }
        }
    }

    componentDidMount() {
        
        this.getGroupActivity();
        if(this.props.Editmodedata)
        {
        
            if( this.props.Editmodedata['DWR']){
                
                let m={}
                if(this.props.Editmodedata['DWR'][0]){
                if(this.props.Editmodedata['DWR'][0]["c_WrkType"]){
                const key=this.props.Editmodedata['DWR'][0]["c_name"].trim()

                let tempdate =  this.props.Editmodedata["DWR"][0]["D_Date"].split('/')

                var d =new Date(tempdate[2], tempdate[0]-1, tempdate[1])
                var g1 = new Date(); 

            
                if (d.getDate() != g1.getDate() || d.getMonth()!= g1.getMonth() || d.getFullYear()!= g1.getFullYear()  ){
                    this.setState({hidebtn:true})     
                }
                this.dateChanged(d)
                const dcrno=this.props.Editmodedata['DWR'][0]["N_Srno"]
                this.setState({ key: key ,DCRNO:dcrno })

                   
                    if(this.props.Editmodedata['Group_Details']){
                        if(this.props.Editmodedata['Group_Details'][0]){
                       const c_CTopic_Code=this.props.Editmodedata['Group_Details'][0]["c_CTopic_Code"]
                       const  c_Footfalls=this.props.Editmodedata['Group_Details'][0]["c_Footfalls"]
                       const c_KOL_Details=this.props.Editmodedata['Group_Details'][0]["c_KOL_Details"]
                       const c_Qualification=this.props.Editmodedata['Group_Details'][0]["c_Qualification"]
                       const c_VillageName=this.props.Editmodedata['Group_Details'][0]["c_VillageName"]
                       const n_CType_Code=this.props.Editmodedata['Group_Details'][0]["n_CType_Code"]
                       const n_Footfalls=this.props.Editmodedata['Group_Details'][0]["n_Footfalls"]
                       const n_NumPatients=this.props.Editmodedata['Group_Details'][0]["n_NumPatients"]
                       const n_noofcards=this.props.Editmodedata['Group_Details'][0]["n_noofcards"]
                       const C_Placeof_Work=this.props.Editmodedata['Group_Details'][0]["C_Placeof_Work"]
                       this.funstayatkselected(C_Placeof_Work)
                       this.setState({  palce:C_Placeof_Work, selectstayAt:C_Placeof_Work})
                       var k= c_VillageName.split(',')
                       var A=''
                       var ll={}
                    k.map( (aa)=> {
                        if(aa.trim()!=''){
                       ll[aa.trim() +'$'+aa.trim()]=aa
                        }
                    })
                   
                        this.setState({
                            campTopic:c_CTopic_Code,
                            campType:n_CType_Code,
                            c_CTopic_Code:c_CTopic_Code,
                            n_CType_Code:n_CType_Code,
                            selectedData:ll,
                            opinion:c_KOL_Details,
                            qualification:c_Qualification,
                            attendeness:n_NumPatients,
                            footfall:n_Footfalls,
                            noCard:n_noofcards,
                        })
                    }}
                
            }
            }
        }else{
            this.dateChanged(this.state.date)
        }
           
        }else{
            this.dateChanged(this.state.date)
        }
    //     this.getStayLocation()
    var stayFlags ={"Index":"StayFlags","Token":""}
    postToServer("DCRAPI", stayFlags).then((result)=> { 
     if(result){ console.log("res",result.data)
        result.data.map((item)=>{
            this.setState({
                stayFlag:item.n_stayflg,
                stayAutoFlag:item.n_stay_auto
            }) 
        })
      
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
        //   var data = {"Index":"StayedAt","Token":"token","Data":{"workwithfscode":'',"dd":day,"mm":mon,"yyyy":year}}  
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
    getStayAtLoc(location){ console.log("location",location)
        this.setState({
            StayAtLocation:location
        })
    }
    getGroupActivity() { 
        var data =  {"Token": "","Index":"WorkType","Data":{"Tab":"2"}}
        postToServer("GroupActivity", data).then((result) => {
            
            if (result.data["Status"] == "Success") {
                this.setState({ Grouptype: result.data.data })

              
            } else {

                this.setState({ Grouptype:[] })
            }


        }).catch((error) => {
            this.setState({ Grouptype:[] })
         //   console.log(error)
        
        })

    }
    
    getVillage(villagename){ 
        this.setState({
            village:villagename,
            AllowDCRError:false,
            Errormsg:false
        })
    }
    getCampType(camptype){
        this.setState({
            campType:camptype,
            AllowDCRError:false,
            Errormsg:false
        })
    }
    getCampTopic(camptopic){
        this.setState({
            campTopic:camptopic,
            AllowDCRError:false,
            Errormsg:false
        })
    }
    getOpinion(e){ 
    
        const  opinionVal = e.target.value
        if(opinionVal.length<50){
            this.setState({
                opinion:opinionVal,
                AllowDCRError:false,
                Errormsg:false
            })
        }
    }
    getQualification(e){
        const  qualVal = e.target.value
        if(qualVal.length<51){
        this.setState({
            qualification:qualVal,
            AllowDCRError:false,
            Errormsg:false
        })
    }
        
    }
    getAttendenees(e){
        const  attendVal = e.target.value
        if(attendVal.length<6){
        if (e.attendVal === '' || re.test(attendVal)) {
            this.setState({
                attendeness:attendVal,
                AllowDCRError:false,
                Errormsg:false
            })
        }
    }
    }
    getFootFall(e){
        const footfallVal = e.target.value
        if(footfallVal.length<6){
        if (e.footfallVal === '' || re.test(footfallVal)) {
            this.setState({
                footfall:footfallVal,
                AllowDCRError:false,
                Errormsg:false
            }) 
        }
    }
    }
    getNoOfCards(e){ 
       
        const cardVal = e.target.value
        if(cardVal.length<6){
        if (e.cardVal === '' || re.test(cardVal)) {
            this.setState({
                noCard:cardVal,
                AllowDCRError:false,
                Errormsg:false
            })
        }
        }
    }
    getDocCode(id){
      //  let docId = id.split('$')[2];
        this.setState({
            docCode:id
        })
    }
    getData(id, name, checked){ 
       
        
      let checkboxSelect={}
      checkboxSelect=this.state.selectedData
      checkboxSelect[id]=name
      if(checked){
      this.setState({selectedData:checkboxSelect})
      }else{
        
        checkboxSelect[id]=name
          delete  checkboxSelect[id]
          this.setState({selectedData:checkboxSelect})
      }
        // if(checked){ 
        //     selectedData[id] = name;console.log("s",selectedData[id])
        // }else if(selectedData[id] == name){ 
        //     selectedData[id] = false
        // }
        // console.log("log",selectedData)
        // this.setState({
        //     selectedData:selectedData
        // })
       // console.log(id,name,checked,this.state.selectedData,'kunal',checkboxSelect)
        
    }
    removeItem(id){
        let { selectedData } = this.state
        selectedData[id] = false
        this.setState({selectedData})
       // this.props.sendtable(selectedData)
    }
    dateChanged(d) {
       // console.log(d,'kunal sinha')
         const _this=this
        var dd = d.getMonth() + 1
       // console.log(d,d.getDate() +'-'+d.getMonth()+'-'+d.getFullYear())
        var data = {
            "Token": ""
            , "validate": "HolidayValidation"
            , "date": d.getDate() + '-' + dd + '-' + d.getFullYear()
        }
        postToServer("DCRValidation", data).then(function (result) {
            // alert(result.data.length)
            if (result.data.length != 0) {
                //alert(result.data[0]["validate"])
                 //let msg=result.data[0]["validate"]
                 const validatedate = result.data[0]["validate"]
                //this.setState({ Error: true, Errormsg:msg })


                if(result.data[0]["flag"]=="1"){
                    //  AllowDCRError
                    // not  
                      _this.setState({  Error: true, Errormsg: validatedate , AllowDCRError:false })
                  }
  
                  if(result.data[0]["flag"]=="2"){
                        _this.setState({   Error: true, Errormsg: validatedate +'DCR Not Allowed  For  This Date', AllowDCRError:true })
                    }

                    if (result.data[0]["flag"] == "14") {
                        _this.setState({ Error: true, Errormsg: validatedate + '       DCR Not Allowed  For  This Date', AllowDCRError: true })
                    }
            }
            else{//  _this.setState({ selectedData: data })
                _this.setState({ Errormsg:'', AllowDCRError:false })
            }
        }).catch( (Error)=>{

             //console.log( Error)

            _this.setState({ Error: true, Errormsg:"App Error" })
        })
        _this.setState({ date: d });
        
    }


    // componentDidCatch(error, info) {
    //     this.setState({ Error: true, Errormsg: 'Error in App' })
    //   }
    
    saveGroupActivity(){ 
    let stringval = ''
    Object.keys(this.state.selectedData).map((item)=>{
    
      stringval = stringval+ item.split('$')[0]+","
    
    })
    stringval = stringval.replace(/,\s*$/, "");
  //  let iterator = villageArray.values(); console.log("it",iterator)
    
        if(this.state.AllowDCRError==true){
            this.setState({ Error: true})
            return null
        }
        var date=this.state.date.getDate();
        var year= this.state.date.getFullYear();
        var month= this.state.date.getMonth()+1
        const selecteddate  =   year +'-'+month + '-'+date
        
       
        if (this.state.campType == '') {
            this.setState({ AllowDCRError: true, Errormsg: 'Please Select Camp Type' })
            return
        }
        if (this.state.campTopic == '') {
            this.setState({ AllowDCRError: true, Errormsg: 'Please Select Camp Topic' })
            return
        }
        if (this.state.selectstayAt == '') {
            this.setState({ AllowDCRError: true, Errormsg: 'Please Select Work Place' })
            return
        }
        if (this.state.StayAtLocation == '') {
            this.setState({ AllowDCRError: true, Errormsg: 'Please Select Stay At' })
            return
        }
      
        const data={
        "Index":"Save",
        "Data":{ 
            "Date":selecteddate,
            "DSC_Code":this.state.docCode,
            "CampType":this.state.campType,
            "work_type":this.state.Grouptype[0]["code"],
            "CampTopic":this.state.campTopic,
            "KOL":this.state.opinion,
            "Qualification":this.state.qualification,
            "Village":stringval,
            "Attendenees":this.state.attendeness,
            "Footfall":this.state.footfall,
            "NoOfCards":this.state.noCard,
            "WorkPlace":this.state.selectstayAt,
            "n_srno":this.state.DCRNO,
            "stayat":this.state.StayAtLocation
            }
        
        }
     
        postToServer("GroupActivity", data).then( (result)=> { 
            
            if(result.data["data"]){ 
                if(result.data["data"][0]){
                    if(result.data["data"][0]["dcrno"]){
                const dcr = result.data["data"][0]["dcrno"] ? result.data["data"][0]["dcrno"] : result.data["data"][0]["n_Srno"];
                const result1 = result.data["data"][0]["result"]
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

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )
    }
    Errorclose() {
        this.setState({ Error: false })
    }
    onHide() { 
        this.setState({ saveDcrstatus: false })
        if(this.state.dcrNo != ''){
           this.props.history.push('/dcr-list');
        }
        
        
    }
    update(dataArray){
        this.setState({
            filterdata:dataArray
        })
    }
    funstayatkselected(params) { 

  
        
        this.setState({ selectedData:{}, selectstayAt: params, AllowDCRError:false, Errormsg:false});
        var data = {"Token":"",
        "Index":"DoctorsForGroupActivity", 
        "sub":params}
//this.props.getGroupDoctors(data)
postToServer("GroupActivity",data).then( (Result)=>{ 
if(Result.data.Status == 'Success')
    this.setState({ doctor: Result.data.data })
}).catch(  (Error)=> {  
    this.setState({ Error: true, Errormsg: "Error in App At Group Activity API " })
 }  )
    }
//    resetGroupActivity(){ 
//        this.setState({
//            opinion:'',
//            qualification:'',
//            campTopic:'',
//            attendeness:'',
//            footfall:'',
//            noCard:'',
//            villageValue:'abc'
//        })
//    window.location.reload();
//    }
   
   
    render(){ 
        const { Grouptype , selectedData, filterdata} = this.state

        
        // if (!this.state.villagedata)
        //    return null
        const items = this.state.villagedata.reduce((prev, item, index) => { 
            const id =  item.Code+"$"+item.NAME
            const selection = selectedData[id] ? selectedData[id] : false
          
                prev.push(
                    <VillageCheckbox
                        key={index}
                        getData={this.getData}
                        selection={selection}
                        id={id}
                        item={item}
                    />
                )
            return prev
        }, [])
        
        const filteritems = filterdata.reduce((prev, item, index) => { 
            const id =  item.Code+"$"+item.NAME
            const selection = selectedData[id] ? selectedData[id] : false
          
                prev.push(
                    <VillageCheckbox
                        key={index}
                        getData = {this.getData}
                        selection={selection}
                        id={id}
                        item={item}
                    />
                )
            return prev
        }, [])  

        const selections = Object.keys(selectedData).reduce((p, n, i) => { 
            if (typeof(selectedData[n]) === "string") { 
                const id = n.split('$')[0]
               
                const name = n.split('$')[1]
                p.push(
                        <div key={n} className="selectedDropdown"> {name.toLowerCase()}
                            <img src="../public/assets/images/cancel.png" className="closeImg"
                                onClick={this.removeItem.bind(this, n)}/>
                        </div>
                )
            }
            return p
        }, [])
       
        return(
                <React.Fragment>
                 <div className="marginTop16 dcrworkPanel">
                    <div className="dcrboxhead">
                        Select Type Of Work Given Below
                        </div>

                    <Tabs
                        id="controlled-tab-example"
                        className="dcrWork"
                        activeKey={this.state.key}
                        onSelect={key => this.setState({ key })}
                    >

                        {   Grouptype ? Grouptype.map(  (typekey,index)=>
                         
                         
                        
                           <Tab  key={index}
                                eventKey={typekey.name}
                        title={<div><div className='otherWorkCampImg '><img src='../public/assets/images/CAMP.svg' className="campImg" /><div className='otherTypeCamp'>{typekey.name}</div></div></div>}>
                                <div className='dcr-list-sec meetingDiv'>
                                    <div className='meetingHead'>{typekey.name.toLowerCase()}</div>
                                    <div className='dcrTime'>Time</div>
                                    <div className="dcrtimeSec">
                                        <div className="timeIcon"><img src="../public/assets/images/time.svg"/></div>
                                        <div className="currtime">{this.state.time}</div>
                                        <div className="currtimeslot">{tick()}</div>
                                    </div>

                                       {this.state.Errormsg !='' ?  
                                            <Alert  variant={ this.state.AllowDCRError==true?"danger"  :"warning"  }>
                                                {this.state.AllowDCRError == true ?<img className="dcralertimg" src="../public/assets/images/danger_alert.svg" /> : <img className="waringImg" src="../public/assets/images/danger.svg" width="25px" height="25px" />}
                                                {this.state.Errormsg}
                                            </Alert> :''}
                    
                                    <div className='grpactivity margin25 paddRight100'>
                                        <Row className="marginTop41">
                                            <Col xl={4} lg={4} md={6} sm={12} xs={12} className="marginTop">
                                                <Form.Label className="customized-label">Date <span className="colorRed">*</span></Form.Label>
                                                <InputGroup className="datepickerAligment controls">
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
                                            <Col  xl={4} lg={4} md={6} sm={12} xs={12}  className="marginTop">
                                                <Form.Label className="customized-label">Work Place<span className="colorRed">*</span></Form.Label>
                                                <StayAtComp   date={this.state.date}  palce={this.state.palce} code="grpactive" clearAll={this.state.clearAll} onselect={this.funstayatkselected} />
                                            </Col>
                                            <Col xl={4} lg={4} md={6} sm={12} xs={12} className="marginTop">
                                            <Form.Label className="customized-label">Stay At<span className="colorRed">*</span></Form.Label>
                                            <StayAt 
                                                // fscode={this.state.SelectedFS}
                                                // docCode={this.props.dataDoc['DoctorCode']}
                                                staydata={this.state.staydata}
                                                // defaultHq = {this.state.defaultHq}
                                                getStayAtPlace={this.getStayAtLoc}
                                                stayFlag={this.state.stayFlag}
                                                stayAutoFlag= {this.state.stayAutoFlag}
                                                Editmodedata={this.props.Editmodedata}
                                                edit={this.props.match.params.id == undefined ? '' : 'edit'}
                                                dcrno={this.state.DCRNO}
                                            />
                                            </Col>
                                       
                                            <Col xl={4} lg={4} md={6} sm={12} xs={12} className="marginTop">
                                                <Form.Label className="customized-label">Village Name<span className="colorRed"></span></Form.Label>
                                                {/* <VillageComponent getVillageValue={this.state.villageValue} getVillage={this.getVillage} /> */}
                                                <div className="DcrDropdown ">
                                                    <div className="productDetailDrop campActive">
                                                    <Dropdown className="multiple-dropdown marginBot10">
                                                        <Dropdown.Toggle id="dropdown-basic">
                                                            <SearchInput  compVal="groupactive" data={this.state.villagedata} update={this.update} />
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <div className="Padding10 paddingTop jointData cal-scrollbar">
                                                                {filterdata == "" ?
                                                                <Form>
                                                                    {items}
                                                                </Form>:
                                                                <Form>
                                                                    {filteritems}
                                                                </Form>}
                                                                
                                                            
                                                            </div>
                                                            </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                </div>
                                                <div className="selectedDiv cal-scrollbar">
                                                    {selections}
                                                </div>
                                               
                                            </Col>
                                           
                                           
                                             <Col xl={4} lg={4} md={6} sm={12} xs={12} className="marginTop">
                                             <Form.Label className="customized-label">Camp Type<span className="colorRed">*</span></Form.Label>
                                                <CampTypeComponent  n_CType_Code={this.state.n_CType_Code} clearAll={this.state.clearAll} getCampType={this.getCampType.bind(this)} />
                                            </Col>
                                            <Col xl={4} lg={4} md={6} sm={12} xs={12} className="marginTop" >
                                             <Form.Label className="customized-label">Camp Topic<span className="colorRed">*</span></Form.Label>
                                                <CampTopic   c_CTopic_Code={this.state.c_CTopic_Code} clearAll={this.state.clearAll} getCampTopic={this.getCampTopic.bind(this)} />
                                            </Col>
                                            <Col xl={4} lg={4} md={6} sm={12} xs={12} className="marginTop">
                                                <Form.Label className="customized-label">Key Opinion Leader(KOL)</Form.Label>
                                                <Form.Control type="text" maxLength="50" onChange={this.getOpinion.bind(this)} value={this.state.opinion} className="customized-input inputBox" placeholder="Enter Here" />
                                            </Col>
                                        
                                        
                                            <Col lg={4} md={6} sm={12} xs={12} className="marginTop">
                                                <Form.Label className="customized-label">Qualification</Form.Label>
                                                <Form.Control type="text" onChange={this.getQualification.bind(this)} value={this.state.qualification} className="customized-input inputBox" placeholder="Enter Here" />
                                            </Col>
                                             <Col lg={4} md={6} sm={12} xs={12} className="marginTop">
                                                <Form.Label className="customized-label">Attendees</Form.Label>
                                                <Form.Control type="text" onChange={this.getAttendenees.bind(this)} value={this.state.attendeness} className="customized-input inputBox" placeholder="Enter Here" />
                                            </Col>
                                             <Col lg={4} md={6} sm={12} xs={12} className="marginTop" >
                                                <Form.Label className="customized-label">Footfall</Form.Label>
                                                <Form.Control type="text" onChange={this.getFootFall.bind(this)} value={this.state.footfall} className="customized-input inputBox" placeholder="Enter Here" />
                                            </Col>
                                            <Col lg={4} md={6} sm={12} xs={12} className="marginTop">
                                                <Form.Label className="customized-label">No. Of Cards</Form.Label>
                                                <Form.Control type="text" onChange={this.getNoOfCards} value={this.state.noCard} className="customized-input inputBox" placeholder="Enter Here" />
                                            </Col>
                                            <Col lg={4} md={6} sm={12} xs={12} className="marginTop">
                                                <Form.Label className="customized-label">Doctors</Form.Label>
                                                <CampDoctor   Editmodedata={this.props.Editmodedata }  clearAll={this.state.clearAll} code={typekey.code}  palce={this.state.selectstayAt} getDocCode={this.getDocCode} docdata={this.state.doctor} />
                                            </Col>
                                        </Row>
                                        {this.state.hidebtn == false ?
                                        <Row className="">
                                            <Col lg={6} md={12} sm={12} xs={12} className="product">
                                                <button className="savedcrBtn  mb-2" onClick={this.saveGroupActivity}>Save DWR</button>
                                                <button onClick={this.reset} className="danger danger-outline mr-2 mb-2 padleft" >Reset</button>
                                            </Col>

                                        </Row> :null}
                                        <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.Errorclose}
                        success={false}
                    />
                    <DCRSave onHide={this.onHide} dcrNo={this.state.dcrNo} dcrmsg={this.state.dcrmsg} show={this.state.saveDcrstatus} />
                                    </div>
                                </div>    
                            </Tab>
                            
                        ) :''}
                </Tabs>
                </div>
                
                </React.Fragment>
                )
    }
}
export default withRouter(GroupActivity)

