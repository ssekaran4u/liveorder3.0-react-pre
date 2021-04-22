/*
* This code will display MrProgress,UncoveredDoctors,call_average_table,call_average_graph,NonPerformingTable,monthly_claim,mr_secondry_graph,inside MainDashboard
* Request URL=url/USerinfo
* Index=Basicinfo
* Request string={"index":"Basicinfo","Result":"0","TableName":"","ColumnName":"","Data":[{"doc":"","year":"","month":"","Result":"1"}],"Token":""}
* Response string={
    C_Add_1	:"TAMLUK WORK NO 18"
    C_Add_2:"DIST PURBA MEDINIPURE"
    C_Add_3:"PIN NO"
    C_Add_4:"WEST BENGAL"
    C_Area_Code:"A00177"
    C_Category:""	
    C_Code:"PSR010"
    C_Desc:""
    C_Email_ID:""	
    C_EmpNo:"0203"
    C_Fax:""
    C_Grade:""
    C_Name:"SOURINDRA KUMAR DINDA"
    C_Parent:"AM0019"
    C_Phone:""
    C_Pin:""	
    C_Qualification:""	
    D_DOB:"1960-08-29T00:00:00Z"
    D_DOJ:"1985-06-18T00:00:00Z"
    D_DOW:"1900-01-01T00:00:00Z"
    N_Type:"1"
    N_ptype:"2"
    c_div_code:"DI0001"
    c_modifier:"admin"
    d_created:"2018-01-10T18:01:43.57Z"
    d_modified:"2018-03-29T12:34:48.02Z"
    n_Status :"0"
    n_deleted:"0"
* Response Error={}



*Request URL=url/Dashboardpage
*Index=MainValue
*Request string={"Index":"MainValue","Token":""}
*Response string={
   claim:0%
   coverage:48%
   primary_target:0
   total_primary:1023053
}
*Response Error={}



*Request URL=url/Dashboardpage
*Index=UncoveredDoctor
*Request string={"Index":"UncoveredDoctor","Token":""}
*Response string={
  C_Code:"D026409"
  Category:"GENERAL PHYSICIAN"
  DrName:"A. K. GANTAIT"
  Sub_Area:"KESHAPAT"
  dt:""	
}
*Response Error={}





*Request URL=url/Dashboardpage
*Index=call_average_table
*Request string={"Index":"call_average_table","Data":{"Year":"2019","Month":"08"},"Token":""}
*Response string={
  DR.Grade:ELITE
  DR.Name:B.K. AUDDY
  No Of Call Made:3
  No Of Meeting:3
  Pending Call:0
  Status:Completed
}
*Response Error={}






*Request URL=url/Dashboardpage
*Index=call_average_graph
*Request string={"Index":"call_average_graph","Token":""}
*Response string={
  CallAverage:6
  CoredoctorVisit:147
  disp:Jan
}
*Response Error={}




*Request URL=url/Dashboardpage
*Index=NonPerformingProducts
*Request string={"Index":"NonPerformingProducts","Token":""}
*Response string={
  Status:Success
  Status_Message:None
  data:null
}
*Response Error={}




*Request URL=url/Dashboardpage
*Index=monthlyclaim
*Request string={"Index":"monthlyclaim","Token":""}
*Response string={
 claim:0.00
 code:1
 disp:Jan
 sale:238292.50
}
*Response Error={}




*Request URL=url/Dashboardpage
*Index=secondry_graph
*Request string={"Index":"secondry_graph","Token":""}
*Response string={
 code:1
 disp:Jan
 primarydata:0.00
 secdata:205870.22
 targetdata:0.00
}
*Response Error={}


*/




import React, { Component } from "react";
import { connect } from 'react-redux';
import { postToServer } from '../../lib/comm-utils'
import { 
    getMrProgress, 
    getMrCallAverageTable, 
    getUnCoverDoctorData, 
    getNonPerformingTableData,
    getMontlyClaimData, 
    getCallAverageGraph,
    getSecondarySalesGraph,
    getLeaderBoardData } from '../../actions/MrDashboard'

import MrProgess from "./MrProgress";
import UncoveresDoctors from "./UnCoveredDoctors";
import LeastFocus from "./LeastFocus";
import LeaderBoard from "./LeaderBoard";
import SecondarySales from "./SecondarySales";
import CallAverage from "./CallAverage";
import Footer from "../../landing-page/components/Footer";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";
import "../../../public/assets/css/circle.css";
import "./dashboard.css";
import { withRouter } from "react-router";
import {setSecondryValue} from '../../actions/MrDashboard'
import {setApiCallStatus} from '../../actions/MrDashboard'
import {setYear} from '../../actions/MrDashboard'
import {setSecondrySalesYear} from '../../actions/MrDashboard'

