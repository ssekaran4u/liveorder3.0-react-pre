
import React,{Component} from 'react'
import ReportTableRPSDocWiseInvDet from './ReportTableRPSDocWiseInvDet'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'

class ReportListRPSDocWiseInvDet extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'',
            selreg:'',
            selarea:'All',
            selbr:'',
            seldate:'',
            selyr:'',
            mnthname:'',
            fsn:'',
            selfsd:'-999',
            seldg:'All',
            seldc:'All',
            seldn:'All',
            seltyp:'1',
            RegionCode:'',
            DivisionCode:'',
            areacode:'',

            Result1:[],
            loader:false,
            seltype:'',
            headder:[],
            monthString:'',
            mainHead:"",
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
           
            this.setState({selarea:state.rvalue})
        }
        else if(state.name=="FS Name")
        {
            
            this.setState({selbr:state.rvalue})
            this.setState({fsn:state.textval})
        }
        else if(state.name=="Month")
        {
            let ddd='';
            let mna='';
            state.rvalue.map((test1,index) => {
               
                ddd+=','+test1.id;
                if(test1.id=="undefined" || test1.label=="All")
                {
                ddd='1,2,3,4,5,6,7,8,9,10,11,12'
                mna=', January,February,March,April,May,June,July,August,September,October,November,December'
                }
                else{
                ddd+=','+test1.id;
                mna+=','+test1.label;
                }
                
                if(ddd==",undefined")
                {
                ddd='1,2,3,4,5,6,,7,8,9,10,11,12'
                }
            })
            
            
            this.setState({monthString:ddd})
            this.setState({mnthname:mna})
        }
        else if(state.name=="Year")
        {
            
            this.setState({selyr:state.rvalue})
        }
        else if(state.name=="FSDesignation")
        {
           
            this.setState({selfsd:state.rvalue})
        }
        else if(state.name=="DoctorGrade")
        {
            
            this.setState({seldg:state.rvalue})
        }
        else if(state.name=="DoctorCategory")
        {
            
            this.setState({seldc:state.rvalue})
        }
        else if(state.name=="DoctorName")
        {
            
            this.setState({seldn:state.rvalue})
        }
        else if(state.name=="Type")
        {
            
            this.setState({seltyp:state.rvalue})
        }
        
        
    }

    RegionDropdown(){
        
    }

    componentDidUpdate(){
        
    }
    componentDidMount(){

        let header1 =[]
       
        this.setState({hdrcoldefault : ['Division',   
        'Region',  
        'Area',
        'FS Name' ,
        'Doctor Code', 
        'Doctor Name',
        'Grade',
        'Category',
        'Date Of Activity',
        'Type Of Activity', 
        'Brands',   
        'Visited Dates',
        'LEVEL 1',   
        'LEVEL 2',   
        'LEVEL 3',    
        'LEVEL 4', 
        'LEVEL 5',    
        'LEVEL 6',    
        'LEVEL 7', 
        'ADMIN',   
        'SUPER ADMIN',   
        'Current Business',   
        'Expected Business',    
        'Expense Confirmatory Remarks',
        'Expense Confirmed Date']})


        this.setState({rowsperpage1:10})
        this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]});
        var defre={ "index": "LoginFSDetails",  data:{}  }

        postToServer("PrpDetailsRpt", defre).then((Result) => {
        if (Result.data.Status == 'Success') {   
            Result.data.data.map((item1,index) => {
                this.setState({RegionCode:item1['C_Region_Code']});
               // this.setState({areacode:item1['C_Code']});
               this.setState({DivisionCode:(item1['c_div_code']=="")?"All":item1['c_div_code']});
            })
         }
        
        }).catch(() => {
                    
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })

        this.setState({headder:[
            { prop: 'DIVISION',title:'', filterable: true,sortable:false},    
       
                  
   ]});

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
         
        if(this.state.seltyp=="")
        {
            this.setState({ loader:false })
            alert("Type not Selected ............")
                    return;
        }  
        // this.setState({ loader:true })
       // console.log(this.state.seldate,"selected date for report")
       
       const {monthString}=this.state;
       const {mnthname}=this.state;
       if(monthString=="")
       {
        let date1 = new Date();
        var currmonth1=date1.getMonth();
        currmonth1=currmonth1+1;
        var  currentMonth = date1.getMonth();
        currentMonth=currentMonth+1;
        currentMonth=currentMonth+',';
        this.setState({monthString:currentMonth})
        // monthString=currentMonth
        //alert(currentMonth);
        // return;
       }
       if(mnthname=="")
       {
          var mna1='';
       let date1 = new Date();
      var  currentMonth = date1.getMonth();
     currentMonth=currentMonth+1;
     let stringvalue="";
     let stringlabel="";
    // currentMonth=currentMonth+',';
    if(currentMonth==1)
 {
   
   stringlabel= ", January";
}
else if (currentMonth==2) {


 stringlabel= ", February"
}
else if (currentMonth==3) {


 stringlabel= ", March"
}
else if (currentMonth==4){


 stringlabel= ", April"
}
else if (currentMonth==5){

 
 stringlabel= ", May"
}else if (currentMonth==6){

 
 stringlabel= ", June"
}else if (currentMonth==7){


 stringlabel= ", July"
}else if (currentMonth==8){

 
 stringlabel= ", August"
}else if (currentMonth==9){


 stringlabel= ", September"
}else if (currentMonth==10){


 stringlabel= ", October"
}else if (currentMonth==11){


 stringlabel= ", November"
}else if (currentMonth==12){

 
 stringlabel= ", December"
}
     this.state.mnthname=stringlabel
     
    }
    this.setState({mainHead:"PRP - RPS History Details Report For  "+this.state.fsn +' '+this.state.mnthname+', '+ this.state.selyr} );
        if(this.state.seltyp=="2")
        {
       var    travelModes={ "index": "GetRPSData",  data:{"DivisionCode":(this.state.seldiv=="")?this.state.DivisionCode:this.state.seldiv,"RegionCode":(this.state.selreg=="")?this.state.RegionCode:this.state.selreg,"AreaCode":this.state.selarea,"FsCode":this.state.selbr,"DoctCode":this.state.seldn,"DocGrade":this.state.seldg,"DoctCate":this.state.seldc,"Month":(monthString=="")?currentMonth.toString():monthString,"Year":this.state.selyr}  }
        }
        else{
           var    travelModes={ "index": "GetPRPData",  data:{"DivisionCode":(this.state.seldiv=="")?this.state.DivisionCode:this.state.seldiv,"RegionCode":(this.state.selreg=="")?this.state.RegionCode:this.state.selreg,"AreaCode":this.state.selarea,"FsCode":this.state.selbr,"DoctCode":this.state.seldn,"DocGrade":this.state.seldg,"DoctCate":this.state.seldc,"Month":(monthString=="")?currentMonth.toString():monthString,"Year":this.state.selyr}  }
        //   var    travelModes={ "index": "GetPRPData",  data:{"DivisionCode":"All",  "RegionCode":"All",  "AreaCode":"All",  "FsCode":"LEV665",  "DoctCode":"All",  "DocGrade":"All",  "DoctCate":"All",  "Month":monthString,  "Year":"2020"}  }
        }
        
        let test12=[];
        let test13=[];
        let docname=[];
        console.log(travelModes)
        if(this.state.seltyp=="2")
        {

            
var oo={ "Index": "GetRpsVisitDate",  Data:{"FsCode":this.state.selbr,  "Month":(monthString=="")?currmonth1.toString():"1",  "Year":this.state.selyr}}
// console.log(oo,"travel")
            //var    travelModes={ "index": "GetPRPData",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"AreaCode":this.state.selrps,"FsCode":this.state.selbr,"DoctCode":this.state.seldn,"DocGrade":this.state.seldg,"DoctCate":this.state.seldc,"Month":this.state.seldate,"Year":this.state.selyr}  }
            postToServer("RptRPSDocWiseInvDet", oo).then((Result) => {
                //if (Result.data.Status == 'Success') {   
                    // console.log(Result.data.data[0][1],"inside the data")
                      Result.data.data.map((test,index) => {
                        

                       
                        // if(item1['DOCTOR CODE']==item4['doc'])
                        // {
                        //      console.log("doc match")
                        // }
                    //  console.log(Result.data.data,"small");
                        docname.push({
                            "1":Result.data.data[index][1],
                            "2":Result.data.data[index][2],
                            "3":Result.data.data[index][3],
                            "4":Result.data.data[index][4],
                            "5":Result.data.data[index][5],
                            "6":Result.data.data[index][6],
                            "7":Result.data.data[index][7],
                            "8":Result.data.data[index][8],
                            "9":Result.data.data[index][9],
                            "doc": Result.data.data[index]['doc'],
                            "fs":Result.data.data[index]['fs']
                           
                        })

                     })
                    // console.log(docname,"docname");
                //}
            }).catch(() => {
                this.setState({ loader:false })
                this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
              })


            this.setState({headder:[
                { prop:'Division', title:'Division', filterable: true,sortable:true },    
                { prop: 'Region'  , title:'Region', filterable: true,sortable:true },     
                { prop: 'Area'  , title:   'Area', filterable: true,sortable:true },
                { prop: 'FS Name'  , title:   'FS Name' , filterable: true,sortable:true }, 
                { prop: 'Doctor Code'  , title: 'Doctor Code', filterable: true,sortable:true },  
                { prop: 'Doctor Name' , title: 'Doctor Name' , filterable: true,sortable:true }, 
                { prop: 'Grade'  , title:   'Grade', filterable: true,sortable:true },  
                { prop: 'Category' , title:    'Category' , filterable: true,sortable:true }, 
                { prop: 'Date Of Activity' , title:    'Date Of Activity', filterable: true,sortable:true },  
                { prop: 'Type Of Activity' , title:    'Type Of Activity', filterable: true,sortable:true },  
                { prop: 'RPS NO' , title:    'RPS No', filterable: true,sortable:true },  
                { prop: 'RPS DATE' , title:    'RPS Date', filterable: true,sortable:true },  
                { prop: 'Brands' , title:'Brands' , filterable: true,sortable:true }, 
                { prop: 'BTC EXPENSE' , title:'BTC Expense' , filterable: true,sortable:true }, 
                { prop: 'RPS ESTIMATED AMOUNT', title:'RPS Estimated Amount', filterable: true,sortable:true },  
                { prop: 'ACTUAL EXPENSE', title:'Actual Expense', filterable: true,sortable:true },  
                { prop: 'Visited Dates' , title:'Visited Dates', filterable: true,sortable:true }, 

            { prop: 'LEVEL 1'  , title:   'LEVEL 1', filterable: true,sortable:true },    
            { prop: 'LEVEL 2'  , title:   'LEVEL 2', filterable: true,sortable:true },    
            { prop: 'LEVEL 3'  , title:   'LEVEL 3', filterable: true,sortable:true },    
            { prop: 'LEVEL 4'  , title:   'LEVEL 4', filterable: true,sortable:true },    
            { prop: 'LEVEL 5'  , title:   'LEVEL 5', filterable: true,sortable:true },    
            { prop: 'LEVEL 6'  , title:   'LEVEL 6', filterable: true,sortable:true },    
            { prop: 'LEVEL 7'  , title:   'LEVEL 7', filterable: true,sortable:true },    
            { prop: 'ADMIN'  , title:   'ADMIN', filterable: true,sortable:true },    
            { prop: 'SUPER ADMIN'  , title:   'SUPER ADMIN', filterable: true,sortable:true },    

            { prop: 'Current Business'  , title:   'Current Business', filterable: true,sortable:true },    
            { prop: 'Expected Business'  , title:   'Expected Business', filterable: true,sortable:true },    
            { prop: 'Expense Confirmatory Remarks' , title:    'Expense Confirmatory Remarks' , filterable: true,sortable:true }, 
            { prop: 'Expense Confirmed Date' , title:    'Expense Confirmed Date' , filterable: true,sortable:true }, 
            { prop: 'EXPENSE DESK CONFIRMATORY REMARKS' , title:    'Expense Desk Confirmatory Remarks' , filterable: true,sortable:true }, 
            { prop: 'EXPENSE DESK CONFIRMED DATE', title:     'Expense DESK Confirmed Date', filterable: true,sortable:true },              
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
                displayedColumns :displayedColumns,headder:hdr1
            });
       var amount = 0;
       var currentbusiness = 0;
       var expectedbusiness = 0;
       var Estamt = 0;
       var advancereq = 0;
       var estimatedbtc = 0;
       var totcostprp = 0;
       var totcostbtc = 0;
       var totcostagainstadv = 0;
       var totalcostprp = "0";
       var totalcostbtc = "0";
       var totalcostadvance = "0";
       var btcexpense=0;
       var rpsestimatedamount=0;
       var N_ActualExpenseView=0;
       var n_rpsestimatedview=0;
       var n_btcView=0;
       var ActualExpense=0;

       var l1=''
       var l2=''
       var l3=''
       var l4=''
       var l5=''
       var l6=''
       var l7=''
       var l8=''
       var l9=''
       
        postToServer("RptRPSDocWiseInvDet", travelModes).then((Result) => {
            if (Result.data.Status == 'Success') {  
                Result.data.data.map((item2,index) => {


                     n_btcView = parseFloat(item2['BTC EXPENSE']);
                     n_rpsestimatedview = parseFloat(item2['RPS ESTIMATED AMOUNT']);
                     N_ActualExpenseView = parseFloat(item2['ACTUAL EXPENSE']);
                    if(item2['n_status']!="4"){
                        if (parseFloat(n_btcView) == parseFloat(-99999.00))
                        {
                            n_btcView = "";
                        }

                        if (parseFloat(N_ActualExpenseView) == parseFloat(-99999.00))
                        {
                            N_ActualExpenseView = "";
                        }

                    }
                    var cnt=0;
                    docname.map((test1,index) => {
                        if(item1['DOCTOR CODE']==test1['doc'])
                        {
                           
                            l1=test1['1']
                            l2=test1['2']
                            l3=test1['3']
                            l4=test1['4']
                            l5=test1['5']
                            l6=test1['6']
                            l7=test1['7']
                            l8=test1['8']
                            l9=test1['9']
                            
                        }
                        else if(cnt==0){
                            l1='';
                            l2='';
                            l3='';
                            l4='';
                            l5='';
                            l6='';
                            l7='';
                            l8='';
                            l9='';
                        }

                    })
                    test13.push({
                        "Division" : <div className="textReport">{item2['DIVISION']}</div>, 
                        "Region" : <div className="textReport">{item2['REGION']}</div>,     
                        "Area" : <div className="textReport">{item2['AREA']}</div>,
                        "FS Name" : <div className="textReport">{item2['FSNAME']}</div>,
                        "Doctor Code" : <div className="textReport">{item2['DOCTOR CODE']}</div>,  
                        "Doctor Name": <div className="textReport">{item2['DOCTOR NAME']}</div>,
                        "Grade" : <div className="textReport">{item2['GRADE']}</div>,
                        "Category" : <div className="textReport">{item2['CATEGORY']}</div>,
                        "Date Of Activity": <div className="textReport">{item2['DATE OF ACTIVITY']}</div>,
                        "Type Of Activity" : <div className="textReport">{item2['TYPE OF ACTIVITY']}</div>,
                        "PRP NO" : <div className="textReport">{item2['RPS NO']}</div>,
                        "RPS DATE" : <div className="textReport">{item2['RPS DATE']}</div>,
                        "Brands": <div className="textReport">{item2['BRANDS']}</div>,
                        "BTC EXPENSE": <div className="textReport">{item2['BTC EXPENSE']}</div>,
                        "RPS ESTIMATED AMOUNT": <div className="textReport">{item2['RPS ESTIMATED AMOUNT']}</div>,  
                        "ACTUAL EXPENSE": <div className="textReport">{item2['ACTUAL EXPENSE']}</div>, 
                        "Visited Dates": "", 
                       
                        "LEVEL 1" :<div className="textReport">{l1}</div>,   
                        "LEVEL 2" :<div className="textReport">{l2}</div>, 
                        "LEVEL 3" :<div className="textReport">{l3}</div>,   
                        "LEVEL 4" :<div className="textReport">{l4}</div>,   
                        "LEVEL 5" :<div className="textReport">{l5}</div>,  
                        "LEVEL 6" :<div className="textReport">{l6}</div>,
                        "LEVEL 7" :<div className="textReport">{l7}</div>,  
                        "ADMIN" : <div className="textReport">{l8}</div>, 
                        "SUPER ADMIN" :<div className="textReport">{l9}</div>,
                        "Current Business" : <div className="textReport">{item2['CURRENT BUSINESS']}</div>,
                        "Expected Business" : <div className="textReport">{item2['EXPECTED BUSINESS']}</div>,   
                        "Expense Confirmatory Remarks" : <div className="note-text textReport"> {item2['EXPENSE CONFIRMATORY REMARKS']} </div>, 
                        "'Expense Confirmed Date'" : <div className="textReport">{item2['EXPENSE CONFIRMED DATE']}</div>,
                        "EXPENSE DESK CONFIRMATORY REMARKS" :<div className="note-text textReport"> {item2['EXPENSE DESK CONFIRMATORY REMARKS']} </div> , 
                        "EXPENSE DESK CONFIRMED DATE" : <div className="textReport">{item2['EXPENSE DESK CONFIRMED DATE']}</div>,                   
                    })
                    var exp =0;
                    if(n_btcView!="")
                    {
                        exp=parseFloat(n_btcView);
                    }
                    
                    btcexpense = parseFloat(btcexpense) + parseFloat(exp);
                    var exp2 = "";

                    if(n_rpsestimatedview=="")
                    {
                        exp2=0;
                    }
                    else
                    {
                        exp2=parseFloat(n_rpsestimatedview);
                    }
                    rpsestimatedamount = parseFloat(rpsestimatedamount) + parseFloat(exp2);
                    var exp1 = 0;

                    if(N_ActualExpenseView=="")
                    {
                        exp1=0;
                    }
                    else
                    {
                        exp1=parseFloat(N_ActualExpenseView);
                    }
                    ActualExpense = parseFloat(ActualExpense) + parseFloat(exp1);
                    currentbusiness = parseFloat(currentbusiness) + parseFloat(item2['CURRENT BUSINESS']);
                    expectedbusiness = parseFloat(expectedbusiness) + parseFloat(item2['EXPECTED BUSINESS']);
                       
                })

                if(Result.data.data.length>0)
                    {
                        test13.push({
                            "Division" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Total'}} />,
                            "Region" : "",    
                            "Area" : "",
                            "FS Name" : "",
                            "Doctor Code" : "", 
                            "Doctor Name": "",
                            "Grade" : "",
                            "Category" : "",
                            "Date Of Activity": "",
                            "Type Of Activity" : "",
                            "PRP NO" : "",
                            "RPS DATE" : "",
                            "Brands": "",
                            "BTC EXPENSE": <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: btcexpense}}/>,
                            "RPS ESTIMATED AMOUNT": <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: rpsestimatedamount}}/>, 
                            "ACTUAL EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: ActualExpense}}/>,
                            "Visited Dates": "", 
                            "LEVEL 1" :"",   
                            "LEVEL 2" :"", 
                            "LEVEL 3" :"",   
                            "LEVEL 4" :"",   
                            "LEVEL 5" : "",  
                            "LEVEL 6" :"",
                            "LEVEL 7" : "",  
                            "ADMIN" : "", 
                            "SUPER ADMIN" :"",
                            "Current Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusiness}}/>,
                            "Expected Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusiness}}/>,  
                            "Expense Confirmatory Remarks" : "",
                            "'Expense Confirmed Date'" : "",
                            "EXPENSE DESK CONFIRMATORY REMARKS" : "",
                            "EXPENSE DESK CONFIRMED DATE" : "",             
                        })
                    }
            this.setState({ loader:false })
              this.setState({ Result1: test13 })
              this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
            }
          }).catch(() => {
            this.setState({ loader:false })
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })
        //   test12.push({
        //     "Division" : <h3 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Total'}} />,
        //     "Region" : "",    
        //     "Area" : "",
        //     "FS Name" : "",
        //     "Doctor Code" : "", 
        //     "Doctor Name": "",
        //     "Grade" : "",
        //     "Category" : "",
        //     "Date Of Activity": "",
        //     "Type Of Activity" : "",
        //     "PRP NO" : "",
        //     "RPS DATE" : "",
        //     "Brands": "",
        //     "BTC EXPENSE": "a",
        //     "RPS ESTIMATED AMOUNT": "a", 
        //     "ACTUAL EXPENSE":"a",
        //     "Visited Dates": "a", 
           
        //     "LEVEL 1" :"",   
        //     "LEVEL 2" :"", 
        //     "LEVEL 3" :"",   
        //     "LEVEL 4" :"",   
        //     "LEVEL 5" : "",  
        //     "LEVEL 6" :"",
        //     "LEVEL 7" : "",  
        //     "ADMIN" : "", 
        //     "SUPER ADMIN" :"",
        //     "Current Business" : "a",
        //     "Expected Business" : "a", greetingStyles: {color: 'green'}  ,
        //     "Expense Confirmatory Remarks" : "a",
        //     "'Expense Confirmed Date'" : "a",
        //     "EXPENSE DESK CONFIRMATORY REMARKS" : "a",
        //     "EXPENSE DESK CONFIRMED DATE" : "a",             
        // })
        // this.setState({ Result1: test13 })
        }else
        {
            let date2 = new Date();
            var  currentMonth2 = date2.getMonth();
           currentMonth2=currentMonth2+1;
            var oo={ "Index": "GetRpsVisitDate",  Data:{"FsCode":this.state.selbr,  "Month":(monthString=="")?currentMonth2.toString():"1",  "Year":this.state.selyr}}
           // alert(oo);(monthString=="")?currentMonth2.toString():1
                        //var    travelModes={ "index": "GetPRPData",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"AreaCode":this.state.selrps,"FsCode":this.state.selbr,"DoctCode":this.state.seldn,"DocGrade":this.state.seldg,"DoctCate":this.state.seldc,"Month":this.state.seldate,"Year":this.state.selyr}  }
                        postToServer("RptRPSDocWiseInvDet", oo).then((Result) => {
                            //if (Result.data.Status == 'Success') {   
                                //  console.log(Result.data.data[0][1],"inside the data")
                                  Result.data.data.map((test,index) => {
                                    

                                   
                                    // if(item1['DOCTOR CODE']==item4['doc'])
                                    // {
                                    //      console.log("doc match")
                                    // }
                                    // console.log(test,"small");
                                    docname.push({
                                        "1":Result.data.data[index][1],
                                        "2":Result.data.data[index][2],
                                        "3":Result.data.data[index][3],
                                        "4":Result.data.data[index][4],
                                        "5":Result.data.data[index][5],
                                        "6":Result.data.data[index][6],
                                        "7":Result.data.data[index][7],
                                        "8":Result.data.data[index][8],
                                        "9":Result.data.data[index][9],
                                        "doc": Result.data.data[index]['doc'],
                                        "fs":Result.data.data[index]['fs']
                                       
                                    })

                                 })
                            //}
                        }).catch(() => {
                            this.setState({ loader:false })
                            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
                          })
                          
             //prp headding
             this.setState({headder:[
                { prop:'Division', title:'Division', filterable: true,sortable:true },    
                { prop: 'Region'  , title:   'Region', filterable: true,sortable:true },     
                { prop: 'Area'  , title:   'Area', filterable: true,sortable:true },
                { prop: 'FS Name'  , title:   'FS Name' , filterable: true,sortable:true }, 
                { prop: 'Doctor Code'  , title: 'Doctor Code', filterable: true,sortable:true },  
                { prop: 'Doctor Name' , title: 'Doctor Name' , filterable: true,sortable:true }, 
                { prop: 'Grade'  , title:   'Grade', filterable: true,sortable:true },  
                { prop: 'Category' , title:    'Category' , filterable: true,sortable:true }, 
                { prop: 'Date Of Activity' , title:    'Date Of Activity', filterable: true,sortable:true },  
                { prop: 'Type Of Activity' , title:    'Type Of Activity', filterable: true,sortable:true },  
                { prop: 'PRP NO' , title:    'PRP No', filterable: true,sortable:true },  
                { prop: 'TOTAL NO OF DOCTORS ATTENDED' , title:    'Total Number of Doctors attended.' , filterable: true,sortable:true }, 
                { prop: 'Brands' , title:    'Brands' , filterable: true,sortable:true }, 
                { prop: 'ESTIMATED PRP' , title:    'Estimated PRP' , filterable: true,sortable:true }, 
                { prop: 'ESTIMATED ADVANCE', title:     'Estimated Advance', filterable: true,sortable:true },  
                { prop: 'ESTIMATED BTC', title:     'Estimated BTC', filterable: true,sortable:true },  
                { prop: 'Visited Dates' , title:    'Visited Dates', filterable: true,sortable:true }, 

            { prop: 'LEVEL 1'  , title:   'LEVEL 1', filterable: true,sortable:true },    
            { prop: 'LEVEL 2'  , title:   'LEVEL 2', filterable: true,sortable:true },    
            { prop: 'LEVEL 3'  , title:   'LEVEL 3', filterable: true,sortable:true },    
            { prop: 'LEVEL 4'  , title:   'LEVEL 4', filterable: true,sortable:true },    
            { prop: 'LEVEL 5'  , title:   'LEVEL 5', filterable: true,sortable:true },    
            { prop: 'LEVEL 6'  , title:   'LEVEL 6', filterable: true,sortable:true },    
            { prop: 'LEVEL 7'  , title:   'LEVEL 7', filterable: true,sortable:true },    
            { prop: 'ADMIN'  , title:   'ADMIN', filterable: true,sortable:true },    
            { prop: 'SUPER ADMIN'  , title:   'SUPER ADMIN', filterable: true,sortable:true },    




            { prop: 'Current Business'  , title:   'Current Business', filterable: true,sortable:true },    
            { prop: 'Expected Business'  , title:   'Expected Business', filterable: true,sortable:true },    
            { prop: 'TOTAL COST FOR PRP' , title:    'Total Cost For PRP' , filterable: true,sortable:true }, 
            { prop: 'TOTAL COST FOR BTC EXPENSE' , title:    'Total Cost For BTC Expense' , filterable: true,sortable:true }, 
            { prop: 'EXPENSE AGAINST ADVANCE' , title:    'Expense Against Advance' , filterable: true,sortable:true }, 
            { prop: 'Expense Confirmatory Remarks', title:     'Expense Confirmatory Remarks', filterable: true,sortable:true },  
            { prop: 'Expense Confirmed Date', title:     'Expense Confirmed Date', filterable: true,sortable:true }, 

                      
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
                displayedColumns :displayedColumns,headder:hdr1
            });

            
       var amount = 0;
       var currentbusiness = 0;
       var expectedbusiness = 0;
       var Estamt = 0;
       var advancereq = 0;
       var estimatedbtc = 0;
       var totcostprp = 0;
       var totcostbtc = 0;
       var totcostagainstadv = 0;
       var totalcostprp = "0";
       var totalcostbtc = "0";
       var totalcostadvance = "0";
       var a=''
       var b=''
       var c=''
       var d=''
       var e=''
       var l1=''
       var l2=''
       var l3=''
       var l4=''
       var l5=''
       var l6=''
       var l7=''
       var l8=''
       var l9=''

          var dv=[];
            postToServer("RptRPSDocWiseInvDet", travelModes).then((Result) => {
                if (Result.data.Status == 'Success') {   
                    Result.data.data.map((item1,index) => {
                        var advamt = "";
                        var adamt = 0;
                        if (item1['ESTIMATED ADVANCE'] == "0.00")
                        {
                            advamt = "NIL";
                            adamt = 0;
                        }
                        else
                        {
                            advamt =  parseFloat(item1['ESTIMATED ADVANCE']);
                            adamt =  parseFloat(item1['ESTIMATED ADVANCE']);

                        }
                        //DataView dv = new DataView(dt2);
                        var totBtcisvalue = "";
                        var advanceamnt = "";
                        advanceamnt =  parseFloat(item1['EXPENSE AGAINST ADVANCE']);
                        if (item1['STATUS'] == "3")
                        {
                            totBtcisvalue =  parseFloat(item1['TOTAL COST FOR BTC EXPENSE']);
                        }


                        if (item1['EXPENSE AGAINST ADVANCE'] == "-1.00")
                        {
                            //strb.Append("<td class='right_heading'>NA</td>");
                            a="NA";
                        }
                        else
                        {
                            //strb.Append("<td  class='right_heading'>" + dt.Rows[i]["costerp"].ToString() + " </td>");
                            a=item1['TOTAL COST FOR PRP'];
                            if(item1['TOTAL COST FOR PRP']=="")
                            {
                                totalcostprp=0;
                            }
                            else{
                                totalcostprp= parseFloat(item1['TOTAL COST FOR PRP']);
                            }
                            //  totalcostprp = dt.Rows[i]["costerp"].ToString() == "" ? "0" : dt.Rows[i]["costerp"].ToString();
                        }
                        if (item1['EXPENSE AGAINST ADVANCE'] == "-1.00")
                        {
                            b="NA";
                        }
                        else
                        {
                            b=totBtcisvalue;
                            // strb.Append("<td  class='right_heading'>" + totBtcisvalue + " </td>");
                            if(totBtcisvalue=="")
                            {
                                totalcostbtc=0;
                            }
                            else
                            {
                                totalcostbtc= parseFloat(totBtcisvalue);
                            }
                            //  totalcostbtc = totBtcisvalue == "" ? "0" : totBtcisvalue;
                        }
                        if (advanceamnt == "-1.00")
                        {
                            // strb.Append("<td class='right_heading'>NA</td>");
                            c="NA";
                        }
                        else
                        {
                            if(advanceamnt=="")
                            {
                                totalcostadvance=0;
                            }
                            else
                            {
                                totalcostadvance= parseFloat(advanceamnt);
                            }
                            // strb.Append("<td  class='right_heading'>" + advanceamnt + "</td>");
                            //  totalcostadvance = advanceamnt == "" ? "0" : advanceamnt;
                        }
                        d=item1['EXPENSE CONFIRMATORY REMARKS'];
                        e=item1['EXPENSE CONFIRMED DATE'];

                        // strb.Append("<td class='left_heading'>" + dt.Rows[i]["ExpenseConfRemarks"] + "</td>");
                        // strb.Append("<td class='right_heading'>" + dt.Rows[i]["expenseconfirmeddate"] + "</td>");

                        
                        currentbusiness = parseFloat(currentbusiness) + parseFloat(item1['CURRENT BUSINESS']);
                        expectedbusiness = parseFloat(expectedbusiness) + parseFloat(item1['EXPECTED BUSINESS']);
                        // var exp = dt.Rows[i]["Estamt"].ToString() == ""?"0":dt.Rows[i]["Estamt"].ToString();
                        var exp =0
                        if(item1['ESTIMATED PRP']=="")
                        {
                            exp=0;
                        }
                        else
                        {
                            exp=item1['ESTIMATED PRP'];
                        }
                        Estamt = parseFloat(Estamt) + parseFloat(exp);
                        advancereq =  parseFloat(advancereq) +  parseFloat(adamt);
                        var estbtc = 0;
                        // dt.Rows[i]["EstimatedBTC"].ToString() == "" ? "0" : dt.Rows[i]["EstimatedBTC"].ToString();
                        if(item1['ESTIMATED PRP']=="")
                        {
                            estbtc=0;
                        }
                        else
                        {
                            estbtc=item1['ESTIMATED PRP'];
                        }
                        // estimatedbtc =  parseFloat(estimatedbtc) +  parseFloat(estbtc);                      
                        estimatedbtc =  parseFloat(estimatedbtc) +  parseFloat(item1['ESTIMATED BTC']);                      
                        totcostprp =  parseFloat(totcostprp) +  parseFloat(totalcostprp);
                      
                        totcostbtc =  parseFloat(totcostbtc) +  parseFloat(totalcostbtc);
                       
                        totcostagainstadv =  parseFloat(totcostagainstadv) +  parseFloat(totalcostadvance);

                        // var oo={ "index": "GetRpsVisitDate",   data:{"FsCode":this.state.selbr,"Month":this.state.seldate,"Year":this.state.selyr}  }

                        var cnt=0;
                        docname.map((test1,index) => {
                            if(item1['DOCTOR CODE']==test1['doc'])
                            {
                                cnt=1;
                                l1=test1['1']
                                l2=test1['2']
                                l3=test1['3']
                                l4=test1['4']
                                l5=test1['5']
                                l6=test1['6']
                                l7=test1['7']
                                l8=test1['8']
                                l9=test1['9']
                                
                            }
                            else if(cnt==0){
                                l1='';
                                l2='';
                                l3='';
                                l4='';
                                l5='';
                                l6='';
                                l7='';
                                l8='';
                                l9='';
                            }

                        })
                        

                        test12.push({
                            "Division" : <div className="textReport">{item1['DIVISION']}</div>, 
                            "Region" : <div className="textReport">{item1['REGION']}</div>,     
                            "Area" : <div className="textReport">{item1['AREA']}</div>,
                            "FS Name" : <div className="textReport">{item1['FSNAME']}</div>,
                            "Doctor Code" : <div className="textReport">{item1['DOCTOR CODE']}</div>,  
                            "Doctor Name": <div className="textReport">{item1['DOCTOR NAME']}</div>,
                            "Grade" : <div className="textReport">{item1['GRADE']}</div>,
                            "Category" : <div className="textReport">{item1['CATEGORY']}</div>,
                            "Date Of Activity": <div className="textReport">{item1['DATE OF ACTIVITY']}</div>,
                            "Type Of Activity" : <div className="textReport">{item1['TYPE OF ACTIVITY']}</div>,
                            "PRP NO" : <div className="textReport">{item1['PRP NO']}</div>,
                            "TOTAL NO OF DOCTORS ATTENDED" : <div className="textReport">{item1['TOTAL NO OF DOCTORS ATTENDED']}</div>,
                            "Brands": <div className="textReport">{item1['BRANDS']}</div>,
                            "ESTIMATED PRP": <div className="textReport">{item1['ESTIMATED PRP']}</div>,
                            "ESTIMATED ADVANCE": <div className="textReport">{item1['ESTIMATED ADVANCE']}</div>,  
                            "ESTIMATED BTC": <div className="textReport">{item1['ESTIMATED BTC']}</div>, 
                            "Visited Dates": <div className="textReport">{item1['Visited Dates']}</div>, 
                           
                            "LEVEL 1" :<div className="textReport">{l1}</div>,   
                            "LEVEL 2" :<div className="textReport">{l2}</div>, 
                            "LEVEL 3" :<div className="textReport">{l3}</div>,   
                            "LEVEL 4" :<div className="textReport">{l4}</div>,   
                            "LEVEL 5" : <div className="textReport">{l5}</div>,  
                            "LEVEL 6" :<div className="textReport">{l6}</div>,
                            "LEVEL 7" : <div className="textReport">{l7}</div>,  
                            "ADMIN" : <div className="textReport">{l8}</div>, 
                            "SUPER ADMIN" :<div className="textReport">{l9}</div>,
                            "Current Business" : <div className="textReport">{item1['CURRENT BUSINESS']}</div>,
                            "Expected Business" : <div className="textReport">{item1['EXPECTED BUSINESS']}</div>,   
                            "TOTAL COST FOR PRP" : <div className="textReport">{a}</div>, 
                            "TOTAL COST FOR BTC EXPENSE" : <div className="textReport">{b}</div>,
                            "EXPENSE AGAINST ADVANCE" : <div className="textReport">{c}</div>, 
                            "Expense Confirmatory Remarks" :<div className="note-text textReport"> {d} </div> , 
                            "'Expense Confirmed Date'" : <div className="textReport">{e}</div>,                         
                        })

                    // test12.push({
                    //     "Division" : item1['DIVISION'], 
                    //     "Region" : item1['REGION'],     
                    //     "Area" : item1['AREA'],
                    //     "FS Name" : item1['FSNAME'],
                    //     "Doctor Code" : item1['DOCTOR CODE'],  
                    //     "Doctor Name": item1['DOCTOR NAME'],
                    //     "Grade" : item1['GRADE'],
                    //     "Category" : item1['CATEGORY'],
                    //     "Date Of Activity": item1['DATE OF ACTIVITY'],
                    //     "Type Of Activity" : item1['TYPE OF ACTIVITY'],
                    //     "PRP NO" : item1['PRP NO'],
                    //     "TOTAL NO OF DOCTORS ATTENDED" : item1['TOTAL NO OF DOCTORS ATTENDED'],
                    //     "Brands": item1['BRANDS'],
                    //     "ESTIMATED PRP": item1['ESTIMATED PRP'],
                    //     "ESTIMATED ADVANCE": item1['ESTIMATED ADVANCE'],  
                    //     "ESTIMATED BTC": item1['ESTIMATED BTC'], 
                    //     "Visited Dates": item1['Visited Dates'], 
                       
                    //     "LEVEL 1" :"",   
                    //     "LEVEL 2" :"", 
                    //     "LEVEL 3" :"",   
                    //     "LEVEL 4" :"",   
                    //     "LEVEL 5" : "",  
                    //     "LEVEL 6" :"",
                    //     "LEVEL 7" : "",  
                    //     "ADMIN" : "", 
                    //     "SUPER ADMIN" :"",
                    //     "Current Business" : item1['CURRENT BUSINESS'],
                    //     "Expected Business" : item1['EXPECTED BUSINESS'],   
                    //     "TOTAL COST FOR PRP" : item1['TOTAL COST FOR PRP'], 
                    //     "TOTAL COST FOR BTC EXPENSE" : item1['TOTAL COST FOR BTC EXPENSE'],
                    //     "EXPENSE AGAINST ADVANCE" : item1['EXPENSE AGAINST ADVANCE'], 
                    //     "Expense Confirmatory Remarks" : item1['EXPENSE CONFIRMATORY REMARKS'], 
                    //     "'Expense Confirmed Date'" : item1['EXPENSE CONFIRMED DATE'],                         
                    // })



                })
//console.log(advancereq)
                var adv = "";
                    if (advancereq == "0")
                    {
                        adv = "NIL";
                    }
                    else
                    {
                        adv = advancereq;
                    }

                    var g="";
                    var h="";
                    if(totcostbtc=="")
                    {
                        g="0"
                    }
                    else
                    {
                        g=totcostbtc;
                    }
                    if(totcostagainstadv=="")
                    {
                        h="0";
                    }
                    else
                    {
                        h=totcostagainstadv;
                    }
                    if(Result.data.data.length>0)
                    {
                    test12.push({
                        "Division" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Total'}} />,
                        "Region" : "",     
                        "Area" : "",
                        "FS Name" : "",
                        "Doctor Code" : "",  
                        "Doctor Name": "",
                        "Grade" : "",
                        "Category" : "",
                        "Date Of Activity": "",
                        "Type Of Activity" : "",
                        "PRP NO" : "",
                        "TOTAL NO OF DOCTORS ATTENDED" : "",
                        "Brands": "",
                        "ESTIMATED PRP": <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: Estamt}} />,
                        "ESTIMATED ADVANCE": <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: adv}} />,  
                        "ESTIMATED BTC": <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: estimatedbtc}} />, 
                        "Visited Dates": "", 
                       
                        "LEVEL 1" :"",   
                        "LEVEL 2" :"", 
                        "LEVEL 3" :"",   
                        "LEVEL 4" :"",   
                        "LEVEL 5" : "",  
                        "LEVEL 6" :"",
                        "LEVEL 7" : "",  
                        "ADMIN" : "", 
                        "SUPER ADMIN" :"",
                        "Current Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: currentbusiness}} />,
                        "Expected Business" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: expectedbusiness}} />,   
                        "TOTAL COST FOR PRP" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: totcostprp}} />, 
                        "TOTAL COST FOR BTC EXPENSE" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: g}} />,
                        "EXPENSE AGAINST ADVANCE" : <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: h}} />, 
                        "Expense Confirmatory Remarks" : "", 
                        "'Expense Confirmed Date'" : "",                         
                    })
                }

                    this.setState({ Result1: test12 })
                    this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
                    this.setState({ loader:false })
                }
                }).catch(() => {
                    this.setState({ loader:false })
                    this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
                  })
                        
        }

    }






    render(){
       
        let {Result1,headder,entriescount,rowsperpage1}=this.state
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
                headder.push(headerList);
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
                 <ReportTableRPSDocWiseInvDet
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
                    expdata={Result1}
                    getUnselectedColumns={this.getUnselectedColumns}
                />
            </div>
        )
    }
}

export default ReportListRPSDocWiseInvDet