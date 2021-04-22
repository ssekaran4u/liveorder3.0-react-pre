import React,{Component} from 'react'
import ReportTableDistDetailsummary from './ReportTableDistDetailsummary'
import "../../../public/assets/css/campaignRequest.css";
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'
import data from '../../Report_Eceptionalprprps/components/data';
import CustomizedTable from './customizedTable';

class ReportListDistDetailsummary extends Component{
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
            headin2:[]
        }

        this.DivisionDropdown= this.SelectedDivision.bind(this)
        this.RegionDropdown= this.RegionDropdown.bind(this)
        this.applyFilterAll=this.applyFilterAll.bind(this)
    }


    SelectedDivision(state){
       
        //console.log(state, "name")
       // console.log(state.name, "nameeeeeee")
     // alert("change")
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
        // var travelModes={ "index": "GetReportData",  data:{"DivCode":this.state.seldiv,"RegCode":this.state.selreg,"DistCallType":(this.state.seldistancecall=="")?"-999":this.state.seldistancecall}  }
        var travelModes={ "Report":"RegionWiseSummaryPhyDigi","index": "GetReportData",
          data:{"RegCode":"-999","DivCode":"-999","DistCallType":"-999","Month":"10","Year":"","Cat":"-999"}  }
      
        let test12=[];
      
      console.log(travelModes,"param")
        postToServer("Reportsapi", travelModes).then((Result) => {
            console.log(Result,"result");
            console.log(Result.data.Status,"status")
            if (Result.data.Status == 'Success') {   

                if(Result.data.ReportData.length>0)
                {
                    // this.setState({header:[
                    //     { prop: 'FS Name', title: 'FS Name', filterable: true,sortable:true },
                    //     { prop: 'FS Region', title: 'FS Region', filterable: true,sortable:true },
                    //     { prop: 'EMP Code', title: 'EMP Code', filterable: true },
                    //     { prop: 'FS Code', title: 'FS Code', filterable: true },
                    //     { prop: 'No of Chemist Connected', title: 'No of Chemist Connected', filterable: true },
                    //     { prop: 'POB', title: 'POB', filterable: true,sortable:true },
                    //     { prop: 'RCPA', title: 'RCPA', filterable: true },
                    //     { prop: 'No of Stockist Connected', title: 'No of Stockist Connected', filterable: true },
                    // ]});
                }

                Result.data.ReportData.map((item2,index) => {
                    //item2['Region'],

                    test12.push({
                        "Division":item2['c_div_code'],
                        "Region":item2['Region'],
                        "Month":item2['Month'],
                        "Category":item2['Category'],
                        "NoOfDrs0":item2['NO OF DRS IN LIST'],
                        "NoOfDrs1":item2['FS Name'],
                        "DISTANCE1":item2['FS Name'],
                        "NoOfDrs2":item2['FS Name'],
                        "DISTANCE2":item2['FS Name'],
                        "NoOfDrs3":item2['FS Name'],
                        "DISTANCE3":item2['FS Name'],
                        "NoOfDrs4":item2['FS Name'],
                        "NoOfDrs4":item2['FS Name'],
                        "DISTANCE4":item2['FS Name'],
                        "NoOfDrs5":item2['FS Name'],
                        "NoOfDrs5":item2['FS Name'],
                        "DISTANCE5":item2['FS Name'],
                        "NoOfDrs6":item2['FS Name'],
                        "NoOfDrs6":item2['FS Name'],
                        "DISTANCE6":item2['FS Name'],
                        
                        "FSCODE":item2['FS Name'],
                        "EMPLOYYEECODE":item2['FS Name'],
                })
                })
           
                this.setState({ loader:false })
                this.setState({ Result1: test12 })

  
            }
          }).catch(() => {
            this.setState({ loader:false })
            this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
          })


    }
    componentDidMount(){
        // var defre={ "index": "LoginFSDetails",  data:{}  }

        // postToServer("PrpDetailsRpt", defre).then((Result) => {
        // if (Result.data.Status == 'Success') {   
        //     Result.data.data.map((item1,index) => {
              
        //        this.setState({DivisionCode:(item1['c_div_code']=="")?"All":item1['c_div_code']});
        //     })
        //  }
        
        // }).catch(() => {
                    
        // this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        // })
    }
    


    
    render(){
       
        // let {Result1,headin2}=this.state
        // const header = [
        //     { prop: 'Division', title: 'Division', filterable: true,sortable:true },
        //     { prop: 'Region', title: 'Region', filterable: true,sortable:true },
        //     { prop: 'Month', title: 'Month', filterable: true,sortable:true },
        //     { prop: 'Category', title: 'Category', filterable: true,sortable:true },
        //     { prop: 'NoOfDrs0', title: 'No Of Drs in List', filterable: true,sortable:true },

        //     { prop: 'NoOfDrs1', title: 'NO OF DRS ENGAGED', filterable: true,sortable:true },
        //     { prop: 'DISTANCE1', title: 'NO OF CALLS', filterable: true,sortable:true },

        //     { prop: 'NoOfDrs2', title: 'NO OF DRS ENGAGED', filterable: true,sortable:true },
        //     { prop: 'DISTANCE2', title: 'NO OF CALLS', filterable: true,sortable:true },

        //     { prop: 'NoOfDrs3', title: 'NO OF DRS ENGAGED', filterable: true,sortable:true },
        //     { prop: 'DISTANCE3', title: 'NO OF CALLS', filterable: true,sortable:true },

        //     { prop: 'NoOfDrs4', title: 'No Of Drs in List', filterable: true,sortable:true },
        //     { prop: 'NoOfDrs4', title: 'NO OF DRS ENGAGED', filterable: true,sortable:true },
        //     { prop: 'DISTANCE4', title: 'NO OF CALLS', filterable: true,sortable:true },

        //     { prop: 'NoOfDrs5', title: 'No Of Drs in List', filterable: true,sortable:true },
        //     { prop: 'NoOfDrs5', title: 'NO OF DRS ENGAGED', filterable: true,sortable:true },
        //     { prop: 'DISTANCE5', title: 'NO OF CALLS', filterable: true,sortable:true },

        //     { prop: 'NoOfDrs6', title: 'No Of Drs in List', filterable: true,sortable:true },
        //     { prop: 'NoOfDrs6', title: 'NO OF DRS ENGAGED', filterable: true,sortable:true },
        //     { prop: 'DISTANCE6', title: 'NO OF CALLS', filterable: true,sortable:true },

        //     { prop: 'FSCODE', title: 'FSCODE', filterable: true,sortable:true },
        //     { prop: 'EMPLOYYEECODE', title: 'EMPLOYYEE CODE', filterable: true,sortable:true },
          
                       
        // ];
        // const customLabels = {
        //     first: "<<",
        //     last: ">>",
        //     prev: "< Prev",
        //     next: "Next >",
        //     show: "Show",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        //     entries: "entries",
        //     filterPlaceholder: "Search Anything",
        //     noResults: "There is no data to be displayed"
        // };
        return(
            <div>
                <Loder show={this.state.loader}></Loder>
                 {/* <ReportTableDistDetailsummary
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
                    
                /> */}
                <CustomizedTable/>
            </div>
        )
    }
}

export default ReportListDistDetailsummary