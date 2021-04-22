import React,{Component} from 'react'
import ReportTable from './ReportTable'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'
import { parse } from 'date-fns'
``
class ReportList extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'',
            selreg:'All',
            selrps:'All',
            selbr:'All',
            seldate:'',
            selyr:'',
            mnthname:'',
            yearname:'',
            Result1:[],
            divisioncode:'',
            header:[],
            loader:false,
            mainHead: "",
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
                         //console.log(columnName,'lll')
                         //console.log(unslectedColumn,'2222')
                        return columnName != unslectedColumn;
                    });
                });
            }
             //console.log(displayedColumns,'ddd')
            displayedColumns.map(item => {
                 //console.log(item,'mmmmm')
                 headerList = {
                    title: item,
                    prop: item,
                    sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    filterable: true
                };
                  this.setState({ headder:headerList});
                 //console.log(headerList,'hdrlist')
                hdr1.push(headerList)
            });
              //console.log(hdr1,'tttt')
              if(this.state.Result1.length>0)
            this.setState({
                displayedColumns :displayedColumns,header:hdr1
            });
this.setState({
    unslectedColumns
});
    }


    SelectedDivision(state){
       
        //console.log(state, "name")
       // console.log(state.name, "nameeeeeee")
        if(state.name=="Division")
        {
            
            this.setState({seldiv:state.rvalue})
            
        }
        else if(state.name=="Region")
        {
            
            this.setState({selreg:state.rvalue})
        }
        else if(state.name=="RPSname")
        {
           
            this.setState({selrps:state.rvalue})
        }
        else if(state.name=="Brand")
        {
            
            this.setState({selbr:state.rvalue})
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
        // alert({selectedreg:state})
        // alert('region block')
    }

    componentDidUpdate(){
        // alert(this.props.DivisionDropdown);
    }

    applyFilterAll(){
        this.setState({rowsperpage1:''})
        this.setState({rowsperpage1:10})
        this.setState({entriescount:''})
         
         if(this.state.seldate=="")
         {
            alert("Month not Selected ............")
                    return;
        } 
      if(this.state.selyr=="")
        {
             alert("Year not Selected ............")
                     return;
        }       
        this.setState({mainHead:"RPS Brand wise Report For  " + this.state.mnthname +','+ this.state.selyr} );
        this.setState({ loader:true })
        var travelModes={ "index": "BtnView",  data:{"DivisionCode":(this.state.seldiv=="")?this.state.divisioncode:this.state.seldiv,"RegionCode":this.state.selreg,"rpscode":this.state.selrps,"brandcode":this.state.selbr,"monthtype":this.state.seldate,"year":this.state.selyr}  }
      //  var travelModes={ "index": "BtnView",  data:{"DivisionCode":"All","RegionCode":"All","rpscode":"All","brandcode":"All","monthtype":"1","year":"2020"}  }
        let test12=[];
        var flag = false;
        
        
        
        var row = 0;
        //var brandcount = 0;

    console.log(travelModes);
        var rpsSrno = "";
        var rpsno = "";
        var Region = "";
        var Reg = "";
        var RegFrRemo = "0";
        var reggion ="";
        var re = "0";
        var Fsname = "";
        var fs = "0";
        var HQFS = "";
        var Hq = "0";
        var rpsname = "";
        var rps = "0";
        var PrpDate = "";
        var date = "0";
        var  rpsCost ="";
        var pcost = "0";
        var EstimatedAmnt ="";
        var est = "0";
        var KolAttend = "";
        var kol = "0";
        var actualvalue = "";


        var actualnoofDocAtteende = "";


        var currentbusines = 0;



        var expectedbusines = 0;
        var expenseestimated = 0;
        var prptcost = 0;
        var noofDocAttend = 0;
        var advanceamt = 0;

        var exptotal = 0;
        var expRegTotal = 0;
        var expGrandTotal = 0;
        //------
        var actualnoofdoc = 0;
        var docattend = 0;
        var totrps = 0;
        var totbtc = 0;
        var totadvance = 0;
        var currentbusinesAllTotal = 0;
        var expectedbusinesAllTotal = 0;
        var expenseestimatedAllTotal = 0;
        var rpstcostAllTotal = 0;
        var noofDocAttendAllTotal = 0;
        var advanceamtAllTotal = 0;
        var totrpsAllTotal = 0;
        var totrpsAllTotal1=0;
        var totbtcAllTotal = 0;
        var totbtcAllTotal1=0;
        var totadvanceAllTotal = 0;
        var totadvanceAllTotal1=0;


        var currentbusinesss = 0;
        var expectedbusinesss = 0;

        var currentbusinesssalltotal = 0;
        var expectedbusinesssalltotal = 0;

       
        var actualnoofdocAllTotal = 0;
        var docattendAllTotal = 0;

        var doccnt = "";
        var totalrps = "";
        var totalbtc = "";
        var totcstadvnce = "";
        var totcstadvncerps = "";
        var skipflag = false;
        var rowcount=0;

        let roundOff = (num, places) => {
            const x = Math.pow(10,places);
            return Math.round(num * x) / x;
          }
      // console.log(travelModes)
        postToServer("RPSBrandWiseRpt", travelModes).then((Result) => {
            console.log(Result);
            if (Result.data.Status == 'Success') {   
            // rowcount=Result.data.data.Length;
           //  console.log(rowcount,"count")
            //  console.log(Result.data.data.length,"lenghth")
                Result.data.data.map((item1,index) => {
                   // console.log(Result.data.data);
                  //  debugger;
               // alert(item1['RPS NO']);
                 // debugger;

                   var expenseconfimatoryremarks = item1['expenseconfremarks'];
                   var expenseconfirmeddate = item1['expenseconfirmeddate'];
                   var expensedeskconformatoryremarks = item1['ExpenseDeskConfRemarks'];
                   var expensedeskconfirmeddate =item1['expenseDeskconfirmeddate'];

                   var currentbusiness = item1['totalcurrentbussiness'];
                   var expectedbusiness = item1['totalexpectedbusiness'];
                   totalrps = "";
                   totalbtc = "";
                   totcstadvnce = "";
                 

                  
                       totalrps = item1['totalrp'];
                       totalbtc = item1['totalbtcexp'];
                       totcstadvnce = item1['N_ActualExpense'];
                       totcstadvncerps = item1['N_ActualExpense']; 
                       if (totcstadvnce == "0")
                       {
                           totcstadvnce = "NA";
                       }
                       else if (totcstadvnce == "00")
                       {
                           totcstadvnce = "";
                       }
                       else
                       {
                           totcstadvnce = item1['N_ActualExpense'];
                       }

                       if (totalbtc == "00")
                       {
                           totalbtc = "";
                       }
                      
                       else if (totalbtc == "0")
                       {
                           totalbtc = "NA";
                       }
                       else if (totalbtc == "000")
                       {
                           totalbtc = "0";
                       }
                       else
                       {
                           totalbtc = item1['totalbtcexp'];
                       }
                       if (totcstadvncerps == "0")
                       {
                           totalrps = "NA";
                       }
                       else if (totcstadvncerps == "00")
                       {
                           totalrps = "";
                       }
                       else 
                       {
                           totalrps = item1['totalrps'];
                       }
                   

                   var advamt = "";
                   var adamt = 0;
                   if (item1['Estamt'] == "0.00")
                   {
                       advamt = "NIL";
                       adamt = 0;
                   }
                   else
                   {
                       advamt = item1['Estamt'];
                       if (item1['Estamt']!= "")
                       {
                           adamt = item1['Estamt'];
                       }

                   }
                 //  strbActVal.Length = 0;
                
                 //  brandcount = dtBrand.Rows.Count;

                
                   exptotal = 0;

                   flag = false;
                   Reg = item1['Region'];
                   rpsno = item1['rpsno'];
                   if(Result.data.data.length>0)
                   {
                         this.setState({header:[
             { prop: 'Division', title: 'Division', filterable: true,sortable:true },
             { prop: 'Region', title: 'Region', filterable: true },
             { prop: 'FS Name', title: 'FS Name', filterable: true,sortable:true },
             { prop: 'HQ', title: 'HQ', filterable: true,sortable:true },
             { prop: 'RPS No', title: 'RPS No', filterable: true,sortable:true },
             { prop: 'RPS Name', title: 'RPS Name', filterable: true,sortable:true },
             { prop: 'RPS Requested Date', title: 'RPS Requested Date', filterable: true },
             { prop: 'RPS Date', title: 'RPS Date', filterable: true,sortable:true },
             { prop: 'Brand', title: 'Brand', filterable: true,sortable:true },
             { prop: 'Estimated RPS', title: 'Estimated RPS', filterable: true,sortable:true },
             { prop: 'Estimated BTC', title: 'Estimated BTC', filterable: true,sortable:true },
             { prop: 'Estimated Advance', title: 'Estimated Advance', filterable: true },
             { prop: 'Doctor Code', title: 'Doctor Code', filterable: true,sortable:true },
             { prop: 'Doctor Name', title: 'Doctor Name', filterable: true,sortable:true },
             { prop: 'Category of Doctor', title: 'Category of Doctor', filterable: true },
             { prop: 'Grade Of Doctor', title: 'Grade Of Doctor', filterable: true,sortable:true },
             { prop: 'Current Business', title: 'Current Business', filterable: true,sortable:true },
             { prop: 'Expected Business', title: 'Expected Business', filterable: true,sortable:true },
             { prop: 'Total Cost For RPS', title: 'Total Cost For RPS', filterable: true,sortable:true },
             { prop: 'Total cost for BTC Expense', title: 'Total cost for BTC Expense', filterable: true,sortable:true },
             { prop: 'Expense Against Advance', title: 'Expense Against Advance', filterable: true },
             { prop: 'Expense Confirmatory Remarks', title: 'Expense Confirmatory Remarks', filterable: true,sortable:true },
             { prop: 'Expense Confirmed Date', title: 'Expense Confirmed Date', filterable: true,sortable:true },
             { prop: 'Expense Desk Confirmatory Remarks', title: 'Expense Desk Confirmatory Remarks', filterable: true,sortable:true },
             { prop: 'Expense Desk Confirmed Date', title: 'Expense Desk Confirmed Date', filterable: true },                
                            ]});




        //     let header1 =[]
        // let displayedColumns = ['Division',
        // 'Region',
        // 'FS Name',
        // 'HQ',
        // 'RPS No',
        // 'RPS Name',
        // 'RPS Requested Date',
        // 'RPS Date',
        // 'Brand',
        // 'Estimated RPS',
        // 'Estimated BTC',
        // 'Estimated Advance',
        // 'Doctor Code',
        // 'Doctor Name',
        // 'Category of Doctor',
        // 'Grade Of Doctor',
        // 'Current Business',
        // 'Expected Business',
        // 'Total Cost For RPS',
        // 'Total cost for BTC Expense',
        // 'Expense Against Advance',
        // 'Expense Confirmatory Remarks',
        // 'Expense Confirmed Date',
        // 'Expense Desk Confirmatory Remarks',
        // 'Expense Desk Confirmed Date']
       

        // displayedColumns.map(item => {
        //     let headerList = {
        //         title: item,
        //         prop: item,
        //         sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        //         filterable: true
        //     };
        //      header1.push(headerList);
        // });
        // this.setState({headder:header1,displayedColumns:displayedColumns})

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
                displayedColumns :displayedColumns,header:hdr1
            });

        if (RegFrRemo != Region)
          {
    test12.push({
        "Division":<div className="textReport">{item1['Division']}</div>,
        "Region":<div className="textReport">{item1['Region']}</div>,
        "FS Name":<div className="textReport">{item1['FsName']}</div>,
        "HQ":<div className="textReport">{item1['FSHQ']}</div>,
        "RPS No":<div className="textReport">{item1['rpsno']}</div>,
        "RPS Name":<div className="textReport">{item1['rpsname']}</div>,
        "RPS Requested Date":<div className="textReport">{item1['RequestDate']}</div>,
        "RPS Date":<div className="textReport">{item1['rpsdate']}</div>,
       // "BRAND":"",
        "Brand":"",
        "Estimated RPS":<div className="textReport">{item1['rpsamnt']}</div>,
        "Estimated BTC":<div className="textReport">{item1['BTCEstimated']}</div>,
        "Estimated Advance":advamt,
        "Doctor Code":<div className="textReport">{item1['doccode']}</div>,
        "Doctor Name":<div className="textReport">{item1['docname']}</div>,
        "Category of Doctor":<div className="textReport">{item1['doccategory']}</div>,
        "Grade Of Doctor":<div className="textReport">{item1['docgrade']}</div>,
        "Current Business":"",
        "Expected Business":"",
        "Total Cost For RPS":<div className="textReport">{totalrps}</div>, 
        "Total cost for BTC Expense":<div className="textReport">{totalbtc}</div>,
        "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
        "Expense Confirmatory Remarks":<div className="note-text"> {expenseconfimatoryremarks} </div>,
        "Expense Confirmed Date":<div className="note-text"> {expenseconfirmeddate} </div>,
        "Expense Desk Confirmatory Remarks":<div className="note-text"> {expensedeskconformatoryremarks} </div>,
         "Expense Desk Confirmed Date":<div className="note-text"> {expensedeskconfirmeddate} </div>,
    })

    test12.push({
        "Division":"",
        "Region":"",
        "FS Name":"",
        "HQ":"",
        "RPS No":"",
        "RPS Name":"",
        "RPS Requested Date":"",
        "RPS Date":"",
       // "BRAND":"",
        "Brand":<div className="textReport">{item1['Brand']}</div>,
        "Estimated RPS":"",
        "Estimated BTC":"",
        "Estimated Advance":"",
        "Doctor Code":"",
        "Doctor Name":"",
        "Category of Doctor":"",
        "Grade Of Doctor":"",
        "Current Business":<div className="textReport">{item1['totalcurrentbussiness']}</div>,
        "Expected Business":<div className="textReport">{item1['totalexpectedbusiness']}</div>,
        "Total Cost For RPS":"", 
        "Total cost for BTC Expense":"",
        "Expense Against Advance":"",
        "Expense Confirmatory Remarks":"",
        "Expense Confirmed Date":"",
        "Expense Desk Confirmatory Remarks":"",
         "Expense Desk Confirmed Date":"",
    })
    expenseestimated = expenseestimated + parseFloat(item1['BTCEstimated']);
    prptcost = prptcost + parseFloat(item1['rpsamnt']);

    if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
    {
         totadvance = totadvance +parseFloat(item1['N_ActualExpense']);
        totbtc = totbtc + parseFloat(item1['totalbtcexp']);
        totrps = totrps + parseFloat(item1['totalrps']);
    }
    advanceamt = advanceamt + adamt;
    expenseestimatedAllTotal = expenseestimatedAllTotal + parseFloat(item1['BTCEstimated']);
    rpstcostAllTotal = rpstcostAllTotal + parseFloat(item1['rpsamnt']);
  
    if ((item1['N_ActualExpense'] != "0.00") && (item1['N_ActualExpense']!= ""))
    {
        totrpsAllTotal = totrpsAllTotal + parseFloat(item1['totalrps']);
        totrpsAllTotal1= totrpsAllTotal1 + parseFloat(item1['totalrps']);
        totbtcAllTotal = totbtcAllTotal + parseFloat(item1['totalbtcexp']);
        totbtcAllTotal1 = totbtcAllTotal1 + parseFloat(item1['totalbtcexp']);
        totadvanceAllTotal = totadvanceAllTotal + parseFloat(item1['N_ActualExpense']);
        totadvanceAllTotal1 = totadvanceAllTotal1 + parseFloat(item1['N_ActualExpense']);
    }
    advanceamtAllTotal = advanceamtAllTotal + adamt;
}
else    // remove division  if repeat in report
{
    if (re != reggion)
    {
       var adv1="";
       test12.push({
        "Division":<div className="textReport">{item1['Division']}</div>,
        "Region":<div className="textReport">{item1['Region']}</div>,
        "FS Name":<div className="textReport">{item1['FsName']}</div>,
        "HQ":<div className="textReport">{item1['FSHQ']}</div>,
        "RPS No":<div className="textReport">{item1['rpsno']}</div>,
        "RPS Name":<div className="textReport">{item1['rpsname']}</div>,
        "RPS Requested Date":<div className="textReport">{item1['RequestDate']}</div>,
        "RPS Date":<div className="textReport">{item1['rpsdate']}</div>,
       // "BRAND":"",
        "Brand":"",
        "Estimated RPS":<div className="textReport">{item1['rpsamnt']}</div>,
        "Estimated BTC":<div className="textReport">{item1['BTCEstimated']}</div>,
        "Estimated Advance":advamt,
        "Doctor Code":<div className="textReport">{item1['doccode']}</div>,
        "Doctor Name":<div className="textReport">{item1['docname']}</div>,
        "Category of Doctor":<div className="textReport">{item1['doccategory']}</div>,
        "Grade Of Doctor":<div className="textReport">{item1['docgrade']}</div>,
        "Current Business":"",
        "Expected Business":"",
        "Total Cost For RPS":<div className="textReport">{totalrps}</div>, 
        "Total cost for BTC Expense":<div className="textReport">{totalbtc}</div>,
        "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
        "Expense Confirmatory Remarks":<div className="note-text"> {expenseconfimatoryremarks} </div>,
        "Expense Confirmed Date":<div className="note-text"> {expenseconfirmeddate} </div>,
        "Expense Desk Confirmatory Remarks":<div className="note-text"> {expensedeskconformatoryremarks} </div>,
         "Expense Desk Confirmed Date":<div className="note-text"> {expensedeskconfirmeddate} </div>,
    })

    test12.push({
        "Division":"",
        "Region":"",
        "FS Name":"",
        "HQ":"",
        "RPS No":"",
        "RPS Name":"",
        "RPS Requested Date":"",
        "RPS Date":"",
       // "BRAND":"",
        "Brand":<div className="textReport">{item1['Brand']}</div>,
        "Estimated RPS":"",
        "Estimated BTC":"",
        "Estimated Advance":"",
        "Doctor Code":"",
        "Doctor Name":"",
        "Category of Doctor":"",
        "Grade Of Doctor":"",
        "Current Business":<div className="textReport">{item1['totalcurrentbussiness']}</div>,
        "Expected Business":<div className="textReport">{item1['totalexpectedbusiness']}</div>,
        "Total Cost For RPS":"", 
        "Total cost for BTC Expense":"",
        "Expense Against Advance":"",
        "Expense Confirmatory Remarks":"",
        "Expense Confirmed Date":"",
        "Expense Desk Confirmatory Remarks":"",
         "Expense Desk Confirmed Date":"",
    })
    expenseestimated = expenseestimated + parseFloat(item1['BTCEstimated']);
    prptcost = prptcost + parseFloat(item1['rpsamnt']);
    noofDocAttend = noofDocAttend + parseFloat(item1['kol']);


    if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
    {
        totrps = totrps + parseFloat(item1['totalrps']);
        totbtc = totbtc + parseFloat(item1['totalbtcexp']);
        totadvance = totadvance + parseFloat(item1['N_ActualExpense']);
    }
    advanceamt = advanceamt + adamt;
    expenseestimatedAllTotal = expenseestimatedAllTotal + parseFloat(item1['BTCEstimated']);
    rpstcostAllTotal = rpstcostAllTotal + parseFloat(item1['rpsamnt']);
 

       if ((item1['N_ActualExpense']!= "0.00")&&(item1['N_ActualExpense'] != ""))
    {
        totrpsAllTotal = totrpsAllTotal + parseFloat(item1['totalrps']);
        totrpsAllTotal1= totrpsAllTotal1 + parseFloat(item1['totalrps']);
        totbtcAllTotal = totbtcAllTotal + parseFloat(item1['otalbtcexp']);
        totbtcAllTotal1 = totbtcAllTotal1 + parseFloat(item1['otalbtcexp']);
        totadvanceAllTotal = totadvanceAllTotal + parseFloat(item1['N_ActualExpense']);
        totadvanceAllTotal1 = totadvanceAllTotal1 + parseFloat(item1['N_ActualExpense']);
    }
    advanceamtAllTotal = advanceamtAllTotal + adamt;
    if (advanceamt == 0)
    {
        adv1 = "NIL";
    }
    else
    {
        adv1 = advanceamt;
    }

    }
    else{
        if (fs != Fsname)
        {

            test12.push({
                "Division":<div className="textReport">{item1['Division']}</div>,
                "Region":<div className="textReport">{item1['Region']}</div>,
                "FS Name":<div className="textReport">{item1['FsName']}</div>,
                "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                "RPS No":<div className="textReport">{item1['rpsno']}</div>,
                "RPS Name":<div className="textReport">{item1['rpsname']}</div>,
                "RPS Requested Date":<div className="textReport">{item1['RequestDate']}</div>,
                "RPS Date":<div className="textReport">{item1['rpsdate']}</div>,
               // "BRAND":"",
                "Brand":"",
                "Estimated RPS":<div className="textReport">{item1['rpsamnt']}</div>,
                "Estimated BTC":<div className="textReport">{item1['BTCEstimated']}</div>,
                "Estimated Advance":advamt,
                "Doctor Code":<div className="textReport">{item1['doccode']}</div>,
                "Doctor Name":<div className="textReport">{item1['docname']}</div>,
                "Category of Doctor":<div className="textReport">{item1['doccategory']}</div>,
                "Grade Of Doctor":<div className="textReport">{item1['docgrade']}</div>,
                "Current Business":"",
                "Expected Business":"",
                "Total Cost For RPS":<div className="textReport">{totalrps}</div>, 
                "Total cost for BTC Expense":<div className="textReport">{totalbtc}</div>,
                "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                "Expense Confirmatory Remarks":<div className="note-text"> {expenseconfimatoryremarks} </div>,
                "Expense Confirmed Date":<div className="note-text"> {expenseconfirmeddate} </div>,
                "Expense Desk Confirmatory Remarks":<div className="note-text"> {expensedeskconformatoryremarks} </div>,
                 "Expense Desk Confirmed Date":<div className="note-text"> {expensedeskconfirmeddate} </div>,
            })
        
            test12.push({
                "Division":"",
                "Region":"",
                "FS Name":"",
                "HQ":"",
                "RPS No":"",
                "RPS Name":"",
                "RPS Requested Date":"",
                "RPS Date":"",
               // "BRAND":"",
                "Brand":<div className="textReport">{item1['Brand']}</div>,
                "Estimated RPS":"",
                "Estimated BTC":"",
                "Estimated Advance":"",
                "Doctor Code":"",
                "Doctor Name":"",
                "Category of Doctor":"",
                "Grade Of Doctor":"",
                "Current Business":<div className="textReport">{item1['totalcurrentbussiness']}</div>,
                "Expected Business":<div className="textReport">{item1['totalexpectedbusiness']}</div>,
                "Total Cost For RPS":"", 
                "Total cost for BTC Expense":"",
                "Expense Against Advance":"",
                "Expense Confirmatory Remarks":"",
                "Expense Confirmed Date":"",
                "Expense Desk Confirmatory Remarks":"",
                 "Expense Desk Confirmed Date":"",
            })
            expenseestimated = expenseestimated +parseFloat(item1['BTCEstimated']);
            prptcost = prptcost + parseFloat(item1['rpsamnt']);


            if ((item1['N_ActualExpense'] != "0.00") && (item1['N_ActualExpense'] != ""))
            {
                totrps = totrps + parseFloat(item1['totalrps']);
                totbtc = totbtc + parseFloat(item1['totalbtcexp']);
                totadvance = totadvance + parseFloat(item1['N_ActualExpense']);
            }
            advanceamt = advanceamt + adamt;
            expenseestimatedAllTotal = expenseestimatedAllTotal + parseFloat(item1['BTCEstimated']);
            rpstcostAllTotal = rpstcostAllTotal + parseFloat(item1['rpsamnt']);

            if ((item1['N_ActualExpense'] != "0.00") && (item1['N_ActualExpense'] != ""))
            {
                totrpsAllTotal = totrpsAllTotal + parseFloat(item1['totalrps']);
                totrpsAllTotal1= totrpsAllTotal1 + parseFloat(item1['totalrps']);
                totbtcAllTotal = totbtcAllTotal + parseFloat(item1['totalbtcexp']);
                totbtcAllTotal1 = totbtcAllTotal1 + parseFloat(item1['totalbtcexp']);
                totadvanceAllTotal = totadvanceAllTotal + parseFloat(item1['N_ActualExpense']);
                totadvanceAllTotal1 = totadvanceAllTotal1 + parseFloat(item1['N_ActualExpense']);
            }
            advanceamtAllTotal = advanceamtAllTotal + adamt;
        }
        else // remove fsnmae if repeat in report
        {
            if (Hq != HQFS)
                                {

                                    test12.push({
                                        "Division":<div className="textReport">{item1['Division']}</div>,
                                        "Region":<div className="textReport">{item1['Region']}</div>,
                                        "FS Name":<div className="textReport">{item1['FsName']}</div>,
                                        "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                                        "RPS No":<div className="textReport">{item1['rpsno']}</div>,
                                        "RPS Name":<div className="textReport">{item1['rpsname']}</div>,
                                        "RPS Requested Date":<div className="textReport">{item1['RequestDate']}</div>,
                                        "RPS Date":<div className="textReport">{item1['rpsdate']}</div>,
                                       // "BRAND":"",
                                        "Brand":"",
                                        "Estimated RPS":<div className="textReport">{item1['rpsamnt']}</div>,
                                        "Estimated BTC":<div className="textReport">{item1['BTCEstimated']}</div>,
                                        "Estimated Advance":advamt,
                                        "Doctor Code":<div className="textReport">{item1['doccode']}</div>,
                                        "Doctor Name":<div className="textReport">{item1['docname']}</div>,
                                        "Category of Doctor":<div className="textReport">{item1['doccategory']}</div>,
                                        "Grade Of Doctor":<div className="textReport">{item1['docgrade']}</div>,
                                        "Current Business":"",
                                        "Expected Business":"",
                                        "Total Cost For RPS":<div className="textReport">{totalrps}</div>, 
                                        "Total cost for BTC Expense":<div className="textReport">{totalbtc}</div>,
                                        "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                                        "Expense Confirmatory Remarks":<div className="note-text"> {expenseconfimatoryremarks} </div>,
                                        "Expense Confirmed Date":<div className="note-text"> {expenseconfirmeddate} </div>,
                                        "Expense Desk Confirmatory Remarks":<div className="note-text"> {expensedeskconformatoryremarks} </div>,
                                         "Expense Desk Confirmed Date":<div className="note-text"> {expensedeskconfirmeddate} </div>,
                                    })
                                
                                    test12.push({
                                        "Division":"",
                                        "Region":"",
                                        "FS Name":"",
                                        "HQ":"",
                                        "RPS No":"",
                                        "RPS Name":"",
                                        "RPS Requested Date":"",
                                        "RPS Date":"",
                                       // "BRAND":"",
                                        "Brand":<div className="textReport">{item1['Brand']}</div>,
                                        "Estimated RPS":"",
                                        "Estimated BTC":"",
                                        "Estimated Advance":"",
                                        "Doctor Code":"",
                                        "Doctor Name":"",
                                        "Category of Doctor":"",
                                        "Grade Of Doctor":"",
                                        "Current Business":<div className="textReport">{item1['totalcurrentbussiness']}</div>,
                                        "Expected Business":<div className="textReport">{item1['totalexpectedbusiness']}</div>,
                                        "Total Cost For RPS":"", 
                                        "Total cost for BTC Expense":"",
                                        "Expense Against Advance":"",
                                        "Expense Confirmatory Remarks":"",
                                        "Expense Confirmed Date":"",
                                        "Expense Desk Confirmatory Remarks":"",
                                         "Expense Desk Confirmed Date":"",
                                    })


                                    expenseestimated = expenseestimated + parseFloat(item1['BTCEstimated']);
                                    prptcost = prptcost + parseFloat(item1['rpsamnt']);
                                 

                                     if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
                                    {
                                        totrps = totrps +parseFloat(item1['totalrps']);
                                        totbtc = totbtc + parseFloat(item1['totalbtcexp']);
                                        totadvance = totadvance + parseFloat(item1['N_ActualExpense']);
                                    }
                                    advanceamt = advanceamt + adamt;
                                    expenseestimatedAllTotal = expenseestimatedAllTotal + parseFloat(item1['BTCEstimated']);
                                    rpstcostAllTotal = rpstcostAllTotal + parseFloat(item1['rpsamnt']);
                                 
                                     if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
                                    {
                                        totrpsAllTotal = totrpsAllTotal + parseFloat(item1['totalrps']);
                                        totrpsAllTotal1= totrpsAllTotal1 + parseFloat(item1['totalrps']);
                                        totbtcAllTotal = totbtcAllTotal + parseFloat(item1['totalbtcexp']);
                                        totbtcAllTotal1 = totbtcAllTotal1 + parseFloat(item1['totalbtcexp']);
                                        totadvanceAllTotal = totadvanceAllTotal + parseFloat(item1['N_ActualExpense']);
                                        totadvanceAllTotal1 = totadvanceAllTotal1+ parseFloat(item1['N_ActualExpense']);
                                    }
                                    advanceamtAllTotal = advanceamtAllTotal + adamt;
                                }
        else{
            if (rps != rpsname)// remove fshq if repeat in report
            {
                test12.push({
                    "Division":<div className="textReport">{item1['Division']}</div>,
                    "Region":<div className="textReport">{item1['Region']}</div>,
                    "FS Name":<div className="textReport">{item1['FsName']}</div>,
                    "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                    "RPS No":<div className="textReport">{item1['rpsno']}</div>,
                    "RPS Name":<div className="textReport">{item1['rpsname']}</div>,
                    "RPS Requested Date":<div className="textReport">{item1['RequestDate']}</div>,
                    "RPS Date":<div className="textReport">{item1['rpsdate']}</div>,
                   // "BRAND":"",
                    "Brand":"",
                    "Estimated RPS":<div className="textReport">{item1['rpsamnt']}</div>,
                    "Estimated BTC":<div className="textReport">{item1['BTCEstimated']}</div>,
                    "Estimated Advance":advamt,
                    "Doctor Code":<div className="textReport">{item1['doccode']}</div>,
                    "Doctor Name":<div className="textReport">{item1['docname']}</div>,
                    "Category of Doctor":<div className="textReport">{item1['doccategory']}</div>,
                    "Grade Of Doctor":<div className="textReport">{item1['docgrade']}</div>,
                    "Current Business":"",
                    "Expected Business":"",
                    "Total Cost For RPS":<div className="textReport">{totalrps}</div>, 
                    "Total cost for BTC Expense":<div className="textReport">{totalbtc}</div>,
                    "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                    "Expense Confirmatory Remarks":<div className="note-text"> {expenseconfimatoryremarks} </div>,
                    "Expense Confirmed Date":<div className="note-text"> {expenseconfirmeddate} </div>,
                    "Expense Desk Confirmatory Remarks":<div className="note-text"> {expensedeskconformatoryremarks} </div>,
                     "Expense Desk Confirmed Date":<div className="note-text"> {expensedeskconfirmeddate} </div>,
                })
            
                test12.push({
                    "Division":"",
                    "Region":"",
                    "FS Name":"",
                    "HQ":"",
                    "RPS No":"",
                    "RPS Name":"",
                    "RPS Requested Date":"",
                    "RPS Date":"",
                   // "BRAND":"",
                    "Brand":<div className="textReport">{item1['Brand']}</div>,
                    "Estimated RPS":"",
                    "Estimated BTC":"",
                    "Estimated Advance":"",
                    "Doctor Code":"",
                    "Doctor Name":"",
                    "Category of Doctor":"",
                    "Grade Of Doctor":"",
                    "Current Business":<div className="textReport">{item1['totalcurrentbussiness']}</div>,
                    "Expected Business":<div className="textReport">{item1['totalexpectedbusiness']}</div>,
                    "Total Cost For RPS":"", 
                    "Total cost for BTC Expense":"",
                    "Expense Against Advance":"",
                    "Expense Confirmatory Remarks":"",
                    "Expense Confirmed Date":"",
                    "Expense Desk Confirmatory Remarks":"",
                     "Expense Desk Confirmed Date":"",
                })



                expenseestimated = expenseestimated + parseFloat(item1['BTCEstimated']);
                prptcost = prptcost + parseFloat(item1['rpsamnt']);
               

                 if ((item1['N_ActualExpense']!= "0.00")&&(item1['N_ActualExpense'] != ""))
                {
                    totrps = totrps + parseFloat(item1['totalrps']);
                    totbtc = totbtc + parseFloat(item1['totalbtcexp']);
                    totadvance = totadvance + parseFloat(item1['N_ActualExpense']);
                }
                advanceamt = advanceamt + adamt;
                expenseestimatedAllTotal = expenseestimatedAllTotal + parseFloat(item1['BTCEstimated']);
                rpstcostAllTotal = rpstcostAllTotal + parseFloat(item1['rpsamnt']);
              
                 if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
                {
                    totrpsAllTotal = totrpsAllTotal + parseFloat(item1['totalrps']);
                    totrpsAllTotal1= totrpsAllTotal1 + parseFloat(item1['totalrps']);
                    totbtcAllTotal = totbtcAllTotal + parseFloat(item1["totalbtcexp"]);
                    totbtcAllTotal1 = totbtcAllTotal1 + parseFloat(item1["totalbtcexp"]);
                    totadvanceAllTotal = totadvanceAllTotal +parseFloat(item1['N_ActualExpense']);
                    totadvanceAllTotal1 = totadvanceAllTotal1 +parseFloat(item1['N_ActualExpense']);
                }
                advanceamtAllTotal = advanceamtAllTotal + adamt;
            }
        
        else // remove rpsname if repeat in report
        {
            if (date != PrpDate)
            {
                test12.push({
                    "Division":<div className="textReport">{item1['Division']}</div>,
                    "Region":<div className="textReport">{item1['Region']}</div>,
                    "FS Name":<div className="textReport">{item1['FsName']}</div>,
                    "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                    "RPS No":<div className="textReport">{item1['rpsno']}</div>,
                    "RPS Name":<div className="textReport">{item1['rpsname']}</div>,
                    "RPS Requested Date":<div className="textReport">{item1['RequestDate']}</div>,
                    "RPS Date":<div className="textReport">{item1['rpsdate']}</div>,
                   // "BRAND":"",
                    "Brand":"",
                    "Estimated RPS":<div className="textReport">{item1['rpsamnt']}</div>,
                    "Estimated BTC":<div className="textReport">{item1['BTCEstimated']}</div>,
                    "Estimated Advance":advamt,
                    "Doctor Code":<div className="textReport">{item1['doccode']}</div>,
                    "Doctor Name":<div className="textReport">{item1['docname']}</div>,
                    "Category of Doctor":<div className="textReport">{item1['doccategory']}</div>,
                    "Grade Of Doctor":<div className="textReport">{item1['docgrade']}</div>,
                    "Current Business":"",
                    "Expected Business":"",
                    "Total Cost For RPS":<div className="textReport">{totalrps}</div>, 
                    "Total cost for BTC Expense":<div className="textReport">{totalbtc}</div>,
                    "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                    "Expense Confirmatory Remarks":<div className="note-text"> {expenseconfimatoryremarks} </div>,
                    "Expense Confirmed Date":<div className="note-text"> {expenseconfirmeddate} </div>,
                    "Expense Desk Confirmatory Remarks":<div className="note-text"> {expensedeskconformatoryremarks} </div>,
                     "Expense Desk Confirmed Date":<div className="note-text"> {expensedeskconfirmeddate} </div>,
                })
            
                test12.push({
                    "Division":"",
                    "Region":"",
                    "FS Name":"",
                    "HQ":"",
                    "RPS No":"",
                    "RPS Name":"",
                    "RPS Requested Date":"",
                    "RPS Date":"",
                   // "BRAND":"",
                    "Brand":<div className="textReport">{item1['Brand']}</div>,
                    "Estimated RPS":"",
                    "Estimated BTC":"",
                    "Estimated Advance":"",
                    "Doctor Code":"",
                    "Doctor Name":"",
                    "Category of Doctor":"",
                    "Grade Of Doctor":"",
                    "Current Business":<div className="textReport">{item1['totalcurrentbussiness']}</div>,
                    "Expected Business":<div className="textReport">{item1['totalexpectedbusiness']}</div>,
                    "Total Cost For RPS":"", 
                    "Total cost for BTC Expense":"",
                    "Expense Against Advance":"",
                    "Expense Confirmatory Remarks":"",
                    "Expense Confirmed Date":"",
                    "Expense Desk Confirmatory Remarks":"",
                     "Expense Desk Confirmed Date":"",
                })  


                expenseestimated = expenseestimated + parseFloat(item1['BTCEstimated']);
                prptcost = prptcost +parseFloat(item1['rpsamnt']);
                                        

               if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
                  {
                           totrps = totrps + parseFloat(item1['totalrps']);
                         totbtc = totbtc + parseFloat(item1['totalbtcexp']);
                         totadvance = totadvance + parseFloat(item1['N_ActualExpense']);
                   }
                       advanceamt = advanceamt + adamt;
                   expenseestimatedAllTotal = expenseestimatedAllTotal + parseFloat(item1['BTCEstimated']);
                      rpstcostAllTotal = rpstcostAllTotal + parseFloat(item1['rpsamnt']);
                                         
                      if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
                     {
                               totrpsAllTotal = totrpsAllTotal + parseFloat(item1['totalrps']);
                               totrpsAllTotal1= totrpsAllTotal1 + parseFloat(item1['totalrps']);
                              totbtcAllTotal = totbtcAllTotal + parseFloat(item1['totalbtcexp']);
                              totbtcAllTotal1 = totbtcAllTotal1 + parseFloat(item1['totalbtcexp']);
                                 totadvanceAllTotal = totadvanceAllTotal + parseFloat(item1['N_ActualExpense']);
                                 totadvanceAllTotal1 = totadvanceAllTotal1 + parseFloat(item1['N_ActualExpense']);
                     }
                          advanceamtAllTotal = advanceamtAllTotal + adamt;
            }
            else // remove d_PrpDate if repeat in report
            {
                if (est != EstimatedAmnt)
                {
                    test12.push({
                        "Division":<div className="textReport">{item1['Division']}</div>,
                        "Region":<div className="textReport">{item1['Region']}</div>,
                        "FS Name":<div className="textReport">{item1['FsName']}</div>,
                        "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                        "RPS No":<div className="textReport">{item1['rpsno']}</div>,
                        "RPS Name":<div className="textReport">{item1['rpsname']}</div>,
                        "RPS Requested Date":<div className="textReport">{item1['RequestDate']}</div>,
                        "RPS Date":<div className="textReport">{item1['rpsdate']}</div>,
                       // "BRAND":"",
                        "Brand":"",
                        "Estimated RPS":<div className="textReport">{item1['rpsamnt']}</div>,
                        "Estimated BTC":<div className="textReport">{item1['BTCEstimated']}</div>,
                        "Estimated Advance":advamt,
                        "Doctor Code":<div className="textReport">{item1['doccode']}</div>,
                        "Doctor Name":<div className="textReport">{item1['docname']}</div>,
                        "Category of Doctor":<div className="textReport">{item1['doccategory']}</div>,
                        "Grade Of Doctor":<div className="textReport">{item1['docgrade']}</div>,
                        "Current Business":"",
                        "Expected Business":"",
                        "Total Cost For RPS":<div className="textReport">{totalrps}</div>, 
                        "Total cost for BTC Expense":<div className="textReport">{totalbtc}</div>,
                        "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                        "Expense Confirmatory Remarks":<div className="note-text"> {expenseconfimatoryremarks} </div>,
                        "Expense Confirmed Date":<div className="note-text"> {expenseconfirmeddate} </div>,
                        "Expense Desk Confirmatory Remarks":<div className="note-text"> {expensedeskconformatoryremarks} </div>,
                         "Expense Desk Confirmed Date":<div className="note-text"> {expensedeskconfirmeddate} </div>,
                    })
                
                    test12.push({
                        "Division":"",
                        "Region":"",
                        "FS Name":"",
                        "HQ":"",
                        "RPS No":"",
                        "RPS Name":"",
                        "RPS Requested Date":"",
                        "RPS Date":"",
                       // "BRAND":"",
                        "Brand":<div className="textReport">{item1['Brand']}</div>,
                        "Estimated RPS":"",
                        "Estimated BTC":"",
                        "Estimated Advance":"",
                        "Doctor Code":"",
                        "Doctor Name":"",
                        "Category of Doctor":"",
                        "Grade Of Doctor":"",
                        "Current Business":<div className="textReport">{item1['totalcurrentbussiness']}</div>,
                        "Expected Business":<div className="textReport">{item1['totalexpectedbusiness']}</div>,
                        "Total Cost For RPS":"", 
                        "Total cost for BTC Expense":"",
                        "Expense Against Advance":"",
                        "Expense Confirmatory Remarks":"",
                        "Expense Confirmed Date":"",
                        "Expense Desk Confirmatory Remarks":"",
                         "Expense Desk Confirmed Date":"",
                    })  
                    expenseestimated = expenseestimated + parseFloat(item1['BTCEstimated']);
                    prptcost = prptcost + parseFloat(item1['rpsamnt']);
                 
                     if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
                    {
                        totrps = totrps + parseFloat(item1['totalrps']);
                        totbtc = totbtc + parseFloat(item1['totalbtcexp']);
                        totadvance = totadvance + parseFloat(item1['N_ActualExpense']);
                    }
                    advanceamt = advanceamt + adamt;
                    expenseestimatedAllTotal = expenseestimatedAllTotal + parseFloat(item1['BTCEstimated']);
                    rpstcostAllTotal = rpstcostAllTotal + parseFloat(item1['rpsamnt']);
               

                     if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
                    {
                        totrpsAllTotal = totrpsAllTotal + parseFloat(item1['totalrps']);
                        totrpsAllTotal1= totrpsAllTotal1 + parseFloat(item1['totalrps']);
                        totbtcAllTotal = totbtcAllTotal + parseFloat(item1['totalbtcexp']);
                        totbtcAllTotal1=totbtcAllTotal1+parseFloat(item1['totalbtcexp']);
                        totadvanceAllTotal = totadvanceAllTotal + parseFloat(item1['N_ActualExpense']);
                        totadvanceAllTotal1 = totadvanceAllTotal1 + parseFloat(item1['N_ActualExpense']);
                    }
                    advanceamtAllTotal = advanceamtAllTotal + adamt;
                }
                else{
                    if (kol != KolAttend)
                    {

                        test12.push({
                            "Division":<div className="textReport">{item1['Division']}</div>,
                            "Region":<div className="textReport">{item1['Region']}</div>,
                            "FS Name":<div className="textReport">{item1['FsName']}</div>,
                            "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                            "RPS No":<div className="textReport">{item1['rpsno']}</div>,
                            "RPS Name":<div className="textReport">{item1['rpsname']}</div>,
                            "RPS Requested Date":<div className="textReport">{item1['RequestDate']}</div>,
                            "RPS Date":<div className="textReport">{item1['rpsdate']}</div>,
                           // "BRAND":"",
                            "Brand":"",
                            "Estimated RPS":<div className="textReport">{item1['rpsamnt']}</div>,
                            "Estimated BTC":<div className="textReport">{item1['BTCEstimated']}</div>,
                            "Estimated Advance":advamt,
                            "Doctor Code":<div className="textReport">{item1['doccode']}</div>,
                            "Doctor Name":<div className="textReport">{item1['docname']}</div>,
                            "Category of Doctor":<div className="textReport">{item1['doccategory']}</div>,
                            "Grade Of Doctor":<div className="textReport">{item1['docgrade']}</div>,
                            "Current Business":"",
                            "Expected Business":"",
                            "Total Cost For RPS":<div className="textReport">{totalrps}</div>, 
                            "Total cost for BTC Expense":<div className="textReport">{totalbtc}</div>,
                            "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                            "Expense Confirmatory Remarks":<div className="note-text"> {expenseconfimatoryremarks} </div>,
                            "Expense Confirmed Date":<div className="note-text"> {expenseconfirmeddate} </div>,
                            "Expense Desk Confirmatory Remarks":<div className="note-text"> {expensedeskconformatoryremarks} </div>,
                             "Expense Desk Confirmed Date":<div className="note-text"> {expensedeskconfirmeddate} </div>,
                        })
                    
                        test12.push({
                            "Division":"",
                            "Region":"",
                            "FS Name":"",
                            "HQ":"",
                            "RPS No":"",
                            "RPS Name":"",
                            "RPS Requested Date":"",
                            "RPS Date":"",
                           // "BRAND":"",
                            "Brand":<div className="textReport">{item1['Brand']}</div>,
                            "Estimated RPS":"",
                            "Estimated BTC":"",
                            "Estimated Advance":"",
                            "Doctor Code":"",
                            "Doctor Name":"",
                            "Category of Doctor":"",
                            "Grade Of Doctor":"",
                            "Current Business":<div className="textReport">{item1['totalcurrentbussiness']}</div>,
                            "Expected Business":<div className="textReport">{item1['totalexpectedbusiness']}</div>,
                            "Total Cost For RPS":"", 
                            "Total cost for BTC Expense":"",
                            "Expense Against Advance":"",
                            "Expense Confirmatory Remarks":"",
                            "Expense Confirmed Date":"",
                            "Expense Desk Confirmatory Remarks":"",
                             "Expense Desk Confirmed Date":"",
                        })  

                        expenseestimated = expenseestimated + parseFloat(item1["BTCEstimated"]);
                        prptcost = prptcost + parseFloat(item1['rpsamnt']);
                      
                         if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
                        {
                            totrps = totrps + parseFloat(item1['totalrps']);
                            totbtc = totbtc + parseFloat(item1['totalbtcexp']);
                            totadvance = totadvance + parseFloat(item1['N_ActualExpense']);
                        }
                        advanceamt = advanceamt + adamt;
                        expenseestimatedAllTotal = expenseestimatedAllTotal + parseFloat(item1['BTCEstimated']);
                        rpstcostAllTotal = rpstcostAllTotal +parseFloat(item1['rpsamnt']);
                      

                         if ((item1['N_ActualExpense'] != "0.00")&&(item1['N_ActualExpense'] != ""))
                        {
                            totrpsAllTotal = totrpsAllTotal + parseFloat(item1['totalrps']);
                            totrpsAllTotal1= totrpsAllTotal1 + parseFloat(item1['totalrps']);
                            totbtcAllTotal = totbtcAllTotal + parseFloat(item1['totalbtcexp']);
                            totbtcAllTotal1=totbtcAllTotal1+parseFloat(item1['totalbtcexp']);
                            totadvanceAllTotal = totadvanceAllTotal + parseFloat(item1['N_ActualExpense']);
                            totadvanceAllTotal1 = totadvanceAllTotal1 + parseFloat(item1['N_ActualExpense']);
                        }
                        advanceamtAllTotal = advanceamtAllTotal + adamt;
                    }
                    else
                    {

                        test12.push({
                            "Division":"",
                            "Region":"",
                            "FS Name":"",
                            "HQ":"",
                            "RPS No":"",
                            "RPS Name":"",
                            "RPS Requested Date":"",
                            "RPS Date":"",
                           // "BRAND":"",
                            "Brand":<div className="textReport">{item1['Brand']}</div>,
                            "Estimated RPS":"",
                            "Estimated BTC":"",
                            "Estimated Advance":"",
                            "Doctor Code":"",
                            "Doctor Name":"",
                            "Category of Doctor":"",
                            "Grade Of Doctor":"",
                            "Current Business":<div className="textReport">{item1['totalcurrentbussiness']}</div>,
                            "Expected Business":<div className="textReport">{item1['totalexpectedbusiness']}</div>,
                            "Total Cost For RPS":"", 
                            "Total cost for BTC Expense":"",
                            "Expense Against Advance":"",
                            "Expense Confirmatory Remarks":"",
                            "Expense Confirmed Date":"",
                            "Expense Desk Confirmatory Remarks":"",
                             "Expense Desk Confirmed Date":"",
                        })  
                        row = row + 1;


                    }
                }
            }


            }

        }

        }
    }


    }
    RegFrRemo = item1['Region'];
    Fsname = item1['FsName'];
    HQFS = item1['FSHQ'];
    rpsname = item1['rpsname'];
    reggion = item1['Region'];
    PrpDate = item1['rpsdate'];
    EstimatedAmnt = item1['BTCEstimated'];
    // advancereq = advamt;
    KolAttend = item1['doccode'];
    actualvalue = "";
    currentbusines = currentbusines + parseFloat(item1['totalcurrentbussiness']);
    expectedbusines = expectedbusines + parseFloat(item1['totalexpectedbusiness']);

    if ((item1['N_ActualExpense'] != "0.00") && (item1['N_ActualExpense'] != ""))
    {
        totrps = totrps + parseFloat(item1['totalrps']);
        totbtc = totbtc + parseFloat(item1['totalbtexp']);
        totadvance = totadvance + parseFloat(item1['N_ActualExpense']);
    }
    currentbusinesAllTotal = currentbusinesAllTotal + +parseFloat(item1['totalcurrentbussiness']);
    expectedbusinesAllTotal = expectedbusinesAllTotal + parseFloat(item1['totalexpectedbusiness']);

    if (index==(Result.data.data.length)-1)
    {

        var adv = "";

        if (advanceamt == 0)
        {
            adv = "NIL";
        }
        else
        {
            adv = advanceamt;
        }

        rpsSrno = item1['rpsno'];
        Region = item1['Region'];
        re = item1['Region'];
        fs =item1['FsName'];
        Hq = item1['FSHQ'];
        rps = item1['rpsname'];
        date = item1['rpsdate'];
        est = item1['BTCEstimated'];
        kol = item1['doccode'];

        // pnu 1
        if (flag == false)
        {
            test12.push({
                "Division":"",
                "Region":"",
                "FS Name":"",
                "HQ":"",
                "RPS No":"",
                "RPS Name":"",
                "RPS Requested Date":"",
                "RPS Date":"",
               // "BRAND":"",
                "Brand":"",
                "Estimated RPS":"",
                "Estimated BTC":"",
                "Estimated Advance":"",
                "Doctor Code":"",
                "Doctor Name":"",
                "Category of Doctor":"",
                "Grade Of Doctor":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:'Total'}} />,
                "Current Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(currentbusines,2)}} />,
                "Expected Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(expectedbusines,2)}} />,
                "Total Cost For RPS":"", 
                "Total cost for BTC Expense":"",
                "Expense Against Advance":"",
                "Expense Confirmatory Remarks":"",
                "Expense Confirmed Date":"",
                "Expense Desk Confirmatory Remarks":"",
                 "Expense Desk Confirmed Date":"",
            })
        
           

            //currentbusinesss = currentbusinesss + Convert.ToDouble(currentbusiness);
            //expectedbusinesss = expectedbusinesss + Convert.ToDouble(expectedbusiness);
            //end pnu
        }
        currentbusinesss = currentbusinesss + parseFloat(currentbusiness);
        expectedbusinesss = expectedbusinesss + parseFloat(expectedbusiness);
        currentbusinesssalltotal = currentbusinesssalltotal + parseFloat(currentbusinesss);
        expectedbusinesssalltotal = expectedbusinesssalltotal + parseFloat(expectedbusinesss);

        test12.push({
            "Division":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
            "Region":"",
            "FS Name":"",
            "HQ":"",
            "RPS No":"",
            "RPS Name":"",
            "RPS Requested Date":"",
            "RPS Date":"",
           // "BRAND":"",
            "Brand":"",
            "Estimated RPS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(prptcost,2)}} />,
            "Estimated BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(expenseestimated,2)}} />,
            "Estimated Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(parseFloat(adv),2)}} />,
            "Doctor Code":"",
            "Doctor Name":"",
            "Category of Doctor":"",
            "Grade Of Doctor":"",
            "Current Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(currentbusinesss,2)}} />,
            "Expected Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(expectedbusinesss,2)}} />,
            "Total Cost For RPS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(totrpsAllTotal1,2)}} />, 
            "Total cost for BTC Expense":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(totbtcAllTotal1,2)}} />,
            "Expense Against Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(totadvanceAllTotal1,2)}} />,
            "Expense Confirmatory Remarks":"",
            "Expense Confirmed Date":"",
            "Expense Desk Confirmatory Remarks":"",
             "Expense Desk Confirmed Date":"",
        })

    }
    else
    {

        skipflag = true;
        rpsSrno = Result.data.data[index+1]['rpsno'];
        Region = Result.data.data[index+1]['Region'];
        re = Result.data.data[index+1]['Region'];
        fs = Result.data.data[index+1]['FsName'];
        Hq =Result.data.data[index+1]['FSHQ'];
        rps =Result.data.data[index+1]['rpsname'];
        date = Result.data.data[index+1]['rpsdate'];
        est = Result.data.data[index+1]['BTCEstimated'];
        kol = Result.data.data[index+1]['doccode'];
    }

    if (rpsno != rpsSrno)
    {
        
        
        test12.push({
            "Division":"",
            "Region":"",
            "FS Name":"",
            "HQ":"",
            "RPS No":"",
            "RPS Name":"",
            "RPS Requested Date":"",
            "RPS Date":"",
           // "BRAND":"",
            "Brand":"",
            "Estimated RPS":"",
            "Estimated BTC":"",
            "Estimated Advance":"",
            "Doctor Code":"",
            "Doctor Name":"",
            "Category of Doctor":"",
            "Grade Of Doctor":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Total'}} />,
            "Current Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(currentbusines,2)}} />,
            "Expected Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(expectedbusines,2)}} />,
            "Total Cost For RPS":"", 
            "Total cost for BTC Expense":"",
            "Expense Against Advance":"",
            "Expense Confirmatory Remarks":"",
            "Expense Confirmed Date":"",
            "Expense Desk Confirmatory Remarks":"",
             "Expense Desk Confirmed Date":"",
        })
        skipflag = true;

        currentbusines = 0;
        expectedbusines = 0;
        currentbusinesss = currentbusinesss + parseFloat(currentbusiness);
        expectedbusinesss = expectedbusinesss +parseFloat(expectedbusiness);

        //currentbusinesssalltotal = currentbusinesssalltotal + curren
    }
    if (Reg != Region)
    {
        let adv1 = "";

        if (advanceamt == 0)
        {
            adv1 = "NIL";
        }
        else
        {
            adv1 = advanceamt;
        }


        currentbusinesssalltotal = currentbusinesssalltotal + parseFloat(currentbusinesss);
        expectedbusinesssalltotal = expectedbusinesssalltotal + parseFloat(expectedbusinesss);
        test12.push({
            "Division":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
            "Region":"",
            "FS Name":"",
            "HQ":"",
            "RPS No":"",
            "RPS Name":"",
            "RPS Requested Date":"",
            "RPS Date":"",
           // "BRAND":"",
            "Brand":"",
            "Estimated RPS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(prptcost,2)}} />,
            "Estimated BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(expenseestimated,2)}} />,
            "Estimated Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(parseFloat(adv1),2)}} />,
            "Doctor Code":"",
            "Doctor Name":"",
            "Category of Doctor":"",
            "Grade Of Doctor":"",
            "Current Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(currentbusinesss,2)}} />,
            "Expected Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(expectedbusinesss,2)}} />,
            "Total Cost For RPS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(totrpsAllTotal1,2)}} />, 
            "Total cost for BTC Expense":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(totbtcAllTotal1,2)}} />,
            "Expense Against Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(totadvanceAllTotal1,2)}} />,
            "Expense Confirmatory Remarks":"",
            "Expense Confirmed Date":"",
            "Expense Desk Confirmatory Remarks":"",
             "Expense Desk Confirmed Date":"",
        })
        prptcost = 0;
        currentbusines = 0;
        expectedbusines = 0;
        currentbusinesss = 0;
        expectedbusinesss = 0;
        expenseestimated = 0;
        noofDocAttend = 0;
        actualnoofdoc = 0;
        docattend = 0;
        row = 0;
        expRegTotal = 0;
        advanceamt = 0;
        totrpsAllTotal1=0;
        totbtcAllTotal1=0;
        totadvanceAllTotal1=0
    }
                   }

}
               

)
var advall="";
if (advanceamtAllTotal == 0)
{
    advall = "NIL";
}
else
{
    advall = advanceamtAllTotal;
}
//currentbusinesssalltotal = currentbusinesssalltotal + Convert.ToDouble(currentbusinesss);
//expectedbusinesssalltotal = expectedbusinesssalltotal + Convert.ToDouble(expectedbusinesssalltotal);
if(Result.data.data.length>0)
{
test12.push({
    "Division":<h5 style={{fontWeight: 'bold' ,textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'All India Total'}} />,
    "Region":"",
    "FS Name":"",
    "HQ":"",
    "RPS No":"",
    "RPS Name":"",
    "RPS Requested Date":"",
    "RPS Date":"",
   // "BRAND":"",
    "Brand":"",
    "Estimated RPS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(rpstcostAllTotal,2)}} />,
    "Estimated BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(expenseestimatedAllTotal,2)}} />,
    "Estimated Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(parseFloat(advall),2)}} />,
    "Doctor Code":"",
    "Doctor Name":"",
    "Category of Doctor":"",
    "Grade Of Doctor":"",
    "Current Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(currentbusinesssalltotal,2)}} />,
    "Expected Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(expectedbusinesssalltotal,2)}} />,
    "Total Cost For RPS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(totrpsAllTotal,2)}} />, 
    "Total cost for BTC Expense":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(totbtcAllTotal,2)}} />,
    "Expense Against Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(totadvanceAllTotal,2)}} />,
    "Expense Confirmatory Remarks":"",
    "Expense Confirmed Date":"",
    "Expense Desk Confirmatory Remarks":"",
     "Expense Desk Confirmed Date":"",
})

}






               
            