class MainDashboard extends Component {
    constructor() {
        super();
        this.state = {
            isFull: false,
            activeTab: "1",
            data: [],
            headdata: {},
            selecteddateleaderboard:'',
            secondryCall:false,
            UncoverDocCall:false,
            uncover:false,
            callavg:0,
            callavgTable:0,
            apidata : {callAvg:0,callavgTable:0,uncoverdoc:0,monthlyClaim:0,progressVal:0}

        };
        this.handleView = this.handleView.bind(this);
        this.addclass = this.addclass.bind(this);
        // this.updateleaderboard = this.updateleaderboard.bind(this);
        this.yearlySecGraph= this.yearlySecGraph.bind(this)
        this.getYearData= this.getYearData.bind(this)
        this.getcallAvgtableYeardata = this.getcallAvgtableYeardata.bind(this)
        this.getSecondryGraph= this.getSecondryGraph.bind(this)
        this.getUncoverdoctor= this.getUncoverdoctor.bind(this)
        this.monthlyClaim = this.monthlyClaim.bind(this)
        this.getProgressbarData = this.getProgressbarData.bind(this)
       // this.getallapi = this.getallapi.bind(this)
    }
    /* component full screen view function*/
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
    addclass(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
     /* function  call getting leaderboard data*/
    // updateleaderboard(month){
    //     this.setState({
    //         selecteddateleaderboard:month
    //     })
    //     var mr_leaderboard_data={
    //         Index :"LeaderBoard",
    //         Data :{"Month":month}
    //         }
    //         this.props.displayLeaderBoardData(mr_leaderboard_data)  
    // }

    getCallAverageData() {
        let currYear = new Date().getFullYear()
        var apidata =  this.state.apidata
        apidata["callavgTable"]=1
        if(this.props.apiResultState == undefined){
            var call_average_table={
                Index :"call_average_table",  "Data":{ "year":currYear.toString()}
            }
            this.props.displayCallAverageTable(call_average_table)
            this.props.setApiCallStatus(apidata)
        }else{
            if(this.props.apiResultState["callavgTable"] != 1){
                var call_average_table={
                    Index :"call_average_table",  "Data":{ "year":currYear.toString()}
                }
                this.props.displayCallAverageTable(call_average_table)
                this.props.setApiCallStatus(apidata)
            }
        }
       
       

        var apidata1=  this.state.apidata
        apidata1["callAvg"]=1
        if(this.props.apiResultState == undefined){
            var call_average_graph={

                Index :"call_average_graph", Data:{ "year":currYear.toString()}
    
                // Index :"call_average_graph","Data":{ "year":"2019"}
                // Index :"call_average_graph","Data":{ "year":""}
                // Index :"call_average_graph", Data:{ "year":"2019"}
    
                // Index :"call_average_graph","Data":{ "year":"2019"}
    
            }
            this.props.displayCallAverageGraph(call_average_graph)
            this.props.setApiCallStatus(apidata1)
        }else{
            if(this.props.apiResultState["callAvg"] != 1){
                var call_average_graph={

                    Index :"call_average_graph", Data:{ "year":currYear.toString()}
        
                    // Index :"call_average_graph","Data":{ "year":"2019"}
                    // Index :"call_average_graph","Data":{ "year":""}
                    // Index :"call_average_graph", Data:{ "year":"2019"}
        
                    // Index :"call_average_graph","Data":{ "year":"2019"}
        
                }
                this.props.displayCallAverageGraph(call_average_graph)
                this.props.setApiCallStatus(apidata1)
            }
        }
       
              
    }
    getSecondryGraph(){
        let currYaer = new Date().getFullYear()
        var manager_secondry_graph={
            Index :"secondry_graph","Data":{ "year":currYaer.toString()}
            }
            //return 'kunal'
            this.props.displaySecondarySalesGraph(manager_secondry_graph)
            
            this.setState({
                secondryCall:true
            })
            this.props.setSecondryValue(this.state.secondryCall)
    }
  

    
    componentDidMount(){

      //  alert(sessionStorage.getItem("type"))
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
        }else{

        

        
        if(k=="2"){
            if(window.location.pathname != "/mdashboard"){ 
            this.props.history.push('/mdashboard');
            return
            }
           
        }
        if(k=="3"){
            console.log("test",window.location.pathname);
            if(window.location.pathname != "/adashboard"){ 
            this.props.history.push('/adashboard');
            return
            }

           
        }
    }
       
        // if(k=="" || k == null ){
        //     this.props.history.push('/bdashboard');
        // }
       
       
    /* getting mr progress data */
      this.getProgressbarData()

    /* getting mr uncoverd data */
       this.getUncoverdoctor()

    /* getting mr call average data */
         /* var call_average_table={
            Index :"call_average_table",
          }
          this.props.displayCallAverageTable(call_average_table)*/

    /* getting mr call average graph data */
          /*var call_average_graph={
            Index :"call_average_graph",
          }
          this.props.displayCallAverageGraph(call_average_graph)*/

    /* getting mr non_performing data */
        //   var non_performing={
        //     Index :"NonPerformingProducts"
        //   }
        //   this.props.displayNonPerformingTable(non_performing)
      
    /* getting mr non_performing data */
      this.monthlyClaim()
    /*getting secondary sales data*/
        // var manager_secondry_graph={
        // Index :"secondry_graph","Data":{ "year":""}
        // }
        // //return 'kunal'
        // this.props.displaySecondarySalesGraph(manager_secondry_graph)
    /* getting leaderboard data*/
        // this.updateleaderboard('')
     
    /* Getting header data*/
    let _this = this
            var data = {
                "index": "Basicinfo",
                "Result":"0",
               
                "TableName": "",
                "ColumnName": "",
                "Data": [
                    {
                    "doc":"",
                    "year": "",
                    "month": "",
                    "Result":"1"
                    }
                ]
            }
            postToServer("USerinfo", data)
                .then(function (result) {
                _this.setState({headdata:result.data[0]})
                }) 

             
    }

