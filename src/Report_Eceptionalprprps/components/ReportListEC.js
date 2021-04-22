import React,{Component} from 'react'
import ReportTableEC from './ReportTableEC'
import {postToServer} from '../../lib/comm-utils'
import "../../../public/assets/css/campaignRequest.css";
import Loder from  '../../lib/Loader'
import Iframe from 'react-iframe'
//import { Left } from 'react-bootstrap/lib/media'

class ReportListEC extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'',
            selreg:'',
            seldes:'',
            selbr:'',
            seldate:'',
            selyr:'',
            mnthname:'',
            fsn:'All',
            selactivity:'',
            seltype:'',
            selRange:'',
            seldrname:'',
            selfsname:'',
            Result1:[],
            header:[],
            loader:false,
            monthString:'',
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
       
        // console.log(state.name, "don")
       // console.log(state.name, "nameeeeeee")
        if(state.name=="Division")
        {
            
            this.setState({seldiv:state.rvalue})
            
        }
        else if(state.name=="Region")
        {
            
            this.setState({selreg:state.rvalue})
        }
        else if(state.name=="Designation")
        {
            
            this.setState({seldes:state.rvalue})
        }
       
        else if(state.name=="Month")
        {
            //  debugger;
            // console.log(state.rvalue,"don reach")
            let ddd='';
            let dd='';
            let mna='';
            state.rvalue.map((test1,index) => {
                // console.log(test1.label,"d")
                // debugger;
                //  dd=test1.id
            //    if(test1.id=="undefined")
            //    {
            //        console.log(test1.id,"und");
            //    }
            // if(test1.label=="All")
            // {
            //     mna='All'
            // }
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
                ddd='1,2,3,4,5,6,7,8,9,10,11,12'
                //mna+='All'
                }
            })
            
            //ddd=ddd.Rtrim(',')
            this.setState({monthString:ddd})
            this.setState({mnthname:mna})
            
         //console.log(ddd,"trimmed values");
        }
        else if(state.name=="Year")
        {
            
            this.setState({selyr:state.rvalue})
        }
        else if(state.name=="Activity")
        {
            
            this.setState({selactivity:state.rvalue})
        }
        else if(state.name=="Type")
        {
            
            this.setState({seltype:state.rvalue})
        }
        else if(state.name=="DrName")
        {
            
            this.setState({seldrname:state.rvalue})
        }
        else if(state.name=="Range")
        {
            
            this.setState({selRange:state.rvalue})
        }
        else if(state.name=="FS Name")
        {
            
            this.setState({selfsname:state.rvalue})
            this.setState({fsn:state.textval})
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
        console.log(this.state.displayedColumns,'disp')

  //       let headerColums = [];
  //       let displayedColumns = [];
  //       let hdr1=[]
  
  // let  headerList = []
  //       headerColums = Object.values(this.state.displayedColumns).map(v => v);
  //           if (this.state.unslectedColumns.length == 0) {
  //               displayedColumns = this.state.displayedColumns;
  //           } else {
  //               // debugger
  //               displayedColumns = headerColums;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  //               this.state.unslectedColumns.map(unslectedColumn => {                                                   
  //                   displayedColumns = displayedColumns.filter(columnName => {
  //                       // console.log(columnName,'lll')
  //                       // console.log(unslectedColumn,'2222')
  //                       return columnName != unslectedColumn;
  //                   });
  //               });
  //           }
  //           // console.log(displayedColumns,'ddd')
  //           displayedColumns.map(item => {
  //               // console.log(item,'mmmmm')
  //                headerList = {
  //                   title: item,
  //                   prop: item,
  //                   sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  //                   filterable: true
  //               };
  //               //  this.setState({ headder:headerList});
  //               // console.log(headerList,'hdrlist')
  //               hdr1.push(headerList)
  //           });
  //             console.log(hdr1,'tttt')
  //           this.setState({
  //               displayedColumns :displayedColumns,header:hdr1
  //           });
  // this.setState({
  //   unslectedColumns
  // });



      
       if(this.state.seldiv=="")
        {
            alert("Division not Selected ............")
                  return;
       } 
         if(this.state.selreg=="")
         {
            this.state.selreg="All"
        //  alert("Region not Selected ............")
             //  return;
        } 
        if(this.state.seldes=="")
        {
          alert("Designation not Selected ............")
               return;
         } 
       if(this.state.selfsname=="")
        {
            this.state.selfsname="All"
       } 
        if(this.state.seldrname=="")
        {
            this.state.seldrname="All"
         } 
        
    //    if(monthString=="")
    //      {
             
    //         alert("Month not Selected ............")
    //                  return;
    //      } 
         if(this.state.selyr=="")
        {
            alert("Year not Selected ............")
                 return;
       }  
       if(this.state.seltype=="")
       {
        this.state.seltype="1"
        }  
        if(this.state.selactivity=="")
       {
        this.state.selactivity="All"
       }  
       if(this.state.selRange=="")
         {
            this.state.selRange="99"
        }  

        //this.setState({ loader:true })
        const {monthString}=this.state;
        const {mnthname}=this.state;
       if(monthString=="")
       {
        let date1 = new Date();
        var  currentMonth = date1.getMonth();
        currentMonth=currentMonth+1;
        currentMonth=currentMonth+',';
        this.setState({monthString:currentMonth})
        // monthString=currentMonth
       // alert(currentMonth);
        // return;
       }
       if(mnthname=="")
          {
             // console.log(mna,"mnt")
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
        //console.log(this.state.mnthname,"mn3")
        //if(mna1=="")
        // monthString=currentMonth
       // alert(currentMonth);
        // return;
       }
       if(this.state.fsn=="- All -")
       {
        this.state.fsn="All"
       }
       this.setState({ loader:true })
       this.setState({mainHead:"Exceptional RPS/PRP Report For  "+this.state.fsn +' '+this.state.mnthname+', '+ this.state.selyr} );
    //    (this.state.selreg=="")?this.state.RegionCode:this.state.selreg
     //  var travelModes={ "index": "BtnView",  data:{"DivisionCode":"DI0002","RegionCode":"All","DesignationCode":"1","FsCode":"All","DoctorCode":"All","Month":"1,2,3,4,5,6,7,8,9,10,11,12","Year":"2020","Type":"1","Activity":"All","Range":"99"}  }
     //  var travelModes={ "index": "BtnView",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"RpsName":this.state.selrps,"Month":this.state.seldate,"Year":this.state.selyr}  }
      var travelModes={ "index": "BtnView",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"DesignationCode":this.state.seldes,"FsCode":this.state.selfsname,"DoctorCode":this.state.seldrname,"Month":(monthString=="")?currentMonth.toString():monthString,"Year":this.state.selyr,"Type":this.state.seltype,"Activity":this.state.selactivity,"Range":this.state.selRange}  }
       
