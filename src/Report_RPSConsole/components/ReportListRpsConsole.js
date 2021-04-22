import React,{Component} from 'react'
import ReportTableRpsConsole from './ReportTableRpsConsole'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'

class ReportListRpsConsole extends Component{
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
            DivisionCode:'',
            Divisionname:'',
            header:[],
            loader:false,
            Regionname:'All',
            Divname:'',
            Divname1:'',
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
    //    alert(state.name)
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
       
        if(this.state.selreg=="")
        {
            this.state.selreg="All"
         } 
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
      //  this.setState({Divname1:(this.state.Divname=="")?this.state.Divisionname:this.state.Divname});
      console.log(this.state.Divname,"divs")
        this.setState({mainHead:"Consolidated Report  For "+this.state.Divname1+ " Division, "+this.state.Regionname+' Region, ' +this.state.mnthname +'- '+ this.state.selyr} ) 
        this.setState({ loader:true })
       var travelModes={ "index": "BtnLoad",  data:{"DivisionCode":(this.state.seldiv=="")?this.state.DivisionCode:this.state.seldiv,"RegionCode":this.state.selreg,"Month":this.state.seldate,"Year":this.state.selyr}  }
        // var travelModes={ "index": "BtnView",  data:{"DivisionCode":"All","RegionCode":"All","PrpName":"All","Brand":"All","Month":"1","Year":"2020"}  }
        let test12=[];
        var a="";
        var b="";
        var c="";
        var d="";
        var e="";
        var f="";
        var g="";

        console.log(travelModes)

