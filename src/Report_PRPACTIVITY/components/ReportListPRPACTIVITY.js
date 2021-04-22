import React,{Component} from 'react'
import ReportTablePRPACTIVITY from './ReportTablePRPACTIVITY'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'

class ReportListPRPACTIVITY extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'All',
            selreg:'All',
            selprpname:'All',
            seldate:'',
            selyr:'',
            mnthname:'',
            mainHead: "",
            Result1:[],
            Result2:[],
            loader:false,
            seltype:'',
            headder:[],
            mainHead:'',
            expdata:"",
            rowsperpage1:'',
            entriescount:'',
            unslectedColumns: [],
            displayedColumns:[],
            hdrcoldefault:[],
        }

        this.DivisionDropdown= this.SelectedDivision.bind(this)
        this.RegionDropdown= this.RegionDropdown.bind(this)
        this.applyFilterAll=this.applyFilterAll.bind(this)
        this.getUnselectedColumns = this.getUnselectedColumns.bind(this);

        
    }


    getUnselectedColumns(unslectedColumns) {
        // console.log(unslectedColumns, "unselectedd name");
        this.setState({
            unslectedColumns
        });
        let headerColums = [];
        let displayedColumns = [];
        let hdr1=[]

let  headerList = []
        headerColums = Object.values(this.state.hdrcoldefault).map(v => v);
            if (unslectedColumns.length == 0) {
                displayedColumns = this.state.hdrcoldefault;
            } else {
                // debugger
                displayedColumns = headerColums;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                unslectedColumns.map(unslectedColumn => {                                                   
                    displayedColumns = displayedColumns.filter(columnName => {
                        // console.log(columnName,'lll')
                        // console.log(unslectedColumn,'2222')
                        return columnName != unslectedColumn;
                    });
                });
            }
            // console.log(displayedColumns,'ddd')
            displayedColumns.map(item => {
                // console.log(item,'mmmmm')
                 headerList = {
                    title: item,
                    prop: item,
                    sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    filterable: true
                };
                //  this.setState({ headder:headerList});
                // console.log(headerList,'hdrlist')
                hdr1.push(headerList)
            });
            //  console.log(hdr1,'tttt')
            if(this.state.Result1.length>0)
            this.setState({
                displayedColumns :displayedColumns,headder:hdr1
            });
this.setState({
    unslectedColumns
});
    }
      SelectedDivision(state){
        
        if(state.name=="Division")
        {
            
            this.setState({seldiv:state.rvalue})
            
        }
        else if(state.name=="Region")
        {
            
            this.setState({selreg:state.rvalue})
        }
        else if(state.name=="PRP Name")
        {
           
            this.setState({selprpname:state.rvalue})
        }
        else if(state.name=="Month")
        {
            
            this.setState({seldate:state.rvalue})
            this.setState({mnthname:state.textval})
        }
        else if(state.name=="Year")
        {
            
            this.setState({selyr:state.rvalue})
        }      
        
    }

    RegionDropdown(){
        
    }

    componentDidUpdate(){
        
    }
    componentDidMount(){

        this.setState({hdrcoldefault : ['Region',
        'FS Name',
        'HQ',
        'PRP NO',
        'PRP Date', 
        'PRP Name',
        'Minimum Attendance',
        'Name of Dr Expected to Attend PRP',
        'Name of FS Expected to Attend PRP',
        'Estimated PRP',
        'Approve/Confirmed Total PRP',
        'PRP ADVANCE',
        'Total BTC',
        'Actual no of Drs attended PRP',
        'Actual PRP Date',
        'Name of DR attended PRP',
        'Name of FS attended PRP',
        'Expense against advance',
        'Total cost for BTC expense',
        'Total Cost for PRP',
        'Current Business',
        'Expected Business',
        'Remark from Confirmator',
        'Expense confirmatory Remarks',
        'Expense confirmed date']})
        this.setState({rowsperpage1:10})
        this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]});
        this.setState({headder:[
            { prop: 'Region',title:'', filterable: true,sortable:false}, 
            // { prop: 'FsName',title:'FS Name', filterable: true,sortable:true}, 
            // { prop: 'FSHQ',title:'HQ', filterable: true,sortable:true}, 
            // { prop: 'n_srno',title:'PRP NO', filterable: true,sortable:true}, 
            // { prop: 'PRPDate',title:'PRP Date', filterable: true,sortable:true}, 
            // { prop: 'PrpName',title:'PRP Name', filterable: true,sortable:true}, 
            // { prop: 'minimumattendance',title:'Minimum Attendance', filterable: true,sortable:true}, 
            // { prop: 'Name of doctor',title:'Name of Dr Expected to Attend PRP', filterable: true,sortable:true}, 
            // { prop: 'Name of FS',title:'Name of FS Expected to Attend PRP', filterable: true,sortable:true}, 
            // { prop: 'n_BTC',title:'Estimated PRP', filterable: true,sortable:true}, 
            // { prop: 'appconfamt',title:'Approve/Confirmed Total PRP', filterable: true,sortable:true}, 
            // { prop: 'advamt',title:'PRP ADVANCE', filterable: true,sortable:true}, 
            // { prop: 'estbtc',title:'Total BTC', filterable: true,sortable:true}, 
            // { prop: 'cntexpdr',title:'Actual no of Drs attended PRP', filterable: true,sortable:true}, 
            // { prop: 'd_prp_requested_date',title:'Actual PRP Date', filterable: true,sortable:true}, 
            // { prop: 'Name of DR attended PRP',title:'Name of DR attended PRP', filterable: true,sortable:true}, 
            // { prop: 'Name of FS attended PRP',title:'Name of FS attended PRP', filterable: true,sortable:true}, 
            // { prop: 'actualadvacerecieved',title:'Expense against advance', filterable: true,sortable:true}, 
            // { prop: 'actualbtc',title:'Total cost for BTC expense', filterable: true,sortable:true}, 
            // { prop: 'Amtspend',title:'Total Cost for PRP', filterable: true,sortable:true}, 
            // { prop: 'CurBusiness',title:'Current Business', filterable: true,sortable:true}, 
            // { prop: 'ExpBusiness',title:'Expected Business', filterable: true,sortable:true}, 
            // { prop: 'c_RejectNote',title:'Remark from Confirmator', filterable: true,sortable:true}, 
            // { prop: 'expensedeskconformatoryremarks',title:'Expense confirmatory Remarks', filterable: true,sortable:true}, 
            // { prop: 'expensedeskconfirmeddate',title:'Expense confirmed date', filterable: true,sortable:true},                   
                 ]});
    }

    applyFilterAll(){
        this.setState({rowsperpage1:''})
        this.setState({rowsperpage1:10})
        this.setState({entriescount:''})
        this.setState({ loader:true })
        // console.log(this.state.seldiv)
        // console.log(this.state.selreg)
        // console.log(this.state.selrps)
        // console.log(this.state.selbr)
        // console.log(this.state.seldate)
        // console.log(this.state.selyr)
        
        if(this.state.seldate=="")
        {
            this.setState({ loader:false })
            alert("Date not Selected ............")
                    return;
        } 
        if(this.state.selyr=="")
        {
            this.setState({ loader:false })
            alert("Year not Selected ............")
                    return;
        }  
        this.setState({mainHead:"PRP Activity Report For  " + this.state.mnthname +','+ this.state.selyr} );
        this.setState({ loader:true })
        
        //   var    travelModes={ "index": "GetPRPData",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"AreaCode":this.state.selrps,"FsCode":this.state.selbr,"DoctCode":this.state.seldn,"DocGrade":this.state.seldg,"DoctCate":this.state.seldc,"Month":this.state.seldate,"Year":this.state.selyr}  }
          var    travelModes={ "index": "BtnLoad",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"PrpName":this.state.selprpname,"Month":this.state.seldate,"Year":this.state.selyr}}
      
          var region = "";
var cregion = "";
var prvregion = "";
var reg = "0";
var fscode = "";
var fscde = "";
var fs = "0";
var fsname = "";
var fsn = "0";
var fshq = "";
var hq = "0";
var cfs = "";
var sr11="";

var currentbusines          = 0;
var expectedbusines         = 0;
var expenseestimated        = 0;
var noofDocAttend           = 0;
var amountspend             = 0;
var advancereq              = 0;
var totalcostestimates      = 0;
var totalappconfcostestimates = 0;
var noofexpDocAttend        = 0;
var actualadvacerecieved    = 0;
var actualadvacerecieved1=0;
var totalcostbtc=0;
var totalcostprp=0;
var actualbtc               = 0;


var fscurrentbusines         = 0;
var fsexpectedbusines        = 0;
var fsexpenseestimated       = 0;
var fsnoofDocAttend          = 0;
var fsamountspend            = 0;
var fsadvancereq             = 0;
var fstotalcostestimates     = 0;
var fstotalappconfcostestimates = 0;
var fsnoofexpDocAttend       = 0;
var fsactualadvacerecieved   = 0;
var fsactualbtc              = 0;