console.log(travelModes,"all data")
        
        //let type=1;
         //debugger;
         let test12=[];
         let test13=[];
        let roundOff = (num, places) => {
            const x = Math.pow(10,places);
            return Math.round(num * x) / x;
          }
    //   console.log(travelModes)
       
             if (this.state.seltype== "1")
             {
                this.setState({header:[
                    { prop: 'DIVISION', title: 'DIVISION', filterable: true,sortable:true },
                    { prop: 'REGION', title: 'REGION', filterable: true,sortable:true },
                    { prop: 'AREA', title: 'AREA', filterable: true,sortable:true },
                    { prop: 'FS NAME', title: 'FS NAME', filterable: true,sortable:true },
                    { prop: 'DR CODE', title: 'DR CODE', filterable: true,sortable:true },
                    { prop: 'DR NAME', title: 'DR NAME', filterable: true,sortable:true },
                    { prop: 'DR CATEGORY', title: 'DR CATEGORY', filterable: true,sortable:true },
                    { prop: 'DR GRADE', title: 'DR GRADE', filterable: true,sortable:true },
                    { prop: 'PRP NUMBER', title: 'PRP NUMBER', filterable: true,sortable:true },
                    { prop: 'PRP ACTIVITY', title: 'PRP ACTIVITY', filterable: true,sortable:true },
                    { prop: 'PRP DATE', title: 'PRP DATE', filterable: true,sortable:true },
                    { prop: 'CONFIRMATION REMARKS', title: 'CONFIRMATION REMARKS', filterable: true,sortable:true },
                    { prop: 'ESTIMATED PRP', title: 'ESTIMATED PRP', filterable: true,sortable:true },
                    { prop: 'EXPENSE AGAINST ADVANCE', title: 'EXPENSE AGAINST ADVANCE', filterable: true,sortable:true },
                    { prop: 'EXCEPTIONAL AMOUNT (ESTIMATED- ACTUAL)', title: 'EXCEPTONAL AMOUNT (ESTIMATED- ACTUAL)', filterable: true,sortable:true },
                    { prop: 'BTC EXPENSE', title: 'BTC EXPENSE', filterable: true,sortable:true },
                    { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'EXPENSE CONFIRMATORY REMARKS', filterable: true,sortable:true },
                    { prop: 'EXPENSE CONFIRMED DATE', title: 'EXPENSE CONFIRMED DATE', filterable: true,sortable:true },
                   { prop: 'EXPENSE DESK CONFIRMATORY REMARKS', title: 'EXPENSE DESK CONFIRMATORY REMARKS', filterable: true,sortable:true },
                    { prop: 'EXPENSE DESK CONFIRMED DATE', title: 'EXPENSE DESK CONFIRMED DATE', filterable: true,sortable:true },
                   //  { prop: 'TOTAL EXPENSE AMOUNT', title: 'TOTAL EXPENSE AMOUNT', filterable: true,sortable:true },
                   
                              
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
  // this.setState({
  //   unslectedColumns
  // });

                postToServer("RptEceptionalrpsprp", travelModes).then((Result) => {
                    //console.log(Result.status,"fulldata")
                    if (Result.status == '200') {   
                       // console.log(Result,"full View")
                        //alert(1)
                    // console.log(Result.data.data,"me123") 
                   let prpno1="";
                     Result.data.data.map((item1,index) => {
                        // console.log(type,"test")
              
               // let test12=[];
               let Division = item1['division'];
               let region = item1['region'];
               let area = item1['area'];
               let fsname = item1['fsname'];
               let drcode = item1['drcode'];
               let drname = item1['drname'];
               let drcategory = item1['drcategory'];
               let drgrade = item1['drgrade'];
               let prpno = item1['prpno'];
               let prpname = item1['prpname'];
               let prpdate = item1['prpdate'];
               let confirmnote = item1['confirmnote'];
               let EstimatedAmount =item1['EstimatedAmount'];
               let actualamt = item1['actualamt'];
               let exceptionamt = item1['exceptionamt'];
               let BTC = item1['btc'];
               let expenseconfimatoryremarks =item1['expenseapprovconfremarks'];
               let expenseconfirmeddate = item1['expenseapprconfirmeddate'];
               let expensedeskconformatoryremarks = item1['ExpenseConfRemarks'];
               let expensedeskconfirmeddate = item1['expenseconfirmeddate'];
              // expenseapprconfirmeddate
                if (prpno1 == prpno)
                {
                    Division = "";
                    region = "";
                    area = "";
                    fsname = "";
                    prpno = "";
                    prpname = "";
                    prpdate = "";
                    confirmnote = "";
                    EstimatedAmount = "";
                    actualamt = "";
                    exceptionamt = "";
                    BTC = "";
                    expenseconfimatoryremarks = "";
                    expenseconfirmeddate = "";
                    expensedeskconformatoryremarks = "";
                    expensedeskconfirmeddate = "";
                }
                test12.push({
                    "DIVISION":<div className="textReport">{Division}</div>,
                    "REGION":<div className="textReport">{region}</div>,
                    "AREA":<div className="textReport">{area}</div>,
                    "FS NAME":<div className="textReport">{fsname}</div>,
                    "DR CODE":<div className="textReport">{drcode}</div>,
                    "DR NAME":<div className="textReport">{drname}</div>,
                    "DR CATEGORY":<div className="textReport">{drcategory}</div>,
                    "DR GRADE":<div className="textReport">{drgrade}</div>,
                    "PRP NUMBER":<div className="textReport">{prpno}</div>,
                    "PRP ACTIVITY":<div className="textReport">{prpname}</div>,
                    "PRP DATE":<div className="textReport">{prpdate}</div>,
                    "CONFIRMATION REMARKS":<div className="textReport">{confirmnote}</div>,
                    "ESTIMATED PRP":<div className="textReport">{EstimatedAmount}</div> ,
                    "EXPENSE AGAINST ADVANCE":<div className="textReport">{actualamt}</div>,
                    "EXCEPTIONAL AMOUNT (ESTIMATED- ACTUAL)":<div className="textReport">{exceptionamt}</div>,
                    "BTC EXPENSE":<div className="textReport">{BTC}</div>,
                    "EXPENSE CONFIRMATORY REMARKS":<div className="note-text textReport"> {expenseconfimatoryremarks} </div>,
                    "EXPENSE CONFIRMED DATE":<div className="textReport">{expenseconfirmeddate}</div>,
                    "EXPENSE DESK CONFIRMATORY REMARKS":<div className="note-text textReport"> {expensedeskconformatoryremarks} </div>,
                    "EXPENSE DESK CONFIRMED DATE":<div className="textReport">{expensedeskconfirmeddate}</div>,
                  
                     
                
                    
                })
                prpno1=item1['prpno'];

             
             
                  }

                )

               
              
                  
                  
            this.setState({ loader:false })
            //console.log(test12,"jjj")
              this.setState({ Result1: test12 })
              this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
            }
            //console.log(this.state.Result1,"result ok")
          }).catch(() => {
            
            this.setState({ Error: true, Errormsg: "Error in App At  APIiii " })
          })
        }
//rps details



if(this.state.seltype=="2")
{

    this.setState({header:[
        { prop: 'DIVISION', title: 'DIVISION', filterable: true,sortable:true },
        { prop: 'REGION', title: 'REGION', filterable: true,sortable:true },
        { prop: 'AREA', title: 'AREA', filterable: true,sortable:true },
        { prop: 'FS NAME', title: 'FS NAME', filterable: true,sortable:true },
        { prop: 'DR CODE', title: 'DR CODE', filterable: true,sortable:true },
        { prop: 'DR NAME', title: 'DR NAME', filterable: true,sortable:true },
        { prop: 'DR CATEGORY', title: 'DR CATEGORY', filterable: true,sortable:true },
        { prop: 'DR GRADE', title: 'DR GRADE', filterable: true,sortable:true },
        { prop: 'RPS NUMBER', title: 'RPS NUMBER', filterable: true,sortable:true },
        { prop: 'RPS ACTIVITY', title: 'RPS ACTIVITY', filterable: true,sortable:true },
        { prop: 'RPS DATE', title: 'RPS DATE', filterable: true,sortable:true },
        { prop: 'CONFIRMATION REMARKS', title: 'CONFIRMATION REMARKS', filterable: true,sortable:true },
        { prop: 'ESTIMATED RPS AMOUNT', title: 'ESTIMATED RPS AMOUNT', filterable: true,sortable:true },
        { prop: 'TOTAL RPS ACTUAL EXPENSE', title: 'TOTAL RPS ACTUAL EXPENSE', filterable: true,sortable:true },
        { prop: 'EXCEPTIONAL AMOUNT (ESTIMATED- ACTUAL)', title: 'EXCEPTONAL AMOUNT (ESTIMATED- ACTUAL)', filterable: true,sortable:true },
        { prop: 'BTC EXPENSE', title: 'BTC EXPENSE', filterable: true,sortable:true },
        { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'EXPENSE CONFIRMATORY REMARKS', filterable: true,sortable:true },
        { prop: 'EXPENSE CONFIRMED DATE', title: 'EXPENSE CONFIRMED DATE', filterable: true,sortable:true },
       { prop: 'EXPENSE DESK CONFIRMATORY  REMARKS', title: 'EXPENSE DESK CONFIRATORY REMARKS', filterable: true,sortable:true },
        { prop: 'EXPENSE DESK CONFIRMED DATE', title: 'EXPENSE DESK CONFIRMED DATE', filterable: true,sortable:true },
       //  { prop: 'TOTAL EXPENSE AMOUNT', title: 'TOTAL EXPENSE AMOUNT', filterable: true,sortable:true },
       
                  
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


postToServer("RptEceptionalrpsprp", travelModes).then((Result) => {
   // console.log(Result.status,"fulldata")
    if (Result.status == '200') {   
      //  console.log(Result,"full View")
        //alert(1)
    // console.log(Result.data.data,"me123") 


    let rpsno1="";
     Result.data.data.map((item1,index) => {
       //  console.log(type,"test")
     
     

       // console.log(type,"typerps")

       // let test13=[];
        let rpsno = item1['rpsno'];
        let Division = item1['Division'];
        let region = item1["region"];
        let area = item1['area'];
        let fsname = item1['fsname'];
        let drcode = item1['drcode'];
        let drname = item1['drname'];
        let drcategory = item1['drcategory'];
        let drgrade = item1['drgrade'];
        let rpsname = item1['rpsname'];
        let rpsdate = item1['rpsdate'];
        let confnote = item1['confnote'];
        let esimatedamt = item1['esimatedamt'];
        let n_actualexpense = item1['n_actualexpense'];
        let exceptionalamt = item1['exceptionalamt'];
        let btcexp = item1['btc'];
        let expenseconfimatoryremarks = item1['expenseconfremarks'];
        let expenseconfirmeddate = item1['expenseconfirmeddate'];
        let expensedeskconformatoryremarks = item1['ExpenseDeskConfRemarks'];
        let expensedeskconfirmeddate = item1['expensedeskconfirmeddate'];
                     
                   
     if (rpsno == rpsno1)
     {
          //rpsno1="";
          rpsno = "";
          Division ="";
          region = "";
          area = "";
          fsname = "";
          drcode = "";
          drname = "";
          drcategory = "";
          drgrade = "";
          rpsdate = "";
          confnote ="";
          btcexp = "";
          expenseconfimatoryremarks = "";
          expenseconfirmeddate = "";
          expensedeskconformatoryremarks = "";
          expensedeskconfirmeddate = "";
         }


         test13.push({
            "DIVISION":Division,
            "REGION":region,
            "AREA":area,
            "FS NAME":fsname,
            "DR CODE":drcode,
            "DR NAME":drname,
            "DR CATEGORY":drcategory,
            "DR GRADE":drgrade,
            "RPS NUMBER":rpsno,
            "RPS ACTIVITY":rpsname,
            "RPS DATE":rpsdate,
            "CONFIRMATION REMARKS":confnote,
            "ESTIMATED RPS AMOUNT":esimatedamt ,
            "TOTAL RPS ACTUAL EXPENSE":n_actualexpense,
            "EXCEPTIONAL AMOUNT (ESTIMATED- ACTUAL)":exceptionalamt,
            "BTC EXPENSE":btcexp,
            "EXPENSE CONFIRMATORY REMARKS":<div className="note-text"> {expenseconfimatoryremarks} </div>,
            "EXPENSE CONFIRMED DATE":expenseconfirmeddate,
            "EXPENSE DESK CONFIRMATORY  REMARKS":<div className="note-text"> {expensedeskconformatoryremarks} </div>,
            "EXPENSE DESK CONFIRMED DATE":expensedeskconfirmeddate,
          
            
        })

        rpsno1=item1["rpsno"];

    
          }

        )

       
      
         
    
          
    this.setState({ loader:false })
    //console.log(test12,"jjj")
      this.setState({ Result1: test13 })
      this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
    }
    console.log(this.state.Result1,"result ok")
  }).catch(() => {
    
    this.setState({ Error: true, Errormsg: "Error in App At  APIiii " })
  })

}
    }
    componentDidMount(){

      let header1 =[]
        this.setState({hdrcoldefault : ['DIVISION',
        'REGION',
        'AREA',
        'FS NAME',
        'DR CODE',
        'DR NAME',
        'DR CATEGORY',
        'DR GRADE',
        'CONFIRMATION REMARKS',
        'EXCEPTIONAL AMOUNT (ESTIMATED- ACTUAL)',
        'BTC EXPENSE',
        'EXPENSE CONFIRMATORY REMARKS',
        'EXPENSE CONFIRMED DATE',
        'EXPENSE DESK CONFIRMATORY REMARKS',
        'EXPENSE DESK CONFIRMED DATE']})
        this.setState({rowsperpage1:10})
        this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]});
        this.setState({header:[
                  { prop: 'DIVISION', title: '', filterable: true,sortable:false },
                    // { prop: 'REGION', title: 'REGION', filterable: true,sortable:true },
                    // { prop: 'AREA', title: 'AREA', filterable: true,sortable:true },
                    // { prop: 'FS NAME', title: 'FS NAME', filterable: true,sortable:true },
                    // { prop: 'DR CODE', title: 'DR CODE', filterable: true,sortable:true },
                    // { prop: 'DR NAME', title: 'DR NAME', filterable: true,sortable:true },
                    // { prop: 'DR CATEGORY', title: 'DR CATEGORY', filterable: true,sortable:true },
                    // { prop: 'DR GRADE', title: 'DR GRADE', filterable: true,sortable:true },
                    // { prop: 'PRP/RPS NAME', title: 'PRP/RPS NUMBER', filterable: true,sortable:true },
                    // { prop: 'PRP/RPS ACTIVITY', title: 'PRP/RPS ACTIVITY', filterable: true,sortable:true },
                    // { prop: 'PRP/RPS DATE', title: 'PRP/RPS DATE', filterable: true,sortable:true },
                    // { prop: 'CONFIRMATION REMARKS', title: 'CONFIRMATION REMARKS', filterable: true,sortable:true },
                    // { prop: 'ESTIMATED  PRP/RPS AMOUNT', title: 'ESTIMATED PRP/RPS AMOUNT', filterable: true,sortable:true },
                    // { prop: 'TOTAL PRP/RPS ACTUAL AMOUNT', title: 'TOTAL PRP/RPS ACTUAL AMOUNT', filterable: true,sortable:true },
                    // { prop: 'EXCEPTIONAL AMOUNT (ESTIMATED- ACTUAL)', title: 'EXCEPTONAL AMOUNT (ESTIMATED- ACTUAL)', filterable: true,sortable:true },
                    // { prop: 'BTC EXPENSE', title: 'BTC EXPENSE', filterable: true,sortable:true },
                    // { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'EXPENSE CONFIRMATORY REMARKS', filterable: true,sortable:true },
                    // { prop: 'EXPENSE CONFIRMED DATE', title: 'EXPENSE CONFIRMED DATE', filterable: true,sortable:true },
                    // { prop: 'EXPENSE DESK CONFIRMATORY  REMARKS', title: 'EXPENSE DESK CONFIRATORY REMARKS', filterable: true,sortable:true },
                    // { prop: 'EXPENSE DESK CONFIRMED DATE', title: 'EXPENSE DESK CONFIRMED DATE', filterable: true,sortable:true },

           //  { prop: 'TOTAL EXPENSE AMOUNT', title: 'TOTAL EXPENSE AMOUNT', filterable: true,sortable:true },
           
                      
       ]});
    }
    





    render(){
       
        let {Result1,header,entriescount,rowsperpage1}=this.state;
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
                 <ReportTableEC
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

export default ReportListEC