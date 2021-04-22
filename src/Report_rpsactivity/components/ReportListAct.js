import React,{Component} from 'react'
import ReportTableAct from './ReportTableAct'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'
//import { Left } from 'react-bootstrap/lib/media'

class ReportListAct extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'',
            selreg:'All',
            selrps:'All',
            seldate:'',
            selyr:'',
            Result1:[],
            mnthname:'',
            divisioncode:'',
            loader:false,
            header:[],
             mon:'',
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
        this.setState({mainHead:"RPS Activity Report For  " + this.state.mnthname +','+ this.state.selyr} );  
        this.setState({ loader:true })
        //var travelModes={ "index": "BtnView",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"rpscode":this.state.selrps,"brandcode":this.state.selbr,"monthtype":this.state.seldate,"year":this.state.selyr}  }
        var travelModes={ "index": "BtnView",  data:{"DivisionCode":(this.state.seldiv=="")?this.state.divisioncode:this.state.seldiv,"RegionCode":this.state.selreg,"RpsName":this.state.selrps,"Month":this.state.seldate,"Year":this.state.selyr}  }
        let test12=[];
        let currentregion = "";
        let currentfs = "";
        let currentrpsno = "";
        let currenthq = "";
        let currentrpsdate="";
        let estimatedbtcfswise  = 0;    
        let estimatedrpsamtfswise = 0;  
        let actualadvancefswise = 0;   
        let btcexpensefswise = 0;    
        let ActualExpensefswise = 0;  
        let estimatedadvancefswise = 0;
        let CurrentBusinessfswise  = 0;
        let ExpectedBusinessfswise = 0;

        let estimatedbtcregwise    = 0;   
        let estimatedrpsamtregwise = 0; 
        let actualadvanceregwise   = 0; 
        let btcexpenseregwise     = 0;   
        let ActualExpenseregwise  = 0;  
        let estimatedadvanceregwise = 0;
        let CurrentBusinessregwise = 0;
        let ExpectedBusinessregwise = 0;

        let estimatedbtcallindia   = 0;   
        let estimatedrpsamtallindia = 0; 
        let actualadvanceallindia   = 0;
        let btcexpenseallindia   = 0; 
        let ActualExpenseallindia   = 0; 
        let estimatedadvanceallindia= 0; 
        let CurrentBusinessallindia = 0;
        let ExpectedBusinessallindia = 0;




        let roundOff = (num, places) => {
            const x = Math.pow(10,places);
            return Math.round(num * x) / x;
          }
      console.log(travelModes)
     
        postToServer("RpsActivityRpt", travelModes).then((Result) => {
            console.log(Result,"data")
            if (Result.data.Status == 'Success') {   
                //alert(1)
                console.log(Result,"data")
                Result.data.data[0].map((item1,index) => {
                           
                    let region   = item1['region'];
                    let fsname  = item1['fsname'];
                    let hqname = item1['hqname'];
                     let rpsno  = item1['rpsno'] ;
                    let rpsdate = item1['actualrpsdate'];
                    let rpsname   = item1['rpsname']; 
                      let  drname   = item1['drname'];
                      let drcategory  = item1['drcategory'];
                        let  drgrade  =item1['drgrade'];
                    let actualrpsdate= item1['actualrpsdate'];
                      let estimatedbtc  = item1['estimatedbtc'];
                  let estimatedrpsamt   = item1['estimatedrpsamt'];                
                    let actualadvance = item1['actualadvance'];
                    let btcexpense  = item1['btcexpense'];                   
                    let ActualExpense = item1['ActualExpense'];
                    let estimatedadvance= item1['estimatedadvance'];
                    let CurrentBusiness = item1['CurrentBusiness'];
                    let ExpectedBusiness  = item1['ExpectedBusiness'];
                    let confnote   = item1['confnote'];
                    let expenseconfimatoryremarks = item1['expenseconfremarks'];
                    let expenseconfirmeddate = item1['expenseconfirmeddate'];
                    let expensedeskconformatoryremarks = item1['ExpenseDeskConfRemarks'];
                    let expensedeskconfirmeddate = item1['expensedeskconfirmeddate'];


                    if(Result.data.data[0].length>0)
                    {
                          this.setState({header:[
                            { prop: 'REGION', title: 'REGION', filterable: true,sortable:true },
                            { prop: 'FS NAME', title: 'FS NAME', filterable: true,sortable:true },
                            { prop: 'HQ', title: 'HQ', filterable: true,sortable:true },
                            { prop: 'RPS NO', title: 'RPS NO', filterable: true,sortable:true },
                            { prop: 'RPS DATE', title: 'RPS DATE', filterable: true,sortable:true },
                            { prop: 'RPS NAME', title: 'RPS NAME', filterable: true,sortable:true },
                            { prop: 'NAME OF DOCTOR', title: 'NAME OF DOCTOR', filterable: true },
                            { prop: 'CATEGORY', title: 'CATEGORY', filterable: true,sortable:true },
                           { prop: 'GRADE', title: 'GRADE', filterable: true,sortable:true },
                           { prop: 'ESTIMATED ADVANCE REQUESTED', title: 'ESTIMATED ADVANCE REQUESTED', filterable: true,sortable:true },
                           { prop: 'ESTIMATED BILL TO COMPANY', title: 'ESTIMATED BILL TO COMPANY', filterable: true,sortable:true },
                           { prop: 'ESTIMATED TOTAL RPS EXPENSE', title: 'ESTIMATED TOTAL RPS EXPENSE', filterable: true },
                           //doctor code
                          
                       //CONDITINS ARE THERE
                         //  { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'TOTAL COST FOR  RPS', filterable: true,sortable:true },
                       //    { prop: 'TOTAL COST FOR BTC', title: 'TOTAL COST FOR  BTC EXPENSE', filterable: true,sortable:true },
                          //{ prop: 'EXPENSE AGAINST ADVANCE', title: 'TOTAL COST FOR  RPS', filterable: true,sortable:true },
                           
                          
                          { prop: 'ACTUAL RPS DATE', title: 'ACTUAL RPS DATE', filterable: true,sortable:true },
                         // { prop: 'TOTAL COST FOR BTC EXPENSE', title: 'TOTAL COST FOR BTC EXPENSE', filterable: true,sortable:true },
                         //   { prop: 'EXPENSE AGAINST ADVANCE', title: 'EXPENSE AGAINST ADVANCE', filterable: true },
                         { prop: 'ACTUAL TOTAL ADVANCE EXPENSES', title: 'ACTUAL TOTAL ADVANCE EXPENSES', filterable: true,sortable:true },
                         { prop: 'ACTUAL TOTAL BILL TO COMPANY EXPENSES', title: 'ACTUAL TOTAL BILL TO COMPANY EXPENSES', filterable: true,sortable:true },
                         { prop: 'ACTUAL TOTAL RPS EXPENSES', title: 'ACTUAL TOTAL RPS EXPENSES', filterable: true },
                        { prop: 'TOTAL CURRENT BUSINESS', title: 'TOTAL CURRENT BUSINESS', filterable: true,sortable:true },
                        { prop: 'TOTAL EXPECTED BUSINESS', title: ' TOTAL EXPECTED BUSINESS', filterable: true,sortable:true },
                        { prop: 'REMARK FROM CONFIRMATOR', title: 'REMARK FROM CONFIRMATOR', filterable: true,sortable:true },
                           { prop: 'EXPENSE CONFIRMATORY REMARKS', title: ' EXPENSE CONFIRMATORY REMARKS', filterable: true,sortable:true },
                           { prop: 'EXPENSE CONFIRMED DATE', title: 'EXPENSE CONFIRMED DATE', filterable: true,sortable:true },
                           { prop: 'EXPENSE DESK CONFIRMATORY REMARKS', title: 'EXPENSE DESK CONFIRMATORY REMARKS', filterable: true,sortable:true },
                          { prop: 'EXPENSE DESK CONFIRMED DATE', title: 'EXPENSE DESK CONFIRMED DATE', filterable: true },              
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




                    if (currentrpsno == item1['rpsno'])
                    {
                        // these fields are only ones in each rps
 
                        CurrentBusiness  = 0;
                        ExpectedBusiness = 0;
                        btcexpense       = 0;
                        ActualExpense    = 0;
                        actualadvance    = 0;
                    }

                     // Taking All India Total

                     estimatedbtcallindia     +=parseFloat(estimatedbtc)  ;
                     estimatedrpsamtallindia  +=parseFloat(estimatedrpsamt) ;
                     actualadvanceallindia    +=parseFloat(actualadvance);
                     btcexpenseallindia       += parseFloat(btcexpense);
                     ActualExpenseallindia    += parseFloat(ActualExpense) ;
                     estimatedadvanceallindia +=parseFloat(estimatedadvance) ;
                     CurrentBusinessallindia  += parseFloat(CurrentBusiness) ;
                     ExpectedBusinessallindia +=parseFloat(ExpectedBusiness) ;
                       

                     if ((currentfs == fsname) || (index == 0))
                     {
                         if(index != 0)
                         fsname = "";
  
                         // taking fs wise total
                        // allcsum+=parseFloat(item1['totalcurrentbussiness']);
                         estimatedbtcfswise +=parseFloat(estimatedbtc);
                         estimatedrpsamtfswise+=parseFloat(estimatedrpsamt);
                         actualadvancefswise+=parseFloat(actualadvance);
                         btcexpensefswise  +=parseFloat(btcexpense) ;
                         ActualExpensefswise +=parseFloat(ActualExpense);
                         estimatedadvancefswise  +=parseFloat(estimatedadvance) ;
                         CurrentBusinessfswise    +=parseFloat(CurrentBusiness);
                         ExpectedBusinessfswise +=parseFloat(ExpectedBusiness) ;
  
  
                     }
                     if ((currenthq == hqname) || (index == 0))
                     {
                         if (index != 0)
                         {
                             hqname = "";
                         }
                     }
                    //  if ((currentrpsno == rpsno) || (index == 0))
                    //  {
                    //      if (index != 0)
                    //          rpsno = "";
                    //  }
                    //  if ((currentrpsdate == rpsdate) || (index == 0))
                    //  {
                    //      if (index != 0)
                    //          rpsdate = "";
                    //  }



                     if ((currentregion == item1['region']) || (index == 0))
                     {
                         if (index != 0)
                         region = "";
  
                         // Taking Region wise Total
  
                         estimatedbtcregwise  +=parseFloat(estimatedbtc);
                         estimatedrpsamtregwise  += parseFloat(estimatedrpsamt) ;
                         actualadvanceregwise  +=parseFloat(actualadvance) ;
                         btcexpenseregwise    += parseFloat(btcexpense);
                         ActualExpenseregwise +=parseFloat(ActualExpense) ;
                         estimatedadvanceregwise +=parseFloat(estimatedadvance) ;
                         CurrentBusinessregwise   += parseFloat(CurrentBusiness) ;
                         ExpectedBusinessregwise  +=parseFloat(ExpectedBusiness);
  
                     }


                     if (item1['fsname'] != currentfs && (index != 0))

                            {
                        test12.push({
                            
                            "REGION":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Total'}} />,
                            "FS NAME":"",
                            "HQ":"",
                            "RPS NO":"",
                            "RPS DATE":"",
                            "RPS NAME":"",
                            "NAME OF DOCTOR":"",
                            "CATEGORY":"",
                            "GRADE":"",
                            "ESTIMATED ADVANCE REQUESTED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedadvancefswise,2)}} />,
                            "ESTIMATED BILL TO COMPANY":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedbtcfswise,2)}} />,
                            "ESTIMATED TOTAL RPS EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedrpsamtfswise,2)}} />,
                            "ACTUAL RPS DATE":"",
                            //DOCTOR CODE
                           // "DOCTOR NAME":item1['DOCTOR NAME'],
                            
                           
                            "ACTUAL TOTAL ADVANCE EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(actualadvancefswise,2)}} />,
                            "ACTUAL TOTAL BILL TO COMPANY EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(btcexpensefswise,2)}} />,
                            "ACTUAL TOTAL RPS EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(ActualExpensefswise,2)}} />,
                            "TOTAL CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(CurrentBusinessfswise,2) }} />, 
                            "TOTAL EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(ExpectedBusinessfswise,2) }} />,
                            "REMARK FROM CONFIRMATOR":"",
                             "EXPENSE CONFIRMATORY REMARKS":"",
                             "EXPENSE CONFIRMED DATE":"",
                             "EXPENSE DESK CONFIRMATORY REMARKS":"",
                             "EXPENSE DESK CONFIRMED DATE":"",
                             
                        
                            
                        })





                        estimatedbtcfswise       = parseFloat(item1['estimatedbtc']);
                       estimatedrpsamtfswise    =  parseFloat(item1['estimatedrpsamt']);
                       actualadvancefswise      = parseFloat(item1['actualadvance']);
                       btcexpensefswise         = parseFloat(item1['btcexpense']);
                       ActualExpensefswise      = parseFloat(item1['ActualExpense']);
                       estimatedadvancefswise   = parseFloat(item1['estimatedadvance']);
                       CurrentBusinessfswise    = parseFloat(item1['CurrentBusiness']);
                       ExpectedBusinessfswise   =  parseFloat(item1['ExpectedBusiness']);

                    }



                    



                    if (item1['region']!= currentregion && (index != 0))

                    {
              if(Result.data.data[0].length>0)
              {
                test12.push({
                    
                    "REGION":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
                    "FS NAME":"",
                    "HQ":"",
                    "RPS NO":"",
                    "RPS DATE":"",
                    "RPS NAME":"",
                    "NAME OF DOCTOR":"",
                    "CATEGORY":"",
                    "GRADE":"",
                    "ESTIMATED ADVANCE REQUESTED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedadvanceregwise,2)}} />,
                    "ESTIMATED BILL TO COMPANY":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedbtcregwise,2)}} /> ,
                    "ESTIMATED TOTAL RPS EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedrpsamtregwise,2)}} />,
                    "ACTUAL RPS DATE":"",
                    //DOCTOR CODE
                   // "DOCTOR NAME":item1['DOCTOR NAME'],
                    
                   
                    "ACTUAL TOTAL ADVANCE EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(actualadvanceregwise,2)}} />,
                    "ACTUAL TOTAL BILL TO COMPANY EXPENSES": <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(btcexpenseregwise,2)}} />,
                    "ACTUAL TOTAL RPS EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(ActualExpenseregwise,2)}} />,
                    "TOTAL CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(CurrentBusinessregwise,2) }} />, 
                    "TOTAL EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(ExpectedBusinessregwise,2)}} />,
                    "REMARK FROM CONFIRMATOR":"",
                     "EXPENSE CONFIRMATORY REMARKS":"",
                     "EXPENSE CONFIRMED DATE":"",
                     "EXPENSE DESK CONFIRMATORY REMARKS":"",
                     "EXPENSE DESK CONFIRMED DATE":"",
                     
                
                    
                })
            }





               
                estimatedadvanceregwise     = estimatedadvancefswise;
                estimatedbtcregwise         = estimatedbtcfswise;
                estimatedrpsamtregwise      = estimatedrpsamtfswise;                  
                actualadvanceregwise        = actualadvancefswise;
                btcexpenseregwise           = btcexpensefswise;
                ActualExpenseregwise        = ActualExpensefswise;
                CurrentBusinessregwise      = CurrentBusinessfswise;
                ExpectedBusinessregwise     = ExpectedBusinessfswise;

            }

            if (currentrpsno != item1['rpsno'])
            {
               let  btcexpensetd = "";
               if(btcexpense ==0)
               {
                btcexpensetd=0;
               }
               else{
                btcexpensetd=btcexpense;
               }

              
                      


               let  actualadvancetd = "";
               if(actualadvance ==0)
               {
                actualadvancetd=0;
               }
               else{
                actualadvancetd=actualadvance;
               }
              

               let  ActualExpensetd = "";
               if(ActualExpense ==0)
               {
                ActualExpensetd=0;
               }
               else{
                ActualExpensetd=ActualExpense;
               }
              

              if (item1['n_status'] == "4")
              {
                  if (btcexpensetd == "")
                  {
                      btcexpensetd = 0;
                  }
                  if (actualadvancetd == "")
                  {
                      actualadvancetd = 0;
                  }
                  if (ActualExpensetd == "")
                  {
                      ActualExpensetd = 0;
                  }
                }

                test12.push({
                    
                    "REGION":<div className="textReport">{region}</div>,
                    "FS NAME":<div className="textReport">{fsname}</div>,
                    "HQ":<div className="textReport">{hqname}</div>,
                    "RPS NO":<div className="textReport">{rpsno}</div>,
                    "RPS DATE":<div className="textReport">{rpsdate}</div>,
                    "RPS NAME":<div className="textReport">{rpsname}</div>,
                    "NAME OF DOCTOR":<div className="textReport">{drname}</div>,
                    "CATEGORY":<div className="textReport">{drcategory}</div>,
                    "GRADE":<div className="textReport">{drgrade}</div>,
                    "ESTIMATED ADVANCE REQUESTED":<div className="textReport">{estimatedadvance}</div>,
                    "ESTIMATED BILL TO COMPANY":<div className="textReport">{estimatedbtc}</div> ,
                    "ESTIMATED TOTAL RPS EXPENSE":<div className="textReport">{estimatedrpsamt}</div>,
                    "ACTUAL RPS DATE":<div className="textReport">{actualrpsdate}</div>,
                    //DOCTOR CODE
                   // "DOCTOR NAME":item1['DOCTOR NAME'],
                    
                   
                    "ACTUAL TOTAL ADVANCE EXPENSES":<div className="textReport">{actualadvancetd}</div>,
                    "ACTUAL TOTAL BILL TO COMPANY EXPENSES": <div className="textReport">{btcexpensetd}</div>,
                    "ACTUAL TOTAL RPS EXPENSES":<div className="textReport">{ActualExpensetd}</div>,
                    "TOTAL CURRENT BUSINESS":<div className="textReport">{CurrentBusiness}</div> , 
                    "TOTAL EXPECTED BUSINESS":<div className="textReport">{ExpectedBusiness}</div>,
                    "REMARK FROM CONFIRMATOR":<div className="textReport">{confnote}</div>,
                     "EXPENSE CONFIRMATORY REMARKS":<div className="note-text textReport"> { expenseconfimatoryremarks} </div>,
                     "EXPENSE CONFIRMED DATE":<div className="textReport">{expenseconfirmeddate}</div>,
                     "EXPENSE DESK CONFIRMATORY REMARKS":<div className="note-text textReport"> { expensedeskconformatoryremarks} </div> ,
                     "EXPENSE DESK CONFIRMED DATE":<div className="textReport">{expensedeskconfirmeddate}</div>,
                     
                
                    
                })



                   
               }
                     else{
                        test12.push({
                    
                            "REGION":"",
                            "FS NAME":"",
                            "HQ":"",
                            "RPS NO":"",
                            "RPS DATE":"",
                            "RPS NAME":<div className="textReport">{rpsname}</div>,
                            "NAME OF DOCTOR":"",
                            "CATEGORY":"",
                            "GRADE":"",
                            "ESTIMATED ADVANCE REQUESTED":<div className="textReport">{estimatedadvance}</div>,
                            "ESTIMATED BILL TO COMPANY":<div className="textReport">{estimatedbtc}</div> ,
                            "ESTIMATED TOTAL RPS EXPENSE":<div className="textReport">{estimatedrpsamt}</div>,
                            "ACTUAL RPS DATE":"",
                            //DOCTOR CODE
                           // "DOCTOR NAME":item1['DOCTOR NAME'],
                            
                           
                            "ACTUAL TOTAL ADVANCE EXPENSES":"",
                            "ACTUAL TOTAL BILL TO COMPANY EXPENSES": "",
                            "ACTUAL TOTAL RPS EXPENSES":"",
                            "TOTAL CURRENT BUSINESS":"" , 
                            "TOTAL EXPECTED BUSINESS":"",
                            "REMARK FROM CONFIRMATOR":"",
                             "EXPENSE CONFIRMATORY REMARKS":"",
                             "EXPENSE CONFIRMED DATE":"",
                             "EXPENSE DESK CONFIRMATORY REMARKS":"",
                             "EXPENSE DESK CONFIRMED DATE":"",
                             
                        
                            
                        })
                     }  

                     currentregion   = item1['region'];
                     currentfs       = item1['fsname'];
                     currentrpsno    = item1["rpsno"];
                     currenthq       = item1["hqname"];
                    // currentrpsdate = item1["RPS DATE"]



                        



                     // csum+=parseInt(item1['CURRENT BUSSINESS']);
                   // esum+=parseInt(item1['EXPECTED BUSSINESS']);
                    //  console.log(test12,"mmm")
                   // }
                  
                    }
                  }

                )
                if(Result.data.data[0].length>0)
                {
                test12.push({
                            
                    "REGION":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Total'}} />,
                    "FS NAME":"",
                    "HQ":"",
                    "RPS NO":"",
                    "RPS DATE":"",
                    "RPS NAME":"",
                    "NAME OF DOCTOR":"",
                    "CATEGORY":"",
                    "GRADE":"",
                    "ESTIMATED ADVANCE REQUESTED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(estimatedadvancefswise,2)}} />,
                    "ESTIMATED BILL TO COMPANY":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(estimatedbtcfswise,2)}} />,
                    "ESTIMATED TOTAL RPS EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(estimatedrpsamtfswise,2)}} />,
                    "ACTUAL RPS DATE":"",
                    //DOCTOR CODE
                   // "DOCTOR NAME":item1['DOCTOR NAME'],
                    
                   
                    "ACTUAL TOTAL ADVANCE EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(actualadvancefswise,2)}} />,
                    "ACTUAL TOTAL BILL TO COMPANY EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(btcexpensefswise,2)}} />,
                    "ACTUAL TOTAL RPS EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(ActualExpensefswise,2)}} />,
                    "TOTAL CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(CurrentBusinessfswise,2)}} />, 
                    "TOTAL EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(ExpectedBusinessfswise,2)}} />,
                    "REMARK FROM CONFIRMATOR":"",
                     "EXPENSE CONFIRMATORY REMARKS":"",
                     "EXPENSE CONFIRMED DATE":"",
                     "EXPENSE DESK CONFIRMATORY REMARKS":"",
                     "EXPENSE DESK CONFIRMED DATE":"",
                     
                
                    
                })
            

                test12.push({
                    
                    "REGION":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'Region Total'}} />,
                    "FS NAME":"",
                    "HQ":"",
                    "RPS NO":"",
                    "RPS DATE":"",
                    "RPS NAME":"",
                    "NAME OF DOCTOR":"",
                    "CATEGORY":"",
                    "GRADE":"",
                    "ESTIMATED ADVANCE REQUESTED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedadvanceregwise,2)}} />,
                    "ESTIMATED BILL TO COMPANY":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedbtcregwise,2)}} /> ,
                    "ESTIMATED TOTAL RPS EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedrpsamtregwise,2)}} />,
                    "ACTUAL RPS DATE":"",
                    //DOCTOR CODE
                   // "DOCTOR NAME":item1['DOCTOR NAME'],
                    
                   
                    "ACTUAL TOTAL ADVANCE EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(actualadvanceregwise,2)}} />,
                    "ACTUAL TOTAL BILL TO COMPANY EXPENSES": <h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(btcexpenseregwise,2)}} />,
                    "ACTUAL TOTAL RPS EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(ActualExpenseregwise,2)}} />,
                    "TOTAL CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html:roundOff(CurrentBusinessregwise,2) }} />, 
                    "TOTAL EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(ExpectedBusinessregwise,2)}} />,
                    "REMARK FROM CONFIRMATOR":"",
                     "EXPENSE CONFIRMATORY REMARKS":"",
                     "EXPENSE CONFIRMED DATE":"",
                     "EXPENSE DESK CONFIRMATORY REMARKS":"",
                     "EXPENSE DESK CONFIRMED DATE":"",
                     
                
                    
                })
                test12.push({
                    
                    "REGION":<h5 style={{fontWeight: 'bold',textTransform : 'capitalize'}} dangerouslySetInnerHTML={{__html: 'All India Total'}} />,
                    "FS NAME":"",
                    "HQ":"",
                    "RPS NO":"",
                    "RPS DATE":"",
                    "RPS NAME":"",
                    "NAME OF DOCTOR":"",
                    "CATEGORY":"",
                    "GRADE":"",
                    "ESTIMATED ADVANCE REQUESTED":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedadvanceallindia,2)}} />,
                    "ESTIMATED BILL TO COMPANY":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedbtcallindia,2) }} />,
                    "ESTIMATED TOTAL RPS EXPENSE":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(estimatedrpsamtallindia,2)}} />,
                    "ACTUAL RPS DATE":"",
                    //DOCTOR CODE
                   // "DOCTOR NAME":item1['DOCTOR NAME'],
                    
                   
                    "ACTUAL TOTAL ADVANCE EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(actualadvanceallindia,2)}} />,
                    "ACTUAL TOTAL BILL TO COMPANY EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(btcexpenseallindia,2)}} /> ,
                    "ACTUAL TOTAL RPS EXPENSES":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(ActualExpenseallindia,2)}} />,
                    "TOTAL CURRENT BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(CurrentBusinessallindia ,2)}} />,
                    "TOTAL EXPECTED BUSINESS":<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: roundOff(ExpectedBusinessallindia,2)}} />,
                    "REMARK FROM CONFIRMATOR":"",
                     "EXPENSE CONFIRMATORY REMARKS":"",
                     "EXPENSE CONFIRMED DATE":"",
                     "EXPENSE DESK CONFIRMATORY REMARKS":"",
                     "EXPENSE DESK CONFIRMED DATE":"",
                     
                
                    
                })
                  
            }
            this.setState({ loader:false })
            //console.log(test12,"jjj")
              this.setState({ Result1: test12 })
              this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
            }
            console.log(this.state.Result1,"result ok")
          }).catch(() => {
            
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })

    }
    componentDidMount(){

        let header1 =[]
        this.setState({hdrcoldefault : ['REGION',
        'FS NAME',
        'HQ',
        'RPS NO',
        'RPS DATE',
        'RPS NAME',
        'NAME OF DOCTOR',
        'CATEGORY',
        'GRADE',
        'ESTIMATED ADVANCE REQUESTED',
        'ESTIMATED BILL TO COMPANY',
        'ESTIMATED TOTAL RPS EXPENSE',
        'ACTUAL RPS DATE',
        'ACTUAL TOTAL ADVANCE EXPENSES',
        'ACTUAL TOTAL BILL TO COMPANY EXPENSES',
        'ACTUAL TOTAL RPS EXPENSES',
        'TOTAL CURRENT BUSINESS',
        'TOTAL EXPECTED BUSINESS',
        'REMARK FROM CONFIRMATOR',
        'EXPENSE CONFIRMATORY REMARKS',
        'EXPENSE CONFIRMED DATE',
        'EXPENSE DESK CONFIRMATORY REMARKS',
        'EXPENSE DESK CONFIRMED DATE']})
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
            { prop: 'REGION', title: '', filterable: true,sortable:false },
        ]});
    }
    





    render(){
        let {Result1,header,entriescount,rowsperpage1}=this.state
        // let {Result1}=this.state
        // const header = [
        //     // { prop: 'DIVISION', title: 'DIVISION', filterable: true,sortable:true },
        //      { prop: 'REGION', title: 'REGION', filterable: true },
        //      { prop: 'FS NAME', title: 'FS NAME', filterable: true,sortable:true },
        //      { prop: 'HQ', title: 'HQ', filterable: true,sortable:true },
        //      { prop: 'RPS NO', title: 'RPS NO', filterable: true,sortable:true },
        //      { prop: 'RPS DATE', title: 'RPS DATE', filterable: true,sortable:true },
        //      { prop: 'RPS NAME', title: 'RPS NAME', filterable: true,sortable:true },
        //      { prop: 'NAME OF DOCTOR', title: 'NAME OF DOCTOR', filterable: true },
        //      { prop: 'CATEGORY', title: 'CATEGORY', filterable: true,sortable:true },
        //     { prop: 'GRADE', title: 'GRADE', filterable: true,sortable:true },
        //     { prop: 'ESTIMATED ADVANCE REQUESTED', title: 'ESTIMATED ADVANCE REQUESTED', filterable: true,sortable:true },
        //     { prop: 'ESTIMATED BILL TO COMPANY', title: 'ESTIMATED BILL TO COMPANY', filterable: true,sortable:true },
        //     { prop: 'ESTIMATED TOTAL RPS EXPENSE', title: 'ESTIMATED TOTAL RPS EXPENSE', filterable: true },
        //     //doctor code
           
        // //CONDITINS ARE THERE
        //   //  { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'TOTAL COST FOR  RPS', filterable: true,sortable:true },
        // //    { prop: 'TOTAL COST FOR BTC', title: 'TOTAL COST FOR  BTC EXPENSE', filterable: true,sortable:true },
        //    //{ prop: 'EXPENSE AGAINST ADVANCE', title: 'TOTAL COST FOR  RPS', filterable: true,sortable:true },
            
           
        //    { prop: 'ACTUAL RPS DATE', title: 'ACTUAL RPS DATE', filterable: true,sortable:true },
        //   // { prop: 'TOTAL COST FOR BTC EXPENSE', title: 'TOTAL COST FOR BTC EXPENSE', filterable: true,sortable:true },
        //   //   { prop: 'EXPENSE AGAINST ADVANCE', title: 'EXPENSE AGAINST ADVANCE', filterable: true },
        //   { prop: 'ACTUAL TOTAL ADVANCE EXPENSES', title: 'ACTUAL TOTAL ADVANCE EXPENSES', filterable: true,sortable:true },
        //   { prop: 'ACTUAL TOTAL BILL TO COMPANY EXPENSES', title: 'ACTUAL TOTAL BILL TO COMPANY EXPENSES', filterable: true,sortable:true },
        //   { prop: 'ACTUAL TOTAL RPS EXPENSES', title: 'ACTUAL TOTAL RPS EXPENSES', filterable: true },
        //  { prop: 'TOTAL CURRENT BUSINESS', title: 'TOTAL CURRENT BUSINESS', filterable: true,sortable:true },
        //  { prop: 'TOTAL EXPECTED BUSINESS', title: ' TOTAL EXPECTED BUSINESS', filterable: true,sortable:true },
        //  { prop: 'REMARK FROM CONFIRMATOR', title: 'REMARK FROM CONFIRMATOR', filterable: true,sortable:true },
        //     { prop: 'EXPENSE CONFIRMATORY REMARKS', title: ' EXPENSE CONFIRMATORY REMARKS', filterable: true,sortable:true },
        //     { prop: 'EXPENSE CONFIRMED DATE', title: 'EXPENSE CONFIRMED DATE', filterable: true,sortable:true },
        //     { prop: 'EXPENSE DESK CONFIRMATORY REMARKS', title: 'EXPENSE DESK CONFIRMATORY REMARKS', filterable: true,sortable:true },
        //    { prop: 'EXPENSE DESK CONFIRMED DATE', title: 'EXPENSE DESK CONFIRMED DATE', filterable: true },
            
          
         
            
            
            
           
           
             
           
            
            
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
                 <ReportTableAct
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

export default ReportListAct