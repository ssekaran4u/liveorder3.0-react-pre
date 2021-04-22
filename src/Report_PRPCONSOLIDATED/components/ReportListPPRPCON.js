import React,{Component} from 'react'
import ReportTablePRPCON from './ReportTablePRPCON'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'
//import { Left } from 'react-bootstrap/lib/media'

class ReportListPPRPCON extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'',
            selreg:'',
            selrps:'',
            selbr:'',
            seldate:'',
            selyr:'',
            Result1:[],
            header:[],
            loader:false,
            Divisionname:'',
            Regionname:'All',
            Divname:'',
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
            this.setState({Divname:state.textval})
        }
        else if(state.name=="Region")
        {
            
            this.setState({selreg:state.rvalue})
            this.setState({Regionname:state.textval})
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
      if(this.state.seldiv=="")
        {
            this.state.seldiv="All"
            //console.log(this.state.seldiv,"div");
            // alert("Divison not Selected ............")
            // return;
        
        } 
         if(this.state.selreg=="")
        {
            this.state.selreg="All"
           // console.log(this.state.selreg,"div");
        } 
   
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
        if(this.state.Divname=="")
        {
           this.state.Divname1=this.state.Divisionname
        }
        // else if(this.state.Divname="-All-"){
        //     this.state.Divname1="All"
        // }
        else
        {
            this.state.Divname1=this.state.Divname
        }
        if(this.state.Divname1=="-All-")
        {
            this.state.Divname1="All"
        }  
        if(this.state.Regionname=="-All-")
        {
            this.state.Regionname="All"
        }
        if(this.state.Regionname=="")
        {
            this.state.Regionname="All"
        }
       // this.setState({Divname:(this.state.Divname=="")?this.state.Divisionname:this.state.Divname});  
        this.setState({mainHead:"Consolidated Report  For "+this.state.Divname1+ " ,"+this.state.Regionname+',' +this.state.mnthname +','+ this.state.selyr} ) 
        this.setState({ loader:true })
        //var travelModes={ "index": "BtnView",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"rpscode":this.state.selrps,"brandcode":this.state.selbr,"monthtype":this.state.seldate,"year":this.state.selyr}  }
        var travelModes={ "index": "BtnLoad",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"monthtype":this.state.seldate,"Year":this.state.selyr}  }
     //  debugger;
        let test12=[];
        let appconf="";
        let advamt="";
        let advreciev="";
        let totalcostprp="";
        var totbtcexpense="";
        let expappfs="";
        let expconffs="";
        let expdate="";
        var count1=0;
        var expdrname1="";
        var expcatname1="";
        var expdr2="";
        var expcat2="";
        var aa="";
        var bb="";

       
        postToServer("Consolidatedprp", travelModes).then((Result) => {
            
            if (Result.data.Status == 'Success') {   
                // console.log(Result.data.data[1],"data2")
         //  console.log(Result.data.data,"me123") 
            // let clr="";
                Result.data.data[0].map((item1,index) => {
                    if(item1['PRPNo']!="00000")
                    {
                    count1=0;
                  // debugger;
              // console.log(item1['division'],"Re")
                    if (item1['expdate'] == "NS")
                    {
                        expappfs = "NA";
                        expconffs = "NA";
                    }
                    else
                    {
                        expappfs = item1['expappfs'];
                        expconffs = item1['expconffs'];
                    }



                    if (item1['AppConftot'] == "-1.00")
                    {
                        appconf="NA";
                    }
                    else{
                    appconf=item1['AppConftot'];
                    }
                    if (item1['n_AdvanceAmount']== "0.00")
                    {
                        advamt="NIL";
                    }
                    else
                    {
                        advamt=item1['n_AdvanceAmount'];
                    }
                    if (item1['actualadvacerecieved'] == "-1.00")
                        {
                            totalcostprp="NA";
                        }
                        else
                        {
                            totalcostprp=item1['TotalactualcostforPRP'];
                        }
                        if (item1['actualadvacerecieved'] == "-1.00")
                        {
                            advreciev="NA";
                        }
                        else
                        {
                            advreciev=item1['actualadvacerecieved'];
                        }
                        if (item1['actualadvacerecieved'] == "-1.00")
                        {
                            totbtcexpense="NA";
                        }
                        else
                        {
                            totbtcexpense=item1['actualbtcexpense'];
                        }

                        if (item1['expdate'] == "NS")
                        {
                            expdate=item1['expdate'];
                        }
                        else
                        {
                            expdate=item1['expdate'];
    
                        }
                        let division=item1['division'];
                        let prpno=item1['PRPNo'];
                       let reqfs=item1['FSName'];
                       let fshq=item1['FSHQ'];
                       let region=item1['RegionName'];
                       let requestraised=item1['ReqRaised'];
                       let ReqDate=item1['ReqDate'];
                       let PRPDate=item1['PRPDate'];
                       let PLACE=item1['c_place'];
                       let location=item1['location'];
                       let prpname=item1['prpname'];
                      let Topic=item1['Topic'];
                     // let brandname=item1['brandname'];
                     // let topic=item1['Topic'];
                      let prpbrand=item1['brandname'];
                      let expdoc=item1['Expectdoct'];
                      let estprp=item1['Estamt'];
                      let appconamt=appconf;
                      let prpadv=advamt;
                     let totbtc=item1['btctotal'];
                     let subexp=item1['sub_exp'];
                     let invsp=item1['speakername'];
                     let docexpatt="";
                     let catdocexpatte="";
                     let totcostprp=totalcostprp;
                     let expagadv=advreciev;
                     let totcbtcex=totbtcexpense;
                    let doccameforprp="";
                    let doccatecameprp="";
                    let confremark=item1['c_RejectNote'];
                    let penapp=item1['prpapprovefs'];
                    let pendconf=item1['prpconffs'];
                    let expsubdate=expdate;
                    let exppenapp=expappfs;
                    let exppendcon=expconffs;
                   let expconfrema=item1['expenseapprovconfremarks'];
                   let expconfdate=item1['expenseapprconfirmeddate'];
                   let cancelreas=item1['reasoncancellation'];
                   if(Result.data.data[0].length>0)
                   {
                         this.setState({header:[
                           { prop: 'DIVISION', title: 'DIVISION', filterable: true,sortable:true },
                           { prop: 'PRP NO', title: 'PRP NO', filterable: true,sortable:true },
                           { prop: 'REQUESTED FS', title: 'REQUESTED FS', filterable: true,sortable:true },
                           { prop: 'FS HQ', title: 'FS HQ', filterable: true,sortable:true },
                          
                           { prop: 'REGION', title: 'REGION', filterable: true,sortable:true },
                           { prop: 'REQUEST RAISED BY', title: 'REQUEST RAISED BY', filterable: true,sortable:true },
                           { prop: 'REQUEST DATE', title: 'REQUEST DATE', filterable: true,sortable:true },
                          { prop: 'PRP DATE', title: 'PRP DATE', filterable: true,sortable:true },
                         
                          { prop: 'PLACE', title: 'PLACE', filterable: true,sortable:true },
                          { prop: 'LOCATION', title: 'LOCATION', filterable: true,sortable:true },
                        
                          { prop: 'PRP NAME', title: 'PRP NAME', filterable: true,sortable:true },
                        
                        
                        { prop: 'TOPIC', title: 'TOPIC', filterable: true,sortable:true },
                        { prop: 'PRP BRAND', title: 'PRP BRAND', filterable: true,sortable:true },
                        { prop: 'EXPECTED NO OF DOCTORS', title: 'EXPECTED NO OF DOCTORS', filterable: true,sortable:true},
                       { prop: 'ESTIMATED PRP', title: 'ESTIMATED PRP', filterable: true,sortable:true },
                       { prop: 'Approve/Confirmed Total PRP', title: 'APPROVE/CONFIRMED TOTAL PRP', filterable: true,sortable:true},
                       { prop: 'PRP ADVANCE', title: 'PRP ADVANCE', filterable: true,sortable:true },
                          { prop: 'Total BTC', title: 'Total BTC', filterable: true,sortable:true },
                          { prop: 'SUBMITTED EXPENSE', title: 'SUBMITTED EXPENSE', filterable: true,sortable:true},
                          { prop: 'INVITED SPEAKER', title: 'INVITED SPEAKER', filterable: true,sortable:true},
                         { prop: 'DOCTORS EXPECTED TO ATTEND', title: 'DOCTORS EXPECTED TO ATTEND', filterable: true,sortable:true},
              
                         { prop: 'DOCTORS CATEGORY EXPECTED TO ATTEND', title: 'DOCTORS CATEGORY EXPECTED TO ATTEND', filterable: true,sortable:true},
                         { prop: 'TOTAL COST FOR PRP', title: 'TOTAL COST FOR PRP', filterable: true,sortable:true},
                         { prop: 'EXPENSE AGAINST ADVANCE', title: 'EXPENSE AGAINST ADVANCE', filterable: true,sortable:true},
                         { prop: 'TOTAL COST FOR BTC EXPENSE', title: 'TOTAL COST FOR BTC EXPENSE', filterable: true,sortable:true},
                         { prop: 'DOCTORS ACTUALLY CAME FOR PRP', title: 'DOCTORS ACTUALLY CAME FOR PRP', filterable: true,sortable:true},
                         { prop: 'DOCTORS CATEGORY WHO ATTENDED PRP', title: 'DOCTORS CATEGORY WHO ATTENDED PRP', filterable: true,sortable:true},
                         { prop: 'CONFIRMATION REMARK', title: 'CONFIRMATION REMARK', filterable: true,sortable:true},
                         { prop: 'PENDING FOR APPROVAL', title: 'PENDING FOR APPROVAL', filterable: true,sortable:true},
                         { prop: 'PENDING FOR CONFIRMATION', title: 'PENDING FOR CONFIRMATION', filterable: true,sortable:true},
                         { prop: 'EXPENSE SUBMITTED DATE', title: 'EXPENSE SUBMITTED DATE', filterable: true,sortable:true},
                          
              
                         { prop: 'EXPENSE PENDING FOR APPROVAL', title: 'PENDING FOR APPROVAL', filterable: true,sortable:true },
                         { prop: 'EXPENSE PENDING FOR CONFIRMATION', title: 'PENDING FOR CONFIRMATION', filterable: true,sortable:true },
                         { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'EXPENSE CONFIRMATORY REMARKS', filterable: true,sortable:true },
                         { prop: 'EXPENSE CONFIRMED DATE', title: 'EXPENSE CONFIRMED DATE', filterable: true,sortable:true },
                         { prop: 'CANCELLATION REASON', title: 'CANCELLATION REASON', filterable: true,sortable:true },                 
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
                   Result.data.data[1].map((item2,index1) =>{
                    
                 if(item1['PRPNo']== item2['PRPNo']) 
                 {
                   // debugger;
                 docexpatt=item2['reqdocname'];
                 catdocexpatte=item2['catname'];

                 expdrname1=item2['expdrname'];
                expcatname1=item2['expcatname'];
                 //doccameforprp=item2['expdrname'];
                 //doccatecameprp=item2['reqdocname']
                //    expdr2=expdrname1;
                //    expcat2=expcatname1;
                   expdr2=docexpatt;
                   expcat2=catdocexpatte;
                

               
                if(count1==0)
                {
                    aa=expdr2;
                    bb=expcat2;
                    // console.log("count =0");
                test12.push({       
                    "DIVISION":<div className="textReport">{division}</div>,
                    "PRP NO":<div className="textReport">{prpno}</div>,
                    "REQUESTED FS":<div className="textReport">{reqfs}</div>,
                    "FS HQ":<div className="textReport">{fshq}</div>,
                    "REGION":<div className="textReport">{region}</div>,
                    "REQUEST RAISED BY":<div className="textReport">{requestraised}</div>,
                    "REQUEST DATE":<div className="textReport">{ReqDate}</div>,
                    "PRP DATE":<div className="textReport">{PRPDate}</div>,
                    "PLACE":<div className="note-text"> {PLACE} </div>,
                    "LOCATION":<div className="textReport">{location}</div>,
                    "PRP NAME":<div className="textReport">{prpname}</div>,
                    "TOPIC":<div className="textReport">{Topic}</div>,
                    "PRP BRAND":<div className="note-text textReport"> {prpbrand} </div>,
                    "EXPECTED NO OF DOCTORS":<div className="textReport">{expdoc}</div>,
                    "ESTIMATED PRP":<div className="textReport">{estprp}</div>,
                    "Approve/Confirmed Total PRP":<div className="textReport">{appconamt}</div> ,
                    "PRP ADVANCE":<div className="textReport">{prpadv}</div>, 
                    "Total BTC":<div className="textReport">{totbtc}</div>,
                    "SUBMITTED EXPENSE":<div className="textReport">{subexp}</div>,
                     "INVITED SPEAKER":<div className="textReport">{invsp}</div>,
                     "DOCTORS EXPECTED TO ATTEND":<div className="textReport">{docexpatt}</div>,
                     "DOCTORS CATEGORY EXPECTED TO ATTEND":<div className="textReport">{catdocexpatte}</div>,
                     "TOTAL COST FOR PRP":<div className="textReport">{totcostprp}</div>,
                     "EXPENSE AGAINST ADVANCE":<div className="textReport">{expagadv}</div>,
                     "TOTAL COST FOR BTC EXPENSE":<div className="textReport">{totcbtcex}</div>,
                     "DOCTORS ACTUALLY CAME FOR PRP":<div className="textReport">{expdrname1}</div>,
                     "DOCTORS CATEGORY WHO ATTENDED PRP":<div className="textReport">{expcatname1}</div>,
                     "CONFIRMATION REMARK":<div className="note-text textReport"> {confremark} </div>,
                     "PENDING FOR APPROVAL":<div className="textReport">{penapp}</div>,
                     "PENDING FOR CONFIRMATION":<div className="textReport">{pendconf}</div>,
                     "EXPENSE SUBMITTED DATE":<div className="textReport">{expsubdate}</div>,
                     "EXPENSE PENDING FOR APPROVAL":<div className="textReport">{exppenapp}</div>,
                     "EXPENSE PENDING FOR CONFIRMATION":<div className="textReport">{exppendcon}</div>,
                     "EXPENSE CONFIRMATORY REMARKS":<div className="note-text textReport"> {expconfrema} </div>,
                     "EXPENSE CONFIRMED DATE":<div className="textReport">{expconfdate}</div>,
                     "CANCELLATION REASON":<div className="textReport">{cancelreas}</div>,
                    
                })
                docexpatt='';
                catdocexpatte='';
                count1=1;
            }
            else{
                if(expdr2==docexpatt || expcat2==catdocexpatte)
                {
                    // if(aa!=docexpatt && bb!=catdocexpatte)
                    if(aa!=docexpatt)
                    {
                        if(docexpatt==expdrname1)
                        {
                   // console.log("count =1 and if checkoing");
                    test12.push({    
                        "DIVISION":"",
                        "PRP NO":"",
                        "REQUESTED FS":"",
                        "FS HQ":"",
                        "REGION":"",
                        "REQUEST RAISED BY":"",
                        "REQUEST DATE":"",
                        "PRP DATE":"",
                        "PLACE":"",
                        "LOCATION":"",
                        "PRP NAME":"",
                        "TOPIC":"",
                        "PRP BRAND":"",
                        "EXPECTED NO OF DOCTORS":"",
                        "ESTIMATED PRP":"",
                        "Approve/Confirmed Total PRP":"" ,
                        "PRP ADVANCE":"", 
                        "Total BTC":"",
                        "SUBMITTED EXPENSE":"",
                         "INVITED SPEAKER":"",
                         "DOCTORS EXPECTED TO ATTEND":<div className="textReport">{expdr2}</div>,
                         "DOCTORS CATEGORY EXPECTED TO ATTEND":<div className="textReport">{expcat2}</div>,
                         "TOTAL COST FOR PRP":"",
                         "EXPENSE AGAINST ADVANCE":"",
                         "TOTAL COST FOR BTC EXPENSE":"",
                         "DOCTORS ACTUALLY CAME FOR PRP":<div className="textReport">{expdrname1}</div>,
                         "DOCTORS CATEGORY WHO ATTENDED PRP":<div className="textReport">{expcatname1}</div>,
                         "CONFIRMATION REMARK":"",
                         "PENDING FOR APPROVAL":"",
                         "PENDING FOR CONFIRMATION":"",
                         "EXPENSE SUBMITTED DATE":"",
                         "EXPENSE PENDING FOR APPROVAL":"",
                         "EXPENSE PENDING FOR CONFIRMATION":"",
                         "EXPENSE CONFIRMATORY REMARKS":"",
                         "EXPENSE CONFIRMED DATE":"",
                         "CANCELLATION REASON":"",
                        
                    })
                }
                else if(docexpatt=="" || expdrname1=="")
                {
                    test12.push({    
                        "DIVISION":"",
                        "PRP NO":"",
                        "REQUESTED FS":"",
                        "FS HQ":"",
                        "REGION":"",
                        "REQUEST RAISED BY":"",
                        "REQUEST DATE":"",
                        "PRP DATE":"",
                        "PLACE":"",
                        "LOCATION":"",
                        "PRP NAME":"",
                        "TOPIC":"",
                        "PRP BRAND":"",
                        "EXPECTED NO OF DOCTORS":"",
                        "ESTIMATED PRP":"",
                        "Approve/Confirmed Total PRP":"" ,
                        "PRP ADVANCE":"", 
                        "Total BTC":"",
                        "SUBMITTED EXPENSE":"",
                         "INVITED SPEAKER":"",
                         "DOCTORS EXPECTED TO ATTEND":<div className="textReport">{expdr2}</div>,
                         "DOCTORS CATEGORY EXPECTED TO ATTEND":<div className="textReport">{expcat2}</div>,
                         "TOTAL COST FOR PRP":"",
                         "EXPENSE AGAINST ADVANCE":"",
                         "TOTAL COST FOR BTC EXPENSE":"",
                         "DOCTORS ACTUALLY CAME FOR PRP":<div className="textReport">{expdrname1}</div>,
                         "DOCTORS CATEGORY WHO ATTENDED PRP":<div className="textReport">{expcatname1}</div>,
                         "CONFIRMATION REMARK":"",
                         "PENDING FOR APPROVAL":"",
                         "PENDING FOR CONFIRMATION":"",
                         "EXPENSE SUBMITTED DATE":"",
                         "EXPENSE PENDING FOR APPROVAL":"",
                         "EXPENSE PENDING FOR CONFIRMATION":"",
                         "EXPENSE CONFIRMATORY REMARKS":"",
                         "EXPENSE CONFIRMED DATE":"",
                         "CANCELLATION REASON":"",
                        
                    })
                }
                
                }
                else
                {
                    // alert(expdrname1 +","+expcatname1);
                    test12.push({    
                        "DIVISION":"",
                        "PRP NO":"",
                        "REQUESTED FS":"",
                        "FS HQ":"",
                        "REGION":"",
                        "REQUEST RAISED BY":"",
                        "REQUEST DATE":"",
                        "PRP DATE":"",
                        "PLACE":"",
                        "LOCATION":"",
                        "PRP NAME":"",
                        "TOPIC":"",
                        "PRP BRAND":"",
                        "EXPECTED NO OF DOCTORS":"",
                        "ESTIMATED PRP":"",
                        "Approve/Confirmed Total PRP":"" ,
                        "PRP ADVANCE":"", 
                        "Total BTC":"",
                        "SUBMITTED EXPENSE":"",
                         "INVITED SPEAKER":"",
                         "DOCTORS EXPECTED TO ATTEND":"",
                         "DOCTORS CATEGORY EXPECTED TO ATTEND":"",
                         "TOTAL COST FOR PRP":"",
                         "EXPENSE AGAINST ADVANCE":"",
                         "TOTAL COST FOR BTC EXPENSE":"",
                         "DOCTORS ACTUALLY CAME FOR PRP":<div className="textReport">{expdrname1}</div>,
                         "DOCTORS CATEGORY WHO ATTENDED PRP":<div className="textReport">{expcatname1}</div>,
                         "CONFIRMATION REMARK":"",
                         "PENDING FOR APPROVAL":"",
                         "PENDING FOR CONFIRMATION":"",
                         "EXPENSE SUBMITTED DATE":"",
                         "EXPENSE PENDING FOR APPROVAL":"",
                         "EXPENSE PENDING FOR CONFIRMATION":"",
                         "EXPENSE CONFIRMATORY REMARKS":"",
                         "EXPENSE CONFIRMED DATE":"",
                         "CANCELLATION REASON":"",
                        
                    })
                
                }
                }
                else
                {
                    // console.log("count =1 and else checkoing");
                    // if(aa!=docexpatt && bb!=catdocexpatte)
                    if(aa!=docexpatt)
                    {
                        if(docexpatt==expdrname1)
                        {
                test12.push({
                    "DIVISION":"",
                    "PRP NO":"",
                    "REQUESTED FS":"",
                    "FS HQ":"",
                    "REGION":"",
                    "REQUEST RAISED BY":"",
                    "REQUEST DATE":"",
                    "PRP DATE":"",
                    "PLACE":"",
                    "LOCATION":"",
                    "PRP NAME":"",
                    "TOPIC":"",
                    "PRP BRAND":"",
                    "EXPECTED NO OF DOCTORS":"",
                    "ESTIMATED PRP":"",
                    "Approve/Confirmed Total PRP":"" ,
                    "PRP ADVANCE":"", 
                    "Total BTC":"",
                    "SUBMITTED EXPENSE":"",
                     "INVITED SPEAKER":"",
                     "DOCTORS EXPECTED TO ATTEND":<div className="textReport">{expdr2}</div>,
                     "DOCTORS CATEGORY EXPECTED TO ATTEND":<div className="textReport">{expcat2}</div>,
                     "TOTAL COST FOR PRP":"",
                     "EXPENSE AGAINST ADVANCE":"",
                     "TOTAL COST FOR BTC EXPENSE":"",
                     "DOCTORS ACTUALLY CAME FOR PRP":<div className="textReport">{expdrname1}</div>,
                     "DOCTORS CATEGORY WHO ATTENDED PRP":<div className="textReport">{expcatname1}</div>,
                     "CONFIRMATION REMARK":"",
                     "PENDING FOR APPROVAL":"",
                     "PENDING FOR CONFIRMATION":"",
                     "EXPENSE SUBMITTED DATE":"",
                     "EXPENSE PENDING FOR APPROVAL":"",
                     "EXPENSE PENDING FOR CONFIRMATION":"",
                     "EXPENSE CONFIRMATORY REMARKS":"",
                     "EXPENSE CONFIRMED DATE":"",
                     "CANCELLATION REASON":"",
                    
                })
            }
            else if(docexpatt=="" || expdrname1=="")
                {
                    test12.push({    
                        "DIVISION":"",
                        "PRP NO":"",
                        "REQUESTED FS":"",
                        "FS HQ":"",
                        "REGION":"",
                        "REQUEST RAISED BY":"",
                        "REQUEST DATE":"",
                        "PRP DATE":"",
                        "PLACE":"",
                        "LOCATION":"",
                        "PRP NAME":"",
                        "TOPIC":"",
                        "PRP BRAND":"",
                        "EXPECTED NO OF DOCTORS":"",
                        "ESTIMATED PRP":"",
                        "Approve/Confirmed Total PRP":"" ,
                        "PRP ADVANCE":"", 
                        "Total BTC":"",
                        "SUBMITTED EXPENSE":"",
                         "INVITED SPEAKER":"",
                         "DOCTORS EXPECTED TO ATTEND":<div className="textReport">{expdr2}</div>,
                         "DOCTORS CATEGORY EXPECTED TO ATTEND":<div className="textReport">{expcat2}</div>,
                         "TOTAL COST FOR PRP":"",
                         "EXPENSE AGAINST ADVANCE":"",
                         "TOTAL COST FOR BTC EXPENSE":"",
                         "DOCTORS ACTUALLY CAME FOR PRP":<div className="textReport">{expdrname1}</div>,
                         "DOCTORS CATEGORY WHO ATTENDED PRP":<div className="textReport">{expcatname1}</div>,
                         "CONFIRMATION REMARK":"",
                         "PENDING FOR APPROVAL":"",
                         "PENDING FOR CONFIRMATION":"",
                         "EXPENSE SUBMITTED DATE":"",
                         "EXPENSE PENDING FOR APPROVAL":"",
                         "EXPENSE PENDING FOR CONFIRMATION":"",
                         "EXPENSE CONFIRMATORY REMARKS":"",
                         "EXPENSE CONFIRMED DATE":"",
                         "CANCELLATION REASON":"",
                        
                    })
                }
            }
            }
                docexpatt='';
                catdocexpatte='';
                count1=1;
                expdrname1=item2['expdrname'];
                expcatname1=item2['expcatname'];
            }
                 }
                 else
                 {
                 }
                }) 
            } 
        } 
                })
                  
            this.setState({ loader:false })
            //console.log(test12,"jjj")
              this.setState({ Result1: test12 })
              this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
            }
            //console.log(this.state.Result1,"result ok")
          }).catch(() => {
            
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })

    }
    componentDidMount(){

        let header1 =[]
        this.setState({hdrcoldefault : ['DIVISION',
        'PRP NO',
        'REQUESTED FS',
        'FS HQ',
        'REGION',
        'REQUEST RAISED BY',
        'REQUEST DATE',
        'PRP DATE',
        'PLACE',
        'LOCATION',
        'PRP NAME',
        'TOPIC',
        'PRP BRAND',
        'EXPECTED NO OF DOCTORS',
        'ESTIMATED PRP',
        'Approve/Confirmed Total PRP',
        'PRP ADVANCE',
        'Total BTC',
        'SUBMITTED EXPENSE',
        'INVITED SPEAKER',
        'DOCTORS EXPECTED TO ATTEND',
        'DOCTORS CATEGORY EXPECTED TO ATTEND',
        'TOTAL COST FOR PRP',
        'EXPENSE AGAINST ADVANCE',
        'TOTAL COST FOR BTC EXPENSE',
        'DOCTORS ACTUALLY CAME FOR PRP',
        'DOCTORS CATEGORY WHO ATTENDED PRP',
        'CONFIRMATION REMARK',
        'PENDING FOR APPROVAL',
        'PENDING FOR CONFIRMATION',
        'EXPENSE SUBMITTED DATE',
        'EXPENSE PENDING FOR APPROVAL',
        'EXPENSE PENDING FOR CONFIRMATION',
        'EXPENSE CONFIRMATORY REMARKS',
        'EXPENSE CONFIRMED DATE',
        'CANCELLATION REASON']})
        this.setState({rowsperpage1:10})
        this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]});
        var defre={ "index": "LoginFSDetails",  data:{}  }

        postToServer("PrpDetailsRpt", defre).then((Result) => {
        if (Result.data.Status == 'Success') {   
            Result.data.data.map((item1,index) => {
              
               this.setState({DivisionCode:(item1['c_div_code']=="")?"All":item1['c_div_code']});
            })
         }
        
        }).catch(() => {
                    
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })
         //default naming
        var defre1={ "index": "LoginFSName",  data:{}  }

        postToServer("PrpDetailsRpt", defre1).then((Result) => {
        if (Result.data.Status == 'Success') {   
            Result.data.data.map((item1,index) => {
              
               this.setState({Divisionname:(item1['divname']=="")?"All":item1['divname']});
               //this.setState({Regionname:(item1['regname']=="")?"All":item1['regname']});
               //this.setState({Areaname:(item1['arname']=="")?"All":item1['arname']});
            })
         }
        
        }).catch(() => {
                    
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })
        this.setState({header:[
            { prop: 'DIVISION', title: '', filterable: true,sortable:false },
        ]});
        // const body = [
        //     {
        //     }
        // ]

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
                let headerList = {
                    title: item,
                    prop: item,
                    sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    filterable: true
                };
                header.push(headerList);
            });
            
        }
        // const header = [
        //     // { prop: 'DIVISION', title: 'DIVISION', filterable: true,sortable:true },
        //      { prop: 'DIVISION', title: 'DIVISION', filterable: true,sortable:true },
        //      { prop: 'PRP NO', title: 'PRP NO', filterable: true,sortable:true },
        //      { prop: 'REQUESTED FS', title: 'REQUESTED FS', filterable: true,sortable:true },
        //      { prop: 'FS HQ', title: 'FS HQ', filterable: true,sortable:true },
            
        //      { prop: 'REGION', title: 'REGION', filterable: true,sortable:true },
        //      { prop: 'REQUEST RAISED BY', title: 'REQUEST RAISED BY', filterable: true,sortable:true },
        //      { prop: 'REQUEST DATE', title: 'REQUEST DATE', filterable: true,sortable:true },
        //     { prop: 'PRP DATE', title: 'PRP DATE', filterable: true,sortable:true },
           
        //     { prop: 'PLACE', title: 'PLACE', filterable: true,sortable:true },
        //     { prop: 'LOCATION', title: 'LOCATION', filterable: true,sortable:true },
          
        //     { prop: 'PRP NAME', title: 'PRP NAME', filterable: true,sortable:true },
          
          
        //   { prop: 'TOPIC', title: 'TOPIC', filterable: true,sortable:true },
        //   { prop: 'PRP BRAND', title: 'PRP BRAND', filterable: true,sortable:true },
        //   { prop: 'EXPECTED NO OF DOCTORS', title: 'EXPECTED NO OF DOCTORS', filterable: true,sortable:true},
        //  { prop: 'ESTIMATED PRP', title: 'ESTIMATED PRP', filterable: true,sortable:true },
        //  { prop: 'Approve/Confirmed Total PRP', title: 'APPROVE/CONFIRMED TOTAL PRP', filterable: true,sortable:true},
        //  { prop: 'PRP ADVANCE', title: 'PRP ADVANCE', filterable: true,sortable:true },
        //     { prop: 'Total BTC', title: 'Total BTC', filterable: true,sortable:true },
        //     { prop: 'SUBMITTED EXPENSE', title: 'SUBMITTED EXPENSE', filterable: true,sortable:true},
        //     { prop: 'INVITED SPEAKER', title: 'INVITED SPEAKER', filterable: true,sortable:true},
        //    { prop: 'DOCTORS EXPECTED TO ATTEND', title: 'DOCTORS EXPECTED TO ATTEND', filterable: true,sortable:true},

        //    { prop: 'DOCTORS CATEGORY EXPECTED TO ATTEND', title: 'DOCTORS CATEGORY EXPECTED TO ATTEND', filterable: true,sortable:true},
        //    { prop: 'TOTAL COST FOR PRP', title: 'TOTAL COST FOR PRP', filterable: true,sortable:true},
        //    { prop: 'EXPENSE AGAINST ADVANCE', title: 'EXPENSE AGAINST ADVANCE', filterable: true,sortable:true},
        //    { prop: 'TOTAL COST FOR BTC EXPENSE', title: 'TOTAL COST FOR BTC EXPENSE', filterable: true,sortable:true},
        //    { prop: 'DOCTORS ACTUALLY CAME FOR PRP', title: 'DOCTORS ACTUALLY CAME FOR PRP', filterable: true,sortable:true},
        //    { prop: 'DOCTORS CATEGORY WHO ATTENDED PRP', title: 'DOCTORS CATEGORY WHO ATTENDED PRP', filterable: true,sortable:true},
        //    { prop: 'CONFIRMATION REMARK', title: 'CONFIRMATION REMARK', filterable: true,sortable:true},
        //    { prop: 'PENDING FOR APPROVAL', title: 'PENDING FOR APPROVAL', filterable: true,sortable:true},
        //    { prop: 'PENDING FOR CONFIRMATION', title: 'PENDING FOR CONFIRMATION', filterable: true,sortable:true},
        //    { prop: 'EXPENSE SUBMITTED DATE', title: 'EXPENSE SUBMITTED DATE', filterable: true,sortable:true},
            

        //    { prop: 'EXPENSE PENDING FOR APPROVAL', title: 'PENDING FOR APPROVAL', filterable: true,sortable:true },
        //    { prop: 'EXPENSE PENDING FOR CONFIRMATION', title: 'PENDING FOR CONFIRMATION', filterable: true,sortable:true },
        //    { prop: 'EXPENSE CONFIRMATORY REMARKS', title: 'EXPENSE CONFIRMATORY REMARKS', filterable: true,sortable:true },
        //    { prop: 'EXPENSE CONFIRMED DATE', title: 'EXPENSE CONFIRMED DATE', filterable: true,sortable:true },
        //    { prop: 'CANCELLATION REASON', title: 'CANCELLATION REASON', filterable: true,sortable:true },
         
            
            
        // ];

      




        // const body = [
        //     {BRAND: "RANTAC SYRUP 100 ML SALES", CATEGORY OF DOCTOR: "PAEDIATRICIAN", CURRENT BUSSINESS: "1800.00",…}
        //     {BRAND: "RANTAC SYRUP 100 ML SALES", CATEGORY OF DOCTOR: "PAEDIATRICIAN", CURRENT BUSSINESS: "2400.00",…}
        //     {BRAND: "CILACAR T", CATEGORY OF DOCTOR: "DIABETOLOGIST", CURRENT BUSSINESS: "1001.00",…}
        //     {ReqNo: '123',  RPSName: 'abd',RPSAmt:'2000.00', Status:'confirmed', RPSDate:'31-July-2019', SubmittedBy:'Vivam(Mumbai)', AssignedTo:'assignTo',Note:'note'},
        //     {ReqNo:'123',  RPSName: 'abd',RPSAmt:'2000.00', Status:'confirmed', RPSDate:'31-July-2019', SubmittedBy:'Vivam(Mumbai)', AssignedTo:'assignTo',Note:'note'},
        //     {ReqNo: '123',  RPSName: 'abd',RPSAmt:'2000.00', Status:'confirmed', RPSDate:'31-July-2019', SubmittedBy:'Vivam(Mumbai)', AssignedTo:'assignTo',Note:'note'},
        //     {ReqNo: '123',  RPSName: 'abd',RPSAmt:'2000.00', Status:'confirmed', RPSDate:'31-July-2019', SubmittedBy:'Vivam(Mumbai)', AssignedTo:'assignTo',Note:'note'},
          
        //     ]; 
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
                 <ReportTablePRPCON
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
                    // rowsPerPageOption={[10, 20, 50, 100, 200,500,1000,2000,3000]}
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

export default ReportListPPRPCON