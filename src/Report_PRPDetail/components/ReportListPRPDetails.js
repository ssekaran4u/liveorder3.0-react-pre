import React,{Component} from 'react'
import ReportTablePRPDetails from './ReportTablePRPDetails'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'
//import { Left } from 'react-bootstrap/lib/media'

class ReportListPRPDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'',
            selreg:'',
            selfs:'All',
            selarea:'All',
            seldate:'',
            selyr:'',
            selyear1:'',
            Result1:[],
            RegionCode:'',
            DivisionCode:'',
            areacode:'',
            mnthname:'',
            yearname:'',
            loader:false,
            header:[],
             mon:'',
             regname:'',
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
          //  this.setState({regname:state.textval})
           // console.log(state.textval,"regionna")
        }
        else if(state.name=="Area")
        {
            
            this.setState({selarea:state.rvalue})
        }
        else if(state.name=="FS Name")
        {
           
            this.setState({selfs:state.rvalue})
        }
       
        else if(state.name=="Month")
        {
            
            this.setState({seldate:state.rvalue})
            this.setState({mnthname:state.textval})

        }
        else if(state.name=="Year")
        {
            
            this.setState({selyr:state.rvalue})
           // this.setState({yearname:state.textval})
           // var yearv=event.target.keyName
            //this.setState({selyear1:})
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
        this.setState({ loader:true })
        //const {RegionCode}=this.state;
        this.setState({mainHead:"PRP Details Report For  " + this.state.mnthname +' '+ this.state.selyr} );
        //console.log(this.state.RegionCode,"defreg2")
        //var travelModes={ "index": "BtnView",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"rpscode":this.state.selrps,"brandcode":this.state.selbr,"monthtype":this.state.seldate,"year":this.state.selyr}  }
        var travelModes={ "index": "BtnLoad",  data:{"DivisionCode":(this.state.seldiv=="")?this.state.DivisionCode:this.state.seldiv,"RegionCode":(this.state.selreg=="")?this.state.RegionCode:this.state.selreg,"AreaCode":this.state.selarea,"FsCode":this.state.selfs,"Month":this.state.seldate,"Year":this.state.selyr}  }
        let test12=[];
        let appconf="";
        let advancamt = "";
        let estimatamt = "";
        let totadv = "";
        let totbtc = "";
        let totaladva="";
        

        console.log(travelModes)


        // let roundOff = (num, places) => {
        //     const x = Math.pow(10,places);
        //     return Math.round(num * x) / x;
        //   }
      
     
        postToServer("PrpDetailsRpt", travelModes).then((Result) => {
           console.log(Result,"data")
            if (Result.data.Status == 'Success') {   
                //alert(1)
              console.log(Result.data,"data")
                Result.data.data[0].map((item1,index) => {
                        //debugger;   
                    if (item1['AppConftot'] == "-1.00")
                    {
                       
                        appconf="NA".toUpperCase();
                    }
                    else
                    {
                        appconf=item1["AppConftot"];
                    }
                  
                    if (item1['n_AdvanceAmount'] == "0.00")
                    {
                        
                        advancamt="NIL".toUpperCase();
                    }
                    else
                    {
                        advancamt=item1['n_AdvanceAmount'];
                    }
                    if (item1['n_estimatedAmount'] == "-1.00")
                    {
                        estimatamt="NIL".toUpperCase();

                    }
                    else
                    {
                        estimatamt=item1['n_estimatedAmount'];
                    }

                    if (item1['n_totadvance']== "-1.00")
                    {
                        totadv="NA".toUpperCase();

                    }
                    else
                    {
                        totadv=item1['n_totprpcost'];
                    }
                    if (item1['n_totadvance'] == "-1.00")
                    {
                        totbtc="NA";
                    }
                    else
                    {
                        totbtc=item1['n_totBtc'];
                    }
                    if (item1['n_totadvance'] == "-1.00")
                    {
                        totaladva="NA".toUpperCase();
                    }
                    else
                    {
                        totaladva=item1['n_totadvance'];
                    }

                    if(Result.data.data[0].length>0)
                    {
                          this.setState({header:[
                            { prop: 'Division Name', title: 'Division Name', filterable: true,sortable:true },
                            { prop: 'Region Name', title: 'Region Name', filterable: true,sortable:true },
                            { prop: 'PRP No', title: 'PRP No', filterable: true,sortable:true },
                            { prop: 'PRP Name', title: 'PRP Name', filterable: true,sortable:true },
                            { prop: 'Requested Date', title: 'Requested Date', filterable: true,sortable:true },
                            { prop: 'Requested FS', title: 'Requested FS', filterable: true,sortable:true },
                            { prop: 'PRP Date', title: 'PRP Date', filterable: true,sortable:true },
                            { prop: 'Place', title: 'Place', filterable: true,sortable:true },
                           { prop: 'Topic Name', title: 'Topic Name', filterable: true,sortable:true },
                           { prop: 'Brand for PRP', title: 'Brand for PRP', filterable: true,sortable:true },
                           { prop: 'Estimated PRP', title: 'Estimated PRP', filterable: true,sortable:true },
                           { prop: 'Approve/Confirmed Total PRP', title: 'Approve/Confirmed Total PRP', filterable: true,sortable:true },
                          { prop: 'PRP ADVANCE', title: 'PRP ADVANCE', filterable: true,sortable:true },
                        { prop: 'Total BTC', title: 'Total BTC', filterable: true,sortable:true },
                         { prop: 'Expected Audience', title: 'Expected Audience', filterable: true,sortable:true },
                         { prop: 'Total Expected No. of Dr Attended', title: 'Total Expected No. of Dr Attended', filterable: true,sortable:true },
                        { prop: 'No. of Dr Attended', title: 'No. of Dr Attended', filterable: true,sortable:true },
                        { prop: 'KOL Attended', title: 'KOL Attended', filterable: true,sortable:true },
                        { prop: 'PRP Confirmed Date', title: 'PRP Confirmed Date', filterable: true,sortable:true },
                           { prop: 'Total Cost For PRP', title: 'Total Cost For PRP', filterable: true,sortable:true },
                           { prop: 'Total Cost For BTC Expense', title: 'Total Cost For BTC Expense', filterable: true,sortable:true },
                           { prop: 'Expense Against Advance', title: 'Expense Against Advance', filterable: true,sortable:true },
                          { prop: 'Expense Entry date', title: 'Expense Entry date', filterable: true,sortable:true },
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

                    test12.push({
                    
                        "Division Name":<div className="textReport">{item1['div']}</div>,
                        "Region Name": <div className="textReport">{item1['region']}</div>,
                        "PRP No":<div className="textReport">{item1['prpno']}</div>,
                        "PRP Name":<div className="textReport">{item1['prpname']}</div>,
                        "Requested Date":<div className="textReport">{item1['d_posteddate']}</div>,
                        "Requested FS":<div className="textReport">{item1['fs']}</div>,
                        "PRP Date": <div className="textReport">{item1['d_prpdate']}</div>,
                        "Place":<div className="textReport">{item1['subarea']}</div>,
                        "Topic Name":<div className="textReport">{item1['topic']}</div>,
                        "Brand for PRP":<div className="textReport">{item1['brand']}</div>,
                        "Estimated PRP":<div className="textReport">{item1['n_btc']}</div> ,
                        "Approve/Confirmed Total PRP":<div className="textReport">{appconf}</div>,
                        "PRP ADVANCE":<div className="textReport">{advancamt}</div>,
                        //DOCTOR CODE
                       // "DOCTOR NAME":item1['DOCTOR NAME'],
                        
                       
                        "Total BTC":<div className="textReport">{estimatamt}</div>,
                        "Expected Audience": <div className="textReport">{item1['n_expAudience']}</div>,
                        "Total Expected No. of Dr Attended":<div className="textReport">{item1['cnt']}</div>,
                        "No. of Dr Attended":<div className="textReport">{item1['n_drattend']}</div>,
                         "KOL Attended":<div className="note-text"> {item1['kol']} </div>,
                       // "KOL Attended":item1['kol'],
                        "PRP Confirmed Date":<div className="textReport">{item1['confirmdate']}</div>,



                        "Total Cost For PRP":<div className="textReport">{totadv}</div> , 
                        "Total Cost For BTC Expense":<div className="textReport">{totbtc}</div>,
                        "Expense Against Advance":<div className="textReport">{totaladva}</div>,
                        "Expense Entry date":<div className="textReport">{item1['d_reqdate']}</div>,
                        "Expense Confirmatory Remarks":<div className="note-text"> {item1['ExpenseConfRemarks']} </div>,
                        //"Expense Confirmatory Remarks":item1['ExpenseConfRemarks'],
                         "Expense Confirmed Date":<div className="textReport">{item1['expenseconfirmeddate']}</div>,
                         
                         
                    })

                  }
                }
                )

                
            this.setState({ loader:false })
            //console.log(test12,"jjj")
              this.setState({ Result1: test12 })
             // this.setState({ Result1: test12 })
              this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
            }
            console.log(this.state.Result1,"result ok")
          }).catch(() => {
            this.setState({ loader:false })
            console.log("Error")
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })

    }
    componentDidMount(){
        let header1 =[]
        this.setState({hdrcoldefault : ['Division Name',
        'Region Name',
        'PRP No',
        'PRP Name',
        'Requested Date',
        'Requested FS',
        'PRP Date',
        'Place',
        'Topic Name',
        'Brand for PRP',
        'Estimated PRP',
        'Approve/Confirmed Total PRP',
        'PRP ADVANCE',
        'Total BTC',
        'Expected Audience',
        'Total Expected No. of Dr Attended',
        'No. of Dr Attended',
        'KOL Attended',
        'PRP Confirmed Date',
        'Total Cost For PRP',
        'Total Cost For BTC Expense',
        'Expense Against Advance',
        'Expense Entry date',
        'Expense Confirmatory Remarks',
        'Expense Confirmed Date']})

        this.setState({rowsperpage1:10})
        this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]});
        let ddd='';
        var defre={ "index": "LoginFSDetails",  data:{}  }

        postToServer("PrpDetailsRpt", defre).then((Result) => {
        if (Result.data.Status == 'Success') {   
            Result.data.data.map((item1,index) => {
                this.setState({RegionCode:item1['C_Region_Code']});
                //this.setState({areacode:item1['C_Code']});
               this.setState({DivisionCode:(item1['c_div_code']=="")?"All":item1['c_div_code']});
            })
         }
        
        }).catch(() => {
                    
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        })

        this.setState({header:[
            { prop: 'Division Name', title: '', filterable: true,sortable:false },
        ]});

    }
    





    render(){
        let {Result1,header,entriescount,rowsperpage1}=this.state
        // let {Result1}=this.state
        // const header = [
           
        //      { prop: 'Division Name', title: 'Division Name', filterable: true,sortable:true },
        //      { prop: 'Region Name', title: 'Region Name', filterable: true,sortable:true },
        //      { prop: 'PRP No', title: 'PRP No', filterable: true,sortable:true },
        //      { prop: 'PRP Name', title: 'PRP Name', filterable: true,sortable:true },
        //      { prop: 'Requested Date', title: 'Requested Date', filterable: true,sortable:true },
        //      { prop: 'Requested FS', title: 'Requested FS', filterable: true,sortable:true },
        //      { prop: 'PRP Date', title: 'PRP Date', filterable: true,sortable:true },
        //      { prop: 'Place', title: 'Place', filterable: true,sortable:true },
        //     { prop: 'Topic Name', title: 'Topic Name', filterable: true,sortable:true },
        //     { prop: 'Brand for PRP', title: 'Brand for PRP', filterable: true,sortable:true },
        //     { prop: 'Estimated PRP', title: 'Estimated PRP', filterable: true,sortable:true },
        //     { prop: 'Approve/Confirmed Total PRP', title: 'Approve/Confirmed Total PRP', filterable: true,sortable:true },
        //    { prop: 'PRP ADVANCE', title: 'PRP ADVANCE', filterable: true,sortable:true },
        //  { prop: 'Total BTC', title: 'Total BTC', filterable: true,sortable:true },
        //   { prop: 'Expected Audience', title: 'Expected Audience', filterable: true,sortable:true },
        //   { prop: 'Total Expected No. of Dr Attended', title: 'Total Expected No. of Dr Attended', filterable: true,sortable:true },
        //  { prop: 'No. of Dr Attended', title: 'No. of Dr Attended', filterable: true,sortable:true },
        //  { prop: 'KOL Attended', title: 'KOL Attended', filterable: true,sortable:true },
        //  { prop: 'PRP Confirmed Date', title: 'PRP Confirmed Date', filterable: true,sortable:true },
        //     { prop: 'Total Cost For PRP', title: 'Total Cost For PRP', filterable: true,sortable:true },
        //     { prop: 'Total Cost For BTC Expense', title: 'Total Cost For BTC Expense', filterable: true,sortable:true },
        //     { prop: 'Expense Against Advance', title: 'Expense Against Advance', filterable: true,sortable:true },
        //    { prop: 'Expense Entry date', title: 'Expense Entry date', filterable: true,sortable:true },
        // { prop: 'Expense Confirmatory Remarks', title: 'Expense Confirmatory Remarks', filterable: true,sortable:true },
        //    { prop: 'Expense Confirmed Date', title: 'Expense Confirmed Date', filterable: true,sortable:true },
            
       
                       
        // ];
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
                 <ReportTablePRPDetails
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

export default ReportListPRPDetails