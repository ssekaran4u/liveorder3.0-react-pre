import React,{Component} from 'react'
import ReportTableMEDistDetailsummary from './ReportTableMEDistDetailsummary'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'

class ReportListMEDistDetailsummary extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'-999',
            selreg:'-999',
            seldis:'-999',
            selcate:'-999',
            seldate:'',
            Result1:[],
            DivisionCode:'',
            loader:false,
        }

        this.DivisionDropdown= this.SelectedDivision.bind(this)
        this.RegionDropdown= this.RegionDropdown.bind(this)
        this.applyFilterAll=this.applyFilterAll.bind(this)
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
    else if(state.name=="DistanceCall")
    {
       
        this.setState({seldis:state.rvalue})
    }
    else if(state.name=="Category")
    {
        
        this.setState({selcate:state.rvalue})
    }
    else if(state.name=="Month")
    {
        
        this.setState({seldate:state.rvalue})
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
        // this.setState({ loader:true })
        // console.log(this.state.seldiv)
        // console.log(this.state.selreg)
        // console.log(this.state.selrps)
        // console.log(this.state.selbr)
        // console.log(this.state.seldate)
        // console.log(this.state.selyr)
        
        if(this.state.seldate=="")
         {
            alert("Date not Selected ............")
                    return;
        } 
       
        this.setState({ loader:true })
       var travelModes={ "index": "BtnLoad",  data:{"DivisionCode":this.state.seldiv,"RegionCode":this.state.selreg,"DistanceCall":this.state.seldis,"Category":this.state.selcate,"Month":this.state.seldate}  }
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
                  //console.log(Result,"sss")
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
                   
						 test12.push({ 
							"Division": item1['division'],
							"RPS No": item1['srno'],
							"Request Date": item1['ReqDate'], 
							"RPS Date": item1['RPSdate'],
							"Requested Fs": item1['FSName'], 
							"Fs HQ": item1['FSHQ'], 
							"Fs Region": item1['FSRegion'], 
							"RPS Type": item1['RPSType'], 
							"RPS Brand": item1['itm'],
							"Estimated RPS Amount": item1['rpsamnt'],
							"BTC Estimated": item1['BTCEstimated'],
							"BTC Expense": item1['btcexpense'],
							"RPS Expense Against Adv": item1['rpsactualexpense'],
							"RPS Advance Received": item1['rpsadvancereceived'],
							"Confirmator Remark": <div className="note-text"> {item1['cnote']} </div>,
							
							"Pending For Approval": a,
							"Pending For Confirmation": b,
							"Pending For Desk Confirmation": c,
							
							"Submitted Expense": item1['sub_exp'],
							
							"Expense Submitted Date": d,
							"Pending For Approvalexp": e,
							"Pending For Confirmationexp": f,
							"Pending For Desk Confirmationexp": g,
							"Expense Confirmatory Remarks":<div className="note-text"> {item1['expenseconfremarks']} </div>,
							"Expense Confirmed Date": item1['expenseconfirmeddate'],
							"Expense Desk Confirmatory Remarks":<div className="note-text"> { item1['ExpensEDeskConfRemarks']} </div>,
							"Expense Desk Confirmed Date": item1['expensedeskconfirmeddate'],
							"Cancellation Reason": item1['cancelremarks'],
                    })
                    
                   
                })

                this.setState({ loader:false })
                this.setState({ Result1: test12 })
              }
          }).catch(() => {
            this.setState({ loader:false })
             alert("error");
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })


    }
    componentDidMount(){
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
    }
    





    render(){
       
        let {Result1}=this.state
        const header = [
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
                       
        ];
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
                 <ReportTableMEDistDetailsummary
                 DivisionDropdown={this.DivisionDropdown}
                 RegionDropdown={this.RegionDropdown}

                 selecteddiv={this.state.selecteddiv}
                 selectedreg={this.state.selectedreg}
                    tableHeader={header}
                    tableBody={Result1}
                    open={this.props.open}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200,300,500,700,1000]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    applyFilter={this.applyFilterAll}
                    
                />
            </div>
        )
    }
}

export default ReportListMEDistDetailsummary