        postToServer("RPSConsolrpt", travelModes).then((Result) => {
            
              if (Result.data.Status == 'Success') 
              {
                 // console.log(Result,"REturn data from api")
                Result.data.data[0].map((item1,index) => {
                        
                    if (item1['appfs'] != "NG")
                    {
                        if (item1['appfs'] == "")
                        {
                           
							a="NA".toUpperCase();
                        }
                        else
                        {
                           
                           a=item1['appfs'].toString();
                        }
                    }
                    else
                    {
                       a="NA".toUpperCase();
                    }
                    
                    
                        if (item1['conffs'] != "NG")
                        {
                           b=item1['conffs'];
                        }
                        else
                        {
                            b="NA".toUpperCase();
                        }
                 
                    if ( (item1['conffs'] == "NG"))
                    {
                       c="NA".toUpperCase();
                    }
                    else
                    {
                       c=item1['deskfs'];
                    }

                   
                    if (item1['expdate'] == "")
                    {
                        d="NS".toUpperCase();
						e="NA".toUpperCase();
						f="NA".toUpperCase();
						g="NA".toUpperCase();

                    }
                    else
                    {
                       d=item1['expdate'];

                        if ((item1['expappfs'] != "Approved") && (item1['expappfs'] != "NG"))
                        {
                            if (item1['expappfs'] == "")
                            {
                                e="NA".toUpperCase();
                            }
                            else
                            {
                               e=item1['expappfs'];
                            }
							f=item1['expconffs'];
							g=item1['expdesk'];
                        }
                        else
                        {
                        
                            e=item1['expappfs'];
							f=item1['expconffs'];
							g=item1['expdesk'];
                           
                           
                        }

                      
                    }
                    if(Result.data.data[0].length>0)
                    {
                          this.setState({header:[
                            { prop: 'Division', title: 'Division', filterable: true,sortable:true },
                            { prop: 'RPS No', title: 'RPS No', filterable: true,sortable:true },
                            { prop: 'Request Date', title: 'Request Date', filterable: true,sortable:true },
                            { prop: 'RPS Date', title: 'RPS Date', filterable: true,sortable:true },
                            { prop: 'Requested Fs', title: 'Requested Fs', filterable: true,sortable:true },
                            { prop: 'Fs HQ', title: 'Fs HQ', filterable: true,sortable:true },
                            { prop: 'Fs Region', title: 'Fs Region', filterable: true,sortable:true },
                            { prop: 'RPS Type', title: 'RPS Type', filterable: true,sortable:true },
                            { prop: 'RPS Brand', title: 'RPS Brand', filterable: true,sortable:true },
                            { prop: 'Estimated RPS Amount', title: 'Estimated RPS Amount', filterable: true,sortable:true },
                            { prop: 'BTC Estimated', title: 'BTC Estimated', filterable: true,sortable:true },
                            { prop: 'BTC Expense', title: 'BTC Expense', filterable: true,sortable:true },
                            { prop: 'RPS Expense Against Adv', title: 'RPS Expense Against Adv', filterable: true,sortable:true },
                            { prop: 'RPS Advance Received', title: 'RPS Advance Received', filterable: true,sortable:true },
                            { prop: 'Confirmator Remark', title: 'Confirmator Remark', filterable: true,sortable:true },
                            { prop: 'Pending For Approval', title: 'Pending For Approval', filterable: true,sortable:true },
                            { prop: 'Pending For Confirmation', title: 'Pending For Confirmation', filterable: true,sortable:true },
                            { prop: 'Pending For Desk Confirmation', title: 'Pending For Desk Confirmation', filterable: true,sortable:true },
                            { prop: 'Submitted Expense', title: 'Submitted Expense', filterable: true,sortable:true },   // AS
                            { prop: 'Expense Submitted Date', title: 'Expense Submitted Date', filterable: true,sortable:true },
                            { prop: 'Pending For Approvalexp', title: 'Pending For Approval', filterable: true,sortable:true },
                            { prop: 'Pending For Confirmationexp', title: 'Pending For Confirmation', filterable: true,sortable:true },
                            { prop: 'Pending For Desk Confirmationexp', title: 'Pending For Desk Confirmation', filterable: true,sortable:true },
                            { prop: 'Expense Confirmatory Remarks', title: 'Expense Confirmatory Remarks', filterable: true,sortable:true },
                            { prop: 'Expense Confirmed Date', title: 'Expense Confirmed Date', filterable: true,sortable:true },
                            { prop: 'Expense Desk Confirmatory Remarks', title: 'Expense Desk Confirmatory Remarks', filterable: true,sortable:true },
                            { prop: 'Expense Desk Confirmed Date', title: 'Expense Desk Confirmed Date', filterable: true,sortable:true },
                            { prop: 'Cancellation Reason', title: 'Cancellation Reason', filterable: true,sortable:true },              
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
							"Division": <div className="textReport">{item1['division']}</div>,
							"RPS No": <div className="textReport">{item1['srno']}</div>,
							"Request Date": <div className="textReport">{item1['ReqDate']}</div>, 
							"RPS Date": <div className="textReport">{item1['RPSdate']}</div>,
							"Requested Fs": <div className="textReport">{item1['FSName']}</div>, 
							"Fs HQ": <div className="textReport">{item1['FSHQ']}</div>, 
							"Fs Region": <div className="textReport">{item1['FSRegion']}</div>, 
							"RPS Type": <div className="textReport">{item1['RPSType']}</div>, 
							"RPS Brand": <div className="textReport">{item1['itm']}</div>,
							"Estimated RPS Amount": <div className="textReport">{item1['rpsamnt']}</div>,
							"BTC Estimated": <div className="textReport">{item1['BTCEstimated']}</div>,
							"BTC Expense": <div className="textReport">{item1['btcexpense']}</div>,
							"RPS Expense Against Adv": <div className="textReport">{item1['rpsactualexpense']}</div>,
							"RPS Advance Received": <div className="textReport">{item1['rpsadvancereceived']}</div>,
							"Confirmator Remark": <div className="note-text textReport"> {item1['cnote']} </div>,
							
							"Pending For Approval": <div className="textReport">{a}</div>,
							"Pending For Confirmation": <div className="textReport">{b}</div>,
							"Pending For Desk Confirmation": <div className="textReport">{c}</div>,
							
							"Submitted Expense": <div className="textReport">{item1['sub_exp']}</div>,
							
							"Expense Submitted Date": <div className="textReport">{d}</div>,
							"Pending For Approvalexp": <div className="textReport">{e}</div>,
							"Pending For Confirmationexp": <div className="textReport">{f}</div>,
							"Pending For Desk Confirmationexp": <div className="textReport">{g}</div>,
							"Expense Confirmatory Remarks":<div className="note-text textReport"> {item1['expenseconfremarks']} </div>,
							"Expense Confirmed Date": <div className="textReport">{item1['expenseconfirmeddate']}</div>,
							"Expense Desk Confirmatory Remarks":<div className="note-text textReport"> { item1['ExpensEDeskConfRemarks']} </div>,
							"Expense Desk Confirmed Date": <div className="textReport">{item1['expensedeskconfirmeddate']}</div>,
							"Cancellation Reason": <div className="textReport">{item1['cancelremarks']}</div>,
                    })
                    
                }
                })

                this.setState({ loader:false })
                this.setState({ Result1: test12 })
                this.setState({entriescount:[10, 20 , 50, 100, 500,1000,10000]})
              }
          }).catch(() => {
            this.setState({ loader:false })
             alert("error");
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })


    }
    componentDidMount(){

        let header1 =[]
        this.setState({hdrcoldefault : ['Division',
        'RPS No',
        'Request Date',
        'RPS Date',
        'Requested Fs',
        'Fs HQ',
        'Fs Region',
        'RPS Type',
        'RPS Brand',
        'Estimated RPS Amount',
        'BTC Estimated',
        'BTC Expense',
        'RPS Expense Against Adv',
        'RPS Advance Received',
        'Confirmator Remark',
        'Pending For Approval',
        'Pending For Confirmation',
        'Pending For Desk Confirmation',
        'Submitted Expense',
        'Expense Submitted Date',
        'Pending For Approvalexp',
        'Pending For Confirmationexp',
        'Pending For Desk Confirmationexp',
        'Expense Confirmatory Remarks',
        'Expense Confirmed Date',
        'Expense Desk Confirmatory Remarks',
        'Expense Desk Confirmed Date',
        'Cancellation Reason']})


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
              //console.log(Result.data.data,"div1")
               this.setState({Divisionname:(item1['divname']=="")?"All":item1['divname']});
              // console.log(this.state.Divisionname,"divname")
               //this.setState({Regionname:(item1['regname']=="")?"All":item1['regname']});
               //this.setState({Areaname:(item1['arname']=="")?"All":item1['arname']});
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
                 <ReportTableRpsConsole
                 DivisionDropdown={this.DivisionDropdown}
                 RegionDropdown={this.RegionDropdown}

                 selecteddiv={this.state.selecteddiv}
                 selectedreg={this.state.selectedreg}
                    tableHeader={header}
                    tableBody={Result1}
                    open={this.props.open}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    // rowsPerPage={10}
                    // rowsPerPageOption={[10, 20, 50, 100, 200,300,500,700,1000]}
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

export default ReportListRpsConsole