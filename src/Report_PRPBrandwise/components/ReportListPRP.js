import React,{Component} from 'react'
import ReportTablePRP from './ReportTablePRP'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'

class ReportListPRP extends Component{
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
            divisioncode:'',
            Result1:[],
            loader:false,
            header:[],
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
                displayedColumns :displayedColumns,header:hdr1
            });
  this.setState({
    unslectedColumns
  });
    }



    SelectedDivision(state){
       
        //console.log(state, "name")
       // console.log(state.name, "nameeeeeee")
    //    alert(state.name)
        if(state.name=="Division")
        {
            
            this.setState({seldiv:state.rvalue})
            
        }
        else if(state.name=="Region")
        {
            
            this.setState({selreg:state.rvalue})
        }
        else if(state.name=="PRPname")
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
            alert("Date not Selected ............")
                    return;
        } 
        if(this.state.selyr=="")
         {
            alert("Year not Selected ............")
                return;
        } 
        //var vv='All';    
        // if(this.state.selrps=="")
        // {
        //     vv='All'

        // }  
        this.setState({mainHead:"PRP Brand wise Activity Report For  " + this.state.mnthname +','+ this.state.selyr} );
        this.setState({ loader:true })
       var travelModes={ "index": "BtnView",  data:{"DivisionCode":(this.state.seldiv=="")?this.state.divisioncode:this.state.seldiv,"RegionCode":this.state.selreg,"PrpName":this.state.selrps,"Brand":this.state.selbr,"Month":this.state.seldate,"Year":this.state.selyr}  }
        // var travelModes={ "index": "BtnView",  data:{"DivisionCode":"All","RegionCode":"All","PrpName":"All","Brand":"All","Month":"1","Year":"2020"}  }
        let test12=[];
				var prpSrno = "";
                var prpno = "";
                var Region = "";
                var Reg = "";
                var RegFrRemo = "0";
                var reggion = "";
                var re = "0";
                var Fsname = "";
                var fs = "0";
                var HQFS = "";
                var Hq = "0";
                var Prpname = "";
                var prp = "0";
                var PrpDate = "";
                var date = "0";
                var PrpCost = "";

                var pcost = "0";
                var prpBTC = "";

                var EstimatedAmnt = "";
                var est = "0";
                var KolAttend = "";
                var kol = "0";
                var actualvalue = "";

                

                var actualnoofDocAtteende = "";


                var currentbusines = 0;



                var expectedbusines = 0;
                var expenseestimated = 0;
                var prptcost = 0;
                var esimateprp = 0;
                var noofDocAttend = 0;
                var advanceamt = 0;
                var exptotal = 0;
                var expRegTotal = 0;
                var expGrandTotal = 0;
                var actualnoofdoc = 0;
                var docattend = 0;
                var totprp = 0;
                var totbtc = 0;
                var totadvance = 0;
                var currentbusinesAllTotal = 0;
                var expectedbusinesAllTotal = 0;
                var expenseestimatedAllTotal = 0;
                var prptcostAllTotal = 0;
                var esimateprpAllTotal = 0;
                var noofDocAttendAllTotal = 0;
                var advanceamtAllTotal = 0;
                var totprpAllTotal = 0;
                var totbtcAllTotal = 0;
                var totadvanceAllTotal = 0;


                var currentbusinesss = 0;
                var expectedbusinesss = 0;
                var currentbusinesssalltotal = 0;
                var expectedbusinesssalltotal = 0;
                var actualnoofdocAllTotal = 0;
                var docattendAllTotal = 0;
                 

                var doccnt = "";
                var totalprp = "";
                var totalbtc = "";
                var totcstadvnce = "";
                var prpcost = "";
                var currentbustot = "";
                var expectbusinesstot = "";
                var skipflag = false;
                var flag = "false";
                var expenseconfimatoryremarks="";
                var expenseconfirmeddate ="";
                var currentbusiness="";
                var expectedbusiness="";

                var advall = "";

        console.log(travelModes)

        postToServer("PRPBrndWisRpt", travelModes).then((Result) => {
          //  debugger;
              if (Result.data.Status == 'Success') {   
                  console.log(Result,"results");
                  
                   console.log(Result.data.data[0],"data . data")
                //    Result.data.data[0].map((item1,index) => {
                   Result.data.data[0].map((item1,index) => {
				// debugger;
					 expenseconfimatoryremarks =  item1['ExpenseConfRemarks'];
                     expenseconfirmeddate =  item1['expenseconfirmeddate'];
					
					 currentbusiness =  item1['totalcurrentbussiness'];
                     expectedbusiness =  item1['totalexpectedbusiness'];
                    doccnt =  item1['n_No_expDrAttended'];
                    if (doccnt == "00")
                    {
                        doccnt = "";
                    }

                    var prptotprp = 0;
                    if ( item1['n_PRPCost'] == "-1" ||  item1['n_PRPCost'] == "-1.00")
                    {
                        prpcost = 'NA';
                        prptotprp = 0;

                    }
                    else
                    {
                        prpcost =  item1['n_PRPCost'];

                        if ( item1['n_PRPCost'] != "")
                        {
                            prptotprp = parseFloat( item1['n_PRPCost']);
                        }
                    }
					
					var prptotbtc = 0;
                    if ( item1['n_EstimatedAmount'] == "-1" ||  item1['n_EstimatedAmount'] == "-1.00")
                    {
                        prpBTC = "NA";
                        prptotbtc = 0;
                       

                    }
                    else
                    {
                        prpBTC =  item1['n_EstimatedAmount'];

                        if ( item1['n_EstimatedAmount'] != "")
                        {
                            prptotbtc = parseFloat( item1['n_EstimatedAmount']);
                        }
                    }

                    


                    if ( item1['n_AdvReceived'] == "-1" ||  item1['n_AdvReceived'] == "-1.0000" ||  item1['n_AdvReceived'] == "-1.00")
                    {
                        totcstadvnce = "NA";
                        totalbtc = "NA";
                        totalprp = "NA";

                    }
                    else
                    {
                        if (totcstadvnce == "00")
                        {
                            totcstadvnce = "";
                        }
                        else
                        {
                            totcstadvnce =  item1['n_AdvReceived'];
                        }

                        if (totalbtc == "00")
                        {
                            totalbtc = "";
                        }
                        else
                        {
                            totalbtc =  item1['n_totBtc'];
                        }
                        if (totalprp == "00")
                        {
                            totalprp = "";
                        }
                        else
                        {
                            totalprp =  item1['n_TotPrp'];
                        }
                    }

                    var advamt = "";
                    var adamt = 0;
                    if ( item1['n_Advanceamt'] == "-999.00")
                    {
                        advamt = "NIL";
                        adamt = 0;
                    }
                    else
                    {
                        advamt =  item1['n_Advanceamt'];
                        if ( item1['n_Advanceamt'] != "")
                        {
                            adamt = parseFloat( item1['n_Advanceamt']);
                        }

                    }

                   
					if ( item1['n_No_DrAttended'] == "0")
                    {
                        actualnoofDocAtteende = "";
                    }
                    else
                    {
                        actualnoofDocAtteende =  item1['n_No_DrAttended'];
                    }
                    if(Result.data.data[0].length>0)
                    {
                     this.setState({header:[
                  //  const header = [
        

                             { prop: 'Division', title: 'Division', filterable: true,sortable:true },
                             { prop: 'Region', title: 'Region', filterable: true,sortable:true },
                             { prop: 'FS Name', title: 'FS Name', filterable: true,sortable:true },
                             { prop: 'HQ', title: 'HQ', filterable: true,sortable:true },
                             { prop: 'PRP No', title: 'PRP No', filterable: true,sortable:true },
                             { prop: 'PRP Name', title: 'PRP Name', filterable: true,sortable:true },
                             { prop: 'PRP Requested Date', title: 'PRP Requested Date', filterable: true,sortable:true },
                             { prop: 'PRP Date', title: 'PRP Date', filterable: true,sortable:true },
                             { prop: 'Brand', title: 'Brand', filterable: true,sortable:true },
                             { prop: 'Estimated PRP', title: 'Estimated PRP', filterable: true,sortable:true },
                             { prop: 'Approve/Confirmed Total PRP', title: 'Approve/Confirmed Total PRP', filterable: true,sortable:true },
                             { prop: 'Total BTC', title: 'Total BTC', filterable: true,sortable:true },
                             { prop: 'PRP Advance', title: 'PRP Advance', filterable: true,sortable:true },
                             { prop: 'Invited Speaker Name', title: 'Invited Speaker Name', filterable: true,sortable:true },
                             { prop: 'No Of Drs Expected', title: 'No Of Drs Expected', filterable: true,sortable:true },
                             { prop: 'Current Business', title: 'Current Business', filterable: true,sortable:true },
                             { prop: 'Expected Business', title: 'Expected Business', filterable: true,sortable:true },           
                             { prop: 'Doctors Expected To Attend', title: 'Doctors Expected To Attend', filterable: true,sortable:true },
                             { prop: 'Total Cost For PRP', title: 'Total Cost For PRP', filterable: true,sortable:true },
                             { prop: 'Total Cost For BTC Expense', title: 'Total Cost For BTC Expense', filterable: true,sortable:true },
                             { prop: 'Expense Against Advance', title: 'Expense Against Advance', filterable: true,sortable:true },
                             { prop: 'Expense Confirmatory Remarks', title: 'Expense Confirmatory Remarks', filterable: true,sortable:true },
                             { prop: 'Expense Confirmed Date', title: 'Expense Confirmed Date', filterable: true,sortable:true },
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
                           console.log(hdr1,'tttt')
                         this.setState({
                             displayedColumns :displayedColumns,header:hdr1
                         });


					if (date != item1['d_prpdate'])
                    {
                        if (prpno != prpSrno)
                    {
                        test12.push({
                            "Division":<div className="textReport">{item1['Division']}</div>,
                            "Region":<div className="textReport">{item1['Region']}</div>,
                            "FS Name":<div className="textReport">{item1['FsName']}</div>,
                            "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                            "PRP No":<div className="textReport">{item1['prpSrno']}</div>,
                            "PRP Name":<div className="textReport">{item1['PrpName']}</div>,
                            "PRP Requested Date":<div className="textReport">{item1['d_PostedDate']}</div>,
                            "PRP Date":<div className="textReport">{item1['d_prpdate']}</div>,
                            "Brand":"",
                            "Estimated PRP":<div className="textReport">{item1['esimateprp']}</div>,
                            "Approve/Confirmed Total PRP":<div className="textReport">{item1['n_PRPCost']}</div>,
                            "Total BTC":<div className="textReport">{item1['n_totBtc']}</div>,
                            "PRP Advance":<div className="textReport">{item1['n_Advanceamt']}</div>,
                            "Invited Speaker Name":<div className="textReport">{item1['c_InvitSpeakCom']}</div>,
                            "No Of Drs Expected":<div className="textReport">{item1['kol']}</div>,
                            "Current Business":"",
                            "Expected Business":"",
                            "Doctors Expected To Attend":<div className="textReport">{actualnoofDocAtteende}</div>,
                            "Total Cost For PRP":<div className="textReport">{totalprp}</div>,
                            "Total Cost For BTC Expense":<div className="textReport">{totalbtc}</div>, 
                            "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                            "Expense Confirmatory Remarks":<div className=" textReport"> {item1['ExpenseConfRemarks']} </div>,
                            "Expense Confirmed Date":<div className="textReport">{item1['expenseconfirmeddate']}</div>,
                            
                        })
                    }
					}
					
					exptotal = 0;

                    Reg =  item1['Region'];
                    prpno =  item1['prpSrno'];
                    flag = "false";
                    if(item1['prpSrno']=="6030")
                    {
                        // debugger
                    }
					
					if (RegFrRemo != Region)
                    {

                      
						test12.push({
                                "Division":<div className="textReport">{item1['Division']}</div>,
                                "Region":<div className="textReport">{item1['Region']}</div>,
                                "FS Name":<div className="textReport">{item1['FsName']}</div>,
                                "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                                "PRP No":<div className="textReport">{item1['prpSrno']}</div>,
                                "PRP Name":<div className="textReport">{item1['PrpName']}</div>,
                                "PRP Requested Date":<div className="textReport">{item1['d_PostedDate']}</div>,
                                "PRP Date":<div className="textReport">{item1['d_prpdate']}</div>,
                                "Brand":"",
                                "Estimated PRP":<div className="textReport">{item1['esimateprp']}</div>,
                                "Approve/Confirmed Total PRP":<div className="textReport">{item1['n_PRPCost']}</div>,
                                "Total BTC":<div className="textReport">{item1['n_totBtc']}</div>,
                                "PRP Advance":<div className="textReport">{item1['n_Advanceamt']}</div>,
                                "Invited Speaker Name":<div className="textReport">{item1['c_InvitSpeakCom']}</div>,
                                "No Of Drs Expected":<div className="textReport">{item1['kol']}</div>,
                                "Current Business":"",
                                "Expected Business":"",
                                "Doctors Expected To Attend":<div className="textReport">{actualnoofDocAtteende}</div>,
                                "Total Cost For PRP":<div className="textReport">{totalprp}</div>,
                                "Total Cost For BTC Expense":<div className="textReport">{totalbtc}</div>, 
                                "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                                "Expense Confirmatory Remarks":<div className="note-text textReport"> {item1['ExpenseConfRemarks']} </div>,
                                "Expense Confirmed Date":<div className="textReport">{item1['expenseconfirmeddate']}</div>,
                                
                            })

                            test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":<div className="textReport">{item1['brand']}</div>,
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"",
                               "Current Business":<div className="textReport">{item1['n_CurrBussiness']}</div>,
                                "Expected Business":<div className="textReport">{item1['n_ExpBussiness']}</div>,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"", 
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                 
                            });

                        expenseestimated = expenseestimated + prptotbtc;
						
                        prptcost = prptcost + prptotprp;
                        
                        esimateprp = parseFloat(esimateprp) + parseFloat( item1['esimateprp']);
                        noofDocAttend = parseFloat(noofDocAttend) + parseFloat( item1['kol']);
                         actualnoofdoc = parseFloat(actualnoofdoc) + parseFloat( item1['n_No_DrAttended']);
                        docattend = parseFloat(docattend) + parseFloat( item1['n_No_expDrAttended']);


                        if ( item1['n_AdvReceived'] != "-1")
                        {
                            if ( item1['n_AdvReceived'] != "-1.0000")
                            {
                                totadvance = parseFloat(totadvance) + parseFloat( item1['n_AdvReceived']);
                                totbtc = parseFloat(totbtc) + parseFloat( item1['n_totBtc']);
                                totprp = parseFloat(totprp) + parseFloat( item1['n_TotPrp']);
                            }
                        }
                        advanceamt = parseFloat(advanceamt) + parseFloat(adamt);
                        expenseestimatedAllTotal = expenseestimatedAllTotal + prptotbtc;
                        
                        prptcostAllTotal = parseFloat(prptcostAllTotal) + parseFloat(prptotprp);
                        esimateprpAllTotal = parseFloat(esimateprpAllTotal) + parseFloat( item1['esimateprp']);
                        noofDocAttendAllTotal = parseFloat(noofDocAttendAllTotal)+ parseFloat( item1['kol']);

                      
                        actualnoofdocAllTotal = parseFloat(actualnoofdocAllTotal) + parseFloat( item1['n_No_DrAttended']);
                        docattendAllTotal = parseFloat(docattendAllTotal) + parseFloat( item1['n_No_expDrAttended']);

                        if ( item1['n_AdvReceived'] != "-1")
                        {
                            if ( item1['n_AdvReceived'] != "-1.0000")
                            {
                                totprpAllTotal = parseFloat(totprpAllTotal) + parseFloat( item1['n_TotPrp']);
                                totbtcAllTotal = parseFloat(totbtcAllTotal) + parseFloat( item1['n_totBtc']);
                                totadvanceAllTotal = parseFloat(totadvanceAllTotal) + parseFloat( item1['n_AdvReceived']);
                            }
                        }
                        advanceamtAllTotal = parseFloat(advanceamtAllTotal) + parseFloat(adamt);



                    }
					else    // remove division  if repeat in report
                    {
                        if (re != reggion)
                        {

                            var adv1 = "";

							test12.push({
                                "Division":<div className="textReport">{item1['Division']}</div>,
                                "Region":<div className="textReport">{item1['Region']}</div>,
                                "FS Name":<div className="textReport">{item1['FsName']}</div>,
                                "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                                "PRP No":<div className="textReport">{item1['prpSrno']}</div>,
                                "PRP Name":<div className="textReport">{item1['PrpName']}</div>,
                                "PRP Requested Date":<div className="textReport">{item1['d_PostedDate']}</div>,
                                "PRP Date":<div className="textReport">{item1['d_prpdate']}</div>,
                                "Brand":"",
                                "Estimated PRP":<div className="textReport">{item1['esimateprp']}</div>,
                                "Approve/Confirmed Total PRP":<div className="textReport">{item1['n_PRPCost']}</div>,
                                "Total BTC":<div className="textReport">{item1['n_totBtc']}</div>,
                                "PRP Advance":<div className="textReport">{item1['n_Advanceamt']}</div>,
                                "Invited Speaker Name":<div className="textReport">{item1['c_InvitSpeakCom']}</div>,
                                "No Of Drs Expected":<div className="textReport">{item1['kol']}</div>,
                                "Current Business":"",
                                "Expected Business":"",
                                "Doctors Expected To Attend":<div className="textReport">{actualnoofDocAtteende}</div>,
                                "Total Cost For PRP":<div className="textReport">{totalprp}</div>,
                                "Total Cost For BTC Expense":<div className="textReport">{totalbtc}</div>, 
                                "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                                "Expense Confirmatory Remarks":<div className="note-text textReport"> {item1['ExpenseConfRemarks']} </div>,
                                "Expense Confirmed Date":<div className="textReport">{item1['expenseconfirmeddate']}</div>,
                                
                            })

                            test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":<div className="textReport">{item1['brand']}</div>,
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"",
                               "Current Business":<div className="textReport">{item1['n_CurrBussiness']}</div>,
                                "Expected Business":<div className="textReport">{item1['n_ExpBussiness']}</div>,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"", 
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                 
                            });

                            expenseestimated = parseFloat(expenseestimated) + parseFloat(prptotbtc);
                           
                            prptcost = parseFloat(prptcost) + parseFloat(prptotprp);
                            
                            esimateprp = parseFloat(esimateprp) + parseFloat( item1['esimateprp']);
                            noofDocAttend = parseFloat(noofDocAttend) + parseFloat( item1['kol']);
                            actualnoofdoc = parseFloat(actualnoofdoc) + parseFloat( item1['n_No_DrAttended']);
                            docattend = parseFloat(docattend) + parseFloat( item1['n_No_expDrAttended']);

                            if ( item1['n_AdvReceived'] != "-1")
                            {
                                if ( item1['n_AdvReceived'] != "-1.0000")
                                {
                                    totprp = parseFloat(totprp) + parseFloat( item1['n_TotPrp']);
                                    totbtc = parseFloat(totbtc) + parseFloat( item1['n_totBtc']);
                                    totadvance = parseFloat(totadvance) + parseFloat( item1['n_AdvReceived']);
                                }
                            }
                            advanceamt = parseFloat(advanceamt) + parseFloat(adamt);
                            expenseestimatedAllTotal = parseFloat(expenseestimatedAllTotal) + parseFloat(prptotbtc);

                            
                            prptcostAllTotal = parseFloat(prptcostAllTotal) +parseFloat(prptotprp);
                            
                            esimateprpAllTotal = parseFloat(esimateprpAllTotal) + parseFloat( item1['esimateprp']);
                            noofDocAttendAllTotal = parseFloat(noofDocAttendAllTotal) + parseFloat( item1['kol']);
                            
                            actualnoofdocAllTotal = parseFloat(actualnoofdocAllTotal) + parseFloat( item1['n_No_DrAttended']);
                            docattendAllTotal = parseFloat(docattendAllTotal) + parseFloat( item1['n_No_expDrAttended']);

                            if ( item1['n_AdvReceived'] != "-1" )
                            {
                                if ( item1['n_AdvReceived'] != "-1.0000")
                                {
                                    totprpAllTotal = parseFloat(totprpAllTotal) + parseFloat( item1['n_TotPrp']);
                                    totbtcAllTotal = parseFloat(totbtcAllTotal) + parseFloat( item1['n_totBtc']);
                                    totadvanceAllTotal = parseFloat(totadvanceAllTotal) + parseFloat( item1['n_AdvReceived']);
                                }
                            }
                            advanceamtAllTotal = parseFloat(advanceamtAllTotal) + parseFloat(adamt);
                            if (advanceamt == 0)
                            {
                                adv1 = "NIL";
                            }
                            else
                            {
                                adv1 = parseFloat(advanceamt);
                            }
                        }
                        else  // remove region if repeat in report
                        {
                            if (fs != Fsname)
                            {

                              test12.push({
                                "Division":<div className="textReport">{item1['Division']}</div>,
                                "Region":<div className="textReport">{item1['Region']}</div>,
                                "FS Name":<div className="textReport">{item1['FsName']}</div>,
                                "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                                "PRP No":<div className="textReport">{item1['prpSrno']}</div>,
                                "PRP Name":<div className="textReport">{item1['PrpName']}</div>,
                                "PRP Requested Date":<div className="textReport">{item1['d_PostedDate']}</div>,
                                "PRP Date":<div className="textReport">{item1['d_prpdate']}</div>,
                                "Brand":"",
                                "Estimated PRP":<div className="textReport">{item1['esimateprp']}</div>,
                                "Approve/Confirmed Total PRP":<div className="textReport">{item1['n_PRPCost']}</div>,
                                "Total BTC":<div className="textReport">{item1['n_totBtc']}</div>,
                                "PRP Advance":<div className="textReport">{item1['n_Advanceamt']}</div>,
                                "Invited Speaker Name":<div className="textReport">{item1['c_InvitSpeakCom']}</div>,
                                "No Of Drs Expected":<div className="textReport">{item1['kol']}</div>,
                                "Current Business":"",
                                "Expected Business":"",
                                "Doctors Expected To Attend":<div className="textReport">{actualnoofDocAtteende}</div>,
                                "Total Cost For PRP":<div className="textReport">{totalprp}</div>,
                                "Total Cost For BTC Expense":<div className="textReport">{totalbtc}</div>, 
                                "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                                "Expense Confirmatory Remarks":<div className=" textReport"> {item1['ExpenseConfRemarks']} </div>,
                                "Expense Confirmed Date":<div className="textReport">{item1['expenseconfirmeddate']}</div>,
                                
                            })

                            test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":<div className="textReport">{item1['brand']}</div>,
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"",
                               "Current Business":<div className="textReport">{item1['n_CurrBussiness']}</div>,
                                "Expected Business":<div className="textReport">{item1['n_ExpBussiness']}</div>,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"", 
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                 
                            });

                                expenseestimated = parseFloat(expenseestimated) + parseFloat(prptotbtc);
                               
                                prptcost = parseFloat(prptcost) + parseFloat(prptotprp);

                                esimateprp = parseFloat(esimateprp) + parseFloat( item1['esimateprp']);
                                noofDocAttend = parseFloat(noofDocAttend) + parseFloat( item1['kol']);
                                 actualnoofdoc = parseFloat(actualnoofdoc) + parseFloat( item1['n_No_DrAttended']);
                                docattend = parseFloat(docattend) + parseFloat( item1['n_No_expDrAttended']);

                                if ( item1['n_AdvReceived'] != "-1")
                                {
                                    if ( item1['n_AdvReceived'] != "-1.0000")
                                    {
                                        totprp = parseFloat(totprp) + parseFloat( item1['n_TotPrp']);
                                        totbtc = parseFloat(totbtc) + parseFloat( item1['n_totBtc']);
                                        totadvance = parseFloat(totadvance) + parseFloat( item1['n_AdvReceived']);
                                    }
                                }
                                advanceamt = parseFloat(advanceamt) + parseFloat(adamt);
                                expenseestimatedAllTotal = parseFloat(expenseestimatedAllTotal) + parseFloat(prptotbtc);
                                
                                prptcostAllTotal = parseFloat(prptcostAllTotal) + parseFloat(prptotprp);
                                
                                esimateprpAllTotal = parseFloat(esimateprpAllTotal) + parseFloat( item1['esimateprp']);
                                noofDocAttendAllTotal = parseFloat(noofDocAttendAllTotal) + parseFloat( item1['kol']);
                               
                                 actualnoofdocAllTotal = parseFloat(actualnoofdocAllTotal) + parseFloat( item1['n_No_DrAttended']);
                                docattendAllTotal = parseFloat(docattendAllTotal) + parseFloat( item1['n_No_expDrAttended']);

                                if ( item1['n_AdvReceived'] != "-1" )
                                {
                                    if ( item1['n_AdvReceived'] != "-1.0000")
                                    {
                                        totprpAllTotal = parseFloat(totprpAllTotal) + parseFloat( item1['n_TotPrp']);
                                        totbtcAllTotal = parseFloat(totbtcAllTotal) + parseFloat( item1['n_totBtc']);
                                        totadvanceAllTotal = parseFloat(totadvanceAllTotal) + parseFloat( item1['n_AdvReceived']);
                                    }
                                }
                                advanceamtAllTotal = advanceamtAllTotal + adamt;
                            }
                            else  // remove fsnmae if repeat in report
                            {
                                if (Hq != HQFS)
                                {

                                 test12.push({
                                "Division":<div className="textReport">{item1['Division']}</div>,
                                "Region":<div className="textReport">{item1['Region']}</div>,
                                "FS Name":<div className="textReport">{item1['FsName']}</div>,
                                "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                                "PRP No":<div className="textReport">{item1['prpSrno']}</div>,
                                "PRP Name":<div className="textReport">{item1['PrpName']}</div>,
                                "PRP Requested Date":<div className="textReport">{item1['d_PostedDate']}</div>,
                                "PRP Date":<div className="textReport">{item1['d_prpdate']}</div>,
                                "Brand":"",
                                "Estimated PRP":<div className="textReport">{item1['esimateprp']}</div>,
                                "Approve/Confirmed Total PRP":<div className="textReport">{item1['n_PRPCost']}</div>,
                                "Total BTC":<div className="textReport">{item1['n_totBtc']}</div>,
                                "PRP Advance":<div className="textReport">{item1['n_Advanceamt']}</div>,
                                "Invited Speaker Name":<div className="textReport">{item1['c_InvitSpeakCom']}</div>,
                                "No Of Drs Expected":<div className="textReport">{item1['kol']}</div>,
                                "Current Business":"",
                                "Expected Business":"",
                                "Doctors Expected To Attend":<div className="textReport">{actualnoofDocAtteende}</div>,
                                "Total Cost For PRP":<div className="textReport">{totalprp}</div>,
                                "Total Cost For BTC Expense":<div className="textReport">{totalbtc}</div>, 
                                "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                                "Expense Confirmatory Remarks":<div className="note-text textReport"> {item1['ExpenseConfRemarks']} </div>,
                                "Expense Confirmed Date":<div className="textReport">{item1['expenseconfirmeddate']}</div>,
                                
                            })

                            test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":<div className="textReport">{item1['brand']}</div>,
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"",
                               "Current Business":<div className="textReport">{item1['n_CurrBussiness']}</div>,
                                "Expected Business":<div className="textReport">{item1['n_ExpBussiness']}</div>,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"", 
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                 
                            });


                                    expenseestimated = parseFloat(expenseestimated) + parseFloat(prptotbtc);
                                    //commented by sinu
                                    //prptcost = prptcost + parseFloat( item1['n_PRPCost']);
                                    prptcost = parseFloat(prptcost) + parseFloat(prptotprp);
                                    esimateprp = parseFloat(esimateprp) + parseFloat( item1['esimateprp']);
                                    noofDocAttend = parseFloat(noofDocAttend) + parseFloat( item1['kol']);
                                     actualnoofdoc = parseFloat(actualnoofdoc) + parseFloat( item1['n_No_DrAttended']);
                                    docattend = parseFloat(docattend) + parseFloat( item1['n_No_expDrAttended']);

                                    if ( item1['n_AdvReceived'] != "-1")
                                    {
                                        if ( item1['n_AdvReceived'] != "-1.0000")
                                        {
                                            totprp = parseFloat(totprp) + parseFloat( item1['n_TotPrp']);
                                            totbtc = parseFloat(totbtc) + parseFloat( item1['n_totBtc']);
                                            totadvance = parseFloat(totadvance) + parseFloat( item1['n_AdvReceived']);
                                        }
                                    }
                                    advanceamt = parseFloat(advanceamt) + parseFloat(adamt);
                                    expenseestimatedAllTotal = parseFloat(expenseestimatedAllTotal) + parseFloat(prptotbtc);
                                    
                                    prptcostAllTotal = parseFloat(prptcostAllTotal) + parseFloat(prptotprp);
                                    
                                    esimateprpAllTotal = parseFloat(esimateprpAllTotal) + parseFloat( item1['esimateprp']);
                                    noofDocAttendAllTotal = parseFloat(noofDocAttendAllTotal) + parseFloat( item1['kol']);
                                  
                                    actualnoofdocAllTotal = parseFloat(actualnoofdocAllTotal) + parseFloat( item1['n_No_DrAttended']);
                                    docattendAllTotal = parseFloat(docattendAllTotal) + parseFloat( item1['n_No_expDrAttended']);

                                    if ( item1['n_AdvReceived'] != "-1" )
                                    {
                                        if ( item1['n_AdvReceived'] != "-1.0000")
                                        {
                                            totprpAllTotal = parseFloat(totprpAllTotal) + parseFloat( item1['n_TotPrp']);
                                            totbtcAllTotal = parseFloat(totbtcAllTotal) + parseFloat( item1['n_totBtc']);
                                            totadvanceAllTotal = parseFloat(totadvanceAllTotal) + parseFloat( item1['n_AdvReceived']);
                                        }
                                    }
                                    advanceamtAllTotal = parseFloat(advanceamtAllTotal) + parseFloat(adamt);
                                }
                                else  // remove fshq if repeat in report
                                {
                                    if (prp != Prpname)
                                    {

                                        test12.push({
                                "Division":<div className="textReport">{item1['Division']}</div>,
                                "Region":<div className="textReport">{item1['Region']}</div>,
                                "FS Name":<div className="textReport">{item1['FsName']}</div>,
                                "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                                "PRP No":<div className="textReport">{item1['prpSrno']}</div>,
                                "PRP Name":<div className="textReport">{item1['PrpName']}</div>,
                                "PRP Requested Date":<div className="textReport">{item1['d_PostedDate']}</div>,
                                "PRP Date":<div className="textReport">{item1['d_prpdate']}</div>,
                                "Brand":"",
                                "Estimated PRP":<div className="textReport">{item1['esimateprp']}</div>,
                                "Approve/Confirmed Total PRP":<div className="textReport">{item1['n_PRPCost']}</div>,
                                "Total BTC":<div className="textReport">{item1['n_totBtc']}</div>,
                                "PRP Advance":<div className="textReport">{item1['n_Advanceamt']}</div>,
                                "Invited Speaker Name":<div className="textReport">{item1['c_InvitSpeakCom']}</div>,
                                "No Of Drs Expected":<div className="textReport">{item1['kol']}</div>,
                                "Current Business":"",
                                "Expected Business":"",
                                "Doctors Expected To Attend":<div className="textReport">{actualnoofDocAtteende}</div>,
                                "Total Cost For PRP":<div className="textReport">{totalprp}</div>,
                                "Total Cost For BTC Expense":<div className="textReport">{totalbtc}</div>, 
                                "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                                "Expense Confirmatory Remarks":<div className="note-text textReport"> {item1['ExpenseConfRemarks']} </div>,
                                "Expense Confirmed Date":<div className="textReport">{item1['expenseconfirmeddate']}</div>,
                                
                            })

                            test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":<div className="textReport">{item1['brand']}</div>,
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"",
                               "Current Business":<div className="textReport">{item1['n_CurrBussiness']}</div>,
                                "Expected Business":<div className="textReport">{item1['n_ExpBussiness']}</div>,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"", 
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                 
                            });


                                        expenseestimated = parseFloat(expenseestimated) +parseFloat(prptotbtc);
                                       
                                        prptcost = parseFloat(prptcost) + parseFloat(prptotprp);
                                        
                                        esimateprp = parseFloat(esimateprp) + parseFloat( item1['esimateprp']);
                                        noofDocAttend = parseFloat(noofDocAttend) + parseFloat( item1['kol']);
                                         actualnoofdoc = parseFloat(actualnoofdoc) + parseFloat( item1['n_No_DrAttended']);
                                        docattend = parseFloat(docattend) + parseFloat( item1['n_No_expDrAttended']);

                                        if ( item1['n_AdvReceived'] != "-1")
                                        {
                                            if ( item1['n_AdvReceived'] != "-1.0000")
                                            {
                                                totprp = parseFloat(totprp) + parseFloat( item1['n_TotPrp']);
                                                totbtc = parseFloat(totbtc) + parseFloat( item1['n_totBtc']);
                                                totadvance = parseFloat(totadvance) + parseFloat( item1['n_AdvReceived']);
                                            }
                                        }
                                        advanceamt = parseFloat(advanceamt) + parseFloat(adamt);
                                        expenseestimatedAllTotal = parseFloat(expenseestimatedAllTotal) + parseFloat(prptotbtc);
                                        
                                        prptcostAllTotal = parseFloat(prptcostAllTotal) + parseFloat(prptotprp);
                                        
                                        esimateprpAllTotal = parseFloat(esimateprpAllTotal) + parseFloat( item1['esimateprp']);
                                        noofDocAttendAllTotal = parseFloat(noofDocAttendAllTotal) + parseFloat( item1['kol']);
                                      
                                        actualnoofdocAllTotal = parseFloat(actualnoofdocAllTotal) + parseFloat( item1['n_No_DrAttended']);
                                        docattendAllTotal = parseFloat(docattendAllTotal) + parseFloat( item1['n_No_expDrAttended']);

                                        if ( item1['n_AdvReceived'] != "-1" )
                                        {
                                            if ( item1['n_AdvReceived'] != "-1.0000")
                                            {
                                                totprpAllTotal = parseFloat(totprpAllTotal) + parseFloat( item1['n_TotPrp']);
                                                totbtcAllTotal = parseFloat(totbtcAllTotal) + parseFloat( item1['n_totBtc']);
                                                totadvanceAllTotal = parseFloat(totadvanceAllTotal) + parseFloat( item1['n_AdvReceived']);
                                            }
                                        }
                                        advanceamtAllTotal = parseFloat(advanceamtAllTotal) + parseFloat(adamt);
                                    }
                                    else   // remove prpname if repeat in report
                                    {
                                        if (date != PrpDate)
                                        {

                                      	test12.push({
                                "Division":<div className="textReport">{item1['Division']}</div>,
                                "Region":<div className="textReport">{item1['Region']}</div>,
                                "FS Name":<div className="textReport">{item1['FsName']}</div>,
                                "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                                "PRP No":<div className="textReport">{item1['prpSrno']}</div>,
                                "PRP Name":<div className="textReport">{item1['PrpName']}</div>,
                                "PRP Requested Date":<div className="textReport">{item1['d_PostedDate']}</div>,
                                "PRP Date":<div className="textReport">{item1['d_prpdate']}</div>,
                                "Brand":"",
                                "Estimated PRP":<div className="textReport">{item1['esimateprp']}</div>,
                                "Approve/Confirmed Total PRP":<div className="textReport">{item1['n_PRPCost']}</div>,
                                "Total BTC":<div className="textReport">{item1['n_totBtc']}</div>,
                                "PRP Advance":<div className="textReport">{item1['n_Advanceamt']}</div>,
                                "Invited Speaker Name":<div className="textReport">{item1['c_InvitSpeakCom']}</div>,
                                "No Of Drs Expected":<div className="textReport">{item1['kol']}</div>,
                                "Current Business":"",
                                "Expected Business":"",
                                "Doctors Expected To Attend":<div className="textReport">{actualnoofDocAtteende}</div>,
                                "Total Cost For PRP":<div className="textReport">{totalprp}</div>,
                                "Total Cost For BTC Expense":<div className="textReport">{totalbtc}</div>, 
                                "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                                "Expense Confirmatory Remarks":<div className="note-text textReport"> {item1['ExpenseConfRemarks']} </div>,
                                "Expense Confirmed Date":<div className="textReport">{item1['expenseconfirmeddate']}</div>,
                                
                            })

                            test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":<div className="textReport">{item1['brand']}</div>,
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"",
                               "Current Business":<div className="textReport">{item1['n_CurrBussiness']}</div>,
                                "Expected Business":<div className="textReport">{item1['n_ExpBussiness']}</div>,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"", 
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                 
                            });
							
                                            expenseestimated = parseFloat(expenseestimated) + parseFloat(prptotbtc);
                                            
                                            prptcost = parseFloat(prptcost) + parseFloat(prptotprp);
                                            esimateprp = parseFloat(esimateprp) + parseFloat( item1['esimateprp']);
                                            noofDocAttend = parseFloat(noofDocAttend) + parseFloat( item1['kol']);
                                             actualnoofdoc = parseFloat(actualnoofdoc) + parseFloat( item1['n_No_DrAttended']);
                                            docattend = parseFloat(docattend)+ parseFloat( item1['n_No_expDrAttended']);

                                            if ( item1['n_AdvReceived'] != "-1")
                                            {
                                                if ( item1['n_AdvReceived'] != "-1.0000")
                                                {
                                                    totprp = parseFloat(totprp) + parseFloat( item1['n_TotPrp']);
                                                    totbtc = parseFloat(totbtc) + parseFloat( item1['n_totBtc']);
                                                    totadvance = parseFloat(totadvance) + parseFloat( item1['n_AdvReceived']);
                                                }
                                            }
                                            advanceamt = parseFloat(advanceamt) + parseFloat(adamt);
                                            expenseestimatedAllTotal = parseFloat(expenseestimatedAllTotal) + parseFloat(prptotbtc);
                                            
                                            prptcostAllTotal = parseFloat(prptcostAllTotal) + parseFloat(prptotprp);
                                            esimateprpAllTotal = parseFloat(esimateprpAllTotal) + parseFloat( item1['esimateprp']);
                                            noofDocAttendAllTotal = parseFloat(noofDocAttendAllTotal) + parseFloat( item1['kol']);
                                            
                                            actualnoofdocAllTotal = parseFloat(actualnoofdocAllTotal) + parseFloat( item1['n_No_DrAttended']);
                                            docattendAllTotal = parseFloat(docattendAllTotal) + parseFloat( item1['n_No_expDrAttended']);

                                            if ( item1['n_AdvReceived'] != "-1" )
                                            {
                                                if ( item1['n_AdvReceived'] != "-1.0000")
                                                {
                                                    totprpAllTotal = parseFloat(totprpAllTotal) + parseFloat( item1['n_TotPrp']);
                                                    totbtcAllTotal = parseFloat(totbtcAllTotal) + parseFloat( item1['n_totBtc']);
                                                    totadvanceAllTotal = parseFloat(totadvanceAllTotal) + parseFloat( item1['n_AdvReceived']);
                                                }
                                            }
                                            advanceamtAllTotal = parseFloat(advanceamtAllTotal) + parseFloat(adamt);
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
                                "PRP No":<div className="textReport">{item1['prpSrno']}</div>,
                                "PRP Name":<div className="textReport">{item1['PrpName']}</div>,
                                "PRP Requested Date":<div className="textReport">{item1['d_PostedDate']}</div>,
                                "PRP Date":<div className="textReport">{item1['d_prpdate']}</div>,
                                "Brand":"",
                                "Estimated PRP":<div className="textReport">{item1['esimateprp']}</div>,
                                "Approve/Confirmed Total PRP":<div className="textReport">{item1['n_PRPCost']}</div>,
                                "Total BTC":<div className="textReport">{item1['n_totBtc']}</div>,
                                "PRP Advance":<div className="textReport">{item1['n_Advanceamt']}</div>,
                                "Invited Speaker Name":<div className="textReport">{item1['c_InvitSpeakCom']}</div>,
                                "No Of Drs Expected":<div className="textReport">{item1['kol']}</div>,
                                "Current Business":"",
                                "Expected Business":"",
                                "Doctors Expected To Attend":<div className="textReport">{actualnoofDocAtteende}</div>,
                                "Total Cost For PRP":<div className="textReport">{totalprp}</div>,
                                "Total Cost For BTC Expense":<div className="textReport">{totalbtc}</div>, 
                                "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                                "Expense Confirmatory Remarks":<div className="note-text textReport"> {item1['ExpenseConfRemarks']} </div>,
                                "Expense Confirmed Date":<div className="textReport">{item1['expenseconfirmeddate']}</div>,
                                
                            })

                            test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":<div className="textReport">{item1['brand']}</div>,
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"",
                               "Current Business":<div className="textReport">{item1['n_CurrBussiness']}</div>,
                                "Expected Business":<div className="textReport">{item1['n_ExpBussiness']}</div>,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"", 
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                 
                            });




                                                expenseestimated = parseFloat(expenseestimated) + parseFloat(prptotbtc);
                                               
                                                prptcost = parseFloat(prptcost) + parseFloat(prptotprp);
                                                esimateprp = parseFloat(esimateprp) + parseFloat( item1['esimateprp']);
                                                noofDocAttend = parseFloat(noofDocAttend) + parseFloat( item1['kol']);
                                                 actualnoofdoc = parseFloat(actualnoofdoc) + parseFloat( item1['n_No_DrAttended']);
                                                docattend = parseFloat(docattend) + parseFloat( item1['n_No_expDrAttended']);

                                                if ( item1['n_AdvReceived'] != "-1")
                                                {
                                                    if ( item1['n_AdvReceived'] != "-1.0000")
                                                    {
                                                        totprp = parseFloat(totprp) + parseFloat( item1['n_TotPrp']);
                                                        totbtc = parseFloat(totbtc) + parseFloat( item1['n_totBtc']);
                                                        totadvance = parseFloat(totadvance) + parseFloat( item1['n_AdvReceived']);
                                                    }
                                                }
                                                advanceamt = parseFloat(advanceamt) + parseFloat(adamt);
                                                expenseestimatedAllTotal = parseFloat(expenseestimatedAllTotal) + parseFloat(prptotbtc);
                                                
                                                prptcostAllTotal = parseFloat(prptcostAllTotal) + parseFloat(prptotprp);
                                                esimateprpAllTotal = parseFloat(esimateprpAllTotal) + parseFloat( item1['esimateprp']);
                                                noofDocAttendAllTotal = parseFloat(noofDocAttendAllTotal) + parseFloat( item1['kol']);
                                               
                                                actualnoofdocAllTotal = parseFloat(actualnoofdocAllTotal) + parseFloat( item1['n_No_DrAttended']);
                                                docattendAllTotal = parseFloat(docattendAllTotal) + parseFloat( item1['n_No_expDrAttended']);

                                                if ( item1['n_AdvReceived'] != "-1" )
                                                {
                                                    if ( item1['n_AdvReceived'] != "-1.0000")
                                                    {
                                                        totprpAllTotal = parseFloat(totprpAllTotal) + parseFloat( item1['n_TotPrp']);
                                                        totbtcAllTotal = parseFloat(totbtcAllTotal) + parseFloat( item1['n_totBtc']);
                                                        totadvanceAllTotal = parseFloat(totadvanceAllTotal) + parseFloat( item1['n_AdvReceived']);
                                                    }
                                                }
                                                advanceamtAllTotal = parseFloat(advanceamtAllTotal) + parseFloat(adamt);
                                            }
                                            else
                                            {
                                                if (kol != KolAttend)
                                                {

                                                	test12.push({
                                "Division":<div className="textReport">{item1['Division']}</div>,
                                "Region":<div className="textReport">{item1['Region']}</div>,
                                "FS Name":<div className="textReport">{item1['FsName']}</div>,
                                "HQ":<div className="textReport">{item1['FSHQ']}</div>,
                                "PRP No":<div className="textReport">{item1['prpSrno']}</div>,
                                "PRP Name":<div className="textReport">{item1['PrpName']}</div>,
                                "PRP Requested Date":<div className="textReport">{item1['d_PostedDate']}</div>,
                                "PRP Date":<div className="textReport">{item1['d_prpdate']}</div>,
                                "Brand":"",
                                "Estimated PRP":<div className="textReport">{item1['esimateprp']}</div>,
                                "Approve/Confirmed Total PRP":<div className="textReport">{item1['n_PRPCost']}</div>,
                                "Total BTC":<div className="textReport">{item1['n_totBtc']}</div>,
                                "PRP Advance":<div className="textReport">{item1['n_Advanceamt']}</div>,
                                "Invited Speaker Name":<div className="textReport">{item1['c_InvitSpeakCom']}</div>,
                                "No Of Drs Expected":<div className="textReport">{item1['kol']}</div>,
                                "Current Business":"",
                                "Expected Business":"",
                                "Doctors Expected To Attend":<div className="textReport">{actualnoofDocAtteende}</div>,
                                "Total Cost For PRP":<div className="textReport">{totalprp}</div>,
                                "Total Cost For BTC Expense":<div className="textReport">{totalbtc}</div>, 
                                "Expense Against Advance":<div className="textReport">{totcstadvnce}</div>,
                                "Expense Confirmatory Remarks":<div className="note-text textReport"> {item1['ExpenseConfRemarks']} </div>,
                                "Expense Confirmed Date":<div className="textReport">{item1['expenseconfirmeddate']}</div>,
                                
                            })

                            test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":<div className="textReport">{item1['brand']}</div>,
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"",
                               "Current Business":<div className="textReport">{item1['n_CurrBussiness']}</div>,
                                "Expected Business":<div className="textReport">{item1['n_ExpBussiness']}</div>,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"", 
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                 
                            });

                                                    expenseestimated = parseFloat(expenseestimated) + parseFloat(prptotbtc);
                                                    
                                                    prptcost = parseFloat(prptcost) + parseFloat(prptotprp);
                                                    esimateprp = parseFloat(esimateprp) + parseFloat( item1['esimateprp']);
                                                    noofDocAttend = parseFloat(noofDocAttend) + parseFloat( item1['kol']);
                                                    actualnoofdoc = parseFloat(actualnoofdoc) + parseFloat( item1['n_No_DrAttended']);
                                                    docattend = parseFloat(docattend) + parseFloat( item1['n_No_expDrAttended']);

                                                    if ( item1['n_AdvReceived'] != "-1")
                                                    {
                                                        if ( item1['n_AdvReceived'] != "-1.0000")
                                                        {
                                                            totprp = parseFloat(totprp) + parseFloat( item1['n_TotPrp']);
                                                            totbtc = parseFloat(totbtc) + parseFloat( item1['n_totBtc']);
                                                            totadvance = parseFloat(totadvance) + parseFloat( item1['n_AdvReceived']);
                                                        }
                                                    }
                                                    advanceamt = parseFloat(advanceamt)+ parseFloat(adamt);
                                                    expenseestimatedAllTotal = parseFloat(expenseestimatedAllTotal) + parseFloat(prptotbtc);
                                                   
                                                    prptcostAllTotal = parseFloat(prptcostAllTotal) + parseFloat(prptotprp);
                                                    esimateprpAllTotal = parseFloat(esimateprpAllTotal) + parseFloat( item1['esimateprp']);
                                                    noofDocAttendAllTotal = parseFloat(noofDocAttendAllTotal) + parseFloat( item1['kol']);
                                                   
                                                    actualnoofdocAllTotal = parseFloat(actualnoofdocAllTotal) + parseFloat( item1['n_No_DrAttended']);
                                                    docattendAllTotal = parseFloat(docattendAllTotal) + parseFloat( item1['n_No_expDrAttended']);

                                                    if ( item1['n_AdvReceived'] != "-1" )
                                                    {
                                                        if ( item1['n_AdvReceived'] != "-1.0000")
                                                        {
                                                            totprpAllTotal = parseFloat(totprpAllTotal) + parseFloat( item1['n_TotPrp']);
                                                            totbtcAllTotal = parseFloat(totbtcAllTotal) + parseFloat( item1['n_totBtc']);
                                                            totadvanceAllTotal = parseFloat(totadvanceAllTotal )+ parseFloat( item1['n_AdvReceived']);
                                                        }
                                                    }
                                                    advanceamtAllTotal = parseFloat(advanceamtAllTotal) + parseFloat(adamt);
                                                }
                                                else
                                                {

                                                  	test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":<div className="textReport">{item1['brand']}</div>,
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"",
                               "Current Business":<div className="textReport">{item1['n_CurrBussiness']}</div>,
                                "Expected Business":<div className="textReport">{item1['n_ExpBussiness']}</div>,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"", 
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                 
                            });
                                                   // row = row + 1;


                                                }

                                            }

                                        }

                                    }


                                }

                            }



                        }

                    }
				
				
                    RegFrRemo =  item1['Region'];
                    Fsname =  item1['FsName'];
                    HQFS =  item1['FSHQ'];
                    Prpname =  item1['PrpName'];
                    reggion =  item1['Region'];
                    PrpDate =  item1['d_prpdate'];
                    EstimatedAmnt =  item1['n_EstimatedAmount'];
                   
                    KolAttend =  parseFloat(item1['kol']);
                    actualvalue = "";
                    currentbusines = parseFloat(currentbusines) + parseFloat( item1['n_CurrBussiness']);
                    expectedbusines = parseFloat(expectedbusines) + parseFloat( item1['n_ExpBussiness']);

                   




                     
                    docattend = parseFloat(docattend) + parseFloat( item1['n_No_expDrAttended']);
                    //prptcost = prptcost + parseFloat( item1['n_PRPCost']);

                    
                    currentbusinesAllTotal = parseFloat(currentbusinesAllTotal) + +parseFloat( item1['n_CurrBussiness']);
                    expectedbusinesAllTotal = parseFloat(expectedbusinesAllTotal) + parseFloat( item1['n_ExpBussiness']);


                   if(index == (Result.data.data[0].length)-1)
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

                        prpSrno =  item1['prpSrno'];
                        Region =  item1['Region'];
                        re =  item1['Region'];
                        fs =  item1['FsName'];
                        Hq =  item1['FSHQ'];
                        prp =  item1['PrpName'];
                        date =  item1['d_prpdate'];
                        est =  item1['n_EstimatedAmount'];
                        kol =  item1['kol'];

                        
                        if (flag == "false")
                        {
                            //strb.Append("<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                            // <td></td><td></td><td></td><td></td><td style='text-align:center;font-weight:bold;'>Total</td>
                            // <td  style='font-weight:bold;'>" + currentbusiness + "</td><td  style='font-weight:bold;
                            // '>" + expectedbusiness + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>");
                            
							test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":"",
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"Total",
                                "Current Business":currentbusiness,
                                "Expected Business":expectedbusiness,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"",
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                
                            })

                            
                        }
                        currentbusinesss = parseFloat(currentbusinesss) + parseFloat(currentbusiness);
                        expectedbusinesss = parseFloat(expectedbusinesss) + parseFloat(expectedbusiness);
                        currentbusinesssalltotal = parseFloat(currentbusinesssalltotal) + parseFloat(currentbusinesss);
                        expectedbusinesssalltotal = parseFloat(expectedbusinesssalltotal) + parseFloat(expectedbusinesss);

                        
						
						test12.push({
                                "Division":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":"",
                                "Estimated PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: esimateprp}} />,
                                "Approve/Confirmed Total PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: prptcost}} />,
                                "Total BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expenseestimated}} />,
                                "PRP Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv}} />,
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofDocAttend}} />,
                                "Current Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusinesss}} />,
                                "Expected Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusinesss}} />,
                                "Doctors Expected To Attend":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualnoofdoc}} />,
                                "Total Cost For PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totprp}} />,
                                "Total Cost For BTC Expense":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totbtc}} />,
                                "Expense Against Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totadvance}} />,
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                
                            })

                      

                    }
					else
                    {

                        skipflag = true;
                       						
						prpSrno = Result.data.data[0][index+1]["prpSrno"];
                        Region = Result.data.data[0][index+1]["Region"];
                        re = Result.data.data[0][index+1]["Region"];
                        fs = Result.data.data[0][index+1]["FsName"];
                        Hq = Result.data.data[0][index+1]["FSHQ"];
                        prp = Result.data.data[0][index+1]["PrpName"];
                        date = Result.data.data[0][index+1]["d_prpdate"];
                        est = Result.data.data[0][index+1]["n_EstimatedAmount"];
                        kol = Result.data.data[0][index+1]["kol"];
                    }
					
					if (prpno != prpSrno)
                    {
                        
                        skipflag = true;


                        currentbusinesss = parseFloat(currentbusinesss) + parseFloat(currentbusiness);
                        expectedbusinesss = parseFloat(expectedbusinesss) + parseFloat(expectedbusiness);
                        
                       test12.push({
                                "Division":"",
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":"",
                                "Estimated PRP":"",
                                "Approve/Confirmed Total PRP":"",
                                "Total BTC":"",
                                "PRP Advance":"",
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":"Total",
                                "Current Business":currentbusiness,
                                "Expected Business":expectedbusiness,
                                "Doctors Expected To Attend":"",
                                "Total Cost For PRP":"",
                                "Total Cost For BTC Expense":"",
                                "Expense Against Advance":"",
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                
                            })
							
							if (Reg != Region)
                    {
                        var adv1 = "";

                        if (advanceamt == 0)
                        {
                            adv1 = "NIL";
                        }
                        else
                        {
                            adv1 = advanceamt;
                        }


                        currentbusinesssalltotal = parseFloat(currentbusinesssalltotal) + parseFloat(currentbusinesss);
                        expectedbusinesssalltotal = parseFloat(expectedbusinesssalltotal) + parseFloat(expectedbusinesss);

						test12.push({
                                "Division":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
                                "Region":"",
                                "FS Name":"",
                                "HQ":"",
                                "PRP No":"",
                                "PRP Name":"",
                                "PRP Requested Date":"",
                                "PRP Date":"",
                                "Brand":"",
                                "Estimated PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: esimateprp}} />,
                                "Approve/Confirmed Total PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: prptcost}} />,
                                "Total BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expenseestimated}} />,
                                "PRP Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv1}} />,
                                "Invited Speaker Name":"",
                                "No Of Drs Expected":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofDocAttend}} />,
                                "Current Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusinesss}} />,
                                "Expected Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusinesss}} />,
                                "Doctors Expected To Attend":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualnoofdoc}} />,
                                "Total Cost For PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totprp}} />,
                                "Total Cost For BTC Expense":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totbtc,}} />,
                                "Expense Against Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totadvance}} />,
                                "Expense Confirmatory Remarks":"",
                                "Expense Confirmed Date":"",
                                
                            })
                        prptcost = 0;
                        esimateprp = 0;
                        currentbusines = 0;
                        expectedbusines = 0;
                        currentbusinesss = 0;
                        expectedbusinesss = 0;
                        expenseestimated = 0;
                        noofDocAttend = 0;
                        actualnoofdoc = 0;
                        totprp = 0;
                        totbtc = 0;
                        totadvance = 0;
                        docattend = 0;
                        //row = 0;
                        expRegTotal = 0;
                        advanceamt = 0;
                    }
					
					
                if (advanceamtAllTotal == 0)
                {
                    advall = "NIL";
                }
                else
                {
                    advall = parseFloat(advanceamtAllTotal);
                }
                

               
                    }
                    }
                }
                )

                // strb.Append("<td style='text-align:center;font-weight:bold;'>All India Total</td><td></td><td></td><td></td>
                // <td></td><td></td><td></td><td></td><td></td><td style='font-weight:bold;'>" + esimateprpAllTotal + "</td>
                // <td  style='font-weight:bold;'>" + prptcostAllTotal + "</td><td  style='font-weight:bold;'>" 
                // + expenseestimatedAllTotal + "</td><td  style='font-weight:bold;'>" + advall + "</td><td></td>
                // <td  style='font-weight:bold;'>" + noofDocAttendAllTotal + "</td><td  style='font-weight:bold;'>
                //     " + currentbusinesssalltotal + "</td><td  style='font-weight:bold;'>" + expectedbusinesssalltotal + "</td>
                //     <td  style='font-weight:bold;'>" + actualnoofdocAllTotal + "</td><td  style='font-weight:bold;'>"
                //      + totprpAllTotal + "</td><td  style='font-weight:bold;'>" + totbtcAllTotal + "</td>
                //      <td  style='font-weight:bold;'>" + totadvanceAllTotal + "</td>" + "<td></td>" + "<td></td>" + "<td></td>");

                if(Result.data.data[0].length>0)
                {
                test12.push({
                    "Division":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'All India Total'}} />,
                    "Region":"",
                    "FS Name":"",
                    "HQ":"",
                    "PRP No":"",
                    "PRP Name":"",
                    "PRP Requested Date":"",
                    "PRP Date":"",
                    "Brand":"",
                    "Estimated PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: esimateprpAllTotal}} />,
                    "Approve/Confirmed Total PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: prptcostAllTotal}} />,
                    "Total BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expenseestimatedAllTotal}} />,
                    "PRP Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: advanceamtAllTotal}} />,
                    "Invited Speaker Name":"",
                    "No Of Drs Expected":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: noofDocAttendAllTotal}} />,
                    "Current Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusinesssalltotal}} />,
                    "Expected Business":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusinesssalltotal}} />,
                    "Doctors Expected To Attend":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actualnoofdocAllTotal}} />,
                    "Total Cost For PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totprpAllTotal}} />,
                    "Total Cost For BTC Expense":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totbtcAllTotal}} />,
                    "Expense Against Advance":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totadvanceAllTotal}} />,
                    "Expense Confirmatory Remarks":"",
                    "Expense Confirmed Date":"",
                    
                })
            }
            this.setState({ loader:false })
            //console.log(test12,"jjj")
              this.setState({ Result1: test12 })
              this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
            }
            // console.log(this.state.Result1,"result ok")
          }).catch(() => {
            this.setState({ loader:false })
             console.log("error")
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })


    }
    componentDidMount(){

        let header1 =[]
        this.setState({hdrcoldefault : ['Division',
        'Region',
        'FS Name',
        'HQ',
        'PRP No',
        'PRP Name',
        'PRP Requested Date',
        'PRP Date',
        'Brand',
        'Estimated PRP',
        'Approve/Confirmed Total PRP',
        'Total BTC',
        'PRP Advance',
        'Invited Speaker Name',
        'No Of Drs Expected',
        'Current Business',
        'Expected Business',         
        'Doctors Expected To Attend',
        'Total Cost For PRP',
        'Total Cost For BTC Expense',
        'Expense Against Advance',
        'Expense Confirmatory Remarks',
        'Expense Confirmed Date']})

        this.setState({rowsperpage1:10})
        this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]});
       
        this.setState({header:[
            { prop: 'Region',title:'', filterable: true,sortable:false}, 
        ]});

      
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

    }
    





    render(){
       
        let {Result1,header,entriescount,rowsperpage1}=this.state
        // const header = [
        // { prop: 'DIVISION', title: 'Division', filterable: true,sortable:true },
        //      { prop: 'REGION', title: 'Region', filterable: true },
        //      { prop: 'FSNAME', title: 'FS Name', filterable: true,sortable:true },
        //      { prop: 'HQ', title: 'HQ', filterable: true,sortable:true },
        //      { prop: 'PRP NO', title: 'PRP No', filterable: true,sortable:true },
        //      { prop: 'PRP NAME', title: 'PRP Name', filterable: true,sortable:true },
        //      { prop: 'PRP REQUESTED DATE', title: 'PRP Requested Date', filterable: true },
        //      { prop: 'PRP DATE', title: 'PRP Date', filterable: true,sortable:true },
        //      { prop: 'BRAND', title: 'Brand', filterable: true,sortable:true },
        //      { prop: 'ESTIMATED PRP', title: 'Estimated PRP', filterable: true,sortable:true },
        //      { prop: 'APPROVE/CONFIRMED TOTAL PRP', title: 'Approve/Confirmed Total PRP', filterable: true,sortable:true },
        //      { prop: 'TOTAL BTC', title: 'Total BTC', filterable: true },
        //      { prop: 'PRP ADVANCE', title: 'PRP Advance', filterable: true,sortable:true },
        //      { prop: 'INVITED SPEAKER NAME', title: 'Invited Speaker Name', filterable: true },
        //      { prop: 'NO OF Drs EXPECTED', title: 'No Of Drs Expected', filterable: true,sortable:true },
        //      { prop: 'CURRENT BUSSINESS', title: ' Current Business', filterable: true,sortable:true },
        //      { prop: 'EXPECTED BUSSINESS', title: 'Expected Business', filterable: true,sortable:true },           
        //      { prop: 'NO OF Drs EXPECTED TO ATTEND', title: 'Total cost for PRP', filterable: true,sortable:true },
        //      { prop: 'TOTAL COST FOR PRP', title: 'Total cost for BTC Expence', filterable: true,sortable:true },
        //      { prop: 'TOTAL COST FOR BTC EXPENSE', title: 'Expence Agaianst Advance', filterable: true },
        //      { prop: 'EXPENSE AGAINST ADVANCE', title: ' Expence Confirmatory Remarks', filterable: true,sortable:true },
        //      { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'Expence Confirmed Date', filterable: true,sortable:true },
        //      { prop: 'EXPENSE CONFIRMED DATE', title: 'Expence Desk Confirmatory Remarks', filterable: true,sortable:true },
            
          
         
            
                       
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
                let headerList = {
                    title: item,
                    prop: item,
                    sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    filterable: true
                };
                header.push(headerList);
            });
            
        }
        return(
            <div>
                <Loder show={this.state.loader}></Loder>
                 <ReportTablePRP
                 DivisionDropdown={this.DivisionDropdown}
                 RegionDropdown={this.RegionDropdown}

                 selecteddiv={this.state.selecteddiv}
                 selectedreg={this.state.selectedreg}
                    tableHeader={header}
                    tableBody={Result1}
                    open={this.props.open}
                    keyName="userTable"
                    tableClass="striped hover table-responsive textReport"
                    // rowsPerPage={10}
                    // rowsPerPageOption={[10, 20, 50, 100, 200,500,1000,2000]}
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

export default ReportListPRP