    yearlySecGraph(year){
        // if(this.state.show_SecondarySalesGraph_Data){ console.log("swea")
        // this.setState({
        //     show_SecondarySalesGraph_Data:'abc'
        // },console.log("data",this.state.show_SecondarySalesGraph_Data))
        // }
        this.props.displaySecondarySalesGraph('A')
        this.props.setSecondrySalesYear(year)
        var manager_secondry_graph={
            
            "Index":"secondry_graph",
            "Data":{"year":''+year+''},
            "Token":""}
        this.props.displaySecondarySalesGraph(manager_secondry_graph)
    }
    getYearData(year){ 
        // var call_average_graph={
        //     Index :"call_average_graph",
        //     year:year
        // }
        this.props.displayCallAverageGraph('year')
        this.props.setYear(year)
        var call_average_graph={
            "Index":"call_average_graph",
            "Data":{"year":''+year+''},
            "Token":""}
        this.props.displayCallAverageGraph(call_average_graph)
    }
    getcallAvgtableYeardata(year){
        this.props.displayCallAverageTable('year')
      //  this.props.setYear(year)
        var call_average_table={
            Index :"call_average_table",  "Data":{ "year":''+year+''}
        }
        this.props.displayCallAverageTable(call_average_table)
    }
    getUncoverdoctor(){
        let currYear = new Date().getFullYear()
        var apidata=  this.state.apidata
        apidata["uncoverdoc"]=1
        if( this.props.apiResultState == undefined ){
            var UncoveredDoctors ={
                Index: "UncoveredDoctors", Data:{ "year":currYear.toString() }
                }
                this.props.displayUnCoverDoctorData(UncoveredDoctors)
                // this.setState({
                //     uncover:!this.state.uncover
                // })
                this.props.setApiCallStatus(apidata) 
        }else{
            if(this.props.apiResultState["uncoverdoc"]!=1 ){
            var UncoveredDoctors ={
                Index: "UncoveredDoctors", Data:{ "year":currYear.toString() }
                }
                this.props.displayUnCoverDoctorData(UncoveredDoctors)
                // this.setState({
                //     uncover:!this.state.uncover
                // })
           this.props.setApiCallStatus(apidata)
            } 
        }
     
           
    }
    monthlyClaim(){
        let currYaer = new Date().getFullYear()
        var apidata =  this.state.apidata
        apidata["monthlyClaim"]=1
        if(this.props.apiResultState == undefined){
            var monthly_claim={
            Index :"monthlyclaim","Data":{ "year":currYaer.toString()}
            }
            this.props.displayMontlyClaim(monthly_claim)
            this.props.setApiCallStatus(apidata)
        }else{
            if(this.props.apiResultState["monthlyClaim"] != 1){
                var monthly_claim={
                    Index :"monthlyclaim","Data":{ "year":currYaer.toString()}
                    }
                    this.props.displayMontlyClaim(monthly_claim)
                    this.props.setApiCallStatus(apidata)
            }
        }
    }
    getProgressbarData(){
        let currYear = new Date().getFullYear()
        var apidata =  this.state.apidata
        apidata["progressVal"]=1
        if(this.props.apiResultState == undefined){
            var data ={
                Index: "MainValue","Data":{ "year":currYear.toString()}
                }
                this.props.displayMrProgress(data)
                this.props.setApiCallStatus(apidata)
        }else{
            if(this.props.apiResultState["progressVal"] != 1){
                var data ={
                    Index: "MainValue","Data":{ "year":currYear.toString()}
                    }
                    this.props.displayMrProgress(data)
                    this.props.setApiCallStatus(apidata)
            }
        }
        
    }
    // getallapi(){
    //     var apidata = [{callAvg:true,callavgTable:true,uncoverdoc:true}]
    //     this.props.setApiCallStatus(apidata)      
    // }
    render() { 
       // console.log("sumeetkumarsingh",this.props.uncoverstate ? this.props.uncoverstate:'nono')
        // console.log(data,"sssssuuummeettt")
        let name
        if(this.state.headdata["C_Name"]){
            let namestring = this.state.headdata["C_Name"]
            name=namestring.toLowerCase()
        }
     
        return (
            <div className="content-spacing dashscroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="dahboardheading">
                                Welcome , <span className="userName">{name}</span>
                            </h4>
                        </div>
                    </div>
                    <MrProgess data= { this.props.data }/>
                    <CallAverage 
                        data= {this.props.data_call_average_table} 
                        graphdata={this.props.show_CallAverageGraph_Data} 
                        totalcalls= {this.props.data}
                        getData={this.getCallAverageData.bind(this)}
                        getcallAvgYeardata={this.getYearData}
                        getcallAvgtableYeardata={this.getcallAvgtableYeardata}
                        yearDropVal={this.props.yearDropVal}
                    />
                    
                    <UncoveresDoctors 
                        data={this.props.show_data_uncover_doctor_data} 
                        datagraph={this.props.show_displayMontlyClaim_Data} 
                        // secondryCall={this.props.show_data_uncover_doctor_data != undefined ? this.props.uncoverstate: this.state.uncover}
                    />
                    <SecondarySales 
                        data={this.props.show_SecondarySalesGraph_Data} 
                        yearWiseData={this.yearlySecGraph}
                        getSecondryGraph={this.getSecondryGraph}
                        secondryCall={this.props.show_SecondaryState != undefined ? this.props.show_SecondaryState: this.state.secondryCall}
                        yearSecDrop={this.props.yearSecDrop}
                    />
                    {/* <LeaderBoard data={this.props.show_data_leaderboard_Data} updateleaderboard={this.updateleaderboard}/>
                    <LeastFocus data={this.props.show_data_Nonperforming_Data} /> */}
                    <Footer />
                </div>
            </div>
        );
    }
}
const mapStateToProps = state =>({ 
    data:state.MRDashboard.data,
    data_call_average_table:state.MRDashboard.data_call_average_table,
    show_data_uncover_doctor_data:state.MRDashboard.data_UnCover_Doctor_Data,
    // show_data_Nonperforming_Data:state.MRDashboard.data_Nonperforming_Data,
    show_displayMontlyClaim_Data:state.MRDashboard.data_Monthlyclaim_Data,
    show_CallAverageGraph_Data:state.MRDashboard.data_call_average_graph_Data,
    show_SecondarySalesGraph_Data:state.MRDashboard.data_secondary_sales_graph_Data,
    show_SecondaryState:state.MRDashboard.secondrystate,
    apiResultState:state.MRDashboard.apiresult,
    yearDropVal:state.MRDashboard.yearDropVal,
    yearSecDrop:state.MRDashboard.yearSecDrop
    // show_data_leaderboard_Data:state.MRDashboard.data_leaderboard_Data,
  })

const mapDispatchToProps = dispatch => ({
    displayMrProgress:data => dispatch(getMrProgress(data)),
    displayCallAverageTable:data => dispatch(getMrCallAverageTable(data)),
    displayUnCoverDoctorData:data => dispatch(getUnCoverDoctorData(data)),
    // displayNonPerformingTable:data => dispatch(getNonPerformingTableData(data)),
    displayMontlyClaim:data => dispatch(getMontlyClaimData(data)),
    displayCallAverageGraph:data => dispatch(getCallAverageGraph(data)),
    displaySecondarySalesGraph:data => dispatch(getSecondarySalesGraph(data)),
    setSecondryValue:data => dispatch(setSecondryValue(data)),
    setApiCallStatus:data => dispatch(setApiCallStatus(data)),
    setYear:data => dispatch(setYear(data)),
    setSecondrySalesYear:data=>dispatch(setSecondrySalesYear(data))
    // displayLeaderBoardData:data => dispatch(getLeaderBoardData(data))
  })

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MainDashboard));