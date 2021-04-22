import React, { Component } from "react";
import moment from 'moment';
import {Link, withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import {getAreaPatchs} from '../../../actions/MTP'
import {getTargetData} from '../../../actions/MTP'
import TargetVsPlanned from '../components/TargetVsPlanned'
import {getTargetPlan} from '../../../actions/MTP'
import {getPlanned} from '../../../actions/MTP'
import DaysPlanned from '../components/DaysPlanned'
import {postToServer} from '../../../lib/comm-utils'
import UserDetails from '../components/UserDetails'
import StatusPopup from '../../../lib/StatusPopup'
import SuccessMsg from "./successMsg";
import ConfirmationBox from '../../../lib/ConfirmationBox'
import TourPlanDetail from '../components/TourPlanDetail'
import Spinner from '../../../BasicComponet/sfaSpinner'
class TourPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateContext:localStorage.getItem('latestmonth') != null ? moment(localStorage.getItem('latestmonth')) :moment(this.props.mdate),
            today: moment(),
            // weekdays: moment.weekdays(),
            weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            short_weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            stpflag:false,
            n_mtp_DoctorMandatory:'0',
            months: moment.months(),
            showMonth: false,
            showYear: false,
            showData: false,
            showDaysData: false,
            currMonth:new Date().getMonth()+1,
            currYear:new Date().getFullYear(),
            loadData:{},
            selectedYear:'',
            selectedMonth:'',
            filteredSuggestions:[],
            month_val:'',
            showPopup:false,
            chemistWedCount:'',
            holidaylist:[],
            mtpLocked:'',
            msg:'',
            showStatusModal:false,
            successMsg:false,
            msg:'',
            nodetails:{},
            success:'',
            sortpatches:[],
            orderby:'asc',
            temp:{},
            customHoliday:'',
            mtpAllowedFlag:false,
            flagmsg:'',
            mtpAllowedDate:'',
            weekholiday:'',
            showConfirmBox:false,
            mtpAllowedmsg:'',
            mtpflagval:'',
            customfulldate:'',
            fromMtpdate:'',
            toMtpdate:'',
            absoluteMonthVal:'',
            deletemsg:'',
            showDelete:false,
            deleteConfirm:false,
            showapprovel:false,
            showsubmit:false,
            leaveList:{},
            holidayList:{},
            HideAll:false,
            StatusMsg:'',
            weekHoliday_name:'',
            customHdays:{},
            stpManMtpFlag:'',
            load:false,
            HIdeLoad:false,
            loderon:false,
            Vloderon:false
        }
        this.SelectList = this.SelectList.bind(this)
        this.month = this.month.bind(this)
        this.MonthNav = this.MonthNav.bind(this)
        this.onMonthChange = this.onMonthChange.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.setMonth = this.setMonth.bind(this)
        this.YearNav = this.YearNav.bind(this)
        this.setYear = this.setYear.bind(this)
        this.onYearChange = this.onYearChange.bind(this)
        this.onKeyUpYear = this.onKeyUpYear.bind(this)
        this.nextMonth = this.nextMonth.bind(this)
        this.prevMonth = this.prevMonth.bind(this)
        this.showTable = this.showTable.bind(this)
        this.hideTable = this.hideTable.bind(this)
        this.showDaysTable = this.showDaysTable.bind(this)
        this.hideDaysTable = this.hideDaysTable.bind(this)
        this.LoadSelectedSub = this.LoadSelectedSub.bind(this)
        this.getAllUser =this.getAllUser.bind(this)
        this.dropSelectedMonth = this.dropSelectedMonth.bind(this)
        this.dropSelectedYear = this.dropSelectedYear.bind(this)
        this.showCalander = this.showCalander.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.redirectDayWise = this.redirectDayWise.bind(this)
        this.getHoliday = this.getHoliday.bind(this)
        this.loadStp = this.loadStp.bind(this)
        this.sendApprov=this.sendApprov.bind(this)
        this.onShowPopup=this.onShowPopup.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
        this.sort = this.sort.bind(this)
        this.deleteMtp=this.deleteMtp.bind(this)
        this.compareBy = this.compareBy.bind(this)
        // this.deleteMtp=this.deleteMtp.bind(this)
        this.getCustomHolidayList =this.getCustomHolidayList.bind(this)
        this.getCall=this.getCall.bind(this)
        this.getFlagResponse = this.getFlagResponse.bind(this)
        this.getMTPAllowedDateArray = this.getMTPAllowedDateArray.bind(this)
        this.hideFlag = this.hideFlag.bind(this)
        this.Validate=this.Validate.bind(this)
        this.fun_subarea=this.fun_subarea.bind(this)
        this.laodother=this.laodother.bind(this)
        this.getBtnResponse=this.getBtnResponse.bind(this)
        this.hideDeleteModal=this.hideDeleteModal.bind(this)
        this.hideDelete=this.hideDelete.bind(this)
       // this.find_duplicate_in_array = this.find_duplicate_in_array.bind(this)
        this.selectPatch = this.selectPatch.bind(this)
         this.close=this.close.bind(this)
        this.ValidateAction=this.ValidateAction.bind(this)  
      
    }


    ValidateAction(month,Year){ 
        // return new Promise(
        //     (resolve) => {
        const _this=this

       
        var loack = {"index": "MTP_check_lock","Token": "",
            "Data":{"Month":month.toString(),  "Year":Year.toString()}
        }
        postToServer("MTP", loack).then(function (resultklkl) {
            let lockval
            let status=false
            const  kl=resultklkl.data[0]["Result"]
              sessionStorage.setItem("lockMtp",kl )
            status =  resultklkl.data[0]["status"]

            let    show_load =resultklkl.data[0]["show_load"]

            if(show_load=="0"){
                _this.setState({   load:!_this.state.load,  HIdeLoad:true})
            }else{
                _this.setState({   load:!_this.state.load, HideAll:false,  HIdeLoad:false})
            }
             
            if(status=='S'   || status=='s'  ){
                _this.setState({
                    load:!_this.state.load, showsubmit:false,showapprovel:false, HideAll:false ,StatusMsg:'( TP Sent For Approval)'
                })
            }
            if(status=='-1'  || status=='2' ){
                _this.setState({
                    load:!_this.state.load,    showsubmit:false,showapprovel:false ,HideAll:false  ,StatusMsg:'( TP In Pending...)'
                })
            }
            if(status=='0'   ){
                _this.setState({
                    load:!_this.state.load,     showsubmit:true,showapprovel:false,HideAll:false ,StatusMsg:'( TP Process... )'
                })
            }
            if(status=='A'   || status=='a'  ){
                _this.setState({
                    load:!_this.state.load, showapprovel: false,showsubmit:false ,HideAll:true ,StatusMsg:'( TP Approved )'
                })
            }


            if(status=='R'   || status=='r'  ){
                _this.setState({
                    load:!_this.state.load,  showapprovel: false,showsubmit:true ,HideAll:false ,StatusMsg:'( TP Submitted  and Rejected )'
                })
            }

            if(status=='e'   || status=='E'  ){
                _this.setState({
                    load:!_this.state.load, showapprovel: true,showsubmit:false ,HideAll:false ,StatusMsg:'( TP Approved  and Allowed Edit )'
                })
            }
            if(status=='1'   || status=='1'  ){
                _this.setState({
                    load:!_this.state.load,  showapprovel: true,showsubmit:false ,HideAll:false ,StatusMsg:'(TP Submitted )'
                })
            }

            if(status!="2"){
            lockval=resultklkl.data[0]["Data"]
            }else{
                lockval=0
            }
          

          if (kl!=2){
            _this.setState({
                            mtpLocked:kl ,stpflag:false
            })
        }else{
            _this.setState({
                mtpLocked:0 ,stpflag:false
})   
        }
            if(kl=="-1"){
                _this.setState({ stpflag:true,   HideAll:true, showStatusModal:true,  Error: true, msg: "STP LOCKED" })
              
            }
            if(kl=="1"){
            
                _this.setState( {   HideAll:true,   stpflag:false, showStatusModal:true, Error: true, msg: "MTP LOCKED" })
               
            }
           
           // resolve()
        }).catch(  (Error)=> {  
          
           
            _this.setState({  showStatusModal:true, Error: true, msg: "Error in  API " })
        })
        
     //} ).then((a)=>{   })
    }

    close(){

        //alert('ok')
        this.setState({loderon:false})
    }
     


  
       laodother(month,Year){

       
    
        const _this=this

       
        _this.setState({
            loderon:true     
        })
        
      
          try{
            let holidaycode=''
            let weekholiday=''
            var target = {"Data":{"Month":month.toString(),  "Year":Year.toString() },
                "index":"MTP_T_V","Token":"","menuid":"38"}
                _this.props.getTargetData(target)
            var palnned = {"Data":{"Month":month.toString(),  "Year":Year.toString() },
                "index":"MTP_T_V","Token":"","menuid":"38"}
                _this.props.getTargetPlan(palnned)
            var days = {"Data":{"Month":month.toString(),  "Year":Year.toString() },
                "index":"MTP_D_P","Token":"","menuid":"38"}
                _this.props.getPlanned(days)
            _this.setState({
                month_val:month,
            })
            _this.getHoliday(Year.toString(),  month.toString())
            var inputdata = {
                "Data": {
                    "Month": month.toString(),
                    "Year":  Year.toString(),
                    "day":"1"
                },
                "index": "MTP_NOT_Allowed",
            
                "menuid": "38"
            }
            postToServer("MTP", inputdata).then(function (result) {
            //Week_holidays
                let code = []
                let array = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday',];
                if(result.data.Week_holidays.length == 0){
                    _this.getCall(0,month,Year)
                    _this.setState({
                        weekholiday:0,
                        weekHoliday_name:'Sunday',
                        loderon:false
                    })
                }else{
                    let hdate ={}
                    weekholiday = result.data["Week_holidays"][0]["c_weekholiday"];
                    let wholiday = weekholiday.split("|");
                // holidaycode =  array.indexOf(weekholiday)+1;
                let mon = month
                    wholiday.map((item)=>{
                        holidaycode =  array.indexOf(item); 
                        code.push({
                            code:holidaycode
                        })
                    })
                    _this.getCall(code,month,Year)
                    _this.setState({
                        weekholiday:code,
                        weekHoliday_name : weekholiday,
                        loderon:false
                    })
                    
                }

                //locked  mtp
                let locked=result.data["Lockedmtp"][0][""]

                if(locked=="1"){
                    // _this.setState({loderon:false})
                    _this.setState({ stpflag:true,   HideAll:true, showStatusModal:true,  Error: true, msg: "MTP Entry Is Locked.Please Contact Administrator" })
                    
                return
                }

                
                //stp: Array
                let toMtpdate=result.data["stp"][0]["To"]
                let fromMtpdate=result.data["stp"][0]["from"]
                _this.setState({
                    toMtpdate:toMtpdate,
                    fromMtpdate:fromMtpdate
                })
                let stp=result.data["stp"][0]["flag"]
                if(stp=="0"){
                    _this.setState({
                    stpflag:true,
                    })
                }
                //flag: Array 
                let leaveList ={}
                let holidayList ={}
                if(result.data["Result"].length > 0){ 
                let   mtpAllowedDate = result.data["Result"];
                result.data["Result"].map((i)=>{
                    if(i.TYP == 'H' ){ 
                        let m = new Date(i.D_DATE).getMonth()+1;
                        if(m == month){
                            let day = new Date(i.D_DATE).getDate()
                            holidayList[day] = 'holiday'
                        }
                    }else if(i.TYP == 'L' || i.TYP == "S" || i.TYP == "R"){
                       

                        let m = new Date(i.D_DATE).getMonth()+1;
                        if(m == month){
                            let day = new Date(i.D_DATE).getDate()
                            leaveList[day] = 'leave'
                        }
                    }
                })
                _this.setState({
                        mtpAllowedDate:mtpAllowedDate,
                        leaveList:leaveList,
                        holidayList:holidayList
                    })
            }
            if(result.data["flag"]){
                _this.setState({
                    mtpflagval:result.data["flag"][0]['n_mtp_sfs_btnapproval'],
                    stpManMtpFlag:result.data["flag"][0]['n_stpMandForMTp']
                })
            }
        }).catch(  (Error)=> {  
            console.log(Error)
            _this.setState({ showStatusModal:true ,Error: true, Errormsg: "Error in  API " })

        }).catch(  (Error)=> {  
            console.log(Error)
            _this.setState({ showStatusModal:true,  Error: true, Errormsg: "Error in  API " })
        })

    }
    catch(err) {
        console.log(err)
        }



       
    }

    fun_subarea(month,Year){  
          
        var data = {"index":"MTP_subarea",
        "Data":{"Month":month.toString(), 
        "Year":Year.toString(),"day":"1"},
            "menuid":"38"}                          
        this.setState({
            stpflag:false
            }) 
        this.props.getAreaPatchs(data)
    }

    Validate(month,Year){ 
        // return new Promise(
        //     (resolve) => {
        const _this=this

         _this.setState({Vloderon:true,load:!_this.state.load})
        var loack = {"index": "MTP_check_lock","Token": "",
            "Data":{"Month":month.toString(),  "Year":Year.toString()}
        }
        postToServer("MTP", loack).then(function (resultklkl) {
            let lockval
            let status=false
            const  kl=resultklkl.data[0]["Result"]
              sessionStorage.setItem("lockMtp",kl )
            status =  resultklkl.data[0]["status"]
           
            _this.setState({Vloderon:false})

         let    show_load =resultklkl.data[0]["show_load"]

        if(show_load=="0"){
            _this.setState({    HIdeLoad:true})
            sessionStorage.setItem("Nodetails","1")
        }else{
            _this.setState({    HIdeLoad:false})
        }


        
            if(status=='2'   || status=='2'  ){
               //alert('okok')
            
          //  _this.Validate(month,Year)
               var Datakey = {"index": "MTP_Load_Status",
            "Data":{"Month":month.toString(),   "Year":Year.toString()}
        }
        postToServer("MTP", Datakey).then(function (RESULTmm) {


           
           
          let   auto_mtpstatus =  RESULTmm.data[0]["status"]


          if (auto_mtpstatus=="1"){

            
            _this.setState({
                load:!_this.state.load,  showsubmit:true,showapprovel:false,HideAll:false ,StatusMsg:'( TP Process... )'
            })
          
            _this.ValidateAction(month,Year)
            _this.fun_subarea(month,Year)
               
            _this.laodother(month,Year)
            //_this.laodother(month,Year)
            
        }
            else{
                _this.setState({
                    showsubmit:false,showapprovel:false ,HideAll:false  ,StatusMsg:'( TP In Pending...)'
                })
            }

        }).catch( (Error)=>{ console.log(Error ,"Auto mtp") })
            }
               
            if(status=='S'   || status=='s'  ){
                _this.setState({
                    showsubmit:false,showapprovel:false, HideAll:false ,StatusMsg:'( TP Sent For Approval..)'
                })
            }
            if(status=='-1'  || status=='2' ){
                _this.setState({
                    showsubmit:false,showapprovel:false ,HideAll:false  ,StatusMsg:'( TP In Pending...)'
                })
            }
            if(status=='0'   ){
                _this.setState({
                    showsubmit:true,showapprovel:false,HideAll:false ,StatusMsg:'( TP Process... )'
                })
            }
            if(status=='A'   || status=='a'  ){
                _this.setState({
                    showapprovel: false,showsubmit:false ,HideAll:true ,StatusMsg:'( TP Approved ..)'
                })
            }


            if(status=='R'   || status=='r'  ){
                _this.setState({
                    showapprovel: false,showsubmit:true ,HideAll:false ,StatusMsg:'( TP Submitted  and Rejected ..)'
                })
            }

            if(status=='e'   || status=='E'  ){
                _this.setState({
                    showapprovel: false,showsubmit:false ,HideAll:false ,StatusMsg:'( TP Approved  and Allowed Edit )'
                })
            }
            if(status=='1'   || status=='1'  ){
                _this.setState({
                    showapprovel: true,showsubmit:false ,HideAll:false ,StatusMsg:'(TP Submitted.. )'
                })
            }

            if(status!="2"){
            lockval=resultklkl.data[0]["Data"]
            }else{
                lockval=0
            }
          //  alert(kl)

          if (kl!=2){
            _this.setState({
                            mtpLocked:kl ,stpflag:false
            })
        }else{
            _this.setState({
                mtpLocked:0 ,stpflag:false
})   
        }
            if(kl=="-1"){
                _this.setState({ stpflag:true,   HideAll:true, showStatusModal:true,  Error: true, msg: "STP LOCKED" })
                _this.laodother(month,Year)
            }
            if(kl=="1"){
            
                _this.setState( {   HideAll:true,   stpflag:false, showStatusModal:true, Error: true, msg: "MTP LOCKED" })
                _this.fun_subarea(month,Year)
                _this.laodother(month,Year)
            }
            if(kl.trim() == "0"  || kl.trim() == "2"  ){
                _this.fun_subarea(month,Year)
                _this.laodother(month,Year)
            }
           // resolve()
        }).catch(  (Error)=> {  
            console.log(Error,'kunal Error')
           
            _this.setState({  showStatusModal:true, Error: true, msg: "Error in  API " })
        })
        
     //} ).then((a)=>{   })
    }

    getCall(holidaycode,month,Year){ 
        let mon = month 
        this.getCustomHolidayList(Year,mon,1,holidaycode)
    }
