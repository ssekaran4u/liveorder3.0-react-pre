import React,{Component} from 'react'
import ReportTableRPSINVEST from './ReportTableRPSINVEST'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'

class ReportListRPSINVEST extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'',
            selreg:'',
            selrps:'All',
            selbr:'All',
            seldate:'',
            selyr:'',
            Result1:[],
            loader:false,
            seltype:'1',
            headder:[],
            RegionCode:'',
            AreaCode1:'',
            divisioncode:'',
            mnthname:'',
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
                displayedColumns = headerColums;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                unslectedColumns.map(unslectedColumn => {                                                   
                    displayedColumns = displayedColumns.filter(columnName => {
                        
                        return columnName != unslectedColumn;
                    });
                });
            }
            
            displayedColumns.map(item => {
                
                 headerList = {
                    title: item,
                    prop: item,
                    sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    filterable: true
                };
                
                hdr1.push(headerList)
            });
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
        else if(state.name=="Area")
        {
           
            this.setState({selrps:state.rvalue})
        }
        else if(state.name=="FS Name")
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
        else if(state.name=="Type")
        {
            
            this.setState({seltype:state.rvalue})
        }
        
    }

    RegionDropdown(){
        
    }

    componentDidUpdate(){
        
    }
    componentDidMount(){
let header1 =[]
        this.setState({hdrcoldefault : ['REGION',
        'FS NAME',
        'AREA',
        'DATE',
        'SRNO',
        'TYPE OF ACTIVITY',
        'DOCTOR NAME',
        'DOCTOR CATEGORY',
        'PRODUCT/BRAND/BRANDSION',
        'CURRENT BUSINESS',
        'EXPECTED BUSINESS',
        'ESTIMATED RPS AMOUNT',
        'ESTIMATED ADVANCE REQUIRED',
        'BTC EXPENSE',
        'EXPENSES AGAINST ADVANCE',
        'EXPENSE CONFIRMATORY REMARKS',
        'EXPENSE CONFIRMED DATE',
        'EXPENSE DESK CONFIRMATORY REMARKS',
        'EXPENSE DESK CONFIRMED DATE']})
       

//         displayedColumns.map(item => {
//             let headerList = {
//                 title: item,
//                 prop: item,
//                 sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
//                 filterable: true
//             };
//              header1.push(headerList);
//         });
//         this.setState({headder:header1,displayedColumns:displayedColumns})
        this.setState({rowsperpage1:10})
        this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]});
        this.setState({headder:[
            { prop: 'REGION', title: '', filterable: true,sortable:false },
            // { prop: 'FS NAME', title: 'FS NAME', filterable: true,sortable:true },
            // { prop: 'AREA', title: 'AREA', filterable: true,sortable:true },
            // { prop: 'DATE', title: 'DATE', filterable: true,sortable:true },
            // { prop: 'SRNO', title: 'SRNO', filterable: true,sortable:true },
            // { prop: 'TYPE OF ACTIVITY', title: 'TYPE OF ACTIVITY', filterable: true,sortable:true },
            // { prop: 'DOCTOR NAME', title: 'DOCTOR NAME', filterable: true,sortable:true },
            // { prop: 'DOCTOR CATEGORY', title: 'DOCTOR CATEGORY', filterable: true,sortable:true },
            // { prop: 'PRODUCT/BRAND/BRANDSION', title: 'PRODUCT/BRAND', filterable: true,sortable:true },
            // { prop: 'CURRENT BUSINESS', title: 'CURRENT BUSINESS', filterable: true,sortable:true },
            // { prop: 'EXPECTED BUSINESS', title: 'EXPECTED BUSINESS', filterable: true,sortable:true },
            // { prop: 'ESTIMATED RPS AMOUNT', title: 'ESTIMATED RPS AMOUNT', filterable: true,sortable:true },
            // { prop: 'ESTIMATED ADVANCE REQUIRED', title: 'ESTIMATED ADVANCE REQUIRED', filterable: true,sortable:true },
            // { prop: ' BTC EXPENSE', title: ' BTC EXPENSE', filterable: true,sortable:true },
            // { prop: 'EXPENSES AGAINST ADVANCE', title: 'EXPENSES AGAINST ADVANCE', filterable: true,sortable:true },
            // { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'EXPENSE CONFIRMATORY REMARKS', filterable: true,sortable:true },
            // { prop: 'EXPENSE CONFIRMED DATE', title: 'EXPENSE CONFIRMED DATE', filterable: true,sortable:true },
            // { prop: 'EXPENSE DESK CONFIRMATORY REMARKS', title: 'EXPENSE DESK CONFIRMATORY REMARKS', filterable: true,sortable:true },
            // { prop: 'EXPENSE DESK CONFIRMED DATE', title: 'EXPENSE DESK CONFIRMED DATE', filterable: true,sortable:true },

           //  { prop: 'TOTAL EXPENSE AMOUNT', title: 'TOTAL EXPENSE AMOUNT', filterable: true,sortable:true },
           
                      
       ]});

       let ddd='';
       var defre={ "index": "LoginFSDetails",  data:{}  }

       postToServer("PrpDetailsRpt", defre).then((Result) => {
       if (Result.data.Status == 'Success') {   
           Result.data.data.map((item1,index) => {
              this.setState({divisioncode:(item1['c_div_code']=="")?"All":item1['c_div_code']});
               this.setState({RegionCode:item1['C_Region_Code']});
              // this.setState({AreaCode1:item1['C_Code']});
              
           })
        }
       
       }).catch(() => {
                   
       this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
       })

    }

    applyFilterAll(){
        this.setState({rowsperpage1:''})
        this.setState({rowsperpage1:10})
        this.setState({entriescount:''})
        this.setState({ loader:true })
       
        if(this.state.selbr=="")
        {
            this.setState({ loader:false })
            alert("FS not Selected ............")
                    return;
        } 
        if(this.state.seltype=="")
        {
            this.setState({ loader:false })
            alert("Type not Selected ............")
                    return;
        } 
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
        this.setState({ loader:true })
       this.setState({mainHead:"PRP and RPS FS wise Investment History Report For  " + this.state.mnthname +','+ this.state.selyr} );
        if(this.state.seltype=="2")
        {
        var travelModes={ "index": "BindRPS",  data:{"DivisionCode":(this.state.seldiv=="")?this.state.divisioncode:this.state.seldiv,"RegionCode":(this.state.selreg=="")?this.state.RegionCode:this.state.selreg,"AreaCode":this.state.selrps,"FsCode":this.state.selbr,"Month":this.state.seldate,"Year":this.state.selyr}  }
        }
        else{
            var travelModes={ "index": "BindPRP",  data:{"DivisionCode":(this.state.seldiv=="")?this.state.divisioncode:this.state.seldiv,"RegionCode":(this.state.selreg=="")?this.state.RegionCode:this.state.selreg,"AreaCode":this.state.selrps,"FsCode":this.state.selbr,"Month":this.state.seldate,"Year":this.state.selyr}  }
            // var travelModes={ "index": "BindPRP",  data:{"DivisionCode":"All","RegionCode":"All","AreaCode":"All","FsCode":"All","Month":"1","Year":"2020"}  }
        }
        // var travelModes={ "index": "BindRPS",  data:{"DivisionCode":"All","RegionCode":"R000043","AreaCode":"All","FsCode":"All","Month":"1","Year":"2019"}  }
        
        let test12=[];
        let test13=[];
        let oldBrand="";
        var region = ''
        var cregion = ''
        var cfs = ''
        var prvregion = "";
        var reg = ''
        var fscode = ''
        var fscde = ''
        var fs = ''
        var fsname = ''
        var fsn = ''
        var fshq = ''
        var hq = ''

        var currentbusines = 0;
        var expectedbusines = 0;
        var expenseestimated = 0;
        var estimatedamnt = 0;
        var reqamt = 0;
        var advreq = 0;
        var prptotal = 0;
        var btctotal = 0;
        var estimatedbtc = 0;
        var prpcost = 0;
        var advtotal = 0;
        var estadv = 0;
        var expbtc = 0;
        var actexp = 0;

       var fscurrentbusines = 0;
       var fsexpectedbusines = 0;
       var fsexpenseestimated = 0;
       var fsestimatedamnt = 0;
       var fsreqamt = 0;
       var fsadvreq = 0;
       var fsprptotal = 0;
       var fsbtctotal = 0;
       var fsestimatedbtc = 0;
       var fsprpcost = 0;
       var fsadvtotal = 0;
       var fsestadv = 0;
       var fsexpbtc = 0;
       var fsactexp = 0;

        var currentbusinesAllTotal = 0;
        var expectedbusinesAllTotal = 0;
        var expenseestimatedAllTotal = 0;
        var estimatedamntAllTotal = 0;
        var reqamtalltotal = 0;
        var advreqAlltotal = 0;
        var prptotalAllTotal = 0;
        var btctotalAllTotal = 0;
        var estimatedbtcAllTotal = 0;
        var prpcostAllTotal = 0;
        var advtotalAllTotal = 0;
        var estadvAllTotal = 0;
        var expbtcAllTotal = 0;
        var actexpAllTotal =0;
        var index2=0;
        var alladv = '';
        if(this.state.seltype=="2")
        {
            this.setState({headder:[
             { prop: 'REGION', title: 'Region', filterable: true,sortable:true,show:false },
             { prop: 'FS NAME', title: 'FS Name', filterable: true,sortable:true },
             { prop: 'AREA', title: 'HQ', filterable: true,sortable:true },
             { prop: 'DATE', title: 'Date Of Activity', filterable: true,sortable:true },
             { prop: 'SRNO', title: 'RPS No', filterable: true,sortable:true },
             { prop: 'TYPE OF ACTIVITY', title: 'Type Of Activity', filterable: true,sortable:true },
             { prop: 'DOCTOR NAME', title: 'Name Of Doctor', filterable: true,sortable:true },
             { prop: 'DOCTOR CATEGORY', title: 'Category Of Doctor', filterable: true,sortable:true },
             { prop: 'PRODUCT/BRAND/BRANDSION', title: 'Product/Brand', filterable: true,sortable:true },
             { prop: 'CURRENT BUSINESS', title: 'Current Business', filterable: true,sortable:true },
             { prop: 'EXPECTED BUSINESS', title: 'Expected Business', filterable: true,sortable:true },
             { prop: 'ESTIMATED RPS AMOUNT', title: 'Estimated RPS  Amount', filterable: true,sortable:true },
             { prop: 'ESTIMATED ADVANCE REQUIRED', title: 'Estimated Advance Required', filterable: true,sortable:true },
             { prop: 'BTC EXPENSE', title: 'BTC Expense', filterable: true,sortable:true },
             { prop: 'EXPENSES AGAINST ADVANCE', title: 'Expenses Against Advance', filterable: true,sortable:true },
             { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'Expense confirmatory Remarks', filterable: true,sortable:true },
             { prop: 'EXPENSE CONFIRMED DATE', title: 'Expense confirmed date', filterable: true,sortable:true },
             { prop: 'EXPENSE DESK CONFIRMATORY REMARKS', title: 'Expense Desk Confirmatory Remarks', filterable: true,sortable:true },
             { prop: 'EXPENSE DESK CONFIRMED DATE', title: 'Expense desk confirmed Date', filterable: true,sortable:true },

            //  { prop: 'TOTAL EXPENSE AMOUNT', title: 'TOTAL EXPENSE AMOUNT', filterable: true,sortable:true },
            
                       
        ]});

        // let header1 =[]
        // let displayedColumns = ['REGION',
        // 'FS NAME',
        // 'AREA',
        // 'DATE',
        // 'SRNO',
        // 'TYPE OF ACTIVITY',
        // 'DOCTOR NAME',
        // 'DOCTOR CATEGORY',
        // 'PRODUCT/BRAND/BRANDSION',
        // 'CURRENT BUSINESS',
        // 'EXPECTED BUSINESS',
        // 'ESTIMATED RPS AMOUNT',
        // 'ESTIMATED ADVANCE REQUIRED',
        // 'BTC EXPENSE',
        // 'EXPENSES AGAINST ADVANCE',
        // 'EXPENSE CONFIRMATORY REMARKS',
        // 'EXPENSE CONFIRMED DATE',
        // 'EXPENSE DESK CONFIRMATORY REMARKS',
        // 'EXPENSE DESK CONFIRMED DATE',]
       

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
              console.log(hdr1,'tttt')
            this.setState({
                displayedColumns :displayedColumns,headder:hdr1
            });

       
        postToServer("RPS_InvesttHis", travelModes).then((Result) => {
            if (Result.data.Status == 'Success') {   
                Result.data.data.map((item1,index) => {

                   index2=index;
                   if(index==0)
                   {
                    fscode = item1['FS NAME'];
                   }
                   if (fs != fscode)
                        {
                            test12.push({
                                "REGION":<div className="textReport">{item1['REGION']}</div>,
                                "FS NAME":<div className="textReport">{item1['FS NAME']}</div>,
                                "AREA":<div className="textReport">{item1['AREA']}</div>,
                                "DATE":<div className="textReport">{item1['DATE']}</div>,
                                "SRNO":<div className="textReport">{item1['SRNO']}</div>,
                                "TYPE OF ACTIVITY":<div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                                "DOCTOR NAME":<div className="textReport">{item1['DOCTOR NAME']}</div>,
                                "DOCTOR CATEGORY":<div className="textReport">{item1['DOCTOR CATEGORY']}</div>,
                                "PRODUCT/BRAND/BRANDSION":<div className="textReport">{item1['PRODUCT/BRAND']}</div>,
                                "CURRENT BUSINESS":<div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                                "EXPECTED BUSINESS":<div className="textReport">{item1['EXPECTED BUSINESS']}</div>,
                                "ESTIMATED RPS AMOUNT":<div className="textReport">{item1['ESTIMATED RPS AMOUNT']}</div>,
                                "ESTIMATED ADVANCE REQUIRED":<div className="textReport">{item1['ESTIMATED ADVANCE REQUIRED']}</div>,
                                "BTC EXPENSE":<div className="textReport">{item1['BTC EXPENSE']}</div>,
                                "EXPENSES AGAINST ADVANCE":<div className="textReport">{item1['EXPENSES AGAINST ADVANCE']}</div>,
                                "EXPENSE CONFIRMATORY REMARKS":<div className="note-text"> {item1['EXPENSE CONFIRMATORY REMARKS']} </div>,
                                "EXPENSE CONFIRMED DATE":<div className="textReport">{item1['EXPENSE CONFIRMED DATE']}</div>,
                                "EXPENSE DESK CONFIRMATORY REMARKS":<div className="note-text"> {item1['EXPENSE DESK CONFIRMATORY REMARKS']} </div>,
                                "EXPENSE DESK CONFIRMED DATE":<div className="textReport">{item1['EXPENSE DESK CONFIRMED DATE']}</div>,
                                
                            })
                        }
                        else
                        {
                       
                            if (reg != region)
                            {
                                test12.push({
                                    "REGION":<div className="textReport">{item1['REGION']}</div>,
                                    "FS NAME":<div className="textReport">{item1['FS NAME']}</div>,
                                    "AREA":<div className="textReport">{item1['AREA']}</div>,
                                    "DATE":<div className="textReport">{item1['DATE']}</div>,
                                    "SRNO":<div className="textReport">{item1['SRNO']}</div>,
                                    "TYPE OF ACTIVITY":<div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                                    "DOCTOR NAME":<div className="textReport">{item1['DOCTOR NAME']}</div>,
                                    "DOCTOR CATEGORY":<div className="textReport">{item1['DOCTOR CATEGORY']}</div>,
                                    "PRODUCT/BRAND/BRANDSION":<div className="textReport">{item1['PRODUCT/BRAND']}</div>,
                                    "CURRENT BUSINESS":<div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                                    "EXPECTED BUSINESS":<div className="textReport">{item1['EXPECTED BUSINESS']}</div>,
                                    "ESTIMATED RPS AMOUNT":<div className="textReport">{item1['ESTIMATED RPS AMOUNT']}</div>,
                                    "ESTIMATED ADVANCE REQUIRED":<div className="textReport">{item1['ESTIMATED ADVANCE REQUIRED']}</div>,
                                    "BTC EXPENSE":<div className="textReport">{item1['BTC EXPENSE']}</div>,
                                    "EXPENSES AGAINST ADVANCE":<div className="textReport">{item1['EXPENSES AGAINST ADVANCE']}</div>,
                                    "EXPENSE CONFIRMATORY REMARKS":<div className="note-text"> {item1['EXPENSE CONFIRMATORY REMARKS']} </div>,
                                    "EXPENSE CONFIRMED DATE":<div className="textReport">{item1['EXPENSE CONFIRMED DATE']}</div>,
                                    "EXPENSE DESK CONFIRMATORY REMARKS":<div className="note-text"> {item1['EXPENSE DESK CONFIRMATORY REMARKS']} </div>,
                                    "EXPENSE DESK CONFIRMED DATE":<div className="textReport">{item1['EXPENSE DESK CONFIRMED DATE']}</div>,
                                    
                                })
                           }
                            else // remove region
                            {
                                if (fsn != fsname)
                                {
                                    test12.push({
                                        "REGION":"",
                                        "FS NAME":<div className="textReport">{item1['FS NAME']}</div>,
                                        "AREA":<div className="textReport">{item1['AREA']}</div>,
                                        "DATE":<div className="textReport">{item1['DATE']}</div>,
                                        "SRNO":<div className="textReport">{item1['SRNO']}</div>,
                                        "TYPE OF ACTIVITY":<div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                                        "DOCTOR NAME":<div className="textReport">{item1['DOCTOR NAME']}</div>,
                                        "DOCTOR CATEGORY":<div className="textReport">{item1['DOCTOR CATEGORY']}</div>,
                                        "PRODUCT/BRAND/BRANDSION":<div className="textReport">{item1['PRODUCT/BRAND']}</div>,
                                        "CURRENT BUSINESS":<div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                                        "EXPECTED BUSINESS":<div className="textReport">{item1['EXPECTED BUSINESS']}</div>,
                                        "ESTIMATED RPS AMOUNT":<div className="textReport">{item1['ESTIMATED RPS AMOUNT']}</div>,
                                        "ESTIMATED ADVANCE REQUIRED":<div className="textReport">{item1['ESTIMATED ADVANCE REQUIRED']}</div>,
                                        "BTC EXPENSE":<div className="textReport">{item1['BTC EXPENSE']}</div>,
                                        "EXPENSES AGAINST ADVANCE":<div className="textReport">{item1['EXPENSES AGAINST ADVANCE']}</div>,
                                        "EXPENSE CONFIRMATORY REMARKS":<div className="note-text"> {item1['EXPENSE CONFIRMATORY REMARKS']} </div>,
                                        "EXPENSE CONFIRMED DATE":<div className="textReport">{item1['EXPENSE CONFIRMED DATE']}</div>,
                                        "EXPENSE DESK CONFIRMATORY REMARKS":<div className="note-text"> {item1['EXPENSE DESK CONFIRMATORY REMARKS']} </div>,
                                        "EXPENSE DESK CONFIRMED DATE":<div className="textReport">{item1['EXPENSE DESK CONFIRMED DATE']}</div>,
                                        
                                    })
                                }
                                else //remove fsname
                                {
                                    if (hq != fshq)
                                    {
                                        test12.push({
                                            "REGION":"",
                                            "FS NAME":"",
                                            "AREA":<div className="textReport">{item1['AREA']}</div>,
                                            "DATE":<div className="textReport">{item1['DATE']}</div>,
                                            "SRNO":<div className="textReport">{item1['SRNO']}</div>,
                                            "TYPE OF ACTIVITY":<div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                                            "DOCTOR NAME":<div className="textReport">{item1['DOCTOR NAME']}</div>,
                                            "DOCTOR CATEGORY":<div className="textReport">{item1['DOCTOR CATEGORY']}</div>,
                                            "PRODUCT/BRAND/BRANDSION":<div className="textReport">{item1['PRODUCT/BRAND']}</div>,
                                            "CURRENT BUSINESS":<div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                                            "EXPECTED BUSINESS":<div className="textReport">{item1['EXPECTED BUSINESS']}</div>,
                                            "ESTIMATED RPS AMOUNT":<div className="textReport">{item1['ESTIMATED RPS AMOUNT']}</div>,
                                            "ESTIMATED ADVANCE REQUIRED":<div className="textReport">{item1['ESTIMATED ADVANCE REQUIRED']}</div>,
                                            "BTC EXPENSE":<div className="textReport">{item1['BTC EXPENSE']}</div>,
                                            "EXPENSES AGAINST ADVANCE":<div className="textReport">{item1['EXPENSES AGAINST ADVANCE']}</div>,
                                            "EXPENSE CONFIRMATORY REMARKS":<div className="note-text"> {item1['EXPENSE CONFIRMATORY REMARKS']} </div>,
                                            "EXPENSE CONFIRMED DATE":<div className="textReport">{item1['EXPENSE CONFIRMED DATE']}</div>,
                                            "EXPENSE DESK CONFIRMATORY REMARKS":<div className="note-text"> {item1['EXPENSE DESK CONFIRMATORY REMARKS']} </div>,
                                            "EXPENSE DESK CONFIRMED DATE":<div className="textReport">{item1['EXPENSE DESK CONFIRMED DATE']}</div>,
                                            
                                        })
                                    }
                                    else//remove fshq
                                    {
                                        test12.push({
                                            "REGION":"",
                                            "FS NAME":"",
                                            "AREA":"",
                                            "DATE":<div className="textReport">{item1['DATE']}</div>,
                                            "SRNO":<div className="textReport">{item1['SRNO']}</div>,
                                            "TYPE OF ACTIVITY":<div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                                            "DOCTOR NAME":<div className="textReport">{item1['DOCTOR NAME']}</div>,
                                            "DOCTOR CATEGORY":<div className="textReport">{item1['DOCTOR CATEGORY']}</div>,
                                            "PRODUCT/BRAND/BRANDSION":<div className="textReport">{item1['PRODUCT/BRAND']}</div>,
                                            "CURRENT BUSINESS":<div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                                            "EXPECTED BUSINESS":<div className="textReport">{item1['EXPECTED BUSINESS']}</div>,
                                            "ESTIMATED RPS AMOUNT":<div className="textReport">{item1['ESTIMATED RPS AMOUNT']}</div>,
                                            "ESTIMATED ADVANCE REQUIRED":<div className="textReport">{item1['ESTIMATED ADVANCE REQUIRED']}</div>,
                                            "BTC EXPENSE":<div className="textReport">{item1['BTC EXPENSE']}</div>,
                                            "EXPENSES AGAINST ADVANCE":<div className="textReport">{item1['EXPENSES AGAINST ADVANCE']}</div>,
                                            "EXPENSE CONFIRMATORY REMARKS":<div className="note-text"> {item1['EXPENSE CONFIRMATORY REMARKS']} </div>,
                                            "EXPENSE CONFIRMED DATE":<div className="textReport">{item1['EXPENSE CONFIRMED DATE']}</div>,
                                            "EXPENSE DESK CONFIRMATORY REMARKS":<div className="note-text"> {item1['EXPENSE DESK CONFIRMATORY REMARKS']} </div>,
                                            "EXPENSE DESK CONFIRMED DATE":<div className="textReport">{item1['EXPENSE DESK CONFIRMED DATE']}</div>,
                                            
                                        })
                                    }
                                }
                            }
                        }
                        reg = item1['REGION']
                        fs = item1['FS NAME']
                        fsn = item1['FS NAME']
                        hq = item1['AREA']
                        if(item1['CURRENT BUSINESS']=="")
                        {
                            currentbusines = currentbusines + 0;
                        }
                        else
                        {
                        currentbusines = currentbusines + parseFloat(item1['CURRENT BUSINESS']);
                        }
                        
                        if(item1['EXPECTED BUSINESS']=="")
                        {
                            expectedbusines = expectedbusines + 0;
                        }
                        else
                        {
                            expectedbusines = expectedbusines + parseFloat(item1['EXPECTED BUSINESS']);
                        }
                       // expenseestimated = expenseestimated + Convert.ToDouble(dt.Rows[j][8]);
                        
                        if(item1['ESTIMATED RPS AMOUNT']=="")
                        {
                            reqamt = reqamt + 0;
                        }
                        else
                        {
                            reqamt = reqamt + parseFloat(item1['ESTIMATED RPS AMOUNT']);
                        }
                        
                        if(item1['ESTIMATED ADVANCE REQUIRED']=="")
                        {
                            estadv = estadv + 0;
                        }
                        else
                        {
                            estadv = estadv + parseFloat(item1['ESTIMATED ADVANCE REQUIRED']);
                        }
                        if(item1['BTC EXPENSE']=="" || item1['BTC EXPENSE'] == "undefined")
                        {
                            expbtc = expbtc   + 0;
                        }
                        else
                        {
                            expbtc = expbtc + parseFloat(item1['BTC EXPENSE']);
                        }
                        
                        if(item1['EXPENSES AGAINST ADVANCE']=="")
                        {
                            actexp = actexp + 0;
                        }
                        else
                        {
                            actexp = actexp + parseFloat(item1['EXPENSES AGAINST ADVANCE']);
                        }
                        

                        
                        if(item1['CURRENT BUSINESS']=="")
                        {
                            fscurrentbusines = fscurrentbusines + 0;
                        }
                        else
                        {
                            fscurrentbusines = fscurrentbusines + parseFloat(item1['CURRENT BUSINESS']);
                        }
                        
                        if(item1['EXPECTED BUSINESS']=="")
                        {
                            fsexpectedbusines = fsexpectedbusines + 0;
                        }
                        else
                        {
                            fsexpectedbusines = fsexpectedbusines + parseFloat(item1['EXPECTED BUSINESS']);
                        }
                       // fsexpenseestimated = fsexpenseestimated + Convert.ToDouble(dt.Rows[j][8]);
                        
                        if(item1['ESTIMATED RPS AMOUNT']=="")
                        {
                            fsreqamt = fsreqamt + 0;
                        }
                        else
                        {
                            fsreqamt = fsreqamt + parseFloat(item1['ESTIMATED RPS AMOUNT']);
                        }
                        
                        if(item1['ESTIMATED ADVANCE REQUIRED']=="")
                        {
                            fsestadv = fsestadv + 0;
                        }
                        else
                        {
                            fsestadv = fsestadv + parseFloat(item1['ESTIMATED ADVANCE REQUIRED']);
                        }

                        if(item1['BTC EXPENSE']=="")
                        {
                            fsexpbtc = parseFloat(fsexpbtc) + parseFloat(0);
                        }
                        else
                        {
                            fsexpbtc = parseFloat(fsexpbtc) + parseFloat(item1['BTC EXPENSE']);
                        }
                        
                        if(item1['EXPENSES AGAINST ADVANCE']=="")
                        {
                            fsactexp = fsactexp + 0;
                        }
                        else
                        {
                            fsactexp = fsactexp + parseFloat(item1['EXPENSES AGAINST ADVANCE']);
                        }

                        
                        if(item1['CURRENT BUSINESS']=="")
                        {
                            currentbusinesAllTotal = currentbusinesAllTotal + 0;
                        }
                        else
                        {
                            currentbusinesAllTotal = currentbusinesAllTotal + parseFloat(item1['CURRENT BUSINESS']);
                        }
                        
                        if(item1['EXPECTED BUSINESS']=="")
                        {
                            expectedbusinesAllTotal = expectedbusinesAllTotal + 0;
                        }
                        else
                        {
                            expectedbusinesAllTotal = expectedbusinesAllTotal + parseFloat(item1['EXPECTED BUSINESS']);
                        }
                       // expenseestimatedAllTotal = expenseestimatedAllTotal + Convert.ToDouble(dt.Rows[j][8]);
                        
                        if(item1['ESTIMATED RPS AMOUNT']=="")
                        {
                            reqamtalltotal = reqamtalltotal + 0;
                        }
                        else
                        {
                            reqamtalltotal = reqamtalltotal + parseFloat(item1['ESTIMATED RPS AMOUNT']);
                        }
                        
                        if(item1['ESTIMATED ADVANCE REQUIRED']=="")
                        {
                            estadvAllTotal = estadvAllTotal + 0;
                        }
                        else
                        {
                            estadvAllTotal = estadvAllTotal + parseFloat(item1['ESTIMATED ADVANCE REQUIRED']);
                        }
                        
                        if(item1['BTC EXPENSE']=="")
                        {
                            expbtcAllTotal = parseFloat(expbtcAllTotal) + 0;
                        }
                        else
                        {
                            expbtcAllTotal = parseFloat(expbtcAllTotal) + parseFloat(item1['BTC EXPENSE']);
                        }
                        
                        if(item1['EXPENSES AGAINST ADVANCE']=="")
                        {
                            actexpAllTotal = actexpAllTotal + 0;
                        }
                        else
                        {
                            actexpAllTotal = actexpAllTotal + parseFloat(item1['EXPENSES AGAINST ADVANCE']);
                        }

                        cregion = item1['REGION']
                        cfs = item1['FS NAME']


                        if (index==(Result.data.data.length)-1)
                        {
                            // alert("bb")
                            region = item1['REGION']
                            fscode = item1['FS NAME']
                            fsname = item1['FS NAME']
                            fshq = item1['AREA']

                            if(fsexpbtc=="Nan")
                            fsexpbtc=0;
                            test12.push({
                                "REGION":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Total'}} />,
                                "FS NAME":"",
                                "AREA":"",
                                "DATE":"",
                                "SRNO":"",
                                "TYPE OF ACTIVITY":"",
                                "DOCTOR NAME":"",
                                "DOCTOR CATEGORY":"",
                                "PRODUCT/BRAND/BRANDSION":"",
                                "CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fscurrentbusines}} />,
                                "EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpectedbusines}} />,
                                "ESTIMATED RPS AMOUNT":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsreqamt}} />,
                                "ESTIMATED ADVANCE REQUIRED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsestadv}} />,
                                "BTC EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpbtc}} />,
                                "EXPENSES AGAINST ADVANCE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsactexp}} />,
                                "EXPENSE CONFIRMATORY REMARKS":"",
                                "EXPENSE CONFIRMED DATE":"",
                                "EXPENSE DESK CONFIRMATORY REMARKS":"",
                                "EXPENSE DESK CONFIRMED DATE":"",
                                
                            })

                            test12.push({
                                "REGION":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
                                "FS NAME":"",
                                "AREA":"",
                                "DATE":"",
                                "SRNO":"",
                                "TYPE OF ACTIVITY":"",
                                "DOCTOR NAME":"",
                                "DOCTOR CATEGORY":"",
                                "PRODUCT/BRAND/BRANDSION":"",
                                "CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusines}} />,
                                "EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusines}} />,
                                "ESTIMATED RPS AMOUNT":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: reqamt}} />,
                                "ESTIMATED ADVANCE REQUIRED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: estadv}} />,
                                "BTC EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expbtc}} />,
                                "EXPENSES AGAINST ADVANCE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actexp}} />,
                                "EXPENSE CONFIRMATORY REMARKS":"",
                                "EXPENSE CONFIRMED DATE":"",
                                "EXPENSE DESK CONFIRMATORY REMARKS":"",
                                "EXPENSE DESK CONFIRMED DATE":"",
                                
                            })

                        }
                        else
                        {
                            
                                    region = Result.data.data[index+1]["REGION"]
                                    fscode = Result.data.data[index+1]['FS NAME']
                                    fsname = Result.data.data[index+1]['FS NAME']
                                    //fshq = dt.Rows[j + 1][2].ToString();
                                    fshq =Result.data.data[index+1]['AREA']
                               
                        }
                        if (cfs != fsname)
                        {
                            if(fsexpbtc=="Nan")
                            fsexpbtc=0;
                            //alert("cc")
                            test12.push({
                                "REGION":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Total'}} />,
                                "FS NAME":"",
                                "AREA":"",
                                "DATE":"",
                                "SRNO":"",
                                "TYPE OF ACTIVITY":"",
                                "DOCTOR NAME":"",
                                "DOCTOR CATEGORY":"",
                                "PRODUCT/BRAND/BRANDSION":"",
                                "CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fscurrentbusines}} />,
                                "EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpectedbusines}} />,
                                "ESTIMATED RPS AMOUNT":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsreqamt}} />,
                                "ESTIMATED ADVANCE REQUIRED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsestadv}} />,
                                "BTC EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpbtc}} />,
                                "EXPENSES AGAINST ADVANCE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsactexp}} />,
                                "EXPENSE CONFIRMATORY REMARKS":"",
                                "EXPENSE CONFIRMED DATE":"",
                                "EXPENSE DESK CONFIRMATORY REMARKS":"",
                                "EXPENSE DESK CONFIRMED DATE":"",
                                
                            })

                            fscurrentbusines = 0;
                            fsexpectedbusines = 0;
                          //  fsexpenseestimated = 0;
                            fsreqamt = 0;
                            fsestadv = 0;
                            fsestimatedbtc = 0;
                            fsexpbtc = 0;
                            fsactexp = 0;

                        }
                     
                   
                  

                        if ((cregion != region))
                        {
                            
                            test12.push({
                                "REGION":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
                                "FS NAME":"",
                                "AREA":"",
                                "DATE":"",
                                "SRNO":"",
                                "TYPE OF ACTIVITY":"",
                                "DOCTOR NAME":"",
                                "DOCTOR CATEGORY":"",
                                "PRODUCT/BRAND/BRANDSION":"",
                                "CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusines}} />,
                                "EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusines}} />,
                                "ESTIMATED RPS AMOUNT":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: reqamt}} />,
                                "ESTIMATED ADVANCE REQUIRED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: estadv}} />,
                                "BTC EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expbtc}} />,
                                "EXPENSES AGAINST ADVANCE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actexp}} />,
                                "EXPENSE CONFIRMATORY REMARKS":"",
                                "EXPENSE CONFIRMED DATE":"",
                                "EXPENSE DESK CONFIRMATORY REMARKS":"",
                                "EXPENSE DESK CONFIRMED DATE":"",
                                
                            })

                            currentbusines = 0;
                            expectedbusines = 0;
                           // expenseestimated = 0;
                            reqamt = 0;
                            estadv = 0;
                            expbtc = 0;
                            actexp = 0;

                        }
                        prvregion = item1['REGION'];

                       
                  }
                  )
                  if(Result.data.data.length>0)
                  {
                   test12.push({
                        "REGION":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'All India Total'}} />,
                        "FS NAME":"",
                        "AREA":"",
                        "DATE":"",
                        "SRNO":"",
                        "TYPE OF ACTIVITY":"",
                        "DOCTOR NAME":"",
                        "DOCTOR CATEGORY":"",
                        "PRODUCT/BRAND/BRANDSION":"",
                        "CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusinesAllTotal}} />,
                        "EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusinesAllTotal}} />,
                        "ESTIMATED RPS AMOUNT":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: reqamtalltotal}} />,
                        "ESTIMATED ADVANCE REQUIRED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: estadvAllTotal}} />,
                        "BTC EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expbtcAllTotal}} />,
                        "EXPENSES AGAINST ADVANCE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: actexpAllTotal}} />,
                        "EXPENSE CONFIRMATORY REMARKS":"",
                        "EXPENSE CONFIRMED DATE":"",
                        "EXPENSE DESK CONFIRMATORY REMARKS":"",
                        "EXPENSE DESK CONFIRMED DATE":"",
                        
                    })
                }
            this.setState({ loader:false })
              this.setState({ Result1: test12 })
              this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
            }
            
          }).catch(() => {
          
            this.setState({ loader:false })
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })
        }else
        {
             //prp headding
             this.setState({headder:[


            { prop: 'REGION'  , title:   'Region', filterable: true,sortable:true,options: { display: false} },    
            { prop: 'FS NAME'  , title:   'FS Name', filterable: true,sortable:true },     
            { prop: 'AREA'  , title:   'HQ', filterable: true,sortable:true },
            { prop: 'DATE' , title:   'Date Of Activity' , filterable: true,sortable:true }, 
            { prop: 'SRNO'  , title:   'PRP No' , filterable: true,sortable:true }, 
            { prop: 'TYPE OF ACTIVITY'  , title:   'Type Of Activity', filterable: true,sortable:true },  
            { prop: 'INVITED SPEAKER NAME' , title:    'Invited Speaker Name' , filterable: true,sortable:true }, 
            { prop: 'ITEM NAME'  , title:   'Product/Brand', filterable: true,sortable:true },  
            { prop: 'CURRENT BUSINESS' , title:    'Current Business' , filterable: true,sortable:true }, 
            { prop: 'EXPECTED BUSINESS' , title:    'Expected Business', filterable: true,sortable:true },  
            { prop: 'ADVANCE AMOUNT' , title:    'Total Cost Estimated For Advance', filterable: true,sortable:true },  
            { prop: 'TOTAL COST ESTIMATED' , title:    'Total Cost Estimated For PRP', filterable: true,sortable:true },  
            { prop: 'TOTAL COST ESTIMATED FOR BTC' , title:    'Total Cost Estimated For BTC' , filterable: true,sortable:true }, 
            { prop: 'TOTAL COST FOR PRP' , title:    'Total Cost For PRP' , filterable: true,sortable:true }, 
            { prop: 'TOTAL COST FOR BTC' , title:    'Total Cost For BTC' , filterable: true,sortable:true }, 
            { prop: 'TOTAL COST AGAINST ADVANCE', title:     'Total Cost Against Advance', filterable: true,sortable:true },  
            { prop: 'EXPENSE CONFIRMATORY REMARKS', title:     'Expense confirmatory Remarks', filterable: true,sortable:true },  
            { prop: 'EXPENSE CONFIRMED DATE' , title:    'Expense confirmed date', filterable: true,sortable:true }, 
                      
       ]});
    // let header1 =[]
    //     let displayedColumns = ['REGION'  , 
    //     'FS NAME',   
    //     'AREA'  ,
    //     'DATE' , 
    //     'SRNO'  ,
    //     'TYPE OF ACTIVITY'  ,  
    //     'INVITED SPEAKER NAME' ,
    //     'ITEM NAME'  , 
    //     'CURRENT BUSINESS' , 
    //     'EXPECTED BUSINESS' ,
    //     'ADVANCE AMOUNT' , 
    //     'TOTAL COST ESTIMATED' ,
    //     'TOTAL COST ESTIMATED FOR BTC' ,
    //     'TOTAL COST FOR PRP' ,
    //     'TOTAL COST FOR BTC' ,
    //     'TOTAL COST AGAINST ADVANCE', 
    //     'EXPENSE CONFIRMATORY REMARKS',
    //     'EXPENSE CONFIRMED DATE']
       

    //     displayedColumns.map(item => {
    //         let headerList = {
    //             title: item,
    //             prop: item,
    //             sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    //             filterable: true
    //         };
    //          header1.push(headerList);
    //     });

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
                displayedColumns :displayedColumns,headder:hdr1
            });


        // this.setState({headder:header1,displayedColumns:displayedColumns})
          
            postToServer("RPS_InvesttHis", travelModes).then((Result) => {
                if (Result.data.Status == 'Success') {   
                     
                    Result.data.data.map((item1,index) => {
                        if(index=="22")

                        var advamt = "";
                        var adamt = 0;
                        if (item1['INVITED SPEAKER NAME'] == "0.00")
                        {
                            advamt = "NIL";
                            adamt = 0;
                        }
                        else
                        {
                            advamt = item1['ADVANCE AMOUNT'];
                            adamt = item1['ADVANCE AMOUNT'];

                        }
                        fscode = item1['FS NAME'];

                        if (fs != fscode)
                        {
                           
                            test13.push({
                               "REGION":<div className="textReport">{item1['REGION']}</div>,
                                "FS NAME":<div className="textReport">{item1['FS NAME']}</div>,
                                "AREA":<div className="textReport">{item1['AREA']}</div>,
                                "DATE":<div className="textReport">{item1['DATE']}</div>,
                                "SRNO":<div className="textReport">{item1['SRNO']}</div>,
                                "TYPE OF ACTIVITY":<div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                                "INVITED SPEAKER NAME":<div className="textReport">{item1['INVITED SPEAKER NAME']}</div>,
                                "ITEM NAME":<div className="textReport">{item1['ITEM NAME']}</div>,
                                "CURRENT BUSINESS":<div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                                "EXPECTED BUSINESS":<div className="textReport">{item1['EXPECTED BUSINESS']}</div>,
                                "ADVANCE AMOUNT":<div className="textReport">{item1['ADVANCE AMOUNT']}</div>,
                                "TOTAL COST ESTIMATED":<div className="textReport">{item1['TOTAL COST ESTIMATED']}</div>,
                                "TOTAL COST ESTIMATED FOR BTC":<div className="textReport">{item1['TOTAL COST ESTIMATED FOR BTC']}</div>,
                                "TOTAL COST FOR PRP":<div className="textReport">{item1['TOTAL COST FOR PRP']}</div>,
                                "TOTAL COST FOR BTC":<div className="textReport">{item1['TOTAL COST FOR BTC']}</div>,
                                "TOTAL COST AGAINST ADVANCE":<div className="textReport">{item1['TOTAL COST AGAINST ADVANCE']}</div>,
                                "EXPENSE CONFIRMATORY REMARKS" :<div className="note-text"> {item1['EXPENSE CONFIRMATORY REMARKS']} </div>,
                                "EXPENSE CONFIRMED DATE":<div className="textReport">{item1['EXPENSE CONFIRMED DATE']}</div>,
                            })
                        }
                        else
                        {
                            if (reg != region)
                            {
                                test13.push({
                                    "REGION":<div className="textReport">{item1['REGION']}</div>,
                                    "FS NAME":<div className="textReport">{item1['FS NAME']}</div>,
                                    "AREA":<div className="textReport">{item1['AREA']}</div>,
                                    "DATE":<div className="textReport">{item1['DATE']}</div>,
                                    "SRNO":<div className="textReport">{item1['SRNO']}</div>,
                                    "TYPE OF ACTIVITY":<div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                                    "INVITED SPEAKER NAME":<div className="textReport">{item1['INVITED SPEAKER NAME']}</div>,
                                    "ITEM NAME":<div className="textReport">{item1['ITEM NAME']}</div>,
                                    "CURRENT BUSINESS":<div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                                    "EXPECTED BUSINESS":<div className="textReport">{item1['EXPECTED BUSINESS']}</div>,
                                    "ADVANCE AMOUNT":<div className="textReport">{item1['ADVANCE AMOUNT']}</div>,
                                    "TOTAL COST ESTIMATED":<div className="textReport">{item1['TOTAL COST ESTIMATED']}</div>,
                                    "TOTAL COST ESTIMATED FOR BTC":<div className="textReport">{item1['TOTAL COST ESTIMATED FOR BTC']}</div>,
                                    "TOTAL COST FOR PRP":<div className="textReport">{item1['TOTAL COST FOR PRP']}</div>,
                                    "TOTAL COST FOR BTC":<div className="textReport">{item1['TOTAL COST FOR BTC']}</div>,
                                    "TOTAL COST AGAINST ADVANCE":<div className="textReport">{item1['TOTAL COST AGAINST ADVANCE']}</div>,
                                    "EXPENSE CONFIRMATORY REMARKS" :<div className="note-text"> {item1['EXPENSE CONFIRMATORY REMARKS']} </div>,
                                    "EXPENSE CONFIRMED DATE":<div className="textReport">{item1['EXPENSE CONFIRMED DATE']}</div>,
                                })
                            }
                            else // remove region
                            {
                                if (fsn != fsname)
                                {
                                   test13.push({
                                        "REGION":"",
                                        "FS NAME":<div className="textReport">{item1['FS NAME']}</div>,
                                        "AREA":<div className="textReport">{item1['AREA']}</div>,
                                        "DATE":<div className="textReport">{item1['DATE']}</div>,
                                        "SRNO":<div className="textReport">{item1['SRNO']}</div>,
                                        "TYPE OF ACTIVITY":<div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                                        "INVITED SPEAKER NAME":<div className="textReport">{item1['INVITED SPEAKER NAME']}</div>,
                                        "ITEM NAME":<div className="textReport">{item1['ITEM NAME']}</div>,
                                        "CURRENT BUSINESS":<div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                                        "EXPECTED BUSINESS":<div className="textReport">{item1['EXPECTED BUSINESS']}</div>,
                                        "ADVANCE AMOUNT":<div className="textReport">{item1['ADVANCE AMOUNT']}</div>,
                                        "TOTAL COST ESTIMATED":<div className="textReport">{item1['TOTAL COST ESTIMATED']}</div>,
                                        "TOTAL COST ESTIMATED FOR BTC":<div className="textReport">{item1['TOTAL COST ESTIMATED FOR BTC']}</div>,
                                        "TOTAL COST FOR PRP":<div className="textReport">{item1['TOTAL COST FOR PRP']}</div>,
                                        "TOTAL COST FOR BTC":<div className="textReport">{item1['TOTAL COST FOR BTC']}</div>,
                                        "TOTAL COST AGAINST ADVANCE":<div className="textReport">{item1['TOTAL COST AGAINST ADVANCE']}</div>,
                                        "EXPENSE CONFIRMATORY REMARKS" :<div className="note-text"> {item1['EXPENSE CONFIRMATORY REMARKS']} </div>,
                                        "EXPENSE CONFIRMED DATE":<div className="textReport">{item1['EXPENSE CONFIRMED DATE']}</div>,
                                    })
                                }
                                else //remove fsname
                                {
                                    if (hq != fshq)
                                    {
                                        // strb.Append("<tr style='color: black;background-color:#E3E4E5;font-size:8pt;text-decoration:none;font-family:Verdana;height:30px'><td></td><td></td><td>" + dt.Rows[j][2].ToString() + "</td><td>" + dt.Rows[j][3].ToString() + "</td><td>" + dt.Rows[j][9].ToString() + "</td><td>" + dt.Rows[j][4].ToString() + "</td><td>" + dt.Rows[j][11].ToString() + "</td><td>" + dt.Rows[j][5].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][6].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][7].ToString() + "</td><td class='right_heading'>" + advamt + "</td><td class='right_heading'>" + dt.Rows[j][8].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][15].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][16].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][13].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][14].ToString() + "</td><td class='left_heading'>" + dt.Rows[j][17].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][18].ToString() + "</td></tr>");
                                        // strb.Append("<tr style='color: black;background-color:#E3E4E5;font-size:8pt;text-decoration:none;font-family:Verdana;height:30px'><td></td><td></td><td>" + dt.Rows[j][4].ToString() + "</td><td>" + dt.Rows[j][5].ToString() + "</td><td>" + dt.Rows[j][6].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][7].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][8].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][9].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][10].ToString() + "</td></tr>");
                                        test13.push({
                                            "REGION":"",
                                            "FS NAME":"",
                                            "AREA":"",
                                            "DATE":<div className="textReport">{item1['DATE']}</div>,
                                            "SRNO":<div className="textReport">{item1['SRNO']}</div>,
                                            "TYPE OF ACTIVITY":<div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                                            "INVITED SPEAKER NAME":<div className="textReport">{item1['INVITED SPEAKER NAME']}</div>,
                                            "ITEM NAME":<div className="textReport">{item1['ITEM NAME']}</div>,
                                            "CURRENT BUSINESS":<div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                                            "EXPECTED BUSINESS":<div className="textReport">{item1['EXPECTED BUSINESS']}</div>,
                                            "ADVANCE AMOUNT":<div className="textReport">{item1['ADVANCE AMOUNT']}</div>,
                                            "TOTAL COST ESTIMATED":<div className="textReport">{advamt}</div>,
                                            "TOTAL COST ESTIMATED FOR BTC":<div className="textReport">{item1['TOTAL COST ESTIMATED FOR BTC']}</div>,
                                            "TOTAL COST FOR PRP":<div className="textReport">{item1['TOTAL COST FOR PRP']}</div>,
                                            "TOTAL COST FOR BTC":<div className="textReport">{item1['TOTAL COST FOR BTC']}</div>,
                                            "TOTAL COST AGAINST ADVANCE":<div className="textReport">{item1['TOTAL COST AGAINST ADVANCE']}</div>,
                                            "EXPENSE CONFIRMATORY REMARKS" :<div className="note-text"> {item1['EXPENSE CONFIRMATORY REMARKS']} </div>,
                                            "EXPENSE CONFIRMED DATE":<div className="textReport">{item1['EXPENSE CONFIRMED DATE']}</div>,
                                        })
                                    }
                                    else//remove fshq
                                    {
                                        // strb.Append("<tr style='color: black;background-color:#E3E4E5;font-size:8pt;text-decoration:none;font-family:Verdana;height:30px'><td></td><td></td><td></td><td>" + dt.Rows[j][3].ToString() + "</td><td>" + dt.Rows[j][9].ToString() + "</td><td>" + dt.Rows[j][4].ToString() + "</td><td>" + dt.Rows[j][11].ToString() + "</td><td>" + dt.Rows[j][5].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][6].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][7].ToString() + "</td><td class='right_heading'>" + advamt + "</td><td class='right_heading'>" + dt.Rows[j][8].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][15].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][16].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][13].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][14].ToString() + "</td><td class='left_heading'>" + dt.Rows[j][17].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][18].ToString() + "</td></tr>");
                                        test13.push({
                                            "REGION":"",
                                            "FS NAME":"",
                                            "AREA":"",
                                            "DATE":<div className="textReport">{item1['DATE']}</div>,
                                            "SRNO":<div className="textReport">{item1['SRNO']}</div>,
                                            "TYPE OF ACTIVITY":<div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                                            "INVITED SPEAKER NAME":<div className="textReport">{item1['INVITED SPEAKER NAME']}</div>,
                                            "ITEM NAME":<div className="textReport">{item1['ITEM NAME']}</div>,
                                            "CURRENT BUSINESS":<div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                                            "EXPECTED BUSINESS":<div className="textReport">{item1['EXPECTED BUSINESS']}</div>,
                                            "ADVANCE AMOUNT":<div className="textReport">{advamt}</div>,
                                            "TOTAL COST ESTIMATED":<div className="textReport">{advamt}</div>,
                                            "TOTAL COST ESTIMATED FOR BTC":<div className="textReport">{item1['TOTAL COST ESTIMATED FOR BTC']}</div>,
                                            "TOTAL COST FOR PRP":<div className="textReport">{item1['TOTAL COST FOR PRP']}</div>,
                                            "TOTAL COST FOR BTC":<div className="textReport">{item1['TOTAL COST FOR BTC']}</div>,
                                            "TOTAL COST AGAINST ADVANCE":<div className="textReport">{item1['TOTAL COST AGAINST ADVANCE']}</div>,
                                            "EXPENSE CONFIRMATORY REMARKS" :<div className="note-text"> {item1['EXPENSE CONFIRMATORY REMARKS']} </div>,
                                            "EXPENSE CONFIRMED DATE":<div className="textReport">{item1['EXPENSE CONFIRMED DATE']}</div>,
                                        })
                                        //  strb.Append("<tr style='color: black;background-color:#E3E4E5;font-size:8pt;text-decoration:none;font-family:Verdana;height:30px'><td></td><td></td><td></td><td>" + dt.Rows[j][5].ToString() + "</td><td>" + dt.Rows[j][6].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][7].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][8].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][9].ToString() + "</td><td class='right_heading'>" + dt.Rows[j][10].ToString() + "</td></tr>");
                                    }
                                }
                            }
                        }

                        reg = item1['REGION'];
                        fs = item1['FS NAME'];
                        fsn = item1['FS NAME'];
                        hq = item1['AREA'];

                        var adv = "";
                        currentbusines = currentbusines + parseFloat(item1['CURRENT BUSINESS']);
                        expectedbusines = expectedbusines + parseFloat(item1['EXPECTED BUSINESS']);
                       // expenseestimated = expenseestimated + Convert.ToDouble(dt.Rows[j][8]);
                     
                       // estimatedamnt = estimatedamnt + Convert.ToDouble(dt.Rows[j][8]);
                        prptotal = prptotal + parseFloat(item1['TOTAL COST ESTIMATED']);
                        btctotal = btctotal + parseFloat(item1['TOTAL COST FOR BTC']);
                        estimatedbtc = estimatedbtc + parseFloat(item1['TOTAL COST ESTIMATED FOR BTC']);
                        prpcost = prpcost + parseFloat(item1['TOTAL COST FOR PRP']);
                        advtotal = advtotal + parseFloat(item1['TOTAL COST AGAINST ADVANCE']);
                        advreq = advreq + parseFloat(adamt);
                        if (advreq == 0)
                        {
                            adv = "NIL";
                        }
                        else
                        {
                            adv = advreq
                        }

                        var fsadv = "";
                        fscurrentbusines = fscurrentbusines + parseFloat(item1['CURRENT BUSINESS']);
                        fsexpectedbusines = fsexpectedbusines + parseFloat(item1['EXPECTED BUSINESS']);
                     //   fsexpenseestimated = fsexpenseestimated + Convert.ToDouble(dt.Rows[j][8]);
                        fsestimatedamnt = fsestimatedamnt + parseFloat(item1['TOTAL COST ESTIMATED']);
                        fsprptotal = fsprptotal + parseFloat(item1['TOTAL COST ESTIMATED']);
                        fsbtctotal = fsbtctotal + parseFloat(item1['TOTAL COST FOR BTC']);
                        fsestimatedbtc = fsestimatedbtc + parseFloat(item1['TOTAL COST ESTIMATED FOR BTC']);
                        fsprpcost = fsprpcost + parseFloat(item1['TOTAL COST FOR PRP']);
                        fsadvreq = fsadvreq + parseFloat(adamt);
                        fsadvtotal = fsadvtotal + parseFloat(item1['TOTAL COST AGAINST ADVANCE']);
                        
                        if (fsadvreq == 0)
                        {
                            fsadv = "NIL";
                        }
                        else
                        {
                            fsadv = fsadvreq;
                        }

                        currentbusinesAllTotal = currentbusinesAllTotal + parseFloat(item1['CURRENT BUSINESS']);
                        expectedbusinesAllTotal = expectedbusinesAllTotal +parseFloat(item1['EXPECTED BUSINESS']);
                     
                        prptotalAllTotal = prptotalAllTotal + parseFloat(item1['TOTAL COST ESTIMATED']);
                        btctotalAllTotal = btctotalAllTotal +  parseFloat(item1['TOTAL COST FOR BTC']);
                        estimatedbtcAllTotal = estimatedbtcAllTotal + parseFloat(item1['TOTAL COST ESTIMATED FOR BTC']);
                        prpcostAllTotal = prpcostAllTotal + parseFloat(item1['TOTAL COST FOR PRP']);
                        advreqAlltotal = advreqAlltotal + parseFloat(adamt);
                        advtotalAllTotal = advtotalAllTotal + parseFloat(item1['TOTAL COST AGAINST ADVANCE']);

                        cregion = item1['REGION']
                        cfs = item1['FS NAME'];
                        if (index==(Result.data.data.length)-1)
                        {
                            region = item1['REGION']
                            fscode = item1['FS NAME'],
                            fsname = item1['FS NAME'],
                            fshq = item1['AREA']

                            test13.push({
                                "REGION":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Total'}} />,
                                "FS NAME":"",
                                "AREA":"",
                                "DATE":"",
                                "SRNO":"",
                                "TYPE OF ACTIVITY":"",
                                "INVITED SPEAKER NAME":"",
                                "ITEM NAME":"",
                                "CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fscurrentbusines}} />,
                                "EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpectedbusines}} />,
                                "ADVANCE AMOUNT":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsadv}} />,
                                "TOTAL COST ESTIMATED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsprptotal}} />,
                                "TOTAL COST ESTIMATED FOR BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsestimatedbtc}} />,
                                "TOTAL COST FOR PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsprpcost}} />,
                                "TOTAL COST FOR BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsbtctotal}} />,
                                "TOTAL COST AGAINST ADVANCE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsadvtotal}} />,
                                "EXPENSE CONFIRMATORY REMARKS" :"",
                                "EXPENSE CONFIRMED DATE":"",
                            })

                            test13.push({
                                "REGION":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
                                "FS NAME":"",
                                "AREA":"",
                                "DATE":"",
                                "SRNO":"",
                                "TYPE OF ACTIVITY":"",
                                "INVITED SPEAKER NAME":"",
                                "ITEM NAME":"",
                                "CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusines}} />,
                                "EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusines}} />,
                                "ADVANCE AMOUNT":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv}} />,
                                "TOTAL COST ESTIMATED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: prptotal}} />,
                                "TOTAL COST ESTIMATED FOR BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: estimatedbtc}} />,
                                "TOTAL COST FOR PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: prpcost}} />,
                                "TOTAL COST FOR BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: btctotal}} />,
                                "TOTAL COST AGAINST ADVANCE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: advtotal}} />,
                                "EXPENSE CONFIRMATORY REMARKS" :"",
                                "EXPENSE CONFIRMED DATE":"",
                            })

                        }
                        else
                        {
                            region = Result.data.data[index+1]["REGION"]
                            fscode = Result.data.data[index+1]['FS NAME']
                            fsname = Result.data.data[index+1]['FS NAME']
                            fshq = Result.data.data[index+1]['AREA']
                        }

                        if (cfs != fsname)
                        {

                            test13.push({
                                "REGION":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Total'}} />,
                                "FS NAME":"",
                                "AREA":"",
                                "DATE":"",
                                "SRNO":"",
                                "TYPE OF ACTIVITY":"",
                                "INVITED SPEAKER NAME":"",
                                "ITEM NAME":"",
                                "CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fscurrentbusines}} />,
                                "EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsexpectedbusines}} />,
                                "ADVANCE AMOUNT":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsadv}} />,
                                "TOTAL COST ESTIMATED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsprptotal}} />,
                                "TOTAL COST ESTIMATED FOR BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsestimatedbtc}} />,
                                "TOTAL COST FOR PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsprpcost}} />,
                                "TOTAL COST FOR BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsbtctotal}} />,
                                "TOTAL COST AGAINST ADVANCE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: fsadvtotal}} />,
                                "EXPENSE CONFIRMATORY REMARKS" :"",
                                "EXPENSE CONFIRMED DATE":"",
                            })

                            fscurrentbusines = 0;
                            fsexpectedbusines = 0;
                            fsexpenseestimated = 0;
                            fsestimatedamnt = 0;
                            fsprptotal = 0;
                            fsadvreq = 0;
                            fsestimatedbtc = 0;
                            fsprpcost = 0;
                            fsbtctotal = 0;
                            fsadvtotal = 0;

                        }
                        if ((cregion != region))
                        {
                            

                            test13.push({
                                "REGION":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
                                "FS NAME":"",
                                "AREA":"",
                                "DATE":"",
                                "SRNO":"",
                                "TYPE OF ACTIVITY":"",
                                "INVITED SPEAKER NAME":"",
                                "ITEM NAME":"",
                                "CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusines}} />,
                                "EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusines}} />,
                                "ADVANCE AMOUNT":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv}} />,
                                "TOTAL COST ESTIMATED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: prptotal}} />,
                                "TOTAL COST ESTIMATED FOR BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: estimatedbtc}} />,
                                "TOTAL COST FOR PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: prpcost}} />,
                                "TOTAL COST FOR BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: btctotal}} />,
                                "TOTAL COST AGAINST ADVANCE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: advtotal}} />,
                                "EXPENSE CONFIRMATORY REMARKS" :"",
                                "EXPENSE CONFIRMED DATE":"",
                            })

                            currentbusines = 0;
                            expectedbusines = 0;
                            expenseestimated = 0;
                          //  estimatedamnt = 0;
                            prptotal = 0;
                            advreq = 0;
                            estimatedbtc = 0;
                            prpcost = 0;
                            btctotal = 0;
                            advtotal = 0;
                        }
                        prvregion = item1['REGION'];

                        
                    if (advreqAlltotal == 0)
                    {
                        alladv = 'NIL';
                    }
                    else
                    {
                        alladv = advreqAlltotal;
                    }

                  



                    })
                   
                    
                    if(Result.data.data.length>0)
                    {
                    test13.push({
                        "REGION":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'All India Total'}} />,
                        "FS NAME":"",
                        "AREA":"",
                        "DATE":"",
                        "SRNO":"",
                        "TYPE OF ACTIVITY":"",
                        "INVITED SPEAKER NAME":"",
                        "ITEM NAME":"",
                        "CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusinesAllTotal}} />,
                        "EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusinesAllTotal}} />,
                        "ADVANCE AMOUNT":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: alladv}} />,
                        "TOTAL COST ESTIMATED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: prptotalAllTotal}} />,
                        "TOTAL COST ESTIMATED FOR BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: estimatedbtcAllTotal}} />,
                        "TOTAL COST FOR PRP":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: prpcostAllTotal}} />,
                        "TOTAL COST FOR BTC":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: btctotalAllTotal}} />,
                        "TOTAL COST AGAINST ADVANCE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: advtotalAllTotal}} />,
                        "EXPENSE CONFIRMATORY REMARKS" :"",
                        "EXPENSE CONFIRMED DATE":""
                    })
                }
                    this.setState({ Result1: test13 })
                    this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
                    this.setState({ loader:false })
                }
                }).catch(() => {
                     alert("error")
                    this.setState({ loader:false })
                    this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
                  })
                        
        }

    }






    render(){
       
        let {Result1,headder,entriescount,rowsperpage1}=this.state
        const {  data, toggleHeader, unslectedColumns } = this.state;
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
                 <ReportTableRPSINVEST
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
                    // rowsPerPageOption={[10, 20, 50, 100, 200,500,1000,2000]}
                    rowsPerPage={rowsperpage1}
                    rowsPerPageOption={entriescount}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    applyFilter={this.applyFilterAll}
                    mainHead={this.state.mainHead}
                    expdata={Result1}
                    // headerColums={headerColums}
                    getUnselectedColumns={this.getUnselectedColumns}
                />
            </div>
        )
    }
}

export default ReportListRPSINVEST