/////////////////////////////////


                       




            this.setState({ loader:false })
            //console.log(test12,"jjj")
              this.setState({ Result1: test12 })
              this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
            }
           
          }).catch(() => {
            this.setState({ loader:false })
            console.log("error")
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })

    }

    componentDidMount(){


        this.setState({hdrcoldefault : ['Division',
        'Region',
        'FS Name',
        'HQ',
        'RPS No',
        'RPS Name',
        'RPS Requested Date',
        'RPS Date',
        'Brand',
        'Estimated RPS',
        'Estimated BTC',
        'Estimated Advance',
        'Doctor Code',
        'Doctor Name',
        'Category of Doctor',
        'Grade Of Doctor',
        'Current Business',
        'Expected Business',
        'Total Cost For RPS',
        'Total cost for BTC Expense',
        'Expense Against Advance',
        'Expense Confirmatory Remarks',
        'Expense Confirmed Date',
        'Expense Desk Confirmatory Remarks',
        'Expense Desk Confirmed Date']})


        this.setState({rowsperpage1:10})
        this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]});
        let ddd='';
        var defre={ "index": "LoginFSDetails",  data:{}  }

        postToServer("PrpDetailsRpt", defre).then((Result) => {
        if (Result.data.Status == 'Success') {   
            Result.data.data.map((item1,index) => {
               // this.setState({RegionCode:item1['c_div_code']});
                this.setState({divisioncode:(item1['c_div_code']=="")?"All":item1['c_div_code']});
            })
         }
        
        }).catch(() => {
                    
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })

        this.setState({header:[
            { prop: 'Division', title: '', filterable: true,sortable:false },
        ]});


    }
    





    render(){
        let {Result1,header,entriescount,rowsperpage1}=this.state
       
        const {  data, toggleHeader, unslectedColumns } = this.state;
        // let header = [];
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
            displayedColumns.map(item => {
                //console.log(item,'bbbb')
                let headerList = {
                    title: item,
                    prop: item,
                    sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    filterable: true
                };
                header.push(headerList);
            });
            
        }
        // let {Result1}=this.state
        // const header = [
        //      { prop: 'Division', title: 'Division', filterable: true,sortable:true },
        //      { prop: 'Region', title: 'Region', filterable: true },
        //      { prop: 'FS Name', title: 'FS Name', filterable: true,sortable:true },
        //      { prop: 'HQ', title: 'HQ', filterable: true,sortable:true },
        //      { prop: 'RPS No', title: 'RPS No', filterable: true,sortable:true },
        //      { prop: 'RPS Name', title: 'RPS Name', filterable: true,sortable:true },
        //      { prop: 'RPS Requested Date', title: 'RPS Requested Date', filterable: true },
        //      { prop: 'RPS Date', title: 'RPS Date', filterable: true,sortable:true },
        //     { prop: 'Brand', title: 'Brand', filterable: true,sortable:true },
        //     { prop: 'Estimated RPS', title: 'Estimated RPS', filterable: true,sortable:true },
        //     { prop: 'Estimated BTC', title: 'Estimated BTC', filterable: true,sortable:true },
        //     { prop: 'Estimated Advance', title: 'Estimated Advance', filterable: true },
        //    { prop: 'Doctor Code', title: 'Doctor Code', filterable: true,sortable:true },
        //     { prop: 'Doctor Name', title: 'Doctor Name', filterable: true,sortable:true },
        //     { prop: 'Category of Doctor', title: 'Category of Doctor', filterable: true },
        //     { prop: 'Grade Of Doctor', title: 'Grade Of Doctor', filterable: true,sortable:true },
        //     { prop: 'Current Business', title: 'Current Business', filterable: true,sortable:true },
        //     { prop: 'Expected Business', title: 'Expected Business', filterable: true,sortable:true },
        //    { prop: 'Total Cost For RPS', title: 'Total Cost For RPS', filterable: true,sortable:true },
        //    { prop: 'Total cost for BTC Expense', title: 'Total cost for BTC Expense', filterable: true,sortable:true },
        //      { prop: 'Expense Against Advance', title: 'Expense Against Advance', filterable: true },
        //     { prop: 'Expense Confirmatory Remarks', title: 'Expense Confirmatory Remarks', filterable: true,sortable:true },
        //     { prop: 'Expense Confirmed Date', title: 'Expense Confirmed Date', filterable: true,sortable:true },
        //     { prop: 'Expense Desk Confirmatory Remarks', title: 'Expense Desk Confirmatory Remarks', filterable: true,sortable:true },
        //    { prop: 'Expense Desk Confirmed Date', title: 'Expense Desk Confirmed Date', filterable: true },
            
          
         
                       
        // ];

      




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
       // console.log(this.props.abc,"madhu")
        return(
            <div>
                <Loder show={this.state.loader}></Loder>
                 <ReportTable
                 DivisionDropdown={this.DivisionDropdown}
                 RegionDropdown={this.RegionDropdown}

                 selecteddiv={this.state.selecteddiv}
                 selectedreg={this.state.selectedreg}
                    tableHeader={header}
                    open={this.props.open}
                    tableBody={Result1}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    // rowsPerPage={10}
                    // rowsPerPageOption={[10, 20, 50, 100, 200]}
                    rowsPerPage={rowsperpage1}
                    rowsPerPageOption={entriescount}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    applyFilter={this.applyFilterAll}
                    mainHead={this.state.mainHead}
                    expdata={Result1}
                    getUnselectedColumns={this.getUnselectedColumns}
                />
            </div>
        )
    }
}

export default ReportList