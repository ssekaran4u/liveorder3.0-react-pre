import React, { Component } from 'react'
import { Row, Col, Accordion, Card, Tab, Nav } from 'react-bootstrap'
import { connect } from 'react-redux';
import {
    getMonthList,
    getDesignationList,
    getManagerProgress,
    getManagerSecondarySalesGraph,
    getManagerLeaderBoardData,
    getMyWorkDetails,
    getMyTeamWorkDetails,
    getDownCallAverageGraph,
} from '../../actions/ManagerDashboard'
import {
    getMontlyClaimData,
    getNonPerformingTableData,
    getMrCallAverageTable,
    getCallAverageGraph,
    getMrProgress
} from '../../actions/MrDashboard'

import {
    URL_MANAGER_UNCOVER_DOCTOR,
    URL_MANAGER_DOWN_CALL_AVERAGE,
    URL_MANAGER_SECONDARY_SALES_CHILD,
    URL_MANAGER_CLAIM_REPORT_CHILD,
    URL_MANAGER_WORKOVER_VIEW_CHILD
} from '../../lib/constants'

import { postToServer } from '../../lib/comm-utils'
import "../../../public/assets/css/bootstrap.min.css"
import "../../../public/assets/css/style.css"
import "../../../public/assets/css/responsive.css"
import "../../../public/assets/css/circle.css"
import "../../dashboard/components/dashboard.css"
import Footer from "../../landing-page/components/Footer";
import Dashboard from "../components/Dashboard";
import ManagerSecondrySales from '../components/ManagerSecondrySales'
import ActivityManger from "../../dashboard/components/ActivityManger";
import HierarchicalUncoveredDoctors from '../components/HierarchicalUncoveredDoctors'
import WorkOverview from '../components/WorkOverview'
import ManagerCallAverage from '../components/ManagerCallAverage'
import ManagerLeaderBoard from '../components/ManagerLeaderBoard'
import HierarchicalClaim from '../components/HierarchicalClaim'
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import {setApiState} from '../../actions/ManagerDashboard'
import {getuncoverdoctordata} from '../../actions/ManagerDashboard'
import {getCallAvgDownline} from '../../actions/ManagerDashboard'
import {getWorkViewDownline} from '../../actions/ManagerDashboard'
import {setSecState} from '../../actions/ManagerDashboard'
import {getTeamSalesReport} from '../../actions/ManagerDashboard'
import {setLeaderState} from '../../actions/ManagerDashboard'
import {setDropYear} from '../../actions/ManagerDashboard'
import {setTeamDropYear} from '../../actions/ManagerDashboard'

class ManagerDashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            headdata: [],
            uncoverdoc: [],
            callavgdown: [],
            secsales: [],
            claimchild: [],
            workchild: [],
            isFull: false,
            firstmonth:'',
            secondryCall:false,
            leaderBoardCall:false,
            apiResult:{progressbar:0,uncoverdoctor:0,callAvgTable:0,callAvgGraph:0,
                        callAvgDownline:0,mydetails:0,workViewTeam:0,workviewdownline:0,designationdata:0,monthClaimData:0,monthlist:0,
                        seccall:0}
        };
        this.handleView = this.handleView.bind(this);
        this.updatMy_workdetais = this.updatMy_workdetais.bind(this)
        this.getnextchild = this.getnextchild.bind(this)
        this.nextchildcallaverage = this.nextchildcallaverage.bind(this)
        this.nextchildsecondarysales = this.nextchildsecondarysales.bind(this)
        this.nextClaimChild = this.nextClaimChild.bind(this)
        this.workOverviewChild = this.workOverviewChild.bind(this)
        this.updateleaderboard = this.updateleaderboard.bind(this)
        this.yearWiseData = this.yearWiseData.bind(this)
        this.reportData = this.reportData.bind(this)
        this.getCallYeardata = this.getCallYeardata.bind(this)
        this.getSecondryGraph = this.getSecondryGraph.bind(this)
        this.getManagerProgressBarData = this.getManagerProgressBarData.bind(this)
        this.getHierarchicalDoctor = this.getHierarchicalDoctor.bind(this)
        this.getDetailDownline= this.getDetailDownline.bind(this)
        this.getDesignationData = this.getDesignationData.bind(this)
        this.getMonthlyClaim = this.getMonthlyClaim.bind(this)
        this.getMonthList = this.getMonthList.bind(this)
        this.getTeamSalesReportData = this.getTeamSalesReportData.bind(this)
        this.getWorkDetailsMonthly= this.getWorkDetailsMonthly.bind(this)
    }
    /* component full screen view function in clild component*/
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }

    getSelected(doctors, fscode) {
        for (let i = 0; i < doctors.length; i++) {
            if (doctors[i].FSCode == fscode)
                return doctors[i]
            if (doctors[i].nextLevel) {
                let d = this.getSelected(doctors[i].nextLevel, fscode)
                if (d)
                    return d
            }
        }
        return null
    }
