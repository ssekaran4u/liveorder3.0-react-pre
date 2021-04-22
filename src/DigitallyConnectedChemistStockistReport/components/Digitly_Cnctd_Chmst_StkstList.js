import React,{Component} from 'react'
import Digitly_Cnctd_Chmst_StkstTable from './Digitly_Cnctd_Chmst_StkstTable'
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'
import { parse } from 'date-fns'

class Digitly_Cnctd_Chmst_StkstList extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'',
            selreg:'',
            seldistancecall:'-999',
            selmonth:'',
            selcat:'',
            selfsarea:'',
            selfsname:'',
            Result1:[],
            header:[],
            divisioncode:'',
            loader:false,
        }

        this.DivisionDropdown= this.SelectedDivision.bind(this)
        this.RegionDropdown= this.RegionDropdown.bind(this)
        this.applyFilterAll=this.applyFilterAll.bind(this)
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
        else if(state.name=="Distance")
        {
           
            this.setState({seldistancecall:state.rvalue})
        }    
        else if(state.name=="Category")
        {
           
            this.setState({selcat:state.rvalue})
        } 
        else if(state.name=="Month")
        {
           
            this.setState({selmonth:state.rvalue})
        } 
        else if(state.name=="FSArea")
        {
           
            this.setState({selfsarea:state.rvalue})
        } 
        else if(state.name=="FSName")
        {
           
            this.setState({selfsname:state.rvalue})
        } 
    }

    RegionDropdown(){
    }

    componentDidUpdate(){
    }

    applyFilterAll(){       
        
        if(this.state.seldiv=="")
        {
            this.setState({ loader:false })
        alert("Please Select the Division...")
        return;
        }
        if(this.state.selreg=="")
        {
            this.setState({ loader:false })
        alert("Please Select the Region...")
        return;
        }
        
        this.setState({ loader:true })
        // var travelModes={ "index": "GetReportData",  data:{"DivCode":this.state.seldiv,"RegCode":this.state.selreg,"DistCallType":(this.state.seldistancecall=="")?"-999":this.state.seldistancecall}  }
        var travelModes={ "Report":"RegionWiseMEwiseDigitallyConnectedChemistStockitsReport","index": "GetReportData",  data:{"DivCode":"-999","RegCode":"-999","DistCallType":"-999"}  }
      
        let test12=[];
      
      console.log(travelModes,"param")
        postToServer("Reportsapi", travelModes).then((Result) => {
            console.log(Result,"result");
            console.log(Result.data.Status,"status")
            if (Result.data.Status == 'Success') {   

                if(Result.data.ReportData.length>0)
                {
                    this.setState({header:[
                        { prop: 'FS Name', title: 'FS Name', filterable: true,sortable:true },
                        { prop: 'FS Region', title: 'FS Region', filterable: true,sortable:true },
                        { prop: 'EMP Code', title: 'EMP Code', filterable: true },
                        { prop: 'FS Code', title: 'FS Code', filterable: true },
                        { prop: 'No of Chemist Connected', title: 'No of Chemist Connected', filterable: true },
                        { prop: 'POB', title: 'POB', filterable: true,sortable:true },
                        { prop: 'RCPA', title: 'RCPA', filterable: true },
                        { prop: 'No of Stockist Connected', title: 'No of Stockist Connected', filterable: true },
                    ]});
                }

                Result.data.ReportData.map((item2,index) => {
                    //item2['Region'],

                    test12.push({
                        "FS Name":item2['FS Name'],
                        "FS Region":item2['FS Region'],
                        "EMP Code":item2['EMP CODE'],
                        "FS Code":item2['FS CODE'],
                        "No of Chemist Connected":item2['No of Chemist connected'],
                        "POB":item2['POB'],
                        "RCPA":item2['RCPA'],
                        "No of Stockist Connected":item2['No of stockits connected'],
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
        this.setState({header:[
            { prop: 'FS Name', title: '', filterable: true,sortable:false },
            // { prop: 'FS Region', title: 'FS Region', filterable: true,sortable:true },
            // { prop: 'EMP Code', title: 'EMP Code', filterable: true },
            // { prop: 'FS Code', title: 'FS Code', filterable: true },
            // { prop: 'No of Chemist Connected', title: 'No of Chemist Connected', filterable: true },
            // { prop: 'POB', title: 'POB', filterable: true,sortable:true },
            // { prop: 'RCPA', title: 'RCPA', filterable: true },
            // { prop: 'No of Stockist Connected', title: 'No of Stockist Connected', filterable: true },
        ]});
    }
    





    render(){
       
        let {Result1,header}=this.state
        
    //     const header = [
    //         { prop: 'FS Name', title: '', filterable: true,sortable:false },
    //         // { prop: 'FS Region', title: 'FS Region', filterable: true,sortable:true },
    //         // { prop: 'EMP Code', title: 'EMP Code', filterable: true },
    //         // { prop: 'FS Code', title: 'FS Code', filterable: true },
    //         // { prop: 'No of Chemist Connected', title: 'No of Chemist Connected', filterable: true },
    //         // { prop: 'POB', title: 'POB', filterable: true,sortable:true },
    //         // { prop: 'RCPA', title: 'RCPA', filterable: true },
    //         // { prop: 'No of Stockist Connected', title: 'No of Stockist Connected', filterable: true },
                                        
    //    ];
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
                 <Digitly_Cnctd_Chmst_StkstTable
                 DivisionDropdown={this.DivisionDropdown}
                 RegionDropdown={this.RegionDropdown}

                 selecteddiv={this.state.selecteddiv}
                 selectedreg={this.state.selectedreg}
                    tableHeader={header}
                    open={this.props.open}
                    tableBody={Result1}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200,500,700,1000,1500,2000]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    applyFilter={this.applyFilterAll}
                    
                />
            </div>
        )
    }
}

export default Digitly_Cnctd_Chmst_StkstList