getHoliday(year,month){ 
    if (month==''){
        month=1
    }


    var _this13 = this
   var inputdata = {
        "Data": {
            "Month": month.toString(),
            "Year": year.toString(),
            "day":"1"
        },
        "index": "MTP_NOT_Allowed",
        "menuid": "38"
    }
    postToServer("MTP", inputdata).then(function (result) {


        console.log(result.data["flag"][0]["n_mtp_DoctorMandatory"],'okoo')
        if(result.data["flag"]){
            if(result.data["flag"][0]){
                if(result.data["flag"][0]["n_mtp_DoctorMandatory"]){

                  const n_mtp_DoctorMandatory=  result.data["flag"][0]["n_mtp_DoctorMandatory"]
                    _this13.setState( { n_mtp_DoctorMandatory:n_mtp_DoctorMandatory })
                }
            }

        }
        let stp=result.data["stp"][0]["flag"]
        if(stp=="1"){
             _this13.setState({
                stpflag:false,
                })
           
            }
            let leaveList ={}
            let holidayList ={}
            if(result.data["Result"].length > 0){ 
            let   mtpAllowedDate = result.data["Result"];
            result.data["Result"].map((i)=>{
                if(i.TYP == 'H' ){ 
                    let m = new Date(i.D_DATE).getMonth()+1;
                    if(m == month){
                        let day = new Date(i.D_DATE).getDate()
                        holidayList[day] = 'holiday'
                    }
                }else if(i.TYP == 'L' || i.TYP == "S" || i.TYP == "R"){
                   

                    let m = new Date(i.D_DATE).getMonth()+1;
                    if(m == month){
                        let day = new Date(i.D_DATE).getDate()
                        leaveList[day] = 'leave'
                    }
                }
            })
            _this13.setState({
                    mtpAllowedDate:mtpAllowedDate,
                    leaveList:leaveList,
                    holidayList:holidayList
                })
               // console.log("hh",mtpAllowedDate)
            }else{
                _this13.setState({
                    holidayList:[],
                    leaveList:[]
                })
            }
      
        }).catch(  (Error)=> {
        this.setState({ showStatusModal:true, Error: true, Errormsg: "Error in  API " })
        })
    }

    onShowPopup(){
        this.setState({
            successMsg: !this.state.successMsg
        })
    }

    sendApprov()
    {

        this.setState({loderon:true})
        var data = {
            "Data": {
                "Month": this.state.month_val.toString(),
                "Year": this.state.currYear.toString()
            },
            "index": "MTP_Sent_Approvel"
        }
        postToServer("MTP",data).then( (Result)=>{ 
            const j=Result.data[0]["Result"]
            this.setState({ loderon:false,
                successMsg: !this.state.successMsg,msg:j
            })
            //month,Year
            setTimeout(() =>  this.ValidateAction(this.state.month_val.toString(), this.state.currYear.toString()) , 700);
        }).catch(  (Error)=> {  
            this.setState({  loderon:false, Error: true, Errormsg: "Error in  API " })
        })
    }
    componentDidMount(){
        let month = this.state.dateContext.month()+1
        let year = this.state.dateContext.year()
        sessionStorage.setItem("Nodetails","0")
        let m = this.state.selectedMonth ? this.state.selectedMonth:month
        let y = this.state.selectedYear ? this.state.selectedYear:year

        //this.setState({loderon:true})

       
        this.Validate(m,y)

       
    }
   
    showTable() {
        this.setState({
            showData: true
        })
    }

    hideTable() {
        this.setState({
            showData: false
        })
    }
    showDaysTable() {
        this.setState({
            showDaysData: true
        })
    }

    hideDaysTable() {
        this.setState({
            showDaysData: false
        })
    }

    year() {
        return this.state.dateContext.format("Y")
    }
    month() {
        return this.state.dateContext.format("MMMM")
    }
    daysInMonth() {
        return this.state.dateContext.daysInMonth()
    }
    currentDate() {
        return this.state.dateContext.get("date")
    }
    currentDay() {
        return this.state.dateContext.format("D")
    }
    firstDayOfMonth() {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d');
        return firstDay
    }
    setMonth(month) {
        // console.log("anaayu",month)
        let monthNo = this.state.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext,
        });
    }
    onMonthChange() {
        this.setState({
            showMonth: !this.state.showMonth
        });
    }
    onShowYear() {
        this.setState({
            showYear: true
        });
    }
    onSelectChange(e, data) {
        this.setMonth(data);
        // this.props.onMonthChange && this.props.onMonthChange();
    }
    SelectList(props) {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <div onClick={(e) => { this.onSelectChange(e, data) }}>
                        {data}
                    </div>
                </div>
            )
        });
        return (
            <div>{popup}</div>
        )
    }
    MonthNav() {
        return (
            <div onClick={(e) => { this.onMonthChange() }}>
                {this.month()}
                {this.state.showMonth && <this.SelectList data={this.state.months} />}
            </div>
        )
    }
    onKeyUpYear(e) {
        // console.log(e.target.value)
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value)
            this.setState({
                showYear: false
            })
        }
    }
    setYear(year) {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        });
    }
    onYearChange(e) { 
        this.setYear(e.target.value);
        // this.props.onYearChange && this.props.onYearChange(e,e.target.value);
    }
    YearNav() {
        return (
            this.state.showYear ?
                <input
                    defaultValue={this.year()}
                    ref={(yearInput) => { this.yearInput = yearInput }}
                    onKeyUp={(e) => this.onKeyUpYear(e)}
                    onChange={(e) => this.onYearChange(e)}
                    type="number"
                    placeholder="year" />
                :
                <div onClick={(e) => { this.onShowYear() }}>
                    {this.year()}
                </div>
        )
    }
    nextMonth() {

        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        let sYear = dateContext.toLocaleString()
        sYear = sYear.split(' ');
        sYear = sYear[3];
        let year = this.state.selectedYear ? this.state.selectedYear : sYear ? sYear: this.state.currYear
        this.setState({
           
            activeAreaType:'',
            areacode:'',
           activeArea:'',
            dateContext: dateContext,
            month_val:dateContext.month()+1,
            selectedMonth:dateContext.month()+1,
            currYear:year
        })
       // this.props.onNextMonth && this.props.onNextMonth();
        this.getCustomHolidayList(year,(dateContext.month()+1),1,this.state.weekholiday)
        this.Validate(dateContext.month()+1,year);
        this.setState({
            week1count:'0',
            week2count:0,
            week3count:0,
            week4count:0,
            week5count:0,
            week6count:0,
            moncount:0,
            tuecount:0,
            wedcount:0,
            thrcount:0,
            fricount:0,
            satcount:0,
            suncount:0,
            totalAmt:0,
        })

        let array = []  
        array.push(
            {
                Name:"",
                Type:"",
                code:""
            }
        )
        this.LoadSelectedSub(array, this.state.dateContext)
    }
    prevMonth() { 
      
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            activeArea:'',
            activeAreaType:'',
            areacode:'',
            dateContext: dateContext,
            month_val:dateContext.month()+1,
           selectedMonth:dateContext.month()+1
        })
        let sYear = dateContext.toLocaleString()
        sYear = sYear.split(' ');
        sYear = sYear[3];
        let year = this.state.selectedYear ? this.state.selectedYear :sYear ? sYear: this.state.currYear
        this.getCustomHolidayList(year,(dateContext.month()+1)-1,1,this.state.weekholiday)
        // this.props.onPrevMonth && this.props.onPrevMonth();
        this.Validate(dateContext.month()+1,year);
        this.setState({
            week1count:'0',
            week2count:0,
            week3count:0,
            week4count:0,
            week5count:0,
            week6count:0,
            moncount:0,
            tuecount:0,
            wedcount:0, 
            thrcount:0,
            fricount:0,
            satcount:0,
            suncount:0,
            totalAmt:0
        })
        let array = []  
        array.push(
            {
                Name:"",
                Type:"",
                code:""
            }
        )
        this.LoadSelectedSub(array, this.state.dateContext)
    }

    LoadSelectedSub(selecteditem,datacon){ console.log("fff",selecteditem)
        let code  = selecteditem['code'];console.log("sweta",code)
        this.getAllUser(code,datacon)
        this.setState({
            activeArea:selecteditem['Name'],
            activeAreaType:selecteditem['Type'],
            areacode:code
        })
    }
    getAllUser(code,datacon){ console.log("code",code)
        if(code == undefined){
            code = ""
        }else{
            code = code
        }
        let result = []
        var count={}
        var c ={}
        var r ={}
        let loadMonth 
        let loadDay
        let allDay = []
        let validMonth = []
        const _this12 = this
        _this12.setState({ loderon:true })  
        var daycount ={}
        var weekday = {}
        let moncount =0
        let tuecount =0
        let wedcount =0
        let thrcount =0
        let fricount =0
        let satcount =0
        let suncount =0
        let chemistWedArr =[]
        let stockistWedArr = []
        let chemistSunArr =[]
        let stockistSunArr = []
        let chemistThrArr =[]
        let stockistThrArr = []
        let chemistMonArr =[]
        let stockistMonArr = []
        let chemistTueArr =[]
        let stockistTueArr = []
        let chemistFriArr =[]
        let stockistFriArr = []
        let chemistSatArr =[]
        let stockistSatArr = []
        let docSatArr =[]
        let hospitalSatArr =[]
        let hospitalSunArr = []
        let OtherSatArr = []
        let docFriArr =[]
        let otherFriArr = []
        let docThrArr =[]
        let otherThrArr = []
        let docwedArr =[]
        let otherWedArr = []
        let docSunArr =[]
        let otherSunArr = []
        let docTueArr =[]
        let hospitalTueArr = []
        let hospitalWedArr = []
        let hospitalThrArr =[]
        let hospitalFriArr= []
        let otherTueArr = []
        let docMonArr =[]
        let otherMonArr = []
        let hospitalMonArr = []
        let docWedArr =[]
        let otherSatArr =[]
        let weekcount ={}
        let week1count = 0
        let week2count = 0
        let week3count = 0
        let week4count = 0
        let week5count = 0
        let week6count = 0
        let week7count = 0



        let tempdata =[]
        let nodata =[]
        let nvalidMonth = []
        let nallDay=[]
        let dcon = datacon.month()+1
        var data = {"Data":{"Month":dcon.toString(),  "Year":this.state.currYear.toString(),"subarea": code},"index":"MTP_cal","Token":"","menuid":"38"}
        postToServer("MTP", data).then(function (result) {
            //if(result.data["Status"]=="Success"){}
            var temp={}
           
            result =  result.data
            _this12.setState({loderon:false})
         
            if(result){
            result.Fildwork.map((a)=>{
                var Selected={}
               
                Selected[a.C_Doc_Code]= {" C_Doc_Code":a.C_Doc_Code,"C_Name":a.C_Name}
                var templist=[]
                if(temp[a.month]){ 
                    if(temp[a.month][a.day]){
                        if(temp[a.month][a.day][a.type]){ 
                            templist=temp[a.month][a.day][a.type]
                            templist.push(Selected)
                            temp[a.month][a.day][a.type]=templist
                        }else{
                            temp[a.month][a.day][a.type]={}
                            templist.push(Selected)
                            temp[a.month][a.day][a.type]=templist
                        }
                    }else{
                        temp[a.month][a.day]={}
                        templist.push(Selected)
                        temp[a.month][a.day][a.type]=templist
                   }
                }else{ 
                    temp[a.month]={}
                    temp[a.month][a.day]={}
                    templist.push(Selected)
                    temp[a.month] [a.day][a.type]=templist
                } 
                if(count[a.month]){
                    if(c[a.month]){
                        c[a.month]= 1 + c[a.month];
                    }else{
                        c[a.month]=1
                    }
                if( count[a.month][a.day]){
                    if(r[a.day]){  //debugger
                        r[a.day]= 1 + r[a.day];
                       // r[a.N_dayof_week]=  c[a.N_dayof_week];
                    }else{
                        r[a.day]=  1
                    }
             
                    if(count[a.month][a.day][a.type]){
                        var d= count[a.month][a.day][a.type]
                        count[a.month][a.day][a.type]= d + 1
                    }else{
                        count[a.month][a.day][a.type]=1 
                    }
                    
                }else{ 
                   
                    if(r[a.day]){
                        r[a.day]= 1 +  r[a.day]
                    }else{
                        r[a.day]=  1
                    }
                    // count[a.n_week]={}
                    count[a.month][a.day]={}
                    count[a.month][a.day][a.type]=1
                    
                }

                }else{

                    if(c[a.month]){
                        c[a.month]= 1 + c[a.month]
                    }else{
                        c[a.month]=1
                    }
                    count[a.month]={}
                    count[a.month][a.day]={}
                    count[a.month][a.day][a.type]=1
                    r[a.day]=1;
                }
                let weeklist =[]
          var weekSelected={}
          weekSelected[a.C_Doc_Code]= {" C_Doc_Code":a.C_Doc_Code,"C_Name":a.C_Name,"C_Type":a.type,"C_Week":a.Weekdetails}
          if(weekcount[a.month]){ 
              if(weekcount[a.month][a.day]){
                  if(weekcount[a.month][a.day][a.Weekdetails]){ 
                    weeklist=weekcount[a.month][a.day][a.Weekdetails]
                    weeklist.push(weekSelected)
                      weekcount[a.month][a.day][a.Weekdetails]=weeklist
                  }else{

                      if(!weekcount[a.month][a.day][a.Weekdetails]){
                    weekcount[a.month][a.day][a.Weekdetails]={}
                      }
                    weeklist.push(weekSelected)
                      weekcount[a.month][a.day][a.Weekdetails]=weeklist
                  }
              }else{

                  if(!weekcount[a.month][a.day]){
                weekcount[a.month][a.day]={}
                  }
                weeklist.push(weekSelected)
                  weekcount[a.month][a.day][a.Weekdetails]=weeklist
             }
          }else{

              if(!weekcount[a.month]){
            weekcount[a.month]={}
              }
              if(!weekcount[a.month][a.day]){
            weekcount[a.month][a.day]={}
              }
            weeklist.push(weekSelected)
              weekcount[a.month] [a.day][a.Weekdetails]=weeklist
          }
          // console.log("chauhan",weekcount)
                let daytemplist =[]
                var daySelected={}
                daySelected[a.C_Doc_Code]= {" C_Doc_Code":a.C_Doc_Code,"C_Name":a.C_Name,"C_Type":a.type,"C_Day":a.DayName}
                if(daycount[a.month]){ 
                    if(daycount[a.month][a.day]){
                        if(daycount[a.month][a.day][a.DayName]){ 
                            daytemplist=daycount[a.month][a.day][a.DayName]
                            daytemplist.push(daySelected)
                            daycount[a.month][a.day][a.DayName]=daytemplist
                        }else{
                            daycount[a.month][a.day][a.DayName]={}
                            daytemplist.push(daySelected)
                            daycount[a.month][a.day][a.DayName]=daytemplist
                        }
                    }else{
                        daycount[a.month][a.day]={}
                        daytemplist.push(daySelected)
                        daycount[a.month][a.day][a.DayName]=daytemplist
                   }
                }else{
                    daycount[a.month]={}
                    daycount[a.month][a.day]={}
                    daytemplist.push(daySelected)
                    daycount[a.month] [a.day][a.DayName]=daytemplist
                }
                
              // console.log("sweta",daycount)
                
              //  console.log("tempo",c) 
            })
          // console.log("tempo",temp) 
        
        
         
         Object.keys(weekcount).map((val)=>{
            if(val == _this12.state.month_val){
                Object.keys(weekcount[val]).map((day)=>{ 
                    if(weekcount[val][day][1]){ 
                        week1count = parseInt(week1count) + weekcount[val][day][1].length;
                       // console.log("total",week1count,weekcount[val][day][1].length)
                    }
                    if(weekcount[val][day][2]){
                        week2count = parseInt(week2count) + weekcount[val][day][2].length;
                    }
                    if(weekcount[val][day][3]){
                        week3count = parseInt(week3count) + weekcount[val][day][3].length;
                    }
                    if(weekcount[val][day][4]){
                        week4count = parseInt(week4count) + weekcount[val][day][4].length;
                    }
                    if(weekcount[val][day][5]){
                        week5count = parseInt(week5count) + weekcount[val][day][5].length;
                    }
                    if(weekcount[val][day][6]){
                        week6count = parseInt(week6count) + weekcount[val][day][6].length;
                    }
                    if(weekcount[val][day][7]){
                        week7count = parseInt(week7count) + weekcount[val][day][7].length;
                    }
                })
                
            }
         })
        // console.log("total",week1count)
         Object.keys(daycount).map((val)=>{
            if(val == _this12.state.month_val){
                Object.keys(daycount[val]).map((day)=>{ 
                    if(daycount[val][day]["Monday"]){ 
                        moncount = parseInt(moncount) + daycount[val][day]["Monday"].length;
                            daycount[val][day]['Monday'].map((item) =>{
                                Object.keys(item).map((data,index)=>{ 
                                    if(item[data]['C_Type'] == 'CHEMIST'){
                                        chemistMonArr.push(item[data]['C_Type'])
                                    }
                                    if(item[data]['C_Type'] == 'STOCKIEST'){
                                        stockistMonArr.push(item[data]['C_Type'])
                                    }
                                    if(item[data]['C_Type'] == 'DOCTOR'){
                                        docMonArr.push(item[data]['C_Type']);
                                    }
                                    if(item[data]['C_Type'] == 'HOSPITAL'){
                                        hospitalMonArr.push(item[data]['C_Type'])
                                    }
                                    if(item[data]['C_Type'] == 'OTHER_Work'){
                                        otherMonArr.push(item[data]['C_Type'])
                                    }
                                    
                                })
                            })
                        
                        }
                   
                    if(daycount[val][day]["Tuesday"]){
                        tuecount = parseInt(tuecount) + daycount[val][day]["Tuesday"].length;
                        //tuecount =daycount[val][day]["Tuesday"].length;
                        daycount[val][day]['Tuesday'].map((item) =>{
                            Object.keys(item).map((data,index)=>{
                                if(item[data]['C_Type'] == 'CHEMIST'){
                                    chemistTueArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'STOCKIEST'){
                                    stockistTueArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'DOCTOR'){
                                    docTueArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'HOSPITAl'){
                                    hospitalTueArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'OTHER_Work'){
                                    otherTueArr.push(item[data]['C_Type'])
                                }
                            })
                        })
                    }
                    if(daycount[val][day]["Wednesday"]){ 
                        wedcount = parseInt(wedcount) + daycount[val][day]["Wednesday"].length;
                        //wedcount =daycount[val][day]["Wednesday"].length;
                        daycount[val][day]['Wednesday'].map((item) =>{
                            Object.keys(item).map((data,index)=>{
                                if(item[data]['C_Type'] == 'CHEMIST'){
                                    chemistWedArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'STOCKIEST'){
                                    stockistWedArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'DOCTOR'){
                                    docWedArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'HOSPITAL'){
                                    hospitalWedArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'OTHER_Work'){
                                    otherWedArr.push(item[data]['C_Type'])
                                }
                            })
                        })
                    }
                   
                    if(daycount[val][day]["Thursday"]){
                        thrcount = parseInt(thrcount) + daycount[val][day]["Thursday"].length;
                        //thrcount =daycount[val][day]["Thursday"].length;
                        daycount[val][day]['Thursday'].map((item) =>{
                            Object.keys(item).map((data,index)=>{
                                if(item[data]['C_Type'] == 'CHEMIST'){
                                    chemistThrArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'STOCKIEST'){
                                    stockistThrArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'DOCTOR'){
                                    docThrArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'HOSPITAL'){
                                    hospitalThrArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'OTHER_Work'){
                                    otherThrArr.push(item[data]['C_Type'])
                                }
                            })
                        })
                    }
                    if(daycount[val][day]["Friday"]){
                        fricount = parseInt(fricount) + daycount[val][day]["Friday"].length;
                        //fricount =daycount[val][day]["Friday"].length;
                        daycount[val][day]['Friday'].map((item) =>{
                            Object.keys(item).map((data,index)=>{
                                if(item[data]['C_Type'] == 'CHEMIST'){
                                    chemistFriArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'STOCKIEST'){
                                    stockistFriArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'DOCTOR'){
                                    docFriArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'HOSPITAL'){
                                    hospitalFriArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'OTHER_Work'){
                                    otherFriArr.push(item[data]['C_Type'])
                                }
                            })
                        })
                    }
                   
                    if(daycount[val][day]["Saturday"]){ 
                        satcount = parseInt(satcount) + daycount[val][day]["Saturday"].length;
                        //satcount =daycount[val][day]["Saturday"].length;
                        daycount[val][day]['Saturday'].map((item) =>{
                            Object.keys(item).map((data,index)=>{
                                if(item[data]['C_Type'] == 'CHEMIST'){
                                    chemistSatArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'STOCKIEST'){
                                    stockistSatArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'DOCTOR'){
                                    docSatArr.push(item[data]['C_Type'])
                                }
                                // if(item[data]['C_Type'] == 'OTHER'){
                                //     otherSatArr.push(item[data]['C_Type'])
                                // }
                                if(item[data]['C_Type'] == 'OTHER_Work'){
                                    otherSatArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'HOSPITAl'){
                                    hospitalSatArr.push(item[data]['C_Type'])
                                }
                            })
                        })
                        
                    }
                    if(daycount[val][day]["Sunday"]){
                        suncount = parseInt(suncount) + daycount[val][day]["Sunday"].length;
                        //satcount =daycount[val][day]["Saturday"].length;
                        daycount[val][day]['Sunday'].map((item) =>{
                            Object.keys(item).map((data,index)=>{
                                if(item[data]['C_Type'] == 'CHEMIST'){
                                    chemistSunArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'STOCKIEST'){
                                    stockistSunArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'DOCTOR'){
                                    docSunArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'OTHER_Work'){
                                    otherSunArr.push(item[data]['C_Type'])
                                }
                                if(item[data]['C_Type'] == 'HOSPITAl'){
                                    hospitalSunArr.push(item[data]['C_Type'])
                                }
                                
                            })
                        })
                        
                    }
                  // console.log("thr",daycount[val][day])
                })
               
            }
          })
          //console.log("kk",monLen)
         
         Object.keys(temp).map((item)=>{ 
                if(item == _this12.state.month_val){
                  
                   // day_data = this.state.loadData[item]
                    loadMonth = item
                    validMonth.push({
                        month:loadMonth
                    })
                   
                     Object.keys(temp[item]).map((day)=>{ 
                         loadDay = day
                         allDay.push({
                             day:loadDay
                         })
                         tempdata = temp[item]
                    
                         
                     })
                    
                }
               
            })
        }
        let ndaycount ={}
        let mondaycount = 0
        let  chemistMondayArr
        let stockistMondayArr
        let docMondayArr
        let otherMondayArr
        let mondaycnt = 0
        let chemcnt =0
        let doccnt = 0
        let stockcnt =0
        let othercnt = 0
        let tuesdaycnt =0
        let Wednesdaycnt =0
        let Thrusdaydaycnt =0
        let fridaydaycnt=0
        let Saturdaycnt =0
        let sundaydaycnt =0
        let nweekcount ={}
        let weekcnt =0
        let week1cnt = 0
        let week2cnt =0
         let week3cnt =0
         let week4cnt =0
         let week5cnt =0
         let week6cnt =0
         let week7cnt =0
         let tdoccnt =0
         let tstockcnt =0
         let tchemcnt =0
         let tothercnt = 0
         let tuechemcnt = 0
         let tuedoccnt = 0
         let tuestockcnt = 0
         let tueothercnt = 0
         let  weddoccnt =0
         let  wedchemcnt =0
         let  wedstockcnt =0
         let  wedothercnt =0
         let  thrdoccnt =0
         let  thrchemcnt =0
         let  thrstockcnt =0
         let  throthercnt =0
         let  fridoccnt =0
         let  frichemcnt =0
         let  fristockcnt =0
         let  friothercnt =0
         let  satdoccnt =0
         let  satchemcnt =0
         let  satstockcnt =0
         let  satothercnt =0
         let  sundoccnt =0
         let  sunchemcnt =0
         let  sunstockcnt =0
         let  sunothercnt =0
         let sathospitalcnt = 0
         let sunhospitalcnt = 0
         let hospitalcnt =0
         let monhospitalcnt = 0
         let tuehospitalcnt = 0
         let wedhospitalcnt = 0
         let thrhospitalcnt = 0
         let frihospitalcnt = 0
       let nodetails ={}
        if(result.Nodetails){
            result.Nodetails.map((a)=>{
               
                if(nodetails[a.month] )
                {

                    if(nodetails[a.month][a.day]){

                        if(nodetails[a.month][a.day]['DOCTOR']){
                            nodetails[a.month][a.day]['DOCTOR'] =   nodetails[a.month][a.day]['DOCTOR']  +  a.Doctor
                            
                        }else{
                            nodetails[a.month][a.day]['DOCTOR']=a.Doctor



                        }


                        if(nodetails[a.month][a.day]['STOCKIEST']){
                            nodetails[a.month][a.day]['STOCKIEST'] =   nodetails[a.month][a.day]['STOCKIEST']  +  a.STOCKIEST
                        }else{
                            nodetails[a.month][a.day]['STOCKIEST']=a.Stockist
                        }


                        if(nodetails[a.month][a.day]['CHEMIST']){
                            nodetails[a.month][a.day]['CHEMIST'] =   nodetails[a.month][a.day]['CHEMIST']  +  a.Chemist
                        }else{
                            nodetails[a.month][a.day]['CHEMIST']=a.Chemist
                        }
                        if(nodetails[a.month][a.day]['OTHERS']){
                            nodetails[a.month][a.day]['OTHERS'] =   nodetails[a.month][a.day]['OTHERS']  +  a.Others
                        }else{
                            nodetails[a.month][a.day]['OTHERS']=a.Others
                        }
                        if(nodetails[a.month][a.day]['HOSPITAL']){
                            nodetails[a.month][a.day]['HOSPITAL'] =   nodetails[a.month][a.day]['HOSPITAL']  +  a.hospital
                        }else{
                            nodetails[a.month][a.day]['HOSPITAL']=a.hospital
                        }
                        //count[a.week][a.day]['CHEMIST'] =  a.CHEMIST
                    }else{
                        nodetails[a.month][a.day]={}
                        nodetails[a.month][a.day]['CHEMIST'] = a.Chemist
                        nodetails[a.month][a.day]['DOCTOR'] = a.Doctor
                        nodetails[a.month][a.day]['STOCKIEST'] = a.STOCKIEST
                        nodetails[a.month][a.day]['OTHERS'] = a.Others
                        nodetails[a.month][a.day]['HOSPITAL'] = a.hospital
                    }
                    
                } else{
                    nodetails[a.month] ={}
                    nodetails[a.month][a.day] = {}
                    nodetails[a.month][a.day]['CHEMIST'] = a.Chemist
                    nodetails[a.month][a.day]['DOCTOR'] = a.Doctor
                    nodetails[a.month][a.day]['STOCKIEST'] = a.STOCKIEST
                    nodetails[a.month][a.day]['OTHERS'] = a.Others
                    nodetails[a.month][a.day]['HOSPITAL'] = a.hospital
                }

                let ndaytemplist =[]
                var ndaySelected={}
                ndaySelected[a.DayName]= {"chemist":a.Chemist,"doctor":a.Doctor,"stockist":a.STOCKIEST,"others":a.Others,"hospital":a.hospital}
                if(ndaycount[a.month]){ 
                    if(ndaycount[a.month][a.day]){
                        if(ndaycount[a.month][a.day][a.DayName]){ 
                            daytemplist=daycount[a.month][a.day][a.DayName]
                            ndaytemplist.push(ndaySelected)
                            ndaycount[a.month][a.day][a.DayName]=ndaytemplist
                        }else{
                            ndaycount[a.month][a.day][a.DayName]={}
                            ndaytemplist.push(ndaySelected)
                            ndaycount[a.month][a.day][a.DayName]=ndaytemplist
                        }
                    }else{
                        ndaycount[a.month][a.day]={}
                        ndaytemplist.push(ndaySelected)
                        ndaycount[a.month][a.day][a.DayName]=ndaytemplist
                   }
                }else{
                    ndaycount[a.month]={}
                    ndaycount[a.month][a.day]={}
                    ndaytemplist.push(ndaySelected)
                    ndaycount[a.month] [a.day][a.DayName]=ndaytemplist
                }

                let nweeklist =[]
                var nweekSelected={}
                nweekSelected[a.Weekdetails]= {"totalcnt":parseInt(a.Chemist)+parseInt(a.Doctor)+parseInt(a.STOCKIEST)+parseInt(a.Others)+parseInt(a.hospital)}
                if(nweekcount[a.month]){ 
                    if(nweekcount[a.month][a.day]){
                        if(nweekcount[a.month][a.day][a.Weekdetails]){ 
                            nweeklist=nweekcount[a.month][a.day][a.Weekdetails]
                            nweeklist.push(nweekSelected)
                          nweekcount[a.month][a.day][a.Weekdetails]=nweeklist
                        }else{
                            nweekcount[a.month][a.day][a.Weekdetails]={}
                            nweeklist.push(nweekSelected)
                          nweekcount[a.month][a.day][a.Weekdetails]=nweeklist
                        }
                    }else{
                        nweekcount[a.month][a.day]={}
                        nweeklist.push(nweekSelected)
                      nweekcount[a.month][a.day][a.Weekdetails]=nweeklist
                   }
                }else{
                    nweekcount[a.month]={}
                    nweekcount[a.month][a.day]={}
                    nweeklist.push(nweekSelected)
                  nweekcount[a.month] [a.day][a.Weekdetails]=nweeklist
                }
               
               
            })
         
                        
            Object.keys(ndaycount).map((val)=>{
                if(val == _this12.state.month_val){
                    Object.keys(ndaycount[val]).map((day)=>{ 
                        if(ndaycount[val][day]["Monday"]){ 
                            ndaycount[val][day]["Monday"].map((mon)=>{ 
                                Object.keys(mon).map((d)=>{
                                   if(mon[d]['chemist']){
                                        chemcnt = mon[d]['chemist'];
                                        tchemcnt = parseInt(tchemcnt) + parseInt(mon[d]['chemist'])
                                    }
                                    if(mon[d]['doctor']){
                                        doccnt = mon[d]['doctor'];
                                        tdoccnt = parseInt(tdoccnt) + parseInt(mon[d]['doctor'])
                                    }
                                    if(mon[d]['stockist']){
                                        stockcnt = mon[d]['stockist'];
                                        tstockcnt = parseInt(tstockcnt) + parseInt(mon[d]['stockist'])
                                    }
                                    if(mon[d]['others']){
                                        othercnt =  mon[d]['others'];
                                        tothercnt = parseInt(tothercnt) + parseInt(mon[d]['others'])
                                    }
                                    if(mon[d]['hospital']){
                                        hospitalcnt =  mon[d]['hospital'];
                                        monhospitalcnt = parseInt(monhospitalcnt) + parseInt(mon[d]['hospital'])
                                    }
                                    mondaycnt = parseInt(mondaycnt) + parseInt(chemcnt)+parseInt(doccnt)+parseInt(stockcnt)+parseInt(othercnt)+parseInt(hospitalcnt)
                                   
                                })
                            })
                        }
                        if(ndaycount[val][day]["Tuesday"]){ 
                            ndaycount[val][day]["Tuesday"].map((tue)=>{
                                Object.keys(tue).map((d)=>{
                                   if(tue[d]['chemist']){
                                        chemcnt = tue[d]['chemist'];
                                        tuechemcnt = parseInt(tuechemcnt) + parseInt(tue[d]['chemist'])
                                    }
                                    if(tue[d]['doctor']){
                                        doccnt = tue[d]['doctor'];
                                        tuedoccnt = parseInt(tuedoccnt) + parseInt(tue[d]['doctor'])
                                    }
                                    if(tue[d]['stockist']){
                                        stockcnt = tue[d]['stockist'];
                                        tuestockcnt = parseInt(tuestockcnt) + parseInt(tue[d]['stockist'])
                                    }
                                    if(tue[d]['others']){
                                        othercnt =  tue[d]['others'];
                                        tueothercnt = parseInt(tueothercnt) + parseInt(tue[d]['others'])
                                    }
                                    if(tue[d]['hospital']){
                                        hospitalcnt =  tue[d]['hospital'];
                                        tuehospitalcnt = parseInt(tuehospitalcnt) + parseInt(tue[d]['hospital'])
                                    }
                                    tuesdaycnt =  parseInt(tuesdaycnt) + parseInt(chemcnt)+parseInt(doccnt)+parseInt(stockcnt)+parseInt(othercnt)+parseInt(hospitalcnt)
                                   
                                })
                            })
                        }
                        if(ndaycount[val][day]["Wednesday"]){ 
                            ndaycount[val][day]["Wednesday"].map((tue)=>{
                                Object.keys(tue).map((d)=>{
                                   if(tue[d]['chemist']){
                                        chemcnt = tue[d]['chemist'];
                                        wedchemcnt = parseInt(wedchemcnt) + parseInt(tue[d]['chemist'])
                                    }
                                    if(tue[d]['doctor']){
                                        doccnt = tue[d]['doctor'];
                                        weddoccnt = parseInt(weddoccnt) + parseInt(tue[d]['doctor'])
                                    }
                                    if(tue[d]['stockist']){
                                        stockcnt = tue[d]['stockist'];
                                        wedstockcnt = parseInt(wedstockcnt) + parseInt(tue[d]['stockist'])
                                    }
                                    if(tue[d]['others']){
                                        othercnt =  tue[d]['others'];
                                        wedothercnt = parseInt(wedothercnt) + parseInt(tue[d]['others'])
                                    }
                                    if(tue[d]['hospital']){
                                        hospitalcnt =  tue[d]['hospital'];
                                        wedhospitalcnt = parseInt(wedhospitalcnt) + parseInt(tue[d]['hospital'])
                                    }
                                    Wednesdaycnt =  parseInt(Wednesdaycnt) + parseInt(chemcnt)+parseInt(doccnt)+parseInt(stockcnt)+parseInt(othercnt)+parseInt(hospitalcnt)
                                   
                                })
                            })
                        }
                        if(ndaycount[val][day]["Thursday"]){
                            ndaycount[val][day]["Thursday"].map((tue)=>{
                                Object.keys(tue).map((d)=>{
                                   if(tue[d]['chemist']){
                                        chemcnt = tue[d]['chemist'];
                                        thrchemcnt = parseInt(thrchemcnt) + parseInt(tue[d]['chemist'])
                                    }
                                    if(tue[d]['doctor']){
                                        doccnt = tue[d]['doctor'];
                                        thrdoccnt = parseInt(thrdoccnt) + parseInt(tue[d]['doctor'])
                                    }
                                    if(tue[d]['stockist']){
                                        stockcnt = tue[d]['stockist'];
                                        thrstockcnt = parseInt(thrstockcnt) + parseInt(tue[d]['stockist'])
                                    }
                                    if(tue[d]['others']){
                                        othercnt =  tue[d]['others'];
                                        throthercnt = parseInt(throthercnt) + parseInt(tue[d]['others'])
                                    }
                                    if(tue[d]['hospital']){
                                        hospitalcnt =  tue[d]['hospital'];
                                        thrhospitalcnt = parseInt(thrhospitalcnt) + parseInt(tue[d]['hospital'])
                                    }
                                   // Thrusdaydaycnt = 
                                    Thrusdaydaycnt =  parseInt(Thrusdaydaycnt) + parseInt(chemcnt)+parseInt(doccnt)+parseInt(stockcnt)+parseInt(othercnt)+parseInt(hospitalcnt)
                                    
                                })
                            })
                        }
                        if(ndaycount[val][day]["Friday"]){ 
                            ndaycount[val][day]["Friday"].map((tue)=>{
                                Object.keys(tue).map((d)=>{
                                   if(tue[d]['chemist']){
                                        chemcnt = tue[d]['chemist'];
                                        frichemcnt = parseInt(frichemcnt) + parseInt(tue[d]['chemist'])
                                    }
                                    if(tue[d]['doctor']){
                                        doccnt = tue[d]['doctor'];
                                        fridoccnt = parseInt(fridoccnt) + parseInt(tue[d]['doctor'])
                                    }
                                    if(tue[d]['stockist']){
                                        stockcnt = tue[d]['stockist'];
                                        fristockcnt = parseInt(fristockcnt) + parseInt(tue[d]['stockist'])
                                    }
                                    if(tue[d]['others']){
                                        othercnt =  tue[d]['others'];
                                        friothercnt = parseInt(friothercnt) + parseInt(tue[d]['others'])
                                    }
                                    if(tue[d]['hospital']){
                                        hospitalcnt =  tue[d]['hospital'];
                                        frihospitalcnt = parseInt(frihospitalcnt) + parseInt(tue[d]['hospital'])
                                    }
                                    fridaydaycnt = parseInt(fridaydaycnt) + parseInt(chemcnt)+parseInt(doccnt)+parseInt(stockcnt)+parseInt(othercnt)+parseInt(hospitalcnt)
                                   
                                })
                            })
                        }
                       
                        if(ndaycount[val][day]["Saturday"]){ 
                            ndaycount[val][day]["Saturday"].map((tue)=>{
                                Object.keys(tue).map((d)=>{
                                   if(tue[d]['chemist']){
                                        chemcnt = tue[d]['chemist'];
                                        satchemcnt = parseInt(satchemcnt) + parseInt(tue[d]['chemist'])
                                    }
                                    if(tue[d]['doctor']){
                                        doccnt = tue[d]['doctor'];
                                        satdoccnt = parseInt(satdoccnt) + parseInt(tue[d]['doctor'])
                                    }
                                    if(tue[d]['stockist']){
                                        stockcnt = tue[d]['stockist'];
                                        satstockcnt = parseInt(satstockcnt) + parseInt(tue[d]['stockist'])
                                    }
                                    if(tue[d]['others']){
                                        othercnt =  tue[d]['others'];
                                        satothercnt = parseInt(satothercnt) + parseInt(tue[d]['others'])
                                    }
                                    if(tue[d]['hospital']){
                                        hospitalcnt =  tue[d]['hospital'];
                                        sathospitalcnt = parseInt(sathospitalcnt) + parseInt(tue[d]['hospital'])
                                    }
                                    
                                    Saturdaycnt = parseInt(Saturdaycnt) + parseInt(chemcnt)+parseInt(doccnt)+parseInt(stockcnt)+parseInt(othercnt)+parseInt(hospitalcnt)
                                    
                                })
                            })
                        }
                        if(ndaycount[val][day]["sunday"]){ 
                            ndaycount[val][day]["sunday"].map((tue)=>{
                                Object.keys(tue).map((d)=>{
                                   if(tue[d]['chemist']){
                                        chemcnt = tue[d]['chemist'];
                                        sunchemcnt = parseInt(sunchemcnt) + parseInt(tue[d]['chemist'])
                                    }
                                    if(tue[d]['doctor']){
                                        doccnt = tue[d]['doctor'];
                                        sundoccnt = parseInt(sundoccnt) + parseInt(tue[d]['doctor'])
                                    }
                                    if(tue[d]['stockist']){
                                        stockcnt = tue[d]['stockist'];
                                        sunstockcnt = parseInt(sunstockcnt) + parseInt(tue[d]['stockist'])
                                    }
                                    if(tue[d]['others']){
                                        othercnt =  tue[d]['others'];
                                        sunothercnt = parseInt(sunothercnt) + parseInt(tue[d]['others'])
                                    }
                                    if(tue[d]['hospital']){
                                        hospitalcnt =  tue[d]['hospital'];
                                        sunhospitalcnt = parseInt(sunhospitalcnt) + parseInt(tue[d]['hospital'])
                                    }
                                    sundaydaycnt = parseInt(sundaydaycnt) + parseInt(chemcnt)+parseInt(doccnt)+parseInt(stockcnt)+parseInt(othercnt)+parseInt(hospitalcnt)
                                   
                                })
                            })
                        }
                           
                        })
                    }
                })
              
                Object.keys(nweekcount).map((val)=>{
                    if(val == _this12.state.month_val){
                        Object.keys(nweekcount[val]).map((day)=>{ 
                            if(nweekcount[val][day][1]){ 
                                nweekcount[val][day][1].map((mon)=>{
                                    Object.keys(mon).map((d)=>{
                                        week1cnt = parseInt(week1cnt)+mon[d]['totalcnt']
                                    })
                                })
                            }
                            if(nweekcount[val][day][2]){ 
                                nweekcount[val][day][2].map((mon)=>{
                                    Object.keys(mon).map((d)=>{
                                        week2cnt = parseInt(week2cnt)+mon[d]['totalcnt']
                                    })
                                })
                            }
                            if(nweekcount[val][day][3]){ 
                                nweekcount[val][day][3].map((mon)=>{
                                    Object.keys(mon).map((d)=>{
                                        week3cnt = parseInt(week3cnt)+mon[d]['totalcnt']
                                    })
                                })
                            }
                            if(nweekcount[val][day][4]){ 
                                nweekcount[val][day][4].map((mon)=>{
                                    Object.keys(mon).map((d)=>{
                                        week4cnt = parseInt(week4cnt)+mon[d]['totalcnt']
                                    })
                                })
                            }
                            if(nweekcount[val][day][5]){ 
                                nweekcount[val][day][5].map((mon)=>{
                                    Object.keys(mon).map((d)=>{
                                        week5cnt = parseInt(week5cnt)+mon[d]['totalcnt']
                                    })
                                })
                            }
                            if(nweekcount[val][day][6]){ 
                                nweekcount[val][day][6].map((mon)=>{
                                    Object.keys(mon).map((d)=>{
                                        week6cnt = parseInt(week6cnt)+mon[d]['totalcnt']
                                    })
                                })
                            }
                            
                        })
                    }
                })
                Object.keys(nodetails).map((item)=>{
                    if(item == _this12.state.month_val){
                    //  loadMonth = item
                        nvalidMonth.push({
                            month:item
                        })
                        Object.keys(nodetails[item]).map((day)=>{ 
                        //  loadDay = day
                            nallDay.push({
                                day:day
                            })
                        
                        })
                    nodata= nodetails[item]
                    
                    }
                })
            }
           // console.log("total",tdoccnt,docMonArr.length)
        
        if(nallDay.length > 0 &&  allDay.length >0){
            allDay = [...nallDay , ...allDay];
        }else if(allDay.length == 0 && nallDay.length > 0){
            allDay= nallDay
        }else{
            allDay=allDay
        }


         console.log(nodetails,'sinha-----')
        
        // if(nvalidMonth.length > 0 && validMonth.length >0){
        //     validMonth = [...nvalidMonth , ...validMonth];
        // }else if(validMonth.length == 0 && nvalidMonth.length > 0){
        //     validMonth= nvalidMonth
        // }else{
        //     validMonth=validMonth
        //    }
        if(validMonth.length == 0 ){
            validMonth= nvalidMonth
        }else{
            validMonth =validMonth
        }
        
        let templen = Object.keys(tempdata).length;
        let nodatalen = Object.keys(nodata).length;
        if(nodatalen > 0 && templen > 0){
            tempdata = Object.assign(tempdata, nodata)
        }else if(templen == 0 && nodatalen > 0){
            tempdata = nodata
        }else{
            tempdata = tempdata
        }
        
        // else{
        //     tempdata = tempdata
        // }
        //console.log("Thrusdaydaycnt",Thrusdaydaycnt)
        moncount = parseInt(moncount)+ mondaycnt
        tuecount = parseInt(tuecount)+ tuesdaycnt;
        wedcount = parseInt(wedcount)+ Wednesdaycnt
        thrcount = parseInt(thrcount)+ Thrusdaydaycnt
        fricount = parseInt(fricount)+ fridaydaycnt
        satcount = parseInt(satcount)+ Saturdaycnt
        suncount = parseInt(suncount)+ sundaydaycnt
        
        week1count =  parseInt(week1cnt)+week1count
        week2count =  parseInt(week2cnt)+week2count
        week3count =  parseInt(week3cnt)+week3count
        week4count =  parseInt(week4cnt)+week4count
        week5count =  parseInt(week5cnt)+week5count
        week6count =  parseInt(week6cnt)+week6count

        
        docMonArr = tdoccnt ? parseInt(tdoccnt) + docMonArr.length:docMonArr.length
        chemistMonArr = tchemcnt ? parseInt(tchemcnt) + chemistMonArr.length :chemistMonArr.length
        stockistMonArr = tstockcnt ? parseInt(tstockcnt) + stockistMonArr.length:stockistMonArr.length
        otherMonArr = tothercnt ? parseInt(tothercnt) + otherMonArr.length :otherMonArr.length
        hospitalMonArr = monhospitalcnt ? parseInt(monhospitalcnt) + hospitalMonArr.length : hospitalMonArr.length

        otherTueArr = tueothercnt ? parseInt(tueothercnt) + otherTueArr.length : otherTueArr.length
        stockistTueArr = tuestockcnt ? parseInt(tuestockcnt) + stockistTueArr.length : stockistTueArr.length
        chemistTueArr = tuechemcnt ? parseInt(tuechemcnt) + chemistTueArr.length : chemistTueArr.length
        docTueArr = tuedoccnt ? parseInt(tuedoccnt) + docTueArr.length : docTueArr.length
        hospitalTueArr = tuehospitalcnt ? parseInt(tuehospitalcnt) + hospitalTueArr.length : hospitalTueArr.length

        otherWedArr = wedothercnt ? parseInt(wedothercnt) + otherWedArr.length : otherWedArr.length
        stockistWedArr = wedstockcnt ? parseInt(wedstockcnt) + stockistWedArr.length : stockistWedArr.length
        chemistWedArr = wedchemcnt ? parseInt(wedchemcnt) + chemistWedArr.length : chemistWedArr.length
        docWedArr = weddoccnt ? parseInt(weddoccnt) + docWedArr.length : docWedArr.length
        hospitalWedArr = wedhospitalcnt ? parseInt(wedhospitalcnt) + hospitalWedArr.length : hospitalWedArr.length

        otherThrArr = throthercnt ? parseInt(throthercnt) + otherThrArr.length : otherThrArr.length
        stockistThrArr = thrstockcnt ? parseInt(thrstockcnt) + stockistThrArr.length : stockistThrArr.length
        chemistThrArr = thrchemcnt ? parseInt(thrchemcnt) + chemistThrArr.length : chemistThrArr.length
        docThrArr = thrdoccnt ? parseInt(thrdoccnt) + docThrArr.length : docThrArr.length
        hospitalThrArr = thrhospitalcnt ?  parseInt(thrhospitalcnt) + hospitalThrArr.length : hospitalThrArr.length

        otherFriArr = friothercnt ? parseInt(friothercnt) + otherFriArr.length : otherFriArr.length
        stockistFriArr = fristockcnt ? parseInt(fristockcnt) + stockistFriArr.length : stockistFriArr.length
        chemistFriArr = frichemcnt ? parseInt(frichemcnt) + chemistFriArr.length : chemistFriArr.length
        docFriArr = fridoccnt ? parseInt(fridoccnt) + docFriArr.length : docFriArr.length
        hospitalFriArr = frihospitalcnt ? parseInt(frihospitalcnt) + hospitalFriArr.length : hospitalFriArr.length
        
        otherSatArr = satothercnt ? parseInt(satothercnt) + otherSatArr.length : otherSatArr.length
        stockistSatArr = satstockcnt ? parseInt(satstockcnt) + stockistSatArr.length : stockistSatArr.length
        chemistSatArr = satchemcnt ? parseInt(satchemcnt) + chemistSatArr.length : chemistSatArr.length
        docSatArr = satdoccnt ? parseInt(satdoccnt) + docSatArr.length : docSatArr.length
        hospitalSatArr = sathospitalcnt ? parseInt(sathospitalcnt) + hospitalSatArr.length : hospitalSatArr.length

        otherSunArr = sunothercnt ? parseInt(sunothercnt) + otherSunArr.length : otherSunArr.length
        stockistSunArr = sunstockcnt ? parseInt(sunstockcnt) + stockistSunArr.length : stockistSunArr.length
        chemistSunArr = sunchemcnt ? parseInt(sunchemcnt) + chemistSunArr.length : chemistSunArr.length
        docSunArr = sundoccnt ? parseInt(sundoccnt) + docSunArr.length : docSunArr.length
        hospitalSunArr = sunhospitalcnt ? parseInt(sunhospitalcnt) + hospitalSunArr.length :hospitalSunArr.length
        
        var totalAmt = parseInt(moncount)+parseInt(tuecount)+parseInt(wedcount)+parseInt(thrcount)+parseInt(fricount)+parseInt(satcount)+parseInt(suncount)
      
        _this12.setState({ 
                   // loadData: result,
                  // Vloderon:false,
            loadData:temp,
            totalColmn:r,
            totalRow:c,
            allDay:allDay,
            validMonth:validMonth,
            moncount:moncount,
            tuecount:tuecount,
            wedcount:wedcount,
            thrcount:thrcount,
            fricount:fricount, 
            satcount:satcount,
            suncount:suncount,
            chemistWedCount:chemistWedArr ? chemistWedArr :0,
            chemistThrCount:chemistThrArr ? chemistThrArr:0,
            chemistMonCount:chemistMonArr ? chemistMonArr:0,
            chemistTueCount:chemistTueArr ? chemistTueArr:0,
            chemistFriCount:chemistFriArr ? chemistFriArr:0,
            chemistSatCount:chemistSatArr ? chemistSatArr:0,
            chemistSunCount:chemistSunArr ? chemistSunArr:0,
            stockistSunCount:stockistSunArr ? stockistSunArr:0,
            stockistSatCount:stockistSatArr ? stockistSatArr:0,
            stockistFriCount:stockistFriArr ? stockistFriArr:0,
            stockistThrCount:stockistThrArr ?stockistThrArr :0,
            stockistWedCount:stockistWedArr ? stockistWedArr:0,
            stockistTueCount:stockistTueArr ? stockistTueArr:0,
            stockistMonCount:stockistMonArr ? stockistMonArr:0,
            docSunCount:docSunArr ? docSunArr:0,
            docSatCount:docSatArr ? docSatArr:0,
            hosSatCount:hospitalSatArr ?  hospitalSatArr :0,
            docFriCount:docFriArr ? docFriArr:0,
            docThrCount:docThrArr ?docThrArr :0,
            docWedCount:docWedArr ? docWedArr:0,
            docTueCount:docTueArr ? docTueArr:0,
            docMonCount:docMonArr ? docMonArr:0,
            otherSunCount:otherSunArr ? otherSunArr:0,
            otherSatCount:otherSatArr ? otherSatArr:0,
            otherFriCount:otherFriArr ? otherFriArr:0,
            otherThrCount:otherThrArr ?otherThrArr :0,
            otherWedCount:otherWedArr ? otherWedArr:0,
            otherTueCount:otherTueArr ? otherTueArr:0,
            otherMonCount:otherMonArr ? otherMonArr:0,
            hospitalMonCount:hospitalMonArr ? hospitalMonArr : 0,
            hospitalTueCount:hospitalTueArr ? hospitalTueArr : 0,
            hospitalWedCount:hospitalWedArr ? hospitalWedArr :0,
            hospitalThrCount:hospitalThrArr ?hospitalThrArr :0,
            hospitalFriCount:hospitalFriArr ? hospitalFriArr:0,
            hospitalSunCount:hospitalSunArr ?hospitalSunArr:0,
            week1count:week1count,
            week2count:week2count,
            week3count:week3count,
            week4count:week4count,
            week5count:week5count,
            week6count:week6count,
            // subarea:activeArea,
            tempdata:tempdata,
            nodetails:nodetails,
            totalAmt:totalAmt
            
        })
            
            }).catch((Error) => {
            this.setState({ Vloderon:false,Error: true, Errormsg: Error })
            // console.log(result)
          })
    }
    dropSelectedMonth(month,id,d3,d4){ 
        const smonth = (month-1).toString()
       
        this.setState({
            selectedMonth:smonth,
            currMonth:month,
            month_val:parseInt(smonth)+1
        })
        //console.log("mon",moment().month(smonth).year('2018'))
    }
    dropSelectedYear(year,a,b,c){ 
        this.setState({
            currYear:year
        })
       
    }
    showCalander(){ 
    //     if(this.state.selectedYear){
    //     //this.getHoliday(this.state.selectedYear,this.state.absoluteMonthVal)
    //         let mon = this.state.absoluteMonthVal ? this.state.absoluteMonthVal : this.state.month_val-1;
    //     this.Validate(mon,this.state.selectedYear,);
    //    // this.getCustomHolidayList(this.state.selectedYear,mon,1,this.state.weekholiday)
    //     this.setState({
    //         dateContext:moment().month(this.state.selectedMonth).year(this.state.selectedYear)
    //     })
    //     }else{
    //         let mon = this.state.absoluteMonthVal ? this.state.absoluteMonthVal : this.state.month_val-1;
    //         this.Validate( mon,this.state.currYear);
    //       //  this.getHoliday(this.state.currYear,this.state.absoluteMonthVal)
    //      //   this.getCustomHolidayList(this.state.currYear,mon,1,this.state.weekholiday)
    //     this.setState({
    //         dateContext:moment().month(this.state.selectedMonth).year(this.state.currYear)
    //     }) 
    //     }
   // let mon = this.state.absoluteMonthVal ? this.state.absoluteMonthVal : this.state.month_val-1;
            this.Validate( this.state.currMonth,this.state.currYear);
            this.setState({
                week1count:0,
                week2count:0,
                week3count:0,
                week4count:0,
                week5count:0,
                week6count:0,
                // subarea:activeArea,
              
                moncount:0,
                tuecount : 0,
                wedcount : 0,
                thrcount : 0,
                fricount : 0,
                satcount : 0,
                suncount : 0,
                totalAmt:0,
            })
        
            this.getCustomHolidayList(this.state.currYear,this.state.currMonth,1,this.state.weekholiday)
        this.setState({
            dateContext:moment().month(this.state.selectedMonth).year(this.state.currYear)
        }) 


        let array = []  
        array.push(
            {
                Name:"",
                Type:"",
                code:""
            }
        )
        this.LoadSelectedSub(array, this.state.dateContext)
       
        
    }
    handleSearch(){
        let filteredSuggestions = []
        const value = event.target.value.toLowerCase();
        
        filteredSuggestions = this.props.patches.filter(
            suggestion => suggestion.Name.toLowerCase().indexOf(value) > -1
        );
        
        this.setState({
            filteredSuggestions:filteredSuggestions
        })
    }
    getWeekNumber(thisDate) {
        var dt = new Date(thisDate);
        var thisDay = dt.getDate();
        
        var newDate = dt;
        newDate.setDate(1); // first day of month
        var digit = newDate.getDay();
        
        var Q = (thisDay + digit) / 7;
        
        var R = (thisDay + digit) % 7;
        
        if (R !== 0) return Math.ceil(Q);
        else return Q;
    }
   
    redirectDayWise(nextdatecontext,day,month,year,area,mtpType){ 


       // alert(month)
        let wday = this.getWeekNumber(month+'/'+day+'/'+year);
        var mydate = year+'-'+month+'-'+day
        var weekDayName =  moment(mydate).format('dddd');
        localStorage.setItem("weekNo", wday)
        localStorage.setItem("weekday", weekDayName)
        localStorage.setItem("day", day)
        localStorage.setItem('month',month)
        localStorage.setItem('year',year)
        localStorage.setItem('monthCode',this.state.month_val)
        localStorage.setItem('areaCode',this.state.areacode)
        localStorage.setItem('selectedarea',this.state.activeArea)
        localStorage.setItem('selectedareaType',this.state.activeAreaType)
        localStorage.setItem('mtpLock',this.state.mtpLocked)
        localStorage.setItem('nextdateContext',nextdatecontext)
        localStorage.setItem('mtpType',mtpType)
        if(this.state.stpflag==true){
            //alert(this.state.stpflag)
            if(this.state.stpflag==true){
                this.setState({
                    showStatusModal:true,
                    msg:'SFC Details Not Entered For The Period. Please Contact Admin.',
                    success:true
                })
                return
            }
        }

        if(this.state.areacode){ 
            let c_mon = this.state.dateContext.month()+1
         let d = new Date(year,c_mon,day);
        day = d.getDate() < 10 ? '0'+d.getDate() : d.getDate()
       // let smon = this.state.month_val
        let smon = d.getMonth() < 10 ? '0'+d.getMonth() : d.getMonth()
        let date  = smon+'/'+day+'/'+d.getFullYear();
        let pdate  = smon+'/'+d.getDate()+'/'+d.getFullYear();
        if(c_mon<10){
            c_mon='0'+c_mon
        }
        // if(day<9){
        //     day=day
        // }
        let formatdate =   year+'-'+ c_mon+'-'+day; //d.getFullYear()+'-'+ smon+'-'+day;
        let count = true
        let pmsg 
        let mtpAllowDateArray =[]
        // console.log(  year,c_mon,day, formatdate, this.state.fromMtpdate,this.state.toMtpdate,'okooko')
        mtpAllowDateArray = this.getMTPAllowedDateArray(this.state.fromMtpdate,this.state.toMtpdate);
        if(mtpAllowDateArray.indexOf(formatdate) > -1){
            //if(this.state.mtpflagval == 0){
              //  let duplicateDate = this.find_duplicate_in_array(this.state.mtpAllowedDate);console.log("duplicateDate",duplicateDate)
                this.state.mtpAllowedDate ? this.state.mtpAllowedDate.map((item)=>{ 
                   
                    if(item.TYP == 'H'){
                        if(date.trim() == item.D_DATE.trim()){
                            count = false
                            pmsg = 'This day is Holiday...Do you want to continue ?'
                            return
                        }
                        
                    }else{
                        let d = new Date(item.D_DATE);
                        if(date.trim() == item.D_DATE.trim()){
                            if(this.state.holidayList[d.getDate()]){ 
                                count = false
                                pmsg = 'This day is Holiday...Do you want to continue ?'
                                return
                            }
                        }
                        if(date.trim() == item.D_DATE.trim()){
                            count = false
                            pmsg = 'You are on Leave...Do you want to continue ?'
                            return
                        }
                    }
                }): null
                this.state.customfulldate ? this.state.customfulldate.map((ddate)=>{ 
                    if(pdate.trim() == ddate.trim()){
                        count = false
                        pmsg = 'This day is weekly holiday. Do you want to continue ?'
                        return
                    }
                }): null
                if(count == false){ 


               if( this.state.mtpflagval=="1"){

                this.setState({
                    showStatusModal:true,
                    msg:"MTP Not Allowed",
                    success:false
                })
                
               }else{
                    this.setState({
                        mtpAllowedFlag:true,
                        mtpAllowedmsg:pmsg
                        
                    })
                }
                }else{ 
                    this.props.history.push('/day-wise-tp-template')
                }
           
        }else{

           
            this.setState({
                showStatusModal:true,
                msg:"MTP Not Allowed",
                success:false
            })
        }
   // }
    }else{
        this.setState({
            showStatusModal:true,
            msg:'Please select patch',
            success:false
        })
    }
        
    }
    getMTPAllowedDateArray(startdate,enddate){
        var dateArray = [];
        var currentDate = moment(startdate);
        var stopDate = moment(enddate);
    //  console.log(currentDate , stopDate,'kunal sinha',currentDate <= stopDate)
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(1, 'days');
        }
      
        return dateArray
    }
    loadStp(){


        var load =  {"Data": {"Month": this.state.month_val.toString(),"Year":this.state.currYear.toString()},"index": "MTP_Load_from_Stp","Token": "","menuid":"38"}
        postToServer("MTP",load).then( (Result)=>{ 
            if(Result.data){ 
               
                let array = []  
        array.push(
            {
                Name:"",
                Type:"",
                code:""
            }
        )
        this.LoadSelectedSub(array, this.state.dateContext)
               
                this.Validate(this.state.month_val.toString(),this.state.currYear.toString())
                Result.data.map((item)=>{
                    Object.keys(item).map((key)=>{
                        this.setState({
                            
                            stpManMtpFlag:1,
                            showStatusModal:true,
                            msg:item[key],
                            success:true,
                            load: !this.state.load
                        })




                       
                      //  this.getCustomHolidayList(this.state.currYear.toString(),this.state.month_val.toString(),1,this.state.weekholiday)
                        
                        this.setState({
                            week1count:'0',
                            week2count:0,
                            week3count:0,
                            week4count:0,
                            week5count:0,
                            week6count:0,
                            moncount:0,
                            tuecount:0,
                            wedcount:0,
                            thrcount:0,
                            fricount:0,
                            satcount:0,
                            suncount:0,
                            totalAmt:0
                        })


                    })
                })
               
            }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        })
    }
    hideStatusModal(){
        this.setState({
            showStatusModal:false,
            
        })
    }
    deleteMtp(){
        const _this=this
          _this.setState({ 
            deleteConfirm: !_this.state.deleteConfirm,
            deleteConfmMsg:"You want to Delete TP",
            success:true,
        })
    }
    compareBy(key) {
        return function (a, b) {
          if (""+a[key]<(""+b[key])) return -1;
          if (""+a[key]>(""+b[key])) return 1;
          return 0;
        };}
    sort(key) {
        if(this.state.orderby == 'asc'){
            let arrayCopy = [...this.props.patches];
            arrayCopy.reverse(this.compareBy(key));
            const _this10 = this
            _this10.setState({
                sortpatches: arrayCopy,
                orderby:'dsc',
            });
        }else{
            let arrayCopy = [...this.props.patches];
            arrayCopy.sort(this.compareBy(key));
            //arrayCopy.reverse(); for descending
            this.setState({
                sortpatches: arrayCopy,
                orderby:'asc',
            });
        }
    }
    hideFlag(){
        this.setState({
            mtpAllowedFlag:!this.state.mtpAllowedFlag
        })
    }
    getFlagResponse(data){
        if(data == "yes"){
               
                    this.props.history.push('/day-wise-tp-template')
               
        }else{
            this.setState({
                mtpAllowedFlag:false
            })
        }
    }
    getCustomHolidayList(year,month,day,userholidayday){ 
    var date = new Date(year, month-1, day);;
    var month = date.getMonth();
    var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var lastDay = lastDayOfMonth.getDate();
    var array = []; 
    var fullarray =[] //dd/mm/yy
    let hdate ={}
    for (var i = 1; i <= lastDay; i++) {
        var temp = new Date(date.getFullYear(), month, i);
        var day = temp.getDay();
        if(userholidayday == 0){
            if (day == userholidayday) // Thursday
                {
                var dd = temp.getDate();
                    var mm = temp.getMonth() + 1;
                    var mm0 = ('0' + mm.toString());
                    mm0 = mm0.length == 3 ? mm0.substring(1, 3) : mm0;
                    var dd0 = ( dd.toString());
                    dd0 = dd0.length == 3 ? dd0.substring(1, 3) : dd0;
                    var yyyy = temp.getFullYear();
                    hdate[dd0] = "weekholiday"
                    array.push(dd0)
                    fullarray.push(mm0+'/'+dd0+'/'+yyyy)
                }
            }else{
                userholidayday.map((item)=>{
                if (day == item.code) // Thursday
                {
                    var dd = temp.getDate();
                    var mm = temp.getMonth() + 1;
                    var mm0 = ('0' + mm.toString());
                    mm0 = mm0.length == 3 ? mm0.substring(1, 3) : mm0;
                    var dd0 = ( dd.toString());
                    dd0 = dd0.length == 3 ? dd0.substring(1, 3) : dd0;
                    var yyyy = temp.getFullYear();
                    hdate[dd0] = "weekholiday"
                    array.push(dd0)
                    fullarray.push(mm0+'/'+dd0+'/'+yyyy)
                }
            })
        }
    }
  
    this.setState({
        customHdays:hdate,
        customfulldate:fullarray,
        
    })
      
    }
    hideDelete(){
        this.setState({
            showDelete:!this.state.showDelete
        })
        this.getAllUser('',this.state.dateContext)
    }
    getBtnResponse(data){

          const _this=this
        if(data == "yes"){
            let year = this.state.selectedYear ? this.state.selectedYear:this.state.currYear
            var data =  {"Data": {"Month": _this.state.month_val.toString(),"Year":year.toString()},"index": "MTP_Delete","Token": "","menuid":"38"}
            postToServer("MTP",data).then( (Result)=>{ 
                if(Result.data){ 

                    this.Validate(_this.state.month_val.toString(),year.toString())
                   // this.Validate(_this.state.month_val.toString(),year.toString())
                    Result.data.map((item)=>{
                        // Object.keys(item).map((key)=>{
                             //deletemsg = item[key]


                           if(item["status"]=="1"){
                             _this.setState({ 
                                deleteConfirm:!_this.state.deleteConfirm,
                                showDelete: !_this.state.showDelete,
                                deletemsg:item["Result"],
                                success:true,
                                showsubmit:false,showapprovel:false
                            })
                        }else{
                            _this.setState({ 
                                deleteConfirm:!_this.state.deleteConfirm,
                                showDelete: !_this.state.showDelete,
                                deletemsg:item["Result"],
                                success:true})
                            }
                      
                   
                   
                // })
            })
        }
                
            }).catch(  (Error)=> {  
                _this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
            }) 
        }else{
            _this.setState({
                deleteConfirm:!_this.state.deleteConfirm
            })
   
    }
}
    hideDeleteModal(){ 

        const _this=this
        _this.setState({
            deleteConfirm:!_this.state.deleteConfirm
        })
    }
    selectPatch(patch){
       this.getAllUser(patch,this.state.dateContext)
       this.setState({
            areacode:patch
       })
    }
     
    render() {
        let day = [{
        
    }]
    let weekdays = this.state.weekdays.map((day) => {
            return (
                <td key={day}>{day}</td>
            )
        });
        let short_weekdays = this.state.short_weekdays.map((day) => {
            return (
                <td key={day}>{day}</td>
            )
        });
        let blanks = [];
        if (this.firstDayOfMonth() >= 1) {
            for (let i = 0; i < this.firstDayOfMonth() - 1; i++) {
                blanks.push(
                    <td className="blank-boxes" key={i * 80}>{" "}</td>
                );
            }
        }
        if (this.firstDayOfMonth() < 1) {
            for (let i = -6; i < this.firstDayOfMonth(); i++) {
                blanks.push(
                    <td className="blank-boxes" key={i * 80}>{" "}</td>
                )
            }
        }

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            daysInMonth.push(
                <td key={d * 10} className="date-container">
                    {/* <div className={ this.state.customHdays ? this.state.customHdays[d] == "weekholiday" ? "leavebody":this.state.holidayList[d] == "holiday" ? 'holidayCon' : this.state.leaveList[d] == "leave" ? 'leaveday':  null: null}> */}
                    <div className={ this.state.leaveList[d] == "leave" ? 'leaveday': this.state.customHdays ? this.state.customHdays[d] == "weekholiday" ? "leavebody":this.state.holidayList[d] == "holiday" ? 'holidayCon' :   null: null}>
                    {/* <div>
                    {this.state.holidaylist ? this.state.holidaylist.map((item)=>( */}
                    {/* <div onClick={()=>this.redirectDayWise(d,this.state.dateContext.format("MMMM"),this.state.dateContext.format("Y"),this.state.subarea)} 
                        className={d == 8 && "leave-container" || d == holidayDate && "holiday-container" || "date-box"}></div> */}
                        <div onClick={()=>this.redirectDayWise(this.state.dateContext,d,this.state.dateContext.format("MMMM"),this.state.dateContext.format("Y"),this.state.subarea,this.props.mtpType)} 
                        className={ "date-box" }>
                            <div className="date">{d}</div>
                           
                                {this.state.validMonth ? this.state.validMonth.map((mon) =>(
                                    <div>
                                        {this.state.months.indexOf(this.month())+1 == mon.month ?
                                            <div>
                                                {this.state.allDay ? this.state.allDay.map((idata)=>( 
                                                    <div>
                                                        {d == idata.day ?
                                                             <div>
                                                             {this.state.tempdata ?
                                                             Object.keys(this.state.tempdata).map((item)=>(
                                                                 <div>
                                                                 {d == item ? 
                                                                     <UserDetails 
                                                                         item={item}
                                                                         chemistdata={this.state.chemistdata}
                                                                         docdata={this.state.doctordata}
                                                                         stockdata={this.state.stockistdata}
                                                                         otherdata={this.state.otherdata}
                                                                         tempdata={this.state.tempdata[item]}
                                                                     />
                                                                   //  ))
                                                                 :null}
                                                                 </div>
                                                             ))
                                                        
                                                         : null}
                                                         </div>
                                                        : null}
                                                    </div>
                                                )): null}
                                            </div>
                                        :null}
                                    </div> 
                                )): null}  
                            </div>
                          {/* )): null} 
                   </div> */}
                   </div>
                </td>
            )
        }
        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];
        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            }
            else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });
       
        let dateElements = rows.map((d, i) => { 
            return (
                <tr key={i * 100}>{d}</tr>
            )
        })
        let monthdatas =  [
            {
                'key':'m1',
                'text':'January',
                'value':'1',
            },
            {
                'key':'m2',
                'text':'February',
                'value':'2',
            },
            {
                'key':'m3',
                'text':'March',
                'value':'3',
            },
            {
                'key':'m4',
                'text':'April',
                'value':'4',
            },
            {
                'key':'m5',
                'text':'May',
                'value':'5',
            },
            {
                'key':'m6',
                'text':'June',
                'value':'6',
            },
            {
                'key':'m7',
                'text':'July',
                'value':'7',
            },
            {
                'key':'m8',
                'text':'August',
                'value':'8',
            },
            {
                'key':'m9',
                'text':'September',
                'value':'9',
            },
            {
                'key':'m10',
                'text':'October',
                'value':'10',
            },
            {
                'key':'m11',
                'text':'November',
                'value':'11',
            },
            {
                'key':'m12',
                'text':'December',
                'value':'12',
            }
        ]
        let list = []
        
        let currentYear = new Date().getFullYear()
        let futureYear = parseInt(currentYear)+4
        let pastyear = parseInt(currentYear)-4
        let lastYear = parseInt(currentYear)-1
        let currentMonth =  new Date().getMonth()+1
        for (var i= lastYear ; i > pastyear ;i--) {
            list.push(
                {
                    'key':'year'+i,
                    'text':i,
                    'value':i,
                }
            );
            
        }
        list.reverse();
        for (var i= currentYear ; i < futureYear ;i++) {
            list.push(
                {
                    'key':'year'+i,
                    'text':i,
                    'value':i,
                }
            );
           
        }
        let pArray =[]
        this.props.patches?this.props.patches.map((item)=>{
            pArray.push(
                {
                    'key':item.code+"("+item.Type+")",
                    'text':item.Name+"("+item.Type+")",
                    'value':item.code,
                },
            )
        }): null

        return (
            <div className="mr-calender">
               
               <TourPlanDetail
             n_mtp_DoctorMandatory= { this.state.n_mtp_DoctorMandatory} 
               HIdeLoad={this.state.HIdeLoad}
               load={this.state.load}
                delete={ this.state.deleteConfirm }
                propsmethod1={this.ValidateAction}
                  propsmethod={this.Validate}
                  SelectedYear={ this.state.dateContext.year().toString()}
                  SelectedMonth={ (this.state.dateContext.month()+1).toString()}
                    dateContext={this.state.dateContext}
                    nextMonth={this.nextMonth}
                    prevMonth={this.prevMonth}
                    month ={this.month()}
                    year={this.year()}
                    sendApprov={this.sendApprov}
                    monthdatas={monthdatas}
                    list={list}
                    weekdays={weekdays}
                    short_weekdays={short_weekdays}
                    dateElements={dateElements}
                    week1count={this.state.week1count}
                    week2count={this.state.week2count}
                    week3count={this.state.week3count}
                    week4count={this.state.week4count}
                    week5count={this.state.week5count}
                    week6count={this.state.week6count}
                    patches={this.props.patches}
                    sortpatches={this.state.sortpatches}
                    stpflag={this.state.stpflag}
                    filteredSuggestions={this.state.filteredSuggestions}
                    LoadSelectedSub={this.LoadSelectedSub}
                    weekHoliday_name={this.state.weekHoliday_name}
                    moncount={this.state.moncount}
                    docMonCount={this.state.docMonCount}
                    stockistMonCount={this.state.stockistMonCount}
                    chemistMonCount={this.state.chemistMonCount}
                    otherMonCount={this.state.otherMonCount}
                    tuecount={this.state.tuecount}
                    showTuePopup={this.state.showTuePopup}
                    docTueCount={this.state.docTueCount}
                    stockistTueCount={this.state.stockistTueCount}
                    chemistTueCount={this.state.chemistTueCount}
                    otherTueCount={this.state.otherTueCount}
                    wedcount={this.state.wedcount}
                    docWedCount={this.state.docWedCount}
                    stockistWedCount={this.state.stockistWedCount}
                    chemistWedCount={this.state.chemistWedCount}
                    otherWedCount={this.state.otherWedCount}
                    thrcount={this.state.thrcount}
                    docThrCount={this.state.docThrCount}
                    stockistThrCount={this.state.stockistThrCount}
                    chemistThrCount={this.state.chemistThrCount}
                    otherThrCount={this.state.otherThrCount}
                    fricount={this.state.fricount}
                    docFriCount={this.state.docFriCount}
                    stockistFriCount={this.state.stockistFriCount}
                    chemistFriCount={this.state.chemistFriCount}
                    otherFriCount={this.state.otherFriCount}
                    satcount={this.state.satcount}
                    docSatCount={this.state.docSatCount}
                    stockistSatCount={this.state.stockistSatCount}
                    chemistSatCount={this.state.chemistSatCount}
                    otherSatCount={this.state.otherSatCount}
                    suncount={this.state.suncount}
                    docSunCount={this.state.docSunCount}
                    stockistSunCount={this.state.stockistSunCount}
                    chemistSunCount={this.state.chemistSunCount}
                    otherSunCount={this.state.otherSunCount}
                    deleteMtp={this.deleteMtp}
                    loadStp={this.loadStp}
                    dropSelectedMonth={this.dropSelectedMonth}
                    dropSelectedYear={this.dropSelectedYear}
                    selectedMonth={this.state.selectedMonth}
                    showCalander={this.showCalander}
                    StatusMsg={this.state.StatusMsg}
                    targetVsPlan={this.props.targetVsPlan}
                    mtpLocked={this.state.mtpLocked}
                    showapprovel={this.state.showapprovel}
                    showsubmit={this.state.showsubmit}
                    selectedYear={this.state.selectedYear}
                    HideAll={this.state.HideAll}
                    handleSearch={this.handleSearch}
                    activeAreaType={this.state.activeAreaType}
                    activeArea={this.state.activeArea}
                    selectPatch={this.selectPatch}
                    pArray={pArray}
                    totalAmt={this.state.totalAmt}
                    hosSatCount={this.state.hosSatCount}
                    hospitalMonCount ={this.state.hospitalMonCount}
                    hospitalTueCount={this.state.hospitalTueCount}
                    hospitalWedCount={this.state.hospitalWedCount}
                    hospitalThrCount={this.state.hospitalThrCount}
                    hospitalFriCount={this.state.hospitalFriCount}
                    hospitalSunCount={this.state.hospitalSunCount}
                />

     {/* <div className="targetMsg">  Remark :- STP details not exists for the period, please contact Admin</div> */}
                {this.state.stpflag == false ? 
                <div>
                {this.props.mtpType == "mr" ? 
                <div className="pt20">
                    <TargetVsPlanned    load={this.state.load}  targetVsPlan = {this.props.targetVsPlan} plan={this.props.plan} /> 
                    <DaysPlanned  load={this.state.load}  plandays={this.props.plandays} />
                </div>: null}
                </div>: 
                    <div className="targetMsg">STP details not exists for the period, please contact Admin</div>
                }
                <StatusPopup
                    message={this.state.msg}
                    show={this.state.showStatusModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
                />
            {this.state.successMsg == true && 
                <SuccessMsg   
                    tital={this.state.msg}
                   // msg={this.state.msg} 
                     Year={ this.state.dateContext.year().toString()}
                    Month={ (this.state.dateContext.month()+1).toString()}
                    success={this.onShowPopup}
                />  }
           {this.state.loderon== true ?     <Spinner></Spinner> :null}
           {this.state.Vloderon== true ?     <Spinner></Spinner> :null}
            <ConfirmationBox 
                show={this.state.mtpAllowedFlag}
                onClose={this.hideFlag}
                msg={this.state.mtpAllowedmsg}
                btnResponse={this.getFlagResponse}
            /> 
            <StatusPopup
                message={this.state.deletemsg}
                show={this.state.showDelete}
                onClose={this.hideDelete}
                success={this.state.success}
            />
             <ConfirmationBox 
                show={this.state.deleteConfirm}
                onClose={this.hideDeleteModal}
                msg={this.state.deleteConfmMsg}
                btnResponse={this.getBtnResponse}
            /> 
            </div>
        )
    }
}
const mapStateToProps = state => ({
    patches:state.MTP.patches,
    targetVsPlan:state.MTP.data,
    plan:state.MTP.plandata,
    plandays:state.MTP.plandays
})
const mapDispatchToProps = dispatch => ({
    getAreaPatchs:data => dispatch(getAreaPatchs(data)),
    getTargetData:data => dispatch(getTargetData(data)),
    getTargetPlan:data => dispatch(getTargetPlan(data)),
    getPlanned:data => dispatch(getPlanned(data)),
    
})

export default connect(mapStateToProps ,mapDispatchToProps)(withRouter(TourPlan));