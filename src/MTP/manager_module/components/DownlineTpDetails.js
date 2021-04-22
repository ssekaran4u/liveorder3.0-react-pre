import React,{Component} from 'react'
import Card from "react-bootstrap/Card";
import DownlineTPTable from "./DownlineTPTable";
import { InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import Drop from '../../../BasicComponet/DropDown'
import {postToServer} from '../../../lib/comm-utils'
import NotePopup from '../../mr_module/popups/NotePopup'
class DownlineTpDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            activeArea:'',
            showPopup:false,
            showTuePopup:false,
            showWedPopup:false,
            showThrPopup:false,
            showFriPopup:false,
            showSatPopup:false,
            showSunPopup:false,
            select_patch:'-1',
            Plan:0,
            Visit:0,
            EDIT:false,
            NOTEDIT:false,
            Reject:false,
            Actionblock:false,
            showNotePopup:false,
            Areanote:''
        }
        this.prevMonth = this.prevMonth.bind(this)
        this.nextMonth = this.nextMonth.bind(this)
        this.LoadSelectedSub = this.LoadSelectedSub.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.showTotalPopup = this.showTotalPopup.bind(this)
        this.showTotalTuePopup = this.showTotalTuePopup.bind(this)
        this.showTotalWedPopup = this.showTotalWedPopup.bind(this)
        this.showTotalThrPopup = this.showTotalThrPopup.bind(this)
        this.showTotalFriPopup = this.showTotalFriPopup.bind(this)
        this.showTotalSatPopup = this.showTotalSatPopup.bind(this)
        this.showTotalSunPopup = this.showTotalSunPopup.bind(this)
        this.ApproveMtp = this.ApproveMtp.bind(this)
        this.selectedPatch = this.selectedPatch.bind(this)
        this.loadPlan();this.loadPlan.bind(this)
        this.getSatatus=this.getSatatus.bind(this)
        this.onClose=this.onClose.bind(this)
        this.showNote=this.showNote.bind(this)
        this.Savearea=this.Savearea.bind(this)
    }

    Savearea(){

    }



    onClose(){
        this.setState({
            showNotePopup:!this.state.showNotePopup
        })
    }


    showNote(){
        this.setState({ showNotePopup:!this.state.showNotePopup })


//         let date = localStorage.getItem("day")
//         let mon = localStorage.getItem("monthCode")
//         let year = localStorage.getItem("year")
//         let day = localStorage.getItem("day")
//         let fscode = localStorage.getItem("fscode")

//         let areaCode= localStorage.getItem("areaCode")

//         var data = {"Data":{
//         "Year":year,
//         "Month":mon,
//         "day":day,
//         "subarea":areaCode,
//         "FSCode":fscode,
//         "Workwith":this.state.key
//     },

       
//         "index":"MTP_getsubnote_other","Token":"",
//         "menuid":"38"
// }  

// postToServer("MTP", data).then((result) => {

//     const kl= result.data[0]["C_Subarea_Note"]

//     //alert(kl)

//     this.setState({ Areanote:kl })
// })
    }

    nextMonth(){
        this.props.nextMonth()
    }
    prevMonth(){
        this.props.prevMonth()
    }
    LoadSelectedSub(item,datecontext){
        this.props.LoadSelectedSub(item,datecontext)
    }
    sort(name){
        this.props.sort(name)
    }
    handleSearch(){ 
        let value = event.target.value.toLowerCase()
        this.props.handleSearch(value)
    }
    showTotalPopup(){
        this.setState({
            showPopup:!this.state.showPopup
        })
    }
    showTotalThrPopup(){
        this.setState({
            showThrPopup:!this.state.showThrPopup
        })
    }
    showTotalFriPopup(){
        this.setState({
            showFriPopup:!this.state.showFriPopup
        })
    }
    showTotalSatPopup(){
        this.setState({
            showSatPopup:!this.state.showSatPopup
        })
    }
    
    showTotalSunPopup(){
        this.setState({
            showSunPopup:!this.state.showSunPopup
        })
    }
    showTotalTuePopup(){
        this.setState({
            showTuePopup:!this.state.showTuePopup
        })
    }
    showTotalWedPopup(){
        this.setState({
            showWedPopup:!this.state.showWedPopup
        })
    }
    ApproveMtp(data,month,year,fscode){
        this.props.ApproveMtp(data,localStorage.getItem("downMonth"),localStorage.getItem("downYear"),fscode)
    }
    selectedPatch(patch){
        this.props.selectedPatch(patch)
        this.setState({
            select_patch:patch
        })
    }

    componentDidUpdate(Prevprops,prevstate){
        if(this.props.load != Prevprops.load ){
          
             this.loadPlan();
             this.getSatatus()
         }
        if(this.props.delete != Prevprops.delete ){
           // alert('klkl')
            this.loadPlan();
        }
        if(this.props.SelectedMonth != Prevprops.SelectedMonth ){
            //console.log('kunal',this.props.SelectedMonth)
           this.loadPlan();
           this.getSatatus()
        }
        if(this.props.SelectedYear != Prevprops.SelectedYear ){
           // console.log('kunal',this.props.SelectedMonth)
            this.loadPlan();
            this.getSatatus()
        }
// ar data = {
//             "Data": {
//                 "Month": this.props.SelectedMonth,
//                 "Year": this.props.SelectedYear,
             
//             },
//             "index": "MTP_PLAN_VISIT"
           
//         }
//         postToServer("MTP",data).then( (Result)=>{ 


//         const Visit=Result.data["Visit"][0]["month"]
//         const plan=Result.data["plan"][0]["VISIT"]
//         // Plan:0,
//                 //  Visit:0
//         this.setState({
//             Plan:plan,
//                     Visit:Visit
//         })
//         //     console.log(Result)
//         //      alert(Visit)
//         //  alert(plan)

//         }).catch(  (Error)=> {  
//             console.log(Err,'Error')
//         })
//         }
    }



    getSatatus(){


        var data = {
            "Data": {
                "Month":localStorage.getItem("downMonth"),
                "Year": localStorage.getItem("downYear"),
                "Fscode": localStorage.getItem("downlineCode")
            },
            "index": "MTP_Status"
           
        }
        postToServer("MTP",data).then( (Result)=>{ 

           


const Visit=Result.data[0]["Lock_flag"]
const plan=Result.data[0]["c_approved"]

if(Visit=="1"  &&  plan=="A" ){
   this.setState({ EDIT:false,Actionblock:true,
    NOTEDIT:false,Reject:false })

    sessionStorage.setItem("MTP_M_Action","LOCK")
}


if(Visit=="0"  &&  plan=="s" ){
    this.setState({ EDIT:true,
     NOTEDIT:true })
     sessionStorage.setItem("MTP_M_Action","UNLOCK")
 }
 


 
 if(Visit=="0"  &&  plan=="E" ){
    this.setState({ EDIT:true,
     NOTEDIT:true,Reject:true })
     sessionStorage.setItem("MTP_M_Action","UNLOCK")
 }

 
 if(Visit==""  &&  plan=="E" ){
    this.setState({ EDIT:true,
     NOTEDIT:true ,Reject:true })
     sessionStorage.setItem("MTP_M_Action","UNLOCK")
 }


 if(Visit=="0"  &&  plan=="S" ){
    this.setState({ EDIT:true,
     NOTEDIT:true,Reject:true })
     sessionStorage.setItem("MTP_M_Action","UNLOCK")
 }


if(Visit=="0"  &&  plan=="A" ){
    this.setState({ EDIT:false,Actionblock:true,
     NOTEDIT:true,Reject:false })
     sessionStorage.setItem("MTP_M_Action","LOCK")
 }


 
if(   plan=="R" ){
    this.setState({ EDIT:false,Actionblock:true,
     NOTEDIT:false,Reject:false })
     sessionStorage.setItem("MTP_M_Action","LOCK")
 }
 

//  if( plan=="R" ){
//     this.setState({ EDIT:false,Actionblock:true,
//      NOTEDIT:true })
//      sessionStorage.setItem("MTP_M_Action","LOCK")
//  }



        }).catch(  (Error)=> {  
            console.log(Error,'Error')
        })


    }



    loadPlan(){



        this.setState({
            Plan:0,
                   Visit:0
       })
        var data = {
            "Data": {
                "Month":localStorage.getItem("downMonth"),
                "Year": localStorage.getItem("downYear"),
                "Fscode": localStorage.getItem("downlineCode")
            },
            "index": "MTP_PLAN_VISIT"
           
        }
        postToServer("MTP",data).then( (Result)=>{ 


const Visit=Result.data["Visit"][0]["month"]
const plan=Result.data["plan"][0]["VISIT"]
// Plan:0,
          //  Visit:0
this.setState({
     Plan:plan,
            Visit:Visit
})
        //     console.log(Result)
        //      alert(Visit)
        //  alert(plan)

        }).catch(  (Error)=> {  
            console.log(Error,'Error')
        })

    }

    componentDidMount(){
  this.loadPlan();
this.getSatatus()
       
    }

    render(){ 

        
        return(
            <div className="mr-calender">
                
               
                <Card className="tour-plan">
                    <div className="tour-plan-header">
                        <div className="tour-plan-heading">
                            <div className="main-text">Tour Plan for {this.props.month}, {this.props.year} of <span className="downlinenameCase">{this.props.fsname}</span> ({this.props.fsCode})</div>
                            <div className="day-status">
                                <div className="day-status-diff">
                                    <div className="day-status-image yel"></div>{this.props.weekHoliday_name }
                                </div>
                                <div className="day-status-diff">
                                    <div className="day-status-image pin"></div>Leave
                                </div>
                                <div className="day-status-diff">
                                    <div className="day-status-image gre"></div>Holiday
                                </div>
                            </div>
                        </div>
                        <div className="tour-plan-header2">
                            <div className="month-change">
                            {/* <img src="public/assets/images/Group 1490.svg" alt="" onClick={() => { this.prevMonth() }} /> */}
                         {/* <div className="month-name">{this.props.month}&nbsp;&nbsp;{this.props.year}</div> */}
                         {/* <img src="public/assets/images/Group 1491.svg" alt="" onClick={() => { this.nextMonth(); }} /> */}
                            </div>
                            <div className="btn-grp">
                                <div className="viewIcon1">
                                    {/* <div>
                                        {this.state.isFull ? (
                                            <img
                                                src="../public/assets/images/collapse-grey.svg"
                                                onClick={this.handleView}
                                            />
                                            ) : (
                                                <img
                                                    src="../public/assets/images/fullscreen.svg"
                                                    onClick={this.handleView}
                                                />
                                        )}
                                            
                                    </div> */}
                                </div>  
                               


                                {/* <div className="plan-for-meeting-btn">
                                <div className="tourP" onClick={this.showNote}> 
                                    <div style={{"font-size":"13px","padding":"6px 0px"}}>NOTE</div>
                                </div>
                                </div> */}





                                <div className="flexDisplay">
                                {this.state.NOTEDIT == false ? null : 
                                    <div className="buttons">
                                        <button 
                                            className="approval-button" 
                                            onClick={()=>this.ApproveMtp('A',this.props.dateContext.month(),this.props.dateContext.year(),this.props.fsCode)}>Approve
                                        </button>
                                    </div>
    }                {this.state.EDIT == false ? null :
                                    <div className="buttons">
                                        <button 
                                            className="approval-button" 
                                            onClick={()=>this.ApproveMtp('E',this.props.dateContext.month(),this.props.dateContext.year(),this.props.fsCode)}>Approve With Edit
                                        </button>
                                         </div>  }
                                   
                                        
                                   
                                         {this.state.Reject == false ? null :  
                                    <div className="buttons">
                                        <button 
                                            className="del-btn" 
                                            style={{backgroundColor:"#dc3545", color: "#ffffff"}} 
                                            onClick={()=>this.ApproveMtp('R',this.props.dateContext.month(),this.props.dateContext.year(),this.props.fsCode)}> Reject
                                        </button>
                                         </div> }
                                </div>
                                {/* <div className="search-field"> */}
                                    {/* <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text ><img src="public/assets/images/search_grey.png" alt="" /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="Search for Patches"
                                        />
                                    </InputGroup> */}
                                {/* </div> */}
                                 <div className="search-field desktopView">
                             <InputGroup className="mb-3">
                                 <InputGroup.Prepend>
                                     <InputGroup.Text ><img src="public/assets/images/search_grey.png" alt="" /></InputGroup.Text>
                                 </InputGroup.Prepend>
                                 <FormControl 
                                     onChange={this.handleSearch}
                                     placeholder="Search for Patches"
                                 />
                             </InputGroup>
                         </div>
                         <div className="search-field patchWidth MobileView " >
                         
                         <Drop   Type="patch"    Selected={this.state.select_patch} selectedProduct={this.selectedPatch} data={this.props.pArray} />
                     </div>
                            </div>
                        </div>
                    </div>
                    <div className="tour-plan-body">
                        <div className="tour-plan-calender">
                            <div className="patches desktopView">
                                <div className="">
                                    {/* <div className="patches-heading">Patches &nbsp;&nbsp;<img src="public/assets/images/Group 1693.svg" alt="" /></div> */}
                                    {/* <ul className="patches-list">
                                        {this.props.patches ? this.props.patches.map((item) => (
                                                <li  onClick={() => { this.LoadSelectedSub(item,this.props.dateContext) }} className={this.state.activeArea == item.Name && this.state.activeAreaType == item.Type ?"activeSubArealink areaLinks areaLink":"areaLinks areaLink"}><span>{item.Name}</span>({item.Type})</li>
                                            )): null}
                                            </ul> */}
                                              <div className="patches-heading " onClick={()=>this.sort('Name')}>Patches &nbsp;&nbsp;<img src="public/assets/images/Group 1693.svg" alt=""  /></div>
                           
                           { this.props.stpflag==false?  this.props.filteredSuggestions != "" ?
                                <ul className={this.props.dateElements.length>6?"patches-list-extra-height patches-list ":"patches-list "}>
                                   {this.props.filteredSuggestions.map((item) => (
                                       <li onClick={() => { this.LoadSelectedSub(item,this.props.dateContext) }} className={this.props.activeArea == item.Name && this.props.activeAreaType == item.Type ?"activeSubArealink areaLinks areaLink":"areaLinks areaLink"}><span>{item.Name}</span>({item.Type})</li>
                                   ))} 
                               </ul> :
                                <ul className={this.props.dateElements.length>6?"patches-list-extra-height patches-list ":"patches-list "}> 
                                   {this.props.sortpatches.length > 0 ? 
                                   this.props.sortpatches.map((item)=>(
                                       <li onClick={() => { this.LoadSelectedSub(item,this.props.dateContext) }} className={this.props.activeArea == item.Name && this.props.activeAreaType == item.Type ?"activeSubArealink areaLinks areaLink":"areaLinks areaLink"}><span>{item.Name}</span>({item.Type})</li>
                                   ))
                                   :this.props.patches ? this.props.patches.map((item) => (
                                       <li onClick={() => { this.LoadSelectedSub(item,this.props.dateContext) }} className={this.props.activeArea == item.Name && this.props.activeAreaType == item.Type ?"activeSubArealink areaLinks areaLink":"areaLinks areaLink"}><span>{item.Name}</span>({item.Type})</li>
                                   )): null}
                               </ul>
                               :null }
                                </div>
                            </div>
                            <DownlineTPTable Actionblock={this.state.Actionblock}  weekdays={this.props.weekdays} short_weekdays={ this.props.short_weekdays} dateElements={this.props.dateElements} />
                            <div className="week-details desktopView">
                                <div className="week-details-heading">Week Details</div>
                                <ul className="week-details-list">
                                    <li><div className="week-text">Week 1 ({this.props.week1count?this.props.week1count:0})</div></li>
                                    <li><div className="week-text">Week 2 ({this.props.week2count ? this.props.week2count : 0})</div></li>
                                    <li><div className="week-text">Week 3 ({this.props.week3count ? this.props.week3count :0})</div></li>
                                    <li><div className="week-text">Week 4 ({this.props.week4count?this.props.week4count:0})</div></li>
                                    <li><div className="week-text">Week 5 ({this.props.week5count?this.props.week5count:0})</div></li>
                                    {this.props.dateElements.length>6 && <li><div className="week-text">Week 6 ({this.props.week6count ? this.props.week6count :0})</div></li>}
                                </ul>
                            </div>
                        </div>
                        <div className="meetings-total">
                     <div className="meetings-total-heading desktopView"><div className="meetings-total-heading-text desktopView">Total</div></div>
                     <ul className="meetings-total-list">
                         <li>
                             <div className="meetings-total-text" onMouseOver={this.showTotalPopup} onMouseOut={this.showTotalPopup}>
                                 {this.props.moncount ? this.props.moncount: 0}
                             </div>
                             {this.props.moncount == 0 || this.props.moncount == undefined ?
                             null :
                             <div>
                             {this.state.showPopup ? <div className="totalcallpopup">
                                 <div className="totalcalltext">TOTAL CALLS</div>
                                 <div className="">
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group_1451.svg" /></div>
                                             <div className="callnos">{this.props.docMonCount? this.props.docMonCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1687.svg" /></div>
                                             <div className="callnos">{this.props.hospitalMonCount ? this.props.hospitalMonCount : 0} calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1452.svg" /></div>
                                             <div className="callnos">{this.props.stockistMonCount? this.props.stockistMonCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1453.svg" /></div>
                                             <div className="callnos">{this.props.chemistMonCount ? this.props.chemistMonCount:0}calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1688.svg" /></div>
                                             <div className="callnos">{this.props.otherMonCount? this.props.otherMonCount:0 } calls</div>
                                         </div>
                                        
                                     </div>
                                
                                 </div>
                             </div>: null}
                             </div>}
                         </li>
                         <li>
                             <div className="meetings-total-text" onMouseOver={this.showTotalTuePopup} onMouseOut={this.showTotalTuePopup}>
                                 {this.props.tuecount ? this.props.tuecount: 0}
                             </div>
                             {this.props.tuecount == 0 || this.props.tuecount == undefined ?
                             null :
                             <div>
                             {this.state.showTuePopup ? <div className="totalcallTuepopup">
                                 <div className="totalcalltext">TOTAL CALLS</div>
                                 <div className="">
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group_1451.svg" /></div>
                                             <div className="callnos">{this.props.docTueCount? this.props.docTueCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1687.svg" /></div>
                                             <div className="callnos">{this.props.hospitalTueArr ? this.props.hospitalTueArr : 0} calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1452.svg" /></div>
                                             <div className="callnos">{this.props.stockistTueCount? this.props.stockistTueCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1453.svg" /></div>
                                             <div className="callnos">{this.props.chemistTueCount ? this.props.chemistTueCount:0}calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1688.svg" /></div>
                                             <div className="callnos">{this.props.otherTueCount? this.props.otherTueCount:0 } calls</div>
                                         </div>
                                        
                                     </div>
                                
                                 </div>
                             </div>: null}
                             </div>}
                         </li>
                         <li>
                             <div className="meetings-total-text" onMouseOver={this.showTotalWedPopup} onMouseOut={this.showTotalWedPopup}>
                                 {this.props.wedcount? this.props.wedcount :0}
                             </div>
                             {this.props.wedcount == 0 || this.props.wedcount == undefined ?
                             null :
                             <div>
                             {this.state.showWedPopup ? <div className="totalcallWedpopup">
                                 <div className="totalcalltext">TOTAL CALLS</div>
                                 <div className="">
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group_1451.svg" /></div>
                                             <div className="callnos">{this.props.docWedCount? this.props.docWedCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1687.svg" /></div>
                                             <div className="callnos">{this.props.hospitalWedCount ?  this.props.hospitalWedCount : 0} calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1452.svg" /></div>
                                             <div className="callnos">{this.props.stockistWedCount? this.props.stockistWedCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1453.svg" /></div>
                                             <div className="callnos">{this.props.chemistWedCount ? this.props.chemistWedCount:0}calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1688.svg" /></div>
                                             <div className="callnos">{this.props.otherWedCount? this.props.otherWedCount:0 } calls</div>
                                         </div>
                                        
                                     </div>
                                
                                 </div>
                             </div>: null}
                             </div>}
                         </li>
                         <li>
                             <div className="meetings-total-text" onMouseOver={this.showTotalThrPopup.bind(this)} onMouseOut={this.showTotalThrPopup.bind(this)}>
                                 {this.props.thrcount ? this.props.thrcount: 0}
                             </div>
                             {this.props.thrcount == 0 || this.props.thrcount == undefined ?
                             null :
                             <div>
                             {this.state.showThrPopup ? <div className="totalcallThrpopup">
                                 <div className="totalcalltext">TOTAL CALLS</div>
                                 <div className="">
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group_1451.svg" /></div>
                                             <div className="callnos">{this.props.docThrCount? this.props.docThrCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1687.svg" /></div>
                                             <div className="callnos">{this.props.hospitalThrCount ?  this.props.hospitalThrCount : 0} calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1452.svg" /></div>
                                             <div className="callnos">{this.props.stockistThrCount? this.props.stockistThrCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1453.svg" /></div>
                                             <div className="callnos">{this.props.chemistThrCount ? this.props.chemistThrCount:0}calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1688.svg" /></div>
                                             <div className="callnos">{this.props.otherThrCount? this.props.otherThrCount:0 } calls</div>
                                         </div>
                                        
                                     </div>
                                
                                 </div>
                             </div>: null}
                             </div>}
                         </li>
                         <li>
                             <div className="meetings-total-text" onMouseOver={this.showTotalFriPopup.bind(this)} onMouseOut={this.showTotalFriPopup.bind(this)}>
                                 {this.props.fricount ? this.props.fricount: 0}
                             </div>
                             {this.props.fricount == 0 || this.props.fricount == undefined ?
                             null :
                             <div>
                             {this.state.showFriPopup ? <div className="totalcallFripopup">
                                 <div className="totalcalltext">TOTAL CALLS</div>
                                 <div className="">
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group_1451.svg" /></div>
                                             <div className="callnos">{this.props.docFriCount? this.props.docFriCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1687.svg" /></div>
                                             <div className="callnos">{this.props.hospitalFriCount ? this.props.hospitalFriCount : 0} calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1452.svg" /></div>
                                             <div className="callnos">{this.props.stockistFriCount? this.props.stockistFriCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1453.svg" /></div>
                                             <div className="callnos">{this.props.chemistFriCount ? this.props.chemistFriCount:0}calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1688.svg" /></div>
                                             <div className="callnos">{this.props.otherFriCount? this.props.otherFriCount:0 } calls</div>
                                         </div>
                                        
                                     </div>
                                
                                 </div>
                             </div>: null}
                             </div>}
                         </li>
                         <li>
                             <div className="meetings-total-text" onMouseOver={this.showTotalSatPopup.bind(this)} onMouseOut={this.showTotalSatPopup.bind(this)}>
                                 {this.props.satcount ? this.props.satcount: 0}
                             </div>
                             {this.props.satcount == 0 || this.props.satcount == undefined ?
                             null :
                             <div>
                             {this.state.showSatPopup ? <div className="totalcallSatpopup">
                                 <div className="totalcalltext">TOTAL CALLS</div>
                                 <div className="">
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group_1451.svg" /></div>
                                             <div className="callnos">{this.props.docSatCount? this.props.docSatCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1687.svg" /></div>
                                             <div className="callnos">{this.props.hospitalSatCount? this.props.hospitalSatCount:0 } calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1452.svg" /></div>
                                             <div className="callnos">{this.props.stockistSatCount? this.props.stockistSatCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1453.svg" /></div>
                                             <div className="callnos">{this.props.chemistSatCount ? this.props.chemistSatCount:0}calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1688.svg" /></div>
                                             <div className="callnos">{this.props.otherSatCount? this.props.otherSatCount:0 } calls</div>
                                         </div>
                                        
                                     </div>
                                
                                 </div>
                             </div>: null}
                             </div>}
                         </li>
                         <li>
                             <div className="meetings-total-text" onMouseOver={this.showTotalSunPopup.bind(this)} onMouseOut={this.showTotalSunPopup.bind(this)}>
                                 {this.props.suncount ? this.props.suncount: 0}
                             </div>
                             {this.props.suncount == 0 || this.props.suncount == undefined ?
                             null :
                             <div>
                             {this.state.showSunPopup ? <div className="totalcallSunpopup">
                                 <div className="totalcalltext">TOTAL CALLS</div>
                                 <div className="">
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group_1451.svg" /></div>
                                             <div className="callnos">{this.props.docSunCount? this.props.docSunCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1687.svg" /></div>
                                             <div className="callnos">{this.props.hospitalSunCount ?  this.props.hospitalSunCount : 0} calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1452.svg" /></div>
                                             <div className="callnos">{this.props.stockistSunCount? this.props.stockistSunCount:0 } calls</div>
                                         </div>
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1453.svg" /></div>
                                             <div className="callnos">{this.props.chemistSunCount ? this.props.chemistSunCount:0}calls</div>
                                         </div>
                                     </div>
                                     <div className="flex-row pt10">
                                         <div className="flexDisplay">
                                             <div className=""><img src="../public/assets/images/Group1688.svg" /></div>
                                             <div className="callnos">{this.props.otherSunCount? this.props.otherSunCount:0 } calls </div>
                                         </div>
                                        
                                     </div>
                                
                                 </div>
                             </div>: null}
                             </div>}
                         </li>
                     </ul>
                                     <div className="meetings-grand-total desktopView"><div className="meetings-grand-total-text desktopView">{this.props.totalAmt ? this.props.totalAmt : 0}</div></div>
                 </div>
                    </div>
                    <div className="tour-plan-footer">
                             <div className="footer-text">You have planned for <span>{this.state.Visit}</span> calls out of <span> {this.state.Plan}</span> calls.</div>
                        <div className="meeting-options">
                            <div className="doctor">
                                <div className="doc-col"></div>Doctor
                            </div>
                            <div className="stokiest">
                                <div className="sto-col"></div>Stockist
                            </div>
                            <div className="chemist">
                                <div className="che-col"></div>Chemist
                            </div>
                            <div className="hospital">
                                <div className="hos-col"></div>Hospital
                            </div>
                            <div className="others">
                                <div className="oth-col"></div>Others
                            </div>
                            <div className="others">
                         <div className="othW-col"></div>Other Work Type
                     </div>
                        </div>
                    </div>
                </Card>


                {/* <NotePopup 
                    show={this.state.showNotePopup } 
                    Savearea={this.Savearea}
                    onClose={this.onClose}
                    areachange={this.areachange}
                    Areanote={this.state.Areanote}
                />  */}
            </div>
        )
    }
}

export default DownlineTpDetails