var currentbusinesAllTotal          = 0;
var expectedbusinesAllTotal         = 0;
var expenseestimatedAllTotal        = 0;
var noofDocAttendAllTotal           = 0;
var amountspendAllTotal             = 0;
var advancereqAllTotal              = 0;
var totalcostestimatesAllTotal      = 0;
var totalappconfcostestimatesAllTotal = 0;
var noofexpDocAttendAllTotal        = 0;
var actualadvacerecievedAllTotal    = 0;
var actualbtcAllTotal               = 0;
        
        let test2=[];
        let test4=[];
       
        console.log(travelModes)  
        postToServer("PRP_Activity_Rpt", travelModes).then((Result) => {
            console.log(Result)
            if (Result.data.Status == 'Success') {  
                Result.data.data[0].map((item2,index) => {
                    if(item2['n_srno']!="000000")
{
                  sr11=item2['n_srno']
				    fscde = item2['FsName'];
                    var advamt   = "";
                    var appconfamt = "";
                    var adamt       = 0;
                    var confamt = 0;
                    var estbtc = "";
                    var estamt = 0;
                    if (item2['n_Advanceamt'] == "-999.00")
                    {
                        advamt  = "NIL";
                        adamt   = 0;
                    }
                    else
                    {
                        advamt  = item2['n_Advanceamt'];
                        adamt   = parseFloat(item2['n_Advanceamt']);

                    }
                    if (item2['AppConftot'] == "-1.00")
                    {
                        appconfamt = "NA";
                        confamt = 0;
                    }
                    else
                    {
                        appconfamt = item2['AppConftot'];
                        confamt = parseFloat(item2['AppConftot']);

                    }
                    if (item2['esimatedbtc'] == "-1.00")
                    {
                        estbtc = "NA";
                        estamt = 0;
                    }
                    else
                    {
                        estbtc = item2['esimatedbtc'];
                        estamt = parseFloat(item2['esimatedbtc']);

                    }

                   
                    if (item2['actualadvacerecieved'] == "-1.00") 
                    {
                        actualadvacerecieved1="NA";
                        totalcostbtc="NA";
                        totalcostprp="NA"
                   }
                   else
                   {
                       actualadvacerecieved1=item2['actualadvacerecieved'];
                       totalcostbtc=item2['actualbtc'];
                       totalcostprp=item2['Amtspend'];
                   }
                     var expenseconfimatoryremarks = item2['expenseapprovconfremarks'];
                     var expenseconfirmeddate = item2['expenseapprconfirmeddate'];
                     var expensedeskconformatoryremarks = item2['ExpenseConfRemarks'];
                     var expensedeskconfirmeddate = item2['expenseconfirmeddate'];
// if(item2['n_srno']=="16108")
// {
//     debugger;
// }
if(Result.data.data[0].length>0)
{
      this.setState({headder:[
    { prop: 'Region',title:'Region', filterable: false,sortable:true}, 
    { prop: 'FS Name',title:'FS Name', filterable: false,sortable:true}, 
    { prop: 'HQ',title:'HQ', filterable: false,sortable:true}, 
    { prop: 'PRP NO',title:'PRP NO', filterable: true,sortable:true}, 
    { prop: 'PRP Date',title:'PRP Date', filterable: false,sortable:true}, 
    { prop: 'PRP Name',title:'PRP Name', filterable: false,sortable:true}, 
    { prop: 'Minimum Attendance',title:'Minimum Attendance', filterable: false,sortable:true}, 
    { prop: 'Name of Dr Expected to Attend PRP',title:'Name of Dr Expected to Attend PRP', filterable: false,sortable:true}, 
    { prop: 'Name of FS Expected to Attend PRP',title:'Name of FS Expected to Attend PRP', filterable: false,sortable:true}, 
    { prop: 'Estimated PRP',title:'Estimated PRP', filterable: false,sortable:true}, 
    { prop: 'Approve/Confirmed Total PRP',title:'Approve/Confirmed Total PRP', filterable: true,sortable:true}, 
    { prop: 'PRP ADVANCE',title:'PRP ADVANCE', filterable: false,sortable:true}, 
    { prop: 'Total BTC',title:'Total BTC', filterable: false,sortable:true}, 
    { prop: 'Actual no of Drs attended PRP',title:'Actual no of Drs attended PRP', filterable: false,sortable:true}, 
    { prop: 'Actual PRP Date',title:'Actual PRP Date', filterable: false,sortable:true}, 
    { prop: 'Name of DR attended PRP',title:'Name of DR attended PRP', filterable: false,sortable:true}, 
    { prop: 'Name of FS attended PRP',title:'Name of FS attended PRP', filterable: false,sortable:true}, 
    { prop: 'Expense against advance',title:'Expense against advance', filterable: false,sortable:true}, 
    { prop: 'Total cost for BTC expense',title:'Total cost for BTC expense', filterable: false,sortable:true}, 
    { prop: 'Total Cost for PRP',title:'Total Cost for PRP', filterable: false,sortable:true}, 
    { prop: 'Current Business',title:'Current Business', filterable: false,sortable:true}, 
    { prop: 'Expected Business',title:'Expected Business', filterable: false,sortable:true}, 
    { prop: 'Remark from Confirmator',title:'Remark from Confirmator', filterable: false,sortable:true}, 
    { prop: 'Expense confirmatory Remarks',title:'Expense confirmatory Remarks', filterable: false,sortable:true}, 
    { prop: 'Expense confirmed date',title:'Expense confirmed date', filterable: false,sortable:true},    
    // { prop: 'n_srno1',title:'',  filterable: true},                
         ]});


         let headerColums = [];
        let displayedColumns = [];
        let hdr1=[]
  
  let  headerList = []
        headerColums = Object.values((this.state.displayedColumns=="")? this.state.hdrcoldefault : this.state.displayedColumns).map(v => v);
            if (this.state.unslectedColumns.length == 0) {
                displayedColumns = (this.state.displayedColumns=="")? this.state.hdrcoldefault : this.state.displayedColumns;
            } else {
                // debugger
                displayedColumns = headerColums;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                this.state.unslectedColumns.map(unslectedColumn => {                                                   
                    displayedColumns = displayedColumns.filter(columnName => {
                        // console.log(columnName,'lll')
                        // console.log(unslectedColumn,'2222')
                        return columnName != unslectedColumn;
                    });
                });
            }
            // console.log(displayedColumns,'ddd')
            displayedColumns.map(item => {
                // console.log(item,'mmmmm')
                 headerList = {
                    title: item,
                    prop: item,
                    sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    filterable: true
                };
                //  this.setState({ headder:headerList});
                // console.log(headerList,'hdrlist')
                hdr1.push(headerList)
            });
            //   console.log(hdr1,'tttt')
            this.setState({
                displayedColumns :displayedColumns,headder:hdr1
            });

                    if (fs != fscode)
                    {
					
					test2.push({
								"Region" : <div className="textReport">{item2['Region']}</div>,
								"FS Name" : <div className="textReport">{item2['FsName']}</div>,
								"HQ" : <div className="textReport">{item2['FSHQ']}</div>,
								"PRP NO" : <div className="textReport">{item2['n_srno']}</div>,
								"PRP Date" : <div className="textReport">{item2['PRPDate']}</div>,
								"PRP Name" : <div className="textReport">{item2['PrpName']}</div>,
								"Minimum Attendance" : <div className="textReport">{item2['minimumattendance']}</div>,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <div className="textReport">{item2['n_BTC']}</div>,
								"Approve/Confirmed Total PRP" :<div className="textReport">{item2['AppConftot']}</div>,
								"PRP ADVANCE" : <div className="textReport">{item2['n_Advanceamt']}</div>,
								"Total BTC" : estbtc,
								"Actual no of Drs attended PRP" : <div className="textReport">{item2['cntexpdr']}</div>,
								"Actual PRP Date" : <div className="textReport">{item2['d_prp_requested_date']}</div>,
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  : <div className="textReport">{actualadvacerecieved1}</div>,
								"Total cost for BTC expense" :<div className="textReport">{totalcostbtc}</div>,
								"Total Cost for PRP" : <div className="textReport">{totalcostprp}</div>,
								"Current Business" : <div className="textReport">{item2['CurBusiness']}</div>,
								"Expected Business" : <div className="textReport">{item2['ExpBusiness']}</div>,
								"Remark from Confirmator" :<div className="note-text"> {item2['c_RejectNote']} </div> ,
								"Expense confirmatory Remarks" :<div className="note-text"> {expensedeskconformatoryremarks} </div> ,
                                "Expense confirmed date" : expensedeskconfirmeddate,
                                // "n_srno1" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item2['n_srno']} </div> ,
                            })

                            test4.push({
								"Region" : <div className="textReport">{item2['Region']}</div>,
								"FS Name" : <div className="textReport">{item2['FsName']}</div>,
								"HQ" : <div className="textReport">{item2['FSHQ']}</div>,
								"PRP NO" : <div className="textReport">{item2['n_srno']}</div>,
								"PRP Date" : <div className="textReport">{item2['PRPDate']}</div>,
								"PRP Name" : <div className="textReport">{item2['PrpName']}</div>,
								"Minimum Attendance" : <div className="textReport">{item2['minimumattendance']}</div>,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <div className="textReport">{item2['n_BTC']}</div>,
								"Approve/Confirmed Total PRP" :<div className="textReport">{item2['AppConftot']}</div>,
								"PRP ADVANCE" : <div className="textReport">{item2['n_Advanceamt']}</div>,
								"Total BTC" : estbtc,
								"Actual no of Drs attended PRP" : <div className="textReport">{item2['cntexpdr']}</div>,
								"Actual PRP Date" : <div className="textReport">{item2['d_prp_requested_date']}</div>,
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  : <div className="textReport">{actualadvacerecieved1}</div>,
								"Total cost for BTC expense" :<div className="textReport">{totalcostbtc}</div>,
								"Total Cost for PRP" : <div className="textReport">{totalcostprp}</div>,
								"Current Business" : <div className="textReport">{item2['CurBusiness']}</div>,
								"Expected Business" : <div className="textReport">{item2['ExpBusiness']}</div>,
								"Remark from Confirmator" :<div className="note-text textReport"> {item2['c_RejectNote']} </div> ,
								"Expense confirmatory Remarks" :<div className="note-text textReport"> {expensedeskconformatoryremarks} </div> ,
                                "Expense confirmed date" : expensedeskconfirmeddate,
                                // "n_srno1" : "",
                            })
                            
                            Result.data.data[1].map((item3,index) => {
                                if(item2['n_srno']==item3['srno'])
                                    {
                                        test2.push({
                                            "Region" : "",
                                            "FS Name" : "",
                                            "HQ" : "",
                                            "PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item3['srno']} </div> ,
                                            "PRP Date" : "",
                                            "PRP Name" : "",
                                            "Minimum Attendance" : "",
                                            "Name of Dr Expected to Attend PRP"  : <div className="textReport">{item3['docname']}</div>,
                                            "Name of FS Expected to Attend PRP" : <div className="textReport">{item3['fsname']}</div>,
                                            "Estimated PRP" : "",
                                            "Approve/Confirmed Total PRP" : "",
                                            "PRP ADVANCE" : "",
                                            "Total BTC" : "",
                                            "Actual no of Drs attended PRP" : "",
                                            "Actual PRP Date" : "",
                                            "Name of DR attended PRP" :  <div className="textReport">{item3['docname1']}</div>,
                                            "Name of FS attended PRP" :  <div className="textReport">{item3['fsname2']}</div>,
                                            "Expense against advance"  : "",
                                            "Total cost for BTC expense" : "",
                                            "Total Cost for PRP" : "",
                                            "Current Business" : "",
                                            "Expected Business" : "",
                                            "Remark from Confirmator" : "",
                                            "Expense confirmatory Remarks" : "",
                                            "Expense confirmed date" : "",
                                            // "n_srno1" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item3['srno']} </div> ,
                                        })
                                        test4.push({
                                            "Region" : "",
                                            "FS Name" : "",
                                            "HQ" : "",
                                            "PRP NO" : "",
                                            "PRP Date" : "",
                                            "PRP Name" : "",
                                            "Minimum Attendance" : "",
                                            "Name of Dr Expected to Attend PRP"  : <div className="textReport">{item3['docname']}</div>,
                                            "Name of FS Expected to Attend PRP" : <div className="textReport">{item3['fsname']}</div>,
                                            "Estimated PRP" : "",
                                            "Approve/Confirmed Total PRP" : "",
                                            "PRP ADVANCE" : "",
                                            "Total BTC" : "",
                                            "Actual no of Drs attended PRP" : "",
                                            "Actual PRP Date" : "",
                                            "Name of DR attended PRP" :  <div className="textReport">{item3['docname1']}</div>,
                                            "Name of FS attended PRP" :  <div className="textReport">{item3['fsname2']}</div>,
                                            "Expense against advance"  : "",
                                            "Total cost for BTC expense" : "",
                                            "Total Cost for PRP" : "",
                                            "Current Business" : "",
                                            "Expected Business" : "",
                                            "Remark from Confirmator" : "",
                                            "Expense confirmatory Remarks" : "",
                                            "Expense confirmed date" : "",
                                            // "n_srno1" : "",
                                        })
                                    }
                                })
                        
                    }
                    else
                    {
                        if (reg != region)
                        {
						
						test2.push({
								"Region" : <div className="textReport">{item2['Region']}</div>,
								"FS Name" : <div className="textReport">{item2['FsName']}</div>,
								"HQ" : <div className="textReport">{item2['FSHQ']}</div>,
								"PRP NO" : <div className="textReport">{item2['n_srno']}</div>,
								"PRP Date" : <div className="textReport">{item2['PRPDate']}</div>,
								"PRP Name" : <div className="textReport">{item2['PrpName']}</div>,
								"Minimum Attendance" : <div className="textReport">{item2['minimumattendance']}</div>,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <div className="textReport">{item2['n_BTC']}</div>,
								"Approve/Confirmed Total PRP" :<div className="textReport">{item2['AppConftot']}</div>,
								"PRP ADVANCE" : <div className="textReport">{item2['n_Advanceamt']}</div>,
								"Total BTC" : estbtc,
								"Actual no of Drs attended PRP" : <div className="textReport">{item2['cntexpdr']}</div>,
								"Actual PRP Date" : <div className="textReport">{item2['d_prp_requested_date']}</div>,
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<div className="textReport">{actualadvacerecieved1}</div>,
								"Total cost for BTC expense" : <div className="textReport">{totalcostbtc}</div>,
								"Total Cost for PRP" : <div className="textReport">{totalcostprp}</div>,
								"Current Business" : <div className="textReport">{item2['CurBusiness']}</div>,
								"Expected Business" : <div className="textReport">{item2['ExpBusiness']}</div>,
								"Remark from Confirmator" :<div className="note-text textReport"> {item2['c_RejectNote']} </div> ,
								"Expense confirmatory Remarks" : <div className="note-text textReport"> {expensedeskconformatoryremarks} </div>,
                                "Expense confirmed date" : expensedeskconfirmeddate,
                                // "n_srno1" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item2['n_srno']} </div> ,
                            })

                            test4.push({
								"Region" : <div className="textReport">{item2['Region']}</div>,
								"FS Name" : <div className="textReport">{item2['FsName']}</div>,
								"HQ" : <div className="textReport">{item2['FSHQ']}</div>,
								"PRP NO" : <div className="textReport">{item2['n_srno']}</div>,
								"PRP Date" : <div className="textReport">{item2['PRPDate']}</div>,
								"PRP Name" : <div className="textReport">{item2['PrpName']}</div>,
								"Minimum Attendance" : <div className="textReport">{item2['minimumattendance']}</div>,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <div className="textReport">{item2['n_BTC']}</div>,
								"Approve/Confirmed Total PRP" :<div className="textReport">{item2['AppConftot']}</div>,
								"PRP ADVANCE" : <div className="textReport">{item2['n_Advanceamt']}</div>,
								"Total BTC" : estbtc,
								"Actual no of Drs attended PRP" : <div className="textReport">{item2['cntexpdr']}</div>,
								"Actual PRP Date" : <div className="textReport">{item2['d_prp_requested_date']}</div>,
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<div className="textReport">{actualadvacerecieved1}</div>,
								"Total cost for BTC expense" : <div className="textReport">{totalcostbtc}</div>,
								"Total Cost for PRP" : <div className="textReport">{totalcostprp}</div>,
								"Current Business" : <div className="textReport">{item2['CurBusiness']}</div>,
								"Expected Business" : <div className="textReport">{item2['ExpBusiness']}</div>,
								"Remark from Confirmator" :<div className="note-text textReport"> {item2['c_RejectNote']} </div> ,
								"Expense confirmatory Remarks" : <div className="note-text textReport"> {expensedeskconformatoryremarks} </div>,
                                "Expense confirmed date" : expensedeskconfirmeddate,
                                // "n_srno1" : "",
                            })
                            
                            Result.data.data[1].map((item3,index) => {
                                if(item2['n_srno']==item3['srno'])
                                    {
                                        test2.push({
                                            "Region" : "",
                                            "FS Name" : "",
                                            "HQ" : "",
                                            "PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item3['srno']} </div> ,
                                            "PRP Date" : "",
                                            "PRP Name" : "",
                                            "Minimum Attendance" : "",
                                            "Name of Dr Expected to Attend PRP"  : <div className="textReport">{item3['docname']}</div>,
                                            "Name of FS Expected to Attend PRP" : <div className="textReport">{item3['fsname']}</div>,
                                            "Estimated PRP" : "",
                                            "Approve/Confirmed Total PRP" : "",
                                            "PRP ADVANCE" : "",
                                            "Total BTC" : "",
                                            "Actual no of Drs attended PRP" : "",
                                            "Actual PRP Date" : "",
                                            "Name of DR attended PRP" :  <div className="textReport">{item3['docname1']}</div>,
                                            "Name of FS attended PRP" :  <div className="textReport">{item3['fsname2']}</div>,
                                            "Expense against advance"  : "",
                                            "Total cost for BTC expense" : "",
                                            "Total Cost for PRP" : "",
                                            "Current Business" : "",
                                            "Expected Business" : "",
                                            "Remark from Confirmator" : "",
                                            "Expense confirmatory Remarks" : "",
                                            "Expense confirmed date" : "",
                                            // "n_srno1" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item3['srno']} </div> ,
                                        })

                                        test4.push({
                                            "Region" : "",
                                            "FS Name" : "",
                                            "HQ" : "",
                                            "PRP NO" : "",
                                            "PRP Date" : "",
                                            "PRP Name" : "",
                                            "Minimum Attendance" : "",
                                            "Name of Dr Expected to Attend PRP"  : <div className="textReport">{item3['docname']}</div>,
                                            "Name of FS Expected to Attend PRP" : <div className="textReport">{item3['fsname']}</div>,
                                            "Estimated PRP" : "",
                                            "Approve/Confirmed Total PRP" : "",
                                            "PRP ADVANCE" : "",
                                            "Total BTC" : "",
                                            "Actual no of Drs attended PRP" : "",
                                            "Actual PRP Date" : "",
                                            "Name of DR attended PRP" :  <div className="textReport">{item3['docname1']}</div>,
                                            "Name of FS attended PRP" :  <div className="textReport">{item3['fsname2']}</div>,
                                            "Expense against advance"  : "",
                                            "Total cost for BTC expense" : "",
                                            "Total Cost for PRP" : "",
                                            "Current Business" : "",
                                            "Expected Business" : "",
                                            "Remark from Confirmator" : "",
                                            "Expense confirmatory Remarks" : "",
                                            "Expense confirmed date" : "",
                                            // "n_srno1" : "",
                                        })
                                    }
                                })
                            
                        }
                        else // remove region
                        {
                            if (fsn != fsname)
                            {
							
							test2.push({
								"Region" : "",
								"FS Name" : <div className="textReport">{item2['FsName']}</div>,
								"HQ" : <div className="textReport">{item2['FSHQ']}</div>,
								"PRP NO" : <div className="textReport">{item2['n_srno']}</div>,
								"PRP Date" : <div className="textReport">{item2['PRPDate']}</div>,
								"PRP Name" : <div className="textReport">{item2['PrpName']}</div>,
								"Minimum Attendance" : <div className="textReport">{item2['minimumattendance']}</div>,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <div className="textReport">{item2['n_BTC']}</div>,
								"Approve/Confirmed Total PRP" :<div className="textReport">{item2['AppConftot']}</div>,
								"PRP ADVANCE" : <div className="textReport">{item2['n_Advanceamt']}</div>,
								"Total BTC" : estbtc,
								"Actual no of Drs attended PRP" : <div className="textReport">{item2['cntexpdr']}</div>,
								"Actual PRP Date" : <div className="textReport">{item2['d_prp_requested_date']}</div>,
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
                                "Expense against advance"  :<div className="textReport">{actualadvacerecieved1}</div>,
								"Total cost for BTC expense" : <div className="textReport">{totalcostbtc}</div>,
								"Total Cost for PRP" : <div className="textReport">{totalcostprp}</div>,
								"Current Business" : <div className="textReport">{item2['CurBusiness']}</div>,
								"Expected Business" : <div className="textReport">{item2['ExpBusiness']}</div>,
								"Remark from Confirmator" : <div className="note-text textReport"> {item2['c_RejectNote']} </div>,
								"Expense confirmatory Remarks" :<div className="note-text textReport"> {expensedeskconformatoryremarks} </div> ,
                                "Expense confirmed date" : expensedeskconfirmeddate,
                                // "n_srno1" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item2['n_srno']} </div> ,
                            })

                            test4.push({
								"Region" : "",
								"FS Name" : <div className="textReport">{item2['FsName']}</div>,
								"HQ" : <div className="textReport">{item2['FSHQ']}</div>,
								"PRP NO" : <div className="textReport">{item2['n_srno']}</div>,
								"PRP Date" : <div className="textReport">{item2['PRPDate']}</div>,
								"PRP Name" : <div className="textReport">{item2['PrpName']}</div>,
								"Minimum Attendance" : <div className="textReport">{item2['minimumattendance']}</div>,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <div className="textReport">{item2['n_BTC']}</div>,
								"Approve/Confirmed Total PRP" :<div className="textReport">{item2['AppConftot']}</div>,
								"PRP ADVANCE" : <div className="textReport">{item2['n_Advanceamt']}</div>,
								"Total BTC" : estbtc,
								"Actual no of Drs attended PRP" : <div className="textReport">{item2['cntexpdr']}</div>,
								"Actual PRP Date" : <div className="textReport">{item2['d_prp_requested_date']}</div>,
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
                                "Expense against advance"  :<div className="textReport">{actualadvacerecieved1}</div>,
								"Total cost for BTC expense" : <div className="textReport">{totalcostbtc}</div>,
								"Total Cost for PRP" : <div className="textReport">{totalcostprp}</div>,
								"Current Business" : <div className="textReport">{item2['CurBusiness']}</div>,
								"Expected Business" : <div className="textReport">{item2['ExpBusiness']}</div>,
								"Remark from Confirmator" : <div className="note-text textReport"> {item2['c_RejectNote']} </div>,
								"Expense confirmatory Remarks" :<div className="note-text textReport"> {expensedeskconformatoryremarks} </div> ,
                                "Expense confirmed date" : expensedeskconfirmeddate,
                                // "n_srno1" : "",
                            })
                            
                            Result.data.data[1].map((item3,index) => {
                                if(item2['n_srno']==item3['srno'])
                                    {
                                        test2.push({
                                            "Region" : "",
                                            "FS Name" : "",
                                            "HQ" : "",
                                            "PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item3['srno']} </div> ,
                                            "PRP Date" : "",
                                            "PRP Name" : "",
                                            "Minimum Attendance" : "",
                                            "Name of Dr Expected to Attend PRP"  : <div className="textReport">{item3['docname']}</div>,
                                            "Name of FS Expected to Attend PRP" : <div className="textReport">{item3['fsname']}</div>,
                                            "Estimated PRP" : "",
                                            "Approve/Confirmed Total PRP" : "",
                                            "PRP ADVANCE" : "",
                                            "Total BTC" : "",
                                            "Actual no of Drs attended PRP" : "",
                                            "Actual PRP Date" : "",
                                            "Name of DR attended PRP" :  <div className="textReport">{item3['docname1']}</div>,
                                            "Name of FS attended PRP" :  <div className="textReport">{item3['fsname2']}</div>,
                                            "Expense against advance"  : "",
                                            "Total cost for BTC expense" : "",
                                            "Total Cost for PRP" : "",
                                            "Current Business" : "",
                                            "Expected Business" : "",
                                            "Remark from Confirmator" : "",
                                            "Expense confirmatory Remarks" : "",
                                            "Expense confirmed date" : "",
                                            // "n_srno1" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item3['srno']} </div> ,
                                        })

                                        test4.push({
                                            "Region" : "",
                                            "FS Name" : "",
                                            "HQ" : "",
                                            "PRP NO" : "",
                                            "PRP Date" : "",
                                            "PRP Name" : "",
                                            "Minimum Attendance" : "",
                                            "Name of Dr Expected to Attend PRP"  : <div className="textReport">{item3['docname']}</div>,
                                            "Name of FS Expected to Attend PRP" : <div className="textReport">{item3['fsname']}</div>,
                                            "Estimated PRP" : "",
                                            "Approve/Confirmed Total PRP" : "",
                                            "PRP ADVANCE" : "",
                                            "Total BTC" : "",
                                            "Actual no of Drs attended PRP" : "",
                                            "Actual PRP Date" : "",
                                            "Name of DR attended PRP" :  <div className="textReport">{item3['docname1']}</div>,
                                            "Name of FS attended PRP" :  <div className="textReport">{item3['fsname2']}</div>,
                                            "Expense against advance"  : "",
                                            "Total cost for BTC expense" : "",
                                            "Total Cost for PRP" : "",
                                            "Current Business" : "",
                                            "Expected Business" : "",
                                            "Remark from Confirmator" : "",
                                            "Expense confirmatory Remarks" : "",
                                            "Expense confirmed date" : "",
                                            // "n_srno1" : "",
                                        })
                                    }
                                })
                                
                            }
                            else //remove fsname
                            {
                                if (hq != fshq)
                                {
								
								test2.push({
								"Region" : "",
								"FS Name" : "",
								"HQ" : <div className="textReport">{item2['FSHQ']}</div>,
								"PRP NO" : <div className="textReport">{item2['n_srno']}</div>,
								"PRP Date" : <div className="textReport">{item2['PRPDate']}</div>,
								"PRP Name" : <div className="textReport">{item2['PrpName']}</div>,
								"Minimum Attendance" : <div className="textReport">{item2['minimumattendance']}</div>,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <div className="textReport">{item2['n_BTC']}</div>,
								"Approve/Confirmed Total PRP" :<div className="textReport">{item2['AppConftot']}</div>,
								"PRP ADVANCE" : <div className="textReport">{item2['n_Advanceamt']}</div>,
								"Total BTC" : estbtc,
								"Actual no of Drs attended PRP" : <div className="textReport">{item2['cntexpdr']}</div>,
								"Actual PRP Date" : <div className="textReport">{item2['d_prp_requested_date']}</div>,
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<div className="textReport">{actualadvacerecieved1}</div>,
								"Total cost for BTC expense" : <div className="textReport">{totalcostbtc}</div>,
								"Total Cost for PRP" : <div className="textReport">{totalcostprp}</div>,
								"Current Business" : <div className="textReport">{item2['CurBusiness']}</div>,
								"Expected Business" : <div className="textReport">{item2['ExpBusiness']}</div>,
								"Remark from Confirmator" : <div className="note-text textReport"> {item2['c_RejectNote']} </div>,
								"Expense confirmatory Remarks" :<div className="note-text textReport"> {expensedeskconformatoryremarks} </div> ,
                                "Expense confirmed date" : expensedeskconfirmeddate,
                                // "n_srno1" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item2['n_srno']} </div> ,
                            })

                            test4.push({
								"Region" : "",
								"FS Name" : "",
								"HQ" : <div className="textReport">{item2['FSHQ']}</div>,
								"PRP NO" : <div className="textReport">{item2['n_srno']}</div>,
								"PRP Date" : <div className="textReport">{item2['PRPDate']}</div>,
								"PRP Name" : <div className="textReport">{item2['PrpName']}</div>,
								"Minimum Attendance" : <div className="textReport">{item2['minimumattendance']}</div>,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <div className="textReport">{item2['n_BTC']}</div>,
								"Approve/Confirmed Total PRP" :<div className="textReport">{item2['AppConftot']}</div>,
								"PRP ADVANCE" : <div className="textReport">{item2['n_Advanceamt']}</div>,
								"Total BTC" : estbtc,
								"Actual no of Drs attended PRP" : <div className="textReport">{item2['cntexpdr']}</div>,
								"Actual PRP Date" : <div className="textReport">{item2['d_prp_requested_date']}</div>,
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<div className="textReport">{actualadvacerecieved1}</div>,
								"Total cost for BTC expense" : <div className="textReport">{totalcostbtc}</div>,
								"Total Cost for PRP" : <div className="textReport">{totalcostprp}</div>,
								"Current Business" : <div className="textReport">{item2['CurBusiness']}</div>,
								"Expected Business" : <div className="textReport">{item2['ExpBusiness']}</div>,
								"Remark from Confirmator" : <div className="note-text textReport"> {item2['c_RejectNote']} </div>,
								"Expense confirmatory Remarks" :<div className="note-text textReport"> {expensedeskconformatoryremarks} </div> ,
                                "Expense confirmed date" : expensedeskconfirmeddate,
                                // "n_srno1" : "",
                            })
                            
                            Result.data.data[1].map((item3,index) => {
                                if(item2['n_srno']==item3['srno'])
                                    {
                                        test2.push({
                                            "Region" : "",
                                            "FS Name" : "",
                                            "HQ" : "",
                                            "PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item3['srno']} </div> ,
                                            "PRP Date" : "",
                                            "PRP Name" : "",
                                            "Minimum Attendance" : "",
                                            "Name of Dr Expected to Attend PRP"  : <div className="textReport">{item3['docname']}</div>,
                                            "Name of FS Expected to Attend PRP" : <div className="textReport">{item3['fsname']}</div>,
                                            "Estimated PRP" : "",
                                            "Approve/Confirmed Total PRP" : "",
                                            "PRP ADVANCE" : "",
                                            "Total BTC" : "",
                                            "Actual no of Drs attended PRP" : "",
                                            "Actual PRP Date" : "",
                                            "Name of DR attended PRP" :  <div className="textReport">{item3['docname1']}</div>,
                                            "Name of FS attended PRP" :  <div className="textReport">{item3['fsname2']}</div>,
                                            "Expense against advance"  : "",
                                            "Total cost for BTC expense" : "",
                                            "Total Cost for PRP" : "",
                                            "Current Business" : "",
                                            "Expected Business" : "",
                                            "Remark from Confirmator" : "",
                                            "Expense confirmatory Remarks" : "",
                                            "Expense confirmed date" : "",
                                            // "n_srno1" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item3['srno']} </div> ,
                                        })
                                        test4.push({
                                            "Region" : "",
                                            "FS Name" : "",
                                            "HQ" : "",
                                            "PRP NO" : "",
                                            "PRP Date" : "",
                                            "PRP Name" : "",
                                            "Minimum Attendance" : "",
                                            "Name of Dr Expected to Attend PRP"  : <div className="textReport">{item3['docname']}</div>,
                                            "Name of FS Expected to Attend PRP" : <div className="textReport">{item3['fsname']}</div>,
                                            "Estimated PRP" : "",
                                            "Approve/Confirmed Total PRP" : "",
                                            "PRP ADVANCE" : "",
                                            "Total BTC" : "",
                                            "Actual no of Drs attended PRP" : "",
                                            "Actual PRP Date" : "",
                                            "Name of DR attended PRP" :  <div className="textReport">{item3['docname1']}</div>,
                                            "Name of FS attended PRP" :  <div className="textReport">{item3['fsname2']}</div>,
                                            "Expense against advance"  : "",
                                            "Total cost for BTC expense" : "",
                                            "Total Cost for PRP" : "",
                                            "Current Business" : "",
                                            "Expected Business" : "",
                                            "Remark from Confirmator" : "",
                                            "Expense confirmatory Remarks" : "",
                                            "Expense confirmed date" : "",
                                            // "n_srno1" : "",
                                        })
                                    }
                                })
                                   
                                }
                                else//remove fshq
                                {
								
								test2.push({
								"Region" : "",
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item2['n_srno']} </div> ,
								"PRP Date" : <div className="textReport">{item2['PRPDate']}</div>,
								"PRP Name" : <div className="textReport">{item2['PrpName']}</div>,
								"Minimum Attendance" : <div className="textReport">{item2['minimumattendance']}</div>,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <div className="textReport">{item2['n_BTC']}</div>,
								"Approve/Confirmed Total PRP" :<div className="textReport">{item2['AppConftot']}</div>,
								"PRP ADVANCE" : <div className="textReport">{item2['n_Advanceamt']}</div>,
								"Total BTC" : estbtc,
								"Actual no of Drs attended PRP" : <div className="textReport">{item2['cntexpdr']}</div>,
								"Actual PRP Date" : <div className="textReport">{item2['d_prp_requested_date']}</div>,
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<div className="textReport">{actualadvacerecieved1}</div>,
								"Total cost for BTC expense" : <div className="textReport">{totalcostbtc}</div>,
								"Total Cost for PRP" : <div className="textReport">{totalcostprp}</div>,
								"Current Business" : <div className="textReport">{item2['CurBusiness']}</div>,
								"Expected Business" : <div className="textReport">{item2['ExpBusiness']}</div>,
								"Remark from Confirmator" : <div className="note-text textReport"> {item2['c_RejectNote']} </div>,
								"Expense confirmatory Remarks" : <div className="note-text textReport"> {expensedeskconformatoryremarks} </div>,
                                "Expense confirmed date" : expensedeskconfirmeddate,
                                // "n_srno1" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item2['n_srno']} </div> ,
                            })

                            test4.push({
								"Region" : "",
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : "",
								"PRP Date" : <div className="textReport">{item2['PRPDate']}</div>,
								"PRP Name" : <div className="textReport">{item2['PrpName']}</div>,
								"Minimum Attendance" : <div className="textReport">{item2['minimumattendance']}</div>,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <div className="textReport">{item2['n_BTC']}</div>,
								"Approve/Confirmed Total PRP" :<div className="textReport">{item2['AppConftot']}</div>,
								"PRP ADVANCE" : <div className="textReport">{item2['n_Advanceamt']}</div>,
								"Total BTC" : estbtc,
								"Actual no of Drs attended PRP" : <div className="textReport">{item2['cntexpdr']}</div>,
								"Actual PRP Date" : <div className="textReport">{item2['d_prp_requested_date']}</div>,
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<div className="textReport">{actualadvacerecieved1}</div>,
								"Total cost for BTC expense" : <div className="textReport">{totalcostbtc}</div>,
								"Total Cost for PRP" : <div className="textReport">{totalcostprp}</div>,
								"Current Business" : <div className="textReport">{item2['CurBusiness']}</div>,
								"Expected Business" : <div className="textReport">{item2['ExpBusiness']}</div>,
								"Remark from Confirmator" : <div className="note-text textReport"> {item2['c_RejectNote']} </div>,
								"Expense confirmatory Remarks" : <div className="note-text textReport"> {expensedeskconformatoryremarks} </div>,
                                "Expense confirmed date" : expensedeskconfirmeddate,
                                // "n_srno1" : "",
                            })
                            
                            Result.data.data[1].map((item3,index) => {
                                if(item2['n_srno']==item3['srno'])
                                    {
                                        test2.push({
                                            "Region" : "",
                                            "FS Name" : "",
                                            "HQ" : "",
                                            "PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item3['srno']} </div> ,
                                            "PRP Date" : "",
                                            "PRP Name" : "",
                                            "Minimum Attendance" : "",
                                            "Name of Dr Expected to Attend PRP"  : <div className="textReport">{item3['docname']}</div>,
                                            "Name of FS Expected to Attend PRP" : <div className="textReport">{item3['fsname']}</div>,
                                            "Estimated PRP" : "",
                                            "Approve/Confirmed Total PRP" : "",
                                            "PRP ADVANCE" : "",
                                            "Total BTC" : "",
                                            "Actual no of Drs attended PRP" : "",
                                            "Actual PRP Date" : "",
                                            "Name of DR attended PRP" :  <div className="textReport">{item3['docname1']}</div>,
                                            "Name of FS attended PRP" :  <div className="textReport">{item3['fsname2']}</div>,
                                            "Expense against advance"  : "",
                                            "Total cost for BTC expense" : "",
                                            "Total Cost for PRP" : "",
                                            "Current Business" : "",
                                            "Expected Business" : "",
                                            "Remark from Confirmator" : "",
                                            "Expense confirmatory Remarks" : "",
                                            "Expense confirmed date" : "",
                                            // "n_srno1" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {item3['srno']} </div> ,
                                        })

                                        test4.push({
                                            "Region" : "",
                                            "FS Name" : "",
                                            "HQ" : "",
                                            "PRP NO" : "",
                                            "PRP Date" : "",
                                            "PRP Name" : "",
                                            "Minimum Attendance" : "",
                                            "Name of Dr Expected to Attend PRP"  : <div className="textReport">{item3['docname']}</div>,
                                            "Name of FS Expected to Attend PRP" : <div className="textReport">{item3['fsname']}</div>,
                                            "Estimated PRP" : "",
                                            "Approve/Confirmed Total PRP" : "",
                                            "PRP ADVANCE" : "",
                                            "Total BTC" : "",
                                            "Actual no of Drs attended PRP" : "",
                                            "Actual PRP Date" : "",
                                            "Name of DR attended PRP" :  <div className="textReport">{item3['docname1']}</div>,
                                            "Name of FS attended PRP" :  <div className="textReport">{item3['fsname2']}</div>,
                                            "Expense against advance"  : "",
                                            "Total cost for BTC expense" : "",
                                            "Total Cost for PRP" : "",
                                            "Current Business" : "",
                                            "Expected Business" : "",
                                            "Remark from Confirmator" : "",
                                            "Expense confirmatory Remarks" : "",
                                            "Expense confirmed date" : "",
                                            // "n_srno1" : "",
                                        })
                                    }
                                })
                                    
                                }
                            }
                        }
                    }

                         var  adv    = "";
                         reg            = item2['Region'];
                         fs             = item2['FsName'];
                         fsn            = item2['FsName'];
                         hq             = item2['fscode'];

                        currentbusines      = currentbusines    + parseFloat(item2['CurBusiness']);
                        expectedbusines     = expectedbusines   + parseFloat(item2['ExpBusiness']);
                   
                        expenseestimated = expenseestimated + estamt;
                        
                        noofDocAttend       = noofDocAttend     + parseFloat(item2['minimumattendance']);
                        if (item2['actualadvacerecieved'] != "-1.00")
                        {
                            amountspend = amountspend + parseFloat(item2['Amtspend']);
                        }
                        advancereq          = advancereq        + adamt;
                        totalcostestimates  = totalcostestimates+ parseFloat(item2['n_BTC']);
                    
                        totalappconfcostestimates = totalappconfcostestimates + confamt;
                        
                        noofexpDocAttend    =noofexpDocAttend   +parseFloat(item2['cntexpdr']);
                        if (item2['actualadvacerecieved'] != "-1.00")
                        {
                            actualadvacerecieved = actualadvacerecieved + parseFloat(item2['actualadvacerecieved']);
                            actualbtc = actualbtc + parseFloat(item2['actualbtc']);
                        }
                     

                        if (advancereq == 0)
                        {
                            adv = "NIL";
                        }
                        else
                        {
                            adv = advancereq;
                        }


                        var advance = "";
                        fscurrentbusines        = fscurrentbusines      + parseFloat(item2['CurBusiness']);
                        fsexpectedbusines       = fsexpectedbusines     + parseFloat(item2['ExpBusiness']);
                    
                        fsexpenseestimated = fsexpenseestimated + parseFloat(estamt);
                        
                        fsnoofDocAttend         = fsnoofDocAttend       + parseFloat(item2['minimumattendance']);
                        if (item2['actualadvacerecieved'] != "-1.00")
                        {
                            fsamountspend = fsamountspend + parseFloat(item2['Amtspend']);
                        }
                        fsadvancereq            = fsadvancereq          + adamt;
                        fstotalcostestimates    = fstotalcostestimates  + parseFloat(item2['n_BTC']);
                    
                        fstotalappconfcostestimates = fstotalappconfcostestimates + confamt;
                        
                        fsnoofexpDocAttend      = fsnoofexpDocAttend    + parseFloat(item2['cntexpdr']);
                        if (item2['actualadvacerecieved'] != "-1.00")
                        {                           
                            fsactualadvacerecieved = fsactualadvacerecieved + parseFloat(item2['actualadvacerecieved']);
                            fsactualbtc = fsactualbtc + parseFloat(item2['actualbtc']);
                        }
                      



                        if (fsadvancereq == 0)
                        {
                            advance = "NIL";
                        }
                        else
                        {
                            advance = fsadvancereq;
                        }
                       
                        currentbusinesAllTotal      = currentbusinesAllTotal    + parseFloat(item2['CurBusiness']);
                        expectedbusinesAllTotal     = expectedbusinesAllTotal   + parseFloat(item2['ExpBusiness']);
                    
                        expenseestimatedAllTotal = expenseestimatedAllTotal + estamt;
                        
                        noofDocAttendAllTotal       = noofDocAttendAllTotal     + parseFloat(item2['minimumattendance']);
                        if (item2['actualadvacerecieved'] != "-1.00")
                        {
                            amountspendAllTotal = amountspendAllTotal + parseFloat(item2['Amtspend']);
                        }
                        advancereqAllTotal          = advancereqAllTotal        + adamt;
                        totalcostestimatesAllTotal  = totalcostestimatesAllTotal+ parseFloat(item2['n_BTC']);
                    
                        totalappconfcostestimatesAllTotal = totalappconfcostestimatesAllTotal + confamt;
                        
                        noofexpDocAttendAllTotal    = noofexpDocAttendAllTotal  + parseFloat(item2['cntexpdr']);
                        if (item2['actualadvacerecieved'] != "-1.00")
                        {
                            actualadvacerecievedAllTotal = actualadvacerecievedAllTotal + parseFloat(item2['actualadvacerecieved']);
                            actualbtcAllTotal = actualbtcAllTotal + parseFloat(item2['actualbtc']);
                        }
                     


                       

                        cregion     = item2['Region'];
                        cfs         = item2['FsName'];

                        //if (j == dt.Rows.Count-1)
						if (index==(Result.data.data[0].length)-1)
                        {
                            region  = item2['Region'];
                            fscode  = item2['FsCode'];
                            fsname  = item2['FsName'];
                            fshq    = item2['FSHQ'];
							
							test2.push({
								"Region" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:'Total'}} />,
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {sr11} </div> ,
								"PRP Date" : "",
								"PRP Name" : "",
								"Minimum Attendance" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsnoofDocAttend}} /> ,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fstotalcostestimates}} />,
								"Approve/Confirmed Total PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fstotalappconfcostestimates}} />,
								"PRP ADVANCE" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: advance}} />,
								"Total BTC" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpenseestimated}} />,
								"Actual no of Drs attended PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsnoofexpDocAttend}} />,
								"Actual PRP Date" : "",
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :  <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsactualadvacerecieved}} />,
								"Total cost for BTC expense" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsactualbtc}} />,
								"Total Cost for PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsamountspend}} />,
								"Current Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fscurrentbusines}} />,
								"Expected Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpectedbusines}} />,
								"Remark from Confirmator" : "",
								"Expense confirmatory Remarks" : "",
                                "Expense confirmed date" : "",
                                // "n_srno1" : "",
                            })
                            
                            test4.push({
								"Region" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:'Total'}} />,
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : "",
								"PRP Date" : "",
								"PRP Name" : "",
								"Minimum Attendance" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsnoofDocAttend}} /> ,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fstotalcostestimates}} />,
								"Approve/Confirmed Total PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fstotalappconfcostestimates}} />,
								"PRP ADVANCE" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: advance}} />,
								"Total BTC" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpenseestimated}} />,
								"Actual no of Drs attended PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsnoofexpDocAttend}} />,
								"Actual PRP Date" : "",
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :  <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsactualadvacerecieved}} />,
								"Total cost for BTC expense" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsactualbtc}} />,
								"Total Cost for PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsamountspend}} />,
								"Current Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fscurrentbusines}} />,
								"Expected Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpectedbusines}} />,
								"Remark from Confirmator" : "",
								"Expense confirmatory Remarks" : "",
                                "Expense confirmed date" : "",
                                // "n_srno1" : "",
							})
							
							test2.push({
								"Region" : <h5 style={{fontWeight: 'bold' ,textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {sr11} </div> ,
								"PRP Date" : "",
								"PRP Name" : "",
								"Minimum Attendance" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofDocAttend}} /> ,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totalcostestimates}} /> ,
								"Approve/Confirmed Total PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fstotalappconfcostestimates}} />,
								"PRP ADVANCE" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv}} /> ,
								"Total BTC" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expenseestimated}} />,
								"Actual no of Drs attended PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofexpDocAttend}} /> ,
								"Actual PRP Date" : "",
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualadvacerecieved}} /> ,
								"Total cost for BTC expense" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualbtc}} />,
								"Total Cost for PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: amountspend}} />,
								"Current Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusines}} />,
								"Expected Business" :  <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusines}} />,
								"Remark from Confirmator" : "",
								"Expense confirmatory Remarks" : "",
                                "Expense confirmed date" : "",
                                // "n_srno1" : "",
                            })
                            test4.push({
								"Region" : <h5 style={{fontWeight: 'bold' ,textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : "",
								"PRP Date" : "",
								"PRP Name" : "",
								"Minimum Attendance" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofDocAttend}} /> ,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totalcostestimates}} /> ,
								"Approve/Confirmed Total PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fstotalappconfcostestimates}} />,
								"PRP ADVANCE" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv}} /> ,
								"Total BTC" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expenseestimated}} />,
								"Actual no of Drs attended PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofexpDocAttend}} /> ,
								"Actual PRP Date" : "",
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualadvacerecieved}} /> ,
								"Total cost for BTC expense" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualbtc}} />,
								"Total Cost for PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: amountspend}} />,
								"Current Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusines}} />,
								"Expected Business" :  <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusines}} />,
								"Remark from Confirmator" : "",
								"Expense confirmatory Remarks" : "",
                                "Expense confirmed date" : "",
                                // "n_srno1" : "",
							})




                        }
                        else
                        {
                            region  = Result.data.data[0][index+1]['Region'];
                            fscode  = Result.data.data[0][index+1]['FsCode'];
                            fsname  = Result.data.data[0][index+1]['FsName'];
                            fshq    = Result.data.data[0][index+1]['FSHQ'];
                        }
                        if (cfs != fsname)
                        {
						
						test2.push({
								"Region" :<h5 style={{fontWeight: 'bold' ,textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Total'}} /> ,
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {sr11} </div> ,
								"PRP Date" : "",
								"PRP Name" : "",
								"Minimum Attendance" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsnoofDocAttend}} /> ,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fstotalcostestimates}} />,
								"Approve/Confirmed Total PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fstotalappconfcostestimates}} /> ,
								"PRP ADVANCE" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: advance}} />  ,
								"Total BTC" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpenseestimated}} />  ,
								"Actual no of Drs attended PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsnoofexpDocAttend}} /> ,
								"Actual PRP Date" : "",
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsactualadvacerecieved}} />  ,
								"Total cost for BTC expense" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsactualbtc}} />,
								"Total Cost for PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsamountspend}} /> ,
								"Current Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fscurrentbusines}} />,
								"Expected Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpectedbusines}} />,
								"Remark from Confirmator" : "",
								"Expense confirmatory Remarks" : "",
                                "Expense confirmed date" : "",
                                // "n_srno1" : "",
                            })
                            
                            test4.push({
								"Region" :<h5 style={{fontWeight: 'bold' ,textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Total'}} /> ,
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : "",
								"PRP Date" : "",
								"PRP Name" : "",
								"Minimum Attendance" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsnoofDocAttend}} /> ,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fstotalcostestimates}} />,
								"Approve/Confirmed Total PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fstotalappconfcostestimates}} /> ,
								"PRP ADVANCE" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: advance}} />  ,
								"Total BTC" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpenseestimated}} />  ,
								"Actual no of Drs attended PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsnoofexpDocAttend}} /> ,
								"Actual PRP Date" : "",
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsactualadvacerecieved}} />  ,
								"Total cost for BTC expense" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsactualbtc}} />,
								"Total Cost for PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsamountspend}} /> ,
								"Current Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fscurrentbusines}} />,
								"Expected Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpectedbusines}} />,
								"Remark from Confirmator" : "",
								"Expense confirmatory Remarks" : "",
                                "Expense confirmed date" : "",
                                // "n_srno1" : "",
							})

                            fscurrentbusines        = 0;
                            fsexpectedbusines       = 0;
                            fsexpenseestimated      = 0;
                            fsnoofDocAttend         = 0;
                            fsadvancereq            = 0;
                            fstotalcostestimates    = 0;
                            fstotalappconfcostestimates = 0;
                            fsnoofexpDocAttend      = 0;
                            fsactualadvacerecieved  = 0;
                            fsactualbtc             = 0;
                            fsamountspend           = 0;
                        }
                        if ((cregion != region))
                        {
						
						test2.push({
								"Region" :<h5 style={{fontWeight: 'bold' ,textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />  ,
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } > {sr11} </div> ,
								"PRP Date" : "",
								"PRP Name" : "",
								"Minimum Attendance" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofDocAttend}} />,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totalcostestimates}} />,
								"Approve/Confirmed Total PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totalappconfcostestimates}} />,
								"PRP ADVANCE" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv}} />,
								"Total BTC" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expenseestimated}} /> ,
								"Actual no of Drs attended PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofexpDocAttend}} />,
								"Actual PRP Date" : "",
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualadvacerecieved}} /> ,
								"Total cost for BTC expense" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualbtc}} />,
								"Total Cost for PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: amountspend}} />,
								"Current Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusines}} />,
								"Expected Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusines}} />,
								"Remark from Confirmator" : "",
								"Expense confirmatory Remarks" : "",
                                "Expense confirmed date" : "",
                                // "n_srno1" : "",
                            })
                            
                            test4.push({
								"Region" :<h5 style={{fontWeight: 'bold' ,textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />  ,
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : "",
								"PRP Date" : "",
								"PRP Name" : "",
								"Minimum Attendance" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofDocAttend}} />,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totalcostestimates}} />,
								"Approve/Confirmed Total PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totalappconfcostestimates}} />,
								"PRP ADVANCE" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv}} />,
								"Total BTC" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expenseestimated}} /> ,
								"Actual no of Drs attended PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofexpDocAttend}} />,
								"Actual PRP Date" : "",
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualadvacerecieved}} /> ,
								"Total cost for BTC expense" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualbtc}} />,
								"Total Cost for PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: amountspend}} />,
								"Current Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusines}} />,
								"Expected Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusines}} />,
								"Remark from Confirmator" : "",
								"Expense confirmatory Remarks" : "",
                                "Expense confirmed date" : "",
                                // "n_srno1" : "",
							})
                            

                            currentbusines      = 0;
                            expectedbusines     = 0;
                            expenseestimated    = 0;
                            noofDocAttend       = 0;
                            advancereq          = 0;
                            totalcostestimates  = 0;
                            totalappconfcostestimates = 0;
                            noofexpDocAttend    = 0;
                            actualadvacerecieved= 0;
                            actualbtc           = 0;
                           
                        }
                        prvregion = item2['Region'];
                    }
                }  
                })
				
				var adv1 = "";
                if (advancereqAllTotal == 0)
                {
                    adv1 = "NIL";
                }
                else
                {
                    adv1 = advancereqAllTotal;
                }
               if(Result.data.data[0].length>0)
                {
				test2.push({
								"Region" : <h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'All India Total'}} /> ,
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : <div className="note-text" style = {{'visibility' : 'hidden' } } >  {sr11} </div> ,
								"PRP Date" : "",
								"PRP Name" : "",
								"Minimum Attendance" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofDocAttendAllTotal}} /> ,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totalcostestimatesAllTotal}} /> ,
								"Approve/Confirmed Total PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totalappconfcostestimatesAllTotal}} /> ,
								"PRP ADVANCE" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv1}} /> ,
								"Total BTC" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expenseestimatedAllTotal}} /> ,
								"Actual no of Drs attended PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofexpDocAttendAllTotal}} /> ,
								"Actual PRP Date" : "",
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualadvacerecievedAllTotal}} /> ,
								"Total cost for BTC expense" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualbtcAllTotal}} />  ,
								"Total Cost for PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: amountspendAllTotal}} />  ,
								"Current Business" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusinesAllTotal}} />  ,
								"Expected Business" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusinesAllTotal}} />  ,
								"Remark from Confirmator" : "",
								"Expense confirmatory Remarks" : "",
                                "Expense confirmed date" : "",
                                // "n_srno1" : "",
                            })
                            
                            test4.push({
								"Region" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'All India Total'}} /> ,
								"FS Name" : "",
								"HQ" : "",
								"PRP NO" : "",
								"PRP Date" : "",
								"PRP Name" : "",
								"Minimum Attendance" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofDocAttendAllTotal}} /> ,
								"Name of Dr Expected to Attend PRP"  : "",
								"Name of FS Expected to Attend PRP" : "",
								"Estimated PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totalcostestimatesAllTotal}} /> ,
								"Approve/Confirmed Total PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totalappconfcostestimatesAllTotal}} /> ,
								"PRP ADVANCE" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv1}} /> ,
								"Total BTC" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expenseestimatedAllTotal}} /> ,
								"Actual no of Drs attended PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofexpDocAttendAllTotal}} /> ,
								"Actual PRP Date" : "",
								"Name of DR attended PRP" : "",
								"Name of FS attended PRP" : "",
								"Expense against advance"  : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualadvacerecievedAllTotal}} /> ,
								"Total cost for BTC expense" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualbtcAllTotal}} />  ,
								"Total Cost for PRP" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: amountspendAllTotal}} />  ,
								"Current Business" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusinesAllTotal}} />  ,
								"Expected Business" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusinesAllTotal}} />  ,
								"Remark from Confirmator" : "",
								"Expense confirmatory Remarks" : "",
                                "Expense confirmed date" : "",
                                // "n_srno1" : "",
							})

               
                        }
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
            this.setState({ loader:false })
              this.setState({ Result1: test2 })
              this.setState({ Result2: test4 })
              this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
            }
          }).catch(() => {
              alert("Error.")
            this.setState({ loader:false })
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })
       
       

    }

    render(){
       
        let {data,Result1,Result2,headder,entriescount,rowsperpage1}=this.state
        let header = [];
        let displayedColumns = [];
        let headerColums = [];
        // if(data==undefined){
        //     return null
        // }
        // if(data.length==0){
        //     return null
        // }
        if (data) {
            headerColums = Object.keys(data[0]).map(v => v);
            if (unslectedColumns.length == 0) {
                displayedColumns = headerColums;
            } else {
                displayedColumns = headerColums;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                unslectedColumns.map(unslectedColumn => {                                                   
                    displayedColumns = displayedColumns.filter(columnName => {
                        return columnName != unslectedColumn;
                    });
                });
            }
            // displayedColumns.map(item => {
            //     let headerList = {
            //         title: item,
            //         prop: item,
            //         sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            //         filterable: true
            //     };
            //     header.push(headerList);
            // });
            
        }
        // const header = [
        //      { prop: 'REGION', title: 'REGION', filterable: true,sortable:true },
        //      { prop: 'FS NAME', title: 'FS NAME', filterable: true,sortable:true },
        //      { prop: 'AREA', title: 'AREA', filterable: true,sortable:true },
        //      { prop: 'DATE', title: 'DATE', filterable: true,sortable:true },
        //      { prop: 'SRNO', title: 'SRNO', filterable: true,sortable:true },
        //      { prop: 'TYPE OF ACTIVITY', title: 'TYPE OF ACTIVITY', filterable: true,sortable:true },
        //      { prop: 'DOCTOR NAME', title: 'DOCTOR NAME', filterable: true,sortable:true },
        //      { prop: 'DOCTOR CATEGORY', title: 'DOCTOR CATEGORY', filterable: true,sortable:true },
        //      { prop: 'PRODUCT/BRAND/BRANDSION', title: 'PRODUCT/BRAND', filterable: true,sortable:true },
        //      { prop: 'CURRENT BUSINESS', title: 'CURRENT BUSINESS', filterable: true,sortable:true },
        //      { prop: 'EXPECTED BUSINESS', title: 'EXPECTED BUSINESS', filterable: true,sortable:true },
        //      { prop: 'ESTIMATED RPS AMOUNT', title: 'ESTIMATED RPS AMOUNT', filterable: true,sortable:true },
        //      { prop: 'ESTIMATED ADVANCE REQUIRED', title: 'ESTIMATED ADVANCE REQUIRED', filterable: true,sortable:true },
        //      { prop: ' BTC EXPENSE', title: ' BTC EXPENSE', filterable: true,sortable:true },
        //      { prop: 'EXPENSES AGAINST ADVANCE', title: 'EXPENSES AGAINST ADVANCE', filterable: true,sortable:true },
        //      { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'EXPENSE CONFIRMATORY REMARKS', filterable: true,sortable:true },
        //      { prop: 'EXPENSE CONFIRMED DATE', title: 'EXPENSE CONFIRMED DATE', filterable: true,sortable:true },
        //      { prop: 'EXPENSE DESK CONFIRMATORY REMARKS', title: 'EXPENSE DESK CONFIRMATORY REMARKS', filterable: true,sortable:true },
        //      { prop: 'EXPENSE DESK CONFIRMED DATE', title: 'EXPENSE DESK CONFIRMED DATE', filterable: true,sortable:true },

        //     //  { prop: 'TOTAL EXPENSE AMOUNT', title: 'TOTAL EXPENSE AMOUNT', filterable: true,sortable:true },
            
                       
        // ];

        //prp headding
    //     const header = [


    //         { prop: 'REGION'  , title:   'Region', filterable: true,sortable:true },    
    //         { prop: 'FS NAME'  , title:   'FS Name', filterable: true,sortable:true },     
    //         { prop: 'AREA'  , title:   'HQ', filterable: true,sortable:true },
    //         { prop: 'DATE' , title:   'Date Of Activity' , filterable: true,sortable:true }, 
    //         { prop: 'SRNO'  , title:   'PRP No' , filterable: true,sortable:true }, 
    //         { prop: 'TYPE OF ACTIVITY'  , title:   'Type Of Activity', filterable: true,sortable:true },  
    //         { prop: 'INVITED SPEAKER NAME' , title:    'Invited Speaker Name' , filterable: true,sortable:true }, 
    //         { prop: 'ITEM NAME'  , title:   'Product/Brand', filterable: true,sortable:true },  
    //         { prop: 'CURRENT BUSINESS' , title:    'Current Business' , filterable: true,sortable:true }, 
    //         { prop: 'EXPECTED BUSINESS' , title:    'Expected Business', filterable: true,sortable:true },  
    //         { prop: 'ADVANCE AMOUNT' , title:    'Total Cost Estimated For Advance', filterable: true,sortable:true },  
    //         { prop: 'TOTAL COST ESTIMATED' , title:    'Total Cost Estimated For PRP', filterable: true,sortable:true },  
    //         { prop: 'TOTAL COST ESTIMATED FOR BTC' , title:    'Total Cost Estimated For BTC' , filterable: true,sortable:true }, 
    //         { prop: 'TOTAL COST FOR PRP' , title:    'Total Cost For PRP' , filterable: true,sortable:true }, 
    //         { prop: 'TOTAL COST FOR BTC' , title:    'Total Cost For BTC' , filterable: true,sortable:true }, 
    //         { prop: 'TOTAL COST AGAINST ADVANCE', title:     'Total Cost Against Advance', filterable: true,sortable:true },  
    //         { prop: 'EXPENSE CONFIRMATORY REMARKS', title:     'Expense confirmatory Remarks', filterable: true,sortable:true },  
    //         { prop: 'EXPENSE CONFIRMED DATE' , title:    'Expense confirmed date', filterable: true,sortable:true }, 
                      
    //    ];

    

      
        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            entries: "entries",
            filterPlaceholder: "Search Anything",
            noResults: "There is no data to be displayed"
        };
        return(
            <div>
                <Loder show={this.state.loader}></Loder>
                 <ReportTablePRPACTIVITY
                 DivisionDropdown={this.DivisionDropdown}
                 RegionDropdown={this.RegionDropdown}
                 selecteddiv={this.state.selecteddiv}
                 selectedreg={this.state.selectedreg}
                    tableHeader={headder}
                    open={this.props.open}
                    tableBody={Result1}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    // rowsPerPage={10}
                    // rowsPerPageOption={[10, 20, 50, 100, 200,10000]}
                    rowsPerPage={rowsperpage1}
                    rowsPerPageOption={entriescount}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    applyFilter={this.applyFilterAll}
                    mainHead={this.state.mainHead}
                    expdata={Result2}
                    getUnselectedColumns={this.getUnselectedColumns}    
                />
            </div>
        )
    }
}

export default ReportListPRPACTIVITY