//"Data":{ "year":"2019"}
    getnextchild(fscode) {
        let curryear = new Date().getFullYear()
        var data = {
            Index: "M_UncoveredDoctor",
            Data: { "FS": fscode,"year":curryear.toString()}
        }
        let selected = false

        let _this = this
        let { uncoverdoc } = this.state
        let d = _this.getSelected(uncoverdoc, fscode)
        if (d && d.nextLevel)
            return
        postToServer(URL_MANAGER_UNCOVER_DOCTOR, data)

            .then(resp => {
                // console.log(resp)
                if (resp.status == 200 ) {
                    let d = _this.getSelected(uncoverdoc, fscode)
                    if (d) {
                        d.nextLevel = resp.data.data
                        //  console.log(d.nextLevel)
                    }
                    else {
                        uncoverdoc = resp.data.data
                    }
                    this.setState({ uncoverdoc })
                }
            })
            .catch(error => { console.log(Error) })
    }

    /* function to get data for call average child call */
    nextchildcallaverage(month,fscode) { 
        // console.log(fscode, "onclick data fscode")
        var data = {
            Index: "M_CallAverage",
            Data: {
                Month: month,
                FS: fscode,"year":""
            }
        }
        //console.log(data,"data data")
        let selected = false

        let _this = this
        let { callavgdown } = this.state
        let d = _this.getSelected(callavgdown, fscode)
        if (d && d.nextLevel)
            return
        postToServer(URL_MANAGER_DOWN_CALL_AVERAGE, data)

            .then(resp => {
                //console.log("beforelist=>>",resp)
                if (resp.status == 200 ) {
                    //console.log("list=>>",resp)
                    let d = _this.getSelected(callavgdown, fscode)
                    if (d) {
                        d.nextLevel = resp.data.data
                    }
                    else {
                        callavgdown = resp.data.data
                    }
                    this.setState({ callavgdown })
                }
            })
            .catch(error => { console.log(Error) })
    }
    /* function to get data for secondary graph child call */
    nextchildsecondarysales(fscode, month,year) { 
        // console.log(fscode,month,"onclick data fscode")
        let curryear
    //     let monts  = new Date().getMonth()
    //     //console.log("month",monts)
    //    if(year == undefined){
    //         if(monts > 3){
    //             curryear = new Date().getFullYear()
    //         }else{
    //             curryear = new Date().getFullYear()-1
    //         }
    //     }else{
    //         curryear = year
    //     }
        var data = {
            Index: "TeamSalesReport",
            Data: {
                Month: month,
                FS: fscode,"year":''+year+''
            }
        }
        //console.log(data,"data data")
        let selected = false

        let _this = this
        let { secsales } = this.state
        let d = _this.getSelected(secsales, fscode)
        if (d && d.nextLevel)
            return
        postToServer(URL_MANAGER_SECONDARY_SALES_CHILD, data)

            .then(resp => {
                //console.log("beforelist=>>",resp)
                if (resp.status == 200 ) {
                    //console.log("list=>>",resp)
                    let d = _this.getSelected(secsales, fscode)
                    if (d) {
                        d.nextLevel = resp.data.data
                    }
                    else {
                        secsales = resp.data.data
                    }
                    this.setState({ secsales })
                }
            })
            .catch(error => { console.log(Error) })
    }
    /* function to get data for claim report child call */
    nextClaimChild(fscode) {
        let curryear = new Date().getFullYear()
        //console.log(fscode,"onclick data fscode")
        var data = {
            Index: "TeamClaimReport",
            Data: {
                Month: "",
                FS: fscode,"year":curryear.toString()
            }
        }
        //console.log(data,"data data")
        let selected = false
        let _this = this
        let { claimchild } = this.state
        let d = _this.getSelected(claimchild, fscode)
        if (d && d.nextLevel)
            return
        postToServer(URL_MANAGER_CLAIM_REPORT_CHILD, data)

            .then(resp => {
                //console.log("beforelist=>>",resp)
                if (resp.status == 200 ) {
                    //console.log("list=>>",resp)
                    let d = _this.getSelected(claimchild, fscode)
                    if (d) {
                        d.nextLevel = resp.data.data
                    }
                    else {
                        claimchild = resp.data.data
                    }
                    this.setState({ claimchild })
                }
            })
            .catch(error => { console.log(Error) })
    }
    /* function to get data for work overview call */
    workOverviewChild(fscode,month) {
        let curryear = new Date().getFullYear()
       // console.log(fscode,month,"onclick data fscode")
        var data = {
            Index: "WorkOverviewDownline",
            Data: {
                Month:month,
                FS: fscode,"year":curryear.toString()
            }
        }
        //console.log(data,"data data")
        let selected = false
        let _this = this
        let { workchild } = this.state
        let d = _this.getSelected(workchild, fscode)
        if (d && d.nextLevel)
            return
        postToServer(URL_MANAGER_WORKOVER_VIEW_CHILD, data)

            .then(resp => {
                //console.log("beforelist=>>",resp)
                if (resp.status == 200 ) {
                    //console.log("list=>>",resp)
                    let d = _this.getSelected(workchild, fscode)
                    if (d) {
                        d.nextLevel = resp.data.data
                    }
                    else {
                        workchild = resp.data.data
                    }
                    this.setState({ workchild })
                }
            })
            .catch(error => { console.log(Error) })
    }
    /* function  call getting leaderboard data*/
    updateleaderboard(month) {
        // console.log(month,"api hit month code")
        let currYear = new Date().getFullYear()
        var mr_leaderboard_data = {
            Index: "LeaderBoard",
            Data: { "Month": month,"year":currYear.toString() }
        }
        // console.log(mr_leaderboard_data,"api hit month code")
        this.props.displayLeaderBoardData(mr_leaderboard_data)
        this.setState({
            leaderBoardCall:true
        })
        this.props.setLeaderState(this.state.leaderBoardCall)
    }
    /*getting data fro work overview */
    updatMy_workdetais(month) {
        let curryear = new Date().getFullYear()
        var resDetails = this.state.apiResult
        resDetails['mydetails'] = 1 
        if(this.props.managerApiState == undefined){
            var my_Details = {
                index: 'MyDetails',
                Data: { "Month": month,"year":curryear.toString() }
            }
            this.props.displayMyWorkDetails(my_Details)
            this.props.setApiState(resDetails)
        }else{
            if(this.props.managerApiState['mydetails'] != 1){
                var my_Details = {
                    index: 'MyDetails',
                    Data: { "Month": month,"year":curryear.toString() }
                }
                this.props.displayMyWorkDetails(my_Details) 
                this.props.setApiState(resDetails)
            }
        }

        resDetails['workViewTeam']=1
        if(this.props.managerApiState == undefined){
            var team_work_details = {
                index: 'WorkOverVeiw_TeamWork',
                Data: { "Month": month ,"year":""}
            }
            this.props.displayTeamWorkDetails(team_work_details)
            this.props.setApiState(resDetails)
        }else{
            if(this.props.managerApiState['workViewTeam'] != 1){
                var team_work_details = {
                    index: 'WorkOverVeiw_TeamWork',
                    Data: { "Month": month ,"year":""}
                }
                this.props.displayTeamWorkDetails(team_work_details)
                this.props.setApiState(resDetails)
            }
            
        }
        var fscode =''
        resDetails['workviewdownline'] =1
        if(this.props.managerApiState == undefined){
           
            var data = {
                Index: "WorkOverviewDownline",
                Data: {
                    Month:month,
                    FS: fscode,"year":curryear.toString()
                }
            }
            this.props.getWorkViewDownline(data)
            this.props.setApiState(resDetails)
        }else{
            if(this.props.managerApiState['workviewdownline'] != 1){
                var data = {
                    Index: "WorkOverviewDownline",
                    Data: {
                        Month:month,
                        FS: fscode,"year":curryear.toString()
                    }
                }
                this.props.getWorkViewDownline(data)
                this.props.setApiState(resDetails)
            }
        }
        
        //this.workOverviewChild('',month)

    }
    /* Get data lazy load function*/
    getCallAverageData(month, fscode) { 
        // console.log('month->', month, 'code->', fscode)
        /* getting mananger call average data */
        var apires = this.state.apiResult
        apires['callAvgTable'] = 1
        if(this.props.managerApiState == undefined){
            var call_average_table = {
                Index: "call_average_table","Data":{ "year":""}
            }
    
            this.props.displayCallAverageTable(call_average_table)
            this.props.setApiState(apires)
        }else{
            if(this.props.managerApiState['callAvgTable'] != 1){
                var call_average_table = {
                    Index: "call_average_table","Data":{ "year":""}
                }
        
                this.props.displayCallAverageTable(call_average_table)
                this.props.setApiState(apires)
            }
           
        }
       
        /* getting mr call average graph data */
        apires['callAvgGraph'] = 1
        if(this.props.managerApiState == undefined){
            var call_average_graph = {
                Index: "call_average_graph","Data":{ "year":""}
            }
            this.props.displayCallAverageGraph(call_average_graph)
            this.props.setApiState(apires)
        }else{
            if(this.props.managerApiState['callAvgGraph'] != 1){
                var call_average_graph = {
                    Index: "call_average_graph","Data":{ "year":""}
                }
                this.props.displayCallAverageGraph(call_average_graph)
                this.props.setApiState(apires)
            }
        }
        
        /*downline call average graph*/
        apires['callAvgDownline'] = 1
        if(this.props.managerApiState == undefined){
            var down_call_average_graph = {
                Index: "M_CallAverage",
                Data: {
                    Month: month,
                    FS: fscode,"year":""
                }
            }
            this.props.displayDownCallAverageGraph(down_call_average_graph)
            this.props.setApiState(apires)
        }else{
            if(this.props.managerApiState['callAvgDownline'] != 1){
                var down_call_average_graph = {
                    Index: "M_CallAverage",
                    Data: {
                        Month: month,
                        FS: fscode,"year":""
                    }
                }
                this.props.displayDownCallAverageGraph(down_call_average_graph)
            this.props.setApiState(apires)  
            }
        }
       

        /* getting child for callaverage doctor data*/
       // this.nextchildcallaverage(month,fscode);
    //    var d = new Date();
    //    if(month == ""){
    //        month = d.getMonth()+1
    //    }else{
    //        month = month
    //    }
       this.getDetailDownline(month,"")
    }
    getLeaderBoardDataLazy() {
        /* getting leaderboard data*/
        this.updateleaderboard('')   
    }
    componentDidMount() {
        let k= localStorage.getItem("type")


        let loginUser= localStorage.getItem("loginUser")
        if(loginUser==undefined || loginUser ==null){
            loginUser= sessionStorage.getItem("loginUser")
        }
        if(loginUser=="MKT"){
            this.props.history.push('/DefaultDashboard');
            return  
        }

        if(k==undefined  ||  k==null ){

            k= sessionStorage.getItem("type")
            }
    
            if(k==undefined  ||  k==null || k=="0"  ){
              
    
               this.props.history.push('/DefaultDashboard');
               return
            }else{
        if(k == "1"){
         //   console.log("test",window.location.pathname);
            if(window.location.pathname != "/dashboard"){ 
            this.props.history.push('/dashboard');
            return
            }
        }
        
        if(k=="3"){
          //  console.log("test",window.location.pathname);
            if(window.location.pathname != "/adashboard"){ 
            this.props.history.push('/adashboard');
            return
            }

           
        }
    }
        // var d = new Date();
       
        // var  month = d.getMonth()+1
      
        this.getDetailDownline("","")
        
        /* getting mr progress data */
        // var data = {
        //     Index: "MainValue","Data":{ "year":"2019"}
        // }
        // this.props.displayMrProgress(data)
        
        /* get month list */
            this.getMonthList()

        /* get designation list to*/
        this.getDesignationData()

        /* getting manager progress data */
        // var data = {
        //     Index: "MainValue","Data":{ "year":"2019"}
        // }
        // this.props.displayManagerProgress(data)
        this.getManagerProgressBarData()

        /*getting secondary sales data*/
        // var manager_secondry_graph = {
        //     Index: "secondry_graph","Data":{ "year":""}
        // }
        // this.props.displaySecondarySalesGraph(manager_secondry_graph)

        /* getting managerclaim data */
        this.getMonthlyClaim()

        /* getting manager non_performing data */
        // var non_performing = {
        //     Index: "NonPerformingProducts","Data":{ "year":"2019"}
        // }
        // this.props.displayNonPerformingTable(non_performing)
       
        /* getting uncovered doctor data*/
        // this.getnextchild('')
        this.getHierarchicalDoctor('')
       
        /*getting data for team work graph */
        //this.updatTeamWork_workdetais('')  
       
        /* getting child for secondary sales data */
       // this.nextchildsecondarysales('', '');
        /* getting claim report child */
       // this.nextClaimChild('');
        /*getting data fro work overview */
        this.updatMy_workdetais('')
        /* getting claim report child */
        //this.workOverviewChild('','');
        

    }
    yearWiseData(year){ 
        this.props.displaySecondarySalesGraph('year')
        var manager_secondry_graph = {
            Index: "secondry_graph","Data":{ "year":''+year+''}
        }
        this.props.displaySecondarySalesGraph(manager_secondry_graph)
        this.props.setDropYear(year)
    }
    reportData(fscode,month,year){
        var data = {
            Index: "TeamSalesReport",
            Data: {
                Month: month,
                FS: '',
                "year":''+year+''
            }
        }
        this.props.getTeamSalesReport(data)
        //console.log(data,"data data")
        // let selected = false

        // let _this = this
        // let { secsales } = this.state
        // let d = _this.getSelected(secsales, fscode)
        // if (d && d.nextLevel)
        //     return
        // postToServer(URL_MANAGER_SECONDARY_SALES_CHILD, data)

        //     .then(resp => {
        //         //console.log("beforelist=>>",resp)
        //         if (resp.status == 200 ) {
        //             console.log("list=>>",resp)
        //             let d = _this.getSelected(secsales, fscode)
        //             if (d) {
        //                 d.nextLevel = resp.data.data
        //             }
        //             else {
        //                 secsales = resp.data.data
        //             }
        //             this.setState({ secsales })
        //         }
        //     })
        //     .catch(error => { console.log(Error) })
            this.props.setTeamDropYear(year)
    }
    getCallYeardata(year){
        this.props.displayCallAverageGraph('year')
        var call_average_graph = {
            Index: "call_average_graph","Data":{ "year":''+year+''}
        }
        this.props.displayCallAverageGraph(call_average_graph)
    }
    getSecondryGraph(){ 
        let curryear  = new Date().getFullYear()
        let currMon =  new Date().getMonth()+1
        var manager_secondry_graph = {
                    Index: "secondry_graph","Data":{ "year":curryear.toString()}
                }
                this.props.displaySecondarySalesGraph(manager_secondry_graph)
                // this.nextClaimChild('');
              //  this.nextchildsecondarysales('','','')
             // this.getTeamSalesReportData("","","")
             this.getTeamSalesReportData(currMon,"",curryear)
        this.setState({
            secondryCall:true
        })
        //console.log("secondryCall1",this.state.secondryCall)
        this.props.setSecState("A")

       
    }
    getManagerProgressBarData(){
        let curryear = new Date().getFullYear()
        var apiResult = this.state.apiResult
        apiResult["progressbar"] = 1
        if(this.props.managerApiState == undefined){
            var data = {
                Index: "MainValue","Data":{ "year":curryear.toString()}
            }
            this.props.displayMrProgress(data)
            this.props.setApiState(apiResult)
        }else{ 
            if(this.props.managerApiState['progressbar'] != 1){
                var data = {
                    Index: "MainValue","Data":{ "year":curryear.toString()}
                }
                this.props.displayMrProgress(data)
                this.props.setApiState(apiResult)
            }
        }
       
    }
    getHierarchicalDoctor(fscode){
        let currYear = new Date().getFullYear()
        var apiResult = this.state.apiResult
        apiResult["uncoverdoctor"] =1
        if(this.props.managerApiState == undefined){
            var data = {
                Index: "M_UncoveredDoctor",
                Data: { "FS": fscode,"year":currYear.toString()}
            }
            this.props.displayUncoverDoctor(data)
            this.props.setApiState(apiResult)
        }else{
            if(this.props.managerApiState['uncoverdoctor'] != 1){
                var data = {
                    Index: "M_UncoveredDoctor",
                    Data: { "FS": fscode,"year":currYear.toString() }
                }
                this.props.displayUncoverDoctor(data)
                this.props.setApiState(apiResult)
            }
        }
        
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let update = {};
        
            if (prevState.workdownline !== nextProps.workdownline)
            // return { ...prevState, update.workchild: nextProps.workdownline };
            update.workchild = nextProps.workdownline
        
        
            if (prevState.data_uncover_doctor !== nextProps.data_uncover_doctor)
            // return { ...prevState, update.uncoverdoc: nextProps.data_uncover_doctor };
            update.uncoverdoc = nextProps.data_uncover_doctor

            if (prevState.callavgdownline !== nextProps.callavgdownline)
            console.log("next",nextProps.callavgdownlinedata)
            // return { ...prevState, callavgdown: nextProps.callavgdownline };
            update.callavgdown = nextProps.callavgdownlinedata

            if (prevState.teamsalesRep !== nextProps.teamsalesRep)
            //console.log("next",nextProps.teamsalesRep)
            // return { ...prevState, callavgdown: nextProps.callavgdownline };
            update.secsales = nextProps.teamsalesRep

            
        return update

      
        // return null;
    }
    getDetailDownline(month,fscode){  
        var apires = this.state.apiResult
        apires['callAvgDownline'] = 1
        if(this.props.managerApiState == undefined){
            var data = {
                Index: "M_CallAverage",
                Data: {
                    Month: month,
                    FS: fscode,"year":""
                }
            }
            this.props.getCallAvgDownline(data)
            this.props.setApiState(apires)
        }else{
            if(this.props.managerApiState['callAvgDownline'] != 1){
                var data = {
                    Index: "M_CallAverage",
                    Data: {
                        Month: month,
                        FS: fscode,"year":""
                    }
                }
                this.props.getCallAvgDownline(data)
                this.props.setApiState(apires)
            }
        }
        
    }
    getDesignationData(){
        let currryear = new Date().getFullYear()
        var apiResult = this.state.apiResult
        apiResult['designationdata'] =1
        if(this.props.managerApiState == undefined){
            var all_designation_list = {
                Index: "Designation","Data":{ "year":currryear.toString()}
            }
            this.props.displayDesignationList(all_designation_list)
            this.props.setApiState(apiResult)
        }else{
            if(this.props.managerApiState['designationdata'] != 1){
                var all_designation_list = {
                    Index: "Designation","Data":{ "year":currryear.toString()}
                }
                this.props.displayDesignationList(all_designation_list)
                this.props.setApiState(apiResult)
            }
        }
        
    }
    getMonthlyClaim(){
        let curryear = new Date().getFullYear()
        var resDetails = this.state.apiResult
        resDetails['monthClaimData'] = 1
        if(this.props.managerApiState == undefined){
            var monthly_claim = {
                Index: "monthlyclaim","Data":{ "year":curryear.toString()}
            }
            this.props.displayMontlyClaim(monthly_claim)
            this.props.setApiState(resDetails)
        }else{
            if(this.props.managerApiState['monthClaimData'] != 1){
                var monthly_claim = {
                    Index: "monthlyclaim","Data":{ "year":curryear.toString()}
                }
                this.props.displayMontlyClaim(monthly_claim)
                this.props.setApiState(resDetails)
            }
        }
       
    }
    getMonthList(){
        var resDetails = this.state.apiResult
        resDetails['monthlist'] =1
        if(this.props.managerApiState == undefined){
            var all_month_list = {
                Index: "MonthView","Data":{ "year":""}
            }
            this.props.displayMonthList(all_month_list)
            this.props.setApiState(resDetails)
        }else{
            if(this.props.managerApiState['monthlist'] != 1){
                var all_month_list = {
                    Index: "MonthView","Data":{ "year":""}
                }
                this.props.displayMonthList(all_month_list)
                this.props.setApiState(resDetails)
            }
        }
        
    }
    getTeamSalesReportData(month,fscode,year){
        var data = {
            Index: "TeamSalesReport",
            Data: {
                Month: month.toString(),
                FS: fscode,"year":''+year+''
            }
        }
        this.props.getTeamSalesReport(data)
    }
    getWorkDetailsMonthly(month,fscode){
        let curryear = new Date().getFullYear()
        var my_Details = {
            index: 'MyDetails',
            Data: { "Month": month,"year":"" }
        }
        this.props.displayMyWorkDetails(my_Details)
        var team_work_details = {
            index: 'WorkOverVeiw_TeamWork',
            Data: { "Month": month ,"year":""}
        }
        this.props.displayTeamWorkDetails(team_work_details)
        var data = {
            Index: "WorkOverviewDownline",
            Data: {
                Month:month,
                FS: fscode,"year":curryear.toString()
            }
        }
        this.props.getWorkViewDownline(data)
    }

    render() { 
        let firstMonth
        let  monthCode
        if(this.props.manager_month_list){
         //   this.props.manager_month_list.map((item) =>{ 
            firstMonth = this.props.manager_month_list[0].Name
            monthCode = this.props.manager_month_list[0].Code
            
         //   })
        }
        
         //console.log("sumeetkumarsingh", this.state.callavgdown)
        const { uncoverdoc } = this.state
        const { callavgdown } = this.state
        const { secsales } = this.state
        const { claimchild } = this.state
        const { workchild } = this.state
      
        // console.log("listcc>> ",secsales)
        return (
            <div className="dashboard-sec">
                <div className="dashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <Dashboard progressbardata={this.props.data}
                            />
                            <ManagerCallAverage
                                month_list={this.props.manager_month_list}
                                designation_list={this.props.manager_designation_list}
                                data={this.props.data_call_average_table}
                                graphdata={this.props.show_CallAverageGraph_Data}
                                totalcalls={this.props.data}
                                downlinedata={this.props.show_Downline_CallAverageGraph_Data}
                                callavgdowndata={callavgdown}
                                nextchildcallaverage={this.nextchildcallaverage}
                                getData={this.getCallAverageData.bind(this)}
                                getyeardata={this.getCallYeardata}
                                // forfilter={this.getCallAverageData.bind(this)}
                            />
                            
                            <Row className="">
                                <Col xl={12} md={12} sm={12} xs={12} className="paddr10">
                                    <div className={this.state.isFull ? "fullscreenView" : "ucdoctorsecondrow-first small-component"}>
                                        <div className="manager_component_head">
                                            <div className="manager_mainhead">
                                                <div className="mainhead_content_one bartitle">
                                                    Hierarchical Uncovered Doctors
                                            </div>
                                            </div>
                                            <div className="manager_component_head_icon">
                                                <div>
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

                                                </div>
                                            </div>
                                        </div>
                                        <div className="below-head-content">
                                            <div className="border-container">
                                                <div className="managerdash_hierarchical_container">
                                                    <HierarchicalUncoveredDoctors
                                                        uncoverdata={uncoverdoc}
                                                        // uncoverdata={uncoverdoc ? uncoverdoc : this.props.data_uncover_doctor}
                                                        getnextchild={this.getnextchild}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Col>
                                {/* <HierarchicalClaim
                                    datagraph={this.props.show_displayMontlyClaim_Data}
                                    data={claimchild}
                                    nextClaimChild={this.nextClaimChild}

                                /> */}
                            </Row>
                            <ManagerSecondrySales
                                month_list={this.props.manager_month_list}
                                defaultMonth ={firstMonth}
                                defaultCode={monthCode}
                                secondarygraph={this.props.manager_seconadry_graph}
                                secsales={secsales}
                                nextchildsecondarysales={this.nextchildsecondarysales}
                                yearWiseData={this.yearWiseData}
                                yearWiseReportData={this.reportData}
                                secondryCall={this.props.secondrygData != undefined ? this.props.secondrygData :this.state.secondryCall}
                                getSecondryGraph={this.getSecondryGraph}
                                salesYear={this.props.salesYear}
                                teamYearData={this.props.teamYearData}
                                getTeamSalesReportMonthly={this.getTeamSalesReportData}
                            />
                            <ManagerLeaderBoard
                                month_list={this.props.manager_month_list}
                                data={this.props.show_data_leaderboard_Data}
                                updateleaderboard={this.updateleaderboard}
                                getLeaderBoardDataLazy={this.getLeaderBoardDataLazy.bind(this)}
                                leaderBoardCall={this.props.leaderboardState != undefined ? this.props.leaderboardState : this.state.leaderBoardCall}
                                salesYear={this.props.salesYear}
                            />
                            <WorkOverview 
                            month_list={this.props.manager_month_list}
                            nonperforming={this.props.show_data_Nonperforming_Data}
                            my_work_detail={this.props.show_My_WorkDetails_Data}
                            updatMy_workdetais={this.updatMy_workdetais}
                            teamwork_detail={this.props.show_My_Team_WorkDetails_Data}
                            data={workchild}
                            workOverviewChild={this.workOverviewChild}
                            getWorkDetailsMonthly={this.getWorkDetailsMonthly}
                            // getLeaderBoardDataLazy={this.getLeaderBoardDataLazy.bind(this)}
                            />
                            <Footer />
                        </div>
                    </div>

                </div>
                <div>
                    <ActivityManger />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    data: state.MRDashboard.data,
    manager_month_list: state.ManagerDashboard.monthlist,
    manager_designation_list: state.ManagerDashboard.designationlist,
    manager_seconadry_graph: state.ManagerDashboard.manager_secondary_graph,
    show_displayMontlyClaim_Data: state.MRDashboard.data_Monthlyclaim_Data,
    show_data_Nonperforming_Data: state.MRDashboard.data_Nonperforming_Data,
    data_call_average_table: state.MRDashboard.data_call_average_table,
    data_uncover_doctor:state.ManagerDashboard.manager_uncover_doctor,
    show_data_leaderboard_Data: state.ManagerDashboard.data_leaderboard_Data,
    show_My_WorkDetails_Data: state.ManagerDashboard.manager_my_workdetails,
    show_My_Team_WorkDetails_Data: state.ManagerDashboard.manager_my_teamworkdetails,
    show_CallAverageGraph_Data: state.MRDashboard.data_call_average_graph_Data,
    show_Downline_CallAverageGraph_Data: state.ManagerDashboard.manager_down_callaverage,
    managerApiState:state.ManagerDashboard.managerApiState,
    callavgdownlinedata:state.ManagerDashboard.callavgdownline,
    workdownline:state.ManagerDashboard.workdownline,
    secondrygData:state.ManagerDashboard.secondrygData,
    teamsalesRep:state.ManagerDashboard.teamsalesRep,
    leaderboardState:state.ManagerDashboard.leaderboardState,
    salesYear:state.ManagerDashboard.salesYear,
    teamYearData:state.ManagerDashboard.teamYearData
})
const mapDispatchToProps = dispatch => ({
    displayMrProgress: data => dispatch(getMrProgress(data)),
    displayMonthList: data => dispatch(getMonthList(data)),
    displayDesignationList: data => dispatch(getDesignationList(data)),
    displayManagerProgress: data => dispatch(getManagerProgress(data)),
    displaySecondarySalesGraph: data => dispatch(getManagerSecondarySalesGraph(data)),
    displayMontlyClaim: data => dispatch(getMontlyClaimData(data)),
    displayNonPerformingTable: data => dispatch(getNonPerformingTableData(data)),
    displayCallAverageTable: data => dispatch(getMrCallAverageTable(data)),
    displayUncoverDoctor:data => dispatch(getuncoverdoctordata(data)),
    displayLeaderBoardData: data => dispatch(getManagerLeaderBoardData(data)),
    displayMyWorkDetails: data => dispatch(getMyWorkDetails(data)),
    displayTeamWorkDetails: data => dispatch(getMyTeamWorkDetails(data)),
    displayCallAverageGraph: data => dispatch(getCallAverageGraph(data)),
    displayDownCallAverageGraph: data => dispatch(getDownCallAverageGraph(data)),
    setApiState:data =>dispatch(setApiState(data)),
    getCallAvgDownline:data=>dispatch(getCallAvgDownline(data)),
    getWorkViewDownline:data=>dispatch(getWorkViewDownline(data)),
    setSecState:data=>dispatch(setSecState(data)),
    getTeamSalesReport:data=>dispatch(getTeamSalesReport(data)),
    setLeaderState:data=>dispatch(setLeaderState(data)),
    setDropYear:data=>dispatch(setDropYear(data)),
    setTeamDropYear:data=>dispatch(setTeamDropYear(data))
})

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(ManagerDashboard));